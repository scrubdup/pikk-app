// PIKK Explore city/state discovery. Search ONLY records explicitly opted into
// public location discovery; never infer coordinates, addresses, or online presence.
const STATES = 'AL:Alabama,AK:Alaska,AZ:Arizona,AR:Arkansas,CA:California,CO:Colorado,CT:Connecticut,DE:Delaware,FL:Florida,GA:Georgia,HI:Hawaii,ID:Idaho,IL:Illinois,IN:Indiana,IA:Iowa,KS:Kansas,KY:Kentucky,LA:Louisiana,ME:Maine,MD:Maryland,MA:Massachusetts,MI:Michigan,MN:Minnesota,MS:Mississippi,MO:Missouri,MT:Montana,NE:Nebraska,NV:Nevada,NH:New Hampshire,NJ:New Jersey,NM:New Mexico,NY:New York,NC:North Carolina,ND:North Dakota,OH:Ohio,OK:Oklahoma,OR:Oregon,PA:Pennsylvania,RI:Rhode Island,SC:South Carolina,SD:South Dakota,TN:Tennessee,TX:Texas,UT:Utah,VT:Vermont,VA:Virginia,WA:Washington,WV:West Virginia,WI:Wisconsin,WY:Wyoming,DC:District of Columbia'
  .split(',').map(entry => entry.split(':'));
const STATE_ALIASES = new Map(STATES.flatMap(([code, name]) => [[code.toLowerCase(), code], [name.toLowerCase(), code]]));
const clean = value => String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
const canonicalState = value => STATE_ALIASES.get(clean(value)) || clean(value);
const includesQuery = (item, q) => !q || [
  item.username, item.bio, item.title, item.text, item.hostName, item.artist, item.type,
].some(value => clean(value).includes(q));

export function matchesOptInLocation(item, { city = '', state = '' } = {}) {
  if (!item || item.locationDiscoverable !== true || item.private === true || item.isPrivate === true) return false;
  const declared = item.location && typeof item.location === 'object' ? item.location : item;
  // Both declared fields must exist, even when filtering by state only.
  if (!clean(declared.city) || !clean(declared.state)) return false;
  return (!city || clean(declared.city) === clean(city))
    && (!state || canonicalState(declared.state) === canonicalState(state));
}

export function searchOptInLocations(data, { city = '', state = '', query = '' } = {}) {
  const q = clean(query);
  const eligible = item => matchesOptInLocation(item, { city, state }) && includesQuery(item, q);
  const profiles = Object.values(data.profiles || {}).filter(eligible);
  // Discoverability of the signed-in user requires BOTH profile and Explore consent.
  if (data.exploreDiscoverable === true && eligible(data.user) && !profiles.some(p => p.id === data.user.id)) {
    profiles.push(data.user);
  }
  const posts = (data.posts || []).filter(eligible);
  const catalog = (data.catalog || []).filter(item => item.published === true && eligible(item));
  const live = data.live && !data.live.endedAt && eligible(data.live) ? [{ ...data.live, status: 'live' }] : [];
  const history = (data.liveHistory || []).filter(eligible).map(item => ({ ...item, status: 'ended' }));
  return {
    query: String(query || '').trim() || 'City & State',
    locationLabel: [city, state].map(v => String(v || '').trim()).filter(Boolean).join(', '),
    profiles, posts,
    music: catalog.filter(item => item.type === 'song' || item.type === 'album'),
    videos: catalog.filter(item => item.type === 'video'),
    pictures: catalog.filter(item => item.type === 'picture'),
    lives: [...live, ...history],
    products: (data.listings || []).filter(item => item.active !== false && eligible(item)),
  };
}
