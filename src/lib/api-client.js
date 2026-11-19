/**
 * PIKK API client
 * Talks to the real backend when available.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8787'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  let data = {}
  try {
    data = await res.json()
  } catch {
    // ignore non-json
  }

  if (!res.ok) {
    const err = new Error(data.error || res.statusText || 'Request failed')
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
  changePassword: (body) => request('/auth/change-password', { method: 'POST', body: JSON.stringify(body) }),
  verifyEmail: (token) => request('/auth/verify-email', { method: 'POST', body: JSON.stringify({ token }) }),

  // Admin
  adminUsers: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/admin/users${q ? '?' + q : ''}`)
  },

  // Health
  health: () => request('/health'),
}

export default api
