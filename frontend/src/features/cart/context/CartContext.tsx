import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/cart";
import type { Product } from "../../products/types/product";

const CART_STORAGE_KEY = "webshop.cart";

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      totalQuantity,
      totalPrice,
      addItem: (product, quantity = 1) => {
        setItems((prev) => {
          const existing = prev.find((item) => item.productId === product.id);
          const maxQuantity = product.stock;

          if (existing) {
            return prev.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: Math.min(maxQuantity, item.quantity + quantity) }
                : item
            );
          }

          return [
            ...prev,
            {
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.image,
              stock: product.stock,
              quantity: Math.min(maxQuantity, quantity),
            },
          ];
        });
      },
      updateQuantity: (productId, quantity) => {
        setItems((prev) =>
          prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(item.stock, Math.max(1, quantity)) }
              : item
          )
        );
      },
      removeItem: (productId) => {
        setItems((prev) => prev.filter((item) => item.productId !== productId));
      },
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
