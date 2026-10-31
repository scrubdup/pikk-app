/**
 * t215u/t217u · Shorts under Posts (create via Picture/Short/Video picker — not separate tabs).
 * Vertical short-form feed shell · DEMO clips from VIDEOS catalog · TEST MODE.
 */
import { VIDEOS } from '../data.js';
import { esc, shellPage, toast, ytEmbedSrc } from '../ui.js';
import { bindPageYoutubeEmbeds } from '../player.js';

/** Prefer Music Videos as short-form demo clips (skip Mixes / playlist embeds). */
function demoClips() {
  const mvs = VIDEOS.filter((v) => (v.category || '') === 'Music Videos' && v.embed);
  const pool = mvs.length ? mvs : VIDEOS.filter((v) => v.embed);
  return pool.slice(0, 10).map((v, i) => ({
    id: `clip_${v.id}`,
    videoId: v.id,
    title: v.title,
    artist: v.artist || 'DatBoiSkeet',
    embed: v.embed,
    youtube: v.youtube,
    blurb: i % 3 === 0 ? 'Clip cut · DEMO' : i % 3 === 1 ? 'Highlight · DEMO' : 'Short · DEMO',
  }));
}

function clipCard(c, index) {
  return `
    <article class="shorts-card" data-clip-id="${esc(c.id)}" id="shorts-card-${index}">
      <div class="shorts-stage">
        <div class="shorts-embed hero-video">
          <iframe
            src="${esc(ytEmbedSrc(c.embed))}"
            title="${esc(c.title)}"
            allowfullscreen
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div class="shorts-meta">
          <span class="chip">${esc(c.blurb)}</span>
          <span class="chip">TEST MODE</span>
          <h3 class="shorts-title">${esc(c.title)}</h3>
          <p class="muted shorts-artist">@${esc(c.artist)}</p>
          <div class="row wrap shorts-actions">
            <a class="btn ghost" href="${esc(c.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
            <a class="btn ghost" href="#/videos">Full Videos</a>
            <a class="btn ghost" href="#/live">Live channels</a>
          </div>
        </div>
      </div>
    </article>`;
}

export function renderShorts() {
  const clips = demoClips();
  const feed = clips.map(clipCard).join('') || '<p class="muted">No demo clips seeded.</p>';
  const body = `
    <div class="card shorts-intro">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:flex-start">
        <div>
          <p class="muted" style="margin:0;max-width:40rem">
            Vertical short-form clips for people who do not want a full Live.
            Demo cards reuse official Music Video embeds from the catalog — not a separate clip CDN yet.
          </p>
        </div>
        <span class="chip">TEST MODE</span>
      </div>
      <div class="row wrap" style="margin-top:10px;gap:8px">
        <a class="btn primary" href="#/posts?compose=1&type=short">Post a Short</a>
        <a class="btn ghost" href="#/posts">← Posts</a>
        <a class="btn ghost" href="#/videos">Videos</a>
      </div>
    </div>
    <div class="shorts-feed" id="shortsFeed" aria-label="Shorts feed">
      ${feed}
    </div>
    <p class="muted" style="margin:12px 0 0;font-size:12px;text-align:center">
      End of DEMO feed · ${clips.length} clips · Scroll for more when real clip uploads ship
    </p>`;

  return shellPage('Shorts / Clips', body, {
    lead: 'Posts · short-form feed · Picture / Short / Video create on Posts · TEST MODE',
  });
}

export function bindShorts(root) {
  bindPageYoutubeEmbeds(root);
  root.querySelectorAll('.shorts-card').forEach((card) => {
    card.addEventListener('focusin', () => {
      card.classList.add('is-focus');
    });
  });
  // Soft honesty toast once per bind if empty (should not happen with catalog)
  if (!root.querySelector('.shorts-card')) {
    toast('No demo clips · add MVs in data.js');
  }
}
