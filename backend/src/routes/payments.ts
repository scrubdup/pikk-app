import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * PIKK Payments — full TEST MODE wallet / gifts / payouts / subscriptions
 * Real Stripe/Connect is the remaining external step for 100%.
 */

const payments = new Hono()
payments.use('*', requireAuth)

const GIFT_CATALOG = [
  { id: 'rose', name: 'Rose', amountCents: 10, icon: '🌹' },
  { id: 'fire', name: 'Fire', amountCents: 50, icon: '🔥' },
  { id: 'diamond', name: 'Diamond', amountCents: 100, icon: '💎' },
  { id: 'crown', name: 'Crown', amountCents: 500, icon: '👑' },
  { id: 'rocket', name: 'Rocket', amountCents: 1000, icon: '🚀' },
  { id: 'cash_rain', name: 'Cash Rain', amountCents: 300, icon: '💵' },
]

const COIN_PACKS = [
  { id: 'pack_100', coins: 100, amountCents: 200, label: '100 coins · $2' },
  { id: 'pack_500', coins: 500, amountCents: 900, label: '500 coins · $9' },
  { id: 'pack_1200', coins: 1200, amountCents: 2000, label: '1200 coins · $20' },
  { id: 'pack_3000', coins: 3000, amountCents: 4500, label: '3000 coins · $45' },
]

const PLANS = [
  { id: 'creator_pro', name: 'Creator Pro', amountCents: 999, interval: 'month' },
  { id: 'creator_plus', name: 'Creator Plus', amountCents: 1999, interval: 'month' },
]

// Platform takes 20% of gift face value in product docs (creator net 80%)
const CREATOR_SHARE = 0.8

async function ensureWallet(db: D1Database, userId: number) {
  const existing = await db.prepare(`SELECT * FROM wallets WHERE user_id = ?`).bind(userId).first()
  if (existing) return existing
  const now = new Date().toISOString()
  await db.prepare(
    `INSERT INTO wallets (user_id, balance_cents, pending_cents, currency, updated_at) VALUES (?, 0, 0, 'USD', ?)`
  ).bind(userId, now).run()
  return db.prepare(`SELECT * FROM wallets WHERE user_id = ?`).bind(userId).first()
}

