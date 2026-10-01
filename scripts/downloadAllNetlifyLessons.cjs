const fs = require('fs');
const path = require('path');

const LESSONS = [
  { id: "js-variabili", date: "2026-05-25", topic: "JS", folder: "javascript", title: "Variabili", file: "lezioni/js-variabili.html" },
  { id: "js-condizioni", date: "2026-05-28", topic: "JS", folder: "javascript", title: "Condizioni e operatori logici", file: "lezioni/js-condizioni.html" },
  { id: "js-cicli", date: "2026-05-30", topic: "JS", folder: "javascript", title: "Cicli, incrementi e scope", file: "lezioni/js-cicli.html" },
  { id: "js-funzioni", date: "2026-06-06", topic: "JS", folder: "javascript", title: "Funzioni", file: "lezioni/js-funzioni.html" },
  { id: "js-arrow-function", date: "2026-06-08", topic: "JS", folder: "javascript", title: "Arrow function e metodi degli array", file: "lezioni/js-arrow-function.html" },
  { id: "js-array", date: "2026-06-04", topic: "JS", folder: "javascript", title: "Array e operatori utili", file: "lezioni/js-array.html" },
  { id: "js-object", date: "2026-06-13", topic: "JS", folder: "javascript", title: "Oggetti", file: "lezioni/js-object.html" },
  { id: "js-timing-function", date: "2026-06-18", topic: "JS", folder: "javascript", title: "Timing functions", file: "lezioni/js-timing-function.html" },
  { id: "js-dom", date: "2026-06-11", topic: "JS", folder: "javascript", title: "DOM: testo, elementi, classi e attributi", file: "lezioni/js-dom.html" },
  { id: "js-dom-selector", date: "2026-06-13", topic: "JS", folder: "javascript", title: "Selezione del DOM ed eventi", file: "lezioni/js-dom-selector.html" },
  { id: "js-storage", date: "2026-06-18", topic: "JS", folder: "javascript", title: "LocalStorage", file: "lezioni/js-storage.html" },
  { id: "js-fetch", date: "2026-06-20", topic: "JS", folder: "javascript", title: "Richieste HTTP", file: "lezioni/js-fetch.html" },
  { id: "node-intro", date: "2026-06-29", topic: "Node", folder: "node", title: "Node e package manager", file: "lezioni/node-intro.html" },
  { id: "package-js", date: "2026-07-21", topic: "Node", folder: "node", title: "Package JavaScript e pnpm", file: "lezioni/package.html" },
  { id: "react-intro", date: "2026-07-02", topic: "React", folder: "react", title: "Introduzione a React", file: "lezioni/react-intro.html" },
  { id: "react-props", date: "2026-07-04", topic: "React", folder: "react", title: "Props", file: "lezioni/react-props.html" },
  { id: "react-use-state", date: "2026-07-04", topic: "React", folder: "react", title: "Eventi, hook e useState", file: "lezioni/react-use-state.html" },
  { id: "react-binding", date: "2026-07-06", topic: "React", folder: "react", title: "Data binding e gestione dei dati", file: "lezioni/react-binding.html" },
  { id: "react-form", date: "2026-07-09", topic: "React", folder: "react", title: "Form", file: "lezioni/react-form.html" },
  { id: "react-api", date: "2026-07-10", topic: "React", folder: "react", title: "API", file: "lezioni/react-api.html" },
  { id: "react-use-effect", date: "2026-07-13", topic: "React", folder: "react", title: "useEffect", file: "lezioni/react-use-effect.html" },
  { id: "react-router", date: "2026-07-16", topic: "React", folder: "react", title: "React Router", file: "lezioni/react-router.html" },
  { id: "react-context", date: "2026-07-17", topic: "React", folder: "react", title: "React Context", file: "lezioni/react-context.html" },
  { id: "skill-ai", date: "2026-07-23", topic: "AI", folder: "ai", title: "Creare skill per AI", file: "lezioni/skill.html" },
  { id: "mysql-intro", date: "2026-07-27", topic: "DB", folder: "sql", title: "MySQL e database relazionali", file: "lezioni/mysql-intro.html" },
  { id: "mysql-relazioni", date: "2026-07-29", topic: "DB", folder: "sql", title: "Relazioni tra tabelle con MySQL", file: "lezioni/mysql-relazioni.html" },
  { id: "mysql-crud", date: "2026-07-31", topic: "DB", folder: "sql", title: "CRUD e transazioni con MySQL", file: "lezioni/mysql-crud.html" },
  { id: "express-intro", date: "2026-09-07", topic: "Node", folder: "node", title: "Introduzione a Express", file: "lezioni/express-intro.html" },
  { id: "express-router", date: "2026-09-10", topic: "Node", folder: "node", title: "Routing e Router in Express", file: "lezioni/express-router.html" },
  { id: "express-middleware", date: "2026-09-12", topic: "Node", folder: "node", title: "Middleware in Express", file: "lezioni/express-middleware.html" },
  { id: "express-mysql", date: "2026-09-12", topic: "Node", folder: "node", title: "Express e MySQL: connessione e CRUD", file: "lezioni/express-mysql.html" },
  { id: "prisma-mysql-tabelle", date: "2026-09-14", topic: "Node", folder: "node", title: "Introduzione a Prisma: setup, MySQL e schema", file: "lezioni/prisma-mysql-tabelle.html" },
  { id: "prisma-tipi-annotazioni-relazioni", date: "2026-09-17", topic: "Node", folder: "node", title: "Scrivere uno schema Prisma: tipi, annotazioni e relazioni", file: "lezioni/prisma-tipi-annotazioni-relazioni.html" },
  { id: "express-prisma-blog", date: "2026-09-21", topic: "Node", folder: "node", title: "Prisma in Express: creazione record, select annidate e API di un blog con tag", file: "lezioni/express-prisma-blog.html" },
  { id: "langchain-prima-parte", date: "2026-09-24", topic: "AI", folder: "ai", title: "LangChain: modelli, storico della chat e primo agente", file: "lezioni/langchain-prima-parte.html" },
  { id: "langchain-seconda-parte", date: "2026-09-26", topic: "AI", folder: "ai", title: "LangChain: output strutturato, agenti multipli ed Express", file: "lezioni/langchain-seconda-parte.html" },
  { id: "express-react", date: "2026-09-28", topic: "Node", folder: "node", title: "Express e React: API in locale", file: "lezioni/express-react.html" },
  { id: "express-react-post", date: "2026-10-01", topic: "Node", folder: "node", title: "Express e React: gestire gli errori e inviare dati con POST", file: "lezioni/express-react-post.html" },
  { id: "express-ai-integration", date: "2026-10-02", topic: "Node", folder: "node", title: "Express e Mistral: integrazione AI", file: "lezioni/express-ai-integration.html" },
  { id: "express-prisma-relazioni", date: "2026-10-03", topic: "Node", folder: "node", title: "Express e Prisma: query e API REST dello store", file: "lezioni/express-prisma-relazioni.html" }
];

