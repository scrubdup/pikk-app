import { VIDEOS, COMING_SOON } from '../data.js';
import { getAppDailyGoal, donateToGoal } from '../store.js';
import { esc, toast } from '../ui.js';

/** Approved home structure: PIKK GOAL → House Pick stories → filters → official videos */
export function renderHome() {
  const musicVideos = VIDEOS.filter((v) => (v.category || 'Music Videos') === 'Music Videos');
  const homeMVs = musicVideos.filter((v) => v.featured);
  const carouselMVs = homeMVs.length ? homeMVs : musicVideos.slice(0, 6);

  const mediaFeatureItems = carouselMVs.slice(0, 6).map((v, index) => {
    let youtubeId = '';
    try { youtubeId = new URL(v.youtube).searchParams.get('v') || ''; } catch (_) {}
    const image = youtubeId
      ? `https://i.ytimg.com/vi/${encodeURIComponent(youtubeId)}/hqdefault.jpg`
      : '';
    return `<a class="pikk-home-media-card ${index < 2 ? 'is-featured' : ''}" href="${esc(v.youtube)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${esc(v.title)} on YouTube">
       ${image ? `<img src="${esc(image)}" alt="" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async" referrerpolicy="no-referrer"/>` : '<span class="pikk-home-media-fallback" aria-hidden="true">♫</span>'}
       <span class="pikk-home-media-shadow"></span>
       <span class="pikk-home-media-badge">▶ OFFICIAL VIDEO</span>
       <span class="pikk-home-media-title">${esc(v.title)}</span>
     </a>`;
  }).join('');

  const g = getAppDailyGoal();
  const pct = g ? Math.min(100, Math.round((g.raised / (g.targetAmount || 1)) * 100)) : 0;
  const raised = g ? Number(g.raised || 0) : 0;
  const target = g ? Number(g.targetAmount || 50) : 50;

  const goalCard = `<div class="card home-sell-promo home-app-goal" id="home-app-goal">
      <div class="row" style="justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
        <div>
          <strong style="letter-spacing:.04em">PIKK GOAL</strong>
          <div class="muted" style="font-size:12px;margin-top:2px">$${raised} of $${target} · TEST MODE</div>
        </div>
        <button type="button" class="btn primary" id="homeGoalDonate">Donate</button>
      </div>
      <div class="home-goal-bar" style="margin-top:10px" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
        <div class="home-goal-fill" style="width:${pct}%"></div>
      </div>
    </div>`;

  const cover = (i) =>
    COMING_SOON[i]
      ? `<img src="${esc(COMING_SOON[i].cover)}" alt="" loading="lazy" decoding="async"/>`
      : `<span class="pikk-home-circle-symbol" aria-hidden="true">◆</span>`;

  return `
    <section class="page pikk-home-approved" style="padding-top:8px">
      ${goalCard}

      <section class="pikk-home-visual" id="pikkHomeVisual" style="margin-top:12px">
        <nav class="pikk-home-circle-strip" aria-label="House Pick stories">
          <a class="pikk-home-circle" href="#/posts?compose=1" aria-label="Create">
            <span class="pikk-home-circle-ring pikk-home-circle-symbol" aria-hidden="true">＋</span>
            <span>Create</span>
          </a>
          <a class="pikk-home-circle" href="#/home" aria-label="For You">
            <span class="pikk-home-circle-ring">${cover(0)}</span>
            <span>For You</span>
            <small class="pikk-home-circle-tag">HOUSE PICK</small>
          </a>
          <a class="pikk-home-circle" href="#/connect" aria-label="Following">
            <span class="pikk-home-circle-ring">${cover(1)}</span>
            <span>Following</span>
            <small class="pikk-home-circle-tag">HOUSE PICK</small>
          </a>
          <a class="pikk-home-circle" href="#/music" aria-label="Music">
            <span class="pikk-home-circle-ring">${cover(2)}</span>
            <span>Music</span>
            <small class="pikk-home-circle-tag">HOUSE PICK</small>
          </a>
        </nav>

        <nav class="pikk-home-filterbar" aria-label="Filters">
          <a class="is-current" href="#/explore">All</a>
          <a href="#/videos">Videos</a>
          <a href="#/music">Music</a>
          <a href="#/posts">Photos</a>
          <a href="#/live">Live</a>
        </nav>

        <div class="pikk-home-media-grid" aria-label="Official videos">
          ${mediaFeatureItems}
        </div>
      </section>
    </section>`;
}

export function bindHome() {
  document.getElementById('homeGoalDonate')?.addEventListener('click', () => {
    const g = getAppDailyGoal();
    if (!g) {
      toast('No goal right now');
      return;
    }
    try {
      donateToGoal(g.id, 50);
      toast('Donated 50 coins (TEST MODE)');
      location.hash = '#/home';
    } catch (e) {
      toast(e?.message || 'Donate failed');
    }
  });
}
