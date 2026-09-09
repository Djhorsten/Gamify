import type { Category } from "../types/category";
import type { Sort } from "../types/product";
import { SearchBar } from "../../../components/ui/forms/SearchBar/SearchBar";
import { Select } from "../../../components/ui/forms/Select/Select";
import styles from "./ProductFilters.module.scss";

const sortOptions: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A-Z" },
];

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: Sort;
  onSortChange: (value: Sort) => void;
  category?: string;
  onCategoryChange?: (value: string) => void;
  categories?: Category[];
}

export function ProductFilters({
  search,
  onSearchChange,
  sort,
  onSortChange,
  category,
  onCategoryChange,
  categories,
}: ProductFiltersProps) {
  return (
    <div className={styles.filters}>
      <SearchBar value={search} onChange={onSearchChange} placeholder="Search a game..." />

      {onCategoryChange && categories && (
        <Select
          value={category ?? ""}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      )}

      <Select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as Sort)}
        aria-label="Sort by"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
