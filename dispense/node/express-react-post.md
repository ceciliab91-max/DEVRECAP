# Express e React: gestire gli errori e inviare dati con POST

**Argomento:** Node | **Data Lezione:** 2026-10-01 | **File Sorgente:** lezioni/express-react-post.html

## Panoramica
Nella lezione precedente abbiamo creato il workspace catalogo , avviato con pnpm all:dev . Il backend risponde a GET /products con un oggetto di forma fissa: { "success": true, "message": "", "data": [ { "id": 1, "name": "Mouse Opale Air 5", "descrizione": "...", "price": 30.99 } ] } Il frontend lo ...

### Da dove partiamo
Nella lezione precedente abbiamo creato il workspace catalogo , avviato con pnpm all:dev . Il backend risponde a GET /products con un oggetto di forma fissa: { "success": true, "message": "", "data": [ { "id": 1, "name": "Mouse Opale Air 5", "descrizione": "...", "price": 30.99 } ] } Il frontend lo legge così: // frontend/src/App.jsx import { useState, useEffect, Fragment } from 'react'; const API_URL = 'http://localhost:3000'; function App() { const [products, setProducts] = useState([]); useEffect(() => { fetch(`${API_URL}/products`) .then((response) => response.json()) .then((jsonData) => setProducts(jsonData.data)); }, []); return ( <> <h1>My Store</h1> {products.map((product) => ( <Fragment key={product.id}> <h3>{product.name}</h3> <p>{product.descrizione}</p> <p>€ {product.price.toFixed(2)}</p> </Fragment> ))} </> ); } export default App; Questo codice funziona solo se tutto va bene. Oggi lo rendiamo più robusto e aggiungiamo la creazione di un prodotto.

### Gestire gli errori
Prova a spegnere il backend e ricarica la pagina: resta solo il titolo e nella Console compare un errore. L'utente non sa cosa sia successo. Aggiungiamo uno stato per mostrare un messaggio. const [error, setError] = useState(''); useEffect(() => { fetch(`${API_URL}/products`) .then((response) => { if (!response.ok) { throw new Error('Impossibile caricare i prodotti'); } return response.json(); }) .then((jsonData) => setProducts(jsonData.data)) .catch((err) => setError(err.message)); }, []); response.ok è true solo se lo status è tra 200 e 299: un 404 o un 500 non fanno fallire fetch() da soli, quindi lanciamo noi l'errore. Il catch() riceve sia questo errore sia quelli di rete, per esempio quando il server è spento. Il parametro si chiama err per non confonderlo con lo stato error . Nel JSX, sotto il titolo, mostriamo l'errore solo se c'è: {error && <p>{error}</p>} Usare il message del backend Le nostre risposte contengono già success e message . Quando il backend risponde con un errore, per esempio { success: false, message: 'Prodotto non trovato' } , il testo più utile da mostrare è proprio il suo message . fetch(`${API_URL}/products`) .then((response) => response.json()) .then((jsonData) => { if (!jsonData.success) { throw new Error(jsonData.message); } setProducts(jsonData.data); }) .catch((err) => setError(err.message)); Questo controllo funziona solo se tutte le rotte rispondono con la stessa forma { success, message, data } , anche in caso di errore: è il motivo per cui l'abbiamo scelta.

### POST: la rotta Express
Per creare un prodotto, React invia una richiesta POST con i dati nel body. Perché Express possa leggerli in req.body serve il middleware express.json() , registrato in server.js prima delle rotte. // backend/server.js app.use(cors()); app.use(express.json()); app.use('/products', productsRouter); Nel router aggiungiamo la rotta: legge req.body , controlla i dati, aggiunge il prodotto all'array e lo restituisce con lo status 201 Created . Anche gli errori rispondono con la solita forma. // backend/routers/productsRouter.js router.post('/', (req, res) => { const { name, descrizione, price } = req.body; if (!name || price === undefined) { return res.status(400).json({ success: false, message: 'Nome e prezzo sono obbligatori', data: null }); } const newProduct = { id: products.length + 1, name, descrizione, price }; products.push(newProduct); res.status(201).json({ success: true, message: 'Prodotto creato', data: newProduct }); }); Se mancano nome o prezzo rispondiamo con 400 Bad Request invece di creare un prodotto vuoto. Gli id del file vanno da 1 a 1000 senza buchi, quindi products.length + 1 dà un id libero. L'array vive nella memoria del server: quando node --watch riavvia Express dopo un salvataggio, i prodotti aggiunti spariscono e l'array torna quello del file. Per conservarli servirebbe un database. Prova la rotta con Postman: POST http://localhost:3000/products , body raw di tipo JSON. { "name": "Monitor Opale 27", "descrizione": "Monitor da 27 pollici", "price": 199.9 }

