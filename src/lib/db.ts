import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { getConfig } from "./config";
import { hashPassword } from "./auth";
import { DDL } from "./schema";
import { runMigrations } from "./migrations";

const DB_PATH = process.env.DATABASE_URL?.replace(/^file:/, "") || path.join(process.cwd(), "data", "dev.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");

    db.exec(DDL);
    runMigrations(db);

    seedDefaults(db);
  }
  return db;
}

function seedDefaults(database: Database.Database): void {
  const existingAdmin = database.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'admin'").get() as { count: number };

  if (existingAdmin.count === 0) {
    const cfg = getConfig();
    database.prepare(
      "INSERT INTO users (username, name, role, password) VALUES (?, ?, ?, ?)"
    ).run(cfg.adminUsername, "Admin", "admin", hashPassword(cfg.adminPassword));
  }
}

export interface User {
  id: number;
  username: string;
  name: string;
  role: "admin" | "user";
  password: string;
  created_at: string;
}

export interface PageView {
  id: number;
  path: string;
  viewed_at: string;
}
