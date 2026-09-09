import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { HomePage } from "../features/home/pages/HomePage";
import { ProductsPage } from "../features/products/pages/ProductsPage";
import { ProductDetailPage } from "../features/products/pages/ProductDetailPage";
import { CategoryPage } from "../features/products/pages/CategoryPage";
import { CartPage } from "../features/cart/pages/CartPage";
import { CheckoutPage } from "../features/checkout/pages/CheckoutPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { AccountPage } from "../features/account/pages/AccountPage";
import { OrdersPage } from "../features/orders/pages/OrdersPage";
import { OrderDetailPage } from "../features/orders/pages/OrderDetailPage";
import { NotFoundPage } from "../features/misc/pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:slug", element: <ProductDetailPage /> },
      { path: "/categories/:slug", element: <CategoryPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/account", element: <AccountPage /> },
          { path: "/orders", element: <OrdersPage /> },
          { path: "/orders/:id", element: <OrderDetailPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
