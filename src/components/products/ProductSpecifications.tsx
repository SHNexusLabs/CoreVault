import type { Product } from "@/types/product";

interface ProductSpecificationsProps {
  product: Product;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const specifications = Object.entries(product.specifications);

  if (specifications.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-(--border) pt-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Specifications
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-(--foreground) sm:text-2xl">
          Technical Details
        </h2>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-(--border)">
        <dl className="divide-y divide-(--border)">
          {specifications.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-1 gap-1 px-4 py-3.5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6"
            >
              <dt className="text-sm font-medium text-(--foreground-muted)">
                {label}
              </dt>

              <dd className="text-sm text-(--foreground)">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
