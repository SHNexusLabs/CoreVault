import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductGridProps {
  limit?: number;
}

export function ProductGrid({ limit }: ProductGridProps) {
  const displayedProducts =
    limit !== undefined ? products.slice(0, limit) : products;

  if (displayedProducts.length === 0) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-(--radius-lg) border border-dashed border-(--border) bg-(--surface)">
        <div className="text-center">
          <h2 className="text-sm font-semibold text-(--foreground)">
            No products found
          </h2>

          <p className="mt-1 text-xs text-(--foreground-muted)">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}