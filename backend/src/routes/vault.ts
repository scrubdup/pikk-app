import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'

/**
 * PIKK Vault
 * - Object metadata is tracked in D1 (vault_objects)
 * - Actual file bytes require R2 binding
 * - Clear status at every step
 */

const vault = new Hono()

vault.use('*', requireAuth)

function notConfigured(c: any) {
  return c.json({
    error: 'vault_not_configured',
    message: 'R2 bucket is not bound yet. Metadata can still be registered.',
    nextSteps: [
      'npx wrangler r2 bucket create pikk-vault',
      'Uncomment [[r2_buckets]] in backend/wrangler.toml',
      'Redeploy',
    ],
  }, 503)
}

function rowToObject(row: any) {
  return {
    id: row.id,
    userId: row.user_id,
    key: row.key,
    filename: row.filename,
    contentType: row.content_type,
    sizeBytes: row.size_bytes,
    status: row.status,
    visibility: row.visibility,
    meta: row.meta ? JSON.parse(row.meta) : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/** Register an object (metadata only) and request upload URL */
vault.post('/upload-url', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const filename = (body.filename || '').toString().trim()
    const contentType = (body.contentType || '').toString().trim()

    if (!filename) return c.json({ error: 'filename required' }, 400)
    if (!contentType) return c.json({ error: 'contentType required' }, 400)

    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    const key = `users/${user.id}/${Date.now()}-${safeName}`
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await db.prepare(
      `INSERT INTO vault_objects
       (id, user_id, key, filename, content_type, size_bytes, status, visibility, meta, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)`
    ).bind(
      id,
      user.id,
      key,
      filename,
      contentType,
      body.size || null,
      body.visibility === 'public' || body.visibility === 'unlisted' ? body.visibility : 'private',
      body.meta ? JSON.stringify(body.meta) : null,
      now,
      now
    ).run()

    const r2 = (c.env as any).VAULT_BUCKET
    if (!r2) {
      return c.json({
        object: {
          id,
          key,
          filename,
          contentType,
          status: 'pending',
        },
        upload: null,
        error: 'vault_not_configured',
        message: 'Metadata registered. R2 is not bound — no upload URL available yet.',
        nextSteps: [
          'npx wrangler r2 bucket create pikk-vault',
          'Uncomment [[r2_buckets]] in wrangler.toml and redeploy',
        ],
      }, 503)
    }

    // Future: return signed PUT URL
    return c.json({
      object: { id, key, filename, contentType, status: 'pending' },
      upload: null,
      error: 'not_implemented',
      message: 'R2 is bound but signed URL generation is not implemented yet.',
    }, 501)
  } catch (err) {
    console.error('vault upload-url error', err)
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

/** List current user's objects */
vault.get('/objects', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)

    const rows = await db.prepare(
      `SELECT * FROM vault_objects WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`
    ).bind(user.id, limit).all()

    return c.json({
      objects: (rows.results || []).map(rowToObject),
      r2Bound: !!(c.env as any).VAULT_BUCKET,
    })
  } catch (err) {
    console.error('vault list error', err)
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

/** Get single object metadata */
vault.get('/objects/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')

    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin') {
      return c.json({ error: 'forbidden' }, 403)
    }

    return c.json({
      object: rowToObject(row),
      r2Bound: !!(c.env as any).VAULT_BUCKET,
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Mark object uploaded / update status */
vault.patch('/objects/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))

    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin') {
      return c.json({ error: 'forbidden' }, 403)
    }

    const status = body.status
    const allowed = ['pending', 'uploaded', 'failed', 'deleted']
    if (status && !allowed.includes(status)) {
      return c.json({ error: 'invalid status' }, 400)
    }

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE vault_objects
       SET status = COALESCE(?, status),
           size_bytes = COALESCE(?, size_bytes),
           visibility = COALESCE(?, visibility),
           updated_at = ?
       WHERE id = ?`
    ).bind(
      status || null,
      body.sizeBytes ?? null,
      body.visibility || null,
      now,
      id
    ).run()

    const updated = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    return c.json({ object: rowToObject(updated) })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Soft-delete object metadata */
vault.delete('/objects/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')

    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin') {
      return c.json({ error: 'forbidden' }, 403)
    }

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE vault_objects SET status = 'deleted', updated_at = ? WHERE id = ?`
    ).bind(now, id).run()

    // Real R2 delete would go here when bound
    return c.json({ ok: true, id, status: 'deleted' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default vault