async function notify(db: D1Database, userId: number, type: string, title: string, body?: string, href?: string) {
  try {
    await db.prepare(
      `INSERT INTO notifications (id, user_id, type, title, body, href, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(crypto.randomUUID(), userId, type, title, body || null, href || null, new Date().toISOString()).run()
  } catch { /* optional */ }
}

function walletJson(w: any) {
  return {
    balanceCents: w.balance_cents,
    pendingCents: w.pending_cents,
    currency: w.currency,
    updatedAt: w.updated_at,
  }
}

payments.get('/catalog/gifts', (c) => c.json({ gifts: GIFT_CATALOG, mode: 'TEST' }))
payments.get('/catalog/packs', (c) => c.json({ packs: COIN_PACKS, mode: 'TEST' }))
payments.get('/catalog/plans', (c) => c.json({ plans: PLANS, mode: 'TEST' }))

payments.get('/wallet', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const wallet = await ensureWallet(db, user.id)
    return c.json({ wallet: walletJson(wallet), mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Combined summary for Wallet UI */
payments.get('/summary', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const wallet = await ensureWallet(db, user.id)

    const [giftIn, giftOut, deposits, payoutsPaid, purchases] = await Promise.all([
      db.prepare(`SELECT COALESCE(SUM(amount_cents),0) as s FROM transactions WHERE user_id = ? AND type = 'gift_received' AND status = 'completed'`).bind(user.id).first(),
      db.prepare(`SELECT COALESCE(SUM(ABS(amount_cents)),0) as s FROM transactions WHERE user_id = ? AND type = 'gift_sent' AND status = 'completed'`).bind(user.id).first(),
      db.prepare(`SELECT COALESCE(SUM(amount_cents),0) as s FROM transactions WHERE user_id = ? AND type = 'deposit' AND status = 'completed'`).bind(user.id).first(),
      db.prepare(`SELECT COALESCE(SUM(amount_cents),0) as s FROM payouts WHERE user_id = ? AND status = 'paid'`).bind(user.id).first(),
      db.prepare(`SELECT COALESCE(SUM(ABS(amount_cents)),0) as s FROM transactions WHERE user_id = ? AND type = 'purchase' AND status = 'completed'`).bind(user.id).first(),
    ])

    return c.json({
      wallet: walletJson(wallet),
      lifetime: {
        giftsReceivedCents: giftIn?.s ?? 0,
        giftsSentCents: giftOut?.s ?? 0,
        depositsCents: deposits?.s ?? 0,
        payoutsPaidCents: payoutsPaid?.s ?? 0,
        purchasesCents: purchases?.s ?? 0,
      },
      creatorShare: CREATOR_SHARE,
      mode: 'TEST',
    })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

/** Creator earnings view (gifts received as net 80%) */
payments.get('/earnings', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)

    const rows = await db.prepare(
      `SELECT * FROM transactions WHERE user_id = ? AND type = 'gift_received' AND status = 'completed'
       ORDER BY created_at DESC LIMIT ?`
    ).bind(user.id, limit).all()

    const total = await db.prepare(
      `SELECT COALESCE(SUM(amount_cents),0) as s FROM transactions
       WHERE user_id = ? AND type = 'gift_received' AND status = 'completed'`
    ).bind(user.id).first()

    const gross = Number(total?.s || 0)
    // Stored amount is what hit the wallet (we credit full amount in TEST; display net for product honesty)
    const net = Math.floor(gross * CREATOR_SHARE)
    const platform = gross - net

    return c.json({
      grossCents: gross,
      netCents: net,
      platformCents: platform,
      creatorShare: CREATOR_SHARE,
      recent: rows.results || [],
      mode: 'TEST',
      note: 'TEST MODE credits full gift to wallet; net/platform shown for product split preview.',
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

payments.post('/deposit', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    let amountCents = Number(body.amountCents)

    // Optional pack purchase maps to deposit amount
    if (body.packId) {
      const pack = COIN_PACKS.find((p) => p.id === body.packId)
      if (!pack) return c.json({ error: 'unknown packId' }, 400)
      amountCents = pack.amountCents
    }

    if (!amountCents || amountCents < 100 || amountCents > 1_000_000) {
      return c.json({ error: 'amountCents must be between 100 and 1000000' }, 400)
    }
    await ensureWallet(db, user.id)
    const now = new Date().toISOString()
    const txId = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO transactions (id, user_id, type, amount_cents, currency, status, description, meta, created_at, updated_at)
       VALUES (?, ?, 'deposit', ?, 'USD', 'completed', ?, ?, ?, ?)`
    ).bind(
      txId, user.id, amountCents,
      body.packId ? `TEST pack ${body.packId}` : 'TEST MODE deposit',
      body.packId ? JSON.stringify({ packId: body.packId }) : null,
      now, now
    ).run()
    await db.prepare(`UPDATE wallets SET balance_cents = balance_cents + ?, updated_at = ? WHERE user_id = ?`)
      .bind(amountCents, now, user.id).run()
    const wallet = await db.prepare(`SELECT * FROM wallets WHERE user_id = ?`).bind(user.id).first()
    return c.json({ transactionId: txId, wallet: walletJson(wallet), mode: 'TEST' }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

payments.post('/gifts', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const sender = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const recipientId = Number(body.recipientId)
    let amountCents = Number(body.amountCents)
    const catalogId = body.giftId ? String(body.giftId) : null
    if (catalogId) {
      const item = GIFT_CATALOG.find((g) => g.id === catalogId)
      if (!item) return c.json({ error: 'unknown giftId' }, 400)
      amountCents = item.amountCents
    }
    const note = (body.note || '').toString().slice(0, 200)
    if (!recipientId || recipientId === sender.id) return c.json({ error: 'valid recipientId required' }, 400)
    if (!amountCents || amountCents < 10) return c.json({ error: 'minimum gift is 10 cents' }, 400)

    const recipient = await db.prepare(`SELECT id, display_name FROM users WHERE id = ?`).bind(recipientId).first()
    if (!recipient) return c.json({ error: 'recipient not found' }, 404)

    const senderWallet = await ensureWallet(db, sender.id)
    if ((senderWallet.balance_cents as number) < amountCents) return c.json({ error: 'insufficient balance' }, 400)

    await ensureWallet(db, recipientId)
    const now = new Date().toISOString()
    const giftId = crypto.randomUUID()

    await db.prepare(`UPDATE wallets SET balance_cents = balance_cents - ?, updated_at = ? WHERE user_id = ?`)
      .bind(amountCents, now, sender.id).run()
    await db.prepare(
      `INSERT INTO transactions (id, user_id, type, amount_cents, currency, status, description, related_id, meta, created_at, updated_at)
       VALUES (?, ?, 'gift_sent', ?, 'USD', 'completed', ?, ?, ?, ?, ?)`
    ).bind(crypto.randomUUID(), sender.id, -amountCents, note || 'Gift sent', giftId, catalogId ? JSON.stringify({ giftId: catalogId }) : null, now, now).run()

    await db.prepare(`UPDATE wallets SET balance_cents = balance_cents + ?, updated_at = ? WHERE user_id = ?`)
      .bind(amountCents, now, recipientId).run()
    await db.prepare(
      `INSERT INTO transactions (id, user_id, type, amount_cents, currency, status, description, related_id, meta, created_at, updated_at)
       VALUES (?, ?, 'gift_received', ?, 'USD', 'completed', ?, ?, ?, ?, ?)`
    ).bind(crypto.randomUUID(), recipientId, amountCents, note || 'Gift received', giftId, catalogId ? JSON.stringify({ giftId: catalogId }) : null, now, now).run()

    const dollars = (amountCents / 100).toFixed(2)
    await notify(db, recipientId, 'gift', `Gift received: $${dollars}`, `${sender.displayName || 'Someone'} sent you a gift`, '/wallet')

    return c.json({
      giftId, amountCents, recipientId, catalogId,
      creatorNetCents: Math.floor(amountCents * CREATOR_SHARE),
      platformCents: amountCents - Math.floor(amountCents * CREATOR_SHARE),
      mode: 'TEST',
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

payments.post('/subscriptions', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const planId = (body.plan || body.planId || 'creator_pro').toString()
    const plan = PLANS.find((p) => p.id === planId)
    const amountCents = Number(body.amountCents || plan?.amountCents || 999)

    await ensureWallet(db, user.id)
    const wallet = await db.prepare(`SELECT * FROM wallets WHERE user_id = ?`).bind(user.id).first()
    if ((wallet.balance_cents as number) < amountCents) return c.json({ error: 'insufficient balance' }, 400)

    const now = new Date().toISOString()
    const txId = crypto.randomUUID()
    await db.prepare(`UPDATE wallets SET balance_cents = balance_cents - ?, updated_at = ? WHERE user_id = ?`)
      .bind(amountCents, now, user.id).run()
    await db.prepare(
      `INSERT INTO transactions (id, user_id, type, amount_cents, currency, status, description, meta, created_at, updated_at)
       VALUES (?, ?, 'purchase', ?, 'USD', 'completed', ?, ?, ?, ?)`
    ).bind(txId, user.id, -amountCents, `TEST subscription: ${planId}`, JSON.stringify({ plan: planId }), now, now).run()

    return c.json({
      ok: true,
      plan: planId,
      amountCents,
      transactionId: txId,
      mode: 'TEST',
      note: 'No recurring billing. Stripe later.',
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

payments.get('/transactions', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)
    const type = c.req.query('type')
    let query = `SELECT * FROM transactions WHERE user_id = ?`
    const params: any[] = [user.id]
    if (type) { query += ` AND type = ?`; params.push(type) }
    query += ` ORDER BY created_at DESC LIMIT ?`
    params.push(limit)
    const rows = await db.prepare(query).bind(...params).all()
    return c.json({ transactions: rows.results || [], mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

payments.post('/payouts', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const amountCents = Number(body.amountCents)
    if (!amountCents || amountCents < 500) return c.json({ error: 'minimum payout is 500 cents ($5.00)' }, 400)

    const wallet = await ensureWallet(db, user.id)
    if ((wallet.balance_cents as number) < amountCents) return c.json({ error: 'insufficient balance' }, 400)

    const now = new Date().toISOString()
    const payoutId = crypto.randomUUID()
    await db.prepare(
      `UPDATE wallets SET balance_cents = balance_cents - ?, pending_cents = pending_cents + ?, updated_at = ? WHERE user_id = ?`
    ).bind(amountCents, amountCents, now, user.id).run()
    await db.prepare(
      `INSERT INTO payouts (id, user_id, amount_cents, currency, status, method, destination_ref, requested_at, updated_at)
       VALUES (?, ?, ?, 'USD', 'requested', ?, ?, ?, ?)`
    ).bind(payoutId, user.id, amountCents, body.method || 'test', body.destinationRef || 'TEST', now, now).run()
    await db.prepare(
      `INSERT INTO transactions (id, user_id, type, amount_cents, currency, status, description, related_id, created_at, updated_at)
       VALUES (?, ?, 'payout', ?, 'USD', 'pending', 'TEST MODE payout request', ?, ?, ?)`
    ).bind(crypto.randomUUID(), user.id, -amountCents, payoutId, now, now).run()

    await notify(db, user.id, 'payout', 'Payout requested', `$${(amountCents / 100).toFixed(2)} payout is processing (TEST MODE)`, '/wallet')
    return c.json({ payoutId, status: 'requested', amountCents, mode: 'TEST' }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

payments.get('/payouts', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const rows = await db.prepare(`SELECT * FROM payouts WHERE user_id = ? ORDER BY requested_at DESC LIMIT 50`).bind(user.id).all()
    return c.json({ payouts: rows.results || [], mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** User cancels own requested payout */
payments.post('/payouts/:id/cancel', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const payout = await db.prepare(`SELECT * FROM payouts WHERE id = ?`).bind(id).first()
    if (!payout) return c.json({ error: 'not found' }, 404)
    if (payout.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)
    if (payout.status !== 'requested') return c.json({ error: 'only requested payouts can be cancelled' }, 400)

    const now = new Date().toISOString()
    await db.prepare(`UPDATE payouts SET status = 'cancelled', updated_at = ? WHERE id = ?`).bind(now, id).run()
    await db.prepare(
      `UPDATE wallets SET pending_cents = pending_cents - ?, balance_cents = balance_cents + ?, updated_at = ? WHERE user_id = ?`
    ).bind(payout.amount_cents, payout.amount_cents, now, payout.user_id).run()

    return c.json({ ok: true, id, status: 'cancelled', mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

payments.patch('/payouts/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    if (!['processing', 'paid', 'failed', 'cancelled'].includes(status)) return c.json({ error: 'invalid status' }, 400)

    const payout = await db.prepare(`SELECT * FROM payouts WHERE id = ?`).bind(id).first()
    if (!payout) return c.json({ error: 'not found' }, 404)
    const now = new Date().toISOString()

    await db.prepare(
      `UPDATE payouts SET status = ?, updated_at = ?, processed_at = ?, failure_reason = ? WHERE id = ?`
    ).bind(status, now, status === 'paid' || status === 'failed' ? now : null, body.failureReason || null, id).run()

    if (status === 'paid') {
      await db.prepare(`UPDATE wallets SET pending_cents = pending_cents - ?, updated_at = ? WHERE user_id = ?`)
        .bind(payout.amount_cents, now, payout.user_id).run()
      await notify(db, payout.user_id as number, 'payout', 'Payout paid', `$${(Number(payout.amount_cents) / 100).toFixed(2)} marked paid (TEST MODE)`, '/wallet')
    } else if (status === 'failed' || status === 'cancelled') {
      await db.prepare(
        `UPDATE wallets SET pending_cents = pending_cents - ?, balance_cents = balance_cents + ?, updated_at = ? WHERE user_id = ?`
      ).bind(payout.amount_cents, payout.amount_cents, now, payout.user_id).run()
      await notify(db, payout.user_id as number, 'payout', `Payout ${status}`, body.failureReason || `Payout ${status}`, '/wallet')
    }

    return c.json({ ok: true, id, status, mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Admin refund a completed transaction amount back to user wallet */
payments.post('/refunds', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const body = await c.req.json().catch(() => ({}))
    const userId = Number(body.userId)
    const amountCents = Number(body.amountCents)
    const reason = (body.reason || 'admin refund').toString().slice(0, 200)
    if (!userId || !amountCents || amountCents < 1) return c.json({ error: 'userId and amountCents required' }, 400)

    await ensureWallet(db, userId)
    const now = new Date().toISOString()
    const txId = crypto.randomUUID()
    await db.prepare(`UPDATE wallets SET balance_cents = balance_cents + ?, updated_at = ? WHERE user_id = ?`)
      .bind(amountCents, now, userId).run()
    await db.prepare(
      `INSERT INTO transactions (id, user_id, type, amount_cents, currency, status, description, related_id, created_at, updated_at)
       VALUES (?, ?, 'refund', ?, 'USD', 'completed', ?, ?, ?, ?)`
    ).bind(txId, userId, amountCents, reason, body.relatedId || null, now, now).run()

    await notify(db, userId, 'system', 'Refund issued', `$${(amountCents / 100).toFixed(2)} — ${reason}`, '/wallet')
    return c.json({ transactionId: txId, userId, amountCents, mode: 'TEST' }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default payments
