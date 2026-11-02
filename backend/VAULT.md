# PIKK Vault (backend) — LOCAL ONLY, not deployed

## Object keys & shared bucket (prefix isolation)
- Vault shares ONE R2 bucket (`env.MEDIA`) with main's music uploads (PIKK Backend decision): music uses `music/<user_id>/...`, Vault uses `vault/<media_type>/<owner_id>/<media_id>` (was `u/<owner>/<id>`).
- `src/vault-keys.js` is the only way Vault builds, deletes or lists keys: `vaultKey()`, `assertVaultKey()`, `vaultDelete()`, `vaultList()`. Any key not shaped `vault/<type>/<owner>/<id>` (other prefix, traversal, extra segments) throws `VaultKeyError`. Delete, list, backup and restore paths all go through the guard.
- Tests: `test/vault-prefix.test.js` plants a `music/` object and checks it survives every Vault operation.
