import { Hono } from 'hono'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'
import { hashPassword, verifyPassword } from '../lib/auth'
import { createSession, deleteSession, deleteAllUserSessions, cleanupExpiredSessions } from '../lib/session'
import { requireAuth, requireAdmin } from '../lib/middleware'
import { rateLimit } from '../lib/rate-limit'

const auth = new Hono()

auth.use('/signup', rateLimit({ windowMs: 60_000, max: 8 }))
auth.use('/login', rateLimit({ windowMs: 60_000, max: 15 }))
auth.use('/change-password', rateLimit({ windowMs: 60_000, max: 10 }))
auth.use('/request-password-reset', rateLimit({ windowMs: 60_000, max: 5 }))

auth.post('/signup', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password, displayName } = body

    if (!email || !password) return c.json({ error: 'email and password required' }, 400)
    if (typeof email !== 'string' || !email.includes('@')) return c.json({ error: 'valid email required' }, 400)
    if (password.length < 8) return c.json({ error: 'password must be at least 8 characters' }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email.toLowerCase().trim()).first()
    if (existing) return c.json({ error: 'email already registered' }, 409)

    const passwordHash = await hashPassword(password)
    const now = new Date().toISOString()
    const verificationToken = crypto.randomUUID()

    const result = await db.prepare(
      `INSERT INTO users (email, password_hash, display_name, role, email_verified, verification_token, created_at, updated_at)
       VALUES (?, ?, ?, 'user', 0, ?, ?, ?)
       RETURNING id, email, display_name, role, created_at`
    ).bind(email.toLowerCase().trim(), passwordHash, displayName?.trim() || null, verificationToken, now, now).first()

    if (!result) return c.json({ error: 'failed to create user' }, 500)

    const sessionId = await createSession(db, result.id as number)
    setCookie(c, 'pikk_session', sessionId, {
      httpOnly: true, secure: true, sameSite: 'Lax', path: '/', maxAge: 60 * 60 * 24 * 30,
    })

    const isDev = c.env.ENVIRONMENT === 'development'
    return c.json({
      user: { id: result.id, email: result.email, displayName: result.display_name, role: result.role, createdAt: result.created_at },
      ...(isDev ? { verificationToken } : {})
    }, 201)
  } catch (err) {
    console.error('signup error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/login', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password } = body
    if (!email || !password) return c.json({ error: 'email and password required' }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const user = await db.prepare(
      'SELECT id, email, password_hash, display_name, role, email_verified, created_at FROM users WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first()

    if (!user) return c.json({ error: 'invalid credentials' }, 401)
    const valid = await verifyPassword(password, user.password_hash as string)
    if (!valid) return c.json({ error: 'invalid credentials' }, 401)

    const sessionId = await createSession(db, user.id as number)
    setCookie(c, 'pikk_session', sessionId, {
      httpOnly: true, secure: true, sameSite: 'Lax', path: '/', maxAge: 60 * 60 * 24 * 30,
    })

    return c.json({
      user: {
        id: user.id, email: user.email, displayName: user.display_name,
        role: user.role, emailVerified: Boolean(user.email_verified), createdAt: user.created_at
      }
    })
  } catch (err) {
    console.error('login error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/logout', async (c) => {
  const sessionId = getCookie(c, 'pikk_session')
  if (sessionId && c.env.DB) await deleteSession(c.env.DB, sessionId)
  deleteCookie(c, 'pikk_session', { path: '/' })
  return c.json({ ok: true })
})

auth.post('/logout-all', requireAuth, async (c) => {
  const user = c.get('user')
  if (c.env.DB) await deleteAllUserSessions(c.env.DB, user.id)
  deleteCookie(c, 'pikk_session', { path: '/' })
  return c.json({ ok: true })
})

auth.get('/me', requireAuth, async (c) => {
  return c.json({ user: c.get('user') })
})

auth.post('/update-profile', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const displayName = body.displayName?.trim() || null
    if (displayName && displayName.length > 40) return c.json({ error: 'displayName too long (max 40)' }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const now = new Date().toISOString()
    await db.prepare(`UPDATE users SET display_name = ?, updated_at = ? WHERE id = ?`).bind(displayName, now, user.id).run()
    return c.json({ user: { ...user, displayName } })
  } catch (err) {
    console.error('update-profile error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/change-password', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { currentPassword, newPassword } = await c.req.json()
    if (!currentPassword || !newPassword) return c.json({ error: 'currentPassword and newPassword required' }, 400)
    if (newPassword.length < 8) return c.json({ error: 'new password must be at least 8 characters' }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const row = await db.prepare('SELECT password_hash FROM users WHERE id = ?').bind(user.id).first()
    if (!row) return c.json({ error: 'user not found' }, 404)

    const valid = await verifyPassword(currentPassword, row.password_hash as string)
    if (!valid) return c.json({ error: 'current password is incorrect' }, 401)

    const newHash = await hashPassword(newPassword)
    const now = new Date().toISOString()
    await db.prepare(`UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?`).bind(newHash, now, user.id).run()
    return c.json({ ok: true, message: 'password updated' })
  } catch (err) {
    console.error('change-password error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/verify-email', async (c) => {
  try {
    const { token } = await c.req.json()
    if (!token) return c.json({ error: 'token required' }, 400)
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const row = await db.prepare('SELECT id FROM users WHERE verification_token = ? AND email_verified = 0').bind(token).first()
    if (!row) return c.json({ error: 'invalid or already used token' }, 400)

    const now = new Date().toISOString()
    await db.prepare(`UPDATE users SET email_verified = 1, verification_token = NULL, updated_at = ? WHERE id = ?`).bind(now, row.id).run()
    return c.json({ ok: true, message: 'email verified' })
  } catch (err) {
    console.error('verify-email error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Password reset – request token (email sending still TODO) */
auth.post('/request-password-reset', async (c) => {
  try {
    const { email } = await c.req.json()
    if (!email) return c.json({ error: 'email required' }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const user = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email.toLowerCase().trim()).first()
    // Always return ok to avoid email enumeration
    if (!user) return c.json({ ok: true, message: 'If that email exists, a reset link was sent' })

    const token = crypto.randomUUID()
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
    const now = new Date().toISOString()

    await db.prepare(
      `UPDATE users SET reset_token = ?, reset_token_expires = ?, updated_at = ? WHERE id = ?`
    ).bind(token, expires, now, user.id).run()

    const isDev = c.env.ENVIRONMENT === 'development'
    return c.json({
      ok: true,
      message: 'If that email exists, a reset link was sent',
      ...(isDev ? { resetToken: token } : {})
    })
  } catch (err) {
    console.error('request-password-reset error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Confirm password reset with token */
auth.post('/reset-password', async (c) => {
  try {
    const { token, newPassword } = await c.req.json()
    if (!token || !newPassword) return c.json({ error: 'token and newPassword required' }, 400)
    if (newPassword.length < 8) return c.json({ error: 'password must be at least 8 characters' }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const user = await db.prepare(
      `SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > datetime('now')`
    ).bind(token).first()

    if (!user) return c.json({ error: 'invalid or expired token' }, 400)

    const hash = await hashPassword(newPassword)
    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL, updated_at = ? WHERE id = ?`
    ).bind(hash, now, user.id).run()

    // Kill all sessions for security
    await deleteAllUserSessions(db, user.id as number)

    return c.json({ ok: true, message: 'password reset successful' })
  } catch (err) {
    console.error('reset-password error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Delete own account */
auth.post('/delete-account', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { password } = await c.req.json()
    if (!password) return c.json({ error: 'password required to confirm deletion' }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const row = await db.prepare('SELECT password_hash FROM users WHERE id = ?').bind(user.id).first()
    if (!row) return c.json({ error: 'user not found' }, 404)

    const valid = await verifyPassword(password, row.password_hash as string)
    if (!valid) return c.json({ error: 'password incorrect' }, 401)

    await deleteAllUserSessions(db, user.id)
    await db.prepare('DELETE FROM users WHERE id = ?').bind(user.id).run()

    deleteCookie(c, 'pikk_session', { path: '/' })
    return c.json({ ok: true, message: 'account deleted' })
  } catch (err) {
    console.error('delete-account error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/cleanup-sessions', requireAuth, requireAdmin, async (c) => {
  if (!c.env.DB) return c.json({ error: 'database not configured' }, 500)
  await cleanupExpiredSessions(c.env.DB)
  return c.json({ ok: true, message: 'expired sessions cleaned' })
})

export default auth
