# Error Handling

- **Date:** 2026-06-29
- **Scope:** 404 page and error boundary implementation

## Overview

Next.js App Router provides two built-in error handling mechanisms:

| File | Type | Purpose |
|---|---|---|
| `not-found.tsx` | Server Component | Rendered when `notFound()` is called or route is unmatched |
| `error.tsx` | Client Component | Rendered when a runtime error is thrown during render |

## 404 — Not Found (`src/app/not-found.tsx`)

The custom 404 page handles two scenarios:

1. **Unmatched routes** — Any URL that doesn't match a route file
2. **Explicit `notFound()` calls** — From Server Components or Server Actions

```typescript
export default function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link href="/">Go Home</Link>
    </main>
  );
}
```

This is a **Server Component** — no client-side JavaScript is required to render the 404 page. It reuses the root layout (header, footer) automatically through Next.js layout nesting.

### Route Coverage

```
/                    →  Landing page
/about               →  About page
/features            →  Features page
/login               →  Login page
/admin               →  Admin dashboard
/admin/users         →  User management
/admin/settings      →  Settings
/api/health          →  Health check
/anything-else       →  404
```

Any route not listed above triggers `not-found.tsx`.

## Error Boundary (`src/app/error.tsx`)

The error boundary catches **runtime errors** thrown during rendering of any route or its layout. This includes:

- Database connection failures
- Unexpected `null`/`undefined` dereferences
- Rendering errors in Server Components

```typescript
"use client";

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>{error.message || "An unexpected error occurred."}</p>
      <button onClick={reset}>Try Again</button>
    </main>
  );
}
```

This must be a **Client Component** (`"use client"`) because the `error` and `reset` props are provided by the React error boundary runtime, which only works on the client.

### Props

| Prop | Type | Description |
|---|---|---|
| `error` | `Error & { digest?: string }` | The thrown error object. `digest` is a Next.js-generated hash for log correlation. |
| `reset` | `() => void` | Callback to re-render the failed segment. |

### Recovery Flow

```
Error thrown in render
  │
  ▼
error.tsx mounts (client)
  │  Shows error message + "Try Again" button
  │
  User clicks "Try Again"
  │
  reset() called
  │
  Next.js re-renders the segment
  │
  ┌── Success → page resumes normal operation
  │
  └── Error again → error.tsx re-mounts
```

## Error Handling Strategy

| Scenario | Mechanism | User Experience |
|---|---|---|
| Route not found | `not-found.tsx` | Clean 404 page with "Go Home" link |
| Runtime error in page | `error.tsx` | Friendly message with "Try Again" button |
| Database connection failure | `error.tsx` | Caught by error boundary, retryable |
| Server Action error | Structured return `{ success, error }` | Error message displayed in form |
| API route error | `try/catch` → 503 response | JSON error response |

### Server Action Errors

Server Actions do NOT throw errors to the client. Instead, they return structured responses:

```typescript
interface ActionResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}
```

This pattern is used in the login action (`src/app/login/actions.ts`):

```typescript
if (!user || password !== ADMIN_PASSWORD) {
  return { error: "Invalid email or password." };
}
```

The error is displayed inline in the form via the Client Component's `useFormState` state.
