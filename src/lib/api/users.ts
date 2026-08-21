import type { User } from "@/types/user";

import { apiClient } from "./client";

export interface UpdateUserInput {
  name?: string;
  phone?: string;
}

export function updateUser(data: UpdateUserInput): Promise<{ user: User }> {
  return apiClient<{ user: User }>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
