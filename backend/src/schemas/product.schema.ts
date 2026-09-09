import { z } from "zod";

export const sortEnum = z.enum(["price-asc", "price-desc", "name-asc", "newest"]);
export type Sort = z.infer<typeof sortEnum>;

export const listProductsSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    search: z.string().optional(),
    sort: sortEnum.optional(),
  }),
});

export const productSlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});
