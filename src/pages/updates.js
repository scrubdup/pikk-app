import '../updates.css';
import { esc, shellPage } from '../ui.js';
import { asset } from '../asset.js';
import { freshPikkUrl } from '../refresh-url.js';

// This is the SHA of the source commit that produced the currently loaded bundle,
// not a claim about the latest available remote release.
export const PIKK_BUILD_SHA = import.meta.env.VITE_BUILD_SHA || '';
// Curated, merged UI releases only. Keep this list factual; planned backend features are not shipped.
export const RECENT_RELEASES = Object.freeze([
  { title: 'Viral Live: Correct Category Destinations', detail: 'Viral Clips opens Clips, Songs opens Music, and Photos opens Home. These are links to existing PIKK sections; the 24/7 channel is still a preview, not broadcasting.', route: '#/viral-live', pr: 197, kind: 'VIRAL LIVE · PREVIEW' },
  { title: 'Viral Live: Mobile Category Visibility', detail: 'On narrow phones, keyboard-selected Videos, Viral Clips, Songs and Photos tabs scroll into view without changing the existing swipeable design. Continuous broadcasting is not live.', route: '#/viral-live', pr: 196, kind: 'VIRAL LIVE · PREVIEW' },
  { title: 'Viral Live: Source Queue Keyboard Browsing', detail: 'Use arrow keys or Home/End to select among three original music-video sources. The preview updates its artwork and YouTube source link; this is not a livestream.', route: '#/viral-live', pr: 195, kind: 'VIRAL LIVE · PREVIEW' },
  { title: 'Explore: Escape Clears Search', detail: 'Press Escape in Explore search to clear the query and results while keeping focus in the search field. Existing discovery and profiles remain available.', route: '#/explore', pr: 194, kind: 'EXPLORE · NAVIGATION' },
  { title: 'Explore: Search Survives Tab Changes', detail: 'Keep an Explore search when switching between Trending, Following and Discover; Clear resets the query and results. This improves browsing, not backend search coverage.', route: '#/explore', pr: 193, kind: 'EXPLORE · NAVIGATION' },
]);

export function renderUpdates() {
  const build = PIKK_BUILD_SHA ? PIKK_BUILD_SHA.slice(0, 8) : 'preview';
  const cards = RECENT_RELEASES.map((release, index) => `
    <article class="pikk-update-card">
      <span class="pikk-update-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <div class="pikk-update-card-copy">
        <span class="pikk-update-kind">${esc(release.kind)}</span>
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
        <p>Five recent user-visible improvements are below. Open each updated section and see exactly what shipped. Backend services marked TEST MODE are not production-ready.</p>
        <div class="pikk-updates-build">
          <span>Version loaded on this device</span>
          <strong id="pikkLoadedBuild" data-build="${esc(build)}">${esc(build)}</strong>
        </div>
        <div class="pikk-updates-actions">
          <button class="btn primary" type="button" id="pikkUpdatesRefresh">Check for latest version</button>
          <a class="btn ghost" href="#/home">Return home</a>
        </div>
      </div>
      <div class="pikk-updates-hero-mark"><img src="${esc(asset('brand/pikk-official-approved.jpg'))}" alt="PIKK official chrome logo" loading="eager"></div>
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
