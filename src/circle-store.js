// TEST MODE: Crew, Favorites and local stories live in this browser's localStorage only,
// until the PIKK backend API exists. Nothing here is sent to a server.
const KEYS = { circle: 'pikk.crew.v1', favorites: 'pikk.favorites.v1', stories: 'pikk.stories.v1' };
const mem = {};
const ls = () => { try { return globalThis.localStorage || null; } catch { return null; } };
function read(k) { const s = ls(); try { return JSON.parse((s ? s.getItem(k) : mem[k]) || '[]'); } catch { return []; } }
function write(k, v) { const j = JSON.stringify(v); const s = ls(); if (s) s.setItem(k, j); else mem[k] = j; return v; }
export function normalizeHandle(h) {
  const t = String(h || '').trim().replace(/^@+/, '').toLowerCase();
  return /^[a-z0-9_.]{2,30}$/.test(t) ? t : '';
}
const list = (k) => read(k).filter((x) => typeof x === 'string');
function add(k, h) { const n = normalizeHandle(h); if (!n) return false; const l = list(k); if (!l.includes(n)) write(k, [...l, n]); return true; }
function remove(k, h) { const n = normalizeHandle(h); write(k, list(k).filter((x) => x !== n)); }
export const crew = { list: () => list(KEYS.circle), add: (h) => add(KEYS.circle, h), remove: (h) => remove(KEYS.circle, h), has: (h) => list(KEYS.circle).includes(normalizeHandle(h)) };
export const favorites = { list: () => list(KEYS.favorites), add: (h) => add(KEYS.favorites, h), remove: (h) => remove(KEYS.favorites, h), has: (h) => list(KEYS.favorites).includes(normalizeHandle(h)),
  moveUp: (h) => { const n = normalizeHandle(h); const l = list(KEYS.favorites); const i = l.indexOf(n); if (i > 0) { [l[i - 1], l[i]] = [l[i], l[i - 1]]; write(KEYS.favorites, l); } return list(KEYS.favorites); },
  toggle: (h) => (favorites.has(h) ? (favorites.remove(h), false) : favorites.add(h)) };
export const AUDIENCES = Object.freeze({ everyone: 'Everyone', crew: 'PIKK Crew' });
export function addStory({ text, audience = 'everyone', author = 'you' }) {
  const t = String(text || '').trim().slice(0, 280); if (!t) return null;
  const story = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), text: t, audience: audience === 'crew' ? 'crew' : 'everyone', author: normalizeHandle(author) || 'you', at: Date.now() };
  write(KEYS.stories, [story, ...read(KEYS.stories)].slice(0, 50)); return story;
}
export const DAY_MS = 24 * 3600 * 1000;
export function listStories(now = Date.now()) { return read(KEYS.stories).filter((s) => s && now - s.at < DAY_MS); }
export function removeStory(id) { write(KEYS.stories, read(KEYS.stories).filter((s) => s.id !== id)); }
/** Who may see a story: Everyone stories → anyone; Crew → the poster and listed handles only. */
export function canView(story, viewer, circle = crew.list()) {
  if (story.audience !== 'crew') return true;
  const v = normalizeHandle(viewer);
  return v === story.author || circle.includes(v);
}
/** Favorites first (in favorite order), then everything else newest first. Stable, non-mutating. */
export function rankByFavorites(items, favs = favorites.list(), key = (x) => x.author) {
  const idx = (x) => { const i = favs.indexOf(normalizeHandle(key(x))); return i < 0 ? Infinity : i; };
  return [...items].map((x, i) => [x, i]).sort((a, b) => idx(a[0]) - idx(b[0]) || (b[0].at || 0) - (a[0].at || 0) || a[1] - b[1]).map((p) => p[0]);
}
export const peopleLabel = (n) => `${n} ${n === 1 ? 'person' : 'people'}`;
