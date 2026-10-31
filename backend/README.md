# PIKK backend foundation — implementation gate

This branch adds a **schema only**. It does not enable real accounts, messaging, streaming, purchases or payouts. No production database or credentials have been configured.

## Implementation sequence
1. **Accounts** — select and configure an identity provider; server-side validate tokens, enforce unique handles, account roles, blocked/suspended users, 18+ eligibility where applicable, and account deletion.
2. **Backend** — provision Cloudflare D1 or equivalent in a private environment; run migrations; build authenticated API with per-user authorization and audit logs. Never expose database credentials in Vite/browser bundles.
3. **Messaging** — server-authorized membership checks on every read/send; rate limits, blocking/reporting, retention, pagination and multi-device synchronization; websocket delivery only after authenticated persistence.
4. **Livestreaming** — choose ingest/playback provider, signed publish tokens, access controls, moderation, session lifecycle and verified real viewers; integrate chat separately.
5. **Payments** — choose processor, verify webhook signatures, enforce event idempotency, persist orders and refunds; seller onboarding/KYC and payouts require provider approval. Do not hold or transfer funds from client state.

## Acceptance tests before production credit
- Account signup/login/logout, expired/revoked token rejection, cross-user denial, and persistence across devices.
- Messages remain after refresh and are inaccessible to nonmembers; blocked users cannot send.
- Real authorized stream ingest and playback across two devices; stream ends cleanly.
- Processor sandbox purchase, duplicate webhook, failed payment, refund and payout eligibility checks.
- Automated CI plus deployed end-to-end checks, rate limiting, secrets review and abuse/moderation testing.

## Security notes
The database schema alone does **not** enforce message sender membership. The authenticated API must enforce it transactionally. Never mark payments paid from a browser request. Use an identity provider rather than storing passwords in this database.

Development meter stays **35% estimated** until completed deployed functionality meets acceptance evidence; production readiness **unmeasured**.

---
## Implemented on `feature/backend-foundation` (LOCAL ONLY, not deployed)
**Decision change:** instead of a third-party identity provider, auth is first-party in the Worker (PBKDF2-SHA256 at 100k iterations, the WebCrypto maximum on Workers). The owner can still swap in an IdP later because `users.auth_subject` is preserved.

- `src/index.js`: router, CSRF origin check, per-IP rate limits (D1 fixed window), standard `{error:{code,message,details},request_id}` errors, CORS locked to `ALLOWED_ORIGIN`
- `src/auth.js`: `/auth/signup|login|logout|me|verify`. Cookie `__Host-pikk_session` is HttpOnly, Secure, `SameSite=${COOKIE_SAMESITE}`. Only a SHA-256 of the token is stored. Role middleware reads `user_roles` from D1 on every request
- `src/ledger.js`, `migrations/0002_*`: append-only double-entry ledger. DB triggers block negative user balances and block new money unless it's tied to a signature-verified `payment_events` row
- `src/webhook.js`: `/webhooks/stripe` verifies the Stripe-format HMAC signature (5-minute tolerance) and dedupes on `(provider, provider_event_id)`. It credits coins only for a matching pending `coins` order. **Stub:** there's no Checkout creation and no Stripe API call yet, and it returns 503 when `STRIPE_WEBHOOK_SECRET` is unset
- Other endpoints: `POST /posts` (text/link, verified only), `/follows`, `/blocks`, `GET /ledger/balance`, `POST /ledger/transfer`, `POST /admin/roles`, `GET /admin/audit`

Run: `cd backend && npm ci && npm test` (Miniflare via @cloudflare/vitest-plugin).
Email delivery is NOT configured. Verification tokens are only echoed when `EXPOSE_VERIFY_TOKEN=true` (tests).
