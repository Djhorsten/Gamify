import { ApiError } from "../../../api/client";

// Never retry a failed query on a 401 (Unauthorized) - the same token stays
// invalid, so retrying doesn't fix anything and only delays the automatic
// logout flow in useHandleAuthError. Other errors (network, 5xx) still get
// retried a few times as usual.
export function retryUnlessUnauthorized(failureCount: number, error: unknown): boolean {
  if (error instanceof ApiError && error.status === 401) {
    return false;
  }
  return failureCount < 3;
}
