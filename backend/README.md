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
