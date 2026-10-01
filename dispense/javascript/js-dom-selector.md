# Selezione del DOM ed eventi

**Argomento:** JS | **Data Lezione:** 2026-06-13 | **File Sorgente:** lezioni/js-dom-selector.html

## Panoramica
Questi metodi sono stati molto usati per lavorare con il DOM: getElementById , getElementsByClassName , getElementsByTagName e getElementsByName . getElementById recupera un solo elemento usando il suo id . getElementsByClassName restituisce tutti gli elementi che hanno una certa classe, getElements...

### Metodi classici per selezionare elementi
Questi metodi sono stati molto usati per lavorare con il DOM: getElementById , getElementsByClassName , getElementsByTagName e getElementsByName . getElementById recupera un solo elemento usando il suo id . getElementsByClassName restituisce tutti gli elementi che hanno una certa classe, getElementsByTagName raccoglie tutti i tag con lo stesso nome e getElementsByName cerca gli elementi che condividono lo stesso attributo name . Questi metodi sono ancora validi, ma oggi molti casi si risolvono in modo più comodo con querySelector e querySelectorAll , che sono diventati i metodi più pratici da usare perché seguono la logica dei selettori CSS. Nel capitolo successivo questi due metodi vengono mostrati come alternativa moderna ai metodi classici. Esempio <h1 id="titolo">Titolo della pagina</h1> <div class="box">Primo box</div> <div class="box">Secondo box</div> <p>Un paragrafo di testo.</p> <input type="text" name="nome"> const titolo = document.getElementById('titolo'); // restituisce un elemento const elementiBox = document.getElementsByClassName('box'); // restituisce un array di elementi const paragrafi = document.getElementsByTagName('p'); // restituisce un array di elementi const campiNome = document.getElementsByName('nome'); // restituisce un array di elementi Esercizio Scrivi un codice che recuperi un elemento con id , tutti gli elementi con una classe, tutti i paragrafi e tutti i campi con lo stesso name . Mostra soluzione <h1 id="titolo">Titolo</h1> <div class="box">Box</div> <p>Paragrafo</p> <input name="nome"> const titolo = document.getElementById('titolo'); const box = document.getElementsByClassName('box'); const paragrafi = document.getElementsByTagName('p'); const campi = document.getElementsByName('nome');

### I metodi moderni di selezione
querySelector e querySelectorAll sono due metodi introdotti per selezionare gli elementi in modo più flessibile, usando la stessa sintassi dei selettori CSS. querySelector restituisce il primo elemento che corrisponde al selettore scelto. querySelectorAll restituisce invece tutti gli elementi che corrispondono al selettore e permette di lavorare con una lista di risultati da attraversare con un ciclo. Con questi due metodi si può cercare quasi tutto: un tag, una classe, un id, un figlio dentro un contenitore o un insieme di elementi con la stessa caratteristica. Per questo, nella pratica, sostituiscono spesso i metodi classici mostrati nel capitolo precedente. Esempio <h1>Titolo principale</h1> <button id="salva">Salva modifiche</button> <div class="scheda">Scheda 1</div> <div class="scheda">Scheda 2</div> const titolo = document.querySelector('h1'); // restituisce un elemento const pulsante = document.querySelector('#salva'); // restituisce un elemento const schede = document.querySelectorAll('.scheda'); // restituisce un array di elementi if (pulsante) { pulsante.addEventListener('click', () => { console.log('Click sul pulsante'); }); } for (let i = 0; i Esercizio Seleziona il primo titolo della pagina con querySelector e tutti gli elementi con classe scheda con querySelectorAll . Mostra soluzione <h1>Titolo</h1> <div class="scheda">Elemento</div> const titolo = document.querySelector('h1'); const schede = document.querySelectorAll('.scheda');

### Ascoltare gli eventi principali
Un evento è un'azione che accade nella pagina, per esempio un click, la pressione di un tasto o la modifica di un campo. Con addEventListener si collega una funzione a un evento in modo ordinato e riutilizzabile. Di seguito la tabella degli eventi più comuni: Evento Descrizione Elementi comuni click L'utente preme e rilascia il mouse su un elemento. Tutti (button, a, div, etc.) submit Viene inviato un modulo (form). form change Il valore di un elemento di input è cambiato. input, select, textarea input Il valore viene modificato (anche durante la digitazione). input, textarea focus Un elemento riceve il focus (es. cliccandoci dentro). input, a, button blur Un elemento perde il focus. input, a, button keydown L'utente preme un tasto sulla tastiera. document, input keyup L'utente rilascia un tasto sulla tastiera. document, input mouseover Il puntatore del mouse entra in un elemento. Tutti mouseout Il puntatore del mouse esce da un elemento. Tutti Esempio <button>Clicca qui</button> <input type="text" id="nome" placeholder="Inserisci nome"> const pulsante = document.querySelector('button'); const campoNome = document.querySelector('#nome'); pulsante.addEventListener('click', () => { console.log('Pulsante premuto'); }); campoNome.addEventListener('keydown', () => { console.log('Tasto premuto'); }); campoNome.addEventListener('change', () => { console.log('Valore cambiato'); }); Esercizio Collega un evento click a un pulsante e un evento change a un campo di input. Mostra soluzione <button>Pulsante</button> <input id="nome"> const pulsante = document.querySelector('button'); const input = document.querySelector('#nome'); pulsante.addEventListener('click', () => { console.log('Hai cliccato il pulsante'); }); input.addEventListener('change', () => { console.log('Valore modificato'); });

### esercizio-final
Esercizio finale Crea una pagina con un titolo, un campo di input e un pulsante. Seleziona il titolo e l'input e collega l'evento click al pulsante e change all'input. Mostra soluzione <h1 id="titolo">Titolo Pagina</h1> <div class="scheda">Scheda A</div> <div class="scheda">Scheda B</div> <input type="text" id="nome"> <button>Invia</button> const titolo = document.querySelector('#titolo'); const schede = document.querySelectorAll('.scheda'); const pulsante = document.querySelector('button'); const input = document.querySelector('#nome'); for (let i = 0; i { console.log(titolo); }); input.addEventListener('change', () => { console.log('Input modificato'); });

```html
<h1 id="titolo">Titolo della pagina</h1>
<div class="box">Primo box</div>
<div class="box">Secondo box</div>
<p>Un paragrafo di testo.</p>
<input type="text" name="nome">
```

```javascript
const titolo = document.getElementById('titolo'); // restituisce un elemento
const elementiBox = document.getElementsByClassName('box'); // restituisce un array di elementi
const paragrafi = document.getElementsByTagName('p'); // restituisce un array di elementi
const campiNome = document.getElementsByName('nome'); // restituisce un array di elementi
```

```html
<h1 id="titolo">Titolo</h1>
<div class="box">Box</div>
<p>Paragrafo</p>
<input name="nome">
```

```javascript
const titolo = document.getElementById('titolo');
const box = document.getElementsByClassName('box');
const paragrafi = document.getElementsByTagName('p');
const campi = document.getElementsByName('nome');
```

```html
<h1>Titolo principale</h1>
<button id="salva">Salva modifiche</button>
<div class="scheda">Scheda 1</div>
<div class="scheda">Scheda 2</div>
```
