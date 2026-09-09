import styles from "./QuantitySelector.module.scss";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  function clamp(next: number) {
    return Math.min(max, Math.max(min, next));
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        type="number"
        className={styles.value}
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const parsed = Number(e.target.value);
          if (!Number.isNaN(parsed)) onChange(clamp(parsed));
        }}
        aria-label="Quantity"
      />
      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
