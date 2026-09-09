import { Router, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { validate } from "../middleware/validate";
import { listProductsSchema, productSlugSchema, Sort } from "../schemas/product.schema";

export const productRouter = Router();

const sortMap: Record<Sort, Prisma.ProductOrderByWithRelationInput> = {
  "price-asc": { price: "asc" },
  "price-desc": { price: "desc" },
  "name-asc": { name: "asc" },
  newest: { createdAt: "desc" },
};

// GET /products?category=slug&search=term&sort=price-asc
productRouter.get(
  "/",
  validate(listProductsSchema),
  async (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const sort = req.query.sort as Sort | undefined;

    const products = await prisma.product.findMany({
      where: {
        category: category ? { slug: category } : undefined,
        name: search ? { contains: search } : undefined,
      },
      orderBy: sort ? sortMap[sort] : { createdAt: "desc" },
      include: { category: true },
    });

    res.json(products);
  }
);

// GET /products/:slug - fetch a single product
productRouter.get(
  "/:slug",
  validate(productSlugSchema),
  async (req: Request, res: Response) => {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: { category: true },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  }
);
