"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="page">
      <div className="container" style={{ textAlign: "center", padding: "4rem 0" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Something went wrong</h1>
        <p style={{ color: "var(--color-muted)", marginBottom: "2rem" }}>
          {error.message || "An unexpected error occurred."}
        </p>
        <button onClick={reset} className="btn btn-primary">Try Again</button>
      </div>
    </main>
  );
}
