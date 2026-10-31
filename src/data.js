/** Seed / static catalog for PIKK demo; DatBoiSkeet is the artist identity. */

export const VIDEOS = [
  // Plan MVs + Home featured (Checker PASS baseline)
  {
    id: 'dirty-money',
    title: 'Dirty Money ft. Lil Baby',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    featured: true,
    youtube: 'https://www.youtube.com/watch?v=-rHDLWfiuDI',
    embed: 'https://www.youtube.com/embed/-rHDLWfiuDI',
  },
  {
    id: '93',
    title: '93 ft. DaBaby',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    featured: true,
    youtube: 'https://www.youtube.com/watch?v=zC0BYFxs5W0',
    embed: 'https://www.youtube.com/embed/zC0BYFxs5W0',
  },
  {
    id: 'no-love',
    title: 'No Love ft. YFN Lucci',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    featured: true,
    youtube: 'https://www.youtube.com/watch?v=6pCVEIE9pB8',
    embed: 'https://www.youtube.com/embed/6pCVEIE9pB8',
  },
  // Channel / WSHH MVs — oEmbed verified 2026-10-25 (author DatBoiSkeet or WORLDSTARHIPHOP)
  {
    id: 'bouquet',
    title: 'Bouquet',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    featured: true,
    youtube: 'https://www.youtube.com/watch?v=DTe4OiX2otg',
    embed: 'https://www.youtube.com/embed/DTe4OiX2otg',
  },
  {
    id: 'where-im-from',
    title: "Where I'm From ft. Tee Grizzley",
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    featured: true,
    youtube: 'https://www.youtube.com/watch?v=BH7_Ttk86eQ',
    embed: 'https://www.youtube.com/embed/BH7_Ttk86eQ',
  },
  {
    id: 'gang-ties',
    title: 'Gang Ties',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    youtube: 'https://www.youtube.com/watch?v=0ikbrk901Kc',
    embed: 'https://www.youtube.com/embed/0ikbrk901Kc',
  },
  {
    id: 'go-2-work',
    title: 'Go 2 Work',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    featured: true,
    youtube: 'https://www.youtube.com/watch?v=gRq8c2i4ESM',
    embed: 'https://www.youtube.com/embed/gRq8c2i4ESM',
  },
  {
    id: 'ramen-noodles',
    title: 'Ramen Noodles',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    youtube: 'https://www.youtube.com/watch?v=YNCdtAC273M',
    embed: 'https://www.youtube.com/embed/YNCdtAC273M',
  },
  {
    id: 'men-in-blacc',
    title: 'Men In Blacc',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    youtube: 'https://www.youtube.com/watch?v=MKyw-hzxQWY',
    embed: 'https://www.youtube.com/embed/MKyw-hzxQWY',
  },
  {
    id: 'king-city',
    title: 'King City',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    youtube: 'https://www.youtube.com/watch?v=wyNJYUqpRFM',
    embed: 'https://www.youtube.com/embed/wyNJYUqpRFM',
  },
  {
    id: 'in-her-bag',
    title: 'In Her Bag',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    youtube: 'https://www.youtube.com/watch?v=Dux8rm-pzRg',
    embed: 'https://www.youtube.com/embed/Dux8rm-pzRg',
  },
  {
    id: 'lonely',
    title: 'Lonely',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    youtube: 'https://www.youtube.com/watch?v=IVnDjPJ8dRg',
    embed: 'https://www.youtube.com/embed/IVnDjPJ8dRg',
  },
  {
    id: 'they-aint-coming-home',
    title: "They Ain't Coming Home",
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    youtube: 'https://www.youtube.com/watch?v=Yi4uBFkn0-o',
    embed: 'https://www.youtube.com/embed/Yi4uBFkn0-o',
  },
  {
    id: 'mind-on-a-licc',
    title: 'Mind On A Licc',
    artist: 'DatBoiSkeet',
    category: 'Music Videos',
    youtube: 'https://www.youtube.com/watch?v=sADinuRcRr4',
    embed: 'https://www.youtube.com/embed/sADinuRcRr4',
  },
  // Mixes: embed stable official channel Music Videos playlist (oEmbed author DatBoiSkeet).
  // User t96u RD Mix (RDEMDY…) does not embed/oEmbed in Checker — kept as openLink only.
  {
    id: 'dbs-mix',
    title: 'DatBoiSkeet Mix',
    artist: 'DatBoiSkeet',
    category: 'Mixes',
    youtube: 'https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t',
    embed: 'https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t',
    openLink: 'https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w',
  },
  {
    id: 'on-the-radar',
    title: 'On The Radar Interview — Talk of The Town',
    artist: 'DatBoiSkeet',
    category: 'Interviews',
    youtube: 'https://www.youtube.com/watch?v=6IFiHo5HrdE',
    embed: 'https://www.youtube.com/embed/6IFiHo5HrdE',
  },
];

