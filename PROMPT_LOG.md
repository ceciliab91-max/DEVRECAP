# Registro Cronologico dei Prompt e Fasi di Sviluppo (DevExam PRO)

Questo documento contiene la cronologia completa delle istruzioni e dei prompt forniti all'assistente IA durante la progettazione e lo sviluppo dell'applicazione **DevExam Simulator & Study Planner**.

## Indice delle Fasi di Sviluppo

1. [Fase 1: Setup Iniziale del Progetto & Architettura Base]
2. [Fase 2: Motore Simulazione Esame & Revisione Risultati]
3. [Fase 3: Laboratorio di Esercitazione Pratica (Live Coding & Esaminatore IA)]
4. [Fase 4: Hub Studio, Flashcard Interattive, Mappe Concettuali & Tutor IA]
5. [Fase 5: Autenticazione, Ruoli Utente (Studente vs Admin) & Pannello Amministratore]

## Fase 1: Setup Iniziale del Progetto & Architettura Base

- Inizializzare un'applicazione Web responsive in **React 18** con **Tailwind CSS**
- Strutturare una piattaforma di preparazione all'esame per sviluppatori web focalizzata sulle 4 materie didattiche principali: **CSS**, **JavaScript**, **React** e **SQL**.
- Implementare una Dashboard generale con statistiche, media voti (in trentesimi), conteggio errori e navigazione sticky Navbar con toggle Dark/Light mode.

## Fase 2: Motore Simulazione Esame & Revisione Risultati

- Sviluppare il motore di svolgimento dei quiz con supporto per due modalità: *Simulazione Esame Completo* (30 domande casuali miste) oppure *Allenamento per Singola Materia*.
- Aggiungere un timer con conto alla rovescia (30 min, 45 min o illimitato), gestione dei quesiti contrassegnati per la revisione (*"Rivedi dopo"*), e scorciatoie da tastiera.
- Creare la schermata dei risultati finali con calcolo del voto in trentesimi, giudizio (Eccellente / Superato / Non superato), revisione dettagliata e aggiunta automatica degli errori alla Banca Errori.

## Fase 3: Laboratorio di Esercitazione Pratica (Live Coding & Esaminatore IA)

- Aggiungere una sezione per la pratica di scrittura codice dal vivo (Live Coding) con editor di testo integrato.
- Integrare un sistema di valutazione automatizzato tramite regole Regex e tramite un **Esaminatore IA** (Prof. Loris / Docente) che valuti il codice inviato, generi un voto in trentesimi ed esprima un giudizio accademico dettagliato.

## Fase 4: Hub Studio, Flashcard Interattive, Mappe Concettuali & Tutor IA

1. NUOVA SEZIONE "HUB STUDIO & FLASHCARD" (Aggiungi alla Navbar):- Modalità FLASHCARD INTERATTIVE: Mazzi suddivisi per materia (CSS, JS, React, SQL), card con effetto flip 3D fronte/retro, pulsanti "La so ✅" e "Da rivedere 🔄" con salvataggio in localStorage.
-Modalità MAPPE CONCETTUALI / SCHEMI: Vista ad albero/box dei punti chiave.
-CARD NOTEBOOKLM: Box dedicato con pulsante esterno per Google NotebookLM.
2.TUTOR IA INTERATTIVO (Chatbot a comparsa): Floating Action Button (FAB) in basso a destra, sempre visibile, connesso alle API Gemini con System Prompt da tutor d'esame.
3.SPIEGAZIONE ERRORI CON IA A FINE TEST: Pulsante "💡 Chiedi al Tutor IA" accanto ad ogni risposta errata nella schermata dei risultati d'esame.

## Fase 5: Autenticazione, Ruoli Utente (Studente vs Admin) & Pannello Amministratore

1. MODULO AUTENTICAZIONE & GESTIONE SESSIONE:
   - Form Login/Registrazione con email, password e selezione ruolo ("Studente" o "Docente/Admin").
   - Account predefiniti demo: <studente@devexam.it> (ruolo: 'student'), <admin@devexam.it> (ruolo: 'admin').
   - Mantenimento sessione in localStorage (currentUser) e protezione rotte admin.
2. PERSONALIZZAZIONE PROFILO STUDENTE:
   - Pagina "Il Mio Profilo": Nome, Bio, Avatar, "Data Obiettivo Esame" (con countdown giorni in Dashboard), "Target Voto Finale" e Badge sbloccati.
3. PANNELLO AMMINISTRATORE ("Admin Hub"):
   - Accessibile solo agli utenti 'admin'.
   - Metriche globali, CRUD Domande (tabella, ricerca, form aggiungi/modifica, elimina) e CRUD Sfide Live Coding.
4. AGGIORNAMENTO NAVBAR & HEADER:
   - Avatar utente, Badge Ruolo, Link al Profilo, Link "Pannello Admin" (solo admin) e Bottone Logout.
