import type { Address } from "@/types/order";

import { apiClient } from "./client";

export function getAddresses(): Promise<{
  addresses: Address[];
}> {
  return apiClient<{ addresses: Address[] }>("/users/me/addresses");
}

export function createAddress(
  address: Omit<Address, "id">,
): Promise<{ address: Address }> {
  return apiClient<{ address: Address }>("/users/me/addresses", {
    method: "POST",
    body: JSON.stringify(address),
  });
}

export function updateAddress(
  id: string,
  address: Omit<Address, "id">,
): Promise<{ address: Address }> {
  return apiClient<{ address: Address }>(`/users/me/addresses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(address),
  });
}

export function deleteAddress(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`/users/me/addresses/${id}`, {
    method: "DELETE",
  });
}
