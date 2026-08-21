const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

interface ApiError {
  message: string;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    let message = "Something went wrong.";

    try {
      const error = (await response.json()) as ApiError;

      if (error.message) {
        message = error.message;
      }
    } catch {
      // Keep default error message.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
