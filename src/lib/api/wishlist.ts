import type { Product } from "@/types/product";

import { apiClient } from "./client";

export function getWishlist(): Promise<{
  products: Product[];
}> {
  return apiClient<{ products: Product[] }>("/users/me/wishlist");
}

export function addToWishlist(productId: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>("/users/me/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
}

export function removeFromWishlist(
  productId: string,
): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/users/me/wishlist/${productId}`, {
    method: "DELETE",
  });
}
