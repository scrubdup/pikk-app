import { assertVaultKey, assertVaultKeyFor, vaultPutFor, VaultKeyError } from './vault-keys.js';
// PIKK Vault slice 4: backup export (cron) to a SEPARATE R2 binding MEDIA_BACKUP + isolated restore procedure.
// MEDIA_BACKUP is NOT declared in wrangler.jsonc (R2 not approved); tests supply it via vitest.config.js. Missing => skip/503.
import { ApiError, json, clientIp } from './http.js';
import { requirePermission } from './permissions.js';
import { audit } from './audit.js';
import { newId, hex } from './crypto.js';
import { BACKUP, VAULT_VERSION } from './media-config.js';

const now = () => new Date().toISOString();
const MEDIA_COLS = ['id','owner_id','media_type','is_story','object_key','filename','declared_content_type','detected_content_type','size_bytes',
  'checksum_sha256','access_policy','state','expires_at','created_at','updated_at','uploaded_at','ready_at','width','height','duration_ms'];

async function sha256Of(body) {
  const d = new crypto.DigestStream('SHA-256');
  await body.pipeTo(d);
  return hex(await d.digest);
}

/** One backup run: copy not-yet-backed-up ready objects, then write a full metadata manifest. */
export async function runBackup(env, trigger = 'cron') {
  const id = newId('bkp'); const started = now();
  if (!env.MEDIA_BACKUP || !env.MEDIA) {
    const msg = !env.MEDIA_BACKUP ? 'binding MEDIA_BACKUP missing' : 'binding MEDIA missing';
    await env.DB.prepare(`INSERT INTO vault_backup_runs(id,trigger,state,message,started_at,finished_at) VALUES (?,?, 'skipped', ?, ?, ?)`).bind(id, trigger, msg, started, now()).run();
    return { id, state: 'skipped', message: msg };
  }
  await env.DB.prepare(`INSERT INTO vault_backup_runs(id,trigger,state,started_at) VALUES (?,?,'running',?)`).bind(id, trigger, started).run();
  const todo = (await env.DB.prepare(
    `SELECT m.id, m.owner_id, m.media_type, m.object_key, m.checksum_sha256, m.size_bytes FROM media m LEFT JOIN media_backups b ON b.media_id = m.id
      WHERE m.state='ready' AND m.deleted_at IS NULL AND m.checksum_sha256 IS NOT NULL
        AND (b.media_id IS NULL OR b.checksum_sha256 <> m.checksum_sha256)
      ORDER BY m.ready_at LIMIT ?`).bind(BACKUP.batchLimit).all()).results;
  let copied = 0, bytes = 0, errors = 0;
  for (const m of todo) {
    try {
      assertVaultKeyFor(m.object_key, m); // only this row's own vault/<type>/<owner>/<id> object
      const src = await env.MEDIA.get(m.object_key);
      if (!src) throw new Error('source object missing');
      const key = vaultBackupKey(m.object_key); // objects/vault/<type>/<owner>/<id>
      // R2 verifies the sha256 on write; a corrupted source fails here instead of producing a bad backup.
      await env.MEDIA_BACKUP.put(key, src.body, { sha256: m.checksum_sha256, customMetadata: { media_id: m.id, sha256: m.checksum_sha256 } });
      // Concurrent owner-delete may have claimed the row while we copied — never record/keep a backup for deleted media.
      const still = await env.DB.prepare(
        `SELECT 1 AS ok FROM media WHERE id=? AND owner_id=? AND state='ready' AND deleted_at IS NULL`
      ).bind(m.id, m.owner_id).first();
      if (!still) {
        try { await env.MEDIA_BACKUP.delete(key); } catch { /* best-effort */ }
        continue;
      }
      await env.DB.prepare(`INSERT INTO media_backups(media_id,backup_key,checksum_sha256,size_bytes,run_id,backed_up_at) VALUES (?,?,?,?,?,?)
        ON CONFLICT(media_id) DO UPDATE SET backup_key=excluded.backup_key, checksum_sha256=excluded.checksum_sha256, size_bytes=excluded.size_bytes, run_id=excluded.run_id, backed_up_at=excluded.backed_up_at`)
        .bind(m.id, key, m.checksum_sha256, m.size_bytes, id, now()).run();
      copied++; bytes += m.size_bytes;
    } catch (e) { errors++; }
  }
  // Manifest: metadata for every ready media row that has a verified backup copy (+ its entitlements).
  const rows = (await env.DB.prepare(
    `SELECT ${MEDIA_COLS.map(c => 'm.' + c).join(',')}, b.backup_key FROM media m JOIN media_backups b ON b.media_id=m.id AND b.checksum_sha256=m.checksum_sha256
      WHERE m.state='ready' AND m.deleted_at IS NULL ORDER BY m.created_at`).all()).results;
  const ents = (await env.DB.prepare(
    `SELECT e.media_id,e.user_id,e.source,e.granted_by,e.order_id,e.created_at,e.expires_at FROM media_entitlements e
      JOIN media_backups b ON b.media_id=e.media_id`).all()).results;
  const manifest = { format: 'pikk-vault-backup-manifest/1', run_id: id, created_at: now(), vault_version: VAULT_VERSION,
    entries: rows, entitlements: ents };
  const mkey = `${BACKUP.manifestPrefix}${id}.json`;
  await env.MEDIA_BACKUP.put(mkey, JSON.stringify(manifest), { httpMetadata: { contentType: 'application/json' } });
  await env.MEDIA_BACKUP.put(`${BACKUP.manifestPrefix}latest.json`, JSON.stringify({ manifest_key: mkey, run_id: id, created_at: manifest.created_at }));
  const state = errors === 0 ? 'succeeded' : (copied > 0 ? 'partial' : 'failed');
  await env.DB.prepare(`UPDATE vault_backup_runs SET state=?, objects_copied=?, bytes_copied=?, errors=?, manifest_key=?, manifest_entries=?, finished_at=? WHERE id=?`)
    .bind(state, copied, bytes, errors, mkey, rows.length, now(), id).run();
  return { id, state, objects_copied: copied, bytes_copied: bytes, errors, manifest_key: mkey, manifest_entries: rows.length };
}

