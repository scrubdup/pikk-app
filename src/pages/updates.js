import '../updates.css';
import { esc, shellPage } from '../ui.js';
import { asset } from '../asset.js';
import { freshPikkUrl } from '../refresh-url.js';

// This is the SHA of the source commit that produced the currently loaded bundle,
// not a claim about the latest available remote release.
export const PIKK_BUILD_SHA = import.meta.env.VITE_BUILD_SHA || '';
// Curated, merged UI releases only. Keep this list factual; planned backend features are not shipped.
export const RECENT_RELEASES = Object.freeze([
  { title: 'Support: Find Answers Faster', detail: 'Search help guides with live match counts, clear your search by button or Escape, and browse consistent guide links. Tickets remain saved only on this device; AI agents are not connected.', route: '#/support', pr: 276, kind: 'SUPPORT · HELP CENTER' },
  { title: 'Support: Accurate Saved-Draft Feedback', detail: 'Saving an identical local ticket draft now says it was already saved rather than implying a new support request was submitted. No ticket is sent to staff.', route: '#/support', pr: 274, kind: 'SUPPORT · LOCAL DRAFTS' },
  { title: 'Support: No Duplicate Drafts', detail: 'Repeated saves of the same support issue no longer create duplicate browser-local drafts. Distinct issues can still be saved separately.', route: '#/support', pr: 272, kind: 'SUPPORT · LOCAL DRAFTS' },
  { title: 'Communities: Accessible Reply Threads', detail: 'After posting a local reply, the conversation stays expanded and keyboard focus returns to the correct thread control. Public community hosting is not connected.', route: '#/communities', pr: 271, kind: 'COMMUNITIES · ACCESSIBILITY' },
  { title: 'Profile: Reliable Member Links', detail: 'Follower, following and public-profile links now safely handle usernames and profile IDs containing reserved characters. Account data remains browser-local.', route: '#/profile', pr: 270, kind: 'PROFILE · NAVIGATION' },
]);

export function renderUpdates() {
  const build = PIKK_BUILD_SHA ? PIKK_BUILD_SHA.slice(0, 8) : 'preview';
  const cards = RECENT_RELEASES.map((release, index) => `
    <article class="pikk-update-card">
      <span class="pikk-update-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <div class="pikk-update-card-copy">
        <span class="pikk-update-kind">${esc(release.kind)}</span>${index === 0 ? '<span class="pikk-update-latest">Latest release</span>' : ''}
        <h3>${esc(release.title)}</h3>
        <p>${esc(release.detail)}</p>
        <div class="pikk-update-links">
          <a class="btn primary" href="${esc(release.route)}" aria-label="${esc(`See ${release.title} in PIKK`)}">See in PIKK</a>
          <a class="pikk-update-source" href="https://github.com/scrubdup/pikk-app/pull/${release.pr}" target="_blank" rel="noopener noreferrer">Code update #${release.pr}</a>
        </div>
      </div>
    </article>`).join('');

  return shellPage('PIKK Updates', `
    <section class="pikk-updates-hero" aria-label="PIKK app release information">
      <div>
        <p class="kicker">PIKK · WHAT'S NEW</p>
        <h2>See what changed. <span>Know what loaded.</span></h2>
        <p>Five recent, verified app improvements are below, newest first. Open each updated section to see what shipped. Local demos are not live backend services.</p>
        <div class="pikk-updates-build">
          <span>Version loaded on this device</span>
          <strong id="pikkLoadedBuild" data-build="${esc(build)}">${esc(build)}</strong>
        </div>
        <div class="pikk-updates-actions">
          <button class="btn primary" type="button" id="pikkUpdatesRefresh">Check for latest version</button>
          <a class="btn ghost" href="#/home">Return home</a>
        </div>
      </div>
      <div class="pikk-updates-hero-mark"><img src="${esc(asset('brand/pikk-logo-official.png'))}" alt="PIKK official chrome logo" loading="eager"></div>
    </section>
    <section class="pikk-updates-list" aria-label="Recent published updates">
      <h2>Latest verified improvements</h2>
      ${cards}
    </section>
    <p class="pikk-updates-note">A refresh reloads this browser's app bundle; it does not clear your account or local demo data. If a change still does not appear, compare the version above with the published source commit.</p>
  `, { lead: 'A clear record of recent PIKK improvements.' });
}

export function bindUpdates(root) {
  root.querySelector('#pikkUpdatesRefresh')?.addEventListener('click', () => {
    window.location.assign(freshPikkUrl(window.location.href));
  });
}
