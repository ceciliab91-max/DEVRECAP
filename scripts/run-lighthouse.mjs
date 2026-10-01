import { execSync } from 'node:child_process';
import fs from 'node:fs';

const targetMode = process.argv[2] || 'all';
const targetPort = process.argv[3] || '5173';
const baseUrl = `http://127.0.0.1:${targetPort}`;

function runSingleAudit(mode) {
  const isDesktop = mode === 'desktop';
  const htmlPath = isDesktop ? './lighthouse-desktop.report.html' : './lighthouse-mobile.report.html';
  const baseOutputPath = isDesktop ? './lighthouse-desktop' : './lighthouse-mobile';
  const flags = isDesktop 
    ? '--preset=desktop' 
    : '--formFactor=mobile --screenEmulation.mobile';

  console.log(`\n🔍 [Lighthouse] Avvio audit ${mode.toUpperCase()} su ${baseUrl}...`);

  try {
    execSync(
      `npx -y lighthouse ${baseUrl} ${flags} --chrome-flags="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage" --output=html,json --output-path=${baseOutputPath}`,
      { stdio: 'pipe' }
    );
  } catch {
    // Windows temp folder cleanup catch
  }

  const jsonPath = `${baseOutputPath}.report.json`;
  if (fs.existsSync(jsonPath)) {
    try {
      const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const scores = {
        performance: Math.round((report.categories.performance?.score ?? 0) * 100),
        accessibility: Math.round((report.categories.accessibility?.score ?? 0) * 100),
        bestPractices: Math.round((report.categories['best-practices']?.score ?? 0) * 100),
        seo: Math.round((report.categories.seo?.score ?? 0) * 100)
      };

      console.log(`\n=========================================`);
      console.log(`📊 RISULTATI LIGHTHOUSE - ${mode.toUpperCase()} (${targetPort === '4173' ? 'PROD BUILD' : 'DEV'})`);
      console.log(`=========================================`);
      console.log(`⚡ Performance:    ${scores.performance}/100`);
      console.log(`♿ Accessibilità:  ${scores.accessibility}/100`);
      console.log(`🛡️ Best Practices: ${scores.bestPractices}/100`);
      console.log(`🔎 SEO:            ${scores.seo}/100`);
      console.log(`📁 Report HTML:    ${htmlPath}`);
      console.log(`=========================================\n`);
      return scores;
    } catch {
      console.log(`✅ Report salvato in ${htmlPath}`);
    }
  } else if (fs.existsSync(htmlPath)) {
    console.log(`✅ Report salvato in ${htmlPath}`);
  }
}

if (targetMode === 'all') {
  runSingleAudit('mobile');
  runSingleAudit('desktop');
} else {
  runSingleAudit(targetMode);
}
