import fs from 'node:fs';
fs.mkdirSync('jpII-portal',{recursive:true});
const old='website/assets/pages/careers.html';
if(!fs.existsSync('jpII-portal/careers.html')){
 let html=fs.readFileSync(old,'utf8');
 html=html.replace(/(href|src)="([^"#:]+)"/g,(all,attr,url)=>{
  if(/^(https?:|mailto:|tel:)/.test(url))return all;
  if(url.startsWith('../../'))return `${attr}="../website/${url.slice(6)}"`;
  if(url.startsWith('../'))return `${attr}="../website/assets/${url.slice(3)}"`;
  return `${attr}="../website/assets/pages/${url.replace(/^\.\//,'')}"`;
 });
 html=html.replace(/<nav class="jp-nav"[\s\S]*?<\/nav>/,'<nav class="jp-nav" id="site-navigation" aria-label="Portal navigation"><a href="index.html">Student portal</a><a href="careers.html" aria-current="page">Careers</a><a href="../website/index.html">College website</a></nav>');
 fs.writeFileSync('jpII-portal/careers.html',html);
}
for(const [name,target] of [['portal','index'],['careers','careers']]){
 const destination=`../../../jpII-portal/${target}.html`;
 fs.writeFileSync(`website/assets/pages/${name}.html`,`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${destination}"><title>Moved to JPII Portal</title><link rel="stylesheet" href="../css/site.css"></head><body class="jp-body"><main id="main-content" class="jp-wrap jp-section"><h1>This page has moved</h1><p><a href="${destination}">Continue to ${name==='portal'?'the student portal':'Careers'} in JPII Portal</a>.</p></main><footer></footer></body></html>`);
}
