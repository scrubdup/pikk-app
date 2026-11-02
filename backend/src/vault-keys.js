// PIKK Vault object-key scheme + prefix guard.
// Vault shares ONE R2 bucket (env.MEDIA) with main's music uploads (music/<user_id>/...).
// Every Vault key lives under vault/<media_type>/<owner_id>/<media_id>; Vault code must never
// read-for-copy, list, delete or restore anything outside vault/. All bucket mutations go through here.
export const VAULT_PREFIX = 'vault/';
const SEG = /^[A-Za-z0-9_-]{1,80}$/;

export class VaultKeyError extends Error {
  constructor(key) { super(`refusing non-vault object key: ${JSON.stringify(String(key))}`); this.name = 'VaultKeyError'; }
}

/** Throws unless key is a well-formed vault/<type>/<owner>/<id> key (no traversal, no other prefix). */
export function assertVaultKey(key) {
  if (typeof key !== 'string' || !key.startsWith(VAULT_PREFIX)) throw new VaultKeyError(key);
  const parts = key.split('/');
  if (parts.length !== 4 || !parts.slice(1).every(p => SEG.test(p))) throw new VaultKeyError(key);
  return key;
}

export function isVaultKey(key) { try { assertVaultKey(key); return true; } catch { return false; } }

export function vaultKey(mediaType, ownerId, mediaId) {
  return assertVaultKey(`${VAULT_PREFIX}${mediaType}/${ownerId}/${mediaId}`);
}

/** Delete a Vault object; refuses anything outside vault/. */
export async function vaultDelete(bucket, key) {
  assertVaultKey(key);
  return bucket.delete(key);
}

/** List Vault objects only. Caller prefix (if any) must itself be under vault/; results are re-filtered. */
export async function vaultList(bucket, { prefix = VAULT_PREFIX, ...opts } = {}) {
  if (typeof prefix !== 'string' || !prefix.startsWith(VAULT_PREFIX) || prefix.includes('..')) throw new VaultKeyError(prefix);
  const res = await bucket.list({ ...opts, prefix });
  return { ...res, objects: (res.objects || []).filter(o => isVaultKey(o.key)) };
}
