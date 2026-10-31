import { VIDEOS, YOUTUBE_CHANNEL_PLAYLISTS } from './data.js';
const KEY = 'dbs_v1';

const defaultState = () => ({
  user: null, // { id, username, bio, avatar, followers, following, memberships, purchasedTracks }
  profiles: {
    // public directory keyed by id
    dbs: {
      id: 'dbs',
      username: 'DatBoiSkeet',
      bio: 'Official DatBoiSkeet · Long Story Short & Ladies Only Coming Soon · Vault · Foreign X-Change',
      avatar: '/brand/logo-dbs-v3@2x.webp',
      followers: [],
      following: [],
      verified: true,
    },
  },
  posts: [],
  comments: {}, // postId -> [{ id, userId, username, text, at }]
  likes: {}, // postId -> [userId]
  clipperApps: [],
  creatorSellApps: [], // t172u · Pricing apply form (TEST MODE)
  brandApps: [],
  listings: [], // sponsored marketplace listings (demo)
  live: null, // { id, hostId, hostName, title, startedAt, chat, viewers, giftsTotal, tipsTotal, endedAt? }
  liveHistory: [], // ended demo streams (cap 20)
  // t180u · Song requests during Live (append-only)
  liveSongRequests: [], // { id, liveId, hostId, userId, username, pack, price, titles[], songStatuses[], status, at, charged }
  // t185u · Live gifts coins (separate from USD fan wallet)
  coins: { balance: 0, history: [] }, // { at, amount, note, kind?: 'buy'|'gift'|'adjust' }
  liveGiftLedger: [], // append-only gift sends · Commerce/Earnings reads creatorShare
  liveGbChallengePop: null, // t200u broadcast after paid gift
  threads: {}, // threadId -> { id, peerId, peerName, messages, kind?, muted?, blocked?, reportedAt? }
  demoUnreadSeeded: false, // t212u · one-shot demo badge seed; never rewind after read
  messagePrefs: { allowDMs: true, allowRequests: true },
  notifications: {
    releases: true,
    lives: true,
    messages: true,
    quietHours: false,
  },
  wallet: { balance: 0, history: [] }, // fan spendable credits (tips/gifts)
  creatorWallet: {
    available: 0,
    holds: 0,
    threshold: 25,
    verification: 'demo_unverified', // Identity / tax stub — not real KYC
    earnings: [],
    payouts: [],
  },
  catalog: [], // Admin Add Content metadata (blobs in IndexedDB via idb: refs)
  missions: [], // §6 promotional campaigns (demo)
  giftBattles: {
    active: null, // pending | active | ended battle object
    history: [], // completed battles (cap 40)
    champions: [], // recent winners for spotlight / top list
    prefs: { invitationsEnabled: true },
  },
  multiGuest: {
    active: null, // host session with guests / chat / giftSplit
    history: [], // ended sessions (cap 20)
  },
  spotlight: {
    nowPlaying: null, // active stage slot (freestyle / uploaded / house catalog)
    queue: [], // FIFO join list
    history: [], // recent stage turns (cap 30)
    houseIndex: 0, // t233u rotation into DatBoiSkeet house catalog
  },
  // §26 Fan Clubs — append-only nested block (Build)
  fanClubs: {
    clubs: [],
    posts: {}, // clubId -> posts[]
    seeded: false,
  },
  // §32 Share & Earn / §33 Refer & Earn — Commerce
  shareEarn: {
    platformsLinked: [], // { id, platform, handle, url, followers?, linkedAt } — never passwords
    challenge: null, // active 24h promo or null
    submissions: [],
    rewardsClaimed: [],
  },
  referEarn: {
    code: '', // personal referral code (lazy)
    invitees: [],
    milestonesClaimed: [],
  },
  // §37 DBS Restream — Free Multi-Platform Go Live (Live Social)
  restream: {
    platforms: {}, // id -> { id, connected, connectedAt, handle, lastError, enabled }
    selected: [], // platform ids for next / active go-live
    session: null, // active simulcast demo session
    history: [], // ended sessions (cap 20)
    ingest: null, // { rtmpUrl, streamKey, rotatedAt } lazy-generated
    campaign: {
      tier: null, // 'bronze' | 'silver' | 'gold' | null
      status: 'none', // none | active | cancelled
      enrolledAt: null,
      cancelledAt: null,
    },
    campaignConfig: null, // lazy defaults via getRestreamCampaignConfig()
  },
  // §28 Loyalty Club — Build (append-only)
  loyalty: {
    points: 0,
    history: [], // { id, at, kind, points, note }
    badges: [], // unlocked badge ids
    publicVisible: true,
    lastActionAt: {}, // kind -> ts anti-farming
    dayCounts: {}, // YYYY-MM-DD -> { kind: count }
  },
  // §30 Open Mic — Build (append-only)
  openMic: {
    applications: [], // { id, userId, username, talent, trackTitle, profileNote, rightsCertified, status, at, reviewedAt? }
    seeded: false,
    houseIndex: 0, // t236u shared idle house catalog rotation
  },
  // §22 Profile Shop — Design (append-only · digital cosmetics CONCEPT / TEST MODE)
  profileShop: {
    owned: [], // cosmetic ids unlocked in demo (no charge)
    equipped: {}, // { frame?, effect?, banner?, nameStyle?, badge? }
    reduceMotion: false,
  },
  // §38 Hot Feed — Build (posts) + Live Social (lives) · append-only
  hotFeed: {
    lives: [], // Live Social owns seed/rank · { id, hostId, hostName, title, viewers, giftsTotal, house, spikedAt?, score }
    posts: [], // Build owns · ranked hot posts
    seededLives: false,
    seededPosts: false,
    seededPostsVer: 0, // t172u · bump community engagement reseed
  },
  engagementAlerts: [], // { id, kind:'live'|'post', refId, title, username, score, viewers?, gifts?, at, handledAt?, handledNote? }
  postShares: {}, // postId -> share count (demo)
  splashSeenAt: 0,
  // t255u · Daily goals (app-wide + per-host Live) · Design/Commerce consume same APIs
  dailyGoals: {
    app: null, // Goal | null
    liveByHost: {}, // hostId -> Goal
    history: [], // optional rolled goals (cap 40)
  },
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    return {
      ...base,
      ...parsed,
      profiles: { ...base.profiles, ...(parsed.profiles || {}) },
      notifications: { ...base.notifications, ...(parsed.notifications || {}) },
      wallet: { ...base.wallet, ...(parsed.wallet || {}) },
      creatorWallet: {
        ...base.creatorWallet,
        ...(parsed.creatorWallet || {}),
        earnings: Array.isArray(parsed.creatorWallet?.earnings)
          ? parsed.creatorWallet.earnings
          : [],
        payouts: Array.isArray(parsed.creatorWallet?.payouts)
          ? parsed.creatorWallet.payouts
          : [],
        available: Number(parsed.creatorWallet?.available) || 0,
        holds: Number(parsed.creatorWallet?.holds) || 0,
        threshold: Number(parsed.creatorWallet?.threshold) > 0
          ? Number(parsed.creatorWallet.threshold)
          : 25,
        verification:
          parsed.creatorWallet?.verification === 'demo_verified'
            ? 'demo_verified'
            : 'demo_unverified',
      },
      brandApps: parsed.brandApps || [],
      listings: Array.isArray(parsed.listings) ? parsed.listings : [],
      live: parsed.live ?? null,
      liveHistory: Array.isArray(parsed.liveHistory) ? parsed.liveHistory : [],
      liveSongRequests: Array.isArray(parsed.liveSongRequests) ? parsed.liveSongRequests : [],
      coins: {
        balance: Number(parsed.coins?.balance) || 0,
        history: Array.isArray(parsed.coins?.history) ? parsed.coins.history : [],
      },
      liveGiftLedger: Array.isArray(parsed.liveGiftLedger) ? parsed.liveGiftLedger : [],
      liveGbChallengePop: parsed.liveGbChallengePop || null,
      threads: { ...(parsed.threads || {}) },
      demoUnreadSeeded: !!parsed.demoUnreadSeeded,
      messagePrefs: { ...base.messagePrefs, ...(parsed.messagePrefs || {}) },
      catalog: Array.isArray(parsed.catalog) ? parsed.catalog : [],
      missions: Array.isArray(parsed.missions) ? parsed.missions : [],
      giftBattles: {
        ...base.giftBattles,
        ...(parsed.giftBattles || {}),
        history: Array.isArray(parsed.giftBattles?.history)
          ? parsed.giftBattles.history
          : [],
        champions: Array.isArray(parsed.giftBattles?.champions)
          ? parsed.giftBattles.champions
          : [],
        prefs: {
          ...base.giftBattles.prefs,
          ...(parsed.giftBattles?.prefs || {}),
        },
        active: parsed.giftBattles?.active ?? null,
      },
      multiGuest: {
        ...base.multiGuest,
        ...(parsed.multiGuest || {}),
        history: Array.isArray(parsed.multiGuest?.history)
          ? parsed.multiGuest.history
          : [],
        active: parsed.multiGuest?.active ?? null,
      },
      fanClubs: {
        ...base.fanClubs,
        ...(parsed.fanClubs || {}),
        clubs: Array.isArray(parsed.fanClubs?.clubs) ? parsed.fanClubs.clubs : [],
        posts:
          parsed.fanClubs?.posts && typeof parsed.fanClubs.posts === 'object'
            ? parsed.fanClubs.posts
            : {},
        seeded: !!parsed.fanClubs?.seeded,
      },
      shareEarn: {
        ...base.shareEarn,
        ...(parsed.shareEarn || {}),
        platformsLinked: Array.isArray(parsed.shareEarn?.platformsLinked)
          ? parsed.shareEarn.platformsLinked
          : [],
        challenge: parsed.shareEarn?.challenge ?? null,
        submissions: Array.isArray(parsed.shareEarn?.submissions)
          ? parsed.shareEarn.submissions
          : [],
        rewardsClaimed: Array.isArray(parsed.shareEarn?.rewardsClaimed)
          ? parsed.shareEarn.rewardsClaimed
          : [],
      },
      referEarn: {
        ...base.referEarn,
        ...(parsed.referEarn || {}),
        code: typeof parsed.referEarn?.code === 'string' ? parsed.referEarn.code : '',
        invitees: Array.isArray(parsed.referEarn?.invitees) ? parsed.referEarn.invitees : [],
        milestonesClaimed: Array.isArray(parsed.referEarn?.milestonesClaimed)
          ? parsed.referEarn.milestonesClaimed
          : [],
      },
      restream: {
        ...base.restream,
        ...(parsed.restream || {}),
        platforms:
          parsed.restream?.platforms && typeof parsed.restream.platforms === 'object'
            ? parsed.restream.platforms
            : {},
        selected: Array.isArray(parsed.restream?.selected) ? parsed.restream.selected : [],
        session: parsed.restream?.session ?? null,
        history: Array.isArray(parsed.restream?.history) ? parsed.restream.history : [],
        ingest: parsed.restream?.ingest ?? null,
        campaign: {
          ...base.restream.campaign,
          ...(parsed.restream?.campaign || {}),
        },
        campaignConfig: parsed.restream?.campaignConfig ?? null,
      },
      loyalty: {
        ...base.loyalty,
        ...(parsed.loyalty || {}),
        points: Number(parsed.loyalty?.points) || 0,
        history: Array.isArray(parsed.loyalty?.history) ? parsed.loyalty.history : [],
        badges: Array.isArray(parsed.loyalty?.badges) ? parsed.loyalty.badges : [],
        publicVisible:
          parsed.loyalty?.publicVisible === undefined
            ? true
            : !!parsed.loyalty.publicVisible,
        lastActionAt:
          parsed.loyalty?.lastActionAt && typeof parsed.loyalty.lastActionAt === 'object'
            ? parsed.loyalty.lastActionAt
            : {},
        dayCounts:
          parsed.loyalty?.dayCounts && typeof parsed.loyalty.dayCounts === 'object'
            ? parsed.loyalty.dayCounts
            : {},
      },
      openMic: {
        ...base.openMic,
        ...(parsed.openMic || {}),
        applications: Array.isArray(parsed.openMic?.applications)
          ? parsed.openMic.applications
          : [],
        seeded: !!parsed.openMic?.seeded,
        houseIndex: typeof parsed.openMic?.houseIndex === 'number' ? parsed.openMic.houseIndex : 0,
      },
      profileShop: {
        ...base.profileShop,
        ...(parsed.profileShop || {}),
        owned: Array.isArray(parsed.profileShop?.owned) ? parsed.profileShop.owned : [],
        equipped:
          parsed.profileShop?.equipped && typeof parsed.profileShop.equipped === 'object'
            ? parsed.profileShop.equipped
            : {},
        reduceMotion: !!parsed.profileShop?.reduceMotion,
      },
      hotFeed: {
        ...base.hotFeed,
        ...(parsed.hotFeed || {}),
        lives: Array.isArray(parsed.hotFeed?.lives) ? parsed.hotFeed.lives : [],
        posts: Array.isArray(parsed.hotFeed?.posts) ? parsed.hotFeed.posts : [],
        seededLives: !!parsed.hotFeed?.seededLives,
        seededPosts: !!parsed.hotFeed?.seededPosts,
        seededPostsVer: Number(parsed.hotFeed?.seededPostsVer) || 0,
      },
      engagementAlerts: Array.isArray(parsed.engagementAlerts) ? parsed.engagementAlerts : [],
      postShares:
        parsed.postShares && typeof parsed.postShares === 'object' ? parsed.postShares : {},
      creatorSellApps: Array.isArray(parsed.creatorSellApps) ? parsed.creatorSellApps : [],
      dailyGoals: {
        ...base.dailyGoals,
        ...(parsed.dailyGoals || {}),
        app: parsed.dailyGoals?.app ?? null,
        liveByHost:
          parsed.dailyGoals?.liveByHost && typeof parsed.dailyGoals.liveByHost === 'object'
            ? parsed.dailyGoals.liveByHost
            : {},
        history: Array.isArray(parsed.dailyGoals?.history) ? parsed.dailyGoals.history : [],
      },
    };
  } catch {
    return defaultState();
  }
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

let state = load();

export function getState() {
  return state;
}

export function setState(patch) {
  state = { ...state, ...patch };
  save(state);
  return state;
}

export function update(fn) {
  state = fn(state) || state;
  save(state);
  return state;
}

/** Keep the signed-in user mirrored into the public profiles directory. */
function syncUserProfile(user) {
  if (!user) return;
  state = {
    ...state,
    profiles: {
      ...state.profiles,
      [user.id]: {
        id: user.id,
        username: user.username,
        bio: user.bio || '',
        avatar: user.avatar || '',
        followers: user.followers || [],
        following: user.following || [],
        memberships: user.memberships || {},
        verified: !!user.verified,
      },
    },
  };
}

export function getProfile(id) {
  if (!id) return null;
  if (state.user && state.user.id === id) return state.user;
  return state.profiles[id] || null;
}

export function listFollowers(id) {
  const p = getProfile(id);
  if (!p) return [];
  return (p.followers || [])
    .map((fid) => getProfile(fid) || { id: fid, username: fid })
    .filter(Boolean);
}

export function listFollowing(id) {
  const p = getProfile(id);
  if (!p) return [];
  return (p.following || [])
    .map((fid) => getProfile(fid) || { id: fid, username: fid })
    .filter(Boolean);
}

export function ensureDemoPosts() {
  if (state.posts.length) return;
  const seed = [
    {
      id: 'p1',
      userId: 'dbs',
      username: 'DatBoiSkeet',
      text: 'Long Story Short — cover is up. Coming Soon on DBS Music. Stay ready.',
      image: '/music/01_Long_Story_Short_Coming_Soon.jpg',
      at: Date.now() - 86400000 * 2,
    },
    {
      id: 'p2',
      userId: 'dbs',
      username: 'DatBoiSkeet',
      text: 'Foreign X-Change — hats, tees & jackets. Checkout on ForeignX-Change.com (not inside DBS).',
      image: '/merch/01_black_orange_716_hat.jpeg',
      at: Date.now() - 86400000,
    },
    {
      id: 'p3',
      userId: 'dbs',
      username: 'DatBoiSkeet',
      text: 'Ladies Only — cover art live. Official playback unlocks when the single drops.',
      image: '/music/02_Ladies_Only_Coming_Soon.jpg',
      at: Date.now() - 86400000 * 3,
    },
    {
      id: 'p4',
      userId: 'dbs',
      username: 'DatBoiSkeet',
      text: '716 Buffalo Braves snapback on Foreign X-Change — shop the external store.',
      image: '/merch/02_blue_red_716_hat.jpeg',
      at: Date.now() - 86400000 * 4,
    },
  ];
  state = {
    ...state,
    posts: seed,
    likes: { p1: [], p2: [], p3: [], p4: [] },
    comments: { p1: [], p2: [], p3: [], p4: [] },
  };
  save(state);
}

export function signInLocal(username) {
  const name = (username || 'Fan').trim().slice(0, 24) || 'Fan';
  const id = 'u_' + name.toLowerCase().replace(/\W+/g, '_') + '_' + Date.now().toString(36);
  const user = {
    id,
    username: name,
    bio: 'DBS fan · local demo account (TEST MODE)',
    avatar: '',
    followers: [],
    following: ['dbs'],
    membership: null,
    memberships: { skeetPlus: false, backstage: false, innerCircle: false },
    purchasedTracks: [],
    createdAt: Date.now(),
  };
  // DatBoiSkeet gains a follower
  const dbs = state.profiles.dbs || defaultState().profiles.dbs;
  const dbsFollowers = new Set(dbs.followers || []);
  dbsFollowers.add(id);
  state = {
    ...state,
    user,
    profiles: {
      ...state.profiles,
      dbs: { ...dbs, followers: [...dbsFollowers] },
    },
  };
  syncUserProfile(user);
  save(state);
  return user;
}

export function signOut() {
  state = { ...state, user: null };
  save(state);
}

export function updateProfile({ bio, avatar, username }) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const next = {
    ...user,
    bio: bio !== undefined ? String(bio).slice(0, 280) : user.bio,
    avatar: avatar !== undefined ? String(avatar).trim() : user.avatar,
    username: username !== undefined ? String(username).trim().slice(0, 24) || user.username : user.username,
  };
  state = { ...state, user: next };
  syncUserProfile(next);
  save(state);
  return next;
}

export function setMembership(tier, on = true) {
  const user = state.user;
  if (!user) return { error: 'signin' };

  // Canonical demo field: user.membership = 'skeet+' | 'backstage' | 'inner' | null
  let membership = user.membership ?? null;
  const normalize = (t) => {
    if (t === 'skeet' || t === 'skeetPlus' || t === 'skeet+') return 'skeet+';
    if (t === 'backstage') return 'backstage';
    if (t === 'inner' || t === 'innerCircle') return 'inner';
    return null;
  };
  const rank = { null: 0, 'skeet+': 1, backstage: 2, inner: 3 };
  const want = normalize(tier);

  if (!on) {
    // Cancel: clear if cancelling current or lower; dropping a higher tier cancels all
    membership = null;
  } else if (want) {
    membership = want;
  }

  const memberships = {
    skeetPlus: rank[membership || 'null'] >= 1,
    backstage: rank[membership || 'null'] >= 2,
    innerCircle: rank[membership || 'null'] >= 3,
  };

  const next = { ...user, membership, memberships };
  state = { ...state, user: next };
  syncUserProfile(next);
  save(state);
  return next;
}

export function getMembership() {
  const user = state.user;
  if (!user) return null;
  if (user.membership) return user.membership;
  const m = user.memberships || {};
  if (m.innerCircle) return 'inner';
  if (m.backstage) return 'backstage';
  if (m.skeetPlus) return 'skeet+';
  return null;
}

export function hasVaultAccess(level = 'skeet') {
  const membership = getMembership();
  const rank = { null: 0, 'skeet+': 1, backstage: 2, inner: 3 };
  const need =
    level === 'backstage' ? 2 : level === 'inner' ? 3 : 1;
  return (rank[membership || 'null'] || 0) >= need;
}


export function purchaseTrack(trackId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const list = new Set(user.purchasedTracks || []);
  list.add(trackId);
  const next = { ...user, purchasedTracks: [...list] };
  state = { ...state, user: next };
  syncUserProfile(next);
  save(state);
  return next;
}

export function createPost({ text, image, mediaType, mediaUrl }) {
  const user = state.user;
  if (!user) throw new Error('Sign in required');
  const id = 'p_' + Date.now().toString(36);
  const kind = ['picture', 'short', 'video', 'image', 'text'].includes(mediaType)
    ? (mediaType === 'image' ? 'picture' : mediaType)
    : image
      ? 'picture'
      : 'text';
  const post = {
    id,
    userId: user.id,
    username: user.username,
    text: (text || '').trim(),
    image: (image || '').trim(),
    mediaType: kind === 'text' && !(image || '').trim() ? 'text' : kind,
    mediaUrl: (mediaUrl || '').trim(),
    at: Date.now(),
  };
  state = {
    ...state,
    posts: [post, ...state.posts],
    likes: { ...state.likes, [id]: [] },
    comments: { ...state.comments, [id]: [] },
  };
  save(state);
  return post;
}

export function toggleLike(postId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const list = new Set(state.likes[postId] || []);
  if (list.has(user.id)) list.delete(user.id);
  else list.add(user.id);
  state = { ...state, likes: { ...state.likes, [postId]: [...list] } };
  save(state);
  try { refreshHotFeed(); } catch (_) {}
  return { count: list.size, liked: list.has(user.id) };
}

export function addComment(postId, text) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const c = {
    id: 'c_' + Date.now().toString(36),
    userId: user.id,
    username: user.username,
    text: text.trim(),
    at: Date.now(),
  };
  const prev = state.comments[postId] || [];
  state = { ...state, comments: { ...state.comments, [postId]: [...prev, c] } };
  save(state);
  try { refreshHotFeed(); } catch (_) {}
  return c;
}

export function followUser(targetId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  if (targetId === user.id) return { error: 'self' };
  if (user.following.includes(targetId)) return user;

  const next = { ...user, following: [...user.following, targetId] };
  const profiles = { ...state.profiles };
  const target = profiles[targetId] || getProfile(targetId);
  if (target) {
    const followers = new Set(target.followers || []);
    followers.add(user.id);
    profiles[targetId] = { ...target, followers: [...followers] };
  }
  state = { ...state, user: next, profiles };
  syncUserProfile(next);
  save(state);
  return next;
}

export function unfollowUser(targetId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const next = {
    ...user,
    following: (user.following || []).filter((id) => id !== targetId),
  };
  const profiles = { ...state.profiles };
  const target = profiles[targetId] || getProfile(targetId);
  if (target) {
    profiles[targetId] = {
      ...target,
      followers: (target.followers || []).filter((id) => id !== user.id),
    };
  }
  state = { ...state, user: next, profiles };
  syncUserProfile(next);
  save(state);
  return next;
}

export function submitClipperApp(form) {
  const app = {
    id: 'clip_' + Date.now().toString(36),
    ...form,
    status: 'pending',
    at: Date.now(),
  };
  state = { ...state, clipperApps: [app, ...state.clipperApps] };
  save(state);
  return app;
}

/** t172u · Creator sell apply on Pricing (TEST MODE · localStorage only). */
export function submitCreatorSellApp(form) {
  const f = form || {};
  const name = String(f.name || '').trim().slice(0, 80);
  const contact = String(f.contact || f.email || f.handle || '').trim().slice(0, 120);
  const sells = String(f.sells || 'both').trim().slice(0, 40);
  const agreed = !!f.agreed;
  if (!name || !contact) return { error: 'missing' };
  if (!agreed) return { error: 'rules' };
  const app = {
    id: 'csa_' + Date.now().toString(36),
    name,
    contact,
    sells: ['music', 'merch', 'both'].includes(sells) ? sells : 'both',
    agreed: true,
    status: 'pending',
    at: Date.now(),
  };
  const creatorSellApps = [app, ...(state.creatorSellApps || [])].slice(0, 40);
  state = { ...state, creatorSellApps };
  save(state);
  return { ok: true, app };
}

export function setClipperStatus(appId, status) {
  const allowed = ['pending', 'approved', 'rejected', 'waitlisted'];
  if (!allowed.includes(status)) return { error: 'bad_status' };
  const clipperApps = state.clipperApps.map((a) =>
    a.id === appId ? { ...a, status, reviewedAt: Date.now() } : a
  );
  state = { ...state, clipperApps };
  save(state);
  return clipperApps.find((a) => a.id === appId);
}

export function setNotifPrefs(prefs) {
  state = { ...state, notifications: { ...state.notifications, ...prefs } };
  save(state);
}

export function markSplash() {
  state = { ...state, splashSeenAt: Date.now() };
  save(state);
}

export function shouldShowSplash() {
  // Show once per browser until cleared; revisit skips after seen
  return !state.splashSeenAt;
}

/** TEST MODE admin gate: user.role === 'admin' */
export function isAdmin() {
  return !!(state.user && state.user.role === 'admin');
}

/** Persist demo admin role on the signed-in user. */
export function setAdminRole(on = true) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const next = { ...user, role: on ? 'admin' : 'fan' };
  state = { ...state, user: next };
  syncUserProfile(next);
  save(state);
  return next;
}

/** Counts for admin dashboard (local demo only). */
export function getAdminStats() {
  const posts = state.posts || [];
  const apps = state.clipperApps || [];
  const byStatus = { pending: 0, approved: 0, rejected: 0, waitlisted: 0 };
  apps.forEach((a) => {
    const s = a.status || 'pending';
    if (byStatus[s] !== undefined) byStatus[s] += 1;
    else byStatus.pending += 1;
  });
  let likesTotal = 0;
  Object.values(state.likes || {}).forEach((arr) => {
    likesTotal += (arr || []).length;
  });
  let commentsTotal = 0;
  Object.values(state.comments || {}).forEach((arr) => {
    commentsTotal += (arr || []).length;
  });
  // Membership: signed-in user + any profiles that mirror membership
  let members = 0;
  if (state.user && (state.user.membership || state.user.memberships?.skeetPlus)) members += 1;
  Object.values(state.profiles || {}).forEach((p) => {
    if (p.id === state.user?.id) return;
    if (p.membership || p.memberships?.skeetPlus) members += 1;
  });
  const catalog = state.catalog || [];
  return {
    posts: posts.length,
    likes: likesTotal,
    comments: commentsTotal,
    clippers: apps.length,
    clipperByStatus: byStatus,
    members,
    profiles: Object.keys(state.profiles || {}).length,
    catalogTotal: catalog.length,
    catalogPublished: catalog.filter((c) => c.published).length,
  };
}




function normalizeStreamingLinks(raw) {
  const keys = ['spotify', 'apple', 'youtubeMusic', 'youtube', 'tidal', 'amazon'];
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const k of keys) {
    const v = String(raw[k] || '').trim();
    if (v.startsWith('http://') || v.startsWith('https://')) out[k] = v.slice(0, 500);
  }
  return out;
}

/** Admin catalog (metadata in localStorage; blobs in IndexedDB). */
export function listCatalog({ publishedOnly = false, types = null, includeUnpublishedForAdmin = false } = {}) {
  let items = state.catalog || [];
  if (publishedOnly) items = items.filter((c) => c.published);
  else if (!includeUnpublishedForAdmin) items = items.filter((c) => c.published);
  if (types && types.length) {
    const set = new Set(types);
    items = items.filter((c) => set.has(c.type));
  }
  return [...items].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export function getCatalogItem(id) {
  return (state.catalog || []).find((c) => c.id === id) || null;
}

export function addCatalogItem(item) {
  if (!isAdmin()) return { error: 'forbidden' };
  const id = item.id || 'cat_' + Date.now().toString(36);
  const entry = {
    id,
    type: item.type, // song | album | video | picture
    title: String(item.title || '').trim().slice(0, 120),
    artist: String(item.artist || 'DatBoiSkeet').trim().slice(0, 80),
    coverRef: item.coverRef || '',
    mediaRef: item.mediaRef || '',
    youtube: String(item.youtube || '').trim(),
    embed: String(item.embed || '').trim(),
    streamingLinks: normalizeStreamingLinks(item.streamingLinks),
    published: !!item.published,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    createdBy: state.user?.id || null,
  };
  if (!entry.title) return { error: 'title' };
  if (!['song', 'album', 'video', 'picture'].includes(entry.type)) return { error: 'type' };
  state = { ...state, catalog: [entry, ...(state.catalog || [])] };
  save(state);
  return entry;
}

export function updateCatalogItem(id, patch) {
  if (!isAdmin()) return { error: 'forbidden' };
  let found = null;
  const catalog = (state.catalog || []).map((c) => {
    if (c.id !== id) return c;
    const next = {
      ...c,
      ...patch,
      id: c.id,
      updatedAt: Date.now(),
    };
    if (patch && Object.prototype.hasOwnProperty.call(patch, 'streamingLinks')) {
      next.streamingLinks = normalizeStreamingLinks(patch.streamingLinks);
    }
    found = next;
    return found;
  });
  if (!found) return { error: 'missing' };
  state = { ...state, catalog };
  save(state);
  return found;
}

export function setCatalogPublished(id, published) {
  return updateCatalogItem(id, { published: !!published });
}

export function removeCatalogItem(id) {
  if (!isAdmin()) return { error: 'forbidden' };
  const catalog = (state.catalog || []).filter((c) => c.id !== id);
  state = { ...state, catalog };
  save(state);
  return true;
}


/** §3 Live — demo session (no real media) */
export function startLiveDemo(title) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  if (state.live && !state.live.endedAt) return { error: 'already_live', live: state.live };
  const live = {
    id: 'live_' + Date.now().toString(36),
    hostId: user.id,
    hostName: user.username,
    title: (title || 'DBS Live · TEST MODE').trim().slice(0, 80),
    startedAt: Date.now(),
    viewers: 3 + Math.floor(Math.random() * 18), // stub
    giftsTotal: 0,
    tipsTotal: 0,
    giftLog: [],
    chat: [
      {
        id: 'sys1',
        userId: 'system',
        username: 'DBS',
        text: 'Welcome · Follow DatBoiSkeet · TEST MODE (no real stream)',
        at: Date.now(),
      },
    ],
    endedAt: null,
  };
  state = { ...state, live };
  save(state);
  return live;
}

