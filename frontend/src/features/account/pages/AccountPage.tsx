import { useState } from "react";
import { Link } from "react-router-dom";
import { useAccountQuery } from "../hooks/useAccountQuery";
import { EditAccountModal } from "../components/EditAccountModal";
import { PageHeader } from "../../../components/ui/navigation/PageHeader/PageHeader";
import { Card } from "../../../components/ui/cards/Card/Card";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { LoadingSpinner } from "../../../components/ui/feedback/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import styles from "./AccountPage.module.scss";

export function AccountPage() {
  const { data: user, isLoading, isError } = useAccountQuery();
  const [editing, setEditing] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  if (isError || !user) {
    return <EmptyState title="Account details could not be loaded" />;
  }

  return (
    <div>
      <PageHeader
        title="Account"
        description="See and modify your account details here."
        action={<Button onClick={() => setEditing(true)}>Modify</Button>}
      />

      <Card className={styles.card}>
        <dl className={styles.list}>
          <div>
            <dt>Name</dt>
            <dd>{user.name}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{user.address || "—"}</dd>
          </div>
          <div>
            <dt>Postalcode</dt>
            <dd>{user.postalCode || "—"}</dd>
          </div>
          <div>
            <dt>City</dt>
            <dd>{user.city || "—"}</dd>
          </div>
        </dl>
      </Card>

      <p className={styles.ordersLink}>
        <Link to="/orders">See your orders →</Link>
      </p>

      <EditAccountModal isOpen={editing} onClose={() => setEditing(false)} user={user} />
    </div>
  );
}
