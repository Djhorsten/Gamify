import { Request, Response, NextFunction } from "express";
import { parseToken } from "../lib/token";
import { prisma } from "../db";

// Requires a valid "Authorization: Bearer <token>" header.
// Not production-safe (see lib/token.ts) - good enough for this practice project's frontend flow.
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.header("authorization") ?? req.header("Authorization");
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

  if (!token) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const userId = parseToken(token);
  if (!userId) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.userId = user.id;
  next();
}
