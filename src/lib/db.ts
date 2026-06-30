import Database from "better-sqlite3";
import path from "path";

const DB_PATH = process.env.DATABASE_URL?.replace(/^file:/, "") || path.join(process.cwd(), "data", "dev.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  }
  return db;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "user";
  created_at: string;
}

export interface PageView {
  id: number;
  path: string;
  viewed_at: string;
}
