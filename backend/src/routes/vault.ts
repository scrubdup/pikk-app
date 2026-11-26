import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'

/**
 * PIKK Vault — media object storage (R2 + D1 metadata)
 * Code complete ~90%. Full 100% after Worker redeploy binds VAULT_BUCKET.
 */

const vault = new Hono()

const MAX_BYTES = 100 * 1024 * 1024 // 100 MB per object (Worker body limit may be lower on free tier)

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
    meta: row.meta ? (typeof row.meta === 'string' ? JSON.parse(row.meta) : row.meta) : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function requireR2(c: any): R2Bucket | Response {
  const r2 = c.env.VAULT_BUCKET as R2Bucket | undefined
  if (!r2) {
    return c.json({
      error: 'vault_not_configured',
      message: 'R2 bucket is not bound to this Worker.',
      nextSteps: [
        'Bucket pikk-vault exists',
        '[[r2_buckets]] binding VAULT_BUCKET in wrangler.toml',
        'npx wrangler deploy',
      ],
    }, 503)
  }
  return r2
}

// Public status (auth optional)
vault.get('/status', async (c) => {
  return c.json({
    r2Ready: !!c.env.VAULT_BUCKET,
    binding: 'VAULT_BUCKET',
    bucket: 'pikk-vault',
    maxUploadBytes: MAX_BYTES,
  })
})

