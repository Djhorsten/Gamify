import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productsApi";
import { productKeys } from "../api/productsKeys";
import type { ProductFilters } from "../types/product";

export function useProductsQuery(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchProducts(filters),
  });
}
