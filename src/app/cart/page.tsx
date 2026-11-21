import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = { title: "Cart · The Mad Hatter's Tea Emporium" };

export default function CartPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-semibold">Your cart</h1>
      <CartView />
    </div>
  );
}
