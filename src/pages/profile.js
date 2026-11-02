import {
  getState,
  getProfile,
  listFollowers,
  listFollowing,
  syncRemoteAuthUser,
  clearAuthenticatedUser,
  updateProfile,
  followUser,
  unfollowUser,
  isAdmin,
  setAdminRole,
} from '../store.js';
import { esc, toast, shellPage } from '../ui.js';
import { navigate } from '../router.js';
import { profileRouteHref } from '../profile-links.js';
import { authApi, isPikkApiConfigured } from '../api/auth-client.js';
import { accountApi } from '../api/account-client.js';

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
          `<li><a href="${esc(profileRouteHref(p.id))}"><span>${esc(p.username)}</span></a>
           <a class="chip" href="${esc(profileRouteHref(p.id))}">View</a></li>`
      )
      .join('')}</ul></div>`;
}

export function renderProfile(route) {
  const viewId = route?.parts?.[1] || null;
  const state = getState();
  const user = isPikkApiConfigured() && state.user && state.user.authSource !== 'backend' ? null : state.user;
  const { posts } = state;
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
        <p>Create your PIKK account or sign in to follow creators, post, message and use account tools.</p>
        <span class="chip">${isPikkApiConfigured() ? "Backend account service connected" : "Account service configuration pending"}</span>
      </section>
      <div class="card">
        <p class="kicker">PIKK account</p>
        <h3>Create account</h3>
        <div class="field"><label>Display name</label><input id="signupDisplay" autocomplete="name" maxlength="60" /></div>
        <div class="field"><label>Username</label><input id="signupHandle" autocomplete="username" maxlength="30" placeholder="3–30 letters, numbers or _" /></div>
        <div class="field"><label>Email</label><input id="signupEmail" type="email" autocomplete="email" /></div>
        <div class="field"><label>Password</label><input id="signupPassword" type="password" autocomplete="new-password" minlength="10" placeholder="10+ characters, including a letter and number" /></div>
        <div class="field"><label for="signupGender">Gender</label><select id="signupGender" required>
          <option value="">Choose…</option><option value="female">Female</option><option value="male">Male</option><option value="nonbinary">Non-binary</option><option value="undisclosed">Prefer not to say</option>
        </select><small class="muted">Chosen once at signup and cannot be changed later.</small></div>
        <button class="btn primary block" id="signupAccountBtn">Create PIKK account</button>
      </div>
      <div class="card">
        <h3>Sign in</h3>
        <div class="field"><label>Email</label><input id="loginEmail" type="email" autocomplete="email" /></div>
        <div class="field"><label>Password</label><input id="loginPassword" type="password" autocomplete="current-password" /></div>
        <button class="btn primary block" id="loginAccountBtn">Sign in</button>
        <p class="muted" style="margin:10px 0 0">PIKK uses a secure server session cookie. Your password is not stored in browser-local profile state.</p>
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
        <a class="btn ghost" href="#/support" data-profile-support>Support</a>
      </div>`,
      { lead: 'Free PIKK fan profile · follow · posts · role apps · TEST MODE.' }
    );
  }

  const myPosts = posts.filter((p) => p.userId === user.id);
  const followers = listFollowers(user.id);
  const following = listFollowing(user.id);
  const m = user.memberships || {};
  let body = `
    <section class="pikk-profile-cover" aria-label="Your PIKK profile">
      <div class="pikk-profile-cover-inner">
        <span class="pikk-profile-cover-kicker">PIKK · MY PROFILE</span>
        ${avatarHtml(user)}
        <div>
          <h2 style="margin:0">${esc(user.username)}</h2>
          <p class="muted" style="margin:4px 0 0">${esc(user.bio)}</p>
          <span class="chip">${user.authSource === 'backend' ? (user.emailVerified ? 'Backend account · email verified' : 'Backend account · verification pending') : 'Legacy demo account'}</span>
          ${m.skeetPlus || m.backstage || m.innerCircle ? `<span class="chip">${m.innerCircle ? 'Inner Circle' : m.backstage ? 'Backstage' : 'PIKK+'}</span>` : ''}
        </div>
      </div>
      <div class="stats pikk-profile-stats">
        <div><strong>${myPosts.length}</strong><span>Posts</span></div>
        <div><strong>${(user.followers || []).length}</strong><span>Followers</span></div>
        <div><strong>${(user.following || []).length}</strong><span>Following</span></div>
      </div>
      <div class="row wrap pikk-profile-shortcuts">
        <a class="btn" href="#/posts">New post</a>
        <a class="btn" href="${esc(profileRouteHref(user.id, 'public'))}">Public view</a>
        <a class="btn" href="#/profile-shop">Profile Shop</a>
        <a class="btn" href="#/messages">Messages</a>
        ${user.authSource === 'backend' && !user.emailVerified ? '<button class="btn ghost" id="resendVerifyBtn">Resend verification email</button>' : ''}
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
      <p class="muted" style="margin:0 0 8px">Clipper campaigns, Live creator tools, brand ads, or PIKK+ / Backstage / Inner Circle for Vault access.</p>
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
  const genderCard = `<div class="card" id="accountGenderCard">
      <h3>Account gender</h3>
      <p id="accountGenderValue"><span class="chip">Loading…</span></p>
      <p class="muted" style="font-size:12px">Chosen at signup and saved on the PIKK server. It cannot be changed. If it was entered by mistake, contact <a href="#/support">Support</a>.</p>
      <div id="accountGenderLegacy" hidden>
        <p class="muted" style="font-size:12px">Your account was created before gender was asked at signup. You can set it once; it locks immediately.</p>
        <div class="row wrap" style="gap:8px"><select id="accountGender" aria-label="Account gender">
          <option value="">Choose…</option><option value="female">Female</option><option value="male">Male</option><option value="nonbinary">Non-binary</option><option value="undisclosed">Prefer not to say</option>
        </select><button type="button" class="btn" id="saveAccountGender">Set once</button></div>
      </div></div>`;
  body += genderCard;
  return shellPage('Profile', body);
}

export function bindProfile(root) {
  const GENDER_LABEL = { female: 'Female', male: 'Male', nonbinary: 'Non-binary', undisclosed: 'Prefer not to say' };
  import('../api/verification-client.js').then(async (api) => {
    const out = root.querySelector('#accountGenderValue');
    if (!out) return;
    if (!api.isVerificationApiConfigured()) { out.innerHTML = '<span class="chip">Account server not connected</span>'; return; }
    try {
      const g = await api.verificationApi.getGender();
      if (g?.gender) out.innerHTML = `<span class="chip">${esc(GENDER_LABEL[g.gender] || g.gender)} · locked</span>`;
      else { out.innerHTML = '<span class="chip">Not set</span>'; root.querySelector('#accountGenderLegacy').hidden = false; }
    } catch (_) { out.innerHTML = '<span class="chip">Sign in to see</span>'; }
  });
  root.querySelector('#saveAccountGender')?.addEventListener('click', async () => {
    const g = root.querySelector('#accountGender')?.value;
    if (!g) return;
    if (!confirm('Gender can only be set once and cannot be changed. Continue?')) return;
    try { const api = await import('../api/verification-client.js'); await api.verificationApi.setGender(g); toast('Saved · locked'); refresh('#/profile'); }
    catch (err) { toast(err?.code === 'gender_locked' ? 'Gender is locked. Contact Support if it was entered by mistake.' : err?.code === 'api_not_configured' ? 'Account server not connected yet' : (err?.message || 'Could not save')); }
  });
  if (isPikkApiConfigured()) {
    const cachedUser = getState().user;
    if (cachedUser && cachedUser.authSource !== 'backend') {
      clearAuthenticatedUser();
    }
    if (!cachedUser || cachedUser.authSource === 'backend') {
      authApi.me().then((session) => {
        if (!session?.user) return;
        syncRemoteAuthUser(session.user);
        if (!cachedUser || cachedUser.id !== session.user.id || !cachedUser.emailVerified === !session.user.email_verified) {
          refresh('#/profile');
        }
      }).catch((err) => {
        if (err?.status === 401 && cachedUser?.authSource === 'backend') {
          clearAuthenticatedUser();
          refresh('#/profile');
          return;
        }
        if (err?.status !== 401) console.warn('PIKK auth session check failed', err);
      });
    }
  }
  root.querySelector('#signupAccountBtn')?.addEventListener('click', async () => {
    const gender = root.querySelector('#signupGender')?.value || '';
    if (!gender) { toast('Choose your gender. It cannot be changed later.'); return; }
    try {
      const result = await authApi.signup({
        gender,
        displayName: root.querySelector('#signupDisplay')?.value?.trim(),
        handle: root.querySelector('#signupHandle')?.value?.trim(),
        email: root.querySelector('#signupEmail')?.value?.trim(),
        password: root.querySelector('#signupPassword')?.value || '',
      });
      syncRemoteAuthUser(result.user);
      toast(result.user?.email_verified ? 'Account created' : 'Account created · email verification pending');
      refresh('#/profile');
    } catch (err) {
      toast(err?.message || 'Could not create account');
    }
  });
  root.querySelector('#loginAccountBtn')?.addEventListener('click', async () => {
    try {
      await authApi.login({
        email: root.querySelector('#loginEmail')?.value?.trim(),
        password: root.querySelector('#loginPassword')?.value || '',
      });
      const session = await authApi.me();
      syncRemoteAuthUser(session.user);
      toast('Signed in');
      refresh('#/profile');
    } catch (err) {
      toast(err?.message || 'Could not sign in');
    }
  });
  root.querySelector('#resendVerifyBtn')?.addEventListener('click', async () => {
    try {
      const r = await authApi.resendVerification();
      const delivery = r?.verification?.delivery;
      if (delivery === 'email_sent') toast('Verification email sent');
      else if (delivery === 'already_verified') toast('Email is already verified');
      else if (delivery === 'email_provider_not_configured') toast('Verification email service is not configured yet');
      else if (delivery === 'email_send_failed') toast('Verification email could not be sent');
      else toast('Verification request created');
    } catch (err) {
      toast(err?.message || 'Could not resend verification email');
    }
  });
  root.querySelector('#signoutBtn')?.addEventListener('click', async () => {
    try { await authApi.logout(); } catch {}
    clearAuthenticatedUser();
    toast('Signed out');
    refresh('#/profile');
  });
  root.querySelector('#saveProfile')?.addEventListener('click', async () => {
    const current = getState().user;
    const bio = root.querySelector('#editBio')?.value || '';
    const avatar = root.querySelector('#editAvatar')?.value || '';
    if (current?.authSource === 'backend' && isPikkApiConfigured()) {
      try {
        const result = await accountApi.updateProfile({
          displayName: current.username || current.handle,
          bio,
          avatarUrl: avatar,
        });
        syncRemoteAuthUser(result.user);
        toast('Profile saved to PIKK');
        refresh('#/profile');
      } catch (err) {
        toast(err?.message || 'Could not save profile');
      }
      return;
    }
    const r = updateProfile({ bio, avatar });
    if (r.error) return toast('Sign in required');
    toast('Profile saved locally');
    refresh('#/profile');
  });
  root.querySelector('#pubFollow')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const uid = btn.dataset.uid;
    const on = btn.dataset.on === '1';
    const r = on ? unfollowUser(uid) : followUser(uid);
    if (r.error) return toast('Sign in to follow');
    toast(on ? 'Unfollowed' : 'Following');
    refresh(profileRouteHref(uid));
  });
  root.querySelector('#toggleAdmin')?.addEventListener('click', () => {
    const on = !isAdmin();
    const r = setAdminRole(on);
    if (r.error) return toast('Sign in required');
    toast(on ? 'Demo Admin enabled' : 'Admin revoked');
    refresh('#/profile');
  });
}
