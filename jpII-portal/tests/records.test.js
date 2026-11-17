import {test} from 'node:test';
import assert from 'node:assert/strict';
import {unitsFor,validateActivity,logbookText} from '../assets/records.js';
const entry={date:'2026-11-18',enterprise:'Example workplace',unit:'Practice',hours:'2.5',activity:'Supervised activity',department:'IT'};
test('activity rejects impossible dates, empty notes, and invalid hour values',()=>{
 assert.equal(validateActivity(entry),'');
 for(const change of [{date:'2026-02-30'},{activity:' '},{hours:'0'},{hours:'25'},{hours:'0.3'},{hours:'NaN'}])assert.notEqual(validateActivity({...entry,...change}),'');
});
test('export preserves activities as explicitly unverified drafts',()=>{
 const output=logbookText([entry]);assert.match(output,/UNVERIFIED DRAFT/);assert.match(output,/not submitted or verified/);assert.match(output,/2.5/);assert.match(output,/Example workplace/);
});
test('each department has isolated sample progress and feedback',()=>{
 for(const key of ['film','solar','music','it']){const units=unitsFor(key);assert.equal(units.length,3);assert(units.every(u=>u.feedback.startsWith('Sample feedback:')));assert.equal(units.filter(u=>u.status==='Competent').length,1);}
 assert.deepEqual(unitsFor('unknown'),[]);
 const changed=unitsFor('it');changed[0].status='Changed';assert.equal(unitsFor('it')[0].status,'Competent');
});
