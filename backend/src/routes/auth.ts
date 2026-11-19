import { Hono } from 'hono'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'
import { hashPassword, verifyPassword } from '../lib/auth'
import { createSession, deleteSession, deleteAllUserSessions } from '../lib/session'
import { requireAuth } from '../lib/middleware'

const auth = new Hono()

/**
 * POST /auth/signup
 * Body: { email, password, displayName? }
 */
auth.post('/signup', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password, displayName } = body

    if (!email || !password) {
      return c.json({ error: 'email and password required' }, 400)
    }

    if (typeof email !== 'string' || !email.includes('@')) {
      return c.json({ error: 'valid email required' }, 400)
    }

    if (password.length < 8) {
      return c.json({ error: 'password must be at least 8 characters' }, 400)
    }

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const existing = await db.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first()

    if (existing) {
      return c.json({ error: 'email already registered' }, 409)
    }

    const passwordHash = await hashPassword(password)
    const now = new Date().toISOString()
    const verificationToken = crypto.randomUUID()

    const result = await db.prepare(
      `INSERT INTO users (email, password_hash, display_name, role, email_verified, verification_token, created_at, updated_at)
       VALUES (?, ?, ?, 'user', 0, ?, ?, ?)
       RETURNING id, email, display_name, role, created_at`
    ).bind(
      email.toLowerCase().trim(),
      passwordHash,
      displayName?.trim() || null,
      verificationToken,
      now,
      now
    ).first()

    if (!result) {
      return c.json({ error: 'failed to create user' }, 500)
    }

    const sessionId = await createSession(db, result.id as number)

    setCookie(c, 'pikk_session', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    const isDev = c.env.ENVIRONMENT === 'development'

    return c.json({
      user: {
        id: result.id,
        email: result.email,
        displayName: result.display_name,
        role: result.role,
        createdAt: result.created_at
      },
      ...(isDev ? { verificationToken } : {})
    }, 201)
  } catch (err) {
    console.error('signup error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/**
 * POST /auth/login
 */
auth.post('/login', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password } = body

    if (!email || !password) {
      return c.json({ error: 'email and password required' }, 400)
    }

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const user = await db.prepare(
      'SELECT id, email, password_hash, display_name, role, email_verified, created_at FROM users WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first()

    if (!user) {
      return c.json({ error: 'invalid credentials' }, 401)
    }

    const valid = await verifyPassword(password, user.password_hash as string)
    if (!valid) {
      return c.json({ error: 'invalid credentials' }, 401)
    }

    const sessionId = await createSession(db, user.id as number)

    setCookie(c, 'pikk_session', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        role: user.role,
        emailVerified: Boolean(user.email_verified),
        createdAt: user.created_at
      }
    })
  } catch (err) {
    console.error('login error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/**
 * POST /auth/logout
 */
auth.post('/logout', async (c) => {
  const sessionId = getCookie(c, 'pikk_session')
  const db = c.env.DB

  if (sessionId && db) {
    await deleteSession(db, sessionId)
  }

  deleteCookie(c, 'pikk_session', { path: '/' })
  return c.json({ ok: true })
})

/**
 * POST /auth/logout-all  (requires auth)
 */
auth.post('/logout-all', requireAuth, async (c) => {
  const user = c.get('user')
  const db = c.env.DB
  if (db) {
    await deleteAllUserSessions(db, user.id)
  }
  deleteCookie(c, 'pikk_session', { path: '/' })
  return c.json({ ok: true })
})

/**
 * GET /auth/me
 */
auth.get('/me', requireAuth, async (c) => {
  const user = c.get('user')
  return c.json({ user })
})

/**
 * POST /auth/update-profile
 * Body: { displayName }
 */
auth.post('/update-profile', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const displayName = body.displayName?.trim() || null

    if (displayName && displayName.length > 40) {
      return c.json({ error: 'displayName too long (max 40)' }, 400)
    }

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE users SET display_name = ?, updated_at = ? WHERE id = ?`
    ).bind(displayName, now, user.id).run()

    return c.json({
      user: {
        ...user,
        displayName
      }
    })
  } catch (err) {
    console.error('update-profile error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/**
 * POST /auth/verify-email
 * Body: { token }
 */
auth.post('/verify-email', async (c) => {
  try {
    const { token } = await c.req.json()
    if (!token) return c.json({ error: 'token required' }, 400)

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const row = await db.prepare(
      'SELECT id FROM users WHERE verification_token = ? AND email_verified = 0'
    ).bind(token).first()

    if (!row) {
      return c.json({ error: 'invalid or already used token' }, 400)
    }

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE users
       SET email_verified = 1, verification_token = NULL, updated_at = ?
       WHERE id = ?`
    ).bind(now, row.id).run()

    return c.json({ ok: true, message: 'email verified' })
  } catch (err) {
    console.error('verify-email error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

export default auth
