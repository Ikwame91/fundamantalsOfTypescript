import { Repository } from "./repository.js";
import { isInProgressTask, isTodoTask } from "./task_utils.js";
import {
  TaskPriority,
  type DoneTask,
  type InProgressTask,
  type Task,
  type TodoTask,
} from "./types.js";
import * as crypto from "crypto";

export class TaskService {
  private taskRepo: Repository<Task>;

  constructor() {
    this.taskRepo = new Repository<Task>("tasks.json");
  }

  createTask(
    title: string,
    description?: string,
    priority: TaskPriority = TaskPriority.MEDIUM
  ): TodoTask {
    const newTask: TodoTask = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.taskRepo.add(newTask);
    return newTask;
  }

  startTask(taskId: string, estimatedHours?: number): InProgressTask | null {
    const task = this.taskRepo.findById(taskId);
    if (!task || !isTodoTask(task)) {
      return null;
    }
    const inProgressTask: InProgressTask = {
      ...task,
      status: "in-progress",
      startedAt: new Date(),
      estimatedHours: estimatedHours ?? 0,
      updatedAt: new Date(),
    };
    this.taskRepo.update(taskId, inProgressTask);
    return inProgressTask;
  }

  completeTask(taskId: string, actualHours: number): DoneTask | null {
    const task = this.taskRepo.findById(taskId);
    if (!task || !isInProgressTask(task)) {
      return null;
    }

    const doneTask: DoneTask = {
      ...task,
      status: "done",
      completedAt: new Date(),
      actualHours,
      updatedAt: new Date(),
    };
    this.taskRepo.update(taskId, doneTask);
    return doneTask;
  }

  getAllTasks(): Task[] {
    return this.getAllTasks();
  }

  deleteTask(taskid: string): boolean {
    return this.taskRepo.delete(taskid);
  }

  getTaskByStatus<T extends Task["status"]>(status: T): Task[] {
    return this.taskRepo.filter((task) => task.status === status);
  }

  getTaskById(taskId: string): Task | undefined {
    return this.taskRepo.findById(taskId);
  }
}
