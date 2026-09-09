import { Router, Request, Response } from "express";
import { prisma } from "../db";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import { createOrderSchema, orderIdSchema } from "../schemas/order.schema";

export const orderRouter = Router();

// GET /orders - orders of the logged-in user
orderRouter.get("/", requireAuth, async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
  res.json(orders);
});

// GET /orders/:id - a single order of the logged-in user
orderRouter.get(
  "/:id",
  requireAuth,
  validate(orderIdSchema),
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order || order.userId !== req.userId) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  }
);

// POST /orders - place a new order from the cart
orderRouter.post(
  "/",
  requireAuth,
  validate(createOrderSchema),
  async (req: Request, res: Response) => {
    const { name, email, address, postalCode, city, items } = req.body;

    const productIds = items.map((i: { productId: number }) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    for (const item of items as { productId: number; quantity: number }[]) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.productId} does not exist` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for ${product.name}` });
      }
    }

    const total = (items as { productId: number; quantity: number }[]).reduce(
      (sum, item) => {
        const product = products.find((p) => p.id === item.productId)!;
        return sum + product.price * item.quantity;
      },
      0
    );

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userId: req.userId!,
          name,
          email,
          address,
          postalCode,
          city,
          total,
          items: {
            create: (items as { productId: number; quantity: number }[]).map((item) => {
              const product = products.find((p) => p.id === item.productId)!;
              return {
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: item.quantity,
              };
            }),
          },
        },
        include: { items: true },
      });

      for (const item of items as { productId: number; quantity: number }[]) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return created;
    });

    res.status(201).json(order);
  }
);

// PATCH /orders/:id/cancel - cancel an order
orderRouter.patch(
  "/:id/cancel",
  requireAuth,
  validate(orderIdSchema),
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });

    if (!order || order.userId !== req.userId) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.status !== "PLACED") {
      return res.status(400).json({ error: "This order can no longer be cancelled" });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.order.update({
        where: { id },
        data: { status: "CANCELLED" },
        include: { items: true },
      });

      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }

      return result;
    });

    res.json(updated);
  }
);
