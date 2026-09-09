import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/ordersApi";
import { orderKeys } from "../api/ordersKeys";
import { useAuth } from "../../auth/context/AuthContext";
import { useHandleAuthError } from "../../auth/hooks/useHandleAuthError";
import { retryUnlessUnauthorized } from "../../auth/lib/retry";

export function useOrdersQuery() {
  const { token } = useAuth();

  const query = useQuery({
    queryKey: orderKeys.all,
    queryFn: () => fetchOrders(token!),
    enabled: !!token,
    retry: retryUnlessUnauthorized,
  });

  useHandleAuthError(query.isError, query.error);

  return query;
}
