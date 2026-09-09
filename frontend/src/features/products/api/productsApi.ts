import { apiClient } from "../../../api/client";
import type { Product, ProductFilters } from "../types/product";
import type { Category } from "../types/category";

function buildQueryString(filters: ProductFilters): string {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.search) params.set("search", filters.search);
  if (filters.sort) params.set("sort", filters.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function fetchProducts(filters: ProductFilters = {}): Promise<Product[]> {
  return apiClient.get<Product[]>(`/products${buildQueryString(filters)}`);
}

export function fetchProduct(slug: string): Promise<Product> {
  return apiClient.get<Product>(`/products/${slug}`);
}

export function fetchCategories(): Promise<Category[]> {
  return apiClient.get<Category[]>("/categories");
}
