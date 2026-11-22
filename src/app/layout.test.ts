import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("RootLayout footer links", () => {
  it("links shipping and returns to the existing shipping page", () => {
    const layoutSource = readFileSync("src/app/layout.tsx", "utf8");

    expect(layoutSource).toContain('href="/shipping"');
    expect(layoutSource).not.toContain('href="/shipping-returns"');
  });
});
