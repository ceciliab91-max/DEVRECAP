# Middleware in Express

**Argomento:** Node | **Data Lezione:** 2026-09-12 | **File Sorgente:** lezioni/express-middleware.html

## Panoramica
Un file di environment ( .env ) contiene le variabili di configurazione del progetto: porte, credenziali, chiavi API e altri valori che cambiano tra sviluppo e produzione. Si tengono fuori dal codice per non scriverli direttamente nei file JavaScript e per non pubblicarli su GitHub. SERVER_PORT="300...

### Variabili d'ambiente con dotenv
Un file di environment ( .env ) contiene le variabili di configurazione del progetto: porte, credenziali, chiavi API e altri valori che cambiano tra sviluppo e produzione. Si tengono fuori dal codice per non scriverli direttamente nei file JavaScript e per non pubblicarli su GitHub. SERVER_PORT="3000" Il file va creato nella cartella principale del progetto, accanto a server.js e package.json . express-app/ ├── .env ├── package.json └── server.js Oltre al flag --env-file di Node, possiamo usare il package dotenv , che legge il file .env e popola process.env non appena viene importato. pnpm add dotenv import 'dotenv/config'; const port = process.env.SERVER_PORT || 3000; app.listen(port, () => { console.log(`Server in ascolto su http://localhost:${port}`); }); L'import 'dotenv/config' va messo prima di ogni altro codice che legge process.env , così le variabili sono già disponibili quando servono. Non pubblicare mai il file .env su GitHub: aggiungilo al .gitignore .

### Che cos'è un middleware
Un middleware è una funzione eseguita tra l'arrivo della richiesta e la risposta finale. Può leggere o modificare req e res , terminare la richiesta oppure passarla alla funzione successiva. In Express una richiesta attraversa una sequenza di funzioni. Una rotta è anch'essa parte di questa sequenza: normalmente è l'ultima funzione e invia la risposta. Client │ richiesta HTTP ▼ middleware 1 → middleware 2 → rotta → risposta │ └→ middleware di errore (se qualcosa va storto) Un middleware normale riceve tre argomenti: req , res e next . Chiama next() quando il suo lavoro è terminato e vuole lasciare proseguire la richiesta. function saluta(req, res, next) { console.log('Richiesta ricevuta per:', req.path); next(); } app.use(saluta); app.get('/', (req, res) => { res.send('Ciao!'); }); Se dimentichiamo next() e non inviamo una risposta, la richiesta resta in attesa. Se invece il middleware risponde con res.send() , res.json() o simili, la catena termina e non deve chiamare next() . Esercizio Crea un middleware logMethod che stampi nella console il metodo HTTP e il percorso, per esempio GET /products . Registralo per tutta l'app. Mostra soluzione function logMethod(req, res, next) { console.log(req.method, req.path); next(); } app.use(logMethod);

### Middleware già inclusi in Express
Abbiamo già usato middleware senza chiamarli così. Le funzioni express.static() ed express.json() restituiscono middleware che registriamo con app.use() . Asset statici express.static('public') controlla se la richiesta corrisponde a un file nella cartella public . Se lo trova, invia il file; se non lo trova, lascia proseguire la richiesta. app.use(express.static('public')); // GET /images/logo.png → invia public/images/logo.png Body parser JSON Il body di una richiesta arriva come dati grezzi. express.json() legge i body con Content-Type: application/json , li trasforma in un oggetto JavaScript e lo salva in req.body . app.use(express.json()); app.post('/products', (req, res) => { console.log(req.body); // { name: 'Tastiera', price: 59.9 } res.status(201).json(req.body); }); express.json() va registrato prima delle rotte che usano req.body . L'ordine di app.use() e delle rotte conta sempre. POST http://localhost:3000/products Content-Type: application/json { "name": "Tastiera", "price": 59.9 }

