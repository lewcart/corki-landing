import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

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
  },
}));

vi.mock("fs", () => ({
  default: {
    readFileSync: vi.fn(() => Buffer.from("fake-image-data")),
  },
  readFileSync: vi.fn(() => Buffer.from("fake-image-data")),
}));

// Shared mock for getAsBuffer so individual tests can control its behavior
const mockGetAsBuffer = vi.fn();

vi.mock("passkit-generator", () => ({
  PKPass: class MockPKPass {
    type = "";
    primaryFields: unknown[] = [];
    secondaryFields: unknown[] = [];
    backFields: unknown[] = [];
    constructor(_files: unknown, _certs: unknown) {}
    getAsBuffer = mockGetAsBuffer;
  },
}));

import { GET } from "./route";
import { NextRequest } from "next/server";

interface MockJsonResponse {
  _type: string;
  data: Record<string, unknown>;
  status: number;
}

const makeReq = (url: string) => new NextRequest(url);

const APPLE_ENV = {
  APPLE_TEAM_ID: "TEAMID123",
  APPLE_PASS_TYPE_ID: "pass.com.example.test",
  APPLE_PASS_CERT: Buffer.from("fake-cert").toString("base64"),
  APPLE_PASS_KEY: Buffer.from("fake-key").toString("base64"),
  APPLE_WWDR_CERT: Buffer.from("fake-wwdr").toString("base64"),
};

describe("GET /api/wallet/apple", () => {
  const savedEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    vi.clearAllMocks();
    for (const key of Object.keys(APPLE_ENV)) {
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

  it("returns 503 when Apple Wallet env vars are missing", async () => {
    const req = makeReq("http://localhost/api/wallet/apple");
    const res = await GET(req);
    expect((res as MockJsonResponse).status).toBe(503);
    expect((res as MockJsonResponse).data.error).toBe("Apple Wallet not configured");
    expect((res as MockJsonResponse).data.missing).toContain("APPLE_TEAM_ID");
  });

  it("returns 503 listing only the vars that are missing", async () => {
    process.env.APPLE_TEAM_ID = "TEAMID";
    const req = makeReq("http://localhost/api/wallet/apple");
    const res = await GET(req);
    expect((res as MockJsonResponse).status).toBe(503);
    expect((res as MockJsonResponse).data.missing).not.toContain("APPLE_TEAM_ID");
    expect((res as MockJsonResponse).data.missing).toContain("APPLE_PASS_TYPE_ID");
  });

  it("returns 500 when PKPass throws an error", async () => {
    Object.assign(process.env, APPLE_ENV);
    mockGetAsBuffer.mockRejectedValueOnce(new Error("signing failed"));
    const req = makeReq("http://localhost/api/wallet/apple");
    const res = await GET(req);
    expect((res as MockJsonResponse).status).toBe(500);
    expect((res as MockJsonResponse).data.error).toBe("Failed to generate pass");
  });

  it("returns pkpass with correct content-type on success", async () => {
    Object.assign(process.env, APPLE_ENV);
    const fakeBuffer = Buffer.from("PK\x03\x04fake-pkpass-content");
    mockGetAsBuffer.mockResolvedValueOnce(fakeBuffer);
    const req = makeReq("http://localhost/api/wallet/apple");
    const res = await GET(req);
    expect((res as Response).status).toBe(200);
    const contentType = (res as Response).headers.get("Content-Type");
    expect(contentType).toBe("application/vnd.apple.pkpass");
  });

  it("includes content-disposition attachment header on success", async () => {
    Object.assign(process.env, APPLE_ENV);
    const fakeBuffer = Buffer.from("PK\x03\x04fake-pkpass-content");
    mockGetAsBuffer.mockResolvedValueOnce(fakeBuffer);
    const req = makeReq("http://localhost/api/wallet/apple");
    const res = await GET(req);
    const disposition = (res as Response).headers.get("Content-Disposition");
    expect(disposition).toContain("attachment");
    expect(disposition).toContain("corki.pkpass");
  });
});
