# Relazioni tra tabelle con MySQL

**Argomento:** DB | **Data Lezione:** 2026-07-29 | **File Sorgente:** lezioni/mysql-relazioni.html

## Panoramica
Una relazione collega record di tabelle diverse senza duplicare gli stessi dati in pi&ugrave; punti. In un database reale le informazioni appartengono spesso a entit&agrave; diverse. Un cliente e un ordine, per esempio, sono due cose distinte: ciascuna merita una tabella con i propri campi. Salvare ...

### Perch&eacute; usare relazioni
Una relazione collega record di tabelle diverse senza duplicare gli stessi dati in pi&ugrave; punti. In un database reale le informazioni appartengono spesso a entit&agrave; diverse. Un cliente e un ordine, per esempio, sono due cose distinte: ciascuna merita una tabella con i propri campi. Salvare i dati del cliente dentro ogni ordine produrrebbe duplicazioni. Se l'email cambia, sarebbe necessario correggerla in tutti gli ordini. Separando le tabelle, i dati del cliente vengono registrati una sola volta e gli ordini si collegano a quel record. clienti ordini +----+----------------+ +----+------------+-------------+ | id | email | | id | totale | cliente_id | +----+----------------+ +----+------------+-------------+ | 1 | mario@email.it | | 1 | 49.90 | 1 | +----+----------------+ +----+------------+-------------+

### Chiave primaria e chiave esterna
La chiave esterna &egrave; un campo che contiene il valore della chiave primaria di un record presente in un'altra tabella. La chiave primaria identifica in modo univoco un record nella propria tabella. In clienti , per esempio, id identifica un singolo cliente. La chiave esterna , o foreign key , crea il collegamento. In ordini , il campo cliente_id contiene l' id del cliente a cui appartiene l'ordine. clienti.id ← ordini.cliente_id MySQL pu&ograve; controllare questo collegamento: un ordine non pu&ograve; riferirsi a un cliente che non esiste. Questa garanzia si chiama integrit&agrave; referenziale .

### Relazione uno a molti
In una relazione uno-a-molti, un record della prima tabella pu&ograve; essere collegato a molti record della seconda; ogni record della seconda tabella appartiene a uno solo della prima. Un cliente pu&ograve; effettuare molti ordini, ma ogni ordine appartiene a un solo cliente. La chiave esterna viene quindi inserita nella tabella che rappresenta la parte “molti”: ordini . CREATE TABLE clienti ( id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE ); CREATE TABLE ordini ( id INT PRIMARY KEY AUTO_INCREMENT, totale DECIMAL(10, 2) NOT NULL CHECK (totale &gt;= 0), cliente_id INT NOT NULL, FOREIGN KEY (cliente_id) REFERENCES clienti(id) ); Il tipo di cliente_id deve essere compatibile con il tipo della chiave primaria a cui si riferisce. Qui entrambi sono INT . Esercizio Una categoria pu&ograve; contenere molti prodotti, mentre ogni prodotto appartiene a una sola categoria. In quale tabella inseriresti la chiave esterna? Mostra soluzione La chiave esterna va nella tabella prodotti , per esempio nel campo categoria_id , perch&eacute; &egrave; la tabella sul lato “molti”.

### Relazione uno a uno
In una relazione uno-a-uno, un record pu&ograve; essere collegato al massimo a un solo record dell'altra tabella. Questo tipo di relazione &egrave; meno frequente. Pu&ograve; essere utile quando alcuni dati sono opzionali, riservati o usati raramente. Per esempio, un utente pu&ograve; avere un solo profilo esteso. Per rendere univoco il collegamento, la chiave esterna deve avere anche il vincolo UNIQUE . CREATE TABLE utenti ( id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(100) NOT NULL UNIQUE ); CREATE TABLE profili ( id INT PRIMARY KEY AUTO_INCREMENT, biografia TEXT, utente_id INT NOT NULL UNIQUE, FOREIGN KEY (utente_id) REFERENCES utenti(id) );

### Modifiche e cancellazioni
Le azioni della chiave esterna definiscono che cosa accade ai record collegati quando il record di riferimento viene modificato o eliminato. Le azioni si dichiarano dopo REFERENCES . Devono rispecchiare la regola del dominio: non esiste una scelta sempre corretta. FOREIGN KEY (cliente_id) REFERENCES clienti(id) ON DELETE RESTRICT ON UPDATE CASCADE RESTRICT blocca l'operazione se esistono record collegati. CASCADE propaga l'operazione ai record collegati. SET NULL imposta a NULL la chiave esterna; il campo non pu&ograve; quindi avere NOT NULL . ON DELETE CASCADE pu&ograve; eliminare molti record insieme: va usato soltanto quando quei record non hanno significato senza il record di riferimento.

### Relazione molti a molti
Una relazione molti-a-molti richiede una terza tabella, chiamata tabella ponte , che contiene le due chiavi esterne. Uno studente pu&ograve; frequentare molti corsi e un corso pu&ograve; avere molti studenti. Non &egrave; corretto salvare una lista di corsi in un solo campo dello studente: ogni campo deve contenere un solo valore. studenti ← iscrizioni → corsi CREATE TABLE studenti ( id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(50) NOT NULL ); CREATE TABLE corsi ( id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100) NOT NULL ); CREATE TABLE iscrizioni ( studente_id INT NOT NULL, corso_id INT NOT NULL, data_iscrizione DATE NOT NULL, PRIMARY KEY (studente_id, corso_id), FOREIGN KEY (studente_id) REFERENCES studenti(id), FOREIGN KEY (corso_id) REFERENCES corsi(id) ); La chiave primaria composta da studente_id e corso_id impedisce di registrare due volte la stessa iscrizione. La tabella ponte pu&ograve; inoltre avere attributi propri, come data_iscrizione .

### esercizio-finale
Esercizio finale Un ristorante vuole gestire i tavoli e le prenotazioni. Progetta e crea le tabelle necessarie, definendo la relazione tra di esse con una chiave esterna. Mostra soluzione CREATE TABLE tavoli ( id INT PRIMARY KEY AUTO_INCREMENT, numero INT NOT NULL UNIQUE, posti INT NOT NULL CHECK (posti &gt; 0) ); CREATE TABLE prenotazioni ( id INT PRIMARY KEY AUTO_INCREMENT, nome_cliente VARCHAR(100) NOT NULL, data_ora DATETIME NOT NULL, persone INT NOT NULL CHECK (persone &gt; 0), tavolo_id INT NOT NULL, FOREIGN KEY (tavolo_id) REFERENCES tavoli(id) );

```text
clienti                         ordini
+----+----------------+          +----+------------+-------------+
| id | email          |          | id | totale     | cliente_id  |
+----+----------------+          +----+------------+-------------+
| 1  | mario@email.it |          | 1  | 49.90      | 1           |
+----+----------------+          +----+------------+-------------+
```

```text
clienti.id  ←  ordini.cliente_id
```

```sql
CREATE TABLE clienti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE ordini (
    id INT PRIMARY KEY AUTO_INCREMENT,
    totale DECIMAL(10, 2) NOT NULL CHECK (totale >= 0),
    cliente_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clienti(id)
);
```

```sql
CREATE TABLE utenti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE profili (
    id INT PRIMARY KEY AUTO_INCREMENT,
    biografia TEXT,
    utente_id INT NOT NULL UNIQUE,
    FOREIGN KEY (utente_id) REFERENCES utenti(id)
);
```

```sql
FOREIGN KEY (cliente_id)
    REFERENCES clienti(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
```
