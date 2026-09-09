import { useState } from "react";
import type { Product } from "../../products/types/product";
import { useCart } from "../context/CartContext";

export function useAddToCart() {
  const { addItem } = useCart();
  const [lastAdded, setLastAdded] = useState<Product | null>(null);

  function addToCart(product: Product) {
    addItem(product, 1);
    setLastAdded(product);
  }

  return { addToCart, lastAdded, closeModal: () => setLastAdded(null) };
}
