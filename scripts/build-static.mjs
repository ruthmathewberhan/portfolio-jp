import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=path.resolve(import.meta.dirname,'..');
const output=path.join(root,'dist');
// Only the generated deployment directory is replaced, never either source tree.
assert.equal(path.dirname(output),root);
assert.equal(path.basename(output),'dist');
if(fs.existsSync(output)) {
  assert(!fs.lstatSync(output).isSymbolicLink(),'dist must not be a symbolic link');
  fs.rmSync(output,{recursive:true});
}
fs.mkdirSync(output);
const allowed=new Set(['.html','.css','.js','.png','.jpg','.jpeg','.webp','.gif','.svg','.ico','.woff','.woff2','.pdf']);
function copy(source,destination){
  fs.mkdirSync(destination,{recursive:true});
  for(const item of fs.readdirSync(source,{withFileTypes:true})){
    if(item.name==='tests'||item.name.startsWith('.'))continue;
    const from=path.join(source,item.name),to=path.join(destination,item.name);
    if(item.isDirectory())copy(from,to);
    else if(item.isFile()&&allowed.has(path.extname(item.name)))fs.copyFileSync(from,to);
  }
}
for(const directory of ['website','jpII-portal'])copy(path.join(root,directory),path.join(output,directory));

// The canonical source keeps its directory-relative links for local editing.
// At the deployment root, resolve those links against the original homepage.
const homepage=fs.readFileSync(path.join(root,'website/index.html'),'utf8').replace(
  /\b(href|src)="([^"\n]+)"/g,
  (attribute,name,value)=>{
    if(/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(value))return attribute;
    const url=new URL(value,'https://build.invalid/website/index.html');
    return `${name}="${url.pathname}${url.search}${url.hash}"`;
  }
);
fs.writeFileSync(path.join(output,'index.html'),homepage);

let pageCount=0,linkCount=0;
function verify(directory){
  for(const item of fs.readdirSync(directory,{withFileTypes:true})){
    const file=path.join(directory,item.name);
    if(item.isDirectory()){verify(file);continue;}
    if(!file.endsWith('.html'))continue;
    pageCount++;
    const html=fs.readFileSync(file,'utf8');
    const base='https://build.invalid/'+path.relative(output,file).replaceAll('\\','/');
    for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
      const url=new URL(match[1].replaceAll('&amp;','&'),base);
      if(url.origin!=='https://build.invalid')continue;
      let target=path.join(output,decodeURIComponent(url.pathname));
      if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
      assert(fs.existsSync(target),`Broken deployed link: ${file} → ${url.pathname}`);
      linkCount++;
    }
  }
}
verify(output);
for(const file of ['index.html','website/index.html','jpII-portal/index.html','jpII-portal/assets/portal.js','jpII-portal/assets/records.js'])assert(fs.existsSync(path.join(output,file)),`Missing ${file}`);
assert(!fs.existsSync(path.join(output,'jpII-portal/package.json')));
console.log(`Deployment ready: ${pageCount} HTML pages and ${linkCount} local links verified in dist/.`);
