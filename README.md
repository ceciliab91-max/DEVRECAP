# DevExam PRO — Web Development Exam Simulator & AI Study Hub

Piattaforma e-learning interattiva e simulatore d'esame full-stack progettato per lo studio intensivo, la personalizzazione dell'apprendimento e la preparazione alle prove d'esame universitarie di **Sviluppo Web Front-End & Database**.

L'applicazione include gestione delle sessioni con ruoli (Studente / Docente Admin), banche dati didattiche strutturate da dispense universitarie, motore di simulazione con timer, laboratorio di **Live Coding con correzione automatica tramite IA**, **Tutor didattico interattivo**, **Hub di Studio** con Flashcard e Mappe concettuali, e un **Pannello Amministratore** per la gestione dinamica di quiz e sfide pratiche.

---

## Funzionalità Principali

### 1. Autenticazione & Gestione Ruoli (RBAC)

* **Accesso Multi-Ruolo:** Flusso di Login/Registrazione con profilazione differenziata:
  * **Studente:** Accesso alle simulazioni, laboratorio di codice, statistiche personali, flashcard e cronologia esami.
  * **Docente / Admin:** Accesso esclusivo all'Admin Hub per il monitoraggio analitico globale e la gestione CRUD dei contenuti.
* **Profilo Studente Personalizzato:** Configurazione di Avatar, Bio, Obiettivo Voto (es. 30L) e Data Obiettivo dell'Esame con countdown automatico dei giorni rimanenti.

### 2. Dashboard Analitica & Monitoraggio Performance

* **Metriche Personali:** Monitoraggio in tempo reale di simulazioni completate, media punteggi (in trentesimi), tasso di accuratezza globale e conteggio degli errori.
* **Moduli Didattici:** Card dedicate per le 4 materie con stato di avanzamento e accesso rapido all'allenamento mirato.

### 3. Motore di Simulazione & Quiz Engine

* **Modalità Flessibili:** Scelta tra *Esame Completo Mix* (30 quesiti casuali distribuiti tra tutte le materie) o *Allenamento Verticale* su singola materia.
* **Gestione della Prova:** Timer con conto alla rovescia configurabile (30 min, 45 min o illimitato) e funzione per contrassegnare i quesiti dubbi (*Rivedi dopo*).
* **Revisione Dettagliata:** Feedback istantaneo a fine test con calcolo del voto, confronto tra risposta data e corretta, e spiegazione tecnica estratta dalle dispense didattiche.
* **Tutor IA On-Demand:** Pulsante dedicato accanto a ogni errore per richiedere al Tutor IA un approfondimento concettuale istantaneo.

### 4. Laboratorio di Live Coding con Valutatore IA

* **Editor di Codice Integrato:** Ambiente dedicato per risolvere sfide pratiche divise per materia.
* **Correzione con LLM (Gemini / Claude / OpenAI):** Invio asincrono del codice con System Prompt da docente universitario.
* **Report Strutturato:** Assegnazione di esito (Superato / Non Superato), voto in trentesimi, analisi sintattica, aderenza alla traccia e best practice consigliate.

### 5. Hub di Studio, Flashcard & Active Recall

* **Flashcard Interattive:** Schede didattiche fronte/retro (*Domanda/Concetto* vs *Risposta/Snippet*) con tracciamento dello stato di apprendimento (*"La so"* / *"Da rivedere"*).
* **Mappe Concettuali:** Schemi riassuntivi ad albero per il ripasso visuale dei macro-argomenti.
* **Integrazione Google NotebookLM:** Collegamento rapido alla piattaforma per la consultazione semantica avanzata delle dispense.

### 6. Pannello Amministratore (Admin Panel)

* **Metriche Piattaforma:** Statistiche aggregate su numero di studenti iscritti, volume di quesiti presenti, sfide attive e media voti complessiva.
* **CRUD Banca Dati Quiz:** Interfaccia per visualizzare, filtrare, aggiungere, modificare o rimuovere domande a scelta multipla.
* **CRUD Sfide Pratiche:** Gestione e inserimento di nuove tracce per il laboratorio di Live Coding.

---

## Materie & Programma Didattico

| Materia | Argomenti Chiave |
| :--- | :--- |
| **CSS** | Box Model, Selettori avanzati (`:nth-child`, combinatori), Specificità, Unità relative/assolute (`rem`, `em`, `vw/vh`), Positioning (`relative`, `absolute`, `fixed`, `sticky`), Background, Pseudo-elementi (`::before`, `::after`), Clearfix e **Flexbox Layout completo**. |
| **JavaScript** | Scope (`let`/`const` vs `var`), Tipi di dato, Array Methods (`map`, `filter`, `reduce`), Funzioni e Closure, Manipolazione DOM, Gestione Eventi, Asincronia (`Promises`, `async/await`, Event Loop) e Classi ES6. |
| **React** | Flusso dati unidirezionale, JSX, Props e State, React Hooks (`useState`, `useEffect`, dipendenze), Riconciliazione & Virtual DOM, Rendering liste con `key` univoche e form controllati. |
| **SQL** | Modello relazionale, Vincoli d'integrità (`PRIMARY KEY`, `FOREIGN KEY`), Query avanzate (`SELECT`, `WHERE`, `ORDER BY`), Funzioni aggregate, `GROUP BY`, `HAVING` e tipi di `JOIN` (`INNER`, `LEFT`, `RIGHT`). |

---

## Architettura & Stack Tecnologico

* **Front-End:** React 18, JavaScript ES6+ (Componenti modulari, Context API per Auth e State Management globale).
* **Styling & UI:** Tailwind CSS (Dark Mode nativa, layout responsive mobile-first, design tipografico ispirato a Notion/Linear).
* **Persistenza Dati:** `localStorage` API con schema dati relazionale predisposto per la futura migrazione a Database SQL / Supabase.
* **AI & LLM Integration:** REST API asincrone (`fetch` / async-await), gestione token di autenticazione e rendering Markdown per i report di correzione.

---

## Struttura del Progetto

```text
devexam-pro/
├── public/                 # Icone e risorse statiche
├── src/
│   ├── components/         # Componenti UI (Navbar, QuizEngine, LiveCoding, Flashcards, ChatTutor)
│   ├── context/            # AuthContext e gestione dello stato globale dell'utente
│   ├── data/               # Banche dati didattiche (questionsData.js, codingChallenges.js)
│   ├── pages/              # Viste (Dashboard, SimulaEsame, LiveCoding, StudioHub, Profilo, AdminPanel)
│   ├── services/           # Integrazione API AI (aiService.js) e gestione LocalStorage
│   ├── styles/             # File di stile Tailwind / CSS
│   ├── App.jsx             # Gestione del routing e viste protette
│   └── main.jsx            # Entry point dell'applicazione
├── .env.example            # Template configurazione API Key
├── index.html              # Template HTML5
├── package.json            # Dipendenze e script
├── tailwind.config.js      # Configurazione Tailwind CSS
└── README.md               # Documentazione ufficiale del progetto
