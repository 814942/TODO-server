import { Router } from "express";
import { validate } from "../middlewares/validate";
import * as taskController from "../controllers/task.controller";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

router.post(
  "/",
  validate(createTaskSchema),
  catchAsync(taskController.createTask)
);
router.get("/", catchAsync(taskController.getAllTasks));
router.get("/:id", catchAsync(taskController.getTask));
router.patch(
  "/:id",
  validate(updateTaskSchema),
  catchAsync(taskController.updateTask)
);
router.delete("/:id", catchAsync(taskController.deleteTask));

export default router;