### POST: la richiesta da React
Nel frontend il body deve essere trasformato in JSON e deve avere l'header Content-Type . Quando arriva la risposta aggiungiamo il nuovo prodotto allo stato, così compare subito nella lista. // frontend/src/App.jsx, dentro il componente App function createProduct() { const product = { name: 'Monitor Opale 27', descrizione: 'Monitor da 27 pollici', price: 199.9 }; fetch(`${API_URL}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product), }) .then((response) => response.json()) .then((jsonData) => { if (!jsonData.success) { throw new Error(jsonData.message); } setProducts([...products, jsonData.data]); }) .catch((err) => setError(err.message)); } Colleghiamo la funzione a un pulsante nel JSX, sotto il titolo. <button onClick={createProduct}>Aggiungi prodotto</button> Con 1000 prodotti il nuovo finisce in fondo alla pagina: scorri fino alla fine per vederlo, oppure aggiungilo in cima con setProducts([jsonData.data, ...products]) . Nella scheda Network, prima della POST , vedrai una richiesta OPTIONS . Si chiama preflight : siccome inviamo JSON a un'altra origine, il browser chiede prima a Express il permesso. cors() risponde automaticamente e poi parte la POST vera. Esercizio Modifica temporaneamente createProduct() togliendo name dal prodotto inviato. Cosa vedi nella scheda Network e nella pagina? Mostra soluzione Nella scheda Network la POST ha status 400 e come risposta { success: false, message: 'Nome e prezzo sono obbligatori', data: null } . Il frontend lancia l'errore con quel message e lo mostra grazie allo stato error ; la lista non cambia.

### Ricaricare i prodotti
Esercizio Aggiungi un pulsante Ricarica prodotti . Al click deve richiedere di nuovo GET /products e aggiornare lo stato. Suggerimento: sposta la fetch di useEffect in una funzione loadProducts() dentro il componente, poi chiamala sia in useEffect sia al click del pulsante. Mostra soluzione function loadProducts() { fetch(`${API_URL}/products`) .then((response) => response.json()) .then((jsonData) => { if (!jsonData.success) { throw new Error(jsonData.message); } setProducts(jsonData.data); }) .catch((err) => setError(err.message)); } useEffect(() => { loadProducts(); }, []); // nel JSX <button onClick={loadProducts}>Ricarica prodotti</button> Aggiungi un prodotto, poi premi Ricarica prodotti : il prodotto c'è ancora, perché ora è salvato nell'array del server. Salva un file del backend e ricarica di nuovo: il riavvio di node --watch lo ha fatto sparire.

```json
{
  "success": true,
  "message": "",
  "data": [
    { "id": 1, "name": "Mouse Opale Air 5", "descrizione": "...", "price": 30.99 }
  ]
}
```

```jsx
// frontend/src/App.jsx
import { useState, useEffect, Fragment } from 'react';

const API_URL = 'http://localhost:3000';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((jsonData) => setProducts(jsonData.data));
  }, []);

  return (
    <>
      <h1>My Store</h1>
      {products.map((product) => (
        <Fragment key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.descrizione}</p>
          <p>€ {product.price.toFixed(2)}</p>
        </Fragment>
      ))}
    </>
  );
}

export default App;
```

```jsx
const [error, setError] = useState('');

useEffect(() => {
  fetch(`${API_URL}/products`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Impossibile caricare i prodotti');
      }
      return response.json();
    })
    .then((jsonData) => setProducts(jsonData.data))
    .catch((err) => setError(err.message));
}, []);
```

```jsx
{error && <p>{error}</p>}
```

```jsx
fetch(`${API_URL}/products`)
  .then((response) => response.json())
  .then((jsonData) => {
    if (!jsonData.success) {
      throw new Error(jsonData.message);
    }
    setProducts(jsonData.data);
  })
  .catch((err) => setError(err.message));
```
