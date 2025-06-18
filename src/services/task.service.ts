import { Task } from "../models";

export async function createTask(data: any, userId: number) {
  return await Task.create({ ...data, userId });
}

export async function getAllTasks(userId: number) {
  return await Task.findAll({ where: { userId } });
}

export async function getTask(id: number, userId: number) {
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) {
    const error: any = new Error("Tarea no encontrada");
    error.status = 404;
    throw error;
  }

  return task;
}

export async function updateTask(id: number, data: any, userId: number) {
  const task = await getTask(id, userId);
  await task.update(data);
  return task;
}

export async function deleteTask(id: number, userId: number) {
  const task = await getTask(id, userId);

  await task.destroy();
}
