import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'

/**
 * Vault – media storage foundations
 * R2 binding must be added before any real uploads work.
 * Endpoints return clear, structured responses while unconfigured.
 */

const vault = new Hono()

vault.use('*', requireAuth)

function notConfigured(c: any) {
  return c.json({
    error: 'vault_not_configured',
    message: 'R2 bucket is not bound yet.',
    nextSteps: [
      'npx wrangler r2 bucket create pikk-vault',
      'Uncomment the [[r2_buckets]] block in backend/wrangler.toml',
      'Set binding = "VAULT_BUCKET" and bucket_name = "pikk-vault"',
      'Redeploy the worker',
    ],
  }, 503)
}

/**
 * POST /vault/upload-url
 * Request a signed upload URL for a new object.
 */
vault.post('/upload-url', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { filename, contentType, size } = body

  if (!filename || typeof filename !== 'string') {
    return c.json({ error: 'filename required' }, 400)
  }
  if (!contentType || typeof contentType !== 'string') {
    return c.json({ error: 'contentType required' }, 400)
  }

  const r2 = (c.env as any).VAULT_BUCKET
  if (!r2) return notConfigured(c)

  // Future: generate a key scoped to the user and return a signed PUT URL
  const user = c.get('user')
  const key = `users/${user.id}/${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`

  return c.json({
    error: 'not_implemented',
    message: 'R2 is bound but signed upload URL generation is not yet implemented.',
    plannedKey: key,
  }, 501)
})

/**
 * GET /vault/objects/:key
 * Metadata or signed download URL for an object.
 */
vault.get('/objects/:key', async (c) => {
  const key = c.req.param('key')
  const r2 = (c.env as any).VAULT_BUCKET

  if (!r2) return notConfigured(c)

  return c.json({
    error: 'not_implemented',
    message: 'Object lookup / signed download not yet implemented.',
    key,
  }, 501)
})

/**
 * DELETE /vault/objects/:key
 */
vault.delete('/objects/:key', async (c) => {
  const key = c.req.param('key')
  const r2 = (c.env as any).VAULT_BUCKET

  if (!r2) return notConfigured(c)

  return c.json({
    error: 'not_implemented',
    message: 'Object deletion not yet implemented.',
    key,
  }, 501)
})

/**
 * GET /vault/objects
 * List objects for the current user (prefix users/{id}/).
 */
vault.get('/objects', async (c) => {
  const r2 = (c.env as any).VAULT_BUCKET
  if (!r2) return notConfigured(c)

  const user = c.get('user')
  return c.json({
    error: 'not_implemented',
    message: 'Object listing not yet implemented.',
    prefix: `users/${user.id}/`,
  }, 501)
})

export default vault
