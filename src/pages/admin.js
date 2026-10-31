import {
  getState,
  setClipperStatus,
  isAdmin,
  setAdminRole,
  getAdminStats,
  getAdminOverview,
  listCatalog,
  addCatalogItem,
  updateCatalogItem,
  setCatalogPublished,
  removeCatalogItem,
  setOpenMicStatus,
  ensureOpenMicSeeded,
  ensureFanClubsSeeded,
  ensureHotPostsSeeded,
  listEngagementAlerts,
  markEngagementAlertHandled,
  adminQuickLike,
  adminQuickComment,
  adminQuickShare,
  refreshHotFeed,
} from '../store.js';
import { navigate, getRoute } from '../router.js';
import { esc, shellPage, toast } from '../ui.js';
import { putBlob, newBlobId, resolveMediaSrc } from '../media-db.js';
import { readVideoDuration, validatePikkVideoMetadata } from '../pikk-video-policy.js';

const TYPES = [
  { id: 'song', label: 'Song', acceptCover: 'image/*', acceptMedia: 'audio/*,.mp3,.m4a,.wav,.aac' },
  { id: 'album', label: 'Album', acceptCover: 'image/*', acceptMedia: 'audio/*,.mp3,.m4a,.wav,.aac' },
  { id: 'video', label: 'Video', acceptCover: 'image/*', acceptMedia: 'video/*,.mp4,.mov,.webm' },
  { id: 'picture', label: 'Picture', acceptCover: 'image/*', acceptMedia: 'image/*' },
];

function gateHtml(user) {
  return shellPage(
    'Admin',
    `<div class="card admin-gate">
      <h3>Admin gate · TEST MODE</h3>
      <p class="muted">Demo-only. No real auth. Enable one of:</p>
      <ol class="admin-gate-steps">
        <li>Sign in on <a href="#/profile">Profile</a>, then toggle <strong>Demo Admin</strong>.</li>
        <li>While signed in, open <code>#/admin?admin=1</code> (sets <code>user.role='admin'</code> in <code>dbs_v1</code>).</li>
      </ol>
      <p>Signed in as: <strong>${esc(user?.username || 'guest')}</strong>
        ${user ? '' : '· <a class="btn" href="#/profile">Sign in</a>'}</p>
      ${user ? `<a class="btn primary" href="#/admin?admin=1">Enable Admin · TEST MODE</a>` : ''}
    </div>
    <div class="card muted">Full team roles, revenue, and moderation ship later phases.</div>`,
    { lead: 'Gated demo dashboard.' }
  );
}