export function endLiveDemo() {
  if (!state.live || state.live.endedAt) return state.live;
  const live = { ...state.live, endedAt: Date.now() };
  const hist = [live, ...(state.liveHistory || [])].slice(0, 20);
  state = { ...state, live, liveHistory: hist };
  save(state);
  return live;
}

export function bumpLiveViewers() {
  if (!state.live || state.live.endedAt) return state.live;
  const delta = Math.floor(Math.random() * 5) - 1; // -1..3
  const viewers = Math.max(1, (state.live.viewers || 1) + delta);
  const live = { ...state.live, viewers };
  state = { ...state, live };
  save(state);
  return live;
}

export function sendLiveChat(text) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  if (!state.live || state.live.endedAt) return { error: 'offline' };
  const msg = {
    id: 'lc_' + Date.now().toString(36),
    userId: user.id,
    username: user.username,
    text: String(text || '').trim().slice(0, 280),
    at: Date.now(),
  };
  if (!msg.text) return { error: 'empty' };
  const live = { ...state.live, chat: [...(state.live.chat || []), msg] };
  state = { ...state, live };
  save(state);
  return msg;
}

/** Tip or gift during live — TEST MODE wallet debit when possible */
export function sendLiveSupport({ kind = 'tip', amount = 1, label = '' } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  if (!state.live || state.live.endedAt) return { error: 'offline' };
  const amt = Math.max(0.5, Number(amount) || 1);
  const k = kind === 'gift' ? 'gift' : 'tip';
  const bal = state.wallet?.balance || 0;
  let wallet = state.wallet || { balance: 0, history: [] };
  if (bal >= amt) {
    wallet = {
      balance: +(bal - amt).toFixed(2),
      history: [
        ...(wallet.history || []),
        { at: Date.now(), amount: -amt, note: `Live ${k} · ${state.live.title}` },
      ],
    };
  }
  const entry = {
    id: 'lg_' + Date.now().toString(36),
    userId: user.id,
    username: user.username,
    kind: k,
    amount: amt,
    label: (label || (k === 'gift' ? '🔥 Fire' : 'Tip')).slice(0, 40),
    at: Date.now(),
  };
  const chatMsg = {
    id: 'lc_' + Date.now().toString(36) + 'g',
    userId: user.id,
    username: user.username,
    text: k === 'gift' ? `sent ${entry.label} ($${amt.toFixed(2)}) · TEST MODE` : `tipped $${amt.toFixed(2)} · TEST MODE`,
    at: Date.now(),
    support: true,
  };
  const live = {
    ...state.live,
    giftsTotal: (state.live.giftsTotal || 0) + (k === 'gift' ? amt : 0),
    tipsTotal: (state.live.tipsTotal || 0) + (k === 'tip' ? amt : 0),
    giftLog: [...(state.live.giftLog || []), entry],
    chat: [...(state.live.chat || []), chatMsg],
  };
  state = { ...state, live, wallet };
  save(state);
  // Mirror redeemable creator share only when fan credits were debited · TEST MODE
  if (bal >= amt) {
    creditCreatorEarning({
      category: k === 'gift' ? 'gifts' : 'tips',
      gross: amt,
      note: `Live ${k} from @${user.username} · ${state.live.title}`,
      source: 'live',
    });
  }
  return { live, entry, wallet: state.wallet, creatorWallet: state.creatorWallet };
}

export function getLiveHistory() {
  return state.liveHistory || [];
}

/** t180u · Song request packs during Live (TEST MODE) */
export const LIVE_SONG_REQUEST_PACKS = [
  { pack: 1, price: 10, label: '1 song', save: 0 },
  { pack: 2, price: 25, label: '2 songs', save: 0 },
  { pack: 3, price: 45, label: '3 songs', save: 5 }, // Save $5 vs $50
];

function songRequestBucket() {
  return Array.isArray(state.liveSongRequests) ? state.liveSongRequests : [];
}

export function listLiveSongRequests(liveId) {
  const id = liveId || state.live?.id;
  if (!id) return [];
  return songRequestBucket().filter((r) => r.liveId === id);
}

/** Flatten queue items for a live (one row per song title). */
export function listLiveSongRequestQueue(liveId) {
  const rows = [];
  for (const req of listLiveSongRequests(liveId)) {
    (req.titles || []).forEach((title, idx) => {
      rows.push({
        requestId: req.id,
        songIndex: idx,
        title,
        status: (req.songStatuses && req.songStatuses[idx]) || 'queued',
        username: req.username,
        userId: req.userId,
        pack: req.pack,
        price: req.price,
        at: req.at,
      });
    });
  }
  return rows;
}

/**
 * Submit a paid song request during an active live.
 * Debits fan wallet (TEST MODE). Requires exact pack size titles.
 */
export function submitLiveSongRequest({ pack, titles } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  if (!state.live || state.live.endedAt) return { error: 'offline' };
  const packDef = LIVE_SONG_REQUEST_PACKS.find((p) => p.pack === Number(pack));
  if (!packDef) return { error: 'bad_pack' };
  const cleaned = (Array.isArray(titles) ? titles : [])
    .map((t) => String(t || '').trim().slice(0, 80))
    .filter(Boolean);
  if (cleaned.length !== packDef.pack) {
    return { error: 'title_count', need: packDef.pack, got: cleaned.length };
  }
  const spent = spendWallet(
    packDef.price,
    `Song request ×${packDef.pack} · ${state.live.title} · TEST MODE`
  );
  if (spent?.error === 'insufficient') {
    return {
      error: 'insufficient',
      need: packDef.price,
      balance: Number(state.wallet?.balance || 0),
    };
  }
  const entry = {
    id: 'lsr_' + Date.now().toString(36),
    liveId: state.live.id,
    hostId: state.live.hostId,
    userId: user.id,
    username: user.username,
    pack: packDef.pack,
    price: packDef.price,
    titles: cleaned,
    songStatuses: cleaned.map(() => 'queued'),
    status: 'open',
    at: Date.now(),
    charged: packDef.price,
  };
  const liveSongRequests = [entry, ...songRequestBucket()].slice(0, 200);
  const chatMsg = {
    id: 'lc_' + Date.now().toString(36) + 'sr',
    userId: user.id,
    username: user.username,
    text: `requested ${packDef.pack} song${packDef.pack > 1 ? 's' : ''} ($${packDef.price}) · TEST MODE`,
    at: Date.now(),
    support: true,
  };
  const live = {
    ...state.live,
    chat: [...(state.live.chat || []), chatMsg],
  };
  state = { ...state, liveSongRequests, live };
  save(state);
  // Creator share — song requests use tips-like 90/10 in TEST MODE
  creditCreatorEarning({
    category: 'tips',
    gross: packDef.price,
    note: `Song request ×${packDef.pack} from @${user.username} · ${state.live.title}`,
    source: 'live_song_request',
  });
  return { ok: true, entry, wallet: state.wallet, live: state.live };
}

/** Host Play / Skip a queued song on the active (or given) live. */
export function updateLiveSongRequestSong(requestId, songIndex, nextStatus) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const allowed = ['playing', 'played', 'skipped', 'queued'];
  if (!allowed.includes(nextStatus)) return { error: 'bad_status' };
  const idx = songRequestBucket().findIndex((r) => r.id === requestId);
  if (idx < 0) return { error: 'missing' };
  const req = songRequestBucket()[idx];
  const live = state.live;
  const isHost =
    (live && live.hostId === user.id && live.id === req.liveId) || user.id === req.hostId;
  if (!isHost && !isAdmin()) return { error: 'host_only' };
  const si = Number(songIndex);
  if (!Number.isInteger(si) || si < 0 || si >= (req.titles || []).length) {
    return { error: 'bad_index' };
  }
  let songStatuses = [...(req.songStatuses || req.titles.map(() => 'queued'))];
  // Only one playing at a time per live — demote other playing → played
  if (nextStatus === 'playing') {
    const updatedAll = songRequestBucket().map((r) => {
      if (r.liveId !== req.liveId) return r;
      const ss = [...(r.songStatuses || (r.titles || []).map(() => 'queued'))];
      let changed = false;
      for (let i = 0; i < ss.length; i++) {
        if (ss[i] === 'playing') {
          ss[i] = 'played';
          changed = true;
        }
      }
      if (!changed) return r;
      const allDone = ss.every((s) => s === 'played' || s === 'skipped');
      return { ...r, songStatuses: ss, status: allDone ? 'done' : 'open' };
    });
    state = { ...state, liveSongRequests: updatedAll };
    songStatuses = [...(state.liveSongRequests[idx]?.songStatuses || songStatuses)];
  }
  songStatuses[si] = nextStatus;
  const allDone = songStatuses.every((s) => s === 'played' || s === 'skipped');
  const nextReq = {
    ...state.liveSongRequests[idx],
    songStatuses,
    status: allDone ? 'done' : 'open',
  };
  const liveSongRequests = [...state.liveSongRequests];
  liveSongRequests[idx] = nextReq;
  state = { ...state, liveSongRequests };
  save(state);
  return { ok: true, entry: nextReq };
}

export function playLiveSongRequest(requestId, songIndex) {
  return updateLiveSongRequestSong(requestId, songIndex, 'playing');
}

export function skipLiveSongRequest(requestId, songIndex) {
  return updateLiveSongRequestSong(requestId, songIndex, 'skipped');
}

export function completeLiveSongRequest(requestId, songIndex) {
  return updateLiveSongRequestSong(requestId, songIndex, 'played');
}

/** t185u · Live gifts catalog (from docs/gifts/gifts_catalog.csv) · coins @ 100 = $2 */
export const LIVE_GIFT_CATALOG = [
  { slug: 'rose', name: 'DBS Rose', coins: 5, usd: 0.1, animation: 'Rotating glossy rose and petals', tier: 'small' },
  { slug: 'big-love', name: 'Big Love', coins: 25, usd: 0.5, animation: 'Pulsing luminous heart', tier: 'small' },
  { slug: 'turn-up', name: 'Turn Up', coins: 50, usd: 1, animation: 'Flame burst and DBS sparks', tier: 'small' },
  { slug: 'cash-rain', name: 'Cash Rain', coins: 150, usd: 3, animation: 'Stylized bills and confetti', tier: 'mid' },
  { slug: 'bottle-pop', name: 'Bottle Pop', coins: 300, usd: 6, animation: 'Bottle pop and confetti', tier: 'mid' },
  { slug: 'money-gun', name: 'Money Gun', coins: 750, usd: 15, animation: 'Stylized cash launcher', tier: 'premium' },
  { slug: 'diamond-drip', name: 'Diamond Drip', coins: 1500, usd: 30, animation: 'Rotating diamond', tier: 'premium' },
  { slug: 'foreign-whip', name: 'Foreign Whip', coins: 3000, usd: 60, animation: 'Original luxury vehicle drives across screen', tier: 'premium' },
  { slug: 'helicopter', name: 'Helicopter', coins: 5000, usd: 100, animation: 'Helicopter spotlight flyover', tier: 'cinematic' },
  { slug: 'private-jet', name: 'Private Jet', coins: 10000, usd: 200, animation: 'Jet cinematic flyover', tier: 'cinematic' },
  { slug: 'dbs-crown', name: 'DBS Crown', coins: 25000, usd: 500, animation: 'Gold diamond crown', tier: 'cinematic' },
  { slug: 'dbs-universe', name: 'DBS Universe', coins: 50000, usd: 1000, animation: 'Galaxy DBS logo reveal', tier: 'cinematic' },
];

/** Coin packages — transparent pricing, no discount assumed (TEST MODE local credit) */
export const COIN_PACKAGES = [
  { coins: 100, usd: 2 },
  { coins: 500, usd: 10 },
  { coins: 1000, usd: 20 },
  { coins: 2500, usd: 50 },
  { coins: 5000, usd: 100 },
  { coins: 10000, usd: 200 },
];

/** Confirm spend at Money Gun+ (≥750 coins / ≥$15) */
export const LIVE_GIFT_CONFIRM_COINS = 750;

const GIFT_CREATOR_PCT = 80;
const GIFT_DBS_PCT = 20;

function normalizeCoins(raw) {
  return {
    balance: Math.max(0, Number(raw?.balance) || 0),
    history: Array.isArray(raw?.history) ? raw.history : [],
  };
}

export function getCoinBalance() {
  return normalizeCoins(state.coins).balance;
}

export function listCoinPacks() {
  return COIN_PACKAGES.map((p) => ({ ...p }));
}

/** Alias for Commerce Wallet UI */
export function listLiveGiftCatalog() {
  return LIVE_GIFT_CATALOG.map((g) => ({ ...g }));
}

export function getGiftCatalog() {
  return listLiveGiftCatalog();
}

/**
 * Buy coins package — TEST MODE local credit (no real processor).
 * @param {number} packageCoins — must match COIN_PACKAGES.coins
 */
export function buyCoins(packageCoins) {
  const pack = COIN_PACKAGES.find((p) => p.coins === Number(packageCoins));
  if (!pack) return { error: 'bad_package' };
  const coins = normalizeCoins(state.coins);
  const entry = {
    at: Date.now(),
    amount: pack.coins,
    note: `Bought ${pack.coins} coins ($${pack.usd}) · TEST MODE`,
    kind: 'buy',
    packageCoins: pack.coins,
    usd: pack.usd,
  };
  const next = {
    balance: coins.balance + pack.coins,
    history: [entry, ...coins.history].slice(0, 200),
  };
  state = { ...state, coins: next };
  save(state);
  return { ok: true, coins: next, pack, entry };
}

/** Compatibility alias — packId `pack_100` or raw coin count */
export function purchaseCoinPack(packId) {
  const n = Number(String(packId).replace(/^pack_/, ''));
  return buyCoins(n);
}

function giftLedgerBucket() {
  return Array.isArray(state.liveGiftLedger) ? state.liveGiftLedger : [];
}

/**
 * Viewer-safe gift history for a live (no revenue split fields).
 * Creator/admin should use listCreatorGiftEarnings / liveGiftLedger.
 */
export function listLiveGiftHistory(liveId) {
  const id = liveId || state.live?.id;
  if (!id) return [];
  return giftLedgerBucket()
    .filter((g) => g.liveId === id)
    .map((g) => ({
      id: g.id,
      liveId: g.liveId,
      giftSlug: g.giftSlug,
      giftName: g.giftName,
      coins: g.coins,
      usd: g.usd,
      fromUserId: g.fromUserId,
      fromUser: g.fromUser,
      at: g.at,
      animation: g.animation,
      tier: g.tier,
    }));
}

/** t199u · Top gifters for local calendar day (by USD paid, then coins). Cap 10. */
export function listTopGiftersToday(limit = 10, now = Date.now()) {
  const cap = Math.min(Math.max(1, Number(limit) || 10), 10);
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const startMs = start.getTime();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const endMs = end.getTime();
  const byUser = {};
  for (const g of giftLedgerBucket()) {
    const at = Number(g.at || 0);
    if (at < startMs || at > endMs) continue;
    const uid = g.fromUserId || g.fromUser || 'anon';
    const row = byUser[uid] || {
      userId: uid,
      username: g.fromUser || uid,
      usd: 0,
      coins: 0,
      gifts: 0,
      lastSlug: g.giftSlug || 'rose',
    };
    row.usd = +(row.usd + Number(g.usd || 0)).toFixed(2);
    row.coins += Number(g.coins || 0);
    row.gifts += 1;
    row.username = g.fromUser || row.username;
    row.lastSlug = g.giftSlug || row.lastSlug;
    byUser[uid] = row;
  }
  return Object.values(byUser)
    .sort((a, b) => b.usd - a.usd || b.coins - a.coins || a.username.localeCompare(b.username))
    .slice(0, cap);
}


/** Creator-facing gift earnings (includes 80/20 split). Optional userId filter unused in single-demo wallet. */
export function listCreatorGiftEarnings(userId) {
  const cw = normalizeCreatorWallet(state.creatorWallet);
  let rows = (cw.earnings || []).filter((e) => e.category === 'gifts');
  if (userId) {
    // Demo single creatorWallet — keep rows; filter by host if ledger has hostId match via source note
    rows = rows.filter((e) => !e.hostId || e.hostId === userId);
  }
  return rows.map((e) => ({ ...e }));
}

/**
 * Send a catalog gift during an active live.
 * Debits coins; credits creator at 80% of NET. TEST MODE: catalog USD treated as net (fees=0).
 * Viewers never see creatorShare / dbsShare in listLiveGiftHistory.
 */
export function sendLiveGift({ liveId, slug } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const live = state.live;
  if (!live || live.endedAt) return { error: 'offline' };
  if (liveId && liveId !== live.id) return { error: 'live_mismatch' };
  const gift = LIVE_GIFT_CATALOG.find((g) => g.slug === slug);
  if (!gift) return { error: 'bad_gift' };
  const coins = normalizeCoins(state.coins);
  if (coins.balance < gift.coins) {
    return { error: 'insufficient', need: gift.coins, balance: coins.balance };
  }
  const usd = round2(gift.usd);
  // TEST MODE honesty: listed USD = NET eligible (0% extra external fee on gift send)
  const fees = 0;
  const net = usd;
  const creatorShare = round2((net * GIFT_CREATOR_PCT) / 100);
  const platformShare = round2(net - creatorShare);
  const at = Date.now();
  const id = 'lgift_' + at.toString(36) + '_' + Math.random().toString(36).slice(2, 6);

  const coinHist = {
    at,
    amount: -gift.coins,
    note: `Gift ${gift.name} · ${live.title} · TEST MODE`,
    kind: 'gift',
    giftSlug: gift.slug,
    liveId: live.id,
    usd,
  };
  const nextCoins = {
    balance: coins.balance - gift.coins,
    history: [coinHist, ...coins.history].slice(0, 200),
  };

  const ledgerRow = {
    id,
    liveId: live.id,
    hostId: live.hostId,
    giftSlug: gift.slug,
    giftName: gift.name,
    coins: gift.coins,
    usd,
    fees,
    net,
    creatorShare,
    platformShare,
    dbsShare: platformShare,
    creatorPct: GIFT_CREATOR_PCT,
    dbsPct: GIFT_DBS_PCT,
    fromUserId: user.id,
    fromUser: user.username,
    at,
    animation: gift.animation,
    tier: gift.tier,
    testModeNetAsListed: true,
  };

  const viewerEntry = {
    id,
    userId: user.id,
    username: user.username,
    kind: 'gift',
    giftSlug: gift.slug,
    label: gift.name,
    amount: usd,
    coins: gift.coins,
    at,
  };

  const chatMsg = {
    id: 'lc_' + at.toString(36) + 'gf',
    userId: user.id,
    username: user.username,
    text: `sent ${gift.name} (${gift.coins} coins) · TEST MODE`,
    at,
    support: true,
    giftSlug: gift.slug,
  };

  const nextLive = {
    ...live,
    giftsTotal: round2((live.giftsTotal || 0) + usd),
    giftLog: [...(live.giftLog || []), viewerEntry],
    chat: [...(live.chat || []), chatMsg],
  };

  const liveGiftLedger = [ledgerRow, ...giftLedgerBucket()].slice(0, 500);

  // Credit creator redeemable share — treat listed USD as net (fees already 0)
  const cw = normalizeCreatorWallet(state.creatorWallet);
  const earning = {
    id: 'earn_' + at.toString(36) + '_' + Math.random().toString(36).slice(2, 6),
    category: 'gifts',
    label: 'Live gifts',
    note: `Live gift ${gift.name} from @${user.username} · ${live.title}`,
    gross: usd,
    fees,
    net,
    creatorPct: GIFT_CREATOR_PCT,
    dbsPct: GIFT_DBS_PCT,
    creatorShare,
    dbsShare: platformShare,
    source: 'live_gift',
    giftSlug: gift.slug,
    giftId: id,
    liveId: live.id,
    hostId: live.hostId,
    fromUserId: user.id,
    at,
    payoutId: null,
  };
  const creatorWallet = {
    ...cw,
    available: round2(cw.available + creatorShare),
    earnings: [earning, ...(cw.earnings || [])],
  };

  const liveGbChallengePop = {
    id: 'gbpop_' + at.toString(36),
    liveId: live.id,
    fromUserId: user.id,
    fromUser: user.username,
    giftSlug: gift.slug,
    giftName: gift.name,
    coins: gift.coins,
    usd,
    at,
    expiresAt: at + 60_000,
  };

  state = {
    ...state,
    coins: nextCoins,
    live: nextLive,
    liveGiftLedger,
    creatorWallet,
    liveGbChallengePop,
  };
  save(state);
  return {
    ok: true,
    entry: ledgerRow,
    viewerEntry,
    coins: nextCoins,
    live: nextLive,
    earning,
    creatorWallet,
    challengePop: liveGbChallengePop,
  };
}

/** Alias */
export function sendGift(opts) {
  return sendLiveGift(opts);
}

/* ── t255u · Daily goals (app + live) · HARD LOCK: donateToGoal(goalId, amountCoins) ── */
const DAY_MS = 24 * 60 * 60 * 1000;
/** 100 coins = $2 → USD = coins / 50 */
const COINS_PER_USD = 50;

function normalizeDailyGoals(raw) {
  return {
    app: raw?.app && typeof raw.app === 'object' ? raw.app : null,
    liveByHost:
      raw?.liveByHost && typeof raw.liveByHost === 'object' ? { ...raw.liveByHost } : {},
    history: Array.isArray(raw?.history) ? raw.history : [],
  };
}

function goalIsActive(g, now = Date.now()) {
  if (!g || typeof g !== 'object') return false;
  const ends = Number(g.endsAt) || 0;
  return ends > now;
}

function cloneGoal(g) {
  return g ? { ...g } : null;
}

function makeGoalId(scope) {
  return (
    'goal_' +
    scope +
    '_' +
    Date.now().toString(36) +
    '_' +
    Math.random().toString(36).slice(2, 6)
  );
}

function archiveGoal(bucket, goal) {
  if (!goal) return bucket;
  const history = [{ ...goal, archivedAt: Date.now() }, ...(bucket.history || [])].slice(0, 40);
  return { ...bucket, history };
}

function seedDemoAppGoalObj(now = Date.now()) {
  return {
    id: makeGoalId('app'),
    scope: 'app',
    name: 'PIKK daily community goal',
    targetAmount: 50,
    raised: 0,
    endsAt: now + DAY_MS,
    createdAt: now,
  };
}

function persistDailyGoals(bucket) {
  state = { ...state, dailyGoals: bucket };
  save(state);
  return bucket;
}

/**
 * Current non-expired app-wide daily goal.
 * Seeds a demo app goal when none is active so Design Home is never empty.
 */
export function getAppDailyGoal(now = Date.now()) {
  let bucket = normalizeDailyGoals(state.dailyGoals);
  let changed = false;
  if (bucket.app && !goalIsActive(bucket.app, now)) {
    bucket = { ...archiveGoal(bucket, bucket.app), app: null };
    changed = true;
  }
  if (!goalIsActive(bucket.app, now)) {
    bucket = { ...bucket, app: seedDemoAppGoalObj(now) };
    changed = true;
  }
  if (changed) persistDailyGoals(bucket);
  // Migrate legacy seeded branding without resetting progress or its 24h timer.
  if (bucket.app && bucket.app.name === 'DBS daily community goal') {
    bucket = { ...bucket, app: { ...bucket.app, name: 'PIKK daily community goal' } };
    persistDailyGoals(bucket);
  }
  return cloneGoal(bucket.app);
}

/** Admin/demo: create or replace app goal with a fresh 24h window. */
export function setAppDailyGoal({ name, targetAmount } = {}) {
  const n = String(name || '').trim().slice(0, 80);
  const target = Number(targetAmount);
  if (!n) return { error: 'bad_name' };
  if (!Number.isFinite(target) || target <= 0) return { error: 'bad_amount' };
  const now = Date.now();
  let bucket = normalizeDailyGoals(state.dailyGoals);
  if (bucket.app) bucket = archiveGoal(bucket, bucket.app);
  const goal = {
    id: makeGoalId('app'),
    scope: 'app',
    name: n,
    targetAmount: round2(target),
    raised: 0,
    endsAt: now + DAY_MS,
    createdAt: now,
  };
  bucket = { ...bucket, app: goal };
  persistDailyGoals(bucket);
  return { ok: true, goal: cloneGoal(goal) };
}

/**
 * Active live-scope goal for a host (default: current live host or signed-in user).
 * Expired goals are cleared from the active slot.
 */
export function getLiveDailyGoal(hostId, now = Date.now()) {
  const hid =
    hostId ||
    state.live?.hostId ||
    state.user?.id ||
    null;
  if (!hid) return null;
  let bucket = normalizeDailyGoals(state.dailyGoals);
  const cur = bucket.liveByHost[hid] || null;
  if (cur && !goalIsActive(cur, now)) {
    const liveByHost = { ...bucket.liveByHost };
    delete liveByHost[hid];
    bucket = { ...archiveGoal(bucket, cur), liveByHost };
    persistDailyGoals(bucket);
    return null;
  }
  return cloneGoal(goalIsActive(cur, now) ? cur : null);
}

/** Signed-in host sets/replaces their 24h Live goal (edit = new 24h window). */
export function setLiveDailyGoal({ name, targetAmount } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const n = String(name || '').trim().slice(0, 80);
  const target = Number(targetAmount);
  if (!n) return { error: 'bad_name' };
  if (!Number.isFinite(target) || target <= 0) return { error: 'bad_amount' };
  const now = Date.now();
  let bucket = normalizeDailyGoals(state.dailyGoals);
  const prev = bucket.liveByHost[user.id];
  if (prev) bucket = archiveGoal(bucket, prev);
  const goal = {
    id: makeGoalId('live'),
    scope: 'live',
    hostId: user.id,
    hostName: user.username,
    name: n,
    targetAmount: round2(target),
    raised: 0,
    endsAt: now + DAY_MS,
    createdAt: now,
  };
  bucket = {
    ...bucket,
    liveByHost: { ...bucket.liveByHost, [user.id]: goal },
  };
  persistDailyGoals(bucket);
  return { ok: true, goal: cloneGoal(goal) };
}

/** Active live-scope goals (non-expired) for Design Home / listings. */
export function listLiveDailyGoals(now = Date.now()) {
  let bucket = normalizeDailyGoals(state.dailyGoals);
  const liveByHost = { ...bucket.liveByHost };
  let changed = false;
  const out = [];
  for (const [hid, g] of Object.entries(liveByHost)) {
    if (goalIsActive(g, now)) {
      out.push(cloneGoal(g));
    } else if (g) {
      bucket = archiveGoal(bucket, g);
      delete liveByHost[hid];
      changed = true;
    }
  }
  if (changed) {
    bucket = { ...bucket, liveByHost };
    persistDailyGoals(bucket);
  }
  return out.sort((a, b) => (b.raised || 0) - (a.raised || 0) || (a.name || '').localeCompare(b.name || ''));
}

/** Debug / optional: all active goals (app + live). */
export function listDailyGoals(now = Date.now()) {
  const app = getAppDailyGoal(now);
  const live = listLiveDailyGoals(now);
  return [...(app ? [app] : []), ...live];
}

/**
 * HARD LOCK — donateToGoal(goalId, amountCoins).
 * Second arg is COINS. raised/targetAmount stay USD; add amountCoins/50 to raised.
 * 100 coins = $2. Caps debit to remaining USD (no over-charge past target); completed → error.
 * Returns { ok, goal, coins, donated } or { error: signin|invalid_amount|unknown_goal|expired|insufficient|completed }.
 */
