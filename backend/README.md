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
- `src/webhook.js`: `/webhooks/stripe` verifies the Stripe-format HMAC signature (5-minute tolerance) and dedupes on `(provider, provider_event_id)`. It credits coins only for a matching `coins` order (identical amount/currency, buyer taken from the server order row). The order transition, the ledger transaction, both entries, the audit row and the event outcome are written in ONE D1 batch (one transaction, no compensating revert). Deterministic per-order ids (`txn_order_<order>`, PRIMARY KEY in 0002) make a second credit for the same order impossible at the DB level; a paid-but-uncredited order left by the pre-fix code is completed on retry of the same payment. Unfinished events (no `processed_at`) may retry. **Stub:** there's no Checkout creation and no Stripe API call yet, and it returns 503 when `STRIPE_WEBHOOK_SECRET` is unset. Subscription-kind orders are not auto-granted memberships (commercial plan catalog still pending owner approval).
- `src/memberships.js`, `src/membership-config.js`, `src/stripe-api.js`: membership billing slice, **OFF by default**. It is on only when `MEMBERSHIP_BILLING=enabled` and every one of these is valid:
  - `MEMBERSHIP_STRIPE_MODE`, which must match the key
  - `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` (both secrets)
  - same-origin https `MEMBERSHIP_CHECKOUT_SUCCESS_URL` and `MEMBERSHIP_CHECKOUT_CANCEL_URL`
  - a strict `MEMBERSHIP_CATALOG` JSON (`plan_id`, `stripe_price_id`, `unit_amount`, `currency`, `interval`, `interval_count`; any other key, such as a trial, is rejected)

  No plan, price, interval, trial, grace period or benefit is defined in code. The UI preview prices in `src/data.js` are not a catalog.
  - `POST /memberships/checkout {plan_id}`: verified, active account only.
    - Checks the catalog entry against the live Stripe Price first, and refuses if they drift.
    - Creates a subscription-mode Checkout Session with an idempotency key. Buyer, price and quantity are set by the server.
    - One open checkout per user, enforced by a DB unique index.
    - Refuses if the user already has a non-terminal subscription. Plan changes are policy and still undecided.
  - Webhook: `checkout.session.completed|expired` (mode `subscription`) and `customer.subscription.created|updated|deleted`.
    - The signed event only names the object. State comes from a fresh Stripe API read, because Stripe does not guarantee event order.
    - Mapping uses our checkout row: `client_reference_id` or metadata, plus user id and customer, all write-once.
    - A newer read wins, and `canceled`/`incomplete_expired` never revert.
    - If billing is off, the event is recorded as `ignored_membership_billing_off`.
  - `GET /memberships/me` reports `active` only for status `active` with all of the following:
    - a single item on the catalog price, quantity 1
    - the current period not ended
    - the plan still in the catalog
    - the mode matching

    `trialing` and `past_due` are not entitled. `entitlements` is `null` (`entitlement_policy: unconfigured`) until the owner maps plans to benefits.
  - A checkout row that has a Stripe session id is never retired by our clock alone. Before a new checkout, Stripe is asked:
    - `complete`: sync and return 409;
    - `expired`: allow a new checkout;
    - open, unknown or provider error: 409/502, and no new session.
  - Subscription reads are ordered by a stamp taken BEFORE the Stripe fetch, so the last-started read wins. On a tie, the non-active status wins.
  - Schema gate: if the 0016 tables are absent, billing is not ready (`/health` `membership_billing_reason: schema_missing`). `/me` is inactive, checkout returns 503, and membership events are finished as `ignored_membership_schema_missing`.
  - Transient schema-probe failure (`schema_unknown`) returns 503 and the event stays unprocessed, so Stripe retries it. It is never finished.
  - **RUNBOOK:** never drop or rename the 0016 tables once any checkout session exists. With the tables missing, membership events are finished as ignored and are not replayable.
  - With billing OFF while 0016 exists, events for known subscriptions or checkouts are answered 200 `deferred_membership_billing_off` but left unprocessed (replayable). Nothing is ever granted while off.
    - A signed `customer.subscription.deleted` with a terminal status is applied immediately (revocation only).
    - After re-enabling, the owner runs `POST /admin/memberships/resync` (owner-only, bounded). It re-reads non-terminal subscriptions and open sessions from Stripe, in the CURRENT livemode only (other-mode rows are skipped and counted as `other_mode_skipped`). Each pass reads at most 50 rows of each kind, oldest-attempted first (`resync_attempted_at_ms`), so failing rows rotate and cannot pin the page. Each successful read (resync or webhook sync) stamps `resync_ok_at_ms`. A deferred event is resolved once every still-eligible row has a successful read newer than that event, across as many passes as it takes. A row Stripe answers 404 for, or one that cannot be mapped, is marked `needs_review`: it is never entitled, is excluded from eligibility/completion, and is reported for the owner to resolve by hand. Run the endpoint repeatedly until `complete: true` (`deferred_remaining: 0`); `pending` is the number of eligible rows not yet read since the oldest still-deferred event. A refused call (billing not ready, 503) is audited as `membership.resync_refused`. Note: 0016 is still pending (never applied), so the MB-4 columns were added to it in place.

