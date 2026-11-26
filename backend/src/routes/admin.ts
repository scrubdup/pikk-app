import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * PIKK Master Mind — owner control center
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

admin.get('/overview', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)
  try {
    const stats = {
      users: await safeCount(db, 'SELECT COUNT(*) as c FROM users'),
      activeSessions: await safeCount(db, 'SELECT COUNT(*) as c FROM sessions'),
      liveBroadcasts: await safeCount(db, `SELECT COUNT(*) as c FROM broadcast_sessions WHERE status = 'live'`),
      openShieldFlags: await safeCount(db, `SELECT COUNT(*) as c FROM shield_flags WHERE status = 'open'`),
      criticalFlags: await safeCount(db, `SELECT COUNT(*) as c FROM shield_flags WHERE status = 'open' AND severity = 'critical'`),
      openIncidents: await safeCount(db, `SELECT COUNT(*) as c FROM incidents WHERE status = 'open'`),
      openSupportTickets: await safeCount(db, `SELECT COUNT(*) as c FROM support_tickets WHERE status IN ('open','pending')`),
      humanSupport: await safeCount(db, `SELECT COUNT(*) as c FROM support_tickets WHERE assigned_to = 'human' AND status IN ('open','pending')`),
      pendingPayouts: await safeCount(db, `SELECT COUNT(*) as c FROM payouts WHERE status IN ('requested','processing')`),
      queuedSupervisorJobs: await safeCount(db, `SELECT COUNT(*) as c FROM supervisor_jobs WHERE status = 'queued'`),
      pendingAppeals: await safeCount(db, `SELECT COUNT(*) as c FROM appeals WHERE status = 'pending'`),
      pendingCreatorApps: await safeCount(db, `SELECT COUNT(*) as c FROM creator_applications WHERE status = 'pending'`),
      vaultObjects: await safeCount(db, `SELECT COUNT(*) as c FROM vault_objects WHERE status != 'deleted'`),
      bannedUsers: await safeCount(db, `SELECT COUNT(*) as c FROM users WHERE banned_at IS NOT NULL`),
    }
    return c.json({ timestamp: new Date().toISOString(), stats })
  } catch (err) {
    return c.json({ error: 'overview failed', detail: String(err) }, 500)
  }
})

