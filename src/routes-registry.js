/**
 * Central route registry
 * Import once in main.js:
 *
 *   import { extraRoutes } from './routes-registry.js'
 *   import { restoreServerSession } from './auth/boot.js'
 *
 *   const ROUTES = { ...extraRoutes, ...existingRoutes }
 *
 *   async function boot() {
 *     await restoreServerSession()
 *     // ...
 *   }
 */

import { authRoutes } from './auth/routes.js'
import { roomsRoutes } from './rooms/routes.js'
import { communityRoomsRoutes } from './community/routes.js'
import { broadcastRoutes } from './broadcast/routes.js'

export const extraRoutes = {
  ...authRoutes,
  ...roomsRoutes,
  ...communityRoomsRoutes,
  ...broadcastRoutes,
}
