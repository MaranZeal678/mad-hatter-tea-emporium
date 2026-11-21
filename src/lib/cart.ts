export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export function addItem(
  items: CartItem[],
  product: { id: string; name: string; price: number },
  quantity = 1,
): CartItem[] {
  const existing = items.find((i) => i.productId === product.id);
  if (existing) {
    return items.map((i) =>
      i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i,
    );
  }
  return [
    ...items,
    { productId: product.id, name: product.name, price: product.price, quantity },
  ];
}

export function setQuantity(
  items: CartItem[],
  productId: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return items.filter((i) => i.productId !== productId);
  }
  return items.map((i) => (i.productId === productId ? { ...i, quantity } : i));
}

export function itemCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function subtotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + Math.round(i.price * 100) * i.quantity, 0);
}

export function subtotal(items: CartItem[]): number {
  return subtotalCents(items) / 100;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
