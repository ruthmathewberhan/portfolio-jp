import { unitsFor, validateActivity, logbookText } from './records.js';
const department=document.querySelector('#department');
const search=document.querySelector('#unit-search');
const filter=document.querySelector('#unit-filter');
const units=document.querySelector('#units');
function el(tag,text,className){const node=document.createElement(tag);if(text)node.textContent=text;if(className)node.className=className;return node;}
function renderUnits(){
 const all=unitsFor(department.value);
 const visible=all.filter(u=>(filter.value==='all'||u.status===filter.value)&&u.title.toLowerCase().includes(search.value.trim().toLowerCase()));
 document.querySelector('#pathway-name').textContent=department.selectedOptions[0].textContent;
 document.querySelector('#unit-progress').textContent=`${all.filter(u=>u.status==='Competent').length} / ${all.length} sample units`;
 document.querySelector('#unit-count').textContent=`${visible.length} sample learning areas shown`;
 units.replaceChildren(...visible.map(u=>{
  const card=el('article',null,'portal-card');card.append(el('span',u.status,'jp-badge'),el('h3',u.title),el('p',u.outcome));
  const details=el('details');details.append(el('summary','Practice & feedback'),el('p',u.feedback));card.append(details);return card;
 }));
 if(!visible.length)units.append(el('p','No learning areas match your filters.'));
}
department.addEventListener('change',()=>{search.value='';filter.value='all';renderUnits();});
search.addEventListener('input',renderUnits);filter.addEventListener('change',renderUnits);renderUnits();
const date=new Date();
const dateOptions={year:'numeric',month:'long',day:'numeric',timeZone:'Africa/Addis_Ababa'};
const gregorian=new Intl.DateTimeFormat('en-GB',dateOptions).format(date);
let ethiopian='';try{ethiopian=new Intl.DateTimeFormat('am-ET-u-ca-ethiopic',dateOptions).format(date);}catch{}
document.querySelector('#portal-date').textContent=`${gregorian} GC${ethiopian?' · '+ethiopian+' EC':''} · Addis Ababa`;
function download(text,name){const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=el('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
let activities=[];
const logForm=document.querySelector('#log-form');
const logStatus=document.querySelector('#log-status');
function renderLog(){
 const list=document.querySelector('#log-list');
 list.replaceChildren(...activities.map((entry,index)=>{
  const item=el('article',null,'portal-log-entry');item.append(el('strong',`${entry.date} · ${entry.hours} hours · ${entry.unit}`),el('p',`${entry.enterprise}\n${entry.activity}`),el('span','Draft · supervisor verification pending','jp-badge'));
  const remove=el('button','Remove draft');remove.type='button';remove.setAttribute('aria-label',`Remove draft activity ${index+1}`);remove.addEventListener('click',()=>{activities.splice(index,1);renderLog();logStatus.textContent='Draft removed.';document.querySelector('#log-form input').focus();});item.append(remove);return item;
 }));
 if(!activities.length)list.append(el('p','No activities drafted yet.'));
 document.querySelector('#download-log').disabled=!activities.length;
}
logForm.addEventListener('submit',event=>{
 event.preventDefault();const entry=Object.fromEntries(new FormData(logForm));const error=validateActivity(entry);
 if(error){logStatus.textContent=error;return;}
 activities.push({...entry,department:department.selectedOptions[0].textContent});renderLog();logForm.reset();logStatus.textContent='Activity added to this tab’s draft logbook. Download it before closing this tab. Nothing has been submitted.';
});
document.querySelector('#download-log').addEventListener('click',()=>{download(logbookText(activities),'jpii-logbook-draft.txt');logStatus.textContent='Draft downloaded. Supervisor verification and college review are still required.';});
document.querySelector('#request-form').addEventListener('submit',event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form));
 download(['JPII STUDENT SERVICE REQUEST — DRAFT',`Department: ${department.selectedOptions[0].textContent}`,`Service: ${data.type}`,`Occupation / level: ${data.qualification||'Not assigned'}`,'',data.summary,'','Not submitted. Send this draft through the college’s approved service channel.'].join('\n'),'jpii-service-request-draft.txt');
 document.querySelector('#request-status').textContent='Request draft downloaded. No request has been submitted to the college.';
});
function markSection(){const hash=location.hash||'#overview';document.querySelectorAll('.portal-sidebar a').forEach(a=>{if(a.hash===hash)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
window.addEventListener('hashchange',markSection);markSection();
