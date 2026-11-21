import { describe, expect, it } from "vitest";
import { addItem, formatPrice, itemCount, setQuantity, subtotal } from "./cart";

const earlGrey = { id: "earl-grey", name: "Earl Grey", price: 12 };
const hibiscus = { id: "hibiscus", name: "Hibiscus", price: 9.75 };

describe("cart", () => {
  it("adds new items and increments existing ones", () => {
    let items = addItem([], earlGrey);
    items = addItem(items, earlGrey);
    items = addItem(items, hibiscus);
    expect(items).toHaveLength(2);
    expect(itemCount(items)).toBe(3);
  });

  it("computes the subtotal without floating point drift", () => {
    let items = addItem([], { id: "a", name: "A", price: 0.1 }, 3);
    items = addItem(items, hibiscus, 2);
    expect(subtotal(items)).toBe(19.8);
  });

  it("removes an item when its quantity drops to zero", () => {
    const items = setQuantity(addItem([], earlGrey, 2), "earl-grey", 0);
    expect(items).toEqual([]);
  });

  it("formats prices as US dollars", () => {
    expect(formatPrice(24)).toBe("$24.00");
  });
});
