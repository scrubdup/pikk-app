import { ICONS } from './ui.js';

// Owner-approved Music tab menu. All destinations remain inside existing Music route.
// Unavailable creator actions are explicitly described as unavailable in TEST MODE.
export const MUSIC_MENU_ITEMS = Object.freeze([
  { label: 'Songs', href: '#/music?view=songs', detail: 'Browse released singles', icon: '♫' },
  { label: 'Albums', href: '#/music?view=albums', detail: 'Browse released albums', icon: '▣' },
  { label: 'Beats', href: '#/music?view=beats', detail: 'Beat marketplace not yet available', icon: '◉' },
  { label: 'Playlists', href: '#/music?view=playlists', detail: 'Verified YouTube playlists', icon: '▤' },
  { label: 'Upload Music', href: '#/music?view=upload', detail: 'Creator uploads coming later', icon: '⇧' },
]);

const MUSIC_ICON_KEYS = Object.freeze({
  Songs: 'music', Albums: 'music', Beats: 'music', Playlists: 'videos', 'Upload Music': 'music',
});

export function closeMusicMenu(restoreFocus = false) {
  const panel = document.getElementById('pikkMusicMenu');
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  const trigger = document.querySelector('#tabbar a[href="#/music"]');
  trigger?.setAttribute('aria-expanded', 'false');
  if (restoreFocus) trigger?.focus();
}

export function ensureMusicMenu() {
  let panel = document.getElementById('pikkMusicMenu');
  if (panel) return panel;
  panel = document.createElement('div');
  panel.id = 'pikkMusicMenu';
  panel.className = 'pikk-create-overlay';
  panel.hidden = true;
  panel.innerHTML = `<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="pikkMusicMenuTitle">
    <div class="pikk-create-head"><strong id="pikkMusicMenuTitle">Music on PIKK</strong><button type="button" class="btn ghost" data-music-close aria-label="Close music menu">✕</button></div>
    <div class="pikk-create-options pikk-create-grid">
      ${MUSIC_MENU_ITEMS.map((item) => `<a class="pikk-create-tile" href="${item.href}"><span class="pikk-menu-icon" aria-hidden="true">${ICONS[MUSIC_ICON_KEYS[item.label] || "music"]}</span><strong class="pikk-menu-title">${item.label}</strong><small>${item.detail}</small></a>`).join('')}
    </div>
    <button type="button" class="pikk-menu-cancel" data-music-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Beat selling and music uploads are not available yet</p>
  </div>`;
  document.body.appendChild(panel);
  window.addEventListener('hashchange', () => closeMusicMenu());
  panel.addEventListener('click', (event) => {
    if (event.target === panel || event.target.closest('[data-music-close]')) closeMusicMenu(true);
    else if (event.target.closest('.pikk-create-options a')) closeMusicMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (panel.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMusicMenu(true); }
    if (event.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll('a[href], button:not([disabled])')];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (!first) { event.preventDefault(); return; }
    if (!panel.contains(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  return panel;
}

export function toggleMusicMenu(trigger) {
  const panel = ensureMusicMenu();
  const nextOpen = panel.hidden;
  // Only one category modal can be visible at a time.
  const createPanel = document.getElementById('pikkCreateMenu');
  if (nextOpen && createPanel && !createPanel.hidden) {
    createPanel.hidden = true;
    document.querySelector('#tabbar a[href="#/create"]')?.setAttribute('aria-expanded', 'false');
  }
  panel.hidden = !nextOpen;
  trigger?.setAttribute('aria-expanded', String(nextOpen));
  if (nextOpen) panel.querySelector('[data-music-close]')?.focus();
  else trigger?.focus();
}
