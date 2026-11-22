"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { formatPrice } from "@/lib/cart";
import type { Order } from "@/lib/orders";
import { useCart } from "./CartProvider";

export function CheckoutForm() {
  const { items, subtotal, clear, ready } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const placingOrder = useRef(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState<Order[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (placingOrder.current) return;

    placingOrder.current = true;
    setPending(true);
    setErrors([]);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, items }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors ?? ["Something went wrong. Please try again."]);
        return;
      }

      setConfirmed((current) => [...current, data.order]);
      clear();
    } catch {
      setErrors(["We couldn't reach the shop. Please try again."]);
    } finally {
      placingOrder.current = false;
      setPending(false);
    }
  }

  if (!ready) {
    return <p className="text-plum/60">Loading your cart…</p>;
  }

  return (
    <div className="space-y-8">
      {confirmed.length > 0 && (
        <section aria-label="Order confirmation" className="space-y-3">
          {confirmed.map((order) => (
            <div
              key={order.id}
              role="status"
              className="rounded-2xl border border-sage/30 bg-sage/10 p-5"
            >
              <p className="font-serif text-lg font-semibold">
                Order #{order.id} confirmed — {order.itemCount}{" "}
                {order.itemCount === 1 ? "item" : "items"}, {formatPrice(order.total)}
              </p>
              <p className="mt-1 text-sm text-plum/70">
                A receipt is on its way to {order.email}. Do mind the dormouse.
              </p>
            </div>
          ))}
          {items.length === 0 && (
            <div className="flex gap-4 pt-2 text-sm font-medium">
              <Link href="/orders" className="text-rose underline">
                View all orders
              </Link>
              <Link href="/" className="text-rose underline">
                Continue shopping
              </Link>
            </div>
          )}
        </section>
      )}

      {items.length === 0 && confirmed.length === 0 && (
        <div className="rounded-2xl border border-dashed border-plum/20 bg-white/60 p-8 text-center">
          <p className="text-plum/70">There&apos;s nothing in your cart to check out.</p>
          <Link href="/" className="mt-4 inline-block text-sm font-medium text-rose underline">
            Browse the teas
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div className="grid gap-8 md:grid-cols-[1fr_20rem]">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-plum/10 bg-white/80 p-6"
          >
            <h2 className="font-serif text-xl font-semibold">Your details</h2>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">Name</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-plum/20 bg-white px-3 py-2 outline-none focus:border-plum focus:ring-2 focus:ring-gold/40"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-plum/20 bg-white px-3 py-2 outline-none focus:border-plum focus:ring-2 focus:ring-gold/40"
              />
            </label>

            {errors.length > 0 && (
              <ul role="alert" className="space-y-1 rounded-lg bg-rose/10 p-3 text-sm text-rose">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream shadow-sm transition hover:bg-plum/90 disabled:cursor-not-allowed disabled:bg-plum/60"
            >
              {pending ? "Placing order…" : "Place order"}
            </button>
            <p className="text-center text-xs text-plum/50">
              Demo store — no real payment is taken.
            </p>
          </form>

          <aside className="h-fit space-y-4 rounded-2xl border border-plum/10 bg-white/80 p-6">
            <h2 className="font-serif text-xl font-semibold">Order summary</h2>
            <ul className="space-y-2 text-sm">
              {items.map((item) => (
                <li key={item.productId} className="flex justify-between gap-4">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-plum/10 pt-3 font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
