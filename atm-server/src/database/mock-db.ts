import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
const DB_FILE = "./bank.db";
import * as bcrypt from "bcrypt";

export class DatabaseService {
  private db: Database<sqlite3.Database, sqlite3.Statement>;
  constructor() {
    this.db = {} as any;
  }
}
