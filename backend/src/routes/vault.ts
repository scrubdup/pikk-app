import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'

/**
 * Vault – media storage foundations
 * R2 binding will be added once the bucket is created.
 * For now these are structured stubs that return clear "not configured" responses.
 */

const vault = new Hono()

vault.use('*', requireAuth)

/**
 * POST /vault/upload-url
 * Returns a signed upload URL (or clear error while R2 is unconfigured)
 */
vault.post('/upload-url', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { filename, contentType, size } = body

  if (!filename || !contentType) {
    return c.json({ error: 'filename and contentType required' }, 400)
  }

  // R2 not yet bound
  const r2 = (c.env as any).VAULT_BUCKET
  if (!r2) {
    return c.json({
      error: 'vault_not_configured',
      message: 'R2 bucket is not bound yet. Create the bucket and add the binding to wrangler.toml.',
      nextSteps: [
        'npx wrangler r2 bucket create pikk-vault',
        'Add [[r2_buckets]] binding VAULT_BUCKET to wrangler.toml',
        'Redeploy'
      ]
    }, 503)
  }

  // Future: generate signed upload URL
  return c.json({ error: 'not_implemented' }, 501)
})

/**
 * GET /vault/objects/:key
 * Metadata / signed download (stub)
 */
vault.get('/objects/:key', async (c) => {
  const key = c.req.param('key')
  const r2 = (c.env as any).VAULT_BUCKET

  if (!r2) {
    return c.json({ error: 'vault_not_configured' }, 503)
  }

  return c.json({ error: 'not_implemented', key }, 501)
})

/**
 * DELETE /vault/objects/:key
 */
vault.delete('/objects/:key', async (c) => {
  const key = c.req.param('key')
  const r2 = (c.env as any).VAULT_BUCKET

  if (!r2) {
    return c.json({ error: 'vault_not_configured' }, 503)
  }

  return c.json({ error: 'not_implemented', key }, 501)
})

export default vault
