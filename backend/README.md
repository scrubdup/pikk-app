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

## Safety permissions (migration 0003, per `docs/safety.md`)
Roles: `user` (base, replaces `member`), `creator`, plus staff roles `moderator`, `support_agent`, `admin` and `dmca`. Only admins can grant or revoke roles (`POST`/`DELETE /admin/roles`, `reason` required), and every grant or revoke is audited. Roles are read from D1 on every request. The permission map is in `src/permissions.js`.

| Permission | Who | Endpoint(s) |
|---|---|---|
| admin.access | admin | `GET /admin/audit` |
| reports.create | any signed-in user (10/h per user, 30/h per IP) | `POST /reports` |
| reports.view / reports.resolve | moderator, admin | `GET /reports`, `POST /reports/:id/resolve` |
| moderation.action | moderator, admin | `POST /moderation/actions` (remove_content, mute, suspend, ban) |
| ban.permanent | admin | `POST /moderation/actions` with `action: ban_permanent` |
| appeals.review | admin, or a moderator who isn't the original actor | `POST /appeals` (target user, allowed while suspended), `POST /appeals/:id/decide` |
| dating.access | `age_verified_18 = 1`, set only by the signed vendor hook | `GET /dating/eligibility`, `POST /webhooks/age-verification` (stub, HMAC `X-Signature`) |
| roast/battle invite | both sides send `consent_accepted: true` | `POST /roast/invites`, `/roast/invites/:id/accept\|decline` |
| tickets.create | any signed-in user (5/h per user, 20/h per IP) | `POST /tickets`, `GET /tickets/mine` |
| tickets.view / tickets.reply | support_agent, admin | `GET /tickets`, `POST /tickets/:id/reply` |
| copyright.takedown.review | admin, dmca | `POST /takedowns` (anyone, 5/h per IP), `GET /takedowns`, `POST /takedowns/:id/decide` |

Moderation actions are append-only and record actor, target, reason and timestamp. They're also written to `audit_log`. Blocks are enforced by `src/blocks.js` (`isBlocked`, `assertNotBlocked`, `NOT_BLOCKED_SQL`) on follows, the feed, `GET /posts/:id`, `GET /users/:handle`, ledger transfers and roast invites. That module is exported for DMs, profile, live, rooms and dating once those routes exist.
Age verification stores only `age_verified_18`, `age_verification_method` and `age_verified_at`, never ID images. No client endpoint can set it, and a DB trigger requires both method and date.

**Frontend wiring TODO (required):** remove the client-side `?admin=1` / Profile "Enable Admin · TEST MODE" gate (`src/pages/admin.js`, `src/pages/profile.js`, `setAdminRole` in `src/store.js`). Gate admin UI on `GET /auth/me` roles instead. Never trust a client role.

## Reconciliation with other open PRs (2026-10-31, local)
To avoid duplicating parallel work on scrubdup/pikk-app:
- **#169** (backend schema): **reused.** Merged as `0001_core.sql`; `payment_events` was rebuilt in 0002 to add dedupe and signature fields.
- **#25** (auth readiness contract): **superseded.** The same `src/auth/readiness.js` already landed on `main` via #27.
- **#29** (forged browser auth flags): **reused.** Cherry-picked (`-x`) so a client `verifiedByServer` flag never authenticates. The backend mirrors this: signup ignores client `roles`, `email_verified`, `verifiedByServer` and `age_verified_18` (tests in `signup-roles.test.js`).
- **#110** (multi-role signup): **aligned.** Its nine approved roles are stored in `user_signup_roles` (migration 0004) as *declared* capabilities, editable via `POST /account/signup-roles`, with `member` permanent. They are **not** permissions (per #110: "Role selection is not approval or permission to monetize"). The UI (`shells.js`) stays on #110.
- **#111** (production readiness plan): **aligned by reference, not copied.** This branch covers these P0 items from `PIKK_PRODUCTION_INTEGRATIONS_MASTER_PLAN.md`:
  - **Partly done:** auth (email + sessions), with no password reset, MFA or deletion yet.
  - **Done:** roles and admin RBAC; schema for users, roles, follows, posts, messages, reports and moderation; ledger and webhook idempotency.
  - **Not yet:** age assurance, which is only a vendor hook stub.
  - Not covered: storage, queues, media, realtime, payouts, KYC and tax.
  The milestone ledger stays on #111. This branch doesn't change the meter.
- **#28** (signup copy + supervisor audit doc): **not folded.** It's frontend copy that overlaps `shells.js` with #110 and needs to be resolved there.

## PIKK Master Mind phase 1 (owner role + read-only ops summary)
- `owner` role sits above `admin`: every admin permission plus `ops.view`. Admins cannot grant, revoke, or change roles on the owner (403); moderators/admins cannot moderate the owner.
- Owner is assigned **only** by the one-time bootstrap `POST /bootstrap/owner` (`Authorization: Bearer $OWNER_BOOTSTRAP_TOKEN`, `Origin` = ALLOWED_ORIGIN, body `{"handle":"..."}`). Disabled (404) unless the secret is set; refuses (409) once an owner exists; writes `bootstrap.owner` to `audit_log`. Remove the secret afterwards. Not run against any real environment.
- `GET /admin/ops/summary` (ops.view): read-only panels `{status, checkedAt, source, freshnessLimitSec, detail}`; counts only, no PII.