/** Official YouTube Mix / channel catalog for Music — original YT only (no rehosts). */
export const YOUTUBE_MIXES = [
  {
    id: 'dbs-mix',
    title: 'DatBoiSkeet Mix',
    blurb: 'Official channel Music Videos playlist embed (stable). YouTube Radio Mix link kept as Play on YouTube — RD mixes often fail to embed.',
    youtube: 'https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t',
    embed: 'https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t',
    openLink: 'https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w',
    source: 'channel-pl-music-videos + user-t96u openLink',
  },
];

/** Official channel playlists (author DatBoiSkeet via oEmbed) — Play on YouTube links. */
export const YOUTUBE_CHANNEL_PLAYLISTS = [
  {
    id: 'pl-music-videos',
    title: 'DatBoiSkeet Music Videos',
    youtube: 'https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t',
  },
  {
    id: 'pl-interviews',
    title: 'DatBoiSkeet Interviews',
    youtube: 'https://www.youtube.com/playlist?list=PLC6_HdjaVaQHoRjRTD58TpLGqm0XMsa7U',
  },
  {
    id: 'pl-vlogs',
    title: 'DatBoiSkeet Vlogs',
    youtube: 'https://www.youtube.com/playlist?list=PLC6_HdjaVaQEqroQ8LYGLgpDfzK3pyutQ',
  },
];

/** Plan §9 categories without verified URLs yet — titles only, no invented counts */
export const VIDEO_COMING_SOON = [
  { category: 'Interviews', title: 'Off The Porch (no verified DatBoiSkeet YouTube URL yet — add via Admin)' },
  { category: 'Behind the Scenes', title: 'BTS clips (coming soon)' },
  { category: 'Exclusive Videos', title: 'Vault / member exclusives (coming soon)' },
];

/** Official artist profiles — verified 2026-10-25. Omit platforms without a confirmed URL. */
export const STREAMING_ARTIST = {
  name: 'DatBoiSkeet',
  youtube: 'https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA',
  youtubeHandle: 'https://www.youtube.com/@DatBoiSkeet1',
  youtubeMusic: 'https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA',
  spotify: 'https://open.spotify.com/artist/0Po64h8VleQOR97okM68zh',
  apple: 'https://music.apple.com/us/artist/datboiskeet/1270542870',
};

/**
 * §14 Featured / streaming catalog — official links only (verified 2026-10-25).
 * links keys: spotify | apple | youtubeMusic | youtube | tidal | amazon — omit if unverified.
 * Cover art: Apple Music CDN (mzstatic) artwork; not Coming Soon covers.
 */
