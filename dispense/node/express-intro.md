# Introduzione a Express

**Argomento:** Node | **Data Lezione:** 2026-09-07 | **File Sorgente:** lezioni/express-intro.html

## Panoramica
Il backend è la parte dell'applicazione che gestisce dati, regole e operazioni non affidate al browser. L'API è il canale con cui client e backend comunicano. Il frontend mostra pagine, pulsanti e form. Il backend lavora dietro le quinte: può leggere e salvare dati nel database, verificare credenzia...

### L'obiettivo: costruire API
Il backend è la parte dell'applicazione che gestisce dati, regole e operazioni non affidate al browser. L'API è il canale con cui client e backend comunicano. Il frontend mostra pagine, pulsanti e form. Il backend lavora dietro le quinte: può leggere e salvare dati nel database, verificare credenziali e permessi, applicare regole come prezzi e sconti, inviare email e gestire gli errori. Le API non sono quindi tutto il backend: sono l'interfaccia che permette al frontend di usare queste funzionalità. Per esempio, una pagina React chiede le pizze con GET /api/pizze . Il server Express riceve la richiesta, recupera o prepara i dati e invia una risposta JSON. Il frontend usa quei dati per costruire l'interfaccia. Frontend React / client HTTP | | GET http://localhost:3000/api/pizze v Server Express (backend) | | esegue la logica e prepara i dati v Risposta HTTP: JSON con le pizze | v Frontend: mostra i dati nella pagina In questa lezione i dati saranno scritti direttamente in server.js . Il flusso rimane: richiesta → logica del backend → risposta . Express è il framework Node.js che ci aiuta ad avviare il server e definire le rotte, cioè combinazioni di metodo HTTP e percorso come GET /api/pizze .

### Installare e configurare Express
Creiamo una cartella di progetto, inizializziamo package.json con pnpm e installiamo Express. Useremo gli ES Modules , cioè la sintassi moderna import / export già usata nei progetti front-end. mkdir express-intro cd express-intro pnpm init pnpm add express Crea un file server.js e aggiungi lo script start al package.json . { "type": "module", "scripts": { "start": "node --watch server.js" } } La proprietà "type": "module" informa Node che i file .js del progetto devono essere interpretati come ES Modules. Senza questa impostazione Node si aspetterebbe CommonJS e non accetterebbe import express from 'express' . Nel comando node --watch server.js , il flag --watch chiede a Node di tenere sotto osservazione i file usati dal programma. Quando salvi una modifica a server.js o a un file importato da esso, Node termina il processo precedente e lo avvia di nuovo automaticamente. È utile durante lo sviluppo perché permette di vedere le modifiche senza interrompere manualmente il server e rieseguire pnpm start . Esercizio Crea il progetto, installa Express con pnpm add express e aggiungi lo script start . Mostra soluzione pnpm init pnpm add express

### Avviare un server e creare una rotta
Una porta identifica il programma che deve ricevere la richiesta sul nostro computer; useremo 3000 . Con app.get() definiamo una rotta per richieste GET. // server.js import express from 'express'; const app = express(); const port = 3000; app.get('/', (req, res) => { res.send('Hello World!'); }); app.listen(port, () => { console.log('Server in ascolto su http://localhost:' + port); }); pnpm start Con il server avviato apri http://localhost:3000 . Per fermarlo premi Ctrl + C . L'opzione --watch osserva i file del progetto e riavvia automaticamente il server quando salvi una modifica: non serve fermare e rilanciare il comando a ogni cambiamento. app.get('/chi-siamo', (req, res) => { res.send('Pagina chi siamo'); }); app.get('/contatti', (req, res) => { res.send('Pagina contatti'); });

