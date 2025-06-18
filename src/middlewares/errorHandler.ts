import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Validation error
  if (err instanceof ZodError) {
    res.status(400).json({
      error: true,
      message: "Validation error",
      issues: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Errores generales
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const details =
    process.env.NODE_ENV === "development" ? err.stack : undefined;
  res.status(status).json({
    error: true,
    message,
    ...(details && { details }),
  });
}
