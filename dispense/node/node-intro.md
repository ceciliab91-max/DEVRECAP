# Node e package manager

**Argomento:** Node | **Data Lezione:** 2026-06-29 | **File Sorgente:** lezioni/node-intro.html

## Panoramica
Node è un runtime JavaScript che funziona fuori dal browser, direttamente sul sistema operativo. Il linguaggio è sempre JavaScript, ma non esistono le API del DOM: niente document , window , alert o prompt . Nel browser JavaScript serve per interagire con la pagina: leggere elementi, rispondere ai c...

### Cos'è Node
Node è un runtime JavaScript che funziona fuori dal browser, direttamente sul sistema operativo. Il linguaggio è sempre JavaScript, ma non esistono le API del DOM: niente document , window , alert o prompt . Nel browser JavaScript serve per interagire con la pagina: leggere elementi, rispondere ai click, modificare il DOM. Node usa lo stesso linguaggio in un contesto completamente diverso: il codice gira dal terminale, legge file sul disco, avvia server e gestisce i pacchetti di un progetto. Per questo Node non include le API del browser. Le due cose sono separate: il browser ha il DOM, Node ha le sue API di sistema. Stessa sintassi, ambienti diversi. Nel nostro caso useremo Node principalmente come base per avviare strumenti da terminale, in particolare quelli necessari per creare e avviare progetti front-end moderni. Esempio // app.js console.log('Ciao da Node'); node app.js # Output: Ciao da Node

### Argomenti da terminale
process.argv è un array che contiene gli argomenti passati al comando Node. I primi due elementi sono riservati a Node e al file eseguito, quindi gli argomenti scritti dall'utente iniziano da process.argv[2] . Quando lanci uno script da terminale puoi scrivere dei valori dopo il nome del file. Questi valori vengono chiamati argomenti della riga di comando e servono per passare dati allo script senza modificare il codice ogni volta. Node mette questi dati dentro process.argv . Si tratta di un array di stringhe: in posizione 0 c'è il percorso dell'eseguibile di Node, in posizione 1 c'è il file eseguito, e dalla posizione 2 in poi ci sono gli argomenti scritti nel terminale. Questo è utile quando vuoi rendere uno script più flessibile. Per esempio puoi passare un nome, un numero o una parola e far cambiare comportamento al programma senza toccare il file app.js . Esempio // app.js const nome = process.argv[2]; console.log('Ciao ' + nome); node app.js Marco # Output: Ciao Marco // app.js const primoArgomento = process.argv[2]; const secondoArgomento = process.argv[3]; console.log(primoArgomento); console.log(secondoArgomento); node app.js rosso blu # Output: # rosso # blu

### I package manager
Un package manager installa, aggiorna e rimuove i pacchetti di un progetto JavaScript. In questo corso useremo sempre pnpm . Gli altri li vediamo solo per sapere che esistono e per riconoscerli quando li incontrerai in altri progetti. Quando lavori con JavaScript moderno non scrivi tutto da zero. Usi librerie e strumenti esterni, chiamati pacchetti . Un package manager serve proprio a scaricare quei pacchetti, salvarli nel progetto e tenerne traccia nel file package.json . I nomi principali da conoscere sono quattro: npm — è il package manager storico, installato insieme a Node. pnpm — è l'alternativa che useremo: è veloce, ordinata ed efficiente nello spazio su disco. yarn — è un'alternativa a npm, molto diffusa in tanti progetti esistenti. npx — non installa pacchetti nel progetto: serve a eseguire comandi forniti da un pacchetto. npm, yarn e pnpm fanno quindi la stessa grande famiglia di operazioni: installano dipendenze e gestiscono il progetto. npx invece serve soprattutto a lanciare comandi una tantum, per esempio quelli che creano la struttura iniziale di un'app. Dato che useremo pnpm, è utile sapere anche come installarlo globalmente. Un'installazione globale significa che quel comando diventa disponibile in tutto il sistema, non solo dentro una singola cartella di progetto. Su Windows può capitare che PowerShell blocchi l'esecuzione degli script. In quel caso bisogna cambiare la Execution Policy, ad esempio con Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser . Su macOS e Linux, invece, alcuni comandi globali richiedono sudo . sudo significa "superuser do" e permette di eseguire un comando con privilegi di amministratore. Esempio # installare pnpm globalmente con npm npm install -g pnpm # verificare la versione installata pnpm --version # Windows PowerShell, se gli script sono bloccati Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser # macOS / Linux, se servono privilegi di amministratore sudo npm install -g pnpm

