import { z } from "zod";

export const accountFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^\d{4}\s?[A-Za-z]{2}$/, "Invalid postal code (e.g. 1234 AB)"),
  city: z.string().min(1, "City is required"),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
