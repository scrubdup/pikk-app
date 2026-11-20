import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

const admin = new Hono()

admin.use('*', requireAuth, requireAdmin)

/**
 * GET /admin/users
 */
admin.get('/users', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)

  const limit = Math.min(Number(c.req.query('limit') || 50), 100)
  const offset = Number(c.req.query('offset') || 0)

  const users = await db.prepare(
    `SELECT id, email, display_name, role, email_verified, created_at, updated_at
     FROM users ORDER BY id DESC LIMIT ? OFFSET ?`
  ).bind(limit, offset).all()

  const total = await db.prepare('SELECT COUNT(*) as c FROM users').first()

  return c.json({
    users: users.results || [],
    total: total?.c ?? 0,
    limit,
    offset,
  })
})

/**
 * GET /admin/broadcast-sessions
 * Lists recent broadcast sessions (once D1 migration is applied)
 */
admin.get('/broadcast-sessions', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)

  try {
    const rows = await db.prepare(
      `SELECT id, user_id, title, status, destinations, started_at, ended_at, created_at
       FROM broadcast_sessions
       ORDER BY created_at DESC
       LIMIT 50`
    ).all()

    return c.json({ sessions: rows.results || [] })
  } catch (err) {
    // Table may not exist until migration runs
    return c.json({
      sessions: [],
      note: 'broadcast_sessions table not ready — run migration 0002_broadcast.sql',
      error: String(err),
    })
  }
})

export default admin
