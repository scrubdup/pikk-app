import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import health from './routes/health'
import auth from './routes/auth'

type Bindings = {
  DB: D1Database
  ENVIRONMENT: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: (origin) => {
    // Allow local frontend + production domains later
    if (!origin) return '*'
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) return origin
    if (origin.includes('github.io')) return origin
    if (origin.includes('workers.dev')) return origin
    return origin // tighten later
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// Routes
app.route('/health', health)
app.route('/auth', auth)

app.get('/', (c) => {
  return c.json({
    name: 'PIKK API',
    version: '0.1.0',
    status: 'online',
    environment: c.env.ENVIRONMENT || 'unknown',
    endpoints: {
      health: 'GET /health',
      signup: 'POST /auth/signup',
      login: 'POST /auth/login',
      logout: 'POST /auth/logout',
      me: 'GET /auth/me',
      verifyEmail: 'POST /auth/verify-email'
    }
  })
})

export default app
