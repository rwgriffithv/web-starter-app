"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb, type User } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";

interface LoginState { error?: string }

export async function login(prevState: LoginState | null, formData: FormData): Promise<LoginState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as User | undefined;

  if (!user || !verifyPassword(password, user.password)) {
    return { error: "Invalid username or password." };
  }

  const store = await cookies();
  store.set("session", createSession(user), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 });

  redirect("/admin");
}
