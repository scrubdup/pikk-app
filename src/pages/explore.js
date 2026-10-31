import {
  exploreSearch,
  exploreTrending,
  exploreSuggestedAccounts,
  getState,
  setState,
} from '../store.js';
import { COMING_SOON, VIDEOS } from '../data.js';
import { navigate } from '../router.js';
import { esc, shellPage, toast, timeAgo } from '../ui.js';

const TABS = [
  { id: 'trending', label: 'Trending' },
  { id: 'following', label: 'Following' },
  { id: 'discover', label: 'Discover' },
];

function discoverableOn() {
  return !!getState().exploreDiscoverable;
}

function resultRow({ href, title, meta, chip }) {
  return `<a class="explore-hit" href="${esc(href)}">
    <div>
      <strong>${esc(title)}</strong>
      <div class="muted" style="font-size:12px;margin-top:2px">${esc(meta || '')}</div>
    </div>
    ${chip ? `<span class="chip">${esc(chip)}</span>` : ''}
  </a>`;
}

function section(title, rowsHtml, emptyMsg) {
  if (!rowsHtml) {
    return `<div class="card explore-section">
      <h3>${esc(title)}</h3>
      <p class="muted" style="margin:0">${esc(emptyMsg || 'No matches')}</p>
    </div>`;
  }
  return `<div class="card explore-section">
    <h3>${esc(title)}</h3>
    <div class="explore-hits">${rowsHtml}</div>
  </div>`;
}

function renderResults(res) {
  if (!res || !res.query) {
    return `<div class="card" id="exploreResults">
      <p class="muted" style="margin:0">Search creators, fans, songs, albums, videos, posts, livestreams, and products. Exact locations are never indexed.</p>
    </div>`;
  }

  const total =
    res.posts.length +
    res.profiles.length +
    res.music.length +
    res.videos.length +
    res.lives.length +
    res.products.length +
    res.pictures.length;

  if (!total) {
    return `<div class="card" id="exploreResults">
      <p style="margin:0 0 6px"><strong>No results for “${esc(res.query)}”</strong></p>
      <p class="muted" style="margin:0">Try another keyword, or browse Trending / Discover below. Report spam from a result’s destination page (demo shell).</p>
    </div>`;
  }

  const posts = res.posts
    .slice(0, 8)
    .map((p) =>
      resultRow({
        href: '#/posts',
        title: (p.text || '').slice(0, 90) || 'Post',
        meta: `@${p.username || 'user'} · ${timeAgo(p.at || Date.now())}`,
        chip: 'Post',
      })
    )
    .join('');

  const profiles = res.profiles
    .slice(0, 8)
    .map((p) =>
      resultRow({
        href: `#/profile/${p.id}`,
        title: `@${p.username || p.id}`,
        meta: (p.bio || 'Creator / fan').slice(0, 80),
        chip: p.verified ? 'Verified' : 'Profile',
      })
    )
    .join('');

  const music = res.music
    .slice(0, 8)
    .map((c) =>
      resultRow({
        href: '#/music',
        title: c.title,
        meta: `${c.artist || 'Artist not credited'} · ${c.type}`,
        chip: c.type === 'album' ? 'Album' : 'Song',
      })
    )
    .join('');

  const videos = res.videos
    .slice(0, 8)
    .map((c) =>
      resultRow({
        href: '#/videos',
        title: c.title,
        meta: `${c.artist || 'Artist not credited'} · Video catalog`,
        chip: 'Video',
      })
    )
    .join('');

  const pictures = res.pictures
    .slice(0, 8)
    .map((c) =>
      resultRow({
        href: '#/home',
        title: c.title,
        meta: `${c.artist || 'Creator not credited'} · picture`,
        chip: 'Picture',
      })
    )
    .join('');

  const lives = res.lives
    .slice(0, 8)
    .map((l) =>
      resultRow({
        href: '#/live',
        title: l.title || 'Livestream',
        meta: `@${l.hostName || 'host'} · ${l.status === 'live' ? 'LIVE now' : 'Ended'}`,
        chip: l.status === 'live' ? 'Live' : 'Replay',
      })
    )
    .join('');

  const products = res.products
    .slice(0, 8)
    .map((l) =>
      resultRow({
        href: '#/marketplace',
        title: l.title,
        meta: `${l.brand || 'Brand'} · ${l.disclosure || 'Sponsored'}`,
        chip: 'Ad',
      })
    )
    .join('');

  // Music-based recommendations: Coming Soon covers + official MVs matching query tokens
  const q = res.query.toLowerCase();
  const musicRec = [
    ...COMING_SOON.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.artist.toLowerCase().includes(q) ||
        q.includes('music') ||
        q.includes('song') ||
        q.includes('album')
    ).map((c) =>
      resultRow({
        href: '#/music',
        title: c.title,
        meta: `${c.artist} · ${c.status}`,
        chip: 'Cover',
      })
    ),
    ...VIDEOS.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        (v.artist || '').toLowerCase().includes(q) ||
        q.includes('video') ||
        q.includes('mv')
    ).map((v) =>
      resultRow({
        href: '#/videos',
        title: v.title,
        meta: `${v.artist || 'Artist not credited'} · Official MV`,
        chip: 'MV',
      })
    ),
  ].join('');

  return `<div id="exploreResults">
    <p class="muted" style="margin:0 0 10px">${total} result${total === 1 ? '' : 's'} for “${esc(res.query)}”</p>
    ${section('People', profiles, 'No matching creators or fans')}
    ${section('Posts', posts, 'No matching posts')}
    ${section('Music (catalog)', music, 'No published songs/albums')}
    ${section('Videos (catalog)', videos, 'No published videos')}
    ${section('Pictures', pictures, 'No published pictures')}
    ${section('Livestreams', lives, 'No live or history matches')}
    ${section('Products / ads', products, 'No marketplace listings')}
    ${musicRec ? section('Music-based picks', musicRec) : ''}
  </div>`;
}

