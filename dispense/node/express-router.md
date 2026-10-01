# Routing e Router in Express

**Argomento:** Node | **Data Lezione:** 2026-09-10 | **File Sorgente:** lezioni/express-router.html

## Panoramica
Il routing è il sistema di instradamento di Express: a ogni combinazione di metodo HTTP e percorso corrisponde una funzione che prepara la risposta. Una rotta non è soltanto un URL. GET /pizzas e POST /pizzas hanno lo stesso percorso, ma sono due richieste diverse e possono svolgere due operazioni d...

### Routing: dare una destinazione a ogni richiesta
Il routing è il sistema di instradamento di Express: a ogni combinazione di metodo HTTP e percorso corrisponde una funzione che prepara la risposta. Una rotta non è soltanto un URL. GET /pizzas e POST /pizzas hanno lo stesso percorso, ma sono due richieste diverse e possono svolgere due operazioni diverse. // metodo HTTP + percorso + funzione da eseguire app.get('/pizzas', (req, res) => { res.send('Lista delle pizze'); }); app.post('/pizzas', (req, res) => { res.send('Creazione di una nuova pizza'); }); Quando arriva una richiesta, Express controlla le rotte nell'ordine in cui sono state dichiarate. Se trova metodo e percorso corrispondenti, esegue la funzione associata. Se nessuna rotta corrisponde, Express non sa come rispondere e il client riceve un errore 404 Not Found . Per questo ogni endpoint va scritto con attenzione e testato: una piccola differenza nel percorso o nel metodo HTTP rende la richiesta diversa. Esercizio Aggiungi le rotte GET /chi-siamo e GET /contatti . Devono rispondere con un messaggio testuale. Mostra soluzione app.get('/chi-siamo', (req, res) => { res.send('Pagina chi siamo'); }); app.get('/contatti', (req, res) => { res.send('Pagina contatti'); });

### Parametri dinamici
Un parametro dinamico è una parte variabile del percorso. Si scrive con i due punti, per esempio :id . Express raccoglie il valore nell'oggetto req.params . GET /products/7 └─ valore del parametro id app.get('/products/:id', (req, res) => { console.log(req.params.id); res.send(`Hai richiesto il prodotto con id ${req.params.id}`); }); Visitando /products/7 , req.params.id vale '7' . Per ora non cerchiamo il prodotto in un array: ci interessa riconoscere come il client può indicare una risorsa specifica nell'URL. I parametri sono sempre ricevuti come testo. Quando in seguito confronteremo un id con un numero presente in un array o nel database, potremo convertirlo con Number(req.params.id) . Una rotta con parametro, come /pizzas/:id , va dichiarata dopo la rotta più generale /pizzas . Esercizio Crea GET /utenti/:id . Rispondi con il messaggio Dettagli utente X , sostituendo X con il parametro ricevuto. Mostra soluzione app.get('/utenti/:id', (req, res) => { res.send('Dettagli utente ' + req.params.id); });

### Risorse e operazioni CRUD
In un'API una risorsa è un insieme di dati dello stesso tipo: pizze, post, utenti o prodotti. Le operazioni fondamentali che compiamo sulle risorse sono dette CRUD : Create: creare una nuova risorsa. Read: leggere una o più risorse. Update: modificare una risorsa esistente. Delete: eliminare una risorsa. Per ogni operazione scegliamo una combinazione precisa tra endpoint e metodo HTTP. Non stiamo ancora salvando dati: ogni rotta risponde soltanto con un testo che descrive il suo intento. I nomi index , show , store , update e destroy sono convenzioni molto diffuse. Impararle ora rende più semplice leggere API e progetti altrui, perché la responsabilità di ogni rotta è immediatamente riconoscibile. // Rotte CRUD per la risorsa pizzas // index: tutte le pizze app.get('/pizzas', (req, res) => res.send('Lista delle pizze')); // show: una pizza specifica app.get('/pizzas/:id', (req, res) => res.send('Dettagli della pizza ' + req.params.id)); // store: nuova pizza app.post('/pizzas', (req, res) => res.send('Creazione nuova pizza')); // update: modifica integrale app.put('/pizzas/:id', (req, res) => res.send('Modifica integrale della pizza ' + req.params.id)); // modify: modifica parziale app.patch('/pizzas/:id', (req, res) => res.send('Modifica parziale della pizza ' + req.params.id)); // destroy: eliminazione app.delete('/pizzas/:id', (req, res) => res.send('Eliminazione della pizza ' + req.params.id));

