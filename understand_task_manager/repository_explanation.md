# Understanding `src/repository.ts`

This file defines a generic `Repository` class. Think of a "repository" as a design pattern that provides a structured way to work with a data source. In this case, the data source is a simple JSON file on your computer. This class is designed to handle the common tasks you'd need when managing a collection of data, often referred to as **CRUD** operations: **C**reate, **R**ead, **U**pdate, and **D**elete.

Let's break down the code piece by piece.

### Imports

```typescript
import fs from "fs";
import path from "path";
import { create } from "node:domain"; // Note: This import seems unused and can likely be removed.
```

*   `fs`: This is Node.js's built-in **File System** module. It's used for all operations involving reading from or writing to files on your computer.
*   `path`: This is another Node.js built-in module that helps in working with file and directory paths in a way that's compatible across different operating systems (like Windows, macOS, and Linux).

### The `Enitity` Interface

```typescript
export interface Enitity {
  id: string;
}
```
*(Note: There's a small typo here. It's commonly spelled `Entity`)*.

An `interface` in TypeScript defines a "contract" for the shape of an object. This `Enitity` interface says that any object that wants to be considered an "Enitity" **must** have an `id` property, and that `id` must be a `string`.

This is a fundamental requirement for our repository because it needs a unique way to identify each item in the data collection.

### The `Repository<T extends Enitity>` Class

```typescript
export class Repository<T extends Enitity> {
  // ... class members
}
```

This is the main part of the file.

*   `export class Repository`: This declares a class named `Repository` and makes it available for other files to import and use.
*   `<T extends Enitity>`: This is the magic of **Generics**.
    *   `T` is a placeholder for a type. It means this `Repository` class can work with *any* type of data (like `Task`, `User`, `Product`, etc.).
    *   `extends Enitity`: This is a constraint. It means that whatever type `T` is, it **must** satisfy the `Enitity` interface contract. In other words, it must have a `string` property named `id`.

So, you could create a `Repository<Task>` or a `Repository<User>`, but only if the `Task` and `User` types have an `id: string`.

### Class Properties

```typescript
  private filePath: string;
  private data: T[] = [];
```

*   `private filePath: string;`: This will store the full path to the JSON file where data is saved. The `private` keyword means it can only be accessed from within the `Repository` class itself.
*   `private data: T[] = [];`: This is an in-memory cache of the data. It's an array (`[]`) of items of type `T`. When the repository starts, it loads data from the file into this array. All operations (like adding, updating, finding) happen on this array first, and then the array is saved back to the file.

### The `constructor`

```typescript
  constructor(filename: string) {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    this.filePath = filename;
    this.loadData();
  }
```

The `constructor` is a special method that runs automatically when you create a new instance of the class (e.g., `new Repository<Task>('tasks.json')`).

1.  It takes a `filename` (like `'tasks.json'`) as an argument.
2.  `path.join(process.cwd(), "data")`: It constructs a path to a `data` directory inside your project's root folder. `process.cwd()` gives the current working directory.
3.  `!fs.existsSync(dataDir)`: It checks if this `data` directory does **not** exist.
4.  `fs.mkdirSync(dataDir, { recursive: true })`: If the directory doesn't exist, it creates it. `{ recursive: true }` ensures it can create parent directories if needed.
5.  `this.filePath = filename;`: It sets the `filePath` property. A better implementation would be `this.filePath = path.join(dataDir, filename);` to ensure files are always created in the `data` directory. As written, it assumes the `filename` provided is already the full, correct path.
6.  `this.loadData();`: It immediately calls the `loadData` method to populate the `this.data` array from the file.

### Core Methods (The "Public API")

These are the methods you'll call from outside the class to interact with your data.

**`getAll(): T[]`**
```typescript
  getAll(): T[] {
    return [...this.data];
  }
```
*   Returns all the items in the repository.
*   `[...this.data]`: This uses the "spread syntax" to create a *shallow copy* of the array. This is good practice because it prevents code outside the repository from accidentally modifying the original `this.data` array directly.

**`findById(id: string): T | undefined`**
```typescript
  findById(id: string): T | undefined {
    return this.data.find((item) => item.id === id);
  }
```
*   It searches the `this.data` array for an item whose `id` matches the one provided.
*   `Array.prototype.find()`: This is a standard JavaScript array method. It returns the first element that satisfies the condition, or `undefined` if no element is found.

