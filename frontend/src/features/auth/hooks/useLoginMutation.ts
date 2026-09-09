import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "../api/authApi";
import { accountKeys } from "../../account/api/accountKeys";
import type { LoginInput } from "../types/auth";
import { useAuth } from "../context/AuthContext";

export function useLoginMutation() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LoginInput) => loginRequest(input),
    onSuccess: ({ user, token }) => {
      login(token);
      queryClient.setQueryData(accountKeys.detail(), user);
    },
  });
}
