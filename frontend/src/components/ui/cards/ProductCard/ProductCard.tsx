import { Link } from "react-router-dom";
import type { Product } from "../../../../features/products/types/product";
import { categoryColor } from "../../../../lib/categoryColor";
import { Badge } from "../../display/Badge/Badge";
import { Price } from "../../display/Price/Price";
import { Button } from "../../buttons/Button/Button";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const outOfStock = product.stock <= 0;

  return (
    <div className={styles.card}>
      <Link to={`/products/${product.slug}`} className={styles.imageLink}>
        <img src={product.image} alt={product.name} className={styles.image} loading="lazy" />
        {outOfStock && <span className={styles.outOfStockTag}>Out of stock</span>}
      </Link>
      <div className={styles.body}>
        <Badge color={categoryColor(product.categoryId)}>{product.category.name}</Badge>
        <Link to={`/products/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        <div className={styles.footer}>
          <Price amount={product.price} />
          <Button
            size="sm"
            variant="secondary"
            disabled={outOfStock}
            onClick={() => onAddToCart?.(product)}
          >
            {outOfStock ? "Out of stock" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
