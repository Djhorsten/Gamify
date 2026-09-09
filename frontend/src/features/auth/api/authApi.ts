import { apiClient } from "../../../api/client";
import type { AuthResponse, LoginInput, RegisterInput } from "../types/auth";

export function loginRequest(input: LoginInput): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/login", input);
}

export function registerRequest(input: RegisterInput): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>("/auth/register", input);
}
