import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CartProvider } from "./CartProvider";
import { CartView } from "./CartView";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("CartView", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "hatter-cart",
      JSON.stringify([{ productId: "cheshire-chai", name: "Cheshire Chai", price: 11, quantity: 1 }]),
    );
  });

  it("updates the subtotal when quantity changes", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartView />
      </CartProvider>,
    );

    expect(await screen.findByText("Cheshire Chai")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Increase quantity of Cheshire Chai" }));

    expect(screen.getByText("Subtotal:").textContent).toContain("$22.00");
  });
});
