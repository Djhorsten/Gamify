import { useEffect } from "react";
import { ApiError } from "../../../api/client";
import { useAuth } from "../context/AuthContext";

// Automatically logs the user out as soon as an auth-gated request returns a 401
// (e.g. an expired or invalidated token after a reseed). ProtectedRoute then redirects
// to /login on its own, instead of the page getting stuck on "Loading...".
export function useHandleAuthError(isError: boolean, error: unknown) {
  const { logout } = useAuth();

  useEffect(() => {
    if (isError && error instanceof ApiError && error.status === 401) {
      logout();
    }
  }, [isError, error, logout]);
}