function trendingStrip() {
  const items = exploreTrending(10);
  if (!items.length) {
    return `<p class="muted">Nothing trending yet — like posts or publish catalog items.</p>`;
  }
  return `<div class="section-swipe explore-trend">
    ${items
      .map(
        (t) => `<a class="preview-card" href="${esc(t.href)}">
        <strong>${esc(t.title)}</strong>
        <span class="muted">${esc(t.subtitle)}${t.score ? ` · ♥${t.score}` : ''}</span>
      </a>`
      )
      .join('')}
  </div>`;
}

function followingPanel() {
  const user = getState().user;
  if (!user) {
    return `<div class="card"><p class="muted" style="margin:0">Sign in on <a href="#/profile">Profile</a> to see accounts you follow. Demo only — no exact locations.</p></div>`;
  }
  const following = user.following || [];
  if (!following.length) {
    return `<div class="card"><p class="muted" style="margin:0">You're not following anyone yet. Discover suggested accounts below, then follow from their profile.</p></div>`;
  }
  const rows = following
    .map((id) => {
      const p = getState().profiles?.[id] || { id, username: id };
      return resultRow({
        href: `#/profile/${encodeURIComponent(p.id)}`,
        title: `@${p.username || p.id}`,
        meta: (p.bio || 'Following').slice(0, 80),
        chip: 'Following',
      });
    })
    .join('');
  return `<div class="card explore-section"><h3>Following</h3><div class="explore-hits">${rows}</div></div>`;
}

function discoverPanel() {
  const suggested = exploreSuggestedAccounts().slice(0, 8);
  const rows = suggested
    .map((p) =>
      resultRow({
        href: `#/profile/${encodeURIComponent(p.id)}`,
        title: `@${p.username}`,
        meta: (p.bio || 'Suggested').slice(0, 80),
        chip: p.verified ? 'Verified' : 'Suggest',
      })
    )
    .join('');

  const musicPicks = COMING_SOON.map((c) =>
    resultRow({
      href: '#/music',
      title: c.title,
      meta: `${c.artist} · music-based`,
      chip: 'Cover',
    })
  ).join('');

  return `
    <div class="card">
      <h3>Discoverability (opt-in)</h3>
      <p class="muted" style="margin:0 0 10px">Appear in Explore suggestions. Off by default. No exact locations stored or shown.</p>
      <label class="row" style="gap:8px;align-items:center">
        <input type="checkbox" id="exploreDiscoverable" ${discoverableOn() ? 'checked' : ''} />
        <span>Make my profile discoverable (TEST MODE)</span>
      </label>
    </div>
    <div class="card explore-section">
      <h3>Suggested accounts</h3>
      <div class="explore-hits">${rows || '<p class="muted">No profiles yet</p>'}</div>
    </div>
    <div class="card explore-section">
      <h3>Music-based recommendations</h3>
      <div class="explore-hits">${musicPicks}</div>
    </div>
    <div class="card">
      <h3>Safety</h3>
      <p class="muted" style="margin:0">Reporting / filtering shell: open a post or profile and use existing mute / guidelines flows. Explore never shows precise locations.</p>
      <a class="btn ghost" href="#/guidelines" style="margin-top:8px">Community guidelines</a>
    </div>`;
}

