/** PIKK Live — complete 78-topic directory */

export type LiveSection =
  | 'general'
  | 'womens'
  | 'mens'
  | 'coed'
  | 'dating'
  | 'sports'
  | 'music'
  | 'news'

export type LiveTopic = {
  id: string
  name: string
  section: LiveSection
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const SECTIONS: { section: LiveSection; label: string; names: string[] }[] = [
  {
    section: 'general',
    label: 'General Live',
    names: [
      'Just Chatting',
      'Gaming',
      'Music',
      'IRL',
      'Sports',
      'Creative',
      'Podcasts & Talk Shows',
      'Food & Cooking',
      'Fitness',
      'Beauty & Fashion',
      'Business & Money Talk',
      'Dating & Connections',
      'Education',
      'News & Commentary',
      'Comedy & Entertainment',
      'Comedy & Roast Battles',
      'Creator Spotlight',
    ],
  },
  {
    section: 'womens',
    label: "Women's Rooms",
    names: [
      'Ladies Lounge',
      'Girl Talk',
      'Tea Time',
      "What's the Word?",
      'Who Did What?',
      'Beauty Bar',
      "Girls' Night In",
      'Love & Standards',
      'Boss Ladies',
      'Fashion & Fits',
      'Ladies Only Live',
      'Women in Business',
      "Women's Mental Wellness",
      'Dating From Her Side',
      'The Hustle Room: Women',
    ],
  },
  {
    section: 'mens',
    label: "Men's Rooms",
    names: [
      'The Man Cave',
      'The Barbershop',
      "Fellas' Night",
      "Men's Corner",
      'Men in Business',
      'Cars & Motors',
      'Fitness & Brotherhood',
      'Fatherhood',
      "Men's Mental Wellness",
      'Dating From His Side',
      'Sports Debate',
      'Gaming Brotherhood',
      "Men's Style",
      'The Hustle Room',
      'Brotherhood & Mentorship',
    ],
  },
  {
    section: 'coed',
    label: 'Coed Communities',
    names: [
      "Let's Talk",
      'The Hangout',
      'Business Connect & Wealth Academy',
      'Couples Corner',
      'Conspiracy Room',
      'Game Room',
      'Why Are You Single?',
      'What Are You Looking For?',
      'Single & Ready to Mingle',
      'City Connect',
    ],
  },
  {
    section: 'dating',
    label: 'Singles & Dating',
    names: [
      'Looking for My Match',
      'The Flirt Zone',
      'Speed Connections',
      'Poly Connections',
      'Date Night Live',
      'Love & Advice',
    ],
  },
  {
    section: 'sports',
    label: 'Sports',
    names: ['Sports Central', 'Basketball', 'Football', 'Soccer', 'Baseball', 'Hockey'],
  },
  {
    section: 'music',
    label: 'Music & Talent',
    names: ['The Booth', 'Producer Room', 'The Stage', 'City Takeover'],
  },
  {
    section: 'news',
    label: 'News & Innovation',
    names: ['World News', 'Economy & Markets', 'Startups & Innovation', 'Tech Talk', 'Money Talk'],
  },
]

export const LIVE_TOPICS: LiveTopic[] = SECTIONS.flatMap((s) =>
  s.names.map((name) => ({
    id: `${s.section}-${slug(name)}`,
    name,
    section: s.section,
  }))
)

export const LIVE_SECTIONS = SECTIONS.map((s) => ({
  id: s.section,
  label: s.label,
  count: s.names.length,
  topics: s.names.map((name) => ({
    id: `${s.section}-${slug(name)}`,
    name,
  })),
}))

export function findTopic(id: string): LiveTopic | undefined {
  return LIVE_TOPICS.find((t) => t.id === id)
}

/** Expected total — must stay 78 */
export const LIVE_TOPIC_COUNT = LIVE_TOPICS.length
