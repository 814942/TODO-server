import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB, sequelize } from "./config/db";

import { errorHandler } from "./middlewares/errorHandler";
import { formatDatesMiddleware } from "./middlewares/formatDates";

import { catchAsync } from "./utils/catchAsync";

import router from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const whitelistParsed = process.env.WHITELIST
  ? process.env.WHITELIST.split(",")
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelistParsed.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ message: "Gestor de Tareas funcionando correctamente" });
});

app.get(
  "/health",
  catchAsync(async (_req, res) => {
    const start = Date.now();
    await sequelize.authenticate();
    const dbLatency = Date.now() - start;
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "ok",
      dbLatencyMs: dbLatency,
    });
  })
);

app.use(formatDatesMiddleware);
app.use("/api", router);

// Global error handler
app.use(errorHandler);

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
})();