export function renderExplore() {
  const tab = getState().exploreTab || 'trending';
  const tabBtns = TABS.map(
    (t) =>
      `<button type="button" role="tab" id="explore-tab-${t.id}" aria-controls="explorePanel" aria-selected="${t.id === tab}" tabindex="${t.id === tab ? 0 : -1}" class="shop-chip${t.id === tab ? ' on' : ''}" data-explore-tab="${t.id}">${esc(t.label)}</button>`
  ).join('');

  let panel = '';
  if (tab === 'following') panel = followingPanel();
  else if (tab === 'discover') panel = discoverPanel();
  else
    panel = `<div class="card">
      <h3>Trending Across PIKK</h3>
      <p class="muted" style="margin:0 0 10px">High-engagement public posts and seeded demo cards (not a full engagement pipeline).</p>
      ${trendingStrip()}
    </div>
    <div id="exploreResultsWrap">${renderResults(null)}</div>`;

  const body = `
    <div class="card explore-search">
      <div class="field" style="margin-bottom:8px">
        <label for="exploreQ">Search PIKK</label>
        <input id="exploreQ" type="search" autocomplete="off" placeholder="Creators, fans, songs, albums, videos, posts, lives, products…" />
      </div>
      <div class="row wrap" style="gap:8px">
        <button class="btn primary" type="button" id="exploreGo">Search</button>
        <button class="btn ghost" type="button" id="exploreClear">Clear</button>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">Local demo index · DEMO/TEST MODE · no backend · no exact locations</p>
    </div>
    <div class="shop-chips" style="margin:0 0 12px" role="tablist" aria-label="Explore sections">${tabBtns}</div>
    <div id="explorePanel" role="tabpanel" aria-labelledby="explore-tab-${tab}">${panel}</div>
  `;

  return shellPage('Explore', body, {
    lead: 'Universal search & discovery across PIKK.',
    badge: 'Phase 2 demo',
  });
}

function runSearch(root, q) {
  const res = exploreSearch(q);
  const resultsWrap = root.querySelector('#exploreResultsWrap');
  if (resultsWrap) {
    resultsWrap.innerHTML = renderResults(res);
  } else {
    // Keep a stable container across repeated searches on Following and Discover.
    // Replacing #exploreResults itself orphaned subsequent results from Clear.
    const panel = root.querySelector('#explorePanel');
    if (panel) {
      let insert = panel.querySelector('#exploreLiveInsert');
      if (!insert) {
        insert = document.createElement('div');
        insert.id = 'exploreLiveInsert';
        panel.prepend(insert);
      }
      insert.innerHTML = renderResults(res);
    }
  }
  const total =
    (res.posts?.length || 0) +
    (res.profiles?.length || 0) +
    (res.music?.length || 0) +
    (res.videos?.length || 0) +
    (res.lives?.length || 0) +
    (res.products?.length || 0) +
    (res.pictures?.length || 0);
  if (res.query) toast(total ? `${total} result(s)` : 'No matches');
}

export function bindExplore(root) {
  const input = root.querySelector('#exploreQ');
  const go = root.querySelector('#exploreGo');
  const clear = root.querySelector('#exploreClear');

  const doSearch = () => runSearch(root, input?.value || '');

  go?.addEventListener('click', doSearch);
  function clearSearch() {
    clearTimeout(debounce);
    if (input) input.value = '';
    const wrap = root.querySelector('#exploreResultsWrap');
    if (wrap) wrap.innerHTML = renderResults(null);
    root.querySelector('#exploreLiveInsert')?.remove();
    toast('Cleared');
  }
  clear?.addEventListener('click', clearSearch);

  let debounce;
  input?.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(doSearch, 220);
  });
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && input.value) {
      // Native search inputs may clear their text without clearing our rendered results.
      e.preventDefault();
      clearSearch();
      input.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(debounce);
      doSearch();
    }
  });

  // One keyboard stop for the tablist; arrow/Home/End keys activate the next section.
  // navigate('/explore') replaces the panel, so restore focus to the new tab element.
  const tabs = [...root.querySelectorAll('[data-explore-tab]')];
  function activateTab(id, restoreFocus = false) {
    // Switching sections must not silently discard an in-progress search.
    // Keep the query only in the current UI, not in persisted account state.
    const query = input?.value || '';
    clearTimeout(debounce);
    setState({ exploreTab: id });
    navigate('/explore');
    if (query.trim()) {
      const nextRoot = document.getElementById('app');
      const nextInput = nextRoot?.querySelector('#exploreQ');
      if (nextInput) {
        nextInput.value = query;
        runSearch(nextRoot, query);
      }
    }
    if (restoreFocus) document.getElementById('explore-tab-' + id)?.focus();
  }
  tabs.forEach((btn, index) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.exploreTab));
    btn.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const last = tabs.length - 1;
      const next = event.key === 'Home' ? 0
        : event.key === 'End' ? last
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      activateTab(tabs[next].dataset.exploreTab, true);
    });
  });

  root.querySelector('#exploreDiscoverable')?.addEventListener('change', (e) => {
    setState({ exploreDiscoverable: !!e.target.checked });
    toast(e.target.checked ? 'Discoverable on' : 'Discoverable off');
  });
}
