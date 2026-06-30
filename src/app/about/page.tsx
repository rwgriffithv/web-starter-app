import { Header } from "@/components/header";

export default function AboutPage() {
  return (
    <main className="page">
      <div className="container">
        <Header
          title="About"
          description="How this starter is built and what makes it tick."
        />

        <div style={{ maxWidth: "700px", marginTop: "2rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Architecture</h2>
          <p style={{ marginBottom: "1rem", color: "var(--color-muted)" }}>
            The app follows a server-first architecture with Next.js App Router.
            All data fetching and mutations happen on the server via Server Components
            and Server Actions. Client Components are only used where interactivity
            is required.
          </p>

          <h2 style={{ margin: "2rem 0 1rem" }}>Stack</h2>
          <ul style={{ color: "var(--color-muted)", lineHeight: 2 }}>
            <li><strong>Framework:</strong> Next.js 14 (App Router)</li>
            <li><strong>Language:</strong> TypeScript (strict mode)</li>
            <li><strong>Database:</strong> SQLite via better-sqlite3</li>
            <li><strong>Deployment:</strong> Docker + Caddy + Cloudflare Tunnel</li>
            <li><strong>AI Development:</strong> OpenCode + Ollama</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
