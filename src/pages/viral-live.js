import { VIDEOS } from '../data.js';
import { esc, shellPage } from '../ui.js';

/** Keep the approved PIKK artwork visible on GitHub Pages project URLs. */
export function viralLiveLogoSrc(base = (import.meta.env && import.meta.env.BASE_URL) || '/') {
  return String(base).replace(/\/?$/, '/') + 'brand/pikk-official-approved.jpg';
}

/**
 * PIKK 24/7 Viral Live: rights-safe discovery PREVIEW only.
 * Source links are not a rebroadcast license. Do not autoplay, rehost, claim
 * actual engagement, or call this a running stream until the server exists.
 */
const SOURCES = VIDEOS.filter(video => ['dirty-money', '93', 'no-love'].includes(video.id)).map(video => ({
  id: video.id,
  title: video.title,
  artist: 'DatBoiSkeet',
  url: video.youtube,
  // Original YouTube source thumbnail: discovery artwork, never rebroadcast media.
  thumbnail: `https://i.ytimg.com/vi/${encodeURIComponent(new URL(video.youtube).searchParams.get('v'))}/hqdefault.jpg`,
}));

const TYPES = [
  { id: 'videos', label: 'Videos' },
  { id: 'clips', label: 'Viral clips', browseHref: '#/shorts', browseLabel: 'Browse existing PIKK Clips' },
  { id: 'songs', label: 'Songs', browseHref: '#/music', browseLabel: 'Explore PIKK Music' },
  { id: 'photos', label: 'Photos', browseHref: '#/home', browseLabel: 'Explore PIKK Home' },
];

export function renderViralLive() {
  const first = SOURCES[0];
  const choices = SOURCES.map((item, index) => `
    <button type="button" class="pikk-viral-choice${index === 0 ? ' is-selected' : ''}"
      data-viral-pick="${index}" aria-pressed="${index === 0}">
      <span class="pikk-viral-choice-num">${String(index + 1).padStart(2, '0')}</span>
      <img class="pikk-viral-choice-thumb" src="${esc(item.thumbnail)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <span class="pikk-viral-choice-copy"><strong>${esc(item.title)}</strong><small>${esc(item.artist)} · Original YouTube source</small></span>
      <span class="pikk-viral-choice-arrow" aria-hidden="true">↗</span>
    </button>`).join('');

  return shellPage('PIKK Viral Live', `
    <div id="pikkViralPreview" class="pikk-viral-page">
      <section class="pikk-viral-hero" aria-label="PIKK Viral Live channel preview">
        <div class="pikk-viral-hero-copy">
          <span class="pikk-viral-kicker"><span aria-hidden="true" class="pikk-viral-signal"></span> PIKK 24/7 · CHANNEL PREVIEW</span>
          <h2>What's viral.<br><em>All in one place.</em></h2>
          <p>Discover clips, music, videos and creators in one nonstop destination when the licensed channel launches.</p>
          <div class="pikk-viral-hero-actions">
            <a class="btn primary" href="#/live">Explore PIKK Live</a>
            <a class="btn ghost" href="#/shorts">Explore Clips</a>
          </div>
        </div>
        <div class="pikk-viral-hero-mark" aria-hidden="true"><img class="pikk-viral-hero-logo" src="${esc(viralLiveLogoSrc())}" alt="" decoding="async" loading="eager"></div>
      </section>

      <div class="pikk-viral-notice" role="status">
        <strong>PREVIEW · NOT BROADCASTING</strong>
        <span>Real-time viewer counts, live chat, engagement ranking and 24/7 playback are not connected. Nothing here is represented as live.</span>
      </div>

      <nav class="pikk-viral-tabs" aria-label="Viral Live content types" role="tablist">
        ${TYPES.map((type, i) => `<button type="button" role="tab" data-viral-type="${type.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" aria-controls="viral-panel-${type.id}" id="viral-tab-${type.id}">${type.label}</button>`).join('')}
      </nav>

      <section id="viral-panel-videos" data-viral-panel="videos" role="tabpanel" tabindex="0" aria-labelledby="viral-tab-videos">
        <div class="pikk-viral-stage" aria-label="Original video discovery">
          <div class="pikk-viral-stage-art"><img id="pikkViralThumbnail" src="${esc(first.thumbnail)}" alt="" decoding="async" referrerpolicy="no-referrer"><span class="pikk-viral-stage-play" aria-hidden="true">▶</span><small>ORIGINAL VIDEO · SOURCE PREVIEW</small></div>
          <div class="pikk-viral-stage-body">
            <span class="pikk-viral-stage-eyebrow">FEATURED SOURCE · NOT A LIVESTREAM</span>
            <h3 id="pikkViralTitle" aria-live="polite">${esc(first.title)}</h3>
            <p id="pikkViralCreator">${esc(first.artist)} · Watch from the original publisher</p>
            <a class="btn primary" id="pikkViralSource" href="${esc(first.url)}" target="_blank" rel="noopener noreferrer">Watch original on YouTube</a>
            <p class="pikk-viral-caption">Opening the source does not grant PIKK rebroadcast or music licensing rights.</p>
          </div>
        </div>
        <div class="pikk-viral-section-head"><h3>Up next · source library</h3><span>Manual preview · ${SOURCES.length} existing music videos</span></div>
        <div class="pikk-viral-queue" id="pikkViralQueue" role="group" aria-label="Choose an original video source">${choices}</div>
      </section>

      ${TYPES.filter(type => type.id !== 'videos').map(type => `
        <section class="pikk-viral-empty" id="viral-panel-${type.id}" data-viral-panel="${type.id}" role="tabpanel" tabindex="0" aria-labelledby="viral-tab-${type.id}" hidden>
          <span class="pikk-viral-empty-symbol" aria-hidden="true">◇</span>
          <h3>${esc(type.label)} are being prepared</h3>
          <p>No approved items are queued in this category yet. Creator permission, licensing and moderation must be confirmed before content appears here.</p>
          <a class="btn ghost" href="${esc(type.browseHref)}">${esc(type.browseLabel)}</a>
        </section>`).join('')}

      <section class="pikk-viral-safety" aria-label="Channel launch requirements">
        <div><span class="pikk-viral-section-kicker">CREATOR FIRST</span><h3>Trending, with permission.</h3><p>Creators will be credited and linked to their profiles. The planned feed will rotate by engagement quality, velocity and freshness, not views alone.</p></div>
        <ul>
          <li>Explicit permission to rebroadcast every video, photo and song</li>
          <li>Music and third-party rights clearance before playback</li>
          <li>Moderation, creator opt-out, removal and duplicate checks</li>
          <li>Real-time chat, viewer counts and Up Next only when backed by a live service</li>
        </ul>
      </section>
    </div>
  `, { lead: 'Discover the planned 24/7 viral channel · preview only' });
}

