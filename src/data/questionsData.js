export const questionsData = [
  // ==========================================
  // --- MODULO CSS: DISPENSE UFFICIALI (25 Domande) ---
  // ==========================================
  {
    id: "css-01",
    subject: "CSS",
    chapter: "Selettori Avanzati & Combinatori",
    question: "Qual è la differenza fondamentale tra il selettore 'A B' (spazio) e il selettore 'A > B'?",
    codeSnippet: `/* Selettore 1 */ .container p { color: red; }
/* Selettore 2 */ .container > p { color: blue; }`,
    options: [
      "'A B' seleziona tutti i p all'interno di .container a qualsiasi livello di annidamento; 'A > B' seleziona solo i p che sono figli diretti di .container.",
      "'A > B' seleziona i p dentro qualsiasi div, mentre 'A B' seleziona solo i primi elementi.",
      "'A B' è un selettore di classe, mentre 'A > B' è un selettore di id.",
      "Non c'è alcuna differenza, entrambi selezionano solo ed esclusivamente i figli di primo livello."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa CSS (Selettori Avanzati): 'A B' è il combinatore discendente (seleziona B dentro A a qualsiasi livello), mentre 'A > B' seleziona B solo se è figlio diretto (primo livello) di A."
  },
  {
    id: "css-02",
    subject: "CSS",
    chapter: "Pseudo-classi :nth-child",
    question: "Come viene conteggiato l'indice dell'elemento nella pseudo-classe `:nth-child(n)` in CSS?",
    codeSnippet: `ul li:nth-child(1) {
  font-weight: bold;
}`,
    options: [
      "L'indice parte da 0 (base zero), quindi :nth-child(0) è il primo elemento.",
      "L'indice parte da 1 (base uno), quindi :nth-child(1) seleziona il primo elemento tra i fratelli.",
      "L'indice seleziona solo gli elementi con id numerico.",
      "L'indice parte da -1 per consentire il conteggio alla rovescia."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS: `:nth-child(n)` seleziona l'elemento che occupa la posizione n tra i fratelli. L'indice parte da 1, non da 0. Di conseguenza `:first-child` corrisponde esattamente a `:nth-child(1)`."
  },
  {
    id: "css-03",
    subject: "CSS",
    chapter: "Pseudo-classi :nth-child",
    question: "Quale formula con `:nth-child()` si utilizza per selezionare tutti gli elementi in posizione PARI e in posizione DISPARI?",
    codeSnippet: `/* Elementi Pari */ tr:nth-child(...) { background: #f0f0f0; }
/* Elementi Dispari */ tr:nth-child(...) { background: #ffffff; }`,
    options: [
      "Pari: :nth-child(even-only), Dispari: :nth-child(odd-only)",
      "Pari: :nth-child(2n), Dispari: :nth-child(2n+1)",
      "Pari: :nth-child(n/2), Dispari: :nth-child(n*2)",
      "Pari: :nth-child(pari), Dispari: :nth-child(dispari)"
    ],
    correctIndex: 1,
    explanation: "Dalla tabella delle Formule `:nth-child()`: `:nth-child(2n)` seleziona gli elementi pari (2, 4, 6, 8...), mentre `:nth-child(2n+1)` (o `:nth-child(odd)`) seleziona quelli dispari (1, 3, 5, 7...)."
  },
  {
    id: "css-04",
    subject: "CSS",
    chapter: "Pseudo-classi :nth-child",
    question: "Quali elementi vengono selezionati dalla regola `li:nth-child(3n+1)`?",
    codeSnippet: `ul li:nth-child(3n+1) {
  border-left: 3px solid blue;
}`,
    options: [
      "Seleziona il 3°, il 6°, il 9°, il 12° elemento.",
      "Seleziona solo il 3° ed il 1° elemento della lista.",
      "Seleziona il 1°, il 4°, il 7°, il 10° elemento (salti di 3 partendo dal 1°).",
      "Seleziona tutti gli elementi tranne i primi 3."
    ],
    correctIndex: 2,
    explanation: "Dalla dispensa CSS: la formula `3n+1` (per n=0, 1, 2, 3...) genera la sequenza 1°, 4°, 7°, 10° elemento. La formula `3n` selezionerebbe invece ogni 3 (3, 6, 9...)."
  },
  {
    id: "css-05",
    subject: "CSS",
    chapter: "Pseudo-classi :nth-child",
    question: "Cosa seleziona la regola `div:nth-child(n+3)`?",
    codeSnippet: `.card-container div:nth-child(n+3) {
  opacity: 0.5;
}`,
    options: [
      "Seleziona solo i primi 3 div.",
      "Seleziona dal 3° elemento in poi (3°, 4°, 5°, 6°...).",
      "Seleziona ogni 3 div.",
      "Seleziona solo il 3° ed il 4° div."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS: la formula `:nth-child(n+3)` (per n=0 -> 3, n=1 -> 4, n=2 -> 5...) seleziona tutti gli elementi dal terzo in poi."
  },
  {
    id: "css-06",
    subject: "CSS",
    chapter: "Pseudo-classe :not()",
    question: "Cosa fa il selettore `ul.menu li:not(:last-child)`?",
    codeSnippet: `ul.menu li:not(:last-child) {
  border-bottom: 1px solid #ccc;
}`,
    options: [
      "Applica il bordo inferiore a TUTTI i li tranne all'ultimo.",
      "Applica il bordo inferiore solo all'ultimo li della lista.",
      "Rimuove il bordo a tutti i li della lista.",
      "Seleziona i li che non hanno figli al loro interno."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa CSS: la pseudo-classe `:not(selettore)` esclude gli elementi corrispondenti. `li:not(:last-child)` seleziona tutti i `li` ESCLUSO l'ultimo (molto usato per separatori/bordi)."
  },
  {
    id: "css-07",
    subject: "CSS",
    chapter: "Google Fonts & Importazione",
    question: "Dove e come va importato correttamente un Google Font tramite tag HTML prima di usarlo in CSS?",
    codeSnippet: `<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">`,
    options: [
      "Va inserito nel tag `<body>` utilizzando il tag `<script>`.",
      "Si importa con il tag `<link>` all'interno della sezione `<head>` del documento HTML e si applica con `font-family` in CSS.",
      "Si importa direttamente nel file Javascript tramite `import font from 'google'`.",
      "Non occorre importarlo, basta scrivere `font-family: Roboto` nel CSS."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS (Google Font): i font Google si importano inserendo il tag `<link>` nell' `<head>` dell'HTML e poi si applicano nei selettori CSS specificando la proprietà `font-family`."
  },
  {
    id: "css-08",
    subject: "CSS",
    chapter: "Font e Testo - Font Weight",
    question: "A quali valori numerici corrispondono i pesi del font `Regular`, `Semi-bold` e `Bold`?",
    codeSnippet: `h1 { font-weight: 700; }
p { font-weight: 400; }`,
    options: [
      "Light=100, Regular=200, Bold=300",
      "Light=300, Regular=400, Semi-bold=600, Bold=700",
      "Regular=500, Semi-bold=800, Bold=1000",
      "I pesi font in CSS possono essere indicati solo con parole chiave (bold, normal)."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS (Font-weight): i valori standard numerici sono Light (300), Regular (400), Semi-bold (600), Bold (700)."
  },
  {
    id: "css-09",
    subject: "CSS",
    chapter: "Font e Testo - Proprietà Testuali",
    question: "Qual è il comportamento della regola `text-transform: capitalize;`?",
    codeSnippet: `.title {
  text-transform: capitalize;
}`,
    options: [
      "Trasforma l'intero testo in MAIUSCOLO.",
      "Trasforma l'intero testo in minuscolo.",
      "Mette in Maiuscola La Prima Lettera Di Ogni Parola.",
      "Rende il testo in corsivo ed in grassetto."
    ],
    correctIndex: 2,
    explanation: "Dalla dispensa CSS (Text-transform): `uppercase` rende tutto maiuscolo, `lowercase` tutto minuscolo, mentre `capitalize` rende maiuscola la prima lettera di ciascuna parola."
  },
  {
    id: "css-10",
    subject: "CSS",
    chapter: "Color - Hex, RGB & RGBA",
    question: "Cosa rappresenta il quarto parametro 'a' nella funzione `rgba(r, g, b, a)`?",
    codeSnippet: `.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}`,
    options: [
      "La saturazione del colore espresso in percentuale.",
      "L'Alpha di trasparenza (opacità), con valore compreso tra 0 (completamente trasparente) e 1 (completamente opaco).",
      "La luminosità del colore su una scala da 0 a 255.",
      "L'angolo di inclinazione del gradiente di colore."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS (RGBA con trasparenza): il quarto parametro indica il valore di opacità Alpha: `alpha: 1` è opaco al 100%, `alpha: 0.5` è trasparente al 50%."
  },
  {
    id: "css-11",
    subject: "CSS",
    chapter: "Background - Shorthand Syntax",
    question: "Nella sintassi shorthand `background: #333 url('img.jpg') center / cover no-repeat;`, a cosa serve la barra `/` tra `center` e `cover`?",
    codeSnippet: `background: #333 url('sfondo.jpg') center / cover no-repeat;`,
    options: [
      "Separa la posizione (background-position) dalla dimensione (background-size).",
      "Separa il colore di sfondo dall'immagine.",
      "Indica una divisione matematica delle dimensioni della viewport.",
      "Serviva solo nei vecchi browser ed è oggi sconsigliata."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa CSS (Shorthand background): nella sintassi abbreviata `background`, la dimensione `background-size` (es. `cover`) DEVE obbligatoriamente seguire la posizione `background-position` (es. `center`) preceduta dalla barra `/` (posizione / dimensione)."
  },
  {
    id: "css-12",
    subject: "CSS",
    chapter: "Background - Size Cover vs Contain",
    question: "Qual è la differenza tra `background-size: cover` e `background-size: contain`?",
    codeSnippet: `.hero { background-size: cover; }
.logo-box { background-size: contain; }`,
    options: [
      "`cover` ridimensiona l'immagine affinché copra tutto il box (potrebbe essere ritagliata); `contain` mostra l'immagine intera dentro il box (potrebbero esserci spazi vuoti).",
      "`contain` copre tutto il box ritagliando i bordi, mentre `cover` la mostra intera.",
      "`cover` funziona solo su immagini PNG, `contain` su immagini JPG.",
      "Non c'è alcuna differenza visiva."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa CSS: `cover` -> l'immagine copre tutto il box (potrebbe essere ritagliata). `contain` -> l'immagine intera è totalmente visibile (senza tagli, ma con possibili spazi vuoti)."
  },
  {
    id: "css-13",
    subject: "CSS",
    chapter: "Pseudo-elementi ::before e ::after",
    question: "Quale proprietà è TASSATIVAMENTE OBBLIGATORIA affinché i pseudo-elementi `::before` o `::after` compaiano a schermo?",
    codeSnippet: `.box::before {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background: red;
}`,
    options: [
      "display: flex",
      "content (anche stringa vuota content: '')",
      "position: absolute",
      "z-index: 1"
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS (Pseudo-elementi ::before e ::after): `::before` e `::after` inseriscono contenuto prima o dopo l'elemento usando la proprietà `content`. Senza la proprietà `content` il pseudo-elemento non viene generato dal browser."
  },
  {
    id: "css-14",
    subject: "CSS",
    chapter: "Float & Clearfix",
    question: "Come si risolve il problema del contenitore che 'collassa' quando contiene elementi con `float: left` o `float: right`?",
    codeSnippet: `.container::after {
  content: "";
  display: table;
  clear: both;
}`,
    options: [
      "Applicando `position: absolute` al contenitore genitore.",
      "Utilizzando il pattern 'Clearfix' sul contenitore genitore (`::after { content: ''; display: table; clear: both; }`).",
      "Rimuovendo tutti i margini esterni dagli elementi figli.",
      "Impostando `float: none` su tutti gli elementi della pagina."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS (Float & Clearfix): un contenitore con elementi flottanti collassa in altezza. Il problema si risolve 'chiarendo' il contenitore con il clearfix: `.container::after { content: ''; display: table; clear: both; }`."
  },
  {
    id: "css-15",
    subject: "CSS",
    chapter: "Unità di Misura - rem vs em",
    question: "Se l'elemento `<html>` ha `font-size: 20px;`, a quanti pixel corrisponde `font-size: 1.5rem;`?",
    codeSnippet: `html { font-size: 20px; }
h2 { font-size: 1.5rem; }`,
    options: [
      "15px",
      "24px",
      "30px (1.5 × 20px)",
      "32px"
    ],
    correctIndex: 2,
    explanation: "Dalla dispensa CSS (Unità di misura - rem): `rem` è relativo alla root (`<html>`). Calcolo: 1.5 × 20px = 30px."
  },
  {
    id: "css-16",
    subject: "CSS",
    chapter: "Unità di Misura - em Annidati",
    question: "Se un `<div>` genitore ha `font-size: 16px;` ed un figlio `<span>` ha `font-size: 2em;`, a quanti pixel corrisponde la dimensione del testo del figlio?",
    codeSnippet: `.parent { font-size: 16px; }
.child { font-size: 2em; }`,
    options: [
      "18px",
      "32px (2 × 16px)",
      "64px",
      "16px"
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS (Unità di misura - em): `em` è relativo al font-size dell'elemento genitore diretto. Calcolo: 2 × 16px = 32px."
  },
  {
    id: "css-17",
    subject: "CSS",
    chapter: "Unità di Misura - Viewport (vw / vh)",
    question: "Su uno schermo con larghezza di 1440px, a quanto equivale la proprietà `width: 50vw;`?",
    codeSnippet: `.banner {
  width: 50vw;
}`,
    options: [
      "500px",
      "720px (50% di 1440px)",
      "1440px",
      "50px"
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS (Unità di misura - vh/vw): `vw` rappresenta la percentuale rispetto alla larghezza totale della Viewport. 50vw = 50% di 1440px = 720px."
  },
  {
    id: "css-18",
    subject: "CSS",
    chapter: "Positioning - Absolute",
    question: "Rispetto a quale elemento si posiziona un elemento con `position: absolute; top: 10px; right: 10px;`?",
    codeSnippet: `.card { position: relative; }
.badge { position: absolute; top: 10px; right: 10px; }`,
    options: [
      "Sempre e soltanto rispetto all'angolo in alto a destra dello schermo (viewport).",
      "Rispetto al primo elemento antenato (genitore) che possiede `position` diversa da `static` (es. `position: relative`).",
      "Rispetto al primo elemento di testo che lo precede nell'HTML.",
      "Sotto l'ultimo elemento presente nel footer."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS & Mini Esercizio Badge: `position: absolute` posiziona l'elemento rispetto al primo antenato con `position ≠ static`. Se la `.card` ha `position: relative`, il badge con `absolute` si posiziona sui suoi bordi."
  },
  {
    id: "css-19",
    subject: "CSS",
    chapter: "Positioning - Relative vs Static",
    question: "Cosa accade quando si applica `position: relative; top: 10px; left: 20px;` su un elemento?",
    codeSnippet: `.box {
  position: relative;
  top: 10px;
  left: 20px;
}`,
    options: [
      "L'elemento esce completamente dal flusso del documento e gli altri elementi ne occupano lo spazio.",
      "L'elemento viene spostato visivamente dalla sua posizione originale, ma lo spazio originale nel flusso rimane riservato.",
      "L'elemento si blocca in cima allo schermo durante lo scorrimento.",
      "L'elemento si trasforma in un contenitore flex."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS (Positioning relative): `relative` sposta l'elemento rispetto alla sua posizione originale SENZA farlo uscire dal flusso. Lo spazio originale occupato dall'elemento viene riservato."
  },
  {
    id: "css-20",
    subject: "CSS",
    chapter: "Positioning - Sticky",
    question: "Come si comporta un elemento con `position: sticky; top: 0;`?",
    codeSnippet: `.navbar {
  position: sticky;
  top: 0;
}`,
    options: [
      "Rimane sempre fisso al centro della pagina.",
      "Segue il normale flusso della pagina finché non raggiunge la soglia `top: 0` durante lo scorrimento, momento in cui si 'incolla' allo schermo.",
      "Scompare immediatamente non appena l'utente effettua uno scroll.",
      "Si posiziona in fondo alla pagina."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa CSS (Positioning sticky): `sticky` è una combinazione tra relative e fixed: si comporta come elemento normale finché non raggiunge il punto specificato (`top: 0`), in cui diventa fisso durante lo scroll."
  },
  {
    id: "css-21",
    subject: "CSS",
    chapter: "Flexbox - Contenitore & Asse Principale",
    question: "Cosa accade applicando `display: flex;` ad un contenitore `<div class='container'>`?",
    codeSnippet: `.container {
  display: flex;
}`,
    options: [
      "Tutti i suoi figli diretti (flex items) si disporranno automaticamente in orizzontale sull'asse principale (main axis) di default.",
      "Tutti gli elementi della pagina si trasformano in una griglia bidimensionale.",
      "Gli elementi figli vengono centrati verticalmente ed orizzontalmente in automatico.",
      "Tutti gli elementi figli diventano trasparenti."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Flexbox (display: flex): applicando `display: flex`, tutti i figli diretti diventano flex items e si dispongono in orizzontale sull'asse principale (`flex-direction: row` di default)."
  },
  {
    id: "css-22",
    subject: "CSS",
    chapter: "Flexbox - flex-direction",
    question: "Come si dispongono i flex items con `flex-direction: column-reverse;`?",
    codeSnippet: `.sidebar {
  display: flex;
  flex-direction: column-reverse;
}`,
    options: [
      "In riga da destra verso sinistra.",
      "In colonna dal basso verso l'alto (dal basso in alto).",
      "In colonna dall'alto verso il basso.",
      "Si dispongono a griglia 2x2."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa Flexbox (flex-direction): `row` -> sinistra-destra, `row-reverse` -> destra-sinistra, `column` -> alto-basso, `column-reverse` -> dal basso in alto."
  },
  {
    id: "css-23",
    subject: "CSS",
    chapter: "Flexbox - justify-content",
    question: "Quale valore di `justify-content` posiziona il PRIMO elemento all'inizio, l'ULTIMO alla fine ed organizza uno spazio UGUALE tra di essi?",
    codeSnippet: `.navbar {
  display: flex;
  justify-content: space-between;
}`,
    options: [
      "justify-content: center;",
      "justify-content: space-around;",
      "justify-content: space-between;",
      "justify-content: space-evenly;"
    ],
    correctIndex: 2,
    explanation: "Dalla dispensa Flexbox (justify-content): `space-between` colloca il primo e l'ultimo item esattamente ai bordi del contenitore, distribuendo lo spazio residuo in parti uguali tra gli elementi interni."
  },
  {
    id: "css-24",
    subject: "CSS",
    chapter: "Flexbox - align-items & flex-wrap",
    question: "A cosa serve la proprietà `flex-wrap: wrap;`?",
    codeSnippet: `.gallery {
  display: flex;
  flex-wrap: wrap;
}`,
    options: [
      "Impedisce agli elementi di ridimensionarsi.",
      "Permette ai flex items di andare automaticamente a capo su più righe quando lo spazio orizzontale non è sufficiente.",
      "Inverte l'ordine degli elementi nella lista.",
      "Centra gli elementi verticalmente sul cross axis."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa Flexbox (flex-wrap): di default (`nowrap`) gli elementi si comprimono sulla stessa riga. Con `flex-wrap: wrap` gli elementi vanno a capo su nuova riga quando manca lo spazio."
  },
  {
    id: "css-25",
    subject: "CSS",
    chapter: "Flexbox - order & Accessibilità",
    question: "La proprietà `order: -1` in Flexbox modifica l'ordine del codice nell'HTML o nell'albero DOM?",
    codeSnippet: `.cta-button {
  order: -1;
}`,
    options: [
      "Sì, modifica la struttura del DOM ed anche la sequenza letta dagli screen reader per i non vedenti.",
      "No, cambia SOLO l'aspetto visuale. L'ordine logico nel DOM per screen reader e navigazione da tastiera resta invariato.",
      "Sì, riordina automaticamente tutti i tag del file index.html.",
      "Funziona solo se l'elemento è impostato su position fixed."
    ],
    correctIndex: 1,
    explanation: "Dalla dispensa Flexbox (order & Avvertenza Accessibilità): `order` modifica esclusivamente l'aspetto visuale, NON l'ordine nel DOM. Per l'accessibilità (screen reader e navigazione da tastiera) l'ordine logico resta quello HTML."
  },

  // ==========================================
  // --- MODULO JAVASCRIPT: DISPENSE UFFICIALI (25 Domande) ---
  // ==========================================
  {
    id: "js-01",
    subject: "JavaScript",
    chapter: "JavaScript Base & Tipi di Dati",
    question: "Qual è l'output di `typeof null` e `typeof undefined` in JavaScript?",
    codeSnippet: `console.log(typeof null);
console.log(typeof undefined);`,
    options: [
      "'object' e 'undefined'",
      "'null' e 'undefined'",
      "'object' e 'object'",
      "'undefined' e 'null'"
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa JavaScript Base: per un errore storico conservato in JS, `typeof null` restituisce `'object'`, mentre `typeof undefined` restituisce `'undefined'`."
  },
  {
    id: "js-02",
    subject: "JavaScript",
    chapter: "Condizioni & Operatori Logici",
    question: "Come si comporta l'operatore Nullish Coalescing (`??`) a differenza dell'operatore OR logico (`||`)?",
    codeSnippet: `const punteggio = 0;
const a = punteggio || 10;
const b = punteggio ?? 10;`,
    options: [
      "`||` considera falsy anche 0 e la stringa vuota '', mentre `??` considera sostitutivi SOLO `null` e `undefined` (quindi b vale 0).",
      "`??` restituisce true o false, mentre `||` unisce due stringhe.",
      "Entrambi gli operatori producono il medesimo risultato a = 10 e b = 10.",
      "`??` è l'operatore di uguaglianza stretta in JS."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Condizioni ed Operatori Logici: `||` restituisce il valore destro se il sinistro è falsy (0, '', false, null, undefined). `??` (Nullish Coalescing) valuta come sostitutivo solo se il valore è strettamente `null` o `undefined`. Quindi con `punteggio = 0`, `b` conserva il valore `0`."
  },
  {
    id: "js-03",
    subject: "JavaScript",
    chapter: "Cicli, Incrementi e Scope",
    question: "Qual è la differenza tra `let`, `const` e `var` rispetto al Block Scope (`{}`)?",
    codeSnippet: `{
  var x = 10;
  let y = 20;
}`,
    options: [
      "`var` non rispetta il block scope ed è accessibile anche all'esterno del blocco `{}`; `let` e `const` hanno scope di blocco e non sono accessibili fuori.",
      "`let` e `const` sono accessibili ovunque nella pagina senza limiti.",
      "`var` è obbligatorio dentro i cicli for, mentre `let` è vietato.",
      "`const` permette la riassegnazione mentre `var` la impedisce."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Cicli e Scope: `let` e `const` sono vincolati al blocco di codice racchiuso tra parentesi graffe `{}` in cui vengono dichiarati. `var` ha scope di funzione o globale ignorando i blocchi."
  },
  {
    id: "js-04",
    subject: "JavaScript",
    chapter: "Funzioni & Return Implicito",
    question: "Qual è la sintassi corretta per definire un'Arrow Function con return implicito di un oggetto JS?",
    codeSnippet: `const creaUtente = (nome) => ({ nome: nome, attivo: true });`,
    options: [
      "Occorre racchiudere le parentesi graffe dell'oggetto tra parentesi tonde `({ ... })`.",
      "Basta scrivere `const creaUtente = (nome) => { nome: nome };` senza parentesi tonde.",
      "Le Arrow function non possono mai restituire oggetti.",
      "Si usa l'istruzione `return object { ... }`."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Arrow Functions: per restituire un oggetto literal con return implicito in una arrow function, le parentesi graffe dell'oggetto vanno avvolte tra parentesi tonde `({ ... })` per evitare che JS le interpreti come blocco di codice della funzione."
  },
  {
    id: "js-05",
    subject: "JavaScript",
    chapter: "Oggetti & Optional Chaining",
    question: "A cosa serve l'operatore Optional Chaining `?.` in JavaScript?",
    codeSnippet: `const Citta = utente?.indirizzo?.citta;`,
    options: [
      "Evita che lo script generi un errore fatale (`Cannot read property of undefined`) se una proprietà intermedia dell'oggetto è `null` o `undefined`, restituendo `undefined`.",
      "Crea automaticamente le proprietà mancanti impostandole a stringa vuota.",
      "Esegue la conversione di un oggetto in stringa JSON.",
      "Permette di concatenare due array in un solo oggetto."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Oggetti: l'Optional Chaining (`?.`) interrompe la valutazione dell'espressione e restituisce `undefined` se la variabile prima del punto è `null` o `undefined`, prevenendo crash di runtime."
  },
  {
    id: "js-06",
    subject: "JavaScript",
    chapter: "Array e Metodi Base",
    question: "Qual è il comportamento dei metodi `.push()` e `.pop()` sugli Array in JavaScript?",
    codeSnippet: `const frutta = ['mela', 'banana'];
frutta.push('pera');
const ultima = frutta.pop();`,
    options: [
      "`.push()` aggiunge un elemento in coda all'array mutandolo; `.pop()` rimuove ed estrae l'ultimo elemento dell'array.",
      "`.push()` rimuove il primo elemento, `.pop()` ne aggiunge uno all'inizio.",
      "Entrambi restituiscono un nuovo array immutabile senza modificare l'originale.",
      "`.push()` ordina l'array in ordine alfabetico."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Array: `.push()` inserisce un nuovo elemento alla fine dell'array e ne modifica la lunghezza. `.pop()` rimuove l'ultimo elemento mutando l'array originale."
  },
  {
    id: "js-07",
    subject: "JavaScript",
    chapter: "Arrow Function e Metodi Array - filter",
    question: "Cosa restituisce il metodo `.filter()` applicato su un array?",
    codeSnippet: `const numeri = [10, 15, 20, 25];
const maggiori18 = numeri.filter(n => n >= 18);`,
    options: [
      "Un NUOVO array contenente solo gli elementi che soddisfano la condizione booleana della callback (es. [20, 25]).",
      "Il primo singolo elemento che supera la condizione.",
      "Un valore booleano true/false.",
      "Modifica l'array originale eliminando gli elementi non validi."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Arrow Function e Metodi Array: `.filter()` è un metodo immutabile che crea e restituisce un nuovo array con tutti gli elementi che superano il test della funzione di callback."
  },
  {
    id: "js-08",
    subject: "JavaScript",
    chapter: "Arrow Function e Metodi Array - map",
    question: "Qual è la caratteristica fondamentale di `.map()` rispetto a un ciclo `.forEach()`?",
    codeSnippet: `const nomi = ['anna', 'marco'];
const maiuscoli = nomi.map(n => n.toUpperCase());`,
    options: [
      "`.map()` restituisce sempre un nuovo array trasformato di pari lunghezza; `.forEach()` non restituisce nulla (`undefined`) e serve solo per iterare producendo side-effect.",
      "`.forEach()` è più veloce ed immutabile, mentre `.map()` modifica l'array originale.",
      "`.map()` funziona solo su array di numeri.",
      "Non c'è alcuna differenza, sono due sinonimi della stessa funzione."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Metodi Array: `.map()` trasforma ogni elemento dell'array e restituisce un nuovo array della stessa lunghezza. `.forEach()` esegue codice per ogni elemento ma restituisce `undefined`."
  },
  {
    id: "js-09",
    subject: "JavaScript",
    chapter: "Arrow Function e Metodi Array - reduce",
    question: "A cosa serve il metodo `.reduce()` in JavaScript?",
    codeSnippet: `const prezzi = [10, 20, 30];
const totale = prezzi.reduce((acc, p) => acc + p, 0);`,
    options: [
      "Riduce l'array ad un singolo valore finale (es. la somma o un oggetto accumulatore) applicando una funzione di accumulo.",
      "Riduce la dimensione dell'array cancellando gli elementi nulli.",
      "Ordina gli elementi dal più piccolo al più grande.",
      "Converte l'array in una stringa HTML."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Metodi Array: `.reduce()` cicla l'array accumulando i valori in una singola variabile `accumulator` partendo dal valore iniziale fornito (es. `0`), restituendo un unico valore finale."
  },
  {
    id: "js-10",
    subject: "JavaScript",
    chapter: "DOM - Selezione ed Eventi",
    question: "Cosa fa il metodo `event.preventDefault()` all'interno dell'handler di un evento `submit` su un Form?",
    codeSnippet: `const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Form inviato via JS!");
});`,
    options: [
      "Impedisce il comportamento predefinito del browser (ovvero il ricaricamento della pagina ed il refresh dell'URL).",
      "Cancella tutti i campi di input del form.",
      "Disabilita il pulsante di invio del form.",
      "Invia i dati al server backend tramite richiesta POST automatica."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Selezione DOM ed Eventi: nei form, l'evento `submit` ricarica la pagina per impostazione predefinita del browser. `e.preventDefault()` blocca questo refresh consentendo la gestione tramite JS/AJAX."
  },
  {
    id: "js-11",
    subject: "JavaScript",
    chapter: "DOM - Manipolazione Elementi e Classi",
    question: "Qual è la sintassi corretta per aggiungere, rimuovere e fare il toggle di una classe CSS su un elemento DOM `el`?",
    codeSnippet: `const btn = document.querySelector('.btn');
btn.classList.toggle('active');`,
    options: [
      "`el.classList.add('cls')`, `el.classList.remove('cls')`, `el.classList.toggle('cls')`",
      "`el.className += 'cls'`, `el.className -= 'cls'`",
      "`el.setStyle('cls')`",
      "`el.addClass('cls')` e `el.removeClass('cls')`"
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa DOM: la proprietà `.classList` mette a disposizione i metodi nativi `.add()`, `.remove()`, `.contains()` e `.toggle()` per gestire le classi CSS senza sovrascrivere l'attributo `className`."
  },
  {
    id: "js-12",
    subject: "JavaScript",
    chapter: "DOM - textContent vs innerHTML",
    question: "Qual è la differenza di sicurezza principale tra `element.textContent` ed `element.innerHTML`?",
    codeSnippet: `/* Metodo 1 */ box.textContent = "<b>Testo</b>";
/* Metodo 2 */ box.innerHTML = "<b>Testo</b>";`,
    options: [
      "`innerHTML` interpreta le stringhe come markup HTML (con rischi di sicurezza XSS); `textContent` inserisce solo testo puro effettuando l'escape automatico del codice HTML.",
      "`textContent` permette di inserire tag `<script>` sicuri.",
      "`innerHTML` è più veloce e consigliato per l'input proveniente dagli utenti.",
      "Non c'è alcuna differenza, entrambi renderizzano i tag in grassetto."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa DOM: `innerHTML` trasforma la stringa in nodi HTML reali. Se la stringa contiene input utente non sanificato può provocare vulnerabilità XSS. `textContent` tratta invece il valore sempre come testo piano privo di tag."
  },
  {
    id: "js-13",
    subject: "JavaScript",
    chapter: "LocalStorage & Persistenza Dati",
    question: "Come si converte un oggetto o array JavaScript per poterlo salvare in `localStorage`?",
    codeSnippet: `const utente = { nome: "Mario", ruolo: "Dev" };
localStorage.setItem('user', JSON.stringify(utente));`,
    options: [
      "Convertendolo in stringa con `JSON.stringify(oggetto)` prima del salvataggio e rileggendolo con `JSON.parse(stringa)`.",
      "Salvandolo direttamente senza conversione `localStorage.setItem('user', utente)`.",
      "Utilizzando la funzione `Object.toStorage(utente)`.",
      "I dati in localStorage si possono salvare solo sotto forma di numeri."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa LocalStorage: `localStorage` memorizza esclusivamente coppie chiave-valore di tipo Stringa. Per salvare strutture complesse (oggetti/array) occorre prima serializzarle con `JSON.stringify()`."
  },
  {
    id: "js-14",
    subject: "JavaScript",
    chapter: "Timing Functions",
    question: "Qual è il comportamento di `setInterval()` e come si arresta l'esecuzione ciclica?",
    codeSnippet: `const timerId = setInterval(() => {
  console.log("Tick");
}, 1000);

// Per fermarlo:
clearInterval(timerId);`,
    options: [
      "`setInterval` esegue ripetutamente la funzione a intervalli regolari di millisecondi; si ferma passando il suo ID a `clearInterval(timerId)`.",
      "`setInterval` esegue la funzione una sola volta dopo l'intervallo specificato.",
      "Si arresta automaticamente dopo 10 iterazioni.",
      "Per fermarlo si usa l'istruzione `stopInterval()`."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Timing Functions: `setInterval(fn, ms)` esegue la callback in maniera continuativa ogni N millisecondi. Per bloccarne l'esecuzione occorre memorizzare il riferimento restituito e passarlo a `clearInterval(timerId)`."
  },
  {
    id: "js-15",
    subject: "JavaScript",
    chapter: "Richieste HTTP & Promises",
    question: "Cosa restituisce una chiamata `fetch('https://api.example.com/data')` prima di estrarre il JSON?",
    codeSnippet: `fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));`,
    options: [
      "Restituisce una Promise che si risolve in un oggetto `Response` HTTP.",
      "Restituisce direttamente l'array finale di dati JSON.",
      "Restituisce un valore booleano true/false di avvenuta connessione.",
      "Esegue la chiamata in modo sincrono bloccando la pagina."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Richieste HTTP: `fetch()` restituisce una Promise che si risolve con l'oggetto `Response`. Per accedere al body decodificato in formato JSON è necessario chiamare il metodo asincrono `response.json()`."
  },

  // ==========================================
  // --- MODULO REACT: DISPENSE UFFICIALI (25 Domande) ---
  // ==========================================
  {
    id: "react-01",
    subject: "React",
    chapter: "React Base & JSX Syntax",
    question: "Quali sono le regole fondamentali per scrivere codice JSX all'interno di un componente React?",
    codeSnippet: `function App() {
  return (
    <>
      <h1 className="title">Hello World</h1>
      <br />
    </>
  );
}`,
    options: [
      "I tag devono chiudersi tutti (es. `<br />`), l'attributo `class` diventa `className` e deve esserci un unico elemento radice (o un Fragment `<>...</>`).",
      "Il JSX è esattamente codice HTML identico senza alcuna variazione.",
      "Non è possibile usare variabili JS dentro il JSX.",
      "È obbligatorio usare solo componenti a classe."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa React Base: in JSX tutti i tag self-closing devono essere chiusi esplicitamente (`<img />`), gli attributi HTML riservati si convertono (`class` -> `className`, `for` -> `htmlFor`) e il return deve avere un solo contenitore padre o Fragment."
  },
  {
    id: "react-02",
    subject: "React",
    chapter: "Props & Passaggio Dati",
    question: "Come si passano e si leggono le Props in un componente funzionale React?",
    codeSnippet: `/* Utilizzo */ <Card titolo="React" prezzo={29} />

/* Definizione */
function Card({ titolo, prezzo }) {
  return <h2>{titolo} - €{prezzo}</h2>;
}`,
    options: [
      "Le props vengono passate come attributi nel JSX e lette tramite il primo parametro della funzione del componente (spesso destrutturato `{ titolo, prezzo }`).",
      "Le props si leggono solo definendo variabili globali con `window.props`.",
      "Le props possono essere modificate direttamente dal componente figlio tramite `props.titolo = 'Nuovo'`.",
      "Le props sono riservate solo ai componenti a classe."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa React Props: le props sono l'argomento di input del componente (read-only / immutabili). Permettono di passare dati da un componente genitore a un componente figlio."
  },
  {
    id: "react-03",
    subject: "React",
    chapter: "Props & children Prop",
    question: "Cosa rappresenta la prop speciale `props.children` in React?",
    codeSnippet: `function Box({ children }) {
  return <div className="card shadow">{children}</div>;
}`,
    options: [
      "Tutto ciò che viene racchiuso all'interno del tag di apertura e chiusura del componente (es. `<Box><h1>Contenuto</h1></Box>`).",
      "L'elenco dei componenti fratelli presenti nel DOM.",
      "La lista degli stati definiti con `useState`.",
      "Un metodo per cancellare i nodi figli."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa React Props: `children` è una prop speciale automatica in React che contiene gli elementi o il testo racchiusi tra il tag di apertura e di chiusura del componente custom."
  },
  {
    id: "react-04",
    subject: "React",
    chapter: "Eventi & useState",
    question: "Come si aggiorna correttamente lo stato con `useState` e cosa provoca una chiamata a `setState`?",
    codeSnippet: `const [contatore, setContatore] = useState(0);

const incrementa = () => {
  setContatore(contatore + 1);
};`,
    options: [
      "Chiamare `setContatore` aggiorna lo stato e richiede a React di re-renderizzare il componente con il nuovo valore.",
      "Modifica direttamente la variabile `contatore = contatore + 1` senza causare re-render.",
      "Salva automaticamente lo stato nel localStorage del browser.",
      "Ricarica la pagina web del browser."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa useState: in React lo stato non va mai mutato direttamente. La funzione setter fornita da `useState` comunica a React la variazione di stato ed innesca un nuovo rendering dell'interfaccia utente."
  },
  {
    id: "react-05",
    subject: "React",
    chapter: "Form, onSubmit & Immutabilità",
    question: "Come si aggiorna in modo immutabile uno stato composto da un OGGETTO in React?",
    codeSnippet: `const [user, setUser] = useState({ nome: 'Ana', ruolo: 'Dev' });

// Per aggiornare solo il ruolo:
setUser(prevUser => ({
  ...prevUser,
  ruolo: 'Senior Dev'
}));`,
    options: [
      "Utilizzando lo spread operator `...` per copiare le proprietà esistenti e sovrascrivere solo i campi variati in un nuovo oggetto.",
      "Eseguendo la modifica diretta `user.ruolo = 'Senior Dev'` e chiamando `setUser(user)`.",
      "Eliminando l'oggetto e ricreando uno stato con `useObject`.",
      "Gli oggetti non si possono memorizzare nello stato di React."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Form e Immutabilità: per preservare l'immutabilità dello stato in React, quando si modifica un oggetto o array occorre sempre crearne una nuova copia (es. tramite spread operator `...`) anziché mutare l'oggetto originale."
  },
  {
    id: "react-06",
    subject: "React",
    chapter: "useEffect - Dependency Array",
    question: "Cosa succede se si omette del tutto il secondo argomento (array delle dipendenze) in `useEffect(fn)`?",
    codeSnippet: `useEffect(() => {
  console.log("Effetto eseguito!");
}); // Nessun array fornito!`,
    options: [
      "L'effetto verrà eseguito dopo OGNI singolo rendering del componente (al mount ed a qualsiasi cambio di state/props).",
      "L'effetto verrà eseguito solo una volta al montaggio iniziale del componente.",
      "React genererà un errore di sintassi bloccante.",
      "L'effetto non verrà mai eseguito."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa useEffect: senza array delle dipendenze `useEffect(fn)`, l'effetto viene lanciato ad ogni render. Con array vuoto `[]` solo al mount iniziale. Con dipendenze `[a, b]` quando `a` o `b` cambiano."
  },
  {
    id: "react-07",
    subject: "React",
    chapter: "useEffect - Cleanup Function",
    question: "A cosa serve la funzione restituita (return) all'interno di `useEffect`?",
    codeSnippet: `useEffect(() => {
  const timer = setInterval(() => console.log("Tick"), 1000);
  
  return () => {
    clearInterval(timer);
  };
}, []);`,
    options: [
      "È la funzione di 'Cleanup' (pulizia) eseguita allo smontaggio (unmount) del componente o prima che l'effetto venga rieseguito.",
      "Serve ad impostare lo stato iniziale del componente.",
      "Viene eseguita solo se si verifica un errore di rete.",
      "Restituisce il codice JSX da renderizzare."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa useEffect: la funzione di cleanup restituita da `useEffect` serve per ripulire risorse asincrone attive (rimuovere event listener, cancellare timer `setInterval` o annullare subscription)."
  },
  {
    id: "react-08",
    subject: "React",
    chapter: "Fetch & API in React",
    question: "Dove è corretto effettuare la chiamata API `fetch` iniziale in un componente React?",
    codeSnippet: `useEffect(() => {
  fetch('https://api.com/prodotti')
    .then(res => res.json())
    .then(dati => setProdotti(dati));
}, []);`,
    options: [
      "All'interno di un `useEffect` con array di dipendenze vuoto `[]` per evitare loop infiniti di re-render.",
      "Nel corpo principale della funzione del componente senza racchiuderla in alcun hook.",
      "All'interno del file index.html.",
      "Direttamente nel blocco `return` del JSX."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Fetch e API in React: eseguire una fetch nel corpo del componente causerebbe un loop infinito (fetch -> setState -> re-render -> fetch). Per questo le chiamate API si inseriscono dentro `useEffect`."
  },
  {
    id: "react-09",
    subject: "React",
    chapter: "React Context",
    question: "Quale problema risolve React Context evitando di dover passare le props attraverso molti livelli intermedi?",
    codeSnippet: `const ThemeContext = createContext('dark');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <MainLayout />
    </ThemeContext.Provider>
  );
}`,
    options: [
      "Risolve il problema del 'Prop Drilling'.",
      "Risolve i problemi di lentezza di connessione ad internet.",
      "Sostituisce l'uso dei form HTML.",
      "Permette di evitare l'uso delle immagini in React."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa React Context: Context permette di condividere uno stato globale (es. utente loggato, tema o carrello) a qualsiasi profondità dell'albero dei componenti senza dover passare le props a tutti i livelli intermedi (Prop Drilling)."
  },
  {
    id: "react-10",
    subject: "React",
    chapter: "React Router",
    question: "Quale hook di React Router si utilizza per leggere i parametri dinamici dell'URL (es. `/prodotti/:id`)?",
    codeSnippet: `import { useParams } from 'react-router-dom';

function DettaglioProdotto() {
  const { id } = useParams();
  return <h2>Prodotto ID: {id}</h2>;
}`,
    options: [
      "useParams()",
      "useNavigate()",
      "useLocation()",
      "useRouteId()"
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa React Router: l'hook `useParams()` restituisce un oggetto contenente le coppie chiave/valore dei parametri dinamici definiti nel path della rotta (es. `:id`)."
  },

  // ==========================================
  // --- MODULO SQL: DISPENSE UFFICIALI (25 Domande) ---
  // ==========================================
  {
    id: "sql-01",
    subject: "SQL",
    chapter: "MySQL & Database Relazionali",
    question: "Che cos'è un RDBMS (Relational Database Management System)?",
    codeSnippet: `/* Esempi RDBMS */ MySQL, PostgreSQL, SQLite, MariaDB`,
    options: [
      "Un sistema software per gestire database basati sul modello relazionale, in cui i dati sono organizzati in tabelle composte da righe e colonne collegate tra loro.",
      "Un linguaggio di programmazione per lo sviluppo di interfacce grafiche.",
      "Un tipo di memoria RAM utilizzata dai server web.",
      "Un plugin per velocizzare la compilazione del codice CSS."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa MySQL e Database Relazionali: un RDBMS memorizza e struttura i dati in tabelle collegate da relazioni mediante vincoli di chiave (Primary Key e Foreign Key)."
  },
  {
    id: "sql-02",
    subject: "SQL",
    chapter: "Tipi di Dati in SQL",
    question: "Qual è la differenza tra i tipi di dato `VARCHAR(255)` e `TEXT` in MySQL?",
    codeSnippet: `CREATE TABLE articoli (
  titolo VARCHAR(255),
  contenuto TEXT
);`,
    options: [
      "`VARCHAR` ha una lunghezza massima definita ed è ottimizzato per stringhe brevi (es. nomi, email); `TEXT` è pensato per testi molto lunghi senza specificare la dimensione massima nel tipo.",
      "`TEXT` può contenere solo numeri interi, mentre `VARCHAR` solo immagini.",
      "`VARCHAR` cripta i dati salvati su disco.",
      "Non c'è alcuna differenza nei sistemi di database moderni."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Database Relazionali: `VARCHAR(N)` memorizza stringhe a lunghezza variabile fino al limite espresso da N (es. 255). `TEXT` consente la memorizzazione di grandi blocchi di testo (fino a 64KB o più)."
  },
  {
    id: "sql-03",
    subject: "SQL",
    chapter: "CRUD - SELECT & WHERE",
    question: "Come si selezionano tutti i record della tabella `prodotti` con prezzo compreso tra 10 e 50 euro ordinati dal più caro al più economico?",
    codeSnippet: `SELECT * FROM prodotti
WHERE prezzo BETWEEN 10 AND 50
ORDER BY prezzo DESC;`,
    options: [
      "SELECT * FROM prodotti WHERE prezzo BETWEEN 10 AND 50 ORDER BY prezzo DESC;",
      "GET ALL FROM prodotti WHERE prezzo IN (10, 50) SORT BY prezzo;",
      "FETCH prodotti WHERE prezzo >= 10 GROUP BY prezzo;",
      "SELECT ALL prodotti WHERE prezzo 10 TO 50 ORDER ASC;"
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa CRUD: `BETWEEN 10 AND 50` filtra il range (estremi inclusi). `ORDER BY prezzo DESC` ordina i risultati in modo decrescente (dal valore più alto al più basso)."
  },
  {
    id: "sql-04",
    subject: "SQL",
    chapter: "CRUD - UPDATE & DELETE",
    question: "Cosa succede se si esegue una query `UPDATE` o `DELETE` OMETTENDO la clausola `WHERE`?",
    codeSnippet: `/* ATTENZIONE */
UPDATE utenti SET attivo = 0;
DELETE FROM clienti;`,
    options: [
      "La modifica o cancellazione verrà applicata a TUTTE le righe dell'intera tabella indiscriminatamente.",
      "La query fallisce restituendo un errore di sintassi.",
      "Verrà modificata solo la prima riga della tabella.",
      "Il database crea automaticamente una copia di backup prima dell'esecuzione."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa CRUD e Transazioni: omissione della clausola `WHERE` nelle istruzioni `UPDATE` o `DELETE` provoca l'aggiornamento o l'eliminazione accidentale di TUTTI i dati presenti nella tabella!"
  },
  {
    id: "sql-05",
    subject: "SQL",
    chapter: "Transazioni MySQL",
    question: "Quale comando permette di annullare tutte le modifiche effettuate durante una transazione avviata con `START TRANSACTION`?",
    codeSnippet: `START TRANSACTION;
  DELETE FROM ordini WHERE id = 100;
-- Annulla tutto:
ROLLBACK;`,
    options: [
      "ROLLBACK;",
      "COMMIT;",
      "UNDO ALL;",
      "RESET TRANSACTION;"
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa CRUD e Transazioni: `START TRANSACTION` avvia la transazione. `COMMIT;` rende le modifiche definitive e permanenti nel DB, mentre `ROLLBACK;` annulla tutte le operazioni ripristinando lo stato precedente."
  },
  {
    id: "sql-06",
    subject: "SQL",
    chapter: "Relazioni & Foreign Key",
    question: "Qual è la funzione di un vincolo `FOREIGN KEY` (Chiave Esterna) con clausola `ON DELETE CASCADE`?",
    codeSnippet: `ALTER TABLE ordini
ADD CONSTRAINT fk_utenti
FOREIGN KEY (id_utente) REFERENCES utenti(id)
ON DELETE CASCADE;`,
    options: [
      "Se una riga nella tabella padre (`utenti`) viene eliminata, le righe collegate nella tabella figlia (`ordini`) verranno cancellate automaticamente.",
      "Impedisce l'eliminazione di qualsiasi riga nella tabella utenti.",
      "Rinomina automaticamente le tabelle collegate.",
      "Crea un backup della riga eliminata su file esterno."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Relazioni tra Tabelle: `ON DELETE CASCADE` garantisce l'integrità referenziale eliminando automaticamente i record figli pendenti quando la riga padre di riferimento viene cancellata."
  },
  {
    id: "sql-07",
    subject: "SQL",
    chapter: "INNER JOIN vs LEFT JOIN",
    question: "Cosa restituisce una query `SELECT ... FROM clienti c LEFT JOIN ordini o ON c.id = o.id_cliente`?",
    codeSnippet: `SELECT c.nome, o.id AS id_ordine
FROM clienti c
LEFT JOIN ordini o ON c.id = o.id_cliente;`,
    options: [
      "Restituisce TUTTI i clienti (anche quelli che NON hanno mai effettuato ordini), mostrando `NULL` nei campi dell'ordine.",
      "Restituisce solo ed esclusivamente i clienti che hanno almeno un ordine attivo.",
      "Restituisce solo gli ordini che non hanno un cliente associato.",
      "Unisce le due tabelle eliminando i clienti duplicati."
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Relazioni tra tabelle: `LEFT JOIN` mantiene tutti i record della tabella a sinistra (`clienti`). Se per un cliente non ci sono ordini corrispondenti, le colonne di `ordini` conterranno valore `NULL`."
  },
  {
    id: "sql-08",
    subject: "SQL",
    chapter: "Aggregazione - GROUP BY & HAVING",
    question: "Qual è la sintassi corretta per contare gli ordini di ciascun cliente e mostrare solo i clienti con più di 3 ordini?",
    codeSnippet: `SELECT id_cliente, COUNT(*) AS totale_ordini
FROM ordini
GROUP BY id_cliente
HAVING COUNT(*) > 3;`,
    options: [
      "SELECT id_cliente, COUNT(*) FROM ordini GROUP BY id_cliente HAVING COUNT(*) > 3;",
      "SELECT id_cliente, COUNT(*) FROM ordini WHERE COUNT(*) > 3 GROUP BY id_cliente;",
      "SELECT id_cliente FROM ordini SORT BY id_cliente LIMIT 3;",
      "SELECT COUNT(ordini) FROM clienti WHERE ordini > 3;"
    ],
    correctIndex: 0,
    explanation: "Dalla dispensa Aggregazione e Grouping: per filtrare i dati basandosi sul risultato di funzioni di aggregazione (es. `COUNT(*) > 3`) si DEVE usare la clausola `HAVING` dopo il `GROUP BY`, poiché `WHERE` non può valutare funzioni aggregate."
  }
];
