// Deterministic Roast Arena 1v1 match engine. TEST MODE / local only:
// no server, live video, shared votes, or real payments happen here.
// Roast Arena is separate from PIKK Gift Battles; nothing here touches battle code.

/** OWNER-APPROVED (2026-11-02): round length, round count, vote window and rematch-agree window for Roast 1v1. Rematch rounds reuse the same round length. */
export const ROAST_APPROVED_TIMINGS = Object.freeze({
  roundSeconds: 60,
  baseRounds: 3,
  // OWNER-APPROVED (2026-11-02, 2:03 PM CT): "10 secs to vote players get 5 secs to rematch".
  voteSeconds: 10,
  rematchSeconds: 5,
});
/**
 * OWNER-APPROVED rules (2026-11-02): a tie after the scheduled rounds gets ONE tiebreaker round,
 * then ends as a tie; contestants cannot vote; a rematch needs every contestant to agree.
 */
export const ROAST_APPROVED_RULES = Object.freeze({ tiebreakerRounds: 1, contestantsMayVote: false, rematchRequiresAllContestants: true });
export const ROUND_SECONDS = ROAST_APPROVED_TIMINGS.roundSeconds;
export const VOTE_SECONDS = ROAST_APPROVED_TIMINGS.voteSeconds;
export const REMATCH_SECONDS = ROAST_APPROVED_TIMINGS.rematchSeconds;
export const BASE_ROUNDS = ROAST_APPROVED_TIMINGS.baseRounds;

let seq = 0;
const nowIso = () => new Date().toISOString();

/**
 * Local test-mode invite. Field names mirror backend roast_invites
 * (id, inviter_id, invitee_id, mode, status, inviter_consent_at, invitee_consent_at)
 * and the POST /roast/invites body (consent_accepted), but nothing is sent anywhere.
 */
export function createRoastInvite({ inviterId, inviteeId, consentAccepted, blocked = false }) {
  if (consentAccepted !== true) return { error: 'consent_required' };
  if (!inviterId || !inviteeId || inviterId === inviteeId) return { error: 'validation_failed' };
  if (blocked) return { error: 'blocked' };
  const t = nowIso();
  return { id: `test-rvi-${++seq}`, inviter_id: inviterId, invitee_id: inviteeId, mode: 'roast_1v1', status: 'pending', inviter_consent_at: t, invitee_consent_at: null, created_at: t, testMode: true };
}

export function respondRoastInvite(invite, { accept, consentAccepted }) {
  if (!invite || invite.status !== 'pending') return { error: 'not_found' };
  if (!accept) return { ...invite, status: 'declined' };
  if (consentAccepted !== true) return { error: 'consent_required' };
  return { ...invite, status: 'accepted', invitee_consent_at: nowIso() };
}

export function hasBothConsents(invite) {
  return !!invite && invite.status === 'accepted' && !!invite.inviter_consent_at && !!invite.invitee_consent_at;
}

/** A match can only start from an accepted invite with consent from both contestants. */
export function createRoastMatch(invite, { eligibleViewerIds = [], rules = ROAST_APPROVED_RULES } = {}) {
  if (!hasBothConsents(invite)) throw new Error('consent_required: both contestants must accept before a match starts');
  // Roast is 1v1 only (owner ruling t461u).
  const contestants = [invite.inviter_id, invite.invitee_id];
  const extra = { mode: 'roast_1v1' };
  return {
    testMode: true, inviteId: invite.id, contestants, ...extra, rules,
    // Room viewers who may vote; contestants are excluded unless rules.contestantsMayVote.
    eligibleViewerIds: [...new Set(eligibleViewerIds)].filter((v) => rules.contestantsMayVote || !contestants.includes(v)),
    phase: 'round', round: 1, seconds: ROUND_SECONDS,
    votes: [0, 0], votersThisRound: [], scores: [0, 0], roundWinners: [],
    gifts: [0, 0], rematchAgreement: {}, rematch: null, reports: [],
    winner: null, result: null, tieBreaker: false, tiebreakersPlayed: 0,
  };
}

/** One vote per eligible viewer per round, enforced by viewer id. */
export function castRoastVote(match, contestant, viewerId) {
  if (match.phase !== 'vote' || ![0, 1].includes(contestant)) return match;
  if (!match.eligibleViewerIds.includes(viewerId) || match.votersThisRound.includes(viewerId)) return match;
  if (!match.rules.contestantsMayVote && match.contestants.includes(viewerId)) return match;
  const votes = [...match.votes]; votes[contestant] += 1;
  return { ...match, votes, votersThisRound: [...match.votersThisRound, viewerId] };
}

