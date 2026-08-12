import Link from "next/link";

import { products } from "@/data/products";
import {
  Container,
  SectionHeading,
} from "@/components/ui";
import { ProductCard } from "@/components/products";

export function PopularProducts() {
  const popularProducts = products.slice(0, 8);

  return (
    <section className="bg-(--background-secondary) py-12 sm:py-16">
      <Container>
        <SectionHeading
          title="Popular Products"
          description="Some of our most loved components and accessories."
          action={
            <Link
              href="/products"
              className="text-sm font-medium text-(--primary) hover:underline"
            >
              View all
            </Link>
          }
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}