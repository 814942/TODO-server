import { z } from "zod";
import { TaskStatus } from "../enums/task-status.enum";

export const createTaskSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(15),
  deadline: z.coerce.date(),
  status: z.nativeEnum(TaskStatus),
});

export const updateTaskSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(15).optional(),
  deadline: z.coerce.date().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
});
