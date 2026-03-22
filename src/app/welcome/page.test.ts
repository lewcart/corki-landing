import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/components/ui/wallet-buttons", () => ({
  WalletButtons: () => null,
}));

// next/link is used in WelcomePage — provide a minimal mock
vi.mock("next/link", () => ({
  default: ({ children }: { children: unknown }) => children,
}));

import WelcomePage from "./page";

const APPLE_ENV = {
  APPLE_TEAM_ID: "TEAMID",
  APPLE_PASS_TYPE_ID: "pass.test",
  APPLE_PASS_CERT: "Y2VydA==",
  APPLE_PASS_KEY: "a2V5",
  APPLE_WWDR_CERT: "d3dkcg==",
};

const GOOGLE_ENV = {
  GOOGLE_ISSUER_ID: "issuer",
  GOOGLE_CLASS_ID: "class",
  GOOGLE_SERVICE_ACCOUNT_EMAIL: "svc@example.iam.gserviceaccount.com",
  GOOGLE_SERVICE_ACCOUNT_KEY: "a2V5",
};

describe("WelcomePage", () => {
  const savedEnv: Record<string, string | undefined> = {};
  const allKeys = [...Object.keys(APPLE_ENV), ...Object.keys(GOOGLE_ENV)];

  beforeEach(() => {
    for (const key of allKeys) {
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

  it("renders without throwing when no wallets are configured", () => {
    const element = WelcomePage();
    expect(element).toBeTruthy();
  });

  it("renders without throwing when Apple Wallet is configured", () => {
    Object.assign(process.env, APPLE_ENV);
    const element = WelcomePage();
    expect(element).toBeTruthy();
  });

  it("renders without throwing when Google Wallet is configured", () => {
    Object.assign(process.env, GOOGLE_ENV);
    const element = WelcomePage();
    expect(element).toBeTruthy();
  });

  it("renders without throwing when both wallets are configured", () => {
    Object.assign(process.env, APPLE_ENV, GOOGLE_ENV);
    const element = WelcomePage();
    expect(element).toBeTruthy();
  });

  it("returns a React element (JSX) with correct root type", () => {
    const element = WelcomePage();
    // Root element should be a <main>
    expect((element as { type: string }).type).toBe("main");
  });
});
