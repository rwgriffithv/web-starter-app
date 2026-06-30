import { Header } from "@/components/header";

const features = [
  { title: "Server-First Architecture", desc: "All components are Server Components by default. Client boundaries are pushed to leaf nodes." },
  { title: "Type-Safe Database", desc: "SQLite with WAL mode, parameterized queries, and strict TypeScript interfaces for every table." },
  { title: "Admin Dashboard", desc: "Full admin panel with user management, role-based access, and usage statistics." },
  { title: "Health Monitoring", desc: "Built-in /api/health endpoint for container orchestration and uptime monitoring." },
  { title: "Dockerized Deployment", desc: "Multi-stage Docker builds that strip dev dependencies for lean production images." },
  { title: "Caddy Reverse Proxy", desc: "Automatic TLS, security headers, rate limiting, and Cloudflare Tunnel integration." },
  { title: "Automated Backups", desc: "Scheduled SQLite backups with checksum verification and rotation policy." },
  { title: "OpenCode Integration", desc: "AI-assisted development with reusable skills for testing, research, and code generation." },
];

export default function FeaturesPage() {
  return (
    <main className="page">
      <div className="container">
        <Header title="Features" description="Everything included out of the box." />
        <div className="cards" style={{ marginTop: "2rem" }}>
          {features.map((f) => (
            <div className="card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
