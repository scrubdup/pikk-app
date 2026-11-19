import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { securityHeaders } from './lib/security'
import health from './routes/health'
import auth from './routes/auth'
import admin from './routes/admin'

type Bindings = {
  DB: D1Database
  ENVIRONMENT: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Global middleware
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

// Routes
app.route('/health', health)
app.route('/auth', auth)
app.route('/admin', admin)

app.get('/', (c) => {
  return c.json({
    name: 'PIKK API',
    version: '0.1.1',
    status: 'online',
    environment: c.env.ENVIRONMENT || 'unknown',
    endpoints: {
      health: 'GET /health',
      signup: 'POST /auth/signup',
      login: 'POST /auth/login',
      logout: 'POST /auth/logout',
      me: 'GET /auth/me',
      updateProfile: 'POST /auth/update-profile',
      changePassword: 'POST /auth/change-password',
      verifyEmail: 'POST /auth/verify-email',
      adminUsers: 'GET /admin/users'
    }
  })
})

export default app
