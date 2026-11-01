// PIKK Support browser-local ticket prototype; no backend or AI service attached.
export const SUPPORT_KEY='pikk_support_local_tickets_v1';
export const SUPPORT_TOPICS=Object.freeze(['Account & login','Music & artist rights','Livestreams & gifts','Billing & purchases','Safety & reporting','Technical issue','Bug report','Other']);
const LIMIT=40;
export function createSupportTicket(input,now=Date.now()){
 const category=String(input.category||'');
 const subject=String(input.subject||'').trim().slice(0,120);
 const message=String(input.message||'').trim().slice(0,1500);
 const contact=String(input.contact||'').trim().slice(0,180);
 if(!SUPPORT_TOPICS.includes(category)||subject.length<4||message.length<10||!contact)throw Error('Select a topic and enter a subject, contact and detailed message.');
 return {id:'draft-'+now+'-'+Math.random().toString(36).slice(2,7),category,subject,message,contact,createdAt:now,status:'Saved on this device — support inbox coming soon · not submitted'};
}
export function readSupportTickets(storage){
 try{const value=JSON.parse(storage.getItem(SUPPORT_KEY)||'[]');return Array.isArray(value)?value.filter(x=>x&&typeof x.id==='string').slice(0,LIMIT):[]}catch{return []}
}
export function saveSupportTicket(storage,ticket){
 const all=[ticket,...readSupportTickets(storage)].slice(0,LIMIT);
 storage.setItem(SUPPORT_KEY,JSON.stringify(all));return all;
}
export function deleteSupportTicket(storage,id){
 const all=readSupportTickets(storage).filter(x=>x.id!==id);
 storage.setItem(SUPPORT_KEY,JSON.stringify(all));return all;
}
export const SUPPORT_GUIDES=Object.freeze([
 {topic:'Music & artist rights',answer:'For copyright protection, review PIKK Shield. Fingerprinting, review and takedowns are not yet operating.',href:'#/shield'},
 {topic:'Livestreams & gifts',answer:'Check the Live section for available demo features. Real payouts and broadcasts require production integrations.',href:'#/live'},
 {topic:'Billing & purchases',answer:'Wallet and payments shown in this preview may be demonstration values. Do not assume money was charged or refunded.',href:'#/wallet'},
 {topic:'Payments & refunds',answer:'No real payments are processed yet, so there is nothing to refund. See the Payments hub for what is live and what is Coming soon.',href:'#/payments'},
 {topic:'Safety & abuse',answer:'Read the Community Guidelines and use in-app report controls where available. For emergencies contact local authorities.',href:'#/guidelines'},
 {topic:'Account & login',answer:'This early version does not provide verified human account recovery or password reset via Support.',href:'#/profile'}
]);

/** t354u: Help/FAQ search over the guides (topic + answer, case-insensitive). */
export function searchSupportGuides(q){const t=String(q||'').trim().toLowerCase();return t?SUPPORT_GUIDES.filter(g=>(g.topic+' '+g.answer).toLowerCase().includes(t)):SUPPORT_GUIDES.slice();}
export const SUPPORT_SECTIONS=Object.freeze([
 {id:'faq',title:'Help / FAQ search',href:'#/support?s=faq'},
 {id:'contact',title:'Contact support',href:'#/support?s=contact'},
 {id:'bug',title:'Report a problem / bug',href:'#/support?s=bug'},
 {id:'abuse',title:'Report abuse / safety',href:'#/guidelines'},
 {id:'payments',title:'Payments & refunds help',href:'#/payments'},
 {id:'account',title:'Account & login help',href:'#/support?s=account'},
 {id:'tickets',title:'My tickets',href:'#/support?s=tickets'},
]);