### Convenzioni REST
REST è un insieme di convenzioni per rendere le API prevedibili. Usiamo il nome della risorsa al plurale nel percorso e il metodo HTTP per esprimere l'azione. Operazione Metodo Endpoint Significato Index GET /pizzas Legge tutte le pizze Show GET /pizzas/:id Legge una pizza Store POST /pizzas Crea una pizza Update PUT /pizzas/:id Sostituisce una pizza Modify PATCH /pizzas/:id Modifica alcuni campi Destroy DELETE /pizzas/:id Elimina una pizza Evitiamo endpoint con verbi come /get-pizzas o /delete-pizza/3 : il metodo HTTP comunica già l'azione. L'endpoint identifica la risorsa. PUT indica la sostituzione completa della risorsa, mentre PATCH viene usato quando aggiorniamo solo alcuni campi. In questa lezione entrambe le rotte rispondono con un testo; più avanti riceveranno i dati della richiesta e modificheranno davvero la risorsa. Prova tutte le rotte con Postman o LiteClient. Per le richieste diverse da GET , seleziona prima il metodo corretto, poi inserisci l'URL e invia la richiesta.

### Separare le rotte con Express Router
Quando il progetto cresce, mantenere tutte le rotte in server.js rende l'entry point lungo e difficile da leggere. Un router è un file dedicato che raggruppa le rotte di una risorsa. express-pizzeria/ ├── routers/ │ └── pizzas.js └── server.js 1. Creare il router delle pizze Nel router usiamo router al posto di app . Il prefisso /pizzas non è più scritto nelle singole rotte: verrà aggiunto nel file principale. // routers/pizzas.js import express from 'express'; const router = express.Router(); router.get('/', (req, res) => res.send('Lista delle pizze')); router.get('/:id', (req, res) => res.send('Dettagli della pizza ' + req.params.id)); router.post('/', (req, res) => res.send('Creazione nuova pizza')); router.put('/:id', (req, res) => res.send('Modifica integrale della pizza ' + req.params.id)); router.patch('/:id', (req, res) => res.send('Modifica parziale della pizza ' + req.params.id)); router.delete('/:id', (req, res) => res.send('Eliminazione della pizza ' + req.params.id)); export default router; 2. Registrare il router in server.js Importiamo il router e lo montiamo con app.use() . La richiesta finale combina il prefisso e il percorso del router: /pizzas + /:id diventa /pizzas/:id . Il file server.js resta così dedicato alla configurazione generale dell'applicazione: avvio del server, middleware e registrazione dei router. Ogni nuova risorsa potrà avere il suo file, per esempio posts.js , users.js o products.js . // server.js import express from 'express'; import pizzasRouter from './routers/pizzas.js'; const app = express(); const port = 3000; app.get('/', (req, res) => { res.send('Server della mia pizzeria'); }); app.use('/pizzas', pizzasRouter); app.listen(port, () => { console.log(`Server in ascolto su http://localhost:${port}`); }); Esercizio Crea routers/posts.js e sposta al suo interno le rotte GET /posts e GET /posts/:id . Registra il router con app.use('/posts', postsRouter) . Mostra soluzione // routers/posts.js import express from 'express'; const router = express.Router(); router.get('/', (req, res) => res.send('Lista dei post')); router.get('/:id', (req, res) => res.send('Dettagli del post ' + req.params.id)); export default router; // server.js import postsRouter from './routers/posts.js'; app.use('/posts', postsRouter);

```javascript
// metodo HTTP + percorso + funzione da eseguire
app.get('/pizzas', (req, res) => {
  res.send('Lista delle pizze');
});

app.post('/pizzas', (req, res) => {
  res.send('Creazione di una nuova pizza');
});
```

```javascript
app.get('/chi-siamo', (req, res) => {
  res.send('Pagina chi siamo');
});

app.get('/contatti', (req, res) => {
  res.send('Pagina contatti');
});
```

```text
GET /products/7
             └─ valore del parametro id
```

```javascript
app.get('/products/:id', (req, res) => {
  console.log(req.params.id);
  res.send(`Hai richiesto il prodotto con id ${req.params.id}`);
});
```

```javascript
app.get('/utenti/:id', (req, res) => {
  res.send('Dettagli utente ' + req.params.id);
});
```
