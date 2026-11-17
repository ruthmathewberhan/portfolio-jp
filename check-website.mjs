import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const base=path.resolve('website');
const portal=path.resolve('jpII-portal');
for(const directory of [path.join(base,'assets/pages'),portal]){
 if(!fs.existsSync(directory))throw new Error(`Missing build source directory: ${directory}. Ensure website and jpII-portal files are committed to this repository, not stored as unresolved Git submodules.`);
}
const files=[path.join(base,'index.html'),...fs.readdirSync(path.join(base,'assets/pages')).filter(n=>n.endsWith('.html')).map(n=>path.join(base,'assets/pages',n)),...fs.readdirSync(portal).filter(n=>n.endsWith('.html')).map(n=>path.join(portal,n))];
const decode=s=>s.replaceAll('&amp;','&');
let links=0;
for(const file of files){
 const text=fs.readFileSync(file,'utf8');
 assert(!text.includes('undefined'),`${file}: undefined content`);
 const redirect=text.includes('http-equiv="refresh"');
 if(!redirect)assert.equal((text.match(/class="jp-header"/g)||[]).length,1,`${file}: shared header`);
 const footer=text.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
 assert(footer?.includes('jp-footer-grid'),`${file}: shared footer`);
 assert(!footer.includes('Partnering with'),`${file}: removed partnership text`);
 assert(footer.includes('+251 11 123 4567')&&footer.includes('admissions@jp2tvet.edu.et')&&footer.includes('Cathedral Premises, Addis Ababa, Ethiopia'),`${file}: contact details`);
 if(file.startsWith(base)&&!redirect){const nav=text.match(/<nav class="jp-nav"[\s\S]*?<\/nav>/)[0];assert(!/>\s*(Portal|Careers)\s*<\/a>/.test(nav),`${file}: public navigation`);}
 assert.equal((text.match(/id="main-content"/g)||[]).length,1,`${file}: main target`);
 const ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`${file}: duplicate IDs`);
 for(const key of ['film','solar','music','it']) assert(text.includes(`${key}.html`),`${file}: department navigation`);
 for(const m of text.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=decode(m[1]);if(/^(https?:|mailto:|tel:|data:|#?$)/.test(url))continue;
  const [resource,fragment]=url.split('#');const target=resource?path.resolve(path.dirname(file),resource.split('?')[0]):file;
  assert(fs.existsSync(target),`${file}: missing ${url}`);
  if(fragment&&target.endsWith('.html'))assert(fs.readFileSync(target,'utf8').includes(`id="${fragment}"`),`${file}: missing anchor ${url}`);
  links++;
 }
}
for(const [key,count] of [['film',7],['solar',5],['music',6],['it',5]]){
 const text=fs.readFileSync(path.join(base,'assets/pages',key+'.html'),'utf8');
 assert.equal((text.match(/SHORT-TERM COURSE/g)||[]).length,count);
 assert.equal((text.match(/PATHWAY 0/g)||[]).length,3);
}
console.log(`PASS: ${files.length} pages, ${links} local links/assets, department courses, unique IDs, uniform footer/contact details, and public navigation.`);
