import { ApiError, clientIp } from './http.js';
import { requireVerified } from './auth.js';
import { newId } from './crypto.js';
import { audit } from './audit.js';
import { rateLimit } from './ratelimit.js';
import { assertMusicKey, musicKey, musicPut, musicGet, musicDelete, MusicKeyError } from './music-keys.js';

const MAX_AUDIO_BYTES = 50 * 1024 * 1024;
const AUDIO_TYPES = new Set([
  'audio/mpeg','audio/mp4','audio/x-m4a','audio/wav','audio/x-wav',
  'audio/aac','audio/flac','audio/x-flac','audio/ogg'
]);
const UPLOAD_ROLES = new Set(['creator','artist','producer']);

function creatorUploadAllowed(session) {
  if (session.roles?.includes('creator')) return true;
  return (session.signupRoles || []).some(r => UPLOAD_ROLES.has(r.role) && r.status !== 'rejected');
}

function textField(form, key, { min = 1, max = 160, required = true } = {}) {
  const raw = form.get(key);
  const value = typeof raw === 'string' ? raw.trim() : '';
  if ((!value && required) || value.length < (required ? min : 0) || value.length > max) {
    throw new ApiError(422, 'validation_failed', 'Invalid input', { [key]: required ? `${min}-${max} characters` : `up to ${max} characters` });
  }
  return value || null;
}

function safeName(name) {
  return String(name || 'audio').replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 120) || 'audio';
}

function requireMediaStorage(env, operation = 'put') {
  if (!env.MEDIA || typeof env.MEDIA[operation] !== 'function') {
    throw new ApiError(503, 'media_storage_not_configured', 'PIKK media storage is not configured yet');
  }
  return env.MEDIA;
}

