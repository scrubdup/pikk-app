import { renderBroadcast, bindBroadcast } from '../pages/broadcast.js'

export const broadcastRoutes = {
  '/broadcast': { render: renderBroadcast, bind: bindBroadcast },
}
