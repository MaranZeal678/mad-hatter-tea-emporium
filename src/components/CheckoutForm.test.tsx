import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CartProvider } from "./CartProvider";
import { CheckoutForm } from "./CheckoutForm";

describe("CheckoutForm", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "hatter-cart",
      JSON.stringify([{ productId: "cheshire-chai", name: "Cheshire Chai", price: 11, quantity: 1 }]),
    );
  });

  afterEach(() => {
    window.localStorage.clear();
    vi.unstubAllGlobals();
  });

  it("submits only one order while a placement is already pending", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn(() => new Promise<Response>(() => {}));
    vi.stubGlobal("fetch", fetchMock);

    render(
      <CartProvider>
        <CheckoutForm />
      </CartProvider>,
    );

    await user.type(await screen.findByLabelText("Name"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test.user@example.test");

    const button = screen.getByRole("button", { name: "Place order" });
    const form = button.closest("form");
    if (!form) throw new Error("Expected checkout form");

    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect((screen.getByRole("button", { name: "Placing order…" }) as HTMLButtonElement).disabled).toBe(
        true,
      ),
    );
  });
});
