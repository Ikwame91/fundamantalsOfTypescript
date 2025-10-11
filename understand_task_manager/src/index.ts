#!/usr/bin/env node
import { Command } from "commander";
import { TaskService } from "./task_service.js";
import type { TaskPriority } from "./types.js";
import { calculateTaskDuration, getTaskStatusInfo } from "./task_utils.js";

const program = new Command();
const taskService = new TaskService();

program
  .name("task-manager")
  .description("Start woring on your tasks")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new task")
  .argument("<title>, Task title")
  .option("-d, --description <description>", "Task description")
  .option(
    "-P, --priority <priority>",
    "Task priority (low|medium|high|urgent)",
    "medium"
  )
  .action((title, options) => {
    const priority = options.priority as TaskPriority;
    const task = taskService.createTask(title, options.description, priority);
    console.log(`created task: ${task.title} with id ${task.id}`);
  });
program
  .command("list")
  .description("List all tasks")
  .option("-s, --status <status>", "Filter by status (todo|in-progress|done)")
  .action((options) => {
    let tasks = taskService.getAllTasks();

    if (options.status) {
      tasks = taskService.getTaskByStatus(options.status);
    }

    if (tasks.length === 0) {
      console.log("No tasks found");
      return;
    }

    console.log("\n Tasks:");
    tasks.forEach((task) => {
      console.log(`\n${getTaskStatusInfo(task)}`);
      console.log(` Priority: ${task.priority}`);
      if (task.description) {
        console.log(` Description: ${task.description}`);
      }
      console.log(` ID ${task.id}`);
      const duration = calculateTaskDuration(task);
      if (duration !== null) {
        console.log(` Duration: ${duration} hours`);
      }
    });
  });

program
  .command("start")
  .description("start working on a task")
  .argument("<taskId>", "Task Id")
  .option("-e, --estimated <hours>", "Estimated hours to complete")
  .action((taskId, options) => {
    const estimatedHours = options.estimated
      ? parseInt(options.estimated)
      : undefined;
    const task = taskService.startTask(taskId, estimatedHours);

    if (task) {
      console.log(` started working on: ${task.title}`);
    } else {
      console.log(
        ` could not start task. Make sure the task exists and is in "todo" status`
      );
    }
  });

program
  .command("complete")
  .description("Mark a task as completed")
  .argument("<taskId>", "TaskId")
  .option("-a, --actual <hours>", "Actual hours spent")
  .action((taskId, options) => {
    const actualHours = options.actual ? parseInt(options.actual) : undefined;
    const task = taskService.completeTask(taskId, actualHours!);

    if (task) {
      console.log(
        ` completed task: ${task.title} with id ${task.id} and it took ${actualHours} hours`
      );
      const duration = calculateTaskDuration(task);
      if (duration !== null) {
        console.log(` total duratiion: ${duration} hours`);
      }
    } else {
      console.log(
        ` could not complete task. Make sure the task exists and is "in progress" status `
      );
    }
  });

program
  .command("delete")
  .description("Delete a task")
  .argument("<taskId>", "Task ID")
  .action((taskId) => {
    const success = taskService.deleteTask(taskId);
    if (success) {
      console.log(" Taks deleted successfuly");
    } else {
      console.log(" task not found");
    }
  });
program.parse();
