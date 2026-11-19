import { createMiddleware } from 'hono/factory'

/** Basic security headers for all responses */
export const securityHeaders = createMiddleware(async (c, next) => {
  await next()
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'DENY')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  // CSP is left loose for now because the SPA is still evolving
})
