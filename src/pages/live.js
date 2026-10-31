import {
  getState,
  startLiveDemo,
  endLiveDemo,
  sendLiveChat,
  sendLiveSupport,
  bumpLiveViewers,
  getLiveHistory,
  listHotLives,
  simulateLiveSpike,
  listFollowing,
  listDailyBattleWinners,
  listTopGiftersToday,
  getLiveGbChallengePop,
  dismissLiveGbChallengePop,
  challengeGifterFromPop,
  getActiveGiftBattle,
  acceptGiftBattle,
  declineGiftBattle,
  clearActiveGiftBattle,
  tickGiftBattle,
  LIVE_SONG_REQUEST_PACKS,
  listLiveSongRequestQueue,
  submitLiveSongRequest,
  playLiveSongRequest,
  skipLiveSongRequest,
  completeLiveSongRequest,
  addWalletCredit,
  LIVE_GIFT_CATALOG,
  COIN_PACKAGES,
  LIVE_GIFT_CONFIRM_COINS,
  getCoinBalance,
  buyCoins,
  listLiveGiftCatalog,
  listLiveGiftHistory,
  sendLiveGift,
  getSpotlightHouseTrack,
  getLiveDailyGoal,
  setLiveDailyGoal,
  donateToGoal,
} from '../store.js';
import { esc, toast, shellPage, timeAgo, ytEmbedSrc } from '../ui.js';
import { navigate, getRoute } from '../router.js';
import { notifyLiveOpen, notifyLiveClosed } from '../player.js';
import { giftStickerHtml, getGiftSticker } from '../gift-stickers.js';
import { renderLiveDiscoveryDirectory } from '../live-discovery.js';

/** t197u discovery tabs — preserve ?tab= on soft refresh */
function getLiveDiscTab() {
  const q = (getRoute().query || {}).tab;
  if (q === 'live' || q === 'channels') return 'channels';
  if (q === 'following' || q === 'categories') return q;
  return 'channels';
}

function refresh() {
  const tab = getLiveDiscTab();
  navigate(tab === 'channels' ? '#/live' : `#/live?tab=${tab}`);
}

function fmtMoney(n) {
  return '$' + Number(n || 0).toFixed(2);
}

