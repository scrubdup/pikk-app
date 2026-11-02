// PIKK Master Mind (phase 1): pure helpers. Data comes only from the pikk-api server endpoint
// GET /admin/ops/summary (owner-only, ops.view enforced server-side). No mock data, no client role gate.
export const STATUSES = ['healthy', 'degraded', 'down', 'stale', 'unknown', 'demo'];
export const PANEL_LABELS = {
  api: 'API', database: 'Database', shield: 'PIKK Shield', support: 'Support', audit: 'Audit log',
  ledger: 'Ledger / Revenue', vault: 'Vault media', live: 'Live', broadcast: 'Broadcast', costs: 'Costs', backups: 'Backups',
};

export function apiBase(env = {}) {
  const v = String(env.VITE_PIKK_API_BASE || '').trim();
  return /^https:\/\//.test(v) ? v.replace(/\/+$/, '') : '';
}

/** Returns {state:'not_connected'|'unauthenticated'|'forbidden'|'error'|'ok', summary?} — never fabricated data. */
export async function loadOpsSummary(base, fetchImpl = globalThis.fetch) {
  if (!base || typeof fetchImpl !== 'function') return { state: 'not_connected' };
  let res;
  try { res = await fetchImpl(`${base}/admin/ops/summary`, { credentials: 'include', headers: { Accept: 'application/json' } }); }
  catch { return { state: 'not_connected' }; }
  if (res.status === 401) return { state: 'unauthenticated' };
  if (res.status === 403) return { state: 'forbidden' };
  if (!res.ok) return { state: 'error', status: res.status };
  try {
    const summary = await res.json();
    if (!summary || typeof summary.panels !== 'object') return { state: 'error', status: res.status };
    return { state: 'ok', summary };
  } catch { return { state: 'error', status: res.status }; }
}

/** Server-reported status is trusted only if it's a known value; anything else shows as unknown.
 *  A panel whose checkedAt is older than its freshness limit is shown as stale. */
export function displayStatus(p, now = Date.now()) {
  if (!p || !STATUSES.includes(p.status)) return 'unknown';
  if (p.checkedAt && p.freshnessLimitSec && ['healthy', 'degraded'].includes(p.status)) {
    const age = (now - Date.parse(p.checkedAt)) / 1000;
    if (!(age <= p.freshnessLimitSec)) return 'stale';
  }
  return p.status;
}
