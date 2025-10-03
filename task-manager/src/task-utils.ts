import { Task, TodoTask, InProgressTask, DoneTask } from "./types";

// Type guards for runtime task status checking
// Similar to your isFish/isBird functions but for task statuses

export function isTodoTask(task: Task): task is TodoTask {
  return task.status === "todo";
}

export function isInProgressTask(task: Task): task is InProgressTask {
  return task.status === "in-progress";
}

export function isDoneTask(task: Task): task is DoneTask {
  return task.status === "done";
}

// Utility function using discriminated union (like your getArea function)
export function getTaskStatusInfo(task: Task): string {
  switch (task.status) {
    case "todo":
      return `Task "${task.title}" is waiting to be started`;
    case "in-progress":
      return `Task "${task.title}" started on ${task.startedAt.toDateString()}`;
    case "done":
      return `Task "${
        task.title
      }" completed on ${task.completedAt.toDateString()}`;
    default:
      // Exhaustiveness checking with never type (like your _defaultShape)
      const _exhaustiveCheck: never = task;
      throw new Error(`Unhandled task status: ${_exhaustiveCheck}`);
  }
}

// Function to calculate task duration (only works for done tasks)
export function calculateTaskDuration(task: Task): number | null {
  if (isDoneTask(task)) {
    // TypeScript knows task is DoneTask here, so completedAt is available
    const duration = task.completedAt.getTime() - task.createdAt.getTime();
    return Math.floor(duration / (1000 * 60 * 60)); // Convert to hours
  }
  return null; // Can't calculate duration for incomplete tasks
}
