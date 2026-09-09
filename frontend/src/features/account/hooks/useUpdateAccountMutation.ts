import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccountRequest } from "../api/accountApi";
import { accountKeys } from "../api/accountKeys";
import type { UpdateAccountInput } from "../types/user";
import { useAuth } from "../../auth/context/AuthContext";

export function useUpdateAccountMutation() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateAccountInput) => updateAccountRequest(input, token!),
    onSuccess: (user) => {
      queryClient.setQueryData(accountKeys.detail(), user);
    },
  });
}
