// Approved creator actions. A link is present only when an actual existing route opens a relevant workflow.
// Future-only tools render as visible, non-clickable Planned tiles, never as misleading links.
export const CREATE_MENU_GROUPS = Object.freeze([
  // Owner-approved primary sheet (docs/owner-requirements/APPROVED_VISUAL_REFERENCES/04_actual_create_menu.jpeg).
  { title: 'Create on PIKK', items: [
    { title: 'Post Photos', href: '#/posts?type=picture', detail: 'Add photos · TEST MODE', icon: 'camera' },
    { title: 'Story', href: '#/story', detail: 'Everyone or Crew · TEST MODE', icon: 'camera' },
    { title: 'Shorts / Reels', href: '#/posts?type=short', detail: 'Short video · TEST MODE', icon: 'videos' },
    { title: 'Upload Video', href: '#/posts?type=video', detail: 'Long video · TEST MODE', icon: 'videos' },
    { title: 'Create Post', href: '#/posts?type=text', detail: 'Text / poll / link · TEST MODE', icon: 'posts' },
    { title: 'Go Live', href: '#/live?go=1', detail: 'Start a stream · TEST MODE', icon: 'live' },
    { title: 'Upload Music', href: '#/music?view=upload', detail: 'Beat / song · planned', icon: 'music' },
    { title: 'Sell Something', href: '#/marketplace', detail: 'List a product · TEST MODE', icon: 'merch' },
    { title: 'Paid Content', href: '#/pricing', detail: 'Premium creator content · planned', icon: 'merch' },
  ]},
  { title: 'Social & Community', items: [
    { title: 'Community Post', href: '#/community', detail: 'Open community · preview', icon: 'chat' },
    { title: 'Reels', href: '#/posts?type=short', detail: 'Short video · TEST MODE', icon: 'videos' },
    { title: 'Photo Post', href: '#/posts?type=picture', detail: 'Photos · TEST MODE', icon: 'camera' },
    { title: 'PIKK Crew', href: '#/crew', detail: 'Private story list · TEST MODE', icon: 'heart' },
    { title: 'Favorites', href: '#/favorites', detail: 'People who rank first · TEST MODE', icon: 'heart' },
    { title: 'Create Poll', detail: 'Interactive polls · Planned', icon: 'posts' },
    { title: 'Create Community', href: '#/community', detail: 'Community area · preview', icon: 'chat' },
    { title: 'Create Chatroom', detail: 'Room creation · Planned', icon: 'msg' },
    { title: 'Create Event', detail: 'Events · Planned', icon: 'explore' },
  ]},
  { title: 'Videos & Music', items: [
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
    { title: 'Schedule Live', detail: 'Live scheduling · Planned', icon: 'live' },
    { title: 'Live Battle', href: '#/giftbattles', detail: 'Battle area · preview', icon: 'live' },
    { title: 'List Product', href: '#/marketplace', detail: 'Marketplace · TEST MODE', icon: 'merch' },
    { title: 'Seller Store', detail: 'Store creation · Planned', icon: 'merch' },
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
