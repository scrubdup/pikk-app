# PIKK Backend (Engine)

Cloudflare Workers + Hono + D1 foundation.

## Version 0.4.0

### Systems Status

| System | Status |
|--------|--------|
| PIKK Engine (auth, sessions, health) | Strong |
| PIKK Broadcast + Connectors | D1-backed sessions & connector status (no real OAuth/ingest) |
| Broadcast Supervisor | Job queue foundation |
| PIKK Vault | Structured stubs (R2 not bound) |
| PIKK Shield | Flagging + incidents |
| Trust & Safety | Moderation actions + appeals |
| Payments & Payouts | Full TEST MODE wallet / transactions / payouts |
| AI Support | Ticket + message threads (AI replies are stubs) |
| PIKK Supervisor | Job enqueue / claim / complete |
| Master Mind | Admin overview + incidents |

### Important Honesty Notes
- **No real payment processor** is connected. All money movement is simulated.
- **No real platform OAuth** or RTMP/WHIP ingest exists yet.
- **AI Support** acknowledges tickets and stores threads; LLM replies are stubs.
- Supervisor provides a job queue; automated bot workers are not running.

### Setup

```bash
cd backend
npm install
npx wrangler d1 create pikk-db   # paste real database_id into wrangler.toml
npm run db:migrate               # applies 0001 → 0004
npm run dev
```

### Main Route Groups
- `/auth/*` – signup, login, sessions, password flows
- `/broadcast/*` – sessions + connectors
- `/payments/*` – wallet, deposit (test), payouts (test)
- `/support/*` – tickets & messages
- `/shield/*` + `/moderation/*` – flags, actions, appeals
- `/supervisor/*` – job queue
- `/admin/*` – overview, users, incidents
- `/vault/*` – media stubs
