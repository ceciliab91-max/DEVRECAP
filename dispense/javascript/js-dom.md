# DOM: testo, elementi, classi e attributi

**Argomento:** JS | **Data Lezione:** 2026-06-11 | **File Sorgente:** lezioni/js-dom.html

## Panoramica
Le proprietà innerHTML , textContent e innerText permettono di leggere o modificare il contenuto di un elemento. style permette invece di modificarne lo stile direttamente da JavaScript. innerHTML innerHTML legge o imposta il contenuto HTML di un elemento, compresi i tag al suo interno. Quando lo im...

### Testo
Le proprietà innerHTML , textContent e innerText permettono di leggere o modificare il contenuto di un elemento. style permette invece di modificarne lo stile direttamente da JavaScript. innerHTML innerHTML legge o imposta il contenuto HTML di un elemento, compresi i tag al suo interno. Quando lo imposti con una stringa, il browser la interpreta come HTML e aggiorna il DOM di conseguenza. Va usato con attenzione se il contenuto proviene dall'utente, perché un tag come <script> potrebbe essere eseguito, aprendo a vulnerabilità XSS.

### Elementi
createElement() , appendChild() , insertBefore() e remove() permettono di costruire e modificare la struttura del DOM aggiungendo o eliminando elementi. parentElement permette invece di risalire al genitore di un nodo. parentElement parentElement restituisce l'elemento HTML genitore del nodo su cui viene chiamato. Serve per risalire nella struttura del DOM partendo da un elemento figlio. Se il genitore non è un elemento HTML (per esempio è il documento stesso), restituisce null .

### Classi
classList è l'oggetto che gestisce le classi CSS di un elemento. Permette di aggiungere, rimuovere e alternare classi senza dover riscrivere l'intero attributo class . classList.add() classList.add() aggiunge una o più classi all'elemento. Se una delle classi è già presente, non viene duplicata. Puoi passare più classi come argomenti separati: classList.add("prima", "seconda") .

### Attributi
setAttribute() , getAttribute() , removeAttribute() e hasAttribute() permettono di leggere e modificare gli attributi HTML di un elemento, come href , src , alt , title o disabled . setAttribute() setAttribute() imposta un attributo sull'elemento con il nome e il valore indicati. Se l'attributo esiste già, ne aggiorna il valore. Se non esiste, lo crea. Riceve due argomenti: il nome dell'attributo e il valore da assegnargli.

### Template literal
I template literal possono essere combinati con innerHTML per costruire blocchi di HTML in modo leggibile, usando variabili e valori dinamici direttamente dentro la stringa. Come funziona Un template literal è una stringa delimitata da backtick che permette di inserire espressioni JavaScript con la sintassi ${...} . Quando lo usi con innerHTML , puoi costruire strutture HTML complete includendo valori dinamici, senza dover concatenare pezzi di stringa. Il risultato è codice più leggibile e facile da scrivere, soprattutto quando la struttura HTML da generare è complessa o contiene più elementi.

```javascript
const elemento = document.querySelector("#elem");

// innerHTML: interpreta i tag
elemento.innerHTML = "<strong>Testo in grassetto</strong>";

// textContent: tratta tutto come testo semplice
elemento.textContent = "<strong>Questo non è grassetto</strong>";

// innerText: legge solo il testo visibile
console.log(elemento.innerText);

// style: modifica lo stile inline
elemento.style.color = "red";
elemento.style.backgroundColor = "#f0f0f0";
elemento.style.fontSize = "18px";
```

```javascript
const box = document.querySelector("#box");
const contenuto = document.querySelector("#contenuto");

box.textContent = "Ciao mondo";
box.style.color = "blue";
contenuto.innerHTML = "<h2>Titolo</h2><p>Testo aggiornato</p>";
```

```javascript
const lista = document.querySelector("ul");
const primo = document.querySelector("ul li:first-child");

// Crea un elemento e aggiungilo in fondo
const nuovo = document.createElement("li");
nuovo.textContent = "Ultima voce";
lista.appendChild(nuovo);

// Inserisce prima del primo elemento
const altro = document.createElement("li");
altro.textContent = "Prima voce";
lista.insertBefore(altro, primo);

// Legge il genitore
console.log(nuovo.parentElement);

// Rimuove un elemento
altro.remove();
```

```javascript
const contenitore = document.querySelector(".contenitore");

const p1 = document.createElement("p");
p1.textContent = "Primo paragrafo";
contenitore.appendChild(p1);

const p2 = document.createElement("p");
p2.textContent = "Paragrafo inserito prima";
contenitore.insertBefore(p2, p1);

p1.remove();
```

```javascript
const card = document.querySelector(".card");

// Aggiunge una classe
card.classList.add("attiva");

// Aggiunge più classi insieme
card.classList.add("evidenza", "grande");

// Rimuove una classe
card.classList.remove("evidenza");

// Toggle: aggiunge se assente, rimuove se presente
card.classList.toggle("aperta");
```
