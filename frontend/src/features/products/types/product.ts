export type Sort = "price-asc" | "price-desc" | "name-asc" | "newest";

export interface ProductCategory {
  id: number;
  slug: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  categoryId: number;
  category: ProductCategory;
  createdAt: string;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  sort?: Sort;
}
