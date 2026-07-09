import { getDb, type User } from "@/lib/db";
import { Header } from "@/components/header";

export default function AdminUsersPage() {
  const db = getDb();
  const users = db.prepare("SELECT * FROM users ORDER BY created_at DESC").all() as User[];

  return (
    <>
      <Header title="Users" description="Manage user accounts." />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{u.id}</td>
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