/**
 * Restore a manifest into an ISOLATED environment (separate D1 + R2). Never targets production bindings implicitly.
 * Owners must already exist in targetDb (users are restored from D1 Time Travel/export, not from media manifests:
 * manifests deliberately carry no account data). Entries whose owner is missing are reported, not faked.
 */
/** Backup copy key for a Vault object: objects/vault/<type>/<owner>/<id>. Refuses non-vault keys. */
export function vaultBackupKey(objectKey) { return BACKUP.objectPrefix + assertVaultKey(objectKey); }

/**
 * Remove the backup object + media_backups row for THIS media row only.
 * Key is derived from row.object_key after assertVaultKeyFor — never trusts client-supplied backup keys.
 * Returns { ok:true } or throws on backup R2 failure (caller marks cleanup_pending).
 * Idempotent if backup already absent.
 */
export async function purgeBackupForMedia(env, row) {
  if (!row || typeof row.id !== 'string' || !row.id) throw new VaultKeyError(row && row.object_key);
  assertVaultKeyFor(row.object_key, row);
  const bkey = vaultBackupKey(row.object_key);
  if (env.MEDIA_BACKUP) {
    await env.MEDIA_BACKUP.delete(bkey);
  }
  await env.DB.prepare(`DELETE FROM media_backups WHERE media_id=?`).bind(row.id).run();
  return { backup_key: bkey, purged: true };
}

