import type { ProductSort } from "./MobileSortSheet";
import { ProductSortMenu } from "./ProductSortMenu";

interface ProductListingHeaderProps {
  title: string;
  description?: string;
  productCount: number;
  sort: ProductSort;
  onSortChange: (value: ProductSort) => void;
}

export function ProductListingHeader({
  title,
  description,
  productCount,
  sort,
  onSortChange,
}: ProductListingHeaderProps) {
  return (
    <div className="flex flex-col gap-5 border-b border-(--border) pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-(--primary)">
          Products
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-(--foreground) sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-(--foreground-secondary)">
            {description}
          </p>
        )}
      </div>

      <div className="hidden shrink-0 items-center gap-3 lg:flex">
        <span className="text-sm text-(--foreground-muted)">
          {productCount} products
        </span>

        <ProductSortMenu value={sort} onChange={onSortChange} />
      </div>
    </div>
  );
}
