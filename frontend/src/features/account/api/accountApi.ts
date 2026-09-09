import { apiClient } from "../../../api/client";
import type { UpdateAccountInput, User } from "../types/user";

export function fetchAccount(token: string): Promise<User> {
  return apiClient.get<User>("/account", token);
}

export function updateAccountRequest(input: UpdateAccountInput, token: string): Promise<User> {
  return apiClient.patch<User>("/account", input, token);
}
