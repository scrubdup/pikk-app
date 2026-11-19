import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'
import { getSession } from './session'

export type AuthUser = {
  id: number
  email: string
  displayName: string | null
  role: string
  emailVerified: boolean
}

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser
  }
}

/**
 * requireAuth – attaches user to context or returns 401
 */
export const requireAuth = createMiddleware(async (c, next) => {
  const sessionId = getCookie(c, 'pikk_session')
  if (!sessionId) {
    return c.json({ error: 'unauthorized' }, 401)
  }

  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)

  const session = await getSession(db, sessionId)
  if (!session) {
    return c.json({ error: 'unauthorized' }, 401)
  }

  const row = await db.prepare(
    `SELECT id, email, display_name, role, email_verified
     FROM users WHERE id = ?`
  ).bind(session.user_id).first()

  if (!row) {
    return c.json({ error: 'unauthorized' }, 401)
  }

  c.set('user', {
    id: row.id as number,
    email: row.email as string,
    displayName: (row.display_name as string) || null,
    role: (row.role as string) || 'user',
    emailVerified: Boolean(row.email_verified),
  })

  await next()
})

/**
 * requireRole('admin' | 'creator' | ...)
 * Must be used after requireAuth
 */
export const requireRole = (...roles: string[]) => {
  return createMiddleware(async (c, next) => {
    const user = c.get('user')
    if (!user || !roles.includes(user.role)) {
      return c.json({ error: 'forbidden' }, 403)
    }
    await next()
  })
}

/** Shortcut for admin-only routes */
export const requireAdmin = createMiddleware(async (c, next) => {
  const user = c.get('user')
  if (!user || user.role !== 'admin') {
    return c.json({ error: 'forbidden' }, 403)
  }
  await next()
})
