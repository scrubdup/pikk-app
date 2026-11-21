# PIKK Backend — Connect Checklist

Do these once, then test. Everything else is already in the API.

## 1. Database
```bash
cd backend
npx wrangler d1 create pikk-db
# paste database_id into wrangler.toml
npm run db:migrate
# or: npm run db:migrate:prod
```

## 2. Vault (R2)
```bash
npx wrangler r2 bucket create pikk-vault
# uncomment [[r2_buckets]] in wrangler.toml
```

## 3. AI Support
```bash
npx wrangler secret put AI_API_KEY
# optional:
npx wrangler secret put AI_BASE_URL   # default https://api.openai.com/v1
npx wrangler secret put AI_MODEL      # default gpt-4o-mini
```
Works with any OpenAI-compatible API (OpenAI, xAI, Groq, etc.).

Without `AI_API_KEY`, support still works with clear stub replies.

## 4. Deploy / local
```bash
npm run dev          # local
npm run deploy       # production worker
```

## 5. Smoke test order
1. `POST /auth/signup` → `POST /auth/login` → `GET /auth/me`
2. `POST /vault/objects` → `PUT /vault/objects/:id/content` → `GET .../content`
3. `POST /broadcast/sessions` → `POST .../start` → `GET .../health`
4. `POST /support/tickets` → check AI mode LIVE vs STUB
5. `POST /payments/deposit` → `POST /payments/gifts` (TEST MODE)
6. `GET /admin/overview` (admin user)

## Native platform vs multistream
PIKK Live is first-class. External YouTube/Twitch/etc. connectors are optional.
Real multistream still needs Cloudflare Stream (or similar) + platform OAuth later.

## Not connected yet (by design)
- Real card payments (Stripe)
- Real WHIP media worker / Cloudflare Stream Live Input
- Platform OAuth apps
- Multistream relay process
