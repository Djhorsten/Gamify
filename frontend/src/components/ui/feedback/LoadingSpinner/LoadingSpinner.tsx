import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({ label = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className={styles.wrapper} role="status">
      <span className={styles.spinner} />
      <span>{label}</span>
    </div>
  );
}
