/**
 * Auth boot helper
 * Call this once during app startup so a real server session survives reload.
 *
 * Usage in main.js (near top of boot()):
 *   import { restoreServerSession } from './auth/boot.js'
 *   await restoreServerSession()
 */

import { getAuthState, clearCache } from './service.js'

let restored = false

export async function restoreServerSession() {
  if (restored) return null
  restored = true

  try {
    const auth = await getAuthState()
    if (auth.state === 'authenticated' && auth.user) {
      // Expose a lightweight global so existing UI can detect real auth
      window.__PIKK_SERVER_USER__ = auth.user
      window.__PIKK_AUTH_STATE__ = 'authenticated'
      return auth.user
    }
  } catch (err) {
    console.warn('[auth/boot] session restore failed', err)
    clearCache()
  }

  window.__PIKK_SERVER_USER__ = null
  window.__PIKK_AUTH_STATE__ = 'guest'
  return null
}

export function getServerUser() {
  return window.__PIKK_SERVER_USER__ || null
}

export function isServerAuthenticated() {
  return window.__PIKK_AUTH_STATE__ === 'authenticated'
}
