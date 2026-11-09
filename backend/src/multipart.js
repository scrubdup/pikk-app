import { vaultDeleteFor, assertVaultKeyFor, isNoSuchUpload } from './vault-keys.js';
// PIKK Vault slice 4: resumable uploads via R2 multipart, bounded per-part retry, cancel.
import { ApiError, json, clientIp } from './http.js';
import { requireVerified } from './auth.js';
import { auditStmt, audit } from './audit.js';
import { MULTIPART, CANCEL_R2_PENDING_ERR } from './media-config.js';

const now = () => new Date().toISOString();
const notFound = () => new ApiError(404, 'not_found', 'Not found');
function bucket(env) {
  if (!env.MEDIA) throw new ApiError(503, 'storage_unavailable', 'Media storage not configured');
  return env.MEDIA;
}

export function planParts(size, requested) {
  let ps = requested === undefined ? MULTIPART.defaultPartBytes : requested;
  if (!Number.isSafeInteger(ps) || ps < MULTIPART.minPartBytes || ps > MULTIPART.maxPartBytes)
    throw new ApiError(422, 'validation_failed', 'Invalid input', { part_size: `integer ${MULTIPART.minPartBytes}..${MULTIPART.maxPartBytes}` });
  const count = Math.max(1, Math.ceil(size / ps));
  if (count > 10000) throw new ApiError(422, 'validation_failed', 'Invalid input', { part_size: 'too many parts' });
  return { partSize: ps, partCount: count };
}

/** Called from createUpload after the media row is inserted. */
export async function startMultipart(env, row, objectKey, size, requestedPartSize) {
  assertVaultKeyFor(objectKey, row); // key must be vault/<media_type>/<owner_id>/<id> of the new row
  const mediaId = row.id;
  const { partSize, partCount } = planParts(size, requestedPartSize);
  const mpu = await bucket(env).createMultipartUpload(objectKey, { httpMetadata: { contentType: 'application/octet-stream' } });
  const t = now();
  await env.DB.prepare(`INSERT INTO media_multipart(media_id,r2_upload_id,part_size,part_count,state,created_at,updated_at) VALUES (?,?,?,?,'active',?,?)`)
    .bind(mediaId, mpu.uploadId, partSize, partCount, t, t).run();
  return { part_size: partSize, part_count: partCount, parts_url: `/media/uploads/${mediaId}/parts`, max_part_attempts: MULTIPART.maxPartAttempts };
}

async function owned(env, ctx, id) {
  const s = requireVerified(ctx);
  const r = await env.DB.prepare(`SELECT * FROM media WHERE id=? AND owner_id=? AND deleted_at IS NULL`).bind(id, s.user.id).first();
  if (!r) throw notFound();
  assertVaultKeyFor(r.object_key, r); // key must belong to this row (owner/type/id)
  return { s, r };
}
async function session(env, id) {
  const ses = await env.DB.prepare(`SELECT * FROM media_multipart WHERE media_id=?`).bind(id).first();
  if (!ses) throw new ApiError(409, 'not_multipart', 'Upload is not a multipart upload');
  return ses;
}
const expectedSize = (r, ses, n) => n < ses.part_count ? ses.part_size : r.size_bytes - ses.part_size * (ses.part_count - 1);

