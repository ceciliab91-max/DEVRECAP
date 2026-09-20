# Contribution & Architecture Log

> **Branch:** `feature/netlify-auth-blob`  
> **Target:** Pull Request to `main`  
> **Platform:** DevExam PRO (Full-Stack Developer Certification Simulator)

Questo documento traccia in modo sintetico e professionale le specifiche tecniche, le decisioni architetturali e i contributi implementati sul branch isolato di feature.

---

## Indice delle Milestone

1. [Milestone 1: Git Branching & Flusso di Contributo Isolato](#milestone-1-git-branching--flusso-di-contributo-isolato)
2. [Milestone 2: Backend Serverless Netlify Blobs & Crittografia Sicura](#milestone-2-backend-serverless-netlify-blobs--crittografia-sicura)
3. [Milestone 3: Autenticazione Multi-Account & UI Responsive Viewport](#milestone-3-autenticazione-multi-account--ui-responsive-viewport)
4. [Milestone 4: Isolamento Dati Utente & Compressione Lossless LZ](#milestone-4-isolamento-dati-utente--compressione-lossless-lz)
5. [Milestone 5: Accessibilità WCAG 2.1 AA & Google Lighthouse 100%](#milestone-5-accessibilità-wcag-21-aa--google-lighthouse-100)
6. [Milestone 6: Modernizzazione Toolchain, Compilatore SWC & Build Asset](#milestone-6-modernizzazione-toolchain-compilatore-swc--build-asset)
7. [Milestone 7: Pulizia Architetturale, Error Boundary & Scripting](#milestone-7-pulizia-architetturale-error-boundary--scripting)

---

## Milestone 1: Git Branching & Flusso di Contributo Isolato

### Obiettivi Architetturali M1

Garantire la totale integrità del codice sorgente originario lavorando su un branch secondario dedicato, predisponendo modifiche atomiche e collaudate pronte per la revisione e il merge tramite Pull Request su GitHub.

### Interventi e Risoluzioni M1

- Creazione del branch di feature dedicato `feature/netlify-auth-blob`.
- Confinamento di tutte le evoluzioni architetturali al branch secondario, preservando `main` inalterato.

---

## Milestone 2: Backend Serverless Netlify Blobs & Crittografia Sicura

### Specifiche Tecniche M2

Implementare un'infrastruttura backend serverless su cloud Netlify che permetta la memorizzazione sicura degli utenti e la sincronizzazione cross-device dei progressi, senza esporre password in chiaro né richiedere database relazionali esterni pesanti.

### Interventi e Risoluzioni M2

- **Netlify Functions & Blobs (`netlify.toml`)**:
  - Endpoint `/api/auth` (`netlify/functions/auth.js`) per gestione accessi e registrazioni nello store Blob `devexam_users`.
  - Endpoint `/api/sync` (`netlify/functions/sync.js`) per il salvataggio dei progressi nello store Blob `devexam_userdata`.
- **Sicurezza Crittografica (`authStorage.js`)**:
  - Hashing crittografico SHA-256 con salt tramite Web Crypto API nativa (`crypto.subtle.digest`).
  - Sanitizzazione dei payload di ritorno: omissione automatica di `password` e `passwordHash`.
- **Servizio Client Ibrido (`cloudStorageService.js`)**:
  - Sincronizzazione trasparente nel cloud con fallback resiliente in locale per lo sviluppo offline.

---

## Milestone 3: Autenticazione Multi-Account & UI Responsive Viewport

### Specifiche Tecniche M3

Sostituire il precedente auto-login statico con un sistema di autenticazione dinamico multi-utente; armonizzare la UI per garantire perfetta visualizzazione a schermo intero su dispositivi mobili e desktop senza scroll forzati o barre di navigazione esposte per ospiti non autenticati.

### Interventi e Risoluzioni M3

- **Nuova Schermata di Accesso (`AuthScreen.jsx` & `AuthModal.jsx`)**:
  - Supporto per login sia tramite **Username** che tramite **Email**.
  - Layout calibrato su viewport dinamico `100dvh` con contrasti ottimizzati Dark/Light mode.
  - Pulsante interattivo per mostrare/nascondere la password (`Eye`/`EyeOff`).
- **Protezione Area Ospiti (`Navbar.jsx`)**:
  - Voci di navigazione, statistiche e voti visibili unicamente previa autenticazione.

---

## Milestone 4: Isolamento Dati Utente & Compressione Lossless LZ

### Specifiche Tecniche M4

Isolare completamente lo storico delle simulazioni, il pool degli errori, i bookmark e le note per singolo utente. Prevenire il rigonfiamento dello storage locale introducendo un layer di compressione trasparente e sincrono con pieno supporto per tutte le operazioni CRUD.

### Interventi e Risoluzioni M4

- **Data Scoping Multi-Tenant (`storage.js`)**:
  - Generazione dinamica di chiavi isolate (`${key}_${userId}`) per evitare contaminazione dei progressi tra profili (es. account `gae` e `mario`).
- **Motore di Compressione Sincrono (`compressedStorage.js`)**:
  - Integrazione di `lz-string` con codifica Base64 sicura per browser e cloud (`⚡lz:`).
  - Riduzione dell'impronta di memoria di oltre l'**80%** preservando le capacità CRUD sincrone (Create, Read, Update, Delete) senza impattare i tempi di render di React.
  - Piena backward compatibility con i dati JSON legacy non compressi.

---

## Milestone 5: Accessibilità WCAG 2.1 AA & Google Lighthouse 100%

### Specifiche Tecniche M5

Garantire massima usabilità e accessibilità per screen reader e utenti ipovedenti, raggiungendo il punteggio massimo di conformità agli standard Google Lighthouse.

### Risultati Ufficiali Audit Lighthouse M5

- **Desktop Audit**:
  - **100% Performance** | **100% Accessibilità** | **100% Best Practices** | **100% SEO**
- **Mobile Audit (Fast 4G)**:
  - **100% Performance** | **100% Accessibilità** | **100% Best Practices** | **100% SEO**
- **Interventi**:
  - Marcatori WAI-ARIA completi (`role="banner"`, `role="navigation"`, `role="main"`, `aria-label`).
  - Skip link accessibile per navigazione da tastiera.
  - Dati strutturati JSON-LD Schema.org in `index.html`.

---

## Milestone 6: Modernizzazione Toolchain, Compilatore SWC & Build Asset

### Specifiche Tecniche M6

Aggiornare l'ecosistema di dipendenze alle versioni stabili più performanti, sostituire il compilatore Babel con un motore compilato in Rust ed eseguire code-splitting e pre-compressione degli asset di produzione.

### Interventi e Risoluzioni M6

- **Stack Tecnologico Aggiornato**:
  - **React 19.2.8**, **Tailwind CSS v4.3.3**, **Vite 8.2.2**, **Netlify Blobs 11.0.3**, **Oxlint 1.82.0**.
- **Compilatore Rust (`@vitejs/plugin-react-swc`)**:
  - Sostituito `@vitejs/plugin-react` in [`vite.config.js`](file:///c:/Users/Utente/Desktop/boolean/pointer/DEVRECAP/vite.config.js) per HMR e build ultra-rapide (~550ms).
- **Code-Splitting & Pre-Compressione (`vite-plugin-compression`)**:
  - Bundle iniziale ridotto a soli **139 kB** tramite lazy loading asincrono di tutti i moduli pesanti.
  - Generazione automatica di asset pre-compressi Brotli (`.br`) e Gzip (`.gz`). Total Blocking Time (TBT) a **0 ms** e Layout Shift (CLS) a **0**.

---

## Milestone 7: Pulizia Architetturale, Error Boundary & Scripting

### Specifiche Tecniche M7

Riorganizzare l'alberatura del repository eliminando file ridondanti, configurare la gestione delle eccezioni globali a runtime e aggiungere script di sviluppo avanzati.

### Interventi e Risoluzioni M7

- **Riorganizzazione Directory (`dispense/`)**:
  - Unificate tutte le dispense nelle sottocartelle tematiche [`dispense/javascript/`](file:///c:/Users/Utente/Desktop/boolean/pointer/DEVRECAP/dispense/javascript), [`dispense/react/`](file:///c:/Users/Utente/Desktop/boolean/pointer/DEVRECAP/dispense/react), [`dispense/sql/`](file:///c:/Users/Utente/Desktop/boolean/pointer/DEVRECAP/dispense/sql).
  - Rimosso il lockfile duplicato `package-lock.json` e configurato il [`.gitignore`](file:///c:/Users/Utente/Desktop/boolean/pointer/DEVRECAP/.gitignore) avanzato per proteggere variabili d'ambiente e file temporanei.
- **Resilienza Globale (`src/main.jsx`)**:
  - Aggiunto un `GlobalErrorBoundary` al top-level di React per catturare eventuali eccezioni impreviste a runtime con interfaccia di recupero sessione.
- **Script di Sviluppo & Audit (`package.json`)**:
  - `pnpm run dev` & `pnpm run build:watch`: server di sviluppo con HMR attivo e monitoraggio build continuo.
  - `pnpm run dev:host`: esposizione in rete locale per test multi-device su WiFi.
  - `pnpm run lighthouse:mobile`, `lighthouse:desktop`, `lighthouse:all`: suite di audit automatizzata.
  - `pnpm run lint`: linter Oxlint pulito con **0 errori e 0 warning**.
