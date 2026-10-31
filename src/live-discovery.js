// PIKK Live discovery navigation. Categories filter existing channels; they do not
// create hosted rooms, grant audience permissions or imply an active livestream.
export const LIVE_DISCOVERY_GROUPS = Object.freeze([
  {
    id: 'women', title: "Women's Rooms", icon: '💗',
    description: 'Conversations, style, wellness, business and community',
    names: [
      'Ladies Lounge', 'Girl Talk', 'Tea Time', "What's the Word?", 'Who Did What?',
      'Beauty Bar', "Girls' Night In", 'Love & Standards', 'Boss Ladies',
      'Fashion & Fits', 'Ladies Only Live', 'Women in Business',
      "Women's Mental Wellness", 'Dating From Her Side', 'The Hustle Room: Women',
    ],
  },
  {
    id: 'men', title: "Men's Rooms", icon: '🫱🏻‍🫲🏿',
    description: 'Brotherhood, relationships, business, wellness and hobbies',
    names: [
      'The Man Cave', 'The Barbershop', "Fellas' Night", "Men's Corner",
      'Men in Business', 'Cars & Motors', 'Fitness & Brotherhood', 'Fatherhood',
      "Men's Mental Wellness", 'Dating From His Side', 'Sports Debate',
      'Gaming Brotherhood', "Men's Style", 'The Hustle Room',
      'Brotherhood & Mentorship',
    ],
  },
  {
    id: 'coed', title: 'Coed Communities', icon: '🌐',
    description: 'Shared conversations, learning and networking for everyone',
    names: [
      "Let's Talk", 'The Hangout', 'Business Connect & Wealth Academy',
      'Couples Corner', 'Conspiracy Room', 'Game Room', 'Why Are You Single?',
      'What Are You Looking For?', 'Single & Ready to Mingle', 'City Connect',
    ],
  },
  {
    id: 'dating', title: 'Singles & Dating', icon: '💘',
    description: 'Opt-in conversations, introductions and relationship topics',
    names: [
      'Looking for My Match', 'The Flirt Zone', 'Speed Connections',
      'Poly Connections', 'Date Night Live', 'Love & Advice',
    ],
  },
  {
    id: 'sports', title: 'Sports', icon: '🏆',
    description: 'A separate place for every major sport',
    names: ['Sports Central', 'Basketball', 'Football', 'Soccer', 'Baseball', 'Hockey'],
  },
  {
    id: 'talent', title: 'Music & Talent', icon: '🎙️',
    description: 'Rappers, singers, bands, producers and city competitions',
    names: ['The Booth', 'Producer Room', 'The Stage', 'City Takeover'],
  },
  {
    id: 'news', title: 'News & Innovation', icon: '📰',
    description: 'World events, markets and new ideas',
    names: ['World News', 'Economy & Markets', 'Startups & Innovation', 'Tech Talk', 'Money Talk'],
  },
  {
    id: 'general', title: 'General Live', icon: '📡',
    description: 'IRL, gaming, shows, comedy, food, fitness and more',
    names: [
      'Just Chatting', 'Gaming', 'Music', 'IRL', 'Sports', 'Creative',
      'Podcasts & Talk Shows', 'Food & Cooking', 'Fitness', 'Beauty & Fashion',
      'Business & Money Talk', 'Dating & Connections', 'Education',
      'News & Commentary', 'Comedy & Entertainment', 'Comedy & Roast Battles', 'Creator Spotlight',
    ],
  },
]);

export function renderLiveDiscoveryDirectory(categories, escapeHtml) {
  const byName = new Map(categories.map(entry => [entry[0], entry]));
  const assigned = new Set();
  const card = ([name, description, emoji]) => {
    const href = name === 'Comedy & Roast Battles'
      ? '#/roast-arena'
      : '#/live?tab=channels&category=' + encodeURIComponent(name);
    return '<a class="live-cat-card pikk-live-room-card" href="' + href +
      '" aria-label="' + escapeHtml(name) + ': browse channels">' +
      '<span class="pikk-live-room-emoji" aria-hidden="true">' + escapeHtml(emoji) + '</span>' +
      '<strong>' + escapeHtml(name) + '</strong>' +
      '<p class="muted">' + escapeHtml(description) + '</p>' +
      '<span class="pikk-live-room-action">Browse channels <span aria-hidden="true">›</span></span></a>';
  };
  const groups = LIVE_DISCOVERY_GROUPS.map(group => {
    const entries = group.names.map(name => byName.get(name)).filter(Boolean);
    entries.forEach(entry => assigned.add(entry[0]));
    return '<details class="pikk-live-directory-group" id="pikk-live-group-' + group.id +
      '"' + (group.id === 'coed' ? ' open' : '') + '>' +
      '<summary class="pikk-live-directory-summary">' +
      '<span class="pikk-live-directory-icon" aria-hidden="true">' + group.icon + '</span>' +
      '<span class="pikk-live-directory-label"><strong>' + escapeHtml(group.title) +
      '</strong><small>' + escapeHtml(group.description) + '</small></span>' +
      '<span class="pikk-live-directory-count">' + entries.length + ' rooms</span>' +
      '<span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span>' +
      '</summary><div class="live-cat-cards pikk-live-directory-cards">' +
      entries.map(card).join('') + '</div></details>';
  });
  // Future categories remain discoverable until explicitly assigned a group.
  const extra = categories.filter(entry => !assigned.has(entry[0]));
  if (extra.length) {
    groups.push('<details class="pikk-live-directory-group" open>' +
      '<summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">✨</span>' +
      '<span class="pikk-live-directory-label"><strong>More Live</strong><small>Additional topics</small></span>' +
      '<span class="pikk-live-directory-count">' + extra.length + ' rooms</span>' +
      '<span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary>' +
      '<div class="live-cat-cards pikk-live-directory-cards">' + extra.map(card).join('') + '</div></details>');
  }
  return '<div class="pikk-live-directory" aria-label="Live category groups">' + groups.join('') + '</div>';
}
