"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

export const links = [
  { href: "/", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
  { href: "/our-story", label: "Our Story" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="border-b border-plum/10 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75 sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full bg-plum text-lg text-cream shadow-sm"
          >
            ☕
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-plum">
              The Mad Hatter&apos;s
            </span>
            <span className="block text-xs uppercase tracking-[0.2em] text-plum/60">
              Tea Emporium
            </span>
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-1 text-sm">
            {links.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3 py-1.5 transition-colors ${
                      active
                        ? "bg-plum text-cream"
                        : "text-plum/80 hover:bg-plum/10 hover:text-plum"
                    }`}
                  >
                    {link.label}
                    {link.href === "/cart" && (
                      <span
                        className={`ml-1.5 inline-flex min-w-5 justify-center rounded-full px-1.5 text-xs font-semibold ${
                          active ? "bg-cream text-plum" : "bg-gold/30 text-plum"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
