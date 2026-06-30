"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb, type User } from "@/lib/db";
import { createSession } from "@/lib/auth";

// DEMO ONLY: For production, use a real auth provider (e.g., Auth.js, Lucia).
// The admin password is configurable via ADMIN_PASSWORD env var.
// Defaults to "admin" so the starter works out of the box.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

interface LoginState { error?: string }

export async function login(prevState: LoginState | null, formData: FormData): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as User | undefined;

  if (!user || password !== ADMIN_PASSWORD) {
    return { error: "Invalid email or password." };
  }

  const store = cookies();
  store.set("session", createSession(user), { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 });

  redirect("/admin");
}
