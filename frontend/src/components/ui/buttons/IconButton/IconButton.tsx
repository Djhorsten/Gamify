import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.scss";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: "default" | "danger";
  children: ReactNode;
}

export function IconButton({
  variant = "default",
  className,
  type = "button",
  children,
  ...rest
}: IconButtonProps) {
  const classes = [styles.iconButton, styles[variant], className ?? ""].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