async function putPart(env, req, ctx, id, n) {
  const { r } = await owned(env, ctx, id);
  const ses = await session(env, id);
  if (r.state !== 'pending_upload' || ses.state !== 'active') throw new ApiError(409, 'invalid_state', 'Upload is not accepting parts');
  if (!(n >= 1 && n <= ses.part_count)) throw new ApiError(422, 'validation_failed', 'Invalid input', { part: `1..${ses.part_count}` });
  const want = expectedSize(r, ses, n);
  const len = Number(req.headers.get('Content-Length'));
  if (!Number.isSafeInteger(len) || len <= 0) throw new ApiError(411, 'length_required', 'Content-Length required');
  if (len !== want) throw new ApiError(len > want ? 413 : 422, len > want ? 'payload_too_large' : 'size_mismatch', 'Part size must equal planned size', { expected: want });
  const prev = await env.DB.prepare(`SELECT attempts FROM media_multipart_parts WHERE media_id=? AND part_number=?`).bind(id, n).first();
  if (prev && prev.attempts >= MULTIPART.maxPartAttempts)
    throw new ApiError(429, 'part_retry_limit', 'Part retry limit reached; cancel and restart the upload', { max_attempts: MULTIPART.maxPartAttempts });
  const t = now();
  await env.DB.prepare(`INSERT INTO media_multipart_parts(media_id,part_number,attempts,updated_at) VALUES (?,?,1,?)
    ON CONFLICT(media_id,part_number) DO UPDATE SET attempts=attempts+1, updated_at=excluded.updated_at`).bind(id, n, t).run();
  let part;
  try {
    part = await bucket(env).resumeMultipartUpload(r.object_key, ses.r2_upload_id).uploadPart(n, req.body);
  } catch (e) {
    await env.DB.prepare(`UPDATE media_multipart_parts SET last_error=?, updated_at=? WHERE media_id=? AND part_number=?`).bind('part upload failed', now(), id, n).run();
    throw new ApiError(502, 'part_upload_failed', 'Part upload failed; retry this part', { part: n });
  }
  await env.DB.prepare(`UPDATE media_multipart_parts SET etag=?, size_bytes=?, last_error=NULL, updated_at=? WHERE media_id=? AND part_number=?`)
    .bind(part.etag, len, now(), id, n).run();
  return json(200, { part: { number: n, size: len, done: true } });
}

async function listParts(env, ctx, id) {
  const { r } = await owned(env, ctx, id);
  const ses = await session(env, id);
  const rows = (await env.DB.prepare(`SELECT part_number, size_bytes, etag, attempts FROM media_multipart_parts WHERE media_id=? ORDER BY part_number`).bind(id).all()).results;
  const by = Object.fromEntries(rows.map(x => [x.part_number, x]));
  const parts = []; const missing = [];
  for (let n = 1; n <= ses.part_count; n++) {
    const x = by[n];
    parts.push({ number: n, size: expectedSize(r, ses, n), done: !!(x && x.etag), attempts: x ? x.attempts : 0 });
    if (!(x && x.etag)) missing.push(n);
  }
  return json(200, { upload: { id, state: ses.state, part_size: ses.part_size, part_count: ses.part_count, parts, missing, max_part_attempts: MULTIPART.maxPartAttempts } });
}

async function completeParts(env, req, ctx, id) {
  const { s, r } = await owned(env, ctx, id);
  const ses = await session(env, id);
  if (r.state !== 'pending_upload' || ses.state !== 'active') throw new ApiError(409, 'invalid_state', 'Upload is not active');
  const rows = (await env.DB.prepare(`SELECT part_number, etag FROM media_multipart_parts WHERE media_id=? AND etag IS NOT NULL ORDER BY part_number`).bind(id).all()).results;
  if (rows.length !== ses.part_count) throw new ApiError(409, 'parts_missing', 'Not all parts uploaded', { received: rows.length, expected: ses.part_count });
  const obj = await bucket(env).resumeMultipartUpload(r.object_key, ses.r2_upload_id)
    .complete(rows.map(x => ({ partNumber: x.part_number, etag: x.etag })));
  const head = obj && obj.size !== undefined ? obj : await bucket(env).head(r.object_key);
  const t = now();
  if (!head || head.size !== r.size_bytes) {
    await vaultDeleteFor(bucket(env), r.object_key, r);
    await env.DB.batch([
      env.DB.prepare(`UPDATE media SET state='failed', last_error='stored size mismatch', updated_at=? WHERE id=? AND deleted_at IS NULL`).bind(t, id),
      env.DB.prepare(`UPDATE media_multipart SET state='aborted', updated_at=? WHERE media_id=?`).bind(t, id),
    ]);
    throw new ApiError(422, 'size_mismatch', 'Stored size mismatch');
  }
  const results = await env.DB.batch([
    env.DB.prepare(
      `UPDATE media SET state='uploaded', uploaded_at=?, updated_at=? WHERE id=? AND state='pending_upload' AND deleted_at IS NULL`
    ).bind(t, t, id),
    env.DB.prepare(`UPDATE media_multipart SET state='completed', updated_at=? WHERE media_id=? AND state='active'`).bind(t, id),
    auditStmt(env, { actor: s.user.id, action: 'media.multipart_assembled', target: id, ip: clientIp(req), meta: { parts: ses.part_count } }),
  ]);
  if ((results[0]?.meta?.changes ?? 0) !== 1) {
    await vaultDeleteFor(bucket(env), r.object_key, r);
    throw new ApiError(409, 'invalid_state', 'Upload is no longer accepting data');
  }
  // Same validation path as single PUT: client calls POST /media/:id/complete next (sniff + checksum + processing).
  return json(200, { media: { id, state: 'uploaded' }, next: `/media/${id}/complete` });
}

