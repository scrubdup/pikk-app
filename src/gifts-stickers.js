/**
 * t198u · DBS Live gift stickers (original SVG pack)
 * Design source of truth. Live Social wires via getGiftSticker / giftStickerHtml.
 * Assets: /public/gifts/<slug>.svg
 *
 * getGiftSticker(slug) → { src, html, className, emoji }
 * giftStickerHtml(slug, escFn|opts) — escFn = Live Social legacy; opts.className supported
 */

export const GIFT_STICKER_EMOJI = {
  rose: '🌹',
  'big-love': '💖',
  'turn-up': '🔥',
  'cash-rain': '💵',
  'bottle-pop': '🍾',
  'money-gun': '💸',
  'diamond-drip': '💎',
  'foreign-whip': '🚗',
  helicopter: '🚁',
  'private-jet': '✈️',
  'dbs-crown': '👑',
  'dbs-universe': '🌌',
  'battle-win': '✅',
  'battle-crown': '👑',
  'battle-vs': '⚔️',
  'battle-fire': '🔥',
};

export const GIFT_STICKER_SRC = {
  rose: '/gifts/rose.svg',
  'big-love': '/gifts/big-love.svg',
  'turn-up': '/gifts/turn-up.svg',
  'cash-rain': '/gifts/cash-rain.svg',
  'bottle-pop': '/gifts/bottle-pop.svg',
  'money-gun': '/gifts/money-gun.svg',
  'diamond-drip': '/gifts/diamond-drip.svg',
  'foreign-whip': '/gifts/foreign-whip.svg',
  helicopter: '/gifts/helicopter.svg',
  'private-jet': '/gifts/private-jet.svg',
  'dbs-crown': '/gifts/dbs-crown.svg',
  'dbs-universe': '/gifts/dbs-universe.svg',
  'battle-win': '/gifts/battle-win.svg',
  'battle-crown': '/gifts/battle-crown.svg',
  'battle-vs': '/gifts/battle-vs.svg',
  'battle-fire': '/gifts/battle-fire.svg',
};

const DEFAULT_CLASS = 'gift-sticker';

function escAttr(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function resolveClass(slug, opts) {
  if (opts && typeof opts === 'object' && opts.className) return opts.className;
  return `${DEFAULT_CLASS} ${DEFAULT_CLASS}--${slug}`;
}

/**
 * @param {string} slug
 * @param {{ className?: string }} [opts]
 * @returns {{ src: string|null, html: string, className: string, emoji: string }}
 */
export function getGiftSticker(slug, opts = {}) {
  const key = String(slug || '');
  const className = resolveClass(key || 'unknown', opts);
  const emoji = GIFT_STICKER_EMOJI[key] || '🎁';
  const src = GIFT_STICKER_SRC[key] || null;
  if (src) {
    return {
      src,
      className,
      emoji,
      html: `<img class="${escAttr(className)}" src="${escAttr(src)}" alt="" width="48" height="48" decoding="async" draggable="false" data-gift-slug="${escAttr(key)}" />`,
    };
  }
  return {
    src: null,
    className,
    emoji,
    html: `<span class="${escAttr(className)} gift-sticker--emoji" aria-hidden="true">${emoji}</span>`,
  };
}

/**
 * @param {string} slug
 * @param {Function|{ className?: string }} [escOrOpts] Live Social passes esc(); Design may pass opts
 */
export function giftStickerHtml(slug, escOrOpts) {
  const opts =
    escOrOpts && typeof escOrOpts === 'object' && typeof escOrOpts !== 'function'
      ? escOrOpts
      : {};
  // escFn is unused for img paths (we escape attrs ourselves) but accepted for API compat
  return getGiftSticker(slug, opts).html;
}

export function getBattleWinSticker(opts) {
  return getGiftSticker('battle-win', opts);
}
export function getBattleCrownSticker(opts) {
  return getGiftSticker('battle-crown', opts);
}
export function battleStickerHtml(slug, escOrOpts) {
  return giftStickerHtml(slug, escOrOpts);
}

export { GIFT_STICKER_SRC as giftStickerSrcMap };
