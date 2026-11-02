// Local-only app settings (TEST MODE: no backend yet). Saved in this browser.
export const SETTINGS_KEY = 'pikk.settings.v1';
export const SETTINGS_DEFAULTS = Object.freeze({
  notifyMessages: true, notifyLive: true, notifyDrops: true, notifyPromos: false,
  highContrast: false, reduceMotion: false, splashChime: true, showSplash: true,
});
const ls = () => { try { return globalThis.localStorage || null; } catch { return null; } };
export function getSettings() {
  try { return { ...SETTINGS_DEFAULTS, ...JSON.parse(ls()?.getItem(SETTINGS_KEY) || '{}') }; } catch { return { ...SETTINGS_DEFAULTS }; }
}
export function setSetting(key, value) {
  if (!(key in SETTINGS_DEFAULTS)) return getSettings();
  const next = { ...getSettings(), [key]: Boolean(value) };
  ls()?.setItem(SETTINGS_KEY, JSON.stringify(next));
  return next;
}
export function applyAppearance(s = getSettings(), root = globalThis.document?.documentElement) {
  if (!root) return;
  root.classList.toggle('pikk-high-contrast', !!s.highContrast);
  root.classList.toggle('pikk-reduce-motion', !!s.reduceMotion);
}

// Memberships (TEST MODE): chosen tier stored locally, no charge until Stripe.
export const MEMBERSHIP_KEY = 'pikk.membership.v1';
export function getMembership() { try { return JSON.parse(ls()?.getItem(MEMBERSHIP_KEY) || 'null'); } catch { return null; } }
export function joinMembership(tier) {
  if (!tier || !tier.id) return null;
  const m = { id: tier.id, name: tier.name, price: tier.price, at: Date.now(), testMode: true };
  ls()?.setItem(MEMBERSHIP_KEY, JSON.stringify(m));
  return m;
}
export function leaveMembership() { ls()?.removeItem(MEMBERSHIP_KEY); }
export const membershipStatus = (m) => (m ? `${m.name} (test mode) — billing starts when Stripe is live` : '');
