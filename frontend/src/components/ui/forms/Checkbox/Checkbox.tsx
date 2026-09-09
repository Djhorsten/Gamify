import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, ...rest },
  ref
) {
  return (
    <label className={[styles.wrapper, className ?? ""].filter(Boolean).join(" ")} htmlFor={id}>
      <input ref={ref} type="checkbox" id={id} className={styles.checkbox} {...rest} />
      <span>{label}</span>
    </label>
  );
});
