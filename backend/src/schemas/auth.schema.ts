import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name must not be empty"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password must not be empty"),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
