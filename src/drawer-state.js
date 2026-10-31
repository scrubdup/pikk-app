/** Keep the off-canvas PIKK navigation accessible to keyboard and touch users.
 * The drawer is inert when hidden, so its links cannot receive off-screen focus.
 * No route, player, or existing menu content is changed here.
 */
export function applyDrawerState({ drawer, scrim, trigger }, open, restoreFocus = false) {
  if (!drawer || !scrim || !trigger) return;
  const isOpen = Boolean(open);
  drawer.classList.toggle('open', isOpen);
  drawer.setAttribute('aria-hidden', String(!isOpen));
  drawer.inert = !isOpen;
  scrim.classList.toggle('show', isOpen);
  trigger.setAttribute('aria-expanded', String(isOpen));
  trigger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  if (isOpen) drawer.querySelector('button, a[href]')?.focus();
  else if (restoreFocus) trigger.focus();
}
