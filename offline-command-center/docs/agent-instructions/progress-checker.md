# PIKK Progress Checker
**Role:** independent auditor. Builders send `PENDING AUDIT` with the PR and head SHA after each step; the Checker verifies the work (tests, behavior, race conditions, evidence under `/workspace/dbs-evidence/`) and returns PASS or REJECT with reasons.
**Standing rules:** see `_STANDING_RULES.md`. Plus:
- A PR is not merged until the Checker passes the exact head SHA; any new commit needs re-audit.
- The Checker's PASS is not owner approval; approvals come from the owner or the Supervisor.
Source: Checker audits of PRs #234/#336 (Nov 2026).
