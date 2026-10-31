import { PIKK_GAMES } from './games/arcade-catalog.js';
import { ICONS } from './ui.js';

// PIKK approved category menus: route only to existing sections.
// No menu item implies that demo workflows are production services.
export const SECTION_MENU_ITEMS = Object.freeze({
  videos: [
    { title: 'Video Feed', href: '#/videos', detail: 'Watch and discover videos', icon: '▶' },
    { title: 'Shorts & Reels', href: '#/shorts', detail: 'Browse short-form clips', icon: '▣' },
    { title: 'Posts', href: '#/posts', detail: 'View the community feed', icon: '▤' },
    { title: 'Upload Video', href: '#/posts?type=video', detail: 'Available prototype publishing tools · TEST MODE', icon: '⇧' },
  ],
  connect: [
    { title: 'Connect', href: '#/connect', detail: 'Discover people and communities', icon: '♧' },
    { title: 'PIKK Communities', href: '#/communities', detail: 'Topic discussions, votes and replies · TEST MODE', icon: '#' },
    { title: 'Communities', href: '#/community', detail: 'Explore PIKK Lounge channel rooms', icon: '☷' },
    { title: 'Messages', href: '#/messages', detail: 'Open your messages', icon: '✉' },
    { title: 'Random Chat', href: '#/connect#connect-random-chat', detail: 'Preview only · real matching unavailable', icon: '◉' },
    { title: 'Multistream', href: '#/connect#connect-multistream', detail: 'Broadcast connection preview · TEST MODE', icon: '▹' },
  ],
  dating: [
    { title: 'Discover Dating', href: '#/dating', detail: 'Explore dating features · TEST MODE', icon: '♡' },
    { title: 'Messages', href: '#/messages', detail: 'Open private messages', icon: '✉' },
    { title: 'My Profile', href: '#/profile', detail: 'Review your profile settings', icon: '◉' },
    { title: 'Safety Guidelines', href: '#/guidelines', detail: 'Review community safety rules', icon: '◇' },
  ],
  games: [
    { title: 'PIKK Arcade', href: '#/games', detail: 'View the full game collection · preview', icon: '♜' },
    // Keep the fifteen game tiles in the owner's approved Arcade artwork order.
    // The Arcade catalog is the single source of truth for names, order and preview routes.
    ...PIKK_GAMES.map(game => ({
      title: game.name,
      ...(game.href ? { href: game.href } : {}),
      detail: game.href ? 'Fighting game · development preview' : game.description + ' · planned',
      icon: game.name === 'Block Wars' ? '▣' : '♜',
    })),
  ],
  shop: [
    { title: 'PIKK Shop', href: '#/shop', detail: 'Browse available products', icon: '▤' },
    { title: 'Marketplace', href: '#/marketplace', detail: 'Community listings · TEST MODE', icon: '◇' },
    { title: 'Foreign X-Change', href: '#/merch', detail: 'Official merchandise', icon: '✦' },
    { title: 'Creator Pricing', href: '#/pricing', detail: 'Explore creator selling information', icon: '$' },
  ],
});

// Reuse the exact outlined SVG icon system used by the approved Create dialog.
const MENU_ICON_KEYS = Object.freeze({
  'Video Feed': 'videos', 'Shorts & Reels': 'videos', 'Posts': 'posts', 'Upload Video': 'videos',
  'Connect': 'profile', 'PIKK Communities': 'chat', 'Communities': 'chat', 'Messages': 'msg', 'Random Chat': 'camera', 'Multistream': 'live',
  'Discover Dating': 'heart', 'My Profile': 'profile', 'Safety Guidelines': 'heart',
  'PIKK Arcade': 'game', 'PIKK Speed': 'game', 'PIKK Blackjack': 'game', 'PIKK Slots': 'game', 'PIKK Poker': 'game', 'PIKK Spades': 'game', 'PIKK Dominoes': 'game', 'PIKK Chess': 'game', 'PIKK Clash': 'game', 'PIKK Knockout': 'game', 'PIKK Playground': 'game', 'PIKK Bowling': 'game', 'PIKK Pickleball': 'game', 'PIKK Pool': 'game', 'PIKK Cup Pong': 'game', 'Block Wars': 'game',
  'PIKK Shop': 'merch', 'Marketplace': 'merch', 'Foreign X-Change': 'merch', 'Creator Pricing': 'posts',
});

