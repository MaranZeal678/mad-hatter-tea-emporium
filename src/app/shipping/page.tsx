import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping & returns · The Mad Hatter's Tea Emporium" };

export default function ShippingPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="font-serif text-3xl font-semibold">Shipping &amp; returns</h1>
      <p className="text-plum/70">
        Every order is packed by hand and ships within two working days. Unopened tins can be returned within
        thirty days, no questions asked (well, perhaps one riddle).
      </p>
    </div>
  );
}
