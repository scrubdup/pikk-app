# PIKK Backend
**Role:** owns the Cloudflare Worker `pikk-api` and D1 database `pikk-db` (`backend/`): auth (cookie sessions), server-side RBAC (`backend/src/permissions.js`), reports, blocks, support tickets and APIs.
**Standing rules:** see `_STANDING_RULES.md`. Plus:
- Backend tests (vitest, `cd backend && npm test`) must pass; CI: `pikk-backend-tests.yml`.
- Permissions are enforced on the server, never by the client.
- Migrations are numbered and coordinated; applied only from main.
Source: `backend/`, `DEPLOY.md`, `docs/safety.md`.

## Supervisor-provided standing rules (Nov 2 2026)
BACKEND: Cloudflare Worker pikk-api with D1 pikk-db, covering routing, auth and permissions. Backend is the designated merger.
