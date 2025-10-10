#!/usr/bin/env node

///the shebang

import { Command } from "commander";
import { TaskService } from "./task-service";
import { TaskPriority } from "./types";
import { getTaskStatusInfo, calculateTaskDuration } from "./task-utils";

const program = new Command();
const taskService = new TaskService();

program
  .name("task-manager")
  .description("A CLI task management tool built with TypeScript")
  .version("1.0.0");

// Add a new task
program
  .command("add")
  .description("Add a new task")
  .argument("<title>", "Task title")
  .option("-d, --description <description>", "Task description")
  .option(
    "-p, --priority <priority>",
    "Task priority (low|medium|high|urgent)",
    "medium"
  )
  .action((title, options) => {
    const priority = options.priority as TaskPriority;
    const task = taskService.createTask(title, options.description, priority);
    console.log(`✅ Created task: ${task.title} (ID: ${task.id})`);
  });

// List all tasks
program
  .command("list")
  .description("List all tasks")
  .option("-s, --status <status>", "Filter by status (todo|in-progress|done)")
  .action((options) => {
    let tasks = taskService.getAllTasks();

    if (options.status) {
      tasks = taskService.getTasksByStatus(options.status);
    }

    if (tasks.length === 0) {
      console.log("No tasks found.");
      return;
    }

    console.log("\n📋 Tasks:");
    tasks.forEach((task) => {
      console.log(`\n${getTaskStatusInfo(task)}`);
      console.log(`   Priority: ${task.priority}`);
      if (task.description) {
        console.log(`   Description: ${task.description}`);
      }
      console.log(`   ID: ${task.id}`);

      const duration = calculateTaskDuration(task);
      if (duration !== null) {
        console.log(`   Duration: ${duration} hours`);
      }
    });
  });

// Start working on a task
program
  .command("start")
  .description("Start working on a task")
  .argument("<taskId>", "Task ID")
  .option("-e, --estimated <hours>", "Estimated hours to complete")
  .action((taskId, options) => {
    const estimatedHours = options.estimated
      ? parseInt(options.estimated)
      : undefined;
    const task = taskService.startTask(taskId, estimatedHours);

    if (task) {
      console.log(`🚀 Started working on: ${task.title}`);
    } else {
      console.log(
        '❌ Could not start task. Make sure the task exists and is in "todo" status.'
      );
    }
  });

// Complete a task
program
  .command("complete")
  .description("Mark a task as completed")
  .argument("<taskId>", "Task ID")
  .option("-a, --actual <hours>", "Actual hours spent")
  .action((taskId, options) => {
    const actualHours = options.actual ? parseInt(options.actual) : undefined;
    const task = taskService.completeTask(taskId, actualHours);

    if (task) {
      console.log(`✅ Completed task: ${task.title}`);
      const duration = calculateTaskDuration(task);
      if (duration !== null) {
        console.log(`   Total duration: ${duration} hours`);
      }
    } else {
      console.log(
        '❌ Could not complete task. Make sure the task exists and is in "in-progress" status.'
      );
    }
  });

// Delete a task
program
  .command("delete")
  .description("Delete a task")
  .argument("<taskId>", "Task ID")
  .action((taskId) => {
    const success = taskService.deleteTask(taskId);

    if (success) {
      console.log("🗑️  Task deleted successfully.");
    } else {
      console.log("❌ Task not found.");
    }
  });

program.parse();