export function bindViralLive(root) {
  const page = root.querySelector('#pikkViralPreview');
  if (!page) return;
  page.querySelectorAll('[data-viral-pick]').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.viralPick);
      const source = SOURCES[index];
      if (!source) return;
      page.querySelector('#pikkViralTitle').textContent = source.title;
      page.querySelector('#pikkViralCreator').textContent = source.artist + ' · Watch from the original publisher';
      page.querySelector('#pikkViralSource').href = source.url;
      page.querySelector('#pikkViralThumbnail').src = source.thumbnail;
      page.querySelectorAll('[data-viral-pick]').forEach(item => {
        const selected = item === button;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
    });
  });
  // The source library supports keyboard browsing without changing the licensed-content preview.
  // Reuse each button's click handler so its aria-pressed state and source link stay in sync.
  const sourceButtons = Array.from(page.querySelectorAll('[data-viral-pick]'));
  sourceButtons.forEach((button, index) => {
    button.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const last = sourceButtons.length - 1;
      const next = event.key === 'Home' ? 0
        : event.key === 'End' ? last
        : (index + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + sourceButtons.length) % sourceButtons.length;
      const target = sourceButtons[next];
      target.click();
      target.focus();
      target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  });
  // A tablist is one keyboard stop. Arrows and Home/End switch panels and move focus.
  const typeTabs = Array.from(page.querySelectorAll('[data-viral-type]'));
  function selectType(button, moveFocus = false) {
    const type = button.dataset.viralType;
    typeTabs.forEach(item => {
      const selected = item === button;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    page.querySelectorAll('[data-viral-panel]').forEach(panel => {
      panel.hidden = panel.dataset.viralPanel !== type;
    });
    if (moveFocus) {
      button.focus();
      // On 320px screens the content tabs scroll horizontally. Keep keyboard selection visible.
      button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }
  typeTabs.forEach((button, index) => {
    button.addEventListener('click', () => selectType(button));
    button.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const last = typeTabs.length - 1;
      const next = event.key === 'Home' ? 0
        : event.key === 'End' ? last
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + typeTabs.length) % typeTabs.length;
      selectType(typeTabs[next], true);
    });
  });
}
