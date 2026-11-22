export const dynamic = "force-dynamic";

const subscribers = new Set<string>();

type SubscribeBody = { email?: string; emailAddress?: string };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as SubscribeBody;

  const email = body.emailAddress!.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  subscribers.add(email);
  return Response.json({ ok: true, subscribers: subscribers.size }, { status: 201 });
}
