const BUILD_API_BASE = String(import.meta.env?.VITE_PIKK_API_BASE || '').trim().replace(/\/$/, '');

function runtimeApiBase() {
  const override = typeof window !== 'undefined' && typeof window.__PIKK_API_BASE__ === 'string'
    ? window.__PIKK_API_BASE__.trim()
    : '';
  return (override || BUILD_API_BASE).replace(/\/$/, '');
}

export function isSupportApiConfigured() {
  return !!runtimeApiBase();
}

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
    err.details = data?.error?.details || null;
    throw err;
  }
  return data;
}

export const SUPPORT_CATEGORY_MAP = Object.freeze({
  'Account & login': 'account',
  'Music & artist rights': 'other',
  'Livestreams & gifts': 'other',
  'Billing & purchases': 'payments',
  'Safety & reporting': 'safety',
  'Technical issue': 'technical',
  'Bug report': 'technical',
  'Other': 'other',
});

export function supportCategoryForApi(label) {
  return SUPPORT_CATEGORY_MAP[label] || 'other';
}

export const supportApi = {
  createTicket: ({ category, subject, message }) => request('/support/tickets', {
    method: 'POST',
    body: { category: supportCategoryForApi(category), subject, message },
  }),
  listTickets: () => request('/support/tickets'),
  getTicket: (id) => request('/support/tickets/' + encodeURIComponent(id)),
  reply: (id, message) => request('/support/tickets/' + encodeURIComponent(id) + '/messages', {
    method: 'POST',
    body: { message },
  }),
};
