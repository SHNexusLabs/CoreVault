import { ChevronDown } from "lucide-react";

interface ProductListingHeaderProps {
  title: string;
  description?: string;
  productCount: number;
}

export function ProductListingHeader({
  title,
  description,
  productCount,
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

      <div className="flex shrink-0 items-center gap-3">
        <span className="text-sm text-(--foreground-muted)">
          {productCount} products
        </span>

        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-(--border) bg-(--surface) px-3 text-sm font-medium text-(--foreground) transition-colors hover:border-(--primary) hover:text-(--primary)"
        >
          Sort: Featured
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}