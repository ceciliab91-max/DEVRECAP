# Array e operatori utili

**Argomento:** JS | **Data Lezione:** 2026-06-04 | **File Sorgente:** lezioni/js-array.html

## Panoramica
Un array è una lista ordinata di valori racchiusa tra parentesi quadre. Si usa quando hai più elementi dello stesso argomento e vuoi tenerli in un unico contenitore. Il nome dell'array va al plurale perché rappresenta un gruppo di valori, non uno solo. Senza gli array, per conservare dieci nomi dovr...

### Array
Un array è una lista ordinata di valori racchiusa tra parentesi quadre. Si usa quando hai più elementi dello stesso argomento e vuoi tenerli in un unico contenitore. Il nome dell'array va al plurale perché rappresenta un gruppo di valori, non uno solo. Senza gli array, per conservare dieci nomi dovresti scrivere dieci variabili separate. Con un array li metti tutti insieme in una sola struttura, nello stesso ordine in cui li hai inseriti. Questo semplifica il codice e rende più facile lavorare sui dati in modo sistematico. Un array è detto omogeneo quando tutti i suoi valori sono dello stesso tipo, ad esempio solo stringhe o solo numeri. È detto eterogeneo quando contiene tipi diversi, come stringhe, numeri e booleani insieme. Gli array omogenei sono più comuni nella pratica, perché è più raro avere dati di natura diversa nello stesso insieme. Esempio // Array omogeneo di stringhe const studenti = ['Anna', 'Luca', 'Sara']; // Array omogeneo di numeri const voti = [8, 7, 9]; // Array eterogeneo: tipi diversi nello stesso array const scheda = ['Marco', 18, true]; Esercizio Crea tre array: uno con i nomi di quattro materie scolastiche, uno con i relativi voti interi e uno con le presenze dei giorni della settimana (usa valori booleani). Mostra soluzione const materie = ['Italiano', 'Matematica', 'Storia', 'Inglese']; const voti = [7, 8, 6, 9]; const presenze = [true, false, true, true, false];

### Indice, lunghezza e ciclo for
L'indice è la posizione di un elemento nell'array. Si parte sempre da 0 , non da 1 . .length restituisce il numero totale degli elementi. console.table() mostra l'array in forma tabellare nella console. Per leggere un elemento devi scrivere il nome dell'array seguito dall'indice tra parentesi quadre: studenti[0] restituisce il primo elemento. Poiché l'indice parte da 0 , l'ultimo elemento si trova all'indice length - 1 . Il ciclo for e gli array si abbinano in modo naturale: la variabile del ciclo parte da 0 , sale di uno a ogni iterazione e si ferma quando raggiunge .length . In questo modo puoi leggere o elaborare ogni elemento della lista in modo automatico, senza ripetere il codice. Esempio const studenti = ['Anna', 'Luca', 'Sara', 'Marco']; // Leggo il primo e l'ultimo elemento con l'indice console.log(studenti[0]); // 'Anna' console.log(studenti[studenti.length - 1]); // 'Marco' // Visualizzo l'array come tabella nella console console.table(studenti); // Scorro tutti gli elementi con un ciclo for for (let i = 0; i Esercizio Crea un array con cinque numeri interi. Usa un ciclo for per scorrere l'array e stampare in console solo i numeri maggiori di 5. Stampa anche la lunghezza totale dell'array. Mostra soluzione const numeri = [3, 8, 1, 6, 4]; console.log(numeri.length); for (let i = 0; i 5) { console.log(numeri[i]); } }

