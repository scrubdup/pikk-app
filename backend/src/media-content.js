// PIKK Vault slice 2: playback + download (GET /media/:id/content) and short-lived signed URLs.
import { ApiError, json, clientIp } from './http.js';
import { requireAuth } from './auth.js';
import { audit } from './audit.js';
import { hmacSha256Hex, timingSafeEqual } from './crypto.js';
import { canView, sanitizeFilename } from './media.js';
import { ACCESS_URL_TTL_SEC, PUBLIC_CACHE_CONTROL } from './media-config.js';

const notFound = () => new ApiError(404, 'not_found', 'Not found');
const badSig = () => new ApiError(403, 'invalid_signature', 'Link invalid or expired');

function signingKey(env) {
  const k = env.VAULT_SIGNING_KEY;
  return typeof k === 'string' && k.length >= 32 ? k : null;
}
function ttlSec(env) {
  const n = Number(env.VAULT_ACCESS_URL_TTL_SEC);
  return Number.isInteger(n) && n > 0 && n <= 3600 ? n : ACCESS_URL_TTL_SEC;
}
const payload = (id, uid, exp, dl) => `v1|${id}|${uid}|${exp}|${dl ? 1 : 0}`;

export async function signAccess(env, id, uid, exp, dl) {
  return hmacSha256Hex(signingKey(env), payload(id, uid, exp, dl));
}

/** Returns the user id the request acts for: verified signature first, otherwise session. */
async function resolveViewer(env, ctx, url, id) {
  const q = url.searchParams;
  if (q.has('sig') || q.has('exp') || q.has('uid')) {
    const key = signingKey(env);
    const exp = Number(q.get('exp')); const uid = q.get('uid') || ''; const sig = q.get('sig') || '';
    if (!key || !Number.isSafeInteger(exp) || !/^[\w-]{1,80}$/.test(uid) || !/^[0-9a-f]{64}$/.test(sig)) throw badSig();
    const want = await signAccess(env, id, uid, exp, q.get('download') === '1');
    if (!timingSafeEqual(want, sig)) throw badSig();
    if (exp <= Math.floor(Date.now() / 1000)) throw badSig();
    return { uid, via: 'signature' };
  }
  return { uid: requireAuth(ctx).user.id, via: 'session' };
}

async function loadViewable(env, id, uid) {
  const r = await env.DB.prepare(`SELECT * FROM media WHERE id=? AND deleted_at IS NULL`).bind(id).first();
  if (!r || !(await canView(env, uid, r))) throw notFound();
  if (r.state !== 'ready' || (r.expires_at && r.expires_at <= new Date().toISOString())) throw notFound(); // owner too: only ready media streams
  return r;
}

/** Parses a single "bytes=" range. Returns null (serve full), {offset,length}, or 'unsatisfiable'. */
export function parseRange(h, size) {
  if (!h) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(h.trim());
  if (!m) return h.trim().startsWith('bytes=') && !h.includes(',') ? 'unsatisfiable' : null; // multi-range: serve full body
  const [, a, b] = m;
  if (a === '' && b === '') return 'unsatisfiable';
  if (a === '') { const n = Number(b); if (n === 0 || size === 0) return 'unsatisfiable'; const len = Math.min(n, size); return { offset: size - len, length: len }; }
  const start = Number(a); let end = b === '' ? size - 1 : Number(b);
  if (start >= size || end < start) return 'unsatisfiable';
  end = Math.min(end, size - 1);
  return { offset: start, length: end - start + 1 };
}

async function content(env, req, ctx, id) {
  const url = new URL(req.url);
  const { uid, via } = await resolveViewer(env, ctx, url, id);
  const r = await loadViewable(env, id, uid);
  if (!env.MEDIA) throw new ApiError(503, 'storage_unavailable', 'Media storage not configured');
  const size = r.size_bytes;
  const download = url.searchParams.get('download') === '1';
  const ct = r.detected_content_type || 'application/octet-stream';
  const fname = sanitizeFilename(r.filename);
  const base = {
    'Content-Type': ct,
    'Accept-Ranges': 'bytes',
    'Cache-Control': r.access_policy === 'public' ? PUBLIC_CACHE_CONTROL : 'private, no-store',
    'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="${fname}"; filename*=UTF-8''${encodeURIComponent(fname)}`,
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'none'; sandbox",
    'Cross-Origin-Resource-Policy': 'same-site',
    Vary: 'Cookie, Range',
  };
  const range = req.method === 'HEAD' ? null : parseRange(req.headers.get('Range'), size);
  if (range === 'unsatisfiable') return new Response(null, { status: 416, headers: { ...base, 'Content-Range': `bytes */${size}`, 'Content-Type': 'text/plain' } });
  const obj = await env.MEDIA.get(r.object_key, range ? { range } : undefined);
  if (!obj) throw notFound();
  if (download) await audit(env, { actor: uid, action: 'media.download', target: id, ip: clientIp(req), meta: { via, range: range ? `${range.offset}-${range.offset + range.length - 1}` : null } });
  if (range) return new Response(obj.body, { status: 206, headers: { ...base, 'Content-Length': String(range.length), 'Content-Range': `bytes ${range.offset}-${range.offset + range.length - 1}/${size}` } });
  return new Response(obj.body, { status: 200, headers: { ...base, 'Content-Length': String(size) } });
}

async function accessUrl(env, req, ctx, id) {
  const s = requireAuth(ctx);
  await loadViewable(env, id, s.user.id);
  if (!signingKey(env)) throw new ApiError(503, 'signing_unavailable', 'Signed links not configured');
  const download = new URL(req.url).searchParams.get('download') === '1';
  const exp = Math.floor(Date.now() / 1000) + ttlSec(env);
  const sig = await signAccess(env, id, s.user.id, exp, download);
  const q = new URLSearchParams({ exp: String(exp), uid: s.user.id, sig });
  if (download) q.set('download', '1');
  // Never persisted: the URL is derived on demand and expires; the media id stays the only identifier.
  return json(200, { url: `/media/${id}/content?${q}`, expires_at: new Date(exp * 1000).toISOString() });
}

export async function contentRoute(env, req, ctx, m, p, ID) {
  let mm;
  if ((m === 'GET' || m === 'HEAD') && (mm = p.match(new RegExp(`^/media/${ID}/content$`)))) return content(env, req, ctx, mm[1]);
  if (m === 'POST' && (mm = p.match(new RegExp(`^/media/${ID}/access-url$`)))) return accessUrl(env, req, ctx, mm[1]);
  return null;
}