/** Cancel an upload that is not yet complete (single or multipart). Frees the quota reservation. */
async function cancel(env, req, ctx, id) {
  const { s, r } = await owned(env, ctx, id);
  if (!['pending_upload', 'uploaded'].includes(r.state)) throw new ApiError(409, 'invalid_state', 'Only unfinished uploads can be cancelled');
  const ses = await env.DB.prepare(`SELECT * FROM media_multipart WHERE media_id=?`).bind(id).first();
  const t = now();
  // Claim the row first so a racing PUT cannot resurrect it.
  const claim = await env.DB.prepare(
    `UPDATE media SET state='deleted', deleted_at=?, last_error='cancelled by owner', updated_at=? WHERE id=? AND deleted_at IS NULL AND state IN ('pending_upload','uploaded')`
  ).bind(t, t, id).run();
  if ((claim?.meta?.changes ?? 0) !== 1) throw new ApiError(409, 'invalid_state', 'Only unfinished uploads can be cancelled');

  let multipartAborted = false;
  let r2RetryNeeded = false;
  if (ses && ses.state === 'active') {
    try {
      await bucket(env).resumeMultipartUpload(r.object_key, ses.r2_upload_id).abort();
      multipartAborted = true;
    } catch (e) {
      if (isNoSuchUpload(e)) multipartAborted = true;
      else {
        // Transient R2 failure: keep multipart active; shared pending marker so sweeper retries.
        multipartAborted = false;
        r2RetryNeeded = true;
      }
    }
  }
  let cleanupPending = false;
  if (env.MEDIA) {
    try { await vaultDeleteFor(env.MEDIA, r.object_key, r); }
    catch (e) {
      // Soft-delete already claimed; queue R2 cleanup. Return 202 cleanup_pending (not 500).
      await env.DB.prepare(`UPDATE media SET last_error=?, updated_at=? WHERE id=? AND state='deleted'`)
        .bind(CANCEL_R2_PENDING_ERR, t, id).run();
      cleanupPending = true;
      r2RetryNeeded = true;
    }
  }
  if (r2RetryNeeded && !cleanupPending) {
    await env.DB.prepare(`UPDATE media SET last_error=?, updated_at=? WHERE id=? AND state='deleted'`)
      .bind(CANCEL_R2_PENDING_ERR, t, id).run();
    cleanupPending = true;
  }
  if (multipartAborted) {
    await env.DB.prepare(`UPDATE media_multipart SET state='aborted', updated_at=? WHERE media_id=? AND state='active'`).bind(t, id).run();
  }
  await audit(env, { actor: s.user.id, action: 'media.upload_cancelled', target: id, ip: clientIp(req), meta: { multipart_aborted: multipartAborted, cleanup_pending: cleanupPending } });
  if (cleanupPending) {
    return json(202, { media: { id, state: 'deleted', cancelled: true, multipart_aborted: multipartAborted, cleanup_pending: true } });
  }
  return json(200, { media: { id, state: 'deleted', cancelled: true, multipart_aborted: multipartAborted, cleanup_pending: false } });
}

export async function multipartRoute(env, req, ctx, m, p, ID) {
  let mm;
  if (m === 'PUT' && (mm = p.match(new RegExp(`^/media/uploads/${ID}/parts/(\\d{1,5})$`)))) return putPart(env, req, ctx, mm[1], Number(mm[2]));
  if (m === 'GET' && (mm = p.match(new RegExp(`^/media/uploads/${ID}/parts$`)))) return listParts(env, ctx, mm[1]);
  if (m === 'POST' && (mm = p.match(new RegExp(`^/media/uploads/${ID}/parts/complete$`)))) return completeParts(env, req, ctx, mm[1]);
  if (m === 'DELETE' && (mm = p.match(new RegExp(`^/media/uploads/${ID}$`)))) return cancel(env, req, ctx, mm[1]);
  return null;
}
