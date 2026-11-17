/* Illustrative learning areas, not an approved EOS catalog or student record. */
const topics={
 film:[['Develop a screen story','Prepare a short script with clear character goals.'],['Compose a camera shot','Plan framing, lighting, and sound for a short scene.'],['Edit a short sequence','Assemble footage to communicate a coherent story.']],
 solar:[['Identify system components','Explain the role of modules, controllers, batteries, and inverters.'],['Plan an installation','Review site information and a supervised installation workflow.'],['Inspect system performance','Document observations and identify issues for supervised review.']],
 music:[['Read musical notation','Interpret rhythm and pitch in a short score.'],['Develop instrumental technique','Practice a short piece with controlled timing and expression.'],['Apply harmony','Explore a chord progression through performance.']],
 it:[['Use digital tools','Organize files and create a clearly structured document.'],['Build a web interface','Create an accessible page with semantic HTML and responsive CSS.'],['Configure a small network','Document a supervised network setup and connectivity checks.']]
};
export function unitsFor(department){return (topics[department]||[]).map(([title,outcome],i)=>({title,outcome,status:['Competent','In progress','Not yet competent'][i],feedback:['Sample feedback: practical evidence meets the internal exercise criteria. This is not a national assessment result.','Sample feedback: complete the practical exercise and arrange a trainer review.','Sample feedback: review the practical steps, repeat the exercise with guidance, and present new evidence.'][i]}));}
export function validateActivity(entry){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(entry.date||''))return 'Enter a valid Gregorian activity date.';
 const parsed=new Date(entry.date+'T12:00:00Z');if(!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==entry.date)return 'Enter a valid Gregorian activity date.';
 if(!['enterprise','unit','activity'].every(key=>typeof entry[key]==='string'&&entry[key].trim()))return 'Complete the workplace, learning area, and activity notes.';
 const hours=Number(entry.hours);if(!Number.isFinite(hours)||hours<.25||hours>24||!Number.isInteger(hours*4))return 'Enter hours between 0.25 and 24 in quarter-hour increments.';
 return '';
}
export function logbookText(entries){return ['JPII COOPERATIVE TRAINING LOGBOOK — UNVERIFIED DRAFT','Dates: Gregorian. All entries require supervisor verification and college review.','',...entries.map((entry,i)=>`${i+1}. ${entry.date} | ${entry.department} | ${entry.enterprise}\nLearning area: ${entry.unit}\nHours: ${entry.hours}\n${entry.activity}\nStatus: Draft — not submitted or verified\n`)].join('\n');}
