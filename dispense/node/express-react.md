# Express e React: API in locale

**Argomento:** Node | **Data Lezione:** 2026-09-28 | **File Sorgente:** lezioni/express-react.html

## Panoramica
Backend e frontend sono due progetti diversi, ciascuno con il proprio package.json e le proprie dipendenze. Invece di tenerli in due cartelle sparse, li mettiamo dentro un'unica cartella principale: un workspace (spesso chiamato anche monorepo ). Un workspace è una cartella che contiene più progetti...

### Preparare il progetto: un workspace pnpm
Backend e frontend sono due progetti diversi, ciascuno con il proprio package.json e le proprie dipendenze. Invece di tenerli in due cartelle sparse, li mettiamo dentro un'unica cartella principale: un workspace (spesso chiamato anche monorepo ). Un workspace è una cartella che contiene più progetti gestiti insieme da pnpm. Ogni progetto resta indipendente, ma possiamo installare le dipendenze e avviare tutto dalla cartella principale. catalogo/ ├── package.json ← script che avviano backend e frontend ├── pnpm-workspace.yaml ← elenca i progetti del workspace ├── pnpm-lock.yaml ← un solo lockfile per tutto il workspace ├── backend/ ← API Express (porta 3000) │ ├── package.json │ ├── server.js │ ├── routers/ │ │ └── productsRouter.js │ └── data/ │ └── db-store-completo.js └── frontend/ ← React + Vite (porta 5173) ├── package.json └── src/ ├── main.jsx └── App.jsx Creare la struttura Creiamo la cartella principale e il progetto Express nella sottocartella backend . mkdir catalogo cd catalogo pnpm init mkdir backend cd backend pnpm init cd .. Sempre dalla cartella catalogo creiamo il progetto React con Vite nella sottocartella frontend . pnpm create vite frontend --template react Dire a pnpm quali progetti fanno parte del workspace Nella cartella principale crea il file pnpm-workspace.yaml . Ogni voce di packages è una cartella che contiene un progetto. # catalogo/pnpm-workspace.yaml packages: - backend - frontend Poi, sempre dalla cartella principale, installa le dipendenze di tutti i progetti con un solo comando. pnpm install pnpm crea un solo pnpm-lock.yaml nella cartella principale, ma ogni progetto vede solo le proprie dipendenze: in frontend/node_modules ci sono React e Vite, in backend/node_modules ci saranno Express e cors. Aggiungere una dipendenza Per installare un package entra nella cartella del progetto che lo usa e usa pnpm add , come hai sempre fatto. Installiamo così le dipendenze del backend. cd backend pnpm add express cors cd .. Se lanci pnpm add dalla cartella principale, pnpm si ferma con l'errore ERR_PNPM_ADDING_TO_ROOT : ti protegge dall'installare il package nel posto sbagliato. In alternativa puoi restare nella cartella principale e scrivere pnpm --filter backend add nome-package .

### Gli script: avviare backend e frontend
Nel package.json del backend controlla che ci sia "type": "module" , che permette di usare import , e aggiungi gli script start e dev . Il frontend creato con Vite ha già il suo script dev . // catalogo/backend/package.json { "name": "backend", "type": "module", "scripts": { "start": "node server.js", "dev": "node --watch server.js" } } start avvia il server una volta; dev lo riavvia da solo ogni volta che salviamo un file. Avviare un solo progetto: --filter Dalla cartella principale possiamo lanciare lo script di un progetto preciso con --filter , seguito dal name scritto nel suo package.json . Salviamo questi comandi come script della root. // catalogo/package.json { "name": "catalogo", "type": "module", "scripts": { "back:dev": "pnpm --filter backend dev", "front:dev": "pnpm --filter frontend dev" } } pnpm back:dev # solo Express pnpm front:dev # solo React Così servono due terminali, uno per server. Proviamo ad avviarli insieme. Avviare tutto: prima versione con & Nel terminale & avvia un comando in background e passa subito al successivo: i due server partono insieme. "all:dev_alt": "pnpm back:dev & pnpm front:dev" Funziona, ma è una soluzione fragile: & non esiste allo stesso modo su tutti i sistemi (su Windows con cmd non funziona) e, quando premi Ctrl + C , il processo in background può rimanere acceso e tenere occupata la porta 3000. Avviare tutto: la versione di pnpm pnpm sa già avviare lo stesso script in tutti i progetti del workspace. "all:dev": "pnpm --parallel -r dev" -r (recursive) esegue lo script dev in ogni progetto del workspace; --parallel li avvia contemporaneamente . Basta un solo terminale nella cartella principale: pnpm all:dev backend dev: Server running on port 3000 frontend dev: VITE ready frontend dev: ➜ Local: http://localhost:5173/ Ogni riga del terminale è preceduta dal nome del progetto che l'ha scritta. Con Ctrl + C fermi entrambi i server. Il package.json è JSON e non ammette commenti: per spiegare a cosa serve ogni script, scriviamo una tabella nel README.md della cartella principale.

