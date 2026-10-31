/**
 * §17 Sticky top DBS music player — official YouTube embeds only (no rehost).
 * THE shared player module (Media Links + Build). Do not create a competing module.
 *
 * DOM ids (sticky shell — outside #app so hash routes keep audio):
 *   #dbs-sticky-player  (also #stickyPlayer) — chrome bar
 *   #dbsStickyFrame     (also #dbsYtHost)    — YouTube IFrame API host
 *   #spPlay #spPrev #spNext #spOpen #spQueueBtn #spPlayNextMost #spArt #spTitle #spSub #spBadge #spSource #spQueuePanel
 *
 * Interrupt API (Build + pages) — pause on song/video/live START; keep playing on
 * skip/prev, queue switch, or Open-on-platform / download links:
 *
 *   import {
 *     pauseGlobalMusic, resumeGlobalMusicIfAllowed,   // Build-preferred
 *     pauseDbsPlayer, resumeDbsPlayerIfAllowed,       // aliases (same behavior)
 *     notifyVideoPlaying, notifyVideoIdle, notifyLiveOpen, notifyLiveClosed,
 *     ensureYtApi,                                    // Promise<YT>
 *     bindYoutubeInterrupt, bindPageYoutubeEmbeds,    // page embeds → interrupt sticky
 *     bindPageYtIframe,                               // alias of bindYoutubeInterrupt
 *     mountYtEmbed, mountPageYtPlayer, destroyPageYtPlayer,
 *   } from '../player.js'
 *
 *   // Build: after rendering Videos/Home/Music Mix, call once per bind:
 *   bindPageYoutubeEmbeds(root)  // skips #dbsStickyFrame / #dbsYtHost / sticky bar
 *
 *   pauseGlobalMusic('video' | 'live' | 'song' | 'user')
 *   resumeGlobalMusicIfAllowed('video')  // resume only if user opted in + reason cleared
 *
 *   // Loose coupling — Build may dispatch OR call the function:
 *   window.dispatchEvent(new CustomEvent('dbs:interrupt-music', { detail: { reason: 'video' } }))
 *   // player.js listens once → pauseDbsPlayer(detail.reason)
 *   // pauseGlobalMusic also dispatches dbs:interrupt-music for observers
 *
 * Spotify / Apple / YTM = Open-on-platform only — never claimed as in-app audio.
 */

import {
  VIDEOS,
  YOUTUBE_MIXES,
  STREAMING_RELEASES,
  STREAMING_ARTIST,
} from './data.js';
import { getMostPlayedSongToday } from './store.js';
import { toast } from './ui.js';

/** @typedef {{ id: string, title: string, artist: string, cover: string, youtubeId?: string, playlistId?: string, youtube: string, embed: string, links: Record<string,string>, kind: 'track'|'mix'|'mv' }} QueueItem */

const YT_API_SRC = 'https://www.youtube.com/iframe_api';

/** @type {QueueItem[]} */
let queue = [];
let index = 0;
/** @type {YT.Player | null} */
let ytPlayer = null;
let apiReady = false;
let apiLoading = false;
let userArmed = false; // gesture received — autoplay allowed thereafter
let playingDesired = false;
/** @type {Set<string>} */
const interrupts = new Set();
let uiBound = false;

function ytIdFromUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0] || '';
    const v = u.searchParams.get('v');
    if (v) return v;
    const m = u.pathname.match(/\/embed\/([^/?]+)/);
    if (m) return m[1] === 'videoseries' ? '' : m[1];
  } catch (_) {}
  return '';
}

function playlistIdFromUrl(url) {
  if (!url) return '';
  try {
    return new URL(url).searchParams.get('list') || '';
  } catch (_) {
    return '';
  }
}

