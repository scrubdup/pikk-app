// Approved creator actions. A link is present only when an actual existing route opens a relevant workflow.
// Future-only tools render as visible, non-clickable Planned tiles, never as misleading links.
export const CREATE_MENU_GROUPS = Object.freeze([
  { title: 'Social & Community', items: [
    { title: 'Create Post', href: '#/posts?type=text', detail: 'Text post · TEST MODE', icon: 'posts' },
    { title: 'Community Post', href: '#/community', detail: 'Open community · preview', icon: 'chat' },
    { title: 'Story', detail: '24-hour stories · Planned', icon: 'camera' },
    { title: 'Reels', href: '#/posts?type=short', detail: 'Short video · TEST MODE', icon: 'videos' },
    { title: 'Photo Post', href: '#/posts?type=picture', detail: 'Photos · TEST MODE', icon: 'camera' },
    { title: 'Create Poll', detail: 'Interactive polls · Planned', icon: 'posts' },
    { title: 'Create Community', href: '#/community', detail: 'Community area · preview', icon: 'chat' },
    { title: 'Create Chatroom', detail: 'Room creation · Planned', icon: 'msg' },
    { title: 'Create Event', detail: 'Events · Planned', icon: 'explore' },
  ]},
  { title: 'Videos & Music', items: [
    { title: 'Upload Video', href: '#/posts?type=video', detail: 'Video upload · TEST MODE', icon: 'videos' },
    { title: 'Music Video', href: '#/posts?type=video', detail: 'Video composer · TEST MODE', icon: 'videos' },
    { title: 'Short Video', href: '#/posts?type=short', detail: 'Short composer · TEST MODE', icon: 'videos' },
    { title: 'Upload Song', detail: 'Song publishing · Planned', icon: 'music' },
    { title: 'Upload Album', detail: 'Album publishing · Planned', icon: 'music' },
    { title: 'Upload EP', detail: 'EP publishing · Planned', icon: 'music' },
    { title: 'Upload Beats', detail: 'Beat publishing · Planned', icon: 'music' },
    { title: 'Create Playlist', href: '#/music', detail: 'Open music area · preview', icon: 'music' },
    { title: 'Add to Vault', href: '#/vault', detail: 'Open Vault · preview', icon: 'music' },
  ]},
  { title: 'Live & Commerce', items: [
    { title: 'Go Live', href: '#/live?go=1', detail: 'Livestream · TEST MODE', icon: 'live' },
    { title: 'Schedule Live', detail: 'Live scheduling · Planned', icon: 'live' },
    { title: 'Live Battle', href: '#/giftbattles', detail: 'Battle area · preview', icon: 'live' },
    { title: 'List Product', href: '#/marketplace', detail: 'Marketplace · TEST MODE', icon: 'merch' },
    { title: 'Seller Store', detail: 'Store creation · Planned', icon: 'merch' },
    { title: 'Paid Content', href: '#/pricing', detail: 'Creator pricing · preview', icon: 'merch' },
    { title: 'Exclusive Content', detail: 'Exclusive publishing · Planned', icon: 'heart' },
  ]},
  { title: 'Creator Tools & Protection', items: [
    { title: 'Creator Dashboard', href: '#/profile', detail: 'Creator profile', icon: 'profile' },
    { title: 'Manage Content', href: '#/posts', detail: 'Posts and content', icon: 'posts' },
    { title: 'Drafts', detail: 'Draft management · Planned', icon: 'posts' },
    { title: 'Artist Protection', href: '#/shield', detail: 'PIKK Shield local rights drafts · TEST MODE', icon: 'music' },
    { title: 'AI Support', detail: 'Support assistant · Planned', icon: 'chat' },
  ]},
]);

export const CREATE_MENU_ITEMS = Object.freeze(CREATE_MENU_GROUPS.flatMap(group => group.items));
