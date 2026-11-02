// Deterministic Roast Arena 1v1 match engine. TEST MODE / local only:
// no server, live video, shared votes, or real payments happen here.
// Roast Arena is separate from PIKK Gift Battles; nothing here touches battle code.

/**
 * OWNER VERIFICATION NEEDED: these timings come from the earlier prototype and were
 * never confirmed by the owner. They are shown in the UI as "test values".
 */
export const ROAST_TEST_TIMINGS_OWNER_VERIFICATION_NEEDED = Object.freeze({
  roundSeconds: 60,
  voteSeconds: 10,
  rematchSeconds: 10,
  baseRounds: 3,
});
const T = ROAST_TEST_TIMINGS_OWNER_VERIFICATION_NEEDED;
export const ROUND_SECONDS = T.roundSeconds;
export const VOTE_SECONDS = T.voteSeconds;
export const REMATCH_SECONDS = T.rematchSeconds;
export const BASE_ROUNDS = T.baseRounds;

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

/**
 * OWNER VERIFICATION NEEDED: Tag-Team format was never specified. Smallest test default:
 * 2v2, teams alternate turns (A1, B1, A2, B2). Rounds/timings reuse the 1v1 test values.
 */
export const ROAST_TAG_TEAM_TEST_FORMAT_OWNER_VERIFICATION_NEEDED = Object.freeze({
  teamSize: 2,
  turnOrder: 'teams-alternate',
});
const TT = ROAST_TAG_TEAM_TEST_FORMAT_OWNER_VERIFICATION_NEEDED;

/** Tag-Team turn order: teams alternate, one member at a time. */
export function tagTeamTurnOrder(teams) {
  const order = [];
  for (let i = 0; i < TT.teamSize; i++) for (const t of [0, 1]) order.push({ team: t, memberId: teams[t][i] });
  return order;
}

/** Local TEST invite for Tag-Team. Every member must consent; consents map memberId -> ISO time or null. */
export function createTagTeamInvite({ teams, inviterId, consentAccepted, blocked = false }) {
  const all = (teams || []).flat();
  if (!Array.isArray(teams) || teams.length !== 2 || teams.some((t) => !Array.isArray(t) || t.length !== TT.teamSize) || all.some((m) => !m) || new Set(all).size !== all.length) return { error: 'validation_failed' };
  if (!all.includes(inviterId)) return { error: 'validation_failed' };
  if (consentAccepted !== true) return { error: 'consent_required' };
  if (blocked) return { error: 'blocked' };
  const t = nowIso();
  const consents = Object.fromEntries(all.map((m) => [m, m === inviterId ? t : null]));
  return { id: `test-rvi-${++seq}`, inviter_id: inviterId, mode: 'roast_tag_team', teams: teams.map((x) => [...x]), consents, status: 'pending', created_at: t, testMode: true };
}

/** One member responds. Any decline cancels the invite; it becomes accepted only when every member consented. */
export function respondTagTeamInvite(invite, memberId, { accept, consentAccepted }) {
  if (!invite || invite.status !== 'pending' || !(memberId in invite.consents)) return { error: 'not_found' };
  if (!accept) return { ...invite, status: 'declined', declined_by: memberId };
  if (consentAccepted !== true) return { error: 'consent_required' };
  const consents = { ...invite.consents, [memberId]: invite.consents[memberId] || nowIso() };
  const allIn = Object.values(consents).every(Boolean);
  return { ...invite, consents, status: allIn ? 'accepted' : 'pending' };
}

export function hasAllConsents(invite) {
  if (!invite || invite.status !== 'accepted') return false;
  if (invite.mode === 'roast_tag_team') return Object.values(invite.consents).every(Boolean);
  return hasBothConsents(invite);
}

export function hasBothConsents(invite) {
  return !!invite && invite.status === 'accepted' && !!invite.inviter_consent_at && !!invite.invitee_consent_at;
}

/** A match can only start from an accepted invite with consent from both contestants. */
export function createRoastMatch(invite, { eligibleViewerIds = [] } = {}) {
  if (invite?.mode === 'roast_tag_team') {
    if (!hasAllConsents(invite)) throw new Error('consent_required: every team member must accept before a match starts');
  } else if (!hasBothConsents(invite)) throw new Error('consent_required: both contestants must accept before a match starts');
  const teams = invite.mode === 'roast_tag_team' ? invite.teams.map((x) => [...x]) : null;
  const contestants = teams ? teams.flat() : [invite.inviter_id, invite.invitee_id];
  const extra = teams ? { mode: 'roast_tag_team', teams, turnOrder: tagTeamTurnOrder(teams) } : { mode: 'roast_1v1' };
  return {
    testMode: true, inviteId: invite.id, contestants, ...extra,
    eligibleViewerIds: eligibleViewerIds.filter(v => !contestants.includes(v)),
    phase: 'round', round: 1, seconds: ROUND_SECONDS,
    votes: [0, 0], votersThisRound: [], scores: [0, 0], roundWinners: [],
    gifts: [0, 0], rematchVotes: [0, 0], rematchVoters: [], reports: [],
    winner: null, result: null, tieBreaker: false,
  };
}

/** One vote per eligible viewer per round, enforced by viewer id. */
export function castRoastVote(match, contestant, viewerId) {
  if (match.phase !== 'vote' || ![0, 1].includes(contestant)) return match;
  if (!match.eligibleViewerIds.includes(viewerId) || match.votersThisRound.includes(viewerId)) return match;
  const votes = [...match.votes]; votes[contestant] += 1;
  return { ...match, votes, votersThisRound: [...match.votersThisRound, viewerId] };
}

/** TEST MODE gift tally only. Kept separate from votes; never decides the winner. */
export function sendRoastTestGift(match, contestant, amount = 1) {
  if (!['round', 'vote'].includes(match.phase) || ![0, 1].includes(contestant) || !(amount > 0)) return match;
  const gifts = [...match.gifts]; gifts[contestant] += amount;
  return { ...match, gifts };
}

export function castRematchVote(match, yes, viewerId) {
  if (match.phase !== 'rematch' || !match.eligibleViewerIds.includes(viewerId) || match.rematchVoters.includes(viewerId)) return match;
  const rematchVotes = [...match.rematchVotes]; rematchVotes[yes ? 0 : 1] += 1;
  return { ...match, rematchVotes, rematchVoters: [...match.rematchVoters, viewerId] };
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
    if (match.tieBreaker) {
      // Tiebreaker round also tied: match ends as a tie (owner verification needed).
      return { ...match, scores, roundWinners, winner: null, result: 'tie', phase: 'finished', seconds: 0 };
    }
    return { ...match, scores, roundWinners, phase: 'round', round: match.round + 1, seconds: ROUND_SECONDS, votes: [0, 0], votersThisRound: [], tieBreaker: match.round >= BASE_ROUNDS };
  }
  return { ...match, phase: 'finished', seconds: 0 };
}
