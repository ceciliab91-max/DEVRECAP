# Introduzione a Prisma: setup, MySQL e schema

**Argomento:** Node | **Data Lezione:** 2026-09-14 | **File Sorgente:** lezioni/prisma-mysql-tabelle.html

## Panoramica
Un ORM ( Object-Relational Mapping ) è uno strato di codice che si mette tra l'applicazione e il database relazionale: traduce gli oggetti che usiamo in JavaScript (oggetti, array, classi) nelle righe delle tabelle SQL, e viceversa. Invece di scrivere query SQL a mano, chiami funzioni JavaScript — c...

### Cos'è un ORM e a cosa serve Prisma
Un ORM ( Object-Relational Mapping ) è uno strato di codice che si mette tra l'applicazione e il database relazionale: traduce gli oggetti che usiamo in JavaScript (oggetti, array, classi) nelle righe delle tabelle SQL, e viceversa. Invece di scrivere query SQL a mano, chiami funzioni JavaScript — create , findMany , update — e l'ORM genera ed esegue la query al posto tuo, poi restituisce il risultato già trasformato in oggetti JS pronti da usare. Codice JavaScript Prisma (ORM) MySQL oggetti, array ──▶ traduce in SQL ──▶ tabelle e righe client.product .findMany() ◀── righe → oggetti ◀── risultato query Prisma è l'ORM che useremo: descriviamo la struttura del database in schema.prisma e Prisma genera le istruzioni SQL necessarie per MySQL. In Prisma un model corrisponde a una tabella e un campo corrisponde a una colonna. Preparare il progetto Crea prima un database vuoto in MySQL (e uno "shadow", che vedremo tra poco): CREATE DATABASE express_store; CREATE DATABASE express_store_shadow; Nel terminale crea il progetto e installa Prisma 7, il client e l'adapter MySQL: mkdir hello-prisma cd hello-prisma pnpm init pnpm add @prisma/client@7.10.0 @prisma/adapter-mariadb@7.10.0 dotenv pnpm add -D prisma@7.10.0 mkdir prisma Aggiungi a package.json gli script che useremo in questa dispensa: { "scripts": { "validate": "prisma validate", "migrate": "prisma migrate dev", "generate": "prisma generate", "studio": "prisma studio", "test:db": "node test-db.js" } } Le variabili di connessione vanno in .env , che non va mai caricato su Git. Copia il contenuto da un .env.example come questo: # URL usata dalla Prisma CLI per migration, introspezione e Prisma Studio. # DATABASE_URL=mysql://UTENTE:PASSWORD@INDIRIZZO_DB:PORTA_DB/NOME_DB DATABASE_URL="mysql://prisma_user:prisma_password@localhost:3306/express_store" # URL dello shadow database. # La CLI lo usa per rieseguire le migration e confrontarle con il database reale. SHADOW_DATABASE_URL="mysql://prisma_user:prisma_password@localhost:3306/express_store_shadow" # Parametri usati a runtime dall'adapter MariaDB in prisma-client.js. DATABASE_HOST="localhost" DATABASE_PORT="3306" DATABASE_USER="prisma_user" DATABASE_PASSWORD="prisma_password" DATABASE_NAME="express_store" Lo shadow database è un database vuoto che Prisma crea e distrugge internamente ad ogni migrate dev , per verificare che la sequenza delle migration sia coerente prima di applicarla a quello reale. Deve esistere ma restare sempre vuoto: non scriverci a mano. In Prisma 7 lo schema non contiene più l'URL del database: è la CLI a leggerlo da un file di configurazione dedicato, prisma.config.ts , nella radice del progetto: // Carica le variabili definite nel file .env prima della configurazione Prisma. import "dotenv/config"; // Importa gli strumenti di configurazione messi a disposizione da Prisma CLI. import { defineConfig, env } from "prisma/config"; // Esporta la configurazione usata dai comandi della CLI Prisma. export default defineConfig({ // Indica dove si trova il file dello schema Prisma. schema: "prisma/schema.prisma", // Indica la cartella in cui Prisma salverà le migration SQL. migrations: { path: "prisma/migrations" }, // Configura il datasource usato dalla CLI. // In Prisma 7 la URL viene definita qui e non nel file schema.prisma. datasource: { // Database del progetto, usato da migrate, studio e introspezione. url: env("DATABASE_URL"), // Database di appoggio che la CLI usa per ricalcolare le migration. // Deve esistere già ed essere vuoto: Prisma lo svuota a ogni `migrate dev`. shadowDatabaseUrl: env("SHADOW_DATABASE_URL") } }); Comandi come prisma migrate dev o prisma studio leggono la connessione da qui; il codice dell'app, invece, si collega al database tramite l'adapter che vedremo nel capitolo Client .