function fmtCount(n) {
  const v = Number(n) || 0;
  if (v >= 1000) return (v / 1000).toFixed(v >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K';
  return String(v);
}

/** Live IA category chips — Open Mic (24/7) · Spotlight (24/7) · always reachable */
function renderLiveCategoryChips(active = 'live') {
  const items = [
    { id: 'live', href: '#/live?tab=channels', label: 'Live' },
    { id: 'openmic', href: '#/openmic', label: 'Open Mic / Talent Discovery (24/7)' },
    { id: 'spotlight', href: '#/spotlight', label: 'Spotlight (24/7)' },
    { id: 'viral', href: '#/viral-live', label: 'Viral Live · Preview' },
  ];
  const chips = items
    .map((it) => {
      const on = it.id === active ? ' on' : '';
      const aria = it.id === active ? ' aria-current="page"' : '';
      return `<a class="live-cat-chip${on}" href="${it.href}"${aria}>${esc(it.label)}</a>`;
    })
    .join('');
  return `
    <nav class="live-cat-chips" aria-label="Live categories">
      ${chips}
    </nav>`;
}

/** t197u · Twitch/Kick-style discovery tabs */
function renderLiveDiscoveryTabs(active = 'channels') {
  /* t269u · Clips early (after Following) so ~390px phones see it without swipe */
  const tabs = [
    { id: 'following', href: '#/live?tab=following', label: 'Following' },
    { id: 'clips', href: '#/shorts', label: 'Clips' },
    { id: 'channels', href: '#/live?tab=channels', label: 'Channels' },
    { id: 'categories', href: '#/live?tab=categories', label: 'Categories' },
  ];
  const btns = tabs
    .map((t) => {
      const on = t.id === active ? ' on' : '';
      const aria = t.id === active ? ' aria-current="page"' : '';
      return `<a class="live-disc-tab${on}" href="${t.href}" data-tab="${t.id}"${aria}>${esc(t.label)}</a>`;
    })
    .join('');
  return `
    <nav class="live-disc-tabs" aria-label="Live discovery">
      ${btns}
    </nav>`;
}


/** t238u — when a Live surface is empty, surface DatBoiSkeet house catalog (not blank). */
function renderHouseCatalogTeaser(opts = {}) {
  const house = getSpotlightHouseTrack();
  const chip = house.chipLabel || 'House · Music Video';
  const embed = house.embed ? ytEmbedSrc(house.embed, 'rel=0') : '';
  const title = opts.title || 'House catalog · while stages are quiet';
  return `
    <div class="card sp-house live-house-teaser" style="margin-top:12px">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">${esc(chip)}</div>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:12px">${esc(title)} · original YouTube · not a fake live act</p>
      ${
        embed
          ? `<div class="sp-house-embed hero-video" style="margin-top:10px">
               <iframe src="${esc(embed)}" title="${esc(house.title)}" allowfullscreen loading="lazy"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
             </div>`
          : ''
      }
      <div class="sp-now-title" style="margin-top:10px">${esc(house.title)}</div>
      <div class="muted" style="font-size:12px">${esc(house.artist || 'DatBoiSkeet')} · ${esc(house.note || '')}</div>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn ghost" href="#/spotlight">24/7 Spotlight</a>
        <a class="btn ghost" href="#/openmic">Open Mic</a>
        ${house.youtube ? `<a class="btn ghost" href="${esc(house.youtube)}" target="_blank" rel="noopener">YouTube</a>` : ''}
      </div>
    </div>`;
}

function renderFollowingPanel(user) {
  const following = user ? listFollowing(user.id) : [];
  const ids = new Set(following.map((f) => f.id));
  const lives = listHotLives().filter((l) => ids.has(l.hostId));
  const followChips = following.length
    ? following
        .slice(0, 12)
        .map((f) => `<a class="chip" href="#/profile">${esc('@' + (f.username || f.id))}</a>`)
        .join('')
    : '<span class="muted">Nobody followed yet · DEMO</span>';

  let body;
  if (!user) {
    body = `
      <p class="muted">Sign in to see lives from accounts you follow.</p>
      <a class="btn primary" href="#/profile">Demo profile</a>
      <p class="chip" style="margin-top:10px">TEST MODE · Following is local demo graph</p>`;
  } else if (!lives.length) {
    body = `
      <p class="muted" style="margin:0 0 8px">
        None of the people you follow are live right now (demo filter on seeded Hot lives).
      </p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${followChips}</div>
      <a class="btn ghost" href="#/live?tab=channels">Browse Live channels</a>
      <p class="chip" style="margin-top:10px">TEST MODE · not a scrape</p>
      ${renderHouseCatalogTeaser({ title: 'Meanwhile — DatBoiSkeet house catalog on 24/7 stages' })}`;
  } else {
    const cards = lives
      .map((live) => {
        return `
        <article class="hot-live-card${live.house ? ' is-house' : ''}" data-live-id="${esc(live.id)}">
          <div class="live-hoodie" aria-label="Live · ${esc(fmtCount(live.viewers))} watching">
            <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
            <span class="live-hoodie-viewers">${esc(fmtCount(live.viewers))}</span>
          </div>
          <div class="hot-live-body">
            <div class="hot-live-host">@${esc(live.hostName)}</div>
            <div class="hot-live-title">${esc(live.title)}</div>
            <div class="hot-live-actions row wrap">
              <button type="button" class="btn ghost hot-live-watch" data-id="${esc(live.id)}" data-host="${esc(live.hostName)}">Watch demo</button>
            </div>
          </div>
        </article>`;
      })
      .join('');
    body = `
      <p class="muted" style="margin:0 0 8px;font-size:12px">Lives from accounts you follow · ${following.length} following · TEST MODE</p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${followChips}</div>
      <div class="hot-lives-track">${cards}</div>`;
  }

  return `
    <div class="card live-disc-panel" id="liveTabFollowing" data-panel="following">
      <h3 style="margin:0 0 8px">Following</h3>
      ${body}
    </div>`;
}

const LIVE_DISCOVERY_CATEGORIES = [
  ['The Booth', 'Rappers, freestyles, hip-hop performances and song previews', '🎙️'],
  ['The Stage', 'Singers, bands, vocalists and instrumental performances', '🎤'],
  ['City Takeover', 'City-versus-city showcases, performances and local pride challenges', '🌆'],
  ['Producer Room', 'Beat showcases, producer collaborations and beat competitions', '🎹'],
  ['Ladies Lounge', 'Women-centered girl talk, beauty, fashion, relationships and community', '💅'],
  ['Girl Talk', 'Everyday conversations, friendships and women’s discussions', '💬'],
  ['Tea Time', 'Celebrity gossip, trending stories and entertainment drama', '🫖'],
  ['Who Did What?', 'Viral moments, celebrity controversies and debates', '👀'],
  ['Boss Ladies', 'Women entrepreneurs, business networking and financial growth', '👑'],
  ['Fashion & Fits', 'Fashion, outfits and personal style', '👗'],
  ['Ladies Only Live', 'Women-centered livestreams and hosted events', '🎥'],

  ["What's the Word?", 'Entertainment news, celebrity conversations, viral moments and trending discussions', '🗣️'],
  ['Women in Business', 'Women entrepreneurs, founders, business networking and mentorship', '👩‍💼'],
  ['The Man Cave', 'Men’s social conversations, sports and community', '🤝'],
  ['Men in Business', 'Men’s entrepreneurship, networking, mentorship and partnerships', '👔'],
  ['Girls\' Night In', 'Women-centered social nights, games and discussions', '🌙'],
  ['Beauty Bar', 'Beauty, hair, makeup and skincare conversations', '💄'],
  ['Love & Standards', 'Dating, relationships and boundaries', '💗'],
  ['Women\'s Mental Wellness', 'Women-centered stress, confidence, emotional wellbeing and peer support', '🧠'],
  ['Dating From Her Side', 'Women-centered dating experiences, relationships and personal standards', '💞'],
  ['The Hustle Room: Women', 'Women-centered side hustles, extra income ideas and building businesses', '📈'],
  ['The Barbershop', 'Men-centered everyday debates, conversation and community', '💈'],
  ['Fellas\' Night', 'Men-centered social events and games', '🌃'],
  ['Men\'s Corner', 'Men-centered life, relationships and personal development', '🧢'],
  ['Cars & Motors', 'Cars, motorcycles, customization and auto culture', '🚘'],
  ['Fitness & Brotherhood', 'Fitness, wellbeing and peer support', '💪'],
  ['Fatherhood', 'Parenting, family responsibilities and raising children', '👨‍👧'],
  ['Men\'s Mental Wellness', 'Men-centered stress, wellbeing and peer support', '🧠'],
  ['Dating From His Side', 'Men-centered dating experiences and relationship advice', '💬'],
  ['Sports Debate', 'Sports arguments, player comparisons and predictions', '🏅'],
  ['Gaming Brotherhood', 'Gaming, tournaments and player communities', '🎮'],
  ['Men\'s Style', 'Fashion, grooming, watches and fragrances', '⌚'],
  ['The Hustle Room', 'Careers, side businesses and professional growth', '📈'],
  ['Brotherhood & Mentorship', 'Intergenerational mentoring and peer support', '🤝'],

  ['Sports Central', 'All-sports discussion, fan talk and analysis', '🏆'],
  ['Basketball', 'Basketball discussion and fan streams', '🏀'],
  ['Football', 'American football discussion and fan streams', '🏈'],
  ['Soccer', 'Soccer discussion and fan streams', '⚽'],
  ['Baseball', 'Baseball discussion and fan streams', '⚾'],
  ['Hockey', 'Hockey discussion and fan streams', '🏒'],
  ['Tech Talk', 'AI, gadgets, apps and technology', '💻'],
  ['Startups & Innovation', 'Building businesses, technology and new ideas', '🚀'],
  ['World News', 'International events and global news discussions', '🌍'],
  ['Economy & Markets', 'Inflation, housing, jobs, interest rates and markets', '📈'],
  ["Let's Talk", 'Open conversations, questions and community discussion', '🗣️'],
  ['The Hangout', 'Conversations and social live streams', '💬'],
  ['Creator Spotlight', 'Featured creators and emerging talent', '🌟'],
  ['Game Room', 'Gameplay, tournaments and community games', '🎮'],
  ['Why Are You Single?', 'Coed conversations about single life, dating experiences and relationship challenges', '❓'],
  ['What Are You Looking For?', 'Coed conversations about dating intentions, values and ideal partners', '💭'],
  ['Single & Ready to Mingle', 'Opt-in coed social conversations and introductions for singles', '💘'],
  ['Looking for My Match', 'Opt-in dating live conversations', '❤️'],
  ['The Flirt Zone', 'Dating and connection conversations', '💕'],
  ['Speed Connections', 'Fast-paced introductions and connections', '⏱️'],
  ['Poly Connections', 'Consensual nonmonogamy discussions and connections', '🔗'],
  ['Couples Corner', 'Couples-versus-couples games, trivia, partner challenges, friendly competitions and rematches', '💞'],
  ['Date Night Live', 'Live dating conversations and activities', '🌹'],
  ['Love & Advice', 'Relationship conversations and advice', '💌'],
  ['Business Connect & Wealth Academy', 'Coed business networking and beginner education in entrepreneurship, credit, stocks, crypto, real estate and Roth IRAs', '💼'],
  ['City Connect', 'Meet people by city for friendship, dating, business networking and local conversations', '📍'],
  ['Conspiracy Room', 'Open discussion of theories and claims', '🧩'],
  ['Money Talk', 'Stocks, housing, crypto and financial discussions', '💰'],

  ['Just Chatting', 'Conversations, Q&A and hanging out', '💬'],
  ['Gaming', 'Gameplay, tournaments and community games', '🎮'],
  ['Music', 'Artists, DJs, producers and listening sessions', '🎵'],
  ['IRL', 'Everyday life, travel and outdoor streams', '🌎'],
  ['Sports', 'Sports talk and watch-along discussions', '🏀'],
  ['Creative', 'Art, design, production and making things', '🎨'],
  ['Podcasts & Talk Shows', 'Interviews, panels and conversations', '🎙️'],
  ['Food & Cooking', 'Recipes, kitchens and food reviews', '🍳'],
  ['Fitness', 'Training, wellness and movement', '💪'],
  ['Beauty & Fashion', 'Style, hair, makeup and fashion', '✨'],
  ['Business & Money Talk', 'Entrepreneurs, careers and money discussions', '💼'],
  ['Dating & Connections', 'Opt-in conversations and dating live rooms', '❤️'],
  ['Education', 'Tutorials, learning and study sessions', '📚'],
  ['News & Commentary', 'Current events and opinions', '📰'],
  ['Comedy & Entertainment', 'Comedy, variety and entertainment', '🎭'],
  ['Comedy & Roast Battles', '1v1, tag team, open mic and tournaments', '🎤'],
];

function renderCategoriesPanel() {
  return `
    <div class="card live-disc-panel" id="liveTabCategories" data-panel="categories">
      <div class="pikk-live-directory-hero">
        <span class="pikk-live-directory-kicker">PIKK LIVE · DISCOVER</span>
        <h3>Find your room.</h3>
        <p>Choose a community, explore a sport or find a conversation. Open a section to browse its topics.</p>
        <span class="pikk-live-directory-note">Discovery categories filter channels; a category is not a hosted room or a live stream. No active stream? You'll see an empty result.</span>
      </div>
      ${renderLiveDiscoveryDirectory(LIVE_DISCOVERY_CATEGORIES, esc)}
      <h3 style="margin:20px 0 8px">PIKK 24/7 Stages</h3>
      <div class="live-cat-cards">
        <a class="live-cat-card" href="#/openmic"><strong>Open Mic / Talent Discovery</strong><span class="chip">24/7 stage</span><p class="muted">Join the performance queue</p></a>
        <a class="live-cat-card" href="#/spotlight"><strong>Spotlight Live</strong><span class="chip">24/7 stage</span><p class="muted">Keep Going votes and creator performances</p></a>
        <a class="live-cat-card" href="#/shorts"><strong>Clips / Shorts</strong><span class="chip">Watch</span><p class="muted">Watch short videos</p></a>
        <a class="live-cat-card" href="#/viral-live"><strong>PIKK Viral Live</strong><span class="chip">Preview · not broadcasting</span><p class="muted">Explore the future 24/7 trending channel and original video sources</p></a>
      </div>
    </div>`;
}

function recentlySpiked(live) {
  if (!live?.spikedAt) return false;
  return Date.now() - Number(live.spikedAt) < 15 * 60 * 1000;
}

function renderHotLivesRail(category = '') {
  const allLives = listHotLives();
  const lives = category
    ? allLives.filter((live) => String(live.category || '').toLowerCase() === category.toLowerCase())
    : allLives;
  const cards = lives
    .map((live) => {
      const hot = recentlySpiked(live);
      return `
      <article class="hot-live-card${hot ? ' is-hot' : ''}${live.house ? ' is-house' : ''}" data-live-id="${esc(live.id)}">
        <div class="live-hoodie" aria-label="Live · ${esc(fmtCount(live.viewers))} watching">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" title="${esc(fmtCount(live.viewers))} watching">${esc(fmtCount(live.viewers))}</span>
        </div>
        <div class="hot-live-body">
          <div class="hot-live-host">@${esc(live.hostName)}</div>
          <div class="hot-live-title">${esc(live.title)}</div>
          <div class="hot-live-chips">
            <span class="chip">${esc(fmtCount(live.viewers))} watching</span>
            ${live.house ? '<span class="chip chip-ok">House</span>' : ''}
            ${hot ? '<span class="chip live-chip"><span class="dot" aria-hidden="true"></span> HOT</span>' : ''}
          </div>
          <div class="hot-live-actions row wrap">
            <button type="button" class="btn ghost hot-live-watch" data-id="${esc(live.id)}" data-host="${esc(live.hostName)}">Watch demo</button>
            <button type="button" class="btn hot-live-spike" data-id="${esc(live.id)}">Simulate spike</button>
          </div>
        </div>
      </article>`;
    })
    .join('');

  return `
    <div class="card hot-lives-rail" id="hotLivesRail">
      <div class="row wrap" style="justify-content:space-between;align-items:baseline;gap:8px">
        <h3 style="margin:0">Hot lives · Top streamers</h3>
        <span class="chip">score · viewers + engagement</span>
      </div>
      <p class="muted" style="margin:6px 0 10px;font-size:12px">TEST MODE · seeded demo · not third-party scrape · house + community</p>
      <div class="hot-lives-track">
        ${cards || '<p class="muted">No matching live channels in this category yet.</p>'}
      </div>
    </div>`;
}

function statusChip(st) {
  const s = String(st || 'queued');
  if (s === 'playing') return '<span class="chip live-chip">Playing</span>';
  if (s === 'played') return '<span class="chip chip-ok">Played</span>';
  if (s === 'skipped') return '<span class="chip">Skipped</span>';
  return '<span class="chip">Queued</span>';
}


/** t198u · sticker img (emoji fallback via getGiftSticker) */
function giftEmoji(slug) {
  return getGiftSticker(slug, { className: 'gift-sticker' }).html;
}

function fmtCoins(n) {
  const v = Number(n) || 0;
  if (v >= 1000) return (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1).replace(/\.0$/, '') + 'K';
  return String(v);
}

/** t185u · Live gift tray + coin packs during active live (viewer send · overlay stubs). */
function renderLiveGifts(live, user) {
  if (!live || live.endedAt) return '';
  const coinsBal = getCoinBalance();
  const catalog = listLiveGiftCatalog();
  // Prototype-only: show gift affordability without invoking payment processing.

  const history = listLiveGiftHistory(live.id).slice(0, 12);
  const giftCards = catalog
    .map((g) => {
      const confirm = g.coins >= LIVE_GIFT_CONFIRM_COINS;
      const affordable = coinsBal >= g.coins;
      return `
      <button type="button" class="lg-gift" data-slug="${esc(g.slug)}" data-coins="${g.coins}" data-confirm="${confirm ? '1' : '0'}" title="${esc(g.animation)}">
        <span class="lg-gift-emoji">${giftStickerHtml(g.slug)}</span>
        <span class="lg-gift-name">${esc(g.name)}</span>
        <span class="lg-gift-price">${esc(fmtCoins(g.coins))} · ${fmtMoney(g.usd)}</span>
        ${affordable ? '<span class="chip">Ready</span>' : '<span class="chip">Need demo coins</span>'}
        ${confirm ? '<span class="chip lg-confirm-chip">Confirm</span>' : ''}
      </button>`;
    })
    .join('');

  const packBtns = COIN_PACKAGES.map(
    (p) =>
      `<button type="button" class="btn ghost lg-buy" data-coins="${p.coins}">${esc(fmtCoins(p.coins))} · ${fmtMoney(p.usd)}</button>`
  ).join('');

  const histRows = history.length
    ? history
        .map(
          (h) => `<li class="lg-hist-row">
            <span class="lg-hist-emoji">${giftStickerHtml(h.giftSlug)}</span>
            <span><strong>${esc(h.giftName)}</strong> · @${esc(h.fromUser)} · ${esc(fmtCoins(h.coins))} coins</span>
          </li>`
        )
        .join('')
    : '<li class="muted" style="padding:6px 0">No gifts yet this Live.</li>';

  const sendBlock = user
    ? `
      <div class="lg-tray" id="liveGiftTray" role="list" aria-label="Live gifts">
        ${giftCards}
      </div>
      <div class="row wrap" style="gap:8px;margin-top:12px;align-items:center">
        <span class="chip">Coins ${esc(fmtCoins(coinsBal))} · TEST MODE</span>
        <a class="btn ghost" href="#/wallet" style="font-size:12px">Wallet</a>
      </div>
      <details class="lg-buy-details" style="margin-top:10px">
        <summary class="muted" style="cursor:pointer;font-size:13px">Add demo coins · no payment</summary>
        <div class="row wrap lg-buy-row" style="gap:6px;margin-top:8px">${packBtns}</div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Demo coin values only. No charge, cash value, or withdrawal.</p>
      </details>`
    : `
      <div class="card" style="margin-top:8px;padding:12px">
        <p class="muted" style="margin:0">Create a local demo profile to try gifts during this Live. No real account required.</p>
        <a class="btn primary" href="#/profile" style="margin-top:8px">Sign in</a>
      </div>`;

  return `
    <div class="card live-gifts" id="liveGifts">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:baseline">
        <h3 style="margin:0">Gifts</h3>
        <span class="chip">TEST MODE · simulated gifts · no real payouts</span>
      </div>
      <p class="muted" style="margin:6px 0 12px;font-size:12px">
        PIKK prototype gift catalog · send during Live · expensive gifts (Money Gun+) ask to confirm ·
        viewers see names &amp; coins only
      </p>
      <div class="live-gift-overlay" id="liveGiftOverlay" aria-live="polite" aria-atomic="true"></div>
      ${sendBlock}
      <h4 style="margin:14px 0 8px;font-size:13px">Recent gifts</h4>
      <ul class="list-plain lg-hist" id="lgHist">${histRows}</ul>
    </div>`;
}

/** Song request packs + queue during an active live (viewer request · host Play/Skip). */
function renderSongRequests(live, user) {
  if (!live || live.endedAt) return '';
  const isHost = !!(user && live.hostId === user.id);
  const wallet = Number(getState().wallet?.balance || 0);
  const queue = listLiveSongRequestQueue(live.id);
  const packCards = LIVE_SONG_REQUEST_PACKS.map((p) => {
    const save = p.save > 0
      ? `<span class="chip chip-ok lsr-save">Save $${p.save}</span>`
      : '';
    return `
      <button type="button" class="lsr-pack" data-pack="${p.pack}" data-price="${p.price}" aria-pressed="false">
        <strong>${esc(p.label)}</strong>
        <span class="lsr-pack-price">${fmtMoney(p.price)}</span>
        ${save}
      </button>`;
  }).join('');

  const queueRows = queue.length
    ? queue
        .map((row) => {
          const hostBtns = isHost
            ? `<div class="row wrap lsr-host-acts" style="gap:6px">
                 ${
                   row.status === 'queued' || row.status === 'playing'
                     ? `<button type="button" class="btn primary lsr-play" data-rid="${esc(row.requestId)}" data-si="${row.songIndex}">${row.status === 'playing' ? 'Mark played' : 'Play'}</button>
                        <button type="button" class="btn ghost lsr-skip" data-rid="${esc(row.requestId)}" data-si="${row.songIndex}">Skip</button>`
                     : ''
                 }
               </div>`
            : '';
          return `
          <li class="lsr-queue-row" data-status="${esc(row.status)}">
            <div class="lsr-queue-main">
              <strong>${esc(row.title)}</strong>
              <span class="muted" style="font-size:12px">@${esc(row.username)} · ${esc(String(row.pack))}‑pack</span>
            </div>
            ${statusChip(row.status)}
            ${hostBtns}
          </li>`;
        })
        .join('')
    : '<li class="muted" style="padding:8px 0">No song requests yet · fans can buy a pack below.</li>';

  const formBlock = user
    ? `
      <div class="lsr-form" id="lsrForm">
        <p class="muted" style="margin:0 0 8px;font-size:12px">Pick a pack, enter song title(s), then pay from demo Wallet · <span class="chip">TEST MODE</span></p>
        <div class="lsr-packs" id="lsrPacks" role="group" aria-label="Song request packs">
          ${packCards}
        </div>
        <div id="lsrTitleFields" class="lsr-titles"></div>
        <div class="row wrap" style="gap:8px;margin-top:10px;align-items:center">
          <button type="button" class="btn primary" id="lsrSubmit">Request songs · pay</button>
          <button type="button" class="btn ghost" id="lsrSeedWallet">+ $50 demo credit</button>
          <span class="chip">Wallet ${fmtMoney(wallet)}</span>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">3‑song pack is <strong>$45</strong> · promoted as <strong>Save $5</strong> (not $50). Demo charge only.</p>
      </div>`
    : `
      <div class="card" style="margin-top:10px;padding:12px">
        <p class="muted" style="margin:0">Sign in to request songs during this Live.</p>
        <a class="btn primary" href="#/profile" style="margin-top:8px">Sign in</a>
      </div>`;

  return `
    <div class="card live-song-requests" id="liveSongRequests">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:baseline">
        <h3 style="margin:0">Song requests</h3>
        <span class="chip">TEST MODE · demo wallet</span>
      </div>
      <p class="muted" style="margin:6px 0 12px;font-size:12px">
        Fans pay for song requests on anyone’s live · host Play / Skip ·
        ${isHost ? '<strong>You are the host</strong>' : 'viewer queue is read-only for Play/Skip'}
      </p>
      <h4 style="margin:0 0 8px;font-size:13px">Queue</h4>
      <ul class="list-plain lsr-queue" id="lsrQueue">${queueRows}</ul>
      <h4 style="margin:14px 0 8px;font-size:13px">Request a pack</h4>
      ${formBlock}
    </div>`;
}

function renderStage(live) {
  const elapsed = live.endedAt
    ? Math.max(0, Math.floor((live.endedAt - live.startedAt) / 1000))
    : Math.max(0, Math.floor((Date.now() - live.startedAt) / 1000));
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');
  const viewersLabel = fmtCount(live.viewers || 0);
  const liveHoodie = live.endedAt
    ? `<div class="live-stage-meta"><span class="chip">Ended · ${timeAgo(live.endedAt)}</span></div>`
    : `<div class="live-hoodie live-hoodie--stage" aria-label="Live · ${esc(viewersLabel)} watching">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" id="liveViewers" title="${esc(viewersLabel)} watching">${esc(viewersLabel)}</span>
        </div>
        <div class="live-stage-meta">
          <span class="chip">${mm}:${ss}</span>
        </div>`;

  const chat = (live.chat || [])
    .slice(-40)
    .map(
      (m) => `
      <div class="live-chat-row ${m.support ? 'support' : ''}">
        <strong>${esc(m.username)}</strong>
        <span>${esc(m.text)}</span>
      </div>`
    )
    .join('');

  return `
    <div class="card live-stage">
      <div class="live-stage-frame" role="img" aria-label="Fake stream stage · TEST MODE">
        <div class="live-stage-brand">
          <img src="/brand/pikk-official-approved.jpg" alt="PIKK" />
          <div>
            <div class="live-stage-title">${esc(live.title)}</div>
            <div class="muted" style="font-size:12px">@${esc(live.hostName)} · Follow DatBoiSkeet</div>
          </div>
        </div>
        ${liveHoodie}
        <p class="live-stage-note">TEST MODE · no camera / no real stream · branding + chat demo only</p>
      </div>

      <div class="row wrap live-earn" style="margin-top:10px">
        <span class="chip">Tips ${fmtMoney(live.tipsTotal)}</span>
        <span class="chip">Gifts ${fmtMoney(live.giftsTotal || 0)}</span>
        <span class="chip">Song reqs (see queue)</span>
        <span class="chip">Coins ${fmtCoins(getCoinBalance())}</span>
        <span class="chip">Wallet ${fmtMoney(getState().wallet?.balance || 0)}</span>
      </div>

      ${
        live.endedAt
          ? `<p class="muted" style="margin:10px 0 0">Stream ended. Start another below.</p>
             <button class="btn primary" id="liveRestart">New go-live</button>`
          : `<div class="row wrap" style="margin-top:10px;gap:8px">
               <button class="btn" id="liveTip" data-kind="tip" data-amt="1">Tip $1 · demo</button>
               <button class="btn ghost" id="liveFocusGifts">Gifts tray</button>
               <button class="btn ghost" id="liveBumpViewers">Refresh viewers</button>
               <button class="btn ghost danger" id="liveEnd">End stream</button>
             </div>`
      }
    </div>

    <div class="card live-chat-card">
      <h3>Live chat</h3>
      <div class="live-chat" id="liveChat">${chat || '<p class="muted">No messages yet.</p>'}</div>
      ${
        live.endedAt
          ? ''
          : `<div class="row" style="gap:8px;margin-top:10px">
               <input id="liveChatInput" placeholder="Say something…" maxlength="280" style="flex:1" />
               <button class="btn primary" id="liveChatSend">Send</button>
             </div>`
      }
    </div>
  `;
}


/** t255u · host daily goal progress (USD raised/target; donate in coins). */
function goalPct(g) {
  const t = Number(g?.targetAmount) || 0;
  if (t <= 0) return 0;
  return Math.min(100, Math.round((Number(g.raised) || 0) / t * 100));
}

function goalResetsLabel(endsAt) {
  const ms = Math.max(0, Number(endsAt) - Date.now());
  if (ms <= 0) return 'Ended · 24h window over';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (h >= 1) return `Resets in ${h}h ${m}m`;
  return `Resets in ${m}m`;
}

function renderLiveDailyGoalCard(live, user) {
  if (!live || live.endedAt) return '';
  const hostId = live.hostId;
  const goal = getLiveDailyGoal(hostId);
  const isHost = !!(user && hostId && user.id === hostId);
  const coinsBal = getCoinBalance();

  if (!goal) {
    if (!isHost) {
      return `
      <div class="card live-daily-goal" id="liveDailyGoal">
        <h3 style="margin:0 0 6px">Host daily goal</h3>
        <p class="muted" style="margin:0;font-size:12px">No goal set for this Live yet · TEST MODE</p>
      </div>`;
    }
    return `
    <div class="card live-daily-goal" id="liveDailyGoal">
      <h3 style="margin:0 0 6px">Set today's Live goal</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Name + amount · 24h window · viewers can donate with coins · TEST MODE</p>
      <div class="field"><label>Goal name</label>
        <input id="liveGoalName" maxlength="80" placeholder="e.g. New merch drop fund" /></div>
      <div class="field"><label>Goal amount ($)</label>
        <input id="liveGoalAmt" type="number" min="1" step="1" placeholder="50" /></div>
      <button type="button" class="btn primary" id="liveGoalSave">Start 24h goal</button>
      <p class="chip" style="margin-top:10px">TEST MODE · demo coins only</p>
    </div>`;
  }

  const pct = goalPct(goal);
  const done = !!(goal.completedAt || pct >= 100);
  const farClose = pct >= 100 ? 'Complete' : pct >= 70 ? 'Close' : pct >= 30 ? 'On the way' : 'Far';
  const donateBtns = [50, 100, 250]
    .map(
      (c) =>
        `<button type="button" class="btn ghost live-goal-donate" data-goal-id="${esc(goal.id)}" data-coins="${c}" title="≈ $${(c / 50).toFixed(0)}">Donate ${c} coins</button>`
    )
    .join('');

  const hostEdit = isHost
    ? `<details class="live-goal-edit" style="margin-top:10px">
        <summary class="muted" style="cursor:pointer;font-size:12px">Edit goal (new 24h window)</summary>
        <div class="field" style="margin-top:8px"><label>Goal name</label>
          <input id="liveGoalName" maxlength="80" value="${esc(goal.name)}" /></div>
        <div class="field"><label>Goal amount ($)</label>
          <input id="liveGoalAmt" type="number" min="1" step="1" value="${esc(String(goal.targetAmount))}" /></div>
        <button type="button" class="btn" id="liveGoalSave">Save · reset 24h</button>
      </details>`
    : '';

  return `
    <div class="card live-daily-goal" id="liveDailyGoal">
      <div class="live-goal-head">
        <h3 style="margin:0">Daily goal · ${esc(goal.name)}</h3>
        <span class="chip${done ? ' chip-ok' : ''}">${done ? 'Goal met' : esc(farClose)}</span>
      </div>
      <p class="muted" style="margin:4px 0 8px;font-size:12px">${esc(goalResetsLabel(goal.endsAt))} · @${esc(goal.hostName || live.hostName)} · TEST MODE</p>
      <div class="live-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Goal progress">
        <div class="live-goal-fill" style="width:${pct}%"></div>
      </div>
      <p class="live-goal-amounts" style="margin:8px 0 10px">
        <strong>${fmtMoney(goal.raised)}</strong> / ${fmtMoney(goal.targetAmount)}
        <span class="muted"> · ${pct}%</span>
        <span class="chip" style="margin-left:8px">Coins ${esc(fmtCoins(coinsBal))}</span>
      </p>
      <div class="field live-goal-message-field" style="margin:10px 0 8px">
        <label for="liveGoalSupportMessage">Message to the creator (optional)</label>
        <input id="liveGoalSupportMessage" maxlength="180" placeholder="Show some love with your donation" autocomplete="off" aria-describedby="liveGoalSupportMessageHint liveGoalSupportMessageCount" />
        <div class="live-goal-message-meta">
          <p class="muted" id="liveGoalSupportMessageHint">Saved with your demo coin transaction on this device only. Not delivered to a real streamer.</p>
          <output id="liveGoalSupportMessageCount" for="liveGoalSupportMessage" aria-live="off">0 / 180</output>
        </div>
      </div>
      <div class="row wrap live-goal-donate-row" style="gap:8px">
        ${donateBtns}
      </div>
      <form class="live-goal-custom-form" data-goal-id="${esc(goal.id)}" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins<input type="number" class="live-goal-custom-coins" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" /></label>
        <button class="btn primary" type="submit">Donate custom</button>
      </form>
      <p class="muted" style="margin:8px 0 0;font-size:11px">50 / 100 / 250 coins ≈ $1 / $2 / $5 · 100 coins = $2 · TEST MODE</p>
      ${hostEdit}
    </div>`;
}

function renderGoLiveForm(user) {
  if (!user) {
    return `
      <div class="card" id="live-go">
        <h3>Go live</h3>
        <p class="muted">Sign in to start a demo livestream (no real camera).</p>
        <a class="btn primary" href="#/profile">Sign in</a>
        <p class="chip" style="margin-top:10px">TEST MODE</p>
      </div>`;
  }
  return `
    <div class="card" id="live-go">
      <h3>Go live · TEST MODE</h3>
      <p class="muted">Fake stream UI with title, viewer stub, chat, tips, gifts (coins), and paid song requests. Persisted in localStorage (<code>dbs_v1.live</code> + <code>coins</code> + <code>liveGiftLedger</code> + <code>liveSongRequests</code>).</p>
      <div class="field"><label>Stream title</label>
        <input id="liveTitle" maxlength="80" placeholder="e.g. Listening session · Long Story Short" value="PIKK Live · ${esc(user.username)}" />
      </div>
      <div class="field"><label>Today's goal name <span class="muted">(optional)</span></label>
        <input id="liveGoalNameGo" maxlength="80" placeholder="e.g. Studio session fund" />
      </div>
      <div class="field"><label>Goal amount ($) <span class="muted">(optional)</span></label>
        <input id="liveGoalAmtGo" type="number" min="1" step="1" placeholder="50" />
      </div>
      <button class="btn primary block" id="liveStart">Start stream</button>
      <p class="chip" style="margin-top:10px">No real media · tips/song reqs use demo wallet · gifts use demo coins · optional 24h goal</p>
    </div>`;
}

function renderHistory(hist) {
  if (!hist.length) return '';
  return `
    <div class="card">
      <h3>Recent streams (this device)</h3>
      <ul class="list-plain">
        ${hist
          .slice(0, 8)
          .map(
            (h) => `<li>
              <span><strong>${esc(h.title)}</strong><br/><span class="muted" style="font-size:12px">@${esc(h.hostName)} · ${timeAgo(h.endedAt || h.startedAt)} · tips ${fmtMoney(h.tipsTotal)}</span></span>
              <span class="chip">${h.endedAt ? 'Ended' : 'Live'}</span>
            </li>`
          )
          .join('')}
      </ul>
    </div>`;
}


/** t199u · compact sticky overlay bars during active live. */
function renderLiveOverlayBars(live) {
  if (!live || live.endedAt) return '';

  const gifters = listTopGiftersToday(10);
  const gifterCells = gifters.length
    ? gifters
        .map((g, i) => {
          const st = giftStickerHtml(g.lastSlug || 'rose', { className: 'gift-sticker gift-sticker--xs' });
          return `<div class="live-obar-cell" title="${esc(g.username)} · ${fmtMoney(g.usd)} today">
            <span class="live-obar-rank">${i + 1}</span>
            ${st}
            <span class="live-obar-name">${esc(g.username)}</span>
          </div>`;
        })
        .join('')
    : `<div class="live-obar-empty muted">No gifters yet today</div>`;

  const winners = listDailyBattleWinners(10);
  const winCells = winners.length
    ? winners
        .map((w, i) => {
          const st = giftStickerHtml('battle-win', { className: 'gift-sticker gift-sticker--xs' });
          return `<div class="live-obar-cell" title="${esc(w.username)} · rest of day">
            <span class="live-obar-rank">${i + 1}</span>
            ${st}
            <span class="live-obar-name">${esc(w.username)}</span>
          </div>`;
        })
        .join('')
    : `<div class="live-obar-empty muted">No winners yet today</div>`;

  // Request Spotlight — exact product name; only while paid song request is Playing
  const playing = listLiveSongRequestQueue(live.id).find((q) => q.status === 'playing');
  let spotlightBar = '';
  if (playing) {
    const title = playing.title || 'Song';
    spotlightBar = `
      <div class="live-obar live-obar-spotlight" id="liveRequestSpotlight" role="status" aria-live="polite">
        <span class="live-obar-label">Request Spotlight</span>
        <span class="live-obar-spotlight-name">@${esc(playing.username || 'fan')}</span>
        <span class="muted live-obar-spotlight-song">${esc(title)}</span>
        <span class="chip">TEST MODE</span>
      </div>`;
  }

  return `
    <div class="live-overlay-bars" id="liveOverlayBars" aria-label="Live overlay bars">
      <div class="live-obar live-obar-gifters" id="liveTopGifters">
        <span class="live-obar-label">Top Gifters</span>
        <div class="live-obar-track">${gifterCells}</div>
        <span class="chip live-obar-chip">Day · TEST MODE</span>
      </div>
      <div class="live-obar live-obar-gb" id="liveGbWinnersBar">
        <span class="live-obar-label">Gift Battle</span>
        <div class="live-obar-track">${winCells}</div>
        <span class="chip live-obar-chip">1–10 · day</span>
      </div>
      ${spotlightBar}
    </div>`;
}

/** t200u · broadcast Challenge pop after paid gift (everyone on Live stage). */
function renderGbChallengePop(user) {
  const pop = getLiveGbChallengePop();
  if (!pop) return '';
  const st = giftStickerHtml(pop.giftSlug || 'rose', { className: 'gift-sticker' });
  const isSender = user && user.id === pop.fromUserId;
  const actions = isSender
    ? `<p class="muted" style="margin:8px 0 0;font-size:12px">You triggered this · others can Challenge you · TEST MODE</p>
       <button type="button" class="btn ghost" id="liveGbPopDismiss">Dismiss</button>`
    : `<div class="row wrap" style="gap:8px;margin-top:10px">
         <button type="button" class="btn primary" id="liveGbPopChallenge">Challenge @${esc(pop.fromUser)}</button>
         <button type="button" class="btn ghost" id="liveGbPopDismiss">Dismiss</button>
       </div>`;
  return `
    <div class="live-gb-pop" id="liveGbChallengePop" role="dialog" aria-label="Gift Battle challenge">
      <div class="live-gb-pop-card">
        <div class="row wrap" style="gap:10px;align-items:center">
          ${st}
          <div>
            <div class="chip">Gift Battle</div>
            <h3 style="margin:4px 0">@${esc(pop.fromUser)} sent ${esc(pop.giftName)}</h3>
            <p class="muted" style="margin:0;font-size:12px">${esc(String(pop.coins))} demo coins · no real payment · Challenge this gifter · 60s battle</p>
          </div>
        </div>
        ${actions}
        <p class="chip" style="margin-top:8px">TEST MODE · broadcast demo · invitations respect prefs</p>
      </div>
    </div>`;
}

function renderPendingBattleBanner(user) {
  tickGiftBattle();
  const battle = getActiveGiftBattle();
  if (!battle || !user) return '';
  if (battle.status === 'active' || battle.status === 'ended') {
    const a = Math.max(0, Number(battle.scoreA) || 0);
    const b = Math.max(0, Number(battle.scoreB) || 0);
    const total = a + b;
    const remaining = battle.status === 'active' ? Math.max(0, Math.ceil((Number(battle.endsAt) - Date.now()) / 1000)) : 0;
    const winner = battle.winnerName ? '@' + esc(battle.winnerName) : 'Tie';
    return `
      <section class="card live-battle-scoreboard" aria-label="Live Gift Battle scoreboard">
        <div class="row wrap" style="justify-content:space-between;align-items:center">
          <strong>⚔️ PIKK Live Battle</strong>
          <span class="chip" id="liveBattleTimer" data-ends-at="${Number(battle.endsAt) || 0}">${battle.status === 'active' ? remaining + 's left' : 'Finished'}</span>
        </div>
        <div class="row" style="justify-content:space-between;gap:12px;margin:12px 0">
          <div><strong>@${esc(battle.challenger?.name || 'Challenger')}</strong><div>${fmtCount(a)} demo points</div></div>
          <strong>VS</strong>
          <div style="text-align:right"><strong>@${esc(battle.opponent?.name || 'Opponent')}</strong><div>${fmtCount(b)} demo points</div></div>
        </div>
        <div class="live-battle-score-track" role="progressbar" aria-label="Challenger share of battle points" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${total ? Math.round(a / total * 100) : 50}" style="height:10px;background:var(--blue);border-radius:10px;overflow:hidden">
          <div style="width:${total ? Math.round(a / total * 100) : 50}%;height:100%;background:var(--acc)"></div>
        </div>
        ${battle.status === 'ended' ? `<p class="live-battle-winner" style="font-weight:800;margin-top:10px">🏆 ${winner} · Battle complete</p>` : '<p class="muted" style="margin-top:10px">Scores update with demo gifts · no real money</p>'}
        <a href="#/giftbattles" class="btn ghost" style="margin-top:8px">Battle details</a>
      </section>`;
  }
  if (battle.status !== 'pending') return '';
  const isOpp = battle.opponent?.id === user.id;
  const isChallenger = battle.challenger?.id === user.id;
  if (!isOpp && !isChallenger) {
    return `
      <div class="card live-gb-pending-note">
        <span class="chip">Pending battle</span>
        <span class="muted" style="margin-left:8px;font-size:12px">${esc(battle.challenger?.name)} vs ${esc(battle.opponent?.name)} · waiting</span>
      </div>`;
  }
  if (isOpp) {
    return `
      <div class="card live-gb-pending" id="liveGbPending">
        <strong>@${esc(battle.challenger?.name)}</strong> challenged you to a Gift Battle
        <div class="row wrap" style="gap:8px;margin-top:8px">
          <button type="button" class="btn primary" id="liveGbAccept">Accept · 60s</button>
          <button type="button" class="btn ghost" id="liveGbDecline">Decline</button>
        </div>
        <p class="chip" style="margin-top:8px">TEST MODE · recognition only</p>
      </div>`;
  }
  return `
    <div class="card live-gb-pending-note">
      <span class="chip">Waiting</span>
      <span class="muted" style="margin-left:8px;font-size:12px">Challenge sent to @${esc(battle.opponent?.name)}</span>
      <a class="btn ghost" href="#/giftbattles" style="margin-left:8px">Open Gift Battles</a>
    </div>`;
}

function renderDailyGbWinners() {
  const winners = listDailyBattleWinners(10);
  if (!winners.length) return '';
  const rows = winners
    .map((w, i) => {
      const st = giftStickerHtml('battle-win', { className: 'gift-sticker gift-sticker--xs' });
      return `<li class="live-gb-day-row"><span class="live-gb-day-sticker">${st}</span><span class="chip">#${i + 1}</span><strong>${esc(w.username)}</strong></li>`;
    })
    .join('');
  return `
    <div class="card live-gb-day" id="liveGbDayWinners">
      <h3 style="margin:0 0 6px">Gift Battle winners today</h3>
      <p class="muted" style="margin:0 0 8px;font-size:12px">Up to 10 · until end of day · TEST MODE</p>
      <ul class="live-gb-day-list">${rows}</ul>
    </div>`;
}

export function renderLive() {
  const { user, live } = getState();
  const hist = getLiveHistory();
  const active = live && !live.endedAt;
  const showStage = !!live;
  const tab = getLiveDiscTab();
  const category = getRoute().query?.category || '';

  const channelsPanel = `
    <div class="live-disc-panel" data-panel="channels">
      ${category ? `<div class="card"><strong>Category: ${esc(category)}</strong> <a class="btn ghost" href="#/live?tab=categories">All categories</a> <a class="btn ghost" href="#/live?tab=channels">All channels</a><p class="muted small">Only channels tagged with this category are shown below.</p></div>` : ''}
      ${renderHotLivesRail(category)}
      ${category ? '' : renderDailyGbWinners()}
      ${!active ? renderGoLiveForm(user) : ''}
      ${!active ? renderHouseCatalogTeaser({ title: 'No active Live on this device — house catalog on Spotlight / Open Mic' }) : ''}
      ${renderHistory(hist)}
      <div class="card">
        <p class="muted" style="margin:0 0 8px">More Live tools</p>
        <div class="row wrap">
          <a class="btn ghost" href="#/connect#connect-multistream">Multi-platform go-live</a>
          <a class="btn ghost" href="#/multiguest">Multi-Guest</a>
          <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Open Mic + Spotlight are 24/7 categories (chips above). Clips live under Watch → Shorts / Clips. Gifts + song requests run during an active Live. Gift Battles is not promoted from this page.</p>
      </div>
    </div>`;

  let tabPanel = channelsPanel;
  if (tab === 'following') tabPanel = renderFollowingPanel(user);
  else if (tab === 'categories') tabPanel = renderCategoriesPanel();

  const body = `
    ${renderLiveDiscoveryTabs(tab)}
    ${renderLiveCategoryChips('live')}
    ${active ? renderLiveOverlayBars(live) : ''}
    ${active ? renderGbChallengePop(user) : ''}
    ${active ? renderPendingBattleBanner(user) : ''}
    ${showStage ? renderStage(live) : ''}
    ${active ? renderLiveDailyGoalCard(live, user) : ''}
    ${active ? renderLiveGifts(live, user) : ''}
    ${active ? renderSongRequests(live, user) : ''}
    ${tabPanel}
  `;

  return shellPage('PIKK Live', body, {
    lead: 'Following · Clips · Channels · Categories → Shorts · Request Spotlight · TEST MODE.',
    badge: active ? 'LIVE' : undefined,
  });
}


const _giftOverlayQueue = [];
let _giftOverlayBusy = false;

function enqueueGiftOverlay(root, gift) {
  _giftOverlayQueue.push(gift);
  pumpGiftOverlay(root);
}

function pumpGiftOverlay(root) {
  if (_giftOverlayBusy) return;
  const overlay = root.querySelector('#liveGiftOverlay');
  if (!overlay) {
    _giftOverlayQueue.length = 0;
    return;
  }
  const next = _giftOverlayQueue.shift();
  if (!next) return;
  _giftOverlayBusy = true;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dur = reduce ? 900 : next.tier === 'cinematic' ? 4200 : next.tier === 'premium' ? 2800 : 1600;
  overlay.innerHTML = `
    <div class="lg-overlay-card lg-tier-${esc(next.tier || 'small')}" data-slug="${esc(next.slug)}">
      <div class="lg-overlay-sticker">${giftStickerHtml(next.slug)}</div>
      <div class="lg-overlay-copy">
        <strong>${esc(next.name)}</strong>
        <span>@${esc(next.fromUser)} · ${esc(fmtCoins(next.coins))} coins</span>
        <span class="muted lg-overlay-brief">${esc(next.animation || '')}</span>
      </div>
    </div>`;
  overlay.classList.add('is-on');
  window.setTimeout(() => {
    overlay.classList.remove('is-on');
    overlay.innerHTML = '';
    _giftOverlayBusy = false;
    pumpGiftOverlay(root);
  }, dur);
}

function mountLiveGiftTray(root) {
  root.querySelectorAll('.lg-buy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = buyCoins(Number(btn.dataset.coins));
      if (res?.error === 'bad_package') return toast('Unknown coin pack');
      if (res?.error) return toast(String(res.error));
      toast(`+${fmtCoins(res.pack.coins)} coins · ${fmtMoney(res.pack.usd)} · TEST MODE`);
      refresh();
    });
  });

  root.querySelectorAll('.lg-gift').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.slug;
      const needsConfirm = btn.dataset.confirm === '1';
      const gift = LIVE_GIFT_CATALOG.find((g) => g.slug === slug);
      if (!gift) return toast('Gift not found');
      if (needsConfirm) {
        const ok = window.confirm(
          `Send ${gift.name} for ${fmtCoins(gift.coins)} coins (${fmtMoney(gift.usd)})?\nTEST MODE · demo coins only`
        );
        if (!ok) return;
      }
      const liveId = getState().live?.id;
      const res = sendLiveGift({ liveId, slug });
      if (res?.error === 'signin') return toast('Sign in first');
      if (res?.error === 'offline') return toast('Not live');
      if (res?.error === 'insufficient') {
        return toast(`Need ${fmtCoins(res.need)} coins — buy a pack below · TEST MODE`);
      }
      if (res?.error === 'bad_gift') return toast('Unknown gift');
      if (res?.error) return toast(String(res.error));
      enqueueGiftOverlay(root, {
        slug: gift.slug,
        name: gift.name,
        coins: gift.coins,
        tier: gift.tier,
        animation: gift.animation,
        fromUser: res.entry?.fromUser || getState().user?.username || 'you',
      });
      toast(`Sent ${gift.name} · ${fmtCoins(gift.coins)} coins · TEST MODE`);
      // Soft refresh after overlay starts so tray balance updates
      window.setTimeout(() => refresh(), 200);
    });
  });
}

