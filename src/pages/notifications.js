import { getState, setNotifPrefs } from '../store.js';
import { shellPage, toast } from '../ui.js';

// These four settings already exist in the browser-local PIKK demo store.
// This screen does not imply that push delivery or subscriber events are live.
const DEFAULT_PREFERENCES = Object.freeze({
  releases: true,
  lives: true,
  messages: true,
  quietHours: false,
});

const PREFERENCES = Object.freeze([
  { key: 'releases', title: 'New music releases', detail: 'Keep track of new DatBoiSkeet music and official drops.', group: 'discover' },
  { key: 'lives', title: 'Livestreams', detail: 'Choose whether you want live-session updates.', group: 'discover' },
  { key: 'messages', title: 'Messages', detail: 'Control conversation notification preferences.', group: 'social' },
  { key: 'quietHours', title: 'Quiet hours', detail: 'Save your preference for a quieter experience.', group: 'social' },
]);

function preferenceRow(item, settings) {
  const checked = !!settings[item.key];
  return `<label class="pikk-notif-row" for="pikk-notif-${item.key}">
    <span class="pikk-notif-row-copy"><strong>${item.title}</strong><small>${item.detail}</small></span>
    <input id="pikk-notif-${item.key}" type="checkbox" data-k="${item.key}" ${checked ? 'checked' : ''} />
  </label>`;
}

export function renderNotifications() {
  const settings = getState().notifications || {};
  const enabled = PREFERENCES.filter(item => !!settings[item.key]).length;
  return shellPage('Notifications', `
    <div class="pikk-notif-studio" id="notifPrefs">
      <header class="pikk-notif-hero" aria-label="PIKK notification preferences">
        <div class="pikk-notif-hero-copy">
          <span class="pikk-notif-eyebrow">PIKK · YOUR CONTROL CENTER</span>
          <h2>Stay in the loop.<br/><em>On your terms.</em></h2>
          <p>Fine-tune the alerts you want while PIKK grows. Your current settings stay on this device.</p>
          <div class="pikk-notif-hero-actions">
            <a class="btn" href="#/live">Explore Live</a>
            <a class="btn ghost" href="#/messages">Open Messages</a>
          </div>
        </div>
        <div class="pikk-notif-hero-art" aria-hidden="true">
          <span class="pikk-notif-orbit"></span>
          <span class="pikk-notif-bell">♬</span>
          <span class="pikk-notif-art-label">PIKK ALERTS</span>
        </div>
      </header>
      <div class="pikk-notif-summary" aria-label="Notification settings overview">
        <div><span>Preference controls</span><strong>04</strong></div>
        <div><span>Currently enabled</span><strong id="pikkNotifEnabled">${enabled} of 4</strong></div>
        <div><span>Storage</span><strong>On this device</strong></div>
      </div>
      <div class="pikk-notif-columns">
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifDiscoverTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">♫</span><div><span class="pikk-notif-kicker">DISCOVER</span><h3 id="pikkNotifDiscoverTitle">Music &amp; Live</h3></div></div>
          ${PREFERENCES.filter(item => item.group === 'discover').map(item => preferenceRow(item, settings)).join('')}
        </section>
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifSocialTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">✉</span><div><span class="pikk-notif-kicker">YOUR SPACE</span><h3 id="pikkNotifSocialTitle">Social &amp; Focus</h3></div></div>
          ${PREFERENCES.filter(item => item.group === 'social').map(item => preferenceRow(item, settings)).join('')}
        </section>
      </div>
      <div class="pikk-notif-tools">
        <span>Pause or resume music, live and message preferences without changing Quiet hours. Settings stay on this device.</span>
        <div class="pikk-notif-tool-actions">
          <button class="btn ghost" type="button" id="pikkNotifPause">Pause alerts</button>
          <button class="btn ghost" type="button" id="pikkNotifResume">Resume alerts</button>
          <button class="btn ghost" type="button" id="pikkNotifReset">Restore defaults</button>
        </div>
      </div>
      <p class="pikk-notif-save-status" id="pikkNotifStatus" role="status" aria-live="polite">Preferences are saved locally. Real push delivery is not connected in this demo.</p>
      <section class="pikk-notif-roadmap" aria-label="Upcoming live subscriber alerts">
        <div><span class="pikk-notif-kicker">IN DEVELOPMENT</span><h3>New Subscriber Live Alerts</h3><p>Animated username and membership-tier popups, sound controls, durations, and a streamer activity inbox are planned. Confirmed subscription event integration is not available yet.</p></div>
        <span class="pikk-notif-planned">Coming soon</span>
      </section>
    </div>`, { lead: 'Music, live and social preferences · browser-local demo.' });
}

export function bindNotifications(root) {
  const panel = root.querySelector('#notifPrefs');
  if (!panel) return;
  // These controls only update local demo preferences, never real push delivery.
  const setAlertPreferences = (enabled) => {
    const alertKeys = ['releases', 'lives', 'messages'];
    setNotifPrefs(Object.fromEntries(alertKeys.map(key => [key, enabled])));
    panel.querySelectorAll('input[data-k]').forEach(input => {
      if (alertKeys.includes(input.dataset.k)) input.checked = enabled;
    });
    const current = getState().notifications || {};
    const count = PREFERENCES.filter(item => !!current[item.key]).length;
    const summary = panel.querySelector('#pikkNotifEnabled');
    if (summary) summary.textContent = `${count} of 4`;
    const status = panel.querySelector('#pikkNotifStatus');
    if (status) status.textContent = enabled
      ? 'Music, live and message preferences resumed on this device. Real push delivery is not connected.'
      : 'Music, live and message preferences paused on this device. Real push delivery is not connected.';
    toast(enabled ? 'Alerts resumed' : 'Alerts paused');
  };
  panel.querySelector('#pikkNotifPause')?.addEventListener('click', () => setAlertPreferences(false));
  panel.querySelector('#pikkNotifResume')?.addEventListener('click', () => setAlertPreferences(true));
  panel.querySelector('#pikkNotifReset')?.addEventListener('click', () => {
    setNotifPrefs(DEFAULT_PREFERENCES);
    panel.querySelectorAll('input[data-k]').forEach(input => {
      input.checked = DEFAULT_PREFERENCES[input.dataset.k];
    });
    const summary = panel.querySelector('#pikkNotifEnabled');
    if (summary) summary.textContent = '3 of 4';
    const status = panel.querySelector('#pikkNotifStatus');
    if (status) status.textContent = 'Notification preferences restored to defaults on this device.';
    toast('Defaults restored');
  });
  panel.querySelectorAll('input[data-k]').forEach(input => {
    input.addEventListener('change', () => {
      const key = input.dataset.k;
      if (!PREFERENCES.some(item => item.key === key)) return;
      setNotifPrefs({ [key]: input.checked });
      const current = getState().notifications || {};
      const count = PREFERENCES.filter(item => !!current[item.key]).length;
      const summary = panel.querySelector('#pikkNotifEnabled');
      if (summary) summary.textContent = `${count} of 4`;
      const status = panel.querySelector('#pikkNotifStatus');
      if (status) status.textContent = `${PREFERENCES.find(item => item.key === key).title} preference saved on this device.`;
      toast('Preference saved');
    });
  });
}
