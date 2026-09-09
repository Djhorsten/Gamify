import { Router, Request, Response } from "express";
import { prisma } from "../db";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import { updateAccountSchema } from "../schemas/account.schema";

export const accountRouter = Router();

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

// GET /account - current user
accountRouter.get("/", requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(toPublicUser(user));
});

// PATCH /account - update account details
accountRouter.patch(
  "/",
  requireAuth,
  validate(updateAccountSchema),
  async (req: Request, res: Response) => {
    if (req.body.email) {
      const existing = await prisma.user.findUnique({ where: { email: req.body.email } });
      if (existing && existing.id !== req.userId) {
        return res.status(409).json({ error: "Email address is already in use" });
      }
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: req.body,
    });
    res.json(toPublicUser(user));
  }
);
