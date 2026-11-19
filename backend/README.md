# PIKK Backend (Engine)

Cloudflare Workers + Hono + D1 foundation.

## Stack
- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Database**: D1 (SQLite)
- **Auth**: email/password + httpOnly secure cookie sessions

## Setup

```bash
cd backend
npm install

# Create D1 database (first time)
npx wrangler d1 create pikk-db
# Copy the database_id into wrangler.toml

# Run migrations locally
npm run db:migrate

# Dev server
npm run dev
```

## Endpoints (current)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API info |
| GET | `/health` | Health + DB check |
| POST | `/auth/signup` | Create account |
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Current user |

## Next (ENG-002+)
- Email verification flow
- Roles / permissions middleware
- Rate limiting
- Production cookie domain & CORS lockdown
