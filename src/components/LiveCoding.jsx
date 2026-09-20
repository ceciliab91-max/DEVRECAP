import React, { useState, useEffect } from 'react';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  HelpCircle,
  Award,
  Terminal,
  Bot,
  Loader2,
  BookOpen
} from 'lucide-react';
import { hasValidApiKey, evaluateCodeWithAi } from '../services/aiService';
import MissingApiKeyModal from './MissingApiKeyModal';

export const challengesData = [
  // --- CSS CHALLENGES (4) ---
  {
    id: "css-1",
    subject: "CSS",
    title: "1. Navbar Orizzontale (Flexbox)",
    pdfReference: "Flexbox Dispensa — Pag. 2",
    description: "Trasforma la lista di link in una barra di navigazione orizzontale con 12px di spazio tra loro usando Flexbox.",
    htmlTemplate: `<nav class="navbar">
  <a href="#">Home</a>
  <a href="#">Prodotti</a>
  <a href="#">Blog</a>
  <a href="#">Contatti</a>
</nav>`,
    initialCode: `.navbar {
  /* Scrivi il tuo CSS qui */

}`,
    officialSolution: `.navbar {
  display: flex;
  gap: 12px;
}`,
    checkRules: [
      { name: "Attiva Flexbox", regex: /display\s*:\s*flex/i },
      { name: "Imposta gap a 12px", regex: /gap\s*:\s*12px/i }
    ],
    hint: "Usa `display: flex;` sul contenitore `.navbar` e imposta la distanza tra i link con `gap: 12px;`."
  },
  {
    id: "css-2",
    subject: "CSS",
    title: "2. Badge 'NUOVO' Absolute su Card Relative",
    pdfReference: "Dispensa CSS — Pag. 13",
    description: "Posiziona il badge nell'angolo in alto a destra della card prodotto senza farlo uscire dai bordi della card.",
    htmlTemplate: `<div class="card">
  <h3>Prodotto Premium</h3>
  <p>Descrizione del prodotto.</p>
  <span class="badge-nuovo">NUOVO</span>
</div>`,
    initialCode: `.card {
  /* Contenitore relativo */

}

.badge-nuovo {
  /* Posizionamento assoluto */

}`,
    officialSolution: `.card {
  position: relative;
}

.badge-nuovo {
  position: absolute;
  top: 10px;
  right: 10px;
}`,
    checkRules: [
      { name: "Card ha position: relative", regex: /\.card[\s\S]*?position\s*:\s*relative/i },
      { name: "Badge ha position: absolute", regex: /\.badge-nuovo[\s\S]*?position\s*:\s*absolute/i }
    ],
    hint: "Imposta `position: relative` sulla `.card` e `position: absolute; top: 10px; right: 10px;` sul `.badge-nuovo`."
  },
  {
    id: "css-3",
    subject: "CSS",
    title: "3. Griglia Responsiva con Auto-fit",
    pdfReference: "Dispensa CSS — CSS Grid",
    description: "Crea una griglia responsiva con `display: grid` in cui le colonne si ridimensionano automaticamente fino ad un minimo di 200px.",
    htmlTemplate: `<div class="grid-container">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>`,
    initialCode: `.grid-container {
  /* Scrivi la regola CSS Grid qui */

}`,
    officialSolution: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}`,
    checkRules: [
      { name: "Attiva CSS Grid", regex: /display\s*:\s*grid/i },
      { name: "Utilizza repeat e minmax", regex: /repeat\s*\(\s*auto-fit\s*,\s*minmax\s*\(\s*200px/i }
    ],
    hint: "Usa `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));` per colonne fluide."
  },
  {
    id: "css-4",
    subject: "CSS",
    title: "4. Righe Alternate Tabella con :nth-child",
    pdfReference: "Dispensa CSS — Pseudo-classi",
    description: "Applica uno sfondo grigio chiaro `#f8fafc` a tutte le righe PARI della tabella usando la pseudo-classe `:nth-child`.",
    htmlTemplate: `<table>
  <tr><td>Riga 1</td></tr>
  <tr><td>Riga 2</td></tr>
  <tr><td>Riga 3</td></tr>
  <tr><td>Riga 4</td></tr>
</table>`,
    initialCode: `tr:nth-child(...) {
  background-color: #f8fafc;
}`,
    officialSolution: `tr:nth-child(2n) {
  background-color: #f8fafc;
}`,
    checkRules: [
      { name: "Usa formula pari :nth-child(2n) o (even)", regex: /tr\s*:\s*nth-child\s*\(\s*(2n|even)\s*\)/i }
    ],
    hint: "Usa `tr:nth-child(2n)` oppure `tr:nth-child(even)` per selezionare le righe pari."
  },

  // --- JAVASCRIPT CHALLENGES (4) ---
  {
    id: "js-1",
    subject: "JavaScript",
    title: "5. Filtra Maggiorenni con Array .filter()",
    pdfReference: "JavaScript Dispensa — Metodi Array",
    description: "Scrivi una funzione `getMaggiorenni(utenti)` che accetta un array di oggetti e restituisce solo gli utenti con `eta >= 18`.",
    htmlTemplate: `<div id="output">Esegui lo script per vedere il risultato...</div>`,
    initialCode: `function getMaggiorenni(utenti) {
  // Utilizza il metodo .filter()
  return utenti.filter(u => u.eta >= 18);
}`,
    officialSolution: `function getMaggiorenni(utenti) {
  return utenti.filter(u => u.eta >= 18);
}`,
    checkRules: [
      { name: "Utilizza .filter()", regex: /\.filter\s*\(/i },
      { name: "Verifica condizione >= 18", regex: /eta\s*>=\s*18/i }
    ],
    hint: "Usa `utenti.filter(utente => utente.eta >= 18)` per restituire un nuovo array di maggiorenni."
  },
  {
    id: "js-2",
    subject: "JavaScript",
    title: "6. Salvataggio Oggetto in LocalStorage",
    pdfReference: "JavaScript Dispensa — LocalStorage",
    description: "Scrivi la funzione `salvaProfilo(utente)` che converte l'oggetto in stringa JSON e lo memorizza in `localStorage` sotto la chiave 'profilo_dev'.",
    htmlTemplate: `<button id="btn-save">Salva in LocalStorage</button>`,
    initialCode: `function salvaProfilo(utente) {
  // Converti in JSON e salva con setItem
  
}`,
    officialSolution: `function salvaProfilo(utente) {
  const jsonString = JSON.stringify(utente);
  localStorage.setItem('profilo_dev', jsonString);
}`,
    checkRules: [
      { name: "Utilizza JSON.stringify", regex: /JSON\.stringify/i },
      { name: "Utilizza localStorage.setItem", regex: /localStorage\.setItem\s*\(/i }
    ],
    hint: "Usa `JSON.stringify(utente)` per serializzare l'oggetto e `localStorage.setItem('profilo_dev', stringa)` per la persistenza."
  },
  {
    id: "js-3",
    subject: "JavaScript",
    title: "7. Calcolo Totale Carrello con .reduce()",
    pdfReference: "JavaScript Dispensa — Metodi Avanzati Array",
    description: "Scrivi una funzione `calcolaTotale(prodotti)` che calcola la somma del campo `prezzo` di tutti i prodotti nell'array usando `.reduce()`.",
    htmlTemplate: `<div>Carrello Prodotti</div>`,
    initialCode: `function calcolaTotale(prodotti) {
  // Usa .reduce() partendo da 0
  return prodotti.reduce((acc, p) => acc + p.prezzo, 0);
}`,
    officialSolution: `function calcolaTotale(prodotti) {
  return prodotti.reduce((acc, p) => acc + p.prezzo, 0);
}`,
    checkRules: [
      { name: "Utilizza .reduce()", regex: /\.reduce\s*\(/i },
      { name: "Inizializza accumulatore a 0", regex: /,\s*0\s*\)/i }
    ],
    hint: "Usa `prodotti.reduce((acc, p) => acc + p.prezzo, 0)` per sommare i prezzi degli articoli."
  },
  {
    id: "js-4",
    subject: "JavaScript",
    title: "8. Toggle Classe DOM su Click Event",
    pdfReference: "JavaScript Dispensa — DOM ed Eventi",
    description: "Aggiungi un event listener `click` al bottone `#btn-theme` per alternare la classe CSS `dark-mode` sull'elemento `#main-box`.",
    htmlTemplate: `<button id="btn-theme">Cambia Tema</button>
<div id="main-box">Box Contenuto</div>`,
    initialCode: `const btn = document.querySelector('#btn-theme');
const box = document.querySelector('#main-box');

btn.addEventListener('click', () => {
  // Esegui il toggle della classe dark-mode
});`,
    officialSolution: `btn.addEventListener('click', () => {
  box.classList.toggle('dark-mode');
});`,
    checkRules: [
      { name: "Ascolta evento click", regex: /addEventListener\s*\(\s*['"]click['"]/i },
      { name: "Usa classList.toggle", regex: /classList\.toggle\s*\(\s*['"]dark-mode['"]\s*\)/i }
    ],
    hint: "Usa `box.classList.toggle('dark-mode')` all'interno dell'handler di click."
  },

  // --- REACT CHALLENGES (4) ---
  {
    id: "react-1",
    subject: "React",
    title: "9. Form Controllato con useState",
    pdfReference: "React Dispensa — Form e useState",
    description: "Crea il gestore di invio `handleSubmit` che blocca il refresh della pagina con `preventDefault()` ed azzera lo stato `email`.",
    htmlTemplate: `<div id="react-root">Form Controllato React</div>`,
    initialCode: `function LoginForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    // Blocca il refresh e pulisci lo stato
    e.preventDefault();
    setEmail('');
  };
}`,
    officialSolution: `const handleSubmit = (e) => {
  e.preventDefault();
  setEmail('');
};`,
    checkRules: [
      { name: "Chiama e.preventDefault()", regex: /e\.preventDefault\s*\(\s*\)/i },
      { name: "Azzera lo stato email", regex: /setEmail\s*\(\s*['"]['"]\s*\)/i }
    ],
    hint: "Chiamare `e.preventDefault()` previene il ricaricamento automatico della pagina nei form HTML."
  },
  {
    id: "react-2",
    subject: "React",
    title: "10. Render Elenco con Key Prop",
    pdfReference: "React Dispensa — Liste e Keys",
    description: "Completa la funzione `ListaProdotti` renderizzando la lista con `.map()` assegnando la prop `key={prod.id}`.",
    htmlTemplate: `<ul><!-- Elementi renderizzati --></ul>`,
    initialCode: `function ListaProdotti({ prodotti }) {
  return (
    <ul>
      {prodotti.map(prod => (
        <li key={prod.id}>{prod.nome} - €{prod.prezzo}</li>
      ))}
    </ul>
  );
}`,
    officialSolution: `return (
  <ul>
    {prodotti.map(prod => (
      <li key={prod.id}>{prod.nome}</li>
    ))}
  </ul>
);`,
    checkRules: [
      { name: "Utilizza .map()", regex: /\.map\s*\(/i },
      { name: "Assegna la prop key", regex: /key\s*=\s*\{/i }
    ],
    hint: "Assicurati di passare la prop unica `key={prod.id}` a ciascun elemento `<li>` per la riconciliazione del Virtual DOM."
  },
  {
    id: "react-3",
    subject: "React",
    title: "11. useEffect con Cleanup Function",
    pdfReference: "React Dispensa — useEffect",
    description: "Scrivi un `useEffect` che ascolta l'evento `resize` su `window` e restituisce una funzione di cleanup che rimuove l'event listener.",
    htmlTemplate: `<div>Dimensioni Finestra Component</div>`,
    initialCode: `useEffect(() => {
  const handleResize = () => console.log("Resize");
  window.addEventListener('resize', handleResize);

  return () => {
    // Rimuovi l'event listener qui
  };
}, []);`,
    officialSolution: `useEffect(() => {
  const handleResize = () => console.log("Resize");
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`,
    checkRules: [
      { name: "Aggiunge addEventListener", regex: /window\.addEventListener\s*\(\s*['"]resize['"]/i },
      { name: "Restituisce cleanup con removeEventListener", regex: /window\.removeEventListener\s*\(\s*['"]resize['"]/i }
    ],
    hint: "Usa `window.removeEventListener('resize', handleResize)` all'interno del blocco return della funzione `useEffect`."
  },
  {
    id: "react-4",
    subject: "React",
    title: "12. Aggiornamento Funzionale dello Stato",
    pdfReference: "React Dispensa — useState Avanzato",
    description: "Scrivi la funzione `incrementa` usando la forma con callback `setCount(prev => prev + 1)` per evitare problemi di stato stale.",
    htmlTemplate: `<button>Incrementa</button>`,
    initialCode: `const [count, setCount] = useState(0);

const incrementa = () => {
  // Usa l'aggiornamento funzionale prev => ...
  setCount(prev => prev + 1);
};`,
    officialSolution: `const incrementa = () => {
  setCount(prev => prev + 1);
};`,
    checkRules: [
      { name: "Usa callback prev => ...", regex: /setCount\s*\(\s*[\w]+\s*=>/i }
    ],
    hint: "La forma `setCount(prev => prev + 1)` assicura di lavorare con il valore pendente aggiornato."
  },

  // --- SQL CHALLENGES (4) ---
  {
    id: "sql-1",
    subject: "SQL",
    title: "13. Query SELECT con WHERE ed ORDER BY",
    pdfReference: "SQL Dispensa — CRUD Queries",
    description: "Scrivi la query SQL per selezionare `nome` e `prezzo` dalla tabella `prodotti` per tutti gli articoli con `prezzo >= 50`, ordinati dal più caro al più economico.",
    htmlTemplate: `<div class="db-query">Tabella prodotti (id, nome, prezzo)</div>`,
    initialCode: `-- Scrivi la query SQL qui:
SELECT nome, prezzo FROM prodotti
WHERE prezzo >= 50
ORDER BY prezzo DESC;`,
    officialSolution: `SELECT nome, prezzo FROM prodotti
WHERE prezzo >= 50
ORDER BY prezzo DESC;`,
    checkRules: [
      { name: "Seleziona nome e prezzo", regex: /SELECT\s+nome\s*,\s*prezzo/i },
      { name: "Filtra prezzo >= 50", regex: /WHERE\s+prezzo\s*>=\s*50/i },
      { name: "Ordina DESC", regex: /ORDER\s+BY\s+prezzo\s+DESC/i }
    ],
    hint: "La sintassi corretta è `SELECT nome, prezzo FROM prodotti WHERE prezzo >= 50 ORDER BY prezzo DESC;`."
  },
  {
    id: "sql-2",
    subject: "SQL",
    title: "14. Query INNER JOIN (Utenti ed Ordini)",
    pdfReference: "SQL Dispensa — Relazioni e Joins",
    description: "Scrivi una query `INNER JOIN` che seleziona il `nome` dell'utente e il `totale` dell'ordine unendo le tabelle `utenti u` e `ordini o` sulla relazione `u.id = o.id_utente`.",
    htmlTemplate: `<div class="db-query">Tabelle: utenti, ordini</div>`,
    initialCode: `-- Scrivi la query SQL JOIN qui:
SELECT u.nome, o.totale
FROM utenti u
INNER JOIN ordini o ON u.id = o.id_utente;`,
    officialSolution: `SELECT u.nome, o.totale
FROM utenti u
INNER JOIN ordini o ON u.id = o.id_utente;`,
    checkRules: [
      { name: "Utilizza INNER JOIN", regex: /INNER\s+JOIN\s+ordini/i },
      { name: "Clausola ON corretta", regex: /ON\s+u\.id\s*=\s*o\.id_utente/i }
    ],
    hint: "Usa `SELECT u.nome, o.totale FROM utenti u INNER JOIN ordini o ON u.id = o.id_utente;`."
  },
  {
    id: "sql-3",
    subject: "SQL",
    title: "15. Grouping con GROUP BY e HAVING",
    pdfReference: "SQL Dispensa — Aggregazione",
    description: "Scrivi una query per selezionare l' `id_cliente` e contare gli ordini `COUNT(*)`, raggruppando per `id_cliente` e mostrando solo i clienti con almeno 3 ordini.",
    htmlTemplate: `<div class="db-query">Tabella ordini (id, id_cliente, totale)</div>`,
    initialCode: `SELECT id_cliente, COUNT(*) AS totale_ordini
FROM ordini
GROUP BY id_cliente
HAVING COUNT(*) >= 3;`,
    officialSolution: `SELECT id_cliente, COUNT(*) AS totale_ordini
FROM ordini
GROUP BY id_cliente
HAVING COUNT(*) >= 3;`,
    checkRules: [
      { name: "Usa GROUP BY id_cliente", regex: /GROUP\s+BY\s+id_cliente/i },
      { name: "Usa HAVING su COUNT(*)", regex: /HAVING\s+COUNT\s*\(\s*\*\s*\)\s*>=\s*3/i }
    ],
    hint: "Usa `SELECT id_cliente, COUNT(*) FROM ordini GROUP BY id_cliente HAVING COUNT(*) >= 3;`."
  },
  {
    id: "sql-4",
    subject: "SQL",
    title: "16. LEFT JOIN per Record Orfani",
    pdfReference: "SQL Dispensa — Relazioni tra Tabelle",
    description: "Scrivi una query con `LEFT JOIN` per trovare i nomi di tutti gli utenti della tabella `utenti u` che NON hanno mai effettuato ordini (ovvero `o.id IS NULL`).",
    htmlTemplate: `<div class="db-query">Tabelle: utenti u, ordini o</div>`,
    initialCode: `SELECT u.nome
FROM utenti u
LEFT JOIN ordini o ON u.id = o.id_utente
WHERE o.id IS NULL;`,
    officialSolution: `SELECT u.nome
FROM utenti u
LEFT JOIN ordini o ON u.id = o.id_utente
WHERE o.id IS NULL;`,
    checkRules: [
      { name: "Utilizza LEFT JOIN", regex: /LEFT\s+JOIN\s+ordini/i },
      { name: "Verifica WHERE o.id IS NULL", regex: /WHERE\s+o\.id\s+IS\s+NULL/i }
    ],
    hint: "La clausola `WHERE o.id IS NULL` dopo una `LEFT JOIN` isola i record che non hanno match nella tabella destra."
  }
];

export default function LiveCoding({ onGoToProfile }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [evalResult, setEvalResult] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('ALL');

  // AI evaluation states
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiVerdict, setAiVerdict] = useState(null);
  const [showMissingKeyModal, setShowMissingKeyModal] = useState(false);

  const filteredChallenges = subjectFilter === 'ALL'
    ? challengesData
    : challengesData.filter(c => c.subject === subjectFilter);

  const currentChallenge = filteredChallenges[selectedIdx] || filteredChallenges[0];

  // Reset editor when switching challenge or filter
  useEffect(() => {
    if (currentChallenge) {
      setUserCode(currentChallenge.initialCode);
      setEvalResult(null);
      setAiVerdict(null);
      setShowSolution(false);
    }
  }, [selectedIdx, subjectFilter, currentChallenge]);

  const handleEvaluateRule = () => {
    if (!currentChallenge) return;
    const passed = [];
    const failed = [];

    currentChallenge.checkRules.forEach(rule => {
      if (rule.regex.test(userCode)) {
        passed.push(rule.name);
      } else {
        failed.push(rule.name);
      }
    });

    const isSuccess = failed.length === 0;

    setEvalResult({
      isSuccess,
      passed,
      failed,
      score: Math.round((passed.length / currentChallenge.checkRules.length) * 100)
    });
  };

  // AI Evaluator LLM Engine with BYOK Gemini API & fallback
  const handleAiEvaluation = async () => {
    if (!currentChallenge || !userCode) return;

    if (!hasValidApiKey()) {
      setShowMissingKeyModal(true);
      return;
    }

    setIsAiLoading(true);
    setAiVerdict(null);

    const res = await evaluateCodeWithAi(userCode, currentChallenge);

    if (res.error === 'MISSING_API_KEY') {
      setIsAiLoading(false);
      setShowMissingKeyModal(true);
      return;
    }

    if (res.success && res.verdict) {
      setAiVerdict(res.verdict);
    } else {
      // Rule-based fallback if API fails or offline
      let passedRulesCount = 0;
      currentChallenge.checkRules.forEach(rule => {
        if (rule.regex.test(userCode)) passedRulesCount += 1;
      });

      const totalRules = currentChallenge.checkRules.length;
      const rulePercent = Math.round((passedRulesCount / totalRules) * 100);

      const isPass = rulePercent >= 70 && userCode.trim().length > 15;

      let grade = "15 / 30 (Insufficiente)";
      if (rulePercent === 100) {
        grade = "30 e Lode / 30";
      } else if (rulePercent >= 80) {
        grade = "28 / 30";
      } else if (rulePercent >= 70) {
        grade = "22 / 30";
      } else if (rulePercent >= 50) {
        grade = "18 / 30 (Sufficiente risicato)";
      }

      setAiVerdict({
        isSuccess: isPass,
        voto: grade,
        profName: "Prof. Loris",
        role: "Docente Universitario di Sviluppo Web",
        analisiRequisiti: isPass
          ? "Il codice presentato soddisfa appieno i requisiti tecnici imposti dalla traccia dell'esercizio."
          : "ATTENZIONE: Il codice inviato appare incompleto o privo di alcune istruzioni chiave richieste dalla dispensa didattica.",
        qualitaCodice: isPass
          ? "Strutturazione pulita, ottima aderenza alle convenzioni stilistiche ed alla formattazione."
          : "Riscontrata imprecisione nelle regole sintattiche o mancanza di costrutti essenziali.",
        codiceOttimizzato: currentChallenge.officialSolution
      });
    }

    setIsAiLoading(false);
  };

  const handleResetCode = () => {
    if (!currentChallenge) return;
    setUserCode(currentChallenge.initialCode);
    setEvalResult(null);
    setAiVerdict(null);
    setShowSolution(false);
  };

  const getSubjectBadge = (sub) => {
    switch (sub) {
      case 'CSS': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'JavaScript': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'React': return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
      case 'SQL': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      default: return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
    }
  };

  if (!currentChallenge) return null;

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>Laboratorio Live Coding & Esaminatore IA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sfida Pratica sulle 4 Materie
            </h1>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
              Metti alla prova le tue competenze di scrittura codice per **CSS, JavaScript, React ed SQL** e fatti valutare dal Docente Universitario IA!
            </p>
          </div>

          <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-slate-950 border border-slate-700 text-xs font-semibold text-cyan-400">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Sfida {selectedIdx + 1} di {filteredChallenges.length}</span>
          </div>
        </div>
      </div>

      {/* Subject Filter & Challenge Tabs */}
      <div className="space-y-3">
        {/* Subject Filter Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {['ALL', 'CSS', 'JavaScript', 'React', 'SQL'].map(sub => (
            <button
              key={sub}
              onClick={() => {
                setSubjectFilter(sub);
                setSelectedIdx(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${subjectFilter === sub
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-1 ring-indigo-400'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
            >
              {sub === 'ALL' ? `Tutte le Materie (${challengesData.length})` : `${sub} (${challengesData.filter(c => c.subject === sub).length})`}
            </button>
          ))}
        </div>

        {/* Horizontal Challenges List */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {filteredChallenges.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all whitespace-nowrap ${selectedIdx === idx
                  ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/50 shadow-sm font-extrabold ring-1 ring-cyan-500'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Column: Code Editor & AI Launcher */}
        <div className="space-y-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${getSubjectBadge(currentChallenge.subject)}`}>
                  {currentChallenge.subject}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {currentChallenge.pdfReference}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {currentChallenge.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                {currentChallenge.description}
              </p>
            </div>

            {/* Code Textarea Editor */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Editor Codice ({currentChallenge.subject}):</span>
                </span>
                <button
                  onClick={handleResetCode}
                  className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <textarea
                rows={10}
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-indigo-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all leading-relaxed shadow-inner"
                placeholder="/* Scrivi il tuo codice qui... */"
              />
            </div>
          </div>

          {/* Action buttons including AI Evaluator */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">

              {/* Standard Rule Check */}
              <button
                onClick={handleEvaluateRule}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Test Rapido Regole</span>
              </button>

              {/* AI Evaluator Button */}
              <button
                disabled={isAiLoading}
                onClick={handleAiEvaluation}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
              >
                {isAiLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
                <span>🤖 Valuta con Esaminatore IA</span>
              </button>

            </div>

            <button
              onClick={() => setShowSolution(!showSolution)}
              className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs transition-all flex items-center justify-center space-x-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>{showSolution ? 'Nascondi Soluzione' : 'Mostra Soluzione Ufficiale Dispensa'}</span>
            </button>
          </div>

        </div>

        {/* Right Column: AI Verdict, Traccia & PDF Solution */}
        <div className="space-y-6 flex flex-col justify-between">

          {/* AI Loader Indicator */}
          {isAiLoading && (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-purple-500/30 shadow-sm text-center space-y-4 animate-pulse">
              <Loader2 className="w-10 h-10 text-purple-600 dark:text-purple-400 animate-spin mx-auto" />
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">L'esaminatore IA sta correggendo la tua prova...</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Analisi sintattica, verifica requisiti e calcolo del voto in trentesimi in corso.
                </p>
              </div>
            </div>
          )}

          {/* AI Verdict Box */}
          {aiVerdict && !isAiLoading && (
            <div className={`p-6 rounded-2xl border transition-all space-y-4 shadow-sm animate-fadeIn ${aiVerdict.isSuccess
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                : 'bg-red-500/10 border-red-500/40 text-red-900 dark:text-red-200'
              }`}>

              {/* Header with Professor Name & Grade */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 block">{aiVerdict.profName}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{aiVerdict.role}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Voto Assegnato</span>
                  <span className={`text-xl sm:text-2xl font-black ${aiVerdict.isSuccess ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {aiVerdict.voto}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${aiVerdict.isSuccess
                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                    : 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40'
                  }`}>
                  ESITO: {aiVerdict.isSuccess ? 'PROVA SUPERATA' : 'PROVA NON SUPERATA'}
                </span>
              </div>

              {/* Professor Detailed Remarks */}
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong>1) Analisi Requisiti:</strong> {aiVerdict.analisiRequisiti}
                </p>
                <p>
                  <strong>2) Qualità del Codice & Best Practice:</strong> {aiVerdict.qualitaCodice}
                </p>
              </div>

              {/* Suggested Solution from AI */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-indigo-400 block">Codice Ottimizzato Consigliato dal Docente:</span>
                <pre className="font-mono text-xs text-indigo-300 overflow-x-auto"><code>{aiVerdict.codiceOttimizzato}</code></pre>
              </div>

            </div>
          )}

          {/* Standard Rule Check Results */}
          {evalResult && !aiVerdict && (
            <div className={`p-5 rounded-2xl border transition-all space-y-3 ${evalResult.isSuccess
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-500/10 border-red-500/40 text-red-800 dark:text-red-300'
              }`}>
              <div className="flex items-center space-x-3">
                {evalResult.isSuccess ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 dark:text-red-400 flex-shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {evalResult.isSuccess ? 'Test Rapido Superato!' : 'Regole Mancanti'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Accuratezza regole: <strong>{evalResult.score}%</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-1 text-xs">
                {evalResult.passed.map((rule, i) => (
                  <div key={i} className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Regola osservata: {rule}</span>
                  </div>
                ))}
                {evalResult.failed.map((rule, i) => (
                  <div key={i} className="flex items-center space-x-2 text-red-600 dark:text-red-400 font-semibold">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Mancante: {rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Traccia & Instructions Card */}
          {!aiVerdict && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Traccia & Indicazioni del Quesito</span>
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentChallenge.hint}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                <pre><code>{currentChallenge.htmlTemplate}</code></pre>
              </div>
            </div>
          )}

          {/* Official PDF Solution Box */}
          {showSolution && (
            <div className="p-5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-950/40 border border-indigo-500/30 space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Soluzione Ufficiale dalla Dispensa:</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300">
                <pre><code>{currentChallenge.officialSolution}</code></pre>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Missing API Key Modal */}
      <MissingApiKeyModal
        isOpen={showMissingKeyModal}
        onClose={() => setShowMissingKeyModal(false)}
        onGoToProfile={onGoToProfile}
      />

    </div>
  );
}
