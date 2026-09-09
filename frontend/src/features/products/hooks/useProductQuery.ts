import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/productsApi";
import { productKeys } from "../api/productsKeys";

export function useProductQuery(slug: string | undefined) {
  return useQuery({
    queryKey: productKeys.detail(slug ?? ""),
    queryFn: () => fetchProduct(slug!),
    enabled: !!slug,
  });
}
