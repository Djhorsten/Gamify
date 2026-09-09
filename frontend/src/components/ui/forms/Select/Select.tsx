import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { hasError, className, children, ...rest },
  ref
) {
  const classes = [styles.select, hasError ? styles.error : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <select ref={ref} className={classes} {...rest}>
      {children}
    </select>
  );
});