function coverFromYtId(id) {
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

/** Build queue: STREAMING_RELEASES with YT → Mix → featured/key MVs (deduped). */
export function buildQueue() {
  /** @type {QueueItem[]} */
  const items = [];
  const seenYt = new Set();
  const seenPl = new Set();

  const push = (item) => {
    if (item.playlistId) {
      if (seenPl.has(item.playlistId)) return;
      seenPl.add(item.playlistId);
    } else if (item.youtubeId) {
      if (seenYt.has(item.youtubeId)) return;
      seenYt.add(item.youtubeId);
    } else return;
    items.push(item);
  };

  for (const r of STREAMING_RELEASES) {
    const yt = r.links?.youtube || '';
    const id = ytIdFromUrl(yt) || ytIdFromUrl(r.links?.youtubeMusic || '');
    if (!id) continue; // albums without a specific YT video stay Open-on-platform only
    push({
      id: r.id,
      title: r.title,
      artist: r.artist || 'DatBoiSkeet',
      cover: r.cover || coverFromYtId(id),
      youtubeId: id,
      youtube: yt || `https://www.youtube.com/watch?v=${id}`,
      embed: `https://www.youtube.com/embed/${id}`,
      links: { ...(r.links || {}), youtube: yt || `https://www.youtube.com/watch?v=${id}` },
      kind: 'track',
    });
  }

  for (const m of YOUTUBE_MIXES) {
    const pl = playlistIdFromUrl(m.youtube) || playlistIdFromUrl(m.embed);
    if (!pl) continue;
    push({
      id: m.id,
      title: m.title,
      artist: 'DatBoiSkeet',
      cover: coverFromYtId('DTe4OiX2otg') || '/brand/logo-dbs-v3@2x.webp',
      playlistId: pl,
      youtube: m.youtube,
      embed: m.embed || `https://www.youtube.com/embed/videoseries?list=${pl}`,
      links: {
        youtube: m.youtube,
        youtubeMusic: STREAMING_ARTIST.youtubeMusic,
        spotify: STREAMING_ARTIST.spotify,
        apple: STREAMING_ARTIST.apple,
      },
      kind: 'mix',
    });
  }

  const mvCats = new Set(['Music Videos']);
  for (const v of VIDEOS) {
    if (!mvCats.has(v.category || 'Music Videos')) continue;
    if (!v.featured && !['dirty-money', '93', 'no-love', 'bouquet', 'where-im-from', 'go-2-work'].includes(v.id)) {
      // still include featured + baseline + a few verified MVs; skip the rest to keep queue tight
      if (!v.featured) continue;
    }
    const id = ytIdFromUrl(v.youtube) || ytIdFromUrl(v.embed);
    if (!id) continue;
    // Prefer release cover if same YT already queued
    if (seenYt.has(id)) continue;
    const matchRelease = STREAMING_RELEASES.find(
      (r) => ytIdFromUrl(r.links?.youtube || '') === id
    );
    push({
      id: v.id,
      title: v.title,
      artist: v.artist || 'DatBoiSkeet',
      cover: matchRelease?.cover || coverFromYtId(id),
      youtubeId: id,
      youtube: v.youtube,
      embed: v.embed || `https://www.youtube.com/embed/${id}`,
      links: {
        youtube: v.youtube,
        youtubeMusic: `https://music.youtube.com/watch?v=${id}`,
        ...(matchRelease?.links || {}),
      },
      kind: 'mv',
    });
  }

  queue = items;
  if (index >= queue.length) index = 0;
  return queue;
}

export function getQueue() {
  return queue.slice();
}

export function getCurrentTrack() {
  return queue[index] || null;
}

function normTitle(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Map store getMostPlayedSongToday() → QueueItem (or platform-only stub).
 * Reuses Home's helper — no second DEMO seed.
 * @returns {{ item: QueueItem | null, meta: ReturnType<typeof getMostPlayedSongToday>, playable: boolean }}
 */
export function resolveMostPlayedQueueItem() {
  const meta = getMostPlayedSongToday();
  if (!meta) return { item: null, meta: null, playable: false };
  const want = normTitle(meta.title);

  // Prefer existing queue match
  const qHit = queue.find((t) => normTitle(t.title) === want || normTitle(t.title).includes(want) || want.includes(normTitle(t.title)));
  if (qHit && (qHit.youtubeId || qHit.playlistId)) {
    return { item: { ...qHit }, meta, playable: true };
  }

  // STREAMING_RELEASES with YT
  for (const r of STREAMING_RELEASES) {
    if (normTitle(r.title) !== want && !normTitle(r.title).startsWith(want) && !want.startsWith(normTitle(r.title))) continue;
    const yt = r.links?.youtube || '';
    const id = ytIdFromUrl(yt) || ytIdFromUrl(r.links?.youtubeMusic || '');
    if (!id) {
      return {
        item: {
          id: r.id,
          title: r.title,
          artist: r.artist || 'DatBoiSkeet',
          cover: r.cover || meta.cover || '',
          youtube: yt || STREAMING_ARTIST.youtube || '',
          embed: '',
          links: { ...(r.links || {}) },
          kind: 'track',
        },
        meta,
        playable: false,
      };
    }
    return {
      item: {
        id: r.id,
        title: r.title,
        artist: r.artist || 'DatBoiSkeet',
        cover: r.cover || coverFromYtId(id),
        youtubeId: id,
        youtube: yt || `https://www.youtube.com/watch?v=${id}`,
        embed: `https://www.youtube.com/embed/${id}`,
        links: { ...(r.links || {}), youtube: yt || `https://www.youtube.com/watch?v=${id}` },
        kind: 'track',
      },
      meta,
      playable: true,
    };
  }

  // VIDEOS / MVs
  for (const v of VIDEOS) {
    if (normTitle(v.title) !== want && !normTitle(v.title).includes(want)) continue;
    const id = ytIdFromUrl(v.youtube) || ytIdFromUrl(v.embed);
    if (!id) continue;
    return {
      item: {
        id: v.id,
        title: v.title,
        artist: v.artist || 'DatBoiSkeet',
        cover: coverFromYtId(id),
        youtubeId: id,
        youtube: v.youtube,
        embed: v.embed || `https://www.youtube.com/embed/${id}`,
        links: {
          youtube: v.youtube,
          youtubeMusic: `https://music.youtube.com/watch?v=${id}`,
        },
        kind: 'mv',
      },
      meta,
      playable: true,
    };
  }

  // DEMO / Coming Soon (e.g. Long Story Short) — chip stays; no fake YT
  return {
    item: {
      id: meta.id || 'most-played',
      title: meta.title || 'Most played',
      artist: meta.artist || 'DatBoiSkeet',
      cover: meta.cover || '',
      youtube: '',
      embed: '',
      links: {
        spotify: STREAMING_ARTIST.spotify,
        apple: STREAMING_ARTIST.apple,
        youtubeMusic: STREAMING_ARTIST.youtubeMusic,
        youtube: STREAMING_ARTIST.youtube,
      },
      kind: 'track',
    },
    meta,
    playable: false,
  };
}

function syncPlayNextChip() {
  const btn = document.getElementById('spPlayNextMost');
  const sub = document.getElementById('spPlayNextSub');
  const { meta, playable } = resolveMostPlayedQueueItem();
  if (!btn) return;
  if (!meta) {
    btn.hidden = true;
    return;
  }
  btn.hidden = false;
  btn.dataset.playable = playable ? '1' : '0';
  btn.dataset.demo = meta.demo ? '1' : '0';
  btn.title = playable
    ? `Most played today · ${meta.title} → Play next`
    : `Most played today · ${meta.title} (Coming Soon / open platform)`;
  btn.setAttribute('aria-label', `Play next — ${meta.title}`);
  if (sub) {
    const tag = meta.demo ? 'DEMO · ' : '';
    sub.textContent = `${tag}Most played today · ${meta.title}`;
  }
}

/**
 * Insert item as next in queue (after current). Does NOT pause / interrupt.
 * Moves existing match if already queued.
 */
export function queueTrackAsNext(item) {
  if (!item) return -1;
  if (!queue.length) {
    queue.push(item);
    index = 0;
    return 0;
  }
  let existingIdx = queue.findIndex(
    (t) =>
      (item.youtubeId && t.youtubeId === item.youtubeId) ||
      (item.playlistId && t.playlistId === item.playlistId) ||
      t.id === item.id
  );
  if (existingIdx === index) return index; // already current
  if (existingIdx >= 0) {
    const [t] = queue.splice(existingIdx, 1);
    if (existingIdx < index) index -= 1;
    item = t;
  }
  const at = Math.min(index + 1, queue.length);
  queue.splice(at, 0, item);
  return at;
}

/**
 * Most-played chip tap:
 * - If actively playing (or interrupted): queue as next — do NOT steal / do NOT pauseGlobalMusic
 * - If idle/paused: jump-play (user gesture arms play)
 * - DEMO / no YT: honesty toast + Open-on-platform / Music
 */
export function playNextMostPlayed() {
  const { item, meta, playable } = resolveMostPlayedQueueItem();
  if (!meta || !item) {
    toast('No most-played track yet');
    return;
  }

  if (!playable) {
    const openBtn = document.getElementById('spOpen');
    const href =
      item.links?.apple ||
      item.links?.youtubeMusic ||
      item.links?.spotify ||
      item.links?.youtube ||
      STREAMING_ARTIST.apple;
    if (openBtn && href) openBtn.href = href;
    toast(
      meta.demo || meta.status === 'Coming Soon'
        ? `${meta.title} · Coming Soon — no in-app master. Open Music / Stream Everywhere when it drops.`
        : `${meta.title} — open official platform (not in-app audio)`
    );
    syncPlayNextChip();
    return;
  }

  const activelyPlaying =
    isYtPlaying() || (Boolean(playingDesired) && userArmed && interrupts.size === 0);
  // Interrupted or playing → queue as next (don't steal). Idle → jump-play.
  if (activelyPlaying || interrupts.size > 0) {
    const at = queueTrackAsNext(item);
    if (at === index) {
      toast(`Already playing · ${item.title}`);
    } else {
      toast(`Queued next · ${item.title}`);
    }
    syncUi();
    return;
  }

  // Idle / paused — user tap arms play (no pauseGlobalMusic)
  let i = queue.findIndex(
    (t) =>
      (item.youtubeId && t.youtubeId === item.youtubeId) ||
      (item.playlistId && t.playlistId === item.playlistId) ||
      t.id === item.id
  );
  if (i < 0) {
    i = queueTrackAsNext(item);
  }
  playTrackAt(i);
  toast(`Playing · ${item.title}`);
}


/** @type {Array<(yt: typeof window.YT) => void>} */
const ytApiWaiters = [];

/**
 * Load YouTube IFrame API once. Resolves with window.YT when Player is available.
 * Sticky + page embeds share this — do not load a second iframe_api script.
 * @returns {Promise<typeof window.YT>}
 */
export function ensureYtApi() {
  if (window.YT?.Player) {
    apiReady = true;
    return Promise.resolve(window.YT);
  }
  return new Promise((resolve) => {
    ytApiWaiters.push(resolve);
    if (apiLoading) return;
    apiLoading = true;
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      apiReady = true;
      apiLoading = false;
      try {
        prev?.();
      } catch (_) {}
      const yt = window.YT;
      while (ytApiWaiters.length) {
        try {
          ytApiWaiters.shift()(yt);
        } catch (_) {}
      }
      ensureYtPlayer();
    };
    if (!document.querySelector(`script[src="${YT_API_SRC}"]`)) {
      const s = document.createElement('script');
      s.src = YT_API_SRC;
      s.async = true;
      document.head.appendChild(s);
    } else if (window.YT?.Player) {
      apiReady = true;
      apiLoading = false;
      const yt = window.YT;
      while (ytApiWaiters.length) {
        try {
          ytApiWaiters.shift()(yt);
        } catch (_) {}
      }
      ensureYtPlayer();
    }
  });
}

/** @deprecated internal — use ensureYtApi(); kept so sticky init still fire-and-forgets */
function loadYtApi() {
  ensureYtApi().then(() => ensureYtPlayer()).catch(() => {});
}

function ensureYtPlayer() {
  const host = document.getElementById('dbsStickyFrame') || document.getElementById('dbsYtHost');
  if (!host || !window.YT?.Player) return;
  if (ytPlayer) return;
  const track = queue[index];
  const vars = {
    autoplay: 0,
    controls: 0,
    rel: 0,
    modestbranding: 1,
    playsinline: 1,
    enablejsapi: 1,
    origin: location.origin,
  };
  /** @type {YT.PlayerOptions} */
  const opts = {
    height: '1',
    width: '1',
    playerVars: vars,
    events: {
      onReady: () => {
        syncUi();
      },
      onStateChange: (e) => {
        // 0 = ended → advance
        if (e.data === 0) {
          nextTrack({ auto: true });
        }
        syncUi();
      },
      onError: () => {
        toast('YouTube embed error — Open on YouTube');
        syncUi();
      },
    },
  };
  if (track?.playlistId) {
    opts.playerVars = { ...vars, listType: 'playlist', list: track.playlistId };
  } else if (track?.youtubeId) {
    opts.videoId = track.youtubeId;
  } else {
    opts.videoId = 'DTe4OiX2otg'; // Bouquet fallback so player constructs
  }
  const hostId = document.getElementById('dbsStickyFrame') ? 'dbsStickyFrame' : 'dbsYtHost';
  ytPlayer = new window.YT.Player(hostId, opts);
}

function loadCurrentIntoPlayer({ autoplay } = { autoplay: false }) {
  const track = queue[index];
  if (!track || !ytPlayer?.cueVideoById) {
    ensureYtPlayer();
    return;
  }
  try {
    if (track.playlistId) {
      if (typeof ytPlayer.loadPlaylist === 'function') {
        ytPlayer.loadPlaylist({ list: track.playlistId, listType: 'playlist', index: 0 });
      } else if (typeof ytPlayer.cuePlaylist === 'function') {
        ytPlayer.cuePlaylist({ list: track.playlistId, listType: 'playlist', index: 0 });
      }
      if (autoplay && userArmed && interrupts.size === 0) {
        setTimeout(() => {
          try {
            ytPlayer.playVideo();
          } catch (_) {}
        }, 250);
      }
    } else if (track.youtubeId) {
      if (autoplay && userArmed && interrupts.size === 0) {
        ytPlayer.loadVideoById(track.youtubeId);
      } else {
        ytPlayer.cueVideoById(track.youtubeId);
      }
    }
  } catch (_) {
    /* player may not be ready */
  }
  syncUi();
}

function isYtPlaying() {
  try {
    return ytPlayer?.getPlayerState?.() === 1;
  } catch (_) {
    return false;
  }
}

function syncUi() {
  const track = queue[index];
  const art = document.getElementById('spArt');
  const title = document.getElementById('spTitle');
  const sub = document.getElementById('spSub');
  const playBtn = document.getElementById('spPlay');
  const openBtn = document.getElementById('spOpen');
  const source = document.getElementById('spSource');
  const interrupted = interrupts.size > 0;
  const playing = !interrupted && (playingDesired || isYtPlaying());

  if (art && track) {
    art.src = track.cover || coverFromYtId(track.youtubeId || '') || '/brand/logo-dbs-v3@2x.webp';
    art.alt = track.title || '';
  }
  if (title) title.textContent = track?.title || 'PIKK Music';
  if (sub) {
    if (!userArmed) sub.textContent = 'Tap Play · YouTube embed · Stream Everywhere';
    else if (interrupted) sub.textContent = `Paused · ${[...interrupts][0]} interrupt`;
    else sub.textContent = `${track?.artist || 'DatBoiSkeet'} · via YouTube (not Spotify in-app)`;
  }
  if (playBtn) {
    playBtn.textContent = playing ? '❚❚' : '▶';
    playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play PIKK Music');
    playBtn.dataset.playing = playing ? '1' : '0';
  }
  if (openBtn && track) {
    const href =
      track.links?.apple ||
      track.links?.youtubeMusic ||
      track.links?.spotify ||
      track.youtube ||
      STREAMING_ARTIST.apple;
    openBtn.href = href;
    openBtn.title = 'Open on official platform';
  }
  if (source) {
    source.textContent = track?.kind === 'mix' ? 'YT Mix' : track?.kind === 'mv' ? 'YT MV' : 'YouTube';
  }
  const badge = document.getElementById('spBadge');
  if (badge) {
    badge.textContent = interrupted
      ? 'INTERRUPTED'
      : userArmed && playing
        ? 'PLAYING · YT'
        : 'TEST · YT EMBED';
  }
  syncPlayNextChip();
}

function playInternal() {
  if (interrupts.size > 0) {
    toast('Paused for ' + [...interrupts][0] + ' — resume when done');
    syncUi();
    return;
  }
  userArmed = true;
  playingDesired = true;
  loadYtApi();
  ensureYtPlayer();
  try {
    if (ytPlayer?.playVideo) {
      // If cued / paused, play; if empty, load current
      const st = ytPlayer.getPlayerState?.();
      if (st === -1 || st === 5 || st === undefined) {
        loadCurrentIntoPlayer({ autoplay: true });
      } else {
        ytPlayer.playVideo();
      }
    } else {
      // Wait for API
      const wait = setInterval(() => {
        if (ytPlayer?.playVideo) {
          clearInterval(wait);
          loadCurrentIntoPlayer({ autoplay: true });
        }
      }, 120);
      setTimeout(() => clearInterval(wait), 8000);
    }
  } catch (_) {
    toast('Tap Play PIKK Music again if autoplay blocked');
  }
  syncUi();
}

function pauseInternal({ clearDesire } = {}) {
  if (clearDesire) playingDesired = false;
  try {
    ytPlayer?.pauseVideo?.();
  } catch (_) {}
  syncUi();
}

/** Pause for interrupt (video / live / etc.). */
export function pauseDbsPlayer(reason = 'user') {
  if (reason && reason !== 'user') interrupts.add(reason);
  // Interrupts keep playingDesired so resumeDbsPlayerIfAllowed can restart
  pauseInternal({ clearDesire: reason === 'user' });
  syncUi();
}

/** Clear one interrupt reason (or all if omitted) and resume if user had been playing. */
export function resumeDbsPlayerIfAllowed(clearReason) {
  if (clearReason) interrupts.delete(clearReason);
  else interrupts.clear();
  if (interrupts.size === 0 && userArmed && playingDesired) {
    try {
      ytPlayer?.playVideo?.();
    } catch (_) {}
  }
  syncUi();
}

/**
 * Build-preferred alias — pause sticky/continuous YouTube embed.
 * Also dispatches window `dbs:interrupt-music` for loose coupling.
 * Reasons: 'video' | 'live' | 'song' | 'user' (and future).
 * Do NOT call for skip/prev, queue switch, or Open-on-platform links.
 *
 * Re-entrancy: a `dbs:interrupt-music` listener must NOT call pauseGlobalMusic /
 * notifyLiveOpen / notifyVideoPlaying again (use pauseDbsPlayer). Guard below
 * still skips re-dispatch if a buggy observer re-enters — prevents stack overflow.
 */
let pauseGlobalMusicDispatching = false;

export function pauseGlobalMusic(reason = 'user') {
  pauseDbsPlayer(reason);
  if (pauseGlobalMusicDispatching) return; // mid-dispatch — apply pause only, no re-fire
  pauseGlobalMusicDispatching = true;
  try {
    window.dispatchEvent(new CustomEvent('dbs:interrupt-music', { detail: { reason } }));
  } catch (_) {
    /* ignore */
  } finally {
    pauseGlobalMusicDispatching = false;
  }
}

/** Build-preferred alias — resume only if user opted in and interrupt reason cleared. */
export function resumeGlobalMusicIfAllowed(clearReason) {
  return resumeDbsPlayerIfAllowed(clearReason);
}

/** Videos / Home iframe / catalog video started.
 * Calls pauseDbsPlayer directly (not pauseGlobalMusic) so we do not re-enter
 * the dbs:interrupt-music dispatch path that caused the player.js:673 overflow. */
export function notifyVideoPlaying() {
  pauseDbsPlayer('video');
}

/** Live go-live / watch started. Same: pause only — no CustomEvent re-dispatch. */
export function notifyLiveOpen() {
  pauseDbsPlayer('live');
}

export function notifyLiveClosed() {
  resumeGlobalMusicIfAllowed('live');
}

export function notifyVideoIdle() {
  resumeGlobalMusicIfAllowed('video');
}

export function nextTrack({ auto } = {}) {
  if (!queue.length) return;
  index = (index + 1) % queue.length;
  playingDesired = true;
  if (!auto) userArmed = true;
  loadCurrentIntoPlayer({ autoplay: userArmed && interrupts.size === 0 });
  syncUi();
}

export function prevTrack() {
  if (!queue.length) return;
  index = (index - 1 + queue.length) % queue.length;
  userArmed = true;
  playingDesired = true;
  loadCurrentIntoPlayer({ autoplay: interrupts.size === 0 });
  syncUi();
}

export function playTrackAt(i) {
  if (i < 0 || i >= queue.length) return;
  index = i;
  userArmed = true;
  interrupts.clear();
  playingDesired = true;
  loadCurrentIntoPlayer({ autoplay: true });
  syncUi();
}

function bindUi() {
  if (uiBound) return;
  uiBound = true;
  document.getElementById('spPlay')?.addEventListener('click', () => {
    if (interrupts.size > 0) {
      // User override: clear soft interrupts and play
      interrupts.clear();
    }
    if (isYtPlaying()) {
      pauseDbsPlayer('user');
    } else {
      playInternal();
    }
  });
  document.getElementById('spPrev')?.addEventListener('click', () => {
    interrupts.clear();
    prevTrack();
  });
  document.getElementById('spNext')?.addEventListener('click', () => {
    interrupts.clear();
    nextTrack();
  });
  document.getElementById('spOpen')?.addEventListener('click', (e) => {
    // let default navigate; toast honesty
    toast('Opening external music service (playback depends on provider)');
  });
  // Most played today → Play next (never pauseGlobalMusic / notifyVideo*)
  document.getElementById('spPlayNextMost')?.addEventListener('click', () => {
    playNextMostPlayed();
  });
  // Queue picker
  document.getElementById('spQueueBtn')?.addEventListener('click', () => {
    const panel = document.getElementById('spQueuePanel');
    if (!panel) return;
    const open = panel.hasAttribute('hidden');
    if (open) {
      panel.removeAttribute('hidden');
      panel.innerHTML = queue
        .map(
          (t, i) =>
            `<button type="button" class="sp-q-item${i === index ? ' on' : ''}" data-i="${i}">
              <img src="${t.cover || ''}" alt="" width="36" height="36" />
              <span><b>${escapeHtml(t.title)}</b><small>${escapeHtml(t.artist)} · ${t.kind}</small></span>
            </button>`
        )
        .join('');
      panel.querySelectorAll('.sp-q-item').forEach((btn) => {
        btn.addEventListener('click', () => {
          playTrackAt(Number(btn.dataset.i));
          panel.setAttribute('hidden', '');
        });
      });
    } else {
      panel.setAttribute('hidden', '');
    }
  });
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('spQueuePanel');
    if (!panel || panel.hasAttribute('hidden')) return;
    if (!e.target.closest('#spQueuePanel') && !e.target.closest('#spQueueBtn')) {
      panel.setAttribute('hidden', '');
    }
  });
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Init sticky top player (call once from main.js).
 * Survives hash route changes — iframe lives outside #app.
 */
