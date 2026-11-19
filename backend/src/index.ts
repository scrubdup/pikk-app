import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { securityHeaders } from './lib/security'
import health from './routes/health'
import auth from './routes/auth'
import admin from './routes/admin'
import vault from './routes/vault'
import broadcast from './routes/broadcast'

type Bindings = {
  DB: D1Database
  ENVIRONMENT: string
  VAULT_BUCKET?: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', logger())
app.use('*', securityHeaders)
app.use('*', cors({
  origin: (origin) => {
    if (!origin) return '*'
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) return origin
    if (origin.includes('github.io')) return origin
    if (origin.includes('workers.dev')) return origin
    return origin
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.route('/health', health)
app.route('/auth', auth)
app.route('/admin', admin)
app.route('/vault', vault)
app.route('/broadcast', broadcast)

app.get('/', (c) => {
  return c.json({
    name: 'PIKK API',
    version: '0.2.0',
    status: 'online',
    environment: c.env.ENVIRONMENT || 'unknown',
    endpoints: {
      health: 'GET /health',
      auth: '/auth/*',
      admin: '/admin/*',
      vault: '/vault/*',
      broadcast: '/broadcast/*',
    }
  })
})

export default app
