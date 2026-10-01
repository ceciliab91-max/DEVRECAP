import fs from 'node:fs';

function analyze(filePath, label) {
  if (!fs.existsSync(filePath)) {
    console.log(`File ${filePath} non trovato.`);
    return;
  }
  const report = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`\n==============================================`);
  console.log(`📊 LIGHTHOUSE SCORE: ${label.toUpperCase()}`);
  console.log(`==============================================`);
  const cats = report.categories;
  for (const key of Object.keys(cats)) {
    console.log(`  ${cats[key].title}: ${(cats[key].score * 100).toFixed(0)}%`);
  }

  console.log(`\n⚠️ AUDIT CHE NON HANNO RAGGIUNTO IL 100%:`);
  const audits = report.audits;
  for (const id of Object.keys(audits)) {
    const a = audits[id];
    if (a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'manual') {
      console.log(`  - [${id}] ${a.title} (Punteggio: ${((a.score || 0) * 100).toFixed(0)}%)`);
      if (a.displayValue) console.log(`      Valore: ${a.displayValue}`);
      if (a.explanation) console.log(`      Dettaglio: ${a.explanation}`);
    }
  }
}

analyze('./lighthouse-desktop.report.json', 'Desktop');
analyze('./lighthouse-mobile.report.json', 'Mobile');
