import { VIDEOS, COMING_SOON, HOME_SECTIONS, YOUTUBE_MIXES } from '../data.js';
import { notifyVideoPlaying, notifyVideoIdle, bindPageYoutubeEmbeds, bindYoutubeInterrupt, destroyPageYtPlayer } from '../player.js';
import { listCatalog, getState, listHotLives, listRisingStreamers, getHotPosts, getMostPlayedSongToday, getAppDailyGoal, donateToGoal } from '../store.js';
import { esc, shellPage, ytEmbedSrc, toast } from '../ui.js';
import { resolveMediaSrc } from '../media-db.js';
import { PIKK_GAMES, arcadeArtSrc } from '../games/arcade-catalog.js';
import { renderStoriesAndPromotions } from '../featured-promos.js';

// EMERGENCY STUB — full file restore in progress
export function renderHome() {
  return shellPage('Home', `<div class="card"><p class="kicker">PIKK</p><h2>Home</h2><p class="muted">Restoring home layout… hard refresh in a moment.</p><a class="btn primary" href="#/music">Music</a> <a class="btn" href="#/videos">Videos</a> <a class="btn" href="#/live">Live</a></div>`);
}
export function bindHome() {}