### Inizializzare un progetto
package.json è il file che descrive un progetto: nome, versione, script e dipendenze. Può essere creato con npm init oppure con pnpm init . Ogni progetto parte dalla creazione della cartella e del file package.json . Questo file è il punto centrale del progetto: contiene le informazioni principali e viene letto dai package manager per sapere come deve essere gestito il progetto. Con npm init oppure pnpm init si avvia una piccola procedura guidata che crea il file. In alternativa, in alcuni casi si possono usare opzioni automatiche, ma all'inizio è più utile vedere il file nascere in modo esplicito. Quando poi installerai i pacchetti o aggiungerai gli script, sarà proprio package.json ad aggiornarsi. Esempio pnpm init # oppure npm init { "name": "lezione", "version": "1.0.0", "description": "", "main": "app.js", "scripts": { "start": "node app.js", "test": "echo \"Error: no test specified\" && exit 1" }, "type": "module", "keywords": [], "author": "", "license": "ISC", "packageManager": "pnpm@10.26.1", "dependencies": {} }

### La chiave scripts
La chiave scripts del file package.json contiene comandi riutilizzabili con un nome breve. Con pnpm run nome-script esegui il comando associato, senza doverlo riscrivere ogni volta nel terminale. Dentro package.json la chiave scripts è un oggetto che contiene coppie nome: comando . Il nome è quello che scriverai nel terminale, il comando è l'istruzione reale che verrà eseguita. Questo permette di standardizzare il progetto. Invece di ricordare ogni volta se il file si chiama app.js , o se il comando è lungo, basta usare uno script con un nome semplice come start o dev . Uno script molto utile in fase di sviluppo usa il flag --watch . Quando Node viene avviato con node --watch app.js , rimane in ascolto e riavvia automaticamente il file ogni volta che lo salvi. Questo evita di fermare e rilanciare il programma manualmente a ogni modifica. Esempio { "name": "mio-progetto", "version": "1.0.0", "main": "app.js", "scripts": { "start": "node app.js", "dev": "node --watch app.js" } } pnpm run start pnpm run dev

### Dipendenze
dependencies contiene i pacchetti necessari al funzionamento del progetto. devDependencies contiene i pacchetti utili solo durante lo sviluppo, come tool, bundler, linter o strumenti di build. Nel file package.json non tutti i pacchetti hanno lo stesso ruolo. Alcuni servono davvero all'app per funzionare, altri servono solo a chi sviluppa il progetto. La chiave dependencies raccoglie i pacchetti usati direttamente dal progetto. Se l'app ha bisogno di React per funzionare, React va qui. La chiave devDependencies raccoglie invece strumenti di supporto: per esempio Vite, ESLint, Prettier o altri tool che aiutano a sviluppare ma che non fanno parte della logica dell'app. Con pnpm la differenza si vede anche nei comandi: pnpm add nome-pacchetto salva il pacchetto in dependencies , mentre pnpm add -D nome-pacchetto lo salva in devDependencies . Nel progetto troverai anche il lockfile. Con pnpm si chiama pnpm-lock.yaml ; con npm il file equivalente è package-lock.json . Il suo compito è bloccare le versioni esatte installate, così tutti usano lo stesso ambiente. Esempio pnpm add react pnpm add -D vite { "name": "mio-progetto", "version": "1.0.0", "main": "app.js", "scripts": { "start": "node app.js", "dev": "node --watch app.js" }, "dependencies": { "react": "^19.1.0" }, "devDependencies": { "vite": "^7.0.0" } }

```javascript
// app.js
console.log('Ciao da Node');
```

```bash
node app.js
# Output: Ciao da Node
```

```javascript
// app.js
console.log('Luca');
```

```bash
node app.js
```

```javascript
// app.js
const nome = process.argv[2];

console.log('Ciao ' + nome);
```
