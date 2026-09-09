import { Link } from "react-router-dom";
import type { Order } from "../types/order";
import { Card } from "../../../components/ui/cards/Card/Card";
import { Price } from "../../../components/ui/display/Price/Price";
import { Badge } from "../../../components/ui/display/Badge/Badge";
import { formatDate } from "../../../lib/format";
import styles from "./OrderCard.module.scss";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.top}>
        <div>
          <p className={styles.orderNumber}>Order #{order.id}</p>
          <p className={styles.date}>{formatDate(order.createdAt)}</p>
        </div>
        <Badge tone={order.status === "CANCELLED" ? "error" : "success"}>
          {order.status === "CANCELLED" ? "Cancelled" : "Placed"}
        </Badge>
      </div>

      <p className={styles.itemsSummary}>
        {order.items.length} {order.items.length === 1 ? "item" : "items"}
      </p>

      <div className={styles.bottom}>
        <Price amount={order.total} size="lg" />
        <Link to={`/orders/${order.id}`} className={styles.link}>
          View order
        </Link>
      </div>
    </Card>
  );
}
