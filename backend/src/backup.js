import { assertVaultKey, assertVaultKeyFor, vaultPutFor, vaultDeleteFor, VaultKeyError } from './vault-keys.js';
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

/** Backup copy key for a Vault object: objects/vault/<type>/<owner>/<id>. Refuses non-vault keys. */
export function vaultBackupKey(objectKey) { return BACKUP.objectPrefix + assertVaultKey(objectKey); }

/** Per-id owner-delete marker key in MEDIA_BACKUP: deletes/<media_id>.json */
export function vaultDeleteMarkerKey(mediaId) {
  if (typeof mediaId !== 'string' || !mediaId || mediaId.includes('/') || mediaId.includes('\\') || mediaId.includes('..')) {
    throw new VaultKeyError(mediaId);
  }
  return BACKUP.deletePrefix + mediaId + '.json';
}

function isOwnerDeleteRow(row) {
  if (!row || !row.deleted_at) return false;
  const err = String(row.last_error || '');
  return /deleted by owner/i.test(err) || /owner delete/i.test(err) || /^cleanup: quarantined:delete:/i.test(err);
}

/**
 * Write (or refresh) an owner-delete marker into MEDIA_BACKUP before/while purging backup bytes.
 * Same-bucket ledger caveat: if this put fails while a prior backup object remains, disaster restore
 * cannot learn the delete from the bucket alone — operators must supply D1 tombstone ids (extraDeletedIds
 * / deletionSnapshotDb). Failure is NOT ignored.
 */
export async function writeOwnerDeleteMarker(env, row, deletedAt = null) {
  if (!row || typeof row.id !== 'string' || !row.id) throw new VaultKeyError(row && row.object_key);
  assertVaultKeyFor(row.object_key, row);
  if (!env.MEDIA_BACKUP) return { skipped: true, reason: 'MEDIA_BACKUP missing' };
  const key = vaultDeleteMarkerKey(row.id);
  const body = JSON.stringify({
    id: row.id,
    owner_id: row.owner_id,
    object_key: row.object_key,
    deleted_at: deletedAt || row.deleted_at || now(),
    reason: 'owner_delete',
    vault_version: VAULT_VERSION,
  });
  await env.MEDIA_BACKUP.put(key, body, { httpMetadata: { contentType: 'application/json' } });
  return { key, written: true };
}

/**
 * Remove the backup object + media_backups row for THIS media row only.
 * Writes a deletes/<id>.json marker first (when MEDIA_BACKUP is bound), then deletes the object, then the row.
 * Key is derived from row.object_key after assertVaultKeyFor — never trusts client-supplied backup keys.
 * Returns { ok:true } or throws on backup R2 failure (caller marks cleanup_pending).
 * Idempotent if backup already absent.
 */
export async function purgeBackupForMedia(env, row) {
  if (!row || typeof row.id !== 'string' || !row.id) throw new VaultKeyError(row && row.object_key);
  assertVaultKeyFor(row.object_key, row);
  const bkey = vaultBackupKey(row.object_key);
  if (env.MEDIA_BACKUP) {
    await writeOwnerDeleteMarker(env, row);
    await env.MEDIA_BACKUP.delete(bkey);
  }
  await env.DB.prepare(`DELETE FROM media_backups WHERE media_id=?`).bind(row.id).run();
  return { backup_key: bkey, purged: true };
}

/** List owner-delete marker ids from MEDIA_BACKUP deletes/ prefix. Throws on list failure (fail closed). */
export async function listOwnerDeleteMarkerIds(sourceBucket) {
  const ids = new Set();
  if (!sourceBucket) throw new Error('deletion_authority_unavailable: sourceBucket required to list deletes/');
  let cursor;
  for (let page = 0; page < 100; page++) {
    const listed = await sourceBucket.list({ prefix: BACKUP.deletePrefix, limit: 1000, ...(cursor ? { cursor } : {}) });
    for (const o of listed.objects || []) {
      const rest = o.key.slice(BACKUP.deletePrefix.length);
      if (!rest || rest.includes('/')) continue;
      const id = rest.endsWith('.json') ? rest.slice(0, -5) : rest;
      if (id) ids.add(id);
    }
    if (!listed.truncated) break;
    cursor = listed.cursor;
  }
  return ids;
}

