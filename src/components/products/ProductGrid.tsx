import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductSort } from "./MobileSortSheet";

interface ProductGridProps {
  limit?: number;
  sort?: ProductSort;
}

export function ProductGrid({
  limit,
  sort = "featured",
}: ProductGridProps) {
  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "rating":
        return b.rating - a.rating;

      case "featured":
      default:
        return 0;
    }
  });

  const displayedProducts =
    limit !== undefined
      ? sortedProducts.slice(0, limit)
      : sortedProducts;

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