// Music object-key guard, mirroring Vault's vault-keys.js.
// Music shares the R2 bucket (env.MEDIA) with Vault (vault/...). Every music key must be exactly
// music/<owner_id>/<media_id>: no '..', no empty or extra segments, no other prefix.
// All music R2 put/get/delete calls go through assertMusicKey first.
export const MUSIC_PREFIX = 'music/';
const SEG = /^[A-Za-z0-9_-]{1,80}$/;

export class MusicKeyError extends Error {
  constructor(key) { super(`refusing non-music object key: ${JSON.stringify(String(key))}`); this.name = 'MusicKeyError'; }
}

/** Throws unless key is music/<owner>/<id>; if expectedOwner is given, the owner segment must match it. */
export function assertMusicKey(key, expectedOwner) {
  if (typeof key !== 'string' || !key.startsWith(MUSIC_PREFIX) || key.includes('..')) throw new MusicKeyError(key);
  const parts = key.split('/');
  if (parts.length !== 3 || !parts.slice(1).every((p) => SEG.test(p))) throw new MusicKeyError(key);
  if (expectedOwner !== undefined && parts[1] !== expectedOwner) throw new MusicKeyError(key);
  return key;
}

export function isMusicKey(key) { try { assertMusicKey(key); return true; } catch { return false; } }

export function musicKey(ownerId, mediaId) { return assertMusicKey(`${MUSIC_PREFIX}${ownerId}/${mediaId}`); }
