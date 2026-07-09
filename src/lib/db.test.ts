import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { DDL } from "./schema";
import { runMigrations } from "./migrations";

const TEST_DB_PATH = path.join(process.cwd(), "data", "test.db");

describe("db", () => {
  let db: Database.Database;

  beforeAll(() => {
    fs.mkdirSync(path.dirname(TEST_DB_PATH), { recursive: true });
    db = new Database(TEST_DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    db.exec(DDL);
    runMigrations(db);
  });

  it("creates users table and inserts a row", () => {
    db.prepare("INSERT INTO users (username, name, role, password) VALUES (?, ?, ?, ?)").run(
      "testuser", "Test User", "user", ""
    );
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get("testuser") as Record<string, unknown>;
    expect(user).toBeTruthy();
    expect(user.username).toBe("testuser");
    expect(user.name).toBe("Test User");
    expect(user.role).toBe("user");
  });

  it("enforces unique username constraint", () => {
    expect(() => {
      db.prepare("INSERT INTO users (username, name, role, password) VALUES (?, ?, ?, ?)").run(
        "testuser", "Duplicate", "user", ""
      );
    }).toThrow();
  });

  it("enforces role check constraint", () => {
    expect(() => {
      db.prepare("INSERT INTO users (username, name, role, password) VALUES (?, ?, ?, ?)").run(
        "baduser", "Bad Role", "superadmin", ""
      );
    }).toThrow();
  });

  it("creates page_views table and inserts a row", () => {
    db.prepare("INSERT INTO page_views (path) VALUES (?)").run("/");
    const view = db.prepare("SELECT * FROM page_views LIMIT 1").get() as Record<string, unknown>;
    expect(view).toBeTruthy();
    expect(view.path).toBe("/");
  });

  it("migration adds password column if missing", () => {
    const columns = db.prepare("PRAGMA table_info(users)").all() as { name: string }[];
    const colNames = columns.map(c => c.name);
    expect(colNames).toContain("password");
  });

  afterAll(() => {
    db.close();
    fs.unlinkSync(TEST_DB_PATH);
    try { fs.unlinkSync(TEST_DB_PATH + "-wal"); } catch { /* ignore */ }
    try { fs.unlinkSync(TEST_DB_PATH + "-shm"); } catch { /* ignore */ }
  });
});
