// PIKK Vault limits. TEMPORARY DEFAULTS approved by PIKK Supervisor pending owner policy decision.
const MB = 1024 * 1024;
export const VAULT_VERSION = 'vault-slice2-0.2.0';
export const MEDIA_LIMITS = Object.freeze({
  photo: { maxBytes: 20 * MB, contentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] },
  video: { maxBytes: 500 * MB, contentTypes: ['video/mp4', 'video/webm', 'video/quicktime'] },
  audio: { maxBytes: 50 * MB, contentTypes: ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/ogg', 'audio/flac', 'audio/mp4', 'audio/x-m4a'] },
});
export const STORY_TTL_HOURS = 24;
export const ACCESS_POLICIES = ['private', 'followers', 'public', 'entitled'];
export const UPLOAD_RATE = { limit: 30, windowSec: 3600 };
// Signed playback/download URLs (slice 2). Key comes from env secret VAULT_SIGNING_KEY, never source.
export const ACCESS_URL_TTL_SEC = 300;
export const PUBLIC_CACHE_CONTROL = 'private, max-age=300'; // public media is still per-user (blocks), so never shared caches
