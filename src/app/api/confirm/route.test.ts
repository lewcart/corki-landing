import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/server with minimal implementations
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
    redirect: (url: URL | string) => ({
      _type: "redirect",
      location: url.toString(),
    }),
  },
}));

// Mock @neondatabase/serverless
const mockSql = vi.fn();
vi.mock("@neondatabase/serverless", () => ({
  neon: vi.fn(() => mockSql),
}));

import { GET } from "./route";
import { NextRequest } from "next/server";

interface MockResponse {
  _type: string;
  data?: Record<string, unknown>;
  status?: number;
  location?: string;
}

const makeReq = (url: string) => new NextRequest(url);

describe("GET /api/confirm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STORAGE_DATABASE_URL = "postgres://test";
  });

  it("redirects to / when no token is provided", async () => {
    const req = makeReq("http://localhost/api/confirm");
    const res = await GET(req);
    expect((res as MockResponse)._type).toBe("redirect");
    expect((res as MockResponse).location).toBe("http://localhost/");
  });

  it("redirects to /welcome?email= on successful confirmation", async () => {
    mockSql.mockResolvedValueOnce([{ email: "test@example.com" }]);
    const req = makeReq("http://localhost/api/confirm?token=valid-token");
    const res = await GET(req);
    expect((res as MockResponse)._type).toBe("redirect");
    expect((res as MockResponse).location).toContain("/welcome");
    expect((res as MockResponse).location).toContain("email=");
    expect((res as MockResponse).location).toContain("example.com");
  });

  it("redirects to /welcome when token is already used or not found", async () => {
    mockSql.mockResolvedValueOnce([]);
    const req = makeReq("http://localhost/api/confirm?token=used-token");
    const res = await GET(req);
    expect((res as MockResponse)._type).toBe("redirect");
    expect((res as MockResponse).location).toBe("http://localhost/welcome");
  });

  it("redirects to / on database error", async () => {
    mockSql.mockRejectedValueOnce(new Error("DB connection failed"));
    const req = makeReq("http://localhost/api/confirm?token=any");
    const res = await GET(req);
    expect((res as MockResponse)._type).toBe("redirect");
    expect((res as MockResponse).location).toBe("http://localhost/");
  });

  it("redirects to / when STORAGE_DATABASE_URL is not set", async () => {
    delete process.env.STORAGE_DATABASE_URL;
    const req = makeReq("http://localhost/api/confirm?token=any");
    const res = await GET(req);
    expect((res as MockResponse)._type).toBe("redirect");
    expect((res as MockResponse).location).toBe("http://localhost/");
  });
});
