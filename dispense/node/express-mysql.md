# Express e MySQL: connessione e CRUD

**Argomento:** Node | **Data Lezione:** 2026-09-12 | **File Sorgente:** lezioni/express-mysql.html

## Panoramica
Express riceve le richieste HTTP. MySQL conserva i dati nelle tabelle. Il package mysql2 permette a Node.js di comunicare con il database. mkdir express-mysql cd express-mysql pnpm init pnpm add express mysql2 dotenv Nel file package.json aggiungi queste proprietà: { "type": "module", "scripts": { "...

### Preparare il progetto
Express riceve le richieste HTTP. MySQL conserva i dati nelle tabelle. Il package mysql2 permette a Node.js di comunicare con il database. mkdir express-mysql cd express-mysql pnpm init pnpm add express mysql2 dotenv Nel file package.json aggiungi queste proprietà: { "type": "module", "scripts": { "dev": "node --watch server.js" } } In MySQL creiamo il database e una tabella per gli esempi. CREATE DATABASE express_mysql; USE express_mysql; CREATE TABLE products ( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100), price DECIMAL(10, 2), description TEXT ); Usiamo products solo come esempio. Le stesse query funzionano anche con una tabella di libri, utenti o post.

### Configurare il file .env
Come visto nella lezione sui middleware, leggiamo il file .env con dotenv . Per la connessione al database ci servono queste variabili, al posto di scrivere host, utente, password e nome del database direttamente in server.js . DB_HOST="localhost" DB_PORT="3306" DB_USER="root" DB_PASSWORD="password" DB_NAME="express_mysql" Non pubblicare mai il file .env su GitHub: può contenere password. Aggiungi .env al file .gitignore .

### Creare la connessione
Usiamo mysql2/promise invece della versione base: ogni metodo restituisce una Promise , quindi possiamo scrivere il codice con async/await invece che con le callback. Creiamo un file dedicato che si occupa solo di connettersi al database. express-mysql/ ├── .env ├── data/ │ └── db.js ├── package.json └── server.js // data/db.js import { createConnection } from 'mysql2/promise'; const config = { host: process.env.DB_HOST, port: Number(process.env.DB_PORT), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, }; // Top-level await: la connessione viene creata una sola volta, // quando questo file viene importato per la prima volta. const connection = await createConnection(config); console.log('MySQL connesso!'); export default connection; In server.js importiamo la connessione già pronta e la usiamo nelle rotte. // server.js import 'dotenv/config'; import express from 'express'; import connection from './data/db.js'; const app = express(); const port = 3000; app.use(express.json()); 'dotenv/config' va importato per primo: solo così data/db.js trova le variabili già disponibili in process.env quando legge config . Se il database non è raggiungibile, createConnection rifiuta la Promise e l'app non parte: l'errore compare direttamente nel terminale, senza bisogno di un callback per controllarlo. Questa resta una connessione singola, utile per vedere chiaramente cosa succede. In un progetto con molti utenti contemporanei si userebbe invece un pool di connessioni ( mysql.createPool() ), che ne tiene aperte più di una e le riutilizza tra le richieste.

### Read: leggere i prodotti
Con connection.query() inviamo una query SQL e otteniamo un array [rows, fields] : il primo elemento sono le righe restituite da MySQL. Usiamo async/await dentro un try/catch , come già fatto con le rotte async di Express. // GET /products app.get('/products', async (req, res) => { try { const [products] = await connection.query('SELECT * FROM products'); res.json(products); } catch (error) { console.error('Errore durante la lettura dei prodotti:', error); res.status(500).json({ error: 'Errore del database' }); } }); Per leggere un solo prodotto usiamo l'id nell'URL. Quando la query ha parametri usiamo connection.execute() invece di connection.query() : prepara la query sul server MySQL e le passa i valori separatamente, è il vero prepared statement . Il simbolo ? è il segnaposto per ogni valore dell'array. // GET /products/1 app.get('/products/:id', async (req, res) => { try { const id = req.params.id; const sql = 'SELECT * FROM products WHERE id = ?'; const [products] = await connection.execute(sql, [id]); if (products.length === 0) { return res.status(404).json({ error: 'Prodotto non trovato' }); } res.json(products[0]); } catch (error) { console.error('Errore durante la lettura del prodotto:', error); res.status(500).json({ error: 'Errore del database' }); } }); Usa sempre ? e execute() per i valori ricevuti dal client. Non costruire mai una query concatenando direttamente testo e dati ricevuti dalla richiesta: nel prossimo capitolo vediamo perché.

### SQL injection e prepared statement
Immaginiamo di aggiungere a GET /products un filtro per nome, costruendo la query concatenando direttamente il valore ricevuto dal client. // Versione VULNERABILE, solo per capire il problema app.get('/products', async (req, res) => { const { name } = req.query; let sql = 'SELECT * FROM products'; if (name) { sql += ` WHERE name = '${name}'`; } const [products] = await connection.query(sql); res.json(products); }); Con GET /products?name=Tastiera funziona. Ma un client può inviare del testo pensato per modificare la query stessa, per esempio GET /products?name=x' OR '1'='1 : il valore diventa parte della query SQL e restituisce tutti i prodotti, ignorando il filtro. Con query più elaborate si arriva a leggere, modificare o cancellare dati che non dovrebbero essere accessibili. La soluzione è non inserire mai il valore direttamente nella stringa SQL. Con ? e execute() , MySQL riceve la query e i parametri separatamente: il valore resta sempre un dato, mai una porzione di comando SQL. // Versione sicura app.get('/products', async (req, res) => { try { const { name } = req.query; let sql = 'SELECT * FROM products'; const params = []; if (name) { sql += ' WHERE name = ?'; params.push(name); } const [products] = await connection.execute(sql, params); res.json(products); } catch (error) { console.error('Errore durante la lettura dei prodotti:', error); res.status(500).json({ error: 'Errore del database' }); } }); La SQL injection è una delle vulnerabilità più comuni e pericolose per un'API. La regola è semplice: i valori che arrivano dal client vanno sempre passati come parametri a execute() , mai concatenati nel testo della query.

### Create e Update: aggiungere e modificare
Per creare un prodotto leggiamo i dati dal body e usiamo INSERT con execute() . Il risultato contiene insertId , l'id assegnato da MySQL. // POST /products app.post('/products', async (req, res) => { try { const { name, price, description } = req.body; const sql = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)'; const [result] = await connection.execute(sql, [name, price, description]); res.status(201).json({ id: result.insertId, name, price, description }); } catch (error) { console.error('Errore durante la creazione del prodotto:', error); res.status(500).json({ error: 'Errore del database' }); } }); POST http://localhost:3000/products Content-Type: application/json { "name": "Tastiera", "price": 59.9, "description": "Layout italiano" } Per modificare un prodotto usiamo UPDATE . Se affectedRows è zero, l'id richiesto non esiste. // PUT /products/1 app.put('/products/:id', async (req, res) => { try { const { name, price, description } = req.body; const id = req.params.id; const sql = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?'; const [result] = await connection.execute(sql, [name, price, description, id]); if (result.affectedRows === 0) { return res.status(404).json({ error: 'Prodotto non trovato' }); } res.json({ id, name, price, description }); } catch (error) { console.error('Errore durante la modifica del prodotto:', error); res.status(500).json({ error: 'Errore del database' }); } }); Esercizio Crea POST /products . Invia da Postman un prodotto con nome, prezzo e descrizione, poi controlla con GET /products che sia stato salvato.

