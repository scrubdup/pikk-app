import './styles.css';
import './skip-content.css';
import './page-announcement.css';
import './featured-promos.css';
import './viral-live.css';
import './earnings-premium.css';
import './messages-premium.css';
import './notifications-premium.css';
import './wallet-premium.css';
import './loyalty-premium.css';
import './missions-premium.css';
import './clippers-premium.css';
import './fanclubs-premium.css';
import './openmic-premium.css';
import './shield.css';
import './ai-artists.css';
import './dating-premium.css';
import { SECTION_MENU_ITEMS, closeSectionMenus, toggleSectionMenu } from './section-menus.js';
import { CREATE_MENU_GROUPS } from './create-menu.js';
import { DRAWER_GROUPS, TABBAR } from './data.js';
import {
  initDbsPlayer,
  onRouteForPlayer,
  pauseDbsPlayer,
  resumeDbsPlayerIfAllowed,
  notifyVideoPlaying,
  notifyVideoIdle,
  notifyLiveOpen,
  notifyLiveClosed,
} from './player.js';
import { getState, ensureDemoPosts, markSplash, shouldShowSplash, getUnreadMessageCount, ensureDemoUnreadMessages } from './store.js';
import { startRouter, onRoute, getRoute } from './router.js';
import { ICONS, esc } from './ui.js';
import { asset, rewriteAssetUrls } from './asset.js';
import { markActiveTab } from './tabbar-state.js';
import { updateRouteIdentity } from './page-announcement.js';
import { applyDrawerState } from './drawer-state.js';
import { toggleMusicMenu, closeMusicMenu } from './music-menu.js';

import { renderHome, bindHome } from './pages/home.js';
import { renderUpdates, bindUpdates } from './pages/updates.js';
import { renderAdmin, bindAdmin } from './pages/admin.js';
import { renderPosts, bindPosts } from './pages/posts.js';
import { renderMusic, bindMusic } from './pages/music.js';
import { renderAIArtists, bindAIArtists } from './pages/ai-artists.js';
import { renderShield, bindShield } from './pages/shield.js';
import { renderMerch, bindMerch } from './pages/merch.js';
import { renderProfile, bindProfile } from './pages/profile.js';
import { renderClippers, bindClippers } from './pages/clippers.js';
import { renderLive, bindLive } from './pages/live.js';
import { renderViralLive, bindViralLive } from './pages/viral-live.js';
import { renderMarketplace, bindMarketplace } from './pages/marketplace.js';
import { renderMessages, bindMessages } from './pages/messages.js';
import { renderNotifications, bindNotifications } from './pages/notifications.js';
import { renderWallet, bindWallet } from './pages/wallet.js';
import { renderEarnings, bindEarnings } from './pages/earnings.js';
import { renderMissions, bindMissions } from './pages/missions.js';
import { renderExplore, bindExplore } from './pages/explore.js';
import { renderGiftBattles, bindGiftBattles } from './pages/giftbattles.js';
import { renderMultiGuest, bindMultiGuest } from './pages/multiguest.js';
import { renderFanClubs, bindFanClubs } from './pages/fanclubs.js';
import { renderLoyalty, bindLoyalty } from './pages/loyalty.js';
import { renderOpenMic, bindOpenMic } from './pages/openmic.js';
import { renderShop, bindShop } from './pages/shop.js';
import { renderPikkShop, bindPikkShop } from './pages/pikk-shop.js';
import { renderSpotlight, bindSpotlight } from './pages/spotlight.js';
import { renderConnect, bindConnect } from './pages/connect.js';
import { renderCommunities, bindCommunities } from './pages/communities.js';
import { renderShorts, bindShorts } from './pages/shorts.js';
import { renderBlockWars, bindBlockWars } from './pages/blockwars.js';
import { renderGames, bindGames } from './pages/games.js';
import { renderDating, bindDating } from './pages/dating.js';
import { renderRoastArena, bindRoastArena } from './pages/roast-arena.js';
import {
  renderVideos,
  bindVideos,
  renderPricing,
  bindPricing,
  renderGuidelines,
  renderCommunity,
  bindCommunity,
  renderSignup,
  renderLaunch,
  renderPhases,
  renderShare,
  bindShare,
  renderRefer,
  bindRefer,
  renderNotFound,
} from './pages/shells.js';

