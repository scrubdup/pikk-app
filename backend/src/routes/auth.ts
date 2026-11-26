import { Hono } from 'hono'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'
import { hashPassword, verifyPassword, validatePassword, validateEmail } from '../lib/auth'
import {
  createSession,
  deleteSession,
  deleteAllUserSessions,
  cleanupExpiredSessions,
  listUserSessions,
} from '../lib/session'
import { requireAuth, requireAdmin } from '../lib/middleware'
import { rateLimit } from '../lib/rate-limit'

const auth = new Hono()

auth.use('/signup', rateLimit({ windowMs: 60_000, max: 8 }))
auth.use('/login', rateLimit({ windowMs: 60_000, max: 15 }))
auth.use('/change-password', rateLimit({ windowMs: 60_000, max: 10 }))
auth.use('/request-password-reset', rateLimit({ windowMs: 60_000, max: 5 }))
auth.use('/resend-verification', rateLimit({ windowMs: 60_000, max: 5 }))

function cookieOpts(c: any) {
  const sameSite = (c.env.COOKIE_SAMESITE as string) || 'Lax'
  return {
    httpOnly: true,
    secure: true,
    sameSite: sameSite as 'Lax' | 'None' | 'Strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  }
}

function clientMeta(c: any) {
  return {
    userAgent: c.req.header('user-agent') || undefined,
    ip: c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || undefined,
  }
}

function userPayload(row: any) {
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name ?? row.displayName ?? null,
    role: row.role,
    emailVerified: Boolean(row.email_verified ?? row.emailVerified),
    createdAt: row.created_at ?? row.createdAt ?? null,
  }
}

