import { describe, it, expect } from "vitest";

import PrivacyPage from "./page";

describe("PrivacyPage", () => {
  it("renders without throwing", () => {
    const element = PrivacyPage();
    expect(element).toBeTruthy();
  });

  it("returns a React element", () => {
    const element = PrivacyPage();
    expect(element).not.toBeNull();
    expect(typeof element).toBe("object");
  });

  it("exports correct metadata title", async () => {
    const mod = await import("./page");
    expect(mod.metadata.title).toBe("Privacy Policy — Corki");
  });

  it("exports correct metadata description", async () => {
    const mod = await import("./page");
    expect(mod.metadata.description).toContain("collects");
  });
});
