import {
  COMING_SOON,
  MEMBERSHIPS,
  PURCHASABLE,
  VAULT_ITEMS,
  STREAMING_RELEASES,
  STREAMING_ARTIST,
  YOUTUBE_MIXES,
  YOUTUBE_CHANNEL_PLAYLISTS,
} from '../data.js';
import {
  getState,
  setMembership,
  getMembership,
  hasVaultAccess,
  purchaseTrack,
  listCatalog,
} from '../store.js';
import { esc, shellPage, toast, ytEmbedSrc } from '../ui.js';
import { navigate } from '../router.js';
import { resolveMediaSrc } from '../media-db.js';
import { bindPageYoutubeEmbeds } from '../player.js';

function refresh(hash) {
  navigate(hash || '#/music');
}

const PLATFORM_LABELS = {
  apple: 'Apple Music',
  spotify: 'Spotify',
  youtubeMusic: 'YouTube Music',
  youtube: 'YouTube',
  tidal: 'Tidal',
  amazon: 'Amazon Music',
};

function normalizeStreamingLinks(links) {
  if (!links || typeof links !== 'object') return {};
  const out = {};
  for (const key of Object.keys(PLATFORM_LABELS)) {
    const v = String(links[key] || '').trim();
    if (v.startsWith('http://') || v.startsWith('https://')) out[key] = v;
  }
  return out;
}

function platformButtons(links) {
  const normalized = normalizeStreamingLinks(links);
  const keys = Object.keys(PLATFORM_LABELS).filter((k) => normalized[k]);
  if (!keys.length) return '<span class="muted" style="font-size:12px">No platform links yet</span>';
  return keys
    .map(
      (k) =>
        `<a class="btn stream-plat stream-plat-${esc(k)}" href="${esc(normalized[k])}" target="_blank" rel="noopener">${esc(
          PLATFORM_LABELS[k]
        )}</a>`
    )
    .join('');
}

