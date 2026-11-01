// t352u — Home showcase: horizontally scrollable sections (house/official content only, honestly labeled).
// No sponsored/Promote placements here (those live on #/promote). Images lazy-load.
import { STREAMING_RELEASES, VIDEOS, MERCH } from './data.js';
import { PIKK_GAMES, arcadeArtSrc } from './games/arcade-catalog.js';
import { esc } from './ui.js';
import { renderHomeMatchUp } from './home-matchup.js';

const ytId = (u) => (String(u || '').match(/(?:v=|embed\/|youtu\.be\/)([\w-]{6,})/) || [])[1] || '';
const thumb = (u) => { const id = ytId(u); return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ''; };
const img = (src, alt = '') => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"/>` : '<span class="hs-ph" aria-hidden="true">◆</span>';
const section = (id, title, seeAll, kicker, body, note = '') => `
  <section class="pikk-hs" id="hs-${id}" data-hs="${id}" aria-labelledby="hs-${id}-h">
    <div class="pikk-hs-head"><div><p class="kicker">${esc(kicker)}</p><h2 id="hs-${id}-h">${esc(title)}</h2></div><a class="pikk-hs-all" href="${seeAll}" data-see-all>See all →</a></div>
    <div class="pikk-hs-row" role="list">${body}</div>${note ? `<p class="pikk-hs-note">${esc(note)}</p>` : ''}
  </section>`;
const card = (href, media, title, sub, cls = '', badge = '') => `<a class="pikk-hs-card ${cls}" role="listitem" href="${href}"><span class="pikk-hs-media">${media}${badge ? `<span class="pikk-hs-badge">${esc(badge)}</span>` : ''}</span><strong>${esc(title)}</strong>${sub ? `<small>${esc(sub)}</small>` : ''}</a>`;

export const SHOWCASE_ORDER = ['posts', 'videos', 'music', 'live', 'connect', 'dating', 'contest', 'matchup', 'games', 'battles', 'shop', 'more'];
export const SHOWCASE_SEE_ALL = Object.freeze({ music: '#/music', posts: '#/posts', videos: '#/videos', live: '#/live', connect: '#/connect', dating: '#/dating', games: '#/games', battles: '#/giftbattles', contest: '#/contest/twerk', shop: '#/shop' });

// t384u — compact cards for every feature that had no Home spot yet.
export const HOME_MORE = Object.freeze([
  ['#/clips', 'Clips', 'Short clips feed'],
  ['#/openmic', 'Open Mic', '24/7 category · TEST MODE'],
  ['#/spotlight', 'Spotlight', 'Request a feature · TEST MODE'],
  ['#/multiguest', 'Multi-guest Live', 'Coming soon'],
  ['#/fanclubs', 'Fan clubs', 'Coming soon'],
  ['', 'Events', 'Coming soon · no page yet'],
  ['#/crew', 'PIKK Crew', 'Private story list'],
  ['#/story', 'Stories', 'Post a story'],
  ['#/favorites', 'Favorites', 'Saved on this device'],
  ['#/payments', '$ Payments', 'Hub · TEST MODE · not live'],
  ['#/wallet', 'Wallet', 'Coins · TEST MODE'],
  ['#/earnings', 'Earnings', 'Creator payouts · TEST MODE'],
  ['#/loyalty', 'Loyalty', 'Rewards · Coming soon'],
  ['#/refer', 'Refer a friend', 'Invite link'],
  ['#/ai-artists', 'AI Artists', 'Coming soon'],
  ['#/vault', 'Vault', 'Exclusive drops · Coming soon'],
  ['#/shield', 'PIKK Shield', 'Safety tools'],
  ['#/support', 'Support', 'Help & contact'],
  ['#/settings', 'Settings', 'Your preferences'],
  ['#/updates', 'Updates', 'What’s new'],
]);