export async function musicUploadRoute(env, req, ctx, method, path) {
  if (!path.startsWith('/media/music')) return null;

  if (method === 'POST' && path === '/media/music') {
    const s = requireVerified(ctx);
    if (!creatorUploadAllowed(s)) {
      throw new ApiError(403, 'creator_role_required', 'Creator, artist or producer account role required');
    }
    const storage = requireMediaStorage(env);
    await rateLimit(env, `music-upload:${s.user.id}`, 20, 86400);

    const length = Number(req.headers.get('Content-Length') || 0);
    if (length > MAX_AUDIO_BYTES + 1024 * 1024) {
      throw new ApiError(413, 'payload_too_large', 'Audio upload is too large');
    }

    const contentType = req.headers.get('Content-Type') || '';
    if (!contentType.toLowerCase().startsWith('multipart/form-data')) {
      throw new ApiError(415, 'unsupported_media_type', 'Music upload must use multipart/form-data');
    }

    let form;
    try { form = await req.formData(); }
    catch { throw new ApiError(400, 'invalid_form', 'Could not read upload form'); }

    const file = form.get('audio');
    if (!file || typeof file !== 'object' || typeof file.arrayBuffer !== 'function') {
      throw new ApiError(422, 'validation_failed', 'Audio file required', { audio: 'required' });
    }
    if (!AUDIO_TYPES.has(String(file.type || '').toLowerCase())) {
      throw new ApiError(422, 'validation_failed', 'Unsupported audio format', { audio: 'MP3, M4A/MP4, WAV, AAC, FLAC or OGG' });
    }
    if (!Number.isFinite(file.size) || file.size <= 0 || file.size > MAX_AUDIO_BYTES) {
      throw new ApiError(413, 'payload_too_large', 'Audio file must be between 1 byte and 50 MB');
    }

    const title = textField(form, 'title', { max: 160 });
    const artistName = textField(form, 'artist_name', { max: 120 });
    const albumTitle = textField(form, 'album_title', { max: 160, required: false });
    const genre = textField(form, 'genre', { max: 80, required: false });
    const rightsCertified = String(form.get('rights_certified') || '').toLowerCase();
    if (!['1','true','yes','on'].includes(rightsCertified)) {
      throw new ApiError(422, 'rights_required', 'You must certify that you own or control the rights to upload this audio');
    }
    const explicitContent = ['1','true','yes','on'].includes(String(form.get('explicit_content') || '').toLowerCase()) ? 1 : 0;

    const id = newId('media');
    const now = new Date().toISOString();
    // Filename lives in D1 (original_name), not in the key: music/<owner>/<id> only.
    const storageKey = musicKey(s.user.id, id);

    try {
      await musicPut(storage, storageKey, s.user.id, file.stream(), {
        httpMetadata: { contentType: file.type },
        customMetadata: { owner_id: s.user.id, media_id: id, kind: 'music' },
      });
    } catch {
      throw new ApiError(502, 'media_storage_failed', 'PIKK could not store the audio file');
    }

    try {
      await env.DB.batch([
        env.DB.prepare(
          `INSERT INTO media_assets(id,owner_id,kind,storage_key,original_name,mime_type,size_bytes,status,created_at)
           VALUES (?,?, 'music', ?,?,?,?, 'draft', ?)`
        ).bind(id, s.user.id, storageKey, safeName(file.name), file.type, file.size, now),
        env.DB.prepare(
          `INSERT INTO music_tracks(media_id,title,artist_name,album_title,genre,rights_certified,explicit_content)
           VALUES (?,?,?,?,?,1,?)`
        ).bind(id, title, artistName, albumTitle, genre, explicitContent),
      ]);
    } catch (err) {
      try { await musicDelete(storage, storageKey, s.user.id); } catch {}
      throw err;
    }

    await audit(env, {
      actor: s.user.id,
      action: 'music.upload_created',
      target: id,
      ip: clientIp(req),
      meta: { title, size_bytes: file.size, mime_type: file.type },
    });

    return {
      status: 201,
      body: {
        upload: {
          id, title, artist_name: artistName, album_title: albumTitle, genre,
          original_name: safeName(file.name), mime_type: file.type, size_bytes: file.size,
          explicit_content: !!explicitContent, status: 'draft', created_at: now,
        },
      },
    };
  }

  if (method === 'GET' && path === '/media/music') {
    const s = requireVerified(ctx);
    const r = await env.DB.prepare(
      `SELECT a.id,a.original_name,a.mime_type,a.size_bytes,a.status,a.created_at,
              t.title,t.artist_name,t.album_title,t.genre,t.explicit_content
         FROM media_assets a JOIN music_tracks t ON t.media_id=a.id
        WHERE a.owner_id=? AND a.kind='music' AND a.status<>'deleted'
        ORDER BY a.created_at DESC LIMIT 100`
    ).bind(s.user.id).all();
    return { status: 200, body: { uploads: r.results } };
  }


  // Owner-only private draft delete. Soft-delete claim (CAS) before storage delete —
  // matches Vault ownership/retry safety (do not erase bytes before durable tombstone).
  const deleteMatch = path.match(/^\/media\/music\/([\w-]{1,80})$/);
  if (method === 'DELETE' && deleteMatch) {
    const s = requireVerified(ctx);
    const storage = requireMediaStorage(env, 'delete');
    const row = await env.DB.prepare(
      `SELECT id, storage_key, status FROM media_assets
        WHERE id=? AND owner_id=? AND kind='music' AND status<>'deleted'`
    ).bind(deleteMatch[1], s.user.id).first();
    if (!row) throw new ApiError(404, 'not_found', 'Music upload not found');
    const deletedAt = new Date().toISOString();
    const claim = await env.DB.prepare(
      `UPDATE media_assets SET status='deleted', deleted_at=?
        WHERE id=? AND owner_id=? AND status<>'deleted'`
    ).bind(deletedAt, row.id, s.user.id).run();
    if ((claim?.meta?.changes ?? 0) !== 1) {
      throw new ApiError(404, 'not_found', 'Music upload not found');
    }
    let cleanupPending = false;
    try {
      await musicDelete(storage, row.storage_key, s.user.id);
    } catch {
      cleanupPending = true;
    }
    await audit(env, {
      actor: s.user.id,
      action: 'music.upload_deleted',
      target: row.id,
      ip: clientIp(req),
      meta: { cleanup_pending: cleanupPending, prior_status: row.status },
    });
    if (cleanupPending) {
      return {
        status: 202,
        body: {
          ok: true, id: row.id, status: 'deleted', cleanup_pending: true,
          message: 'Draft removed from your library; storage cleanup is still pending',
        },
      };
    }
    return { status: 200, body: { ok: true, id: row.id, status: 'deleted', cleanup_pending: false } };
  }

  const match = path.match(/^\/media\/music\/([\w-]{1,80})\/file$/);
  if (method === 'GET' && match) {
    const s = requireVerified(ctx);
    const storage = requireMediaStorage(env, 'get');
    const row = await env.DB.prepare(
      `SELECT id,storage_key,original_name,mime_type FROM media_assets
        WHERE id=? AND owner_id=? AND kind='music' AND status<>'deleted'`
    ).bind(match[1], s.user.id).first();
    if (!row) throw new ApiError(404, 'not_found', 'Music upload not found');
    let key;
    try { key = assertMusicKey(row.storage_key, s.user.id); }
    catch (e) { if (e instanceof MusicKeyError) throw new ApiError(404, 'media_missing', 'Stored audio file not found'); throw e; }
    const object = await musicGet(storage, key, s.user.id);
    if (!object) throw new ApiError(404, 'media_missing', 'Stored audio file not found');
    const headers = new Headers();
    object.writeHttpMetadata?.(headers);
    headers.set('Content-Type', row.mime_type);
    headers.set('Content-Disposition', `inline; filename="${safeName(row.original_name)}"`);
    headers.set('Cache-Control', 'private, no-store');
    return new Response(object.body, { status: 200, headers });
  }

  return null;
}
