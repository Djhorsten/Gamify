import { Router, Request, Response } from "express";
import { prisma } from "../db";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { createToken } from "../lib/token";

export const authRouter = Router();

function toPublicUser(user: {
  id: number;
  name: string;
  email: string;
  address: string | null;
  postalCode: string | null;
  city: string | null;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    postalCode: user.postalCode,
    city: user.city,
  };
}

// POST /auth/register
authRouter.post(
  "/register",
  validate(registerSchema),
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email address is already in use" });
    }

    const user = await prisma.user.create({ data: { name, email, password } });
    const token = createToken(user.id);

    res.status(201).json({ user: toPublicUser(user), token });
  }
);

// POST /auth/login
authRouter.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email address or password" });
    }

    const token = createToken(user.id);
    res.json({ user: toPublicUser(user), token });
  }
);
