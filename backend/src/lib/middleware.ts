import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'
import { getSession, touchSession } from './session'

export type AuthUser = {
  id: number
  email: string
  displayName: string | null
  role: string
  emailVerified: boolean
  sessionId: string
}

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser
  }
}

function extractSessionId(c: any): string | null {
  const cookie = getCookie(c, 'pikk_session')
  if (cookie) return cookie
  const auth = c.req.header('authorization') || ''
  if (auth.startsWith('Bearer ')) return auth.slice(7).trim() || null
  return null
}

function isRestricted(row: any): string | null {
  if (row.banned_at) return 'account banned'
  if (row.suspended_until) {
    const until = new Date(row.suspended_until as string).getTime()
    if (until > Date.now()) return 'account suspended'
  }
  return null
}

/** requireAuth – cookie or Bearer session */
export const requireAuth = createMiddleware(async (c, next) => {
  const sessionId = extractSessionId(c)
  if (!sessionId) return c.json({ error: 'unauthorized' }, 401)

  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)

  const session = await getSession(db, sessionId)
  if (!session) return c.json({ error: 'unauthorized' }, 401)

  const row = await db.prepare(
    `SELECT id, email, display_name, role, email_verified, banned_at, suspended_until
     FROM users WHERE id = ?`
  ).bind(session.user_id).first()

  if (!row) return c.json({ error: 'unauthorized' }, 401)

  const restriction = isRestricted(row)
  if (restriction) return c.json({ error: restriction }, 403)

  // Sliding session (best-effort)
  try {
    const last = session.last_seen_at ? new Date(session.last_seen_at).getTime() : 0
    if (Date.now() - last > 60 * 60 * 1000) {
      await touchSession(db, sessionId)
    }
  } catch { /* optional */ }

  c.set('user', {
    id: row.id as number,
    email: row.email as string,
    displayName: (row.display_name as string) || null,
    role: (row.role as string) || 'user',
    emailVerified: Boolean(row.email_verified),
    sessionId,
  })

  await next()
})

export const requireRole = (...roles: string[]) => {
  return createMiddleware(async (c, next) => {
    const user = c.get('user')
    if (!user || !roles.includes(user.role)) {
      return c.json({ error: 'forbidden' }, 403)
    }
    await next()
  })
}

export const requireAdmin = createMiddleware(async (c, next) => {
  const user = c.get('user')
  if (!user || user.role !== 'admin') {
    return c.json({ error: 'forbidden' }, 403)
  }
  await next()
})
