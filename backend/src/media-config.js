// PIKK Vault limits. TEMPORARY DEFAULTS approved by PIKK Supervisor pending owner policy decision.
const MB = 1024 * 1024;
export const VAULT_VERSION = 'vault-slice1-0.1.0';
export const MEDIA_LIMITS = Object.freeze({
  photo: { maxBytes: 20 * MB, contentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] },
  video: { maxBytes: 500 * MB, contentTypes: ['video/mp4', 'video/webm', 'video/quicktime'] },
  audio: { maxBytes: 50 * MB, contentTypes: ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/ogg', 'audio/flac', 'audio/mp4', 'audio/x-m4a'] },
});
export const STORY_TTL_HOURS = 24;
export const ACCESS_POLICIES = ['private', 'followers', 'public', 'entitled'];
export const UPLOAD_RATE = { limit: 30, windowSec: 3600 };
