import {esc,shellPage,toast} from '../ui.js';
import {AI_CREATION_TYPES,validateAIArtistDraft,readAIArtistDrafts,saveAIArtistDraft,removeAIArtistDraft} from '../ai-artists.js';
export function renderAIArtists(){
 const drafts=readAIArtistDrafts(window.localStorage);
 const rows=drafts.length?drafts.map(x=>`<article class="card ai-artist-draft"><div class="row wrap"><strong>${esc(x.track)}</strong><span class="chip">AI · ${esc(x.creation)}</span></div><p class="muted">by ${esc(x.artist)} · Preview price $${x.price.toFixed(2)}</p><p class="muted">${esc(x.status)}</p><button type="button" class="btn ghost ai-artist-delete" data-id="${esc(x.id)}">Delete draft</button></article>`).join(''):'<p class="muted">No AI music drafts saved on this device. This is not a public music catalog.</p>';
 return shellPage('PIKK AI Artists',`
  <div class="ai-artist-studio">
   <header class="ai-artist-hero"><span class="ai-artist-kicker">PIKK MUSIC · DISTINCT AI CREATOR SPACE</span><h2>AI creativity. Clearly labeled.</h2><p>AI artists can build communities and, once commerce launches, offer songs for purchase. Human musicians remain clearly distinguished in the main music experience.</p><p class="ai-artist-caution"><strong>EARLY ACCESS / TEST MODE:</strong> No AI audio uploads, public profiles, followers, streams or song sales are enabled here yet. Drafts are stored only on this device. Setting a price does not activate checkout.</p></header>
   <div class="ai-artist-policies">
    <article class="card"><h3>AI Artists discovery</h3><p>A separate, opt-in category for fully AI-generated songs and virtual performers, with obvious AI labels on tracks and profiles.</p></article>
    <article class="card"><h3>Real artists stay distinct</h3><p>Human-made music remains clearly identified. AI-assisted works are labeled by their actual contribution; declaring AI artwork alone does not make the song AI-generated.</p></article>
    <article class="card"><h3>Fans and music purchases</h3><p>Planned: follow AI artists, comment, share, listen and buy clearly licensed tracks to keep permanently. No live payments are available in this preview.</p></article>
    <article class="card"><h3>Ownership and safety</h3><p>Creators must disclose AI use, confirm commercial rights and avoid impersonating real artists or cloning voices without permission. Review and appeals will be required before sales.</p></article>
   </div>
   <div class="ai-artist-columns">
    <section class="card ai-artist-panel"><h3>Prepare an AI artist listing</h3><p class="muted">Save a private demo draft. This does not upload music or make it searchable by other users.</p>
     <form id="aiArtistForm">
       <div class="field"><label for="aiArtistName">Artist / virtual artist name *</label><input id="aiArtistName" name="artist" maxlength="80" required /></div>
       <div class="field"><label for="aiTrackName">Song title *</label><input id="aiTrackName" name="track" maxlength="120" required /></div>
       <div class="field"><label for="aiCreationType">How was this made? *</label><select id="aiCreationType" name="creation">${AI_CREATION_TYPES.map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('')}</select></div>
       <div class="field"><label for="aiPreviewPrice">Planned purchase price in USD (preview only)</label><input id="aiPreviewPrice" name="price" type="number" min="0" max="100" step=".01" value="1.00" required /></div>
       <div class="field"><label for="aiDescription">Description (optional)</label><textarea id="aiDescription" name="description" maxlength="600"></textarea></div>
       <label class="ai-artist-certify"><input type="checkbox" id="aiArtistCertify" required /> I accurately disclosed the use of AI and confirm I hold or can obtain the necessary commercial rights, including voice and likeness permissions.</label>
       <button type="submit" class="btn primary">Save private AI music draft</button>
     </form>
    </section>
    <section class="card ai-artist-panel"><h3>My private drafts (${drafts.length})</h3><div class="ai-artist-drafts">${rows}</div><p class="muted">A real AI Artist storefront, public discovery feed and licensed downloadable sales require backend, payments and rights verification.</p></section>
   </div>
  </div>`,{lead:'Dedicated AI music category · Disclosure first'});
}
export function bindAIArtists(root){
 root.querySelector('#aiArtistForm')?.addEventListener('submit',ev=>{
  ev.preventDefault();const f=ev.currentTarget;
  try{const item=validateAIArtistDraft({artist:f.elements.artist.value,track:f.elements.track.value,creation:f.elements.creation.value,price:f.elements.price.value,description:f.elements.description.value,confirmed:root.querySelector('#aiArtistCertify').checked});
   saveAIArtistDraft(window.localStorage,item);toast('Private AI artist draft saved · not published');
   if(location.hash==='#/ai-artists')location.hash='#/ai-artists?updated=1';
   window.dispatchEvent(new HashChangeEvent('hashchange'));
  }catch(e){toast(e.message)}
 });
 root.querySelectorAll('.ai-artist-delete').forEach(btn=>btn.addEventListener('click',()=>{removeAIArtistDraft(window.localStorage,btn.dataset.id);window.dispatchEvent(new HashChangeEvent('hashchange'))}));
}
