import { describe, expect, it } from "vitest";
import { buildOrder, validateOrder } from "./orders";

const line = { productId: "earl-grey", name: "Earl Grey", price: 12, quantity: 2 };

describe("validateOrder", () => {
  it("accepts a complete order and trims fields", () => {
    const result = validateOrder({ name: " Alice ", email: "alice@example.com", items: [line] });
    expect(result).toEqual({
      ok: true,
      value: { name: "Alice", email: "alice@example.com", items: [line] },
    });
  });

  it("rejects missing name, bad email and empty items", () => {
    const result = validateOrder({ name: "", email: "not-an-email", items: [] });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual([
        "Name is required.",
        "Email must be a valid address.",
        "Your basket is empty.",
      ]);
    }
  });

  it("rejects malformed items and non-object bodies", () => {
    expect(validateOrder({ name: "A", email: "a@b.co", items: [{ quantity: 0 }] }).ok).toBe(false);
    expect(validateOrder(null).ok).toBe(false);
  });
});

describe("buildOrder", () => {
  it("assigns the id and totals", () => {
    const order = buildOrder(
      { name: "Alice", email: "alice@example.com", items: [line] },
      1043,
      new Date("2026-01-01T00:00:00Z"),
    );
    expect(order).toMatchObject({ id: "TEA-1043", itemCount: 2, total: 24 });
  });
});
