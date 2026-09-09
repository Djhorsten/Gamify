import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { categoryRouter } from "./routes/category.routes";
import { productRouter } from "./routes/product.routes";
import { authRouter } from "./routes/auth.routes";
import { accountRouter } from "./routes/account.routes";
import { orderRouter } from "./routes/order.routes";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Allows the frontend (a different port, e.g. localhost:5173) to make
// requests to this API. Without this, the browser silently blocks
// every fetch from the frontend.
app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/orders", orderRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Central error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
