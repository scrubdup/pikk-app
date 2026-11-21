import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * PIKK Supervisor – job queue + simple runners
 */

const supervisor = new Hono()

supervisor.use('*', requireAuth, requireAdmin)

const JOB_TYPES = [
  'health_check',
  'retry_destination',
  'review_flag',
  'payout_process',
  'cleanup_sessions',
  'other',
]

/** Enqueue a job */
supervisor.post('/jobs', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const body = await c.req.json().catch(() => ({}))

    const type = (body.type || '').toString()
    if (!JOB_TYPES.includes(type)) return c.json({ error: 'invalid job type' }, 400)

    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const priority = Number(body.priority ?? 50)

    await db.prepare(
      `INSERT INTO supervisor_jobs
       (id, type, status, priority, payload, attempts, max_attempts, created_at, updated_at)
       VALUES (?, ?, 'queued', ?, ?, 0, ?, ?, ?)`
    ).bind(
      id,
      type,
      priority,
      body.payload ? JSON.stringify(body.payload) : null,
      body.maxAttempts || 3,
      now,
      now
    ).run()

    return c.json({ jobId: id, status: 'queued', type, createdAt: now }, 201)
  } catch (err) {
    console.error('enqueue job error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/** List jobs */
supervisor.get('/jobs', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const status = c.req.query('status')
    const limit = Math.min(Number(c.req.query('limit') || 40), 100)

    let rows
    if (status) {
      rows = await db.prepare(
        `SELECT * FROM supervisor_jobs WHERE status = ? ORDER BY priority ASC, created_at ASC LIMIT ?`
      ).bind(status, limit).all()
    } else {
      rows = await db.prepare(
        `SELECT * FROM supervisor_jobs ORDER BY created_at DESC LIMIT ?`
      ).bind(limit).all()
    }

    return c.json({ jobs: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Claim next job */
supervisor.post('/jobs/claim', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const job = await db.prepare(
      `SELECT * FROM supervisor_jobs
       WHERE status = 'queued' AND attempts < max_attempts
       ORDER BY priority ASC, created_at ASC
       LIMIT 1`
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

/** Complete or fail a job */
supervisor.post('/jobs/:id/complete', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const success = body.success !== false
    const now = new Date().toISOString()

    await db.prepare(
      `UPDATE supervisor_jobs
       SET status = ?, result = ?, finished_at = ?, updated_at = ?
       WHERE id = ?`
    ).bind(
      success ? 'succeeded' : 'failed',
      body.result ? JSON.stringify(body.result) : null,
      now,
      now,
      id
    ).run()

    return c.json({ ok: true, id, status: success ? 'succeeded' : 'failed' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/**
 * Run a simple job type immediately (synchronous helper)
 * Useful for cleanup_sessions and health_check without a separate worker.
 */
supervisor.post('/run', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const body = await c.req.json().catch(() => ({}))
    const type = (body.type || '').toString()

    const now = new Date().toISOString()
    const jobId = crypto.randomUUID()

    // Record the job as running
    await db.prepare(
      `INSERT INTO supervisor_jobs
       (id, type, status, priority, payload, attempts, max_attempts, created_at, updated_at, started_at)
       VALUES (?, ?, 'running', 10, ?, 1, 1, ?, ?, ?)`
    ).bind(jobId, type, body.payload ? JSON.stringify(body.payload) : null, now, now, now).run()

    let result: any = {}
    let success = true

    if (type === 'cleanup_sessions') {
      const before = await db.prepare(`SELECT COUNT(*) as c FROM sessions`).first()
      await db.prepare(`DELETE FROM sessions WHERE expires_at <= datetime('now')`).run()
      const after = await db.prepare(`SELECT COUNT(*) as c FROM sessions`).first()
      result = {
        sessionsBefore: before?.c ?? 0,
        sessionsAfter: after?.c ?? 0,
        cleaned: Number(before?.c || 0) - Number(after?.c || 0),
      }
    } else if (type === 'health_check') {
      const users = await db.prepare(`SELECT COUNT(*) as c FROM users`).first()
      const live = await db.prepare(`SELECT COUNT(*) as c FROM broadcast_sessions WHERE status = 'live'`).first().catch(() => ({ c: 0 }))
      const openFlags = await db.prepare(`SELECT COUNT(*) as c FROM shield_flags WHERE status = 'open'`).first().catch(() => ({ c: 0 }))
      result = {
        users: users?.c ?? 0,
        liveBroadcasts: live?.c ?? 0,
        openFlags: openFlags?.c ?? 0,
        checkedAt: now,
      }
    } else if (type === 'review_flag') {
      const open = await db.prepare(
        `SELECT id, reason, severity, created_at FROM shield_flags WHERE status = 'open' ORDER BY created_at ASC LIMIT 10`
      ).all().catch(() => ({ results: [] }))
      result = { openFlags: open.results || [], note: 'Review list only — no auto-action taken' }
    } else {
      success = false
      result = { error: 'unsupported immediate run type', supported: ['cleanup_sessions', 'health_check', 'review_flag'] }
    }

    await db.prepare(
      `UPDATE supervisor_jobs
       SET status = ?, result = ?, finished_at = ?, updated_at = ?
       WHERE id = ?`
    ).bind(success ? 'succeeded' : 'failed', JSON.stringify(result), now, now, jobId).run()

    return c.json({ jobId, type, success, result })
  } catch (err) {
    console.error('supervisor run error', err)
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

export default supervisor