/** TEST MODE turnout for the current round: how many of the eligible viewers in the room voted. */
export function roastVoteTurnout(match) {
  return { voted: match.votersThisRound.length, eligible: match.eligibleViewerIds.length };
}

/** TEST MODE gift tally only. Kept separate from votes; never decides the winner. */
export function sendRoastTestGift(match, contestant, amount = 1) {
  if (!['round', 'vote'].includes(match.phase) || ![0, 1].includes(contestant) || !(amount > 0)) return match;
  const gifts = [...match.gifts]; gifts[contestant] += amount;
  return { ...match, gifts };
}

/**
 * Rematch needs mutual agreement: every contestant (both 1v1 contestants) must say yes.
 * Viewers have no say. Any "no" ends the match; the window closing without full agreement ends it too.
 */
export function castRematchVote(match, yes, contestantId) {
  if (match.phase !== 'rematch' || !match.contestants.includes(contestantId) || contestantId in match.rematchAgreement) return match;
  const rematchAgreement = { ...match.rematchAgreement, [contestantId]: !!yes };
  if (!yes) return { ...match, rematchAgreement, rematch: 'declined', phase: 'finished', seconds: 0 };
  // Reads the approved rule instead of hardcoding it. When false, one contestant's yes is enough.
  const requireAll = match.rules?.rematchRequiresAllContestants !== false;
  const all = requireAll ? match.contestants.every((c) => rematchAgreement[c] === true) : true;
  return all ? { ...match, rematchAgreement, rematch: 'agreed', phase: 'finished', seconds: 0 } : { ...match, rematchAgreement };
}

/** Starts a fresh match with the same contestants, only after every contestant agreed. */
export function startRematch(match, invite) {
  if (match.rematch !== 'agreed' || invite?.id !== match.inviteId) throw new Error('rematch_not_agreed');
  return createRoastMatch(invite, { eligibleViewerIds: match.eligibleViewerIds });
}

/** Report stub: recorded locally on the match only; nothing is sent to moderators. */
export function recordRoastReport(match, { reporterId, targetId, reason }) {
  if (!reporterId || !reason) return match;
  return { ...match, reports: [...match.reports, { reporterId, targetId: targetId || null, reason, at: nowIso(), localOnly: true }] };
}

export function tickRoastMatch(match) {
  if (!['round', 'vote', 'rematch'].includes(match.phase)) return match;
  if (match.seconds > 1) return { ...match, seconds: match.seconds - 1 };
  if (match.phase === 'round') return { ...match, phase: 'vote', seconds: VOTE_SECONDS, votes: [0, 0], votersThisRound: [] };
  if (match.phase === 'vote') {
    // Round winner is decided by audience votes only. Gifts are ignored.
    const w = match.votes[0] === match.votes[1] ? null : match.votes[0] > match.votes[1] ? 0 : 1;
    const scores = [...match.scores]; if (w !== null) scores[w] += 1;
    const roundWinners = [...match.roundWinners, w];
    if (match.round >= BASE_ROUNDS && scores[0] !== scores[1]) {
      const winner = scores[0] > scores[1] ? 0 : 1;
      return { ...match, scores, roundWinners, winner, result: 'winner', phase: 'rematch', seconds: REMATCH_SECONDS };
    }
    if (match.round >= BASE_ROUNDS && match.tiebreakersPlayed >= match.rules.tiebreakerRounds) {
      // Still tied after the allowed tiebreaker round(s): match ends as a tie (owner-approved).
      return { ...match, scores, roundWinners, winner: null, result: 'tie', phase: 'finished', seconds: 0 };
    }
    const nextIsTiebreaker = match.round >= BASE_ROUNDS;
    return { ...match, scores, roundWinners, phase: 'round', round: match.round + 1, seconds: ROUND_SECONDS, votes: [0, 0], votersThisRound: [], tieBreaker: nextIsTiebreaker, tiebreakersPlayed: match.tiebreakersPlayed + (nextIsTiebreaker ? 1 : 0) };
  }
  return { ...match, phase: 'finished', seconds: 0, rematch: match.rematch || 'expired' };
}
