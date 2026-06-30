# Admin Dashboard

- **Date:** 2026-06-29
- **Scope:** Admin panel routes, sidebar layout, and page descriptions

## Overview

The admin dashboard is a set of protected routes under `/admin`. Access is controlled at the layout level — all routes within `/admin/*` require a valid admin session. Unauthenticated users are redirected to `/login`.

## Layout

The admin layout (`src/app/admin/layout.tsx`) provides:

- **Guard** — Calls `isAdmin()`; redirects to `/login` if not authenticated
- **Sidebar** — Dark-themed navigation panel with links to Dashboard, Users, Settings
- **Back to Site** — Link to return to the public site

```
┌─────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────────────────┐ │
│  │          │  │                      │ │
│  │  Admin   │  │  Dashboard           │ │
│  │  Panel   │  │  Description text    │ │
│  │          │  │                      │ │
│  │  ►Dashboard│  │  [Stats Cards]       │ │
│  │  Users   │  │                      │ │
│  │  Settings│  │  Recent Users Table  │ │
│  │          │  │                      │ │
│  │  ← Site  │  │                      │ │
│  └──────────┘  └──────────────────────┘ │
└─────────────────────────────────────────┘
```

## Routes

### `/admin` — Dashboard Overview

The main dashboard page (`src/app/admin/page.tsx`) renders:

**Stats Cards** — Three summary metrics from the database:

| Metric | Query |
|---|---|
| Total Users | `SELECT COUNT(*) FROM users` |
| Admins | `SELECT COUNT(*) FROM users WHERE role = 'admin'` |
| Recent Signups | Count of last 5 users |

**Recent Users Table** — The 5 most recently created users, showing:

| Column | Data |
|---|---|
| Name | `user.name` |
| Email | `user.email` |
| Role | Badge with admin/user styling |
| Joined | Formatted date from `user.created_at` |

All data is fetched in the Server Component with direct SQL queries.

### `/admin/users` — User Management

Full user list (`src/app/admin/users/page.tsx`) with all users ordered by creation date (descending). Shows the same columns as the dashboard table plus a monospace `ID` column.

### `/admin/settings` — Application Settings

A read-only settings page (`src/app/admin/settings/page.tsx`) displaying:

- **Application Name** — `config.siteName` (set via `APP_NAME` env var, defaults to `"WebStarter"`)
- **Database** — `DATABASE_URL` or fallback path
- **Build** — Next.js 14, TypeScript strict, App Router

Designed as an extension point — settings can be made editable via Server Actions in a future iteration.

## Component Architecture

```
admin/layout.tsx          ← Server Component (guard + sidebar)
  ├── admin/page.tsx      ← Server Component (stats + recent users)
  ├── admin/users/page.tsx ← Server Component (full user list)
  └── admin/settings/page.tsx ← Server Component (read-only config)
```

All admin pages are Server Components. No Client Components are used — the admin panel is fully server-rendered HTML with no client-side JavaScript for data fetching.

## Styling

The admin panel uses CSS custom properties scoped to the `.admin-layout` and `.admin-sidebar` classes in `globals.css`:

| Variable | Value | Usage |
|---|---|---|
| `--color-sidebar` | `#1e293b` | Dark sidebar background |
| `--color-sidebar-text` | `#cbd5e1` | Sidebar link text |
| `--color-sidebar-active` | `#ffffff` | Active/hover link text |

## Future Extensions

| Feature | Approach |
|---|---|
| Editable settings | Server Action with `revalidatePath` |
| User CRUD | Form + Server Action for create/update/delete |
| Pagination | SQL `LIMIT/OFFSET` with page params |
| Search | `WHERE name LIKE ? OR email LIKE ?` |
| Chart visualizations | Client Component with chart library |
