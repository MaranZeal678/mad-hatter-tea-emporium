import { AddToCartButton } from "@/components/AddToCartButton";
import { NewsletterForm } from "@/components/NewsletterForm";
import { formatPrice } from "@/lib/cart";
import { products } from "@/lib/products";

export default function ShopPage() {
  return (
    <div className="space-y-10">
      <section className="max-w-2xl space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-rose">Loose-leaf · small batch</p>
        <h1 className="font-serif text-4xl font-semibold sm:text-5xl">
          Curiously good tea for every unbirthday.
        </h1>
        <p className="text-plum/70">
          Four house blends, steeped in nonsense and packed by hand. Pull up a chair — there&apos;s
          always room at the table.
        </p>
      </section>

      <ul className="grid gap-6 sm:grid-cols-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-plum/10 bg-white/80 shadow-sm"
          >
            <div
              aria-hidden
              className={`h-28 bg-gradient-to-br ${product.swatch} flex items-end px-5 pb-3`}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-plum/60">
                {product.notes}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-xl font-semibold">{product.name}</h2>
                <span className="font-medium tabular-nums">{formatPrice(product.price)}</span>
              </div>
              <p className="flex-1 text-sm text-plum/70">{product.description}</p>
              <div>
                <AddToCartButton product={product} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <NewsletterForm />
    </div>
  );
}
