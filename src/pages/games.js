import { shellPage, esc } from '../ui.js';
import { PIKK_GAMES, arcadeArtSrc } from '../games/arcade-catalog.js';

export function renderGames() {
  return shellPage('PIKK Arcade', `
    <section class="pikk-arcade-intro card" aria-label="PIKK Arcade">
      <div class="pikk-arcade-heading">
        <div>
          <p class="kicker">Play · Compete · Hang out</p>
          <div class="pikk-arcade-brand"><img src="${esc(arcadeArtSrc({ artwork: '/brand/pikk-logo-official.png' }))}" alt="PIKK" loading="eager" decoding="async"/><span>ARCADE</span></div>
          <p>15 original game concepts. Find your favorites, see the art, and follow their development.</p>
        </div>
        <span class="pikk-arcade-icon" aria-hidden="true">🎮</span>
      </div>
      <p class="pikk-arcade-disclosure">ALL GAMES COMING SOON · Gallery previews, not playable releases. Play Chips have no cash value or cash-out.</p>
    </section>
    <div class="pikk-arcade-toolbar"><strong>15 upcoming games</strong><span>PLAY • COMPETE • HANG OUT</span></div>
    <div class="pikk-arcade-search">
      <label for="pikkArcadeSearch">Find a game</label>
      <div class="pikk-arcade-search-row">
        <input id="pikkArcadeSearch" type="search" placeholder="Search all 15 games..." autocomplete="off" aria-controls="pikkArcadeGrid" aria-describedby="pikkArcadeSearchHint" />
        <button type="button" class="btn ghost" id="pikkArcadeSearchClear" hidden>Clear</button>
      </div>
      <p id="pikkArcadeSearchHint" class="muted">Search names and descriptions. All games are previews.</p>
      <p id="pikkArcadeSearchStatus" class="muted" role="status" aria-live="polite">Showing all 15 games</p>
    </div>
    <div class="pikk-arcade-grid" id="pikkArcadeGrid">
      ${PIKK_GAMES.map((game, index) => `
        <article class="pikk-arcade-card pikk-game-${esc(game.theme)}">
          <div class="pikk-arcade-card-header"><span class="pikk-arcade-number">${index+1}</span><h3>${esc(game.name)}</h3></div>
          <div class="pikk-arcade-art" aria-label="${esc(game.name)} preview artwork">
            ${game.artwork ? `<img src="${esc(arcadeArtSrc(game))}" alt="${esc(game.name)} concept artwork" loading="lazy" decoding="async"/>` : `<span class="pikk-arcade-symbol" aria-hidden="true">${game.icon}</span>`}
          </div>
          <div class="pikk-arcade-copy">
            <span class="pikk-arcade-players">♙ ${esc(game.players)} ${game.players==='1'?'Player':'Players'}</span>
            <p>${esc(game.description)}</p>
            <button type="button" class="pikk-arcade-view" data-game-preview="${index}" aria-label="View ${esc(game.name)} concept artwork full size">View artwork <span aria-hidden="true">↗</span></button>
            ${game.href ? `<a class="pikk-arcade-action" href="${esc(game.href)}">View preview →</a>` : `<span class="pikk-arcade-action" aria-label="${esc(game.name)} coming soon">Coming Soon</span>`}
          </div>
        </article>`).join('')}
    </div>
    <p id="pikkArcadeNoMatches" class="pikk-arcade-no-matches muted" hidden>No games match your search. Try another name or description.</p>
    <dialog id="pikkArcadeLightbox" class="pikk-arcade-lightbox" aria-labelledby="pikkArcadePreviewTitle" aria-describedby="pikkArcadePreviewDescription">
      <div class="pikk-arcade-lightbox-panel">
        <div class="pikk-arcade-lightbox-top">
          <span class="pikk-arcade-lightbox-kicker">PIKK ARCADE <span aria-hidden="true">·</span> CONCEPT ART <span data-arcade-counter>01 / 15</span></span>
          <button type="button" class="pikk-arcade-lightbox-close" data-arcade-close aria-label="Close artwork preview">×</button>
        </div>
        <div class="pikk-arcade-lightbox-art"><img data-arcade-full-image alt="" decoding="async"/></div>
        <div class="pikk-arcade-lightbox-bottom">
          <div class="pikk-arcade-lightbox-description">
            <h2 id="pikkArcadePreviewTitle" data-arcade-title>Block Wars</h2>
            <p id="pikkArcadePreviewDescription" data-arcade-description>City-based fighters, combos and special moves.</p>
            <span data-arcade-players>1–2 Players · Preview only</span>
          </div>
          <div class="pikk-arcade-lightbox-controls" aria-label="Browse game artwork">
            <button type="button" data-arcade-prev aria-label="Previous game artwork">←</button>
            <button type="button" data-arcade-next aria-label="Next game artwork">→</button>
          </div>
        </div>
        <p class="pikk-arcade-lightbox-note">Original concept artwork · Games are not playable yet</p>
      </div>
    </dialog>
    <p class="muted pikk-arcade-footnote">All 15 owner-supplied concept images are now displayed. Select View artwork to see each one full size. Game concepts and final artwork may evolve; no gambling or real-money prizes are available.</p>
  `, { lead: 'Fifteen upcoming games · mobile-first catalog · previews only' });
}