### Creare una tabella con un model
Nel file prisma/schema.prisma definiamo il generatore del client, il database MySQL e il model Product , che rappresenta i prodotti di uno store: generator client { provider = "prisma-client-js" } datasource db { provider = "mysql" } model Product { id Int @id @default(autoincrement()) name String price Decimal @db.Decimal(10, 2) description String? createdAt DateTime @default(now()) } id è la chiave primaria; autoincrement() genera il valore progressivo. price è un Decimal , non un Float : per i valori monetari serve precisione esatta, mentre i numeri in virgola mobile possono introdurre piccoli errori di arrotondamento. @db.Decimal(10, 2) indica 10 cifre totali, 2 dopo la virgola. String? rende description facoltativa. @default(now()) salva automaticamente data e ora della creazione. Il blocco datasource dichiara solo il provider : l'URL di connessione la fornisce prisma.config.ts (capitolo precedente), non lo schema. Il nome del model è singolare ( Product ). Prisma crea per impostazione predefinita una tabella chiamata Product . Se hai già una tabella con un nome diverso, puoi collegarla con @@map("products") .

### Applicare e aggiornare la struttura
Una migration è un file SQL versionato che registra una modifica alle tabelle. Una volta applicata non va più modificata a mano: eventuali correzioni si fanno con una nuova migration successiva. Il ciclo di lavoro dopo ogni modifica dello schema Ogni volta che cambi lo schema.prisma — la prima volta per creare le tabelle, poi ogni volta che aggiungi un campo o ne modifichi il tipo — ripeti sempre gli stessi tre passi, nello stesso ordine, usando le shortcut già definite in package.json : pnpm validate # 1. esegue "prisma validate" pnpm migrate --name &lt;nome&gt; # 2. esegue "prisma migrate dev --name &lt;nome&gt;" pnpm generate # 3. esegue "prisma generate" pnpm validate controlla che lo schema.prisma sia sintatticamente corretto, prima di toccare il database. pnpm migrate --name &lt;nome&gt; confronta lo schema con lo stato attuale del database (tramite lo shadow database), genera il file SQL della differenza e lo applica. pnpm generate rigenera Prisma Client , perché il tipo Product usato nel codice deve riflettere i campi appena aggiunti. La primissima volta il database è ancora vuoto, quindi il &lt;nome&gt; convenzionale è init : pnpm migrate --name init Due esempi reali: add_in_stock e add_is_featured Il progetto è cresciuto con due colonne aggiunte in momenti diversi, seguendo esattamente questo ciclo. Il primo passo era già stato fatto: lo riassumiamo. Il secondo lo vediamo per intero, con schema prima , schema dopo , comando lanciato e SQL generato — il modo più chiaro per vedere cosa cambia a ogni migration. Passo 1 — add_in_stock (già applicata) Al model Product del capitolo 2 è stata aggiunta la riga inStock Boolean @default(true) , poi lanciato: pnpm migrate --name add_in_stock SQL generato in prisma/migrations/20260914175411_add_in_stock/migration.sql : -- AlterTable ALTER TABLE `Product` ADD COLUMN `inStock` BOOLEAN NOT NULL DEFAULT true; Passo 2 — add_is_featured Schema prima (stato dopo add_in_stock ): model Product { id Int @id @default(autoincrement()) name String price Decimal @db.Decimal(10, 2) description String? createdAt DateTime @default(now()) inStock Boolean @default(true) } Schema dopo (aggiunto isFeatured ): model Product { id Int @id @default(autoincrement()) name String price Decimal @db.Decimal(10, 2) description String? createdAt DateTime @default(now()) inStock Boolean @default(true) isFeatured Boolean @default(false) } Comando lanciato: pnpm migrate --name add_is_featured SQL generato in prisma/migrations/20260915151211_add_is_featured/migration.sql : -- AlterTable ALTER TABLE `Product` ADD COLUMN `isFeatured` BOOLEAN NOT NULL DEFAULT false; Subito dopo si rigenera il client con pnpm generate . Per verificare che tutto sia in ordine si usa prisma migrate status : non ha uno script dedicato, quindi va lanciato con pnpm exec : pnpm generate pnpm exec prisma migrate status Se tutto è a posto, il comando conferma che il database è allineato allo storico delle migration ( init , add_in_stock , add_is_featured ) con un messaggio del tipo Database schema is up to date! . Per ispezionare visivamente tabelle e record, avvia pnpm studio . Per controllare che l'intera sequenza di migration si riapplichi da zero in modo pulito, esiste pnpm exec prisma migrate reset : cancella il database, lo ricrea vuoto e riapplica in ordine tutte le migration. È un'operazione distruttiva, va usata solo su database di sviluppo e la CLI chiede sempre conferma prima di procedere.

