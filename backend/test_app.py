"""Tests for: Herbotech Enquiry API. Every test starts with an EMPTY database (see fresh_db)."""

import os
import tempfile
import uuid

import pytest

os.environ["AF_DB"] = os.path.join(tempfile.mkdtemp(), "test.db")  # must be set before importing the app

from fastapi.testclient import TestClient  # noqa: E402

from backend.app import app, get_conn  # noqa: E402

client = TestClient(app)


@pytest.fixture(autouse=True)
def fresh_db():
    """Empty every table before each test, so tests never see each other's rows."""
    with get_conn() as conn:
        tables = [r[0] for r in conn.execute(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")]
        for table in tables:
            conn.execute(f'DELETE FROM "{table}"')
    yield


def unique(prefix: str = "user") -> str:
    return prefix + "_" + uuid.uuid4().hex[:8]


def valid_payload(**overrides):
    payload = {
        "fullName": "Priya Sharma",
        "companyName": "Herbalife Formulations",
        "businessEmail": "priya.sharma@herbalife.in",
        "phoneNumber": "+91 98765 43210",
        "industry": "Ayurveda",
        "requiredHerb": "Amla",
        "productForm": "Herbal Powders",
        "estimatedQuantity": "500 kg",
        "requiredSpecifications": "Moisture content <=5%, Vitamin C >=40%",
        "additionalMessage": "Require monthly supply for next 6 months with COA for each batch.",
    }
    payload.update(overrides)
    return payload


# ---- tests: at least one per contract endpoint, plus auth and validation failures --

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_submit_enquiry_success():
    payload = valid_payload()
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 201

    body = response.json()
    assert isinstance(body["message"], str) and body["message"]
    assert isinstance(body["enquiryId"], int)

    with get_conn() as conn:
        row = conn.execute(
            "SELECT * FROM enquiries WHERE id = ?", (body["enquiryId"],)
        ).fetchone()
        assert row is not None
        assert row["fullName"] == payload["fullName"]
        assert row["companyName"] == payload["companyName"]
        assert row["businessEmail"] == payload["businessEmail"]
        assert row["phoneNumber"] == payload["phoneNumber"]
        assert row["industry"] == payload["industry"]
        assert row["requiredHerb"] == payload["requiredHerb"]
        assert row["productForm"] == payload["productForm"]
        assert row["estimatedQuantity"] == payload["estimatedQuantity"]
        assert row["requiredSpecifications"] == payload["requiredSpecifications"]
        assert row["additionalMessage"] == payload["additionalMessage"]
        assert row["createdAt"]


def test_submit_enquiry_spam_honeypot():
    payload = valid_payload(website="https://spam.example")
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 400
    assert "detail" in response.json()


def test_submit_enquiry_missing_required_field():
    payload = valid_payload()
    del payload["fullName"]
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 422


def test_submit_enquiry_invalid_email():
    payload = valid_payload(businessEmail="not-an-email")
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 422


def test_submit_enquiry_invalid_industry():
    payload = valid_payload(industry="Invalid Industry")
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 422


def test_submit_enquiry_invalid_product_form():
    payload = valid_payload(productForm="Loose Powder")
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 422


def test_submit_enquiry_phone_too_short():
    payload = valid_payload(phoneNumber="123")
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 422


def test_submit_enquiry_empty_full_name():
    payload = valid_payload(fullName="")
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 422


def test_submit_enquiry_empty_required_specifications():
    payload = valid_payload(requiredSpecifications="")
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 422


def test_submit_enquiry_additional_message_too_long():
    payload = valid_payload(additionalMessage="x" * 501)
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 422


def test_submit_enquiry_estimated_quantity_empty():
    payload = valid_payload(estimatedQuantity="")
    response = client.post("/api/enquiry", json=payload)
    assert response.status_code == 422


def test_cors_preflight():
    response = client.options(
        "/api/enquiry",
        headers={
            "Origin": "https://herbotech.vercel.app",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") in ("*", "https://herbotech.vercel.app")
