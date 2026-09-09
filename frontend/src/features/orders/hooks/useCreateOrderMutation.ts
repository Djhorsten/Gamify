import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderRequest } from "../api/ordersApi";
import { orderKeys } from "../api/ordersKeys";
import type { CreateOrderInput } from "../types/order";
import { useAuth } from "../../auth/context/AuthContext";

export function useCreateOrderMutation() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateOrderInput) => createOrderRequest(input, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}
