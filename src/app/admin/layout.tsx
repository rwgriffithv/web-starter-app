import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { LogoutButton } from "@/components/logout-button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  if (!(await isAdmin())) redirect("/login");

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/users">Users</Link>
        <Link href="/admin/settings">Settings</Link>
        <div style={{ flex: 1 }} />
        <Link href="/" style={{ opacity: 0.6 }}>&larr; Back to Site</Link>
        <div style={{ marginTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "0.75rem" }}>
          <LogoutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
