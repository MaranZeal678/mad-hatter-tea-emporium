"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/cart";
import { useCart } from "./CartProvider";

export function CartView() {
  const { items, subtotal, setQuantity, ready } = useCart();
  const router = useRouter();

  if (!ready) {
    return <p className="text-plum/60">Loading your cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-plum/20 bg-white/60 p-8 text-center">
        <p className="text-plum/70">Your cart is empty. No room! No room!</p>
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-rose underline">
          Browse the teas
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="divide-y divide-plum/10 rounded-2xl border border-plum/10 bg-white/80">
        {items.map((item) => (
          <li key={item.productId} className="flex flex-wrap items-center gap-4 p-4">
            <div className="min-w-40 flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-plum/60">{formatPrice(item.price)} each</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity(item.productId, item.quantity - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
                className="h-8 w-8 rounded-full border border-plum/20 hover:bg-plum/10"
              >
                −
              </button>
              <span className="w-6 text-center tabular-nums" aria-label={`Quantity of ${item.name}`}>
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(item.productId, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.name}`}
                className="h-8 w-8 rounded-full border border-plum/20 hover:bg-plum/10"
              >
                +
              </button>
            </div>
            <p className="w-20 text-right font-medium tabular-nums">
              {formatPrice(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-end gap-4">
        <p className="text-lg">
          Subtotal: <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
        </p>
        <button
          type="button"
          onClick={() => router.push("/checkout")}
          className="rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream shadow-sm hover:bg-plum/90"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
