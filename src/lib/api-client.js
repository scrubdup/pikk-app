/**
 * PIKK API client — production engine for beta journeys
 * Auth uses Bearer sessionId (cross-site) + cookies when same-site.
 */

const API_BASE =
  import.meta.env.VITE_API_URL ||
  'https://pikk-engine.pikk-0fa.workers.dev'

const SESSION_KEY = 'pikk_api_session'

export function getStoredSessionId() {
  try {
    return localStorage.getItem(SESSION_KEY) || ''
  } catch {
    return ''
  }
}

export function setStoredSessionId(id) {
  try {
    if (id) localStorage.setItem(SESSION_KEY, id)
    else localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  const sid = getStoredSessionId()
  if (sid && !headers.Authorization) headers.Authorization = `Bearer ${sid}`

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  })

  let data = {}
  try {
    data = await res.json()
  } catch {
    /* empty */
  }

  if (!res.ok) {
    const err = new Error(data.error || res.statusText || 'Request failed')
    err.status = res.status
    err.data = data
    throw err
  }

  if (data.sessionId) setStoredSessionId(data.sessionId)
  return data
}

export const api = {
  baseUrl: API_BASE,

  signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: async () => {
    try {
      await request('/auth/logout', { method: 'POST' })
    } finally {
      setStoredSessionId('')
    }
  },
  logoutAll: async () => {
    try {
      await request('/auth/logout-all', { method: 'POST' })
    } finally {
      setStoredSessionId('')
    }
  },
  me: () => request('/auth/me'),
  updateProfile: (body) =>
    request('/auth/update-profile', { method: 'POST', body: JSON.stringify(body) }),
  changePassword: (body) =>
    request('/auth/change-password', { method: 'POST', body: JSON.stringify(body) }),
  verifyEmail: (token) =>
    request('/auth/verify-email', { method: 'POST', body: JSON.stringify({ token }) }),
  requestPasswordReset: (email) =>
    request('/auth/request-password-reset', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (body) =>
    request('/auth/reset-password', { method: 'POST', body: JSON.stringify(body) }),
  deleteAccount: (password) =>
    request('/auth/delete-account', { method: 'POST', body: JSON.stringify({ password }) }),

  searchUsers: (q) => request(`/social/search?q=${encodeURIComponent(q)}`),
  getUser: (id) => request(`/social/users/${id}`),
  follow: (id) => request(`/social/users/${id}/follow`, { method: 'POST' }),
  unfollow: (id) => request(`/social/users/${id}/follow`, { method: 'DELETE' }),
  block: (id) => request(`/social/users/${id}/block`, { method: 'POST' }),
  unblock: (id) => request(`/social/users/${id}/block`, { method: 'DELETE' }),
  report: (body) => request('/social/report', { method: 'POST', body: JSON.stringify(body) }),
  sendDm: (toUserId, message) =>
    request('/social/dm', { method: 'POST', body: JSON.stringify({ toUserId, message }) }),
  getDm: (withUserId) => request(`/social/dm?with=${withUserId}`),
  createPost: (body) =>
    request('/social/posts', { method: 'POST', body: JSON.stringify(body) }),
  listPosts: () => request('/social/posts'),

  listRooms: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/rooms${q ? '?' + q : ''}`)
  },
  getRoom: (id) => request(`/rooms/${id}`),
  roomMessages: (id) => request(`/rooms/${id}/messages`),
  sendRoomMessage: (id, message) =>
    request(`/rooms/${id}/messages`, { method: 'POST', body: JSON.stringify({ message }) }),

  adminUsers: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/admin/users${q ? '?' + q : ''}`)
  },
  health: () => request('/health'),
  vaultUploadUrl: (body) =>
    request('/vault/upload-url', { method: 'POST', body: JSON.stringify(body) }),
}

export default api
