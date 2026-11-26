import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * Creator merch — catalog + TEST orders (no Printful / no production gate yet)
 * Real fulfillment remains blocked until supplier + Stripe.
 */

const merch = new Hono()

merch.get('/products', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const creatorId = c.req.query('creatorId')
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)
    let query = `SELECT p.*, u.display_name as creator_name FROM merch_products p
                 LEFT JOIN users u ON u.id = p.creator_id WHERE p.status = 'active'`
    const params: any[] = []
    if (creatorId) { query += ` AND p.creator_id = ?`; params.push(Number(creatorId)) }
    query += ` ORDER BY p.created_at DESC LIMIT ?`
    params.push(limit)
    const rows = await db.prepare(query).bind(...params).all()
    return c.json({ products: rows.results || [], mode: 'TEST', fulfillment: 'not_connected' })
  } catch (err) {
    return c.json({ products: [], error: String(err) })
  }
})

merch.post('/products', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    if (user.role !== 'creator' && user.role !== 'admin') {
      return c.json({ error: 'creator role required' }, 403)
    }
    const body = await c.req.json().catch(() => ({}))
    const name = (body.name || '').toString().trim().slice(0, 120)
    const priceCents = Number(body.priceCents)
    if (!name || !priceCents || priceCents < 100) return c.json({ error: 'name and priceCents (>=100) required' }, 400)

    const costCents = Number(body.costCents || 0)
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const status = body.publish ? 'active' : 'draft'

    await db.prepare(
      `INSERT INTO merch_products
       (id, creator_id, name, description, price_cents, cost_cents, currency, status, image_url, meta, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'USD', ?, ?, ?, ?, ?)`
    ).bind(
      id, user.id, name, (body.description || '').toString().slice(0, 1000) || null,
      priceCents, costCents, status, body.imageUrl || null,
      body.meta ? JSON.stringify(body.meta) : null, now, now
    ).run()

    return c.json({
      product: { id, name, priceCents, costCents, status },
      estimatedCreatorProfitCents: Math.max(0, priceCents - costCents),
      mode: 'TEST',
      note: 'Listing only. No supplier production until Printful/Stripe connected.',
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

merch.get('/products/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const row = await db.prepare(`SELECT * FROM merch_products WHERE id = ?`).bind(c.req.param('id')).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    return c.json({ product: row, mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** TEST purchase — holds order as paid from wallet, does NOT trigger production */
merch.post('/orders', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const buyer = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const productId = (body.productId || '').toString()
    const product = await db.prepare(`SELECT * FROM merch_products WHERE id = ? AND status = 'active'`).bind(productId).first()
    if (!product) return c.json({ error: 'product not found or not active' }, 404)

    const amount = product.price_cents as number
    const wallet = await db.prepare(`SELECT * FROM wallets WHERE user_id = ?`).bind(buyer.id).first()
    if (!wallet || (wallet.balance_cents as number) < amount) {
      return c.json({ error: 'insufficient balance — deposit in TEST MODE first' }, 400)
    }

    const now = new Date().toISOString()
    const orderId = crypto.randomUUID()

    await db.prepare(`UPDATE wallets SET balance_cents = balance_cents - ?, updated_at = ? WHERE user_id = ?`)
      .bind(amount, now, buyer.id).run()
    await db.prepare(
      `INSERT INTO transactions (id, user_id, type, amount_cents, currency, status, description, related_id, created_at, updated_at)
       VALUES (?, ?, 'purchase', ?, 'USD', 'completed', ?, ?, ?, ?)`
    ).bind(crypto.randomUUID(), buyer.id, -amount, `Merch: ${product.name}`, orderId, now, now).run()

    // Status held — no auto production (no-advance rule)
    await db.prepare(
      `INSERT INTO merch_orders (id, product_id, buyer_id, creator_id, amount_cents, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'held', ?, ?)`
    ).bind(orderId, productId, buyer.id, product.creator_id, amount, now, now).run()

    return c.json({
      orderId,
      status: 'held',
      amountCents: amount,
      mode: 'TEST',
      note: 'Paid from wallet and held. No supplier production until fulfillment is connected and funds policy is enforced.',
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

merch.get('/orders', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const rows = await db.prepare(
      `SELECT * FROM merch_orders WHERE buyer_id = ? OR creator_id = ? ORDER BY created_at DESC LIMIT 50`
    ).bind(user.id, user.id).all()
    return c.json({ orders: rows.results || [], mode: 'TEST' })
  } catch (err) {
    return c.json({ orders: [], error: String(err) })
  }
})

merch.patch('/orders/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    if (!['pending', 'paid', 'held', 'fulfilled', 'cancelled', 'refunded'].includes(status)) {
      return c.json({ error: 'invalid status' }, 400)
    }
    const now = new Date().toISOString()
    await db.prepare(`UPDATE merch_orders SET status = ?, updated_at = ? WHERE id = ?`)
      .bind(status, now, c.req.param('id')).run()
    return c.json({ ok: true, id: c.req.param('id'), status, mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default merch