let interruptListenerBound = false;

function bindInterruptEvent() {
  if (interruptListenerBound) return;
  interruptListenerBound = true;
  // Build (or anyone) may dispatch instead of importing — listen once
  window.addEventListener('dbs:interrupt-music', (ev) => {
    const reason = ev?.detail?.reason || 'user';
    // Avoid re-dispatch loop: call pauseDbsPlayer directly (not pauseGlobalMusic)
    pauseDbsPlayer(reason);
  });
}

export function initDbsPlayer() {
  buildQueue();
  bindUi();
  bindInterruptEvent();
  syncUi();
  loadYtApi();
  // Prefetch player shell so first Play is snappy
  setTimeout(() => ensureYtPlayer(), 400);
}

/** Call on every route render — do NOT tear down sticky player (outside #app).
 * t178u: leaving Live → clear live interrupt + resume sticky music.
 * Leaving Music/Videos/Home Mix embeds → destroy hosts + clear video interrupt. */
export function onRouteForPlayer(path) {
  const onLive = path === '/live';
  const onMixPages = path === '/videos' || path === '/home' || path === '/music' || path === '/vault';

  // Leaving Live page — sticky continuous chrome resumes even if demo live still open in state
  if (!onLive && interrupts.has('live')) {
    resumeGlobalMusicIfAllowed('live');
  }

  // Prune page YT players whose hosts were torn down with #app (Mix/page embeds)
  for (const [id, entry] of [...pageYtById.entries()]) {
    if (!document.getElementById(id)) {
      if (entry.playing) {
        pagePlayingCount = Math.max(0, pagePlayingCount - 1);
      }
      try {
        entry.player?.destroy?.();
      } catch (_) {}
      pageYtById.delete(id);
    }
  }
  if (pagePlayingCount === 0 && !onMixPages) {
    // Video/Mix page embeds destroyed with #app — clear stuck video interrupt
    if (interrupts.has('video')) resumeGlobalMusicIfAllowed('video');
  }
  syncUi();
}


