import * as fs from "fs";
import * as path from "path";

// Generic Repository class using concepts from your generic.ts
// This can store any type of data (tasks, users, projects) with type safety

export interface Entity {
  id: string;
}

export class Repository<T extends Entity> {
  private filePath: string;
  private data: T[] = [];

  constructor(filename: string) {
    // Store data in a data directory
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    this.filePath = path.join(dataDir, filename);
    this.loadData();
  }

  // Generic method to get all items
  getAll(): T[] {
    return [...this.data]; // Return copy to prevent mutation
  }

  // Generic method to find by ID with type safety
  findById(id: string): T | undefined {
    return this.data.find((item) => item.id === id);
  }

  // Generic method to add new item
  add(item: T): void {
    this.data.push(item);
    this.saveData();
  }

  // Generic method to update existing item
  update(id: string, updatedItem: Partial<T>): T | null {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.data[index] = { ...this.data[index], ...updatedItem };
    this.saveData();
    return this.data[index];
  }

  // Generic method to delete item
  delete(id: string): boolean {
    const initialLength = this.data.length;
    this.data = this.data.filter((item) => item.id !== id);

    if (this.data.length < initialLength) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Generic filtering method with predicate function
  filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }

  // Private methods for file operations
  private loadData(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        const rawData = JSON.parse(fileContent) || [];

        // Convert date strings back to Date objects
        this.data = rawData.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
          startedAt: item.startedAt ? new Date(item.startedAt) : undefined,
          completedAt: item.completedAt
            ? new Date(item.completedAt)
            : undefined,
        }));
      }
    } catch (error) {
      console.error(`Error loading data from ${this.filePath}:`, error);
      this.data = [];
    }
  }

  private saveData(): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error(`Error saving data to ${this.filePath}:`, error);
    }
  }
}
