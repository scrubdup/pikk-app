/**
 * PIKK Vault media API client library (Worker /media + /vault routes).
 * Not a complete Vault product UI — no upload/list/retrieve screens call this yet.
 * API base alone is NOT storage readiness; use fetchVaultMediaStorageReady() (/health.media_storage).
 */
import { getPikkApiBase, isPikkApiConfigured } from './auth-client.js';

export { getPikkApiBase };

/** True only when an API origin is configured (does not imply R2 or an upload UI). */
export function isVaultApiConfigured() {
  return isPikkApiConfigured();
}

/** Live Worker capability: R2 MEDIA binding present. Never infer from API base alone. */
export async function fetchVaultMediaStorageReady() {
  if (!isPikkApiConfigured()) return { apiConfigured: false, mediaStorage: false };
  try {
    const base = getPikkApiBase();
    const res = await fetch(base + '/health', { credentials: 'include' });
    const data = await res.json().catch(() => null);
    return {
      apiConfigured: true,
      mediaStorage: !!(data && data.capabilities && data.capabilities.media_storage),
      healthOk: !!(data && data.ok),
    };
  } catch {
    return { apiConfigured: true, mediaStorage: false, healthOk: false };
  }
}

async function request(path, { method = 'GET', body, headers } = {}) {
  const base = getPikkApiBase();
  if (!base) {
    const err = new Error('PIKK API is not configured');
    err.code = 'api_not_configured';
    throw err;
  }
  const res = await fetch(base + path, {
    method,
    credentials: 'include',
    headers: body === undefined
      ? headers
      : { 'Content-Type': 'application/json', ...(headers || {}) },
    body: body === undefined ? undefined : (body instanceof Uint8Array || body instanceof ArrayBuffer || typeof body === 'string' || body instanceof Blob
      ? body
      : JSON.stringify(body)),
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

export const vaultApi = {
  /** Create a pending upload reservation (single or multipart). */
  createUpload: (body) => request('/media/uploads', { method: 'POST', body }),
  /** PUT raw bytes for a single-mode upload (Content-Length must match declared size). */
  putBytes: async (id, bytes) => {
    const base = getPikkApiBase();
    if (!base) {
      const err = new Error('PIKK API is not configured');
      err.code = 'api_not_configured';
      throw err;
    }
    const body = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    const res = await fetch(`${base}/media/uploads/${encodeURIComponent(id)}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/octet-stream', 'Content-Length': String(body.byteLength) },
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
  },
  complete: (id) => request(`/media/${encodeURIComponent(id)}/complete`, { method: 'POST' }),
  cancel: (id) => request(`/media/uploads/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  get: (id) => request(`/media/${encodeURIComponent(id)}`),
  accessUrl: (id, { download = false } = {}) =>
    request(`/media/${encodeURIComponent(id)}/access-url${download ? '?download=1' : ''}`, { method: 'POST' }),
  usage: () => request('/vault/usage'),
};
