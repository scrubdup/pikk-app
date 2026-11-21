import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * Trust & Safety – moderation actions + appeals
 */

const moderation = new Hono()

moderation.use('*', requireAuth)

const ACTIONS = ['warn', 'restrict', 'suspend', 'ban', 'remove_content', 'restore']

/** Admin: perform moderation action */
moderation.post('/actions', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const admin = c.get('user')
    const body = await c.req.json().catch(() => ({}))

    const targetType = (body.targetType || '').toString()
    const targetId = (body.targetId || '').toString()
    const action = (body.action || '').toString()

    if (!targetType || !targetId) return c.json({ error: 'targetType and targetId required' }, 400)
    if (!ACTIONS.includes(action)) return c.json({ error: 'invalid action' }, 400)

    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const durationHours = body.durationHours ? Number(body.durationHours) : null
    const expiresAt = durationHours
      ? new Date(Date.now() + durationHours * 3600 * 1000).toISOString()
      : null

    await db.prepare(
      `INSERT INTO moderation_actions
       (id, target_type, target_id, action, reason, duration_hours, performed_by, related_flag_id, created_at, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      targetType,
      targetId,
      action,
      body.reason || null,
      durationHours,
      admin.id,
      body.relatedFlagId || null,
      now,
      expiresAt
    ).run()

    // Create incident for Master Mind
    const incidentId = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO incidents
       (id, source, severity, title, details, status, related_id, created_at, updated_at)
       VALUES (?, 'system', 'high', ?, ?, 'open', ?, ?, ?)`
    ).bind(
      incidentId,
      `Moderation: ${action} on ${targetType}`,
      body.reason || null,
      id,
      now,
      now
    ).run()

    return c.json({ actionId: id, incidentId, createdAt: now }, 201)
  } catch (err) {
    console.error('moderation action error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/** List actions against a target or by admin */
moderation.get('/actions', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const limit = Math.min(Number(c.req.query('limit') || 40), 100)
    const targetId = c.req.query('targetId')

    let rows
    if (targetId) {
      rows = await db.prepare(
        `SELECT * FROM moderation_actions WHERE target_id = ? ORDER BY created_at DESC LIMIT ?`
      ).bind(targetId, limit).all()
    } else {
      rows = await db.prepare(
        `SELECT * FROM moderation_actions ORDER BY created_at DESC LIMIT ?`
      ).bind(limit).all()
    }

    return c.json({ actions: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** User: file an appeal */
moderation.post('/appeals', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))

    const actionId = (body.actionId || '').toString()
    const statement = (body.statement || '').toString().trim()
    if (!actionId || !statement) return c.json({ error: 'actionId and statement required' }, 400)

    const action = await db.prepare(`SELECT * FROM moderation_actions WHERE id = ?`).bind(actionId).first()
    if (!action) return c.json({ error: 'action not found' }, 404)

    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await db.prepare(
      `INSERT INTO appeals
       (id, user_id, action_id, statement, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'pending', ?, ?)`
    ).bind(id, user.id, actionId, statement, now, now).run()

    return c.json({ appealId: id, status: 'pending', createdAt: now }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Admin: review appeal */
moderation.patch('/appeals/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const admin = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    if (!['approved', 'denied'].includes(status)) return c.json({ error: 'invalid status' }, 400)

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE appeals
       SET status = ?, reviewed_by = ?, review_notes = ?, updated_at = ?
       WHERE id = ?`
    ).bind(status, admin.id, body.notes || null, now, id).run()

    return c.json({ ok: true, id, status })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

moderation.get('/appeals', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const status = c.req.query('status') || 'pending'
    const rows = await db.prepare(
      `SELECT * FROM appeals WHERE status = ? ORDER BY created_at ASC LIMIT 50`
    ).bind(status).all()
    return c.json({ appeals: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default moderation
