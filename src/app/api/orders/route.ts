import { buildOrder, validateOrder, type Order } from "@/lib/orders";

export const dynamic = "force-dynamic";

const orders: Order[] = [];
let nextOrderNumber = 1043;

const PAYMENT_LATENCY_MS = 600;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  return Response.json({ orders: [...orders].reverse() });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ errors: ["Request body must be valid JSON."] }, { status: 400 });
  }

  const result = validateOrder(body);
  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 400 });
  }

  // Authorise the payment with the processor.
  await wait(PAYMENT_LATENCY_MS);

  const order = buildOrder(result.value, nextOrderNumber++);
  orders.push(order);

  return Response.json({ order }, { status: 201 });
}