function cleanHtmlToText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSnippets(html) {
  const snippets = [];
  const regex = /<pre><code(?:\s+class="language-([^"]+)")?>([\s\S]*?)<\/code><\/pre>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const lang = m[1] || 'text';
    const code = m[2]
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    if (code.length > 10) {
      snippets.push({ lang, code });
    }
  }
  return snippets;
}

function extractSections(html) {
  const sections = [];
  const sectionRegex = /<section[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/gi;
  let sMatch;
  while ((sMatch = sectionRegex.exec(html)) !== null) {
    const secId = sMatch[1];
    const secContent = sMatch[2];
    const titleMatch = secContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const secTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : secId;
    const text = cleanHtmlToText(secContent);
    sections.push({ id: secId, title: secTitle, text });
  }
  return sections;
}

async function run() {
  const baseDir = path.resolve(__dirname, '..');
  const dispenseBase = path.join(baseDir, 'dispense');
  
  const results = [];

  for (const lesson of LESSONS) {
    const targetFolder = path.join(dispenseBase, lesson.folder);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const remoteUrl = `https://boolean-aiwd-1.netlify.app/${lesson.file}`;
    console.log(`Downloading [${lesson.topic}] ${lesson.title} (${remoteUrl})...`);
    
    try {
      const res = await fetch(remoteUrl);
      if (!res.ok) {
        console.warn(`Failed to fetch ${remoteUrl}: ${res.status}`);
        continue;
      }
      const html = await res.text();
      
      const fileNameHtml = path.basename(lesson.file);
      fs.writeFileSync(path.join(targetFolder, fileNameHtml), html, 'utf-8');

      const sections = extractSections(html);
      const snippets = extractSnippets(html);
      const fullText = cleanHtmlToText(html);

      results.push({
        id: lesson.id,
        date: lesson.date,
        topic: lesson.topic,
        folder: lesson.folder,
        title: lesson.title,
        file: lesson.file,
        htmlLength: html.length,
        sectionsCount: sections.length,
        snippetsCount: snippets.length,
        sections,
        snippets: snippets.slice(0, 5),
        summary: sections.length > 0 ? sections[0].text.slice(0, 300) + '...' : fullText.slice(0, 300) + '...'
      });

    } catch (err) {
      console.error(`Error processing ${lesson.file}:`, err.message);
    }
  }

  const scrapedJsonPath = path.join(__dirname, 'scraped_dispense.json');
  fs.writeFileSync(scrapedJsonPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\nSuccessfully downloaded and processed ${results.length} lessons.`);
  console.log(`Saved structured data to ${scrapedJsonPath}`);
}

run().catch(console.error);