/* -------------------------------------------------------------------------- */
/* Page embeds (Videos / Home / Music Mix) — interrupt sticky via onStateChange */
/* Build owns shells.js / home.js / music.js bind call sites. Media Links owns  */
/* this module only. Sticky player (#dbsStickyFrame / #dbsYtHost) is NEVER rebound. */
/* -------------------------------------------------------------------------- */

/** @type {Map<string, { player: YT.Player, el: HTMLElement, playing: boolean }>} */
const pageYtById = new Map();
let pagePlayingCount = 0;
let pageIdSeq = 0;

function isStickyYtHost(el) {
  if (!el || !(el instanceof Element)) return true;
  const id = el.id || '';
  if (id === 'dbsStickyFrame' || id === 'dbsYtHost') return true;
  if (el.closest?.('#dbs-sticky-player, #stickyPlayer, #dbsStickyFrame, #dbsYtHost')) return true;
  return false;
}

function isYoutubeEmbedSrc(src) {
  if (!src) return false;
  return /youtube\.com\/embed|youtube-nocookie\.com\/embed|youtu\.be\//.test(src);
}

function ensureIframeEnableJsApi(iframe) {
  let src = iframe.getAttribute('src') || iframe.src || '';
  if (!isYoutubeEmbedSrc(src)) return false;
  let changed = false;
  if (!/[?&]enablejsapi=1(?:&|$)/.test(src)) {
    src += (src.includes('?') ? '&' : '?') + 'enablejsapi=1';
    changed = true;
  }
  if (!/[?&]origin=/.test(src)) {
    src += (src.includes('?') ? '&' : '?') + 'origin=' + encodeURIComponent(location.origin);
    changed = true;
  }
  if (changed) {
    iframe.setAttribute('src', src);
    iframe.src = src;
  }
  return true;
}

