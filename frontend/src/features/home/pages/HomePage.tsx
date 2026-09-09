import { Link } from "react-router-dom";
import { useProductsQuery } from "../../products/hooks/useProductsQuery";
import { useCategoriesQuery } from "../../products/hooks/useCategoriesQuery";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import { AddedToCartModal } from "../../cart/components/AddedToCartModal";
import { ProductGrid } from "../../../components/ui/cards/ProductGrid/ProductGrid";
import { LoadingSpinner } from "../../../components/ui/feedback/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import { Badge } from "../../../components/ui/display/Badge/Badge";
import { categoryColor } from "../../../lib/categoryColor";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const { data: products, isLoading, isError } = useProductsQuery({ sort: "newest" });
  const { data: categories } = useCategoriesQuery();
  const { addToCart, lastAdded, closeModal } = useAddToCart();

  const featured = products?.slice(0, 8) ?? [];

  return (
    <div>
      <section className={styles.hero}>
        <div>
          <h1 className={styles.heroTitle}>Game keys at its cheapest!</h1>
          <p className={styles.heroDescription}>
            Discover action, RPGs, survival and more — all with instant delivery, always stored on your account, cheaper than any other!
          </p>
          <Link to="/products" className={styles.heroButton}>
            Browse all products
          </Link>
        </div>
      </section>

      {categories && categories.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Categories</h2>
          <div className={styles.categoryRow}>
            {categories.map((category) => (
              <Link key={category.slug} to={`/categories/${category.slug}`} className={styles.categoryChip}>
                <Badge color={categoryColor(category.id)}>{category.name}</Badge>
                <span>{category.productCount} products</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>New arrivals</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <EmptyState title="Products could not be loaded" />
        ) : featured.length === 0 ? (
          <EmptyState title="No products available yet" />
        ) : (
          <ProductGrid products={featured} onAddToCart={addToCart} />
        )}
      </section>

      <AddedToCartModal
        isOpen={!!lastAdded}
        onClose={closeModal}
        productName={lastAdded?.name ?? ""}
      />
    </div>
  );
}