const ROUTES = {
  '/home': { render: renderHome, bind: bindHome },
  '/updates': { render: renderUpdates, bind: bindUpdates },
  '/posts': { render: renderPosts, bind: bindPosts },
  '/music': { render: renderMusic, bind: bindMusic },
  '/ai-artists': { render: renderAIArtists, bind: bindAIArtists },
  '/shield': { render: renderShield, bind: bindShield },
  '/vault': { render: renderMusic, bind: bindMusic },
  '/merch': { render: renderMerch, bind: bindMerch },
  '/profile': { render: renderProfile, bind: bindProfile },
  '/clippers': { render: renderClippers, bind: bindClippers },
  '/videos': { render: renderVideos, bind: bindVideos },
  '/live': { render: renderLive, bind: bindLive },
  '/viral-live': { render: renderViralLive, bind: bindViralLive },
  '/explore': { render: renderExplore, bind: bindExplore },
  '/marketplace': { render: renderMarketplace, bind: bindMarketplace },
  '/earnings': { render: renderEarnings, bind: bindEarnings },
  '/missions': { render: renderMissions, bind: bindMissions },
  '/pricing': { render: renderPricing, bind: bindPricing },
  '/admin': { render: renderAdmin, bind: bindAdmin },
  '/guidelines': { render: renderGuidelines },
  '/community': { render: renderCommunity, bind: bindCommunity },
  '/communities': { render: renderCommunities, bind: bindCommunities },
  '/signup': { render: renderSignup },
  '/messages': { render: renderMessages, bind: bindMessages },
  '/shop': { render: renderPikkShop, bind: bindPikkShop },
  '/profile-shop': { render: renderShop, bind: bindShop },
  '/giftbattles': { render: renderGiftBattles, bind: bindGiftBattles },
  '/notifications': { render: renderNotifications, bind: bindNotifications },
  '/fanclubs': { render: renderFanClubs, bind: bindFanClubs },
  '/wallet': { render: renderWallet, bind: bindWallet },
  '/loyalty': { render: renderLoyalty, bind: bindLoyalty },
  '/multiguest': { render: renderMultiGuest, bind: bindMultiGuest },
  '/openmic': { render: renderOpenMic, bind: bindOpenMic },
  '/launch': { render: renderLaunch },
  '/phases': { render: renderPhases },
  '/share': { render: renderShare, bind: bindShare },
  '/refer': { render: renderRefer, bind: bindRefer },
  '/spotlight': { render: renderSpotlight, bind: bindSpotlight },
  '/restream': {
    render: () => {
      // t198u · no Restream brand — deep-link folds into Connect multi-platform
      queueMicrotask(() => {
        location.hash = '/connect#connect-multistream';
      });
      return renderConnect();
    },
    bind: bindConnect,
  },
  '/shorts': { render: renderShorts, bind: bindShorts },
  '/clips': { render: renderShorts, bind: bindShorts },
  '/connect': { render: renderConnect, bind: bindConnect },
  '/blockwars': { render: renderBlockWars, bind: bindBlockWars },
  '/games': { render: renderGames, bind: bindGames },
  '/dating': { render: renderDating, bind: bindDating },
  '/roast-arena': { render: renderRoastArena, bind: bindRoastArena },
};

