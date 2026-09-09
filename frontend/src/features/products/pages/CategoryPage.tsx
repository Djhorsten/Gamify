import { useParams, useSearchParams, Link } from "react-router-dom";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { useCategoriesQuery } from "../hooks/useCategoriesQuery";
import { ProductFilters } from "../components/ProductFilters";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import { AddedToCartModal } from "../../cart/components/AddedToCartModal";
import { Breadcrumbs } from "../../../components/ui/navigation/Breadcrumbs/Breadcrumbs";
import { PageHeader } from "../../../components/ui/navigation/PageHeader/PageHeader";
import { ProductGrid } from "../../../components/ui/cards/ProductGrid/ProductGrid";
import { LoadingSpinner } from "../../../components/ui/feedback/LoadingSpinner/LoadingSpinner";
import { EmptyState } from "../../../components/ui/feedback/EmptyState/EmptyState";
import type { Sort } from "../types/product";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sort = (searchParams.get("sort") as Sort) || "newest";

  const { data: categories } = useCategoriesQuery();
  const category = categories?.find((c) => c.slug === slug);

  const { data: products, isLoading, isError } = useProductsQuery({
    category: slug,
    search: search || undefined,
    sort,
  });
  const { addToCart, lastAdded, closeModal } = useAddToCart();

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  if (categories && !category) {
    return (
      <EmptyState
        title="Category not found"
        description="This category doesn't exist, apologies!"
        action={<Link to="/products">See all products</Link>}
      />
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: category?.name ?? "..." },
        ]}
      />
      <PageHeader
        title={category?.name ?? "Category"}
        description={category ? `${category.productCount} products in this category.` : undefined}
      />

      <ProductFilters
        search={search}
        onSearchChange={(value) => updateParam("search", value)}
        sort={sort}
        onSortChange={(value) => updateParam("sort", value)}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <EmptyState title="Products could not load." />
      ) : !products || products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Change or rephrase your search result and try again."
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
