export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseTask {
  id: string;
  title: string;
  description?: string | undefined;
  projectId?: string | undefined;
  assignedTo?: string | undefined;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent", 
}

export interface TodoTask extends BaseTask {
  status: "todo";
}

export interface InProgressTask extends BaseTask {
  status: "in-progress";
  startedAt: Date;
  estimatedHours?: number;
}

export interface DoneTask extends BaseTask{
  status: "done";
  completedAt: Date;
  actualHours: number;
}

export type Task = TodoTask | InProgressTask | DoneTask