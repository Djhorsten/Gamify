import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerRequest } from "../api/authApi";
import { accountKeys } from "../../account/api/accountKeys";
import type { RegisterInput } from "../types/auth";
import { useAuth } from "../context/AuthContext";

export function useRegisterMutation() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RegisterInput) => registerRequest(input),
    onSuccess: ({ user, token }) => {
      login(token);
      queryClient.setQueryData(accountKeys.detail(), user);
    },
  });
}
