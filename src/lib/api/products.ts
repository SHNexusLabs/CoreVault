import type { Product } from "@/types/product";

export interface ProductListResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getProducts(
  params: URLSearchParams,
): Promise<ProductListResponse> {
  const response = await fetch(`/api/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}