# PIKK Backend (Engine)

Cloudflare Workers + Hono + D1 foundation.

## Stack
- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Database**: D1 (SQLite)
- **Auth**: email/password + httpOnly secure cookie sessions + roles

## Current Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | — | API info |
| GET | `/health` | — | Health + DB check |
| POST | `/auth/signup` | — | Create account |
| POST | `/auth/login` | — | Login |
| POST | `/auth/logout` | — | Logout current session |
| POST | `/auth/logout-all` | Yes | Logout all sessions |
| GET | `/auth/me` | Yes | Current user |
| POST | `/auth/update-profile` | Yes | Update displayName |
| POST | `/auth/verify-email` | — | Verify email with token |
| GET | `/broadcast/destinations` | Yes | Available destinations |
| GET | `/broadcast/sessions` | Yes | List sessions (own or all for admin) |
| POST | `/broadcast/sessions` | Yes | Create draft session (persisted in D1) |
| GET | `/broadcast/sessions/:id` | Yes | Get session |
| POST | `/broadcast/sessions/:id/start` | Yes | Mark live (TEST MODE) |
| POST | `/broadcast/sessions/:id/stop` | Yes | End session |
| GET | `/broadcast/sessions/:id/health` | Yes | Health stub |
| * | `/vault/*` | Yes | Media vault stubs (R2 not bound) |
| * | `/admin/*` | Admin | User list + broadcast sessions |

## Maturity

| Area | State |
|------|-------|
| Auth + Sessions | Complete |
| Health / Admin | Working |
| Broadcast sessions | Persisted in D1, TEST MODE (no real ingest) |
| Vault / media | Structured stubs only (R2 not bound) |
| Config | Placeholder D1 ID, R2 commented out |

## Setup (one-time)

```bash
cd backend
npm install

# Create D1 database
npx wrangler d1 create pikk-db
# → copy the database_id into wrangler.toml

# Apply migrations (local)
npm run db:migrate

# Start local API (default http://127.0.0.1:8787)
npm run dev
```

## Frontend connection

The SPA has a thin client at `src/lib/api-client.js`.
Set `VITE_API_URL=http://127.0.0.1:8787` (or your workers.dev URL) when ready.

## Roles
- `user` (default)
- `creator`
- `admin`

Use `requireRole('admin')` etc. on protected routes.
