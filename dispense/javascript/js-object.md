# Oggetti

**Argomento:** JS | **Data Lezione:** 2026-06-13 | **File Sorgente:** lezioni/js-object.html

## Panoramica
Un oggetto è una struttura dati formata da proprietà. Ogni proprietà ha una chiave e un valore: la chiave identifica l'informazione, il valore contiene il dato vero e proprio. Gli array, già noti, raccolgono elementi accessibili tramite indice numerico. Gli oggetti funzionano in modo diverso: ogni d...

### Oggetti come strutture dati
Un oggetto è una struttura dati formata da proprietà. Ogni proprietà ha una chiave e un valore: la chiave identifica l'informazione, il valore contiene il dato vero e proprio. Gli array, già noti, raccolgono elementi accessibili tramite indice numerico. Gli oggetti funzionano in modo diverso: ogni dato ha un nome preciso chiamato chiave. Questo li rende più adatti quando vuoi descrivere qualcosa con caratteristiche specifiche, come una persona, un libro o un prodotto. La sintassi di un oggetto usa le parentesi graffe. Dentro si scrivono le proprietà separate da virgole, sempre nella forma chiave: valore . Le chiavi devono essere scelte in modo chiaro, perché servono a capire subito cosa rappresenta ogni dato. Esempio const libro = { titolo: "Il nome della rosa", autore: "Umberto Eco", anno: 1980 }; Esercizio Crea un oggetto con le informazioni di uno studente: nome, età e corso. Mostra soluzione const studente = { nome: "Luca", eta: 19, corso: "Web Development" };

### Accesso con dot notation
La dot notation permette di leggere una proprietà di un oggetto scrivendo il nome dell'oggetto, un punto e la chiave della proprietà da leggere. Per accedere a un valore si scrive prima il nome della variabile che contiene l'oggetto, poi un punto, poi la chiave desiderata. La sintassi è semplice e diretta, ed è la forma più usata per lavorare con gli oggetti quando si conosce già il nome della chiave. Con la dot notation puoi usare il valore in una console.log , in un calcolo o dentro un template literal. La struttura è sempre la stessa: oggetto, punto, chiave. Esempio const studente = { nome: "Luca", eta: 19, corso: "Web Development" }; console.log(studente.nome); console.log(studente.corso); Esercizio Dato un oggetto con i dati di una macchina, mostra a console marca e modello usando la dot notation. Mostra soluzione const macchina = { marca: "Fiat", modello: "Panda", anno: 2024 }; console.log(macchina.marca); console.log(macchina.modello);

### Bracket notation
La bracket notation è un modo alternativo per accedere alle proprietà di un oggetto. Si scrive il nome dell'oggetto seguito dalla chiave tra parentesi quadre e virgolette: oggetto["chiave"] . La dot notation funziona bene nella maggior parte dei casi, ma ha un limite: la chiave deve essere un nome valido, senza spazi o caratteri speciali. Quando la chiave contiene spazi o caratteri particolari, la dot notation non funziona e bisogna usare la bracket notation. L'altro caso in cui la bracket notation è indispensabile è quando la chiave non è scritta direttamente nel codice, ma è contenuta in una variabile. Questo accade, per esempio, quando la chiave viene chiesta all'utente tramite prompt : in quel momento non si sa in anticipo quale proprietà verrà richiesta, quindi non si può scrivere il nome fisso nel codice. Esempio const prodotto = { nome: "Tastiera", "prezzo scontato": 39, disponibile: true }; // chiave con spazio: serve la bracket notation console.log(prodotto["prezzo scontato"]); // chiave dinamica tramite prompt const chiave = prompt("Quale proprietà vuoi leggere?"); console.log(prodotto[chiave]); Esercizio Crea un oggetto con una proprietà la cui chiave contiene uno spazio. Leggila con la bracket notation. Poi chiedi all'utente tramite prompt quale proprietà vuole vedere e mostrala a console. Mostra soluzione const libro = { titolo: "Dune", "anno di pubblicazione": 1965, autore: "Frank Herbert" }; console.log(libro["anno di pubblicazione"]); const chiave = prompt("Quale informazione vuoi leggere?"); console.log(libro[chiave]);

