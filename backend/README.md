# PIKK Backend Engine v0.8

Native creator platform API — Cloudflare Workers + Hono + D1 + R2.

## Overall maturity: **~70%**

| System | ~% | Notes |
|--------|-----|-------|
| Auth / Engine | 85% | Full auth lifecycle |
| Trust & Safety | 70% | Report → enforce → appeal |
| Supervisor | 70% | process_next, drain, handlers |
| Master Mind | 70% | Dashboard, alerts, queues |
| AI Support | 55% | Live when AI_API_KEY set |
| Broadcast control | 55% | Tokens, relays; no media plane |
| Native Live discovery | 55% | Public /live |
| Creator onboarding | 55% | Apply + approve |
| Payments | 50% | Full TEST MODE |
| Notifications | 50% | Inbox + system events |
| Social | 50% | Profiles, follow |
| Vault | 40% | Code ready; needs Worker redeploy for R2 |

### Still external (not code)
- Redeploy Worker with R2 binding
- `AI_API_KEY` secret
- Cloudflare Stream / WHIP media
- Stripe
- Platform OAuth

## Key admin routes
- `GET /admin/dashboard` — Master Mind full view
- `GET /admin/overview` — stats only
- `POST /supervisor/process_next` — run one job
- `POST /supervisor/drain` — run batch

## Deploy
```bash
cd backend
npm install
npx wrangler deploy
npx wrangler secret put AI_API_KEY
```
