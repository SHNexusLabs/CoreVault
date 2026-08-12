import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

import { products } from "@/data/products";
import { Container, SectionHeading } from "@/components/ui";
import { ProductCard } from "@/components/products";

export function DealsSection() {
  const dealProducts = products.filter(
    (product) => product.originalPrice,
  );

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          title="Deals & Offers"
          description="Save more on selected technology products."
          action={
            <Link
              href="/products?filter=deals"
              className="hidden items-center gap-1 text-sm font-medium text-(--primary) hover:underline sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        {/* Deal banner */}
        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-(--border) bg-(--surface) px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-(--discount-soft) text-(--discount)">
              <Clock3 className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-(--foreground)">
                Limited-time offers
              </p>

              <p className="text-xs text-(--foreground-muted)">
                Grab selected products before the offer ends.
              </p>
            </div>
          </div>

          <span className="text-xs font-medium text-(--discount)">
            Deals updated regularly
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {dealProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <Link
          href="/products?filter=deals"
          className="mt-5 flex items-center justify-center gap-1 text-sm font-medium text-(--primary) sm:hidden"
        >
          View all deals
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Container>
    </section>
  );
}