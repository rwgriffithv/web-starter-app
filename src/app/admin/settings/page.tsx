import { Header } from "@/components/header";
import { getConfig } from "@/lib/config";
import { getDb } from "@/lib/db";
import { updateSiteName } from "./actions";

export default function AdminSettingsPage() {
  const cfg = getConfig();
  const db = getDb();
  const row = db.prepare("SELECT value FROM site_config WHERE key = 'site_name'").get() as { value: string } | undefined;
  const siteName = row?.value || cfg.siteName;

  return (
    <>
      <Header title="Settings" description="Manage application settings." />
      <div style={{ maxWidth: "500px" }}>
        <form action={updateSiteName}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.25rem" }}>Application Name</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.5rem" }}>{siteName}</p>
            <input
              type="text"
              name="siteName"
              defaultValue={siteName}
              style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", fontSize: "0.875rem" }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
        <div style={{ marginTop: "2rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.25rem" }}>Database</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>SQLite (WAL mode) &mdash; {process.env.DATABASE_URL || "data/dev.db"}</p>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.25rem" }}>Build</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>Next.js 16 &middot; TypeScript (strict) &middot; App Router</p>
          </div>
        </div>
      </div>
    </>
  );
}
