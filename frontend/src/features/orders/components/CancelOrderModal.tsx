import { Modal } from "../../../components/ui/modals/Modal/Modal";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { ApiError } from "../../../api/client";
import { useCancelOrderMutation } from "../hooks/useCancelOrderMutation";

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
}

export function CancelOrderModal({ isOpen, onClose, orderId }: CancelOrderModalProps) {
  const cancelOrder = useCancelOrderMutation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel order"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Back
          </Button>
          <Button
            variant="danger"
            disabled={cancelOrder.isPending}
            onClick={() => cancelOrder.mutate(orderId, { onSuccess: onClose })}
          >
            {cancelOrder.isPending ? "Cancelling..." : "Yes, cancel"}
          </Button>
        </>
      }
    >
      <p>
        Are you sure you want to cancel order <strong>#{orderId}</strong>? This cannot be undone.
      </p>
      {cancelOrder.isError && (
        <p role="alert">
          {cancelOrder.error instanceof ApiError
            ? cancelOrder.error.message
            : "Cancelling failed. Please try again."}
        </p>
      )}
    </Modal>
  );
}
