# Fundamentals of TypeScript

A comprehensive learning repository for mastering TypeScript fundamentals through practical examples and projects.

## 📚 Overview

This repository contains various TypeScript learning materials, examples, and projects designed to help developers understand TypeScript from basic concepts to advanced applications. It includes hands-on examples, complete projects, and detailed learning guides.

## 🗂️ Repository Structure

### 01intro
Introduction to TypeScript basics including:
- Variables and basic types
- Functions
- Arrays
- Objects
- Interfaces
- Enums and Tuples
- Union types

### 02PURETS
Pure TypeScript concepts and advanced features with practical examples.

### task-manager
A complete CLI task management application demonstrating:
- Discriminated unions for type-safe state management
- Layered architecture (UI, Service, Repository)
- TypeScript generics
- Type guards
- Real-world project structure

📖 **Comprehensive Documentation:**
- [PROJECT_OVERVIEW.md](./task-manager/PROJECT_OVERVIEW.md) - Detailed explanation of the architecture
- [CLI_EXPLANATION.md](./task-manager/CLI_EXPLANATION.md) - Command-line interface guide
- [LEARNING-GUIDE.md](./task-manager/LEARNING-GUIDE.md) - Step-by-step learning path

### atm-server
ATM server application exploring server-side TypeScript concepts.

### firstproject
Introductory project for getting started with TypeScript.

### understand_task_manager
Additional resources and explanations for the task manager project.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TypeScript knowledge (basic to intermediate)

### Installation

Clone the repository:
```bash
git clone https://github.com/Ikwame91/fundamantalsOfTypescript.git
cd fundamantalsOfTypescript
```

### Running Examples

#### Basic Examples (01intro)
Navigate to the intro directory and compile TypeScript files:
```bash
cd 01intro
tsc variable.ts
node variable.js
```

#### Task Manager Project
```bash
cd task-manager
npm install
npm run build
node dist/index.js --help
```

Available commands:
```bash
# Add a new task
node dist/index.js add "Your task description"

# List all tasks
node dist/index.js list

# Start a task
node dist/index.js start <task-id>

# Complete a task
node dist/index.js complete <task-id>
```

## 📖 Learning Path

1. **Start with Basics** - Explore the `01intro` directory to understand TypeScript fundamentals
2. **Advanced Concepts** - Move to `02PURETS` for pure TypeScript features
3. **Real-World Application** - Study the `task-manager` project to see how concepts work together
4. **Practice** - Modify and extend the projects to solidify your understanding

## 🎯 Key Learning Objectives

- Understanding TypeScript type system
- Working with interfaces and type aliases
- Implementing type guards and discriminated unions
- Building type-safe applications
- Structuring real-world TypeScript projects
- Using generics effectively
- Command-line application development

## 🛠️ Technologies Used

- TypeScript
- Node.js
- Commander.js (CLI framework)
- File system operations
- JSON data storage

## 📝 Contributing

This is a learning repository. Feel free to:
- Add more examples
- Improve documentation
- Fix bugs or typos
- Suggest new learning projects

## 📄 License

This project is for educational purposes.

## 🔗 Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

## 💡 Tips for Learners

- Start simple and gradually increase complexity
- Type out the examples yourself rather than copy-pasting
- Experiment by modifying the code
- Read the error messages carefully - TypeScript provides helpful feedback
- Use the task-manager project as a reference for real-world patterns

---

Happy Learning! 🎉
