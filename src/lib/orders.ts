export type OrderLine = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  name: string;
  email: string;
  items: OrderLine[];
  itemCount: number;
  total: number;
  createdAt: string;
};

export type NewOrder = {
  name: string;
  email: string;
  items: OrderLine[];
};

export type ValidationResult =
  | { ok: true; value: NewOrder }
  | { ok: false; errors: string[] };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseLine(value: unknown): OrderLine | null {
  if (!isRecord(value)) return null;
  const { productId, name, price, quantity } = value;
  if (typeof productId !== "string" || productId.length === 0) return null;
  if (typeof name !== "string" || name.length === 0) return null;
  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) return null;
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1) {
    return null;
  }
  return { productId, name, price, quantity };
}

export function validateOrder(body: unknown): ValidationResult {
  if (!isRecord(body)) {
    return { ok: false, errors: ["Request body must be a JSON object."] };
  }

  const errors: string[] = [];
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name) errors.push("Name is required.");
  if (!email) {
    errors.push("Email is required.");
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.push("Email must be a valid address.");
  }

  const items: OrderLine[] = [];
  if (!Array.isArray(body.items) || body.items.length === 0) {
    errors.push("Your basket is empty.");
  } else {
    for (const raw of body.items) {
      const line = parseLine(raw);
      if (!line) {
        errors.push("One or more items are invalid.");
        break;
      }
      items.push(line);
    }
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, value: { name, email, items } };
}

export function orderTotal(items: OrderLine[]): number {
  const cents = items.reduce(
    (sum, i) => sum + Math.round(i.price * 100) * i.quantity,
    0,
  );
  return cents / 100;
}

export function buildOrder(input: NewOrder, sequence: number, now = new Date()): Order {
  return {
    id: `TEA-${sequence}`,
    name: input.name,
    email: input.email,
    items: input.items,
    itemCount: input.items.reduce((sum, i) => sum + i.quantity, 0),
    total: orderTotal(input.items),
    createdAt: now.toISOString(),
  };
}
