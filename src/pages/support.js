import {esc,shellPage,toast} from '../ui.js';
import {SUPPORT_TOPICS,SUPPORT_GUIDES,SUPPORT_SECTIONS,searchSupportGuides,createSupportTicket,saveSupportTicket,readSupportTickets,deleteSupportTicket} from '../pikk-support.js';
/** Reuse the same safe guide cards before and after filtering. */
export function renderSupportGuideLinks(guides){
 return guides.map(g=>`<a class="support-guide" href="${esc(g.href)}"><strong>${esc(g.topic)}</strong><span>${esc(g.answer)}</span><span class="support-guide-link">View related page →</span></a>`).join('');
}
export function supportSearchStatus(count,query=''){
 return String(query).trim() ? `${count} matching help ${count===1?'guide':'guides'}` : `Showing all ${count} help guides`;
}
export function renderSupport(){
 const tickets=readSupportTickets(window.localStorage);
 const guides=renderSupportGuideLinks(SUPPORT_GUIDES);
 const history=tickets.length?tickets.map(t=>`<article class="card support-ticket" data-id="${esc(t.id)}"><strong>${esc(t.subject)}</strong><span class="chip">${esc(t.status)}</span><p class="muted">${esc(t.category)} · ${new Date(t.createdAt).toLocaleDateString()}</p><button class="btn ghost support-delete" type="button" data-id="${esc(t.id)}">Delete local draft</button></article>`).join(''):'<p class="muted">No support drafts saved on this device.</p>';
 return shellPage('PIKK Support',`
  <div class="support-studio">
   <header class="support-hero"><span class="support-eyebrow">PIKK HELP CENTER · EARLY ACCESS</span><h2>Answers, guidance & support</h2><p>Find relevant help and prepare a support ticket. Human agents, AI chat, account actions and backend tickets are not yet connected.</p><p class="support-warning"><strong>TEST MODE:</strong> Tickets are saved only in this browser. No request is sent to staff. For urgent safety concerns or unauthorized charges, contact the relevant service or authorities directly.</p></header>
   <nav class="support-jump" aria-label="Support sections">${SUPPORT_SECTIONS.map(x=>`<a class="chip" href="${esc(x.href)}" data-support-jump="${esc(x.id)}">${esc(x.title)}</a>`).join('')}</nav>
   <section class="card support-pane" id="support-faq"><h3>Help / FAQ search</h3><div class="support-search-row"><input id="pikkSupportSearch" type="search" placeholder="Search help (e.g. refund, login, live)" aria-label="Search help" aria-controls="pikkSupportResults" aria-describedby="pikkSupportSearchStatus" /><button class="btn ghost support-search-clear" id="pikkSupportClear" type="button" hidden>Clear search</button></div><p class="support-search-status muted" id="pikkSupportSearchStatus" role="status" aria-live="polite" aria-atomic="true">${supportSearchStatus(SUPPORT_GUIDES.length)}</p><div class="support-guides" id="pikkSupportResults">${guides}</div></section>
   <section class="card support-pane" id="support-account"><h3>Account &amp; login help</h3><p class="muted">Sign in or manage your profile from <a href="#/profile">Profile</a>. Verified account recovery and password reset by Support are coming soon; never share your password with anyone.</p></section>
   <section class="card support-pane" id="support-links"><h3>Safety, payments &amp; bugs</h3><div class="support-guides"><a class="support-guide" href="#/guidelines"><strong>Report abuse / safety</strong><span>Community Guidelines and how reporting works.</span></a><a class="support-guide" href="#/payments"><strong>Payments &amp; refunds help</strong><span>Payments hub · real payments are Coming soon.</span></a><button type="button" class="support-guide" data-support-bug><strong>Report a problem / bug</strong><span>Prefills the ticket form with Bug report.</span></button></div></section>
   <div class="support-layout">
    <section class="card support-pane" hidden><h3>Find help</h3><div class="support-guides">${guides}</div><p class="muted">These are general guides, not an automated resolution or personalized AI answer.</p></section>
    <section class="card support-pane" id="support-contact"><h3>Contact support</h3><p class="muted"><strong>Saved on this device — support inbox coming soon.</strong></p><p class="muted">Do not include passwords, payment card numbers, government IDs or confidential documents.</p>
     <form id="pikkSupportForm">
      <div class="field"><label for="pikkSupportTopic">Issue category *</label><select id="pikkSupportTopic" name="category">${SUPPORT_TOPICS.map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('')}</select></div>
      <div class="field"><label for="pikkSupportSubject">Subject *</label><input id="pikkSupportSubject" name="subject" maxlength="120" minlength="4" required /></div>
      <div class="field"><label for="pikkSupportContact">Contact *</label><input id="pikkSupportContact" name="contact" maxlength="180" required placeholder="Email or username" /></div>
      <div class="field"><label for="pikkSupportMessage">Describe the issue *</label><textarea id="pikkSupportMessage" name="message" minlength="10" maxlength="1500" required></textarea></div>
      <button class="btn primary" type="submit">Save ticket draft locally</button>
     </form>
    </section>
   </div>
   <section class="card support-pane" id="support-tickets"><h3>Saved drafts (${tickets.length})</h3><div class="support-history">${history}</div></section>
  </div>`,{lead:'Local help preview · Ticket submission and AI agents are not yet live'});
}
export function bindSupport(root){
 const res=root.querySelector('#pikkSupportResults');
 const search=root.querySelector('#pikkSupportSearch');
 const clear=root.querySelector('#pikkSupportClear');
 const status=root.querySelector('#pikkSupportSearchStatus');
 const updateSearch=(query)=>{
  const results=searchSupportGuides(query);
  res.innerHTML=results.length?renderSupportGuideLinks(results):'<p class="muted">No matching help yet. <a href="#/support?s=contact">Prepare a local support draft</a> below.</p>';
  if(status)status.textContent=supportSearchStatus(results.length,query);
  if(clear)clear.hidden=!String(query).trim();
 };
 search?.addEventListener('input',()=>updateSearch(search.value));
 search?.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&search.value){event.preventDefault();search.value='';updateSearch('');}
 });
 clear?.addEventListener('click',()=>{if(!search)return;search.value='';updateSearch('');search.focus();});
 const bug=()=>{const sel=root.querySelector('#pikkSupportTopic');if(sel)sel.value='Bug report';root.querySelector('#support-contact')?.scrollIntoView({block:'start'});root.querySelector('#pikkSupportSubject')?.focus();};
 root.querySelector('[data-support-bug]')?.addEventListener('click',bug);
 const sp=new URLSearchParams(location.hash.split('?')[1]||'').get('s');
 if(sp==='bug')setTimeout(bug,80);else if(sp)setTimeout(()=>root.querySelector('#support-'+sp)?.scrollIntoView({block:'start'}),80);
 root.querySelector('#pikkSupportForm')?.addEventListener('submit',event=>{
  event.preventDefault();
  const f=event.currentTarget;
  try{
   const item=createSupportTicket({category:f.elements.category.value,subject:f.elements.subject.value,contact:f.elements.contact.value,message:f.elements.message.value});
   const drafts=saveSupportTicket(window.localStorage,item);
   const added=drafts.some(draft=>draft.id===item.id);
   toast(added?'Ticket draft saved locally · not sent':'An identical draft is already saved on this device · not sent');
   if(location.hash==='#/support')location.hash='#/support?updated=1';
   window.dispatchEvent(new HashChangeEvent('hashchange'));
  }catch(e){toast(e.message)}
 });
 root.querySelectorAll('.support-delete').forEach(button=>button.addEventListener('click',()=>{
  deleteSupportTicket(window.localStorage,button.dataset.id);
  toast('Local ticket draft deleted');
  window.dispatchEvent(new HashChangeEvent('hashchange'));
 }));
}
