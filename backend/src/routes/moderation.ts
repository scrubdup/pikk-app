import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * Trust & Safety — enforce actions, appeals, user status
 */

const moderation = new Hono()
moderation.use('*', requireAuth)

const ACTIONS = ['warn', 'restrict', 'suspend', 'ban', 'remove_content', 'restore'] as const

async function notify(db: D1Database, userId: number, title: string, body: string) {
  try {
    await db.prepare(
      `INSERT INTO notifications (id, user_id, type, title, body, href, created_at)
       VALUES (?, ?, 'moderation', ?, ?, '/support', ?)`
    ).bind(crypto.randomUUID(), userId, title, body, new Date().toISOString()).run()
  } catch { /* optional */ }
}

async function enforceOnUser(db: D1Database, targetUserId: number, action: string, durationHours: number | null) {
  const now = new Date().toISOString()
  if (action === 'ban') {
    await db.prepare(`UPDATE users SET banned_at = ?, updated_at = ? WHERE id = ?`).bind(now, now, targetUserId).run()
  } else if (action === 'suspend') {
    const until = durationHours
      ? new Date(Date.now() + durationHours * 3600 * 1000).toISOString()
      : new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString()
    await db.prepare(`UPDATE users SET suspended_until = ?, updated_at = ? WHERE id = ?`).bind(until, now, targetUserId).run()
  } else if (action === 'restrict') {
    const until = durationHours
      ? new Date(Date.now() + durationHours * 3600 * 1000).toISOString()
      : new Date(Date.now() + 24 * 3600 * 1000).toISOString()
    await db.prepare(`UPDATE users SET muted_until = ?, updated_at = ? WHERE id = ?`).bind(until, now, targetUserId).run()
  } else if (action === 'restore') {
    await db.prepare(
      `UPDATE users SET banned_at = NULL, suspended_until = NULL, muted_until = NULL, updated_at = ? WHERE id = ?`
    ).bind(now, targetUserId).run()
  }
}

