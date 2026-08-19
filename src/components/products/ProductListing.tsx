"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Search } from "lucide-react";

import type { Product } from "@/types/product";
import { getProducts } from "@/lib/api/products";

import {
  ActiveFilterChips,
  MobileFilterSheet,
  MobileProductControls,
  MobileSortSheet,
  ProductFilters,
  ProductGrid,
  ProductListingHeader,
  ProductPagination,
  type ProductSort,
} from "@/components/products";

import type { SelectedFilters } from "./filter-types";

export function ProductListing() {
  const searchParams = useSearchParams();

  const searchQuery =
    searchParams.get("search")?.trim().toLowerCase() ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [sort, setSort] = useState<ProductSort>("featured");

  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFilters>({});

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    const brand = selectedFilters.brand?.[0];
    const category = selectedFilters.category?.[0];
    const availability = selectedFilters.availability?.[0];
    const rating = selectedFilters.rating?.[0];

    if (brand) {
      params.set("brand", brand);
    }

    if (category) {
      params.set("category", category);
    }

    if (availability) {
      params.set("availability", availability);
    }

    if (rating) {
      params.set("rating", rating);
    }

    params.set("sort", sort);
    params.set("page", String(currentPage));
    params.set("limit", "8");

    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await getProducts(params);

        setProducts(response.products);
        setTotalPages(response.pagination.totalPages);
        setTotalProducts(response.pagination.total);
      } catch {
        setProducts([]);
        setTotalPages(1);
        setTotalProducts(0);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [searchQuery, selectedFilters, sort, currentPage]);

  const toggleFilter = (groupId: string, value: string) => {
    setCurrentPage(1);

    setSelectedFilters((current) => {
      const currentValues = current[groupId] ?? [];

      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...current,
        [groupId]: nextValues,
      };
    });
  };

  const clearFilters = () => {
    setCurrentPage(1);
    setSelectedFilters({});
  };

  const handleSortChange = (value: ProductSort) => {
    setCurrentPage(1);
    setSort(value);
  };

  const filterCount = Object.values(selectedFilters).reduce(
    (total, values) => total + values.length,
    0,
  );

  const removeFilter = (groupId: string, value: string) => {
    setCurrentPage(1);

    setSelectedFilters((current) => {
      const currentValues = current[groupId] ?? [];

      const nextValues = currentValues.filter(
        (item) => item !== value,
      );

      if (nextValues.length === 0) {
        const next = { ...current };
        delete next[groupId];

        return next;
      }

      return {
        ...current,
        [groupId]: nextValues,
      };
    });
  };

  const hasSearchResults =
    searchQuery.length > 0 &&
    !loading &&
    products.length === 0;

  return (
    <>
      <ProductListingHeader
        title="All Products"
        description="Explore our collection of PC components, peripherals, and technology products."
        productCount={totalProducts}
        sort={sort}
        onSortChange={handleSortChange}
      />

      {/* Mobile controls */}
      <div className="mt-6 lg:hidden">
        <MobileProductControls
          filterCount={filterCount}
          onFilterClick={() => setFiltersOpen(true)}
          onSortClick={() => setSortOpen(true)}
        />
      </div>

      {/* Active filters */}
      <ActiveFilterChips
        selectedFilters={selectedFilters}
        onRemove={removeFilter}
        onClear={clearFilters}
      />

      {/* Product listing */}
      <div className="mt-8 flex gap-6">
        <ProductFilters
          selectedFilters={selectedFilters}
          onToggle={toggleFilter}
          onClear={clearFilters}
        />

        <div className="min-w-0 flex-1">
          {loading ? (
            <div className="flex min-h-80 items-center justify-center rounded-lg border border-(--border) bg-(--surface)">
              <p className="text-sm text-(--foreground-muted)">
                Loading products...
              </p>
            </div>
          ) : error ? (
            <div className="flex min-h-80 items-center justify-center rounded-lg border border-(--border) bg-(--surface) px-6 text-center">
              <div>
                <h2 className="text-lg font-semibold text-(--foreground)">
                  Something went wrong
                </h2>

                <p className="mt-2 text-sm text-(--foreground-muted)">
                  {error}
                </p>
              </div>
            </div>
          ) : hasSearchResults ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-(--border) bg-(--surface) px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--background)">
                <Search className="h-5 w-5 text-(--foreground-muted)" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-(--foreground)">
                No products found
              </h2>

              <p className="mt-2 max-w-md text-sm text-(--foreground-muted)">
                We couldn&apos;t find any products matching{" "}
                <span className="font-medium text-(--foreground)">
                  &quot;{searchQuery}&quot;
                </span>
                .
              </p>

              <Link
                href="/products"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-(--primary) px-4 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
              >
                Clear Search
              </Link>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}

          {!loading && !error && products.length > 0 && (
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <MobileFilterSheet
        open={filtersOpen}
        selectedFilters={selectedFilters}
        onToggle={toggleFilter}
        onClear={clearFilters}
        onClose={() => setFiltersOpen(false)}
      />

      {/* Mobile sort sheet */}
      <MobileSortSheet
        open={sortOpen}
        value={sort}
        onChange={handleSortChange}
        onClose={() => setSortOpen(false)}
      />
    </>
  );
}