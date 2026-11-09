# Membership / payment-security batch (local only)

**Branch:** `phase1/membership-payment-security-20261109`
**Worktree:** `/workspace/pikk-phase1-audit-2026-11-09/memberships-payments/wt`
**Base:** `origin/main` @ `f42b248`
**Not pushed / not merged / not deployed.** Awaiting exact-head independent security review + CI. Do not merge on owner482 “merge all” until that review.

## What shipped in this coherent batch
1. **Webhook concurrency claim** — `UPDATE payment_orders … status='pending' RETURNING id` before ledger credit; concurrent distinct events credit exactly once.
2. **Unfinished event retry** — same Stripe `event.id` without `processed_at` can retry; finished duplicates still short-circuit.
3. **Credit failure revert** — if ledger batch fails after claim, order returns to `pending` so a retry can credit.
4. **No invented subscription grants** — `kind=subscription` still `ignored_unsupported_kind` (no free/paid membership activation).
5. **`GET /memberships/me`** — authenticated, always inactive/authoritative; no prices/tiers/trials; no free grants.
6. **Client grant rejection** — `POST /memberships/join|activate|grant` → 403.
7. **Health flags** — `payments_webhook`, `membership_status` (booleans / non-secret).
8. **Frontend authority** — when API base configured, localStorage/`setMembership` cannot unlock Vault; server membership only.

## Requirements used
- Owner checklist group 18 (backend/auth/payment security) + group 16 ads/memberships honesty
- `MASTER_FEATURES.md` §13 (Ad-Free not final — do not invent)
- Existing schema: `payment_orders`, `payment_events`, double-entry ledger triggers
- Existing webhook contract: coins credit only via verified Stripe-format webhook

## Tests
- Backend full: **311/311** pass (`01-backend-full.txt`)
- Backend focused ledger/memberships/health: **16/16** (`03-backend-focused.txt`)
- Frontend full: **585/585** pass (`02-frontend-full.txt`)
- Frontend focused membership/payments: **7/7** (`04-frontend-focused.txt`)
- Frontend build: OK (`05-frontend-build.txt`)

## Explicit non-goals / remaining launch checks (realistic)
- No real Stripe keys, charges, checkout, or production secret writes
- Email delivery + domain still owner-blocked; R2 still disabled
- Auth/social/password/vault builder PRs still separate; this branch does not preempt their merge
- Two-account live browser verification still blocked (localhost intentional; no bypass)
- Membership activation still unavailable until owner approves plan catalog + migration + Stripe Checkout
- Pages `VITE_PIKK_API_BASE` / production deploy of Phase-1 code still owner-gated
