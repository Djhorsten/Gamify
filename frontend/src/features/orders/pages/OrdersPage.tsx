import { Link } from "react-router-dom";
import { useOrdersQuery } from "../hooks/useOrdersQuery";
import { OrderCard } from "../components/OrderCard";
import { PageHeader } from "../../../components/ui/navigation/PageHeader/PageHeader";
import { LoadingSpinner } from "../../../components/ui/feedback/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import styles from "./OrdersPage.module.scss";

export function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrdersQuery();

  return (
    <div>
      <PageHeader title="Orders" description="An overview of all your placed orders." />

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <EmptyState title="Orders could not be loaded" />
      ) : !orders || orders.length === 0 ? (
        <EmptyState
          title="You don't have any orders yet"
          description="Place your first order from the cart."
          action={<Link to="/products">Browse products</Link>}
        />
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
