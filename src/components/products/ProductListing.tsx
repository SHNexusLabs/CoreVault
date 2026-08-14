"use client";

import { useMemo, useState } from "react";

import {
  MobileFilterSheet,
  MobileProductControls,
  MobileSortSheet,
  ProductFilters,
  ProductGrid,
  type ProductSort,
} from "@/components/products";

export function ProductListing() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [sort, setSort] =
    useState<ProductSort>("featured");

  const filterCount = 0;

  const sortLabel = useMemo(() => {
    switch (sort) {
      case "price-low":
        return "Price: Low to High";

      case "price-high":
        return "Price: High to Low";

      case "rating":
        return "Customer Rating";

      default:
        return "Featured";
    }
  }, [sort]);

  return (
    <>
      <div className="mt-6 lg:hidden">
        <MobileProductControls
          filterCount={filterCount}
          onFilterClick={() => setFiltersOpen(true)}
          onSortClick={() => setSortOpen(true)}
        />

        <p className="mt-2 text-right text-xs text-(--foreground-muted)">
          Sort: {sortLabel}
        </p>
      </div>

      <div className="mt-8 flex gap-6">
        <ProductFilters />

        <div className="min-w-0 flex-1">
          <ProductGrid sort={sort} />
        </div>
      </div>

      <MobileFilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />

      <MobileSortSheet
        open={sortOpen}
        value={sort}
        onChange={setSort}
        onClose={() => setSortOpen(false)}
      />
    </>
  );
}