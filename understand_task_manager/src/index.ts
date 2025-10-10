#!/usr/bin/env node
import { Command } from "commander";
import { TaskService } from "./task_service.js";
import { title } from "process";
import type { TaskPriority } from "./types.js";

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
  .action((title,options)=>{
    const priority = options.priority as TaskPriority
    const task = taskService.createTask(title, options.description, priority);
    console.log(`created task ${task.title} with id ${task.id}`);
    
  });
  program.command("list")
