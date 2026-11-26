import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * PIKK Supervisor — job queue + real handlers
 * process_next claims, runs, and completes a job in one call (cron-friendly).
 */

const supervisor = new Hono()

supervisor.use('*', requireAuth, requireAdmin)

const JOB_TYPES = [
  'health_check',
  'retry_destination',
  'review_flag',
  'payout_process',
  'cleanup_sessions',
  'expire_restrictions',
  'requeue_stale',
  'other',
] as const

async function runHandler(db: D1Database, type: string, payload: any): Promise<{ success: boolean; result: any }> {
  const now = new Date().toISOString()

  if (type === 'cleanup_sessions') {
    const before = await db.prepare(`SELECT COUNT(*) as c FROM sessions`).first()
    await db.prepare(`DELETE FROM sessions WHERE expires_at <= datetime('now')`).run()
    const after = await db.prepare(`SELECT COUNT(*) as c FROM sessions`).first()
    return {
      success: true,
      result: {
        sessionsBefore: before?.c ?? 0,
        sessionsAfter: after?.c ?? 0,
        cleaned: Number(before?.c || 0) - Number(after?.c || 0),
      },
    }
  }

  if (type === 'health_check') {
    const [users, live, openFlags, openTickets, queuedJobs, pendingPayouts] = await Promise.all([
      db.prepare(`SELECT COUNT(*) as c FROM users`).first(),
      db.prepare(`SELECT COUNT(*) as c FROM broadcast_sessions WHERE status = 'live'`).first().catch(() => ({ c: 0 })),
      db.prepare(`SELECT COUNT(*) as c FROM shield_flags WHERE status = 'open'`).first().catch(() => ({ c: 0 })),
      db.prepare(`SELECT COUNT(*) as c FROM support_tickets WHERE status IN ('open','pending')`).first().catch(() => ({ c: 0 })),
      db.prepare(`SELECT COUNT(*) as c FROM supervisor_jobs WHERE status = 'queued'`).first().catch(() => ({ c: 0 })),
      db.prepare(`SELECT COUNT(*) as c FROM payouts WHERE status IN ('requested','processing')`).first().catch(() => ({ c: 0 })),
    ])
    return {
      success: true,
      result: {
        users: users?.c ?? 0,
        liveBroadcasts: live?.c ?? 0,
        openFlags: openFlags?.c ?? 0,
        openTickets: openTickets?.c ?? 0,
        queuedJobs: queuedJobs?.c ?? 0,
        pendingPayouts: pendingPayouts?.c ?? 0,
        checkedAt: now,
        healthy: true,
      },
    }
  }

  if (type === 'review_flag') {
    const flagId = payload?.flagId
    if (flagId) {
      const flag = await db.prepare(`SELECT * FROM shield_flags WHERE id = ?`).bind(flagId).first()
      if (!flag) return { success: false, result: { error: 'flag not found', flagId } }
      if (flag.status === 'open') {
        await db.prepare(
          `UPDATE shield_flags SET status = 'reviewing', updated_at = ? WHERE id = ?`
        ).bind(now, flagId).run()
      }
      return {
        success: true,
        result: {
          flagId,
          reason: flag.reason,
          severity: flag.severity,
          status: 'reviewing',
          note: flag.severity === 'critical'
            ? 'Critical flag marked reviewing — human required before auto-action'
            : 'Flag moved to reviewing',
        },
      }
    }
    const open = await db.prepare(
      `SELECT id, reason, severity, target_type, target_id, created_at
       FROM shield_flags WHERE status = 'open'
       ORDER BY CASE severity WHEN 'critical' THEN 0 WHEN 'high' THEN 1 ELSE 2 END, created_at ASC
       LIMIT 20`
    ).all()
    return {
      success: true,
      result: { openFlags: open.results || [], note: 'Queue snapshot — no auto-action on bulk list' },
    }
  }

  if (type === 'retry_destination') {
    const sessionId = payload?.sessionId
    const provider = payload?.provider
    if (!sessionId || !provider) {
      return { success: false, result: { error: 'payload.sessionId and payload.provider required' } }
    }
    const relay = await db.prepare(
      `SELECT * FROM broadcast_relays WHERE session_id = ? AND provider = ?`
    ).bind(sessionId, provider).first()
    if (!relay) return { success: false, result: { error: 'relay not found' } }

    await db.prepare(
      `UPDATE broadcast_relays
       SET status = 'connecting', last_error = NULL, updated_at = ?
       WHERE session_id = ? AND provider = ?`
    ).bind(now, sessionId, provider).run()

    // Without a media worker we cannot actually republish — mark honestly
    return {
      success: true,
      result: {
        sessionId,
        provider,
        status: 'connecting',
        note: 'Relay reset to connecting. Actual RTMP/WHIP republish requires media worker.',
      },
    }
  }

  if (type === 'payout_process') {
    const payoutId = payload?.payoutId
    if (payoutId) {
      const payout = await db.prepare(`SELECT * FROM payouts WHERE id = ?`).bind(payoutId).first()
      if (!payout) return { success: false, result: { error: 'payout not found' } }
      if (payout.status !== 'requested' && payout.status !== 'processing') {
        return { success: false, result: { error: 'payout not in processable state', status: payout.status } }
      }
      await db.prepare(
        `UPDATE payouts SET status = 'processing', updated_at = ? WHERE id = ?`
      ).bind(now, payoutId).run()
      // TEST MODE: auto-mark paid after "processing"
      await db.prepare(
        `UPDATE payouts SET status = 'paid', processed_at = ?, updated_at = ? WHERE id = ?`
      ).bind(now, now, payoutId).run()
      await db.prepare(
        `UPDATE wallets SET pending_cents = pending_cents - ?, updated_at = ? WHERE user_id = ?`
      ).bind(payout.amount_cents, now, payout.user_id).run()
      try {
        await db.prepare(
          `INSERT INTO notifications (id, user_id, type, title, body, href, created_at)
           VALUES (?, ?, 'payout', ?, ?, '/wallet', ?)`
        ).bind(
          crypto.randomUUID(),
          payout.user_id,
          'Payout completed',
          `$${(Number(payout.amount_cents) / 100).toFixed(2)} marked paid (TEST MODE)`,
          now
        ).run()
      } catch { /* optional */ }
      return {
        success: true,
        result: { payoutId, status: 'paid', mode: 'TEST', amountCents: payout.amount_cents },
      }
    }
    // Batch: process up to 10 requested payouts
    const batch = await db.prepare(
      `SELECT id FROM payouts WHERE status = 'requested' ORDER BY requested_at ASC LIMIT 10`
    ).all()
    const processed: string[] = []
    for (const row of batch.results || []) {
      const r = await runHandler(db, 'payout_process', { payoutId: row.id })
      if (r.success) processed.push(row.id as string)
    }
    return { success: true, result: { processed, count: processed.length, mode: 'TEST' } }
  }

  if (type === 'expire_restrictions') {
    const muted = await db.prepare(
      `UPDATE users SET muted_until = NULL, updated_at = ?
       WHERE muted_until IS NOT NULL AND muted_until <= ?`
    ).bind(now, now).run()
    const suspended = await db.prepare(
      `UPDATE users SET suspended_until = NULL, updated_at = ?
       WHERE suspended_until IS NOT NULL AND suspended_until <= ?`
    ).bind(now, now).run()
    return {
      success: true,
      result: {
        unmuted: muted.meta?.changes ?? 0,
        unsuspended: suspended.meta?.changes ?? 0,
        at: now,
      },
    }
  }

  if (type === 'requeue_stale') {
    // Jobs stuck in running for > 30 minutes → failed or requeued
    const stale = await db.prepare(
      `SELECT id, attempts, max_attempts FROM supervisor_jobs
       WHERE status = 'running' AND started_at < datetime('now', '-30 minutes')
       LIMIT 50`
    ).all()
    let requeued = 0
    let failed = 0
    for (const j of stale.results || []) {
      if ((j.attempts as number) < (j.max_attempts as number)) {
        await db.prepare(
          `UPDATE supervisor_jobs SET status = 'queued', updated_at = ? WHERE id = ?`
        ).bind(now, j.id).run()
        requeued++
      } else {
        await db.prepare(
          `UPDATE supervisor_jobs
           SET status = 'failed', result = ?, finished_at = ?, updated_at = ?
           WHERE id = ?`
        ).bind(JSON.stringify({ error: 'stale running job timed out' }), now, now, j.id).run()
        failed++
      }
    }
    return { success: true, result: { requeued, failed, scanned: (stale.results || []).length } }
  }

  return {
    success: false,
    result: { error: 'unsupported job type', type, supported: JOB_TYPES },
  }
}

