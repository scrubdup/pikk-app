/** Public asset URLs under Vite `base` (e.g. /dbs-app/ on GitHub Pages). */
const RAW_BASE = import.meta.env.BASE_URL || '/';
export const BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

export function asset(path) {
  if (path == null || path === '') return path;
  const s = String(path);
  if (/^(https?:|data:|blob:|idb:|#|\/\/)/i.test(s)) return s;
  if (BASE && (s === BASE || s.startsWith(BASE + '/'))) return s;
  if (s.startsWith('/')) return BASE + s;
  return (BASE || '') + '/' + s;
}

/** Fix root-absolute src/srcset/data-zoom in a DOM subtree (and document chrome). */
export function rewriteAssetUrls(root = document) {
  if (!BASE) return;
  root.querySelectorAll('[src]').forEach((el) => {
    const v = el.getAttribute('src');
    if (!v) return;
    const next = asset(v);
    if (next !== v) el.setAttribute('src', next);
  });
  root.querySelectorAll('[srcset]').forEach((el) => {
    const v = el.getAttribute('srcset');
    if (!v || !v.includes('/')) return;
    const next = v.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g, (_, pre, p) => pre + asset(p));
    if (next !== v) el.setAttribute('srcset', next);
  });
  root.querySelectorAll('[data-zoom]').forEach((el) => {
    const v = el.getAttribute('data-zoom');
    if (!v) return;
    const next = asset(v);
    if (next !== v) el.setAttribute('data-zoom', next);
  });
  root.querySelectorAll('[poster]').forEach((el) => {
    const v = el.getAttribute('poster');
    if (!v) return;
    const next = asset(v);
    if (next !== v) el.setAttribute('poster', next);
  });
}