function ensureUniqueHostId(el) {
  if (el.id && !pageYtById.has(el.id) && el.id !== 'dbsStickyFrame' && el.id !== 'dbsYtHost') {
    return el.id;
  }
  if (el.id && pageYtById.has(el.id)) return el.id;
  pageIdSeq += 1;
  const id = `dbs-page-yt-${pageIdSeq}`;
  el.id = id;
  return id;
}

function onPagePlayerStateChange(hostId, e) {
  const entry = pageYtById.get(hostId);
  if (!entry) return;
  // YT.PlayerState: ENDED=0 PLAYING=1 PAUSED=2 BUFFERING=3 CUED=5
  if (e.data === 1) {
    if (!entry.playing) {
      entry.playing = true;
      pagePlayingCount += 1;
    }
    notifyVideoPlaying();
  } else if (e.data === 0 || e.data === 2) {
    if (entry.playing) {
      entry.playing = false;
      pagePlayingCount = Math.max(0, pagePlayingCount - 1);
    }
    // Only clear video interrupt when no other page embed is still playing
    if (pagePlayingCount === 0) {
      notifyVideoIdle();
    }
  }
}

/**
 * Bind one page YouTube iframe (or empty host that already has a YT iframe child)
 * so real play/pause fires notifyVideoPlaying / notifyVideoIdle.
 * Skips sticky hosts. Safe to call twice — second call is a no-op for same id.
 *
 * @param {string|HTMLElement} iframeOrId
 * @returns {Promise<YT.Player|null>}
 */
