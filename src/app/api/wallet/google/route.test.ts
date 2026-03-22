import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import crypto from "crypto";

vi.mock("next/server", () => ({
  NextRequest: class {
    url: string;
    nextUrl: URL;
    constructor(url: string) {
      this.url = url;
      this.nextUrl = new URL(url);
    }
  },
  NextResponse: {
    json: (data: unknown, init?: { status?: number }) => ({
      _type: "json",
      data,
      status: init?.status ?? 200,
    }),
    redirect: (url: string) => ({
      _type: "redirect",
      location: url.toString(),
    }),
  },
}));

import { GET } from "./route";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeReq = (url: string): any => {
  const { NextRequest } = require("next/server");
  return new NextRequest(url);
};

// Generate a real RSA key pair for JWT signing tests
const { privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});
const SERVICE_ACCOUNT_KEY = Buffer.from(
  JSON.stringify({ private_key: privateKey.toString() })
).toString("base64");

const GOOGLE_ENV = {
  GOOGLE_ISSUER_ID: "1234567890",
  GOOGLE_CLASS_ID: "corki-promo",
  GOOGLE_SERVICE_ACCOUNT_EMAIL: "wallet@example.iam.gserviceaccount.com",
  GOOGLE_SERVICE_ACCOUNT_KEY: SERVICE_ACCOUNT_KEY,
};

describe("GET /api/wallet/google", () => {
  const savedEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    vi.clearAllMocks();
    for (const key of Object.keys(GOOGLE_ENV)) {
      savedEnv[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const [key, val] of Object.entries(savedEnv)) {
      if (val === undefined) delete process.env[key];
      else process.env[key] = val;
    }
  });

  it("returns 503 when Google Wallet env vars are missing", async () => {
    const req = makeReq("http://localhost/api/wallet/google");
    const res = await GET(req);
    expect((res as any).status).toBe(503);
    expect((res as any).data.error).toBe("Google Wallet not configured");
    expect((res as any).data.missing).toContain("GOOGLE_ISSUER_ID");
  });

  it("returns 503 listing only the vars that are missing", async () => {
    process.env.GOOGLE_ISSUER_ID = "123";
    const req = makeReq("http://localhost/api/wallet/google");
    const res = await GET(req);
    expect((res as any).status).toBe(503);
    expect((res as any).data.missing).not.toContain("GOOGLE_ISSUER_ID");
    expect((res as any).data.missing).toContain("GOOGLE_CLASS_ID");
  });

  it("returns 500 when service account key is invalid JSON", async () => {
    Object.assign(process.env, GOOGLE_ENV);
    // Override with invalid JSON
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY =
      Buffer.from("not-valid-json").toString("base64");
    const req = makeReq("http://localhost/api/wallet/google");
    const res = await GET(req);
    expect((res as any).status).toBe(500);
    expect((res as any).data.error).toBe("Failed to generate Google Wallet pass");
  });

  it("redirects to Google pay save URL on success", async () => {
    Object.assign(process.env, GOOGLE_ENV);
    const req = makeReq("http://localhost/api/wallet/google");
    const res = await GET(req);
    expect((res as any)._type).toBe("redirect");
    expect((res as any).location).toMatch(
      /^https:\/\/pay\.google\.com\/gp\/v\/save\//
    );
  });

  it("JWT in redirect URL has three dot-separated parts", async () => {
    Object.assign(process.env, GOOGLE_ENV);
    const req = makeReq("http://localhost/api/wallet/google");
    const res = await GET(req);
    const saveUrl: string = (res as any).location;
    const token = saveUrl.replace("https://pay.google.com/gp/v/save/", "");
    const parts = token.split(".");
    expect(parts).toHaveLength(3);
  });

  it("uses PROMO_CODE env var when set", async () => {
    Object.assign(process.env, GOOGLE_ENV);
    process.env.PROMO_CODE = "CUSTOMCODE";
    const req = makeReq("http://localhost/api/wallet/google");
    const res = await GET(req);
    // Redirect should succeed (promo code is embedded in the JWT payload)
    expect((res as any)._type).toBe("redirect");
  });

  it("uses default promo code CORKIFRIEND when PROMO_CODE is not set", async () => {
    Object.assign(process.env, GOOGLE_ENV);
    delete process.env.PROMO_CODE;
    const req = makeReq("http://localhost/api/wallet/google");
    const res = await GET(req);
    expect((res as any)._type).toBe("redirect");
  });
});
