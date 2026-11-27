import { VIDEOS, COMING_SOON, HOME_SECTIONS, YOUTUBE_MIXES } from '../data.js';
import { notifyVideoPlaying, notifyVideoIdle, bindPageYoutubeEmbeds, bindYoutubeInterrupt, destroyPageYtPlayer } from '../player.js';
import { listCatalog, getState, listHotLives, listRisingStreamers, getHotPosts, getMostPlayedSongToday, getAppDailyGoal, donateToGoal } from '../store.js';
import { esc, shellPage, ytEmbedSrc, toast } from '../ui.js';
import { resolveMediaSrc } from '../media-db.js';
import { PIKK_GAMES, arcadeArtSrc } from '../games/arcade-catalog.js';
import { renderStoriesAndPromotions } from '../featured-promos.js';

const SECTION_ICONS = { Explore: '🧭', 'Shorts / Clips': '▶', Music: '🎵', Videos: '🎬', Posts: '📸', Live: '🔴', 'PIKK Lounge': '💬', Vault: '🔐', Marketplace: '🛍️', Missions: '🎯' };
const STAGE_TABS = [ { id: 'toplive', label: 'Top live' }, { id: 'videos', label: 'Videos' }, { id: 'rising', label: 'Rising' }, { id: 'hot', label: 'Hot lives' }, { id: 'songs', label: 'Songs' } ];
const STAGE_CYCLE_MS = 8000;
const STAGE_PREF_KEY = 'dbs_home_stage_v2';

function fmtViewers(n) {
  const v = Number(n) || 0;
  if (v >= 1000) return `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k`;
  return String(v);
}
function isHouseLive(l) { return !!(l && (l.house || l.hostId === 'dbs' || l.hostName === 'DatBoiSkeet')); }
function isHousePost(h) { return !!(h && (h.house || h.userId === 'dbs' || h.username === 'DatBoiSkeet')); }

export function renderHome() {
  const musicVideos = VIDEOS.filter((v) => (v.category || 'Music Videos') === 'Music Videos');
  const homeMVs = musicVideos.filter((v) => v.featured);
  const carouselMVs = homeMVs.length ? homeMVs : musicVideos.slice(0, 6);
  const mediaFeatureItems = carouselMVs.slice(0, 6).map((v, index) => {
    const youtubeId = (() => { try { return new URL(v.youtube).searchParams.get('v') || ''; } catch { return ''; } })();
    const image = youtubeId ? `https://i.ytimg.com/vi/${encodeURIComponent(youtubeId)}/hqdefault.jpg` : '';
    return `<a class="pikk-home-media-card ${index < 2 ? 'is-featured' : ''}" href="${esc(v.youtube)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${esc(v.title)} on YouTube">
       ${image ? `<img src="${esc(image)}" alt="" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async" referrerpolicy="no-referrer"/>` : '<span class="pikk-home-media-fallback" aria-hidden="true">♫</span>'}
       <span class="pikk-home-media-shadow"></span>
       <span class="pikk-home-media-badge">▶ OFFICIAL VIDEO</span>
       <span class="pikk-home-media-title">${esc(v.title)}</span>
     </a>`;
  }).join('');

  const g = getAppDailyGoal();
  const pct = g ? Math.min(100, Math.round((g.raised / (g.targetAmount || 1)) * 100)) : 0;
  const goalCard = g ? `<div class="card home-sell-promo home-app-goal" id="home-app-goal">
      <div class="row" style="justify-content:space-between;align-items:center;gap:10px">
        <div><strong>PIKK GOAL</strong><div class="muted" style="font-size:12px">$${Number(g.raised||0)} of $${Number(g.targetAmount||50)} · TEST MODE</div></div>
        <button type="button" class="btn primary" id="homeGoalDonate">Donate</button>
      </div>
      <div class="home-goal-bar" style="margin-top:10px" role="progressbar" aria-valuenow="${pct}"><div class="home-goal-fill" style="width:${pct}%"></div></div>
    </div>` : '';

  const visualFeed = `
    <section class="pikk-home-visual" id="pikkHomeVisual" aria-labelledby="pikkHomeVisualTitle">
      <div class="pikk-home-visual-top">
        <div><p class="kicker">PIKK DISCOVER</p><h2 id="pikkHomeVisualTitle">Your music. Your world.</h2></div>
        <a href="#/explore" class="pikk-home-visual-more">Explore ↗</a>
      </div>
      <nav class="pikk-home-circle-strip" aria-label="House Pick stories">
        <a class="pikk-home-circle" href="#/posts?compose=1" aria-label="Create">
          <span class="pikk-home-circle-ring pikk-home-circle-symbol" aria-hidden="true">＋</span><span>Create</span>
        </a>
        <a class="pikk-home-circle" href="#/home" aria-label="For You">
          <span class="pikk-home-circle-ring">${COMING_SOON[0] ? `<img src="${esc(COMING_SOON[0].cover)}" alt="" loading="lazy"/>` : `<span class="pikk-home-circle-symbol">◆</span>`}</span>
          <span>For You</span><small class="pikk-home-circle-tag">HOUSE PICK</small>
        </a>
        <a class="pikk-home-circle" href="#/connect" aria-label="Following">
          <span class="pikk-home-circle-ring">${COMING_SOON[1] ? `<img src="${esc(COMING_SOON[1].cover)}" alt="" loading="lazy"/>` : `<span class="pikk-home-circle-symbol">◆</span>`}</span>
          <span>Following</span><small class="pikk-home-circle-tag">HOUSE PICK</small>
        </a>
        <a class="pikk-home-circle" href="#/music" aria-label="Music">
          <span class="pikk-home-circle-ring">${COMING_SOON[2] ? `<img src="${esc(COMING_SOON[2].cover)}" alt="" loading="lazy"/>` : `<span class="pikk-home-circle-symbol">♪</span>`}</span>
          <span>Music</span><small class="pikk-home-circle-tag">HOUSE PICK</small>
        </a>
      </nav>
      <nav class="pikk-home-filterbar" aria-label="Discover categories">
        <a class="is-current" href="#/explore">All</a>
        <a href="#/videos">Videos</a>
        <a href="#/music">Music</a>
        <a href="#/posts">Photos</a>
        <a href="#/live">Live</a>
      </nav>
      <div class="pikk-home-media-grid" aria-label="Official DatBoiSkeet video selections">
        ${mediaFeatureItems}
      </div>
      <div class="pikk-home-media-footer">
        <p class="muted">Real official releases · Video thumbnails from YouTube</p>
        <a href="#/videos">View all videos →</a>
      </div>
    </section>`;

  return shellPage('Home', `
    ${goalCard}
    ${visualFeed}
    <div class="card" style="margin-top:14px">
      <p class="kicker">PIKK</p>
      <h3>More on PIKK</h3>
      <div class="row wrap" style="gap:8px">
        <a class="btn" href="#/live">Live</a>
        <a class="btn" href="#/music">Music</a>
        <a class="btn" href="#/videos">Videos</a>
        <a class="btn" href="#/connect">Connect</a>
        <a class="btn" href="#/games">Games</a>
        <a class="btn" href="#/shop">Shop</a>
      </div>
    </div>
  `);
}

export function bindHome() {
  document.getElementById('homeGoalDonate')?.addEventListener('click', () => {
    const g = getAppDailyGoal();
    if (!g) return;
    try {
      donateToGoal(g.id, 50);
      toast('Donated 50 coins (TEST MODE)');
      location.hash = '#/home';
    } catch (e) {
      toast(e?.message || 'Donate failed');
    }
  });
}
