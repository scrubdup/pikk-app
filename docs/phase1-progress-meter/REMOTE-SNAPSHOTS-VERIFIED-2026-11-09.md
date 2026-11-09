# Verified remote PASS snapshots (builder, 2026-11-09 CT)

Statuses below are **only** what `git ls-remote` verified after owner484-authorized push. Do not treat as launch/deployed/live-tested.

| Batch | Peeled SHA | Tag | Snapshot branch |
|---|---|---|---|
| auth | 9e34a69e7831b9ebdb3c5c83766f2fc09a385633 | phase1-reviewed-local-auth-9e34a69 | phase1/reviewed-local-auth-9e34a69 (+ PR #392) |
| social | 06b187ecf6ad7f776c112f813f1452950ff87cad | phase1-reviewed-local-social-06b187e | phase1/reviewed-local-social-06b187e |
| password | 63fb16be0e24eb6351b0791c0cff7ff9e0c09094 | phase1-reviewed-local-password-63fb16b | phase1/reviewed-local-password-63fb16b |
| vault (limited PASS) | bf1bb2ee463f761e0cea7400923885eaec45bda8 | phase1-reviewed-local-vault-bf1bb2e | phase1/reviewed-local-vault-bf1bb2e |

Vault restore-authority fix `9d45755141758f3762fac453d632ce35455701db` is on `phase1/vault-local-20261109` and included in this integrate candidate — **not** an independent PASS tag.

**Preview warning:** feature-branch pushes create public Cloudflare Workers **preview** uploads that may share production D1 bindings. Do not exercise signup/write endpoints on preview URLs until bindings are proven isolated. Production Pages publish only on main (`pages.yml`).
