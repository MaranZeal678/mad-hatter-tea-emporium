"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(product);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
      }}
      aria-label={`Add ${product.name} to cart`}
      className="rounded-full bg-plum px-4 py-2 text-sm font-medium text-cream shadow-sm transition hover:bg-plum/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
