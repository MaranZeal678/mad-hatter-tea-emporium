"use client";

import { useRef, useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const sending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <section className="rounded-2xl border border-plum/10 bg-white/80 p-6 sm:p-8">
      <h2 className="font-serif text-2xl font-semibold">Join the tea party</h2>
      <p className="mt-1 text-sm text-plum/70">New blends and unbirthday offers, once a month.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-full border border-plum/20 bg-cream px-4 py-2.5 text-sm outline-none focus:border-plum"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-plum px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-plum/90 disabled:opacity-60"
        >
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "done" && <p className="mt-3 text-sm text-plum">You&apos;re on the guest list. 🎩</p>}
      {status === "error" && <p className="mt-3 text-sm text-rose">Something went wrong. Please try again.</p>}
    </section>
  );
}