function addContentFormHtml() {
  const tabs = TYPES.map(
    (t, i) =>
      `<button type="button" class="admin-type-tab${i === 0 ? ' on' : ''}" data-type="${esc(t.id)}" role="tab">${esc(t.label)}</button>`
  ).join('');

  return `
  <section class="card admin-add" id="adminAdd">
    <h3>Add Content</h3>
    <p class="muted admin-add-note">PIKKUP preview: video uploads must be 20 minutes or shorter and at most 250 MB. Device-local only, not public hosting. TEST MODE · no backend. Metadata → <code>localStorage dbs_v1.catalog</code>. Files → IndexedDB <code>dbs_media_v1</code>. Works on iPhone Safari &amp; desktop. Large files stay on this device only.</p>

    <div class="admin-type-tabs" role="tablist" aria-label="Content type">${tabs}</div>

    <form class="admin-add-form" id="adminAddForm" novalidate>
      <input type="hidden" name="type" id="adminType" value="song" />

      <div class="admin-field">
        <label for="adminTitle">Title *</label>
        <input id="adminTitle" name="title" required maxlength="120" placeholder="Track or release title" autocomplete="off" />
      </div>

      <div class="admin-field">
        <label for="adminArtist">Artist / credit</label>
        <input id="adminArtist" name="artist" maxlength="80" value="DatBoiSkeet" autocomplete="off" />
      </div>

      <div class="admin-field admin-field-cover">
        <label>Cover / image</label>
        <div class="admin-dropzone" data-zone="cover" tabindex="0">
          <input type="file" id="adminCoverFile" class="admin-file-input" accept="image/*" capture="environment" />
          <p class="admin-dropzone-label"><strong>Tap to upload cover</strong><span class="muted"> · photo library or camera (iPhone) · or paste URL below</span></p>
          <p class="admin-file-name muted" data-for="cover"></p>
        </div>
        <input id="adminCoverUrl" name="coverUrl" type="url" inputmode="url" placeholder="https://… or /music/…" class="admin-url-input" />
      </div>

      <div class="admin-field admin-field-media">
        <label id="adminMediaLabel">Media file (audio / video / image)</label>
        <div class="admin-dropzone" data-zone="media" tabindex="0">
          <input type="file" id="adminMediaFile" class="admin-file-input" accept="audio/*,video/*,image/*,.mp3,.m4a,.wav,.mp4,.mov,.webm" />
          <p class="admin-dropzone-label"><strong>Tap to upload media</strong><span class="muted"> · Files app / Photos on iPhone · desktop drag-drop</span></p>
          <p class="admin-file-name muted" data-for="media"></p>
        </div>
        <input id="adminMediaUrl" name="mediaUrl" type="url" inputmode="url" placeholder="https://… media URL (optional)" class="admin-url-input" />
      </div>

      <div class="admin-field admin-field-youtube">
        <label for="adminYoutube">YouTube link (optional)</label>
        <input id="adminYoutube" name="youtube" type="url" inputmode="url" placeholder="https://www.youtube.com/watch?v=…" />
      </div>

      <div class="admin-field admin-field-streaming" id="adminStreamingFields">
        <label>Streaming links (optional · song/album · official URLs only)</label>
        <p class="muted" style="margin:0 0 8px;font-size:12px">Leave blank if unknown — never invent. Shown on Music · Stream Everywhere when published.</p>
        <div class="admin-stream-grid">
          <input id="adminSpotify" name="spotify" type="url" inputmode="url" placeholder="Spotify https://open.spotify.com/…" />
          <input id="adminApple" name="apple" type="url" inputmode="url" placeholder="Apple Music https://music.apple.com/…" />
          <input id="adminYtm" name="youtubeMusic" type="url" inputmode="url" placeholder="YouTube Music https://music.youtube.com/…" />
          <input id="adminTidal" name="tidal" type="url" inputmode="url" placeholder="Tidal (optional)" />
          <input id="adminAmazon" name="amazon" type="url" inputmode="url" placeholder="Amazon Music (optional)" />
        </div>
      </div>

      <div class="admin-field admin-publish">
        <label class="admin-publish-toggle">
          <input type="checkbox" id="adminPublished" name="published" checked />
          <span>Publish now</span>
        </label>
        <p class="muted">Unpublished items stay admin-only. Published songs/albums appear on Music; videos on Videos &amp; Home; pictures on Home.</p>
      </div>

      <div class="admin-add-actions">
        <button type="submit" class="btn primary" id="adminSave">Save to catalog</button>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted admin-add-status" id="adminAddStatus" aria-live="polite"></p>
    </form>
  </section>`;
}

