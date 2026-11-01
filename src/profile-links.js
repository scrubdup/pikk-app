/** Build a hash route for a profile ID without treating reserved characters as navigation. */
export function profileRouteHref(id, view = '') {
  const path = '#/profile/' + encodeURIComponent(String(id));
  return view === 'public' ? path + '?view=public' : path;
}
