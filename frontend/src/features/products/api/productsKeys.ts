import type { ProductFilters } from "../types/product";

export const productKeys = {
  all: ["products"] as const,
  list: (filters: ProductFilters) => ["products", filters] as const,
  detail: (slug: string) => ["product", slug] as const,
};

export const categoryKeys = {
  all: ["categories"] as const,
};