async function loadDeletionAuthority({ sourceBucket, targetDb, man, extraDeletedIds, deletionSnapshotDb }) {
  const deleted = new Set();
  const sources = [];
  const limits = {
    same_bucket_deletion_ledger: true,
    note: 'Delete markers live in the same MEDIA_BACKUP bucket as backup objects. A bucket outage that blocks marker writes while prior backup bytes remain makes this ledger incomplete; pass extraDeletedIds or deletionSnapshotDb from D1 (tombstones survive independently). Do not treat a successful restore as proof every owner-deleted byte is gone globally.',
  };

  // Always honour tombstones already in the restore target.
  const targetTombs = (await targetDb.prepare(
    `SELECT id, last_error, deleted_at FROM media WHERE deleted_at IS NOT NULL`
  ).all()).results;
  for (const r of targetTombs) {
    if (isOwnerDeleteRow(r) || r.deleted_at) deleted.add(r.id);
  }
  if (targetTombs.length) sources.push('target_db_tombstones');

  // Manifest deleted_entries (present on manifests written after this batch; may be empty array).
  const hasManifestDeleted = Array.isArray(man.deleted_entries);
  if (hasManifestDeleted) {
    for (const d of man.deleted_entries) {
      if (d && typeof d.id === 'string' && d.id) deleted.add(d.id);
      else if (typeof d === 'string' && d) deleted.add(d);
    }
    sources.push('manifest.deleted_entries');
  }

  // Same-bucket deletes/ markers — list must succeed (fail closed on error).
  let markerIds;
  try {
    markerIds = await listOwnerDeleteMarkerIds(sourceBucket);
    for (const id of markerIds) deleted.add(id);
    sources.push('bucket_deletes_prefix');
  } catch (e) {
    throw new Error(`deletion_authority_unavailable: failed to list ${BACKUP.deletePrefix}: ${e && e.message || e}`);
  }

  if (Array.isArray(extraDeletedIds)) {
    for (const id of extraDeletedIds) if (typeof id === 'string' && id) deleted.add(id);
    sources.push('extraDeletedIds');
  }

  if (deletionSnapshotDb) {
    const snap = (await deletionSnapshotDb.prepare(
      `SELECT id, last_error, deleted_at FROM media WHERE deleted_at IS NOT NULL`
    ).all()).results;
    for (const r of snap) deleted.add(r.id);
    sources.push('deletionSnapshotDb');
  }

  // Fail closed when we have no authoritative delete snapshot beyond whatever happens to be in target.
  // New manifests always carry deleted_entries (possibly []). Old manifests without it need extras or snapshot.
  const authorityComplete = hasManifestDeleted
    || Array.isArray(extraDeletedIds)
    || !!deletionSnapshotDb;
  if (!authorityComplete) {
    throw new Error(
      'deletion_authority_incomplete: manifest lacks deleted_entries; pass extraDeletedIds from D1 Time Travel/export or deletionSnapshotDb, or use a newer manifest. Same-bucket deletes/ markers alone are not a complete distributed guarantee under marker-write outage.'
    );
  }

  return { deleted, sources, limits };
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
        try { await env.MEDIA_BACKUP.delete(key); } catch { /* best-effort object drop; marker written by delete path */ }
        continue;
      }
      // Conditional insert: only record backup while the media row is still ready+live (closes K4 dangling-row race).
      const ins = await env.DB.prepare(
        `INSERT INTO media_backups(media_id,backup_key,checksum_sha256,size_bytes,run_id,backed_up_at)
          SELECT ?,?,?,?,?,?
          WHERE EXISTS (
            SELECT 1 FROM media WHERE id=? AND owner_id=? AND state='ready' AND deleted_at IS NULL
          )
          ON CONFLICT(media_id) DO UPDATE SET
            backup_key=excluded.backup_key,
            checksum_sha256=excluded.checksum_sha256,
            size_bytes=excluded.size_bytes,
            run_id=excluded.run_id,
            backed_up_at=excluded.backed_up_at
          WHERE EXISTS (
            SELECT 1 FROM media WHERE id=excluded.media_id AND state='ready' AND deleted_at IS NULL
          )`
      ).bind(m.id, key, m.checksum_sha256, m.size_bytes, id, now(), m.id, m.owner_id).run();
      if ((ins?.meta?.changes ?? 0) === 0) {
        try { await env.MEDIA_BACKUP.delete(key); } catch { /* race: deleted after recheck */ }
        continue;
      }
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
  // Owner-delete tombstones known to live D1 at manifest time (incl. pending/quarantined cleanup).
  const deletedEntries = (await env.DB.prepare(
    `SELECT id, owner_id, deleted_at, object_key, last_error FROM media
      WHERE deleted_at IS NOT NULL
        AND (last_error LIKE '%deleted by owner%' OR last_error LIKE '%owner delete%'
             OR last_error LIKE 'cleanup: quarantined:delete:%')
      ORDER BY deleted_at`
  ).all()).results.map((r) => ({
    id: r.id, owner_id: r.owner_id, deleted_at: r.deleted_at, object_key: r.object_key, reason: 'owner_delete',
  }));
  const manifest = {
    format: 'pikk-vault-backup-manifest/1',
    run_id: id,
    created_at: now(),
    vault_version: VAULT_VERSION,
    entries: rows,
    entitlements: ents,
    deleted_entries: deletedEntries,
  };
  const mkey = `${BACKUP.manifestPrefix}${id}.json`;
  await env.MEDIA_BACKUP.put(mkey, JSON.stringify(manifest), { httpMetadata: { contentType: 'application/json' } });
  await env.MEDIA_BACKUP.put(`${BACKUP.manifestPrefix}latest.json`, JSON.stringify({ manifest_key: mkey, run_id: id, created_at: manifest.created_at }));
  const state = errors === 0 ? 'succeeded' : (copied > 0 ? 'partial' : 'failed');
  await env.DB.prepare(`UPDATE vault_backup_runs SET state=?, objects_copied=?, bytes_copied=?, errors=?, manifest_key=?, manifest_entries=?, finished_at=? WHERE id=?`)
    .bind(state, copied, bytes, errors, mkey, rows.length, now(), id).run();
  return { id, state, objects_copied: copied, bytes_copied: bytes, errors, manifest_key: mkey, manifest_entries: rows.length, deleted_entries: deletedEntries.length };
}

