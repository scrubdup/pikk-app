/**
 * Rooms route definitions
 * Import into main.js:
 *   import { roomsRoutes } from './rooms/routes.js'
 *   const ROUTES = { ...roomsRoutes, ...authRoutes, ... }
 */

import { renderRooms, bindRooms } from '../pages/rooms.js'

export const roomsRoutes = {
  '/rooms': { render: renderRooms, bind: bindRooms },
}