function catalogListHtml(items) {
  if (!items.length) {
    return `<div class="card admin-catalog"><h3>Catalog</h3><p class="muted">No admin-added items yet.</p></div>`;
  }
  const rows = items
    .map((c) => {
      const cover = c.coverRef && !c.coverRef.startsWith('idb:') ? esc(c.coverRef) : '';
      return `<div class="admin-catalog-row" data-id="${esc(c.id)}">
        <div class="admin-catalog-thumb">
          ${
            cover
              ? `<img src="${cover}" alt="" />`
              : `<img data-idb-src="${esc(c.coverRef || '')}" alt="" class="idb-pending" />`
          }
        </div>
        <div class="admin-catalog-meta">
          <strong>${esc(c.title)}</strong>
          <span class="muted">${esc(c.type)} · ${esc(c.artist)}</span>
          <span class="chip">${c.published ? 'Published' : 'Draft'}</span>
          ${c.streamingLinks && Object.keys(c.streamingLinks).length ? '<span class="chip">Streaming links</span>' : ''}
        </div>
        <div class="admin-catalog-actions">
          <button type="button" class="btn ghost admin-cat-pub" data-id="${esc(c.id)}" data-on="${c.published ? '0' : '1'}">${c.published ? 'Unpublish' : 'Publish'}</button>
          <button type="button" class="btn ghost admin-cat-del" data-id="${esc(c.id)}">Delete</button>
        </div>
      </div>`;
    })
    .join('');
  return `<div class="card admin-catalog"><h3>Catalog (${items.length})</h3>
    <p class="muted">Drafts are admin-only. Publish to show on Music / Videos / Home.</p>
    <div class="admin-catalog-list">${rows}</div></div>`;
}


function money(n) {
  const v = Number(n) || 0;
  return '$' + v.toFixed(2);
}

function openMicQueueHtml(overview) {
  const pending = overview.openMic?.pending || [];
  const bs = overview.openMic?.byStatus || {};
  const rows = pending.length
    ? pending
        .map(
          (a) => `<div class="row wrap admin-om-row" data-om-id="${esc(a.id)}">
            <span class="spacer"><strong>${esc(a.username)}</strong> · ${esc(a.talent)} · ${esc(a.trackTitle)}
              <span class="chip">pending</span>
              ${a.rightsCertified ? '<span class="chip">rights</span>' : '<span class="chip">no rights</span>'}
            </span>
            <button type="button" class="btn primary admin-om" data-id="${esc(a.id)}" data-status="approved">Approve</button>
            <button type="button" class="btn ghost admin-om" data-id="${esc(a.id)}" data-status="rejected">Reject</button>
          </div>`
        )
        .join('')
    : '<p class="muted">No pending applications. Seeded demos may already be approved/rejected — open <a href="#/openmic">Open Mic</a>.</p>';
  return `<section class="card admin-openmic" id="adminOpenMic">
    <h3>Open Mic queue</h3>
    <p class="muted">TEST MODE · reuse store Approve/Reject. Pending ${bs.pending || 0} · approved ${bs.approved || 0} · rejected ${bs.rejected || 0} · total ${overview.openMic?.total || 0}</p>
    ${rows}
    <p class="admin-panel-links"><a class="btn" href="#/openmic">Full Open Mic page</a></p>
  </section>`;
}

function fanClubsGlanceHtml(overview) {
  const fc = overview.fanClubs || { total: 0, recent: [] };
  const rows = fc.recent.length
    ? `<ul class="list-plain">${fc.recent
        .map(
          (c) =>
            `<li><span><strong>${esc(c.name)}</strong> · ${esc(c.privacy)}${c.official ? ' · official' : ''}</span><span class="muted">${c.memberCount} members</span></li>`
        )
        .join('')}</ul>`
    : '<p class="muted">No clubs yet.</p>';
  return `<section class="card admin-fanclubs" id="adminFanClubs">
    <h3>Fan Clubs glance</h3>
    <div class="stats">
      <div><strong>${fc.total}</strong><span>Clubs</span></div>
    </div>
    ${rows}
    <p class="admin-panel-links"><a class="btn" href="#/fanclubs">Open Fan Clubs</a></p>
  </section>`;
}

function loyaltyGlanceHtml(overview) {
  const L = overview.loyalty || {};
  const badges = (L.badges || []).slice(0, 6).map((b) => `<span class="chip">${esc(b)}</span>`).join(' ') || '<span class="muted">None unlocked</span>';
  return `<section class="card admin-loyalty" id="adminLoyalty">
    <h3>Loyalty glance</h3>
    <p class="muted">${esc(L.note || 'Device-local loyalty')}</p>
    <div class="stats">
      <div><strong>${L.points || 0}</strong><span>Points</span></div>
      <div><strong>${L.badgeCount || 0}</strong><span>Badges</span></div>
      <div><strong>${L.historyCount || 0}</strong><span>Actions</span></div>
    </div>
    <p class="admin-badge-row">${badges}</p>
    <p class="admin-panel-links"><a class="btn" href="#/loyalty">Open Loyalty Club</a></p>
  </section>`;
}

