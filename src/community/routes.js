import { renderCommunityRooms, bindCommunityRooms } from '../pages/community-rooms.js'

export const communityRoomsRoutes = {
  '/community-rooms': { render: renderCommunityRooms, bind: bindCommunityRooms },
}
