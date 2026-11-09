# Phase 1 integrate candidate — include/exclude (owner485)

**Integrate HEAD:** `3afd60d0e435be203e2e4fb94a2954fca4109530`  
**Branch (to push):** `phase1/integrate-current-updates-20261109`  
**Status:** Local suites green. **Not** independently reviewed as exact integrated head. **Not** merged to main. **No** release.

## Automatic publish effects (acknowledged t484)
- Feature/PR push → Cloudflare Workers **preview** upload (may share prod D1 bindings). Do **not** hit signup/write on preview until bindings proven isolated.
- Merge/push **main** → `pages.yml` publishes gh-pages with `VITE_PIKK_API_BASE` live API; backend Worker **likely** auto-deploys if `backend/**` changes (Builds API 403 — command unconfirmed).
- No main branch protection.

## INCLUDED in this candidate
| Batch | SHA | Remote | Reason |
|---|---|---|---|
| auth | 9e34a69 | [PR #392](https://github.com/scrubdup/pikk-app/pull/392) / tag phase1-reviewed-local-auth-9e34a69 | Current Phase1 PASS; supersedes merging #392 alone |
| social | 06b187e | tag/branch phase1-reviewed-local-social-06b187e | Current Phase1 PASS |
| password | 63fb16b | tag/branch phase1-reviewed-local-password-63fb16b | Current Phase1 PASS; 0015 byte-identical |
| vault PASS baseline | bf1bb2e | tag/branch phase1-reviewed-local-vault-bf1bb2e | Limited local PASS (G7/H5) |
| vault restore-authority | 9d45755 | branch phase1/vault-local-20261109 | Current restore S1–S3 fix; **review-pending** (not PASS-tagged) |
| progress ledger | docs snapshot | in-tree docs/phase1-progress-meter/ | Owner484/485 progress meter |
| membership/payment security | d304286 | local → push phase1/membership-payment-security-20261109 | Owner485 current batch; webhook claim + inactive membership status; **review-pending** |

## EXCLUDED (with reason)
| Item | Reason |
|---|---|
| Merge to main / deploy | Await independent exact-head review + CI + Supervisor release |
| PR #392 standalone merge | Superseded by this integrate PR; do not merge ahead |
| Owner483 commercial catalog / Stripe Checkout / trials / grants | COMMERCIAL-HOLDS — not invented; no paid activation |
| Tag-Team / Block Wars | Owner paused; no redesign |
| Historical draft PRs (#75–#149 era nav/music/visual drafts, #88 batched visual, etc.) | Stale/superseded or not current Phase1; await reviewer inventory before any add |
| #324 persistent profiles, #323 music draft delete, #385 alerts | Open but not in current Phase1 stack; await reviewer inventory — do not silently omit forever or blindly merge |
| #275/#214 docs-only historical | Not required for code integrate; optional later |
| Signup/membership redesign PR #109/#110 | Draft rebrand/roles — commercial/product holds |
| Production secrets, R2 enable, email provider, migration apply | Not authorized; gates remain off (`EXPOSE_VERIFY_TOKEN=false`, no r2_buckets) |
| Browser localhost bypass | Forbidden |
| Force-push / moved tags / amend pushed commits | Forbidden |

## Local suite @ `3afd60d0e435be203e2e4fb94a2954fca4109530`
- Backend: **51 files / 382 pass**
- Frontend: **618 pass**
- Build: OK
- Focused: memberships+ledger+vault restore/G7 **27 pass**

## Gates preserved
- `EXPOSE_VERIFY_TOKEN=false`
- No `r2_buckets` in wrangler
- `pages.yml` assert-pikk-api-base --required
- Migration 0015 sha256 `3ffc75c370380783660734eee810e7d5bbca2a1c4b419259bfb876bc7dc523ef` (matches 63fb16b)
