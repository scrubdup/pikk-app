// t347u: ONE local play/view counter shared by organic plays and Promote placements
// (Music Player, story rail, video/clip boosts). TEST MODE: this device only until the backend counts server-side.
// Counts only real plays: audio/video ≥ 3 s of playback, or an open for stories. Impressions never count.
// Rapid repeats of the same item within DEDUPE_MS are ignored.
export const MIN_PLAY_SECONDS = 3;
export const DEDUPE_MS = 30_000;
const KEY = 'pikk.playCounts.v1';
let mem = {};
const ls = () => { try { return globalThis.localStorage || null; } catch { return null; } };
function load() { const s = ls(); try { return JSON.parse((s ? s.getItem(KEY) : mem.v) || '{}'); } catch { return {}; } }
function save(d) { const j = JSON.stringify(d); const s = ls(); if (s) s.setItem(KEY, j); else mem.v = j; }
const last = new Map();
export function _resetForTests() { last.clear(); mem = {}; const s = ls(); if (s) s.setItem(KEY, '{}'); }

/** Returns true if counted. kind: 'audio' | 'video' | 'clip' | 'story'; source: 'organic' | 'promote'. */
export function recordPlay(id, { kind = 'audio', seconds = 0, opened = false, source = 'organic', now = Date.now() } = {}) {
  const k = String(id || '').trim(); if (!k) return false;
  if (kind === 'story' ? !opened : !(Number(seconds) >= MIN_PLAY_SECONDS)) return false;
  const prev = last.get(k); if (prev != null && now - prev < DEDUPE_MS) return false;
  last.set(k, now);
  const d = load(); const e = d[k] || { total: 0, promote: 0 };
  e.total += 1; if (source === 'promote') e.promote += 1; d[k] = e; save(d);
  try { globalThis.dispatchEvent?.(new CustomEvent('pikk:playcount', { detail: { id: k, count: e.total } })); } catch {}
  return true;
}
export function playCount(id) { return load()[String(id || '').trim()]?.total || 0; }
export function playCountLabel(n, kind = 'audio') { return `${n} ${kind === 'audio' ? (n === 1 ? 'play' : 'plays') : (n === 1 ? 'view' : 'views')} · this device`; }

/** Decorate track / video / clip UI with counts (elements carrying a YouTube id). */
export function decoratePlayCounts(root = globalThis.document) {
  if (!root?.querySelectorAll) return;
  const ytFromImg = (src) => (String(src).match(/ytimg\.com\/vi(?:_webp)?\/([\w-]{6,})\//) || [])[1];
  for (const el of root.querySelectorAll('[data-yt], [data-video-id], img[src*="ytimg.com/vi"]')) {
    const id = el.dataset?.yt || el.dataset?.videoId || ytFromImg(el.getAttribute('src'));
    if (!id) continue;
    const host = el.tagName === 'IMG' ? el.parentElement : el;
    if (!host) continue;
    let tag = host.querySelector(':scope > .pikk-play-count');
    const n = playCount(id);
    if (!n) { tag?.remove(); continue; }
    if (!tag) { tag = root.createElement ? root.createElement('small') : globalThis.document.createElement('small'); tag.className = 'pikk-play-count'; host.appendChild(tag); }
    tag.dataset.playCountFor = id; tag.textContent = playCountLabel(n, 'video');
  }
}
