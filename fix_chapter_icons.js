// fix_chapter_icons.js
// Unify chapter card icons: ch7-ch10 should use same circled number style as ch1-ch6
// ch1=&#9312; (①) ch2=&#9313; (②) ... ch6=&#9317; (⑥)
// ch7 currently &#9455; (⑮) ch8 &#9456; (⑯) - these are also circled nums but different code range
// ch9 currently &#9744; (☐ - ballot box) - WRONG
// ch10 currently &#9654; (▶ - play button) - WRONG
//
// Fix: ch7=&#9318; (⑦) ch8=&#9319; (⑧) ch9=&#9320; (⑨) ch10=&#9321; (⑩)
// Wait, &#9312; is ① which is Unicode U+2460 (decimal 9312)
// So ch7 = 9312 + 6 = 9318 = ⑦ (U+2466)
// ch8 = 9319 = ⑧ (U+2467)
// ch9 = 9320 = ⑨ (U+2468)
// ch10 = 9321 = ⑩ (U+2469)

const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

// Find renderPracticePage function
const pracIdx = content.indexOf('function renderPracticePage');
if (pracIdx === -1) {
  console.error('ERROR: renderPracticePage not found');
  process.exit(1);
}

const afterPrac = content.substring(pracIdx);
let depth = 0;
let startBrace = -1;
let endBrace = -1;
for (let i = 0; i < afterPrac.length; i++) {
  if (afterPrac[i] === '{') { depth++; if (startBrace === -1) startBrace = i; }
  if (afterPrac[i] === '}') {
    depth--;
    if (startBrace > -1 && depth === 0) { endBrace = i; break; }
  }
}

const pracFunc = afterPrac.substring(0, endBrace + 1);
console.log('renderPracticePage length:', pracFunc.length);

// Current ch7 icon: &#9455; (⑮) - should be &#9318; (⑦)
// Current ch8 icon: &#9456; (⑯) - should be &#9319; (⑧)
// Current ch9 icon: &#9744; (☐) - should be &#9320; (⑨)
// Current ch10 icon: &#9654; (▶) - should be &#9321; (⑩)

// We need to be precise. Find each chapter's icon within the practice page and replace.
// Let's find unique context for each.

// Ch7: look for "Chapter 7: Analyzing Arguments" and find icon before it
const ch7TitleIdx = pracFunc.indexOf('Chapter 7: Analyzing Arguments');
const ch7IconSearch = pracFunc.substring(0, ch7TitleIdx);
const ch7LastIcon = ch7IconSearch.lastIndexOf('learning-card-icon">');
if (ch7LastIcon > 0) {
  const iconStart = ch7LastIcon + 'learning-card-icon">'.length;
  const iconEnd = ch7IconSearch.indexOf('<', iconStart);
  const oldIcon = ch7IconSearch.substring(iconStart, iconEnd);
  console.log('Ch7 old icon:', oldIcon);
  // Replace in full content
  const fullCh7IconPos = pracIdx + iconStart;
  const fullCh7IconEnd = pracIdx + iconEnd;
  content = content.substring(0, fullCh7IconPos) + '&#9318;' + content.substring(fullCh7IconEnd);
  console.log('Ch7: replaced with &#9318; (⑦)');
}

// Recompute pracFunc after first replacement (offsets changed - but actually let's be smarter)
// Let's redo the search on updated content
const content2 = content;
const pracIdx2 = content2.indexOf('function renderPracticePage');
const afterPrac2 = content2.substring(pracIdx2);
let depth2 = 0;
let startBrace2 = -1;
let endBrace2 = -1;
for (let i = 0; i < afterPrac2.length; i++) {
  if (afterPrac2[i] === '{') { depth2++; if (startBrace2 === -1) startBrace2 = i; }
  if (afterPrac2[i] === '}') {
    depth2--;
    if (startBrace2 > -1 && depth2 === 0) { endBrace2 = i; break; }
  }
}
const pracFunc2 = afterPrac2.substring(0, endBrace2 + 1);

// Ch8
const ch8TitleIdx = pracFunc2.indexOf('Chapter 8: Inductive Reasoning');
const ch8IconSearch = pracFunc2.substring(0, ch8TitleIdx);
const ch8LastIcon = ch8IconSearch.lastIndexOf('learning-card-icon">');
if (ch8LastIcon > 0) {
  const iconStart = ch8LastIcon + 'learning-card-icon">'.length;
  const iconEnd = ch8IconSearch.indexOf('<', iconStart);
  const oldIcon = ch8IconSearch.substring(iconStart, iconEnd);
  console.log('Ch8 old icon:', oldIcon);
  const fullIconPos = pracIdx2 + iconStart;
  const fullIconEnd = pracIdx2 + iconEnd;
  content = content2.substring(0, fullIconPos) + '&#9319;' + content2.substring(fullIconEnd);
  console.log('Ch8: replaced with &#9319; (⑧)');
}

