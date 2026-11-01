// t336u/t337u: everything a user can pay to promote on PIKK. Pricing preview only;
// booking and checkout are Coming soon until Stripe is live. No payments are taken.
export const PROMOTE_SECTIONS = Object.freeze([
  { id: 'music', title: 'Music', items: ['Tracks', 'Albums', 'PIKK Music Player spotlight'], link: '#/music' },
  { id: 'videos', title: 'Videos and Clips', items: ['Music videos', 'Shorts / Reels', 'Clips'], link: '#/videos' },
  { id: 'live', title: 'Live', items: ['Pre-live boost (upcoming stream)', 'Live boost (while streaming)'], link: '#/live' },
  { id: 'shop', title: 'Shop', items: ['Products', 'Stores'], link: '#/shop' },
  { id: 'posts', title: 'Posts and Stories', items: ['Posts', 'Stories'], link: '#/posts' },
  { id: 'profiles', title: 'Profiles', items: ['Creator profiles', 'Artist profiles'], link: '#/profile' },
  { id: 'events', title: 'Events', items: ['Events', 'Open Mic'], link: '#/openmic' },
  { id: 'battles', title: 'Battles and Roast', items: ['Live battles', 'Roast Arena matchups'], link: '#/giftbattles' },
  { id: 'communities', title: 'Communities', items: ['Community spotlight'], link: '#/communities' },
  { id: 'dating', title: 'Dating boost', items: ['Dating profile boost'], link: '#/dating', gate: '18+ only · requires age & ID verification and safety review before launch' },
]);
export const promoteHref = (id) => `#/promote?s=${id}`;
