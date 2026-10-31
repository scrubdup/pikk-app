import { esc, shellPage, toast } from '../ui.js';
import { notifyVideoPlaying, notifyVideoIdle } from '../player.js';

/** t298u — Block Wars lobby / fighter select (Coming Soon · not playable) */
const CITIES = [
  {
    id: 'ny',
    name: 'NY',
    tag: 'East coast',
    still: '/blockwars-preview/preview-ny-still.jpg',
    fighter: 'Brooklyn Brawler',
    blurb: 'Street-pressured power from the five boroughs. Heavy combos, tight corners — TEST MODE teaser only.',
  },
  {
    id: 'la',
    name: 'LA',
    tag: 'West coast',
    still: '/blockwars-preview/preview-la-still.jpg',
    fighter: 'Sunset Striker',
    blurb: 'Flashy footwork under neon skies. Style meets speed — Coming Soon, not a real match engine.',
  },
  {
    id: 'chi',
    name: 'Chicago',
    tag: 'Midwest',
    still: '/blockwars-preview/preview-chi-still.jpg',
    fighter: 'Windy City Wall',
    blurb: 'Defense-first grit from the lakefront. Hold the block — lobby demo only, no live fights yet.',
  },
];

function cityCardsHtml(activeId) {
  return CITIES.map((c) => {
    const on = c.id === activeId ? ' is-active' : '';
    const pressed = c.id === activeId ? 'true' : 'false';
    return (
      `<button type="button" class="bw-city-card${on}" data-city="${esc(c.id)}" aria-pressed="${pressed}" aria-label="${esc(c.name)} fighter">` +
      `<img src="${esc(c.still)}" alt="" width="120" height="160" loading="lazy" decoding="async" />` +
      `<span class="bw-city-meta">` +
      `<span class="bw-city-name">${esc(c.name)}</span>` +
      `<span class="bw-city-tag">${esc(c.tag)}</span>` +
      `</span></button>`
    );
  }).join('');
}

function focusHtml(city) {
  return (
    `<div class="bw-focus" id="bwFocus" data-city="${esc(city.id)}">` +
    `<div class="bw-focus-still"><img id="bwFocusImg" src="${esc(city.still)}" alt="${esc(city.fighter)}" width="110" height="140" /></div>` +
    `<div class="bw-focus-copy">` +
    `<p class="bw-focus-city">${esc(city.name)} · ${esc(city.tag)}</p>` +
    `<h3 id="bwFocusName">${esc(city.fighter)}</h3>` +
    `<p id="bwFocusBlurb">${esc(city.blurb)}</p>` +
    `</div></div>`
  );
}

