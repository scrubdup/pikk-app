# PIKK Factual Inventory — 2026-10-31 (audit only, no commits)

Repo scrubdup/pikk-app · GitHub default branch `master` · Pages deploys from `main` (workflow pages.yml: npm test → vite build → gh-pages). Live: https://scrubdup.github.io/pikk-app/ (HTTP 200). Local branch `feat/pikk-home-top-mockup-20261031` tracking origin/main @ 2125f7a.
Stack: Vite 5 static SPA, hash router (src/router.js), 37 page modules. No runtime deps. `npm test`: 249 pass / 0 fail. These are Node unit/string-guard tests; there are no backend or E2E tests.
State: `src/store.js` keeps a single localStorage key `dbs_v1`. `src/media-db.js` keeps admin uploads in IndexedDB ("TEST MODE, no backend").
Auth: `src/auth/readiness.js` reports productionAuthAvailable=false and serverSessionEnabled=false. A local user counts as DEMO only.
wrangler.jsonc: assets-only Worker named "dbs-app", with no D1/KV/R2 bindings. It was a temporary, unclaimed CF account. wrangler is not logged in on the box.
No Stripe, PayPal, Supabase, Firebase, WebSocket, or real media-server code in src/.
Open PR #169 (draft) is the backend foundation. It holds only backend/migrations/0001_core.sql (D1 schema: accounts, messages, live, payment orders) and a README. Schema only, not deployed.
PR #88 (feature/pikk-batched-visual-20261027) is a DRAFT visual-only release, not merged.

| Area | Status | Basis |
|---|---|---|
| Routing / navigation (7 tabs, header) | WORKING (client only) | hash router, nav regression tests |
| Auth / signup / login / sessions | PROTOTYPE | localStorage user, readiness.js says false |
| Permissions / roles / admin | PROTOTYPE | client-side checks only |
| Persistent database | MISSING (schema draft in PR #169) | localStorage/IndexedDB only |
| Error handling / security (rate limit, validation) | MISSING server-side | no server |
| Payments / wallet / coins / ledger | PROTOTYPE | `coins`, wallet, and earnings are local demo values. No provider, no real charges |
| Donations / goals / donor messages / pinning | PROTOTYPE | local state |
| Social posts / comments / likes / follows | PROTOTYPE | local state, single-device |
| Messages / DMs / groups | PROTOTYPE | local state, no realtime |
| Notifications | PROTOTYPE | local |
| Media upload / playback | PROTOTYPE | IndexedDB upload. Playback is static assets plus YouTube embeds |
| Music player / catalog | PROTOTYPE (playback of bundled/static tracks) | no purchases/rights backend |
| Live / Broadcast / Multiguest / Restream | PROTOTYPE | no media server or ingest |
| Battles / Gift Battles / Roast Arena | PROTOTYPE | roast-engine.js client logic only |
| Community rooms / Connect / Party Line | PROTOTYPE | UI and local only |
| Dating | PROTOTYPE | no verification |
| Shop / Marketplace / Merch | PROTOTYPE | no checkout |
| Games / Block Wars | PROTOTYPE (labelled Coming Soon) | not playable |
| Shield / moderation / reporting | PROTOTYPE | local |
| 24/7 Viral Live | PROTOTYPE | no backend playback |
| Stories / ads / AI artists / clippers / fanclubs / loyalty / missions | PROTOTYPE | local |

Nothing qualifies as WORKING by the handoff's standard (real backend, persisted, tested), apart from client-side routing.

## Deploy rules (standing)
- **Every shipped PIKK update goes live at https://scrubdup.github.io/pikk-app/ once tests pass.** The Pages workflow runs `npm test` and then the build, so a failing test blocks publishing. Every ship report must include that live link, plus the deep link to the changed route and the commit SHA.
- Nothing is published until its tests pass. Draft or unreviewed work stays on branches.

## Proposal: make `main` the default branch
Pages builds from `main` (`.github/workflows/pages.yml`, `on.push.branches: [main]`), but the GitHub default branch is `master`. So PRs target `master` by default and miss the deploy path.
Proposal (owner approval required, repo setting): `gh repo edit scrubdup/pikk-app --default-branch main`. Then retarget open PRs to `main`, and archive or delete `master` once it's confirmed fully merged into `main`. Not done by the audit.
