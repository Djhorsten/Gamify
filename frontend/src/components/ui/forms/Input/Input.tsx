import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { hasError, className, ...rest },
  ref
) {
  const classes = [styles.input, hasError ? styles.error : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return <input ref={ref} className={classes} {...rest} />;
});
