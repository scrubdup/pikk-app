const listeners = new Set();

export function getRoute() {
  // location.hash is like "#/wallet" or "#/wallet#wallet-coins" or "#/earnings?cat=gifts"
  const rawHash = (location.hash || '').replace(/^#/, '') || '/home';
  // Second "#" is an element id (e.g. #/wallet#wallet-coins) — not part of the route
  let elementId = '';
  let routePart = rawHash;
  const fragAt = rawHash.indexOf('#');
  if (fragAt >= 0) {
    elementId = rawHash.slice(fragAt + 1).split('?')[0];
    routePart = rawHash.slice(0, fragAt);
  }
  const path = routePart.startsWith('/') ? routePart : '/' + routePart;
  // Split only at the first ?: later question marks can be literal query values.
  const queryAt = path.indexOf('?');
  const pathname = queryAt === -1 ? path : path.slice(0, queryAt);
  const query = queryAt === -1 ? '' : path.slice(queryAt + 1);
  const parts = pathname.split('/').filter(Boolean);
  return {
    path: '/' + (parts[0] || 'home'),
    parts,
    query: Object.fromEntries(new URLSearchParams(query)),
    elementId,
    raw: path,
  };
}

export function navigate(to) {
  const href = to.startsWith('#') ? to : '#' + (to.startsWith('/') ? to : '/' + to);
  const next = href.replace(/^#/, '');
  const current = (location.hash || '').replace(/^#/, '');
  if (current === next) {
    // force refresh same route (hashchange does not fire)
    listeners.forEach((fn) => fn(getRoute()));
    return;
  }
  location.hash = next;
}

export function onRoute(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function startRouter() {
  const fire = () => listeners.forEach((fn) => fn(getRoute()));
  window.addEventListener('hashchange', fire);
  if (!location.hash) location.hash = '/home';
  else fire();
}
