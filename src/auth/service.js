/**
 * PIKK Auth Service
 * Prefers the real backend API when available.
 * Falls back to demo/localStorage only when the API is unreachable.
 */

import { api } from '../lib/api-client.js'
import { AUTH_STATES, resolveAuthState } from './readiness.js'

const SESSION_KEY = 'pikk_session_meta'

let cachedUser = null
let apiAvailable = null // null = unknown, true/false after first probe

export async function probeApi() {
  if (apiAvailable !== null) return apiAvailable
  try {
    await api.health()
    apiAvailable = true
  } catch {
    apiAvailable = false
  }
  return apiAvailable
}

export async function getCurrentUser() {
  if (cachedUser) return cachedUser

  const available = await probeApi()
  if (!available) return null

  try {
    const { user } = await api.me()
    cachedUser = user
    return user
  } catch {
    cachedUser = null
    return null
  }
}

export async function signup({ email, password, displayName }) {
  const available = await probeApi()
  if (!available) {
    throw new Error('Backend not available. Real signup requires the API.')
  }

  const data = await api.signup({ email, password, displayName })
  cachedUser = data.user
  return data
}

export async function login({ email, password }) {
  const available = await probeApi()
  if (!available) {
    throw new Error('Backend not available. Real login requires the API.')
  }

  const data = await api.login({ email, password })
  cachedUser = data.user
  return data
}

export async function logout() {
  cachedUser = null
  try {
    await api.logout()
  } catch {
    // ignore network errors on logout
  }
}

export async function logoutAll() {
  cachedUser = null
  try {
    await api.logoutAll()
  } catch {
    // ignore
  }
}

export async function updateProfile(displayName) {
  const data = await api.updateProfile({ displayName })
  cachedUser = data.user
  return data.user
}

export async function changePassword(currentPassword, newPassword) {
  return api.changePassword({ currentPassword, newPassword })
}

export async function verifyEmail(token) {
  return api.verifyEmail(token)
}

/**
 * High-level auth state for the rest of the app.
 * Never treats localStorage demo users as real authenticated users.
 */
export async function getAuthState() {
  const user = await getCurrentUser()
  if (user) {
    return {
      state: AUTH_STATES.AUTHENTICATED,
      user,
      verifiedByServer: true,
    }
  }
  return {
    state: AUTH_STATES.GUEST,
    user: null,
    verifiedByServer: false,
  }
}

export function clearCache() {
  cachedUser = null
  apiAvailable = null
}
