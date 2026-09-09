import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { CartProvider } from "./features/cart/context/CartContext";
import "./styles/base.scss";

// One shared QueryClient for the whole app
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
