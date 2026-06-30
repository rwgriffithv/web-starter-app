import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const TEST_DB_PATH = path.join(process.cwd(), "data", "test.db");

describe("db", () => {
  let db: Database.Database;

  beforeAll(() => {
    fs.mkdirSync(path.dirname(TEST_DB_PATH), { recursive: true });
    db = new Database(TEST_DB_PATH);
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
  });

  it("creates users table and inserts a row", () => {
    db.prepare("INSERT INTO users (email, name, role) VALUES (?, ?, ?)").run(
      "test@example.com", "Test User", "user"
    );
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get("test@example.com") as Record<string, unknown>;
    expect(user).toBeTruthy();
    expect(user.email).toBe("test@example.com");
    expect(user.name).toBe("Test User");
    expect(user.role).toBe("user");
  });

  it("enforces unique email constraint", () => {
    expect(() => {
      db.prepare("INSERT INTO users (email, name, role) VALUES (?, ?, ?)").run(
        "test@example.com", "Duplicate", "user"
      );
    }).toThrow();
  });

  it("enforces role check constraint", () => {
    expect(() => {
      db.prepare("INSERT INTO users (email, name, role) VALUES (?, ?, ?)").run(
        "bad@example.com", "Bad Role", "superadmin"
      );
    }).toThrow();
  });

  it("creates page_views table and inserts a row", () => {
    db.prepare("INSERT INTO page_views (path) VALUES (?)").run("/");
    const view = db.prepare("SELECT * FROM page_views LIMIT 1").get() as Record<string, unknown>;
    expect(view).toBeTruthy();
    expect(view.path).toBe("/");
  });

  afterAll(() => {
    db.close();
    fs.unlinkSync(TEST_DB_PATH);
    try { fs.unlinkSync(TEST_DB_PATH + "-wal"); } catch { /* ignore */ }
    try { fs.unlinkSync(TEST_DB_PATH + "-shm"); } catch { /* ignore */ }
  });
});