/** Full Master Mind dashboard payload */
admin.get('/dashboard', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)
  try {
    const [
      users, live, criticalFlags, openIncidents, openTickets, humanTickets,
      pendingPayouts, queuedJobs, pendingAppeals, pendingCreators,
    ] = await Promise.all([
      safeCount(db, 'SELECT COUNT(*) as c FROM users'),
      safeCount(db, `SELECT COUNT(*) as c FROM broadcast_sessions WHERE status = 'live'`),
      safeCount(db, `SELECT COUNT(*) as c FROM shield_flags WHERE status = 'open' AND severity = 'critical'`),
      safeCount(db, `SELECT COUNT(*) as c FROM incidents WHERE status = 'open'`),
      safeCount(db, `SELECT COUNT(*) as c FROM support_tickets WHERE status IN ('open','pending')`),
      safeCount(db, `SELECT COUNT(*) as c FROM support_tickets WHERE assigned_to = 'human' AND status IN ('open','pending')`),
      safeCount(db, `SELECT COUNT(*) as c FROM payouts WHERE status IN ('requested','processing')`),
      safeCount(db, `SELECT COUNT(*) as c FROM supervisor_jobs WHERE status = 'queued'`),
      safeCount(db, `SELECT COUNT(*) as c FROM appeals WHERE status = 'pending'`),
      safeCount(db, `SELECT COUNT(*) as c FROM creator_applications WHERE status = 'pending'`),
    ])

    const [incidents, flags, tickets, jobs, lives] = await Promise.all([
      db.prepare(`SELECT id, source, severity, title, status, created_at FROM incidents WHERE status = 'open' ORDER BY created_at DESC LIMIT 10`).all().catch(() => ({ results: [] })),
      db.prepare(`SELECT id, reason, severity, status, target_type, target_id, created_at FROM shield_flags WHERE status IN ('open','reviewing') ORDER BY CASE severity WHEN 'critical' THEN 0 WHEN 'high' THEN 1 ELSE 2 END, created_at ASC LIMIT 10`).all().catch(() => ({ results: [] })),
      db.prepare(`SELECT id, subject, status, priority, assigned_to, created_at FROM support_tickets WHERE status IN ('open','pending') ORDER BY CASE priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 ELSE 2 END, created_at ASC LIMIT 10`).all().catch(() => ({ results: [] })),
      db.prepare(`SELECT id, type, status, priority, created_at FROM supervisor_jobs WHERE status = 'queued' ORDER BY priority ASC, created_at ASC LIMIT 10`).all().catch(() => ({ results: [] })),
      db.prepare(`SELECT id, user_id, title, status, started_at FROM broadcast_sessions WHERE status = 'live' ORDER BY started_at DESC LIMIT 10`).all().catch(() => ({ results: [] })),
    ])

    const alerts: { level: string; message: string }[] = []
    if (criticalFlags > 0) alerts.push({ level: 'critical', message: `${criticalFlags} critical shield flag(s) open` })
    if (openIncidents > 5) alerts.push({ level: 'high', message: `${openIncidents} open incidents` })
    if (humanTickets > 0) alerts.push({ level: 'high', message: `${humanTickets} support ticket(s) need human` })
    if (pendingAppeals > 0) alerts.push({ level: 'medium', message: `${pendingAppeals} pending appeal(s)` })
    if (pendingPayouts > 0) alerts.push({ level: 'medium', message: `${pendingPayouts} payout(s) waiting` })
    if (queuedJobs > 20) alerts.push({ level: 'medium', message: `${queuedJobs} supervisor jobs queued` })

    return c.json({
      timestamp: new Date().toISOString(),
      capabilities: {
        aiSupport: !!c.env.AI_API_KEY,
        vaultR2: !!c.env.VAULT_BUCKET,
      },
      stats: {
        users, liveBroadcasts: live, criticalFlags, openIncidents,
        openSupportTickets: openTickets, humanSupport: humanTickets,
        pendingPayouts, queuedSupervisorJobs: queuedJobs,
        pendingAppeals, pendingCreatorApps: pendingCreators,
      },
      alerts,
      queues: {
        incidents: incidents.results || [],
        flags: flags.results || [],
        tickets: tickets.results || [],
        jobs: jobs.results || [],
        liveSessions: lives.results || [],
      },
    })
  } catch (err) {
    return c.json({ error: 'dashboard failed', detail: String(err) }, 500)
  }
})

admin.get('/activity', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)
  try {
    const [incidents, flags, tickets, jobs] = await Promise.all([
      db.prepare(`SELECT id, source, severity, title, status, created_at FROM incidents ORDER BY created_at DESC LIMIT 8`).all().catch(() => ({ results: [] })),
      db.prepare(`SELECT id, reason, severity, status, created_at FROM shield_flags ORDER BY created_at DESC LIMIT 8`).all().catch(() => ({ results: [] })),
      db.prepare(`SELECT id, subject, status, priority, created_at FROM support_tickets ORDER BY created_at DESC LIMIT 8`).all().catch(() => ({ results: [] })),
      db.prepare(`SELECT id, type, status, created_at FROM supervisor_jobs ORDER BY created_at DESC LIMIT 8`).all().catch(() => ({ results: [] })),
    ])
    return c.json({
      incidents: incidents.results || [],
      flags: flags.results || [],
      tickets: tickets.results || [],
      jobs: jobs.results || [],
    })
  } catch (err) {
    return c.json({ error: 'activity failed', detail: String(err) }, 500)
  }
})

