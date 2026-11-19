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
  origin: (origin) => origin || '*', // tighten in production
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
    environment: c.env.ENVIRONMENT || 'unknown'
  })
})

export default app