export const STREAMING_RELEASES = [
  {
    id: 'stream-dirty-money',
    title: 'Dirty Money (feat. Lil Baby)',
    artist: 'DatBoiSkeet',
    type: 'single',
    year: 2018,
    albumNote: 'From Broke Is the Root of All Evil',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/17Pw88uBIWpgOVCfhEyszG',
      apple: 'https://music.apple.com/us/song/dirty-money-feat-lil-baby/1395681218',
      youtubeMusic: 'https://music.youtube.com/watch?v=-rHDLWfiuDI',
      youtube: 'https://www.youtube.com/watch?v=-rHDLWfiuDI',
    },
  },
  {
    id: 'stream-93',
    title: '93 (feat. DaBaby)',
    artist: 'DatBoiSkeet',
    type: 'single',
    year: 2019,
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/19/60/5f/19605f4c-7014-6dbc-ca18-baa2a672c697/194923194110.png/600x600bb.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/3gKwZybDOkUoz2wXquDHVZ',
      apple: 'https://music.apple.com/us/album/93-feat-da-baby-single/1493456214',
      youtubeMusic: 'https://music.youtube.com/watch?v=zC0BYFxs5W0',
      youtube: 'https://www.youtube.com/watch?v=zC0BYFxs5W0',
    },
  },
  {
    id: 'stream-no-love',
    title: 'No Love (feat. YFN Lucci)',
    artist: 'DatBoiSkeet',
    type: 'single',
    year: 2017,
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/49/e5/62/49e56292-e427-3992-84bd-ead0b06fb06a/artwork.jpg/600x600bb.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/2KqnCXMM0lAMlEv1fDN63o',
      apple: 'https://music.apple.com/us/album/no-love-feat-yfn-lucci-single/1317778810',
      youtubeMusic: 'https://music.youtube.com/watch?v=6pCVEIE9pB8',
      youtube: 'https://www.youtube.com/watch?v=6pCVEIE9pB8',
    },
  },
  {
    id: 'stream-broke',
    title: 'Broke Is the Root of All Evil',
    artist: 'DatBoiSkeet',
    type: 'album',
    year: 2018,
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg',
    links: {
      spotify: 'https://open.spotify.com/album/51j6ReXYreCDV0ZwtPdj1Q',
      apple: 'https://music.apple.com/us/album/broke-is-the-root-of-all-evil/1395680910',
      youtubeMusic: 'https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA',
    },
  },
  {
    id: 'stream-talk',
    title: 'Talk of the Town',
    artist: 'DatBoiSkeet',
    type: 'album',
    year: 2020,
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f6/0d/a0/f60da0bf-c3de-8b12-5cd8-e8c1d3c2053b/artwork.jpg/600x600bb.jpg',
    links: {
      spotify: 'https://open.spotify.com/album/4OY5rM0TBPDsC4n8Dka4Gr',
      apple: 'https://music.apple.com/us/album/talk-of-the-town/1541180619',
      youtubeMusic: 'https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA',
    },
  },
  {
    id: 'stream-said-you-love-me',
    title: 'Said You Love Me',
    artist: 'DatBoiSkeet',
    type: 'single',
    year: 2025,
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f4/4f/6b/f44f6b18-dff9-0486-e6e6-a615724e02fe/artwork.jpg/600x600bb.jpg',
    links: {
      spotify: 'https://open.spotify.com/album/7FhoRIzhuGgmt2pZlWMc5c',
      apple: 'https://music.apple.com/us/album/said-you-love-me-single/1835164001',
      youtubeMusic: 'https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA',
    },
  },
];

export const COMING_SOON = [
  {
    id: 'long-story-short',
    title: 'Long Story Short',
    artist: 'DatBoiSkeet',
    cover: '/music/01_Long_Story_Short_Coming_Soon.jpg',
    status: 'Coming Soon',
    order: 1,
  },
  {
    id: 'ladies-only',
    title: 'Ladies Only',
    artist: 'DatBoiSkeet',
    cover: '/music/02_Ladies_Only_Coming_Soon.jpg',
    status: 'Coming Soon',
    order: 2,
  },
];

/** Demo purchase catalog — covers only, no fake audio */
/** Vault exclusives — real covers only, Coming Soon (no fake audio) */
export const VAULT_ITEMS = [
  {
    id: 'vault-long-story-short',
    title: 'Long Story Short (Vault Preview)',
    artist: 'DatBoiSkeet',
    cover: '/music/01_Long_Story_Short_Coming_Soon.jpg',
    tier: 'skeet+',
    status: 'Coming Soon',
  },
  {
    id: 'vault-ladies-only',
    title: 'Ladies Only (Vault Exclusive)',
    artist: 'DatBoiSkeet',
    cover: '/music/02_Ladies_Only_Coming_Soon.jpg',
    tier: 'backstage',
    status: 'Coming Soon',
  },
];

