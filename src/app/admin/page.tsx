import { getDb, type User } from "@/lib/db";
import { Header } from "@/components/header";

export default function AdminDashboardPage() {
  const db = getDb();
  const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  const admins = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'admin'").get() as { count: number };
  const recentUsers = db.prepare("SELECT * FROM users ORDER BY created_at DESC LIMIT 5").all() as User[];

  return (
    <>
      <Header title="Dashboard" description="Overview of your application." />
      <div className="stats">
        <div className="stat-card">
          <div className="value">{totalUsers.count}</div>
          <div className="label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="value">{admins.count}</div>
          <div className="label">Admins</div>
        </div>
        <div className="stat-card">
          <div className="value">{recentUsers.length}</div>
          <div className="label">Recent Signups</div>
        </div>
      </div>

      <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem" }}>Recent Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {recentUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
              <td>{new Date(u.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
