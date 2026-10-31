"""Backend: Herbotech Enquiry API

Starter template from AgentForge (known to work). Keep the imports and helpers; add your tables to
SCHEMA and implement every contract endpoint in the ROUTES section.
"""

import hashlib
import logging
import os
import secrets
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

from fastapi import Depends, FastAPI, Header, HTTPException, Query  # noqa: F401
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field  # noqa: F401

DB_PATH = os.environ.get("AF_DB", str(Path(__file__).resolve().parent / "app.db"))

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS tokens (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    companyName TEXT NOT NULL,
    businessEmail TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    industry TEXT NOT NULL,
    requiredHerb TEXT NOT NULL,
    productForm TEXT NOT NULL,
    estimatedQuantity TEXT NOT NULL,
    requiredSpecifications TEXT NOT NULL,
    additionalMessage TEXT NOT NULL,
    createdAt TEXT NOT NULL
);
"""  # add the tables this API needs here


@contextmanager
def get_conn():
    """Usage: with get_conn() as conn: conn.execute(...). Commits on success, always closes."""
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row  # rows support row["column"]; SELECT every column you read
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


with get_conn() as _conn:
    _conn.executescript(SCHEMA)

app = FastAPI(title="Herbotech Enquiry API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

logger = logging.getLogger("herbotech.enquiry")


# ---- auth helpers (use only if the contract has secured endpoints) ----------------
def hash_password(password: str, salt: str | None = None) -> str:
    """Returns one string "salt$digest" to store in users.password_hash (the salt is inside it)."""
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100_000).hex()
    return f"{salt}${digest}"


def verify_password(password: str, password_hash: str) -> bool:
    """password_hash is the stored users.password_hash value."""
    salt = password_hash.split("$", 1)[0]
    return secrets.compare_digest(hash_password(password, salt), password_hash)


def issue_token(conn: sqlite3.Connection, user_id: int) -> str:
    """Call INSIDE the route's `with get_conn() as conn:` block, passing that conn (one connection per request;
    a second connection would hit 'database is locked' while the first holds an uncommitted write)."""
    token = secrets.token_hex(24)
    conn.execute("INSERT INTO tokens (token, user_id) VALUES (?, ?)", (token, user_id))
    return token


def current_user(authorization: str | None = Header(default=None)) -> sqlite3.Row:
    """FastAPI dependency: `user = Depends(current_user)` -> row with id, username. 401 if missing/invalid."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="missing bearer token")
    with get_conn() as conn:
        row = conn.execute("SELECT users.id, users.username FROM tokens JOIN users ON users.id = tokens.user_id "
                           "WHERE tokens.token = ?", (authorization[len("Bearer "):],)).fetchone()
    if row is None:
        raise HTTPException(status_code=401, detail="invalid token")
    return row


# ---- ROUTES: implement every endpoint of the contract below ----------------------

class EnquiryRequest(BaseModel):
    model_config = {"extra": "allow"}

    fullName: str = Field(..., min_length=1, max_length=100)
    companyName: str = Field(..., min_length=1, max_length=200)
    businessEmail: str = Field(..., pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    phoneNumber: str = Field(..., min_length=10, max_length=20)
    industry: Literal[
        "Ayurveda",
        "Nutraceuticals",
        "Cosmetics",
        "Herbal Teas",
        "Botanical Extracts",
        "Herbal Wellness Brands",
        "Other",
    ]
    requiredHerb: str = Field(..., min_length=1, max_length=100)
    productForm: Literal[
        "Cleaned and Graded Whole Herbs",
        "Cut and Sifted Herbs",
        "Herbal Powders",
    ]
    estimatedQuantity: str = Field(..., min_length=1)
    requiredSpecifications: str = Field(..., min_length=1)
    additionalMessage: str = Field(..., min_length=1, max_length=500)


class EnquiryResponse(BaseModel):
    message: str
    enquiryId: int


@app.get("/api/health")
def get_health():
    return {"status": "ok"}


@app.post("/api/enquiry", response_model=EnquiryResponse, status_code=201)
def submit_enquiry(enquiry: EnquiryRequest):
    # A honeypot or any other unexpected field indicates an automated spam submission.
    extra_fields = getattr(enquiry, "__pydantic_extra__", None) or {}
    if extra_fields:
        raise HTTPException(status_code=400, detail="Spam submission detected")

    created_at = datetime.now(timezone.utc).isoformat()

    with get_conn() as conn:
        cursor = conn.execute(
            """
            INSERT INTO enquiries (
                fullName, companyName, businessEmail, phoneNumber, industry,
                requiredHerb, productForm, estimatedQuantity, requiredSpecifications,
                additionalMessage, createdAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                enquiry.fullName,
                enquiry.companyName,
                enquiry.businessEmail,
                enquiry.phoneNumber,
                enquiry.industry,
                enquiry.requiredHerb,
                enquiry.productForm,
                enquiry.estimatedQuantity,
                enquiry.requiredSpecifications,
                enquiry.additionalMessage,
                created_at,
            ),
        )
        enquiry_id = cursor.lastrowid

    logger.info("Stored business enquiry %s from %s", enquiry_id, enquiry.companyName)
    return {
        "message": "Your enquiry has been submitted successfully. Our team will contact you within 24 hours.",
        "enquiryId": enquiry_id,
    }
