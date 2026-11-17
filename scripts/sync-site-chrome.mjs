import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const departments=[['film','Film'],['solar','Solar Energy'],['music','Music'],['it','Information Technology (IT)']];
const relative=(file,target)=>path.relative(path.dirname(file),path.join(root,target)).replaceAll('\\','/');
export function footer(file){
 const href=target=>relative(file,target);
 return `<footer class="jp-footer">
<div class="jp-wrap jp-footer-grid">
<div><strong>St. John Paul II TVET Institute</strong><p>Providing specialized vocational training that empowers students with practical skills and Christian values to succeed in the modern technical world.</p></div>
<div><h2>Resources</h2><a href="${href('website/assets/pages/contact.html')}">Admissions</a><a href="${href('website/assets/pages/inquiries.html')}">Course inquiries</a><a href="${href('jpII-portal/index.html')}">Student portal</a><a href="${href('jpII-portal/careers.html')}">Careers</a></div>
<div><h2>Quick Links</h2>${departments.map(([slug,name])=>`<a href="${href('website/assets/pages/'+slug+'.html')}">Department of ${name}</a>`).join('\n')}</div>
<div><h2>Contact</h2><address>Cathedral Premises, Addis Ababa, Ethiopia<br><a href="tel:+251111234567">+251 11 123 4567</a><a href="mailto:admissions@jp2tvet.edu.et">admissions@jp2tvet.edu.et</a></address></div>
</div><div class="jp-wrap jp-footer-bottom">&copy; ${new Date().getFullYear()} St. John Paul II TVET Institute. All rights reserved.</div>
</footer>`;
}
const web=path.join(root,'website');
const files=[path.join(web,'index.html'),...fs.readdirSync(path.join(web,'assets/pages')).filter(n=>n.endsWith('.html')).map(n=>path.join(web,'assets/pages',n)),...fs.readdirSync(path.join(root,'jpII-portal')).filter(n=>n.endsWith('.html')).map(n=>path.join(root,'jpII-portal',n))];
for(const file of files){
 let html=fs.readFileSync(file,'utf8');
 if(file.startsWith(web))html=html.replace(/<nav class="jp-nav"[\s\S]*?<\/nav>/,nav=>nav.replace(/<a\b[^>]*>\s*(?:Portal|Careers)\s*<\/a>/g,''));
 html=html.replace(/<footer\b[\s\S]*?<\/footer>/,()=>footer(file));
 fs.writeFileSync(file,html);
}
console.log(`Synchronized footer and public navigation on ${files.length} pages.`);