### Metodi negli oggetti
Un metodo è una funzione definita come proprietà di un oggetto. Si comporta come le altre proprietà, ma il suo valore è una funzione che può essere chiamata con le parentesi. Oltre a stringhe, numeri e booleani, il valore di una proprietà può essere anche una funzione. In questo caso la proprietà si chiama metodo. I metodi servono per associare un comportamento direttamente all'oggetto, cioè per fargli fare qualcosa in base ai propri dati. Dentro un metodo è disponibile la parola chiave this , che fa riferimento all'oggetto stesso. Grazie a this il metodo può leggere le proprietà dell'oggetto in cui si trova, senza dover passare nulla dall'esterno. Per chiamare un metodo si usa la dot notation seguita dalle parentesi: oggetto.metodo() . Esempio const persona = { nome: "Anna", annoNascita: 2000, calcAge() { return new Date().getFullYear() - this.annoNascita; } }; console.log(persona.nome); console.log(persona.calcAge()); Esercizio Crea un oggetto che rappresenti un rettangolo con larghezza e altezza. Aggiungi un metodo che calcoli e restituisca l'area. Mostra il risultato a console. Mostra soluzione const rettangolo = { larghezza: 8, altezza: 5, calcolaArea() { return this.larghezza * this.altezza; } }; console.log(rettangolo.calcolaArea());

### Oggetti innestati
Un oggetto innestato è un oggetto contenuto come valore di una proprietà di un altro oggetto. Serve quando un'informazione è essa stessa composta da più dettagli collegati. Non tutti i valori di un oggetto devono essere stringhe o numeri: il valore di una proprietà può essere a sua volta un oggetto. In questo caso si parla di oggetto innestato, e la struttura diventa multilivello. Per accedere ai dati di un oggetto innestato si usa ancora la dot notation, aggiungendo un secondo punto dopo la proprietà che contiene l'oggetto interno. Si scende di livello semplicemente continuando la catena di punti. Esempio const studente = { nome: "Anna", eta: 18, indirizzo: { citta: "Roma", via: "Via del Corso" } }; console.log(studente.indirizzo.citta); console.log(studente.indirizzo.via); Esercizio Crea un oggetto che rappresenti un corso con un oggetto innestato per il docente. Mostra a console il nome del docente. Mostra soluzione const corso = { nome: "JavaScript Base", docente: { nome: "Giulia", cognome: "Rossi" } }; console.log(corso.docente.nome);

### Array di oggetti
Un array di oggetti è un array in cui ogni elemento non è un valore semplice, ma un oggetto. È una delle strutture più usate per rappresentare liste di entità con proprietà. Gli array permettono di raccogliere più elementi in un unico contenitore accessibile tramite indice. Quando ogni elemento di quella lista deve avere più caratteristiche, conviene usare un oggetto al posto di un valore singolo. Il risultato è un array di oggetti: una lista dove ogni voce ha la propria struttura di chiavi e valori. Per leggere un dato si combinano le due sintassi già note: prima si usa l'indice per accedere all'elemento dell'array, poi la dot notation per accedere alla proprietà dell'oggetto che si trova in quella posizione. Esempio const studenti = [ { nome: "Anna", eta: 18 }, { nome: "Marco", eta: 20 }, { nome: "Sara", eta: 19 } ]; console.log(studenti[0].nome); console.log(studenti[1].eta); Esercizio Crea un array con tre prodotti, ognuno con nome e prezzo. Mostra a console il nome del primo prodotto e il prezzo del terzo. Mostra soluzione const prodotti = [ { nome: "Tastiera", prezzo: 49 }, { nome: "Mouse", prezzo: 25 }, { nome: "Monitor", prezzo: 199 } ]; console.log(prodotti[0].nome); console.log(prodotti[2].prezzo);

```javascript
const libro = {
    titolo: "Il nome della rosa",
    autore: "Umberto Eco",
    anno: 1980
};
```

```javascript
const studente = {
    nome: "Luca",
    eta: 19,
    corso: "Web Development"
};
```

```javascript
const studente = {
    nome: "Luca",
    eta: 19,
    corso: "Web Development"
};

console.log(studente.nome);
console.log(studente.corso);
```

```javascript
const macchina = {
    marca: "Fiat",
    modello: "Panda",
    anno: 2024
};

console.log(macchina.marca);
console.log(macchina.modello);
```

```javascript
const prodotto = {
    nome: "Tastiera",
    "prezzo scontato": 39,
    disponibile: true
};

// chiave con spazio: serve la bracket notation
console.log(prodotto["prezzo scontato"]);

// chiave dinamica tramite prompt
const chiave = prompt("Quale proprietà vuoi leggere?");
console.log(prodotto[chiave]);
```
