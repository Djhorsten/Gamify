import { useState } from "react";
import { Link } from "react-router-dom";
import type { CartItem } from "../types/cart";
import { Price } from "../../../components/ui/display/Price/Price";
import { QuantitySelector } from "../../../components/ui/forms/QuantitySelector/QuantitySelector";
import { IconButton } from "../../../components/ui/buttons/IconButton/IconButton";
import { Modal } from "../../../components/ui/modals/Modal/Modal";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { useCart } from "../context/CartContext";
import styles from "./CartRow.module.scss";

interface CartRowProps {
  item: CartItem;
}

export function CartRow({ item }: CartRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className={styles.row}>
      <Link to={`/products/${item.slug}`} className={styles.imageLink}>
        <img src={item.image} alt={item.name} className={styles.image} />
      </Link>

      <div className={styles.info}>
        <Link to={`/products/${item.slug}`} className={styles.name}>
          {item.name}
        </Link>
        <Price amount={item.price} size="sm" />
      </div>

      <QuantitySelector
        value={item.quantity}
        max={item.stock}
        onChange={(value) => updateQuantity(item.productId, value)}
      />

      <div className={styles.lineTotal}>
        <Price amount={item.price * item.quantity} />
      </div>

      <IconButton
        variant="danger"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => setConfirmOpen(true)}
      >
        🗑
      </IconButton>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Remove product"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                removeItem(item.productId);
                setConfirmOpen(false);
              }}
            >
              Remove
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to remove <strong>{item.name}</strong> from your cart?
        </p>
      </Modal>
    </div>
  );
}
