import { Link } from "react-router-dom";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import styles from "./NotFoundPage.module.scss";

export function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        action={<Link to="/">Back to home</Link>}
      />
    </div>
  );
}
