import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * PIKK Shield – foundation for flagging suspicious / policy content
 * Full AI detection and automated actions come later.
 */

const shield = new Hono()

shield.use('*', requireAuth)

const REASONS = ['impersonation', 'copyright', 'suspicious', 'spam', 'harassment', 'other']
const SEVERITIES = ['low', 'medium', 'high', 'critical']

/** Create a flag */
shield.post('/flags', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))

    const targetType = (body.targetType || '').toString()
    const targetId = (body.targetId || '').toString()
    const reason = (body.reason || '').toString()
    const severity = (body.severity || 'medium').toString()

    if (!targetType || !targetId) return c.json({ error: 'targetType and targetId required' }, 400)
    if (!REASONS.includes(reason)) return c.json({ error: 'invalid reason' }, 400)
    if (!SEVERITIES.includes(severity)) return c.json({ error: 'invalid severity' }, 400)

    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await db.prepare(
      `INSERT INTO shield_flags
       (id, reporter_id, target_type, target_id, reason, details, status, severity, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'open', ?, ?, ?)`
    ).bind(
      id,
      user.id,
      targetType,
      targetId,
      reason,
      body.details || null,
      severity,
      now,
      now
    ).run()

    // Also create a linked incident for Master Mind visibility
    const incidentId = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO incidents
       (id, source, severity, title, details, status, related_id, created_at, updated_at)
       VALUES (?, 'shield', ?, ?, ?, 'open', ?, ?, ?)`
    ).bind(
      incidentId,
      severity,
      `Shield flag: ${reason} on ${targetType}`,
      body.details || null,
      id,
      now,
      now
    ).run()

    return c.json({
      flag: {
        id,
        targetType,
        targetId,
        reason,
        severity,
        status: 'open',
        createdAt: now,
      },
      incidentId,
    }, 201)
  } catch (err) {
    console.error('shield flag error', err)
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

/** List flags (own reports for normal users, all for admin) */
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
      if (status) {
        query += ` WHERE status = ?`
        params.push(status)
      }
    } else {
      query += ` WHERE reporter_id = ?`
      params.push(user.id)
      if (status) {
        query += ` AND status = ?`
        params.push(status)
      }
    }

    query += ` ORDER BY created_at DESC LIMIT ?`
    params.push(limit)

    const rows = await db.prepare(query).bind(...params).all()
    return c.json({ flags: rows.results || [] })
  } catch (err) {
    console.error('list flags error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Admin: update flag status */
shield.patch('/flags/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    const allowed = ['open', 'reviewing', 'resolved', 'dismissed']
    if (!allowed.includes(status)) return c.json({ error: 'invalid status' }, 400)

    const now = new Date().toISOString()
    const user = c.get('user')

    await db.prepare(
      `UPDATE shield_flags
       SET status = ?, updated_at = ?,
           resolved_at = CASE WHEN ? IN ('resolved','dismissed') THEN ? ELSE resolved_at END,
           resolved_by = CASE WHEN ? IN ('resolved','dismissed') THEN ? ELSE resolved_by END
       WHERE id = ?`
    ).bind(status, now, status, now, status, user.id, id).run()

    return c.json({ ok: true, id, status })
  } catch (err) {
    console.error('update flag error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

export default shield
