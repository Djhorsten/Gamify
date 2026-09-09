import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

const TOKEN_STORAGE_KEY = "webshop.token";

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY)
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: !!token,
      login: (nextToken: string) => {
        localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
        setToken(nextToken);
      },
      logout: () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken(null);
      },
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
