import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartRow } from "../components/CartRow";
import { PageHeader } from "../../../components/ui/navigation/PageHeader/PageHeader";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import { Price } from "../../../components/ui/display/Price/Price";
import { Button } from "../../../components/ui/buttons/Button/Button";
import styles from "./CartPage.module.scss";

export function CartPage() {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader title="Cart" />

      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Add products to see an overview of all of them."
          action={<Link to="/products">See products</Link>}
        />
      ) : (
        <div className={styles.layout}>
          <div className={styles.list}>
            {items.map((item) => (
              <CartRow key={item.productId} item={item} />
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Total</span>
              <Price amount={totalPrice} size="lg" />
            </div>
            <Button fullWidth onClick={() => navigate("/checkout")}>
              To checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
