# PIKK Master Task Board

**Last updated:** 2026-11-19

## Backend — Complete for v1 auth

All core Engine auth work is done and committed:

- Signup / Login / Logout / Me
- Secure httpOnly sessions
- Roles + admin tools
- Change password
- Email verification endpoint
- Password reset (request + confirm)
- Account deletion
- Rate limiting
- Vault route stubs

**Waiting on owner only:** create D1 + R2, real email provider.

## Frontend Auth — Complete except final main.js wire

| Piece | Status |
|-------|--------|
| API client | DONE |
| Auth service | DONE |
| `#/auth` page | DONE |
| `#/auth/reset` page | DONE |
| Boot session restore helper | DONE |
| Account settings (change pw / delete) | DONE |
| Route registration helper | DONE |
| Import into main.js ROUTES + boot() | One small edit left |

## Docs added

- `docs/AUTH_WIRING.md` — exact steps to go live
- `docs/VAULT_READINESS.md` — R2 activation steps

## Next concrete actions

1. Wire `authRoutes` + `restoreServerSession` into `main.js` (2 lines)
2. Owner runs `wrangler d1 create pikk-db`
3. Test full flow in browser