const IDS = { videos: 'pikkVideosMenu', connect: 'pikkConnectMenu', dating: 'pikkDatingMenu', games: 'pikkGamesMenu', shop: 'pikkShopMenu' };

export function closeSectionMenus(restoreFocus = false) {
  for (const [name, id] of Object.entries(IDS)) {
    const panel = document.getElementById(id);
    if (!panel || panel.hidden) continue;
    panel.hidden = true;
    const trigger = document.querySelector(`#tabbar a[href="#/${name}"]`);
    trigger?.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger?.focus();
  }
}

export function toggleSectionMenu(name, trigger) {
  if (!Object.hasOwn(SECTION_MENU_ITEMS, name)) return;
  const id = IDS[name];
  let panel = document.getElementById(id);
  if (!panel) {
    panel = document.createElement('div');
    panel.id = id;
    panel.className = 'pikk-create-overlay';
    panel.hidden = true;
    // All labels and URLs are fixed, audited developer literals; no untrusted HTML.
    panel.innerHTML = `<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="${id}Title">
      <div class="pikk-create-head"><strong id="${id}Title">${name[0].toUpperCase() + name.slice(1)} on PIKK</strong><button type="button" class="btn ghost" data-section-close aria-label="Close ${name} menu">✕</button></div>
      <div class="pikk-create-options pikk-create-grid">${SECTION_MENU_ITEMS[name].map(item => { const inner = `<span class="pikk-menu-icon" aria-hidden="true">${ICONS[MENU_ICON_KEYS[item.title] || "explore"]}</span><strong class="pikk-menu-title">${item.title}</strong><small>${item.detail}</small>`; return item.href ? `<a class="pikk-create-tile" href="${item.href}">${inner}</a>` : `<div class="pikk-create-tile pikk-menu-planned" aria-disabled="true">${inner}</div>`; }).join('')}</div>
      <button type="button" class="pikk-menu-cancel" data-section-close>Cancel</button>
      <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Production features are not enabled until secure services are available.</p>
    </div>`;
    document.body.appendChild(panel);
    panel.addEventListener('click', event => {
      if (event.target === panel || event.target.closest('[data-section-close]')) closeSectionMenus(true);
      else if (event.target.closest('.pikk-create-options a')) closeSectionMenus();
    });
    document.addEventListener('keydown', event => {
      if (panel.hidden) return;
      if (event.key === 'Escape') { event.preventDefault(); closeSectionMenus(true); return; }
      if (event.key !== 'Tab') return;
      const focusable = [...panel.querySelectorAll('button:not([disabled]), a[href]')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (!first) { event.preventDefault(); return; }
      if (!panel.contains(document.activeElement)) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    window.addEventListener('hashchange', () => closeSectionMenus());
  }
  const opening = panel.hidden;
  closeSectionMenus();
  const music = document.getElementById('pikkMusicMenu');
  if (music && !music.hidden) {
    music.hidden = true;
    document.querySelector('#tabbar a[href="#/music"]')?.setAttribute('aria-expanded', 'false');
  }
  const create = document.getElementById('pikkCreateMenu');
  if (create && !create.hidden) {
    create.hidden = true;
    document.querySelector('#tabbar a[href="#/create"]')?.setAttribute('aria-expanded', 'false');
  }
  panel.hidden = !opening;
  trigger?.setAttribute('aria-expanded', String(opening));
  if (opening) panel.querySelector('[data-section-close]')?.focus();
  else trigger?.focus();
}
