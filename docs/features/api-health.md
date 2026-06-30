# Health Check API

- **Date:** 2026-06-29
- **Scope:** `/api/health` endpoint design and usage

## Endpoint

```
GET /api/health
```

A lightweight endpoint that verifies both the Next.js server and the SQLite database are operational.

## Response

### Success (200)

```json
{
  "status": "ok",
  "database": "connected"
}
```

### Failure (503)

```json
{
  "status": "error",
  "database": "disconnected"
}
```

## Implementation

```typescript
// src/app/api/health/route.ts
export async function GET() {
  try {
    const db = getDb();
    db.prepare("SELECT 1").get();
    return NextResponse.json({ status: "ok", database: "connected" });
  } catch {
    return NextResponse.json({ status: "error", database: "disconnected" }, { status: 503 });
  }
}
```

The health check performs a minimal SQL query (`SELECT 1`) to confirm:

1. The database file exists and can be opened
2. The WAL mode is not corrupted
3. The query execution path is functional

## Usage

### Docker Health Check

The `docker-compose.yml` uses this endpoint for the `webapp` service health check:

```yaml
healthcheck:
  test: ["CMD", "node", "-e",
    "require('http').get('http://localhost:3000/api/health',
      r => process.exit(r.statusCode === 200 ? 0 : 1))"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 15s
```

The health check runs as a Node.js one-liner inside the container, hitting `localhost:3000` directly (not through Caddy). This verifies the application server is responsive independently of the proxy layer.

### Monitoring

The endpoint can also be used by external monitoring services (e.g., UptimeRobot, Grafana) through the public domain. Traffic reaches the endpoint through the full stack:

```
Monitoring → Cloudflare Edge → Tunnel → Caddy → webapp → SQLite
```

## Design Decisions

| Decision | Rationale |
|---|---|
| Dedicated health route vs. root page | Root page is static HTML; health check needs to verify DB connectivity |
| `SELECT 1` query | Minimal overhead — no table scans, no locks |
| 503 on failure | Docker interprets non-200 as unhealthy; 503 triggers restart |
| No auth on endpoint | Health checks must be unauthenticated for Docker to use them |