/**
 * Restore a manifest into an ISOLATED environment (separate D1 + R2).
 * Requires confirmIsolatedTarget:true (enforced in code, not docs-only).
 * Requires a complete deletion authority (manifest.deleted_entries and/or extraDeletedIds /
 * deletionSnapshotDb, plus a successful deletes/ list). Fail closed when authority is unavailable.
 * Honest limit: same-bucket delete markers are incomplete under marker-write outage while backup
 * bytes remain — supply D1-derived ids. Never claims global erasure.
 */
export async function restoreBackup({
  sourceBucket, targetDb, targetBucket, manifestKey,
  confirmIsolatedTarget,
  extraDeletedIds,
  deletionSnapshotDb,
  allowMissingDeletionLedger = false,
}) {
  if (!sourceBucket || !targetDb || !targetBucket) throw new Error('restore requires explicit sourceBucket, targetDb and targetBucket');
  if (confirmIsolatedTarget !== true) {
    throw new Error('restoreBackup requires confirmIsolatedTarget:true (isolated D1+R2 only; refuse live/implicit targets)');
  }
  let key = manifestKey;
  if (!key) { const l = await sourceBucket.get(`${BACKUP.manifestPrefix}latest.json`); if (!l) throw new Error('no backup manifest'); key = (await l.json()).manifest_key; }
  const mo = await sourceBucket.get(key);
  if (!mo) throw new Error('manifest not found');
  const man = await mo.json();
  if (man.format !== 'pikk-vault-backup-manifest/1') throw new Error('unsupported manifest format');

  let authority;
  try {
    authority = await loadDeletionAuthority({ sourceBucket, targetDb, man, extraDeletedIds, deletionSnapshotDb });
  } catch (e) {
    if (allowMissingDeletionLedger === true) {
      // Explicit unsafe escape — still merge whatever we can, but report the hole.
      authority = {
        deleted: new Set(Array.isArray(extraDeletedIds) ? extraDeletedIds.filter((x) => typeof x === 'string') : []),
        sources: ['allowMissingDeletionLedger'],
        limits: {
          same_bucket_deletion_ledger: true,
          deletion_authority_incomplete: true,
          note: String(e && e.message || e),
        },
      };
      try {
        const markers = await listOwnerDeleteMarkerIds(sourceBucket);
        for (const id of markers) authority.deleted.add(id);
        authority.sources.push('bucket_deletes_prefix');
      } catch { /* already incomplete */ }
      const tombs = (await targetDb.prepare(`SELECT id FROM media WHERE deleted_at IS NOT NULL`).all()).results;
      for (const r of tombs) authority.deleted.add(r.id);
    } else {
      throw e;
    }
  }

  const report = {
    manifest_key: key,
    run_id: man.run_id,
    restored: 0,
    verified: 0,
    skipped_missing_owner: [],
    skipped_invalid: [],
    skipped_owner_deleted: [],
    skipped_missing_backup: [],
    skipped_live_tombstone_race: [],
    errors: [],
    deletion_authority: { sources: authority.sources, deleted_id_count: authority.deleted.size },
    limits: authority.limits,
  };

  for (const e of man.entries) {
    // An entry must carry a non-empty string id: otherwise skip it as invalid (no object write, no row insert).
    if (!e || typeof e !== 'object' || typeof e.id !== 'string' || e.id === '') { report.skipped_invalid.push({ object_key: e && e.object_key, reason: 'missing id' }); continue; }
    try {
      if (authority.deleted.has(e.id)) {
        report.skipped_owner_deleted.push(e.id);
        continue;
      }
      const owner = await targetDb.prepare(`SELECT id FROM users WHERE id=?`).bind(e.owner_id).first();
      if (!owner) { report.skipped_missing_owner.push(e.id); continue; }
      assertVaultKeyFor(e.object_key, e); // manifest entry's key must match its own owner_id/media_type/id
      if (e.backup_key !== vaultBackupKey(e.object_key)) throw new VaultKeyError(e.backup_key);
      // Never resurrect an owner-deleted tombstone already present in the target DB.
      const tomb = await targetDb.prepare(
        `SELECT state, deleted_at, last_error, owner_id FROM media WHERE id=?`
      ).bind(e.id).first();
      if (tomb && tomb.deleted_at) {
        report.skipped_owner_deleted.push(e.id);
        continue;
      }
      // Never overwrite another owner's row/object: any existing row with this id or key must be the same owner+key.
      const clash = (await targetDb.prepare(`SELECT id, owner_id, object_key, deleted_at, last_error FROM media WHERE id=? OR object_key=?`).bind(e.id, e.object_key).all()).results
        .find(x => x.owner_id !== e.owner_id || x.id !== e.id || x.object_key !== e.object_key);
      if (clash) throw new VaultKeyError(e.object_key);
      const src = await sourceBucket.get(e.backup_key);
      if (!src) { report.skipped_missing_backup.push(e.id); continue; }
      await vaultPutFor(targetBucket, e.object_key, e, src.body, { sha256: e.checksum_sha256, httpMetadata: { contentType: 'application/octet-stream' } });
      const cols = MEDIA_COLS;
      // Conditional upsert: refuse to clear a tombstone that landed after the pre-check (live restore race).
      const upsert = await targetDb.prepare(
        `INSERT INTO media(${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})
          ON CONFLICT(id) DO UPDATE SET
            ${cols.filter((c) => c !== 'id').map((c) => `${c}=excluded.${c}`).join(', ')}
          WHERE media.deleted_at IS NULL`
      ).bind(...cols.map(c => e[c] ?? null)).run();
      // Post-put recheck: if a tombstone won the race, drop the restored object and do not count as restored.
      const after = await targetDb.prepare(
        `SELECT state, deleted_at, last_error FROM media WHERE id=?`
      ).bind(e.id).first();
      if (!after || after.deleted_at || (upsert?.meta?.changes ?? 0) === 0 && tomb) {
        try { await vaultDeleteFor(targetBucket, e.object_key, e); } catch { /* best-effort */ }
        // If row missing entirely and changes=0, something odd — treat as error unless deleted.
        if (after && after.deleted_at) {
          report.skipped_live_tombstone_race.push(e.id);
          report.skipped_owner_deleted.push(e.id);
          continue;
        }
      }
      if (after && after.deleted_at) {
        try { await vaultDeleteFor(targetBucket, e.object_key, e); } catch { /* best-effort */ }
        report.skipped_live_tombstone_race.push(e.id);
        report.skipped_owner_deleted.push(e.id);
        continue;
      }
      // Re-read: if conflict-update was skipped because deleted_at was set mid-flight, changes may be 0
      // while a prior ready row... actually if tombstone exists, after.deleted_at is set (handled above).
      // If INSERT failed silently with changes=0 and no row — clean up.
      if (!after) {
        try { await vaultDeleteFor(targetBucket, e.object_key, e); } catch { /* best-effort */ }
        report.errors.push({ media_id: e.id, error: 'restore row missing after upsert' });
        continue;
      }
      // Final race: delete landed after upsert matched ready row then soft-deleted — recheck once more.
      const final = await targetDb.prepare(`SELECT deleted_at FROM media WHERE id=?`).bind(e.id).first();
      if (final && final.deleted_at) {
        try { await vaultDeleteFor(targetBucket, e.object_key, e); } catch { /* best-effort */ }
        report.skipped_live_tombstone_race.push(e.id);
        report.skipped_owner_deleted.push(e.id);
        continue;
      }
      report.restored++;
      const back = await targetBucket.get(e.object_key);
      if (back && back.size === e.size_bytes && (await sha256Of(back.body)) === e.checksum_sha256) report.verified++;
      else report.errors.push({ media_id: e.id, error: 'verification failed' });
    } catch (err) { report.errors.push({ media_id: e.id, error: String(err && err.message || err) }); }
  }
  for (const en of man.entitlements || []) {
    await targetDb.prepare(`INSERT OR IGNORE INTO media_entitlements(media_id,user_id,source,granted_by,order_id,created_at,expires_at)
      SELECT ?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM media WHERE id=? AND deleted_at IS NULL) AND EXISTS (SELECT 1 FROM users WHERE id=?)`)
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
