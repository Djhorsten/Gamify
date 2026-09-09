import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";

export interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
            {index < items.length - 1 && <span className={styles.separator}>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
