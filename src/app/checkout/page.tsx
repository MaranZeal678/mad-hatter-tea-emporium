import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "Checkout · The Mad Hatter's Tea Emporium" };

export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-semibold">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
