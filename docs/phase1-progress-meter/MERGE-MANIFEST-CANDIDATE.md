# Phase 1 merge manifest (current vs held)

This file is a source-backed inventory, not a completion score. It distinguishes **code on `main`**, **deployed Pages/Worker**, and **live provider / paid checks**. None of those layers is implied by another.

## Current remote tip (as of this docs update)

- `origin/main`: `df4128bd0318860677ad40ecf80c05ec05a8b361`
- Parents: PR #395 merge `cf8f46dc` (`3966c8a` billing slice) + PR #396 `fcd500f` (membership UI wiring)
- Earlier: PR #393 `57b3eac` (integrate tip `e384e83`)
- Pages/Worker for that tip were deployed (public home assets and `/health` observed). That is **not** a launch, billing, or sign-in-browser PASS.

## Code on main (shipped reviews)

| Batch | SHA / PR | Code on main | Deployed with main | Live provider / paid check |
|---|---|---|---|---|
| Auth / social / password / vault restore | `9e34a69` / `06b187e` / `63fb16b` / `9d45755` via #393 | Yes | Yes, as part of the #393+#395+#396 tip | Not a live two-account PASS |
| Payment security + atomic coins | `d304286` + cherry-pick of `384a4cb` as `a455584` via #393 | Yes | Yes | No real Stripe charges claimed |
| Music draft-delete, alerts admin gate, tap-target CI | ports of #323 / #385 / #394 in #393 | Yes (open PR heads are stale; do not merge them) | Yes | CI-only for taps; not a live route PASS |
| Membership billing slice | `3966c8a` / #395 | Yes — Checkout, resync, needs-review, authoritative `/memberships/me`; **billing off by default** | Worker includes the slice; billing remains disabled | Activation held (catalog, keys, 0016 apply) |
| Membership UI wiring | `fcd500f` / #396 | Yes — read-only Profile/Pricing status; no entitlement grants | Yes (Pages assets after #396) | No sign-in browser PASS claimed |
| #324 public profiles | superseded by social batch | Do not merge the open head | — | — |

## Not on main / not for this batch

| Item | Status |
|---|---|
| Public `/health` activation requirement codes (email/media/payments/R2/vault presence) | Implemented in a follow-on local branch from `df4128bd`; **needs independent review** before push/merge |
| Residual technical batch (late `/auth/me` after sign-out; date/perks copy; required Stripe account id) | In progress in a separate worktree; integrate only after its own review |
| Local `43c1226` activation branch | **Do not merge** — pre-#395; would strip Checkout/resync/health billing fields |
| Paid membership activation | Held: catalog, Stripe keys, `MEMBERSHIP_BILLING=enabled`, apply `migrations-pending/0016` |
| Domain / DNS / email delivery, R2 buckets, vault signing secret | Provider / owner holds — not missing #395/#396 code |
| Historical October product PRs (#138, #107, #99, and other drafts) | Not Phase-1 reviewed; do not blind-merge |
| Open #323 / #324 / #385 / #394 / stale docs #275 / #214 | Ported, superseded, or obsolete; do not blind-merge |
| Commercial trials, Ad-Free mapping, founding grants | COMMERCIAL-HOLDS |
| Non-1v1 Roast modes (paused) | Owner paused |

## Automatic publish effects (unchanged)

- Feature/PR push → Cloudflare Workers **preview** upload (may share prod D1). Do **not** hit signup/write on preview until bindings are proven isolated.
- Merge/push **main** → Pages publish with live `PIKK_API_BASE`; the Worker likely auto-deploys if `backend/**` changes.
- No main branch protection. Merge only with exact-head review, green CI, and `--match-head-commit`.

## Gates preserved

- `EXPOSE_VERIFY_TOKEN=false`; no `r2_buckets` in `wrangler.jsonc`
- `pages.yml` assert-pikk-api-base --required
- Migration 0015 sha256 `3ffc75c370380783660734eee810e7d5bbca2a1c4b419259bfb876bc7dc523ef`
- Migration 0016 stays in `migrations-pending/` until an explicit owner apply
