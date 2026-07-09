import type Database from "better-sqlite3";

export function runMigrations(database: Database.Database): void {
  const columns = database.prepare("PRAGMA table_info(users)").all() as { name: string }[];
  const colNames = columns.map(c => c.name);

  if (!colNames.includes("password")) {
    database.exec("ALTER TABLE users ADD COLUMN password TEXT NOT NULL DEFAULT ''");
  }
}
