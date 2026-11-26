# PIKK Engine — Live Status

**Worker:** `pikk-engine`  
**URL:** https://pikk-engine.pikk-0fa.workers.dev  
**Updated:** 2026-11-26

## Bound
- D1: `pikk-engine-db` (`7019f730-4eeb-4f00-b8f1-bd5a034fed6e`)
- R2: `pikk-vault` → `VAULT_BUCKET`
- workers.dev subdomain enabled

## Seeded data
- **78** open text rooms (one per live topic)

## Live endpoints on pikk-engine
| Path | Status |
|------|--------|
| `GET /health` | online + counts |
| `GET /live/categories` | 78 topics |
| `GET /live/topics` | flat + open room counts |
| `GET /rooms` | list open rooms |
| `GET /rooms/:id` | room detail |
| `GET /rooms/:id/messages` | chat history |
| `GET /vault/status` | R2 ready |
| `GET /vault` | object metadata list |
| `GET /admin/overview` | Master Mind stats |
| `GET /payments/catalog/gifts` | gift catalog TEST |

## Full Hono API (repo)
Auth, payments wallet mutations, support, shield, moderation, supervisor, merch, ads, broadcast sessions — implemented in `backend/src`.

Deploy full surface:
```bash
cd backend && npm install && npx wrangler deploy
```

## External remaining
- AI_API_KEY for live AI support
- Stream/WHIP media worker
- Stripe / platform OAuth
- Printful / ad server
