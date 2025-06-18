import { Router } from "express";
import userRouter from "./user.routes";
import taskRouter from "./task.routes";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use("/users", userRouter);
router.use("/tasks", authenticate, taskRouter);

export default router;
