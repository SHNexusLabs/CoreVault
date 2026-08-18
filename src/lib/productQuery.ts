export function parsePositiveNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined;
  }

  return parsed;
}

export function parsePositiveInteger(
  value: string | null,
  fallback: number,
): number {
  if (value === null || value.trim() === "") {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

export type Availability = "in-stock" | "out-of-stock";

export function parseAvailability(
  value: string | null,
): Availability | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "in-stock" || normalized === "out-of-stock") {
    return normalized;
  }

  return undefined;
}

export function parseOptionalString(
  value: string | null,
): string | undefined {
  const normalized = value?.trim().toLowerCase();

  return normalized || undefined;
}

import type { ProductQuery } from "@/services/productService";

export function parseProductQuery(
  searchParams: URLSearchParams,
): ProductQuery {
  const minPrice = parsePositiveNumber(
    searchParams.get("minPrice"),
  );

  const maxPrice = parsePositiveNumber(
    searchParams.get("maxPrice"),
  );

  const rating = parsePositiveNumber(
    searchParams.get("rating"),
  );

  const page = parsePositiveInteger(
    searchParams.get("page"),
    1,
  );

  const limit = Math.min(
    50,
    parsePositiveInteger(
      searchParams.get("limit"),
      8,
    ),
  );

  return {
    search: parseOptionalString(searchParams.get("search")),
    category: parseOptionalString(searchParams.get("category")),
    brand: parseOptionalString(searchParams.get("brand")),
    availability: parseAvailability(
      searchParams.get("availability"),
    ),
    minPrice,
    maxPrice,
    rating,
    page,
    limit,
  };
}