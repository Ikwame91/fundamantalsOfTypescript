# Task Manager CLI

A simple command-line tool for managing your tasks.

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd understand_task_manager
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Build the project:
    ```bash
    npm run build
    ```
5.  Link the package to make the `task-manager` command available globally:
    ```bash
    npm link
    ```

## Usage

You can now use the `task-manager` command from anywhere in your terminal.

### Add a new task

```bash
task-manager add <title> [options]
```

**Arguments:**
-   `<title>`: The title of the task (required).

**Options:**
-   `-d, --description <description>`: A description for the task.
-   `-p, --priority <priority>`: The priority of the task (low, medium, high, urgent). Defaults to `medium`.

**Example:**
```bash
task-manager add "Finish the report" -d "Complete the final draft of the quarterly report" -p "high"
```

### List all tasks

```bash
task-manager list [options]
```

**Options:**
-   `-s, --status <status>`: Filter tasks by status (todo, in-progress, done).

**Example:**
```bash
task-manager list -s "in-progress"
```

### Start a task

```bash
task-manager start <taskId> [options]
```

**Arguments:**
-   `<taskId>`: The ID of the task to start.

**Options:**
-   `-e, --estimated <hours>`: The estimated hours to complete the task.

**Example:**
```bash
task-manager start <task-id> -e 8
```

### Complete a task

```bash
task-manager complete <taskId> [options]
```

**Arguments:**
-   `<taskId>`: The ID of the task to complete.

**Options:**
-   `-a, --actual <hours>`: The actual hours spent on the task.

**Example:**
```bash
task-manager complete <task-id> -a 10
```

### Delete a task

```bash
task-manager delete <taskId>
```

**Arguments:**
-   `<taskId>`: The ID of the task to delete.

**Example:**
```bash
task-manager delete <task-id>
```
