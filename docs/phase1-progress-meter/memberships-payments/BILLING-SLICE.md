# Membership billing server slice (LOCAL ONLY, billing OFF by default). Not a launch PASS
- Branch: `feat/membership-billing-server-slice`, based on main `57b3eac`, which already contains the atomic coins fix `a455584`.
- Commits:
  - `d92656c`: pending schema
  - `56abb4a`: code and tests
  - this doc
- Not pushed, merged or deployed. No real Stripe request, account, key or charge.

## What works (server-authoritative, provider-independent until configured)
- **Config, deny by default.** Billing is ON only when every item below is present and valid. Otherwise:
  - there is no checkout;
  - `/memberships/me` is inactive with a `billing_reason`;
  - subscription webhooks are recorded as `ignored_membership_billing_off`.

  Required items:
  - `MEMBERSHIP_BILLING=enabled`
  - `MEMBERSHIP_STRIPE_MODE`, which must match the key
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - same-origin https success and cancel URLs
  - a strict `MEMBERSHIP_CATALOG` (unknown keys such as trials or benefits are rejected)
- **Checkout** (`POST /memberships/checkout`):
  - Verified and active accounts only, and plan_id must be in the catalog.
  - The live Stripe Price must match the catalog (amount, currency, interval, active, recurring, mode, no trial).
  - Buyer, price and quantity are set by the server. The request uses an idempotency key.
  - One open checkout per user (DB index); concurrent requests create one session.
  - Refused when a live subscription exists.
- **Lifecycle:**
  - The signed event names the object, and state comes from a fresh Stripe API read. This follows Stripe's documentation that events are not ordered.
  - Mapping is write-once: our checkout row, user, customer and subscription.
  - A newer read wins, and terminal statuses never revert (DB trigger).
  - Replays and duplicates are deduped by event id.
  - A provider read failure returns a 5xx and Stripe retries.
  - A livemode mismatch is rejected.
- **Entitlement lookup:** `active` only for status `active` with all of the following:
  - a single item on the catalog price, quantity 1
  - the period not ended
  - the plan still in the catalog
  - billing on
- **Honesty fix:** `billing_configured` used to be true whenever a webhook secret existed. It now reflects the full validated config.

## Still owner policy (deliberately unconfigured, not claimed complete)
- Plan catalog: which plans, Stripe price ids, amounts, intervals. The UI 3.99/7.99/12.99 values are previews only.
- What each plan unlocks (Vault tiers, Ad-Free mapping per MASTER_FEATURES §13). `entitlements` is `null`.
- Trials, grace for `past_due`, founding or referral grants, plan upgrade/downgrade, multiple memberships.
- Refund, dispute and chargeback effects on access. Banned or disabled accounts with an active subscription (current behaviour: `/me` still reports it).
- Customer portal / self-serve cancel. The frontend wiring (`setServerMembership` has no caller) is unchanged; the UI is untouched.

## Deployment safety
- Migration 0016 lives in `backend/migrations-pending/`. Workers Builds on main applies only `migrations/` (`migrate-if-main`), so a merge does NOT apply it. Promotion requires owner approval. 0015 is byte-identical.
- Code deployed without 0016 is safe while billing is off: no table is read. Enabling billing without 0016 fails closed (5xx, nothing granted).
- A pushed branch or PR uploads a Workers Builds preview version (not production), as observed on PR #393.

## Review 980375d fixes (forward commit on the same branch)
- **MB-1 (blocker):** a locally expired checkout that has a Stripe session id is now resolved by asking Stripe:
  - `complete`: sync the subscription, then return 409 `membership_exists`;
  - `expired`: retire the row and allow a new checkout;
  - open / unknown / provider error: 409 `checkout_in_progress` or 502, and no new Stripe session.

  The R7 repro now yields exactly one subscription. A concurrent variant is also tested.
- **MB-2:** `synced_at_ms` is taken BEFORE the Stripe read (last-started wins), and on a tie the non-active status wins. The R6 overlap test now keeps `past_due`.
- **Schema gate:** billing counts as configured only if the 0016 tables exist. Otherwise:
  - `/health` gives `membership_billing_reason: schema_missing`;
  - `/me` is 200 inactive;
  - checkout returns 503;
  - events are finished as `ignored_membership_schema_missing` (no 5xx retry loop, 0 Stripe calls);
  - coins still credit.
- **R8, banned account with an active subscription:** this is still owner policy. `/me` keeps reporting the synced status, and a test documents the current behaviour.

## Review d6d79cf fixes (forward commit)
- **MB-3 (blocker):** a failed schema probe (`schema_unknown`) now throws 503, both with billing on and off. The event stays unprocessed and the Stripe retry activates the buyer (S3 test).
- **S2:** with billing off and 0016 present:
  - Events for known subscriptions or checkouts are deferred: 200, but left unprocessed so they stay replayable. They never grant and make no Stripe calls.
  - A signed `subscription.deleted` with a terminal status revokes immediately.
  - Replay after re-enable is processed, not treated as a duplicate.
  - The owner-only `POST /admin/memberships/resync` re-reads state (MB-4). It re-reads non-terminal subscriptions and open sessions from Stripe, in the CURRENT livemode only (other-mode rows are skipped and counted as `other_mode_skipped`). Each pass reads at most 50 rows of each kind, oldest-attempted first (`resync_attempted_at_ms`), so failing rows rotate and cannot pin the page. Each successful read (resync or webhook sync) stamps `resync_ok_at_ms`. A deferred event is resolved once every still-eligible row has a successful read newer than that event, across as many passes as it takes. A row Stripe answers 404 for, or one that cannot be mapped, is marked `needs_review`: it is never entitled, is excluded from eligibility/completion, and is reported for the owner to resolve by hand. Run the endpoint repeatedly until `complete: true` (`deferred_remaining: 0`); `pending` is the number of eligible rows not yet read since the oldest still-deferred event. A refused call (billing not ready, 503) is audited as `membership.resync_refused`. Note: 0016 is still pending (never applied), so the MB-4 columns were added to it in place.

