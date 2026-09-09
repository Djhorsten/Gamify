import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../api/ordersApi";
import { orderKeys } from "../api/ordersKeys";
import { useAuth } from "../../auth/context/AuthContext";
import { useHandleAuthError } from "../../auth/hooks/useHandleAuthError";
import { retryUnlessUnauthorized } from "../../auth/lib/retry";

export function useOrderQuery(id: number | undefined) {
  const { token } = useAuth();

  const query = useQuery({
    queryKey: orderKeys.detail(id ?? 0),
    queryFn: () => fetchOrder(id!, token!),
    enabled: !!token && !!id,
    retry: retryUnlessUnauthorized,
  });

  useHandleAuthError(query.isError, query.error);

  return query;
}