### Due progetti, una comunicazione
Express è il backend : espone API e restituisce dati. React è il frontend : chiede quei dati e costruisce l'interfaccia che l'utente vede. Anche se stanno nello stesso workspace, i due progetti funzionano come due server separati. Vite avvia React su http://localhost:5173 ; Express avvia l'API su http://localhost:3000 . Browser │ │ apre React: http://localhost:5173 ▼ Frontend React │ │ fetch('http://localhost:3000/products') ▼ API Express │ ▼ Risposta JSON Il frontend non legge direttamente i dati e non importa file del backend. Chiede i dati all'API Express con fetch() . Express può poi leggere MySQL, usare Prisma oppure, come oggi, restituire dati salvati in un file del server.

### L'API dei prodotti
I dati Al posto del database usiamo un file JavaScript con 1000 prodotti: scarica db-store-completo.js e salvalo in backend/data/ . Ogni prodotto ha questa forma: // backend/data/db-store-completo.js const db = [ { id: 1, name: "Mouse Opale Air 5", descrizione: "Il Mouse Opale Air 5 nasce per chi vuole precisione assoluta...", price: 30.99 }, // ...altri 999 prodotti ]; export default db; Il router dei prodotti Come nelle lezioni su Express, le rotte di una risorsa stanno in un router dedicato. Il nome dell'import ( products ) lo scegliamo noi: l' export default si può importare con qualsiasi nome. // backend/routers/productsRouter.js import { Router } from 'express'; import products from '../data/db-store-completo.js'; const router = Router(); router.get('/', (req, res) => { res.json({ success: true, message: '', data: products }); }); export default router; La risposta non è l'array da solo, ma un oggetto con sempre la stessa forma: success : dice subito al frontend se l'operazione è andata a buon fine; message : un testo da mostrare all'utente, utile soprattutto in caso di errore; data : i dati veri e propri, qui l'array dei prodotti. Se tutte le rotte rispondono così, il frontend sa sempre dove trovare dati ed errori. Il server e CORS Le porte 5173 e 3000 sono origini diverse . Per sicurezza, il browser non permette a una pagina di leggere la risposta di un'altra origine, a meno che il server non dia il permesso. CORS è la configurazione con cui Express autorizza il frontend a leggere le sue risposte. Il package cors l'abbiamo già installato: registriamolo prima delle rotte. // backend/server.js import express from 'express'; import cors from 'cors'; import productsRouter from './routers/productsRouter.js'; const app = express(); const port = 3000; app.use(cors()); app.use('/products', productsRouter); app.listen(port, (error) => { if (error) { console.error(error); } else { console.log(`Server running on port ${port}`); } }); app.use('/products', productsRouter) monta il router su /products : la rotta '/' del router risponde quindi a GET /products . In Express 5 la funzione passata a app.listen() riceve un eventuale error : per esempio, se la porta 3000 è già occupata lo stampiamo invece di scrivere "Server running". Per la lezione cors() permette le richieste da tutte le origini. In un progetto pubblicato specificheremo l'indirizzo del frontend autorizzato. Prima di scrivere codice React, controlla nel browser o in Postman che GET http://localhost:3000/products restituisca JSON. Postman non è un browser e non applica le regole CORS: se una richiesta funziona in Postman ma non in React, il problema è quasi sempre CORS.