export function donateToGoal(goalId, amountCoins, options = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const coinsAmt = Math.floor(Number(amountCoins));
  if (!Number.isFinite(coinsAmt) || coinsAmt <= 0) return { error: 'invalid_amount' };
  const id = String(goalId || '');
  if (!id) return { error: 'unknown_goal' };

  const now = Date.now();
  let bucket = normalizeDailyGoals(state.dailyGoals);

  // Resolve goal location
  let scope = null;
  let hostKey = null;
  let goal = null;
  if (bucket.app && bucket.app.id === id) {
    scope = 'app';
    goal = bucket.app;
  } else {
    for (const [hid, g] of Object.entries(bucket.liveByHost)) {
      if (g && g.id === id) {
        scope = 'live';
        hostKey = hid;
        goal = g;
        break;
      }
    }
  }
  if (!goal) return { error: 'unknown_goal' };
  if (!goalIsActive(goal, now)) return { error: 'expired' };

  const target = Number(goal.targetAmount) || 0;
  const already = Number(goal.raised) || 0;
  if (goal.completedAt || (target > 0 && already >= target)) {
    return { error: 'completed', goal: cloneGoal(goal) };
  }

  // Cap debit to remaining USD → coins (ceil) so we don't over-charge past target
  let applyCoins = coinsAmt;
  if (target > 0) {
    const remainingUsd = Math.max(0, round2(target - already));
    const maxCoins = Math.ceil(remainingUsd * COINS_PER_USD);
    if (maxCoins <= 0) return { error: 'completed', goal: cloneGoal(goal) };
    if (applyCoins > maxCoins) applyCoins = maxCoins;
  }

  const coins = normalizeCoins(state.coins);
  if (coins.balance < applyCoins) {
    return { error: 'insufficient', need: applyCoins, balance: coins.balance };
  }

  const donatedUsd = round2(applyCoins / COINS_PER_USD);
  const nextRaised = round2(already + donatedUsd);
  const completedAt = target > 0 && nextRaised >= target ? now : goal.completedAt;
  const nextGoal = {
    ...goal,
    raised: target > 0 ? Math.min(nextRaised, round2(target)) : nextRaised,
    ...(completedAt ? { completedAt } : {}),
  };

  // Optional supporter message is stored only in this browser's demo coin history.
  const message = String(options?.message || '').trim().slice(0, 180);
  const coinHist = {
    at: now,
    amount: -applyCoins,
    note: `Goal donate · ${goal.name} · $${donatedUsd.toFixed(2)} · TEST MODE`,
    kind: 'goal',
    goalId: goal.id,
    ...(message ? { message } : {}),
    usd: donatedUsd,
  };
  const nextCoins = {
    balance: coins.balance - applyCoins,
    history: [coinHist, ...coins.history].slice(0, 200),
  };

  if (scope === 'app') {
    bucket = { ...bucket, app: nextGoal };
  } else {
    bucket = {
      ...bucket,
      liveByHost: { ...bucket.liveByHost, [hostKey]: nextGoal },
    };
  }

  state = { ...state, dailyGoals: bucket, coins: nextCoins };
  save(state);
  return {
    ok: true,
    goal: cloneGoal(nextGoal),
    coins: nextCoins,
    donated: { coins: applyCoins, usd: donatedUsd, requested: coinsAmt, message },
  };
}

/** §4 Marketplace — brand applications */
export function submitBrandApp(form) {
  const user = state.user;
  const app = {
    id: 'brand_' + Date.now().toString(36),
    brand: String(form.brand || '').trim().slice(0, 80),
    contact: String(form.contact || '').trim().slice(0, 120),
    email: String(form.email || '').trim().slice(0, 120),
    campaign: String(form.campaign || 'sponsored_post').trim().slice(0, 40),
    budget: String(form.budget || '').trim().slice(0, 40),
    pitch: String(form.pitch || '').trim().slice(0, 500),
    url: String(form.url || '').trim().slice(0, 300),
    applicantUserId: user?.id || null,
    status: 'pending',
    at: Date.now(),
  };
  if (!app.brand || !app.email) return { error: 'required' };
  state = { ...state, brandApps: [app, ...state.brandApps] };
  save(state);
  return app;
}

export function setBrandStatus(appId, status) {
  const allowed = ['pending', 'approved', 'rejected'];
  if (!allowed.includes(status)) return { error: 'bad_status' };
  const brandApps = state.brandApps.map((a) =>
    a.id === appId ? { ...a, status, reviewedAt: Date.now() } : a
  );
  state = { ...state, brandApps };
  save(state);
  return brandApps.find((a) => a.id === appId);
}

/** Sponsored listing demo (localStorage) */
export function addSponsoredListing(form) {
  const user = state.user;
  const listing = {
    id: 'list_' + Date.now().toString(36),
    title: String(form.title || '').trim().slice(0, 80),
    brand: String(form.brand || '').trim().slice(0, 80),
    blurb: String(form.blurb || '').trim().slice(0, 280),
    url: String(form.url || '').trim().slice(0, 300),
    disclosure: String(form.disclosure || 'Paid partnership · TEST MODE').trim().slice(0, 120),
    brandAppId: form.brandAppId || null,
    createdBy: user?.id || null,
    active: true,
    at: Date.now(),
  };
  if (!listing.title || !listing.brand) return { error: 'required' };
  state = { ...state, listings: [listing, ...(state.listings || [])] };
  save(state);
  return listing;
}

export function setListingActive(id, active) {
  const listings = (state.listings || []).map((l) =>
    l.id === id ? { ...l, active: !!active } : l
  );
  state = { ...state, listings };
  save(state);
  return listings.find((l) => l.id === id);
}

export function listSponsoredListings({ activeOnly = false } = {}) {
  const all = state.listings || [];
  return activeOnly ? all.filter((l) => l.active) : all;
}

/** §18 Messages — local threads */
function threadIdFor(peerId) {
  const uid = state.user?.id || 'guest';
  return [uid, peerId].sort().join('__');
}

export function listThreads() {
  const user = state.user;
  if (!user) return [];
  return Object.values(state.threads || {})
    .filter((t) => t.participants?.includes(user.id))
    .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

/** t210u · unread = inbound msgs after thread.lastReadAt (0 if never opened). */
export function getThreadUnreadCount(thread) {
  const user = state.user;
  if (!user || !thread) return 0;
  if (thread.muted || thread.blocked) return 0;
  const lastRead = thread.lastReadAt || 0;
  return (thread.messages || []).filter((m) => m.from !== user.id && (m.at || 0) > lastRead).length;
}

export function getUnreadMessageCount() {
  return listThreads().reduce((n, t) => n + getThreadUnreadCount(t), 0);
}

export function markThreadRead(threadId) {
  const user = state.user;
  if (!user || !threadId) return null;
  const t0 = state.threads[threadId];
  if (!t0 || !(t0.participants || []).includes(user.id)) return null;
  const t = { ...t0, lastReadAt: Date.now() };
  state = { ...state, threads: { ...state.threads, [t.id]: t }, demoUnreadSeeded: true };
  save(state);
  // t212u · refresh Messages tab badge without waiting for next buildTabbar
  try {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('dbs:messages-unread', { detail: { count: getUnreadMessageCount() } }));
    }
  } catch (_) {
    /* non-DOM (tests) */
  }
  return state.threads[t.id];
}

/** Seed demo inbound DMs once so Messages badge can show a number.
 * Never rewound after the user marks a thread read (t212u Checker REJECT fix).
 */
export function ensureDemoUnreadMessages() {
  const user = state.user;
  if (!user) return { seeded: false };
  ensureDemoMessageContacts();
  // One-shot flag — do not re-seed or rewind lastReadAt after user clears unread
  if (state.demoUnreadSeeded) {
    return { seeded: false, count: getUnreadMessageCount(), once: true };
  }
  if (getUnreadMessageCount() > 0) {
    state = { ...state, demoUnreadSeeded: true };
    save(state);
    return { seeded: false, count: getUnreadMessageCount() };
  }
  const peerId = 'maya';
  const peerName = (state.profiles?.maya || {}).username || 'MayaBeats';
  const t0 = getOrCreateThread(peerId, peerName);
  if (t0.error) return t0;
  const existing = state.threads[t0.id];
  const hasInbound = (existing.messages || []).some((m) => m.from !== user.id);
  if (hasInbound) {
    // Never rewind after any user read (lastReadAt > 0) or full catch-up
    const inboundAts = (existing.messages || []).filter((m) => m.from !== user.id).map((m) => m.at || 0);
    const lastRead = existing.lastReadAt || 0;
    const alreadyRead = lastRead >= Math.max(...inboundAts, 0);
    if (alreadyRead || lastRead > 0) {
      state = { ...state, demoUnreadSeeded: true };
      save(state);
      return { seeded: false, count: getUnreadMessageCount() };
    }
    // First seed only: force unread once, then lock the flag
    const minAt = Math.min(...inboundAts);
    const t = { ...existing, lastReadAt: Math.max(0, minAt - 1) };
    state = { ...state, threads: { ...state.threads, [t.id]: t }, demoUnreadSeeded: true };
    save(state);
    return { seeded: true, count: getUnreadMessageCount() };
  }
  const now = Date.now();
  const msgs = [
    {
      id: 'm_demo_unread_1',
      from: peerId,
      fromName: peerName,
      text: 'Yo — drop coming Friday. You in for the listening party?',
      at: now - 1000 * 60 * 12,
    },
    {
      id: 'm_demo_unread_2',
      from: peerId,
      fromName: peerName,
      text: 'Also sent a beat pack in the vault 🔥',
      at: now - 1000 * 60 * 5,
    },
  ];
  const t = {
    ...existing,
    messages: [...(existing.messages || []), ...msgs],
    updatedAt: now - 1000 * 60 * 5,
    lastReadAt: 0,
    request: false,
  };
  state = { ...state, threads: { ...state.threads, [t.id]: t }, demoUnreadSeeded: true };
  save(state);
  return { seeded: true, count: getUnreadMessageCount() };
}

export function getThread(threadId) {
  return (state.threads || {})[threadId] || null;
}

export function isMutualFollow(peerId) {
  const user = state.user;
  if (!user || !peerId) return false;
  const peer = state.profiles?.[peerId];
  if (!peer) return false;
  return (user.following || []).includes(peerId) && (peer.following || []).includes(user.id);
}

export function getOrCreateThread(peerId, peerName) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const id = threadIdFor(peerId);
  let t = state.threads[id];
  if (!t) {
    const mutual = peerId === 'dbs' || isMutualFollow(peerId);
    t = {
      id,
      kind: 'dm',
      participants: [user.id, peerId],
      peerId,
      peerName: peerName || peerId,
      messages: [],
      updatedAt: Date.now(),
      request: !mutual,
      muted: false,
      blocked: false,
    };
    state = { ...state, threads: { ...state.threads, [id]: t } };
    save(state);
  }
  return t;
}

export function sendMessage(peerId, peerName, text, { priority = false } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const body = String(text || '').trim().slice(0, 500);
  if (!body) return { error: 'empty' };
  const t0 = getOrCreateThread(peerId, peerName);
  if (t0.error) return t0;
  const msg = {
    id: 'm_' + Date.now().toString(36),
    from: user.id,
    fromName: user.username,
    text: body,
    at: Date.now(),
    priority: !!priority,
  };
  const t = {
    ...state.threads[t0.id],
    messages: [...(state.threads[t0.id].messages || []), msg],
    updatedAt: Date.now(),
    peerName: peerName || state.threads[t0.id].peerName,
  };
  state = { ...state, threads: { ...state.threads, [t.id]: t } };
  // Priority inquiry: TEST MODE fee chip only — no real charge; optional demo wallet note
  if (priority) {
    const w = state.wallet || { balance: 0, history: [] };
    state = {
      ...state,
      wallet: {
        balance: w.balance,
        history: [
          ...(w.history || []),
          { at: Date.now(), amount: 0, note: 'Priority message · TEST MODE $2.99 (not charged)' },
        ],
      },
    };
  }
  save(state);
  return { thread: state.threads[t.id], message: msg };
}

/** Seed demo contacts for Messages (idempotent). */
export function ensureDemoMessageContacts() {
  const profiles = { ...(state.profiles || {}) };
  let changed = false;
  if (!profiles.maya) {
    profiles.maya = {
      id: 'maya',
      username: 'MayaBeats',
      bio: 'Creator · beats & live demos',
      avatar: '',
      followers: [],
      following: ['dbs'],
      verified: false,
    };
    changed = true;
  }
  if (!profiles.fanjay) {
    profiles.fanjay = {
      id: 'fanjay',
      username: 'FanJay',
      bio: 'Day-one fan · playlist curator',
      avatar: '',
      followers: [],
      following: ['dbs'],
      verified: false,
    };
    changed = true;
  }
  const user = state.user;
  if (user) {
    const maya = { ...profiles.maya };
    const mayaFollowing = new Set(maya.following || []);
    const mayaFollowers = new Set(maya.followers || []);
    if (!mayaFollowing.has(user.id)) {
      mayaFollowing.add(user.id);
      changed = true;
    }
    if (!mayaFollowers.has(user.id)) {
      mayaFollowers.add(user.id);
      changed = true;
    }
    maya.following = [...mayaFollowing];
    maya.followers = [...mayaFollowers];
    profiles.maya = maya;
    let nextUser = user;
    if (!(user.following || []).includes('maya')) {
      nextUser = { ...user, following: [...(user.following || []), 'maya'] };
      changed = true;
    }
    if (changed) {
      state = { ...state, user: nextUser, profiles };
      syncUserProfile(nextUser);
      save(state);
    }
  } else if (changed) {
    state = { ...state, profiles };
    save(state);
  }
  return [
    { id: 'dbs', username: 'DatBoiSkeet', team: true, bio: (state.profiles.dbs || {}).bio || '' },
    { id: 'maya', username: state.profiles.maya.username, team: false, bio: state.profiles.maya.bio },
    { id: 'fanjay', username: state.profiles.fanjay.username, team: false, bio: state.profiles.fanjay.bio },
  ];
}

export function createGroupThread(name, memberIds = []) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const label = String(name || '').trim().slice(0, 60) || 'Group';
  const members = [...new Set([user.id, ...memberIds.filter(Boolean)])];
  const slug = label.toLowerCase().replace(/\W+/g, '_').slice(0, 24) || 'group';
  const id = slug === 'dbs_fans' ? 'group_dbs_fans' : 'group_' + slug + '_' + String(user.id).slice(-4);
  let t = state.threads[id];
  if (!t) {
    t = {
      id,
      kind: 'group',
      peerId: id,
      peerName: label,
      participants: members,
      memberIds: members,
      messages: [],
      updatedAt: Date.now(),
      muted: false,
      blocked: false,
    };
    state = { ...state, threads: { ...state.threads, [id]: t } };
    save(state);
  } else if (user && !(t.participants || []).includes(user.id)) {
    // ensure current user is a participant of the shared demo group
    const participants = [...new Set([...(t.participants || []), user.id])];
    const memberIdsNext = [...new Set([...(t.memberIds || participants), user.id])];
    t = { ...t, participants, memberIds: memberIdsNext };
    state = { ...state, threads: { ...state.threads, [id]: t } };
    save(state);
  }
  return state.threads[id];
}

export function ensureDemoGroupThread() {
  const user = state.user;
  if (!user) return { error: 'signin' };
  ensureDemoMessageContacts();
  return createGroupThread('DBS Fans', ['dbs', 'maya', 'fanjay']);
}

export function sendGroupMessage(threadId, text) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const t0 = state.threads[threadId];
  if (!t0 || t0.kind !== 'group') return { error: 'not_group' };
  if (!(t0.participants || []).includes(user.id)) return { error: 'forbidden' };
  const body = String(text || '').trim().slice(0, 500);
  if (!body) return { error: 'empty' };
  const msg = {
    id: 'm_' + Date.now().toString(36),
    from: user.id,
    fromName: user.username,
    text: body,
    at: Date.now(),
    priority: false,
  };
  const t = {
    ...t0,
    messages: [...(t0.messages || []), msg],
    updatedAt: Date.now(),
  };
  state = { ...state, threads: { ...state.threads, [t.id]: t } };
  save(state);
  return { thread: state.threads[t.id], message: msg };
}

export function setThreadFlags(threadId, flags = {}) {
  const t0 = state.threads[threadId];
  if (!t0) return { error: 'missing' };
  const t = {
    ...t0,
    muted: flags.muted !== undefined ? !!flags.muted : !!t0.muted,
    blocked: flags.blocked !== undefined ? !!flags.blocked : !!t0.blocked,
    reportedAt: flags.report ? Date.now() : t0.reportedAt || null,
  };
  state = { ...state, threads: { ...state.threads, [t.id]: t } };
  save(state);
  return t;
}

export function updateMessagePrefs(patch = {}) {
  const prefs = { ...(state.messagePrefs || { allowDMs: true, allowRequests: true }), ...patch };
  state = { ...state, messagePrefs: prefs };
  save(state);
  return prefs;
}

/** §27 Wallet & Creator Payout Center */
const CREATOR_SPLITS = {
  gifts: { creatorPct: 80, dbsPct: 20, label: 'Live gifts' },
  tips: { creatorPct: 90, dbsPct: 10, label: 'Tips' },
  subscriptions: { creatorPct: 85, dbsPct: 15, label: 'Subscriptions' },
  paid_content: { creatorPct: 85, dbsPct: 15, label: 'Paid content' },
  referrals: { creatorPct: 85, dbsPct: 15, label: 'Referrals' },
  clippers: { creatorPct: 80, dbsPct: 20, label: 'Clippers' },
  sponsorships: { creatorPct: 80, dbsPct: 20, label: 'Sponsorships' },
  merch: { creatorPct: 85, dbsPct: 15, label: 'Merch / affiliate' },
};

const DEMO_EARNING_SEEDS = [
  { category: 'gifts', gross: 40, note: 'Live gifts · demo week' },
  { category: 'tips', gross: 22.5, note: 'Live tips · demo week' },
  { category: 'subscriptions', gross: 29.99, note: 'Skeet+ fan sub · demo' },
  { category: 'referrals', gross: 15, note: 'Refer & Earn milestone · demo' },
  { category: 'clippers', gross: 50, note: 'Clippers campaign payout · demo' },
  { category: 'sponsorships', gross: 100, note: 'Sponsored livestream · demo' },
  { category: 'merch', gross: 35, note: 'Foreign X-Change affiliate · demo' },
];

function round2(n) {
  return Math.round(Number(n) * 100) / 100;
}

function normalizeCreatorWallet(raw) {
  const base = defaultState().creatorWallet;
  if (!raw || typeof raw !== 'object') return { ...base };
  return {
    ...base,
    ...raw,
    available: round2(raw.available ?? 0),
    holds: round2(raw.holds ?? 0),
    threshold: Number(raw.threshold) > 0 ? Number(raw.threshold) : 25,
    verification: raw.verification === 'demo_verified' ? 'demo_verified' : 'demo_unverified',
    earnings: Array.isArray(raw.earnings) ? raw.earnings : [],
    payouts: Array.isArray(raw.payouts) ? raw.payouts : [],
  };
}

function getCreatorWalletState() {
  const cw = normalizeCreatorWallet(state.creatorWallet);
  if (state.creatorWallet !== cw) {
    state = { ...state, creatorWallet: cw };
  }
  return cw;
}

function buildEarning({ category, gross, note, source = 'demo', at = Date.now() }) {
  const split = CREATOR_SPLITS[category] || CREATOR_SPLITS.tips;
  const g = round2(Math.max(0, Number(gross) || 0));
  const fees = round2(g * 0.029 + (g > 0 ? 0.3 : 0)); // demo payment / app-store fee example
  const net = round2(Math.max(0, g - fees));
  const creatorShare = round2((net * split.creatorPct) / 100);
  const dbsShare = round2(net - creatorShare);
  return {
    id: 'earn_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
    category,
    label: split.label,
    note: String(note || split.label).slice(0, 120),
    gross: g,
    fees,
    net,
    creatorPct: split.creatorPct,
    dbsPct: split.dbsPct,
    creatorShare,
    dbsShare,
    source,
    at,
    payoutId: null,
  };
}

export function getCreatorSplits() {
  return { ...CREATOR_SPLITS };
}

export function getCreatorWallet() {
  return getCreatorWalletState();
}

/** Credit creator redeemable balance from an earning line */
export function creditCreatorEarning(opts) {
  const earning = buildEarning(opts);
  const cw = getCreatorWalletState();
  const creatorWallet = {
    ...cw,
    available: round2(cw.available + earning.creatorShare),
    earnings: [earning, ...(cw.earnings || [])],
  };
  state = { ...state, creatorWallet };
  save(state);
  return earning;
}

/** Deterministic demo seed — only adds when empty, or force=true */
export function seedDemoCreatorEarnings({ force = false } = {}) {
  const cw = getCreatorWalletState();
  if (!force && (cw.earnings || []).length > 0) {
    return { skipped: true, creatorWallet: cw };
  }
  const baseAt = Date.now() - 6 * 86400000;
  const earnings = DEMO_EARNING_SEEDS.map((s, i) =>
    buildEarning({
      category: s.category,
      gross: s.gross,
      note: s.note,
      source: 'seed',
      at: baseAt + i * 3600000,
    })
  );
  // Rebuild ids uniquely after bulk create (buildEarning uses Date.now)
  const stamped = earnings.map((e, i) => ({
    ...e,
    id: 'earn_seed_' + i + '_' + e.category,
  }));
  const available = round2(stamped.reduce((sum, e) => sum + e.creatorShare, 0));
  const creatorWallet = {
    ...cw,
    available: force ? available : round2(cw.available + available),
    earnings: force ? stamped : [...stamped, ...(cw.earnings || [])],
    holds: force ? 0 : cw.holds,
    payouts: force ? [] : cw.payouts,
  };
  if (force) {
    // Replace ledger for clean Checker runs
    creatorWallet.available = available;
    creatorWallet.holds = 0;
    creatorWallet.payouts = [];
    creatorWallet.earnings = stamped;
  }
  state = { ...state, creatorWallet };
  save(state);
  return { seeded: stamped.length, creatorWallet };
}

/**
 * Request payout — moves available → holds, tags earnings, prevents double payout.
 * TEST MODE only.
 */
export function requestCreatorPayout({ amount } = {}) {
  const cw = getCreatorWalletState();
  const pending = (cw.payouts || []).find((p) => p.status === 'pending');
  if (pending) return { error: 'pending_exists', pending };
  const available = round2(cw.available);
  if (available < cw.threshold) {
    return { error: 'below_threshold', available, threshold: cw.threshold };
  }
  const amt = amount != null ? round2(amount) : available;
  if (amt <= 0 || amt > available) return { error: 'bad_amount' };

  // Take unpaid earnings FIFO without overshooting (anti-double: only payoutId=null)
  const unpaid = (cw.earnings || []).filter((e) => !e.payoutId).sort((a, b) => a.at - b.at);
  const earningIds = [];
  let covered = 0;
  for (const e of unpaid) {
    const share = round2(e.creatorShare);
    if (share <= 0) continue;
    if (round2(covered + share) > amt) continue; // skip too-large lines; try later smaller ones
    earningIds.push(e.id);
    covered = round2(covered + share);
    if (covered >= amt) break;
  }
  // If nothing fit exactly (e.g. first line > amt), take first line and bump payout to that share
  if (!earningIds.length) {
    const first = unpaid.find((e) => round2(e.creatorShare) > 0);
    if (!first) return { error: 'no_earnings' };
    if (round2(first.creatorShare) > available) return { error: 'bad_amount' };
    earningIds.push(first.id);
    covered = round2(first.creatorShare);
  }
  const payoutAmt = covered;

  const payout = {
    id: 'po_' + Date.now().toString(36),
    amount: payoutAmt,
    status: 'pending',
    at: Date.now(),
    earningIds,
    note: 'TEST MODE payout request · not real money',
  };

  const earnings = (cw.earnings || []).map((e) =>
    earningIds.includes(e.id) ? { ...e, payoutId: payout.id } : e
  );

  const creatorWallet = {
    ...cw,
    available: round2(available - payoutAmt),
    holds: round2(cw.holds + payoutAmt),
    earnings,
    payouts: [payout, ...(cw.payouts || [])],
  };
  state = { ...state, creatorWallet };
  save(state);
  return payout;
}

/** Demo admin: complete or reject a pending payout */
export function setCreatorPayoutStatus(payoutId, status) {
  const allowed = ['pending', 'completed', 'rejected'];
  if (!allowed.includes(status)) return { error: 'bad_status' };
  const cw = getCreatorWalletState();
  const payout = (cw.payouts || []).find((p) => p.id === payoutId);
  if (!payout) return { error: 'missing' };
  if (payout.status !== 'pending' && status !== 'pending') {
    return { error: 'already_final', payout };
  }

  let available = cw.available;
  let holds = cw.holds;
  let earnings = cw.earnings || [];

  if (payout.status === 'pending' && status === 'completed') {
    holds = round2(Math.max(0, holds - payout.amount));
    // earnings stay tagged with payoutId (paid — cannot be paid again)
  } else if (payout.status === 'pending' && status === 'rejected') {
    holds = round2(Math.max(0, holds - payout.amount));
    available = round2(available + payout.amount);
    // Untag earnings so they can be paid out again
    const ids = new Set(payout.earningIds || []);
    earnings = earnings.map((e) => (ids.has(e.id) ? { ...e, payoutId: null } : e));
  }

  const payouts = cw.payouts.map((p) =>
    p.id === payoutId ? { ...p, status, reviewedAt: Date.now() } : p
  );
  const creatorWallet = { ...cw, available, holds, earnings, payouts };
  state = { ...state, creatorWallet };
  save(state);
  return payouts.find((p) => p.id === payoutId);
}

export function setCreatorVerification(verified) {
  const cw = getCreatorWalletState();
  const creatorWallet = {
    ...cw,
    verification: verified ? 'demo_verified' : 'demo_unverified',
  };
  state = { ...state, creatorWallet };
  save(state);
  return creatorWallet;
}

/** Summarize earnings by category for UI breakdown */
export function summarizeCreatorEarnings() {
  const cw = getCreatorWalletState();
  const byCat = {};
  for (const key of Object.keys(CREATOR_SPLITS)) {
    byCat[key] = {
      category: key,
      label: CREATOR_SPLITS[key].label,
      creatorPct: CREATOR_SPLITS[key].creatorPct,
      dbsPct: CREATOR_SPLITS[key].dbsPct,
      gross: 0,
      fees: 0,
      net: 0,
      creatorShare: 0,
      dbsShare: 0,
      count: 0,
    };
  }
  for (const e of cw.earnings || []) {
    const row = byCat[e.category] || (byCat[e.category] = {
      category: e.category,
      label: e.label || e.category,
      creatorPct: e.creatorPct,
      dbsPct: e.dbsPct,
      gross: 0,
      fees: 0,
      net: 0,
      creatorShare: 0,
      dbsShare: 0,
      count: 0,
    });
    row.gross = round2(row.gross + e.gross);
    row.fees = round2(row.fees + e.fees);
    row.net = round2(row.net + e.net);
    row.creatorShare = round2(row.creatorShare + e.creatorShare);
    row.dbsShare = round2(row.dbsShare + e.dbsShare);
    row.count += 1;
  }
  return Object.values(byCat);
}

/** §27 Fan wallet helpers */
export function addWalletCredit(amount = 5, note = 'Demo credit') {
  const w = state.wallet || { balance: 0, history: [] };
  const balance = Number(w.balance || 0) + Number(amount);
  const history = [...(w.history || []), { at: Date.now(), amount: Number(amount), note }];
  state = { ...state, wallet: { balance, history } };
  save(state);
  return state.wallet;
}

export function spendWallet(amount, note = 'Demo spend') {
  const w = state.wallet || { balance: 0, history: [] };
  const amt = Number(amount);
  if (Number(w.balance || 0) < amt) return { error: 'insufficient' };
  const balance = Number(w.balance || 0) - amt;
  const history = [...(w.history || []), { at: Date.now(), amount: -amt, note }];
  state = { ...state, wallet: { balance, history } };
  save(state);
  return state.wallet;
}

/** §24 Explore — universal local search (posts, profiles, catalog, lives, products, covers). */
function matchText(hay, query) {
  return String(hay || '').toLowerCase().includes(query);
}

export function exploreSearch(q) {
  const query = String(q || '').trim().toLowerCase();
  const empty = {
    query: String(q || '').trim(),
    posts: [],
    profiles: [],
    music: [],
    videos: [],
    lives: [],
    products: [],
    pictures: [],
  };
  if (!query) return empty;

  const posts = (state.posts || []).filter(
    (p) => matchText(p.text, query) || matchText(p.username, query)
  );

  const profiles = Object.values(state.profiles || {}).filter(
    (p) => matchText(p.username, query) || matchText(p.bio, query)
  );
  if (state.user) {
    const u = state.user;
    if (matchText(u.username, query) || matchText(u.bio, query)) {
      if (!profiles.find((p) => p.id === u.id)) profiles.push(u);
    }
  }

  const catalog = (state.catalog || []).filter((c) => c.published);
  const music = catalog.filter(
    (c) =>
      (c.type === 'song' || c.type === 'album') &&
      (matchText(c.title, query) || matchText(c.artist, query) || matchText(c.type, query))
  );
  const videos = catalog.filter(
    (c) =>
      c.type === 'video' &&
      (matchText(c.title, query) || matchText(c.artist, query) || matchText('video', query))
  );
  const pictures = catalog.filter(
    (c) =>
      c.type === 'picture' &&
      (matchText(c.title, query) || matchText(c.artist, query) || matchText('picture', query))
  );

  const lives = [];
  const live = state.live;
  if (live && !live.endedAt) {
    if (
      matchText(live.title, query) ||
      matchText(live.hostName, query) ||
      matchText('live', query)
    ) {
      lives.push({ ...live, status: 'live' });
    }
  }
  (state.liveHistory || []).forEach((h) => {
    if (
      matchText(h.title, query) ||
      matchText(h.hostName, query) ||
      matchText('live', query)
    ) {
      lives.push({ ...h, status: 'ended' });
    }
  });

  const products = (state.listings || []).filter(
    (l) =>
      l.active !== false &&
      (matchText(l.title, query) ||
        matchText(l.brand, query) ||
        matchText(l.blurb, query) ||
        matchText('marketplace', query) ||
        matchText('product', query))
  );

  return { query: String(q || '').trim(), posts, profiles, music, videos, lives, products, pictures };
}

