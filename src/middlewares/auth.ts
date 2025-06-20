import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthRequest } from "../types/auth.types";

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error: any = new Error("Acceso restringuido");
    error.status = 403;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token) as { id: number; email: string };
    req.user = decoded;
    next();
  } catch (err) {
    const error: any = new Error("Token incorrecto");
    error.status = 401;
    next(error);
  }
}
