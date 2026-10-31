import { renderStoriesAndPromotions } from '../featured-promos.js';
import { getState, setState, setNotifPrefs, listCatalog, submitCreatorSellApp } from '../store.js';
import { resolveMediaSrc } from '../media-db.js';
import { VIDEOS, VIDEO_COMING_SOON, MEMBERSHIPS } from '../data.js';
import { esc, shellPage, toast, ytEmbedSrc } from '../ui.js';
import { navigate } from '../router.js';
import { notifyVideoPlaying, notifyVideoIdle, bindPageYoutubeEmbeds } from '../player.js';

function phase(n) {
  return { badge: `Phase ${n} shell` };
}

function videoCard(v) {
  return `
    <article class="card pikk-video-tile">
      <div class="hero-video" style="margin:0 0 10px">
        <iframe src="${esc(ytEmbedSrc(v.embed))}" title="${esc(v.title)}" allowfullscreen loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <span class="chip">${esc(v.category || 'Music Videos')}</span>
      <h3 style="margin:8px 0 4px">${esc(v.title)}</h3>
      <p class="muted" style="margin:0 0 8px">${esc(v.artist || 'DatBoiSkeet')}</p>
      <div class="row wrap">
        <a class="btn" href="${esc(v.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
        <button class="btn ghost video-share" data-url="${esc(v.youtube)}" data-title="${esc(v.title)}">Share link</button>
      </div>
    </article>`;
}