### Creare e registrare un middleware
Possiamo registrare un middleware per ogni richiesta con app.use() , per un gruppo di URL con un prefisso, oppure soltanto su una o più rotte. function richiedeToken(req, res, next) { const token = req.headers.authorization; if (token !== 'Bearer segreto') { return res.status(401).json({ error: 'Token non valido' }); } next(); } // Solo questa rotta è protetta app.get('/admin', richiedeToken, (req, res) => { res.json({ message: 'Area riservata' }); }); // Lo stesso middleware su più rotte app.post('/products', richiedeToken, creaProdotto); app.delete('/products/:id', richiedeToken, eliminaProdotto); Quando la condizione non è rispettata, il middleware invia 401 Unauthorized e usa return : così la funzione finisce e la rotta protetta non viene eseguita. Per applicarlo a tutte le richieste che iniziano con /admin , montiamolo con un prefisso. app.use('/admin', richiedeToken); app.get('/admin/dashboard', (req, res) => { res.send('Dashboard'); }); app.get('/admin/users', (req, res) => { res.send('Gestione utenti'); }); Esercizio Crea un middleware controllaEmail per la rotta POST /newsletter . Deve rispondere con 400 se req.body.email non è presente; altrimenti deve aggiungere req.body.email a req.email e lasciare proseguire la rotta. Mostra soluzione function controllaEmail(req, res, next) { if (!req.body.email) { return res.status(400).json({ error: 'Email obbligatoria' }); } req.email = req.body.email; next(); } app.post('/newsletter', controllaEmail, (req, res) => { res.json({ message: `Iscrizione completata per ${req.email}` }); });

### Intercettare gli errori
Quando un middleware o una rotta incontra un problema, chiama next(error) . Express salta i middleware normali successivi e cerca un middleware di gestione errori. Un error handler si riconosce dai quattro parametri, nell'ordine esatto: err, req, res, next . Anche se non usiamo next , deve essere presente nella firma. app.get('/divisione', (req, res, next) => { const divisore = Number(req.query.divisore); if (!divisore) { return next(new Error('Il divisore deve essere diverso da zero')); } res.json({ risultato: 100 / divisore }); }); // Va dichiarato dopo le rotte e gli altri middleware normali. app.use((err, req, res, next) => { console.error(err.message); res.status(500).json({ error: 'Errore interno del server' }); }); Al client non inviamo dettagli tecnici come stack trace, password o query al database. Li registriamo sul server con console.error() , mentre restituiamo un messaggio generico e uno status appropriato. Con le route async , gli errori generati da un await devono arrivare a next(error) . Il modo più esplicito per iniziare è usare try / catch . app.get('/products/:id', async (req, res, next) => { try { const product = await trovaProdotto(req.params.id); res.json(product); } catch (error) { next(error); } });

### Gestire le rotte inesistenti: 404
Il middleware 404 non è un error handler: riceve tre parametri perché interviene quando nessuna rotta precedente ha inviato una risposta. Per questo deve stare dopo tutte le rotte valide . app.get('/products', (req, res) => { res.json([]); }); // Ultimo middleware normale: intercetta tutto ciò che non ha trovato una rotta. app.use((req, res) => { res.status(404).json({ error: 'Risorsa non trovata', path: req.originalUrl, }); }); L'ordine completo dell'applicazione è quindi: configurazione, middleware generali, rotte, middleware 404 e infine error handler. import express from 'express'; const app = express(); const port = 3000; app.use(express.static('public')); app.use(express.json()); function logger(req, res, next) { console.log(`${req.method} ${req.originalUrl}`); next(); } app.use(logger); app.get('/api/products', (req, res) => { res.json([{ id: 1, name: 'Tastiera' }]); }); app.use((req, res) => { res.status(404).json({ error: 'Rotta non trovata' }); }); app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: 'Errore interno del server' }); }); app.listen(port, () => { console.log(`Server in ascolto su http://localhost:${port}`); }); Esercizio Aggiungi una risposta 404 JSON alla tua API. Verifica con Postman GET /una-rotta-che-non-esiste : deve restituire status 404 e un oggetto con la proprietà error .

```bash
SERVER_PORT="3000"
```

```text
express-app/
├── .env
├── package.json
└── server.js
```

```bash
pnpm add dotenv
```

```javascript
import 'dotenv/config';

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
```

```text
Client
  │ richiesta HTTP
  ▼
middleware 1 → middleware 2 → rotta → risposta
                         │
                         └→ middleware di errore (se qualcosa va storto)
```
