# DevExam PRO (Recap) — Web Development Exam Simulator & AI Socratic Study Hub

> **Piattaforma didattica interattiva, accessibile e ad alte prestazioni per la preparazione agli esami di sviluppo web full-stack.**
> Include un simulatore quiz avanzato, laboratorio di Live Coding, consultazione dispense con Active Recall e un Tutor IA Socratico basato su LangChain e schemi Zod.

---

## 🚀 Caratteristiche & Funzionalità Principali

### 1. 🎯 Simulatore d'Esame & Quiz Engine Avanzato

- **Question Bank Completa (120 Quesiti):** Domande d'esame realistiche calibrate sull'intero programma delle 42 dispense ufficiali con spiegazioni socratiche dettagliate.
- **Distribuzione Curriculare:**
  - 🟡 **JavaScript, Express.js & LangChain (40 quesiti):** Event Loop, Closures, Middleware, Router modulare, Error Handler, Fetch e Body Parsing.
  - 🔵 **React 19 & React Router (30 quesiti):** Hooks (`useState`, `useEffect`, `useContext`, `useTransition`), Routing v6, Gestione Form e Pattern di Stato.
  - 🎨 **CSS 3 & Responsive Design (25 quesiti):** Selettori avanzati, Flexbox, CSS Grid, Media Queries e Specificità.
  - 🟣 **SQL & Prisma ORM (25 quesiti):** JOINs, GROUP BY/HAVING, Integrità Referenziale, Modelli `@relation`, Eager Loading `include` e Migrazioni.
- **Modalità di Simulazione:** Simulazione completa con timer d'esame (30/45 min) oppure allenamento mirato per singola materia con pool degli errori (*Spaced Repetition*).

### 2. 🧠 Tutor IA Socratico (LangChain LCEL & Zod Structured Engine)

- **4 Modalità di Studio Specializzate:**
  - **💡 Spiega Teoria:** Spiegazioni chiare e socratiche con grounding esclusivo sulle 42 dispense del corso.
  - **🎓 Simula Orale:** Domande aperte d'esame per testare la dialettica tecnica dello studente con feedback strutturato.
  - **🎯 Genera Quiz:** Generazione dinamica di quiz a risposta multipla su argomenti specifici.
  - **🛠️ Correggi Codice:** Analisi, debugging e refactoring di snippet con best practice moderne.
- **Validazione Rigorosa:** Output strutturato con validazione Zod e gestione sicura delle API Key con fallback crittografico SHA-256 in locale.

### 3. 💻 Laboratorio di Live Coding Interattivo

- Esecuzione sandboxed in tempo reale per snippet HTML, CSS e JavaScript.
- Valutatore algoritmico assistito da IA per analizzare correttezza logica, edge case e conformità alle specifiche dell'esercizio.

### 4. 📚 Hub Dispense, Mappe Concettuali & Notebook

- Accesso rapido alle **42 dispense didattiche** organizzate per modulo tematico.
- Blocco note integrato con salvataggio automatico e funzionalità di **Backup/Restore JSON locale** (zero dipendenze esterne).

### 5. ♿ Accessibilità Totale (WCAG 2.1 AA) & Privacy by Design

- **Punteggio Lighthouse Accessibilità: 100 / 100** con navigazione completa da tastiera, landmark semantici e supporto screen reader.
- **Privacy per Uso Interno:** Nessun tracciamento esterno o indicizzazione accidentale garantito dal meta tag `noindex, nofollow` e link canonico configurato.
- **PWA Lean:** Installabile come Web App su dispositivi desktop e mobile tramite manifest statico.

---

## 🛠️ Stack Tecnologico

| Layer | Tecnologie & Librerie |
| :--- | :--- |
| **Frontend Core** | **React 19**, **Vite 8** (Compilatore Rust SWC), **Tailwind CSS v4** |
| **Icone & UI Helpers** | **Lucide React**, **LZ-String** (Compressione storage) |
| **Intelligenza Artificiale** | **@langchain/google-genai**, **@langchain/core**, **Zod** |
| **Backend & Cloud Sync** | **Netlify Functions**, **Netlify Blobs** |
| **Linter & Qualità** | **Oxlint** (0 errori, 0 warning), **Lighthouse CI** |
| **Crittografia & Sicurezza** | **Web Crypto API** con fallback Pure-JS SHA-256 nativo |

---

## 📁 Struttura del Progetto

```text
DEVRECAP/
├── dispense/                # Dispense didattiche ufficiali (CSS, JS, Node, React, SQL, AI)
├── netlify/                 # Netlify Serverless Functions (Auth, Cloud Sync)
│   └── functions/
├── public/                  # Manifest PWA, icone SVG e asset statici
├── scripts/                 # Test unitari snelli e runner di audit Lighthouse
├── src/
│   ├── components/          # Componenti React modulari (Tutor IA, Quiz, LiveCoding, Hub)
│   ├── data/                # Question Bank (120 quesiti) e Dispense Knowledge Base
│   ├── services/            # Layer di orchestrazione LangChain e Cloud Storage
│   ├── utils/               # Storage compresso, hashing PIN e gestione stato
│   ├── App.jsx              # Routing e viewport responsive
│   └── main.jsx             # Entrypoint React con Global Error Boundary
├── index.html               # Semantic HTML5 con accessibilità e meta tags
├── package.json             # Script e dipendenze del progetto
└── vite.config.js           # Configurazione Vite, SWC e compressione Brotli/Gzip
```

---

## 🚀 Script & Comandi di Sviluppo

```bash
# Installazione dipendenze
pnpm install

# Avvio del server di sviluppo (locale)
pnpm run dev

# Avvio per test su rete locale (WiFi / Multi-device su porta 5173)
pnpm run dev:host

# Esecuzione linter Oxlint
pnpm run lint

# Esecuzione test unitari snelli (Core Crypto & Data Integrity)
pnpm test

# Build di produzione ottimizzata
pnpm run build

# Preview del bundle di produzione (porta 4173)
pnpm run preview

# Audit Lighthouse completo (Desktop & Mobile)
pnpm run lighthouse:all

# Audit Lighthouse sul bundle compilato di produzione
pnpm run lighthouse:prod
```

---

## 👥 Contributi & Governance

Il progetto adotta un modello di sviluppo basato su standard industriali:

- **Convenzione Commit:** Conventional Commits in lingua inglese (`feat:`, `fix:`, `refactor:`, `docs:`).
- **Registro delle Modifiche:** Consulta [`CONTRIBUTION_LOG.md`](file:///C:/dev/projects/DEVRECAP/CONTRIBUTION_LOG.md) per lo storico dettagliato di tutte le milestone rilasciate.
- **Linee Guida Anti-Overengineering:** Documentate e presidiate nel report [`.agents/BOTTLENECK.md`](file:///C:/dev/projects/DEVRECAP/.agents/BOTTLENECK.md).
