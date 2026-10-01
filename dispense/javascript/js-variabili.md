# Variabili

**Argomento:** JS | **Data Lezione:** 2026-05-25 | **File Sorgente:** lezioni/js-variabili.html

## Panoramica
Il tag &lt;script&gt; può contenere JavaScript scritto direttamente nella pagina, collegare un file esterno con src oppure ospitare dati non eseguibili, come JSON. Il tag &lt;noscript&gt; mostra un contenuto alternativo quando JavaScript non è disponibile o non è attivo. Uno script può essere inseri...

### Inserire uno script in una pagina HTML
Il tag &lt;script&gt; può contenere JavaScript scritto direttamente nella pagina, collegare un file esterno con src oppure ospitare dati non eseguibili, come JSON. Il tag &lt;noscript&gt; mostra un contenuto alternativo quando JavaScript non è disponibile o non è attivo. Uno script può essere inserito in tre modi principali: direttamente nella pagina, in un file separato oppure su un singolo tag tramite un evento. La scelta dipende da quanto codice devi scrivere e da quanto vuoi tenere ordinato il progetto. Il codice inline è utile per esempi semplici, il file separato è più comodo quando il progetto cresce, mentre il codice legato a un evento serve per azioni rapide su un elemento preciso. Esempio pratico &lt;!-- Script in pagina --&gt; &lt;script&gt; console.log('Messaggio scritto direttamente nella pagina'); &lt;/script&gt; &lt;!-- Script in file separato --&gt; &lt;script src="assets/main.js"&gt;&lt;/script&gt; &lt;!-- Script collegato a un singolo elemento --&gt; &lt;button onclick="console.log('Click sul pulsante')"&gt;Premi qui&lt;/button&gt; Esercizio Scrivi un esempio con uno script esterno e aggiungi un contenuto alternativo per chi non ha JavaScript attivo. Mostra soluzione &lt;script src="assets/main.js"&gt;&lt;/script&gt; &lt;noscript&gt; Attiva JavaScript per usare tutte le funzionalità della pagina. &lt;/noscript&gt;

### Tipi di script e attributi utili
type="text/javascript" è la forma classica, type="module" abilita i moduli e type="application/json" serve per inserire dati JSON non eseguibili. defer rinvia l'esecuzione fino a quando l'HTML è stato analizzato, mentre async esegue il file appena è disponibile. Alcuni attributi cambiano il comportamento del tag &lt;script&gt; . type="module" permette di usare il sistema dei moduli, mentre type="application/json" è utile quando vuoi conservare dati dentro la pagina senza eseguirli. defer è adatto ai file esterni che devono aspettare la fine del parsing dell'HTML. async è utile quando il file può partire appena viene scaricato, senza dipendere dall'ordine della pagina. Esempio pratico &lt;script src="assets/main.js" defer&gt;&lt;/script&gt; &lt;script type="module"&gt; console.log('Questo script usa il tipo module'); &lt;/script&gt; &lt;script type="application/json" id="config"&gt; { "tema": "chiaro", "lingua": "it" } &lt;/script&gt; Esercizio Scrivi un tag &lt;script&gt; con defer e un secondo tag con type="module" . Mostra soluzione &lt;script src="assets/main.js" defer&gt;&lt;/script&gt; &lt;script type="module"&gt; console.log('Modulo attivo'); &lt;/script&gt;

### Variabili in JavaScript
In JavaScript moderno si usano soprattutto let e const . var è una sintassi storica e conviene evitarla nei nuovi progetti. Una variabile è un contenitore che salva un valore. Con let dichiari un valore che può cambiare, mentre con const dichiari un valore che non deve essere riassegnato. Questo aiuta a rendere il codice più chiaro e più sicuro da leggere. var esiste ancora, ma oggi si preferisce non usarlo perché il suo comportamento è meno chiaro e meno utile per scrivere codice moderno. Esempio pratico let nome = 'Luca'; const anno = 2026; let presente = true; nome = 'Marco'; Esercizio Crea una variabile per il nome dello studente, una costante per l'anno corrente e una variabile booleana per la presenza. Mostra soluzione let studente = 'Anna'; const anno = 2026; let presente = false;

### Tipi di dato fondamentali
I tre tipi base trattati sono string , number e boolean . Una string è un testo, un number è un valore numerico e un boolean può valere solo true o false . Questi tipi servono per rappresentare informazioni diverse in modo corretto. Quando scegli il tipo giusto, il codice diventa più leggibile e più facile da usare nelle operazioni successive. È importante distinguere tra testo e numero, perché non si comportano nello stesso modo. Esempio pratico const corso = 'JavaScript Base'; const lezioni = 8; const online = true; Esercizio Scrivi una stringa per il nome di un docente, un number per gli anni di esperienza e un boolean per dire se insegna online. Mostra soluzione const docente = 'Giulia'; const esperienza = 5; const online = false;

### Concatenazione e template literal
La concatenazione unisce stringhe con + , mentre i template literal usano i backtick e l'interpolazione con ${...} . Quando vuoi costruire una frase con più pezzi di testo, puoi unirli con la concatenazione. Con i template literal il risultato è più leggibile, soprattutto quando devi inserire variabili dentro una frase. I template literal sono molto utili perché permettono di scrivere una stringa lunga senza interromperla in tanti pezzi separati. Esempio pratico const nome = 'Sara'; const messaggio1 = 'Ciao ' + nome + '! Benvenuta al corso.'; const messaggio2 = `Ciao ${nome}! Benvenuta al corso.`; Esercizio Crea la stessa frase prima con concatenazione e poi con un template literal. Mostra soluzione const studente = 'Paolo'; const corso = 'JavaScript Base'; const frase1 = 'Lo studente ' + studente + ' segue il corso ' + corso + '.'; const frase2 = `Lo studente ${studente} segue il corso ${corso}.`;

### Operazioni algebriche sui numeri
Con i numeri puoi usare somma, sottrazione, moltiplicazione, divisione e resto della divisione. I valori numerici permettono di fare calcoli direttamente nel codice. Gli operatori principali sono + , - , * , / e % . Questi operatori servono per sommare, togliere, moltiplicare, dividere e trovare il resto. Sono la base per qualsiasi calcolo semplice in JavaScript. Esempio pratico const a = 12; const b = 5; const somma = a + b; const differenza = a - b; const prodotto = a * b; const divisione = a / b; const resto = a % b; Esercizio Usando 20 e 4 , calcola somma, prodotto e divisione. Mostra soluzione const x = 20; const y = 4; const somma = x + y; const prodotto = x * y; const divisione = x / y;

```html
<!-- Script in pagina -->
<script>
    console.log('Messaggio scritto direttamente nella pagina');
</script>

<!-- Script in file separato -->
<script src="assets/main.js"></script>

<!-- Script collegato a un singolo elemento -->
<button onclick="console.log('Click sul pulsante')">Premi qui</button>
```

```html
<script src="assets/main.js"></script>

<noscript>
    Attiva JavaScript per usare tutte le funzionalità della pagina.
</noscript>
```

```html
<script src="assets/main.js" defer></script>

<script type="module">
    console.log('Questo script usa il tipo module');
</script>

<script type="application/json" id="config">
    {
        "tema": "chiaro",
        "lingua": "it"
    }
</script>
```

```html
<script src="assets/main.js" defer></script>

<script type="module">
    console.log('Modulo attivo');
</script>
```

```javascript
let nome = 'Luca';
const anno = 2026;
let presente = true;

nome = 'Marco';
```