function quickLinksHtml() {
  const groups = [
    {
      owner: 'Live Social',
      links: [
        ['#/live', 'Live'],
        ['#/messages', 'Messages'],
        ['#/giftbattles', 'Gift battles'],
        ['#/multiguest', 'Multi-guest'],
        ['#/spotlight', 'Spotlight'],
        ['#/restream', 'Restream'],
        ['#/connect', 'Connect'],
      ],
    },
    {
      owner: 'Commerce',
      links: [
        ['#/marketplace', 'Marketplace'],
        ['#/wallet', 'Wallet'],
        ['#/earnings', 'Earnings'],
        ['#/missions', 'Missions'],
        ['#/share', 'Share & Earn'],
        ['#/refer', 'Refer & Earn'],
      ],
    },
    {
      owner: 'Build',
      links: [
        ['#/explore', 'Explore'],
        ['#/notifications', 'Notifications'],
        ['#/fanclubs', 'Fan Clubs'],
        ['#/loyalty', 'Loyalty'],
        ['#/openmic', 'Open Mic'],
      ],
    },
  ];
  const blocks = groups
    .map((g) => {
      const anchors = g.links
        .map(([href, label]) => `<a class="btn ghost admin-qlink" href="${href}">${esc(label)}</a>`)
        .join('');
      return `<div class="admin-ql-group"><span class="chip">${esc(g.owner)}</span><div class="admin-ql-row">${anchors}</div></div>`;
    })
    .join('');
  return `<section class="card admin-quicklinks" id="adminQuickLinks">
    <h3>Quick links</h3>
    <p class="muted">Deep-links only · page ownership stays with Live Social / Commerce / Build.</p>
    ${blocks}
  </section>`;
}

function revenueShellHtml(overview) {
  const r = overview.revenue || {};
  const cats = (r.byCategory || [])
    .map(
      (c) =>
        `<li><span>${esc(c.label || c.category)} ×${c.count}</span><span class="muted">gross ${money(c.gross)} · creator ${money(c.creatorShare)} · PIKK ${money(c.dbsShare)}</span></li>`
    )
    .join('');
  return `<section class="card admin-revenue" id="adminRevenue">
    <h3>Revenue / analytics shell</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">${esc(r.chip || 'demo figures · not production')}</span>
    </div>
    <div class="stats">
      <div><strong>${money(r.gross)}</strong><span>Gross</span></div>
      <div><strong>${money(r.fees)}</strong><span>Fees</span></div>
      <div><strong>${money(r.creatorShare)}</strong><span>Creator net</span></div>
      <div><strong>${money(r.dbsShare)}</strong><span>PIKK net</span></div>
    </div>
    <p class="muted">Creator available ${money(r.creatorAvailable)} · holds ${money(r.creatorHolds)} · fan wallet ${money(r.fanWalletBalance)} · catalog ${r.catalogPublished || 0}/${r.catalogTotal || 0} published · earning lines ${r.earnCount || 0}</p>
    ${cats ? `<ul class="list-plain">${cats}</ul>` : '<p class="muted">No creator earnings in store yet — open Wallet / Earnings (Commerce) to seed demos.</p>'}
    <p class="admin-panel-links">
      <a class="btn" href="#/wallet">Wallet</a>
      <a class="btn" href="#/earnings">Earnings</a>
    </p>
  </section>`;
}