### Metodi degli array
I metodi sono azioni già pronte che puoi applicare direttamente su un array. Alcuni modificano l'array originale, altri restituiscono un nuovo array o un valore senza toccare l'originale. Un array dichiarato con const può comunque essere modificato con i metodi: const blocca il riferimento al contenitore, non i suoi contenuti. Gli array mettono a disposizione una serie di metodi già pronti per le operazioni più comuni: aggiungere o rimuovere elementi, cercare un valore, ordinare, filtrare o trasformare la lista. Conoscerli evita di scrivere codice lungo e ripetitivo per fare cose che JavaScript sa già fare in una riga. L'unica distinzione importante da tenere a mente è se un metodo modifica l'array originale oppure restituisce un nuovo array senza toccarlo: saperlo in anticipo previene errori difficili da individuare. Lista dei metodi Codice JavaScript Risultato / Output Note 😍😍😍😍.push(😎) 😍😍😍😍😎 Aggiunge in fondo 😍😍😍😍.unshift(😎) 😎😍😍😍😍 Aggiunge in testa 😍😍😍😍.pop() 😍😍😍 Rimuove l'ultimo elemento 😍😊🤔😎.shift() 😊🤔😎 Rimuove il primo elemento 😍😎🤔😎.reverse() 😎🤔😎😍 Inverte l'ordine degli elementi 😍😎🤔😎.includes(🤔) true Controlla se l'elemento esiste 😍😎🤔😎.at(2) 🤔 Prende l'elemento alla posizione 2 😍😎🤔😎.slice(0, 1) 😍 Crea un nuovo array (estrazione) 😍😎🤔😎.splice(0, 1) 😎🤔😎 Modifica l'array eliminando elementi 😍😎🤔😎.splice(1, 1, ❤️, 💩) 😍❤️💩🤔😎 Rimuove e inserisce nuovi elementi 😍😎🤔😎.fill(😁) 😁😁😁😁 Sostituisce tutti gli elementi 😍😎🤔😎.indexOf(🤔) 2 Trova l'indice della prima occorrenza 😍😎🤔😎.join('-') 😍-😎-🤔-😎 Unisce gli elementi in una stringa Esempio const frutta = ['mela', 'pera', 'banana', 'kiwi']; // Aggiunta in coda e in testa frutta.push('uva'); // ['mela', 'pera', 'banana', 'kiwi', 'uva'] frutta.unshift('arancia'); // ['arancia', 'mela', 'pera', 'banana', 'kiwi', 'uva'] // Rimozione in coda e in testa frutta.pop(); // rimuove 'uva' frutta.shift(); // rimuove 'arancia' // Ricerca console.log(frutta.includes('pera')); // true console.log(frutta.indexOf('banana')); // 2 // Lettura per indice con .at() console.log(frutta.at(1)); // 'pera' // Copia parziale senza modificare l'originale const primi = frutta.slice(0, 2); // ['mela', 'pera'] // Rimozione e sostituzione con .splice() frutta.splice(0, 1); // rimuove 'mela' frutta.splice(1, 1, 'fragola', 'pesca'); // sostituisce un elemento con due // Inversione dell'ordine frutta.reverse(); // Sovrascrittura di tutti gli elementi frutta.fill('limone'); // Unione in stringa const lista = frutta.join(', '); Esercizio Parti dall'array ['rosso', 'verde', 'blu', 'giallo'] . Aggiungi 'viola' in coda, rimuovi il primo elemento, controlla se 'blu' è presente, ottieni una copia dei primi due elementi con slice e unisci tutto in una stringa con ' | ' come separatore. Mostra soluzione const colori = ['rosso', 'verde', 'blu', 'giallo']; colori.push('viola'); colori.shift(); console.log(colori.includes('blu')); // true const primiDue = colori.slice(0, 2); const stringa = colori.join(' | ');

### Destructuring
Il destructuring permette di estrarre uno o più valori da un array e assegnarli a variabili separate in una sola riga. Funziona seguendo l'ordine degli elementi: il primo nome nella struttura di destructuring riceve il primo valore dell'array, il secondo il secondo, e così via. Senza destructuring, per estrarre i valori da un array devi scrivere una riga per ogni elemento, usando l'indice. Con il destructuring lo fai in una sola istruzione, dichiarando i nomi delle variabili tra parentesi quadre a sinistra dell'uguale. Il risultato è lo stesso, ma il codice è più diretto e più semplice da leggere. Se non ti interessa un elemento puoi saltarlo lasciando una virgola vuota al suo posto. Se invece vuoi raccogliere tutti i valori rimanenti in un nuovo array puoi usare ...rest come ultimo elemento della struttura di destructuring: tutto ciò che non è stato estratto finisce lì dentro. Esempio const coordinate = ['Roma', 41.9, 12.4]; // Senza destructuring const citta1 = coordinate[0]; const lat1 = coordinate[1]; const lon1 = coordinate[2]; // Con destructuring: stessa cosa in una riga const [citta, lat, lon] = coordinate; // Salto un elemento lasciando la virgola vuota const [nome, , longitudine] = coordinate; // Raccolgo i valori rimanenti in un nuovo array con ...rest const stagioni = ['primavera', 'estate', 'autunno', 'inverno']; const [prima, seconda, ...ultime] = stagioni; console.log(prima); // 'primavera' console.log(ultime); // ['autunno', 'inverno'] Esercizio Hai l'array ['Mario Rossi', 42, 'Roma', 'sviluppatore', 'italiano'] . Estrai nome, età e città con il destructuring, salta la quarta voce e raccogli il resto in un array separato. Stampa ogni variabile in console. Mostra soluzione const persona = ['Mario Rossi', 42, 'Roma', 'sviluppatore', 'italiano']; const [nome, eta, citta, , ...altro] = persona; console.log(nome); // 'Mario Rossi' console.log(eta); // 42 console.log(citta); // 'Roma' console.log(altro); // ['italiano']

