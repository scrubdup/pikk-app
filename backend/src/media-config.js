// PIKK Vault limits. TEMPORARY DEFAULTS approved by PIKK Supervisor pending owner policy decision.
const MB = 1024 * 1024;
export const VAULT_VERSION = 'vault-slice4-0.4.0';
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
// Slice 4: storage management. TEMPORARY DEFAULTS pending owner policy (quota size, alert threshold).
const GB = 1024 * MB;
export const VAULT_QUOTA = Object.freeze({
  defaultUserBytes: 5 * GB,     // per user; per-user overrides in vault_quota_overrides
  alertThresholdPct: 80,        // usage.alert=true at/above this
  countedStates: ['pending_upload', 'uploaded', 'processing', 'ready'], // pending uploads reserve quota
});
// Slice 4: resumable uploads via R2 multipart (free R2 API; R2 itself still needs owner approval to go live).
export const MULTIPART = Object.freeze({
  minPartBytes: 5 * MB,         // R2 minimum for every part except the last
  defaultPartBytes: 8 * MB,
  maxPartBytes: 100 * MB,
  maxPartAttempts: 3,           // bounded retry per part
});
// Slice 4: backups to a SEPARATE bucket binding (MEDIA_BACKUP). Daily cron; free Cron Trigger.
export const BACKUP = Object.freeze({
  cron: '30 3 * * *',           // must match wrangler.jsonc triggers.crons
  batchLimit: 200,              // objects copied per run (cron catches up on later runs)
  manifestPrefix: 'manifests/',
  objectPrefix: 'objects/',
  retentionDays: 30,            // documented policy placeholder; deletion of backup copies is NOT automated yet
  rpoHours: 24, rtoHours: 24,   // targets (planned), not measured
});
