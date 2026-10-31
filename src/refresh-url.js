/** Refresh the current PIKK entrypoint without losing its route or query state. */
export function freshPikkUrl(currentHref, stamp = Date.now()) {
  const url = new URL(currentHref);
  url.searchParams.set('refresh', String(stamp));
  return url.toString();
}
