const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.error ?? res.statusText);
  }

  // 204 No Content (e.g. for delete) has no body
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, token?: string) => request<T>(path, undefined, token),
  post: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }, token),
  patch: <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }, token),
  delete: <T>(path: string, token?: string) => request<T>(path, { method: "DELETE" }, token),
};