function mountSongRequestForm(root) {
  const packsEl = root.querySelector('#lsrPacks');
  const fieldsEl = root.querySelector('#lsrTitleFields');
  if (!packsEl || !fieldsEl) return;

  let selected = 1;

  const paintTitles = () => {
    const n = selected;
    const inputs = Array.from({ length: n }, (_, i) => {
      return `<div class="field"><label>Song ${i + 1}</label>
        <input class="lsr-title-input" data-i="${i}" maxlength="80" placeholder="Song title…" /></div>`;
    }).join('');
    fieldsEl.innerHTML = inputs;
  };

  const selectPack = (pack) => {
    selected = Number(pack) || 1;
    packsEl.querySelectorAll('.lsr-pack').forEach((btn) => {
      const on = Number(btn.dataset.pack) === selected;
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    paintTitles();
  };

  packsEl.querySelectorAll('.lsr-pack').forEach((btn) => {
    btn.addEventListener('click', () => selectPack(btn.dataset.pack));
  });
  selectPack(1);

  root.querySelector('#lsrSeedWallet')?.addEventListener('click', () => {
    addWalletCredit(50, 'Song request demo credit · TEST MODE');
    toast('+$50 wallet demo · TEST MODE');
    refresh();
  });

  root.querySelector('#lsrSubmit')?.addEventListener('click', () => {
    const titles = Array.from(root.querySelectorAll('.lsr-title-input')).map((el) => el.value);
    const res = submitLiveSongRequest({ pack: selected, titles });
    if (res?.error === 'signin') return toast('Sign in first');
    if (res?.error === 'offline') return toast('Not live');
    if (res?.error === 'bad_pack') return toast('Pick a pack');
    if (res?.error === 'title_count') {
      return toast(`Enter ${res.need} song title${res.need > 1 ? 's' : ''}`);
    }
    if (res?.error === 'insufficient') {
      return toast(`Need ${fmtMoney(res.need)} — tap + $50 demo credit · TEST MODE`);
    }
    if (res?.error) return toast(String(res.error));
    toast(`Song request submitted · ${fmtMoney(res.entry.price)} · TEST MODE`);
    refresh();
  });

  root.querySelectorAll('.lsr-play').forEach((btn) => {
    btn.addEventListener('click', () => {
      const rid = btn.dataset.rid;
      const si = Number(btn.dataset.si);
      const queue = listLiveSongRequestQueue(getState().live?.id);
      const row = queue.find((q) => q.requestId === rid && q.songIndex === si);
      let res;
      if (row?.status === 'playing') {
        res = completeLiveSongRequest(rid, si);
        if (res?.error === 'host_only') return toast('Host only');
        if (res?.error) return toast(String(res.error));
        toast('Marked played · TEST MODE');
      } else {
        res = playLiveSongRequest(rid, si);
        if (res?.error === 'host_only') return toast('Host only');
        if (res?.error) return toast(String(res.error));
        toast('Now playing · TEST MODE');
      }
      refresh();
    });
  });

  root.querySelectorAll('.lsr-skip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = skipLiveSongRequest(btn.dataset.rid, Number(btn.dataset.si));
      if (res?.error === 'host_only') return toast('Host only');
      if (res?.error) return toast(String(res.error));
      toast('Skipped · TEST MODE');
      refresh();
    });
  });
}