function buildTabbar() {
  const el = document.getElementById('tabbar');
  /* t290u — Messages unread lives in header only; still seed demo when signed in */
  if (getState().user) {
    try {
      ensureDemoUnreadMessages();
    } catch (_) {
      /* demo seed best-effort */
    }
  }
  el.innerHTML = TABBAR.map((t) => {
    const raw = t.href.replace(/^#/, '');
    const pathOnly = '/' + raw.replace(/^\//, '').split(/[?#]/)[0];
    const label = esc(t.label);
    const primaryClass = t.primary ? ' class="tab-primary"' : '';
    return `<a${primaryClass} href="${t.href}" data-path="${pathOnly}" aria-label="${label}"${t.href === '#/create' ? ' aria-haspopup="dialog" aria-controls="pikkCreateMenu" aria-expanded="false"' : t.href === '#/music' ? ' aria-haspopup="dialog" aria-controls="pikkMusicMenu" aria-expanded="false"' : SECTION_MENU_ITEMS[pathOnly.slice(1)] ? ` aria-haspopup="dialog" aria-controls="pikk${label}Menu" aria-expanded="false"` : ''}><span class="tab-ico">${t.href === '#/create' ? '<svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path d="M9 5 L25 16 L9 27 Z" fill="currentColor"/><path d="M24 5v11m0 0-4-4m4 4 4-4" stroke="white" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' : (ICONS[t.icon] || '')}</span><span>${label}</span></a>`;
  }).join('');
  for (const name of Object.keys(SECTION_MENU_ITEMS)) {
    el.querySelector(`a[href="#/${name}"]`)?.addEventListener('click', event => {
      event.preventDefault();
      toggleSectionMenu(name, event.currentTarget);
    });
  }
  el.querySelector('a[href="#/music"]')?.addEventListener('click', (event) => {
    event.preventDefault();
    closeSectionMenus();
    toggleMusicMenu(event.currentTarget);
  });
  el.querySelector('a[href="#/create"]')?.addEventListener('click', (event) => {
    closeMusicMenu();
    closeSectionMenus();
    event.preventDefault();
    const panel = ensureCreateMenu();
    panel.hidden = !panel.hidden;
    event.currentTarget.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden) panel.querySelector('[data-create-close]')?.focus();
  });
  el.style.gridTemplateColumns = '';
  /* Fit all bottom navigation tabs, including Dating and Connect, without horizontal scroll. */
  el.classList.remove('tabbar-scroll');
  el.classList.add('tabbar-reshaped', 'tabbar-fit7');
}

function createMenuMarkup() {
  return CREATE_MENU_GROUPS.map(group => {
    const tiles = group.items.map(item => {
      const contents = `<span class="pikk-menu-icon" aria-hidden="true">${ICONS[item.icon] || ICONS.explore}</span><strong class="pikk-menu-title">${esc(item.title)}</strong><small>${esc(item.detail)}</small>`;
      return item.href
        ? `<a href="${esc(item.href)}" class="pikk-create-tile">${contents}</a>`
        : `<div class="pikk-create-tile pikk-create-tile-planned" aria-disabled="true">${contents}</div>`;
    }).join('');
    return `<section class="pikk-create-menu-group" aria-label="${esc(group.title)}"><h3>${esc(group.title)}</h3><div class="pikk-create-options pikk-create-grid">${tiles}</div></section>`;
  }).join('');
}

function ensureCreateMenu() {
  let panel = document.getElementById('pikkCreateMenu');
  if (panel) return panel;
  panel = document.createElement('div');
  panel.id = 'pikkCreateMenu';
  panel.className = 'pikk-create-overlay';
  panel.hidden = true;
  panel.innerHTML = `<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-label="Create on PIKK">
    <div class="pikk-create-head"><strong>Create on PIKK</strong><button type="button" class="btn ghost" data-create-close aria-label="Close create menu">✕</button></div>
    ${createMenuMarkup()}
    <button type="button" class="pikk-menu-cancel" data-create-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p>
  </div>`;
  document.body.appendChild(panel);
  const closeMenu = (restoreFocus = false) => {
    panel.hidden = true;
    const trigger = document.querySelector('#tabbar a[href="#/create"]');
    trigger?.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger?.focus();
  };
  // A route change must never leave the Create dialog covering the destination.
  window.addEventListener('hashchange', () => closeMenu());
  panel.addEventListener('click', (e) => {
    if (e.target === panel || e.target.closest('[data-create-close]')) closeMenu(true);
    else if (e.target.closest('.pikk-create-options a')) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (panel.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); }
    if (e.key === 'Tab') {
      const focusable = [...panel.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (!first) { e.preventDefault(); return; }
      // Keep keyboard focus inside the modal even when focus starts outside it.
      if (!panel.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  return panel;
}

function refreshTabBadges() {
  const el = document.getElementById('tabbar');
  if (!el) return;
  buildTabbar();
  const route = getRoute();
  markActiveTab(el, route.path);
  try {
    refreshHeaderMsgBadge();
  } catch (_) {
    /* header may not be mounted */
  }
}

function buildDrawer() {
  const el = document.getElementById('sideNav');
  const route = getRoute();
  const activeHash = '#' + (route.raw || route.path);
  const activePath = '#' + route.path;

  const groupsHtml = DRAWER_GROUPS.map((g) => {
    if (g.href) {
      const on = g.href === activePath || g.href === activeHash ? ' on' : '';
      return `<a class="drawer-direct${on}" href="${g.href}">${esc(g.label)}</a>`;
    }
    const links = g.links || [];
    const hasActive = links.some((l) => l.href === activePath || l.href === activeHash);
    const open = hasActive ? ' open' : '';
    const activeCls = hasActive ? ' has-active' : '';
    const children = links
      .map((l) => {
        const on = l.href === activePath || l.href === activeHash ? ' on' : '';
        return `<a class="drawer-link${on}" href="${l.href}">${esc(l.label)}</a>`;
      })
      .join('');
    return (
      `<div class="drawer-group${open}${activeCls}" data-group="${esc(g.id)}">` +
      `<button type="button" class="drawer-cat" aria-expanded="${hasActive ? 'true' : 'false'}">` +
      `<span>${esc(g.label)}</span>` +
      `<span class="drawer-caret" aria-hidden="true"></span>` +
      `</button>` +
      `<div class="drawer-children" role="group">${children}</div>` +
      `</div>`
    );
  }).join('');

  el.innerHTML = `<h2>PIKK Network</h2>${groupsHtml}<a class="drawer-direct" href="#/updates">What's New · App Updates</a>`;
}

function setDrawer(open, restoreFocus = false) {
  applyDrawerState({
    drawer: document.getElementById('sideNav'),
    scrim: document.getElementById('scrim'),
    trigger: document.getElementById('menuBtn'),
  }, open, restoreFocus);
}

function updateChrome(route) {
  const path = route.path;
  buildTabbar();
  markActiveTab(document.getElementById('tabbar'), path);
  document.querySelectorAll('#sideNav a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('on', href === '#' + path || href === '#' + route.raw);
  });
  // Accordion: keep the category that owns the active route open (one at a time)
  const activeHref = '#' + path;
  const activeRaw = '#' + route.raw;
  document.querySelectorAll('#sideNav .drawer-group').forEach((g) => {
    const match = [...g.querySelectorAll('a')].some(
      (a) => a.getAttribute('href') === activeHref || a.getAttribute('href') === activeRaw
    );
    g.classList.toggle('open', match);
    g.classList.toggle('has-active', match);
    const btn = g.querySelector('.drawer-cat');
    if (btn) btn.setAttribute('aria-expanded', match ? 'true' : 'false');
  });
  /* t290u/t291u — Messages always in Sign-in slot (tierPill removed from HTML).
   * Sign in lives on Profile (#/profile) only. Signed-out Messages → #/messages. */
  const headerMsg = document.getElementById('headerMsg');
  if (headerMsg) headerMsg.hidden = false;
  if (getState().user) {
    try {
      ensureDemoUnreadMessages();
    } catch (_) {
      /* demo seed best-effort */
    }
  }
  refreshHeaderMsgBadge();
}

/** t290u/t291u · header Messages unread badge (Messages always visible) */
function refreshHeaderMsgBadge() {
  const badge = document.getElementById('headerMsgBadge');
  const link = document.getElementById('headerMsg');
  if (!badge || !link) return;
  let unread = 0;
  try {
    unread = getUnreadMessageCount();
  } catch (_) {
    unread = 0;
  }
  if (unread > 0) {
    const n = unread > 99 ? '99+' : String(unread);
    badge.textContent = n;
    badge.hidden = false;
    link.setAttribute('aria-label', `Messages, ${unread} unread`);
  } else {
    badge.textContent = '';
    badge.hidden = true;
    link.setAttribute('aria-label', 'Messages');
  }
}

function render(route) {
  // Route changes always dismiss the drawer without stealing focus from navigation.
  setDrawer(false);
  const app = document.getElementById('app');
  const entry = ROUTES[route.path];
  const html = entry ? entry.render(route) : renderNotFound(route.path);
  app.innerHTML = html;
  rewriteAssetUrls(app);
  entry?.bind?.(app);
  updateChrome(route);
  updateRouteIdentity(route, app, document.getElementById('pikkRouteAnnouncer'));
  onRouteForPlayer(route.path);
  window.scrollTo(0, 0);
  // Vault deep-link
  if ((route.path === '/music' || route.path === '/vault') && (location.hash.includes('vault') || route.path === '/vault')) {
    setTimeout(() => document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }
  // Creator sell apply deep-link (#/pricing?focus=sell → #creator-sell)
  if (route.path === '/pricing' && (location.hash.includes('focus=sell') || location.hash.includes('creator-sell'))) {
    setTimeout(() => document.getElementById('creator-sell')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
  // Gift coins deep-link (#/wallet#wallet-coins or ?section=coins)
  if (
    route.path === '/wallet' &&
    (route.elementId === 'wallet-coins' ||
      route.query.section === 'coins' ||
      location.hash.includes('wallet-coins'))
  ) {
    setTimeout(() => document.getElementById('wallet-coins')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
  // t209u · bottom Go Live → start-stream card
  if (route.path === '/live' && (route.query.go === '1' || route.elementId === 'live-go' || location.hash.includes('go=1'))) {
    setTimeout(() => document.getElementById('live-go')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
}



function hideSplash() {
  // Design/QA: ?holdSplash=1 keeps official logo splash visible for screenshots
  if (new URLSearchParams(location.search).has('holdSplash')) return;
  const splash = document.getElementById('splash');
  if (!splash || splash.classList.contains('hide')) return;
  splash.classList.add('hide');
  markSplash();
  setTimeout(() => splash.remove(), 500);
}

/** §19 t178u — play tuning-fork chime once; swallow autoplay blocks. */
function playSplashChime() {
  const el = document.getElementById('splashChime');
  if (!el) return;
  const tryPlay = () => {
    const p = el.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };
  tryPlay();
  // Unlock on first gesture if browser blocked autoplay
  const unlock = () => {
    tryPlay();
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });
}


/** §17 Build call-site bridge — Media Links owns player.js. Anyone may:
 *   dispatchEvent(new CustomEvent('dbs:interrupt-music', { detail: { reason: 'live'|'video'|'route' } }))
 *   dispatchEvent(new CustomEvent('dbs:resume-music', { detail: { reason: 'live'|'video' } }))
 * Do NOT fire on track skip/prev or Open Spotify/Apple/YTM (#spOpen).
 */
function wireMusicInterruptBridge() {
  window.addEventListener('dbs:interrupt-music', (e) => {
    const reason = e?.detail?.reason || 'route';
    pauseDbsPlayer(reason);
  });
  window.addEventListener('dbs:resume-music', (e) => {
    const reason = e?.detail?.reason;
    if (reason === 'live') notifyLiveClosed();
    else if (reason === 'video') notifyVideoIdle();
    else resumeDbsPlayerIfAllowed(reason);
  });
}

/** t212u · Messages unread badge: store markThreadRead → refresh tabbar */
function wireMessagesUnreadBadge() {
  window.addEventListener('dbs:messages-unread', () => {
    try {
      refreshTabBadges();
    } catch (_) {
      /* tabbar may not be mounted yet */
    }
  });
}

function boot() {
  // Do not use a #app anchor: PIKK uses the URL hash for routing.
  document.getElementById('pikkSkipContent')?.addEventListener('click', () => {
    document.getElementById('app')?.focus();
  });
  ensureDemoPosts();
  rewriteAssetUrls(document);
  buildTabbar();
  buildDrawer();
  initDbsPlayer();
  wireMusicInterruptBridge();
  wireMessagesUnreadBadge();

  document.getElementById('menuBtn').addEventListener('click', () => setDrawer(true));
  document.getElementById('scrim').addEventListener('click', () => setDrawer(false, true));
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !document.getElementById('sideNav')?.classList.contains('open')) return;
    event.preventDefault();
    setDrawer(false, true);
  });
  document.getElementById('sideNav').addEventListener('click', (e) => {
    const cat = e.target.closest('.drawer-cat');
    if (cat) {
      e.preventDefault();
      const group = cat.closest('.drawer-group');
      const willOpen = !group.classList.contains('open');
      document.querySelectorAll('#sideNav .drawer-group').forEach((g) => {
        const open = willOpen && g === group;
        g.classList.toggle('open', open);
        const b = g.querySelector('.drawer-cat');
        if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      return;
    }
    if (e.target.closest('a')) setDrawer(false);
  });
  document.getElementById('notifBtn').addEventListener('click', () => {
    location.hash = '/notifications';
  });

  onRoute(render);
  startRouter();

  // Splash §19 t178u: official logo + tuning fork · hold ~3s when shown.
  // Subsequent visits skip via shouldShowSplash(); ?holdSplash=1 for evidence.
  if (!shouldShowSplash() && !new URLSearchParams(location.search).has('holdSplash')) {
    const splash = document.getElementById('splash');
    if (splash) splash.remove();
  } else {
    playSplashChime();
    let done = false;
    const ready = () => {
      if (done) return;
      done = true;
      hideSplash();
    };
    // Fixed 3s hold from boot (user ask t178u); same as safety max.
    setTimeout(ready, 3000);
  }
}

boot();
