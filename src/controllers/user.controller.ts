import { Request, Response, NextFunction } from "express";
import { userSignIn, userSignUp } from "../services/user.service";

export async function signUp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const result = await userSignUp(req.body.email, req.body.password);
  res.status(201).json(result);
}

export async function signIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const result = await userSignIn(req.body.email, req.body.password);
  res.status(200).json(result);
}
