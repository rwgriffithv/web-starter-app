import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <div className="container" style={{ textAlign: "center", padding: "4rem 0" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "0.5rem" }}>404</h1>
        <p style={{ color: "var(--color-muted)", marginBottom: "2rem" }}>Page not found.</p>
        <Link href="/" className="btn btn-primary">Go Home</Link>
      </div>
    </main>
  );
}
