# Copilot Instructions for TypeScript Task Manager

## Architecture Overview

This is a CLI task management application demonstrating TypeScript best practices through discriminated unions, generics, and type guards. The architecture follows a layered pattern:

- **Types Layer** (`src/types.ts`): Core discriminated union `Task = TodoTask | InProgressTask | DoneTask` with status-based type discrimination
- **Repository Layer** (`src/repository.ts`): Generic `Repository<T extends Entity>` class providing type-safe CRUD operations with JSON persistence
- **Service Layer** (`src/task-service.ts`): Business logic enforcing valid state transitions (todo → in-progress → done)
- **Utility Layer** (`src/task-utils.ts`): Type guards (`isTodoTask`, `isInProgressTask`, `isDoneTask`) and discriminated union handlers
- **CLI Layer** (`src/index.ts`): Commander.js interface exposing task operations

## Key Patterns & Conventions

### Discriminated Unions

The core pattern is status-based task discrimination:

```typescript
type Task = TodoTask | InProgressTask | DoneTask;
// Each interface has status: "todo" | "in-progress" | "done" as discriminator
```

Always use type guards before state transitions:

```typescript
if (!isTodoTask(task)) return null; // Can only start todo tasks
```

### Generic Repository Pattern

Use `Repository<T extends Entity>` for all data storage. New entities must implement `Entity` interface:

```typescript
const userRepo = new Repository<User>("users.json");
const projectRepo = new Repository<Project>("projects.json");
```

### Date Serialization Handling

Repository automatically handles Date object serialization in `loadData()`. When adding Date fields to entities, ensure they're handled in the date conversion mapping.

### Type-Safe State Transitions

Service methods enforce valid transitions and return specific types:

- `createTask()` → `TodoTask`
- `startTask()` → `InProgressTask | null`
- `completeTask()` → `DoneTask | null`

## Development Workflow

### Build & Run Commands

```bash
npm run build      # Compile TypeScript to dist/
npm run dev        # Watch mode compilation
npm start          # Run compiled CLI
node dist/index.js # Direct CLI execution
```

### CLI Usage Patterns

```bash
# Create tasks with priority enum validation
node dist/index.js add "Task title" -d "Description" -p high

# Status filtering uses discriminated union
node dist/index.js list -s todo
node dist/index.js list -s in-progress
node dist/index.js list -s done

# State transitions require proper status
node dist/index.js start <task-id> -e 4    # todo → in-progress
node dist/index.js complete <task-id> -a 3 # in-progress → done
```

## Integration Points

### File Persistence

- All data stored in `data/*.json` files (auto-created)
- Repository handles JSON serialization with Date object conversion
- Files persist between CLI invocations

### Commander.js CLI

- Each command validates input types (TaskPriority enum, task IDs)
- Error handling returns null/false for invalid operations
- Uses emoji prefixes for user feedback consistency

### Error Handling Conventions

- Service methods return `null` for invalid operations (wrong status, missing tasks)
- Repository methods return `boolean` for delete operations, `null` for failed updates
- CLI displays contextual error messages based on return values

## Critical Implementation Details

- **ID Generation**: Uses `crypto.randomUUID()` (Node.js built-in, no external deps)
- **Exhaustiveness Checking**: Switch statements use `never` type for compile-time completeness validation
- **Type Guard Usage**: Always check status before mutations to maintain type safety
- **Immutable Returns**: Repository `getAll()` returns copies to prevent external mutation
- **Date Handling**: JSON persistence requires explicit Date object reconstruction in `loadData()`

## Adding New Features

1. **New Entity Types**: Implement `Entity` interface, create Repository instance, add type guards if needed
2. **New Task Statuses**: Extend discriminated union, add type guard, update switch statements
3. **New CLI Commands**: Follow Commander.js pattern with proper TypeScript type assertions
4. **New Fields**: Update interfaces, handle in Repository date conversion if Date type
