import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/productsApi";
import { categoryKeys } from "../api/productsKeys";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: fetchCategories,
  });
}