admin.get('/users', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)
  const limit = Math.min(Number(c.req.query('limit') || 50), 100)
  const offset = Number(c.req.query('offset') || 0)
  const q = (c.req.query('q') || '').trim()

  let users
  let total
  if (q) {
    const like = `%${q}%`
    users = await db.prepare(
      `SELECT id, email, display_name, role, email_verified, banned_at, suspended_until, muted_until, created_at, updated_at
       FROM users WHERE email LIKE ? OR display_name LIKE ?
       ORDER BY id DESC LIMIT ? OFFSET ?`
    ).bind(like, like, limit, offset).all()
    total = await db.prepare(
      `SELECT COUNT(*) as c FROM users WHERE email LIKE ? OR display_name LIKE ?`
    ).bind(like, like).first()
  } else {
    users = await db.prepare(
      `SELECT id, email, display_name, role, email_verified, banned_at, suspended_until, muted_until, created_at, updated_at
       FROM users ORDER BY id DESC LIMIT ? OFFSET ?`
    ).bind(limit, offset).all()
    total = await db.prepare('SELECT COUNT(*) as c FROM users').first()
  }
  return c.json({ users: users.results || [], total: total?.c ?? 0, limit, offset })
})

admin.patch('/users/:id/role', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)
  const id = Number(c.req.param('id'))
  const body = await c.req.json().catch(() => ({}))
  const role = body.role
  if (!['user', 'creator', 'admin'].includes(role)) return c.json({ error: 'invalid role' }, 400)
  const now = new Date().toISOString()
  await db.prepare(`UPDATE users SET role = ?, updated_at = ? WHERE id = ?`).bind(role, now, id).run()
  try {
    await db.prepare(
      `INSERT INTO notifications (id, user_id, type, title, body, created_at) VALUES (?, ?, 'system', ?, ?, ?)`
    ).bind(crypto.randomUUID(), id, `Role updated to ${role}`, `An admin set your role to ${role}.`, now).run()
  } catch { /* optional */ }
  return c.json({ ok: true, id, role })
})

/** Force-end a live broadcast */
admin.post('/broadcast-sessions/:id/force-end', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)
  const id = c.req.param('id')
  const now = new Date().toISOString()
  const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
  if (!row) return c.json({ error: 'not found' }, 404)
  await db.prepare(
    `UPDATE broadcast_sessions SET status = 'ended', ended_at = ?, updated_at = ? WHERE id = ?`
  ).bind(now, now, id).run()
  try {
    await db.prepare(
      `UPDATE broadcast_relays SET status = 'stopped', stopped_at = ?, updated_at = ? WHERE session_id = ?`
    ).bind(now, now, id).run()
  } catch { /* optional */ }
  return c.json({ ok: true, id, status: 'ended' })
})

admin.get('/broadcast-sessions', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)
  try {
    const status = c.req.query('status')
    const rows = status
      ? await db.prepare(
          `SELECT id, user_id, title, status, destinations, started_at, ended_at, created_at
           FROM broadcast_sessions WHERE status = ? ORDER BY created_at DESC LIMIT 50`
        ).bind(status).all()
      : await db.prepare(
          `SELECT id, user_id, title, status, destinations, started_at, ended_at, created_at
           FROM broadcast_sessions ORDER BY created_at DESC LIMIT 50`
        ).all()
    return c.json({ sessions: rows.results || [] })
  } catch (err) {
    return c.json({ sessions: [], error: String(err) })
  }
})

admin.get('/incidents', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)
  try {
    const status = c.req.query('status')
    const limit = Math.min(Number(c.req.query('limit') || 40), 100)
    let query = `SELECT * FROM incidents`
    const params: any[] = []
    if (status) { query += ` WHERE status = ?`; params.push(status) }
    query += ` ORDER BY created_at DESC LIMIT ?`
    params.push(limit)
    const rows = await db.prepare(query).bind(...params).all()
    return c.json({ incidents: rows.results || [] })
  } catch (err) {
    return c.json({ incidents: [], error: String(err) })
  }
})

admin.patch('/incidents/:id', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)
  try {
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    if (!['open', 'acknowledged', 'resolved'].includes(status)) return c.json({ error: 'invalid status' }, 400)
    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE incidents SET status = ?, updated_at = ?,
       resolved_at = CASE WHEN ? = 'resolved' THEN ? ELSE resolved_at END WHERE id = ?`
    ).bind(status, now, status, now, id).run()
    return c.json({ ok: true, id, status })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default admin
