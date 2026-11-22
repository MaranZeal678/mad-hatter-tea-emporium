"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/cart";
import type { Order } from "@/lib/orders";
import { track } from "@/lib/analytics";

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; orders: Order[] };

export function OrderList() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const timer = setTimeout(() => track("orders_viewed"), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/orders", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ orders: Order[] }>;
      })
      .then((data) => {
        if (!cancelled) setState({ status: "ready", orders: data.orders });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <p className="text-plum/60">Fetching orders…</p>;
  }

  if (state.status === "error") {
    return <p className="text-rose">We couldn&apos;t load orders right now.</p>;
  }

  if (state.orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-plum/20 bg-white/60 p-8 text-center">
        <p className="text-plum/70">No orders yet. Why is a raven like a writing desk?</p>
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-rose underline">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-plum/10 bg-white/80">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-plum/10 text-xs uppercase tracking-wider text-plum/60">
          <tr>
            <th className="px-4 py-3 font-medium">Order</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Items</th>
            <th className="px-4 py-3 text-right font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Placed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-plum/10">
          {state.orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3 font-medium">#{order.id}</td>
              <td className="px-4 py-3">
                <div>{order.name}</div>
                <div className="text-xs text-plum/60">{order.email}</div>
              </td>
              <td className="px-4 py-3">
                {order.items.map((i) => `${i.name} × ${i.quantity}`).join(", ")}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">{formatPrice(order.total)}</td>
              <td className="px-4 py-3 text-plum/60">
                {new Date(order.createdAt).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
