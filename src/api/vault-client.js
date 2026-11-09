/**
 * PIKK Vault media API client (Worker /media + /vault routes).
 * Used by the Music → Vault media panel for upload/list/retrieve/cancel.
 * API base alone is NOT storage readiness; use fetchVaultMediaStorageReady() (/health.media_storage).
 * Does not persist signed URLs or credentials to localStorage.
 */
import { getPikkApiBase, isPikkApiConfigured } from './auth-client.js';

export { getPikkApiBase };

/** True only when an API origin is configured (does not imply R2 or a finished product). */
export function isVaultApiConfigured() {
  return isPikkApiConfigured();
}

/**
 * Live Worker capability: R2 MEDIA binding present. Never infer from API base alone.
 * Distinguishes unreachable API (reachable:false) from storage disabled (reachable:true, mediaStorage:false).
 */
export async function fetchVaultMediaStorageReady() {
  if (!isPikkApiConfigured()) {
    return { apiConfigured: false, mediaStorage: false, reachable: false, healthOk: false };
  }
  try {
    const base = getPikkApiBase();
    const res = await fetch(base + '/health', { credentials: 'include' });
    if (!res.ok) {
      return { apiConfigured: true, mediaStorage: false, reachable: false, healthOk: false };
    }
    const data = await res.json().catch(() => null);
    if (!data) {
      return { apiConfigured: true, mediaStorage: false, reachable: false, healthOk: false };
    }
    return {
      apiConfigured: true,
      mediaStorage: !!(data.capabilities && data.capabilities.media_storage),
      healthOk: !!data.ok,
      reachable: true,
    };
  } catch {
    return { apiConfigured: true, mediaStorage: false, reachable: false, healthOk: false };
  }
}

async function request(path, { method = 'GET', body, headers } = {}) {
  const base = getPikkApiBase();
  if (!base) {
    const err = new Error('PIKK API is not configured');
    err.code = 'api_not_configured';
    throw err;
  }
  const isRaw = body instanceof Uint8Array || body instanceof ArrayBuffer || body instanceof Blob;
  const res = await fetch(base + path, {
    method,
    credentials: 'include',
    headers: body === undefined
      ? headers
      : isRaw
        ? { ...(headers || {}) }
        : { 'Content-Type': 'application/json', ...(headers || {}) },
    body: body === undefined
      ? undefined
      : isRaw || typeof body === 'string'
        ? body
        : JSON.stringify(body),
  });
  const ct = res.headers.get('Content-Type') || '';
  let data = null;
  if (ct.includes('application/json')) {
    try { data = await res.json(); } catch {}
  }
  if (!res.ok) {
    const err = new Error(data?.error?.message || `Request failed (${res.status})`);
    err.code = data?.error?.code || 'request_failed';
    err.status = res.status;
    err.details = data?.error?.details || null;
    throw err;
  }
  return data === null ? { ok: true, status: res.status } : data;
}

async function putBinary(path, bytes, contentType = 'application/octet-stream') {
  const base = getPikkApiBase();
  if (!base) {
    const err = new Error('PIKK API is not configured');
    err.code = 'api_not_configured';
    throw err;
  }
  // Prefer Blob so the browser sets Content-Length; do not set Content-Length manually.
  const body = bytes instanceof Blob
    ? bytes
    : new Blob([bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)], { type: contentType });
  const res = await fetch(`${base}${path}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': contentType },
    body,
  });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const err = new Error(data?.error?.message || `Upload failed (${res.status})`);
    err.code = data?.error?.code || 'request_failed';
    err.status = res.status;
    throw err;
  }
  return data;
}

/** Client-side limits mirrored from backend media-config (TEMPORARY defaults). */
export const VAULT_CLIENT_LIMITS = Object.freeze({
  photo: {
    maxBytes: 20 * 1024 * 1024,
    contentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    accept: 'image/jpeg,image/png,image/gif,image/webp',
  },
  video: {
    maxBytes: 500 * 1024 * 1024,
    contentTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
    accept: 'video/mp4,video/webm,video/quicktime',
  },
  audio: {
    maxBytes: 50 * 1024 * 1024,
    contentTypes: ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/ogg', 'audio/flac', 'audio/mp4', 'audio/x-m4a'],
    accept: 'audio/mpeg,audio/wav,audio/ogg,audio/flac,audio/mp4,audio/x-m4a',
  },
  multipartMinBytes: 5 * 1024 * 1024,
  multipartPartBytes: 8 * 1024 * 1024,
});

export function inferVaultMediaType(file) {
  const ct = String(file?.type || '').toLowerCase();
  for (const [type, lim] of Object.entries(VAULT_CLIENT_LIMITS)) {
    if (type === 'multipartMinBytes' || type === 'multipartPartBytes') continue;
    if (lim.contentTypes && lim.contentTypes.includes(ct)) return type;
  }
  return null;
}

export const vaultApi = {
  /** Owned media list (server authority; not localStorage). */
  listMine: (limit = 50) => request(`/media?limit=${encodeURIComponent(limit)}`),
  createUpload: (body) => request('/media/uploads', { method: 'POST', body }),
  putBytes: (id, bytes) => putBinary(`/media/uploads/${encodeURIComponent(id)}`, bytes),
  putPart: (id, partNumber, bytes) =>
    putBinary(`/media/uploads/${encodeURIComponent(id)}/parts/${partNumber}`, bytes),
  completeParts: (id) =>
    request(`/media/uploads/${encodeURIComponent(id)}/parts/complete`, { method: 'POST' }),
  complete: (id) => request(`/media/${encodeURIComponent(id)}/complete`, { method: 'POST' }),
  /** Cancel unfinished upload only (pending_upload / uploaded). May return cleanup_pending. */
  cancel: (id) => request(`/media/uploads/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  get: (id) => request(`/media/${encodeURIComponent(id)}`),
  /**
   * Short-lived access URL for ready media. Caller must not persist the URL in durable UI state.
   * Returns relative Worker path; open via API base + url with credentials or signed query.
   */
  accessUrl: (id, { download = false } = {}) =>
    request(`/media/${encodeURIComponent(id)}/access-url${download ? '?download=1' : ''}`, { method: 'POST' }),
  usage: () => request('/vault/usage'),
};