/** Pure, wraparound preview data shared by the viewer and tests. */
export function arcadePreviewAt(index) {
  const total = PIKK_GAMES.length;
  const position = ((Math.trunc(Number(index) || 0) % total) + total) % total;
  const game = PIKK_GAMES[position];
  return {
    index: position, total, title: game.name, description: game.description,
    players: game.players, image: arcadeArtSrc(game),
  };
}

/** Search the original catalog without changing its order or concept artwork. */
export function arcadeMatchesQuery(game, query) {
  const term = String(query || '').trim().toLowerCase();
  return !term || [game.name, game.description].join(' ').toLowerCase().includes(term);
}

/** Keep full-size browsing inside the same search results as the visible gallery. */
export function arcadePreviewIndexes(query) {
  return PIKK_GAMES.flatMap((game, index) => arcadeMatchesQuery(game, query) ? [index] : []);
}

/** Route-scoped events: listeners are attached to replaced nodes, not the persistent #app. */
export function bindGames(root) {
  const gallery = root.querySelector('.pikk-arcade-grid');
  if (!gallery) return;
  const search = root.querySelector('#pikkArcadeSearch');
  if (search) {
    const cards = [...(gallery.querySelectorAll?.('.pikk-arcade-card') || [])];
    const clear = root.querySelector('#pikkArcadeSearchClear');
    const status = root.querySelector('#pikkArcadeSearchStatus');
    const empty = root.querySelector('#pikkArcadeNoMatches');
    const update = () => {
      const query = search.value;
      let visible = 0;
      cards.forEach((card, index) => {
        const match = arcadeMatchesQuery(PIKK_GAMES[index], query);
        card.hidden = !match;
        if (match) visible++;
      });
      if (clear) clear.hidden = !query;
      if (empty) empty.hidden = visible !== 0;
      if (status) status.textContent = query.trim()
        ? 'Showing ' + visible + ' of ' + PIKK_GAMES.length + ' games'
        : 'Showing all ' + PIKK_GAMES.length + ' games';
    };
    search.addEventListener('input', update);
    search.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !search.value || event.isComposing) return;
      event.preventDefault();
      search.value = '';
      update();
    });
    clear?.addEventListener('click', () => {
      search.value = '';
      update();
      search.focus();
    });
    update();
  }
  const dialog = root.querySelector('#pikkArcadeLightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  let active = 0;
  let opener = null;
  let visiblePreviews = arcadePreviewIndexes('');
  const previousButton = dialog.querySelector('[data-arcade-prev]');
  const nextButton = dialog.querySelector('[data-arcade-next]');
  const image = dialog.querySelector('[data-arcade-full-image]');
  const title = dialog.querySelector('[data-arcade-title]');
  const description = dialog.querySelector('[data-arcade-description]');
  const players = dialog.querySelector('[data-arcade-players]');
  const counter = dialog.querySelector('[data-arcade-counter]');

  const show = (index) => {
    const preview = arcadePreviewAt(index);
    active = preview.index;
    image.src = preview.image;
    image.alt = preview.title + ' concept artwork';
    title.textContent = preview.title;
    description.textContent = preview.description;
    players.textContent = preview.players + (preview.players === '1' ? ' Player · Preview only' : ' Players · Preview only');
    counter.textContent = String(visiblePreviews.indexOf(active) + 1).padStart(2, '0')
      + ' / ' + String(visiblePreviews.length).padStart(2, '0');
  };

  const advance = (direction) => {
    const position = visiblePreviews.indexOf(active);
    if (position === -1 || visiblePreviews.length < 2) return;
    const nextPosition = (position + direction + visiblePreviews.length) % visiblePreviews.length;
    show(visiblePreviews[nextPosition]);
  };

  gallery.addEventListener('click', (event) => {
    const button = event.target.closest('[data-game-preview]');
    if (!button) return;
    opener = button;
    const index = Number(button.dataset.gamePreview);
    visiblePreviews = arcadePreviewIndexes(search?.value);
    // A stale programmatic click must never expose other hidden search results.
    if (!visiblePreviews.includes(index)) visiblePreviews = [index];
    if (previousButton) previousButton.disabled = visiblePreviews.length < 2;
    if (nextButton) nextButton.disabled = visiblePreviews.length < 2;
    show(index);
    dialog.showModal();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('[data-arcade-close]')) {
      dialog.close();
    } else if (event.target.closest('[data-arcade-prev]')) {
      advance(-1);
    } else if (event.target.closest('[data-arcade-next]')) {
      advance(1);
    }
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      advance(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  dialog.addEventListener('close', () => {
    if (opener?.isConnected) opener.focus();
  });
}
