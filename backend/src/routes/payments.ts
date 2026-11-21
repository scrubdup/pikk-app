import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * Payments & Payouts – TEST MODE foundation
 * No real payment processor is connected.
 * All money movement is simulated and clearly marked.
 */

const payments = new Hono()

payments.use('*', requireAuth)

async function ensureWallet(db: D1Database, userId: number) {
  const existing = await db.prepare(`SELECT * FROM wallets WHERE user_id = ?`).bind(userId).first()
  if (existing) return existing

  const now = new Date().toISOString()
  await db.prepare(
    `INSERT INTO wallets (user_id, balance_cents, pending_cents, currency, updated_at)
     VALUES (?, 0, 0, 'USD', ?)`
  ).bind(userId, now).run()

  return db.prepare(`SELECT * FROM wallets WHERE user_id = ?`).bind(userId).first()
}

/** Get current wallet */
payments.get('/wallet', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const wallet = await ensureWallet(db, user.id)

    return c.json({
      wallet: {
        balanceCents: wallet.balance_cents,
        pendingCents: wallet.pending_cents,
        currency: wallet.currency,
        updatedAt: wallet.updated_at,
      },
      mode: 'TEST',
      note: 'No real payment processor connected. Balances are simulated.',
    })
  } catch (err) {
    console.error('wallet error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Simulate a deposit (TEST MODE only) */
payments.post('/deposit', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const amountCents = Number(body.amountCents)

    if (!amountCents || amountCents < 100 || amountCents > 1_000_000) {
      return c.json({ error: 'amountCents must be between 100 and 1000000' }, 400)
    }

    await ensureWallet(db, user.id)
    const now = new Date().toISOString()
    const txId = crypto.randomUUID()

    await db.prepare(
      `INSERT INTO transactions
       (id, user_id, type, amount_cents, currency, status, description, created_at, updated_at)
       VALUES (?, ?, 'deposit', ?, 'USD', 'completed', 'TEST MODE deposit', ?, ?)`
    ).bind(txId, user.id, amountCents, now, now).run()

    await db.prepare(
      `UPDATE wallets SET balance_cents = balance_cents + ?, updated_at = ? WHERE user_id = ?`
    ).bind(amountCents, now, user.id).run()

    const wallet = await db.prepare(`SELECT * FROM wallets WHERE user_id = ?`).bind(user.id).first()

    return c.json({
      transactionId: txId,
      wallet: {
        balanceCents: wallet.balance_cents,
        pendingCents: wallet.pending_cents,
        currency: wallet.currency,
      },
      mode: 'TEST',
      warning: 'Simulated deposit only. No real money moved.',
    }, 201)
  } catch (err) {
    console.error('deposit error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/**
 * Send a gift (TEST MODE)
 * Debits sender, credits recipient. Used by Live gifts / donations.
 */
payments.post('/gifts', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const sender = c.get('user')
    const body = await c.req.json().catch(() => ({}))

    const recipientId = Number(body.recipientId)
    const amountCents = Number(body.amountCents)
    const note = (body.note || '').toString().slice(0, 200)

    if (!recipientId || recipientId === sender.id) {
      return c.json({ error: 'valid recipientId required' }, 400)
    }
    if (!amountCents || amountCents < 10) {
      return c.json({ error: 'minimum gift is 10 cents' }, 400)
    }

    // Verify recipient exists
    const recipient = await db.prepare(`SELECT id FROM users WHERE id = ?`).bind(recipientId).first()
    if (!recipient) return c.json({ error: 'recipient not found' }, 404)

    const senderWallet = await ensureWallet(db, sender.id)
    if ((senderWallet.balance_cents as number) < amountCents) {
      return c.json({ error: 'insufficient balance' }, 400)
    }

    await ensureWallet(db, recipientId)
    const now = new Date().toISOString()
    const giftId = crypto.randomUUID()
    const debitTx = crypto.randomUUID()
    const creditTx = crypto.randomUUID()

    // Debit sender
    await db.prepare(
      `UPDATE wallets SET balance_cents = balance_cents - ?, updated_at = ? WHERE user_id = ?`
    ).bind(amountCents, now, sender.id).run()

    await db.prepare(
      `INSERT INTO transactions
       (id, user_id, type, amount_cents, currency, status, description, related_id, created_at, updated_at)
       VALUES (?, ?, 'gift_sent', ?, 'USD', 'completed', ?, ?, ?, ?)`
    ).bind(debitTx, sender.id, -amountCents, note || 'Gift sent', giftId, now, now).run()

    // Credit recipient
    await db.prepare(
      `UPDATE wallets SET balance_cents = balance_cents + ?, updated_at = ? WHERE user_id = ?`
    ).bind(amountCents, now, recipientId).run()

    await db.prepare(
      `INSERT INTO transactions
       (id, user_id, type, amount_cents, currency, status, description, related_id, created_at, updated_at)
       VALUES (?, ?, 'gift_received', ?, 'USD', 'completed', ?, ?, ?, ?)`
    ).bind(creditTx, recipientId, amountCents, note || 'Gift received', giftId, now, now).run()

    return c.json({
      giftId,
      amountCents,
      recipientId,
      mode: 'TEST',
      warning: 'Simulated gift only. No real money moved.',
    }, 201)
  } catch (err) {
    console.error('gift error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/** List transactions */
payments.get('/transactions', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)

    const rows = await db.prepare(
      `SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`
    ).bind(user.id, limit).all()

    return c.json({ transactions: rows.results || [], mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Request a payout (TEST MODE) */
payments.post('/payouts', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const amountCents = Number(body.amountCents)

    if (!amountCents || amountCents < 500) {
      return c.json({ error: 'minimum payout is 500 cents ($5.00)' }, 400)
    }

    const wallet = await ensureWallet(db, user.id)
    if ((wallet.balance_cents as number) < amountCents) {
      return c.json({ error: 'insufficient balance' }, 400)
    }

    const now = new Date().toISOString()
    const payoutId = crypto.randomUUID()
    const txId = crypto.randomUUID()

    await db.prepare(
      `UPDATE wallets
       SET balance_cents = balance_cents - ?,
           pending_cents = pending_cents + ?,
           updated_at = ?
       WHERE user_id = ?`
    ).bind(amountCents, amountCents, now, user.id).run()

    await db.prepare(
      `INSERT INTO payouts
       (id, user_id, amount_cents, currency, status, method, destination_ref, requested_at, updated_at)
       VALUES (?, ?, ?, 'USD', 'requested', ?, ?, ?, ?)`
    ).bind(payoutId, user.id, amountCents, body.method || 'test', body.destinationRef || 'TEST', now, now).run()

    await db.prepare(
      `INSERT INTO transactions
       (id, user_id, type, amount_cents, currency, status, description, related_id, created_at, updated_at)
       VALUES (?, ?, 'payout', ?, 'USD', 'pending', 'TEST MODE payout request', ?, ?, ?)`
    ).bind(txId, user.id, -amountCents, payoutId, now, now).run()

    return c.json({
      payoutId,
      status: 'requested',
      amountCents,
      mode: 'TEST',
      warning: 'Payout is simulated. No real funds will be sent.',
    }, 201)
  } catch (err) {
    console.error('payout error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

payments.get('/payouts', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')

    const rows = await db.prepare(
      `SELECT * FROM payouts WHERE user_id = ? ORDER BY requested_at DESC LIMIT 50`
    ).bind(user.id).all()

    return c.json({ payouts: rows.results || [], mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Admin: mark payout paid/failed (TEST MODE) */
payments.patch('/payouts/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    if (!['processing', 'paid', 'failed', 'cancelled'].includes(status)) {
      return c.json({ error: 'invalid status' }, 400)
    }

    const payout = await db.prepare(`SELECT * FROM payouts WHERE id = ?`).bind(id).first()
    if (!payout) return c.json({ error: 'not found' }, 404)

    const now = new Date().toISOString()

    await db.prepare(
      `UPDATE payouts SET status = ?, updated_at = ?, processed_at = ?, failure_reason = ? WHERE id = ?`
    ).bind(status, now, status === 'paid' || status === 'failed' ? now : null, body.failureReason || null, id).run()

    if (status === 'paid') {
      await db.prepare(
        `UPDATE wallets SET pending_cents = pending_cents - ?, updated_at = ? WHERE user_id = ?`
      ).bind(payout.amount_cents, now, payout.user_id).run()
    } else if (status === 'failed' || status === 'cancelled') {
      await db.prepare(
        `UPDATE wallets
         SET pending_cents = pending_cents - ?,
             balance_cents = balance_cents + ?,
             updated_at = ?
         WHERE user_id = ?`
      ).bind(payout.amount_cents, payout.amount_cents, now, payout.user_id).run()
    }

    return c.json({ ok: true, id, status, mode: 'TEST' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default payments
