const BUILD_API_BASE = String(import.meta.env?.VITE_PIKK_API_BASE || '').trim().replace(/\/$/, '');

function runtimeApiBase() {
  const override = typeof window !== 'undefined' && typeof window.__PIKK_API_BASE__ === 'string'
    ? window.__PIKK_API_BASE__.trim()
    : '';
  return (override || BUILD_API_BASE).replace(/\/$/, '');
}

export function getPikkApiBase() {
  return runtimeApiBase();
}

export function isPikkApiConfigured() {
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
    err.requestId = data?.request_id || null;
    throw err;
  }
  return data;
}

/** GET /memberships/me (read-only; server-authoritative). */
export const membershipApi = {
  me: () => request('/memberships/me'),
};

export const authApi = {
  health: () => request('/health'),
  me: () => request('/auth/me'),
  signup: ({ email, handle, displayName, password, signupRoles = ['member'], gender }) =>
    request('/auth/signup', {
      method: 'POST',
      body: { email, handle, display_name: displayName, password, signup_roles: signupRoles, ...(gender ? { gender } : {}) },
    }),
  login: ({ email, password }) => request('/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => request('/auth/logout', { method: 'POST', body: {} }),
  verifyEmail: (token) => request('/auth/verify', { method: 'POST', body: { token } }),
  resendVerification: () => request('/auth/resend-verification', { method: 'POST', body: {} }),
  forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: { email } }),
  resetPassword: ({ token, password }) =>
    request('/auth/reset-password', { method: 'POST', body: { token, password } }),
};
