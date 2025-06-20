import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { formatZodError } from "../utils/format-zod-error";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Validation error
  if (err instanceof ZodError) {
    const { message, details } = formatZodError(err);

    res.status(400).json({
      error: true,
      message,
      details,
      code: 'VALIDATION_ERROR',
      timestamp: new Date().toISOString()
    });
  }

  // Errores generales
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const details = err.details || [];
  const timestamp = new Date().toISOString();

  // Respuesta de error estandarizada
  const errorResponse = {
    error: true,
    message,
    ...(details.length > 0 && { details }),
    code,
    timestamp,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Log del error en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      message,
      status,
      code,
      stack: err.stack,
      timestamp
    });
  }

  res.status(status).json(errorResponse);
}
