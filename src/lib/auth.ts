// DEMO ONLY: Session encoding uses base64, which is trivially decodeable and forgeable.
// Replace with a real session library (e.g., jose, iron-session, or Auth.js)
// before deploying to production.
import { cookies } from "next/headers";
import { getDb, type User } from "./db";

const SESSION_COOKIE = "session";

interface Session {
  userId: number;
  role: User["role"];
}

function parseSession(): Session | null {
  const store = cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    return JSON.parse(atob(token)) as Session;
  } catch {
    return null;
  }
}

export function getCurrentUser(): User | null {
  const session = parseSession();
  if (!session) return null;
  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(session.userId) as User | undefined;
  return user ?? null;
}

export function isAdmin(): boolean {
  const session = parseSession();
  return session?.role === "admin";
}

export function createSession(user: User): string {
  const session: Session = { userId: user.id, role: user.role };
  return btoa(JSON.stringify(session));
}