export function bindLive(root) {
  root.querySelectorAll('.hot-live-watch').forEach((btn) => {
    btn.addEventListener('click', () => {
      notifyLiveOpen();
      const host = btn.dataset.host || 'creator';
      const id = btn.dataset.id || '';
      const card = root.querySelector(`.hot-live-card[data-live-id="${CSS.escape(id)}"]`);
      root.querySelectorAll('.hot-live-card.is-watching').forEach((el) => el.classList.remove('is-watching'));
      card?.classList.add('is-watching');
      toast(`Watching @${host} · demo only`);
    });
  });

  root.querySelectorAll('.hot-live-spike').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const res = simulateLiveSpike(id);
      if (res?.error === 'missing') return toast('Live not found');
      if (res?.error) return toast(String(res.error));
      const host = res.live?.hostName || 'creator';
      toast(
        res.deduped
          ? `Spike @${host} · Admin alert already open`
          : `Spike @${host} · Admin engagement alert queued`
      );
      refresh();
    });
  });

  root.querySelector('#liveStart')?.addEventListener('click', () => {
    const title = root.querySelector('#liveTitle')?.value?.trim();
    const res = startLiveDemo(title);
    if (res?.error === 'signin') return toast('Sign in first');
    if (res?.error === 'already_live') return toast('Already live');
    const gName = root.querySelector('#liveGoalNameGo')?.value?.trim();
    const gAmt = Number(root.querySelector('#liveGoalAmtGo')?.value);
    if (gName && gAmt > 0) {
      const gRes = setLiveDailyGoal({ name: gName, targetAmount: gAmt });
      if (gRes?.error === 'signin') toast('Sign in to set goal');
      else if (gRes?.error) toast('Goal not set · ' + gRes.error);
      else toast(`Live goal set · $${gAmt} · 24h · TEST MODE`);
    }
    notifyLiveOpen();
    toast('You are live · TEST MODE');
    refresh();
  });

  root.querySelector('#liveRestart')?.addEventListener('click', () => {
    const title = 'PIKK Live · ' + (getState().user?.username || 'Demo');
    const res = startLiveDemo(title);
    if (res?.error) return toast(String(res.error));
    notifyLiveOpen();
    toast('Back live · TEST MODE');
    refresh();
  });

  root.querySelector('#liveEnd')?.addEventListener('click', () => {
    endLiveDemo();
    notifyLiveClosed();
    toast('Stream ended');
    refresh();
  });

  root.querySelector('#liveBumpViewers')?.addEventListener('click', () => {
    const live = bumpLiveViewers();
    const el = root.querySelector('#liveViewers');
    if (el && live) el.textContent = fmtCount(live.viewers || 0);
    toast('Viewers updated (stub)');
  });

  root.querySelector('#liveTip')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const res = sendLiveSupport({ kind: 'tip', amount: Number(btn.dataset.amt) || 1 });
    if (res?.error === 'signin') return toast('Sign in first');
    if (res?.error === 'offline') return toast('Not live');
    toast('Tip sent · demo');
    refresh();
  });

  const sendChat = () => {
    const input = root.querySelector('#liveChatInput');
    const text = input?.value?.trim();
    if (!text) return toast('Type a message');
    const res = sendLiveChat(text);
    if (res?.error === 'signin') return toast('Sign in first');
    if (res?.error === 'offline') return toast('Not live');
    if (res?.error === 'empty') return;
    if (input) input.value = '';
    refresh();
  };
  root.querySelector('#liveChatSend')?.addEventListener('click', sendChat);
  root.querySelector('#liveChatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
  });


  root.querySelector('#liveFocusGifts')?.addEventListener('click', () => {
    root.querySelector('#liveGifts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  mountLiveGiftTray(root);
  mountSongRequestForm(root);
  mountLiveDailyGoal(root);
}

function mountLiveDailyGoal(root) {
  root.querySelector('#liveGoalSave')?.addEventListener('click', () => {
    const name = root.querySelector('#liveGoalName')?.value?.trim();
    const targetAmount = Number(root.querySelector('#liveGoalAmt')?.value);
    const res = setLiveDailyGoal({ name, targetAmount });
    if (res?.error === 'signin') return toast('Sign in first');
    if (res?.error === 'bad_name') return toast('Enter a goal name');
    if (res?.error === 'bad_amount') return toast('Enter a goal amount ($)');
    if (res?.error) return toast(String(res.error));
    toast(`Goal live · $${res.goal.targetAmount} · 24h window · TEST MODE`);
    refresh();
  });

  const supportMessage = root.querySelector('#liveGoalSupportMessage');
  const supportCount = root.querySelector('#liveGoalSupportMessageCount');
  if (supportMessage && supportCount) {
    const updateCount = () => {
      supportCount.textContent = `${supportMessage.value.length} / 180`;
    };
    supportMessage.addEventListener('input', updateCount);
    updateCount();
  }

  root.querySelectorAll('.live-goal-custom-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const coins = Number(form.querySelector('.live-goal-custom-coins')?.value);
      if (!Number.isSafeInteger(coins) || coins < 1 || coins > 1000000) return toast('Enter 1–1,000,000 whole coins');
      const result = donateToGoal(form.dataset.goalId, coins, {message:root.querySelector('#liveGoalSupportMessage')?.value || ''});
      if (result?.error === 'signin') return toast('Sign in first');
      if (result?.error === 'insufficient') return toast('Not enough demo coins');
      if (result?.error) return toast('Donation unavailable · TEST MODE');
      toast('Custom donation sent · TEST MODE');
      refresh();
    });
  });

  root.querySelectorAll('.live-goal-donate').forEach((btn) => {
    btn.addEventListener('click', () => {
      const goalId = btn.dataset.goalId;
      const coins = Number(btn.dataset.coins);
      const res = donateToGoal(goalId, coins, {message:root.querySelector('#liveGoalSupportMessage')?.value || ''});
      if (res?.error === 'signin') return toast('Sign in first');
      if (res?.error === 'insufficient') {
        return toast(`Need ${fmtCoins(res.need)} coins — buy a pack in Gifts · TEST MODE`);
      }
      if (res?.error === 'expired') return toast('Goal ended · 24h window over');
      if (res?.error === 'unknown_goal') return toast('Goal not found');
      if (res?.error === 'invalid_amount') return toast('Pick a donate amount');
      if (res?.error) return toast(String(res.error));
      const usd = res.donated?.usd ?? coins / 50;
      toast(`Donated ${fmtCoins(coins)} coins ($${Number(usd).toFixed(2)}) · TEST MODE`);
      refresh();
    });
  });
}

