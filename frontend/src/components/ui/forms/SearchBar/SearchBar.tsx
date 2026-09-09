import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M18 18L13.8 13.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
