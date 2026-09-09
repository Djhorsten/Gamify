import { formatPrice } from "../../../../lib/format";
import styles from "./Price.module.scss";

interface PriceProps {
  amount: number;
  size?: "sm" | "md" | "lg";
}

export function Price({ amount, size = "md" }: PriceProps) {
  return <span className={[styles.price, styles[size]].join(" ")}>{formatPrice(amount)}</span>;
}
