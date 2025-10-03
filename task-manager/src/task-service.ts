import {
  Task,
  TodoTask,
  InProgressTask,
  DoneTask,
  TaskPriority,
} from "./types";
import { Repository } from "./repository";
import { isTodoTask, isInProgressTask } from "./task-utils";
import * as crypto from "crypto";

export class TaskService {
  private taskRepo: Repository<Task>;

  constructor() {
    this.taskRepo = new Repository<Task>("tasks.json");
  }

  // Create a new todo task
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

  // Start working on a task (todo -> in-progress)
  startTask(taskId: string, estimatedHours?: number): InProgressTask | null {
    const task = this.taskRepo.findById(taskId);

    if (!task || !isTodoTask(task)) {
      return null; // Can only start todo tasks
    }

    const inProgressTask: InProgressTask = {
      ...task,
      status: "in-progress",
      startedAt: new Date(),
      estimatedHours,
      updatedAt: new Date(),
    };

    this.taskRepo.update(taskId, inProgressTask);
    return inProgressTask;
  }

  // Complete a task (in-progress -> done)
  completeTask(taskId: string, actualHours?: number): DoneTask | null {
    const task = this.taskRepo.findById(taskId);

    if (!task || !isInProgressTask(task)) {
      return null; // Can only complete in-progress tasks
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

  // Get all tasks
  getAllTasks(): Task[] {
    return this.taskRepo.getAll();
  }

  // Get tasks by status using discriminated union
  getTasksByStatus<T extends Task["status"]>(status: T): Task[] {
    return this.taskRepo.filter((task) => task.status === status);
  }

  // Delete a task
  deleteTask(taskId: string): boolean {
    return this.taskRepo.delete(taskId);
  }

  // Get task by ID
  getTaskById(taskId: string): Task | undefined {
    return this.taskRepo.findById(taskId);
  }
}