### Delete: eliminare un prodotto
Per eliminare un record usiamo DELETE . Anche qui controlliamo affectedRows per sapere se MySQL ha trovato il prodotto. // DELETE /products/1 app.delete('/products/:id', async (req, res) => { try { const id = req.params.id; const sql = 'DELETE FROM products WHERE id = ?'; const [result] = await connection.execute(sql, [id]); if (result.affectedRows === 0) { return res.status(404).json({ error: 'Prodotto non trovato' }); } res.status(204).send(); } catch (error) { console.error('Errore durante l\'eliminazione del prodotto:', error); res.status(500).json({ error: 'Errore del database' }); } }); app.listen(port, () => { console.log(`Server pronto su http://localhost:${port}`); }); Operazione Metodo HTTP Query SQL Leggere tutti GET /products SELECT Leggere uno GET /products/:id SELECT ... WHERE Creare POST /products INSERT Modificare PUT /products/:id UPDATE Eliminare DELETE /products/:id DELETE

```bash
mkdir express-mysql
cd express-mysql
pnpm init
pnpm add express mysql2 dotenv
```

```json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch server.js"
  }
}
```

```sql
CREATE DATABASE express_mysql;
USE express_mysql;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  price DECIMAL(10, 2),
  description TEXT
);
```

```bash
DB_HOST="localhost"
DB_PORT="3306"
DB_USER="root"
DB_PASSWORD="password"
DB_NAME="express_mysql"
```

```text
express-mysql/
├── .env
├── data/
│   └── db.js
├── package.json
└── server.js
```
