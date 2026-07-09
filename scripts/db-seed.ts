import Database from "better-sqlite3";
import path from "path";
import { DDL } from "../src/lib/schema";
import { hashPassword } from "../src/lib/auth";
import { runMigrations } from "../src/lib/migrations";

const dbPath = process.env.DATABASE_URL?.replace(/^file:/, "") || path.join(process.cwd(), "data", "dev.db");

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(DDL);
runMigrations(db);

const adminUsername = process.env.ADMIN_USERNAME || "admin";
const adminPassword = process.env.ADMIN_PASSWORD || "admin";

const existing = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'admin'").get() as { count: number };

if (existing.count === 0) {
  const insertUser = db.prepare("INSERT INTO users (username, name, role, password) VALUES (?, ?, ?, ?)");

  insertUser.run(adminUsername, "Admin User", "admin", hashPassword(adminPassword));
  insertUser.run("alice", "Alice Johnson", "user", hashPassword("alice"));
  insertUser.run("bob", "Bob Smith", "user", hashPassword("bob"));
  insertUser.run("charlie", "Charlie Brown", "user", hashPassword("charlie"));

  const insertView = db.prepare("INSERT INTO page_views (path) VALUES (?)");
  insertView.run("/");
  insertView.run("/features");
  insertView.run("/about");
  insertView.run("/admin");

  console.log("Database seeded with demo data.");
} else {
  console.log("Database already has data. Skipping seed.");
}

db.close();
