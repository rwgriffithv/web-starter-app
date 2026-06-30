import { Header } from "@/components/header";
import { config } from "@/lib/config";

export default function AdminSettingsPage() {
  return (
    <>
      <Header title="Settings" description="Manage application settings." />
      <div style={{ maxWidth: "500px" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.25rem" }}>Application Name</h3>
          <p style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "0.5rem" }}>{config.siteName}</p>
          <input type="text" defaultValue={config.siteName} style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", fontSize: "0.875rem" }} readOnly />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.25rem" }}>Database</h3>
          <p style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>SQLite (WAL mode) &mdash; {process.env.DATABASE_URL || "data/dev.db"}</p>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.25rem" }}>Build</h3>
          <p style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>Next.js 14 &middot; TypeScript (strict) &middot; App Router</p>
        </div>
      </div>
    </>
  );
}