// Apple-hosted embed: playback and preview limits are controlled by Apple.
// Only construct an embed URL from an official Apple Music catalog link.
function appleEmbedUrl(link) {
  try {
    const url = new URL(link);
    if (url.protocol !== 'https:' || url.hostname !== 'music.apple.com') return '';
    if (!/^\/[a-z]{2}(?:-[a-z]{2})?\/(?:song|album)\//i.test(url.pathname)) return '';
    return 'https://embed.music.apple.com' + url.pathname + url.search;
  } catch (_) { return ''; }
}

function renderStreamingReleaseCard(r) {
  const cover = r.cover
    ? `<img class="stream-cover" src="${esc(r.cover)}" alt="${esc(r.title)}" loading="lazy" referrerpolicy="no-referrer" />`
    : `<div class="stream-cover stream-cover-empty" aria-hidden="true">♪</div>`;
  const note = r.albumNote ? `<div class="muted" style="font-size:11px">${esc(r.albumNote)}</div>` : '';
  const year = r.year ? ` · ${esc(String(r.year))}` : '';
  const appleEmbed = appleEmbedUrl(r.links?.apple);
  const applePlayer = appleEmbed ? `<details class="apple-music-embed"><summary>▶ Play in PIKK · Apple Music</summary><iframe title="Apple Music player for ${esc(r.title)}" src="${esc(appleEmbed)}" loading="lazy" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="width:100%;height:175px;border:0;border-radius:12px"></iframe><small class="muted">Apple controls playback availability. Full listening may require Apple Music.</small></details>` : '';
  return `
    <article class="stream-release">
      ${cover}
      <div class="stream-meta">
        <span class="chip">${esc(r.type || 'release')}</span>
        <strong>${esc(r.title)}</strong>
        <div class="muted" style="font-size:12px">${esc(r.artist || 'DatBoiSkeet')}${year}</div>
        ${note}
        ${applePlayer}
        <div class="stream-plats">${platformButtons(r.links)}</div>
      </div>
    </article>`;
}


function tierLabel(m) {
  if (m === 'inner') return 'Inner Circle';
  if (m === 'backstage') return 'Backstage';
  if (m === 'skeet+') return 'Skeet+';
  return 'None';
}

function renderVaultCards(unlocked) {
  return VAULT_ITEMS.map((item) => {
    const needsBackstage = item.tier === 'backstage' || item.tier === 'inner';
    const itemUnlocked =
      unlocked && (needsBackstage ? hasVaultAccess('backstage') : hasVaultAccess('skeet'));
    if (itemUnlocked) {
      return `
      <article class="vault-card unlocked" data-id="${esc(item.id)}">
        <img src="${esc(item.cover)}" alt="${esc(item.title)}" />
        <div class="vault-meta">
          <span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked</span>
          <strong>${esc(item.title)}</strong>
          <div class="muted" style="font-size:12px">${esc(item.artist)} · ${esc(item.status)}</div>
          <div class="muted" style="font-size:11px">Requires ${esc(item.tier)} · no audio yet</div>
        </div>
      </article>`;
    }
    return `
      <article class="vault-card locked" data-id="${esc(item.id)}">
        <div class="vault-art">
          <img src="${esc(item.cover)}" alt="${esc(item.title)}" />
          <div class="vault-lock-badge" aria-hidden="true">🔒</div>
        </div>
        <div class="vault-meta">
          <span class="chip">Locked</span>
          <strong>${esc(item.title)}</strong>
          <div class="muted" style="font-size:12px">${esc(item.artist)}</div>
          <div class="muted" style="font-size:11px">Join ${esc(item.tier)} to unlock</div>
        </div>
      </article>`;
  }).join('');
}

export function renderMusic(route = {}) {
  const musicView = ['songs', 'albums', 'beats', 'playlists', 'upload'].includes(route.query?.view) ? route.query.view : '';
  const { user } = getState();
  const membership = getMembership();
  const vaultOk = hasVaultAccess('skeet');
  const purchased = new Set(user?.purchasedTracks || []);

  const coming = COMING_SOON.map(
    (c) => `
    <div class="cover-card" style="flex:0 0 160px">
      <span class="badge-cs">${esc(c.status)}</span>
      <img src="${esc(c.cover)}" alt="${esc(c.title)}" style="width:160px;height:160px" />
      <div class="t">${esc(c.title)}</div>
      <div class="muted" style="font-size:11px">${esc(c.artist)}</div>
    </div>`
  ).join('');

  const tiers = MEMBERSHIPS.map((tier) => {
    const key =
      tier.id === 'skeet' ? 'skeet+' : tier.id === 'inner' ? 'inner' : tier.id;
    const on = membership === key || (key === 'skeet+' && (membership === 'backstage' || membership === 'inner')) || (key === 'backstage' && membership === 'inner');
    const isExact = membership === key;
    return `
    <div class="card" style="margin:0">
      <h3>${esc(tier.name)}</h3>
      <div class="price" style="font-size:22px;font-weight:900">$${tier.price}<span class="muted" style="font-size:13px">/mo</span></div>
      <p class="muted">${esc(tier.blurb)}</p>
      ${
        user
          ? isExact
            ? `<button type="button" class="btn ghost block mem-toggle" data-tier="${esc(
                tier.id
              )}" data-on="1">Active · tap to cancel (demo)</button>`
            : `<button type="button" class="btn primary block mem-toggle" data-tier="${esc(
                tier.id
              )}" data-on="0">Join · TEST MODE</button>`
          : `<a class="btn primary block" href="#/profile">Sign in to join</a>`
      }
    </div>`;
  }).join('');

  const myMusic = PURCHASABLE.filter((t) => purchased.has(t.id));
  // Also keep vault exclusives that were "collected" while member — purchases only for now
  const shop = PURCHASABLE.map((t) => {
    const owned = purchased.has(t.id);
    return `
      <div class="card" style="margin:0;display:flex;gap:12px;align-items:center">
        <img src="${esc(t.cover)}" alt="" style="width:72px;height:72px;border-radius:10px;object-fit:cover;flex:0 0 72px" />
        <div class="spacer">
          <strong>${esc(t.title)}</strong>
          <div class="muted" style="font-size:12px">${esc(t.artist)} · ${esc(t.status)}</div>
          <div style="font-weight:800;margin-top:4px">$${t.price.toFixed(2)}</div>
        </div>
        ${
          user
            ? owned
              ? `<span class="chip">In My Music</span>`
              : `<button type="button" class="btn primary buy-track" data-id="${esc(t.id)}">Buy · demo</button>`
            : `<a class="btn" href="#/profile">Sign in</a>`
        }
      </div>`;
  }).join('');

  const adminMusic = listCatalog({ publishedOnly: true, types: ['song', 'album'] });
  // Admin catalog items may carry streamingLinks (additive §14) — show alongside static catalog
  const adminStreaming = adminMusic
    .map((c) => {
      const links = normalizeStreamingLinks(c.streamingLinks || {});
      if (!Object.keys(links).length) return null;
      return {
        id: c.id,
        title: c.title,
        artist: c.artist,
        type: c.type || 'song',
        cover: c.coverRef && !String(c.coverRef).startsWith('idb:') ? c.coverRef : '',
        links,
        fromAdmin: true,
      };
    })
    .filter(Boolean);

  // Focused views are reached from the Music bottom-tab menu. Existing sections stay intact.
  const focusReleases = [...STREAMING_RELEASES, ...adminStreaming];
  let focusedViewCard = '';
  if (musicView === 'songs' || musicView === 'albums') {
    const isAlbum = musicView === 'albums';
    const selected = focusReleases.filter((release) =>
      isAlbum ? release.type === 'album' : release.type === 'single' || release.type === 'song'
    );
    focusedViewCard = `<div class="card" id="music-focused-view">
      <h2>${isAlbum ? 'Albums' : 'Songs'}</h2>
      <p class="muted">Verified releases and available official listening links.</p>
      <div class="stream-grid">${selected.map(renderStreamingReleaseCard).join('') || '<p class="muted">No releases listed in this category yet.</p>'}</div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`;
  } else if (musicView === 'playlists') {
    focusedViewCard = `<div class="card" id="music-focused-view">
      <h2>Playlists</h2>
      <p class="muted">Official YouTube playlists open on YouTube. No rehosted audio.</p>
      <div class="row wrap" style="gap:8px">
        ${YOUTUBE_CHANNEL_PLAYLISTS.map((p) => `<a class="btn ghost" href="${esc(p.youtube)}" target="_blank" rel="noopener">${esc(p.title)}</a>`).join('')}
      </div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`;
  } else if (musicView === 'beats' || musicView === 'upload') {
    const isUpload = musicView === 'upload';
    focusedViewCard = `<div class="card" id="music-focused-view">
      <h2>${isUpload ? 'Upload Music' : 'Beats'}</h2>
      <p class="muted">Not available yet · TEST MODE. ${isUpload
        ? 'Creator music uploads require secure storage, ownership verification and publishing tools.'
        : 'The producer beat marketplace and licensing checkout are still in development.'}</p>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`;
  }

  const adminMusicHtml = adminMusic.length
    ? `<div class="card catalog-admin-music">
        <h2>From Admin</h2>
        <p class="muted">Published songs &amp; albums added in Admin · TEST MODE (device-local).</p>
        <div class="cover-row">${adminMusic
          .map(
            (c) => `
          <div class="cover-card catalog-item" data-id="${esc(c.id)}" style="flex:0 0 160px">
            <span class="badge-cs">${esc(c.type)}</span>
            <img data-idb-src="${esc(c.coverRef || '')}" src="${esc(c.coverRef && !c.coverRef.startsWith('idb:') ? c.coverRef : '')}" alt="${esc(c.title)}" style="width:160px;height:160px;object-fit:cover;background:#111" />
            <div class="t">${esc(c.title)}</div>
            <div class="muted" style="font-size:11px">${esc(c.artist)}</div>
            ${c.mediaRef ? `<audio class="catalog-audio" data-idb-src="${esc(c.mediaRef)}" controls preload="none" style="width:100%;margin-top:6px"></audio>` : ''}
          </div>`
          )
          .join('')}</div>
      </div>`
    : '';

  const heroRelease = STREAMING_RELEASES.find((release) => release.cover) || null;
  const quickReleaseCovers = STREAMING_RELEASES.filter((release) => release.cover).slice(0, 5);
  const musicHero = `
    <section class="pikk-music-showcase card" aria-label="Official PIKK music discovery">
      <div class="pikk-music-showcase-copy">
        <p class="kicker">PIKK MUSIC · DATBOISKEET</p>
        <h2>Discover the sound.</h2>
        <p>Stream verified releases, browse albums and playlists, and explore the Vault.</p>
        <div class="pikk-music-showcase-actions">
          <a class="btn primary" href="#/music?view=songs">Listen to Songs</a>
          <a class="btn ghost" href="#/music?view=albums">Browse Albums</a>
        </div>
        <span class="pikk-music-showcase-note">Official listening destinations · TEST MODE for purchases and memberships</span>
      </div>
      ${heroRelease ? `<div class="pikk-music-showcase-art"><img src="${esc(heroRelease.cover)}" alt="${esc(heroRelease.title)} official cover" decoding="async" loading="eager"/><span>${esc(heroRelease.title)}</span></div>` : ''}
    </section>
    <nav class="pikk-music-categories" aria-label="Music categories">
      <a href="#/music?view=songs" class="${musicView === 'songs' ? 'on' : ''}">Songs</a>
      <a href="#/music?view=albums" class="${musicView === 'albums' ? 'on' : ''}">Albums</a>
      <a href="#/music?view=beats" class="${musicView === 'beats' ? 'on' : ''}">Beats</a>
      <a href="#/music?view=playlists" class="${musicView === 'playlists' ? 'on' : ''}">Playlists</a>
      <a href="#/music#vault">Vault</a>
      <a href="#/ai-artists">AI Artists · Clearly labeled</a>
      <a href="#/shield">PIKK Shield · Rights preview</a>
    </nav>
    <section class="pikk-music-release-strip" aria-label="Official music covers">
      <div class="pikk-music-release-header"><h3>Listen &amp; discover</h3><a href="#/music#stream-everywhere">See all releases →</a></div>
      <div class="pikk-music-release-row">
        ${quickReleaseCovers.map((release) => `<a class="pikk-music-release-tile" href="#/music#stream-everywhere">
          <img src="${esc(release.cover)}" alt="${esc(release.title)} cover" loading="lazy" decoding="async"/>
          <strong>${esc(release.title)}</strong>
          <small>${esc(release.artist || 'DatBoiSkeet')}</small>
        </a>`).join('')}
      </div>
    </section>`;

  const body = `
    ${musicHero}
    ${focusedViewCard}
    <div class="card">
      <h2>Upcoming Releases</h2>
      <p class="muted">Real DatBoiSkeet cover art · playback unlocks when released. No fake tracks.</p>
      <div class="cover-row">${coming}</div>
    </div>
    ${adminMusicHtml}


    <div class="card" id="youtube-mixes">
      <h2>YouTube Mixes · Channel</h2>
      <p class="muted">Dogs &amp; mixes stream from the <strong>original YouTube source</strong> (embeds / Play on YouTube). Not rehosted. Released catalog still uses Stream Everywhere below.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0 14px">
        <a class="btn" href="${esc(STREAMING_ARTIST.youtube)}" target="_blank" rel="noopener">Official channel</a>
        <a class="btn ghost" href="${esc(STREAMING_ARTIST.youtubeHandle || STREAMING_ARTIST.youtube)}" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        ${YOUTUBE_CHANNEL_PLAYLISTS.map(
          (p) => `<a class="btn ghost" href="${esc(p.youtube)}" target="_blank" rel="noopener">${esc(p.title)}</a>`
        ).join('')}
      </div>
      <div class="yt-mix-grid">
        ${YOUTUBE_MIXES.map(
          (m) => `
          <article class="yt-mix-card">
            <div class="hero-video" style="margin:0 0 10px">
              <iframe src="${esc(ytEmbedSrc(m.embed))}" title="${esc(m.title)}" allowfullscreen loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
            <h3 style="margin:0 0 6px">${esc(m.title)}</h3>
            <p class="muted" style="margin:0 0 10px;font-size:13px">${esc(m.blurb || '')}</p>
            <a class="btn" href="${esc(m.youtube)}" target="_blank" rel="noopener">Play on YouTube</a>
          </article>`
        ).join('')}
      </div>
    </div>

    <div class="card" id="stream-everywhere">
      <h2>Featured · Stream Everywhere</h2>
      <p class="muted">Official DatBoiSkeet releases — Apple Music is the primary listening destination: use the Apple-hosted player on supported releases or open the song in Apple Music. Other verified platforms are optional. Full Apple Music playback may require a subscription. External streams are not rehosted in-app. Separate from Vault &amp; purchases.</p>
      <div class="stream-artist row wrap" style="gap:8px;margin:10px 0 14px">
        <span class="chip">Artist</span>
        <a class="btn stream-plat stream-plat-apple" href="${esc(STREAMING_ARTIST.apple)}" target="_blank" rel="noopener">Apple Music · Listen</a>
        <a class="btn ghost stream-plat stream-plat-spotify" href="${esc(STREAMING_ARTIST.spotify)}" target="_blank" rel="noopener">Spotify · Alternative</a>
        <a class="btn stream-plat stream-plat-youtubeMusic" href="${esc(STREAMING_ARTIST.youtubeMusic)}" target="_blank" rel="noopener">YouTube Music</a>
        <a class="btn stream-plat stream-plat-youtube" href="${esc(STREAMING_ARTIST.youtube)}" target="_blank" rel="noopener">YouTube</a>
      </div>
      <div class="stream-grid">
        ${STREAMING_RELEASES.map(renderStreamingReleaseCard).join('')}
        ${adminStreaming.map(renderStreamingReleaseCard).join('')}
      </div>
      <p class="muted" style="margin-top:12px;font-size:12px">Tidal / Amazon Music omitted until official links are verified. Admin can add more via streaming link fields.</p>
    </div>

    <div class="card">
      <h2>My Music</h2>
      <p class="muted">Purchases stay here even if membership ends.</p>
      ${
        myMusic.length
          ? `<div class="cover-row">${myMusic
              .map(
                (t) => `
            <div class="cover-card" style="flex:0 0 120px">
              <img src="${esc(t.cover)}" alt="${esc(t.title)}" style="width:120px;height:120px" />
              <div class="t">${esc(t.title)}</div>
              <div class="muted" style="font-size:11px">Owned · Coming Soon</div>
            </div>`
              )
              .join('')}</div>`
          : '<p class="muted">Nothing purchased yet. Buy a Coming Soon cover below (demo · no charge).</p>'
      }
    </div>

    <div class="card">
      <h2>Buy (demo)</h2>
      <p class="muted">TEST MODE — no charges. Marks the cover as owned in My Music. Audio not available until release.</p>
      <div style="display:flex;flex-direction:column;gap:10px">${shop}</div>
    </div>

    <div class="card" id="vault">
      <h2>Vault ${vaultOk ? '<span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked · ' + esc(tierLabel(membership)) + '</span>' : '<span class="chip">Locked</span>'}</h2>
      <p class="muted">Exclusive unreleased tracks &amp; previews for members. Nested under Music — not a bottom-nav tab.</p>

      <div class="vault-grid" style="margin:12px 0">
        ${renderVaultCards(vaultOk)}
      </div>

      ${
        vaultOk
          ? `<div class="vault-lock" style="border-style:solid;border-color:#2a4a3a;color:var(--tx)">
              ✅ Membership active: <strong>${esc(tierLabel(membership))}</strong>. Exclusive cards above are unlocked.
              Cancel anytime with the tier button below (demo). Purchased My Music items are kept.
            </div>`
          : `<div class="vault-lock">
              🔒 Vault locked. Sign in, then tap <strong>Join · TEST MODE</strong> on Skeet+ or Backstage below.
              Locked cards show title/cover only — no exclusive content until you join.
            </div>`
      }

      <h3 style="margin:16px 0 8px">Membership (TEST MODE)</h3>
      <div class="grid-2">${tiers}</div>
    </div>

  `;
  return shellPage('Music & Vault', body, {
    lead: 'Singles, albums, Coming Soon, and member Vault.',
  });
}

export function bindMusic(root) {
  // §17: Mix embeds → IFrame API interrupt; Stream Everywhere / Open links do not pause
  const mixRoot = root.querySelector('#youtube-mixes') || root;
  bindPageYoutubeEmbeds(mixRoot);
  root.querySelectorAll('.mem-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cancelling = btn.dataset.on === '1';
      const r = setMembership(btn.dataset.tier, !cancelling);
      if (r?.error) return toast('Sign in required — open Profile first');
      toast(
        cancelling
          ? 'Membership cancelled (demo) · My Music purchases kept'
          : `Joined ${btn.dataset.tier} (TEST MODE) · Vault unlocked`
      );
      // Re-render Music and scroll to Vault without full page reload
      refresh('#/music');
      setTimeout(() => document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    });
  });
  root.querySelectorAll('.buy-track').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const r = purchaseTrack(btn.dataset.id);
      if (r?.error) return toast('Sign in required');
      toast('Added to My Music (demo · no charge)');
      refresh('#/music');
    });
  });
  root.querySelectorAll('[data-idb-src]').forEach(async (el) => {
    const ref = el.getAttribute('data-idb-src');
    if (!ref) return;
    const src = await resolveMediaSrc(ref);
    if (!src) return;
    if (el.tagName === 'IMG' || el.tagName === 'AUDIO' || el.tagName === 'VIDEO') el.src = src;
  });
}
