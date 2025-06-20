import { Task } from "../models";

export async function createTask(data: any, userId: number) {
  return await Task.create({ ...data, userId });
}

export async function getAllTasks(userId: number) {
  return await Task.findAll({
    where: { userId },
    order: [["createdAt", "ASC"]],
    raw: true,
  });
}

export async function getTask(id: number, userId: number, raw = true) {
  const task = await Task.findOne({ where: { id, userId }, raw });
  if (!task) {
    const error: any = new Error("Tarea no encontrada");
    error.status = 404;
    throw error;
  }

  return task;
}

export async function updateTask(id: number, data: any, userId: number) {
  const task = await getTask(id, userId, false);

  await task.update(data);
  return task;
}

export async function deleteTask(id: number, userId: number) {
  const task = await getTask(id, userId, false);
  await task.destroy();
}

export async function updateTaskStatus(
  id: number,
  status: string,
  userId: number
) {
  const validStatuses = ["Pendiente", "En progreso", "Completada"];
  if (!validStatuses.includes(status)) {
    const error: any = new Error("Estado no válido");
    error.status = 400;
    throw error;
  }

  return await updateTask(id, { status }, userId);
}
