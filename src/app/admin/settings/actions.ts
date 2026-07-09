"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateSiteName(formData: FormData) {
  const name = formData.get("siteName") as string;
  const db = getDb();
  db.prepare("INSERT OR REPLACE INTO site_config (key, value) VALUES (?, ?)").run("site_name", name);
  revalidatePath("/admin/settings");
}
