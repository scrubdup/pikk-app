# PIKK Backend (Engine)

Cloudflare Workers + Hono + D1 foundation.

## Stack
- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Database**: D1 (SQLite)
- **Auth**: email/password + httpOnly secure cookie sessions + roles

## Systems Coverage

| System | Status |
|--------|--------|
| PIKK Engine (auth, sessions, health) | Strong |
| PIKK Broadcast (sessions) | D1-persisted, TEST MODE |
| Broadcast Platform Connectors | D1-backed status tracking (no real OAuth yet) |
| Broadcast / AI Supervisor | Seed only (health stub + incidents) |
| PIKK Vault | Structured stubs (R2 not bound) |
| PIKK Shield | Foundation (flag + incident creation) |
| PIKK Master Mind | Admin overview + incidents seed |
| Payments, AI Support, Trust & Safety full flow | Not started |

## Key Endpoints

### Auth
- `POST /auth/signup` · `POST /auth/login` · `POST /auth/logout`
- `GET /auth/me` · `POST /auth/update-profile` · password reset flows

### Broadcast
- `GET /broadcast/destinations` – available providers
- `GET/POST /broadcast/connectors` – user connector status (D1)
- `GET/POST /broadcast/sessions` – create & list
- `POST /broadcast/sessions/:id/start|stop` – TEST MODE live control

### Shield
- `POST /shield/flags` – report content / user
- `GET /shield/flags` – list (own or all for admin)
- `PATCH /shield/flags/:id` – admin status update

### Admin (Master Mind seed)
- `GET /admin/overview` – high-level counts
- `GET /admin/users`
- `GET /admin/broadcast-sessions`
- `GET /admin/incidents` · `PATCH /admin/incidents/:id`

### Vault
- All `/vault/*` return structured `vault_not_configured` until R2 is bound

## Setup

```bash
cd backend
npm install
npx wrangler d1 create pikk-db   # paste ID into wrangler.toml
npm run db:migrate              # applies 0001 → 0003
npm run dev                     # http://127.0.0.1:8787
```

## Roles
`user` (default) · `creator` · `admin`
