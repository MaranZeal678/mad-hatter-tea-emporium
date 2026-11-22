import { fireEvent, render, screen } from "@testing-library/react";
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
    vi.unstubAllGlobals();
    window.localStorage.clear();
  });

  it("ignores duplicate order submissions while the first request is pending", async () => {
    const fetchMock = vi.fn(() => new Promise<Response>(() => {}));
    vi.stubGlobal("fetch", fetchMock);

    render(
      <CartProvider>
        <CheckoutForm />
      </CartProvider>,
    );

    fireEvent.change(await screen.findByLabelText("Name"), { target: { value: "Alice Example" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "alice@example.test" } });

    const button = screen.getByRole("button", { name: "Place order" }) as HTMLButtonElement;
    const form = button.closest("form");
    expect(form).not.toBeNull();

    fireEvent.submit(form!);
    fireEvent.submit(form!);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(button.disabled).toBe(true);
  });
});