export function renderHomeShowcase() {
  const music = STREAMING_RELEASES.map((r) => card('#/music', img(r.cover, r.title), r.title, `${r.artist} · ${r.type === 'album' ? 'Album' : 'Single'}${r.year ? ' · ' + r.year : ''}`, 'is-square', r.type === 'album' ? 'Album' : 'Track')).join('');
  const mv = VIDEOS.filter((v) => v.category === 'Music Videos');
  const posts = mv.slice(0, 6).map((v, i) => card(i % 3 === 1 ? '#/shorts' : '#/posts', img(thumb(v.youtube), v.title), v.title, i % 3 === 0 ? 'Picture · house' : i % 3 === 1 ? 'Short · house' : 'Video · house', i % 3 === 1 ? 'is-tall' : 'is-square', i % 3 === 0 ? 'Photo' : i % 3 === 1 ? 'Short' : 'Video')).join('');
  const videos = VIDEOS.slice(0, 8).map((v) => card('#/videos', img(thumb(v.youtube), v.title), v.title, `${v.artist || 'DatBoiSkeet'} · PIKK Official`, 'is-wide')).join('');
  const live = [['#/live', 'Live Rooms', 'Directory preview · TEST MODE'], ['#/live?go=1', 'Go Live', 'Start a stream · TEST MODE'], ['#/viral-live', '24/7 Viral Live', 'Rotating clips · preview']]
    .map(([h, t, s]) => card(h, '<span class="hs-ph hs-live" aria-hidden="true">●</span>', t, s, 'is-chip')).join('');
  const connect = [['#/explore', 'People', 'Discover creators'], ['#/communities', 'Communities', 'Topics & votes · TEST MODE'], ['#/community', 'PIKK Lounge', 'Channel rooms'], ['#/live', 'Live connections', 'Rooms · TEST MODE'], ['#/messages', 'Messages', 'Your inbox']]
    .map(([h, t, s]) => card(h, '<span class="hs-ph" aria-hidden="true">◎</span>', t, s, 'is-chip')).join('');
  const dating = card('#/dating', '<span class="hs-ph hs-18" aria-hidden="true">18+</span>', 'PIKK Dating · pre-launch', 'Adults only · age & ID verification and safety review before launch. No profiles shown.', 'is-wide is-teaser');
  const bw = card('#/blockwars', img('/blockwars-preview/01-title.jpg', 'Block Wars'), 'Block Wars', 'Coming Soon · gameplay paused', 'is-wide', 'Coming Soon');
  const games = bw + PIKK_GAMES.filter((g) => g.name !== 'Block Wars').map((g) => card('#/games', img(arcadeArtSrc(g), g.name), g.name, 'Coming Soon · concept art', 'is-square', 'Coming Soon')).join('');
  const battles = [['#/giftbattles', 'Live Battles', 'Battle area · preview'], ['#/roast-arena', 'Roast Arena', 'Matchups · preview']]
    .map(([h, t, s]) => card(h, '<span class="hs-ph" aria-hidden="true">⚔</span>', t, s, 'is-chip')).join('');
  const shop = MERCH.slice(0, 8).map((m) => card('#/shop', img(m.image, m.name), m.name, `$${m.price} · Foreign X-Change`, 'is-square')).join('')
    + card('#/shop', '<span class="hs-ph" aria-hidden="true">⌂</span>', 'Foreign X-Change store', 'Official merch store · checkout on merchant site', 'is-chip');
  // t356u — text-only Twerk Contest tile (no imagery), 18+ gated route.
  const contest = `<div class="pikk-hs-contest" role="listitem"><strong class="pikk-contest-title">Twerk Contest</strong><span class="pikk-badge-18" aria-label="18 plus only">18+</span><a class="pikk-contest-enter" href="#/contest/twerk">Enter</a></div>`;
  const S = {
    music: section('music', 'Music', SHOWCASE_SEE_ALL.music, 'Tracks & albums', music),
    posts: section('posts', 'Posts', SHOWCASE_SEE_ALL.posts, 'Pictures · shorts · videos', posts, 'House samples from official releases.'),
    videos: section('videos', 'Videos', SHOWCASE_SEE_ALL.videos, 'Long-form', videos),
    live: section('live', 'Live', SHOWCASE_SEE_ALL.live, 'Live now & go live', live, 'Live streaming is TEST MODE; no viewer counts are shown.'),
    connect: section('connect', 'Connect', SHOWCASE_SEE_ALL.connect, 'People · communities · live', connect),
    dating: section('dating', 'Dating', SHOWCASE_SEE_ALL.dating, '18+ · safety-gated', dating),
    games: section('games', 'Games', SHOWCASE_SEE_ALL.games, 'PIKK Arcade · all games', games, 'Concept previews · games are not playable yet.'),
    battles: section('battles', 'Battles & Roast', SHOWCASE_SEE_ALL.battles, 'Head-to-head', battles),
    contest: section('contest', 'Contests', SHOWCASE_SEE_ALL.contest, '18+ · community', contest),
    matchup: renderHomeMatchUp(),
    more: section('more', 'More on PIKK', '#/explore', 'Every feature · one tap', HOME_MORE.map(([h, t, sub]) => h ? card(h, '<span class="hs-ph" aria-hidden="true">◆</span>', t, sub, 'is-chip') : `<div class="pikk-hs-card is-chip is-soon" role="listitem"><span class="pikk-hs-media"><span class="hs-ph" aria-hidden="true">◆</span></span><strong>${esc(t)}</strong><small>${esc(sub)}</small></div>`).join('')),
    shop: section('shop', 'Shop', SHOWCASE_SEE_ALL.shop, 'Featured products & stores', shop),
  };
  return `<div class="pikk-home-showcase" id="pikkHomeShowcase">${SHOWCASE_ORDER.map((k) => S[k]).join('')}</div>`;
}
