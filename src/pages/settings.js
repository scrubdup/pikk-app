// #/settings — works signed in or out. TEST MODE: everything saved locally on this device until the backend exists.
import { esc, shellPage, toast } from '../ui.js';
import { getState, signOut } from '../store.js';
import { getSettings, setSetting, applyAppearance, getMembership, membershipStatus } from '../settings-store.js';

export const APP_VERSION = '0.1.0';
const toggle = (key, label, hint, s) => `<label class="pikk-set-row"><span><strong>${esc(label)}</strong>${hint ? `<small>${esc(hint)}</small>` : ''}</span><input type="checkbox" class="pikk-switch" data-setting="${key}"${s[key] ? ' checked' : ''} /></label>`;
const link = (href, label, hint) => `<a class="pikk-set-row pikk-set-link" href="${href}"><span><strong>${esc(label)}</strong>${hint ? `<small>${esc(hint)}</small>` : ''}</span><span aria-hidden="true">→</span></a>`;
const group = (id, title, body) => `<section class="card pikk-set-group" id="set-${id}" aria-labelledby="set-${id}-h"><h2 id="set-${id}-h">${esc(title)}</h2>${body}</section>`;

export function renderSettings() {
  const s = getSettings(); const user = getState()?.user; const m = getMembership();
  const account = user
    ? `<p class="pikk-set-who">Signed in as <strong>@${esc(user.username)}</strong> · local demo account</p>${link('#/profile', 'Edit profile', 'Name, bio, avatar')}<button type="button" class="btn pikk-set-btn" id="setSignOut">Sign out</button>`
    : `<p class="pikk-set-who">You're not signed in.</p><a class="btn primary pikk-set-btn" href="#/profile" id="setSignIn">Sign in / Create account</a>`;
  return shellPage('Settings', `
    ${group('account', 'Account', account + (m ? `<p class="pikk-set-member" data-membership>${esc(membershipStatus(m))}</p>` : '') + link('#/pricing', 'Memberships', 'Skeet+ · Backstage · Inner Circle'))}
    ${group('notifications', 'Notifications', toggle('notifyMessages', 'Messages', 'New messages and requests', s) + toggle('notifyLive', 'Live', 'When creators you follow go live', s) + toggle('notifyDrops', 'Music drops', 'New releases from DatBoiSkeet', s) + toggle('notifyPromos', 'Promotions', 'Offers and PIKK news', s) + '<p class="muted pikk-set-note">Preferences only — push notifications arrive once the PIKK backend is live.</p>')}
    ${group('privacy', 'Privacy', link('#/crew', 'PIKK Crew', 'Who sees your Crew stories') + link('#/favorites', 'Favorites', 'People who rank first in your feeds') + link('#/guidelines', 'Community guidelines', '') + link('#/privacy', 'Privacy', 'Draft — pending legal review') + link('#/terms?s=security', 'Security &amp; data breach', 'Terms · draft'))}
    ${group('appearance', 'Appearance', toggle('highContrast', 'High contrast', 'Brighter text and borders', s) + toggle('reduceMotion', 'Reduce motion', 'Fewer animations', s))}
    ${group('sound', 'Sound & splash', toggle('splashChime', 'Splash chime', 'Tuning-fork chime when PIKK opens', s) + toggle('showSplash', 'Show opening splash', '3-second PIKK logo on launch', s))}
    ${group('more', 'Payments & help', link('#/payments', 'Payments', 'Donate, coins, wallet, memberships') + link('#/support', 'Support', 'Help & tickets'))}
    ${group('about', 'About', `<p class="pikk-set-about">PIKK Network · version <strong data-version>${APP_VERSION}</strong> · TEST MODE</p><p class="muted pikk-set-note">Settings are saved only on this device until PIKK accounts are live.</p>`)}
  `, { badge: 'TEST MODE' });
}

export function bindSettings(root = document.getElementById('app')) {
  root?.querySelectorAll('[data-setting]').forEach((el) => el.addEventListener('change', () => {
    const s = setSetting(el.dataset.setting, el.checked); applyAppearance(s); toast('Saved on this device');
  }));
  root?.querySelector('#setSignOut')?.addEventListener('click', () => { signOut(); toast('Signed out'); root.innerHTML = renderSettings(); bindSettings(root); });
}
