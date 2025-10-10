import fs from "fs";
import path from "path";
import { create } from "node:domain";

export interface Entity {
  id: string;
}

export class Repository<T extends Entity> {
  private filePath: string;
  private data: T[] = [];

  constructor(filename: string) {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    this.filePath = filename;
    this.loadData();
  }
  getAll(): T[] {
    return [...this.data];
  }

  findById(id: string): T | undefined {
    return this.data.find((item) => item.id === id);
  }

  add(item: T): void {
    this.data.push(item);
    this.saveData();
  }

  update(id: string, updatedItem: Partial<T>): T | null {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    this.data[index] = { ...this.data[index], ...updatedItem } as T;
    this.saveData();
    return this.data[index]!;
  }

  delete(id: string): boolean {
    const intitialLength = this.data.length;
    this.data = this.data.filter((item) => item.id !== id);
    if (this.data.length < intitialLength) {
      this.saveData();
      return true;
    }
    return false;
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }

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

  private saveData(): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.log("Error saving data:", error);
    }
  }
}
