import Database from "better-sqlite3";
import path from "path";

const dbPath = process.env.DATABASE_URL?.replace(/^file:/, "") || path.join(process.cwd(), "data", "dev.db");

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('admin', 'user')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    viewed_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

console.log("Database initialized at", dbPath);
db.close();
