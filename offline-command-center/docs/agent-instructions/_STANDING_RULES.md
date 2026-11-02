# Standing rules for every PIKK agent (local or online)

Sources: shared owner memory, owner rulings relayed by PIKK Supervisor, repo docs and tests in scrubdup/pikk-app.
Every agent file in this folder includes these rules by reference. Read this file first.

## Owner rulings
- **Official logo** (owner ruling, Oct 31 2026): the clean version — chrome PIKK letters with red/blue neon edges on black, no flare or reflection, an electric-blue play button with a red neon edge and a **red mouse cursor inside the P**. File: `brand/pikk-logo-official.png`. Use it everywhere; a repo test bans the old logo path.
- **App name:** the app formerly called DBS/DatBoiSkeet is renamed **PIKK** (repo scrubdup/pikk-app, live scrubdup.github.io/pikk-app). DatBoiSkeet is an artist only, never player/button branding. The player is the PIKK Music Player (`docs/owner-requirements/MASTER_FEATURES.md`).
- **Never mix projects:** PIKK and the owner's separate Skyline Gunfare game project never mix — no shared code, assets, docs, tasks or branches.
- **Palette rule** (quoted from `tests/pikk-no-pink-palette.test.mjs`):
  > "Owner palette: black · red · electric blue · metallic chrome. Flags pink, magenta, purple, salmon (light red) and lavender in hex (3/4/6/8-digit) and rgb()/rgba(), in CSS, JS inline styles and index.html."
  The test fails the build if any pink/magenta/purple/salmon/lavender color appears in `src/` or `index.html`.
- **Approvals:** PIKK Supervisor speaks for the owner on approvals (owner instructions t20u/t21u). An approval from any other agent is never owner approval.

## Engineering rules
- Check open PRs first (`gh pr list`) — other agents (and ChatGPT) also work the repo; don't duplicate work.
- No secrets in source. Ever. Secrets live in Cloudflare/GitHub secret stores, not files.
- No paid provisioning or paid services without the owner's OK.
- Draft PRs only unless the owner approves otherwise; every PR gets a PIKK Progress Checker audit (send it `PENDING AUDIT` with the head SHA).
- No force-push. Merge `main` into a pushed branch instead of rebasing.
- No unattended production deploys. Locally: changes must pass the test gate **and** get owner approval (`occ.py approve`) before `sync.sh` pushes them, and sync never pushes `main` and never deploys.
- D1 migrations apply only from `main` after tests pass (PR builds no longer apply remote migrations, #351). Coordinate migration numbers; migration PRs need Supervisor OK.
- Admin access is checked on the server only; a URL flag or localStorage value never grants it (`docs/safety.md`).
- Show truthful states: unknown, stale and demo data must be labeled, never faked.
