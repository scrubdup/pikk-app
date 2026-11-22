import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * PIKK Shield — reports, flags, incident linking
 */

const shield = new Hono()
shield.use('*', requireAuth)

const REASONS = [
  'impersonation',
  'copyright',
  'suspicious',
  'spam',
  'harassment',
  'hate',
  'sexual',
  'violence',
  'self_harm',
  'underage',
  'fraud',
  'other',
] as const

const SEVERITIES = ['low', 'medium', 'high', 'critical'] as const

function severityForReason(reason: string, requested?: string): string {
  if (requested && SEVERITIES.includes(requested as any)) return requested
  if (reason === 'underage' || reason === 'self_harm') return 'critical'
  if (reason === 'violence' || reason === 'hate' || reason === 'sexual') return 'high'
  if (reason === 'harassment' || reason === 'impersonation' || reason === 'fraud') return 'high'
  if (reason === 'copyright' || reason === 'suspicious') return 'medium'
  return 'medium'
}

async function notify(db: D1Database, userId: number, title: string, body: string) {
  try {
    await db.prepare(
      `INSERT INTO notifications (id, user_id, type, title, body, href, created_at)
       VALUES (?, ?, 'moderation', ?, ?, '/guidelines', ?)`
    ).bind(crypto.randomUUID(), userId, title, body, new Date().toISOString()).run()
  } catch { /* optional */ }
}

/** User report → flag + Master Mind incident */
shield.post('/flags', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))

    const targetType = (body.targetType || '').toString()
    const targetId = (body.targetId || '').toString()
    const reason = (body.reason || '').toString()
    if (!targetType || !targetId) return c.json({ error: 'targetType and targetId required' }, 400)
    if (!REASONS.includes(reason as any)) return c.json({ error: 'invalid reason', allowed: REASONS }, 400)

    const severity = severityForReason(reason, body.severity)
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await db.prepare(
      `INSERT INTO shield_flags
       (id, reporter_id, target_type, target_id, reason, details, status, severity, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'open', ?, ?, ?)`
    ).bind(id, user.id, targetType, targetId, reason, body.details || null, severity, now, now).run()

    const incidentId = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO incidents
       (id, source, severity, title, details, status, related_id, created_at, updated_at)
       VALUES (?, 'shield', ?, ?, ?, 'open', ?, ?, ?)`
    ).bind(
      incidentId,
      severity,
      `Shield: ${reason} on ${targetType}/${targetId}`,
      body.details || null,
      id,
      now,
      now
    ).run()

    // Critical → enqueue supervisor review
    if (severity === 'critical' || severity === 'high') {
      try {
        await db.prepare(
          `INSERT INTO supervisor_jobs
           (id, type, status, priority, payload, attempts, max_attempts, created_at, updated_at)
           VALUES (?, 'review_flag', 'queued', ?, ?, 0, 3, ?, ?)`
        ).bind(
          crypto.randomUUID(),
          severity === 'critical' ? 1 : 10,
          JSON.stringify({ flagId: id, incidentId, reason, severity }),
          now,
          now
        ).run()
      } catch { /* optional */ }
    }

    return c.json({
      flag: { id, targetType, targetId, reason, severity, status: 'open', createdAt: now },
      incidentId,
      queued: severity === 'critical' || severity === 'high',
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

shield.get('/flags', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)
    const status = c.req.query('status')

    let query = `SELECT * FROM shield_flags`
    const params: any[] = []
    if (user.role === 'admin') {
      if (status) { query += ` WHERE status = ?`; params.push(status) }
    } else {
      query += ` WHERE reporter_id = ?`
      params.push(user.id)
      if (status) { query += ` AND status = ?`; params.push(status) }
    }
    query += ` ORDER BY created_at DESC LIMIT ?`
    params.push(limit)

    const rows = await db.prepare(query).bind(...params).all()
    return c.json({ flags: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

shield.get('/flags/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const row = await db.prepare(`SELECT * FROM shield_flags WHERE id = ?`).bind(c.req.param('id')).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (user.role !== 'admin' && row.reporter_id !== user.id) return c.json({ error: 'forbidden' }, 403)
    return c.json({ flag: row })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

shield.patch('/flags/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    if (!['open', 'reviewing', 'resolved', 'dismissed'].includes(status)) {
      return c.json({ error: 'invalid status' }, 400)
    }
    const now = new Date().toISOString()
    const admin = c.get('user')
    await db.prepare(
      `UPDATE shield_flags
       SET status = ?, updated_at = ?,
           resolved_at = CASE WHEN ? IN ('resolved','dismissed') THEN ? ELSE resolved_at END,
           resolved_by = CASE WHEN ? IN ('resolved','dismissed') THEN ? ELSE resolved_by END
       WHERE id = ?`
    ).bind(status, now, status, now, status, admin.id, id).run()
    return c.json({ ok: true, id, status })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Admin queue: open high/critical flags */
shield.get('/queue', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const rows = await db.prepare(
      `SELECT * FROM shield_flags
       WHERE status IN ('open','reviewing') AND severity IN ('high','critical')
       ORDER BY CASE severity WHEN 'critical' THEN 0 ELSE 1 END, created_at ASC
       LIMIT 50`
    ).all()
    return c.json({ queue: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default shield
