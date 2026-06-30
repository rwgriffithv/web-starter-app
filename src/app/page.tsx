import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">
        <section className="hero">
          <h1>Build your next web app, fast.</h1>
          <p>
            A production-ready starter with Next.js App Router, SQLite, admin dashboard,
            and Docker-based deployment — all pre-configured and ready to go.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <Link href="/features" className="btn btn-primary">
              Explore Features
            </Link>
            <Link href="/login" className="btn btn-outline">
              Admin Dashboard
            </Link>
          </div>
        </section>

        <section className="cards">
          <div className="card">
            <h3>Next.js App Router</h3>
            <p>Server-first React with App Router, Server Actions, and strict TypeScript throughout.</p>
          </div>
          <div className="card">
            <h3>SQLite Database</h3>
            <p>Local-first persistence via better-sqlite3 with WAL mode, backups, and type-safe queries.</p>
          </div>
          <div className="card">
            <h3>Admin Dashboard</h3>
            <p>Built-in admin panel with user management, stats, and role-based access control.</p>
          </div>
          <div className="card">
            <h3>Docker Deployment</h3>
            <p>Multi-stage Docker builds with Caddy reverse proxy, Cloudflare Tunnel, and automated backups.</p>
          </div>
          <div className="card">
            <h3>Health Checks</h3>
            <p>Built-in health endpoint for container orchestration and monitoring.</p>
          </div>
          <div className="card">
            <h3>Agentic Toolkit</h3>
            <p>OpenCode integration with reusable skills for web research, testing, and scaffolding.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
