"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Search } from "lucide-react";

import { productService } from "@/services/productService";
import { searchProducts } from "@/lib/search";

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

const products = productService.getAll();

export function ProductListing() {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim().toLowerCase() ?? "";

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [sort, setSort] = useState<ProductSort>("featured");

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

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

  const filteredProducts = useMemo(() => {
    const searchResults = searchProducts(products, searchQuery);

    return searchResults.filter((product) => {
      const brandFilters = selectedFilters.brand ?? [];
      const categoryFilters = selectedFilters.category ?? [];
      const availabilityFilters = selectedFilters.availability ?? [];
      const ratingFilters = selectedFilters.rating ?? [];

      const matchesBrand =
        brandFilters.length === 0 ||
        brandFilters.includes(product.brand.toLowerCase());

      const matchesCategory =
        categoryFilters.length === 0 ||
        categoryFilters.includes(product.category);

      const matchesAvailability =
        availabilityFilters.length === 0 ||
        availabilityFilters.some((filter) => {
          if (filter === "in-stock") {
            return product.inStock;
          }

          if (filter === "out-of-stock") {
            return !product.inStock;
          }

          return true;
        });

      const matchesRating =
        ratingFilters.length === 0 ||
        ratingFilters.some((filter) => product.rating >= Number(filter));

      return (
        matchesBrand && matchesCategory && matchesAvailability && matchesRating
      );
    });
  }, [searchQuery, selectedFilters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
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
  }, [filteredProducts, sort]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const hasSearchResults =
    searchQuery.length > 0 && filteredProducts.length === 0;

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

      const nextValues = currentValues.filter((item) => item !== value);

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

  return (
    <>
      <ProductListingHeader
        title="All Products"
        description="Explore our collection of PC components, peripherals, and technology products."
        productCount={filteredProducts.length}
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
          {hasSearchResults ? (
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
            <ProductGrid products={paginatedProducts} />
          )}

          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
