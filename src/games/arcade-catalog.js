// Approved PIKK Arcade 15-game order. Concept previews only, not playable titles.
export const PIKK_GAMES = Object.freeze([
  { name: 'Block Wars', players: '1–2', icon: '🥊', theme: 'fighters', artwork: '/games/approved/01_block_wars.jpg', description: 'City-based fighters, combos and special moves.', href: '#/blockwars' },
  { name: 'PIKK Playground', players: '1–8', icon: '🎈', theme: 'playground', artwork: '/games/approved/02_pikk_playground.jpg', description: 'Create your character, race, jump and explore with friends.' },
  { name: 'PIKK Clash', players: '1', icon: '💎', theme: 'clash', artwork: '/games/approved/03_pikk_clash.jpg', description: 'Original neighborhood-themed match puzzles and venue upgrades.' },
  { name: 'PIKK Knockout', players: '1', icon: '💥', theme: 'knockout', artwork: '/games/approved/04_pikk_knockout.jpg', description: 'Stylized physics challenges: launch, bounce and knock targets off moving platforms.' },
  { name: 'PIKK Bowling', players: '1–4', icon: '🎳', theme: 'bowling', artwork: '/games/approved/05_pikk_bowling.jpg', description: 'Compete for strikes, spares and high scores.' },
  { name: 'PIKK Pickleball', players: '2–4', icon: '🏓', theme: 'pickleball', artwork: '/games/approved/06_pikk_pickleball.jpg', description: 'Play singles or doubles on colorful courts.' },
  { name: 'PIKK Pool', players: '1–2', icon: '🎱', theme: 'pool', artwork: '/games/approved/07_pikk_pool.jpg', description: 'Play 8-ball pool against friends or the computer.' },
  { name: 'PIKK Cup Pong', players: '2–4', icon: '🥤', theme: 'pong', artwork: '/games/approved/08_pikk_cup_pong.jpg', description: 'Aim, throw and eliminate opponents’ cups.' },
  { name: 'PIKK Poker', players: '2–8', icon: '♠️', theme: 'poker', artwork: '/games/approved/09_pikk_poker.jpg', description: 'Social Texas Hold’em with nonredeemable Play Chips.' },
  { name: 'PIKK Blackjack', players: '1–5', icon: '🃏', theme: 'blackjack', artwork: '/games/approved/10_pikk_blackjack.jpg', description: 'Try for 21 against the dealer using Play Chips.' },
  { name: 'PIKK Slots', players: '1', icon: '🎰', theme: 'slots', artwork: '/games/approved/11_pikk_slots.jpg', description: 'Entertainment-only reels and virtual Play Chips.' },
  { name: 'PIKK Speed', players: '2', icon: '⚡', theme: 'speed', artwork: '/games/approved/12_pikk_speed.jpg', description: 'Race to play your cards before your opponent.' },
  { name: 'PIKK Spades', players: '4', icon: '♠', theme: 'spades', artwork: '/games/approved/13_pikk_spades.jpg', description: 'Partner strategy and card battles.' },
  { name: 'PIKK Dominoes', players: '2–4', icon: '🁢', theme: 'dominoes', artwork: '/games/approved/14_pikk_dominoes.jpg', description: 'Match tiles and outplay opponents.' },
  { name: 'PIKK Chess', players: '2', icon: '♟', theme: 'chess', artwork: '/games/approved/15_pikk_chess.jpg', description: 'Challenge opponents in a classic strategy game.' },
]);

/** Resolve game art on GitHub Pages and local development hosts. */
export function arcadeArtSrc(game) {
  if (!game?.artwork) return '';
  const base = (import.meta.env && import.meta.env.BASE_URL) || '/';
  return base.replace(/\/?$/, '/') + String(game.artwork).replace(/^\/+/, '');
}