export function bindYoutubeInterrupt(iframeOrId) {
  const el =
    typeof iframeOrId === 'string' ? document.getElementById(iframeOrId) : iframeOrId;
  if (!el || isStickyYtHost(el)) return Promise.resolve(null);

  // Prefer the iframe itself; if a wrapper .hero-video was passed, find child iframe
  let iframe = el;
  if (el.tagName !== 'IFRAME') {
    iframe = el.querySelector?.('iframe') || el;
  }
  if (!iframe || iframe.tagName !== 'IFRAME') return Promise.resolve(null);
  if (isStickyYtHost(iframe)) return Promise.resolve(null);

  const src = iframe.getAttribute('src') || iframe.src || '';
  if (!isYoutubeEmbedSrc(src)) return Promise.resolve(null);

  if (!ensureIframeEnableJsApi(iframe)) return Promise.resolve(null);
  const hostId = ensureUniqueHostId(iframe);

  if (pageYtById.has(hostId) && pageYtById.get(hostId)?.player) {
    return Promise.resolve(pageYtById.get(hostId).player);
  }

  return ensureYtApi().then(
    () =>
      new Promise((resolve) => {
        if (pageYtById.has(hostId) && pageYtById.get(hostId)?.player) {
          resolve(pageYtById.get(hostId).player);
          return;
        }
        // After enablejsapi src tweak the iframe may still be loading — wait one frame/load
        const start = () => {
          if (!document.getElementById(hostId)) {
            resolve(null);
            return;
          }
          if (pageYtById.has(hostId) && pageYtById.get(hostId)?.player) {
            resolve(pageYtById.get(hostId).player);
            return;
          }
          try {
            const player = new window.YT.Player(hostId, {
              events: {
                onReady: () => {
                  /* cued — no interrupt until PLAYING */
                },
                onStateChange: (e) => onPagePlayerStateChange(hostId, e),
                onError: () => {
                  /* keep sticky alone; Open on YouTube remains */
                },
              },
            });
            pageYtById.set(hostId, { player, el: iframe, playing: false });
            iframe.dataset.dbsYtBound = '1';
            resolve(player);
          } catch (err) {
            console.warn('[dbs] bindYoutubeInterrupt failed', hostId, err);
            resolve(null);
          }
        };
        if (iframe.dataset.dbsYtBound === '1' && pageYtById.has(hostId)) {
          resolve(pageYtById.get(hostId).player);
          return;
        }
        // If we just mutated src, wait for load; else bind soon
        let done = false;
        const once = () => {
          if (done) return;
          done = true;
          start();
        };
        iframe.addEventListener('load', once, { once: true });
        // Fallback if load already fired or cached
        setTimeout(once, 400);
      })
  );
}