// Ch9
const content3 = content;
const pracIdx3 = content3.indexOf('function renderPracticePage');
const afterPrac3 = content3.substring(pracIdx3);
let depth3 = 0;
let startBrace3 = -1;
let endBrace3 = -1;
for (let i = 0; i < afterPrac3.length; i++) {
  if (afterPrac3[i] === '{') { depth3++; if (startBrace3 === -1) startBrace3 = i; }
  if (afterPrac3[i] === '}') {
    depth3--;
    if (startBrace3 > -1 && depth3 === 0) { endBrace3 = i; break; }
  }
}
const pracFunc3 = afterPrac3.substring(0, endBrace3 + 1);

const ch9TitleIdx = pracFunc3.indexOf('Chapter 9: Categorical Logic');
const ch9IconSearch = pracFunc3.substring(0, ch9TitleIdx);
const ch9LastIcon = ch9IconSearch.lastIndexOf('learning-card-icon">');
if (ch9LastIcon > 0) {
  const iconStart = ch9LastIcon + 'learning-card-icon">'.length;
  const iconEnd = ch9IconSearch.indexOf('<', iconStart);
  const oldIcon = ch9IconSearch.substring(iconStart, iconEnd);
  console.log('Ch9 old icon:', oldIcon);
  const fullIconPos = pracIdx3 + iconStart;
  const fullIconEnd = pracIdx3 + iconEnd;
  content = content3.substring(0, fullIconPos) + '&#9320;' + content3.substring(fullIconEnd);
  console.log('Ch9: replaced with &#9320; (⑨)');
}

// Ch10
const content4 = content;
const pracIdx4 = content4.indexOf('function renderPracticePage');
const afterPrac4 = content4.substring(pracIdx4);
let depth4 = 0;
let startBrace4 = -1;
let endBrace4 = -1;
for (let i = 0; i < afterPrac4.length; i++) {
  if (afterPrac4[i] === '{') { depth4++; if (startBrace4 === -1) startBrace4 = i; }
  if (afterPrac4[i] === '}') {
    depth4--;
    if (startBrace4 > -1 && depth4 === 0) { endBrace4 = i; break; }
  }
}
const pracFunc4 = afterPrac4.substring(0, endBrace4 + 1);

const ch10TitleIdx = pracFunc4.indexOf('Chapter 10: Propositional Logic');
const ch10IconSearch = pracFunc4.substring(0, ch10TitleIdx);
const ch10LastIcon = ch10IconSearch.lastIndexOf('learning-card-icon">');
if (ch10LastIcon > 0) {
  const iconStart = ch10LastIcon + 'learning-card-icon">'.length;
  const iconEnd = ch10IconSearch.indexOf('<', iconStart);
  const oldIcon = ch10IconSearch.substring(iconStart, iconEnd);
  console.log('Ch10 old icon:', oldIcon);
  const fullIconPos = pracIdx4 + iconStart;
  const fullIconEnd = pracIdx4 + iconEnd;
  content = content4.substring(0, fullIconPos) + '&#9321;' + content4.substring(fullIconEnd);
  console.log('Ch10: replaced with &#9321; (⑩)');
}

// Write back
fs.writeFileSync(appJsPath, content, 'utf8');

// Verify
const verifyContent = fs.readFileSync(appJsPath, 'utf8');

// Syntax check
try {
  new Function(verifyContent);
  console.log('\nJS syntax: PASSED');
} catch (e) {
  console.log('\nJS syntax: FAILED -', e.message);
  process.exit(1);
}

// Verify icons
const verifyPracIdx = verifyContent.indexOf('function renderPracticePage');
const verifyAfterPrac = verifyContent.substring(verifyPracIdx);
let vDepth = 0;
let vStart = -1;
let vEnd = -1;
for (let i = 0; i < verifyAfterPrac.length; i++) {
  if (verifyAfterPrac[i] === '{') { vDepth++; if (vStart === -1) vStart = i; }
  if (verifyAfterPrac[i] === '}') {
    vDepth--;
    if (vStart > -1 && vDepth === 0) { vEnd = i; break; }
  }
}
const vPracFunc = verifyAfterPrac.substring(0, vEnd + 1);

// Count circled number icons (9312-9321 range)
let iconCount = 0;
for (let i = 9312; i <= 9321; i++) {
  if (vPracFunc.includes('&#' + i + ';')) iconCount++;
}
console.log('Circled number icons in practice page:', iconCount);

// Check for non-circled icons that should NOT be there
const wrongIcons = ['&#9744;', '&#9654;', '&#9455;', '&#9456;'];
console.log('Wrong icons remaining:');
for (const w of wrongIcons) {
  const count = verifyContent.split(w).length - 1;
  console.log('  ' + w + ': ' + count + ' occurrences');
}
