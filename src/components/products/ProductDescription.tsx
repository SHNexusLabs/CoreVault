import type { Product } from "@/types/product";

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <section className="mt-12 border-t border-(--border) pt-10">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Overview
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-(--foreground) sm:text-2xl">
          About this product
        </h2>

        <p className="mt-5 text-sm leading-7 text-(--foreground-secondary)">
          {product.description}
        </p>
      </div>
    </section>
  );
}
