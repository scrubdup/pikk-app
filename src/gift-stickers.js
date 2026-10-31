/**
 * Compatibility shim — Design owns the pack in gifts-stickers.js + /public/gifts/.
 * Re-export so older imports of gift-stickers.js keep working.
 */
export {
  getGiftSticker,
  giftStickerHtml,
  getBattleWinSticker,
  getBattleCrownSticker,
  battleStickerHtml,
  GIFT_STICKER_EMOJI,
  GIFT_STICKER_SRC,
  giftStickerSrcMap,
} from './gifts-stickers.js';

/** Legacy register hook (no-op — Design pack is authoritative). */
export function registerGiftStickerHelper() {
  /* Design SVG pack is preferred; registration ignored */
}
