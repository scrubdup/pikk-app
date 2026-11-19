/**
 * PIKK API client (frontend)
 * Points at the real backend once D1 is live.
 * Falls back gracefully while backend is still local-only.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8787'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include', // send cookies
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err = new Error(data.error || res.statusText)
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}

export const api = {
  // Auth
  signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  logoutAll: () => request('/auth/logout-all', { method: 'POST' }),
  me: () => request('/auth/me'),
  updateProfile: (body) => request('/auth/update-profile', { method: 'POST', body: JSON.stringify(body) }),
  verifyEmail: (token) => request('/auth/verify-email', { method: 'POST', body: JSON.stringify({ token }) }),

  // Health
  health: () => request('/health'),
}

export default api
