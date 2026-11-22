import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /api/newsletter", () => {
  it("accepts the email field sent by the newsletter form", async () => {
    const response = await POST(
      new Request("http://localhost/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: "tea.tester@example.test" }),
      }),
    );

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toMatchObject({ ok: true });
  });
});
