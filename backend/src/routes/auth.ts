import { Hono } from 'hono'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'
import { hashPassword, verifyPassword } from '../lib/auth'
import { createSession, getSession, deleteSession } from '../lib/session'

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

    if (password.length < 8) {
      return c.json({ error: 'password must be at least 8 characters' }, 400)
    }

    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    // Check existing
    const existing = await db.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first()

    if (existing) {
      return c.json({ error: 'email already registered' }, 409)
    }

    const passwordHash = await hashPassword(password)
    const now = new Date().toISOString()

    const result = await db.prepare(
      `INSERT INTO users (email, password_hash, display_name, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)
       RETURNING id, email, display_name, created_at`
    ).bind(
      email.toLowerCase(),
      passwordHash,
      displayName || null,
      now,
      now
    ).first()

    if (!result) {
      return c.json({ error: 'failed to create user' }, 500)
    }

    // Create session
    const sessionId = await createSession(db, result.id as number)

    setCookie(c, 'pikk_session', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return c.json({
      user: {
        id: result.id,
        email: result.email,
        displayName: result.display_name,
        createdAt: result.created_at
      }
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
      'SELECT id, email, password_hash, display_name, created_at FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first()

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
 * GET /auth/me
 */
auth.get('/me', async (c) => {
  const sessionId = getCookie(c, 'pikk_session')
  if (!sessionId) {
    return c.json({ user: null }, 401)
  }

  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)

  const session = await getSession(db, sessionId)
  if (!session) {
    deleteCookie(c, 'pikk_session', { path: '/' })
    return c.json({ user: null }, 401)
  }

  const user = await db.prepare(
    'SELECT id, email, display_name, created_at FROM users WHERE id = ?'
  ).bind(session.user_id).first()

  if (!user) {
    return c.json({ user: null }, 401)
  }

  return c.json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      createdAt: user.created_at
    }
  })
})

export default auth
