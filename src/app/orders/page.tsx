import type { Metadata } from "next";
import { OrderList } from "@/components/OrderList";

export const metadata: Metadata = { title: "Orders · The Mad Hatter's Tea Emporium" };

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-semibold">Orders</h1>
      <OrderList />
    </div>
  );
}