export async function restoreBackup({ sourceBucket, targetDb, targetBucket, manifestKey }) {
  if (!sourceBucket || !targetDb || !targetBucket) throw new Error('restore requires explicit sourceBucket, targetDb and targetBucket');
  let key = manifestKey;
  if (!key) { const l = await sourceBucket.get(`${BACKUP.manifestPrefix}latest.json`); if (!l) throw new Error('no backup manifest'); key = (await l.json()).manifest_key; }
  const mo = await sourceBucket.get(key);
  if (!mo) throw new Error('manifest not found');
  const man = await mo.json();
  if (man.format !== 'pikk-vault-backup-manifest/1') throw new Error('unsupported manifest format');
  const report = { manifest_key: key, run_id: man.run_id, restored: 0, verified: 0, skipped_missing_owner: [], skipped_invalid: [], skipped_owner_deleted: [], skipped_missing_backup: [], errors: [] };
  for (const e of man.entries) {
    // An entry must carry a non-empty string id: otherwise skip it as invalid (no object write, no row insert).
    if (!e || typeof e !== 'object' || typeof e.id !== 'string' || e.id === '') { report.skipped_invalid.push({ object_key: e && e.object_key, reason: 'missing id' }); continue; }
    try {
      const owner = await targetDb.prepare(`SELECT id FROM users WHERE id=?`).bind(e.owner_id).first();
      if (!owner) { report.skipped_missing_owner.push(e.id); continue; }
      assertVaultKeyFor(e.object_key, e); // manifest entry's key must match its own owner_id/media_type/id
      if (e.backup_key !== vaultBackupKey(e.object_key)) throw new VaultKeyError(e.backup_key);
      // Never resurrect an owner-deleted tombstone already present in the target DB.
      const tomb = await targetDb.prepare(
        `SELECT state, deleted_at, last_error, owner_id FROM media WHERE id=?`
      ).bind(e.id).first();
      if (tomb && tomb.deleted_at && tomb.owner_id === e.owner_id
          && (/deleted by owner/i.test(String(tomb.last_error || '')) || /owner delete/i.test(String(tomb.last_error || '')))) {
        report.skipped_owner_deleted.push(e.id);
        continue;
      }
      // Never overwrite another owner's row/object: any existing row with this id or key must be the same owner+key.
      const clash = (await targetDb.prepare(`SELECT id, owner_id, object_key, deleted_at, last_error FROM media WHERE id=? OR object_key=?`).bind(e.id, e.object_key).all()).results
        .find(x => x.owner_id !== e.owner_id || x.id !== e.id || x.object_key !== e.object_key);
      if (clash) throw new VaultKeyError(e.object_key);
      // If an existing same-owner tombstone somehow matched above incompletely, still refuse REPLACE over deleted_at.
      if (tomb && tomb.deleted_at) { report.skipped_owner_deleted.push(e.id); continue; }
      const src = await sourceBucket.get(e.backup_key);
      if (!src) { report.skipped_missing_backup.push(e.id); continue; }
      await vaultPutFor(targetBucket, e.object_key, e, src.body, { sha256: e.checksum_sha256, httpMetadata: { contentType: 'application/octet-stream' } });
      const cols = MEDIA_COLS;
      await targetDb.prepare(`INSERT OR REPLACE INTO media(${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`).bind(...cols.map(c => e[c] ?? null)).run();
      report.restored++;
      const back = await targetBucket.get(e.object_key);
      if (back && back.size === e.size_bytes && (await sha256Of(back.body)) === e.checksum_sha256) report.verified++;
      else report.errors.push({ media_id: e.id, error: 'verification failed' });
    } catch (err) { report.errors.push({ media_id: e.id, error: String(err && err.message || err) }); }
  }
  for (const en of man.entitlements || []) {
    await targetDb.prepare(`INSERT OR IGNORE INTO media_entitlements(media_id,user_id,source,granted_by,order_id,created_at,expires_at)
      SELECT ?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM media WHERE id=?) AND EXISTS (SELECT 1 FROM users WHERE id=?)`)
      .bind(en.media_id, en.user_id, en.source, null, en.order_id, en.created_at, en.expires_at, en.media_id, en.user_id).run();
  }
  return report;
}

export async function backupHealth(env) {
  const last = await env.DB.prepare(`SELECT * FROM vault_backup_runs ORDER BY started_at DESC LIMIT 1`).first();
  const lastOk = await env.DB.prepare(`SELECT finished_at FROM vault_backup_runs WHERE state='succeeded' ORDER BY started_at DESC LIMIT 1`).first();
  const pending = await env.DB.prepare(`SELECT COUNT(*) AS n FROM media m LEFT JOIN media_backups b ON b.media_id=m.id
    WHERE m.state='ready' AND m.deleted_at IS NULL AND (b.media_id IS NULL OR b.checksum_sha256 <> m.checksum_sha256)`).first();
  let reachable = false;
  try { if (env.MEDIA_BACKUP) { await env.MEDIA_BACKUP.head('__vault_backup_probe'); reachable = true; } } catch { /* unreachable */ }
  const staleH = lastOk?.finished_at ? (Date.now() - Date.parse(lastOk.finished_at)) / 3600e3 : null;
  return { binding: 'MEDIA_BACKUP', configured: !!env.MEDIA_BACKUP, reachable, error: env.MEDIA_BACKUP ? null : 'vault backup storage not configured (binding MEDIA_BACKUP missing)', cron: BACKUP.cron, rpo_hours_target: BACKUP.rpoHours, retention_days_policy: BACKUP.retentionDays,
    last_run: last ? { id: last.id, state: last.state, trigger: last.trigger, objects_copied: last.objects_copied, errors: last.errors,
      manifest_key: last.manifest_key, message: last.message, started_at: last.started_at, finished_at: last.finished_at } : null,
    last_success_at: lastOk?.finished_at || null, stale: staleH === null || staleH > BACKUP.rpoHours, objects_pending_backup: pending.n };
}

async function runNow(env, req, ctx) {
  const s = requirePermission(ctx, 'admin.access');
  const r = await runBackup(env, 'admin');
  await audit(env, { actor: s.user.id, action: 'vault.backup_run', target: r.id, ip: clientIp(req), meta: { state: r.state } });
  return json(200, { backup: r });
}
async function listRuns(env, req, ctx) {
  requirePermission(ctx, 'admin.access');
  const r = (await env.DB.prepare(`SELECT * FROM vault_backup_runs ORDER BY started_at DESC LIMIT 50`).all()).results;
  return json(200, { runs: r });
}

export async function backupRoute(env, req, ctx, m, p) {
  if (m === 'POST' && p === '/vault/admin/backups/run') return runNow(env, req, ctx);
  if (m === 'GET' && p === '/vault/admin/backups') return listRuns(env, req, ctx);
  return null;
}
