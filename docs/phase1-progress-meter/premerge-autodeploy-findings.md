# Pre-merge inventory and auto-deploy findings (read-only), Mon Nov 9 2026, 2:21 PM CT

Scope: the current Phase 1 batches only. This does not cover other open PRs in the repo.
Sources: fresh `git fetch` of origin, `gh` (read), and Cloudflare API (GET, plus one SELECT on d1_migrations). Nothing was mutated.

## Commits (stacked)
- origin/main is `f42b2487935831e25cd02d567032ecad0d9a47c3` (#391).
- **auth** `9e34a69` (PR #392): OPEN, MERGEABLE, all checks green. It is the only Phase 1 ref on origin.
- **social** `06b187e`: on top of auth. Local only.
- **password** `63fb16b`: on top of social. Local only. Adds `backend/migrations/0015_password_reset.sql`.
- **vault** `bf1bb2e`: on top of social. Does NOT contain password. Local only.
- The vault worktree has **uncommitted** edits to `backend/src/backup.js` and `media-config.js`. That is the builder's restore fix, still in progress and NOT reviewed.
- Integration must therefore combine two branches that both sit on social: password and vault.
- Every Phase 1 branch changes `.github/workflows/pages.yml`, adding the step `assert-pikk-api-base.mjs --required`.

## What fires automatically
| Event | GitHub Actions | Cloudflare Workers Builds (pikk-api, Git-connected) |
|---|---|---|
| Push to a feature branch | none (no branch-push triggers for phase1/*) | Builds and **uploads a preview version (not deployed)**. Evidence: version #345 `c9ac5188`, triggered_by=version_upload, alias `phase1-auth-api-wiring-20261109`. |
| Open/update a PR to main | Regression Guard (test+build, no deploy) + visual reviews; backend tests if `backend/**` changed | Same preview upload |
| Merge/push to **main** | **pages.yml: npm test → build with `VITE_PIKK_API_BASE=${{vars.PIKK_API_BASE}}` → publishes gh-pages → public site changes.** Backend tests run if `backend/**` changed. | **Evidence of production auto-deploy:** main merge `f81ddbe` (#369, touched backend) → build b0111827 → version `0e51de65`, which is the current production deployment (2026-11-02 20:16 UTC). Main commits that did not touch backend show no Workers build. The build/deploy command and watch paths can't be read (Builds API 403), so treat a merge that touches `backend/**` as a **likely production Worker deploy**. |

- Main branch protection: **none** (404 "Branch not protected").
- The `github-pages` environment has only a branch policy.
- The repo variable `PIKK_API_BASE` is `https://pikk-api.pikk-0fa.workers.dev` (set 2026-11-09 17:41 UTC). The next main merge therefore ships Pages wired to the production Worker.

## Preview exposure that exists now
- These preview URLs are public: `https://phase1-auth-api-wiring-20261109-pikk-api.pikk-0fa.workers.dev` and `https://c9ac5188-pikk-api.pikk-0fa.workers.dev`. Both return `/health` 200 with `database:true`.
- Preview versions normally share the production bindings, so they probably write to the production D1. This is not proven: binding equality wasn't readable.
- Every future feature-branch push would publish another such preview.

## Migrations
- The Worker config has no build block, so the default deploy doesn't run migrations.
- `npm run migrate:ci` (`migrate-if-main.mjs`) applies remote migrations **only if** the dashboard build command calls it AND WORKERS_CI_BRANCH=main. I can't read that dashboard command (403).
- Production `d1_migrations` (read-only SELECT just now): newest row is id 18 `0015_password_reset.sql`, applied 2026-11-09 18:36:02 UTC. Rows for 0011–0014 are present.
- So `wrangler d1 migrations apply` would **skip 0015**. It matches by filename, and the file is unchanged on 63fb16b.
- Reapplying it outside the tracker would FAIL: `CREATE TABLE password_reset_tokens` has no `IF NOT EXISTS`. It would not corrupt anything.
- None of the four branches adds another migration file, so the merge can't trigger any other migration.
- **Keep the 0015 filename and content byte-identical** during integration.

## Production behaviour once main is merged (email/storage off)
| Area | What happens | Real protection |
|---|---|---|
| Pages | The public app calls the production Worker for signup/login/me. Real accounts are written to production D1. | The Pages guard fails the build if the var is empty. The var is set, so the guard passes. |
| Email verification | `RESEND_API_KEY`/`EMAIL_FROM` are unset, so delivery is `email_provider_not_configured`. Accounts stay unverified. | `EXPOSE_VERIFY_TOKEN` is `"false"` in all four branches' wrangler.jsonc, so tokens are not leaked. |
| Verified-only actions | `requireVerified` blocks Vault and other verified routes. | Server-side. Which social actions allow unverified users was not re-audited here. |
| Password reset | Before a Worker deploy, the routes don't exist (live OPTIONS `/auth/password/forgot` returns 403). After a deploy, requests get a generic response and no email can be sent. | Generic responses; IP stored as NULL without a salt. |
| Vault | Production `media_storage:false` (no R2) → UI shows storage disabled; routes 503. | Bindings absent. `VAULT_CRON_ENABLED` unset, so the cron no-ops. |
| Cookies | Cross-site `__Host-` cookie with SameSite=None. Not live-browser verified (Safari/ITP risk). | none (untested) |

## Blockers / owner decisions before merge (none are waived by "Merge all updates")
1. Restore fix is uncommitted and unreviewed. Integrated-head review is pending.
2. A combined head (auth+social+password+vault) doesn't exist yet. It needs CI plus my exact-head review.
3. The owner must accept that merging to main (a) publishes Pages wired to production, opening real production signups with no email delivery, and (b) likely auto-deploys the production Worker if `backend/**` changes.
4. No branch protection, so a direct push to main bypasses CI.
5. Email provider, R2 and paid processing remain owner choices.
