// t372u — Home: Posts/Shorts/Videos slideshow + community hub (Party Line, board, live chat, servers).
// Honest labels; only existing routes. Party Line has no route yet → Coming soon toast (no dead link).
import { VIDEOS } from './data.js';
import { esc } from './ui.js';

const ytId = (u) => (String(u || '').match(/(?:v=|embed\/|youtu\.be\/)([\w-]{6,})/) || [])[1] || '';
const KINDS = [['Post', '#/posts'], ['Short', '#/shorts'], ['Video', '#/videos']];

export function renderHomeMediaSlideshow(videos = VIDEOS) {
  const mv = videos.filter((v) => ytId(v.youtube)).slice(0, 9);
  const slides = mv.map((v, i) => {
    const [kind, href] = KINDS[i % 3];
    return `<a class="pikk-psv-slide is-${kind.toLowerCase()}" href="${href}" data-psv-slide="${i}"><span class="pikk-psv-media"><img src="https://i.ytimg.com/vi/${esc(ytId(v.youtube))}/hqdefault.jpg" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer"/><span class="pikk-psv-kind">${kind}</span></span><strong>${esc(v.title)}</strong><small>House sample · PIKK Official</small></a>`;
  }).join('');
  return `<section class="card pikk-psv" id="home-psv" aria-labelledby="home-psv-h">
    <div class="pikk-psv-head"><div><p class="kicker">Posts · Shorts · Videos</p><h2 id="home-psv-h">Slideshow</h2></div>
      <div class="pikk-psv-ctrls"><button type="button" class="btn ghost" data-psv="-1" aria-label="Previous slide">‹</button><button type="button" class="btn ghost" data-psv="1" aria-label="Next slide">›</button></div></div>
    <div class="pikk-psv-track" data-psv-track tabindex="0" aria-label="Posts, Shorts and Videos slideshow">${slides}</div>
    <p class="muted pikk-psv-note">House samples from official releases · no fabricated views.</p>
  </section>`;
}

export const HOME_HUB_ORDER = Object.freeze(['partyline', 'board', 'livechat', 'servers']);
const HUB = {
  partyline: { title: 'Party Line', kicker: 'Voice + chat rooms', detail: 'Drop-in group voice lines with chat. Coming soon — needs Safety review and the backend.', soon: true },
  board: { title: 'Message Board', kicker: 'Public posts & replies', detail: 'Short posts, replies and reposts from the community · TEST MODE', href: '#/posts' },
  livechat: { title: 'Live Chat Room', kicker: 'Chat during streams', detail: 'Chat alongside live rooms · TEST MODE preview', href: '#/live' },
  servers: { title: 'Community Servers', kicker: 'Servers & channels', detail: 'PIKK Lounge channel rooms and topic communities · TEST MODE', href: '#/community', extra: ['#/communities', 'Browse communities'] },
};
export function renderHomeCommunityHub() {
  const cards = HOME_HUB_ORDER.map((id) => {
    const c = HUB[id];
    const inner = `<p class="kicker">${esc(c.kicker)}</p><h3>${esc(c.title)}</h3><p>${esc(c.detail)}</p>`;
    return c.soon
      ? `<div class="card pikk-hub-card is-soon" id="home-${id}" data-hub="${id}" data-coming-soon role="button" tabindex="0">${inner}<span class="chip">Coming soon</span></div>`
      : `<div class="card pikk-hub-card" id="home-${id}" data-hub="${id}">${inner}<div class="row wrap"><a class="btn primary" href="${c.href}">Open ${esc(c.title)}</a>${c.extra ? `<a class="btn ghost" href="${c.extra[0]}">${esc(c.extra[1])}</a>` : ''}</div></div>`;
  }).join('');
  return `<section class="pikk-hub" id="home-hub" aria-label="PIKK community">${cards}</section>`;
}

if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const b = e.target.closest?.('[data-psv]'); if (!b) return;
    const t = b.closest('.pikk-psv')?.querySelector('[data-psv-track]'); if (!t) return;
    const w = t.querySelector('.pikk-psv-slide')?.getBoundingClientRect().width || 240;
    t.scrollBy({ left: Number(b.dataset.psv) * (w + 12), behavior: 'smooth' });
  });
}
