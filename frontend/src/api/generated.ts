// GENERATED from contract/openapi.yaml by AgentForge. Do not edit: regenerate from the contract instead.


const BASE_URL: string = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";
const TOKEN_KEY = "app.token";

// Storage can be unavailable (sandboxed preview iframes, private mode): fall back to memory.
let memoryToken: string | null = null;
export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY) ?? memoryToken; } catch { return memoryToken; }
}
export function setToken(token: string | null): void {
  memoryToken = token;
  try { if (token) localStorage.setItem(TOKEN_KEY, token); else localStorage.removeItem(TOKEN_KEY); } catch { /* memory only */ }
}

/** Error from the API: `status` is the HTTP status (0 = network failure), `message` is the server's detail. */
export class ApiError extends Error {
  readonly status: number;
  readonly detail: unknown;
  constructor(status: number, message: string, detail?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

function detailMessage(detail: unknown, status: number): string {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((d) => (d && typeof d === "object" && "msg" in d ? String((d as { msg: unknown }).msg) : String(d))).join("; ");
  return `Request failed (HTTP ${status})`;
}

async function request<T>(method: string, path: string, opts: { body?: unknown; query?: object; auth: boolean }): Promise<T> {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(opts.query ?? {}) as [string, unknown][]) if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  const token = getToken();
  if (opts.auth && token) headers.Authorization = `Bearer ${token}`;
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}${qs.toString() ? `?${qs}` : ""}`, {
      method, headers, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Cannot reach the server. Check your connection and try again.");
  }
  const text = await res.text();
  let data: unknown = undefined;
  try { data = text ? JSON.parse(text) : undefined; } catch { data = text; }
  if (!res.ok) {
    const detail = data && typeof data === "object" && "detail" in data ? (data as { detail: unknown }).detail : data;
    if (res.status === 401) setToken(null);
    throw new ApiError(res.status, detailMessage(detail, res.status), detail);
  }
  return data as T;
}

export interface PostEnquiryRequest {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  industry: "Ayurveda" | "Nutraceuticals" | "Cosmetics" | "Herbal Teas" | "Botanical Extracts" | "Herbal Wellness Brands" | "Other";
  requiredHerb: string;
  productForm: "Cleaned and Graded Whole Herbs" | "Cut and Sifted Herbs" | "Herbal Powders";
  estimatedQuantity: string;
  requiredSpecifications: string;
  additionalMessage: string;
}

export interface PostEnquiryResponse {
  message: string;
  enquiryId: number;
}

export interface GetHealthResponse {
  status?: string;
}


export const api = {
  /** POST /api/enquiry - Submit a business enquiry */
  postEnquiry: (body: PostEnquiryRequest): Promise<PostEnquiryResponse> =>
    request<PostEnquiryResponse>("POST", `/api/enquiry`, { body, auth: false }),
  /** GET /api/health - Health check endpoint */
  getHealth: (): Promise<GetHealthResponse> =>
    request<GetHealthResponse>("GET", `/api/health`, { auth: false }),
};


/** Every contract operation (used by AgentForge checks). */
export const endpoints = [
  { name: "postEnquiry", method: "POST", path: "/api/enquiry", auth: false },
  { name: "getHealth", method: "GET", path: "/api/health", auth: false },
] as const;