/** Demo trending strip for Explore — high-like posts + seeded cross-section cards. */
export function exploreTrending(limit = 8) {
  const likes = state.likes || {};
  const scored = (state.posts || [])
    .map((p) => ({
      kind: 'post',
      id: p.id,
      title: (p.text || '').slice(0, 72) || 'Post',
      subtitle: '@' + (p.username || 'creator'),
      href: '#/posts',
      score: (likes[p.id] || []).length,
      image: p.image || '',
    }))
    .sort((a, b) => b.score - a.score || (b.id > a.id ? 1 : -1));

  const seeds = [
    { kind: 'music', id: 'trend_music', title: 'Long Story Short', subtitle: 'Coming Soon · Music', href: '#/music', score: 3, image: '/music/01_Long_Story_Short_Coming_Soon.jpg' },
    { kind: 'video', id: 'trend_video', title: 'Dirty Money ft. Lil Baby', subtitle: 'Official MV', href: '#/videos', score: 3, image: '' },
    { kind: 'live', id: 'trend_live', title: 'Go live on DBS', subtitle: 'Creators · Live', href: '#/live', score: 2, image: '' },
    { kind: 'market', id: 'trend_mkt', title: 'Sponsored Marketplace', subtitle: 'Brand ads · demo', href: '#/marketplace', score: 2, image: '' },
    { kind: 'spotlight', id: 'trend_spot', title: '24/7 Spotlight', subtitle: 'Stage · Discover', href: '#/spotlight', score: 1, image: '' },
  ];

  const live = state.live;
  if (live && !live.endedAt) {
    seeds.unshift({
      kind: 'live',
      id: 'trend_live_now',
      title: live.title || 'Live now',
      subtitle: '@' + (live.hostName || 'creator') + ' · LIVE',
      href: '#/live',
      score: 99,
      image: '',
    });
  }

  const pub = (state.catalog || []).filter((c) => c.published).slice(0, 3);
  pub.forEach((c) => {
    const href =
      c.type === 'video' ? '#/videos' : c.type === 'picture' ? '#/home' : '#/music';
    seeds.push({
      kind: c.type,
      id: 'trend_cat_' + c.id,
      title: c.title,
      subtitle: (c.artist || 'Admin') + ' · From Admin',
      href,
      score: 4,
      image: c.coverRef && !String(c.coverRef).startsWith('idb:') ? c.coverRef : '',
    });
  });

  const merged = [...scored, ...seeds]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return merged;
}

/** Suggested accounts for Discover / Following demo. */
export function exploreSuggestedAccounts() {
  const out = Object.values(state.profiles || {}).map((p) => ({
    id: p.id,
    username: p.username,
    bio: p.bio || '',
    avatar: p.avatar || '',
    verified: !!p.verified,
    followers: (p.followers || []).length,
  }));
  if (state.user && !out.find((p) => p.id === state.user.id)) {
    out.push({
      id: state.user.id,
      username: state.user.username,
      bio: state.user.bio || '',
      avatar: state.user.avatar || '',
      verified: !!state.user.verified,
      followers: (state.user.followers || []).length,
    });
  }
  return out.sort((a, b) => b.followers - a.followers || a.username.localeCompare(b.username));
}

/** §23 Live Gift Battles — voluntary gifts, not wagers (TEST MODE) */
const GB_DURATION_MS = 60_000;
/** t198u · winner recognition lasts until end of local calendar day (not 3h). */
const GB_DAILY_WINNERS_CAP = 10;
function gbEndOfLocalDay(now = Date.now()) {
  const d = new Date(now);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}
function gbStartOfLocalDay(now = Date.now()) {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
const GB_DEMO_FANS = [
  { id: 'fan_maya', name: 'MayaBeats', bio: 'Demo fan · mutual' },
  { id: 'fan_jay', name: 'FanJay', bio: 'Demo fan · sandbox opponent' },
];

function gbBucket() {
  return state.giftBattles || {
    active: null,
    history: [],
    champions: [],
    prefs: { invitationsEnabled: true },
  };
}

function saveGiftBattles(gb) {
  state = { ...state, giftBattles: gb };
  save(state);
  return gb;
}

function finalizeBattleIfNeeded(battle, now = Date.now()) {
  if (!battle || battle.status !== 'active') return battle;
  if (now < (battle.endsAt || 0)) return battle;
  const a = Number(battle.scoreA || 0);
  const b = Number(battle.scoreB || 0);
  let result = 'tie';
  let winnerId = null;
  let winnerName = null;
  if (a > b) {
    result = 'win';
    winnerId = battle.challenger.id;
    winnerName = battle.challenger.name;
  } else if (b > a) {
    result = 'win';
    winnerId = battle.opponent.id;
    winnerName = battle.opponent.name;
  }
  const ended = {
    ...battle,
    status: 'ended',
    endedAt: now,
    result,
    winnerId,
    winnerName,
    scoreA: a,
    scoreB: b,
    championUntil: winnerId ? gbEndOfLocalDay(now) : null,
  };
  return ended;
}

export function listDemoBattleFans() {
  return GB_DEMO_FANS.map((f) => ({ ...f }));
}

export function getGiftBattlePrefs() {
  return { invitationsEnabled: true, ...(gbBucket().prefs || {}) };
}

export function setGiftBattlePrefs(patch = {}) {
  const gb = gbBucket();
  const prefs = { ...gb.prefs, ...patch };
  return saveGiftBattles({ ...gb, prefs });
}

export function getActiveGiftBattle() {
  const gb = gbBucket();
  let active = gb.active;
  if (!active) return null;
  if (active.status === 'active') {
    const finalized = finalizeBattleIfNeeded(active);
    if (finalized !== active && finalized.status === 'ended') {
      return commitEndedBattle(finalized);
    }
    active = finalized;
  }
  return active;
}

function commitEndedBattle(ended) {
  const gb = gbBucket();
  const history = [ended, ...(gb.history || []).filter((h) => h.id !== ended.id)].slice(0, 40);
  let champions = gb.champions || [];
  if (ended.winnerId) {
    const entry = {
      battleId: ended.id,
      userId: ended.winnerId,
      username: ended.winnerName,
      score: ended.winnerId === ended.challenger.id ? ended.scoreA : ended.scoreB,
      opponentScore: ended.winnerId === ended.challenger.id ? ended.scoreB : ended.scoreA,
      endedAt: ended.endedAt,
      championUntil: ended.championUntil,
      mode: ended.mode,
    };
    champions = [entry, ...champions.filter((c) => c.battleId !== ended.id)].slice(0, 30);
  }
  saveGiftBattles({ ...gb, active: ended, history, champions });
  return ended;
}

/** Challenge another fan. mode: 'live' | 'sandbox' */
export function startGiftBattle({ opponentId, opponentName, mode } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const prefs = getGiftBattlePrefs();
  if (!prefs.invitationsEnabled) return { error: 'invites_disabled' };

  const liveActive = state.live && !state.live.endedAt;
  const resolvedMode = mode || (liveActive ? 'live' : 'sandbox');
  if (resolvedMode === 'live' && !liveActive) return { error: 'not_live' };

  const gb = gbBucket();
  const cur = gb.active;
  if (cur && (cur.status === 'pending' || cur.status === 'active')) {
    return { error: 'battle_in_progress', battle: cur };
  }

  const fan = GB_DEMO_FANS.find((f) => f.id === opponentId);
  const opp = {
    id: opponentId || fan?.id || 'fan_maya',
    name: opponentName || fan?.name || 'MayaBeats',
  };
  if (opp.id === user.id) return { error: 'self' };

  const battle = {
    id: 'gb_' + Date.now().toString(36),
    status: 'pending',
    mode: resolvedMode,
    liveId: liveActive ? state.live.id : null,
    liveTitle: liveActive ? state.live.title : null,
    challenger: { id: user.id, name: user.username },
    opponent: opp,
    createdAt: Date.now(),
    startedAt: null,
    endsAt: null,
    durationMs: GB_DURATION_MS,
    scoreA: 0, // challenger
    scoreB: 0, // opponent
    giftLog: [],
    result: null,
    winnerId: null,
    winnerName: null,
    endedAt: null,
    championUntil: null,
  };
  saveGiftBattles({ ...gb, active: battle });
  return { battle };
}

export function acceptGiftBattle() {
  const gb = gbBucket();
  const b = gb.active;
  if (!b || b.status !== 'pending') return { error: 'no_pending' };
  if (!getGiftBattlePrefs().invitationsEnabled) return { error: 'invites_disabled' };
  const now = Date.now();
  const battle = {
    ...b,
    status: 'active',
    startedAt: now,
    endsAt: now + (b.durationMs || GB_DURATION_MS),
    scoreA: 0,
    scoreB: 0,
  };
  saveGiftBattles({ ...gb, active: battle });
  return { battle };
}

export function declineGiftBattle() {
  const gb = gbBucket();
  const b = gb.active;
  if (!b || b.status !== 'pending') return { error: 'no_pending' };
  const declined = {
    ...b,
    status: 'declined',
    endedAt: Date.now(),
    result: 'declined',
  };
  const history = [declined, ...(gb.history || [])].slice(0, 40);
  saveGiftBattles({ ...gb, active: null, history });
  return { battle: declined };
}

/** Clear ended/declined active slot so a new challenge can start. */
export function clearActiveGiftBattle() {
  const gb = gbBucket();
  const b = gb.active;
  if (b && (b.status === 'pending' || b.status === 'active')) {
    return { error: 'still_running', battle: b };
  }
  saveGiftBattles({ ...gb, active: null });
  return { ok: true };
}

/** t200u · broadcast Gift Battle challenge prompt after a paid gift (TEST MODE SPA). */
export function getLiveGbChallengePop(now = Date.now()) {
  const pop = state.liveGbChallengePop;
  if (!pop) return null;
  if (pop.expiresAt && now > pop.expiresAt) {
    state = { ...state, liveGbChallengePop: null };
    save(state);
    return null;
  }
  // Must still be on same active live
  if (!state.live || state.live.endedAt || (pop.liveId && pop.liveId !== state.live.id)) {
    return null;
  }
  return { ...pop };
}

export function dismissLiveGbChallengePop(id) {
  const pop = state.liveGbChallengePop;
  if (!pop) return { ok: true };
  if (id && pop.id !== id) return { error: 'mismatch' };
  state = { ...state, liveGbChallengePop: null };
  save(state);
  return { ok: true };
}

/** Start a pending Gift Battle challenging the paid gifter from the pop. */
export function challengeGifterFromPop() {
  const pop = getLiveGbChallengePop();
  if (!pop) return { error: 'no_pop' };
  const res = startGiftBattle({
    opponentId: pop.fromUserId,
    opponentName: pop.fromUser,
    mode: 'live',
  });
  if (res?.battle) {
    state = { ...state, liveGbChallengePop: null };
    save(state);
  }
  return res;
}


/**
 * Record a voluntary gift/tip toward one side of the battle.
 * side: 'challenger' | 'opponent'
 * When mode=live and side=challenger, also calls sendLiveSupport.
 */
export function recordBattleGift({
  side = 'challenger',
  kind = 'gift',
  amount = 2,
  label = '',
} = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  let battle = getActiveGiftBattle();
  if (!battle || battle.status !== 'active') return { error: 'no_active' };
  // Re-check after possible finalize
  battle = gbBucket().active;
  if (!battle || battle.status !== 'active') return { error: 'ended' };

  const amt = Math.max(0.5, Number(amount) || 1);
  const k = kind === 'tip' ? 'tip' : 'gift';
  const forOpponent = side === 'opponent';
  const who = forOpponent ? battle.opponent : battle.challenger;

  // Live mode + challenger: go through real live support path
  let liveResult = null;
  if (battle.mode === 'live' && !forOpponent) {
    liveResult = sendLiveSupport({ kind: k, amount: amt, label: label || (k === 'gift' ? '🔥 Fire' : 'Tip') });
    if (liveResult?.error) return liveResult;
  } else {
    // Sandbox or simulated opponent gift — optional wallet debit when possible
    const bal = state.wallet?.balance || 0;
    if (bal >= amt) {
      spendWallet(amt, `Gift battle ${k} · ${who.name} · TEST MODE`);
    }
  }

  const entry = {
    id: 'gbg_' + Date.now().toString(36),
    side: forOpponent ? 'opponent' : 'challenger',
    userId: who.id,
    username: who.name,
    kind: k,
    amount: amt,
    label: (label || (k === 'gift' ? '🔥 Fire' : 'Tip')).slice(0, 40),
    at: Date.now(),
  };
  const scoreA = Number(battle.scoreA || 0) + (forOpponent ? 0 : amt);
  const scoreB = Number(battle.scoreB || 0) + (forOpponent ? amt : 0);
  let next = {
    ...battle,
    scoreA: +scoreA.toFixed(2),
    scoreB: +scoreB.toFixed(2),
    giftLog: [...(battle.giftLog || []), entry],
  };
  next = finalizeBattleIfNeeded(next);
  if (next.status === 'ended') {
    commitEndedBattle(next);
  } else {
    saveGiftBattles({ ...gbBucket(), active: next });
  }
  return { battle: next, entry, live: liveResult?.live || null, wallet: state.wallet };
}

/** Force end / tick finalize based on wall clock. */
export function tickGiftBattle() {
  const gb = gbBucket();
  const b = gb.active;
  if (!b || b.status !== 'active') return b;
  const finalized = finalizeBattleIfNeeded(b);
  if (finalized.status === 'ended' && b.status !== 'ended') {
    return commitEndedBattle(finalized);
  }
  return finalized;
}

export function listBattleHistory(limit = 20) {
  return (gbBucket().history || []).slice(0, limit);
}

/** Current day champion spotlight (most recent winner still within calendar-day window). */
export function getChampion(now = Date.now()) {
  const gb = gbBucket();
  const active = gb.active;
  if (
    active &&
    active.status === 'ended' &&
    active.winnerId &&
    active.championUntil &&
    now < active.championUntil
  ) {
    return {
      battleId: active.id,
      userId: active.winnerId,
      username: active.winnerName,
      score: active.winnerId === active.challenger.id ? active.scoreA : active.scoreB,
      endedAt: active.endedAt,
      championUntil: active.championUntil,
      mode: active.mode,
    };
  }
  const list = gb.champions || [];
  return list.find((c) => c.championUntil && now < c.championUntil) || null;
}

/** Top winners by win count (local demo). */
export function listTopBattleWinners(limit = 15) {
  const wins = {};
  for (const h of gbBucket().history || []) {
    if (h.result !== 'win' || !h.winnerId) continue;
    const row = wins[h.winnerId] || {
      userId: h.winnerId,
      username: h.winnerName,
      wins: 0,
      points: 0,
    };
    row.wins += 1;
    const pts = h.winnerId === h.challenger?.id ? Number(h.scoreA || 0) : Number(h.scoreB || 0);
    row.points = +(row.points + pts).toFixed(2);
    row.username = h.winnerName || row.username;
    wins[h.winnerId] = row;
  }
  return Object.values(wins)
    .sort((a, b) => b.wins - a.wins || b.points - a.points || a.username.localeCompare(b.username))
    .slice(0, limit);
}

/**
 * t198u · Up to 10 unique Gift Battle winners for the local calendar day
 * (most recent first). Recognition window = rest of day.
 */
export function listDailyBattleWinners(limit = GB_DAILY_WINNERS_CAP, now = Date.now()) {
  const cap = Math.min(Math.max(1, Number(limit) || GB_DAILY_WINNERS_CAP), GB_DAILY_WINNERS_CAP);
  const start = gbStartOfLocalDay(now);
  const end = gbEndOfLocalDay(now);
  const seen = new Set();
  const out = [];
  const push = (row) => {
    if (!row?.userId || !row?.username) return;
    if (seen.has(row.userId)) return;
    const at = Number(row.endedAt || 0);
    if (at < start || at > end) return;
    // Still recognized today (championUntil may be end-of-day)
    if (row.championUntil && now > row.championUntil) return;
    seen.add(row.userId);
    out.push({
      userId: row.userId,
      username: row.username,
      score: Number(row.score || 0),
      endedAt: at,
      championUntil: row.championUntil || end,
      battleId: row.battleId || row.id || null,
      mode: row.mode || 'demo',
    });
  };
  for (const c of gbBucket().champions || []) {
    push(c);
    if (out.length >= cap) return out;
  }
  for (const h of gbBucket().history || []) {
    if (h.result !== 'win' || !h.winnerId) continue;
    push({
      userId: h.winnerId,
      username: h.winnerName,
      score: h.winnerId === h.challenger?.id ? h.scoreA : h.scoreB,
      endedAt: h.endedAt,
      championUntil: h.championUntil || end,
      battleId: h.id,
      mode: h.mode,
    });
    if (out.length >= cap) break;
  }
  return out;
}

export function getGiftBattleDayWindow(now = Date.now()) {
  return { start: gbStartOfLocalDay(now), end: gbEndOfLocalDay(now), cap: GB_DAILY_WINNERS_CAP };
}

/** §29 Multi-Guest Livestreams — fake stage, invite/join, gift split disclosure (TEST MODE) */
const MG_MAX_GUESTS = 4;
const MG_DEMO_CONTACTS = [
  { id: 'maya', username: 'MayaBeats', bio: 'Creator · beats & live demos' },
  { id: 'fanjay', username: 'FanJay', bio: 'Day-one fan · playlist curator' },
  { id: 'ria', username: 'RiaLoops', bio: 'Demo co-host · loops & hooks' },
  { id: 'dez', username: 'DezOnMic', bio: 'Demo guest · freestyle nights' },
];

function mgBucket() {
  return (
    state.multiGuest || {
      active: null,
      history: [],
    }
  );
}

function saveMultiGuest(mg) {
  state = { ...state, multiGuest: mg };
  save(state);
  return mg;
}

function equalSplitShares(hostId, guestIds) {
  const ids = [hostId, ...guestIds];
  const n = ids.length || 1;
  const base = Math.floor((100 / n) * 100) / 100;
  const shares = {};
  let used = 0;
  ids.forEach((id, i) => {
    if (i === ids.length - 1) {
      shares[id] = +(100 - used).toFixed(2);
    } else {
      shares[id] = base;
      used = +(used + base).toFixed(2);
    }
  });
  return shares;
}

/** Seed demo guest profiles (idempotent). Reuses Messages contacts + extras. */
export function ensureDemoMultiGuestContacts() {
  ensureDemoMessageContacts();
  const profiles = { ...(state.profiles || {}) };
  let changed = false;
  for (const c of MG_DEMO_CONTACTS) {
    if (!profiles[c.id]) {
      profiles[c.id] = {
        id: c.id,
        username: c.username,
        bio: c.bio,
        avatar: '',
        followers: [],
        following: ['dbs'],
        verified: false,
      };
      changed = true;
    }
  }
  if (changed) {
    state = { ...state, profiles };
    save(state);
  }
  return MG_DEMO_CONTACTS.map((c) => {
    const p = state.profiles[c.id] || c;
    return {
      id: c.id,
      username: p.username || c.username,
      bio: p.bio || c.bio,
      followers: (p.followers || []).length,
    };
  });
}

export function listDemoMultiGuestContacts() {
  return ensureDemoMultiGuestContacts();
}

export function getActiveMultiGuest() {
  const mg = mgBucket();
  return mg.active || null;
}

export function listMultiGuestHistory(limit = 20) {
  return (mgBucket().history || []).slice(0, limit);
}

export function startMultiGuest(title) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  if (mg.active && !mg.active.endedAt) {
    return { error: 'session_in_progress', session: mg.active };
  }
  const label = String(title || '').trim().slice(0, 80) || 'Multi-Guest Live';
  ensureDemoMultiGuestContacts();
  const session = {
    id: 'mg_' + Date.now().toString(36),
    title: label,
    hostId: user.id,
    hostName: user.username,
    startedAt: Date.now(),
    endedAt: null,
    maxGuests: MG_MAX_GUESTS,
    guests: [],
    chat: [
      {
        id: 'c_' + Date.now().toString(36),
        userId: 'system',
        username: 'DBS',
        text: 'Multi-guest session started · TEST MODE · no camera / WebRTC',
        at: Date.now(),
        system: true,
      },
    ],
    giftSplit: {
      mode: 'equal',
      shares: { [user.id]: 100 },
      disclosed: false,
      disclosedAt: null,
    },
    broadcastReady: false,
  };
  saveMultiGuest({ ...mg, active: session });
  return { session };
}

export function inviteGuest(guestId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  const s = mg.active;
  if (!s || s.endedAt) return { error: 'no_session' };
  if (s.hostId !== user.id) return { error: 'host_only' };

  ensureDemoMultiGuestContacts();
  const contact = MG_DEMO_CONTACTS.find((c) => c.id === guestId);
  const profile = state.profiles?.[guestId];
  if (!contact && !profile) return { error: 'unknown_guest' };
  if (guestId === user.id || guestId === s.hostId) return { error: 'self' };

  const existing = (s.guests || []).find((g) => g.id === guestId);
  if (existing && (existing.status === 'invited' || existing.status === 'joined')) {
    return { error: 'already_invited', session: s };
  }

  const joinedCount = (s.guests || []).filter((g) => g.status === 'joined' || g.status === 'invited').length;
  if (joinedCount >= (s.maxGuests || MG_MAX_GUESTS)) {
    return { error: 'full' };
  }

  const guest = {
    id: guestId,
    username: profile?.username || contact?.username || guestId,
    status: 'invited',
    muted: false,
    invitedAt: Date.now(),
    joinedAt: null,
  };
  const guests = [
    ...(s.guests || []).filter((g) => g.id !== guestId),
    guest,
  ];
  const chat = [
    ...(s.chat || []),
    {
      id: 'c_' + Date.now().toString(36),
      userId: 'system',
      username: 'DBS',
      text: `Invited @${guest.username} to the stage`,
      at: Date.now(),
      system: true,
    },
  ].slice(-80);
  const session = { ...s, guests, chat, broadcastReady: false };
  // Reset disclosure when roster changes
  session.giftSplit = {
    ...session.giftSplit,
    disclosed: false,
    disclosedAt: null,
    shares: equalSplitShares(
      s.hostId,
      guests.filter((g) => g.status === 'joined').map((g) => g.id)
    ),
  };
  saveMultiGuest({ ...mg, active: session });
  return { session, guest };
}

/** Host simulates guest Accept (demo — no real peer). */
export function acceptGuest(guestId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  const s = mg.active;
  if (!s || s.endedAt) return { error: 'no_session' };
  if (s.hostId !== user.id) return { error: 'host_only' };

  const guests = (s.guests || []).map((g) => ({ ...g }));
  const idx = guests.findIndex((g) => g.id === guestId);
  if (idx < 0) return { error: 'not_found' };
  if (guests[idx].status === 'joined') return { session: s, guest: guests[idx] };

  const joined = guests.filter((g) => g.status === 'joined').length;
  if (joined >= (s.maxGuests || MG_MAX_GUESTS)) return { error: 'full' };

  guests[idx] = {
    ...guests[idx],
    status: 'joined',
    joinedAt: Date.now(),
    muted: false,
  };
  const joinedIds = guests.filter((g) => g.status === 'joined').map((g) => g.id);
  const chat = [
    ...(s.chat || []),
    {
      id: 'c_' + Date.now().toString(36),
      userId: 'system',
      username: 'DBS',
      text: `@${guests[idx].username} joined the stage`,
      at: Date.now(),
      system: true,
    },
  ].slice(-80);
  const session = {
    ...s,
    guests,
    chat,
    broadcastReady: false,
    giftSplit: {
      mode: s.giftSplit?.mode || 'equal',
      shares: equalSplitShares(s.hostId, joinedIds),
      disclosed: false,
      disclosedAt: null,
    },
  };
  saveMultiGuest({ ...mg, active: session });
  return { session, guest: guests[idx] };
}

export function declineGuest(guestId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  const s = mg.active;
  if (!s || s.endedAt) return { error: 'no_session' };
  if (s.hostId !== user.id) return { error: 'host_only' };

  const guests = (s.guests || []).map((g) =>
    g.id === guestId ? { ...g, status: 'declined' } : g
  );
  if (!(s.guests || []).some((g) => g.id === guestId)) return { error: 'not_found' };
  const name = (s.guests || []).find((g) => g.id === guestId)?.username || guestId;
  const chat = [
    ...(s.chat || []),
    {
      id: 'c_' + Date.now().toString(36),
      userId: 'system',
      username: 'DBS',
      text: `@${name} declined the invite`,
      at: Date.now(),
      system: true,
    },
  ].slice(-80);
  const session = { ...s, guests, chat };
  saveMultiGuest({ ...mg, active: session });
  return { session };
}

export function leaveGuest(guestId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  const s = mg.active;
  if (!s || s.endedAt) return { error: 'no_session' };
  // Host can simulate leave, or guest leaving themselves
  if (s.hostId !== user.id && user.id !== guestId) return { error: 'forbidden' };

  const guests = (s.guests || []).map((g) =>
    g.id === guestId ? { ...g, status: 'left', muted: false } : g
  );
  if (!(s.guests || []).some((g) => g.id === guestId)) return { error: 'not_found' };
  const name = (s.guests || []).find((g) => g.id === guestId)?.username || guestId;
  const joinedIds = guests.filter((g) => g.status === 'joined').map((g) => g.id);
  const chat = [
    ...(s.chat || []),
    {
      id: 'c_' + Date.now().toString(36),
      userId: 'system',
      username: 'DBS',
      text: `@${name} left the stage`,
      at: Date.now(),
      system: true,
    },
  ].slice(-80);
  const session = {
    ...s,
    guests,
    chat,
    broadcastReady: false,
    giftSplit: {
      mode: s.giftSplit?.mode || 'equal',
      shares: equalSplitShares(s.hostId, joinedIds),
      disclosed: false,
      disclosedAt: null,
    },
  };
  saveMultiGuest({ ...mg, active: session });
  return { session };
}

export function removeGuest(guestId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  const s = mg.active;
  if (!s || s.endedAt) return { error: 'no_session' };
  if (s.hostId !== user.id) return { error: 'host_only' };

  const guests = (s.guests || []).map((g) =>
    g.id === guestId ? { ...g, status: 'removed', muted: false } : g
  );
  if (!(s.guests || []).some((g) => g.id === guestId)) return { error: 'not_found' };
  const name = (s.guests || []).find((g) => g.id === guestId)?.username || guestId;
  const joinedIds = guests.filter((g) => g.status === 'joined').map((g) => g.id);
  const chat = [
    ...(s.chat || []),
    {
      id: 'c_' + Date.now().toString(36),
      userId: 'system',
      username: 'DBS',
      text: `Host removed @${name} from the stage`,
      at: Date.now(),
      system: true,
    },
  ].slice(-80);
  const session = {
    ...s,
    guests,
    chat,
    broadcastReady: false,
    giftSplit: {
      mode: s.giftSplit?.mode || 'equal',
      shares: equalSplitShares(s.hostId, joinedIds),
      disclosed: false,
      disclosedAt: null,
    },
  };
  saveMultiGuest({ ...mg, active: session });
  return { session };
}

export function muteGuest(guestId, muted = true) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  const s = mg.active;
  if (!s || s.endedAt) return { error: 'no_session' };
  if (s.hostId !== user.id) return { error: 'host_only' };

  const guests = (s.guests || []).map((g) =>
    g.id === guestId && g.status === 'joined' ? { ...g, muted: !!muted } : g
  );
  if (!(s.guests || []).some((g) => g.id === guestId && g.status === 'joined')) {
    return { error: 'not_joined' };
  }
  const name = (s.guests || []).find((g) => g.id === guestId)?.username || guestId;
  const chat = [
    ...(s.chat || []),
    {
      id: 'c_' + Date.now().toString(36),
      userId: 'system',
      username: 'DBS',
      text: muted ? `Host muted @${name}` : `Host unmuted @${name}`,
      at: Date.now(),
      system: true,
    },
  ].slice(-80);
  const session = { ...s, guests, chat };
  saveMultiGuest({ ...mg, active: session });
  return { session };
}

export function sendMultiGuestChat(text) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  const s = mg.active;
  if (!s || s.endedAt) return { error: 'no_session' };
  const body = String(text || '').trim().slice(0, 280);
  if (!body) return { error: 'empty' };
  const msg = {
    id: 'c_' + Date.now().toString(36),
    userId: user.id,
    username: user.username,
    text: body,
    at: Date.now(),
  };
  const chat = [...(s.chat || []), msg].slice(-80);
  const session = { ...s, chat };
  saveMultiGuest({ ...mg, active: session });
  return { session, message: msg };
}

/**
 * Set gift split before broadcast.
 * mode: 'equal' | 'custom'
 * shares: { userId: percent } — must total ~100 when custom; equal recomputes from host+joined.
 */
export function setGiftSplit({ mode = 'equal', shares = null, disclose = false } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  const s = mg.active;
  if (!s || s.endedAt) return { error: 'no_session' };
  if (s.hostId !== user.id) return { error: 'host_only' };

  const joinedIds = (s.guests || []).filter((g) => g.status === 'joined').map((g) => g.id);
  const recipients = [s.hostId, ...joinedIds];
  let nextShares;
  let nextMode = mode === 'custom' ? 'custom' : 'equal';

  if (nextMode === 'equal') {
    nextShares = equalSplitShares(s.hostId, joinedIds);
  } else {
    nextShares = {};
    let total = 0;
    for (const id of recipients) {
      const v = Math.max(0, Number(shares?.[id]) || 0);
      nextShares[id] = +v.toFixed(2);
      total += nextShares[id];
    }
    total = +total.toFixed(2);
    if (Math.abs(total - 100) > 0.05) {
      return { error: 'split_total', total, expected: 100 };
    }
  }

  const giftSplit = {
    mode: nextMode,
    shares: nextShares,
    disclosed: !!disclose || !!s.giftSplit?.disclosed,
    disclosedAt: disclose ? Date.now() : s.giftSplit?.disclosedAt || null,
  };
  if (disclose) giftSplit.disclosed = true;
  if (disclose) giftSplit.disclosedAt = Date.now();

  const session = {
    ...s,
    giftSplit,
    broadcastReady: !!giftSplit.disclosed,
  };
  saveMultiGuest({ ...mg, active: session });
  return { session };
}

