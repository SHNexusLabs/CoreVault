import type { LoginInput, RegisterInput, User } from "@/types/user";

import { apiClient } from "./client";

interface AuthResponse {
  user: User;
}

export function register(data: RegisterInput): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(data: LoginInput): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getCurrentUser(): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/auth/me");
}

export function logout(): Promise<{ message: string }> {
  return apiClient<{ message: string }>("/auth/logout", {
    method: "POST",
  });
}
