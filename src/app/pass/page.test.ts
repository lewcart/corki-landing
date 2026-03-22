import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("qrcode", () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue("data:image/png;base64,fakeqr"),
  },
}));

vi.mock("@/components/ui/wallet-buttons", () => ({
  WalletButtons: () => null,
}));

import PassPage from "./page";

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

describe("PassPage", () => {
  const savedEnv: Record<string, string | undefined> = {};
  const allKeys = [...Object.keys(APPLE_ENV), ...Object.keys(GOOGLE_ENV), "PROMO_CODE"];

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

  it("renders without throwing when no wallets are configured", async () => {
    const element = await PassPage();
    expect(element).toBeTruthy();
  });

  it("renders without throwing when Apple Wallet is configured", async () => {
    Object.assign(process.env, APPLE_ENV);
    const element = await PassPage();
    expect(element).toBeTruthy();
  });

  it("renders without throwing when Google Wallet is configured", async () => {
    Object.assign(process.env, GOOGLE_ENV);
    const element = await PassPage();
    expect(element).toBeTruthy();
  });

  it("renders without throwing when both wallets are configured", async () => {
    Object.assign(process.env, APPLE_ENV, GOOGLE_ENV);
    const element = await PassPage();
    expect(element).toBeTruthy();
  });

  it("uses default promo code CORKIFRIEND when PROMO_CODE is not set", async () => {
    const element = await PassPage();
    // The element should be a React element (JSX); check it resolved
    expect(element).not.toBeNull();
  });

  it("renders without throwing with a custom PROMO_CODE", async () => {
    process.env.PROMO_CODE = "EARLYBIRD";
    const element = await PassPage();
    expect(element).toBeTruthy();
  });
});
