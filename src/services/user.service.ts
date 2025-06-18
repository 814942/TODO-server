import { Transaction } from "sequelize";

import { User } from "../models";

import { hashPassword, comparePassword } from "../utils/password";

import { generateToken } from "../utils/jwt";

import { sequelize } from "../config/db";

export async function userSignUp(email: string, password: string) {
  return await sequelize.transaction(async (t: Transaction) => {
    const existing = await User.findOne({ where: { email }, transaction: t });
    if (existing) {
      const error: any = new Error("El email ya está registrado");
      error.status = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create(
      { email, password: hashedPassword } as User,
      { transaction: t }
    );
    const token = generateToken({ id: user.id, email: user.email });
    return {
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
      token,
    };
  });
}

export async function userSignIn(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error: any = new Error("Usuario o contraseña incorrectos");
    error.status = 401;
    throw error;
  }
  const valid = await comparePassword(password, user.password);
  if (!valid) {
    const error: any = new Error("Usuario o contraseña incorrectos");
    error.status = 401;
    throw error;
  }
  const token = generateToken({ id: user.id, email: user.email });
  return {
    user: { id: user.id, email: user.email, createdAt: user.createdAt },
    token,
  };
}
