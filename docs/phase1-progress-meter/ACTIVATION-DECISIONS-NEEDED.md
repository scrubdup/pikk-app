# Activation decisions still needed

This is a decision checklist, not a status score. Code for several paths already exists on main (see below). Live activation is **held** until the owner fills these and authorizes the matching provider / production steps. Agents must not buy a domain, enable R2, apply migrations, write secrets, or turn billing on without that authorization.

## Already on main (code only — not a live or launch PASS)

- Membership billing server slice (PR #395, `3966c8a`) — Checkout, resync, needs-review, and authoritative `GET /memberships/me` exist. Billing is **off** unless every membership config gate passes. Migration `0016` remains in `backend/migrations-pending/` (not applied).
- Membership UI wiring (PR #396, `fcd500f`) — Profile/Pricing show read-only server status. Join stays disabled while billing is off. UI preview prices in `src/data.js` are not a live Stripe catalog.
- Auth, vault, email-verification *routes*, coin webhook, and health capability flags are in the deployed Worker. Public `/health` reports requirement *presence* with public codes; that is not a provider-availability check.

## Owner decisions (fill; do not invent)

1. Email domain (FQDN): ________________
2. From address (e.g. `PIKK <noreply@domain>`): ________________
3. Email provider: [ ] Resend (credential + DNS on a domain you control)  [ ] other, specify ___  [ ] defer
4. Enable R2 on the PIKK Cloudflare account: [ ] Y  [ ] N
5. Create and bind buckets (proposed names `pikk-media` and `pikk-media-backup`, only after R2 is enabled): [ ] Y  [ ] N
6. Set vault signing credential (value never committed or logged): [ ] Y  [ ] defer
7. Membership catalog (which `plan_id`s, Stripe price IDs, amounts, intervals): [ ] provide catalog  [ ] keep billing off
8. Do **not** treat the UI preview figures ($3.99 / $7.99 / $12.99) as live prices unless explicitly confirmed: [ ] confirm as catalog  [ ] change to ___  [ ] keep preview-only
9. Trials / founding grants / referral awards: [ ] none  [ ] specify ___
10. Ad-Free (`$4.99` / `$49.99` in MASTER_FEATURES §13, marked **not final**): [ ] out  [ ] finalize as ___  [ ] TBD
11. Apply pending migration 0016 to production D1: [ ] Y (explicit)  [ ] not yet
12. Set membership billing to enabled plus Stripe keys / webhook / success-cancel URLs only after 7–11: [ ] not yet

Live browser / two-account checks remain a separate pass after the matching provider steps. They are not implied by a green `/health` configured flag.
