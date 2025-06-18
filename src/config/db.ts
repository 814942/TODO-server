import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

import { Task, User } from "../models";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,
  dialect: "postgres",
  models: [User, Task],
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Conexión a PostgreSQL exitosa con Sequelize");
  } catch (err) {
    console.error("Error conectando a PostgreSQL con Sequelize:", err);
    process.exit(1);
  }
};