function engagementAlertsHtml(overview) {
  ensureHotPostsSeeded();
  refreshHotFeed();
  const open = listEngagementAlerts({ openOnly: true });
  const allCount = listEngagementAlerts({ openOnly: false }).length;
  const hf = overview.hotFeed || {};
  const rows = open.length
    ? open
        .slice(0, 12)
        .map((a) => {
          const kindChip = a.kind === 'live' ? '<span class="chip">live</span>' : '<span class="chip">post</span>';
          const extra =
            a.kind === 'live'
              ? ` · viewers ${a.viewers ?? '—'} · gifts ${a.gifts ?? '—'}`
              : ` · score ${a.score ?? 0}`;
          const actions =
            a.kind === 'post'
              ? `<button type="button" class="btn primary admin-ea-like" data-ref="${esc(a.refId)}" data-alert="${esc(a.id)}">Like</button>
                 <button type="button" class="btn ghost admin-ea-comment" data-ref="${esc(a.refId)}" data-alert="${esc(a.id)}">Comment</button>
                 <button type="button" class="btn ghost admin-ea-share" data-ref="${esc(a.refId)}" data-alert="${esc(a.id)}">Share</button>`
              : `<a class="btn ghost" href="#/live">Open Live</a>`;
          return `<div class="admin-ea-row" data-alert-id="${esc(a.id)}">
            <div class="admin-ea-main">
              <strong>${esc(a.username || 'creator')}</strong> ${kindChip}
              <div class="muted">${esc(a.title || '')}${extra}</div>
            </div>
            <div class="admin-ea-actions row wrap">
              ${actions}
              <button type="button" class="btn ghost admin-ea-handle" data-alert="${esc(a.id)}">Mark handled</button>
            </div>
          </div>`;
        })
        .join('')
    : '<p class="muted">No open engagement alerts. Hot posts/lives will appear here when score spikes (TEST MODE).</p>';
  return `<section class="card admin-engagement" id="adminEngagement">
    <h3>Engagement alerts</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">§38 Hot Feed</span>
    </div>
    <p class="muted">When posts or lives go hot, alert Admin · one-tap Like / Comment / Share · mark handled. Persist <code>dbs_v1.engagementAlerts</code>.</p>
    <div class="stats">
      <div><strong>${open.length}</strong><span>Open</span></div>
      <div><strong>${allCount}</strong><span>Total alerts</span></div>
      <div><strong>${hf.hotPosts || 0}</strong><span>Hot posts</span></div>
      <div><strong>${hf.hotLives || 0}</strong><span>Hot lives</span></div>
    </div>
    ${rows}
    <p class="admin-panel-links"><a class="btn" href="#/posts">Open Posts Hot strip</a><a class="btn" href="#/live">Open Live</a></p>
  </section>`;
}

function moderationStubHtml(overview) {
  const m = overview.moderation || {};
  return `<section class="card admin-moderation" id="adminModeration">
    <h3>Moderation stub</h3>
    <p class="muted">${esc(m.note || 'Stub')}</p>
    <div class="stats">
      <div><strong>${(m.warnings || []).length}</strong><span>Warnings</span></div>
      <div><strong>${(m.suspensions || []).length}</strong><span>Suspensions</span></div>
    </div>
    <p class="muted">Empty-state · no enforcement actions stored yet.</p>
    <p class="admin-panel-links"><a class="btn" href="#/guidelines">Community Guidelines</a></p>
  </section>`;
}

