# Creare skill per AI

**Argomento:** AI | **Data Lezione:** 2026-07-23 | **File Sorgente:** lezioni/skill.html

## Panoramica
Una skill è una cartella che contiene un metodo riutilizzabile: istruzioni, regole e file di supporto per un compito preciso. Un prompt descrive ciò che vogliamo ottenere in una singola conversazione. Una skill, invece, conserva il modo corretto di affrontare un lavoro che si ripete: per esempio pre...

### A che cosa servono
Una skill è una cartella che contiene un metodo riutilizzabile: istruzioni, regole e file di supporto per un compito preciso. Un prompt descrive ciò che vogliamo ottenere in una singola conversazione. Una skill, invece, conserva il modo corretto di affrontare un lavoro che si ripete: per esempio preparare un report, applicare uno stile editoriale, usare un'API o controllare un tipo di file. Le skill aiutano Vibe a essere coerente. Invece di rispiegare ogni volta tono, passaggi e vincoli, queste informazioni vivono in un posto revisionabile dal team e restano vicine al progetto. Una buona skill è focalizzata: un obiettivo chiaro, istruzioni concrete e soltanto le risorse che servono davvero. Se due attività richiedono metodi molto diversi, è preferibile creare due skill distinte.

### Skill in Vibe
Mistral Vibe segue lo standard Agent Skills: una skill è una directory con un file obbligatorio chiamato SKILL.md . Per Vibe Code, le skill legate a un progetto vivono nella cartella .vibe/skills/ . Quando Vibe lavora in una directory considerata attendibile, scopre le skill presenti lì e può usarle per il progetto corrente. .vibe/ └── skills/ └── nome-skill/ └── SKILL.md Vibe può scegliere una skill automaticamente quando la richiesta corrisponde alla sua descrizione, oppure l'utente può richiamarla in modo esplicito con /nome-skill . Impostando user-invocable: true nel frontmatter, la skill appare anche tra i comandi disponibili. La documentazione ufficiale di Mistral descrive le posizioni e i campi delle skill di Vibe Code , inclusa la cartella di progetto .vibe/skills/ .

### Come sono composte
Il primo file è sempre SKILL.md . Inizia con il frontmatter YAML , cioè i metadati che Vibe legge per riconoscere e presentare la skill. Dopo il frontmatter arrivano le istruzioni Markdown che l'agente segue quando la skill viene attivata. --- name: api-summary description: Usare quando occorre leggere una risposta API e produrre una sintesi breve con errori e dati principali. user-invocable: true allowed-tools: - read_file - grep --- # API summary 1. Leggere la risposta e identificare i dati importanti. 2. Segnalare gli errori o i campi mancanti. 3. Restituire una sintesi nel formato richiesto. name è il nome tecnico usato per richiamare la skill. description spiega quando attivarla: è il trigger più importante. user-invocable rende disponibile il comando /api-summary . allowed-tools limita gli strumenti che la skill può usare. Accanto a SKILL.md possono esistere file aggiuntivi: references/ per istruzioni estese, assets/ per template o file da riutilizzare e scripts/ per operazioni automatiche e ripetibili.

### Come crearle
Si inizia da un caso reale. Prima di scrivere file, individua un'attività che richiede sempre gli stessi passaggi, le stesse regole o gli stessi materiali. Una skill per “fare tutto con il codice” è troppo ampia; una skill per “generare il changelog dalle modifiche Git” ha invece un confine chiaro. Poi si crea la cartella in .vibe/skills/ , si scrive una descrizione che inizi idealmente con “Usare quando…” e si aggiunge il procedimento nel corpo di SKILL.md . Le istruzioni devono dire all'agente che cosa controllare, che cosa produrre e che cosa evitare. .vibe/skills/ └── changelog-git/ └── SKILL.md Convenzioni per i nomi Usa nomi brevi, descrittivi e facili da prevedere. Per la cartella della skill e per i file di supporto, la convenzione più chiara è il kebab-case : tutte lettere minuscole e parole separate da trattini. Il nome della cartella dovrebbe coincidere con il valore di name nel frontmatter: changelog-git , non ChangelogGit né skill changelog . Cartella della skill: changelog-git/ , report-settimanale/ . File principale: SKILL.md va mantenuto esattamente con questo nome e in maiuscolo. Indice e cartelle comuni: index.md , references/ , assets/ e scripts/ restano in minuscolo. File interni: usa nomi espliciti come convenzioni-commit.md , modello-release.md o controlla-branch.js . Evita spazi, accenti, simboli e nomi generici come file1.md . Percorsi coerenti rendono più semplice per Vibe, per l'agente e per il team trovare la risorsa giusta senza ambiguità. Dopo il primo utilizzo, osserva il risultato. Se l'agente non attiva la skill, migliora la descrizione. Se si attiva ma sbaglia un passaggio, aggiungi o correggi l'istruzione interessata. Le skill efficaci nascono da piccoli miglioramenti successivi, non da un manuale enorme scritto in anticipo.

### Skill complesse
Quando una competenza contiene più sottocompetenze, SKILL.md non deve trasformarsi in un testo infinito. Può restare la porta d'ingresso e usare un file index.md come indice dei materiali da consultare. .vibe/skills/ └── brand-system/ ├── SKILL.md ├── index.md └── references/ ├── tono-di-voce.md ├── colori.md └── componenti.md index.md non è un file magico caricato automaticamente: è un indice esplicito. Il corpo di SKILL.md deve dire all'agente quando aprirlo, per esempio quando la richiesta coinvolge più parti del sistema di brand. ## Navigazione Se la richiesta riguarda più di una sottocompetenza, leggere index.md e scegliere soltanto i riferimenti necessari. Dentro index.md si elencano le sottocompetenze e i rispettivi file. Per esempio: tono di voce per la scrittura, colori per l'interfaccia, componenti per i layout. In questo modo l'agente carica solo la parte utile, senza appesantire ogni richiesta con tutte le regole della competenza complessa.

```text
.vibe/
└── skills/
    └── nome-skill/
        └── SKILL.md
```

```javascript
---
name: api-summary
description: Usare quando occorre leggere una risposta API e produrre una sintesi breve con errori e dati principali.
user-invocable: true
allowed-tools:
  - read_file
  - grep
---

# API summary

1. Leggere la risposta e identificare i dati importanti.
2. Segnalare gli errori o i campi mancanti.
3. Restituire una sintesi nel formato richiesto.
```

```text
.vibe/skills/
└── changelog-git/
    └── SKILL.md
```

```text
.vibe/skills/
└── brand-system/
    ├── SKILL.md
    ├── index.md
    └── references/
        ├── tono-di-voce.md
        ├── colori.md
        └── componenti.md
```

```javascript
## Navigazione

Se la richiesta riguarda più di una sottocompetenza,
leggere index.md e scegliere soltanto i riferimenti necessari.
```
