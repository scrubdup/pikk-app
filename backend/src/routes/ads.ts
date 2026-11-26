import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * Ad campaign intake — control plane only
 * No ad serving, no demand partner, no impression tracking yet.
 */

const ads = new Hono()

ads.get('/campaigns', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const status = c.req.query('status')
    let query = `SELECT * FROM ad_campaigns`
    const params: any[] = []
    if (user.role !== 'admin') {
      query += ` WHERE created_by = ?`
      params.push(user.id)
    } else if (status) {
      query += ` WHERE status = ?`
      params.push(status)
    }
    query += ` ORDER BY created_at DESC LIMIT 50`
    const rows = await db.prepare(query).bind(...params).all()
    return c.json({
      campaigns: rows.results || [],
      serving: false,
      note: 'Intake only. No ad server or demand partner connected.',
    })
  } catch (err) {
    return c.json({ campaigns: [], error: String(err) })
  }
})

ads.post('/campaigns', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const title = (body.title || '').toString().trim().slice(0, 120)
    const advertiserName = (body.advertiserName || body.advertiser_name || '').toString().trim().slice(0, 120)
    if (!title || !advertiserName) return c.json({ error: 'title and advertiserName required' }, 400)

    const placement = ['feed', 'banner', 'live_corner'].includes(body.placement) ? body.placement : 'feed'
    const budgetCents = Number(body.budgetCents || 0)
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const status = body.submit ? 'submitted' : 'draft'

    await db.prepare(
      `INSERT INTO ad_campaigns
       (id, advertiser_name, contact_email, title, placement, budget_cents, status,
        creative_url, target_url, notes, created_by, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, advertiserName, body.contactEmail || null, title, placement, budgetCents, status,
      body.creativeUrl || null, body.targetUrl || null, body.notes || null, user.id, now, now
    ).run()

    return c.json({
      campaign: { id, title, advertiserName, placement, budgetCents, status },
      serving: false,
      note: 'Saved. Admin must approve. No impressions until ad server is connected.',
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

ads.patch('/campaigns/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    if (!['draft', 'submitted', 'approved', 'active', 'paused', 'rejected', 'completed'].includes(status)) {
      return c.json({ error: 'invalid status' }, 400)
    }
    // Never claim active serving without an ad server
    if (status === 'active') {
      return c.json({
        error: 'cannot_activate_serving',
        message: 'Ad server not connected. Use approved/paused/rejected until serving exists.',
      }, 501)
    }
    const now = new Date().toISOString()
    await db.prepare(`UPDATE ad_campaigns SET status = ?, updated_at = ? WHERE id = ?`)
      .bind(status, now, c.req.param('id')).run()
    return c.json({ ok: true, id: c.req.param('id'), status })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default ads
