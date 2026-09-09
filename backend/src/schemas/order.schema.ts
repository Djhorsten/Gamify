import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name must not be empty"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(1, "Address must not be empty"),
    postalCode: z.string().min(1, "Postal code must not be empty"),
    city: z.string().min(1, "City must not be empty"),
    items: z
      .array(
        z.object({
          productId: z.number().int().positive(),
          quantity: z.number().int().positive(),
        })
      )
      .min(1, "Cart is empty"),
  }),
});

export const orderIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>["body"];