export const PURCHASABLE = [
  {
    id: 'long-story-short',
    title: 'Long Story Short',
    artist: 'DatBoiSkeet',
    cover: '/music/01_Long_Story_Short_Coming_Soon.jpg',
    price: 1.29,
    status: 'Coming Soon',
  },
  {
    id: 'ladies-only',
    title: 'Ladies Only',
    artist: 'DatBoiSkeet',
    cover: '/music/02_Ladies_Only_Coming_Soon.jpg',
    price: 1.29,
    status: 'Coming Soon',
  },
];

export const MERCH = [
  {
    id: 'hat-716-orange',
    name: '716 Buffalo Braves Snapback (Black/Orange)',
    price: 30,
    category: 'Hats',
    image: '/merch/01_black_orange_716_hat.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
  {
    id: 'hat-716-blue',
    name: '716 Buffalo Hat (Blue/Red)',
    price: 30,
    category: 'Hats',
    image: '/merch/02_blue_red_716_hat.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
  {
    id: 'jacket-blue',
    name: 'Buffalo Sports Varsity Jacket (Blue/White)',
    price: 200,
    category: 'Jackets',
    image: '/merch/03_blue_buffalo_jacket.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
  {
    id: 'jacket-black',
    name: 'Foreign X-Change Buffalo Varsity (Black/White)',
    price: 200,
    category: 'Jackets',
    image: '/merch/07_black_buffalo_jacket.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
  {
    id: 'tee-fx-back',
    name: 'Foreign X-Change Graphic Tee (Back)',
    price: 65,
    category: 'Shirts',
    image: '/merch/04_black_fx_tee_back_screenshot.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
  {
    id: 'tee-fx-front',
    name: 'Foreign X-Change Text Tee (Front)',
    price: 65,
    category: 'Shirts',
    image: '/merch/05_black_fx_tee_front_screenshot.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
  {
    id: 'tee-ptsd',
    name: 'PTSD Tee (Black)',
    price: 65,
    category: 'Shirts',
    image: '/merch/06_black_ptsd_tee.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
  {
    id: 'tee-abstract',
    name: 'Abstract FX Tee (White)',
    price: 65,
    category: 'Shirts',
    image: '/merch/08_white_abstract_fx_tee.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
  {
    id: 'tee-dealer',
    name: 'Support Your Local Dealer Tee (Navy)',
    price: 65,
    category: 'Shirts',
    image: '/merch/09_navy_dealer_tee.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
  {
    id: 'tee-skulls',
    name: 'Skulls FX Tee (White)',
    price: 65,
    category: 'Shirts',
    image: '/merch/10_white_skulls_tee.jpeg',
    shopUrl: 'https://foreignx-change.com',
  },
];


/** Profile Shop digital cosmetics — CONCEPT / preview only (plan §22). Not Foreign X-Change. */
export const PROFILE_SHOP = [
  { id: 'frame-chrome-crown', name: 'Chrome Crown', category: 'frames', rarity: 'legendary', price: 12.99, emoji: '👑' },
  { id: 'frame-iced-out', name: 'Iced Out', category: 'frames', rarity: 'epic', price: 9.99, emoji: '💎' },
  { id: 'frame-trap-flame', name: 'Trap Flame', category: 'frames', rarity: 'epic', price: 7.99, emoji: '🔥' },
  { id: 'frame-rodeo-gold', name: 'Rodeo Gold', category: 'frames', rarity: 'rare', price: 5.99, emoji: '🤠' },
  { id: 'frame-rose-petals', name: 'Rose Petals', category: 'frames', rarity: 'rare', price: 4.99, emoji: '🌹' },
  { id: 'fx-bass-pulse', name: 'Bass Pulse', category: 'effects', rarity: 'epic', price: 8.99, emoji: '🎵' },
  { id: 'fx-snowfall', name: 'Snowfall', category: 'effects', rarity: 'rare', price: 5.99, emoji: '❄️' },
  { id: 'fx-city-lights', name: 'City Lights', category: 'effects', rarity: 'epic', price: 7.99, emoji: '🌃' },
  { id: 'fx-holo-glitch', name: 'Holographic Glitch', category: 'effects', rarity: 'legendary', price: 14.99, emoji: '✨' },
  { id: 'ban-skyline', name: 'City Skyline', category: 'banners', rarity: 'rare', price: 4.99, emoji: '🏙️' },
  { id: 'ban-studio', name: 'Studio Booth', category: 'banners', rarity: 'rare', price: 4.99, emoji: '🎙️' },
  { id: 'ban-arena', name: 'Arena Lights', category: 'banners', rarity: 'epic', price: 6.99, emoji: '🏟️' },
  { id: 'ban-chrome', name: 'Luxury Chrome', category: 'banners', rarity: 'legendary', price: 11.99, emoji: '🪞' },
  { id: 'name-chrome', name: 'Chrome Name', category: 'name styles', rarity: 'epic', price: 6.99, emoji: '🅰️' },
  { id: 'name-neon', name: 'Neon Name', category: 'name styles', rarity: 'rare', price: 3.99, emoji: '💜' },
  { id: 'name-varsity', name: 'Bold Varsity', category: 'name styles', rarity: 'rare', price: 3.99, emoji: '🏟️' },
  { id: 'name-western', name: 'Western Script', category: 'name styles', rarity: 'epic', price: 5.99, emoji: '🏜️' },
  { id: 'badge-dayone', name: 'Day One (cosmetic style)', category: 'badges', rarity: 'rare', price: 2.99, emoji: '1️⃣' },
  { id: 'badge-topfan', name: 'Top Fan (cosmetic style)', category: 'badges', rarity: 'epic', price: 4.99, emoji: '⭐' },
  { id: 'badge-backstage', name: 'Backstage Glow', category: 'badges', rarity: 'epic', price: 5.99, emoji: '🎫' },
];

export const SHOP_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'frames', label: 'Frames' },
  { id: 'effects', label: 'Effects' },
  { id: 'banners', label: 'Banners' },
  { id: 'name styles', label: 'Name styles' },
  { id: 'badges', label: 'Badges' },
];

export const MEMBERSHIPS = [
  { id: 'skeet', name: 'Skeet+', price: 3.99, blurb: 'Early DatBoiSkeet releases · basic Vault' },
  { id: 'backstage', name: 'Backstage', price: 7.99, blurb: 'Deeper Vault · studio lives · listening rooms' },
  { id: 'inner', name: 'Inner Circle', price: 14.99, blurb: 'VIP drops · private Q&As · Inner Circle rooms' },
];

/** Quick-pick images for the Posts composer (real assets only) */
export const POST_IMAGE_PRESETS = [
  { label: 'Long Story Short', src: '/music/01_Long_Story_Short_Coming_Soon.jpg' },
  { label: 'Ladies Only', src: '/music/02_Ladies_Only_Coming_Soon.jpg' },
  { label: '716 Orange Hat', src: '/merch/01_black_orange_716_hat.jpeg' },
  { label: '716 Blue Hat', src: '/merch/02_blue_red_716_hat.jpeg' },
  { label: 'Blue Jacket', src: '/merch/03_blue_buffalo_jacket.jpeg' },
  { label: 'PTSD Tee', src: '/merch/06_black_ptsd_tee.jpeg' },
];

export const HOME_SECTIONS = [
  { route: '/explore', title: 'Explore', blurb: 'Discover DatBoiSkeet · creators · drops' },
  { route: '/music', title: 'Music', blurb: 'Long Story Short · Ladies Only · Vault' },
  { route: '/videos', title: 'Videos', blurb: 'Official DatBoiSkeet MVs' },
  { route: '/posts', title: 'Posts', blurb: 'Text · Picture · Short · Video' },
  { route: '/shorts', title: 'Shorts', blurb: 'Under Posts · quick clips' },
  { route: '/live', title: 'Live', blurb: 'Go live · TEST MODE demo' },
  { route: '/shop', title: 'PIKK Shop', blurb: 'Foreign X-Change merch · external checkout' },
  { route: '/community', title: 'PIKK Lounge', blurb: 'Artist-owned rooms · Phase 2' },
  { route: '/music', title: 'Vault', blurb: 'Member exclusives · Coming Soon', hash: 'vault' },
  { route: '/marketplace', title: 'Marketplace', blurb: 'Brand ads & sponsored offers' },
  { route: '/missions', title: 'Missions', blurb: 'Clipper promo campaigns' },
  { route: '/clippers', title: 'Clippers', blurb: 'Apply · cut clips · earn' },
];

/** Drawer / side nav — grouped accordion (≤8 top-level). */
export const DRAWER_GROUPS = [
  { id: 'home', label: 'Home', href: '#/home' },
  /* t298u — Profile / Sign in pinned near top (not only under Account accordion) */
  { id: 'explore', label: 'Explore', href: '#/explore' },
  { id: 'profile', label: 'Profile / Sign in', href: '#/profile' },
  {
    id: 'watch',
    label: 'Watch',
    links: [
      { href: '#/videos', label: 'Videos' },
      { href: '#/live', label: 'Live' },
      { href: '#/openmic', label: 'Open Mic / Talent Discovery (24/7)' },
      { href: '#/spotlight', label: 'Spotlight (24/7)' },
      { href: '#/multiguest', label: 'Multi-Guest Live' },
    ],
  },
  {
    id: 'music',
    label: 'Music',
    links: [
      { href: '#/music', label: 'Music & Vault' },
    ],
  },
  {
    id: 'social',
    label: 'Social',
    links: [
      { href: '#/posts', label: 'Posts' },
      { href: '#/posts?compose=1', label: 'Post · Text / Picture / Short / Video' },
      { href: '#/shorts', label: 'Shorts (in Posts)' },
      { href: '#/notifications', label: 'Notifications' },
      { href: '#/connect', label: 'Connect' },
      { href: '#/dating', label: 'Dating & Connections' },
      { href: '#/community', label: 'Community / Lounge' },
    ],
  },
  { id: 'messages', label: 'Messages', href: '#/messages' },
  {
    id: 'games',
    label: 'Games',
    links: [
      { href: '#/games', label: 'PIKK Arcade · 15 Games Coming Soon' },
      { href: '#/blockwars', label: 'Block Wars · Coming Soon' },
    ],
  },
  {
    id: 'shop',
    label: 'Shop',
    links: [
      { href: '#/merch', label: 'Foreign X-Change Merch' },
      { href: '#/marketplace', label: 'Marketplace' },
      { href: '#/shop', label: 'PIKK Shop' },
      { href: '#/profile-shop', label: 'Profile Shop · cosmetics' },
    ],
  },
  {
    id: 'earn',
    label: 'Creators & Earnings',
    links: [
      { href: '#/wallet', label: 'Wallet' },
      { href: '#/earnings', label: 'Creator Earnings' },
      { href: '#/missions', label: 'Missions' },
      { href: '#/clippers', label: 'Clippers Apply' },
      { href: '#/share', label: 'Share & Earn' },
      { href: '#/refer', label: 'Refer & Earn' },
      { href: '#/pricing', label: 'Pricing (rules & fees)' },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    links: [
      { href: '#/profile', label: 'Profile' },
      { href: '#/signup', label: 'Signup / Creator Apps' },
      { href: '#/loyalty', label: 'Loyalty Club' },
      { href: '#/fanclubs', label: 'Fan Clubs' },
      { href: '#/guidelines', label: 'Community Guidelines' },
    ],
  },
  {
    id: 'studio',
    label: 'Studio / Owner',
    links: [
      { href: '#/admin', label: 'Admin' },
      { href: '#/phases', label: 'Development Phases' },
      { href: '#/launch', label: 'Launch Readiness' },
    ],
  },
];

/** Flat drawer links (compat) — derived from DRAWER_GROUPS. */
export const DRAWER_LINKS = DRAWER_GROUPS.flatMap((g) =>
  g.href ? [{ href: g.href, label: g.label }] : (g.links || [])
);

/** Owner-approved seven-tab bottom navigation in this exact order.
 * Home is a real destination; Arcade remains in the drawer and Home showcase.
 * Create stays the raised center action; messages remain in the header. */
export const TABBAR = [
  { href: '#/music', label: 'Music', icon: 'music' },
  { href: '#/videos', label: 'Videos', icon: 'videos' },
  { href: '#/connect', label: 'Connect', icon: 'profile' },
  { href: '#/create', label: 'Create', icon: 'live', primary: true },
  { href: '#/dating', label: 'Dating', icon: 'heart' },
  { href: '#/games', label: 'Games', icon: 'game' },
  { href: '#/shop', label: 'Shop', icon: 'merch' },
];
