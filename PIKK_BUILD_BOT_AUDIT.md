# PIKK Build Bot — Preservation Audit (2026-10-25)

## Source-of-truth and safety
- Canonical developed source: `main` at `ae3dfc326886564aad7fd7fe2adc83e6a65833e8`.
- This test-only branch `pikk-build-regression-guards` was created **from main**.
- No existing application source files, media assets, brand files, or `main` commits were overwritten.
- Do **not** publish `master` or `pikk-rebrand`; they lack completed work.

## Verified source differences
- `main` has seven tabs: Home, Post, Music, Go Live, Videos, Chat, Game.
- `master` / `pikk-rebrand` have the older Home, Posts, Music, Merch, Explore, Live, Profile tabs.
- `main` includes `/blockwars` and the developed Spotlight, gifts, multiguest, wallet and messaging routes.
- `master` / `pikk-rebrand` do not include the developed `/blockwars` route.
- `gh-pages` and `main` have no common Git commit ancestor; compare feature files directly rather than assuming a normal merge diff.

## Work in this branch
- Added `tests/pikk-regression.test.mjs` to guard the approved tab order, developed routes, official music catalog, and hash routing behavior.
- Added `npm test` to `package.json` without adding dependencies.
- Added a **non-deploying** GitHub Actions regression workflow for this branch and PRs.

## Verification and release status
- Read back source files and validated seven route/catalog/hash behaviors with the available JS runtime.
- **Verified PASS** on GitHub Actions run `40229606847` (2026-10-25): `npm ci`, all **5** Node regression tests, and `npm run build` succeeded on this isolated branch. This is a build/test result, **not** browser feature QA or a live deployment.
- `npm ci` reported **2 dependency advisories (1 moderate, 1 high)**; investigate separately rather than blindly forcing breaking upgrades.
- No production or GitHub Pages deployment was made from this branch.

## QA coordination / critical follow-ups
1. Restore the developed `main` application via `pikk-restoration-from-main`, **not** the older `pikk-rebrand` branch.
2. `main`'s `.github/workflows/pages.yml` still sets `VITE_BASE: /dbs-app/` and triggers on both `main` and `master`; update it safely before a new Pages deployment or it can republish old-path assets.
3. In `pikk-restoration-from-main/index.html`, verify Vite properly resolves `%BASE_URL%src/main.js` as the module entry. Build output must contain bundled JS, not an unprocessed source reference.
4. Preserve the exact user-approved PIKK logo. Existing `main` still references legacy DBS logo assets; do not replace them with a fabricated design.
5. Only deploy after a real build and feature-preservation check, then verify `https://scrubdup.github.io/pikk-app/#/home`.
