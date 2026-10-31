// Deterministic Roast Arena match engine. No server, streams, or shared votes here.
export const ROUND_SECONDS = 60;
export const VOTE_SECONDS = 10;
export const REMATCH_SECONDS = 10;
export const BASE_ROUNDS = 3;
export function createRoastMatch() {
  return { phase: 'round', round: 1, seconds: ROUND_SECONDS, votes: [0, 0], scores: [0, 0], roundWinners: [], gifts: [0, 0], rematchVotes: [0, 0], winner: null, tieBreaker: false };
}
export function castRoastVote(match, contestant) {
  if (match.phase !== 'vote' || ![0, 1].includes(contestant)) return match;
  const votes = [...match.votes]; votes[contestant] += 1;
  return { ...match, votes };
}
export function castRematchVote(match, yes) {
  if (match.phase !== 'rematch') return match;
  const rematchVotes = [...match.rematchVotes]; rematchVotes[yes ? 0 : 1] += 1;
  return { ...match, rematchVotes };
}
export function tickRoastMatch(match) {
  if (!['round','vote','rematch'].includes(match.phase)) return match;
  if (match.seconds > 1) return { ...match, seconds: match.seconds - 1 };
  if (match.phase === 'round') return { ...match, phase: 'vote', seconds: VOTE_SECONDS, votes: [0, 0], voted: false };
  if (match.phase === 'vote') {
    const winner = match.votes[0] === match.votes[1] ? null : match.votes[0] > match.votes[1] ? 0 : 1;
    const scores = [...match.scores]; if (winner !== null) scores[winner] += 1;
    const roundWinners = [...match.roundWinners, winner];
    if (match.round >= BASE_ROUNDS && scores[0] !== scores[1]) {
      return { ...match, scores, roundWinners, winner: scores[0] > scores[1] ? 0 : 1, phase: 'rematch', seconds: REMATCH_SECONDS, rematchVoted: false };
    }
    // A tied result after the scheduled rounds triggers another deciding round.
    return { ...match, scores, roundWinners, phase: 'round', round: match.round + 1, seconds: ROUND_SECONDS, votes: [0, 0], voted: false, tieBreaker: match.round >= BASE_ROUNDS };
  }
  return { ...match, phase: 'finished', seconds: 0 };
}
