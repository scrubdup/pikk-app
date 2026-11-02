// PIKK Vault limits. TEMPORARY DEFAULTS approved by PIKK Supervisor pending owner policy decision.
const MB = 1024 * 1024;
export const VAULT_VERSION = 'vault-slice3-0.3.0';
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
// Slice 3: in-Worker processing (no Queues/Stream/Images). Bounded retries: max 3 attempts total.
export const PROCESSING = Object.freeze({
  maxAttempts: 3,
  backoffMs: [0, 30_000],            // delay after failed attempt 1, 2; delayed retries are picked up by the cron drain
  drainLimit: 25,
  sweepLimit: 200,
  stuckAfterMs: 10 * 60_000,
  sweeperCron: '*/15 * * * *',       // must match wrangler.jsonc triggers.crons
});
