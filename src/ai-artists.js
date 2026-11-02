// PIKK AI Artists early access. Local drafts are not published, sold or charged.
export const AI_ARTIST_KEY='pikk_ai_artists_local_drafts_v1';
export const AI_CREATION_TYPES=Object.freeze(['Fully AI-generated music','AI-assisted music with human performance','Human-made music with AI artwork only']);
export const AI_DISCLOSURE='AI-generated or AI-assisted';
export function validateAIArtistDraft(input,now=Date.now()){
 const artist=String(input.artist||'').trim().slice(0,80);
 const track=String(input.track||'').trim().slice(0,120);
 const creation=String(input.creation||'');
 const description=String(input.description||'').trim().slice(0,600);
 const price=Number(input.price);
 if(!artist||!track||!AI_CREATION_TYPES.includes(creation)||!input.confirmed)throw Error('Artist, title, creation type and honest AI disclosure are required.');
 if(!Number.isFinite(price)||price<0||price>100)throw Error('Preview price must be between $0 and $100.');
 return {id:'ai-draft-'+now+'-'+Math.random().toString(36).slice(2,8),artist,track,creation,description,price,createdAt:now,status:'Private local draft · not published',disclosure:AI_DISCLOSURE};
}
export function readAIArtistDrafts(storage){
 try{const a=JSON.parse(storage.getItem(AI_ARTIST_KEY)||'[]');return Array.isArray(a)?a.filter(x=>x&&typeof x.id==='string').slice(0,40):[]}catch{return []}
}
export function saveAIArtistDraft(storage,item){const list=[item,...readAIArtistDrafts(storage)].slice(0,40);storage.setItem(AI_ARTIST_KEY,JSON.stringify(list));return list}
export function removeAIArtistDraft(storage,id){const list=readAIArtistDrafts(storage).filter(x=>x.id!==id);storage.setItem(AI_ARTIST_KEY,JSON.stringify(list));return list}