// Share-token download (no session required)
vault.get('/shared/:token', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const token = c.req.param('token')
    const share = await db.prepare(
      `SELECT * FROM vault_shares WHERE token = ? AND expires_at > datetime('now')`
    ).bind(token).first()
    if (!share) return c.json({ error: 'invalid or expired share link' }, 404)

    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(share.object_id).first()
    if (!row || row.status !== 'uploaded') return c.json({ error: 'object unavailable' }, 404)

    const r2OrErr = requireR2(c)
    if (r2OrErr instanceof Response) return r2OrErr
    const object = await r2OrErr.get(row.key as string)
    if (!object) return c.json({ error: 'file missing in storage' }, 404)

    const headers = new Headers()
    headers.set('Content-Type', row.content_type || 'application/octet-stream')
    if (object.size) headers.set('Content-Length', String(object.size))
    headers.set('Cache-Control', 'private, max-age=300')
    headers.set('Content-Disposition', `inline; filename="${(row.filename as string).replace(/"/g, '')}"`)
    return new Response(object.body, { status: 200, headers })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

// Everything below requires auth
vault.use('*', requireAuth)

vault.get('/usage', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const row = await db.prepare(
      `SELECT COUNT(*) as count, COALESCE(SUM(size_bytes), 0) as bytes
       FROM vault_objects WHERE user_id = ? AND status = 'uploaded'`
    ).bind(user.id).first()
    const pending = await db.prepare(
      `SELECT COUNT(*) as c FROM vault_objects WHERE user_id = ? AND status = 'pending'`
    ).bind(user.id).first()
    return c.json({
      objects: row?.count ?? 0,
      bytes: row?.bytes ?? 0,
      pending: pending?.c ?? 0,
      r2Ready: !!c.env.VAULT_BUCKET,
    })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

vault.post('/objects', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const filename = (body.filename || '').toString().trim()
    const contentType = (body.contentType || 'application/octet-stream').toString().trim()
    if (!filename) return c.json({ error: 'filename required' }, 400)
    if (body.sizeBytes && Number(body.sizeBytes) > MAX_BYTES) {
      return c.json({ error: `file exceeds max size of ${MAX_BYTES} bytes` }, 400)
    }

    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    const key = `users/${user.id}/${Date.now()}-${safeName}`
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const visibility = ['public', 'unlisted', 'private'].includes(body.visibility) ? body.visibility : 'private'

    await db.prepare(
      `INSERT INTO vault_objects
       (id, user_id, key, filename, content_type, size_bytes, status, visibility, meta, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)`
    ).bind(
      id, user.id, key, filename, contentType, body.sizeBytes ?? null, visibility,
      body.meta ? JSON.stringify(body.meta) : null, now, now
    ).run()

    const r2Ready = !!c.env.VAULT_BUCKET
    return c.json({
      object: { id, key, filename, contentType, status: 'pending', visibility },
      upload: { method: 'PUT', url: `/vault/objects/${id}/content`, headers: { 'Content-Type': contentType } },
      r2Ready,
      maxBytes: MAX_BYTES,
      message: r2Ready
        ? 'Object registered. PUT file bytes to the upload URL.'
        : 'Object registered. Redeploy Worker with R2 binding before upload works.',
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

vault.put('/objects/:id/content', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const r2OrErr = requireR2(c)
    if (r2OrErr instanceof Response) return r2OrErr
    const r2 = r2OrErr
    const user = c.get('user')
    const id = c.req.param('id')

    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)
    if (row.status === 'deleted') return c.json({ error: 'object deleted' }, 410)

    const contentType = c.req.header('content-type') || row.content_type || 'application/octet-stream'
    const body = c.req.raw.body
    if (!body) return c.json({ error: 'empty body' }, 400)

    const putResult = await r2.put(row.key as string, body, {
      httpMetadata: { contentType },
      customMetadata: { userId: String(user.id), objectId: id, filename: row.filename as string },
    })

    const sizeBytes = putResult.size ?? null
    if (sizeBytes != null && sizeBytes > MAX_BYTES) {
      try { await r2.delete(row.key as string) } catch { /* best effort */ }
      return c.json({ error: `file exceeds max size of ${MAX_BYTES} bytes` }, 400)
    }

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE vault_objects SET status = 'uploaded', content_type = ?, size_bytes = ?, updated_at = ? WHERE id = ?`
    ).bind(contentType, sizeBytes, now, id).run()

    return c.json({ ok: true, id, key: row.key, status: 'uploaded', sizeBytes, etag: putResult.httpEtag })
  } catch (err) {
    return c.json({ error: 'upload failed', detail: String(err) }, 500)
  }
})

vault.get('/objects/:id/content', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const r2OrErr = requireR2(c)
    if (r2OrErr instanceof Response) return r2OrErr
    const r2 = r2OrErr
    const user = c.get('user')
    const id = c.req.param('id')

    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    const isOwner = row.user_id === user.id
    const isAdmin = user.role === 'admin'
    const isPublic = row.visibility === 'public'
    if (!isOwner && !isAdmin && !isPublic) return c.json({ error: 'forbidden' }, 403)
    if (row.status === 'deleted') return c.json({ error: 'object deleted' }, 410)
    if (row.status !== 'uploaded') return c.json({ error: 'object not uploaded yet' }, 404)

    const object = await r2.get(row.key as string)
    if (!object) return c.json({ error: 'file missing in storage' }, 404)

    const headers = new Headers()
    headers.set('Content-Type', row.content_type || object.httpMetadata?.contentType || 'application/octet-stream')
    if (object.size) headers.set('Content-Length', String(object.size))
    headers.set('ETag', object.httpEtag)
    headers.set('Cache-Control', isPublic ? 'public, max-age=3600' : 'private, no-cache')
    headers.set('Content-Disposition', `inline; filename="${(row.filename as string).replace(/"/g, '')}"`)
    return new Response(object.body, { status: 200, headers })
  } catch (err) {
    return c.json({ error: 'download failed', detail: String(err) }, 500)
  }
})

