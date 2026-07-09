import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";

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
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
