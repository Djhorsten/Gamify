import { useQuery } from "@tanstack/react-query";
import { fetchAccount } from "../api/accountApi";
import { accountKeys } from "../api/accountKeys";
import { useAuth } from "../../auth/context/AuthContext";
import { useHandleAuthError } from "../../auth/hooks/useHandleAuthError";
import { retryUnlessUnauthorized } from "../../auth/lib/retry";

export function useAccountQuery() {
  const { token } = useAuth();

  const query = useQuery({
    queryKey: accountKeys.detail(),
    queryFn: () => fetchAccount(token!),
    enabled: !!token,
    retry: retryUnlessUnauthorized,
  });

  useHandleAuthError(query.isError, query.error);

  return query;
}