vault.on('HEAD', '/objects/:id/content', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const r2OrErr = requireR2(c)
    if (r2OrErr instanceof Response) return r2OrErr
    const user = c.get('user')
    const id = c.req.param('id')
    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin' && row.visibility !== 'public') {
      return c.json({ error: 'forbidden' }, 403)
    }
    if (row.status !== 'uploaded') return c.json({ error: 'not uploaded' }, 404)
    const head = await r2OrErr.head(row.key as string)
    if (!head) return c.json({ error: 'missing' }, 404)
    return new Response(null, {
      status: 200,
      headers: {
        'Content-Type': row.content_type || head.httpMetadata?.contentType || 'application/octet-stream',
        'Content-Length': String(head.size || row.size_bytes || 0),
        ETag: head.httpEtag || '',
      },
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

vault.get('/objects', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)
    const status = c.req.query('status')
    let query = `SELECT * FROM vault_objects WHERE user_id = ? AND status != 'deleted'`
    const params: any[] = [user.id]
    if (status) { query += ` AND status = ?`; params.push(status) }
    query += ` ORDER BY created_at DESC LIMIT ?`
    params.push(limit)
    const rows = await db.prepare(query).bind(...params).all()
    return c.json({ objects: (rows.results || []).map(rowToObject), r2Ready: !!c.env.VAULT_BUCKET })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

vault.get('/objects/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(c.req.param('id')).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin' && row.visibility !== 'public') {
      return c.json({ error: 'forbidden' }, 403)
    }
    return c.json({ object: rowToObject(row), r2Ready: !!c.env.VAULT_BUCKET })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

vault.patch('/objects/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)

    const visibility = body.visibility && ['public', 'unlisted', 'private'].includes(body.visibility)
      ? body.visibility : null
    const filename = body.filename ? String(body.filename).trim().slice(0, 200) : null
    const meta = body.meta !== undefined ? JSON.stringify(body.meta) : null
    const now = new Date().toISOString()

    await db.prepare(
      `UPDATE vault_objects SET
         visibility = COALESCE(?, visibility),
         filename = COALESCE(?, filename),
         meta = COALESCE(?, meta),
         updated_at = ?
       WHERE id = ?`
    ).bind(visibility, filename, meta, now, id).run()

    const updated = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    return c.json({ object: rowToObject(updated) })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Create time-limited share link */
vault.post('/objects/:id/share', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const hours = Math.min(Math.max(Number(body.hours || 24), 1), 168)

    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)
    if (row.status !== 'uploaded') return c.json({ error: 'object not uploaded yet' }, 400)

    const shareId = crypto.randomUUID()
    const token = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
    const now = new Date()
    const expiresAt = new Date(now.getTime() + hours * 3600 * 1000).toISOString()

    await db.prepare(
      `INSERT INTO vault_shares (id, object_id, user_id, token, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(shareId, id, user.id, token, expiresAt, now.toISOString()).run()

    return c.json({
      shareId,
      token,
      path: `/vault/shared/${token}`,
      expiresAt,
      hours,
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

vault.delete('/objects/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)

    const r2 = c.env.VAULT_BUCKET as R2Bucket | undefined
    if (r2 && row.status === 'uploaded') {
      try { await r2.delete(row.key as string) } catch (e) { console.error('R2 delete failed', e) }
    }
    const now = new Date().toISOString()
    await db.prepare(`UPDATE vault_objects SET status = 'deleted', updated_at = ? WHERE id = ?`).bind(now, id).run()
    try {
      await db.prepare(`DELETE FROM vault_shares WHERE object_id = ?`).bind(id).run()
    } catch { /* optional */ }
    return c.json({ ok: true, id, status: 'deleted' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

vault.post('/objects/batch-delete', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const ids = Array.isArray(body.ids) ? body.ids.slice(0, 50) : []
    if (!ids.length) return c.json({ error: 'ids required' }, 400)

    const r2 = c.env.VAULT_BUCKET as R2Bucket | undefined
    const now = new Date().toISOString()
    const deleted: string[] = []

    for (const id of ids) {
      const row = await db.prepare(`SELECT * FROM vault_objects WHERE id = ?`).bind(id).first()
      if (!row || (row.user_id !== user.id && user.role !== 'admin')) continue
      if (r2 && row.status === 'uploaded') {
        try { await r2.delete(row.key as string) } catch { /* best effort */ }
      }
      await db.prepare(`UPDATE vault_objects SET status = 'deleted', updated_at = ? WHERE id = ?`).bind(now, id).run()
      deleted.push(id)
    }
    return c.json({ ok: true, deleted })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

export default vault