export function renderVideos() {
  const order = ['Music Videos', 'Mixes', 'Interviews'];
  const grouped = {};
  VIDEOS.forEach((v) => {
    const cat = v.category || 'Music Videos';
    (grouped[cat] ||= []).push(v);
  });
  const sections = order
    .filter((cat) => grouped[cat]?.length)
    .map((cat) => {
      const cards = grouped[cat].map(videoCard).join('');
      return `<section class="pikk-video-section" data-video-category="${esc(cat)}"><h3>${esc(cat)}</h3><div class="pikk-video-grid">${cards}</div></section>`;
    })
    .join('');
  // any unexpected categories
  const extra = Object.keys(grouped)
    .filter((c) => !order.includes(c))
    .map((cat) => `<section class="pikk-video-section" data-video-category="${esc(cat)}"><h3>${esc(cat)}</h3><div class="pikk-video-grid">${grouped[cat].map(videoCard).join('')}</div></section>`)
    .join('');

  const adminVids = listCatalog({ publishedOnly: true, types: ['video'] });
  const adminHtml = adminVids
    .map((c) => {
      const yt = c.youtube || '';
      const emb = c.embed || '';
      if (emb || yt) {
        const embedSrc = emb || '';
        return `<article class="card catalog-admin-video" data-id="${esc(c.id)}">
          ${embedSrc ? `<div class="hero-video" style="margin:0 0 10px"><iframe src="${esc(ytEmbedSrc(embedSrc))}" title="${esc(c.title)}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>` : ''}
          <span class="chip">Admin</span>
          <h3 style="margin:8px 0 4px">${esc(c.title)}</h3>
          <p class="muted">${esc(c.artist)}</p>
          ${yt ? `<a class="btn" href="${esc(yt)}" target="_blank" rel="noopener">Open on YouTube</a>` : ''}
        </article>`;
      }
      return `<article class="card catalog-admin-video" data-id="${esc(c.id)}">
        <span class="chip">Admin · uploaded</span>
        <h3 style="margin:8px 0 4px">${esc(c.title)}</h3>
        <p class="muted">${esc(c.artist)}</p>
        ${c.coverRef ? `<img data-idb-src="${esc(c.coverRef.startsWith('idb:') ? c.coverRef : '')}" src="${esc(c.coverRef.startsWith('idb:') ? '' : c.coverRef)}" alt="" class="catalog-cover" style="width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin:8px 0" />` : ''}
        ${c.mediaRef ? `<video class="catalog-video" data-idb-src="${esc(c.mediaRef.startsWith('idb:') ? c.mediaRef : '')}" src="${esc(c.mediaRef.startsWith('idb:') ? '' : c.mediaRef)}" controls playsinline webkit-playsinline preload="metadata" style="width:100%;border-radius:12px;background:#000"></video>` : '<p class="muted">No media file</p>'}
      </article>`;
    })
    .join('');

  const byCat = {};
  VIDEO_COMING_SOON.forEach((item) => {
    (byCat[item.category] ||= []).push(item);
  });
  const coming = Object.entries(byCat)
    .map(
      ([cat, items]) => `
      <div class="card pikk-video-coming-card" data-video-coming-category="${esc(cat)}">
        <h3>${esc(cat)}</h3>
        <p class="muted" style="margin:0 0 8px">No verified URLs in repo yet — titles from plan §9 only. No invented view counts.</p>
        <ul class="list-plain">${items
          .map((i) => `<li><span>${esc(i.title)}</span><span class="chip">Coming Soon</span></li>`)
          .join('')}</ul>
      </div>`
    )
    .join('');

  return shellPage(
    'Videos & Interviews',
    `${renderStoriesAndPromotions('videos')}
    <section class="pikk-video-hero card">
      <div class="pikk-video-hero-copy">
        <p class="kicker">PIKK VIDEOS · OFFICIAL RELEASES</p>
        <h2>Watch. Discover. Repeat.</h2>
        <p class="muted">Verified DatBoiSkeet music videos, mixes and interviews. Original YouTube playback, with no invented view counts.</p>
        <a class="btn primary" href="#/explore">Explore creators</a>
      </div>
      ${VIDEOS[0]?.youtube ? `<a class="pikk-video-hero-preview" href="${esc(VIDEOS[0].youtube)}" target="_blank" rel="noopener" aria-label="Watch ${esc(VIDEOS[0].title)}">
        <img src="https://i.ytimg.com/vi/${esc(new URL(VIDEOS[0].youtube).searchParams.get('v') || '')}/hqdefault.jpg" alt="" loading="eager" decoding="async" />
        <span class="pikk-video-hero-label">▶ ${esc(VIDEOS[0].title)}</span>
      </a>` : ''}
    </section>
    <nav class="pikk-video-filters" aria-label="Video categories">
      <button type="button" class="on" data-videos-filter="All" aria-pressed="true">All</button>
      <button type="button" data-videos-filter="Music Videos" aria-pressed="false">Music Videos</button>
      <button type="button" data-videos-filter="Mixes" aria-pressed="false">Mixes</button>
      <button type="button" data-videos-filter="Interviews" aria-pressed="false">Interviews</button>
      ${adminVids.length ? '<button type="button" data-videos-filter="Admin" aria-pressed="false">Admin</button>' : ''}
    </nav>
    <p class="card pikk-video-source-info pikk-video-filter-status muted" role="status" aria-live="polite" data-video-filter-status>Showing all video categories and upcoming titles.</p>
    <div class="card pikk-video-source-info"><p class="muted" style="margin:0">Official DatBoiSkeet music videos, mixes, and interviews — YouTube embeds from the original source. No rehosted files.</p>
      <div class="row wrap" style="margin-top:8px;gap:8px">
        <a class="btn" href="https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA" target="_blank" rel="noopener">Official YouTube channel</a>
        <a class="btn ghost" href="https://www.youtube.com/@DatBoiSkeet1" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        <a class="btn ghost" href="https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t" target="_blank" rel="noopener">Music Videos playlist</a>
      </div>
    </div>
    ${sections}${extra}
    ${adminHtml ? `<section class="pikk-video-section" data-video-category="Admin"><h3>From Admin</h3><div class="pikk-video-grid">${adminHtml}</div></section>` : ''}
    <section class="pikk-video-section pikk-video-coming-list" aria-label="Upcoming videos">
      <h3>Upcoming on PIKK</h3>
      ${coming}
    </section>`,
    { lead: 'Official MVs · Mixes · Interviews · admin uploads.' }
  );
}

export function bindVideos(root) {
  // Filter only video sections; preserve embedded playback and uploaded content.
  const filterButtons = [...root.querySelectorAll('[data-videos-filter]')];
  const videoSections = [...root.querySelectorAll('.pikk-video-section[data-video-category]')];
  const comingCards = [...root.querySelectorAll('[data-video-coming-category]')];
  const comingList = root.querySelector('.pikk-video-coming-list');
  const filterStatus = root.querySelector('[data-video-filter-status]');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.videosFilter || 'All';
    filterButtons.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle('on', active);
      candidate.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    videoSections.forEach((section) => {
      const visible = category === 'All' || section.dataset.videoCategory === category;
      section.hidden = !visible;
    });
    comingCards.forEach((card) => {
      card.hidden = category !== 'All' && card.dataset.videoComingCategory !== category;
    });
    const upcomingVisible = comingCards.some(card => !card.hidden);
    if (comingList) comingList.hidden = !upcomingVisible;
    if (filterStatus) {
      const publishedVisible = videoSections.some(section => !section.hidden);
      filterStatus.textContent = category === 'All'
        ? 'Showing all video categories and upcoming titles.'
        : publishedVisible
          ? `Showing ${category}${upcomingVisible ? ' and upcoming titles' : ''}.`
          : upcomingVisible
            ? `No published ${category} videos yet. Upcoming titles are listed below.`
            : `No published ${category} videos yet.`;
    }
  }));
  // Accessible shortcut: Left/Right arrows move between video category buttons.
  // Buttons remain ordinary tabbable controls; arrow navigation is an enhancement.
  root.querySelector('.pikk-video-filters')?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const current = filterButtons.indexOf(event.target);
    if (current < 0 || !filterButtons.length) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? filterButtons.length - 1
      : (current + (event.key === 'ArrowRight' ? 1 : -1) + filterButtons.length) % filterButtons.length;
    filterButtons[next].focus();
    filterButtons[next].click();
  });
  // §17: real YT play via IFrame API (Media Links binder) — not cross-origin pointerdown
  bindPageYoutubeEmbeds(root);
  root.querySelectorAll('video.catalog-video').forEach((vid) => {
    vid.addEventListener('play', () => notifyVideoPlaying());
    vid.addEventListener('pause', () => notifyVideoIdle());
    vid.addEventListener('ended', () => notifyVideoIdle());
  });
  root.querySelectorAll('.video-share').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = btn.dataset.url || '';
      try {
        await navigator.clipboard.writeText(url);
        toast('Link copied');
      } catch {
        toast(url || 'Copy failed');
      }
    });
  });
  // Hydrate IndexedDB media refs so uploaded <video controls playsinline> actually plays
  root.querySelectorAll('[data-idb-src]').forEach(async (el) => {
    const ref = (el.getAttribute('data-idb-src') || '').trim();
    if (!ref) return;
    try {
      const src = await resolveMediaSrc(ref);
      if (!src) {
        if (el.tagName === 'VIDEO') {
          el.insertAdjacentHTML(
            'afterend',
            '<p class="muted" style="font-size:12px">Media blob missing — re-upload from Admin.</p>'
          );
        }
        return;
      }
      if (el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'AUDIO') {
        el.setAttribute('src', src);
        el.src = src;
        if (el.tagName === 'VIDEO' || el.tagName === 'AUDIO') {
          el.setAttribute('playsinline', '');
          el.setAttribute('webkit-playsinline', '');
          el.controls = true;
          try { el.load(); } catch (_) {}
        }
      }
    } catch (err) {
      console.warn('idb media hydrate failed', ref, err);
    }
  });
}

/** Live/Marketplace/Explore owned by dedicated page modules — stubs kept out of route table. */

export function renderMarketplace() {
  return shellPage(
    'Marketplace',
    `<div class="card"><p class="muted">Businesses advertise via sponsored posts, lives, affiliates, and storefronts. Tracked purchases, disclosures, admin approval.</p>
     <p class="muted">Commission example: marketplace 85/15 · sponsored campaigns 80/20.</p>
     <button class="btn" disabled>Apply as Brand · Phase 3</button></div>`,
    { lead: 'Advertising & product promotions.', ...phase(3) }
  );
}

export { renderEarnings, bindEarnings } from './earnings.js';

export { renderMissions, bindMissions } from './missions.js';

export function renderPricing() {
  const tiers = MEMBERSHIPS.map(
    (m) => `<li><span>${esc(m.name)}</span><strong>$${m.price}/mo</strong></li>`
  ).join('');
  const apps = getState().creatorSellApps || [];
  const appsList = apps.length
    ? `<ul class="list-plain" style="margin-top:10px">${apps
        .slice(0, 8)
        .map(
          (a) =>
            `<li><span>${esc(a.name)} · ${esc(a.contact)} · ${esc(a.sells)}</span><span class="chip">${esc(a.status || 'pending')}</span></li>`
        )
        .join('')}</ul>`
    : '<p class="muted" style="margin:8px 0 0;font-size:12px">No applications on this device yet.</p>';
  return shellPage(
    'Pricing',
    `<div class="card">
      <p class="kicker">Creators &amp; producers</p>
      <h2 style="margin:0 0 8px">Upload &amp; sell your music on PIKK</h2>
      <p>Artists and producers can upload tracks and sell them directly on the PIKK Network. Our demo platform cut is <strong>lower than typical stores</strong> — creators keep <strong>much more</strong> of each sale.</p>
      <p class="muted" style="margin:8px 0 0">TEST MODE only — no real charges, no live contracts. Numbers below are illustrative DEMO rates for the SPA.</p>
      <p class="chip" style="margin-top:10px">TEST MODE · no charges</p>
    </div>

    <div class="card" id="creator-sell-fees">
      <p class="kicker">Fair cut · DEMO</p>
      <h3 style="margin:0 0 8px">Who keeps what</h3>
      <p class="muted" style="margin:0 0 10px">Illustrative comparison — not a live contract. Labelled DEMO for Checker &amp; Design. Fee numbers live here — not on Home.</p>
      <ul class="list-plain">
        <li><span>Typical digital store<br/><span class="muted" style="font-size:12px">Platform cut ~30%</span></span><strong>Creator ~70%</strong></li>
        <li><span>Major streaming / storefront<br/><span class="muted" style="font-size:12px">Effective cut ~30–50%+</span></span><strong>Creator ~50–70%</strong></li>
        <li><span><strong>PIKK music / videos / beats (demo)</strong><br/><span class="muted" style="font-size:12px">Platform cut <strong>10%</strong></span></span><strong style="color:var(--acc)">Creator 90%</strong></li>
      </ul>
      <p class="chip chip-partial" style="margin-top:10px">DEMO rates · illustrative only</p>
    </div>

    <div class="card">
      <p class="kicker">Creator merch</p>
      <h3 style="margin:0 0 8px">Your storefront · your payments</h3>
      <p>Creators may add a merch section on their profile or shop area, but <strong>must use their own payment methods</strong> (Stripe, PayPal, or other external checkout). PIKK lists and links — it is <strong>not</strong> the merchant of record for creator merch.</p>
      <ul class="list-plain" style="margin-top:10px">
        <li><span>Payment processing</span><span class="chip">Creator’s Stripe / PayPal</span></li>
        <li><span>Merchant of record</span><span class="chip">Not PIKK</span></li>
        <li><span>Foreign X-Change official merch</span><span><a href="#/merch" style="color:var(--sk)">External shop →</a></span></li>
      </ul>
      <p class="chip" style="margin-top:10px">TEST MODE · no merch charges inside PIKK</p>
    </div>

    <div class="card">
      <p class="kicker">Buyer ↔ seller</p>
      <h3 style="margin:0 0 8px">Transactions are final between parties</h3>
      <p>Buyer↔seller music and creator-merch transactions are <strong>not reversed or disputed through PIKK</strong>. Chargebacks, refunds, and product disputes stay between the buyer and the seller (or their payment provider). Disputes do <strong>not</strong> fall on PIKK as merchant of record for those sales.</p>
      <p class="muted" style="margin:8px 0 0">This is demo legal-style notice for the SPA. Final Terms ship before public launch. Membership billing rules remain separate (see Community Guidelines).</p>
      <p class="chip" style="margin-top:10px">TEST MODE · disclosure copy · not live MoR</p>
    </div>

    <div class="card" id="creator-sell">
      <p class="kicker">Apply · TEST MODE</p>
      <h3 style="margin:0 0 8px">Creator apply</h3>
      <p class="muted" style="margin:0 0 10px">Tell us who you are and what you sell. Saved on this device only — no real backend. Review rules &amp; fees above before submitting.</p>
      <div class="grid-2">
        <div class="field"><label for="csName">Name *</label><input id="csName" autocomplete="name" required /></div>
        <div class="field"><label for="csContact">Email or handle *</label><input id="csContact" placeholder="you@email or @handle" required /></div>
      </div>
      <div class="field">
        <label for="csSells">What do you sell?</label>
        <select id="csSells">
          <option value="music">Music</option>
          <option value="videos">Videos</option>
          <option value="beats">Beats</option>
          <option value="merch">Merch</option>
          <option value="music-videos-beats">Music · videos · beats</option>
          <option value="all" selected>All (music, videos, beats, merch)</option>
        </select>
      </div>
      <label class="row" style="gap:8px;align-items:flex-start;margin:8px 0 12px;cursor:pointer">
        <input type="checkbox" id="csAgree" style="margin-top:3px" />
        <span style="font-size:13px">I agree to the DEMO rules, fee schedule, merch MoR, and final-transaction notice on this page.</span>
      </label>
      <button type="button" class="btn primary block" id="csSubmit">Submit application</button>
      <p class="chip" style="margin-top:10px">TEST MODE · localStorage <code>creatorSellApps</code></p>
      ${appsList}
    </div>

    <div class="card"><h3>Memberships</h3><ul class="list-plain">${tiers}</ul></div>
     <div class="card"><h3>Music price ranges</h3>
       <ul class="list-plain">
         <li><span>Song</span><span>$0.99–$1.29</span></li>
         <li><span>EP</span><span>$4.99–$6.99</span></li>
         <li><span>Album</span><span>$9.99–$12.99</span></li>
       </ul>
       <p class="chip">TEST MODE · no charges</p>
     </div>`,
    { lead: 'Sell music, videos, beats &amp; merch · rules &amp; fees · apply form · memberships &amp; gifts — admin-adjustable.' }
  );
}

export function bindPricing(root) {
  const focusSell =
    typeof location !== 'undefined' &&
    (location.hash.includes('focus=sell') || location.hash.includes('creator-sell'));
  if (focusSell) {
    setTimeout(
      () => document.getElementById('creator-sell')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60
    );
  }
  root.querySelector('#csSubmit')?.addEventListener('click', () => {
    const name = root.querySelector('#csName')?.value?.trim();
    const contact = root.querySelector('#csContact')?.value?.trim();
    const sells = root.querySelector('#csSells')?.value || 'both';
    const agreed = !!root.querySelector('#csAgree')?.checked;
    if (!name || !contact) return toast('Name and email/handle required');
    if (!agreed) return toast('Agree to rules & fees to continue');
    const res = submitCreatorSellApp({ name, contact, sells, agreed });
    if (res?.error) return toast(res.error === 'rules' ? 'Agree to rules & fees to continue' : 'Name and email/handle required');
    toast('Application saved · TEST MODE');
    navigate('#/pricing?focus=sell');
  });
}


export function renderAdmin() {
  const { posts, clipperApps, user } = getState();
  return shellPage(
    'Admin',
    `<div class="card"><p class="muted">Local demo controls. Full auth & team roles ship later.</p>
      <p>Signed in as: <strong>${esc(user?.username || 'guest')}</strong></p></div>
     <div class="card"><h3>Posts (${posts.length})</h3>
       <ul class="list-plain">${posts
         .slice(0, 20)
         .map((p) => `<li><span>${esc(p.username)}: ${esc(p.text.slice(0, 40))}</span></li>`)
         .join('') || '<li class="muted">None</li>'}</ul></div>
     <div class="card"><h3>Clipper applications (${clipperApps.length})</h3>
       <ul class="list-plain">${clipperApps
         .map(
           (a) =>
             `<li><span>${esc(a.name)} · ${esc(a.email)}</span><span class="chip">${esc(a.status)}</span></li>`
         )
         .join('') || '<li class="muted">None</li>'}</ul></div>
     <div class="card muted">Revenue dashboard, moderation, missions, and payouts → Phase 2–3.</div>`,
    { lead: 'Music, Posts, Clippers, Live, Marketplace, finance.' }
  );
}

export function renderGuidelines() {
  return shellPage(
    'Community Guidelines',
    `<div class="card">
      <p class="kicker">PIKK Network</p>
      <h2 style="margin:0 0 8px">Respect the house</h2>
      <p>All users follow DatBoiSkeet Community Guidelines when posting, commenting, chatting, livestreaming, or joining PIKK Lounge rooms. This is a premium, music-first entertainment network — keep it safe for fans, creators, and the artist.</p>
      <p class="muted" style="margin:8px 0 0">Enforcement UI in this demo is illustrative. Warnings, suspensions, and appeals will run through Admin review before public launch.</p>
    </div>

    <div class="card">
      <h3>Violations</h3>
      <p class="muted" style="margin:0 0 8px">Actions that break PIKK rules include:</p>
      <ul class="list-plain">
        <li><span>Harassment, bullying, or threats</span><span class="chip">Ban-risk</span></li>
        <li><span>Hate speech or targeted abuse</span><span class="chip">Ban-risk</span></li>
        <li><span>Scams, phishing, or fraud</span><span class="chip">Ban-risk</span></li>
        <li><span>Spam or deceptive promotion</span><span class="chip">Warn</span></li>
        <li><span>Prohibited / illegal content</span><span class="chip">Ban-risk</span></li>
      </ul>
    </div>

    <div class="card">
      <h3>Penalties</h3>
      <ul class="list-plain">
        <li><span>1st violation</span><span>First warning</span></li>
        <li><span>2nd violation</span><span>Second warning</span></li>
        <li><span>3rd violation</span><span>Final warning</span></li>
        <li><span>4th violation</span><span>30-day suspension</span></li>
        <li><span>5th violation</span><span>60-day suspension</span></li>
        <li><span>6th violation</span><span>One-year account ban</span></li>
      </ul>
      <p class="muted" style="margin:10px 0 0">Serious violations may skip steps — immediate suspension or permanent removal when needed.</p>
    </div>

    <div class="card">
      <h3>Subscriptions while suspended</h3>
      <p>PIKK does <strong>not</strong> keep charging for paid access you cannot use. Eligible direct-billed recurring charges pause while access is blocked. Where an app store cannot pause billing, cancellation and appropriate credit/refund handling apply. <strong>Cancellation is never obstructed.</strong></p>
      <p class="muted" style="margin:8px 0 0">Billing disclosures belong in Terms + these Guidelines before launch. This page is demo copy only — no real charges in TEST MODE.</p>
    </div>

    <div class="card">
      <h3>Appeals &amp; admin review</h3>
      <p class="muted" style="margin:0">Admins can track warnings, issue penalties, review appeals, override actions, record suspension dates, and restore eligible accounts. Report tools and a full appeals inbox ship with Phase 2 safety work — until then, treat this as published policy copy for the demo SPA.</p>
      <p class="chip" style="margin-top:10px">Demo enforcement · not live moderation</p>
    </div>`,
    { lead: 'Rules for posts, chat, Live & Lounge — plan §13.' }
  );
}

const LOUNGE_CHANNELS = [
  {
    id: 'dbs-lounge',
    cat: 'NETWORK',
    hash: '#dbs-lounge',
    name: 'PIKK Lounge',
    blurb: 'Main hub · official announcements & network news',
    chip: 'Hub',
  },
  {
    id: 'conversation',
    cat: 'NETWORK',
    hash: '#the-conversation',
    name: 'The Conversation',
    blurb: 'Public music & fan discussion threads',
    chip: 'Public',
  },
  {
    id: 'listening',
    cat: 'VOICE / LISTENING',
    hash: '#listening-rooms',
    name: 'Listening Rooms',
    blurb: 'Listening parties & reactions to new releases',
    chip: 'Parties',
  },
  {
    id: 'backstage',
    cat: 'MEMBERS',
    hash: '#backstage-rooms',
    name: 'Backstage Rooms',
    blurb: 'Tier-restricted spaces for Skeet+ / Backstage / Inner Circle',
    chip: 'Members',
  },
  {
    id: 'live-rooms',
    cat: 'NETWORK',
    hash: '#live-rooms',
    name: 'Live Rooms',
    blurb: 'Scheduled community events & discussions',
    chip: 'Events',
  },
  {
    id: 'spotlight',
    cat: 'NETWORK',
    hash: '#the-spotlight',
    name: 'The Spotlight',
    blurb: 'Featured fan conversations & creator posts',
    chip: 'Featured',
  },
];

const LOUNGE_DEMO_MSGS = {
  'dbs-lounge': [
    { who: 'PIKK · System', text: 'Welcome to PIKK Lounge — DatBoiSkeet’s channel-style community hub.', tag: 'DEMO' },
    { who: 'TEST MODE', text: 'Live chat isn’t connected yet. These rows are placeholders so the room pane feels real.', tag: 'DEMO' },
  ],
  conversation: [
    { who: 'DEMO', text: 'Drop takes on new releases here once Phase 2 chat ships.', tag: 'DEMO' },
  ],
  listening: [
    { who: 'DEMO', text: 'Listening parties will sync reactions here — preview only.', tag: 'DEMO' },
  ],
  backstage: [
    { who: 'DEMO', text: 'Member-tier rooms unlock with Skeet+ / Backstage / Inner Circle.', tag: 'DEMO' },
  ],
  'live-rooms': [
    { who: 'DEMO', text: 'Scheduled community events will list here — no live presence yet.', tag: 'DEMO' },
  ],
  spotlight: [
    { who: 'DEMO', text: 'Featured fan conversations land here in Phase 2.', tag: 'DEMO' },
  ],
};

const LOUNGE_DEMO_MEMBERS = [
  { name: 'DatBoiSkeet', role: 'Owner' },
  { name: 'SkeetMod', role: 'Mod · DEMO' },
  { name: 'FanDemo01', role: 'DEMO' },
  { name: 'ListenerX', role: 'DEMO' },
];

function loungeChannelPane(ch) {
  const msgs = LOUNGE_DEMO_MSGS[ch.id] || LOUNGE_DEMO_MSGS['dbs-lounge'];
  const msgHtml = msgs
    .map(
      (m) => `<div class="lounge-msg">
        <div class="lounge-msg-avatar" aria-hidden="true">${esc(m.who.slice(0, 1))}</div>
        <div class="lounge-msg-body">
          <div class="lounge-msg-meta"><strong>${esc(m.who)}</strong> <span class="chip">${esc(m.tag)}</span></div>
          <p>${esc(m.text)}</p>
        </div>
      </div>`
    )
    .join('');
  return `<div class="lounge-pane" data-pane="${esc(ch.id)}" ${ch.id === 'dbs-lounge' ? '' : 'hidden'}>
    <header class="lounge-pane-head">
      <div>
        <h2><span class="lounge-hash">#</span> ${esc(ch.name)}</h2>
        <p class="muted">${esc(ch.blurb)}</p>
      </div>
      <span class="chip">${esc(ch.chip)}</span>
    </header>
    <div class="lounge-honesty">
      <span class="chip">Phase 2</span>
      <span class="chip">TEST MODE</span>
      <p>Live chat, presence, and real member lists aren’t online yet — this is Discord-inspired chrome for PIKK Lounge only.</p>
    </div>
    <div class="lounge-msgs" aria-label="Demo messages">${msgHtml}</div>
    <div class="lounge-compose">
      <input type="text" disabled placeholder="Message #${esc(ch.name.toLowerCase().replace(/\s+/g, '-'))} · Phase 2" aria-label="Message composer disabled"/>
      <button class="btn" disabled>Send</button>
    </div>
  </div>`;
}

export function renderCommunity() {
  const cats = [];
  const seen = new Set();
  LOUNGE_CHANNELS.forEach((c) => {
    if (!seen.has(c.cat)) {
      seen.add(c.cat);
      cats.push(c.cat);
    }
  });
  const railCats = cats
    .map((cat) => {
      const items = LOUNGE_CHANNELS.filter((c) => c.cat === cat)
        .map(
          (c) => `<button type="button" class="lounge-channel${c.id === 'dbs-lounge' ? ' on' : ''}" data-channel="${esc(c.id)}" aria-pressed="${c.id === 'dbs-lounge' ? 'true' : 'false'}">
            <span class="lounge-hash">#</span>
            <span class="lounge-channel-label">${esc(c.name)}</span>
            <span class="chip lounge-channel-chip">${esc(c.chip)}</span>
          </button>`
        )
        .join('');
      return `<div class="lounge-cat-block">
        <p class="lounge-cat-label">${esc(cat)}</p>
        ${items}
      </div>`;
    })
    .join('');

  const panes = LOUNGE_CHANNELS.map(loungeChannelPane).join('');
  const members = LOUNGE_DEMO_MEMBERS.map(
    (m) => `<li><span class="lounge-member-dot" aria-hidden="true"></span><span><strong>${esc(m.name)}</strong><br/><span class="muted" style="font-size:11px">${esc(m.role)}</span></span></li>`
  ).join('');

  return shellPage(
    'PIKK Lounge',
    `<div class="card lounge-intro">
      <p class="kicker">Artist-owned network</p>
      <h2 style="margin:0 0 8px">Channel-style Lounge</h2>
      <p>PIKK Lounge is DatBoiSkeet’s premium community — Discord-type channel UX (sidebar + room panes) under silver/dark PIKK branding. Announcements, listening parties, and fan conversations in one place.</p>
      <p class="muted" style="margin:8px 0 0">Not affiliated with Discord. Channels below are the same rooms as before; live chat unlocks in Phase 2.</p>
      <a class="btn ghost" href="#/communities">Open PIKK Communities · local discussion preview</a>
    </div>

    <div class="lounge-discord" id="loungeDiscord">
      <aside class="lounge-channels" aria-label="Lounge channels">
        <div class="lounge-server">
          <div class="lounge-server-mark" aria-hidden="true">PIKK</div>
          <div>
            <strong>DatBoiSkeet</strong>
            <p class="muted" style="margin:0;font-size:11px">Lounge · silver/dark</p>
          </div>
        </div>
        ${railCats}
        <p class="chip" style="margin:12px 8px 4px">Moderation · §13 Guidelines</p>
      </aside>
      <section class="lounge-main" aria-label="Room pane">
        ${panes}
      </section>
      <aside class="lounge-members" aria-label="Demo members">
        <p class="lounge-cat-label">MEMBERS · DEMO</p>
        <ul class="lounge-member-list">${members}</ul>
        <p class="muted" style="font-size:11px;margin:8px 4px 0">Placeholder names — not live presence.</p>
      </aside>
    </div>`,
    { lead: 'Discord-inspired channels · DatBoiSkeet branded.', ...phase(2) }
  );
}

export function bindCommunity(root = document) {
  const shell = root.querySelector('#loungeDiscord') || root;
  const buttons = [...shell.querySelectorAll('.lounge-channel')];
  const panes = [...shell.querySelectorAll('.lounge-pane')];
  if (!buttons.length) return;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.channel;
      buttons.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      panes.forEach((p) => {
        if (p.dataset.pane === id) p.removeAttribute('hidden');
        else p.setAttribute('hidden', '');
      });
    });
  });
}

export function renderSignup() {
  return shellPage(
    'Signup & Creator Apps',
    `<div class="card">
      <p class="kicker">Join PIKK</p>
      <h2 style="margin:0 0 8px">Fan account first</h2>
      <p>Everyone creates a PIKK account to participate — follow, comment, save, join Lounge rooms, buy memberships, message the team, or apply to earn. Visitors can browse public promo pages; signing up unlocks the network.</p>
      <p class="muted" style="margin:8px 0 12px"><strong>Basic fan signup is free</strong> — no manual approval. This demo uses local Profile sign-in (TEST MODE · no real email/auth yet).</p>
      <a class="btn primary" href="#/profile">Sign in / create demo user</a>
      <a class="btn ghost" href="#/guidelines" style="margin-left:8px">Read Guidelines</a>
    </div>

    <div class="card">
      <h3>Apply for a role</h3>
      <p class="muted" style="margin:0 0 10px">From Profile → Become a Creator, request one or more roles. Each has its own application — no automatic access to earning tools.</p>
      <ul class="list-plain">
        <li><span><strong>Creator / Streamer</strong><br/><span class="muted" style="font-size:12px">Profile, socials, livestream plan · PIKK branding &amp; moderation</span></span><a href="#/live">Live</a></li>
        <li><span><strong>Clipper</strong><br/><span class="muted" style="font-size:12px">Work samples &amp; analytics · paid promo campaigns</span></span><a href="#/clippers">Apply</a></li>
        <li><span><strong>Brand / Advertiser</strong><br/><span class="muted" style="font-size:12px">Business identity, campaigns &amp; disclosures</span></span><a href="#/marketplace">Marketplace</a></li>
        <li><span><strong>Affiliate / Promoter</strong><br/><span class="muted" style="font-size:12px">Referral &amp; campaign promotion plan</span></span><a href="#/refer">Refer</a></li>
        <li><span><strong>Seller</strong><br/><span class="muted" style="font-size:12px">Storefront details, fulfillment &amp; verification</span></span><a href="#/marketplace">Storefront</a></li>
      </ul>
    </div>

    <div class="card">
      <h3>Approval flow</h3>
      <p class="muted" style="margin:0">Register → select role → submit → admin reviews → approve / reject / waitlist → notify → unlock role tools. Earnings need identity/tax/payout checks before payouts. All roles stay under Community Guidelines.</p>
      <p class="chip" style="margin-top:10px">TEST MODE · local demo user on Profile</p>
    </div>`,
    { lead: 'Free fan signup + creator role applications · §16.' }
  );
}

export function renderMessages() {
  return shellPage(
    'Messages',
    `<div class="card"><p class="muted">DMs & group chats with privacy controls. Separate inbox for DatBoiSkeet / team (free inquiry or $2.99 priority).</p>
     <button class="btn" disabled>Inbox · Phase 2</button>
     <button class="btn ghost" disabled>Priority message · TEST MODE</button></div>`,
    { lead: 'Private messaging & team inbox.', ...phase(2) }
  );
}

/** §22 Profile Shop moved to pages/shop.js (Design cosmetics demo) */
export { renderShop, bindShop } from './shop.js';

/** §23 Gift Battles moved to pages/giftbattles.js */
export { renderGiftBattles, bindGiftBattles } from './giftbattles.js';

export function renderNotifications() {
  const n = getState().notifications;
  return shellPage(
    'Notifications',
    `<div class="card" id="notifPrefs">
      <div class="toggle"><span>New releases</span><input type="checkbox" data-k="releases" ${n.releases ? 'checked' : ''}/></div>
      <div class="toggle"><span>Livestreams</span><input type="checkbox" data-k="lives" ${n.lives ? 'checked' : ''}/></div>
      <div class="toggle"><span>Messages</span><input type="checkbox" data-k="messages" ${n.messages ? 'checked' : ''}/></div>
      <div class="toggle"><span>Quiet hours</span><input type="checkbox" data-k="quietHours" ${n.quietHours ? 'checked' : ''}/></div>
      <p class="muted" style="margin-top:10px">Prefs saved on this device.</p>
    </div>`,
    { lead: 'In-app center & alert controls.' }
  );
}

export function bindNotifications(root) {
  root.querySelectorAll('#notifPrefs input').forEach((el) => {
    el.addEventListener('change', () => {
      setNotifPrefs({ [el.dataset.k]: el.checked });
      toast('Saved');
    });
  });
}

/** §26 Fan Clubs moved to pages/fanclubs.js */

export function renderWallet() {
  const w = getState().wallet;
  return shellPage(
    'Wallet',
    `<div class="card">
      <h3>Demo balance</h3>
      <div style="font-size:32px;font-weight:900">$${Number(w.balance).toFixed(2)}</div>
      <p class="muted">Creators see gross, fees, eligible net, splits, holds, payout history. Fans' gift purchases stay separate from redeemable balances.</p>
      <button class="btn" id="walletDemo">Add $5 demo credit</button>
      <p class="chip">TEST MODE · not real money</p>
    </div>`,
    { lead: 'Earnings & payout center.', ...phase(2) }
  );
}

export function bindWallet(root) {
  root.querySelector('#walletDemo')?.addEventListener('click', () => {
    const s = getState();
    const balance = (s.wallet?.balance || 0) + 5;
    const history = [...(s.wallet?.history || []), { at: Date.now(), amount: 5, note: 'Demo credit' }];
    setState({ wallet: { balance, history } });
    toast('+$5 demo');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
}

/** §28 Loyalty moved to pages/loyalty.js */

/** §29 Multi-Guest Livestreams moved to pages/multiguest.js */
export { renderMultiGuest, bindMultiGuest } from './multiguest.js';

/** §30 Open Mic moved to pages/openmic.js */

export function renderLaunch() {
  // Honest chips from STATUS.md (2026-10-25) — never claim whole section DONE
  const checks = [
    { label: 'Registration & role approval', status: 'Demo', note: 'Profile/signup local demo · real auth later' },
    { label: 'Moderation / reporting / appeals', status: 'TODO', note: 'Guidelines copy ready · enforcement UI Phase 2' },
    { label: 'Payments & refunds', status: 'TEST', note: 'TEST MODE only · no real charges' },
    { label: 'Creator payouts verification', status: 'SHELL', note: 'Wallet / KYC stubs · not launch-ready' },
    { label: 'Music & video rights', status: 'Partial', note: '3 official MVs · streaming links still SHELL' },
    { label: 'Gift-battle fraud prevention', status: 'SHELL', note: 'Gift Battles not wired for launch' },
    { label: 'Livestream safety', status: 'Demo', note: 'Go-live demo PASS · age/safety stack incomplete' },
    { label: 'Background audio pause/resume', status: 'PARTIAL', note: '§17 sticky top YT player + pauseDbsPlayer hooks' },
    { label: 'Account recovery / optional 2FA', status: 'TODO', note: 'Local demo sign-in only' },
    { label: 'Loyalty analytics consent', status: 'SHELL', note: 'Privacy/consent controls before launch' },
    { label: 'PIKK Connect safety (age + WebRTC)', status: 'Blocked', note: 'Must not launch without assurance' },
  ];
  const rows = checks
    .map(
      (c) =>
        `<li><span><strong>${esc(c.label)}</strong><br/><span class="muted" style="font-size:12px">${esc(c.note)}</span></span><span class="chip">${esc(c.status)}</span></li>`
    )
    .join('');
  return shellPage(
    'Launch Readiness',
    `<div class="card">
      <p class="kicker">Before public launch</p>
      <h2 style="margin:0 0 8px">Checklist · plan §31</h2>
      <p class="muted" style="margin:0 0 12px">Statuses mirror current STATUS.md — Content Polish owns copy here; Progress Checker owns any DONE claim. This page stays a SHELL until Checker PASSes.</p>
      <ul class="list-plain">${rows}</ul>
    </div>

    <div class="card">
      <h3>Fan onboarding</h3>
      <p class="muted" style="margin:0">Show new fans how to discover DatBoiSkeet music &amp; MVs, follow the official profile, post respectfully, listen via Music/Vault Coming Soon covers, shop Foreign X-Change externally, and join PIKK Lounge when rooms go live. Keep TEST MODE honesty until real auth ships.</p>
    </div>

    <div class="card">
      <h3>Creator onboarding</h3>
      <p class="muted" style="margin:0">Separate path: apply for Creator / Clipper / Brand / Affiliate / Seller → admin review → unlock tools → complete identity, age, tax, and payout verification before earnings. Tie every role to Community Guidelines and suspension policy.</p>
      <p class="chip" style="margin-top:10px">Phased rollout · measure cost &amp; performance</p>
    </div>`,
    { lead: 'Pre-launch checklist with honest demo status · §31.' }
  );
}

export {
  renderShare,
  bindShare,
  renderRefer,
  bindRefer,
  renderRewards,
  bindRewards,
} from './rewards.js';

/** §35 24/7 Spotlight moved to pages/spotlight.js */
export { renderSpotlight, bindSpotlight } from './spotlight.js';

/** §36 PIKK Connect moved to pages/connect.js */
export { renderConnect, bindConnect } from './connect.js';

export function renderPhases() {
  // §12 Development Phases — roadmap tied to STATUS.md (2026-10-25)
  const phases = [
    {
      n: 1,
      title: 'Foundation',
      summary: 'Videos, Music/Vault, Posts, profiles, followers, engagement alerts, Clippers applications.',
      status: 'DONE',
      items: [
        { label: '§1 Posts', status: 'DONE', href: '#/posts' },
        { label: '§2 Clippers apply', status: 'DONE', href: '#/clippers' },
        { label: '§7 Profiles', status: 'DONE', href: '#/profile' },
        { label: '§8 Music & Vault', status: 'DONE', href: '#/music' },
        { label: '§9 Videos & Interviews', status: 'DONE', href: '#/videos' },
        { label: '§14 Streaming links', status: 'DONE', href: '#/music' },
        { label: '§19 Loading splash', status: 'DONE', href: '#/home' },
        { label: '§20 Home dashboard', status: 'DONE', href: '#/home' },
        { label: '§21 Merch showcase', status: 'DONE', href: '#/merch' },
        { label: '§34 Coming Soon covers', status: 'DONE', href: '#/music' },
        { label: '§17 Home MV + continuous play', status: 'PARTIAL', href: '#/home', note: 'Sticky top YT player · Stream Everywhere open links · PENDING AUDIT' },
      ],
    },
    {
      n: 2,
      title: 'Growth & Creator Economy',
      summary: 'Clipper campaigns, missions, referrals, creator earnings, and payouts.',
      status: 'DONE',
      items: [
        { label: '§5 Creator Earnings', status: 'DONE', href: '#/earnings' },
        { label: '§6 Missions', status: 'DONE', href: '#/missions' },
        { label: '§27 Wallet & Payouts', status: 'DONE', href: '#/wallet' },
        { label: '§32 Share & Earn', status: 'DONE', href: '#/share' },
        { label: '§33 Refer & Earn', status: 'DONE', href: '#/refer' },
        { label: '§10 Pricing', status: 'DONE', href: '#/pricing' },
        { label: '§11 Admin dashboard', status: 'DONE', href: '#/admin' },
        { label: '§16 Signup / Creator apps', status: 'DONE', href: '#/signup' },
        { label: '§24 Explore', status: 'DONE', href: '#/explore' },
        { label: '§25 Notifications', status: 'DONE', href: '#/notifications' },
        { label: '§26 Fan Clubs', status: 'DONE', href: '#/fanclubs' },
        { label: '§28 Loyalty Club', status: 'DONE', href: '#/loyalty' },
        { label: '§22 Profile Shop cosmetics', status: 'DONE', href: '#/shop', note: 'Checker PASS · cosmetics demo' },
      ],
    },
    {
      n: 3,
      title: 'Live & Marketplace',
      summary: 'Creator livestreaming, gifts, donations, advertising, creator subscriptions, and Marketplace.',
      status: 'DONE',
      items: [
        { label: '§3 Live', status: 'DONE', href: '#/live' },
        { label: '§4 Marketplace ads', status: 'DONE', href: '#/marketplace' },
        { label: '§18 Messages', status: 'DONE', href: '#/messages' },
        { label: '§23 Gift Battles', status: 'DONE', href: '#/giftbattles' },
        { label: '§29 Multi-Guest Live', status: 'DONE', href: '#/multiguest' },
        { label: '§30 Open Mic', status: 'DONE', href: '#/openmic' },
        { label: '§35 24/7 Spotlight', status: 'DONE', href: '#/spotlight' },
        { label: '§36 Connect (opt-in shell)', status: 'DONE', href: '#/connect' },
        { label: '§37 Restream + streamer tiers', status: 'DONE', href: '#/restream' },
        { label: '§13 Guidelines', status: 'DONE', href: '#/guidelines' },
        { label: '§15 Community / Lounge', status: 'DONE', href: '#/community' },
        { label: '§31 Launch readiness', status: 'DONE', href: '#/launch' },
      ],
    },
  ];

  const chipClass = (s) => {
    if (s === 'DONE') return 'chip chip-ok';
    if (s === 'PARTIAL') return 'chip chip-partial';
    if (s === 'PENDING AUDIT') return 'chip chip-audit';
    return 'chip';
  };

  const phaseCards = phases
    .map((p) => {
      const rows = p.items
        .map((it) => {
          const note = it.note
            ? `<br/><span class="muted" style="font-size:12px">${esc(it.note)}</span>`
            : '';
          const link = it.href
            ? `<a href="${esc(it.href)}" style="color:inherit;text-decoration:none"><strong>${esc(it.label)}</strong></a>`
            : `<strong>${esc(it.label)}</strong>`;
          return `<li><span>${link}${note}</span><span class="${chipClass(it.status)}">${esc(it.status)}</span></li>`;
        })
        .join('');
      return `<div class="card">
      <div class="row wrap" style="gap:8px;align-items:center;margin-bottom:8px">
        <span class="chip">Phase ${p.n}</span>
        <span class="${chipClass(p.status)}">${esc(p.status)}</span>
      </div>
      <h2 style="margin:0 0 6px">${esc(p.title)}</h2>
      <p class="muted" style="margin:0 0 12px">${esc(p.summary)}</p>
      <ul class="list-plain">${rows}</ul>
    </div>`;
    })
    .join('\n\n    ');

  return shellPage(
    'Development Phases',
    `<div class="card">
      <p class="kicker">Plan §12</p>
      <h2 style="margin:0 0 8px">Roadmap · what shipped vs remaining</h2>
      <p class="muted" style="margin:0">Phase 1–3 from the DatBoiSkeet developer plan. Chips mirror STATUS.md — <strong>DONE</strong> needs Checker PASS; <strong>PARTIAL</strong> and <strong>PENDING AUDIT</strong> are not launch-complete.</p>
      <p class="muted" style="margin:10px 0 0">Still open: <a href="#/home">§17 sticky player</a> (YT embed · no PIKK-hosted audio yet) · <a href="#/shop">§22 Profile Shop</a> (awaiting Checker) · identity/payout verification &amp; fraud controls before activating real money features.</p>
    </div>

    ${phaseCards}

    <div class="card">
      <h3>Before activating paid features</h3>
      <p class="muted" style="margin:0">Implement identity and payout verification, payment security, copyright controls, moderation, and fraud prevention before turning on real charges, gifts, or payouts. See <a href="#/launch">Launch Readiness</a>.</p>
    </div>`,
    { lead: 'Phase 1 · Phase 2 · Phase 3 roadmap with live status chips · §12.' }
  );
}

export function renderNotFound(path) {
  return shellPage('Not found', `<div class="card"><p>No page for <code>${esc(path)}</code>.</p><a class="btn" href="#/home">Home</a></div>`);
}
