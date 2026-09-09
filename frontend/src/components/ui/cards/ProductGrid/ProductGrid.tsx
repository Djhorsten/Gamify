import type { Product } from "../../../../features/products/types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.scss";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