export function renderAdmin() {
  const route = getRoute();
  const { posts, clipperApps, user } = getState();

  if (route.query?.admin === '1' && user && user.role !== 'admin') {
    setAdminRole(true);
  }

  if (!isAdmin()) return gateHtml(user);

  ensureOpenMicSeeded();
  ensureFanClubsSeeded();
  ensureHotPostsSeeded();
  const stats = getAdminStats();
  const overview = getAdminOverview();
  const bs = stats.clipperByStatus;
  const allCatalog = listCatalog({ includeUnpublishedForAdmin: true });

  return shellPage(
    'Admin',
    `<div class="card admin-header">
      <div class="row wrap">
        <span class="chip">TEST MODE</span>
        <span class="chip">role=admin</span>
        <span class="spacer muted">Signed in as <strong>${esc(user.username)}</strong></span>
        <button class="btn ghost" id="adminRevoke">Revoke admin</button>
      </div>
      <p class="muted admin-gate-hint">Gate: Profile toggle or <code>?admin=1</code> → <code>user.role='admin'</code> in <code>dbs_v1</code>. Phase 2 panels deep-link to owner pages.</p>
    </div>

    ${quickLinksHtml()}
    ${engagementAlertsHtml(overview)}
    ${openMicQueueHtml(overview)}
    ${fanClubsGlanceHtml(overview)}
    ${loyaltyGlanceHtml(overview)}
    ${revenueShellHtml(overview)}
    ${moderationStubHtml(overview)}

    ${addContentFormHtml()}
    ${catalogListHtml(allCatalog)}

    <div class="card admin-stats">
      <h3>Phase 1 stats</h3>
      <div class="stats">
        <div><strong>${stats.posts}</strong><span>Posts</span></div>
        <div><strong>${stats.likes}</strong><span>Likes</span></div>
        <div><strong>${stats.comments}</strong><span>Comments</span></div>
        <div><strong>${stats.clippers}</strong><span>Clipper apps</span></div>
        <div><strong>${stats.catalogPublished || 0}</strong><span>Published</span></div>
        <div><strong>${stats.catalogTotal || 0}</strong><span>Catalog</span></div>
      </div>
      <p class="muted">Clippers — pending ${bs.pending} · approved ${bs.approved} · waitlisted ${bs.waitlisted} · rejected ${bs.rejected}</p>
    </div>

    <div class="card admin-posts"><h3>Posts (${posts.length})</h3>
      <ul class="list-plain">${posts
        .slice(0, 20)
        .map(
          (p) =>
            `<li><span>${esc(p.username)}: ${esc((p.text || '').slice(0, 48))}</span><span class="muted">${new Date(p.at).toLocaleDateString()}</span></li>`
        )
        .join('') || '<li class="muted">None</li>'}</ul>
      <a class="btn" href="#/posts">Open Posts</a>
    </div>

    <div class="card admin-clippers"><h3>Clipper applications (${clipperApps.length})</h3>
      ${
        clipperApps.length
          ? clipperApps
              .map(
                (a) =>
                  `<div class="row wrap admin-clip-row">
                     <span class="spacer">${esc(a.name)} · ${esc(a.email)} <span class="chip">${esc(a.status)}</span></span>
                     <button class="btn primary admin-clip" data-id="${esc(a.id)}" data-status="approved">Approve</button>
                     <button class="btn ghost admin-clip" data-id="${esc(a.id)}" data-status="waitlisted">Waitlist</button>
                     <button class="btn ghost admin-clip" data-id="${esc(a.id)}" data-status="rejected">Reject</button>
                   </div>`
              )
              .join('')
          : '<p class="muted">None yet — submit via <a href="#/clippers">Clippers</a>.</p>'
      }</div>`,
    { lead: 'Phase 2 controls · Add Content · Clippers · catalog.' }
  );
}

async function fileToRef(file) {
  if (!file) return '';
  const id = newBlobId('media');
  await putBlob(id, file, { name: file.name, mime: file.type });
  return 'idb:' + id;
}

function youtubeEmbed(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    let id = u.searchParams.get('v');
    if (!id && u.hostname.includes('youtu.be')) id = u.pathname.slice(1);
    if (!id && u.pathname.startsWith('/embed/')) id = u.pathname.split('/')[2];
    return id ? `https://www.youtube.com/embed/${id}` : '';
  } catch {
    return '';
  }
}

