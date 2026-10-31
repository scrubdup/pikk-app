import {
  getState,
  signInLocal,
  setAdminRole,
  setMembership,
  getMembership,
  listFanClubs,
  getFanClub,
  ensureFanClubsSeeded,
  createFanClub,
  joinFanClub,
  leaveFanClub,
  followFanClub,
  unfollowFanClub,
  isClubMember,
  isClubFollower,
  isClubMod,
  canAccessClubRoom,
  listClubPosts,
  addClubPost,
  pinClubPost,
  removeClubPost,
  isAdmin,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

function refresh(clubId) {
  if (clubId) navigate(`#/fanclubs?club=${encodeURIComponent(clubId)}`);
  else navigate('#/fanclubs');
}

function ensureSignedIn(name = 'DemoFan') {
  const { user } = getState();
  if (user) return user;
  const signed = signInLocal(name);
  toast(`Signed in as ${name} · local demo`);
  return signed || getState().user;
}

function privacyLabel(p) {
  if (p === 'paid') return 'Paid / Skeet+';
  if (p === 'members') return 'Members only';
  return 'Public';
}

function clubCard(c, selectedId) {
  const on = selectedId === c.id;
  const chips = [
    c.official ? `<span class="chip">Official DBS</span>` : '',
    `<span class="chip">${esc(privacyLabel(c.privacy))}</span>`,
    `<span class="chip">${c.memberCount || 0} members</span>`,
  ]
    .filter(Boolean)
    .join(' ');
  return `<button type="button" class="fanclub-card${on ? ' on' : ''}" data-open-club="${esc(c.id)}" data-search="${esc(`${c.name || ''} ${c.hostName || ''} ${c.description || ''}`)}" aria-label="Open ${esc(c.name)} club">
    <div class="row" style="gap:10px;align-items:center">
      <img src="${esc(c.graphic || '/brand/logo-dbs-v3@2x.webp')}" alt="" width="48" height="48" style="border-radius:12px;object-fit:cover;background:#111" />
      <div style="flex:1;min-width:0">
        <strong>${esc(c.name)}</strong>
        <div class="muted" style="font-size:12px;margin-top:2px">Host @${esc(c.hostName)} · Discover DatBoiSkeet</div>
        <div class="row wrap" style="gap:6px;margin-top:6px">${chips}</div>
      </div>
    </div>
  </button>`;
}

function renderDetail(clubId) {
  const c = getFanClub(clubId);
  if (!c) {
    return `<div class="card"><p class="muted" style="margin:0">Club not found.</p><button class="btn" data-back-list>Back to clubs</button></div>`;
  }
  const user = getState().user;
  const member = isClubMember(c.id);
  const follower = isClubFollower(c.id);
  const mod = isClubMod(c.id);
  const access = canAccessClubRoom(c.id);
  const mem = getMembership();

  const gate =
    !access.ok
      ? `<div class="card" style="border-color:rgba(245,158,11,.35)">
          <h3 style="margin:0 0 6px">${c.privacy === 'paid' ? 'Skeet+ room' : 'Members only'}</h3>
          <p class="muted" style="margin:0 0 10px">${
            c.privacy === 'paid'
              ? 'This room uses membership permissions (Skeet+ or higher). TEST MODE unlock below — no real charge.'
              : 'Join the club to enter the discussion room.'
          }</p>
          ${
            c.privacy === 'paid'
              ? `<button class="btn primary" id="fcUnlockSkeet">Unlock Skeet+ · TEST MODE</button>
                 <a class="btn" href="#/pricing">Pricing</a>
                 <p class="chip" style="margin-top:8px">Current membership: ${esc(mem || 'none')}</p>`
              : `<button class="btn primary" data-join="${esc(c.id)}">Join club</button>`
          }
        </div>`
      : '';

  const posts = access.ok ? listClubPosts(c.id) : [];
  const postsHtml = access.ok
    ? posts.length
      ? posts
          .map((p) => {
            const modBtns = mod
              ? `<div class="row wrap" style="gap:6px;margin-top:6px">
                   <button class="btn ghost" data-pin="${esc(p.id)}" data-club="${esc(c.id)}">${p.pinned ? 'Unpin' : 'Pin'} · mod</button>
                   <button class="btn ghost" data-remove="${esc(p.id)}" data-club="${esc(c.id)}">Remove · mod</button>
                 </div>`
              : '';
            return `<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between;gap:8px">
                <strong>@${esc(p.username)}</strong>
                <span class="muted" style="font-size:12px">${esc(timeAgo(p.at))}${p.pinned ? ' · pinned' : ''}</span>
              </div>
              <p style="margin:6px 0 0">${esc(p.text)}</p>
              ${modBtns}
            </li>`;
          })
          .join('')
      : `<li class="muted" style="padding:8px 0">No posts yet — start the discussion.</li>`
    : '';

  const composer = access.ok
    ? `<form id="fcPostForm" class="card" style="margin-top:10px">
         <label class="muted" style="font-size:12px">Public discussion · local posts</label>
         <textarea id="fcPostText" rows="3" maxlength="500" placeholder="Share with the club…" style="width:100%;margin:8px 0;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit;resize:vertical"></textarea>
         <button class="btn primary" type="submit">Post</button>
         <span class="chip">TEST MODE · localStorage</span>
       </form>`
    : '';

  return `
    <div class="card fanclubs-detail">
      <button class="btn ghost" data-back-list style="margin-bottom:8px">← All clubs</button>
      <div class="row" style="gap:12px;align-items:flex-start">
        <img src="${esc(c.graphic || '/brand/logo-dbs-v3@2x.webp')}" alt="" width="72" height="72" style="border-radius:16px;object-fit:cover" />
        <div style="flex:1">
          <h2 style="margin:0 0 4px">${esc(c.name)}</h2>
          <p class="muted" style="margin:0 0 8px">${esc(c.description)}</p>
          <div class="row wrap" style="gap:6px">
            ${c.official ? '<span class="chip">Official DatBoiSkeet</span>' : ''}
            <span class="chip">${esc(privacyLabel(c.privacy))}</span>
            <span class="chip">${c.memberCount || 0} members</span>
            <span class="chip">${(c.followers || []).length} following</span>
          </div>
        </div>
      </div>
      <div class="row wrap" style="gap:8px;margin-top:14px">
        ${
          member
            ? `<button class="btn" data-leave="${esc(c.id)}">Leave club</button>`
            : `<button class="btn primary" data-join="${esc(c.id)}">Join club</button>`
        }
        ${
          follower
            ? `<button class="btn" data-unfollow="${esc(c.id)}">Unfollow</button>`
            : `<button class="btn" data-follow="${esc(c.id)}">Follow · optional</button>`
        }
        <a class="btn" href="#/community">Lounge</a>
        <a class="btn" href="#/music">Music</a>
        <a class="btn" href="#/explore">Explore</a>
      </div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">Follows are optional — DBS never forces a follow. Channel-style Lounge (Discord-inspired UX) — music-first, DatBoiSkeet branded.</p>
      ${!user ? `<p class="chip" style="margin-top:8px">Sign in to join · local demo</p>` : ''}
      ${mod ? `<p class="chip" style="margin-top:8px">Mod tools · TEST MODE</p>` : ''}
    </div>
    ${gate}
    ${
      access.ok
        ? `<div class="card">
             <h3 style="margin:0 0 4px">Discussion</h3>
             <p class="muted" style="margin:0 0 8px;font-size:12px">Local posts in dbs_v1 · mods can pin/remove</p>
             <ul class="list-plain" id="fcPosts">${postsHtml}</ul>
           </div>
           ${composer}`
        : ''
    }
  `;
}

export function renderFanClubs(route) {
  ensureFanClubsSeeded();
  const clubs = listFanClubs();
  const clubId = route?.query?.club || '';
  const { user } = getState();

  const listHtml = clubs.map((c) => clubCard(c, clubId)).join('');
  const publicCount = clubs.filter((c) => c.privacy === 'public').length;
  const gatedCount = clubs.length - publicCount;

  const createPanel = `
    <div class="card" id="fcCreateCard">
      <h3 style="margin:0 0 6px">Create club · TEST MODE</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Approved creators / demo admin. Custom name + graphic URL. Optional paid/private room using membership permissions.</p>
      <form id="fcCreateForm">
        <label class="muted" style="font-size:12px">Name</label>
        <input id="fcName" maxlength="48" required placeholder="My Fan Club" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit" />
        <label class="muted" style="font-size:12px">Description</label>
        <textarea id="fcDesc" maxlength="280" rows="2" placeholder="What this club is about…" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit;resize:vertical"></textarea>
        <label class="muted" style="font-size:12px">Graphic URL</label>
        <input id="fcGraphic" placeholder="/brand/logo-dbs-v3@2x.webp" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit" />
        <label class="muted" style="font-size:12px">Room privacy</label>
        <select id="fcPrivacy" style="width:100%;margin:4px 0 12px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit">
          <option value="public">Public discussion</option>
          <option value="members">Members only</option>
          <option value="paid">Paid / Skeet+ gate</option>
        </select>
        <button class="btn primary" type="submit">Create club</button>
        <button class="btn ghost" type="button" id="fcSeedBtn">Reseed demos</button>
        ${!user ? `<button class="btn" type="button" id="fcSignIn">Sign in demo</button>` : ''}
        <button class="btn ghost" type="button" id="fcAdmin">Toggle demo admin</button>
        <p class="chip" style="margin-top:10px">TEST MODE · no real payments · DBS branding stays prominent</p>
      </form>
    </div>`;

  const body = clubId
    ? renderDetail(clubId)
    : `
      <section class="fanclubs-hero" aria-labelledby="fanclubs-heading">
        <div class="fanclubs-eyebrow">PIKK CONNECT <span aria-hidden="true">◆</span> CREATOR COMMUNITIES</div>
        <h2 id="fanclubs-heading">Find your people. Build your club.</h2>
        <p>Explore creator-led communities, join conversations, and follow the artists you love. Your existing clubs and local demo activity stay right here.</p>
        <div class="fanclubs-hero-actions">
          <button class="btn primary" type="button" data-fc-jump="fcDiscover">Discover clubs</button>
          <button class="btn ghost" type="button" data-fc-jump="fcCreateCard">Create a club</button>
        </div>
        <div class="fanclubs-hero-note">TEST MODE · Clubs, memberships and posts are browser-local demo data</div>
      </section>
      <section class="fanclubs-stats" aria-label="Club directory overview">
        <div><span>Available clubs</span><strong>${clubs.length}</strong><small>In this demo</small></div>
        <div><span>Public rooms</span><strong>${publicCount}</strong><small>Open discussions</small></div>
        <div><span>Private / gated</span><strong>${gatedCount}</strong><small>Demo access controls</small></div>
      </section>
      <section class="card fanclubs-discover" id="fcDiscover" aria-labelledby="fcDiscoverTitle">
        <div class="fanclubs-discover-head">
          <div><h3 id="fcDiscoverTitle">Discover clubs</h3><p class="muted">Find communities by club, host or topic.</p></div>
          <a class="btn ghost" href="#/community">Community Lounge</a>
        </div>
        <label for="fcSearch">Search clubs</label>
        <input id="fcSearch" type="search" autocomplete="off" placeholder="Search clubs, creators or interests" />
        <p id="fcSearchStatus" class="muted" role="status" aria-live="polite">Showing ${clubs.length} of ${clubs.length} clubs</p>
        <div class="fanclubs-grid">${listHtml || '<p class="muted">No clubs yet.</p>'}</div>
        <p id="fcNoResults" class="muted" hidden>No clubs match your search. Try a different name or topic.</p>
      </section>
      ${createPanel}
    `;

  return shellPage('Fan Clubs', `<div class="fanclubs-studio">${body}</div>`, {
    lead: 'Creator communities inside DBS Lounge · DEMO.',
    badge: 'Phase 2 demo',
  });
}

export function bindFanClubs(root) {
  root.querySelectorAll('[data-fc-jump]').forEach((btn) => btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-fc-jump');
    root.querySelector(`#${target}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  root.querySelector('#fcSearch')?.addEventListener('input', (event) => {
    const term = String(event.currentTarget.value || '').trim().toLocaleLowerCase();
    const cards = [...root.querySelectorAll('.fanclub-card[data-search]')];
    let visible = 0;
    cards.forEach((card) => {
      const match = (card.dataset.search || '').toLocaleLowerCase().includes(term);
      card.hidden = !match;
      if (match) visible += 1;
    });
    const status = root.querySelector('#fcSearchStatus');
    if (status) status.textContent = `Showing ${visible} of ${cards.length} clubs`;
    const empty = root.querySelector('#fcNoResults');
    if (empty) empty.hidden = visible > 0 || !term;
  });
  root.querySelectorAll('[data-open-club]').forEach((btn) => {
    btn.addEventListener('click', () => refresh(btn.getAttribute('data-open-club')));
  });
  root.querySelector('[data-back-list]')?.addEventListener('click', () => refresh());

  root.querySelector('#fcSignIn')?.addEventListener('click', () => {
    ensureSignedIn('DemoFan');
    refresh();
  });
  root.querySelector('#fcAdmin')?.addEventListener('click', () => {
    ensureSignedIn('DemoAdmin');
    const on = !isAdmin();
    setAdminRole(on);
    toast(on ? 'Demo admin on' : 'Demo admin off');
    refresh(root.querySelector('[data-leave],[data-join]')?.getAttribute('data-leave') ||
      root.querySelector('[data-join]')?.getAttribute('data-join') ||
      undefined);
  });
  root.querySelector('#fcSeedBtn')?.addEventListener('click', () => {
    ensureFanClubsSeeded({ force: true });
    toast('Demo clubs reseeded');
    refresh();
  });

  root.querySelector('#fcCreateForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    ensureSignedIn('DemoCreator');
    const name = root.querySelector('#fcName')?.value;
    const description = root.querySelector('#fcDesc')?.value;
    const graphic = root.querySelector('#fcGraphic')?.value || '/brand/logo-dbs-v3@2x.webp';
    const privacy = root.querySelector('#fcPrivacy')?.value || 'public';
    const res = createFanClub({ name, description, graphic, privacy });
    if (res.error === 'signin') return toast('Sign in required');
    if (res.error === 'name') return toast('Name required');
    toast('Club created · TEST MODE');
    refresh(res.club?.id);
  });

  root.querySelectorAll('[data-join]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ensureSignedIn();
      const id = btn.getAttribute('data-join');
      const res = joinFanClub(id);
      if (res.error) return toast('Could not join');
      toast('Joined club');
      refresh(id);
    });
  });
  root.querySelectorAll('[data-leave]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ensureSignedIn();
      const id = btn.getAttribute('data-leave');
      const res = leaveFanClub(id);
      if (res.error === 'host') return toast('Host cannot leave — transfer later');
      if (res.error) return toast('Could not leave');
      toast('Left club');
      refresh(id);
    });
  });
  root.querySelectorAll('[data-follow]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ensureSignedIn();
      const id = btn.getAttribute('data-follow');
      followFanClub(id);
      toast('Following · optional');
      refresh(id);
    });
  });
  root.querySelectorAll('[data-unfollow]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ensureSignedIn();
      const id = btn.getAttribute('data-unfollow');
      unfollowFanClub(id);
      toast('Unfollowed');
      refresh(id);
    });
  });

  root.querySelector('#fcUnlockSkeet')?.addEventListener('click', () => {
    ensureSignedIn();
    setMembership('skeet+', true);
    toast('Skeet+ unlocked · TEST MODE');
    const q = new URLSearchParams((location.hash.split('?')[1] || ''));
    refresh(q.get('club') || undefined);
  });

  root.querySelector('#fcPostForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    ensureSignedIn();
    const q = new URLSearchParams((location.hash.split('?')[1] || ''));
    const clubId = q.get('club');
    const text = root.querySelector('#fcPostText')?.value;
    const res = addClubPost(clubId, text);
    if (res.error === 'gated') return toast('Room gated');
    if (res.error === 'empty') return toast('Write something');
    if (res.error) return toast('Could not post');
    toast('Posted');
    refresh(clubId);
  });

  root.querySelectorAll('[data-pin]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const clubId = btn.getAttribute('data-club');
      const res = pinClubPost(clubId, btn.getAttribute('data-pin'));
      if (res.error === 'mod') return toast('Mods only');
      toast('Pin toggled · TEST MODE');
      refresh(clubId);
    });
  });
  root.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const clubId = btn.getAttribute('data-club');
      const res = removeClubPost(clubId, btn.getAttribute('data-remove'));
      if (res.error === 'mod') return toast('Mods only');
      toast('Post removed · TEST MODE');
      refresh(clubId);
    });
  });

}
