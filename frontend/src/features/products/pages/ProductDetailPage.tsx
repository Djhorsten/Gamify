import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductQuery } from "../hooks/useProductQuery";
import { useCart } from "../../cart/context/CartContext";
import { AddedToCartModal } from "../../cart/components/AddedToCartModal";
import { Breadcrumbs } from "../../../components/ui/navigation/Breadcrumbs/Breadcrumbs";
import { Badge } from "../../../components/ui/display/Badge/Badge";
import { Price } from "../../../components/ui/display/Price/Price";
import { QuantitySelector } from "../../../components/ui/forms/QuantitySelector/QuantitySelector";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { LoadingSpinner } from "../../../components/ui/feedback/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import { categoryColor } from "../../../lib/categoryColor";
import styles from "./ProductDetailPage.module.scss";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useProductQuery(slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  if (isError || !product) {
    return (
      <EmptyState
        title="Product not found"
        description="This product doesn't exist (anymore)."
        action={<Link to="/products">Back to products</Link>}
      />
    );
  }

  const outOfStock = product.stock <= 0;

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: product.category.name, to: `/categories/${product.category.slug}` },
          { label: product.name },
        ]}
      />

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <img src={product.image} alt={product.name} className={styles.image} />
        </div>

        <div className={styles.info}>
          <Badge color={categoryColor(product.categoryId)}>{product.category.name}</Badge>
          <h1 className={styles.title}>{product.name}</h1>
          <Price amount={product.price} size="lg" />
          <p className={styles.description}>{product.description}</p>

          <p className={styles.stock}>
            {outOfStock
              ? "Out of stock"
              : product.stock <= 5
                ? `Only ${product.stock} left in stock`
                : "In stock"}
          </p>

          <div className={styles.actions}>
            <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock || 1} />
            <Button
              disabled={outOfStock}
              onClick={() => {
                addItem(product, quantity);
                setJustAdded(true);
              }}
            >
              {outOfStock ? "Out of stock" : "Add to cart"}
            </Button>
          </div>
        </div>
      </div>

      <AddedToCartModal
        isOpen={justAdded}
        onClose={() => setJustAdded(false)}
        productName={product.name}
      />
    </div>
  );
}
