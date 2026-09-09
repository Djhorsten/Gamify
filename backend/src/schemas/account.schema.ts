import { z } from "zod";

export const updateAccountSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Name must not be empty").optional(),
      email: z.string().email("Invalid email address").optional(),
      address: z.string().min(1).optional(),
      postalCode: z.string().min(1).optional(),
      city: z.string().min(1).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Provide at least one field to update",
    }),
});

export type UpdateAccountInput = z.infer<typeof updateAccountSchema>["body"];