### Request, response e risposte
La funzione di una rotta riceve due oggetti: req contiene le informazioni della richiesta; res contiene i metodi per costruire e inviare la risposta. Possiamo temporaneamente scrivere console.log(res) per osservare l'oggetto response: l'output è molto grande, ma ci basta sapere che è lo strumento con cui rispondiamo al client. HTML: res.type() e res.send() app.get('/', (req, res) => { res.type('html').send('<h1>Titolo di una pagina HTML!</h1>'); }); JSON: res.type() e res.send() app.get('/api/persona', (req, res) => { const person = { name: 'Ted', lastname: 'Lasso' }; res.type('json').send(person); }); res.json() : la scelta più chiara per le API res.json() converte il dato in JSON e imposta il tipo corretto. Per una risposta API è il metodo che preferiremo. app.get('/api/persona', (req, res) => { const person = { name: 'Ted', lastname: 'Lasso' }; res.json(person); }); Esercizio Crea /api/film-preferito . La rotta deve rispondere con title , year e genre . Mostra soluzione app.get('/api/film-preferito', (req, res) => { res.json({ title: 'La città incantata', year: 2001, genre: 'Animazione' }); });

### Testare le API con un client HTTP
Il browser è utile per visitare HTML, ma per verificare le API usiamo un client HTTP , come Postman o LiteClient. Postman: scegli il metodo HTTP (per ora GET ), inserisci l'URL e premi Send . LiteClient: estensione per l'IDE; cercala come liteclienthq.liteclient nel pannello delle estensioni. Prova GET http://localhost:3000/api/persona . Controlla corpo, status e header. Se la risposta è HTML, usa il tab Preview di Postman. Una rotta backend va testata con un client HTTP anche se risponde con HTML: così verifichiamo l'API indipendentemente dal frontend.

### Rendere accessibili gli asset statici
Un asset statico è un file che il server consegna così com'è, senza calcoli: immagini, CSS, JavaScript o font. Questi file non sono una risposta API e non rappresentano la pagina del frontend: sono risorse che il frontend potrà richiedere e usare nella propria interfaccia. express-intro/ ├── public/imgs/boolean.jpg ├── package.json └── server.js Aggiungi questa riga prima delle rotte: abilita la cartella public ; i file sono disponibili senza scrivere public nell'URL. app.use(express.static('public')); Con questa configurazione Express consegna il file quando un client richiede il suo percorso. Per esempio, GET http://localhost:3000/imgs/boolean.jpg restituisce direttamente il file immagine. Il frontend potrà poi visualizzarlo usando quell'URL nel proprio codice. Non scriviamo HTML in server.js : in un'applicazione con frontend separato, Express espone dati e file; il frontend decide come visualizzarli.

### Leggere dati dalla request
La query string aggiunge informazioni all'URL dopo ? . I valori sono coppie chiave=valore , separate da & . http://tuosito.com/ricerca?termine=javascript&pagina=2 Express raccoglie questi valori in req.query . Arrivano come stringhe: se serve un numero, usa Number() . app.get('/ricerca', (req, res) => { const termine = req.query.termine; const pagina = req.query.pagina; res.send('Stai cercando: ' + termine + ', pagina: ' + pagina); }); Live coding: Express Pizzeria Crea /api/pizze , che restituisce un array, e /ricerca-pizze , che legge termine dalla query string. Mostra soluzione const pizze = [ { id: 1, nome: 'Margherita' }, { id: 2, nome: 'Diavola' }, { id: 3, nome: 'Quattro formaggi' } ]; app.get('/api/pizze', (req, res) => { res.json(pizze); }); app.get('/ricerca-pizze', (req, res) => { res.send('Stai cercando pizze con: ' + req.query.termine); });

```text
Frontend React / client HTTP
        |
        | GET http://localhost:3000/api/pizze
        v
Server Express (backend)
        |
        | esegue la logica e prepara i dati
        v
Risposta HTTP: JSON con le pizze
        |
        v
Frontend: mostra i dati nella pagina
```

```bash
mkdir express-intro
cd express-intro
pnpm init
pnpm add express
```

```json
{
  "type": "module",
  "scripts": {
    "start": "node --watch server.js"
  }
}
```

```bash
pnpm init
pnpm add express
```

```javascript
// server.js
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('Server in ascolto su http://localhost:' + port);
});
```