### Il client Prisma
Dopo prisma generate il client va istanziato una sola volta e riutilizzato in tutto il codice. Usiamo l'adapter @prisma/adapter-mariadb installato al capitolo 1: collega PrismaClient al driver MySQL/MariaDB usando i parametri letti da .env . Crea prisma-client.js nella radice del progetto: // Carica le variabili d'ambiente dal file .env. import "dotenv/config"; // Importa il client generato da Prisma. import { PrismaClient } from "@prisma/client"; // Importa l'adapter che collega Prisma Client al driver MariaDB/MySQL. import { PrismaMariaDb } from "@prisma/adapter-mariadb"; // Crea l'adapter usando i parametri di connessione definiti nel file .env. const adapter = new PrismaMariaDb({ // Indirizzo del server MySQL. host: process.env.DATABASE_HOST, // Converte la porta da stringa di ambiente a numero JavaScript. port: Number(process.env.DATABASE_PORT), // Utente MySQL dell'applicazione. user: process.env.DATABASE_USER, // Password dell'utente MySQL dell'applicazione. password: process.env.DATABASE_PASSWORD, // Nome del database a cui collegarsi. database: process.env.DATABASE_NAME, // Numero massimo di connessioni che il pool può mantenere aperte. connectionLimit: 5 }); // Crea Prisma Client configurandolo con l'adapter MySQL/MariaDB. export const client = new PrismaClient({ adapter }); Da qui in poi basta importare client ovunque serva interrogare il database, senza aprire una nuova connessione ogni volta. Nella prossima dispensa, Prisma: tipi, annotazioni e relazioni , completiamo lo schema con le relazioni tra i model.

### Verificare i dati con uno script
Prima ancora di scrivere rotte Express, possiamo verificare che tabella e client funzionino con un piccolo script Node. Nessuna riga di SQL: Prisma la maschera (astrae) tramite JavaScript. Crea test-db.js : // Esempio di codice JS che sfrutta il nostro client Prisma. // Nessuna riga di SQL: Prisma maschera (astrae) via JavaScript le query. import { Prisma } from "@prisma/client"; import { client } from "./prisma-client.js"; try { // Crea un nuovo prodotto: Prisma genera l'INSERT corrispondente. const product = await client.product.create({ data: { name: "Felpa Basic", price: new Prisma.Decimal("29.90"), description: "Felpa girocollo in cotone", inStock: true, isFeatured: true } }); console.log("Prodotto creato:", product); // Legge tutti i prodotti ordinati per data di creazione. const products = await client.product.findMany({ orderBy: { createdAt: "desc" } }); console.table( products.map((item) => ({ id: item.id, name: item.name, price: item.price.toString(), inStock: item.inStock, isFeatured: item.isFeatured })) ); } finally { // Chiude il pool di connessioni aperto dall'adapter. await client.$disconnect(); } Eseguilo con lo script definito in package.json : pnpm test:db new Prisma.Decimal("8.50") crea un valore Decimal a partire da una stringa: è il modo corretto di passare un prezzo, per non perdere precisione. console.table stampa i risultati di findMany in una tabella leggibile nel terminale. client.$disconnect() nel finally chiude sempre il pool di connessioni, anche se una query genera un errore. Esercizio Aggiungi al model Product un nuovo campo discountPercent Int @default(0) , crea la migration add_discount_percent e aggiorna test-db.js per impostare e stampare anche questo valore. Mostra soluzione model Product { id Int @id @default(autoincrement()) name String price Decimal @db.Decimal(10, 2) description String? createdAt DateTime @default(now()) inStock Boolean @default(true) isFeatured Boolean @default(false) discountPercent Int @default(0) } pnpm validate pnpm migrate --name add_discount_percent pnpm generate

```text
Codice JavaScript          Prisma (ORM)              MySQL
   oggetti, array   ──▶   traduce in SQL    ──▶   tabelle e righe
   client.product
     .findMany()     ◀──  righe → oggetti   ◀──   risultato query
```

```sql
CREATE DATABASE express_store;
CREATE DATABASE express_store_shadow;
```

```bash
mkdir hello-prisma
cd hello-prisma
pnpm init
pnpm add @prisma/client@7.10.0 @prisma/adapter-mariadb@7.10.0 dotenv
pnpm add -D prisma@7.10.0
mkdir prisma
```

```json
{
  "scripts": {
    "validate": "prisma validate",
    "migrate": "prisma migrate dev",
    "generate": "prisma generate",
    "studio": "prisma studio",
    "test:db": "node test-db.js"
  }
}
```

```bash
# URL usata dalla Prisma CLI per migration, introspezione e Prisma Studio.
# DATABASE_URL=mysql://UTENTE:PASSWORD@INDIRIZZO_DB:PORTA_DB/NOME_DB
DATABASE_URL="mysql://prisma_user:prisma_password@localhost:3306/express_store"

# URL dello shadow database.
# La CLI lo usa per rieseguire le migration e confrontarle con il database reale.
SHADOW_DATABASE_URL="mysql://prisma_user:prisma_password@localhost:3306/express_store_shadow"

# Parametri usati a runtime dall'adapter MariaDB in prisma-client.js.
DATABASE_HOST="localhost"
DATABASE_PORT="3306"
DATABASE_USER="prisma_user"
DATABASE_PASSWORD="prisma_password"
DATABASE_NAME="express_store"
```
