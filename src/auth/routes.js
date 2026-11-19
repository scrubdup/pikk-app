/**
 * Auth route definitions
 * Import these into main.js ROUTES map.
 *
 * Example:
 *   import { authRoutes } from './auth/routes.js'
 *   const ROUTES = { ...authRoutes, ...otherRoutes }
 */

import { renderAuth, bindAuth } from '../pages/auth.js'
import { renderAuthReset, bindAuthReset } from '../pages/auth-reset.js'

export const authRoutes = {
  '/auth': { render: renderAuth, bind: bindAuth },
  '/auth/reset': { render: renderAuthReset, bind: bindAuthReset },
}
