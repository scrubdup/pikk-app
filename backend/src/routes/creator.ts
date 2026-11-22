import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * Creator onboarding — PIKK is a native creator platform
 */

const creator = new Hono()

creator.use('*', requireAuth)

/** Apply to become a creator */
creator.post('/apply', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')

    if (user.role === 'creator' || user.role === 'admin') {
      return c.json({ ok: true, status: 'already_creator', role: user.role })
    }

    const body = await c.req.json().catch(() => ({}))
    const pitch = (body.pitch || '').toString().trim().slice(0, 1000)
    const now = new Date().toISOString()

    const existing = await db.prepare(
      `SELECT * FROM creator_applications WHERE user_id = ?`
    ).bind(user.id).first()

    if (existing && existing.status === 'pending') {
      return c.json({ application: existing, message: 'already pending' })
    }

    if (existing) {
      await db.prepare(
        `UPDATE creator_applications
         SET status = 'pending', pitch = ?, reviewed_by = NULL, review_notes = NULL, updated_at = ?
         WHERE user_id = ?`
      ).bind(pitch || null, now, user.id).run()
    } else {
      await db.prepare(
        `INSERT INTO creator_applications (id, user_id, status, pitch, created_at, updated_at)
         VALUES (?, ?, 'pending', ?, ?, ?)`
      ).bind(crypto.randomUUID(), user.id, pitch || null, now, now).run()
    }

    const row = await db.prepare(`SELECT * FROM creator_applications WHERE user_id = ?`).bind(user.id).first()
    return c.json({ application: row }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

creator.get('/application', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const row = await db.prepare(`SELECT * FROM creator_applications WHERE user_id = ?`).bind(user.id).first()
    return c.json({ application: row || null, role: user.role })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Admin: list pending applications */
creator.get('/applications', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const status = c.req.query('status') || 'pending'
    const rows = await db.prepare(
      `SELECT a.*, u.email, u.display_name
       FROM creator_applications a
       JOIN users u ON u.id = a.user_id
       WHERE a.status = ?
       ORDER BY a.created_at ASC LIMIT 50`
    ).bind(status).all()
    return c.json({ applications: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

/** Admin: approve / reject */
creator.post('/applications/:id/review', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const admin = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const decision = body.decision
    if (!['approved', 'rejected'].includes(decision)) {
      return c.json({ error: 'decision must be approved or rejected' }, 400)
    }

    const app = await db.prepare(`SELECT * FROM creator_applications WHERE id = ?`).bind(id).first()
    if (!app) return c.json({ error: 'not found' }, 404)

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE creator_applications
       SET status = ?, reviewed_by = ?, review_notes = ?, updated_at = ?
       WHERE id = ?`
    ).bind(decision, admin.id, body.notes || null, now, id).run()

    if (decision === 'approved') {
      await db.prepare(
        `UPDATE users SET role = 'creator', updated_at = ? WHERE id = ?`
      ).bind(now, app.user_id).run()

      // Notify user
      try {
        await db.prepare(
          `INSERT INTO notifications (id, user_id, type, title, body, href, created_at)
           VALUES (?, ?, 'system', ?, ?, '/live', ?)`
        ).bind(
          crypto.randomUUID(),
          app.user_id,
          'Creator access approved',
          'You can now go live on PIKK and use creator tools.',
          now
        ).run()
      } catch { /* notifications table may lag */ }
    }

    return c.json({ ok: true, id, decision })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default creator