auth.post('/signup', async (c) => {
  try {
    const body = await c.req.json()
    const emailRaw = body.email
    const password = body.password
    const displayName = body.displayName

    const emailErr = validateEmail(emailRaw)
    if (emailErr) return c.json({ error: emailErr }, 400)
    const passErr = validatePassword(password)
    if (passErr) return c.json({ error: passErr }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const email = emailRaw.toLowerCase().trim()
    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
    if (existing) return c.json({ error: 'email already registered' }, 409)

    const passwordHash = await hashPassword(password)
    const now = new Date().toISOString()
    const verificationToken = crypto.randomUUID()

    const result = await db.prepare(
      `INSERT INTO users (email, password_hash, display_name, role, email_verified, verification_token, created_at, updated_at)
       VALUES (?, ?, ?, 'user', 0, ?, ?, ?)
       RETURNING id, email, display_name, role, created_at`
    ).bind(email, passwordHash, displayName?.trim()?.slice(0, 40) || null, verificationToken, now, now).first()

    if (!result) return c.json({ error: 'failed to create user' }, 500)

    const sessionId = await createSession(db, result.id as number, clientMeta(c))
    setCookie(c, 'pikk_session', sessionId, cookieOpts(c))

    const isDev = c.env.ENVIRONMENT === 'development'
    return c.json({
      user: userPayload(result),
      sessionId,
      ...(isDev ? { verificationToken } : {}),
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
      `SELECT id, email, password_hash, display_name, role, email_verified, created_at,
              banned_at, suspended_until
       FROM users WHERE email = ?`
    ).bind(email.toLowerCase().trim()).first()

    if (!user) return c.json({ error: 'invalid credentials' }, 401)
    const valid = await verifyPassword(password, user.password_hash as string)
    if (!valid) return c.json({ error: 'invalid credentials' }, 401)

    if (user.banned_at) return c.json({ error: 'account banned' }, 403)
    if (user.suspended_until && new Date(user.suspended_until as string).getTime() > Date.now()) {
      return c.json({ error: 'account suspended', until: user.suspended_until }, 403)
    }

    const sessionId = await createSession(db, user.id as number, clientMeta(c))
    setCookie(c, 'pikk_session', sessionId, cookieOpts(c))

    const now = new Date().toISOString()
    try {
      await db.prepare(`UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?`)
        .bind(now, now, user.id).run()
    } catch { /* column may not exist until migrate */ }

    return c.json({
      user: userPayload(user),
      sessionId,
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
  const user = c.get('user')
  return c.json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      emailVerified: user.emailVerified,
    },
  })
})

/** List active sessions for current user */
auth.get('/sessions', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const rows = await listUserSessions(db, user.id)
    return c.json({
      sessions: rows.map((r: any) => ({
        id: r.id,
        createdAt: r.created_at,
        expiresAt: r.expires_at,
        lastSeenAt: r.last_seen_at,
        userAgent: r.user_agent,
        ip: r.ip,
        current: r.id === user.sessionId,
      })),
    })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

/** Revoke a specific session */
auth.delete('/sessions/:id', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const row = await db.prepare(`SELECT id, user_id FROM sessions WHERE id = ?`).bind(id).first()
    if (!row || row.user_id !== user.id) return c.json({ error: 'not found' }, 404)
    await deleteSession(db, id)
    if (id === user.sessionId) deleteCookie(c, 'pikk_session', { path: '/' })
    return c.json({ ok: true, revoked: id })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
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
    return c.json({ user: { ...user, displayName, sessionId: undefined } })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/change-password', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { currentPassword, newPassword } = await c.req.json()
    if (!currentPassword || !newPassword) return c.json({ error: 'currentPassword and newPassword required' }, 400)
    const passErr = validatePassword(newPassword)
    if (passErr) return c.json({ error: passErr }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const row = await db.prepare('SELECT password_hash FROM users WHERE id = ?').bind(user.id).first()
    if (!row) return c.json({ error: 'user not found' }, 404)
    const valid = await verifyPassword(currentPassword, row.password_hash as string)
    if (!valid) return c.json({ error: 'current password is incorrect' }, 401)

    const newHash = await hashPassword(newPassword)
    const now = new Date().toISOString()
    await db.prepare(`UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?`).bind(newHash, now, user.id).run()

    // Invalidate other sessions; keep current
    await db.prepare(`DELETE FROM sessions WHERE user_id = ? AND id != ?`).bind(user.id, user.sessionId).run()

    return c.json({ ok: true, message: 'password updated' })
  } catch (err) {
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
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/resend-verification', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    if (user.emailVerified) return c.json({ ok: true, message: 'already verified' })

    const token = crypto.randomUUID()
    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE users SET verification_token = ?, updated_at = ? WHERE id = ?`
    ).bind(token, now, user.id).run()

    const isDev = c.env.ENVIRONMENT === 'development'
    return c.json({
      ok: true,
      message: 'verification token refreshed',
      ...(isDev ? { verificationToken: token } : {}),
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/request-password-reset', async (c) => {
  try {
    const { email } = await c.req.json()
    if (!email) return c.json({ error: 'email required' }, 400)
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const user = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email.toLowerCase().trim()).first()
    // Always same response (no enumeration)
    if (!user) return c.json({ ok: true, message: 'If that email exists, a reset link was sent' })

    const token = crypto.randomUUID()
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString()
    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE users SET reset_token = ?, reset_token_expires = ?, updated_at = ? WHERE id = ?`
    ).bind(token, expires, now, user.id).run()

    const isDev = c.env.ENVIRONMENT === 'development'
    return c.json({
      ok: true,
      message: 'If that email exists, a reset link was sent',
      ...(isDev ? { resetToken: token } : {}),
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/reset-password', async (c) => {
  try {
    const { token, newPassword } = await c.req.json()
    if (!token || !newPassword) return c.json({ error: 'token and newPassword required' }, 400)
    const passErr = validatePassword(newPassword)
    if (passErr) return c.json({ error: passErr }, 400)

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
    await deleteAllUserSessions(db, user.id as number)

    return c.json({ ok: true, message: 'password reset successful' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

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
    return c.json({ error: 'internal error' }, 500)
  }
})

auth.post('/cleanup-sessions', requireAuth, requireAdmin, async (c) => {
  if (!c.env.DB) return c.json({ error: 'database not configured' }, 500)
  await cleanupExpiredSessions(c.env.DB)
  return c.json({ ok: true, message: 'expired sessions cleaned' })
})

export default auth
