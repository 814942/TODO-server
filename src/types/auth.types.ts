import { Request } from "express";

export interface AuthRequest<T = any> extends Request {
  body: T;
  params: any;
  user?: { id: number; email: string };
}