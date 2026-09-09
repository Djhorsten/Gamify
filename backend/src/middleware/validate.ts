import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

/**
 * Middleware factory: validates a request's body/params/query
 * against a given Zod schema. On failure, returns a 400 with a
 * clear error message.
 */
export function validate(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      // Write back the validated (and possibly coerced, e.g. string -> number) values
      req.body = parsed.body ?? req.body;
      req.params = (parsed.params as any) ?? req.params;
      if (parsed.query) {
        req.query = parsed.query as any;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Validation error",
          details: err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      next(err);
    }
  };
}