/** Enqueue */
supervisor.post('/jobs', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const body = await c.req.json().catch(() => ({}))
    const type = (body.type || '').toString()
    if (!JOB_TYPES.includes(type as any)) return c.json({ error: 'invalid job type', allowed: JOB_TYPES }, 400)

    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    await db.prepare(
      `INSERT INTO supervisor_jobs
       (id, type, status, priority, payload, attempts, max_attempts, created_at, updated_at)
       VALUES (?, ?, 'queued', ?, ?, 0, ?, ?, ?)`
    ).bind(
      id, type, Number(body.priority ?? 50),
      body.payload ? JSON.stringify(body.payload) : null,
      body.maxAttempts || 3, now, now
    ).run()

    return c.json({ jobId: id, status: 'queued', type, createdAt: now }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

supervisor.get('/jobs', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const status = c.req.query('status')
    const limit = Math.min(Number(c.req.query('limit') || 40), 100)
    const rows = status
      ? await db.prepare(
          `SELECT * FROM supervisor_jobs WHERE status = ? ORDER BY priority ASC, created_at ASC LIMIT ?`
        ).bind(status, limit).all()
      : await db.prepare(
          `SELECT * FROM supervisor_jobs ORDER BY created_at DESC LIMIT ?`
        ).bind(limit).all()
    return c.json({ jobs: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

supervisor.get('/stats', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const counts = await db.prepare(
      `SELECT status, COUNT(*) as c FROM supervisor_jobs GROUP BY status`
    ).all()
    const byType = await db.prepare(
      `SELECT type, status, COUNT(*) as c FROM supervisor_jobs GROUP BY type, status`
    ).all()
    return c.json({
      byStatus: Object.fromEntries((counts.results || []).map((r: any) => [r.status, r.c])),
      byType: byType.results || [],
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

supervisor.post('/jobs/claim', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const job = await db.prepare(
      `SELECT * FROM supervisor_jobs
       WHERE status = 'queued' AND attempts < max_attempts
       ORDER BY priority ASC, created_at ASC LIMIT 1`
    ).first()
    if (!job) return c.json({ job: null, message: 'no jobs available' })

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE supervisor_jobs
       SET status = 'running', attempts = attempts + 1, started_at = ?, updated_at = ?
       WHERE id = ?`
    ).bind(now, now, job.id).run()

    return c.json({
      job: {
        id: job.id,
        type: job.type,
        payload: job.payload ? JSON.parse(job.payload as string) : null,
        attempts: (job.attempts as number) + 1,
      },
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

supervisor.post('/jobs/:id/complete', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const success = body.success !== false
    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE supervisor_jobs SET status = ?, result = ?, finished_at = ?, updated_at = ? WHERE id = ?`
    ).bind(
      success ? 'succeeded' : 'failed',
      body.result ? JSON.stringify(body.result) : null,
      now, now, id
    ).run()
    return c.json({ ok: true, id, status: success ? 'succeeded' : 'failed' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Claim + execute + complete one job (cron / external worker) */
supervisor.post('/process_next', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const job = await db.prepare(
      `SELECT * FROM supervisor_jobs
       WHERE status = 'queued' AND attempts < max_attempts
       ORDER BY priority ASC, created_at ASC LIMIT 1`
    ).first()

    if (!job) return c.json({ job: null, message: 'queue empty' })

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE supervisor_jobs
       SET status = 'running', attempts = attempts + 1, started_at = ?, updated_at = ?
       WHERE id = ?`
    ).bind(now, now, job.id).run()

    const payload = job.payload ? JSON.parse(job.payload as string) : null
    const { success, result } = await runHandler(db, job.type as string, payload)

    const finished = new Date().toISOString()
    await db.prepare(
      `UPDATE supervisor_jobs SET status = ?, result = ?, finished_at = ?, updated_at = ? WHERE id = ?`
    ).bind(success ? 'succeeded' : 'failed', JSON.stringify(result), finished, finished, job.id).run()

    return c.json({
      jobId: job.id,
      type: job.type,
      success,
      result,
    })
  } catch (err) {
    console.error('process_next error', err)
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

/** Drain up to N jobs */
supervisor.post('/drain', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const body = await c.req.json().catch(() => ({}))
    const max = Math.min(Number(body.max || 10), 25)
    const results: any[] = []

    for (let i = 0; i < max; i++) {
      const job = await db.prepare(
        `SELECT * FROM supervisor_jobs
         WHERE status = 'queued' AND attempts < max_attempts
         ORDER BY priority ASC, created_at ASC LIMIT 1`
      ).first()
      if (!job) break

      const now = new Date().toISOString()
      await db.prepare(
        `UPDATE supervisor_jobs
         SET status = 'running', attempts = attempts + 1, started_at = ?, updated_at = ?
         WHERE id = ?`
      ).bind(now, now, job.id).run()

      const payload = job.payload ? JSON.parse(job.payload as string) : null
      const { success, result } = await runHandler(db, job.type as string, payload)
      const finished = new Date().toISOString()
      await db.prepare(
        `UPDATE supervisor_jobs SET status = ?, result = ?, finished_at = ?, updated_at = ? WHERE id = ?`
      ).bind(success ? 'succeeded' : 'failed', JSON.stringify(result), finished, finished, job.id).run()

      results.push({ jobId: job.id, type: job.type, success })
    }

    return c.json({ processed: results.length, results })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

/** Immediate run (no queue) */
supervisor.post('/run', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const body = await c.req.json().catch(() => ({}))
    const type = (body.type || '').toString()
    if (!JOB_TYPES.includes(type as any)) {
      return c.json({ error: 'invalid type', allowed: JOB_TYPES }, 400)
    }

    const now = new Date().toISOString()
    const jobId = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO supervisor_jobs
       (id, type, status, priority, payload, attempts, max_attempts, created_at, updated_at, started_at)
       VALUES (?, ?, 'running', 10, ?, 1, 1, ?, ?, ?)`
    ).bind(jobId, type, body.payload ? JSON.stringify(body.payload) : null, now, now, now).run()

    const { success, result } = await runHandler(db, type, body.payload || null)
    const finished = new Date().toISOString()
    await db.prepare(
      `UPDATE supervisor_jobs SET status = ?, result = ?, finished_at = ?, updated_at = ? WHERE id = ?`
    ).bind(success ? 'succeeded' : 'failed', JSON.stringify(result), finished, finished, jobId).run()

    return c.json({ jobId, type, success, result })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

export default supervisor
