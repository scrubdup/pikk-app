# PIKK Master Task Board

**Last updated:** 2026-11-19

## Rooms (new this session)

### Gender + Dating Rooms (`#/rooms`)
- Men's Room
- Ladies Room
- Dating Lounge
- Speed Dating (preview)
- Dating Live Room (preview)

### Community Lounge Rooms (`#/community-rooms`)
- Lounge
- Conversation
- Listening Room
- Backstage
- Live Lounge
- Spotlight Room

All currently local/demo presence + chat. Realtime + verification later.

## Backend Auth — Complete
## Frontend Auth — Complete (pending main.js wire)

## Still needs main.js registration
```js
import { roomsRoutes } from './rooms/routes.js'
import { communityRoomsRoutes } from './community/routes.js'
import { authRoutes } from './auth/routes.js'
import { restoreServerSession } from './auth/boot.js'

const ROUTES = {
  ...authRoutes,
  ...roomsRoutes,
  ...communityRoomsRoutes,
  // existing routes...
}
```