/** Alias — same as bindYoutubeInterrupt. */
export function bindPageYtIframe(iframeOrHost) {
  return bindYoutubeInterrupt(iframeOrHost);
}

/**
 * Scan `root` for YouTube embeds and bind interrupt hooks.
 * Skips `#dbsStickyFrame`, `#dbsYtHost`, and anything inside the sticky player chrome.
 * Call from bindVideos / bindHome / bindMusic after DOM paint.
 *
 * @param {ParentNode|null} root
 * @returns {Promise<(YT.Player|null)[]>}
 */
export function bindPageYoutubeEmbeds(root) {
  const scope = root && root.querySelectorAll ? root : document;
  const frames = [...scope.querySelectorAll('iframe')].filter((f) => {
    if (isStickyYtHost(f)) return false;
    const src = f.getAttribute('src') || f.src || '';
    return isYoutubeEmbedSrc(src);
  });
  return Promise.all(frames.map((f) => bindYoutubeInterrupt(f)));
}

/**
 * Create a YT.Player on an empty host element (div). Replaces host contents.
 * Prefer this when Build swaps raw <iframe> markup for a mount host.
 *
 * @param {HTMLElement} hostEl
 * @param {{ videoId?: string, playlistId?: string, title?: string, onPlaying?: Function, onPaused?: Function, playerVars?: object }} opts
 * @returns {Promise<YT.Player|null>}
 */
