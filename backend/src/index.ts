import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { securityHeaders } from './lib/security'
import health from './routes/health'
import auth from './routes/auth'
import admin from './routes/admin'
import vault from './routes/vault'
import broadcast from './routes/broadcast'
import shield from './routes/shield'
import payments from './routes/payments'
import support from './routes/support'
import moderation from './routes/moderation'
import supervisor from './routes/supervisor'
import notifications from './routes/notifications'
import creator from './routes/creator'
import live from './routes/live'

type Bindings = {
  DB: D1Database
  ENVIRONMENT: string
  VAULT_BUCKET?: R2Bucket
  AI_API_KEY?: string
  AI_BASE_URL?: string
  AI_MODEL?: string
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
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.route('/health', health)
app.route('/auth', auth)
app.route('/admin', admin)
app.route('/vault', vault)
app.route('/broadcast', broadcast)
app.route('/shield', shield)
app.route('/payments', payments)
app.route('/support', support)
app.route('/moderation', moderation)
app.route('/supervisor', supervisor)
app.route('/notifications', notifications)
app.route('/creator', creator)
app.route('/live', live)

app.get('/', (c) => {
  return c.json({
    name: 'PIKK API',
    version: '0.6.0',
    status: 'online',
    environment: c.env.ENVIRONMENT || 'unknown',
    platform: 'Native creator platform — Live, Vault, Wallet, Support. Multistream optional.',
    capabilities: {
      aiSupport: !!c.env.AI_API_KEY,
      vaultR2: !!c.env.VAULT_BUCKET,
    },
    endpoints: {
      health: 'GET /health',
      auth: '/auth/*',
      live: '/live/*',
      broadcast: '/broadcast/*',
      creator: '/creator/*',
      vault: '/vault/*',
      payments: '/payments/*',
      support: '/support/*',
      notifications: '/notifications/*',
      shield: '/shield/*',
      moderation: '/moderation/*',
      supervisor: '/supervisor/*',
      admin: '/admin/*',
    },
  })
})

export default app