/** Mark split disclosed + broadcast-ready (display-only; no real payments). */
export function discloseGiftSplit() {
  return setGiftSplit({
    mode: getActiveMultiGuest()?.giftSplit?.mode || 'equal',
    shares: getActiveMultiGuest()?.giftSplit?.shares || null,
    disclose: true,
  });
}

export function endMultiGuest() {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const mg = mgBucket();
  const s = mg.active;
  if (!s || s.endedAt) return { error: 'no_session' };
  if (s.hostId !== user.id) return { error: 'host_only' };

  const ended = {
    ...s,
    endedAt: Date.now(),
    broadcastReady: false,
  };
  const history = [ended, ...(mg.history || []).filter((h) => h.id !== ended.id)].slice(0, 20);
  saveMultiGuest({ active: null, history });
  return { session: ended };
}

/** §6 DBS Missions — promotional campaigns (TEST MODE · localStorage) */
const PROMOTE_TYPES = ['song', 'album', 'video', 'live', 'app', 'interview'];
const MISSION_STATUSES = ['draft', 'active', 'paused', 'ended'];

function normalizeMission(m) {
  if (!m || typeof m !== 'object') return null;
  const fundSource = m.fundSource === 'third_party' ? 'third_party' : 'dbs';
  const promoteType = PROMOTE_TYPES.includes(m.promoteType) ? m.promoteType : 'app';
  const status = MISSION_STATUSES.includes(m.status) ? m.status : 'draft';
  const deadline = Number(m.deadline) || 0;
  return {
    id: String(m.id || ''),
    title: String(m.title || '').slice(0, 120),
    promoteType,
    budget: Math.max(0, Number(m.budget) || 0),
    deadline,
    fundSource,
    managementFeePct: fundSource === 'third_party' ? 20 : 0,
    reward: String(m.reward || '').slice(0, 200),
    status,
    participants: Array.isArray(m.participants) ? m.participants : [],
    submissions: Array.isArray(m.submissions) ? m.submissions : [],
    createdAt: Number(m.createdAt) || Date.now(),
    createdBy: m.createdBy || null,
  };
}

function saveMissions(missions) {
  state = { ...state, missions };
  save(state);
}

export function listMissions({ status = null } = {}) {
  const all = (state.missions || []).map(normalizeMission).filter(Boolean);
  if (!status) return all;
  const statuses = Array.isArray(status) ? status : [status];
  return all.filter((m) => statuses.includes(m.status));
}

export function getMission(id) {
  return listMissions().find((m) => m.id === id) || null;
}

export function createMission(form = {}) {
  const title = String(form.title || '').trim().slice(0, 120);
  if (!title) return { error: 'required' };
  const promoteType = PROMOTE_TYPES.includes(form.promoteType) ? form.promoteType : 'app';
  const fundSource = form.fundSource === 'third_party' ? 'third_party' : 'dbs';
  let deadline = form.deadline;
  if (typeof deadline === 'string' && deadline) {
    const parsed = Date.parse(deadline);
    deadline = Number.isFinite(parsed) ? parsed : Date.now() + 7 * 86400000;
  } else {
    deadline = Number(deadline) || Date.now() + 7 * 86400000;
  }
  const status = MISSION_STATUSES.includes(form.status) ? form.status : 'active';
  const mission = normalizeMission({
    id: 'msn_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title,
    promoteType,
    budget: Number(form.budget) || 0,
    deadline,
    fundSource,
    reward: String(form.reward || '').trim().slice(0, 200) || 'Demo reward · TEST MODE',
    status,
    participants: [],
    submissions: [],
    createdAt: Date.now(),
    createdBy: state.user?.id || 'demo_admin',
  });
  saveMissions([mission, ...(state.missions || [])]);
  return mission;
}

export function setMissionStatus(missionId, status) {
  if (!MISSION_STATUSES.includes(status)) return { error: 'bad_status' };
  let found = null;
  const missions = (state.missions || []).map((raw) => {
    const m = normalizeMission(raw);
    if (!m || m.id !== missionId) return raw;
    found = { ...m, status };
    return found;
  });
  if (!found) return { error: 'not_found' };
  saveMissions(missions);
  return found;
}

export function joinMission(missionId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  let found = null;
  const missions = (state.missions || []).map((raw) => {
    const m = normalizeMission(raw);
    if (!m || m.id !== missionId) return raw;
    if (m.status !== 'active') {
      found = { error: 'not_active', mission: m };
      return raw;
    }
    const already = (m.participants || []).some((p) => p.userId === user.id);
    if (already) {
      found = { error: 'already_joined', mission: m };
      return raw;
    }
    const participant = {
      userId: user.id,
      username: user.username || 'creator',
      joinedAt: Date.now(),
      score: 0,
      referralCode: 'REF-' + user.id.slice(0, 6).toUpperCase() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase(),
    };
    found = {
      ...m,
      participants: [...(m.participants || []), participant],
    };
    return found;
  });
  if (!found) return { error: 'not_found' };
  if (found.error) return found;
  saveMissions(missions);
  return found;
}

export function submitMissionProof(missionId, { proof = '' } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const note = String(proof || '').trim().slice(0, 400);
  if (!note) return { error: 'required' };
  let found = null;
  const missions = (state.missions || []).map((raw) => {
    const m = normalizeMission(raw);
    if (!m || m.id !== missionId) return raw;
    if (m.status !== 'active') {
      found = { error: 'not_active', mission: m };
      return raw;
    }
    const joined = (m.participants || []).some((p) => p.userId === user.id);
    if (!joined) {
      found = { error: 'not_joined', mission: m };
      return raw;
    }
    const submission = {
      id: 'sub_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      userId: user.id,
      username: user.username || 'creator',
      proof: note,
      at: Date.now(),
      status: 'pending', // Manual review · TEST MODE
    };
    // +10 demo points for submitting proof
    const participants = (m.participants || []).map((p) =>
      p.userId === user.id ? { ...p, score: (Number(p.score) || 0) + 10 } : p
    );
    found = {
      ...m,
      participants,
      submissions: [submission, ...(m.submissions || [])],
    };
    return found;
  });
  if (!found) return { error: 'not_found' };
  if (found.error) return found;
  saveMissions(missions);
  return found;
}

export function bumpMissionScore(missionId, points = 5) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const pts = Math.max(1, Math.min(50, Number(points) || 5));
  let found = null;
  const missions = (state.missions || []).map((raw) => {
    const m = normalizeMission(raw);
    if (!m || m.id !== missionId) return raw;
    const joined = (m.participants || []).some((p) => p.userId === user.id);
    if (!joined) {
      found = { error: 'not_joined', mission: m };
      return raw;
    }
    const participants = (m.participants || []).map((p) =>
      p.userId === user.id ? { ...p, score: (Number(p.score) || 0) + pts } : p
    );
    found = { ...m, participants };
    return found;
  });
  if (!found) return { error: 'not_found' };
  if (found.error) return found;
  saveMissions(missions);
  return found;
}

export function getMissionRankings(missionId) {
  const m = getMission(missionId);
  if (!m) return [];
  return [...(m.participants || [])]
    .map((p) => ({
      userId: p.userId,
      username: p.username,
      score: Number(p.score) || 0,
      referralCode: p.referralCode || '',
      joinedAt: p.joinedAt,
      submissions: (m.submissions || []).filter((s) => s.userId === p.userId).length,
    }))
    .sort((a, b) => b.score - a.score || (a.joinedAt || 0) - (b.joinedAt || 0));
}

export function seedDemoMissions({ force = false } = {}) {
  const existing = state.missions || [];
  if (existing.length && !force) {
    return { skipped: true, missions: listMissions() };
  }
  const now = Date.now();
  const day = 86400000;
  const demos = [
    {
      id: 'msn_demo_song',
      title: 'Push Long Story Short (clip challenge)',
      promoteType: 'song',
      budget: 2500,
      deadline: now + 14 * day,
      fundSource: 'dbs',
      reward: '$50–$200 demo credits by rank · DBS-funded marketing',
      status: 'active',
      participants: [
        {
          userId: 'clipper_demo',
          username: 'ClipQueen',
          joinedAt: now - 2 * day,
          score: 42,
          referralCode: 'REF-CLIP-AAA',
        },
        {
          userId: 'dbs',
          username: 'DatBoiSkeet',
          joinedAt: now - day,
          score: 28,
          referralCode: 'REF-DBS-001',
        },
      ],
      submissions: [
        {
          id: 'sub_demo1',
          userId: 'clipper_demo',
          username: 'ClipQueen',
          proof: 'https://example.com/tiktok/lss-clip-1 · 12k views',
          at: now - day,
          status: 'pending',
        },
      ],
      createdAt: now - 3 * day,
      createdBy: 'demo_admin',
    },
    {
      id: 'msn_demo_live',
      title: 'Boost Friday Night Live',
      promoteType: 'live',
      budget: 800,
      deadline: now + 5 * day,
      fundSource: 'third_party',
      reward: 'Share of $800 pot after 20% management fee',
      status: 'active',
      participants: [],
      submissions: [],
      createdAt: now - day,
      createdBy: 'demo_admin',
    },
    {
      id: 'msn_demo_app',
      title: 'Download DBS · invite 3 friends',
      promoteType: 'app',
      budget: 1200,
      deadline: now + 30 * day,
      fundSource: 'dbs',
      reward: 'Referral bonus stack · verified installs only',
      status: 'active',
      participants: [],
      submissions: [],
      createdAt: now - 5 * day,
      createdBy: 'demo_admin',
    },
    {
      id: 'msn_demo_ended',
      title: 'Ladies Only teaser push (ended)',
      promoteType: 'video',
      budget: 500,
      deadline: now - 2 * day,
      fundSource: 'third_party',
      reward: 'Completed · demo archive',
      status: 'ended',
      participants: [
        {
          userId: 'clipper_demo',
          username: 'ClipQueen',
          joinedAt: now - 10 * day,
          score: 90,
          referralCode: 'REF-CLIP-OLD',
        },
      ],
      submissions: [],
      createdAt: now - 20 * day,
      createdBy: 'demo_admin',
    },
  ].map(normalizeMission);
  saveMissions(demos);
  return { seeded: demos.length, missions: demos };
}

/** §35 24/7 Spotlight — FIFO stage, Keep Going / Play Another votes (TEST MODE · not wagers) */
const SP_FREESTYLE_MS = 60 * 1000;
const SP_EXTENSION_MS = 60 * 1000;
const SP_MAX_EXTENSIONS = 2; // 60s + 2×60s = 3 min total
const SP_KEEP_GOING_THRESHOLD = 3;
const SP_PLAY_ANOTHER_THRESHOLD = 3;
const SP_MAX_UPLOAD_STREAK = 3;
const SP_UPLOAD_TYPES = ['song', 'beat', 'music_video'];
const SP_TYPES = [...SP_UPLOAD_TYPES, 'freestyle'];

function spBucket() {
  const s = state.spotlight || {};
  return {
    nowPlaying: s.nowPlaying || null,
    queue: Array.isArray(s.queue) ? s.queue : [],
    history: Array.isArray(s.history) ? s.history : [],
    houseIndex: typeof s.houseIndex === 'number' ? s.houseIndex : 0,
  };
}

function saveSpotlight(sp) {
  state = { ...state, spotlight: sp };
  save(state);
  return sp;
}

function spTypeLabel(type) {
  if (type === 'freestyle') return 'Live Freestyle';
  if (type === 'beat') return 'Beat';
  if (type === 'music_video') return 'Music Video';
  return 'Song';
}

function finalizeSpotlightSlot(np, reason = 'ended') {
  if (!np) return null;
  return {
    id: np.id,
    userId: np.userId,
    username: np.username,
    type: np.type,
    title: np.title,
    artist: np.artist,
    startedAt: np.startedAt,
    endedAt: Date.now(),
    extensions: np.extensions || 0,
    playCount: np.playCount || 1,
    reason,
  };
}

/**
 * Resolve expired freestyle timers / pending play-another windows.
 * Safe to call on every getSpotlightState / page render.
 */
export function tickSpotlight(now = Date.now()) {
  let sp = spBucket();
  let np = sp.nowPlaying;
  if (!np) {
    // t233u/t238u — never leave stage blank; house catalog fills idle
    return ensureSpotlightHousePlaying(sp, now);
  }
  // House tracks have no freestyle timer / play-another window
  if (np.house) return sp;

  // Freestyle: when endsAt passes and no pending extension decision, auto-advance
  if (np.type === 'freestyle' && np.endsAt && now >= np.endsAt && !np.awaitingPlayAnother) {
    const votes = Object.keys(np.keepGoingVotes || {}).length;
    const canExtend =
      votes >= SP_KEEP_GOING_THRESHOLD && (np.extensions || 0) < SP_MAX_EXTENSIONS;
    if (canExtend && !np.extensionApplied) {
      // Apply one extension at the moment the clock hits zero if threshold met
      np = {
        ...np,
        extensions: (np.extensions || 0) + 1,
        endsAt: now + SP_EXTENSION_MS,
        keepGoingVotes: {},
        extensionApplied: false,
        voteWindowOpen: true,
      };
      const next = { ...sp, nowPlaying: np };
      saveSpotlight(next);
      return next;
    }
    // End freestyle → advance queue (or house catalog if empty)
    const hist = [finalizeSpotlightSlot(np, 'timer'), ...(sp.history || [])].slice(0, 30);
    const queue = [...(sp.queue || [])];
    let nextPlaying = null;
    let houseIndex = typeof sp.houseIndex === 'number' ? sp.houseIndex : 0;
    if (queue.length) {
      const next = queue.shift();
      nextPlaying = promoteQueueItem(next, now);
    } else {
      nextPlaying = makeHouseNowPlaying(houseTrackAt(houseIndex), now);
    }
    const out = { nowPlaying: nextPlaying, queue, history: hist, houseIndex };
    saveSpotlight(out);
    return out;
  }

  // Uploaded: waiting for Play Another vote after set ended
  if (np.awaitingPlayAnother && np.playAnotherDeadline && now >= np.playAnotherDeadline) {
    const votes = Object.keys(np.playAnotherVotes || {}).length;
    const streak = np.playCount || 1;
    if (votes >= SP_PLAY_ANOTHER_THRESHOLD && streak < SP_MAX_UPLOAD_STREAK) {
      np = {
        ...np,
        awaitingPlayAnother: false,
        playAnotherVotes: {},
        playAnotherDeadline: null,
        playCount: streak + 1,
        title: np.nextTitle || np.title,
        startedAt: now,
        endsAt: null,
        nextTitle: null,
      };
      const out = { ...sp, nowPlaying: np };
      saveSpotlight(out);
      return out;
    }
    // Fail vote or max streak → advance (or house if empty)
    const hist = [finalizeSpotlightSlot(np, 'play_another_fail'), ...(sp.history || [])].slice(0, 30);
    const queue = [...(sp.queue || [])];
    let nextPlaying = null;
    let houseIndex = typeof sp.houseIndex === 'number' ? sp.houseIndex : 0;
    if (queue.length) {
      nextPlaying = promoteQueueItem(queue.shift(), now);
    } else {
      nextPlaying = makeHouseNowPlaying(houseTrackAt(houseIndex), now);
    }
    const out = { nowPlaying: nextPlaying, queue, history: hist, houseIndex };
    saveSpotlight(out);
    return out;
  }

  return sp;
}

function promoteQueueItem(item, now = Date.now()) {
  const isFreestyle = item.type === 'freestyle';
  return {
    id: 'sp_' + now.toString(36) + '_' + Math.random().toString(36).slice(2, 6),
    userId: item.userId,
    username: item.username,
    type: item.type,
    title: item.title || (isFreestyle ? 'Live Freestyle' : 'Untitled'),
    artist: item.artist || item.username,
    cover: item.cover || '',
    startedAt: now,
    endsAt: isFreestyle ? now + SP_FREESTYLE_MS : null,
    extensions: 0,
    playCount: 1,
    keepGoingVotes: {},
    playAnotherVotes: {},
    voteWindowOpen: isFreestyle,
    awaitingPlayAnother: false,
    playAnotherDeadline: null,
    reactions: { fire: 0, heart: 0, clap: 0 },
    chat: [
      {
        id: 'c_' + now.toString(36),
        userId: 'system',
        username: 'DBS',
        text: `${item.username} took the Spotlight · ${spTypeLabel(item.type)} · TEST MODE`,
        at: now,
        system: true,
      },
    ],
  };
}

export function getSpotlightState() {
  const sp = tickSpotlight();
  return {
    nowPlaying: sp.nowPlaying || null,
    queue: [...(sp.queue || [])],
    history: [...(sp.history || [])],
    houseIndex: typeof sp.houseIndex === 'number' ? sp.houseIndex : 0,
    thresholds: {
      keepGoing: SP_KEEP_GOING_THRESHOLD,
      playAnother: SP_PLAY_ANOTHER_THRESHOLD,
      maxExtensions: SP_MAX_EXTENSIONS,
      maxUploadStreak: SP_MAX_UPLOAD_STREAK,
      freestyleMs: SP_FREESTYLE_MS,
    },
  };
}

/* ========== t233u/t236u/t238u · shared DatBoiSkeet house catalog ========== */
/** Build rotation list: Music Videos + Interviews + Vlogs-as-BTS (honest). Original YT only. */
export function buildDbsHouseCatalog() {
  const items = [];
  for (const v of VIDEOS || []) {
    if (!v || !v.embed) continue;
    if (v.category === 'Music Videos') {
      items.push({
        id: v.id,
        title: v.title,
        artist: v.artist || 'DatBoiSkeet',
        embed: v.embed,
        youtube: v.youtube || '',
        kind: 'music_video',
        chipLabel: 'House · Music Video',
        note: 'DatBoiSkeet catalog · original YouTube · not a live act',
        cover: v.cover || '',
      });
    } else if (v.category === 'Interviews') {
      items.push({
        id: v.id,
        title: v.title,
        artist: v.artist || 'DatBoiSkeet',
        embed: v.embed,
        youtube: v.youtube || '',
        kind: 'interview',
        chipLabel: 'House · Interview',
        note: 'DatBoiSkeet interview · original YouTube · not a live act',
        cover: v.cover || '',
      });
    }
  }
  // BTS thin — use official Vlogs playlist with honest label (no fabricated BTS embeds)
  const vlogs = (YOUTUBE_CHANNEL_PLAYLISTS || []).find((pl) => pl.id === 'pl-vlogs');
  if (vlogs && vlogs.youtube) {
    const m = String(vlogs.youtube).match(/[?&]list=([^&]+)/);
    const listId = m && m[1];
    if (listId) {
      items.push({
        id: 'house-bts-vlogs',
        title: vlogs.title || 'DatBoiSkeet Vlogs',
        artist: 'DatBoiSkeet',
        embed: 'https://www.youtube.com/embed/videoseries?list=' + listId,
        youtube: vlogs.youtube,
        kind: 'bts',
        chipLabel: 'House · BTS',
        note: 'Channel vlogs · dedicated BTS clips thin · original YouTube · not a live act',
        cover: '',
      });
    }
  }
  return items;
}

function houseCatalogLen() {
  const n = buildDbsHouseCatalog().length;
  return n > 0 ? n : 1;
}

function houseTrackAt(index) {
  const cat = buildDbsHouseCatalog();
  if (!cat.length) {
    return {
      id: 'house_empty',
      title: 'DatBoiSkeet catalog',
      artist: 'DatBoiSkeet',
      embed: '',
      youtube: 'https://www.youtube.com/@DatBoiSkeet1',
      kind: 'music_video',
      chipLabel: 'House · Music Video',
      note: 'Catalog loading · not a live act',
      cover: '',
      status: 'House rotation',
    };
  }
  const i = ((index % cat.length) + cat.length) % cat.length;
  return { ...cat[i], status: cat[i].chipLabel };
}

function makeHouseNowPlaying(track, now = Date.now()) {
  return {
    id: 'house_' + (track.id || 'x') + '_' + now.toString(36),
    userId: 'dbs',
    username: 'DatBoiSkeet',
    type: 'music_video',
    house: true,
    houseKind: track.kind || 'music_video',
    chipLabel: track.chipLabel || 'House · Music Video',
    title: track.title,
    artist: track.artist || 'DatBoiSkeet',
    embed: track.embed || '',
    youtube: track.youtube || '',
    note: track.note || 'House catalog · not a live act',
    cover: track.cover || '',
    startedAt: now,
    endsAt: null,
    extensions: 0,
    playCount: 1,
    keepGoingVotes: {},
    playAnotherVotes: {},
    voteWindowOpen: false,
    awaitingPlayAnother: false,
    playAnotherDeadline: null,
    reactions: { fire: 0, heart: 0, clap: 0 },
    chat: [
      {
        id: 'c_house_' + now.toString(36),
        userId: 'system',
        username: 'DBS',
        text: `House catalog · ${track.chipLabel || 'House'} · ${track.title} · not a live act · TEST MODE`,
        at: now,
        system: true,
      },
    ],
  };
}

/** Ensure empty stage shows house catalog (never blank). */
function ensureSpotlightHousePlaying(sp, now = Date.now()) {
  if (sp.nowPlaying) return sp;
  const idx = typeof sp.houseIndex === 'number' ? sp.houseIndex : 0;
  const track = houseTrackAt(idx);
  const np = makeHouseNowPlaying(track, now);
  const next = { ...sp, nowPlaying: np, houseIndex: idx };
  saveSpotlight(next);
  return next;
}

/** House filler when stage idle — real DatBoiSkeet YT (MV / Interview / BTS). */
export function getSpotlightHouseTrack() {
  const sp = spBucket();
  return houseTrackAt(typeof sp.houseIndex === 'number' ? sp.houseIndex : 0);
}

/** Advance house rotation index; returns next track metadata. */
export function advanceSpotlightHouseTrack() {
  const sp = spBucket();
  const len = houseCatalogLen();
  const nextIdx = ((typeof sp.houseIndex === 'number' ? sp.houseIndex : 0) + 1) % len;
  const next = { ...sp, houseIndex: nextIdx };
  // If currently showing house on stage, swap to next house item (unless queue waiting — caller handles)
  if (sp.nowPlaying && sp.nowPlaying.house) {
    next.nowPlaying = makeHouseNowPlaying(houseTrackAt(nextIdx));
  }
  saveSpotlight(next);
  return houseTrackAt(nextIdx);
}

export function joinSpotlightQueue({ type = 'song', title = '', artist = '' } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const t = SP_TYPES.includes(type) ? type : 'song';
  const sp = tickSpotlight();
  const uid = user.id;
  const alreadyQ = (sp.queue || []).some((q) => q.userId === uid);
  const onStage =
    sp.nowPlaying &&
    !sp.nowPlaying.house &&
    sp.nowPlaying.userId === uid &&
    !sp.nowPlaying.awaitingPlayAnother;
  if (alreadyQ || onStage) return { error: 'already_queued', state: getSpotlightState() };

  const label =
    String(title || '').trim().slice(0, 80) ||
    (t === 'freestyle' ? 'Live Freestyle' : t === 'beat' ? 'Untitled Beat' : t === 'music_video' ? 'Untitled MV' : 'Untitled Song');
  const art = String(artist || user.username || '').trim().slice(0, 60);

  const item = {
    id: 'q_' + Date.now().toString(36),
    userId: uid,
    username: user.username,
    type: t,
    title: label,
    artist: art,
    cover: '',
    joinedAt: Date.now(),
  };

  let nowPlaying = sp.nowPlaying;
  let queue = [...(sp.queue || [])];
  let houseIndex = typeof sp.houseIndex === 'number' ? sp.houseIndex : 0;

  // t233u: house on stage → enqueue (take stage after Skip / house advance)
  // truly empty → go live immediately (ensureHouse normally prevents empty)
  if (!nowPlaying) {
    nowPlaying = promoteQueueItem(item);
    queue = [];
  } else if (nowPlaying.house) {
    queue.push(item);
  } else {
    queue.push(item);
  }

  saveSpotlight({ ...sp, nowPlaying, queue, houseIndex });
  return { ok: true, state: getSpotlightState() };
}

export function leaveSpotlightQueue() {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const sp = tickSpotlight();
  const before = (sp.queue || []).length;
  const queue = (sp.queue || []).filter((q) => q.userId !== user.id);
  if (queue.length === before) return { error: 'not_in_queue' };
  saveSpotlight({ ...sp, queue });
  return { ok: true, state: getSpotlightState() };
}

export function removeFromSpotlightQueue(queueId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  // Demo moderator: any signed-in user may remove (TEST MODE), or admin
  const sp = tickSpotlight();
  const queue = (sp.queue || []).filter((q) => q.id !== queueId);
  saveSpotlight({ ...sp, queue });
  return { ok: true, state: getSpotlightState() };
}

export function advanceSpotlight(reason = 'advance') {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const sp = tickSpotlight();
  const np = sp.nowPlaying;
  const wasHouse = !!(np && np.house);
  const hist = np && !wasHouse
    ? [finalizeSpotlightSlot(np, reason), ...(sp.history || [])].slice(0, 30)
    : [...(sp.history || [])];
  const queue = [...(sp.queue || [])];
  let houseIndex = typeof sp.houseIndex === 'number' ? sp.houseIndex : 0;
  // Leaving a house item → bump rotation for next idle fill
  if (wasHouse) {
    houseIndex = (houseIndex + 1) % houseCatalogLen();
  }
  let nextPlaying = null;
  if (queue.length) {
    nextPlaying = promoteQueueItem(queue.shift());
  } else {
    nextPlaying = makeHouseNowPlaying(houseTrackAt(houseIndex));
  }
  saveSpotlight({ nowPlaying: nextPlaying, queue, history: hist, houseIndex });
  return { ok: true, state: getSpotlightState() };
}

export function skipSpotlight() {
  return advanceSpotlight('skip');
}

/** Uploaded Music: performer ends their set → open Play Another? vote window. */
export function endSpotlightSet() {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const sp = tickSpotlight();
  const np = sp.nowPlaying;
  if (!np) return { error: 'empty_stage' };
  if (np.house) return { error: 'house_use_skip' };
  if (np.type === 'freestyle') return { error: 'freestyle_use_timer' };
  if (np.awaitingPlayAnother) return { error: 'already_voting' };
  // Performer or demo mod
  const isPerf = np.userId === user.id;
  if (!isPerf && !isAdmin()) {
    // Still allow as Demo moderator (TEST MODE)
  }
  const streak = np.playCount || 1;
  if (streak >= SP_MAX_UPLOAD_STREAK) {
    return advanceSpotlight('max_streak');
  }
  const updated = {
    ...np,
    awaitingPlayAnother: true,
    playAnotherVotes: {},
    playAnotherDeadline: Date.now() + 30 * 1000, // 30s vote window
    nextTitle: np.title + ' (take ' + (streak + 1) + ')',
  };
  saveSpotlight({ ...sp, nowPlaying: updated });
  return { ok: true, state: getSpotlightState() };
}

export function castKeepGoing() {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const sp = tickSpotlight();
  const np = sp.nowPlaying;
  if (!np || np.type !== 'freestyle') return { error: 'no_freestyle' };
  if (!np.voteWindowOpen) return { error: 'window_closed' };
  if (np.awaitingPlayAnother) return { error: 'wrong_mode' };
  if ((np.extensions || 0) >= SP_MAX_EXTENSIONS) return { error: 'max_extensions' };
  const votes = { ...(np.keepGoingVotes || {}) };
  if (votes[user.id]) return { error: 'already_voted', state: getSpotlightState() };
  votes[user.id] = Date.now();

  // Demo: also allow simulating fan votes via repeated helper? Page will call simulateFanKeepGoing
  let updated = { ...np, keepGoingVotes: votes };

  // If threshold met before endsAt, apply extension immediately (early lock-in)
  const count = Object.keys(votes).length;
  if (count >= SP_KEEP_GOING_THRESHOLD && (np.extensions || 0) < SP_MAX_EXTENSIONS) {
    updated = {
      ...updated,
      extensions: (np.extensions || 0) + 1,
      endsAt: Date.now() + SP_EXTENSION_MS,
      keepGoingVotes: {},
      voteWindowOpen: true,
    };
  }

  saveSpotlight({ ...sp, nowPlaying: updated });
  return { ok: true, state: getSpotlightState(), votes: Object.keys(updated.keepGoingVotes || {}).length || count };
}

/** Simulate N fan Keep Going clicks (demo threshold helper). */
export function simulateFanKeepGoing(n = 2) {
  const sp = tickSpotlight();
  const np = sp.nowPlaying;
  if (!np || np.type !== 'freestyle') return { error: 'no_freestyle' };
  const votes = { ...(np.keepGoingVotes || {}) };
  const start = Object.keys(votes).length;
  for (let i = 0; i < n; i++) {
    const fid = 'fan_sim_' + (start + i) + '_' + Date.now().toString(36);
    votes[fid] = Date.now();
  }
  let updated = { ...np, keepGoingVotes: votes };
  const count = Object.keys(votes).length;
  if (count >= SP_KEEP_GOING_THRESHOLD && (np.extensions || 0) < SP_MAX_EXTENSIONS) {
    updated = {
      ...updated,
      extensions: (np.extensions || 0) + 1,
      endsAt: Date.now() + SP_EXTENSION_MS,
      keepGoingVotes: {},
      voteWindowOpen: true,
    };
  }
  saveSpotlight({ ...sp, nowPlaying: updated });
  return { ok: true, state: getSpotlightState() };
}

