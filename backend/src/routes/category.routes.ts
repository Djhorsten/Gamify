import { Router, Request, Response } from "express";
import { prisma } from "../db";

export const categoryRouter = Router();

// GET /categories - all categories
categoryRouter.get("/", async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  res.json(
    categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      productCount: c._count.products,
    }))
  );
});
