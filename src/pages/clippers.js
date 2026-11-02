import { submitClipperApp, getState, setClipperStatus } from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

function refresh() {
  navigate('#/clippers');
}

const STATUS_CHIP = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  waitlisted: 'Waitlisted',
};

export function renderClippers() {
  const { clipperApps, user } = getState();
  const total = clipperApps.length;
  const approved = clipperApps.filter(a => a.status === 'approved').length;
  const pending = clipperApps.filter(a => a.status === 'pending').length;
  const form = `
    <div class="clippers-studio">
      <header class="clippers-hero">
        <div class="clippers-hero-label">PIKK CREATOR STUDIO <span aria-hidden="true">◆</span> CLIPPER PROGRAM</div>
        <h2>Turn your edits into opportunities.</h2>
        <p>Apply to become a PIKK Clipper, share your work and track your application in one place.</p>
        <div class="clippers-hero-actions"><a class="btn primary" href="#clipper-application">Apply to clip</a><a class="btn ghost" href="#clipper-submissions">My applications</a></div>
        <div class="clippers-hero-disclaimer">TEST MODE · Applications saved on this device · No paid campaigns or payouts active</div>
      </header>
      <section class="clippers-stats" aria-label="Application overview">
        <div><span>Applications</span><strong>${total}</strong><small>On this device</small></div>
        <div><span>Pending review</span><strong>${pending}</strong><small>Demo review queue</small></div>
        <div><span>Approved</span><strong>${approved}</strong><small>Demo status only</small></div>
      </section>
    <div class="card clippers-panel" id="clipper-application">
      <div class="home-sell-title-row">
        <h3 style="margin:0">Clipper application</h3>
        <span class="badge-cs badge-cs-inline" id="clippers-coming-soon">Coming Soon</span>
      </div>
      <p class="chip" style="margin:0 0 8px">Clipper earnings not live yet · TEST MODE</p>
      <p class="muted">No minimum followers. Admin reviews every application. Analytics screenshots can be linked as URLs for this demo.</p>
      <div class="grid-2">
        <div class="field"><label>Name *</label><input id="cName" required /></div>
        <div class="field"><label>Email *</label><input id="cEmail" type="email" required /></div>
      </div>
      <div class="field"><label>Age</label><input id="cAge" type="number" min="13" max="120" /></div>
      <h3 style="margin-top:8px">Platforms</h3>
      <div class="grid-2">
        <div class="field"><label>TikTok</label><input id="cTiktok" placeholder="@ or URL" /></div>
        <div class="field"><label>Instagram</label><input id="cIg" placeholder="@ or URL" /></div>
        <div class="field"><label>YouTube</label><input id="cYt" /></div>
        <div class="field"><label>X / Twitter</label><input id="cX" /></div>
        <div class="field"><label>Facebook</label><input id="cFb" /></div>
        <div class="field"><label>Followers (total approx)</label><input id="cFollowers" /></div>
      </div>
      <h3 style="margin-top:8px">Analytics</h3>
      <div class="grid-2">
        <div class="field"><label>Monthly views</label><input id="cViews" /></div>
        <div class="field"><label>Avg views / post</label><input id="cAvgViews" /></div>
        <div class="field"><label>Engagement rate</label><input id="cEngage" placeholder="e.g. 4.2%" /></div>
        <div class="field"><label>Posting frequency</label><input id="cFreq" placeholder="e.g. 5× / week" /></div>
      </div>
      <div class="field"><label>Niche / promotional experience</label><textarea id="cNiche"></textarea></div>
      <div class="field"><label>Work sample links</label><textarea id="cSamples" placeholder="Paste URLs, one per line"></textarea></div>
      <div class="field"><label>Analytics notes / screenshot links</label><textarea id="cAnalytics" placeholder="Describe numbers or paste image URLs"></textarea></div>
      <button class="btn primary block" id="cSubmit">Submit application</button>
    </div>

    <div class="card clippers-panel" id="clipper-submissions">
      <h3>Submissions (this device)</h3>
      ${
        clipperApps.length
          ? clipperApps
              .map(
                (a) => `
            <div class="card" style="margin:0 0 10px;background:#12121a" data-app="${esc(a.id)}">
              <div class="row wrap">
                <strong>${esc(a.name)}</strong>
                <span class="chip">${esc(STATUS_CHIP[a.status] || a.status)}</span>
                <span class="muted spacer" style="text-align:right">${timeAgo(a.at)}</span>
              </div>
              <p class="muted" style="margin:6px 0;font-size:12px">${esc(a.email)} · ${esc(a.niche || '—')}</p>
              <p style="font-size:12px;margin:0 0 8px">${esc((a.samples || '').slice(0, 120))}</p>
              <div class="row wrap admin-actions">
                <button class="btn primary clip-status" data-id="${esc(a.id)}" data-status="approved">Approve</button>
                <button class="btn ghost clip-status" data-id="${esc(a.id)}" data-status="waitlisted">Waitlist</button>
                <button class="btn ghost clip-status" data-id="${esc(a.id)}" data-status="rejected">Reject</button>
              </div>
            </div>`
              )
              .join('')
          : '<p class="muted">None yet.</p>'
      }
      <p class="muted" style="font-size:12px;margin-top:8px">Demo admin: approve / reject here or on <a href="#/admin" style="color:var(--sk)">Admin</a>. Signed in as ${esc(user?.username || 'guest')}.</p>
    </div>
    </div>
  `;
  return shellPage('Clippers', form, {
    lead: 'Apply → admin approve → paid campaigns & tracked links.',
  });
}

export function bindClippers(root) {
  root.querySelector('#cSubmit')?.addEventListener('click', () => {
    const name = root.querySelector('#cName')?.value?.trim();
    const email = root.querySelector('#cEmail')?.value?.trim();
    if (!name || !email) return toast('Name and email required');
    submitClipperApp({
      name,
      email,
      age: root.querySelector('#cAge')?.value,
      tiktok: root.querySelector('#cTiktok')?.value,
      instagram: root.querySelector('#cIg')?.value,
      youtube: root.querySelector('#cYt')?.value,
      x: root.querySelector('#cX')?.value,
      facebook: root.querySelector('#cFb')?.value,
      followers: root.querySelector('#cFollowers')?.value,
      views: root.querySelector('#cViews')?.value,
      avgViews: root.querySelector('#cAvgViews')?.value,
      engagement: root.querySelector('#cEngage')?.value,
      frequency: root.querySelector('#cFreq')?.value,
      niche: root.querySelector('#cNiche')?.value,
      samples: root.querySelector('#cSamples')?.value,
      analyticsNotes: root.querySelector('#cAnalytics')?.value,
      applicantUserId: getState().user?.id || null,
    });
    toast('Application saved for admin review');
    refresh();
  });

  root.querySelectorAll('.clip-status').forEach((btn) => {
    btn.addEventListener('click', () => {
      setClipperStatus(btn.dataset.id, btn.dataset.status);
      toast('Marked ' + btn.dataset.status);
      refresh();
    });
  });
}
