import { Response, NextFunction } from "express";
import * as taskService from "../services/task.service";
import { AuthRequest } from "../middlewares/auth";

export async function createTask(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  const task = await taskService.createTask(req.body, userId);
  res.status(201).json(task);
}

export async function getAllTasks(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  const tasks = await taskService.getAllTasks(userId);
  res.json(tasks);
}

export async function getTask(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  const task = await taskService.getTask(Number(req.params.id), userId);
  res.json(task);
}

export async function updateTask(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  const task = await taskService.updateTask(
    Number(req.params.id),
    req.body,
    userId
  );
  res.json(task);
}

export async function deleteTask(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  await taskService.deleteTask(Number(req.params.id), userId);
  res.status(204).send("Tarea eliminada con exito");
}