### Chiedere i dati da React
Nel componente React usiamo useState per salvare i prodotti e useEffect per eseguire la richiesta quando il componente appare per la prima volta. L'indirizzo del server lo salviamo in una costante API_URL , così lo scriviamo una volta sola e aggiungiamo il percorso della risorsa quando serve. // frontend/src/App.jsx import { useState, useEffect } from 'react'; const API_URL = 'http://localhost:3000'; function App() { console.log('Render App'); const [products, setProducts] = useState([]); useEffect(() => { fetch(`${API_URL}/products`) .then((response) => response.json()) .then((jsonData) => setProducts(jsonData.data)); }, []); return <h1>My Store</h1>; } export default App; fetch() invia la richiesta. La prima funzione then() trasforma la risposta in JSON; la seconda riceve l'oggetto { success, message, data } e salva nello stato solo jsonData.data , cioè l'array. Quando chiamiamo setProducts() , React aggiorna il componente. L'array vuoto [] in useEffect indica che la richiesta deve partire una sola volta, dopo il primo render. Senza [] si creerebbe un ciclo infinito: fetch → setProducts() → nuovo render → nuova fetch … Quante volte si esegue il componente? Il console.log('Render App') ci mostra ogni esecuzione del componente. Nella Console ne vediamo due: la prima con l'array vuoto, la seconda dopo setProducts() , quando arrivano i dati. Con il main.jsx creato da Vite, invece, le stampe sono il doppio e nella scheda Network compaiono due richieste GET /products . Il motivo è <StrictMode> : in sviluppo esegue componenti ed effetti due volte per aiutarti a trovare bug. Per osservare il comportamento reale, nel progetto lo abbiamo tolto dal render() . // frontend/src/main.jsx import { createRoot } from 'react-dom/client'; import './index.css'; import App from './App.jsx'; createRoot(document.getElementById('root')).render( <App />, ); Per rimetterlo basta avvolgere il componente: render(<StrictMode><App /></StrictMode>) , con import { StrictMode } from 'react' . Togliere StrictMode non cambia nulla nella versione pubblicata, dove comunque non è attivo: nei progetti reali di solito si lascia, sapendo che in sviluppo la richiesta parte due volte. Se l'URL è sbagliato, il server Express è spento o CORS non è configurato, apri gli strumenti per sviluppatori del browser: nella Console e nella scheda Network trovi l'errore della richiesta.

### Mostrare i dati nell'interfaccia
Abbiamo già i dati nello stato. Usiamo map() per creare, per ogni prodotto, un titolo e un paragrafo con la descrizione. // frontend/src/App.jsx return ( <> <h1>My Store</h1> {products.map((product) => { return ( <> <h3>{product.name}</h3> <p>{product.descrizione}</p> </> ); })} </> ); La pagina inizialmente mostra solo il titolo; appena arriva la risposta dell'API, React mostra i 1000 prodotti. Per restituire due elementi senza aggiungere un <div> usiamo un fragment <>...</> . Il warning sulla key Nella Console compare un avviso: Each child in a list should have a unique "key" prop . Ogni elemento creato da map() ha bisogno di una key unica, ma alla forma breve <> non si possono passare attributi. Usiamo la forma estesa <Fragment> , importata da React, e diamo come key l' id del prodotto. import { useState, useEffect, Fragment } from 'react'; // ... {products.map((product) => ( <Fragment key={product.id}> <h3>{product.name}</h3> <p>{product.descrizione}</p> </Fragment> ))} Esercizio Sotto la descrizione mostra il prezzo di ogni prodotto, sempre con due decimali (per esempio € 30.99 , € 12.50 ). Suggerimento: il metodo dei numeri toFixed(2) restituisce una stringa con due decimali. Mostra soluzione {products.map((product) => ( <Fragment key={product.id}> <h3>{product.name}</h3> <p>{product.descrizione}</p> <p>€ {product.price.toFixed(2)}</p> </Fragment> ))}

```text
catalogo/
├── package.json              ← script che avviano backend e frontend
├── pnpm-workspace.yaml       ← elenca i progetti del workspace
├── pnpm-lock.yaml            ← un solo lockfile per tutto il workspace
├── backend/                  ← API Express (porta 3000)
│   ├── package.json
│   ├── server.js
│   ├── routers/
│   │   └── productsRouter.js
│   └── data/
│       └── db-store-completo.js
└── frontend/                 ← React + Vite (porta 5173)
    ├── package.json
    └── src/
        ├── main.jsx
        └── App.jsx
```

```bash
mkdir catalogo
cd catalogo
pnpm init

mkdir backend
cd backend
pnpm init
cd ..
```

```bash
pnpm create vite frontend --template react
```

```javascript
# catalogo/pnpm-workspace.yaml
packages:
  - backend
  - frontend
```

```bash
pnpm install
```