/**
 * Full single/multipart upload pipeline with honest stage callbacks (not fake percentages).
 * Does not claim thumbnails/transcoding; processing is probe-only until ready/failed.
 */
export async function uploadVaultFile(file, {
  access = 'private',
  onProgress,
  signal,
} = {}) {
  const type = inferVaultMediaType(file);
  if (!type) {
    const err = new Error('Unsupported file type');
    err.code = 'unsupported_type';
    throw err;
  }
  const lim = VAULT_CLIENT_LIMITS[type];
  if (file.size > lim.maxBytes) {
    const err = new Error(`File exceeds ${type} size limit`);
    err.code = 'payload_too_large';
    throw err;
  }
  const useMultipart = file.size >= VAULT_CLIENT_LIMITS.multipartMinBytes;
  onProgress?.({ phase: 'create' });
  const created = await vaultApi.createUpload({
    type,
    content_type: file.type,
    filename: file.name || 'file',
    size: file.size,
    access,
    multipart: useMultipart,
  });
  const upload = created.upload;
  if (signal?.aborted) {
    try { await vaultApi.cancel(upload.id); } catch {}
    const err = new Error('Upload cancelled');
    err.code = 'cancelled';
    throw err;
  }
  if (useMultipart) {
    const partSize = upload.part_size || VAULT_CLIENT_LIMITS.multipartPartBytes;
    const partCount = upload.part_count || Math.ceil(file.size / partSize);
    for (let n = 1; n <= partCount; n++) {
      if (signal?.aborted) {
        try { await vaultApi.cancel(upload.id); } catch {}
        const err = new Error('Upload cancelled');
        err.code = 'cancelled';
        throw err;
      }
      const start = (n - 1) * partSize;
      const end = Math.min(file.size, start + partSize);
      // Genuine slice — do not mock away in tests of part boundaries.
      await vaultApi.putPart(upload.id, n, file.slice(start, end));
      onProgress?.({ phase: 'upload', part: n, partCount });
    }
    onProgress?.({ phase: 'assemble' });
    await vaultApi.completeParts(upload.id);
  } else {
    onProgress?.({ phase: 'upload' });
    await vaultApi.putBytes(upload.id, file);
  }
  if (signal?.aborted) {
    try { await vaultApi.cancel(upload.id); } catch {}
    const err = new Error('Upload cancelled');
    err.code = 'cancelled';
    throw err;
  }
  onProgress?.({ phase: 'finalize' });
  const done = await vaultApi.complete(upload.id);
  onProgress?.({ phase: 'processing', media: done.media });
  return done;
}

/** Poll media until ready/failed/rejected or timeout. */
export async function waitForVaultMediaReady(id, { timeoutMs = 60000, intervalMs = 400, signal } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (signal?.aborted) {
      const err = new Error('Cancelled');
      err.code = 'cancelled';
      throw err;
    }
    const data = await vaultApi.get(id);
    const st = data?.media?.state;
    if (st === 'ready' || st === 'failed' || st === 'rejected' || st === 'deleted') return data.media;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  const err = new Error('Processing timed out');
  err.code = 'processing_timeout';
  throw err;
}