**MB-5 (404 safety and operator retry).**
- A Stripe 404 only marks a row `needs_review` once the key is known to see the right account. `MEMBERSHIP_STRIPE_ACCOUNT_ID` (`acct_…`) is REQUIRED (MB-6): billing stays off with `stripe_account_missing` until it is set, and a malformed value keeps it off with `stripe_account_invalid`; resync then reads `GET /v1/account` once per pass on the first 404 and aborts the pass with nothing marked on a mismatch (`aborted: stripe_account_mismatch`) or if the account can't be read (`stripe_account_unverified`).
- (Defense in depth, unreachable while the account id is required:) without a verified account, 404s would be held: marked only if the same pass also read some object successfully, and 3 consecutive 404s abort the pass with nothing marked (`stripe_not_found_streak`). An aborted pass never resolves deferred events.
- `POST /admin/memberships/needs-review/retry` (owner-only `membership.resync`, same origin check and shared 10/600s rate limit as resync) takes `{ "all": true }` or `{ "subscription_ids": [...], "checkout_ids": [...] }` (max 50 each, current livemode only). It sets `needs_review = owner_retry_pending`, which puts the rows back into resync first but keeps them NOT entitled until a later successful Stripe read clears the flag; a renewed 404 re-marks them. Audited as `membership.needs_review_retry` (refused 503 as `membership.needs_review_retry_refused`).
- `POST /memberships/checkout` never reuses a `needs_review` open checkout URL: it asks Stripe; expired → retired and a new checkout starts; still open, complete-but-unmappable or 404 → 409 `membership_checkout_needs_review`.
- If the audit write fails after a committed resync/retry, the response is 200 with `audit_failed: true` instead of a 500.
- **Low:** a Stripe-complete session that can't be mapped to a subscription returns 409 `membership_checkout_needs_review` with the outcome, and no new session.
- **Runbook:** never drop or rename the 0016 tables once sessions exist (`schema_missing` events are finished as ignored).
- **Still owner policy:** a banned account with an active subscription (R8); the catalog, benefits, trials and grace.

## Frontend wiring (read-only server membership status)
- `src/membership-sync.js` calls `GET /memberships/me` (with credentials) only after a live `GET /auth/me` has confirmed an identity in this runtime: at startup session restore, after Profile sign-in, and when Profile or Pricing is shown. The result goes into `setServerMembership(..., { userId })`, tied to that identity, and is never persisted.
- Concurrent requests for the same identity share one HTTP call. A response that arrives after sign-out, an account switch or a newer request is dropped. A 401, 5xx, network failure or malformed body clears the membership (fail closed).
- In API-configured mode `getMembership()` returns `null`: the server returns `entitlements: null` / `entitlement_policy: 'unconfigured'`, so an active plan id never unlocks Vault tiers, ad-free or other perks by inference. Mapping plans to entitlements is an owner decision that has to come from the server explicitly.
- UI (API mode only; demo mode unchanged):
  - **Pricing → Memberships card:** the status line shows a server state (sign in / checking / unavailable / no active membership / active plan + period end + "member perks are not enabled yet"). The three tier rows and prices are unchanged; Join/Subscribe are disabled with a note that checkout isn't available yet, and no local membership is ever written.
  - **Profile cover:** the local demo tier chip is replaced by a server membership chip ("Membership · checking…", "No membership", "Member · <plan>", "Membership · unavailable").
- Residual fixes (after fcd500f review):
  - `current_period_end` must be a real UTC calendar instant (`YYYY-MM-DDTHH:MM:SS[.mmm]Z`); impossible values such as Feb 30, month 13 or minute 60 are rejected (status unavailable), never normalized.
  - The server plan id is shown verbatim as "plan <id>" (e.g. "Active membership · plan <id> …", chip "Member · plan <id>"). It is not mapped to the demo pricing-preview tier names, because no paid plan ↔ tier contract exists yet (owner decision).
  - "member perks are not enabled yet" is always shown for an active plan; it no longer depends on whether the server sends an entitlements object, since no UI entitlement mapping exists.
  - Every `/auth/me` probe (startup restore in `src/auth/restore-session.js`, Profile check, login, verify-email) is generation-guarded: sign-out and account switches invalidate in-flight probes, so a late response cannot restore a local identity.
  - Sign-out (Profile and Settings, API mode) goes through one path, `src/auth/sign-out.js`: invalidate probes → `POST /auth/logout` → clear live identity, local user and membership — locally even if the request fails. A failed request is reported as "Signed out on this device, but the server did not confirm sign-out…", never as a successful server sign-out. Demo mode keeps its local-only sign-out. Settings labels a backend user "PIKK account" instead of "local demo account".
  - Signup (AG-1) invalidates in-flight probes before the request and again before applying the result, and drops the result if a sign-out happened meanwhile, so an old-cookie `/auth/me` cannot override the new account.