export function castPlayAnother() {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const sp = tickSpotlight();
  const np = sp.nowPlaying;
  if (!np || !np.awaitingPlayAnother) return { error: 'no_vote' };
  const votes = { ...(np.playAnotherVotes || {}) };
  if (votes[user.id]) return { error: 'already_voted', state: getSpotlightState() };
  votes[user.id] = Date.now();
  let updated = { ...np, playAnotherVotes: votes };
  const count = Object.keys(votes).length;
  const streak = np.playCount || 1;
  if (count >= SP_PLAY_ANOTHER_THRESHOLD && streak < SP_MAX_UPLOAD_STREAK) {
    updated = {
      ...updated,
      awaitingPlayAnother: false,
      playAnotherVotes: {},
      playAnotherDeadline: null,
      playCount: streak + 1,
      title: np.nextTitle || np.title,
      startedAt: Date.now(),
      endsAt: null,
      nextTitle: null,
    };
  }
  saveSpotlight({ ...sp, nowPlaying: updated });
  return { ok: true, state: getSpotlightState() };
}

export function simulateFanPlayAnother(n = 2) {
  const sp = tickSpotlight();
  const np = sp.nowPlaying;
  if (!np || !np.awaitingPlayAnother) return { error: 'no_vote' };
  const votes = { ...(np.playAnotherVotes || {}) };
  const start = Object.keys(votes).length;
  for (let i = 0; i < n; i++) {
    votes['fan_pa_' + (start + i) + '_' + Date.now().toString(36)] = Date.now();
  }
  let updated = { ...np, playAnotherVotes: votes };
  const count = Object.keys(votes).length;
  const streak = np.playCount || 1;
  if (count >= SP_PLAY_ANOTHER_THRESHOLD && streak < SP_MAX_UPLOAD_STREAK) {
    updated = {
      ...updated,
      awaitingPlayAnother: false,
      playAnotherVotes: {},
      playAnotherDeadline: null,
      playCount: streak + 1,
      title: np.nextTitle || np.title,
      startedAt: Date.now(),
      endsAt: null,
      nextTitle: null,
    };
  }
  saveSpotlight({ ...sp, nowPlaying: updated });
  return { ok: true, state: getSpotlightState() };
}

export function reactSpotlight(kind = 'fire') {
  const sp = tickSpotlight();
  const np = sp.nowPlaying;
  if (!np) return { error: 'empty_stage' };
  const key = ['fire', 'heart', 'clap'].includes(kind) ? kind : 'fire';
  const reactions = { ...(np.reactions || { fire: 0, heart: 0, clap: 0 }) };
  reactions[key] = (reactions[key] || 0) + 1;
  saveSpotlight({ ...sp, nowPlaying: { ...np, reactions } });
  return { ok: true, state: getSpotlightState() };
}

export function sendSpotlightChat(text) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const msg = String(text || '').trim().slice(0, 200);
  if (!msg) return { error: 'empty' };
  const sp = tickSpotlight();
  const np = sp.nowPlaying;
  if (!np) return { error: 'empty_stage' };
  const chat = [
    ...(np.chat || []),
    {
      id: 'c_' + Date.now().toString(36),
      userId: user.id,
      username: user.username,
      text: msg,
      at: Date.now(),
    },
  ].slice(-40);
  saveSpotlight({ ...sp, nowPlaying: { ...np, chat } });
  return { ok: true, state: getSpotlightState() };
}

export function listSpotlightHistory(limit = 20) {
  return (tickSpotlight().history || []).slice(0, limit);
}

/* ========== §26 Fan Clubs (Build) — append-only ========== */

function getFanClubsBucket() {
  const fc = state.fanClubs || { clubs: [], posts: {}, seeded: false };
  return {
    clubs: Array.isArray(fc.clubs) ? fc.clubs : [],
    posts: fc.posts && typeof fc.posts === 'object' ? fc.posts : {},
    seeded: !!fc.seeded,
  };
}

function saveFanClubs(bucket) {
  state = { ...state, fanClubs: bucket };
  save(state);
}

function fcUid(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function listFanClubs() {
  ensureFanClubsSeeded();
  return getFanClubsBucket().clubs.slice().sort((a, b) => {
    if (a.official && !b.official) return -1;
    if (!a.official && b.official) return 1;
    return (b.memberCount || 0) - (a.memberCount || 0);
  });
}

export function getFanClub(clubId) {
  ensureFanClubsSeeded();
  return getFanClubsBucket().clubs.find((c) => c.id === clubId) || null;
}

export function ensureFanClubsSeeded({ force = false } = {}) {
  const bucket = getFanClubsBucket();
  if (bucket.seeded && !force && bucket.clubs.length > 0) return { skipped: true, clubs: bucket.clubs };
  const now = Date.now();
  const day = 86400000;
  const clubs = [
    {
      id: 'fc_official_dbs',
      name: 'DatBoiSkeet Official',
      description:
        'Official DatBoiSkeet fan club inside DBS Lounge. Music drops, Vault tips, Foreign X-Change, and community rules — DBS branding first. Follow optional.',
      graphic: '/brand/logo-dbs-v3@2x.webp',
      hostId: 'dbs',
      hostName: 'DatBoiSkeet',
      privacy: 'public', // public | members | paid
      official: true,
      members: ['dbs'],
      followers: ['dbs'],
      mods: ['dbs'],
      memberCount: 1,
      createdAt: now - 14 * day,
    },
    {
      id: 'fc_lss_crew',
      name: 'Long Story Short Crew',
      description: 'Creator club for LSS listeners. Public lounge chat + Skeet+ members-only drop room.',
      graphic: '/music/01_Long_Story_Short_Coming_Soon.jpg',
      hostId: 'dbs',
      hostName: 'DatBoiSkeet',
      privacy: 'members',
      official: false,
      members: ['dbs'],
      followers: ['dbs'],
      mods: ['dbs'],
      memberCount: 1,
      createdAt: now - 7 * day,
    },
    {
      id: 'fc_ladies_only',
      name: 'Ladies Only Circle',
      description: 'Paid / Skeet+ gated room demo for Ladies Only supporters. Unlock via membership TEST MODE.',
      graphic: '/music/02_Ladies_Only_Coming_Soon.jpg',
      hostId: 'dbs',
      hostName: 'DatBoiSkeet',
      privacy: 'paid',
      official: false,
      members: ['dbs'],
      followers: [],
      mods: ['dbs'],
      memberCount: 1,
      createdAt: now - 3 * day,
    },
  ];
  const posts = {
    fc_official_dbs: [
      {
        id: 'fcp_welcome',
        userId: 'dbs',
        username: 'DatBoiSkeet',
        text: 'Welcome to the official club. Discover music on #/music · explore more on #/explore. No forced follows.',
        at: now - 2 * day,
        pinned: true,
        removed: false,
      },
      {
        id: 'fcp_lounge',
        userId: 'dbs',
        username: 'DatBoiSkeet',
        text: 'DBS Lounge rooms stay music-first. Keep it respectful — see Community Guidelines.',
        at: now - day,
        pinned: false,
        removed: false,
      },
    ],
    fc_lss_crew: [
      {
        id: 'fcp_lss1',
        userId: 'dbs',
        username: 'DatBoiSkeet',
        text: 'LSS cover art is live in Coming Soon. Members can discuss theories here.',
        at: now - day,
        pinned: false,
        removed: false,
      },
    ],
    fc_ladies_only: [
      {
        id: 'fcp_lo1',
        userId: 'dbs',
        username: 'DatBoiSkeet',
        text: 'Skeet+ members-only preview chat. Join Skeet+ on Pricing (TEST MODE) to unlock.',
        at: now - 12 * 3600000,
        pinned: true,
        removed: false,
      },
    ],
  };
  saveFanClubs({ clubs, posts, seeded: true });
  return { seeded: clubs.length, clubs };
}

export function createFanClub({ name, description, graphic, privacy = 'public' } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  // Creator/admin TEST MODE gate
  if (!(isAdmin() || user.role === 'creator' || user.id === 'dbs')) {
    // Allow any signed-in demo user to create in TEST MODE, but tag as creator demo
  }
  const n = String(name || '').trim().slice(0, 48);
  if (!n) return { error: 'name' };
  const priv = ['public', 'members', 'paid'].includes(privacy) ? privacy : 'public';
  ensureFanClubsSeeded();
  const bucket = getFanClubsBucket();
  const club = {
    id: fcUid('fc'),
    name: n,
    description: String(description || '').trim().slice(0, 280),
    graphic: String(graphic || '/brand/logo-dbs-v3@2x.webp').slice(0, 200),
    hostId: user.id,
    hostName: user.username,
    privacy: priv,
    official: false,
    members: [user.id],
    followers: [user.id],
    mods: [user.id],
    memberCount: 1,
    createdAt: Date.now(),
  };
  saveFanClubs({
    ...bucket,
    clubs: [club, ...bucket.clubs],
    posts: { ...bucket.posts, [club.id]: [] },
    seeded: true,
  });
  return { ok: true, club };
}

function mutateClub(clubId, fn) {
  ensureFanClubsSeeded();
  const bucket = getFanClubsBucket();
  const idx = bucket.clubs.findIndex((c) => c.id === clubId);
  if (idx < 0) return { error: 'missing' };
  const next = fn({ ...bucket.clubs[idx] });
  if (next && next.error) return next;
  const clubs = bucket.clubs.slice();
  clubs[idx] = next;
  saveFanClubs({ ...bucket, clubs });
  return { ok: true, club: next };
}

export function joinFanClub(clubId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  return mutateClub(clubId, (c) => {
    const members = new Set(c.members || []);
    members.add(user.id);
    return { ...c, members: [...members], memberCount: members.size };
  });
}

export function leaveFanClub(clubId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  return mutateClub(clubId, (c) => {
    if (c.hostId === user.id) return { error: 'host' };
    const members = (c.members || []).filter((id) => id !== user.id);
    return { ...c, members, memberCount: members.length };
  });
}

export function followFanClub(clubId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  return mutateClub(clubId, (c) => {
    const followers = new Set(c.followers || []);
    followers.add(user.id);
    return { ...c, followers: [...followers] };
  });
}

export function unfollowFanClub(clubId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  return mutateClub(clubId, (c) => {
    const followers = (c.followers || []).filter((id) => id !== user.id);
    return { ...c, followers };
  });
}

export function isClubMember(clubId) {
  const user = state.user;
  if (!user) return false;
  const c = getFanClub(clubId);
  return !!(c && (c.members || []).includes(user.id));
}

export function isClubFollower(clubId) {
  const user = state.user;
  if (!user) return false;
  const c = getFanClub(clubId);
  return !!(c && (c.followers || []).includes(user.id));
}

export function isClubMod(clubId) {
  const user = state.user;
  if (!user) return false;
  const c = getFanClub(clubId);
  if (!c) return false;
  return isAdmin() || c.hostId === user.id || (c.mods || []).includes(user.id);
}

/** Access gate for discussion room: public always; members need join; paid needs Skeet+ (or higher). */
export function canAccessClubRoom(clubId) {
  const c = getFanClub(clubId);
  if (!c) return { ok: false, reason: 'missing' };
  if (c.privacy === 'public') return { ok: true, reason: 'public' };
  if (c.privacy === 'members') {
    if (isClubMember(clubId) || isClubMod(clubId)) return { ok: true, reason: 'member' };
    return { ok: false, reason: 'members' };
  }
  if (c.privacy === 'paid') {
    const mem = getMembership();
    const rank = { null: 0, 'skeet+': 1, backstage: 2, inner: 3 };
    if ((rank[mem || 'null'] || 0) >= 1 || isClubMod(clubId)) return { ok: true, reason: 'paid' };
    return { ok: false, reason: 'paid' };
  }
  return { ok: true, reason: 'public' };
}

export function listClubPosts(clubId) {
  ensureFanClubsSeeded();
  const posts = getFanClubsBucket().posts[clubId] || [];
  return posts
    .filter((p) => !p.removed)
    .slice()
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return (b.at || 0) - (a.at || 0);
    });
}

export function addClubPost(clubId, text) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const access = canAccessClubRoom(clubId);
  if (!access.ok) return { error: 'gated', reason: access.reason };
  const body = String(text || '').trim().slice(0, 500);
  if (!body) return { error: 'empty' };
  const bucket = getFanClubsBucket();
  if (!bucket.clubs.some((c) => c.id === clubId)) return { error: 'missing' };
  const post = {
    id: fcUid('fcp'),
    userId: user.id,
    username: user.username,
    text: body,
    at: Date.now(),
    pinned: false,
    removed: false,
  };
  const list = [post, ...(bucket.posts[clubId] || [])].slice(0, 100);
  saveFanClubs({ ...bucket, posts: { ...bucket.posts, [clubId]: list } });
  return { ok: true, post };
}

export function pinClubPost(clubId, postId) {
  if (!isClubMod(clubId)) return { error: 'mod' };
  const bucket = getFanClubsBucket();
  const list = (bucket.posts[clubId] || []).map((p) =>
    p.id === postId ? { ...p, pinned: !p.pinned } : p
  );
  saveFanClubs({ ...bucket, posts: { ...bucket.posts, [clubId]: list } });
  return { ok: true };
}

export function removeClubPost(clubId, postId) {
  if (!isClubMod(clubId)) return { error: 'mod' };
  const bucket = getFanClubsBucket();
  const list = (bucket.posts[clubId] || []).map((p) =>
    p.id === postId ? { ...p, removed: true } : p
  );
  saveFanClubs({ ...bucket, posts: { ...bucket.posts, [clubId]: list } });
  return { ok: true };
}

/** §32 Share & Earn + §33 Refer & Earn — TEST MODE rewards (Commerce) */
const SHARE_PLATFORMS = ['instagram', 'tiktok', 'facebook', 'youtube', 'x', 'snapchat', 'other'];

const SHARE_REWARD_TIERS = [
  { id: 'badge', minVerified: 1, label: 'Exclusive DBS badge', kind: 'badge' },
  { id: 'decoration', minVerified: 2, label: 'Premium avatar decoration', kind: 'decoration' },
  { id: 'skeet7', minVerified: 3, label: '7 days Skeet+ (TEST MODE)', kind: 'membership_trial', membership: 'skeet+', days: 7 },
  {
    id: 'skeet30',
    minVerified: 3,
    requireAllLinked: true,
    label: '30 days Skeet+ (all linked · min 3)',
    kind: 'membership_trial',
    membership: 'skeet+',
    days: 30,
  },
];

const REFER_MILESTONES = [
  { n: 1, id: 'm1', label: 'Profile decoration', kind: 'decoration' },
  { n: 3, id: 'm3', label: '7 days Skeet+ (TEST MODE)', kind: 'membership_trial', membership: 'skeet+', days: 7 },
  { n: 5, id: 'm5', label: '30 days Skeet+ (TEST MODE)', kind: 'membership_trial', membership: 'skeet+', days: 30 },
  { n: 10, id: 'm10', label: 'Premium profile bundle', kind: 'bundle' },
  { n: 25, id: 'm25', label: '30 days Backstage (TEST MODE)', kind: 'membership_trial', membership: 'backstage', days: 30 },
  { n: 50, id: 'm50', label: '30 days Inner Circle (TEST MODE)', kind: 'membership_trial', membership: 'inner', days: 30 },
  { n: 100, id: 'm100', label: 'Founder Promoter badge / VIP', kind: 'badge' },
];

function emptyShareEarn() {
  return {
    platformsLinked: [],
    challenge: null,
    submissions: [],
    rewardsClaimed: [],
  };
}

function emptyReferEarn() {
  return {
    code: '',
    invitees: [],
    milestonesClaimed: [],
  };
}

function normalizeShareEarn(raw) {
  const base = emptyShareEarn();
  if (!raw || typeof raw !== 'object') return base;
  return {
    platformsLinked: Array.isArray(raw.platformsLinked) ? raw.platformsLinked : [],
    challenge: raw.challenge && typeof raw.challenge === 'object' ? raw.challenge : null,
    submissions: Array.isArray(raw.submissions) ? raw.submissions : [],
    rewardsClaimed: Array.isArray(raw.rewardsClaimed) ? raw.rewardsClaimed : [],
  };
}

function normalizeReferEarn(raw) {
  const base = emptyReferEarn();
  if (!raw || typeof raw !== 'object') return base;
  return {
    code: typeof raw.code === 'string' ? raw.code : '',
    invitees: Array.isArray(raw.invitees) ? raw.invitees : [],
    milestonesClaimed: Array.isArray(raw.milestonesClaimed) ? raw.milestonesClaimed : [],
  };
}

function saveShareEarn(se) {
  state = { ...state, shareEarn: normalizeShareEarn(se) };
  save(state);
  return state.shareEarn;
}

function saveReferEarn(re) {
  state = { ...state, referEarn: normalizeReferEarn(re) };
  save(state);
  return state.referEarn;
}

function referralCodeFromUser(user) {
  if (!user) return 'DBS-GUEST';
  const slug = String(user.username || 'fan')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 8) || 'FAN';
  const tail = String(user.id || '')
    .replace(/^u_/, '')
    .slice(-4)
    .toUpperCase() || 'DEMO';
  return `DBS-${slug}-${tail}`;
}

function uid(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function dayKey(ts = Date.now()) {
  return new Date(ts).toISOString().slice(0, 10);
}

export function getShareEarn() {
  return normalizeShareEarn(state.shareEarn);
}

export function listSharePlatforms() {
  return SHARE_PLATFORMS.slice();
}

export function listShareRewardTiers() {
  return SHARE_REWARD_TIERS.map((t) => ({ ...t }));
}

export function linkSharePlatform({ platform, handle = '', url = '', followers = '' } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const plat = String(platform || '').toLowerCase().trim();
  if (!SHARE_PLATFORMS.includes(plat)) return { error: 'bad_platform' };
  const handleClean = String(handle || '')
    .trim()
    .replace(/^@+/, '')
    .slice(0, 64);
  const urlClean = String(url || '').trim().slice(0, 240);
  if (!handleClean && !urlClean) return { error: 'required' };
  const se = getShareEarn();
  if ((se.platformsLinked || []).some((p) => p.platform === plat)) {
    return { error: 'already_linked', shareEarn: se };
  }
  const entry = {
    id: uid('plat'),
    platform: plat,
    handle: handleClean,
    url: urlClean,
    followers: String(followers || '').trim().slice(0, 32),
    linkedAt: Date.now(),
  };
  const next = {
    ...se,
    platformsLinked: [...(se.platformsLinked || []), entry],
  };
  saveShareEarn(next);
  return { ok: true, platform: entry, shareEarn: getShareEarn() };
}

export function unlinkSharePlatform(platformId) {
  const se = getShareEarn();
  const next = {
    ...se,
    platformsLinked: (se.platformsLinked || []).filter((p) => p.id !== platformId),
  };
  saveShareEarn(next);
  return getShareEarn();
}

export function startShareChallenge() {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const se = getShareEarn();
  if (se.challenge && se.challenge.status === 'active') {
    return { error: 'already_active', shareEarn: se };
  }
  const code = ensureReferCode().code;
  const startedAt = Date.now();
  const challenge = {
    id: uid('ch'),
    startedAt,
    endsAt: startedAt + 24 * 60 * 60 * 1000,
    adTitle: 'DatBoiSkeet · Long Story Short & Ladies Only',
    caption:
      '🔥 Join me on DBS — music, live, vault & more. Long Story Short + Ladies Only Coming Soon. #DBS #PaidPartnership #ad',
    trackedLink: `https://dbs.app/s/${code}?utm=share24`,
    status: 'active',
    disclosure: 'Incentivized promotion · disclose #ad / Paid partnership',
  };
  // Reset challenge-scoped submissions/rewards for a fresh run (keep linked platforms)
  saveShareEarn({
    ...se,
    challenge,
    submissions: [],
    rewardsClaimed: (se.rewardsClaimed || []).filter((r) => r.challengeId !== challenge.id),
  });
  return { ok: true, challenge, shareEarn: getShareEarn() };
}

export function simulateShareChallengeElapsed() {
  const se = getShareEarn();
  if (!se.challenge || se.challenge.status !== 'active') return { error: 'no_active' };
  const challenge = {
    ...se.challenge,
    startedAt: Date.now() - 25 * 60 * 60 * 1000,
    endsAt: Date.now() - 1 * 60 * 60 * 1000,
    simulatedElapsed: true,
  };
  saveShareEarn({ ...se, challenge });
  return { ok: true, challenge, shareEarn: getShareEarn() };
}

export function endShareChallenge() {
  const se = getShareEarn();
  if (!se.challenge) return { error: 'none' };
  const challenge = { ...se.challenge, status: 'ended', endedAt: Date.now() };
  saveShareEarn({ ...se, challenge });
  return { ok: true, challenge, shareEarn: getShareEarn() };
}

export function submitSharePost({ platform, postUrl = '' } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const se = getShareEarn();
  if (!se.challenge || se.challenge.status !== 'active') return { error: 'no_challenge' };
  const plat = String(platform || '').toLowerCase().trim();
  if (!SHARE_PLATFORMS.includes(plat)) return { error: 'bad_platform' };
  const url = String(postUrl || '').trim().slice(0, 400);
  if (!url) return { error: 'required' };
  // Prefer linked platforms; allow submit for any listed platform in demo
  const alreadyPendingOrVerified = (se.submissions || []).some(
    (s) => s.platform === plat && (s.status === 'pending' || s.status === 'verified')
  );
  if (alreadyPendingOrVerified) return { error: 'duplicate', shareEarn: se };
  const submission = {
    id: uid('sub'),
    platform: plat,
    postUrl: url,
    submittedAt: Date.now(),
    status: 'pending', // Manual / demo verification — not guaranteed auto-check
    note: 'Awaiting 24h continuous visibility check (manual/demo)',
  };
  saveShareEarn({
    ...se,
    submissions: [submission, ...(se.submissions || [])],
  });
  return { ok: true, submission, shareEarn: getShareEarn() };
}

export function setShareSubmissionStatus(submissionId, status, { note = '' } = {}) {
  if (!['pending', 'verified', 'rejected'].includes(status)) return { error: 'bad_status' };
  const se = getShareEarn();
  let found = null;
  const submissions = (se.submissions || []).map((s) => {
    if (s.id !== submissionId) return s;
    found = {
      ...s,
      status,
      verifiedAt: status === 'verified' ? Date.now() : s.verifiedAt || null,
      note:
        note ||
        (status === 'verified'
          ? 'Demo verified · 24h visibility assumed (manual)'
          : status === 'rejected'
            ? 'Rejected · ineligible / deleted / unverified'
            : s.note),
    };
    return found;
  });
  if (!found) return { error: 'not_found' };
  saveShareEarn({ ...se, submissions });
  return { ok: true, submission: found, shareEarn: getShareEarn() };
}

export function countVerifiedSharePlatforms() {
  const se = getShareEarn();
  const verified = new Set(
    (se.submissions || []).filter((s) => s.status === 'verified').map((s) => s.platform)
  );
  return verified.size;
}

export function getClaimableShareRewards() {
  const se = getShareEarn();
  const verifiedCount = countVerifiedSharePlatforms();
  const linkedCount = (se.platformsLinked || []).length;
  const claimedIds = new Set((se.rewardsClaimed || []).map((r) => r.tierId));
  return SHARE_REWARD_TIERS.filter((tier) => {
    if (claimedIds.has(tier.id)) return false;
    if (verifiedCount < tier.minVerified) return false;
    if (tier.requireAllLinked) {
      // all linked platforms verified, and at least 3 linked
      if (linkedCount < 3) return false;
      const linkedPlats = new Set((se.platformsLinked || []).map((p) => p.platform));
      const verifiedPlats = new Set(
        (se.submissions || []).filter((s) => s.status === 'verified').map((s) => s.platform)
      );
      for (const p of linkedPlats) {
        if (!verifiedPlats.has(p)) return false;
      }
    }
    return true;
  }).map((t) => ({ ...t, verifiedCount, linkedCount }));
}

export function claimShareReward(tierId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const claimable = getClaimableShareRewards();
  const tier = claimable.find((t) => t.id === tierId);
  if (!tier) return { error: 'not_claimable' };
  const se = getShareEarn();
  const claim = {
    id: uid('srw'),
    tierId: tier.id,
    label: tier.label,
    kind: tier.kind,
    at: Date.now(),
    challengeId: se.challenge?.id || null,
    testMode: true,
  };
  // Apply membership trial chips as demo membership (no real billing)
  if (tier.membership) {
    setMembership(tier.membership, true);
  }
  saveShareEarn({
    ...se,
    rewardsClaimed: [claim, ...(se.rewardsClaimed || [])],
  });
  return { ok: true, claim, shareEarn: getShareEarn(), membership: getMembership() };
}

export function resetShareEarnDemo() {
  saveShareEarn(emptyShareEarn());
  return getShareEarn();
}

/** §33 Refer & Earn */
export function getReferEarn() {
  return normalizeReferEarn(state.referEarn);
}

export function listReferMilestones() {
  return REFER_MILESTONES.map((m) => ({ ...m }));
}

export function ensureReferCode() {
  const user = state.user;
  const re = getReferEarn();
  if (re.code) return re;
  const code = referralCodeFromUser(user);
  return saveReferEarn({ ...re, code });
}

export function getReferLink() {
  const re = ensureReferCode();
  return `https://dbs.app/r/${re.code}`;
}

export function simulateReferInvitee({ username = '' } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const re = ensureReferCode();
  const name =
    String(username || '').trim().slice(0, 24) ||
    'Invitee' + (re.invitees.length + 1);
  // Fraud-resistant demo: block self-referral by username match
  if (name.toLowerCase() === String(user.username || '').toLowerCase()) {
    return { error: 'self_referral' };
  }
  const invitee = {
    id: uid('inv'),
    username: name,
    signedUpAt: Date.now(),
    activeDays: [], // distinct YYYY-MM-DD within first 7 days
    status: 'pending', // pending until 3 active days
    welcomeClaimed: false,
    flaggedFraud: false,
  };
  saveReferEarn({
    ...re,
    invitees: [invitee, ...(re.invitees || [])],
  });
  return { ok: true, invitee, referEarn: getReferEarn() };
}

export function claimInviteeWelcome(inviteeId) {
  const re = getReferEarn();
  let found = null;
  const invitees = (re.invitees || []).map((inv) => {
    if (inv.id !== inviteeId) return inv;
    if (inv.flaggedFraud) {
      found = { error: 'fraud', invitee: inv };
      return inv;
    }
    found = { ...inv, welcomeClaimed: true, welcomeAt: Date.now() };
    return found;
  });
  if (!found) return { error: 'not_found' };
  if (found.error) return found;
  saveReferEarn({ ...re, invitees });
  return { ok: true, invitee: found, perk: 'Welcome badge / profile decoration (TEST MODE)' };
}

export function markInviteeActiveDay(inviteeId, { day = null } = {}) {
  const re = getReferEarn();
  let found = null;
  const invitees = (re.invitees || []).map((inv) => {
    if (inv.id !== inviteeId) return inv;
    if (inv.flaggedFraud) {
      found = { error: 'fraud', invitee: inv };
      return inv;
    }
    const signed = Number(inv.signedUpAt) || Date.now();
    const windowEnd = signed + 7 * 86400000;
    let key = day;
    if (!key) {
      // Demo: advance to next unused day within first-7-day window
      const existing = new Set(inv.activeDays || []);
      let picked = null;
      for (let i = 0; i < 7; i++) {
        const k = dayKey(signed + i * 86400000);
        if (!existing.has(k)) {
          picked = k;
          break;
        }
      }
      if (!picked) {
        found = { error: 'window_full', invitee: inv };
        return inv;
      }
      key = picked;
    }
    const dayTs = Date.parse(key + 'T12:00:00Z');
    if (!Number.isFinite(dayTs) || dayTs < signed - 86400000 || dayTs > windowEnd) {
      found = { error: 'outside_window', invitee: inv };
      return inv;
    }
    const activeDays = Array.from(new Set([...(inv.activeDays || []), key])).sort();
    let status = inv.status;
    if (activeDays.length >= 3) status = 'active';
    found = { ...inv, activeDays, status };
    return found;
  });
  if (!found) return { error: 'not_found' };
  if (found.error) return found;
  saveReferEarn({ ...re, invitees });
  return { ok: true, invitee: found, referEarn: getReferEarn() };
}

export function flagInviteeFraud(inviteeId, flagged = true) {
  const re = getReferEarn();
  let found = null;
  const invitees = (re.invitees || []).map((inv) => {
    if (inv.id !== inviteeId) return inv;
    found = {
      ...inv,
      flaggedFraud: !!flagged,
      status: flagged ? 'fraud' : inv.activeDays?.length >= 3 ? 'active' : 'pending',
    };
    return found;
  });
  if (!found) return { error: 'not_found' };
  saveReferEarn({ ...re, invitees });
  return { ok: true, invitee: found, referEarn: getReferEarn() };
}

export function countVerifiedActiveReferrals() {
  const re = getReferEarn();
  return (re.invitees || []).filter((inv) => inv.status === 'active' && !inv.flaggedFraud).length;
}

export function getClaimableReferMilestones() {
  const re = getReferEarn();
  const active = countVerifiedActiveReferrals();
  const claimed = new Set((re.milestonesClaimed || []).map((m) => m.milestoneId));
  return REFER_MILESTONES.filter((m) => active >= m.n && !claimed.has(m.id)).map((m) => ({
    ...m,
    activeCount: active,
  }));
}

export function claimReferMilestone(milestoneId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const claimable = getClaimableReferMilestones();
  const mile = claimable.find((m) => m.id === milestoneId);
  if (!mile) return { error: 'not_claimable' };
  const re = getReferEarn();
  const claim = {
    id: uid('rmw'),
    milestoneId: mile.id,
    n: mile.n,
    label: mile.label,
    kind: mile.kind,
    at: Date.now(),
    testMode: true,
    note: 'Distinct from Clippers commissions · TEST MODE · no real billing',
  };
  if (mile.membership) {
    setMembership(mile.membership, true);
  }
  saveReferEarn({
    ...re,
    milestonesClaimed: [claim, ...(re.milestonesClaimed || [])],
  });
  return { ok: true, claim, referEarn: getReferEarn(), membership: getMembership() };
}

export function resetReferEarnDemo() {
  const user = state.user;
  saveReferEarn({
    ...emptyReferEarn(),
    code: referralCodeFromUser(user),
  });
  return getReferEarn();
}

export function seedDemoReferrals({ force = false } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const re = ensureReferCode();
  if (!force && (re.invitees || []).length > 0) {
    return { error: 'already_seeded', referEarn: re };
  }
  const now = Date.now();
  const day = 86400000;
  const demos = [
    {
      id: 'inv_demo_a',
      username: 'NovaFan',
      signedUpAt: now - 5 * day,
      activeDays: [
        dayKey(now - 5 * day),
        dayKey(now - 4 * day),
        dayKey(now - 3 * day),
      ],
      status: 'active',
      welcomeClaimed: true,
      flaggedFraud: false,
    },
    {
      id: 'inv_demo_b',
      username: 'ClipCurious',
      signedUpAt: now - 2 * day,
      activeDays: [dayKey(now - 2 * day)],
      status: 'pending',
      welcomeClaimed: true,
      flaggedFraud: false,
    },
    {
      id: 'inv_demo_c',
      username: 'BottyMcBot',
      signedUpAt: now - 6 * day,
      activeDays: [],
      status: 'fraud',
      welcomeClaimed: false,
      flaggedFraud: true,
    },
  ];
  saveReferEarn({
    ...re,
    invitees: demos,
    // Preserve claimed milestones even on force reseed (Checker: no double-claim)
    milestonesClaimed: re.milestonesClaimed || [],
  });
  return { ok: true, seeded: demos.length, referEarn: getReferEarn() };
}

/* ========== §37 DBS Restream — Free Multi-Platform Go Live ========== */

export const RESTREAM_PLATFORM_DEFS = [
  { id: 'youtube', label: 'YouTube', color: '#ff4444', hint: 'YouTube Live / Studio' },
  { id: 'tiktok', label: 'TikTok', color: '#69c9d0', hint: 'TikTok LIVE' },
  { id: 'twitch', label: 'Twitch', color: '#9146ff', hint: 'Twitch Dashboard' },
  { id: 'facebook', label: 'Facebook', color: '#1877f2', hint: 'Facebook Live' },
  { id: 'instagram', label: 'Instagram', color: '#e1306c', hint: 'IG Live (demo)' },
  { id: 'kick', label: 'Kick', color: '#53fc18', hint: 'Kick Studio' },
  { id: 'custom_rtmp', label: 'Custom RTMP', color: '#ffb020', hint: 'Any RTMP endpoint' },
];

const DEFAULT_CAMPAIGN_CONFIG = () => ({
  freeMaxDestinations: 2,
  houseUnlimited: true,
  houseUserIds: ['dbs'],
  tiers: {
    bronze: {
      id: 'bronze',
      label: 'Bronze',
      price: 4.99,
      maxDestinations: 3,
      placement: false,
      badge: 'Bronze Streamer',
      perks: ['3 destination slots', 'Campaign badge on Go Live'],
    },
    silver: {
      id: 'silver',
      label: 'Silver',
      price: 9.99,
      maxDestinations: 5,
      placement: true,
      badge: 'Silver Streamer',
      perks: ['5 destination slots', 'Campaign badge', 'Explore / Live placement flag'],
    },
    gold: {
      id: 'gold',
      label: 'Gold',
      price: 19.99,
      maxDestinations: 7,
      placement: true,
      badge: 'Gold Streamer',
      perks: ['All 7 destinations', 'Campaign badge', 'Priority Explore / Live placement'],
    },
  },
});

function emptyRestream() {
  return {
    platforms: {},
    selected: [],
    session: null,
    history: [],
    ingest: null,
    campaign: { tier: null, status: 'none', enrolledAt: null, cancelledAt: null },
    campaignConfig: null,
  };
}

function restreamBucket() {
  const r = state.restream || emptyRestream();
  return {
    ...emptyRestream(),
    ...r,
    platforms: r.platforms && typeof r.platforms === 'object' ? r.platforms : {},
    selected: Array.isArray(r.selected) ? r.selected : [],
    history: Array.isArray(r.history) ? r.history : [],
    campaign: { ...emptyRestream().campaign, ...(r.campaign || {}) },
  };
}

function saveRestream(bucket) {
  state = { ...state, restream: bucket };
  save(state);
  return state.restream;
}

function ensureIngest(bucket) {
  if (bucket.ingest?.rtmpUrl && bucket.ingest?.streamKey) return bucket;
  const key =
    'dbs_demo_' +
    Date.now().toString(36) +
    '_' +
    Math.random().toString(36).slice(2, 10);
  return {
    ...bucket,
    ingest: {
      rtmpUrl: 'rtmp://ingest.dbs.local/live',
      streamKey: key,
      rotatedAt: Date.now(),
      note: 'TEST MODE demo key · not a real media server',
    },
  };
}

export function getRestream() {
  let b = restreamBucket();
  const before = b.ingest;
  b = ensureIngest(b);
  if (b.ingest !== before) saveRestream(b);
  return b;
}

export function listRestreamPlatforms() {
  const b = getRestream();
  return RESTREAM_PLATFORM_DEFS.map((def) => {
    const row = b.platforms[def.id] || {};
    return {
      ...def,
      connected: !!row.connected,
      connectedAt: row.connectedAt || null,
      handle: row.handle || '',
      lastError: row.lastError || null,
      enabled: row.enabled !== false,
    };
  });
}

export function connectRestreamPlatform(platformId, handle = '') {
  const def = RESTREAM_PLATFORM_DEFS.find((p) => p.id === platformId);
  if (!def) return { error: 'unknown_platform' };
  const b = getRestream();
  const platforms = {
    ...b.platforms,
    [platformId]: {
      id: platformId,
      connected: true,
      connectedAt: Date.now(),
      handle: String(handle || def.label + ' Demo').slice(0, 40),
      lastError: null,
      enabled: true,
    },
  };
  saveRestream({ ...b, platforms });
  return { ok: true, platform: listRestreamPlatforms().find((p) => p.id === platformId) };
}

export function disconnectRestreamPlatform(platformId) {
  const b = getRestream();
  if (!b.platforms[platformId]?.connected) return { error: 'not_connected' };
  const platforms = {
    ...b.platforms,
    [platformId]: {
      ...b.platforms[platformId],
      connected: false,
      disconnectedAt: Date.now(),
      lastError: null,
    },
  };
  const selected = (b.selected || []).filter((id) => id !== platformId);
  let session = b.session;
  if (session && !session.endedAt) {
    session = {
      ...session,
      destinations: (session.destinations || []).map((d) =>
        d.id === platformId ? { ...d, status: 'disconnected', health: 'error' } : d
      ),
    };
  }
  saveRestream({ ...b, platforms, selected, session });
  return { ok: true };
}

export function setRestreamSelected(ids) {
  const b = getRestream();
  const connected = new Set(
    Object.values(b.platforms)
      .filter((p) => p.connected)
      .map((p) => p.id)
  );
  const selected = (Array.isArray(ids) ? ids : [])
    .filter((id) => connected.has(id))
    .slice(0, 7);
  saveRestream({ ...b, selected });
  return { ok: true, selected };
}

export function toggleRestreamSelected(platformId) {
  const b = getRestream();
  if (!b.platforms[platformId]?.connected) return { error: 'not_connected' };
  const set = new Set(b.selected || []);
  if (set.has(platformId)) set.delete(platformId);
  else set.add(platformId);
  return setRestreamSelected([...set]);
}

export function getRestreamCampaignConfig() {
  const b = restreamBucket();
  const base = DEFAULT_CAMPAIGN_CONFIG();
  const cfg = b.campaignConfig || {};
  return {
    ...base,
    ...cfg,
    tiers: {
      ...base.tiers,
      ...(cfg.tiers || {}),
      bronze: { ...base.tiers.bronze, ...(cfg.tiers?.bronze || {}) },
      silver: { ...base.tiers.silver, ...(cfg.tiers?.silver || {}) },
      gold: { ...base.tiers.gold, ...(cfg.tiers?.gold || {}) },
    },
    freeMaxDestinations:
      Number(cfg.freeMaxDestinations) > 0
        ? Number(cfg.freeMaxDestinations)
        : base.freeMaxDestinations,
    houseUnlimited: cfg.houseUnlimited !== false,
    houseUserIds: Array.isArray(cfg.houseUserIds) ? cfg.houseUserIds : base.houseUserIds,
  };
}

export function setRestreamCampaignConfig(patch = {}) {
  if (!isAdmin() && !patch._testModeAllow) {
    // Allow TEST MODE panel on page for demo admins; real gate is isAdmin()
    // Callers that are not admin should pass nothing — page uses isAdmin() or demo toggle.
  }
  if (!isAdmin() && patch.requireAdmin) return { error: 'admin' };
  const b = getRestream();
  const cur = getRestreamCampaignConfig();
  const next = {
    ...cur,
    ...patch,
    tiers: {
      ...cur.tiers,
      ...(patch.tiers || {}),
    },
  };
  // strip internal flags
  delete next._testModeAllow;
  delete next.requireAdmin;
  saveRestream({ ...b, campaignConfig: next });
  return { ok: true, config: getRestreamCampaignConfig() };
}

export function getRestreamCampaign() {
  return { ...emptyRestream().campaign, ...(restreamBucket().campaign || {}) };
}

/** House / official DatBoiSkeet accounts get free unlimited destinations. */
export function isRestreamHouseAccount() {
  const user = state.user;
  if (!user) return false;
  const cfg = getRestreamCampaignConfig();
  if (user.id === 'dbs' || user.username === 'DatBoiSkeet') return true;
  return (cfg.houseUserIds || []).includes(user.id);
}

export function getRestreamDestinationCap() {
  const cfg = getRestreamCampaignConfig();
  if (isRestreamHouseAccount() && cfg.houseUnlimited) {
    return { max: RESTREAM_PLATFORM_DEFS.length, source: 'house_free', tier: null };
  }
  const camp = getRestreamCampaign();
  if (camp.status === 'active' && camp.tier && cfg.tiers[camp.tier]) {
    const t = cfg.tiers[camp.tier];
    return { max: t.maxDestinations, source: 'campaign', tier: camp.tier, badge: t.badge, placement: !!t.placement };
  }
  return {
    max: cfg.freeMaxDestinations,
    source: 'free_baseline',
    tier: null,
    badge: null,
    placement: false,
  };
}

export function enrollRestreamCampaign(tierId) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const cfg = getRestreamCampaignConfig();
  const tier = cfg.tiers[tierId];
  if (!tier) return { error: 'bad_tier' };
  const camp = getRestreamCampaign();
  if (camp.status === 'active' && camp.tier === tierId) return { error: 'already' };

  const price = Number(tier.price) || 0;
  // Upgrade: charge difference if already on a lower paid tier (demo)
  let charge = price;
  if (camp.status === 'active' && camp.tier && cfg.tiers[camp.tier]) {
    const prev = Number(cfg.tiers[camp.tier].price) || 0;
    charge = Math.max(0, +(price - prev).toFixed(2));
  }

  if (charge > 0) {
    const bal = Number(state.wallet?.balance || 0);
    if (bal < charge) return { error: 'insufficient', need: charge, balance: bal };
    const spent = spendWallet(charge, `Restream ${tier.label} campaign · TEST MODE`);
    if (spent?.error) return spent;
  }

  const b = getRestream();
  saveRestream({
    ...b,
    campaign: {
      tier: tierId,
      status: 'active',
      enrolledAt: Date.now(),
      cancelledAt: null,
      lastCharge: charge,
      testMode: true,
    },
  });
  return { ok: true, campaign: getRestreamCampaign(), wallet: state.wallet, charged: charge };
}

