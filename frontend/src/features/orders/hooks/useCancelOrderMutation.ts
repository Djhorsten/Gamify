import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrderRequest } from "../api/ordersApi";
import { orderKeys } from "../api/ordersKeys";
import { useAuth } from "../../auth/context/AuthContext";

export function useCancelOrderMutation() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => cancelOrderRequest(id, token!),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.setQueryData(orderKeys.detail(order.id), order);
    },
  });
}
