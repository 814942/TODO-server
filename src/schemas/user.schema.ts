import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
    "Password must be at least 8 characters and include upper, lower, number, and special char"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