/** Admin: perform moderation action (+ enforce on user when target is user) */
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
    if (!ACTIONS.includes(action as any)) return c.json({ error: 'invalid action', allowed: ACTIONS }, 400)

    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const durationHours = body.durationHours != null ? Number(body.durationHours) : null
    const expiresAt = durationHours
      ? new Date(Date.now() + durationHours * 3600 * 1000).toISOString()
      : null

    await db.prepare(
      `INSERT INTO moderation_actions
       (id, target_type, target_id, action, reason, duration_hours, performed_by, related_flag_id, created_at, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, targetType, targetId, action, body.reason || null, durationHours,
      admin.id, body.relatedFlagId || null, now, expiresAt
    ).run()

    if (targetType === 'user') {
      const uid = Number(targetId)
      if (uid) {
        try {
          await enforceOnUser(db, uid, action, durationHours)
          await notify(
            db,
            uid,
            `Account action: ${action}`,
            body.reason || `A moderator applied "${action}" to your account.`
          )
        } catch (e) {
          console.error('enforce failed', e)
        }
      }
    }

    // Close related flag if provided
    if (body.relatedFlagId) {
      try {
        await db.prepare(
          `UPDATE shield_flags SET status = 'resolved', resolved_at = ?, resolved_by = ?, updated_at = ? WHERE id = ?`
        ).bind(now, admin.id, now, body.relatedFlagId).run()
      } catch { /* optional */ }
    }

    const incidentId = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO incidents
       (id, source, severity, title, details, status, related_id, created_at, updated_at)
       VALUES (?, 'system', 'high', ?, ?, 'open', ?, ?, ?)`
    ).bind(incidentId, `Moderation: ${action} on ${targetType}`, body.reason || null, id, now, now).run()

    return c.json({ actionId: id, incidentId, createdAt: now }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

/** Resolve flag + action in one step */
moderation.post('/resolve-flag', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const admin = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const flagId = (body.flagId || '').toString()
    const action = (body.action || 'warn').toString()
    if (!flagId) return c.json({ error: 'flagId required' }, 400)
    if (!ACTIONS.includes(action as any)) return c.json({ error: 'invalid action' }, 400)

    const flag = await db.prepare(`SELECT * FROM shield_flags WHERE id = ?`).bind(flagId).first()
    if (!flag) return c.json({ error: 'flag not found' }, 404)

    const now = new Date().toISOString()
    const actionId = crypto.randomUUID()
    const durationHours = body.durationHours != null ? Number(body.durationHours) : null
    const expiresAt = durationHours
      ? new Date(Date.now() + durationHours * 3600 * 1000).toISOString()
      : null

    await db.prepare(
      `INSERT INTO moderation_actions
       (id, target_type, target_id, action, reason, duration_hours, performed_by, related_flag_id, created_at, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      actionId, flag.target_type, flag.target_id, action,
      body.reason || flag.reason, durationHours, admin.id, flagId, now, expiresAt
    ).run()

    if (flag.target_type === 'user') {
      const uid = Number(flag.target_id)
      if (uid) await enforceOnUser(db, uid, action, durationHours)
    }

    await db.prepare(
      `UPDATE shield_flags SET status = 'resolved', resolved_at = ?, resolved_by = ?, updated_at = ? WHERE id = ?`
    ).bind(now, admin.id, now, flagId).run()

    return c.json({ ok: true, flagId, actionId, action })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

moderation.get('/actions', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const limit = Math.min(Number(c.req.query('limit') || 40), 100)
    const targetId = c.req.query('targetId')
    const rows = targetId
      ? await db.prepare(`SELECT * FROM moderation_actions WHERE target_id = ? ORDER BY created_at DESC LIMIT ?`).bind(targetId, limit).all()
      : await db.prepare(`SELECT * FROM moderation_actions ORDER BY created_at DESC LIMIT ?`).bind(limit).all()
    return c.json({ actions: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Current user's enforcement status */
moderation.get('/me/status', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const row = await db.prepare(
      `SELECT id, banned_at, suspended_until, muted_until FROM users WHERE id = ?`
    ).bind(user.id).first()

    const now = Date.now()
    const banned = !!row?.banned_at
    const suspended = row?.suspended_until ? new Date(row.suspended_until as string).getTime() > now : false
    const muted = row?.muted_until ? new Date(row.muted_until as string).getTime() > now : false

    const actions = await db.prepare(
      `SELECT id, action, reason, created_at, expires_at FROM moderation_actions
       WHERE target_type = 'user' AND target_id = ? ORDER BY created_at DESC LIMIT 10`
    ).bind(String(user.id)).all().catch(() => ({ results: [] }))

    return c.json({
      status: {
        banned,
        suspended,
        muted,
        bannedAt: row?.banned_at || null,
        suspendedUntil: row?.suspended_until || null,
        mutedUntil: row?.muted_until || null,
        canPost: !banned && !suspended && !muted,
        canGoLive: !banned && !suspended,
      },
      recentActions: actions.results || [],
    })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

moderation.post('/appeals', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const actionId = (body.actionId || '').toString()
    const statement = (body.statement || '').toString().trim()
    if (!actionId || !statement) return c.json({ error: 'actionId and statement required' }, 400)
    if (statement.length < 10) return c.json({ error: 'statement too short' }, 400)

    const action = await db.prepare(`SELECT * FROM moderation_actions WHERE id = ?`).bind(actionId).first()
    if (!action) return c.json({ error: 'action not found' }, 404)

    const existing = await db.prepare(
      `SELECT id FROM appeals WHERE action_id = ? AND user_id = ? AND status = 'pending'`
    ).bind(actionId, user.id).first()
    if (existing) return c.json({ error: 'appeal already pending', appealId: existing.id }, 409)

    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    await db.prepare(
      `INSERT INTO appeals (id, user_id, action_id, statement, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'pending', ?, ?)`
    ).bind(id, user.id, actionId, statement, now, now).run()

    return c.json({ appealId: id, status: 'pending', createdAt: now }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

moderation.get('/appeals/mine', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const rows = await db.prepare(
      `SELECT * FROM appeals WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`
    ).bind(user.id).all()
    return c.json({ appeals: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

moderation.patch('/appeals/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const admin = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    if (!['approved', 'denied'].includes(status)) return c.json({ error: 'invalid status' }, 400)

    const appeal = await db.prepare(`SELECT * FROM appeals WHERE id = ?`).bind(id).first()
    if (!appeal) return c.json({ error: 'not found' }, 404)

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE appeals SET status = ?, reviewed_by = ?, review_notes = ?, updated_at = ? WHERE id = ?`
    ).bind(status, admin.id, body.notes || null, now, id).run()

    if (status === 'approved') {
      // Restore user if action was against user
      const action = await db.prepare(`SELECT * FROM moderation_actions WHERE id = ?`).bind(appeal.action_id).first()
      if (action && action.target_type === 'user') {
        const uid = Number(action.target_id)
        if (uid) await enforceOnUser(db, uid, 'restore', null)
      }
      await notify(db, appeal.user_id as number, 'Appeal approved', body.notes || 'Your appeal was approved.')
    } else {
      await notify(db, appeal.user_id as number, 'Appeal denied', body.notes || 'Your appeal was denied.')
    }

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
