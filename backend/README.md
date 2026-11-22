# PIKK Backend Engine v0.6

Native creator platform API (Cloudflare Workers + Hono + D1).

## Maturity (target ~60%)

| System | ~% | Notes |
|--------|-----|-------|
| Engine / Auth | 85% | Complete auth lifecycle |
| Native PIKK Live discovery | 55% | Public `/live` + sessions |
| Broadcast control plane | 55% | Tokens, relays, connectors |
| Vault | 40% | Code complete; R2 dashboard gate |
| Payments | 50% | Full TEST MODE + gifts |
| AI Support | 55% | Live path when AI_API_KEY set |
| Shield / Moderation | 45% | Flags, actions, appeals |
| Supervisor | 45% | Queue + runners |
| Master Mind (admin) | 45% | Overview + activity |
| Notifications | 50% | Inbox + mark read |
| Creator onboarding | 55% | Apply + admin review |
| **Overall** | **~58%** | External: R2 enable, AI key, Stream/OAuth |

## Production D1
- Database: `pikk-engine-db`
- ID: `7019f730-4eeb-4f00-b8f1-bd5a034fed6e`
- Account: PIKK (separate from legacy `pikk-db` schema)

## Quick start
```bash
cd backend
npm install
npm run db:migrate:prod   # if needed
npm run deploy
```

## Connect remaining
1. Enable R2 in CF Dashboard (PIKK account) → create `pikk-vault`
2. `npx wrangler secret put AI_API_KEY`
3. Later: Cloudflare Stream for real media, Stripe for real money
