import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Mad Hatter's Tea Emporium",
  description: "Curiously good loose-leaf teas, blended for every unbirthday.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
            {children}
          </main>
          <footer className="border-t border-plum/10 py-6 text-center text-xs text-plum/60">
            <nav aria-label="Footer" className="mb-2 flex justify-center gap-4">
              <Link href="/shipping-returns" className="underline-offset-2 hover:underline">
                Shipping &amp; returns
              </Link>
              <Link href="/orders" className="underline-offset-2 hover:underline">
                Track an order
              </Link>
            </nav>
            © The Mad Hatter&apos;s Tea Emporium · It&apos;s always six o&apos;clock here.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
