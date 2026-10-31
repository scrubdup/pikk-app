/** Announce hash-route changes without moving focus away from the persistent PIKK player. */
export function pageLabel(route, main) {
  const heading = main?.querySelector?.('h1')?.textContent?.replace(/\s+/g, ' ').trim();
  if (heading) return heading.slice(0, 80);
  const slug = String(route?.path || '/home').split('/').filter(Boolean).pop() || 'home';
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
}

export function updateRouteIdentity(route, main, announcer, pageDocument = document) {
  const label = pageLabel(route, main);
  pageDocument.title = `${label} | PIKK`;
  if (announcer) announcer.textContent = `${label} page loaded`;
  return label;
}
