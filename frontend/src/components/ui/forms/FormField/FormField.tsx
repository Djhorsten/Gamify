import type { ReactNode } from "react";
import styles from "./FormField.module.scss";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className={styles.hint}>{hint}</p>
      ) : null}
    </div>
  );
}
