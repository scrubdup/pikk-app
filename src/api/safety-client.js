// PIKK Safety client: reports + blocks against the backend-foundation API (PR #215).
// When the API is not configured, callers fall back to a device-only demo record
// and MUST label it as such — nothing is sent to moderators and nobody else is blocked.
const BUILD_API_BASE = String(import.meta.env?.VITE_PIKK_API_BASE || '').trim().replace(/\/$/, '');

function runtimeApiBase() {
  const runtime = typeof window !== 'undefined' && typeof window.__PIKK_API_BASE__ === 'string' ? window.__PIKK_API_BASE__.trim() : '';
  return (runtime || BUILD_API_BASE).replace(/\/$/, '');
}

export function isSafetyApiConfigured() {
  return !!runtimeApiBase();
}

export const REPORT_TARGETS = Object.freeze(['user', 'post', 'message', 'live', 'room', 'listing', 'dating_profile', 'roast']);
export const REPORT_CATEGORIES = Object.freeze(['csam', 'ncii', 'self_harm', 'threat', 'underage', 'harassment', 'hate', 'sexual', 'violence', 'impersonation', 'fraud', 'copyright', 'spam', 'other']);

export const LOCAL_ONLY_REPORT_NOTE = 'Saved on this device only (demo). Not sent to PIKK moderators.';
export const LOCAL_ONLY_BLOCK_NOTE = 'Hidden on this device only (demo). This does not block them across PIKK.';

async function request(path, { method = 'GET', body } = {}) {
  const base = runtimeApiBase();
  if (!base) {
    const err = new Error('PIKK API is not configured');
    err.code = 'api_not_configured';
    throw err;
  }
  const res = await fetch(base + path, {
    method,
    credentials: 'include',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const err = new Error(data?.error?.message || `Request failed (${res.status})`);
    err.code = data?.error?.code || 'request_failed';
    err.status = res.status;
    throw err;
  }
  return data;
}

export function validateReport({ targetType, targetId, category, details } = {}) {
  if (!REPORT_TARGETS.includes(targetType)) return 'invalid_target_type';
  if (!targetId || String(targetId).length > 64) return 'invalid_target_id';
  if (!REPORT_CATEGORIES.includes(category)) return 'invalid_category';
  if (details != null && String(details).length > 2000) return 'details_too_long';
  return null;
}

export const safetyApi = {
  report: ({ targetType, targetId, category, details }) => {
    const bad = validateReport({ targetType, targetId, category, details });
    if (bad) return Promise.reject(Object.assign(new Error(bad), { code: 'validation_failed' }));
    const body = { target_type: targetType, target_id: String(targetId), category };
    if (details) body.details = String(details);
    return request('/reports', { method: 'POST', body });
  },
  block: (handle) => request('/blocks', { method: 'POST', body: { handle: String(handle || '').replace(/^@/, '') } }),
  listReports: () => request('/reports'),
};

/** Human message for a report/block failure. */
export function safetyErrorMessage(err) {
  switch (err?.code) {
    case 'duplicate_report': return 'You already have an open report on this.';
    case 'rate_limited': return 'Too many reports right now. Try again later.';
    case 'email_unverified': return 'Verify your email before reporting or blocking.';
    case 'unauthenticated': return 'Sign in to report or block.';
    default: return err?.message || 'Something went wrong.';
  }
}