export function renderBlockWars() {
  const active = CITIES[0];
  const body = `
    <div class="card bw-preview bw-lobby" id="bw-coming-soon">
      <div class="bw-lobby-head bw-preview-head">
        <div>
          <p class="kicker" style="margin:0">Games · Lobby demo</p>
          <h2 class="bw-lobby-title bw-preview-title" style="margin:4px 0 0">Block Wars</h2>
        </div>
        <span class="badge-cs" id="bw-coming-soon-badge">Coming Soon</span>
      </div>
      <p class="muted bw-preview-lead">Pick a city fighter below — teaser lobby only. Full gameplay is <strong>not</strong> shipping yet.</p>

      <div class="bw-city-grid" id="bwCityGrid" role="group" aria-label="City fighters">
        ${cityCardsHtml(active.id)}
      </div>

      ${focusHtml(active)}

      <button type="button" class="btn primary bw-arena-cta" id="bwEnterArena">
        Enter arena · Coming Soon
      </button>
      <p class="chip" style="margin-top:10px">TEST MODE · lobby select only · not a playable game</p>
    </div>

    <div class="card bw-preview" id="bw-preview-video-card">
      <div class="bw-preview-head">
        <div>
          <p class="kicker" style="margin:0">Fighter preview</p>
          <h3 class="bw-preview-title" style="margin:4px 0 0;font-size:18px">Watch the teaser</h3>
        </div>
        <span class="chip bw-preview-chip">~12s</span>
      </div>
      <div class="bw-preview-frame">
        <video
          id="bwCsVideo"
          class="bw-preview-video"
          poster="/blockwars-preview/frames/01.jpg"
          src="/blockwars-preview/blockwars-fighters-preview.mp4"
          playsinline
          webkit-playsinline
          preload="metadata"
          controls
          controlslist="nodownload noplaybackrate"
          aria-label="Block Wars fighter preview"></video>
        <button type="button" class="bw-preview-play" id="bwCsPlay" aria-label="Play Block Wars preview">
          <span class="bw-preview-play-icon" aria-hidden="true">▶</span>
          <span class="bw-preview-play-label">Watch preview</span>
        </button>
      </div>
      <div class="bw-preview-foot muted">NY · LA · Chicago slideshow · tap play · Coming soon on DBS</div>
    </div>

    <div class="card">
      <h3 style="margin:0 0 8px">What’s coming</h3>
      <ul class="muted" style="margin:0;padding-left:1.2em;line-height:1.55">
        <li>City fighter matchups (NY · LA · Chicago)</li>
        <li>DatBoiSkeet-branded Block Wars arena</li>
        <li>Full gameplay &amp; character art — <strong>paused</strong> (lobby + preview assets only for now)</li>
      </ul>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <a class="btn ghost" href="#/home">Back to Home</a>
      </div>
    </div>`;

  return shellPage('Block Wars', body, {
    lead: 'Coming Soon · lobby fighter select · preview video · not playable yet.',
  });
}

function setActiveCity(root, cityId) {
  const city = CITIES.find((c) => c.id === cityId) || CITIES[0];
  root.querySelectorAll('.bw-city-card').forEach((btn) => {
    const on = btn.getAttribute('data-city') === city.id;
    btn.classList.toggle('is-active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  const focus = root.querySelector('#bwFocus');
  const img = root.querySelector('#bwFocusImg');
  const name = root.querySelector('#bwFocusName');
  const blurb = root.querySelector('#bwFocusBlurb');
  const cityLabel = root.querySelector('.bw-focus-city');
  if (focus) focus.setAttribute('data-city', city.id);
  if (img) {
    img.src = city.still;
    img.alt = city.fighter;
  }
  if (name) name.textContent = city.fighter;
  if (blurb) blurb.textContent = city.blurb;
  if (cityLabel) cityLabel.textContent = `${city.name} · ${city.tag}`;
}

export function bindBlockWars(root) {
  root.querySelector('#bwCityGrid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.bw-city-card');
    if (!btn) return;
    e.preventDefault();
    setActiveCity(root, btn.getAttribute('data-city'));
  });

  root.querySelector('#bwEnterArena')?.addEventListener('click', (e) => {
    e.preventDefault();
    toast('Block Wars arena is Coming Soon — lobby demo only. No match engine yet.');
  });

  const bwVid = root.querySelector('#bwCsVideo');
  const bwPlay = root.querySelector('#bwCsPlay');
  if (!bwVid) return;
  const syncBwOverlay = () => {
    if (!bwPlay) return;
    const show = bwVid.paused || bwVid.ended;
    bwPlay.hidden = !show;
    bwPlay.setAttribute('aria-hidden', show ? 'false' : 'true');
  };
  bwPlay?.addEventListener('click', (e) => {
    e.preventDefault();
    bwVid.play().catch(() => {});
  });
  bwVid.addEventListener('play', () => {
    notifyVideoPlaying();
    syncBwOverlay();
  });
  bwVid.addEventListener('pause', () => {
    notifyVideoIdle();
    syncBwOverlay();
  });
  bwVid.addEventListener('ended', () => {
    notifyVideoIdle();
    syncBwOverlay();
  });
  bwVid.addEventListener('pointerdown', () => {
    if (!bwVid.paused) notifyVideoPlaying();
  });
  syncBwOverlay();
}