### Spread operator
Lo spread operator si scrive ... davanti al nome di un array e ne espande tutti gli elementi nel punto in cui viene usato. È utile per clonare un array, unirne più di uno o aggiungere valori senza modificare l'originale. Quando assegni un array a una nuova variabile con il semplice uguale ( = ), non stai creando una copia: stai puntando allo stesso array. Qualsiasi modifica sulla nuova variabile cambia anche l'originale. Lo spread risolve questo problema: [...array] crea una copia indipendente, così le due variabili non si influenzano più a vicenda. Lo spread è utile anche per unire più array in uno solo o per inserire nuovi valori in posizioni precise senza modificare le liste originali. Si scrive semplicemente mettendo ... davanti a ciascun array all'interno delle parentesi quadre del nuovo array. Esempio const originale = ['uno', 'due', 'tre']; // Assegnazione diretta: non è una copia, puntano allo stesso array const nonCopia = originale; nonCopia.push('quattro'); console.log(originale); // ['uno', 'due', 'tre', 'quattro'] — l'originale è cambiato! // Clonazione con spread: copia indipendente const copia = [...originale]; copia.push('cinque'); console.log(originale); // non cambia console.log(copia); // ['uno', 'due', 'tre', 'quattro', 'cinque'] // Unione di due array const primiTre = ['a', 'b', 'c']; const secondiTre = ['d', 'e', 'f']; const tutti = [...primiTre, ...secondiTre]; // ['a', 'b', 'c', 'd', 'e', 'f'] // Aggiunta di valori in mezzo senza toccare gli originali const conExtra = [...primiTre, 'X', 'Y', ...secondiTre]; Esercizio Hai due array: ['React', 'Vue'] e ['Node', 'Express'] . Uniscili in un unico array usando lo spread. Poi crea una copia del primo array e aggiungi 'Angular' solo alla copia. Verifica che l'array originale sia rimasto invariato. Mostra soluzione const frontend = ['React', 'Vue']; const backend = ['Node', 'Express']; const tuttiFramework = [...frontend, ...backend]; const copiaFrontend = [...frontend]; copiaFrontend.push('Angular'); console.log(frontend); // ['React', 'Vue'] — invariato console.log(copiaFrontend); // ['React', 'Vue', 'Angular']

```javascript
// Array omogeneo di stringhe
const studenti = ['Anna', 'Luca', 'Sara'];

// Array omogeneo di numeri
const voti = [8, 7, 9];

// Array eterogeneo: tipi diversi nello stesso array
const scheda = ['Marco', 18, true];
```

```javascript
const materie = ['Italiano', 'Matematica', 'Storia', 'Inglese'];
const voti = [7, 8, 6, 9];
const presenze = [true, false, true, true, false];
```

```javascript
const studenti = ['Anna', 'Luca', 'Sara', 'Marco'];

// Leggo il primo e l'ultimo elemento con l'indice
console.log(studenti[0]);                    // 'Anna'
console.log(studenti[studenti.length - 1]);  // 'Marco'

// Visualizzo l'array come tabella nella console
console.table(studenti);

// Scorro tutti gli elementi con un ciclo for
for (let i = 0; i < studenti.length; i++) {
    console.log(studenti[i]);
}
```

```javascript
const numeri = [3, 8, 1, 6, 4];

console.log(numeri.length);

for (let i = 0; i < numeri.length; i++) {
    if (numeri[i] > 5) {
        console.log(numeri[i]);
    }
}
```

```javascript
const frutta = ['mela', 'pera', 'banana', 'kiwi'];

// Aggiunta in coda e in testa
frutta.push('uva');           // ['mela', 'pera', 'banana', 'kiwi', 'uva']
frutta.unshift('arancia');    // ['arancia', 'mela', 'pera', 'banana', 'kiwi', 'uva']

// Rimozione in coda e in testa
frutta.pop();                 // rimuove 'uva'
frutta.shift();               // rimuove 'arancia'

// Ricerca
console.log(frutta.includes('pera'));          // true
console.log(frutta.indexOf('banana'));         // 2

// Lettura per indice con .at()
console.log(frutta.at(1));    // 'pera'

// Copia parziale senza modificare l'originale
const primi = frutta.slice(0, 2);  // ['mela', 'pera']

// Rimozione e sostituzione con .splice()
frutta.splice(0, 1);                      // rimuove 'mela'
frutta.splice(1, 1, 'fragola', 'pesca'); // sostituisce un elemento con due

// Inversione dell'ordine
frutta.reverse();

// Sovrascrittura di tutti gli elementi
frutta.fill('limone');

// Unione in stringa
const lista = frutta.join(', ');
```
