import Link from "next/link";
import Image from "next/image";

import { dealService } from "@/services/dealService";

export default function DealsPage() {
  const deals = dealService.getAll();

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
            Deals
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-(--foreground)">
            Today&apos;s Deals
          </h1>

          <p className="mt-3 text-sm leading-6 text-(--foreground-muted)">
            Save more on selected PC components and technology products.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => {
            const product = deal.product;

            if (!product) {
              return null;
            }

            const discountedPrice = Math.round(
              product.price * (1 - deal.discountPercent / 100),
            );

            return (
              <Link
                key={deal.id}
                href={`/products/${product.slug}`}
                className="group overflow-hidden rounded-xl border border-(--border) bg-(--background) transition-colors hover:border-(--primary)"
              >
                <div className="relative flex aspect-square items-center justify-center bg-(--surface)">
                  <span className="absolute left-4 top-4 z-10 rounded-md bg-(--primary) px-2.5 py-1 text-xs font-semibold text-(--primary-foreground)">
                    {deal.badge}
                  </span>

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="h-full w-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-(--foreground-muted)">
                    {product.brand}
                  </p>

                  <h2 className="mt-1 line-clamp-2 text-base font-semibold text-(--foreground)">
                    {product.name}
                  </h2>

                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-xl font-bold text-(--foreground)">
                      ₹{discountedPrice.toLocaleString("en-IN")}
                    </span>

                    <span className="text-sm text-(--foreground-muted) line-through">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-medium text-(--primary)">
                    Save ₹
                    {(product.price - discountedPrice).toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {deals.length === 0 && (
          <div className="mt-10 rounded-lg border border-(--border) bg-(--surface) p-10 text-center">
            <p className="text-sm text-(--foreground-muted)">
              No deals are available right now.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