export function cancelRestreamCampaign() {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const camp = getRestreamCampaign();
  if (camp.status !== 'active') return { error: 'none' };
  const b = getRestream();
  saveRestream({
    ...b,
    campaign: {
      ...camp,
      status: 'cancelled',
      cancelledAt: Date.now(),
      tier: camp.tier,
    },
  });
  return { ok: true, campaign: getRestreamCampaign() };
}

export function getRestreamIngest() {
  return getRestream().ingest;
}

export function rotateRestreamStreamKey() {
  const b = getRestream();
  const key =
    'dbs_demo_' +
    Date.now().toString(36) +
    '_' +
    Math.random().toString(36).slice(2, 10);
  const ingest = {
    rtmpUrl: b.ingest?.rtmpUrl || 'rtmp://ingest.dbs.local/live',
    streamKey: key,
    rotatedAt: Date.now(),
    note: 'TEST MODE demo key · not a real media server',
  };
  saveRestream({ ...b, ingest });
  return { ok: true, ingest };
}

export function startRestreamGoLive() {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const b = getRestream();
  if (b.session && !b.session.endedAt) return { error: 'already_live' };

  const connectedIds = Object.values(b.platforms)
    .filter((p) => p.connected)
    .map((p) => p.id);
  if (!connectedIds.length) return { error: 'no_platforms' };

  let selected = (b.selected || []).filter((id) => connectedIds.includes(id));
  if (!selected.length) return { error: 'none_selected' };

  const cap = getRestreamDestinationCap();
  if (selected.length > cap.max) {
    return { error: 'over_cap', max: cap.max, selected: selected.length, source: cap.source };
  }

  const destinations = selected.map((id, i) => {
    const def = RESTREAM_PLATFORM_DEFS.find((p) => p.id === id);
    // Fake health: mostly streaming; last one can be "connecting" briefly in UI
    const health = i === selected.length - 1 && selected.length > 2 ? 'connecting' : 'streaming';
    return {
      id,
      label: def?.label || id,
      status: health === 'connecting' ? 'connecting' : 'streaming',
      health,
      startedAt: Date.now(),
    };
  });

  const camp = getRestreamCampaign();
  const session = {
    id: uid('rs'),
    hostId: user.id,
    hostName: user.username,
    startedAt: Date.now(),
    destinations,
    selected: selected.slice(),
    campaignTier: camp.status === 'active' ? camp.tier : null,
    campaignBadge: cap.badge || null,
    placement: !!cap.placement,
    testMode: true,
    endedAt: null,
  };
  saveRestream({ ...b, session, selected });
  return { ok: true, session };
}

/** Advance fake health: connecting → streaming (or error stub). */
export function tickRestreamHealth() {
  const b = getRestream();
  if (!b.session || b.session.endedAt) return b.session;
  const destinations = (b.session.destinations || []).map((d) => {
    if (d.health === 'connecting') {
      return { ...d, health: 'streaming', status: 'streaming' };
    }
    return d;
  });
  const session = { ...b.session, destinations };
  saveRestream({ ...b, session });
  return session;
}

export function setRestreamDestinationError(platformId, message = 'Demo error stub') {
  const b = getRestream();
  if (!b.session || b.session.endedAt) return { error: 'offline' };
  const destinations = (b.session.destinations || []).map((d) =>
    d.id === platformId
      ? { ...d, health: 'error', status: 'error', lastError: String(message).slice(0, 120) }
      : d
  );
  const session = { ...b.session, destinations };
  saveRestream({ ...b, session });
  return { ok: true, session };
}

export function endRestreamGoLive() {
  const b = getRestream();
  if (!b.session || b.session.endedAt) return { error: 'offline' };
  const ended = {
    ...b.session,
    endedAt: Date.now(),
    destinations: (b.session.destinations || []).map((d) => ({
      ...d,
      status: d.health === 'error' ? 'error' : 'ended',
      health: d.health === 'error' ? 'error' : 'ended',
    })),
  };
  const history = [ended, ...(b.history || [])].slice(0, 20);
  saveRestream({ ...b, session: null, history });
  return { ok: true, session: ended, history };
}

export function listRestreamHistory(limit = 10) {
  return (restreamBucket().history || []).slice(0, limit);
}

export function getActiveRestreamSession() {
  const s = restreamBucket().session;
  return s && !s.endedAt ? s : null;
}

/* ---------- §36 DBS Connect prefs (opt-in shell only · no WebRTC) ---------- */
export function getConnectPrefs() {
  const p = getState().connectPrefs || {};
  return { ageConfirmed: !!p.ageConfirmed, rulesAccepted: !!p.rulesAccepted };
}

export function updateConnectPrefs(patch = {}) {
  const next = { ...getConnectPrefs(), ...patch };
  if (!next.ageConfirmed) next.rulesAccepted = false;
  update((s) => ({ ...s, connectPrefs: next }));
  return next;
}

/* ========== §28 Loyalty Club (Build) — append-only ========== */

export const LOYALTY_BADGES = [
  {
    id: 'day_one',
    name: 'Day One',
    blurb: 'Joined the Loyalty Club — recognition starts with showing up, not spending.',
    need: 0,
    kind: 'join',
  },
  {
    id: 'listener',
    name: 'Listener',
    blurb: 'Logged authorized listening (demo tick). Not purchase-only.',
    need: 1,
    kind: 'listen',
  },
  {
    id: 'live_attendee',
    name: 'Live Regular',
    blurb: 'Attended a livestream (demo stub). Healthy participation.',
    need: 1,
    kind: 'live',
  },
  {
    id: 'club_member',
    name: 'Club Member',
    blurb: 'Joined a Fan Club discussion community.',
    need: 1,
    kind: 'club',
  },
  {
    id: 'helper',
    name: 'Helper',
    blurb: 'Community-helper milestone (welcome tip / guidelines share demo).',
    need: 1,
    kind: 'help',
  },
  {
    id: 'top_fan',
    name: 'Top Fan',
    blurb: 'Earned 50+ loyalty points from mixed healthy actions — gifts alone do not unlock this.',
    needPoints: 50,
  },
];

function loyaltyDayKey(ts = Date.now()) {
  return new Date(ts).toISOString().slice(0, 10);
}

function getLoyaltyBucket() {
  const L = state.loyalty || {};
  return {
    points: Number(L.points) || 0,
    history: Array.isArray(L.history) ? L.history : [],
    badges: Array.isArray(L.badges) ? L.badges : [],
    publicVisible: L.publicVisible !== false,
    lastActionAt: L.lastActionAt && typeof L.lastActionAt === 'object' ? L.lastActionAt : {},
    dayCounts: L.dayCounts && typeof L.dayCounts === 'object' ? L.dayCounts : {},
  };
}

function saveLoyalty(bucket) {
  state = { ...state, loyalty: bucket };
  save(state);
}

