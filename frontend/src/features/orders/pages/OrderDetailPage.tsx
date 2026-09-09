import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrderQuery } from "../hooks/useOrderQuery";
import { CancelOrderModal } from "../components/CancelOrderModal";
import { Breadcrumbs } from "../../../components/ui/navigation/Breadcrumbs/Breadcrumbs";
import { PageHeader } from "../../../components/ui/navigation/PageHeader/PageHeader";
import { Card } from "../../../components/ui/cards/Card/Card";
import { Badge } from "../../../components/ui/display/Badge/Badge";
import { Price } from "../../../components/ui/display/Price/Price";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { LoadingSpinner } from "../../../components/ui/feedback/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import { formatDate } from "../../../lib/format";
import styles from "./OrderDetailPage.module.scss";

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);
  const { data: order, isLoading, isError } = useOrderQuery(orderId);
  const [cancelling, setCancelling] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  if (isError || !order) {
    return (
      <EmptyState
        title="Order not found"
        action={<Link to="/orders">Back to orders</Link>}
      />
    );
  }

  const canCancel = order.status === "PLACED";

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Orders", to: "/orders" },
          { label: `#${order.id}` },
        ]}
      />
      <PageHeader
        title={`Order #${order.id}`}
        description={formatDate(order.createdAt)}
        action={
          canCancel ? (
            <Button variant="danger" onClick={() => setCancelling(true)}>
              Cancel order
            </Button>
          ) : undefined
        }
      />

      <div className={styles.layout}>
        <Card className={styles.items}>
          <div className={styles.statusRow}>
            <Badge tone={order.status === "CANCELLED" ? "error" : "success"}>
              {order.status === "CANCELLED" ? "Cancelled" : "Placed"}
            </Badge>
          </div>

          <ul className={styles.itemList}>
            {order.items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.quantity}× {item.productName}
                </span>
                <Price amount={item.price * item.quantity} />
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <span>Total</span>
            <Price amount={order.total} size="lg" />
          </div>
        </Card>

        <Card className={styles.address}>
          <h2 className={styles.addressTitle}>Shipping address</h2>
          <p>{order.name}</p>
          <p>{order.address}</p>
          <p>
            {order.postalCode} {order.city}
          </p>
          <p>{order.email}</p>
        </Card>
      </div>

      <CancelOrderModal
        isOpen={cancelling}
        onClose={() => setCancelling(false)}
        orderId={order.id}
      />
    </div>
  );
}
