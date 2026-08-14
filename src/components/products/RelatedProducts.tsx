import type { Product } from "@/types/product";

import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-(--border) pt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
            You may also like
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-(--foreground) sm:text-2xl">
            Related Products
          </h2>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