function loyaltyId() {
  return 'loy_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Anti-farming: cooldown per kind + daily cap. */
function loyaltyAllowed(kind, { cooldownMs = 8000, dailyCap = 8 } = {}) {
  const L = getLoyaltyBucket();
  const now = Date.now();
  const last = Number(L.lastActionAt[kind]) || 0;
  if (now - last < cooldownMs) return { ok: false, reason: 'cooldown' };
  const day = loyaltyDayKey(now);
  const counts = L.dayCounts[day] || {};
  if ((counts[kind] || 0) >= dailyCap) return { ok: false, reason: 'daily_cap' };
  return { ok: true };
}

function unlockLoyaltyBadges(L) {
  const have = new Set(L.badges || []);
  const kinds = {};
  (L.history || []).forEach((h) => {
    kinds[h.kind] = (kinds[h.kind] || 0) + 1;
  });
  LOYALTY_BADGES.forEach((b) => {
    if (have.has(b.id)) return;
    if (b.needPoints != null) {
      if (L.points >= b.needPoints) have.add(b.id);
      return;
    }
    if (b.id === 'day_one') {
      if ((L.history || []).length > 0 || L.points > 0) have.add(b.id);
      return;
    }
    if ((kinds[b.kind] || 0) >= (b.need || 1)) have.add(b.id);
  });
  return [...have];
}

export function getLoyalty() {
  return getLoyaltyBucket();
}

export function setLoyaltyVisibility(publicVisible) {
  const L = getLoyaltyBucket();
  saveLoyalty({ ...L, publicVisible: !!publicVisible });
  return getLoyalty();
}

export function recordLoyaltyAction(kind, { points = 5, note = '' } = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  const allowed = loyaltyAllowed(kind);
  if (!allowed.ok) return { error: allowed.reason };
  const L = getLoyaltyBucket();
  const now = Date.now();
  const day = loyaltyDayKey(now);
  const dayCounts = {
    ...L.dayCounts,
    [day]: { ...(L.dayCounts[day] || {}), [kind]: ((L.dayCounts[day] || {})[kind] || 0) + 1 },
  };
  const entry = {
    id: loyaltyId(),
    at: now,
    kind,
    points,
    note: String(note || kind).slice(0, 120),
  };
  const next = {
    ...L,
    points: L.points + points,
    history: [entry, ...L.history].slice(0, 80),
    lastActionAt: { ...L.lastActionAt, [kind]: now },
    dayCounts,
  };
  // Day One on first ever action
  if (!next.badges.includes('day_one')) {
    next.history = next.history; // keep
  }
  next.badges = unlockLoyaltyBadges(next);
  if (!next.badges.includes('day_one')) next.badges = ['day_one', ...next.badges];
  saveLoyalty(next);
  return { ok: true, loyalty: getLoyalty(), entry, newBadges: next.badges.filter((b) => !(L.badges || []).includes(b)) };
}

export function listLoyaltyBadges() {
  const L = getLoyalty();
  const unlocked = new Set(L.badges || []);
  return LOYALTY_BADGES.map((b) => ({ ...b, unlocked: unlocked.has(b.id) }));
}

export function resetLoyaltyDemo() {
  saveLoyalty({
    points: 0,
    history: [],
    badges: [],
    publicVisible: true,
    lastActionAt: {},
    dayCounts: {},
  });
  return getLoyalty();
}

/* ========== §30 Open Mic (Build) — append-only ========== */

function getOpenMicBucket() {
  const o = state.openMic || {};
  return {
    applications: Array.isArray(o.applications) ? o.applications : [],
    seeded: !!o.seeded,
    houseIndex: typeof o.houseIndex === 'number' ? o.houseIndex : 0,
  };
}

function saveOpenMic(bucket) {
  state = { ...state, openMic: bucket };
  save(state);
}

function omId() {
  return 'om_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function ensureOpenMicSeeded({ force = false } = {}) {
  const bucket = getOpenMicBucket();
  if (bucket.seeded && !force && bucket.applications.length > 0) {
    return { skipped: true, applications: bucket.applications };
  }
  const now = Date.now();
  const day = 86400000;
  const demos = [
    {
      id: 'om_demo_approved',
      userId: 'u_ria',
      username: 'RiaLoops',
      talent: 'producer',
      trackTitle: 'Midnight Pads (demo)',
      profileNote: 'Beatmaker · looking to collab on LSS energy',
      rightsCertified: true,
      status: 'approved',
      at: now - 10 * day,
      reviewedAt: now - 9 * day,
    },
    {
      id: 'om_demo_pending',
      userId: 'u_dez',
      username: 'DezOnMic',
      talent: 'rapper',
      trackTitle: 'Porch Light Freestyle',
      profileNote: 'Opt-in showcase · not pay-to-win',
      rightsCertified: true,
      status: 'pending',
      at: now - 2 * day,
    },
    {
      id: 'om_demo_rejected',
      userId: 'u_spam',
      username: 'SpamBeats',
      talent: 'dj',
      trackTitle: 'Untitled drop',
      profileNote: 'No rights cert honesty',
      rightsCertified: false,
      status: 'rejected',
      at: now - 5 * day,
      reviewedAt: now - 4 * day,
      reviewNote: 'Rights certification required',
    },
  ];
  const prevIdx = typeof bucket.houseIndex === 'number' ? bucket.houseIndex : 0;
  saveOpenMic({ applications: demos, seeded: true, houseIndex: prevIdx });
  return { seeded: demos.length, applications: demos };
}

export function listOpenMicApplications({ status = null } = {}) {
  ensureOpenMicSeeded();
  let apps = getOpenMicBucket().applications.slice();
  if (status) apps = apps.filter((a) => a.status === status);
  return apps.sort((a, b) => (b.at || 0) - (a.at || 0));
}

export function listOpenMicShowcase() {
  return listOpenMicApplications({ status: 'approved' });
}

/** t236u/t238u — same DatBoiSkeet house catalog as Spotlight when Open Mic idle. */
export function getOpenMicHouseTrack() {
  const bucket = getOpenMicBucket();
  return houseTrackAt(typeof bucket.houseIndex === 'number' ? bucket.houseIndex : 0);
}

export function advanceOpenMicHouseTrack() {
  const bucket = getOpenMicBucket();
  const nextIdx = ((typeof bucket.houseIndex === 'number' ? bucket.houseIndex : 0) + 1) % houseCatalogLen();
  saveOpenMic({ ...bucket, houseIndex: nextIdx });
  return houseTrackAt(nextIdx);
}

export function submitOpenMicApplication({
  talent = 'rapper',
  trackTitle = '',
  profileNote = '',
  rightsCertified = false,
} = {}) {
  const user = state.user;
  if (!user) return { error: 'signin' };
  if (!rightsCertified) return { error: 'rights' };
  const title = String(trackTitle || '').trim().slice(0, 80);
  if (!title) return { error: 'title' };
  ensureOpenMicSeeded();
  const bucket = getOpenMicBucket();
  // One pending at a time per user
  if (bucket.applications.some((a) => a.userId === user.id && a.status === 'pending')) {
    return { error: 'pending' };
  }
  const app = {
    id: omId(),
    userId: user.id,
    username: user.username,
    talent: String(talent || 'other').slice(0, 32),
    trackTitle: title,
    profileNote: String(profileNote || '').trim().slice(0, 240),
    rightsCertified: true,
    status: 'pending',
    at: Date.now(),
  };
  saveOpenMic({
    ...bucket,
    applications: [app, ...bucket.applications],
    seeded: true,
  });
  return { ok: true, application: app };
}

export function setOpenMicStatus(appId, status, reviewNote = '') {
  if (!isAdmin()) return { error: 'admin' };
  const allowed = ['pending', 'approved', 'rejected'];
  if (!allowed.includes(status)) return { error: 'status' };
  const bucket = getOpenMicBucket();
  let found = null;
  const applications = bucket.applications.map((a) => {
    if (a.id !== appId) return a;
    found = {
      ...a,
      status,
      reviewedAt: Date.now(),
      reviewNote: String(reviewNote || '').slice(0, 160),
    };
    return found;
  });
  if (!found) return { error: 'missing' };
  saveOpenMic({ ...bucket, applications });
  return { ok: true, application: found };
}

/* ========== Admin follow-ups (Build 2026-10-25) — append-only overview ========== */

/**
 * Aggregate existing Phase 2 state for #/admin control demos.
 * Read-only; does not invent figures beyond what's in local state.
 */
export function getAdminOverview() {
  ensureOpenMicSeeded();
  ensureFanClubsSeeded();
  try {
    ensureHotPostsSeeded();
    refreshHotFeed();
  } catch (_) {
    /* hot feed optional until §38 wired */
  }

  const omApps = getOpenMicBucket().applications || [];
  const omByStatus = { pending: 0, approved: 0, rejected: 0 };
  omApps.forEach((a) => {
    const s = a.status || 'pending';
    if (omByStatus[s] !== undefined) omByStatus[s] += 1;
    else omByStatus.pending += 1;
  });
  const omPending = omApps
    .filter((a) => a.status === 'pending')
    .sort((a, b) => (b.at || 0) - (a.at || 0));

  const clubs = getFanClubsBucket().clubs.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const recentClubs = clubs.slice(0, 5).map((c) => ({
    id: c.id,
    name: c.name,
    privacy: c.privacy,
    official: !!c.official,
    memberCount: c.memberCount || (c.members || []).length || 0,
    createdAt: c.createdAt || 0,
  }));

  const loyalty = getLoyaltyBucket();
  const loyaltyBadges = listLoyaltyBadges();
  const unlockedBadges = loyaltyBadges.filter((b) => b.unlocked);

  const cw = getCreatorWalletState();
  const byCat = summarizeCreatorEarnings();
  let gross = 0;
  let fees = 0;
  let creatorShare = 0;
  let dbsShare = 0;
  let earnCount = 0;
  byCat.forEach((row) => {
    gross = round2(gross + (row.gross || 0));
    fees = round2(fees + (row.fees || 0));
    creatorShare = round2(creatorShare + (row.creatorShare || 0));
    dbsShare = round2(dbsShare + (row.dbsShare || 0));
    earnCount += row.count || 0;
  });

  const fanWallet = state.wallet || { balance: 0, history: [] };
  const catalog = state.catalog || [];
  const stats = getAdminStats();

  return {
    openMic: {
      total: omApps.length,
      byStatus: omByStatus,
      pending: omPending,
    },
    fanClubs: {
      total: clubs.length,
      recent: recentClubs,
    },
    loyalty: {
      points: loyalty.points || 0,
      badgeCount: unlockedBadges.length,
      badges: unlockedBadges.map((b) => b.name || b.id),
      publicVisible: loyalty.publicVisible !== false,
      historyCount: (loyalty.history || []).length,
      note: 'Device-local loyalty for signed-in user · not a multi-fan leaderboard',
    },
    revenue: {
      demo: true,
      chip: 'demo figures · not production',
      gross,
      fees,
      creatorShare,
      dbsShare,
      earnCount,
      creatorAvailable: round2(cw.available || 0),
      creatorHolds: round2(cw.holds || 0),
      fanWalletBalance: Number(fanWallet.balance) || 0,
      byCategory: byCat.filter((r) => r.count > 0),
      catalogPublished: catalog.filter((c) => c.published).length,
      catalogTotal: catalog.length,
    },
    moderation: {
      warnings: [],
      suspensions: [],
      note: 'Stub · Content Polish owns Guidelines copy',
    },
    hotFeed: {
      openAlerts: (state.engagementAlerts || []).filter((a) => !a.handledAt).length,
      totalAlerts: (state.engagementAlerts || []).length,
      hotPosts: Array.isArray(state.hotFeed?.posts) ? state.hotFeed.posts.length : 0,
      hotLives: Array.isArray(state.hotFeed?.lives) ? state.hotFeed.lives.length : 0,
      note: '§38 · Build posts + Live Social lives',
    },
    stats,
  };
}

/* ========== §22 Profile Shop (Design) — append-only · CONCEPT / TEST MODE ========== */

const SHOP_SLOT_BY_CATEGORY = {
  frames: 'frame',
  effects: 'effect',
  banners: 'banner',
  'name styles': 'nameStyle',
  badges: 'badge',
};

const DEMO_BUNDLE_IDS = [
  'frame-rodeo-gold',
  'fx-snowfall',
  'ban-skyline',
  'name-neon',
  'badge-dayone',
];

function normalizeEquipped(raw) {
  const e = raw && typeof raw === 'object' ? raw : {};
  const out = {};
  ['frame', 'effect', 'banner', 'nameStyle', 'badge'].forEach((k) => {
    if (typeof e[k] === 'string' && e[k]) out[k] = e[k];
  });
  return out;
}

function getProfileShopBucket() {
  const p = state.profileShop || {};
  return {
    owned: Array.isArray(p.owned) ? [...new Set(p.owned.map(String))] : [],
    equipped: normalizeEquipped(p.equipped),
    reduceMotion: !!p.reduceMotion,
  };
}

function saveProfileShop(bucket) {
  state = { ...state, profileShop: bucket };
  save(state);
}

export function getProfileShop() {
  return getProfileShopBucket();
}

export function shopSlotForItem(item) {
  if (!item) return null;
  return SHOP_SLOT_BY_CATEGORY[item.category] || null;
}

/** UI-only select for live preview — does not persist (use equip for that). */
export function previewCosmetic(id) {
  return { ok: true, id: String(id || '') };
}

export function unlockCosmetic(id) {
  const cid = String(id || '');
  if (!cid) return { error: 'missing' };
  const P = getProfileShopBucket();
  if (P.owned.includes(cid)) return { ok: true, already: true, shop: getProfileShop() };
  saveProfileShop({ ...P, owned: [...P.owned, cid] });
  return { ok: true, shop: getProfileShop() };
}

export function unlockDemoBundle() {
  const P = getProfileShopBucket();
  const owned = new Set(P.owned);
  DEMO_BUNDLE_IDS.forEach((id) => owned.add(id));
  saveProfileShop({ ...P, owned: [...owned] });
  return { ok: true, unlocked: DEMO_BUNDLE_IDS, shop: getProfileShop() };
}

function slotFromCosmeticId(id) {
  const cid = String(id || '');
  if (cid.startsWith('frame-')) return 'frame';
  if (cid.startsWith('fx-')) return 'effect';
  if (cid.startsWith('ban-')) return 'banner';
  if (cid.startsWith('name-')) return 'nameStyle';
  if (cid.startsWith('badge-')) return 'badge';
  return null;
}

export function equipCosmetic(id) {
  const cid = String(id || '');
  const P = getProfileShopBucket();
  if (!P.owned.includes(cid)) return { error: 'not_owned' };
  const slot = slotFromCosmeticId(cid);
  if (!slot) return { error: 'unknown_item' };
  const equipped = { ...P.equipped, [slot]: cid };
  saveProfileShop({ ...P, equipped });
  return { ok: true, slot, shop: getProfileShop() };
}

export function unequipCosmetic(slot) {
  const key = String(slot || '');
  if (!['frame', 'effect', 'banner', 'nameStyle', 'badge'].includes(key)) {
    return { error: 'bad_slot' };
  }
  const P = getProfileShopBucket();
  const equipped = { ...P.equipped };
  delete equipped[key];
  saveProfileShop({ ...P, equipped });
  return { ok: true, shop: getProfileShop() };
}

export function setShopReduceMotion(bool) {
  const P = getProfileShopBucket();
  saveProfileShop({ ...P, reduceMotion: !!bool });
  return getProfileShop();
}

export function resetProfileShopDemo() {
  saveProfileShop({ owned: [], equipped: {}, reduceMotion: false });
  return getProfileShop();
}

export { SHOP_SLOT_BY_CATEGORY, DEMO_BUNDLE_IDS };

/* ========== §38 Hot Feed (Build posts + shared alerts) — append-only 2026-10-25 ==========
 * Lives rail / seededLives owned by Live Social — PRESERVE on post refresh.
 * Shared exports: pushEngagementAlert, listEngagementAlerts, markEngagementAlertHandled.
 */

const HOT_POST_THRESHOLD = 5;
const HOT_POSTS_LIMIT = 8;

const COMMUNITY_HOT_SEED = [
  {
    id: 'hp_maya_1',
    userId: 'maya',
    username: 'MayaBeats',
    text: 'Studio loop dropping later — who wants the stem pack? 🔥',
    image: '/music/01_Long_Story_Short_Coming_Soon.jpg',
    mediaType: 'image',
    atOffset: 3600000 * 5,
    likeUsers: ['dbs', 'fanjay', 'u_seed_a', 'u_seed_b', 'u_seed_c', 'u_seed_d', 'clipqueen'],
    comments: [
      { id: 'hc_m1', userId: 'fanjay', username: 'FanJay', text: 'Send it 🙌' },
      { id: 'hc_m2', userId: 'dbs', username: 'DatBoiSkeet', text: 'Pull up on Spotlight' },
      { id: 'hc_m3', userId: 'clipqueen', username: 'ClipQueen', text: 'Stem pack please' },
    ],
    shares: 5,
  },
  {
    id: 'hp_jay_1',
    userId: 'fanjay',
    username: 'FanJay',
    text: 'Foreign X-Change fit check from the community — buffalo energy.',
    image: '/merch/03_blue_buffalo_jacket.jpeg',
    mediaType: 'image',
    atOffset: 3600000 * 8,
    likeUsers: ['maya', 'dbs', 'u_seed_a', 'u_seed_c', 'u_seed_d', 'clipqueen', 'u_seed_b'],
    comments: [
      { id: 'hc_j1', userId: 'maya', username: 'MayaBeats', text: 'Jacket hits' },
      { id: 'hc_j2', userId: 'clipqueen', username: 'ClipQueen', text: 'Need this' },
    ],
    shares: 6,
  },
  {
    id: 'hp_clip_1',
    userId: 'clipqueen',
    username: 'ClipQueen',
    text: 'New clip cut from last Live — tag @DatBoiSkeet if you remix 🎬',
    image: '/merch/06_black_ptsd_tee.jpeg',
    mediaType: 'video',
    atOffset: 3600000 * 12,
    likeUsers: ['dbs', 'maya', 'fanjay', 'u_seed_a', 'u_seed_b', 'u_seed_c'],
    comments: [
      { id: 'hc_c1', userId: 'dbs', username: 'DatBoiSkeet', text: 'Clean edit' },
      { id: 'hc_c2', userId: 'maya', username: 'MayaBeats', text: 'Clipping goals' },
      { id: 'hc_c3', userId: 'fanjay', username: 'FanJay', text: 'Saved' },
      { id: 'hc_c4', userId: 'u_seed_a', username: 'FanA', text: 'Fire' },
    ],
    shares: 4,
  },
  {
    id: 'hp_dbs_boost',
    userId: 'dbs',
    username: 'DatBoiSkeet',
    text: 'Community shoutout — Maya + Jay keeping the feed hot. Keep posting.',
    image: '/music/02_Ladies_Only_Coming_Soon.jpg',
    mediaType: 'image',
    atOffset: 3600000 * 3,
    likeUsers: ['maya', 'fanjay', 'u_seed_a'],
    comments: [
      { id: 'hc_d1', userId: 'maya', username: 'MayaBeats', text: 'Grateful 💛' },
      { id: 'hc_d2', userId: 'fanjay', username: 'FanJay', text: 'Lets go' },
    ],
    shares: 2,
  },
];

function getHotFeedBucket() {
  const h = state.hotFeed || {};
  return {
    lives: Array.isArray(h.lives) ? h.lives : [],
    posts: Array.isArray(h.posts) ? h.posts : [],
    seededLives: !!h.seededLives,
    seededPosts: !!h.seededPosts,
    seededPostsVer: Number(h.seededPostsVer) || 0,
  };
}

function saveHotFeed(bucket) {
  state = { ...state, hotFeed: bucket };
  save(state);
}

function ensureCommunityProfiles() {
  const profiles = { ...state.profiles };
  let dirty = false;
  const ensure = (id, username, bio) => {
    if (profiles[id]) return;
    profiles[id] = {
      id,
      username,
      bio,
      avatar: '',
      followers: [],
      following: ['dbs'],
      verified: false,
    };
    dirty = true;
  };
  ensure('maya', 'MayaBeats', 'Creator · beats & live demos');
  ensure('fanjay', 'FanJay', 'Day-one fan · playlist curator');
  ensure('clipqueen', 'ClipQueen', 'Clipper · community edits');
  if (dirty) {
    state = { ...state, profiles };
  }
}

/** Seed community + house posts with engagement so Hot strip is mixed (not only DatBoiSkeet). */
export function ensureHotPostsSeeded() {
  ensureDemoPosts();
  ensureCommunityProfiles();
  const bucket = getHotFeedBucket();
  const ver = Number(bucket.seededPostsVer) || 0;
  /* t172u V2: once-only bump so community seeds outrank house shoutout in existing localStorage */
  if (bucket.seededPosts && ver >= 2) return getHotFeedBucket();
  if (bucket.seededPosts && ver < 2) {
    const likes = { ...(state.likes || {}) };
    const comments = { ...(state.comments || {}) };
    const postShares = { ...(state.postShares || {}) };
    const boost = (id, likeUsers, extraComments, shares) => {
      likes[id] = [...new Set([...(likes[id] || []), ...likeUsers])];
      const have = new Set((comments[id] || []).map((c) => c.id));
      const merged = [...(comments[id] || [])];
      (extraComments || []).forEach((c) => {
        if (!have.has(c.id)) merged.push({ ...c, at: c.at || Date.now() });
      });
      comments[id] = merged;
      postShares[id] = Math.max(Number(postShares[id] || 0), shares);
    };
    boost('hp_maya_1', ['dbs', 'fanjay', 'u_seed_a', 'u_seed_b', 'u_seed_c', 'u_seed_d', 'clipqueen'], [
      { id: 'hc_m3', userId: 'clipqueen', username: 'ClipQueen', text: 'Stem pack please' },
    ], 5);
    boost('hp_jay_1', ['maya', 'dbs', 'u_seed_a', 'u_seed_c', 'u_seed_d', 'clipqueen', 'u_seed_b'], [
      { id: 'hc_j2', userId: 'clipqueen', username: 'ClipQueen', text: 'Need this' },
    ], 6);
    boost('hp_clip_1', ['dbs', 'maya', 'fanjay', 'u_seed_a', 'u_seed_b', 'u_seed_c'], [
      { id: 'hc_c4', userId: 'u_seed_a', username: 'FanA', text: 'Fire' },
    ], 4);
    // Soften house shoutout if present
    if (likes.hp_dbs_boost) {
      likes.hp_dbs_boost = (likes.hp_dbs_boost || []).slice(0, 3);
      postShares.hp_dbs_boost = Math.min(Number(postShares.hp_dbs_boost || 0), 2);
    }
    state = {
      ...state,
      likes,
      comments,
      postShares,
      hotFeed: { ...bucket, seededPosts: true, seededPostsVer: 2 },
    };
    save(state);
    refreshHotFeed();
    return getHotFeedBucket();
  }

  const existingIds = new Set((state.posts || []).map((p) => p.id));
  const posts = [...(state.posts || [])];
  const likes = { ...(state.likes || {}) };
  const comments = { ...(state.comments || {}) };
  const postShares = { ...(state.postShares || {}) };
  const now = Date.now();

  COMMUNITY_HOT_SEED.forEach((s) => {
    if (existingIds.has(s.id)) return;
    posts.unshift({
      id: s.id,
      userId: s.userId,
      username: s.username,
      text: s.text,
      image: s.image || '',
      mediaType: s.mediaType || (s.image ? 'image' : 'text'),
      at: now - (s.atOffset || 0),
      house: s.userId === 'dbs',
    });
    likes[s.id] = [...(s.likeUsers || [])];
    comments[s.id] = (s.comments || []).map((c) => ({
      ...c,
      text: c.text,
      at: now - (s.atOffset || 0) + 60000,
    }));
    if (s.shares) postShares[s.id] = s.shares;
  });

  // Boost a couple of original house posts so they can also rank
  if (likes.p1 && likes.p1.length < 3) {
    likes.p1 = [...new Set([...(likes.p1 || []), 'maya', 'fanjay', 'u_seed_a'])];
  }
  if (likes.p2 && likes.p2.length < 2) {
    likes.p2 = [...new Set([...(likes.p2 || []), 'maya', 'fanjay'])];
  }
  if (!comments.p1 || comments.p1.length < 2) {
    comments.p1 = [
      ...(comments.p1 || []),
      {
        id: 'hc_p1a',
        userId: 'maya',
        username: 'MayaBeats',
        text: 'Cover art goes crazy',
        at: now - 80000000,
      },
      {
        id: 'hc_p1b',
        userId: 'fanjay',
        username: 'FanJay',
        text: 'Been waiting on this',
        at: now - 70000000,
      },
    ];
  }
  postShares.p1 = Math.max(postShares.p1 || 0, 2);
  postShares.p2 = Math.max(postShares.p2 || 0, 1);

  state = {
    ...state,
    posts,
    likes,
    comments,
    postShares,
    hotFeed: { ...bucket, seededPosts: true, seededPostsVer: 2 },
  };
  save(state);
  refreshHotFeed();
  return getHotFeedBucket();
}

/** Alias used by task brief / parent */
export function ensureHotFeedSeed() {
  return ensureHotPostsSeeded();
}

export function engagementScore(postId) {
  const likes = (state.likes && state.likes[postId]) || [];
  const comments = (state.comments && state.comments[postId]) || [];
  const shares = (state.postShares && state.postShares[postId]) || 0;
  return likes.length + comments.length + Number(shares || 0);
}

/**
 * Rebuild hotFeed.posts from engagement; create alerts for newly hot posts.
 * PRESERVES hotFeed.lives and seededLives (Live Social).
 */
export function refreshHotFeed() {
  const bucket = getHotFeedBucket();
  const posts = state.posts || [];
  const ranked = posts
    .map((p) => {
      const likes = ((state.likes && state.likes[p.id]) || []).length;
      const comments = ((state.comments && state.comments[p.id]) || []).length;
      const shares = Number((state.postShares && state.postShares[p.id]) || 0);
      const score = likes + comments + shares;
      return {
        id: p.id,
        postId: p.id,
        score,
        likes,
        comments,
        shares,
        username: p.username,
        userId: p.userId,
        preview: (p.text || '').slice(0, 120),
        text: p.text || '',
        image: p.image || '',
        mediaType: p.mediaType || (p.image ? 'image' : 'text'),
        at: p.at || 0,
        house: p.userId === 'dbs' || !!p.house,
      };
    })
    .filter((r) => r.score >= HOT_POST_THRESHOLD)
    .sort((a, b) => b.score - a.score || b.at - a.at)
    .slice(0, HOT_POSTS_LIMIT);

  const prevIds = new Set((bucket.posts || []).map((p) => p.postId || p.id));
  const alerts = Array.isArray(state.engagementAlerts) ? [...state.engagementAlerts] : [];
  const alertedRefs = new Set(
    alerts.filter((a) => a.kind === 'post').map((a) => a.refId)
  );

  ranked.forEach((r) => {
    if (alertedRefs.has(r.id)) return;
    // Only alert when newly crossing into hot (or first refresh after seed)
    if (prevIds.has(r.id) && bucket.posts.length) return;
    alerts.unshift({
      id: 'ea_post_' + r.id + '_' + Date.now().toString(36),
      kind: 'post',
      refId: r.id,
      title: (r.preview || r.text || 'Hot post').slice(0, 80),
      username: r.username,
      score: r.score,
      mediaType: r.mediaType || 'text',
      at: Date.now(),
      handledAt: null,
      handledNote: null,
    });
    alertedRefs.add(r.id);
  });

  // Cap alerts
  const trimmed = alerts.slice(0, 60);

  state = {
    ...state,
    hotFeed: {
      lives: bucket.lives, // PRESERVE Live Social
      seededLives: bucket.seededLives,
      posts: ranked,
      seededPosts: bucket.seededPosts || ranked.length > 0,
      seededPostsVer: Number(bucket.seededPostsVer) || 0,
    },
    engagementAlerts: trimmed,
  };
  save(state);
  return getHotFeedBucket();
}

export function getHotPosts(limit = 8) {
  ensureHotPostsSeeded();
  const bucket = getHotFeedBucket();
  if (!bucket.posts.length) refreshHotFeed();
  const list = getHotFeedBucket().posts || [];
  return list.slice(0, Math.max(1, Number(limit) || 8));
}

export function sharePost(postId) {
  const id = String(postId || '');
  if (!id) return { error: 'missing' };
  const post = (state.posts || []).find((p) => p.id === id);
  if (!post) return { error: 'missing' };
  const postShares = { ...(state.postShares || {}) };
  postShares[id] = Number(postShares[id] || 0) + 1;
  state = { ...state, postShares };
  save(state);
  refreshHotFeed();
  return { ok: true, shares: postShares[id], score: engagementScore(id) };
}

/** Shared — Live Social may call for live spikes */
export function pushEngagementAlert(alertPartial) {
  const partial = alertPartial || {};
  const kind = partial.kind === 'live' ? 'live' : 'post';
  const refId = String(partial.refId || partial.id || '');
  if (!refId) return { error: 'missing' };
  const alerts = Array.isArray(state.engagementAlerts) ? [...state.engagementAlerts] : [];
  const openDup = alerts.find(
    (a) => a.kind === kind && a.refId === refId && !a.handledAt
  );
  if (openDup) return { ok: true, alert: openDup, deduped: true };
  const alert = {
    id: partial.id || 'ea_' + kind + '_' + refId + '_' + Date.now().toString(36),
    kind,
    refId,
    title: String(partial.title || 'Hot item').slice(0, 120),
    username: String(partial.username || ''),
    score: Number(partial.score) || 0,
    viewers: partial.viewers != null ? Number(partial.viewers) : undefined,
    gifts: partial.gifts != null ? Number(partial.gifts) : undefined,
    mediaType: partial.mediaType || (kind === 'live' ? 'live' : 'text'),
    at: partial.at || Date.now(),
    handledAt: partial.handledAt || null,
    handledNote: partial.handledNote || null,
  };
  state = { ...state, engagementAlerts: [alert, ...alerts].slice(0, 60) };
  save(state);
  return { ok: true, alert };
}

export function listEngagementAlerts({ openOnly = true } = {}) {
  const alerts = Array.isArray(state.engagementAlerts) ? state.engagementAlerts : [];
  const list = openOnly ? alerts.filter((a) => !a.handledAt) : alerts.slice();
  return list.sort((a, b) => (b.at || 0) - (a.at || 0));
}

export function markEngagementAlertHandled(id, note) {
  const aid = String(id || '');
  if (!aid) return { error: 'missing' };
  const alerts = Array.isArray(state.engagementAlerts) ? state.engagementAlerts : [];
  let found = null;
  const next = alerts.map((a) => {
    if (a.id !== aid) return a;
    found = {
      ...a,
      handledAt: Date.now(),
      handledNote: note != null ? String(note) : a.handledNote || 'handled',
    };
    return found;
  });
  if (!found) return { error: 'missing' };
  state = { ...state, engagementAlerts: next };
  save(state);
  return { ok: true, alert: found };
}

/** Alias */
export function markAlertHandled(id, note) {
  return markEngagementAlertHandled(id, note);
}

export function adminQuickLike(postId) {
  if (!isAdmin()) return { error: 'admin' };
  const user = state.user;
  if (!user) return { error: 'signin' };
  const id = String(postId || '');
  const list = new Set((state.likes && state.likes[id]) || []);
  list.add(user.id);
  state = { ...state, likes: { ...state.likes, [id]: [...list] } };
  save(state);
  refreshHotFeed();
  return { ok: true, count: list.size, score: engagementScore(id) };
}

export function adminQuickComment(postId, text) {
  if (!isAdmin()) return { error: 'admin' };
  const user = state.user;
  if (!user) return { error: 'signin' };
  const id = String(postId || '');
  const body = (text || '🔥 DBS team — keep it up! (TEST MODE)').trim();
  if (!body) return { error: 'empty' };
  const c = {
    id: 'c_admin_' + Date.now().toString(36),
    userId: user.id,
    username: user.username,
    text: body,
    at: Date.now(),
    admin: true,
  };
  const prev = (state.comments && state.comments[id]) || [];
  state = { ...state, comments: { ...state.comments, [id]: [...prev, c] } };
  save(state);
  refreshHotFeed();
  return { ok: true, comment: c, score: engagementScore(id) };
}

export function adminQuickShare(postId) {
  if (!isAdmin()) return { error: 'admin' };
  const res = sharePost(postId);
  if (res.error) return res;
  const link = `#/posts`;
  return { ok: true, shares: res.shares, link, score: res.score };
}

export { HOT_POST_THRESHOLD, HOT_POSTS_LIMIT };



/* ========== §38 Hot Feed — Live Social (lives rail) · append-only ========== */
/* Reuses Build: getHotFeedBucket / saveHotFeed / pushEngagementAlert */
/* Never wipe hotFeed.posts or seededPosts. */

function liveHotScore(viewers, giftsTotal) {
  return Math.max(0, Number(viewers) || 0) + Math.max(0, Number(giftsTotal) || 0) * 20;
}

/** Normalize live row — accept Build or Live field aliases. */
function normalizeHotLive(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const id = String(raw.id || raw.liveId || '');
  if (!id) return null;
  const hostId = String(raw.hostId || raw.userId || '');
  const hostName = String(raw.hostName || raw.username || raw.handle || 'Creator');
  const viewers = Math.max(0, Number(raw.viewers) || 0);
  const giftsTotal = Math.max(0, Number(raw.giftsTotal ?? raw.gifts) || 0);
  const score =
    raw.score != null && Number.isFinite(Number(raw.score))
      ? Number(raw.score)
      : liveHotScore(viewers, giftsTotal);
  return {
    id,
    hostId,
    hostName,
    title: String(raw.title || 'Live'),
    viewers,
    giftsTotal,
    house: !!raw.house,
    spikedAt: raw.spikedAt || null,
    score,
  };
}

export function ensureHotLivesSeeded({ force = false } = {}) {
  const bucket = getHotFeedBucket();
  if (bucket.seededLives && !force && (bucket.lives || []).length > 0) {
    return {
      skipped: true,
      lives: bucket.lives.map(normalizeHotLive).filter(Boolean),
    };
  }
  const seeds = [
    {
      id: 'hl_dbs_house',
      hostId: 'dbs',
      hostName: 'DatBoiSkeet',
      title: 'DBS Live · Listening Session',
      viewers: 8420,
      giftsTotal: 186,
      house: true,
    },
    {
      id: 'hl_dbs_vault',
      hostId: 'dbs',
      hostName: 'DatBoiSkeet',
      title: 'Vault Drop Afterparty · House',
      viewers: 3210,
      giftsTotal: 94,
      house: true,
    },
    {
      id: 'hl_skeetfan',
      hostId: 'u_skeetfanatl',
      hostName: 'SkeetFanATL',
      title: 'ATL reacts · Long Story Short',
      viewers: 1540,
      giftsTotal: 42,
      house: false,
    },
    {
      id: 'hl_vaultwatch',
      hostId: 'u_vaultwatcher',
      hostName: 'VaultWatcher',
      title: 'Vault deep cut night',
      viewers: 980,
      giftsTotal: 61,
      house: false,
    },
    {
      id: 'hl_fxclip',
      hostId: 'u_fxclipper',
      hostName: 'FXClipper',
      title: 'Foreign X-Change clips live',
      viewers: 2210,
      giftsTotal: 28,
      house: false,
    },
    {
      id: 'hl_nightowl',
      hostId: 'u_nightowldbs',
      hostName: 'NightOwlDBS',
      title: 'Late night lounge · chill',
      viewers: 412,
      giftsTotal: 15,
      house: false,
    },
    {
      id: 'hl_longstory',
      hostId: 'u_longstorylistener',
      hostName: 'LongStoryListener',
      title: 'LSS theory hour',
      viewers: 128,
      giftsTotal: 7,
      house: false,
    },
    {
      id: 'hl_ladies',
      hostId: 'u_ladiesonlyfan',
      hostName: 'LadiesOnlyFan',
      title: 'Ladies Only countdown',
      viewers: 67,
      giftsTotal: 3,
      house: false,
    },
  ].map((s) => ({
    ...s,
    spikedAt: null,
    score: liveHotScore(s.viewers, s.giftsTotal),
  }));

  // Preserve Build posts / seededPosts
  saveHotFeed({
    ...bucket,
    lives: seeds,
    seededLives: true,
  });
  return { ok: true, lives: seeds };
}

export function listHotLives() {
  ensureHotLivesSeeded();
  const bucket = getHotFeedBucket();
  return (bucket.lives || [])
    .map(normalizeHotLive)
    .filter(Boolean)
    .sort(
      (a, b) =>
        (b.score || 0) - (a.score || 0) || (b.viewers || 0) - (a.viewers || 0)
    );
}

export function simulateLiveSpike(liveId) {
  const id = String(liveId || '');
  if (!id) return { error: 'missing' };
  ensureHotLivesSeeded();
  const bucket = getHotFeedBucket();
  let found = null;
  const lives = (bucket.lives || []).map((raw) => {
    const live = normalizeHotLive(raw);
    if (!live || live.id !== id) return raw;
    const bumpViewers = 180 + Math.floor(Math.random() * 920);
    const bumpGifts = 4 + Math.floor(Math.random() * 28);
    const viewers = live.viewers + bumpViewers;
    const giftsTotal = live.giftsTotal + bumpGifts;
    const score = liveHotScore(viewers, giftsTotal);
    found = {
      ...live,
      viewers,
      giftsTotal,
      score,
      spikedAt: Date.now(),
    };
    return found;
  });
  if (!found) return { error: 'missing' };
  saveHotFeed({
    ...bucket,
    lives,
    seededLives: true,
  });
  const alertRes = pushEngagementAlert({
    kind: 'live',
    refId: found.id,
    title: found.title,
    username: found.hostName,
    score: found.score,
    viewers: found.viewers,
    gifts: found.giftsTotal,
  });
  return {
    ok: true,
    live: found,
    alert: alertRes?.alert || null,
    deduped: !!alertRes?.deduped,
  };
}

/**
 * Rising streamers for Home §39 / Hot Feed §38.
 * Mid-tier / non-house creators — Live Social may replace with richer ranking.
 * Temporary Design fallback until Live Social owns the export fully.
 */
export function listRisingStreamers() {
  const all = listHotLives();
  const rising = all
    .filter((l) => l && !l.house)
    .sort(
      (a, b) =>
        (b.score || 0) - (a.score || 0) || (b.viewers || 0) - (a.viewers || 0)
    );
  // Prefer mid/high rising: drop bottom outliers if we have enough; keep top non-house
  return rising.slice(0, 6).map((l) => ({
    id: l.id,
    hostId: l.hostId,
    hostName: l.hostName,
    title: l.title,
    viewers: l.viewers,
    giftsTotal: l.giftsTotal,
    house: !!l.house,
    score: l.score,
    spikedAt: l.spikedAt || null,
    playbacksToday: l.playbacksToday != null ? l.playbacksToday : Math.max(1, Math.round((l.viewers || 0) / 40)),
  }));
}

/**
 * Most played song of the day — Home Live activity.
 * Prefers published catalog songs with playsToday; DEMO house seed if none.
 * TEST MODE · counters illustrative until real playback analytics land.
 */
export function getMostPlayedSongToday() {
  const day = new Date().toISOString().slice(0, 10);
  const songs = listCatalog({ publishedOnly: true, types: ['song'] }) || [];
  const ranked = songs
    .map((s) => {
      const plays =
        Number(s.playsToday) ||
        Number(s.playCount) ||
        Number(s.plays) ||
        0;
      let cover = '';
      if (s.coverRef && !String(s.coverRef).startsWith('idb:')) cover = s.coverRef;
      return {
        id: s.id,
        title: s.title || 'Untitled',
        artist: s.artist || 'DatBoiSkeet',
        cover,
        playsToday: plays,
        href: '#/music',
        demo: false,
        day,
        status: s.status || (s.published ? 'Published' : 'Catalog'),
      };
    })
    .filter((s) => s.playsToday > 0)
    .sort((a, b) => b.playsToday - a.playsToday || String(a.title).localeCompare(String(b.title)));
  if (ranked[0]) return ranked[0];
  // DEMO seed — house Coming Soon track (stable for the calendar day)
  const seedPlays = 900 + (day.split('-').reduce((n, p) => n + Number(p), 0) % 400);
  return {
    id: 'demo_most_played_lss',
    title: 'Long Story Short',
    artist: 'DatBoiSkeet',
    cover: '/music/01_Long_Story_Short_Coming_Soon.jpg',
    playsToday: seedPlays,
    href: '#/music',
    demo: true,
    day,
    status: 'Coming Soon',
  };
}
