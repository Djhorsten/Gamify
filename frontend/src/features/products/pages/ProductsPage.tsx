import { useSearchParams } from "react-router-dom";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { useCategoriesQuery } from "../hooks/useCategoriesQuery";
import { ProductFilters } from "../components/ProductFilters";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import { AddedToCartModal } from "../../cart/components/AddedToCartModal";
import { PageHeader } from "../../../components/ui/navigation/PageHeader/PageHeader";
import { ProductGrid } from "../../../components/ui/cards/ProductGrid/ProductGrid";
import { LoadingSpinner } from "../../../components/ui/feedback/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import type { Sort } from "../types/product";

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort = (searchParams.get("sort") as Sort) || "newest";

  const { data: categories } = useCategoriesQuery();
  const { data: products, isLoading, isError } = useProductsQuery({
    search: search || undefined,
    category: category || undefined,
    sort,
  });
  const { addToCart, lastAdded, closeModal } = useAddToCart();

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  return (
    <div>
      <PageHeader title="Products" description="Browse all games in our catalog." />

      <ProductFilters
        search={search}
        onSearchChange={(value) => updateParam("search", value)}
        sort={sort}
        onSortChange={(value) => updateParam("sort", value)}
        category={category}
        onCategoryChange={(value) => updateParam("category", value)}
        categories={categories}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <EmptyState title="Products could not be loaded" />
      ) : !products || products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <ProductGrid products={products} onAddToCart={addToCart} />
      )}

      <AddedToCartModal
        isOpen={!!lastAdded}
        onClose={closeModal}
        productName={lastAdded?.name ?? ""}
      />
    </div>
  );
}
