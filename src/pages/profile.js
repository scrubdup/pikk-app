import {
  getState,
  getProfile,
  listFollowers,
  listFollowing,
  signInLocal,
  signOut,
  updateProfile,
  followUser,
  unfollowUser,
  isAdmin,
  setAdminRole,
} from '../store.js';
import { esc, toast, shellPage } from '../ui.js';
import { navigate } from '../router.js';

function refresh(path) {
  navigate(path || '#/profile');
}

function avatarHtml(p) {
  if (p.avatar) {
    return `<img class="avatar" src="${esc(p.avatar)}" alt="" style="object-fit:cover" />`;
  }
  return `<div class="avatar">${esc((p.username || '?')[0].toUpperCase())}</div>`;
}

function peopleList(title, people) {
  if (!people.length) return `<div class="card"><h3>${esc(title)}</h3><p class="muted">None yet.</p></div>`;
  return `<div class="card"><h3>${esc(title)}</h3>
    <ul class="list-plain">${people
      .map(
        (p) =>
          `<li><a href="#/profile/${esc(p.id)}"><span>${esc(p.username)}</span></a>
           <a class="chip" href="#/profile/${esc(p.id)}">View</a></li>`
      )
      .join('')}</ul></div>`;
}

export function renderProfile(route) {
  const viewId = route?.parts?.[1] || null;
  const { user, posts } = getState();
  const isOwnPreview = !!(viewId && user && viewId === user.id && route?.query?.view === 'public');
  const viewingOther = !!viewId && (!user || viewId !== user.id);

  // Public profile by id, including the signed-in owner's read-only preview.
  if (viewingOther || isOwnPreview) {
    const profile = getProfile(viewId);
    if (!profile) {
      return shellPage(
        'Profile',
        `<div class="card muted">User not found.</div>
         <a class="btn" href="#/profile">Back</a>`
      );
    }
    const theirPosts = posts.filter((p) => p.userId === profile.id);
    const isFollowing = user && !isOwnPreview && (user.following || []).includes(profile.id);
    const followers = listFollowers(profile.id);
    const following = listFollowing(profile.id);
    const body = `
      <section class="pikk-profile-cover" aria-label="Public PIKK profile">
        <div class="pikk-profile-cover-inner">
          <span class="pikk-profile-cover-kicker">PIKK · CREATOR PROFILE</span>
          ${avatarHtml(profile)}
          <div>
            <h2 style="margin:0">${esc(profile.username)}${profile.verified ? ' ✓' : ''}</h2>
            <p class="muted" style="margin:4px 0 0">${esc(profile.bio || '')}</p>
            ${profile.verified ? '<span class="chip">Verified</span>' : ''}
          </div>
        </div>
        <div class="stats pikk-profile-stats">
          <div><strong>${theirPosts.length}</strong><span>Posts</span></div>
          <div><strong>${(profile.followers || []).length}</strong><span>Followers</span></div>
          <div><strong>${(profile.following || []).length}</strong><span>Following</span></div>
        </div>
        <div class="row wrap pikk-profile-shortcuts">
          ${
            isOwnPreview
              ? `<a class="btn primary" href="#/profile">Edit profile</a>`
              : user
                ? `<button class="btn ${isFollowing ? 'ghost' : 'primary'}" id="pubFollow" data-uid="${esc(
                    profile.id
                  )}" data-on="${isFollowing ? '1' : '0'}">${isFollowing ? 'Unfollow' : 'Follow'}</button>`
                : `<a class="btn primary" href="#/profile">Sign in to follow</a>`
          }
          <a class="btn ghost" href="#/posts">Posts feed</a>
          ${isOwnPreview ? '' : '<a class="btn ghost" href="#/profile">My profile</a>'}
        </div>
      </section>
      <div class="card">
        <h3>Posts</h3>
        ${
          theirPosts.length
            ? theirPosts
                .map(
                  (p) =>
                    `<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                      <div class="muted" style="font-size:11px">${new Date(p.at).toLocaleString()}</div>
                      ${esc(p.text)}
                      ${p.image ? `<img src="${esc(p.image)}" alt="" style="margin-top:8px;border-radius:12px;max-height:200px;object-fit:cover;width:100%" />` : ''}
                    </div>`
                )
                .join('')
            : '<p class="muted">No posts yet.</p>'
        }
      </div>
      ${peopleList('Followers', followers)}
      ${peopleList('Following', following)}
    `;
    return shellPage(profile.username, body);
  }

  // Own profile / sign-in
  if (!user) {
    return shellPage(
      'Profile',
      `
      <section class="pikk-profile-guest-hero" aria-label="Join PIKK">
        <p class="kicker">PIKK · YOUR PROFILE</p>
        <h2>Your space. Your people. <span>One PIKK.</span></h2>
        <p>Follow artists, share posts and build your profile. Explore the official DatBoiSkeet page or create a local demo account to try the experience.</p>
        <span class="chip">TEST MODE · Browser-local account only</span>
      </section>
      <div class="card">
        <p class="kicker">PIKK account</p>
        <h3>Sign in · local demo</h3>
        <p class="muted">Free fan account for this browser — follow @DatBoiSkeet, post, and apply for roles. TEST MODE: no password, email, or backend auth yet.</p>
        <div class="field"><label>Username</label>
          <input id="signinName" placeholder="Your PIKK name" maxlength="24" /></div>
        <button class="btn primary block" id="signinBtn">Sign in</button>
        <p class="chip" style="margin-top:10px">TEST MODE · demo user only</p>
      </div>
      <div class="card">
        <h3>Official profile</h3>
        <p class="muted" style="margin:0 0 8px">Music, Vault Coming Soon, Foreign X-Change — start here.</p>
        <a class="btn" href="#/profile/dbs">@DatBoiSkeet</a>
      </div>
      <div class="card">
        <h3>Become a Creator</h3>
        <p class="muted">After you sign in, apply for Clipper, Creator/Streamer, Brand, Affiliate, or Seller. Admin review unlocks tools — no automatic earnings access.</p>
        <a class="btn" href="#/signup">Creator applications</a>
        <a class="btn" href="#/clippers">Clippers apply</a>
        <a class="btn ghost" href="#/guidelines">Guidelines</a>
      </div>`,
      { lead: 'Free PIKK fan profile · follow · posts · role apps · TEST MODE.' }
    );
  }

  const myPosts = posts.filter((p) => p.userId === user.id);
  const followers = listFollowers(user.id);
  const following = listFollowing(user.id);
  const m = user.memberships || {};
  const body = `
    <section class="pikk-profile-cover" aria-label="Your PIKK profile">
      <div class="pikk-profile-cover-inner">
        <span class="pikk-profile-cover-kicker">PIKK · MY PROFILE</span>
        ${avatarHtml(user)}
        <div>
          <h2 style="margin:0">${esc(user.username)}</h2>
          <p class="muted" style="margin:4px 0 0">${esc(user.bio)}</p>
          <span class="chip">TEST MODE · demo</span>
          ${m.skeetPlus || m.backstage || m.innerCircle ? `<span class="chip">${m.innerCircle ? 'Inner Circle' : m.backstage ? 'Backstage' : 'Skeet+'}</span>` : ''}
        </div>
      </div>
      <div class="stats pikk-profile-stats">
        <div><strong>${myPosts.length}</strong><span>Posts</span></div>
        <div><strong>${(user.followers || []).length}</strong><span>Followers</span></div>
        <div><strong>${(user.following || []).length}</strong><span>Following</span></div>
      </div>
      <div class="row wrap pikk-profile-shortcuts">
        <a class="btn" href="#/posts">New post</a>
        <a class="btn" href="#/profile/${esc(user.id)}?view=public">Public view</a>
        <a class="btn" href="#/profile-shop">Profile Shop</a>
        <a class="btn" href="#/messages">Messages</a>
        <button class="btn ghost" id="signoutBtn">Sign out</button>
      </div>
    </section>

    <div class="card" id="editCard">
      <h3>Edit profile</h3>
      <div class="field"><label>Bio</label>
        <textarea id="editBio" maxlength="280">${esc(user.bio || '')}</textarea></div>
      <div class="field"><label>Avatar URL</label>
        <input id="editAvatar" placeholder="/brand/… or https://…" value="${esc(user.avatar || '')}" /></div>
      <button class="btn primary" id="saveProfile">Save</button>
    </div>

    <div class="card">
      <h3>Your posts</h3>
      ${
        myPosts.length
          ? myPosts
              .map(
                (p) =>
                  `<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                    <div class="muted" style="font-size:11px">${new Date(p.at).toLocaleString()}</div>
                    ${esc(p.text)}
                  </div>`
              )
              .join('')
          : '<p class="muted">No posts yet.</p>'
      }
    </div>

    ${peopleList('Followers', followers)}
    ${peopleList('Following', following)}

    <div class="card">
      <h3>Roles &amp; membership</h3>
      <p class="muted" style="margin:0 0 8px">Clipper campaigns, Live creator tools, brand ads, or Skeet+ / Backstage / Inner Circle for Vault access.</p>
      <a class="btn block" href="#/clippers">Apply as Clipper <span class="badge-cs badge-cs-inline">Coming Soon</span></a>
      <a class="btn block" href="#/signup" style="margin-top:8px">Other creator roles</a>
      <a class="btn block" href="#/music" style="margin-top:8px">Music &amp; Vault membership</a>
    </div>

    <div class="card">
      <h3>Demo Admin · TEST MODE</h3>
      <p class="muted" style="font-size:12px">Sets <code>user.role='admin'</code> in localStorage <code>dbs_v1</code>. Also available via <code>#/admin?admin=1</code>.</p>
      <div class="row wrap" style="margin-top:8px">
        <span class="chip">${isAdmin() ? 'role=admin' : 'role=fan'}</span>
        <button class="btn ${isAdmin() ? 'ghost' : 'primary'}" id="toggleAdmin">${isAdmin() ? 'Revoke admin' : 'Enable Demo Admin'}</button>
        <a class="btn" href="#/admin">Open Admin</a>
      </div>
    </div>
  `;
  return shellPage('Profile', body);
}

export function bindProfile(root) {
  root.querySelector('#signinBtn')?.addEventListener('click', () => {
    const name = root.querySelector('#signinName')?.value;
    signInLocal(name);
    toast('Signed in');
    refresh('#/profile');
  });
  root.querySelector('#signinName')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') root.querySelector('#signinBtn')?.click();
  });
  root.querySelector('#signoutBtn')?.addEventListener('click', () => {
    signOut();
    toast('Signed out');
    refresh('#/profile');
  });
  root.querySelector('#saveProfile')?.addEventListener('click', () => {
    const r = updateProfile({
      bio: root.querySelector('#editBio')?.value,
      avatar: root.querySelector('#editAvatar')?.value,
    });
    if (r.error) return toast('Sign in required');
    toast('Profile saved');
    refresh('#/profile');
  });
  root.querySelector('#pubFollow')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const uid = btn.dataset.uid;
    const on = btn.dataset.on === '1';
    const r = on ? unfollowUser(uid) : followUser(uid);
    if (r.error) return toast('Sign in to follow');
    toast(on ? 'Unfollowed' : 'Following');
    refresh('#/profile/' + uid);
  });
  root.querySelector('#toggleAdmin')?.addEventListener('click', () => {
    const on = !isAdmin();
    const r = setAdminRole(on);
    if (r.error) return toast('Sign in required');
    toast(on ? 'Demo Admin enabled' : 'Admin revoked');
    refresh('#/profile');
  });
}