export function bindAdmin(root) {
  root.querySelector('#adminRevoke')?.addEventListener('click', () => {
    setAdminRole(false);
    toast('Admin revoked');
    navigate('#/admin');
  });

  root.querySelectorAll('.admin-clip').forEach((btn) => {
    btn.addEventListener('click', () => {
      setClipperStatus(btn.dataset.id, btn.dataset.status);
      toast('Clipper ' + btn.dataset.status);
      navigate('#/admin');
    });
  });

  root.querySelectorAll('.admin-om').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = setOpenMicStatus(btn.dataset.id, btn.dataset.status, btn.dataset.status === 'rejected' ? 'Admin reject' : '');
      if (res?.error) {
        toast(res.error === 'admin' ? 'Admin required' : 'Open Mic update failed');
        return;
      }
      toast(btn.dataset.status === 'approved' ? 'Open Mic approved' : 'Open Mic rejected');
      navigate('#/admin');
    });
  });

  root.querySelectorAll('.admin-ea-like').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = adminQuickLike(btn.dataset.ref);
      if (res?.error) return toast(res.error === 'admin' ? 'Admin required' : 'Like failed');
      if (btn.dataset.alert) markEngagementAlertHandled(btn.dataset.alert, 'liked');
      toast('Liked · TEST MODE');
      navigate('#/admin');
    });
  });

  root.querySelectorAll('.admin-ea-comment').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = adminQuickComment(btn.dataset.ref, '🔥 PIKK team — keep it up! (TEST MODE)');
      if (res?.error) return toast(res.error === 'admin' ? 'Admin required' : 'Comment failed');
      if (btn.dataset.alert) markEngagementAlertHandled(btn.dataset.alert, 'commented');
      toast('Comment posted · TEST MODE');
      navigate('#/admin');
    });
  });

  root.querySelectorAll('.admin-ea-share').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const res = adminQuickShare(btn.dataset.ref);
      if (res?.error) return toast(res.error === 'admin' ? 'Admin required' : 'Share failed');
      const link = `${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(btn.dataset.ref)}`;
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(link);
        toast('Link copied · share +1 (TEST MODE)');
      } catch (_) {
        toast('Share +1 (TEST MODE)');
      }
      if (btn.dataset.alert) markEngagementAlertHandled(btn.dataset.alert, 'shared');
      navigate('#/admin');
    });
  });

  root.querySelectorAll('.admin-ea-handle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = markEngagementAlertHandled(btn.dataset.alert, 'handled');
      if (res?.error) return toast('Could not mark handled');
      toast('Alert handled');
      navigate('#/admin');
    });
  });

  // Hydrate idb thumbnails
  root.querySelectorAll('img[data-idb-src]').forEach(async (img) => {
    const ref = img.getAttribute('data-idb-src');
    if (!ref) return;
    const src = await resolveMediaSrc(ref);
    if (src) {
      img.src = src;
      img.classList.remove('idb-pending');
    }
  });

  const typeInput = root.querySelector('#adminType');
  const mediaFile = root.querySelector('#adminMediaFile');
  const coverFile = root.querySelector('#adminCoverFile');

  root.querySelectorAll('.admin-type-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      root.querySelectorAll('.admin-type-tab').forEach((t) => t.classList.remove('on'));
      tab.classList.add('on');
      const type = tab.dataset.type;
      if (typeInput) typeInput.value = type;
      const meta = TYPES.find((t) => t.id === type);
      if (meta && mediaFile) mediaFile.accept = meta.acceptMedia;
      if (meta && coverFile) coverFile.accept = meta.acceptCover;
      const label = root.querySelector('#adminMediaLabel');
      if (label) {
        label.textContent =
          type === 'picture'
            ? 'Picture file (or use cover only)'
            : type === 'video'
              ? 'Video file (optional if YouTube link set)'
              : 'Audio / media file (optional)';
      }
      const streamBox = root.querySelector('#adminStreamingFields');
      if (streamBox) streamBox.style.display = type === 'song' || type === 'album' ? '' : 'none';
    });
  });

  // Dropzone: clicking label area opens file input; show filename
  root.querySelectorAll('.admin-dropzone').forEach((zone) => {
    const input = zone.querySelector('.admin-file-input');
    const nameEl = zone.querySelector('.admin-file-name');
    zone.addEventListener('click', (e) => {
      if (e.target === input) return;
      input?.click();
    });
    zone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        input?.click();
      }
    });
    input?.addEventListener('change', () => {
      const f = input.files?.[0];
      if (nameEl) nameEl.textContent = f ? `${f.name} · ${(f.size / 1024 / 1024).toFixed(2)} MB` : '';
    });
    // desktop drag-drop
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag');
      const f = e.dataTransfer?.files?.[0];
      if (!f || !input) return;
      const dt = new DataTransfer();
      dt.items.add(f);
      input.files = dt.files;
      input.dispatchEvent(new Event('change'));
    });
  });

  root.querySelector('#adminAddForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = root.querySelector('#adminAddStatus');
    const btn = root.querySelector('#adminSave');
    const title = root.querySelector('#adminTitle')?.value?.trim();
    const artist = root.querySelector('#adminArtist')?.value?.trim() || 'DatBoiSkeet';
    const type = root.querySelector('#adminType')?.value || 'song';
    const coverUrl = root.querySelector('#adminCoverUrl')?.value?.trim() || '';
    const mediaUrl = root.querySelector('#adminMediaUrl')?.value?.trim() || '';
    const youtube = root.querySelector('#adminYoutube')?.value?.trim() || '';
    const streamingLinks = {
      spotify: root.querySelector('#adminSpotify')?.value?.trim() || '',
      apple: root.querySelector('#adminApple')?.value?.trim() || '',
      youtubeMusic: root.querySelector('#adminYtm')?.value?.trim() || '',
      tidal: root.querySelector('#adminTidal')?.value?.trim() || '',
      amazon: root.querySelector('#adminAmazon')?.value?.trim() || '',
      youtube: youtube || '',
    };
    const published = !!root.querySelector('#adminPublished')?.checked;
    const coverF = root.querySelector('#adminCoverFile')?.files?.[0];
    const mediaF = root.querySelector('#adminMediaFile')?.files?.[0];

    if (!title) {
      toast('Title required');
      return;
    }
    if (type === 'video' && mediaF) {
      try {
        const duration = await readVideoDuration(mediaF);
        const error = validatePikkVideoMetadata({ duration, size: mediaF.size, type: mediaF.type });
        if (error) { toast(error); if (status) status.textContent = error; return; }
      } catch {
        const error = 'Could not verify video duration. Upload canceled.';
        toast(error); if (status) status.textContent = error; return;
      }
    }
    if (btn) btn.disabled = true;
    if (status) status.textContent = 'Saving… (large files may take a moment on iPhone)';

    try {
      let coverRef = coverUrl;
      let mediaRef = mediaUrl;
      if (coverF) coverRef = await fileToRef(coverF);
      if (mediaF) mediaRef = await fileToRef(mediaF);
      // picture type: cover can be the picture
      if (type === 'picture' && !coverRef && mediaRef) coverRef = mediaRef;

      const entry = addCatalogItem({
        type,
        title,
        artist,
        coverRef,
        mediaRef,
        youtube,
        streamingLinks: type === 'song' || type === 'album' ? streamingLinks : {},
        published,
        embed: youtubeEmbed(youtube),
      });
      if (entry?.error) {
        toast(entry.error === 'forbidden' ? 'Admin required' : 'Could not save');
        if (status) status.textContent = '';
        if (btn) btn.disabled = false;
        return;
      }
      if (youtube && entry.id) {
        updateCatalogItem(entry.id, { embed: youtubeEmbed(youtube) });
      }
      toast(published ? 'Published to catalog' : 'Saved as draft');
      navigate('#/admin');
    } catch (err) {
      console.error(err);
      toast('Save failed — file may be too large for this browser');
      if (status) status.textContent = String(err?.message || err);
      if (btn) btn.disabled = false;
    }
  });

  root.querySelectorAll('.admin-cat-pub').forEach((btn) => {
    btn.addEventListener('click', () => {
      setCatalogPublished(btn.dataset.id, btn.dataset.on === '1');
      toast(btn.dataset.on === '1' ? 'Published' : 'Unpublished');
      navigate('#/admin');
    });
  });

  root.querySelectorAll('.admin-cat-del').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!confirm('Delete this catalog item?')) return;
      removeCatalogItem(btn.dataset.id);
      toast('Deleted');
      navigate('#/admin');
    });
  });
}
