/**
 * Simple in-memory rate limiter for Cloudflare Workers.
 * Note: This is per-isolate. For production multi-isolate protection
 * later move to Durable Objects or KV.
 */

type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

export function rateLimit(options: {
  windowMs?: number
  max?: number
  key?: (c: any) => string
} = {}) {
  const windowMs = options.windowMs ?? 60_000 // 1 minute
  const max = options.max ?? 30

  return async (c: any, next: () => Promise<void>) => {
    const keyFn = options.key ?? ((ctx: any) => {
      // Prefer IP, fallback to a generic key
      return ctx.req.header('cf-connecting-ip') ||
             ctx.req.header('x-forwarded-for') ||
             'anonymous'
    })

    const key = keyFn(c)
    const now = Date.now()
    let entry = store.get(key)

    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs }
      store.set(key, entry)
    }

    entry.count += 1

    // Cleanup old entries occasionally
    if (store.size > 5000) {
      for (const [k, v] of store) {
        if (v.resetAt <= now) store.delete(k)
      }
    }

    c.header('X-RateLimit-Limit', String(max))
    c.header('X-RateLimit-Remaining', String(Math.max(0, max - entry.count)))
    c.header('X-RateLimit-Reset', String(Math.ceil(entry.resetAt / 1000)))

    if (entry.count > max) {
      return c.json({ error: 'too many requests' }, 429)
    }

    await next()
  }
}
