// Base interfaces for our task management system
// These demonstrate TypeScript interface concepts similar to your Circle/Square/Rectangle example

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

// Base task properties that all tasks will have
export interface BaseTaskData {
  id: string;
  title: string;
  description?: string;
  projectId?: string;
  assigneeId?: string;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

// Task priority enum
export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

// Discriminated union for task statuses (like your Circle/Square/Rectangle example)
// Each status has a "status" discriminator property

export interface TodoTask extends BaseTaskData {
  status: "todo";
  // Todo tasks don't have additional properties
}

export interface InProgressTask extends BaseTaskData {
  status: "in-progress";
  startedAt: Date;
  estimatedHours?: number;
}

export interface DoneTask extends BaseTaskData {
  status: "done";
  completedAt: Date;
  actualHours?: number;
}

// Union type combining all task statuses (like your Shape = Circle | Square | Rectangle)
export type Task = TodoTask | InProgressTask | DoneTask;