**MB-5 (404 safety and operator retry).**
- A Stripe 404 only marks a row `needs_review` once the key is known to see the right account. `MEMBERSHIP_STRIPE_ACCOUNT_ID` (`acct_…`) is REQUIRED (MB-6): billing stays off with `stripe_account_missing` until it is set, and a malformed value keeps it off with `stripe_account_invalid`; resync then reads `GET /v1/account` once per pass on the first 404 and aborts the pass with nothing marked on a mismatch (`aborted: stripe_account_mismatch`) or if the account can't be read (`stripe_account_unverified`).
- (Defense in depth, unreachable while the account id is required:) without a verified account, 404s would be held: marked only if the same pass also read some object successfully, and 3 consecutive 404s abort the pass with nothing marked (`stripe_not_found_streak`). An aborted pass never resolves deferred events.
- `POST /admin/memberships/needs-review/retry` (owner-only `membership.resync`, same origin check and shared 10/600s rate limit as resync) takes `{ "all": true }` or `{ "subscription_ids": [...], "checkout_ids": [...] }` (max 50 each, current livemode only). It sets `needs_review = owner_retry_pending`, which puts the rows back into resync first but keeps them NOT entitled until a later successful Stripe read clears the flag; a renewed 404 re-marks them. Audited as `membership.needs_review_retry` (refused 503 as `membership.needs_review_retry_refused`).
- `POST /memberships/checkout` never reuses a `needs_review` open checkout URL: it asks Stripe; expired → retired and a new checkout starts; still open, complete-but-unmappable or 404 → 409 `membership_checkout_needs_review`.
- If the audit write fails after a committed resync/retry, the response is 200 with `audit_failed: true` instead of a 500.
  - **Owner policy, unresolved:** a banned or suspended account with an active subscription still shows `active` in `/me` (checkout is refused for banned accounts). This is documented, not decided.
  - Requires the LOCAL-ONLY migration `migrations-pending/0016_membership_billing.sql`. It is not in `migrations/`, so Workers Builds on main does not apply it. Promotion needs owner approval.
  - Coin settlement (`/webhooks/stripe` coins path) is unchanged.
- `src/memberships.js`: `GET /memberships/me` returns server-authoritative inactive status (no free grants / no invented prices). `POST /memberships/join|activate|grant` is rejected.
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

## Migration numbering

Migrations in `migrations/` run in filename order and must be named `NNNN_lower_snake.sql`. Agreed order for the work in flight (Nov 2, 2026):

| Numbers | Owner / PR | Files |
|---|---|---|
| 0001–0007 | `main` | core, auth/social/ledger, safety, signup roles, music uploads, post engagement, profile fields |
| 0008 | #234 Master Mind phase 1 | `0008_owner_role.sql` |
| 0009–0010 | Vault #236 / #338 | `0009_media.sql`, `0010_vault_processing.sql` (0010 rebuilds `media`, so it needs 0009) |
| 0011–0012 | #336 Master Mind phase 2 | `0011_worker_heartbeats.sql`, `0012_jobs.sql` |
| 0013 | #339 Safety ID verification | `0013_id_verification.sql` |
| 0014+ | next free number at merge time | |

`migrations/RESERVED.json` holds numbers for PRs that haven't merged yet (currently 0009–0010 for Vault), so other PRs can land first without leaving a gap. Reserved numbers count as present for the gap check, which runs from 0001 up to the highest real migration file (so reservations above it are ignored); a file may use a reserved number with any slug (the value is only a hint). Remove the entry in the same PR that adds that `.sql` file; the guard fails if a reserved number also has a real file. **Changes to `RESERVED.json` require owner/reviewer approval** (treat it like a CODEOWNERS-protected file): the guard can't tell whether a number was once used and later deleted, so reviewers must check that a new reservation doesn't reuse a number that has existed on `main` or been applied to any D1 database. Keys starting with `_` are comments. Wrangler only applies `*.sql`, so the JSON file is ignored at deploy.

`test/migration-order.test.js` always fails on bad names or duplicate prefixes. It also fails on skipped numbers, but only when `GITHUB_BASE_REF` is unset (main and local runs); on PR CI gaps are allowed so out-of-order PRs can still go green. Never rename a migration that has already been applied to a real D1 database.

## PIKK Master Mind phase 1 (owner role + read-only ops summary)
- `owner` role sits above `admin`: every admin permission plus `ops.view`. Admins cannot grant, revoke, or change roles on the owner (403); moderators/admins cannot moderate the owner.
- Owner is assigned **only** by the one-time bootstrap `POST /bootstrap/owner` (`Authorization: Bearer $OWNER_BOOTSTRAP_TOKEN`, `Origin` = ALLOWED_ORIGIN, body `{"handle":"..."}`). Disabled (404) unless the secret is set; refuses (409) once an owner exists; writes `bootstrap.owner` to `audit_log`. Remove the secret afterwards. Not run against any real environment.
- `GET /admin/ops/summary` (ops.view): read-only panels `{status, checkedAt, source, freshnessLimitSec, detail}`; counts only, no PII.

## Database migrations (production safety)

Workers Builds must **never** apply migrations from a PR or preview branch. `wrangler.jsonc` has no
`build.command`, so builds only build/upload code. (Until this fix, the build ran
`wrangler d1 migrations apply DB --remote`, which applied unreviewed branch migrations to production `pikk-db`.)

Apply migrations to production only after the PR is reviewed and merged to `main`, either:
- manually: `npm run migrate:remote` from an up-to-date `main` checkout, or
- from a main-only CI step: `npm run migrate:ci`, which runs `scripts/migrate-if-main.mjs` and is a no-op
  unless `WORKERS_CI=1` and `WORKERS_CI_BRANCH=main` (tested in `test/migrate-if-main.test.js`).

Never rename or renumber a migration that has already been applied anywhere: D1 tracks migrations by file
name, so a renamed file is treated as new and re-runs.
