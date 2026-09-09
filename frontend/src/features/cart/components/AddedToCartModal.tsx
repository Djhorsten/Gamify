import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/ui/modals/Modal/Modal";
import { Button } from "../../../components/ui/buttons/Button/Button";

interface AddedToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export function AddedToCartModal({ isOpen, onClose, productName }: AddedToCartModalProps) {
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Added to cart"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Keep shopping
          </Button>
          <Button
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
          >
            Go to cart
          </Button>
        </>
      }
    >
      <p>
        <strong>{productName}</strong> has been added to your cart.
      </p>
    </Modal>
  );
}
