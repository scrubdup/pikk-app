# Integrated-head review checklist (for when the builder returns)

1. Exact integrated SHA recorded. Parents: auth 9e34a69 → social 06b187e → password 63fb16b + vault (bf1bb2e + reviewed restore fix). No extra commits.
2. `backend/migrations/0015_password_reset.sql` is byte-identical to 63fb16b. No other new migration files. RESERVED.json is consistent.
3. `backend/wrangler.jsonc`:
   - `EXPOSE_VERIFY_TOKEN` is `"false"`.
   - No `r2_buckets` and no build block.
   - The crons are unchanged.
   - No secrets in source.
4. `pages.yml` includes the `assert-pikk-api-base --required` step. No new deploy workflows and no `contents: write` added elsewhere.
5. The restore fix gets a separate exact-SHA review: K1–K6 re-run, plus S1/S2/S3 status.
6. Full suites at the integrated head: FE, BE, build. Counts recorded. My review tests re-run: password V6/v2, vault G/K/H.
7. Conflict areas between the password and Vault merges: `index.js` routing, `auth.js` requireActive/requireVerified, the shared `store.js`/`readiness.js` UI and the tests.
8. CI is green on the PR for the exact head before merge. No direct push to main (there is no branch protection).
9. The owner acknowledged the automatic effects of a main merge: Pages goes live wired to the production Worker, and the production Worker is likely auto-deployed.
10. Verdict: PASS/REJECT, local only. Live browser and two-account testing remain owed.