export function mountYtEmbed(hostEl, opts = {}) {
  if (!hostEl || isStickyYtHost(hostEl)) return Promise.resolve(null);
  const { videoId, playlistId, title, onPlaying, onPaused, playerVars } = opts;
  if (!videoId && !playlistId) return Promise.resolve(null);

  destroyPageYtPlayer(hostEl);

  const hostId = ensureUniqueHostId(hostEl);
  if (title) hostEl.setAttribute('aria-label', title);

  return ensureYtApi().then(() => {
    if (!document.getElementById(hostId) && hostEl.id !== hostId) {
      hostEl.id = hostId;
    }
    const vars = {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
      enablejsapi: 1,
      origin: location.origin,
      ...(playerVars || {}),
    };
    if (playlistId) {
      vars.listType = 'playlist';
      vars.list = playlistId;
    }
    /** @type {YT.PlayerOptions} */
    const playerOpts = {
      width: '100%',
      height: '100%',
      playerVars: vars,
      events: {
        onStateChange: (e) => {
          onPagePlayerStateChange(hostId, e);
          if (e.data === 1) onPlaying?.();
          else if (e.data === 0 || e.data === 2) onPaused?.();
        },
      },
    };
    if (videoId) playerOpts.videoId = videoId;
    try {
      const player = new window.YT.Player(hostId, playerOpts);
      // After construct, YT may replace hostEl with iframe — re-find
      const el = document.getElementById(hostId) || hostEl;
      pageYtById.set(hostId, { player, el, playing: false });
      if (el?.dataset) el.dataset.dbsYtBound = '1';
      return player;
    } catch (err) {
      console.warn('[dbs] mountYtEmbed failed', hostId, err);
      return null;
    }
  });
}

/** Alias of mountYtEmbed for earlier Media Links brief. */
export function mountPageYtPlayer(hostEl, opts = {}) {
  return mountYtEmbed(hostEl, opts);
}

/**
 * Destroy a page YT.Player previously created/bound on hostEl (or its id).
 * @param {HTMLElement|string} hostElOrId
 */
export function destroyPageYtPlayer(hostElOrId) {
  const el =
    typeof hostElOrId === 'string' ? document.getElementById(hostElOrId) : hostElOrId;
  const id = typeof hostElOrId === 'string' ? hostElOrId : el?.id;
  if (!id) return;
  if (id === 'dbsStickyFrame' || id === 'dbsYtHost') return; // never touch sticky
  const entry = pageYtById.get(id);
  if (!entry) return;
  if (entry.playing) {
    entry.playing = false;
    pagePlayingCount = Math.max(0, pagePlayingCount - 1);
    if (pagePlayingCount === 0) notifyVideoIdle();
  }
  try {
    entry.player?.destroy?.();
  } catch (_) {}
  pageYtById.delete(id);
}

/** Test helper — how many page embeds currently report PLAYING. */
export function getPageYtPlayingCount() {
  return pagePlayingCount;
}
