import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * Admin routes – seed for PIKK Master Mind
 */

const admin = new Hono()

admin.use('*', requireAuth, requireAdmin)

async function safeCount(db: D1Database, sql: string): Promise<number> {
  try {
    const row = await db.prepare(sql).first()
    return (row?.c as number) ?? 0
  } catch {
    return 0
  }
}

/** Overview for Master Mind dashboard */
admin.get('/overview', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)

  try {
    const [
      users,
      sessions,
      liveBroadcasts,
      openFlags,
      openIncidents,
      openTickets,
      pendingPayouts,
      queuedJobs,
      pendingAppeals,
    ] = await Promise.all([
      safeCount(db, 'SELECT COUNT(*) as c FROM users'),
      safeCount(db, 'SELECT COUNT(*) as c FROM sessions'),
      safeCount(db, `SELECT COUNT(*) as c FROM broadcast_sessions WHERE status = 'live'`),
      safeCount(db, `SELECT COUNT(*) as c FROM shield_flags WHERE status = 'open'`),
      safeCount(db, `SELECT COUNT(*) as c FROM incidents WHERE status = 'open'`),
      safeCount(db, `SELECT COUNT(*) as c FROM support_tickets WHERE status IN ('open','pending')`),
      safeCount(db, `SELECT COUNT(*) as c FROM payouts WHERE status IN ('requested','processing')`),
      safeCount(db, `SELECT COUNT(*) as c FROM supervisor_jobs WHERE status = 'queued'`),
      safeCount(db, `SELECT COUNT(*) as c FROM appeals WHERE status = 'pending'`),
    ])

    return c.json({
      timestamp: new Date().toISOString(),
      stats: {
        users,
        activeSessions: sessions,
        liveBroadcasts,
        openShieldFlags: openFlags,
        openIncidents,
        openSupportTickets: openTickets,
        pendingPayouts,
        queuedSupervisorJobs: queuedJobs,
        pendingAppeals,
      },
    })
  } catch (err) {
    return c.json({ error: 'overview failed', detail: String(err) }, 500)
  }
})

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
    return c.json({
      sessions: [],
      note: 'broadcast_sessions table not ready — run migration 0002_broadcast.sql',
      error: String(err),
    })
  }
})

/** Incidents feed for Master Mind */
admin.get('/incidents', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)

  try {
    const status = c.req.query('status')
    const limit = Math.min(Number(c.req.query('limit') || 40), 100)

    let query = `SELECT * FROM incidents`
    const params: any[] = []
    if (status) {
      query += ` WHERE status = ?`
      params.push(status)
    }
    query += ` ORDER BY created_at DESC LIMIT ?`
    params.push(limit)

    const rows = await db.prepare(query).bind(...params).all()
    return c.json({ incidents: rows.results || [] })
  } catch (err) {
    return c.json({
      incidents: [],
      note: 'incidents table not ready — run migration 0003_shield_incidents.sql',
      error: String(err),
    })
  }
})

admin.patch('/incidents/:id', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)

  try {
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    const allowed = ['open', 'acknowledged', 'resolved']
    if (!allowed.includes(status)) return c.json({ error: 'invalid status' }, 400)

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE incidents
       SET status = ?, updated_at = ?,
           resolved_at = CASE WHEN ? = 'resolved' THEN ? ELSE resolved_at END
       WHERE id = ?`
    ).bind(status, now, status, now, id).run()

    return c.json({ ok: true, id, status })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default admin
