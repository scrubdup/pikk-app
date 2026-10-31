/** Keep visual and screen-reader navigation state in sync after route changes.
 * Create is an action menu, not a destination; it is only current on its own route.
 */
export function markActiveTab(nav, routePath) {
  if (!nav) return;
  nav.querySelectorAll('a[data-path]').forEach((link) => {
    const isCurrent = link.getAttribute('data-path') === routePath;
    link.classList.toggle('on', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
