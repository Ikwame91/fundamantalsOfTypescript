import type { DoneTask, InProgressTask, Task, TodoTask } from "./types.js";

export function isTodoTask(task: Task): task is TodoTask {
  return (task as TodoTask).status === "todo";
}

export function isInProgressTask(task: Task): task is InProgressTask {
  return (task as InProgressTask).status === "in-progress";
}

export function isDoneTask(task: Task): task is DoneTask {
  return (task as DoneTask).status === "done";
}

export function getTaskStatusInfo(task: Task): string {
  switch (task.status) {
    case "todo":
      return `Task "${task.title}" is waiting to be started.`;
    case "in-progress":
      return `Task "${
        task.title
      }" started on ${task.startedAt.toDateString()}.`;
    case "done":
      return `Task "${
        task.title
      }" completed on ${task.completedAt.toDateString()}.`;
    default:
      const _exhaustiveCheck: never = task;
      throw new Error(`Unhandled task status: ${_exhaustiveCheck}`);
  }
}

export function calculateTaskDuration(task: Task): number | null {
  if (isDoneTask(task)) {
    const duration = task.completedAt.getTime() - task.createdAt.getTime();
    return Math.floor((duration / 1000) * 60 * 60);
  }
  return null;
}
