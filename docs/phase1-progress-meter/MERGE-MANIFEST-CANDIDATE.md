# Phase 1 integrate candidate — include/exclude (owner485)

**Integrate branch:** `phase1/integrate-current-updates-20261109`  
**PR:** https://github.com/scrubdup/pikk-app/pull/393  
**Status:** Tip includes payment atomic `384a4cb` cherry-pick onto 48169e4. **REVIEW PENDING** exact-head. **Not** main-merged. **Not** LIVE/PASS claim.

## Meter (verified remote saves only)
| Stage | Count |
|---|---|
| Local PASS snapshots saved remote (tags/branches) | **7** (auth, social, password, vault-bf1bb2e, + working branches counted in save set: social/password/vault-local/membership — see REMOTE-SNAPSHOTS; exact PASS tags remain 4) |
| Clarified saved remote PASS tags | **4/4** auth·social·password·vault-bf1bb2e |
| Feature branches saved remote (incl. review-pending) | auth, social, password, vault-local, membership, integrate, + reviewed-local-* |
| Merged to main | **0** |
| Deployed / live-tested | **0** |

True status note for progress: **7 saved remote refs of current-update material / 0 merged / 0 live**. Membership `d304286` = **REJECT (PAY-1/PAY-2), not PASS**. Vault restore `9d45755` = **local PASS with residual R1 limitation** (older manifest + failed deletes/ marker under outage). c24da90 REJECT addressed in tip: CI-1 fixed; #323/#385/#394 ports; payment atomic `384a4cb` cherry-picked. Exact integrated head **REVIEW PENDING**. 0 merged / 0 live.

## Automatic publish effects (acknowledged)
- Feature/PR push → Cloudflare Workers **preview** upload (may share prod D1). Do **not** hit signup/write on preview until bindings proven isolated.
- Merge/push **main** → Pages publish with live `PIKK_API_BASE`; Worker **likely** auto-deploys if `backend/**` changes.
- No main branch protection.

## INCLUDED
| Batch | SHA / head | Remote | Status |
|---|---|---|---|
| auth | 9e34a69 | [PR #392](https://github.com/scrubdup/pikk-app/pull/392) superseded by #393; tag `phase1-reviewed-local-auth-9e34a69` | Local PASS |
| social | 06b187e | tag `phase1-reviewed-local-social-06b187e` | Local PASS |
| password | 63fb16b | tag `phase1-reviewed-local-password-63fb16b` | Local PASS; 0015 byte-identical |
| vault limited PASS | bf1bb2e | tag `phase1-reviewed-local-vault-bf1bb2e` | Local PASS (G7/H5) |
| vault restore-authority | 9d45755 | `phase1/vault-local-20261109` | **Local PASS** with documented R1 limitation |
| membership/payment security | d304286 + atomic `384a4cb` cherry-picked | branch + integrate tip | Membership routes unchanged; **PAY-1/PAY-2 fix in tip — REVIEW PENDING (not PASS)** |
| music private-draft delete | port of [#323](https://github.com/scrubdup/pikk-app/pull/323) + MD1–MD4 fix | in integrate tip | Draft-only claim; owned deleted-row storage cleanup retry (no sweeper); honest 202 retry_required; published 409; key refuse 422; FE sessionStorage retry cards |
| engagement admin handle guard | port of [#385](https://github.com/scrubdup/pikk-app/pull/385) one-line | in integrate tip | Client demo admin gate + negative test; hot-feed already in main |
| Safety tap-target CI | [#394](https://github.com/scrubdup/pikk-app/pull/394) `8e451d1` | CODE PASS, CI green | Synthetic stitched markup + real CSS height ×27; **not** full routes/occlusion/signin; **not** LIVE PASS; CI-only Playwright (no box browser) |
| progress ledger docs | in-tree | `docs/phase1-progress-meter/` | Snapshot + this manifest |

## EXCLUDED
| Item | Reason |
|---|---|
| Main merge / deploy | Await payment fix integrate + exact-head review + CI + Supervisor release |
| PR #392 alone | Superseded by #393 |
| [#324](https://github.com/scrubdup/pikk-app/pull/324) profiles | Superseded by social batch |
| Commercial catalog / Checkout / trials / grants | COMMERCIAL-HOLDS; no paid activation |
| Non-1v1 Roast modes (paused) and Block Wars | Owner paused; Roast stays 1v1; no redesign |
| Historical Oct drafts / stale PRs | Inventory STALE; do not blindly merge |
| Box Playwright / desktop browser measurement | Not sanctioned; measurement is GitHub CI + synthetic fixture only |
| Secrets / R2 enable / email / migration apply / force-push | Not authorized |

## Gates preserved
- `EXPOSE_VERIFY_TOKEN=false`; no `r2_buckets`
- `pages.yml` assert-pikk-api-base --required
- Migration 0015 sha256 `3ffc75c370380783660734eee810e7d5bbca2a1c4b419259bfb876bc7dc523ef`