**`add(item: T): void`**
```typescript
  add(item: T): void {
    this.data.push(item);
    this.saveData();
  }
```
*   Adds a new `item` to the collection.
*   `this.data.push(item)`: Appends the new item to the end of the `this.data` array.
*   `this.saveData()`: Calls the private method to write the updated array back to the JSON file, persisting the change.

**`update(id: string, updatedItem: Partial<T>): T | null`**
```typescript
  update(id: string, updatedItem: Partial<T>): T | null {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    this.data[index] = { ...this.data[index], ...updatedItem } as T;
    this.saveData();
    return this.data[index]!;
  }
```
*   This method is for modifying an existing item.
*   `Partial<T>`: This is a powerful TypeScript utility type. It takes a type `T` and makes all of its properties optional. This means you can pass in an object with only the fields you want to update (e.g., `{ "status": "completed" }`) instead of the whole task object.
*   `findIndex`: It finds the array index of the item to update. If not found, it returns `-1`.
*   `if (index === -1)`: If the item doesn't exist, it returns `null`.
*   `{ ...this.data[index], ...updatedItem }`: This is the core of the update logic. It uses the spread syntax to merge the existing item with the `updatedItem`. Properties in `updatedItem` will overwrite properties in the original `this.data[index]`.
*   `as T`: This is a type assertion. We are telling TypeScript, "Trust me, the result of this merge is a valid object of type `T`."
*   `saveData()`: Persists the change.
*   `return this.data[index]!`: Returns the newly updated item. The `!` at the end is a non-null assertion, telling TypeScript that we are sure `this.data[index]` is not null or undefined at this point.

**`delete(id: string): boolean`**
```typescript
  delete(id: string): boolean {
    const intitialLength = this.data.length;
    this.data = this.data.filter((item) => item.id !== id);
    if (this.data.length < intitialLength) {
      this.saveData();
      return true;
    }
    return false;
  }
```
*   Removes an item from the collection.
*   `this.data.filter((item) => item.id !== id)`: `Array.prototype.filter()` creates a *new* array containing only the items that pass a test. Here, it keeps all items whose `id` does **not** match the one we want to delete.
*   It then checks if the array length changed. If it did, it means an item was successfully deleted.
*   If deleted, it saves the data and returns `true`. Otherwise, it returns `false`.

**`filter(predicate: (item: T) => boolean): T[]`**
```typescript
  filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }
```
*   This is a flexible method that allows you to find items based on any custom logic.
*   A `predicate` is a function that takes an item and returns `true` (keep it) or `false` (discard it).
*   You could use it like this: `myRepo.filter(task => task.status === 'completed')`.

### Private Helper Methods

These methods are for internal use by the class only.

**`loadData(): void`**
```typescript
  private loadData(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, {
          encoding: "utf-8",
        });
        const rawData = JSON.parse(fileContent) || [];

        this.data = rawData.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
          ...(item.status === "in-progress" && {
            startedAt: new Date(item.startedAt),
          }),
        }));
      }
    } catch (error) {
      console.log(`Error loading data from ${this.filePath}`, error);
      this.data = [];
    }
  }
```
*   `try...catch`: This block handles potential errors during file operations. If anything goes wrong (e.g., file is corrupted), the program won't crash.
*   `fs.existsSync`: Checks if the data file actually exists before trying to read it.
*   `fs.readFileSync`: Reads the entire content of the file into a string.
*   `JSON.parse(fileContent)`: Parses the JSON string from the file into a JavaScript array of objects.
*   `rawData.map(...)`: This is a very important step. When you store dates in JSON, they are converted to strings. When you load them back, they are still strings. This `.map()` loop goes through each loaded item and correctly converts the date strings (`createdAt`, `updatedAt`, etc.) back into real JavaScript `Date` objects. This process is often called "deserialization" or "hydration".
*   The conditional spread `...(item.status === "in-progress" && { startedAt: new Date(item.startedAt) })` is a clever way to only add the `startedAt` property if the task status is 'in-progress'.

**`saveData(): void`**
```typescript
  private saveData(): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.log("Error saving data:", error);
    }
  }
```
*   This method does the opposite of `loadData`. It persists the current state of the `this.data` array to the file.
*   `JSON.stringify(this.data, null, 2)`: This converts the JavaScript array of objects (`this.data`) into a nicely formatted JSON string. The `null, 2` arguments are for pretty-printing, making the JSON file human-readable with an indentation of 2 spaces.
*   `fs.writeFileSync`: This writes the string to the file, overwriting the previous content.
