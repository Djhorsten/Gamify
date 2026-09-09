import type { CSSProperties, ReactNode } from "react";
import styles from "./Badge.module.scss";

interface BadgeProps {
  children: ReactNode;
  color?: string;
  tone?: "neutral" | "success" | "error";
}

export function Badge({ children, color, tone = "neutral" }: BadgeProps) {
  const style = color ? ({ "--badge-color": color } as CSSProperties) : undefined;

  return (
    <span className={[styles.badge, styles[tone]].join(" ")} style={style}>
      {color && <span className={styles.dot} />}
      {children}
    </span>
  );
}
