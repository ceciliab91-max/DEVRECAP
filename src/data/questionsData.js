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
,
  {
    "id": "js-16",
    "subject": "JavaScript",
    "chapter": "Event Loop & Microtasks",
    "question": "Qual è l'output del seguente snippet di codice relativo all'Event Loop?",
    "codeSnippet": "console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
    "options": [
      "1, 4, 3, 2",
      "1, 2, 3, 4",
      "1, 3, 4, 2",
      "1, 4, 2, 3"
    ],
    "correctIndex": 0,
    "explanation": "Il codice sincrono viene eseguito subito (1, 4). La microtask queue (Promise .then) ha priorità assoluta rispetto alla macrotask queue (setTimeout), stampando 3 prima di 2."
  },
  {
    "id": "js-17",
    "subject": "JavaScript",
    "chapter": "Closures & Scope",
    "question": "Cosa stamperà la chiamata a increment()?",
    "codeSnippet": "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c1 = createCounter();\nconst c2 = createCounter();\nc1();\nconsole.log(c1(), c2());",
    "options": [
      "2 1",
      "2 2",
      "1 1",
      "NaN NaN"
    ],
    "correctIndex": 0,
    "explanation": "Ogni invocazione di createCounter genera un nuovo lexical environment isolato. c1 mantiene il proprio count (1 poi 2), mentre c2 ha il proprio count indipendente (1)."
  },
  {
    "id": "js-18",
    "subject": "JavaScript",
    "chapter": "Array Methods Avanzati",
    "question": "Cosa restituisce l'uso del metodo reduce su questo array?",
    "codeSnippet": "const numbers = [1, 2, 3, 4];\nconst res = numbers.reduce((acc, curr) => acc + curr, 10);",
    "options": [
      "20",
      "10",
      "24",
      "[10, 1, 2, 3, 4]"
    ],
    "correctIndex": 0,
    "explanation": "Il valore iniziale dell'accumulatore è 10. Sommando in sequenza 1, 2, 3 e 4 si ottiene 10 + 10 = 20."
  },
  {
    "id": "js-19",
    "subject": "JavaScript",
    "chapter": "Nullish Coalescing & Falsy Values",
    "question": "Qual è la differenza di valutazione tra l'operatore || (OR logico) e ?? (Nullish Coalescing)?",
    "codeSnippet": "const val1 = 0 || \"default\";\nconst val2 = 0 ?? \"default\";",
    "options": [
      "val1 è \"default\", val2 è 0.",
      "Entrambi i valori sono \"default\".",
      "val1 è 0, val2 è \"default\".",
      "Entrambi restituiscono 0."
    ],
    "correctIndex": 0,
    "explanation": "L'operatore || valuta 0 come falsy e restituisce il fallback. L'operatore ?? considera fallback solo null e undefined, quindi mantiene 0."
  },
  {
    "id": "js-20",
    "subject": "JavaScript",
    "chapter": "Clonazione & Riferimenti di Memoria",
    "question": "Cosa accade all'oggetto originale eseguendo uno shallow copy con spread operator?",
    "codeSnippet": "const user = { name: \"Alex\", skills: [\"JS\", \"CSS\"] };\nconst copy = { ...user };\ncopy.skills.push(\"React\");",
    "options": [
      "user.skills conterrà anche \"React\" perché gli array/oggetti annidati sono copiati per riferimento.",
      "user.skills rimarrà invariato con solo [\"JS\", \"CSS\"].",
      "Verrà sollevato un TypeError.",
      "L'oggetto originale user viene eliminato dal Garbage Collector."
    ],
    "correctIndex": 0,
    "explanation": "Lo spread operator esegue solo uno shallow clone (copia superficiale). Le proprietà primitive vengono duplicate, ma gli oggetti/array annidati continuano a condividere lo stesso puntatore in memoria."
  },
  {
    "id": "js-21",
    "subject": "JavaScript",
    "chapter": "Event Delegation & Bubbling",
    "question": "Cos'è il pattern dell'Event Delegation nel DOM?",
    "codeSnippet": "document.querySelector(\"#list\").addEventListener(\"click\", (e) => {\n  if (e.target.matches(\"li.item\")) {\n    console.log(e.target.dataset.id);\n  }\n});",
    "options": [
      "Assegnare un unico listener all'elemento genitore sfruttando la risalita (bubbling) degli eventi dai figli.",
      "Duplicare il listener su ogni singolo tag figlio tramite forEach.",
      "Bloccare tutti gli eventi tramite e.preventDefault().",
      "Inviare l'evento a un server WebSocket."
    ],
    "correctIndex": 0,
    "explanation": "L'Event Delegation sfrutta la fase di Bubbling per catturare gli eventi generati dai figli su un unico antenato comune, ottimizzando la memoria ed evitando listener su elementi dinamici."
  },
  {
    "id": "js-22",
    "subject": "JavaScript",
    "chapter": "Async/Await & Parallelismo",
    "question": "Come si eseguono due promise indipendenti in parallelo senza bloccare la prima?",
    "codeSnippet": "/* Opzione corretta */\nconst [data1, data2] = await Promise.all([fetch1(), fetch2()]);",
    "options": [
      "Usando Promise.all([fetch1(), fetch2()]) con un unico await.",
      "Facendo due await in sequenza: await fetch1(); await fetch2();",
      "Racchiudendo entrambe le chiamate in un blocco while(true).",
      "Usando un timer setTimeout sincrono."
    ],
    "correctIndex": 0,
    "explanation": "Promise.all avvia le promise in concorrenza e si risolve quando tutte hanno terminato, dimezzando i tempi di attesa rispetto ad await sequenziali."
  },
  {
    "id": "js-23",
    "subject": "JavaScript",
    "chapter": "Set & Map",
    "question": "Qual è il modo più performante e idiomatico per rimuovere i duplicati da un array primitivo in ES6+?",
    "codeSnippet": "const unique = [...new Set([1, 2, 2, 3, 4, 4])];",
    "options": [
      "[...new Set(array)]",
      "array.filter((item) => item !== undefined)",
      "JSON.parse(JSON.stringify(array))",
      "array.sort().reverse()"
    ],
    "correctIndex": 0,
    "explanation": "La struttura dati Set ammette solo valori univoci. Creando un Set dall'array e riaprendolo con lo spread operator si ottiene un array senza duplicati in O(n)."
  },
  {
    "id": "js-24",
    "subject": "JavaScript",
    "chapter": "Destructuring & Rest Operator",
    "question": "Qual è il valore della variabile rest dopo questo destructuring?",
    "codeSnippet": "const { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };",
    "options": [
      "{ c: 30, d: 40 }",
      "[30, 40]",
      "{ a: 10, b: 20 }",
      "undefined"
    ],
    "correctIndex": 0,
    "explanation": "Il rest property raccoglie tutte le chiavi enumerabili rimanenti che non sono state esplicitamente estratte nel pattern di destructuring."
  },
  {
    "id": "js-25",
    "subject": "JavaScript",
    "chapter": "Error Handling (try / catch / finally)",
    "question": "Cosa accade nel blocco finally se il blocco try esegue un return anticipato?",
    "codeSnippet": "function test() {\n  try {\n    return \"FROM_TRY\";\n  } finally {\n    console.log(\"FINALLY_RUN\");\n  }\n}",
    "options": [
      "Il blocco finally viene comunque eseguito prima che il controllo ritorni al chiamante.",
      "Il blocco finally viene ignorato completamente.",
      "Viene sollevato un errore di sintassi.",
      "La funzione non restituisce alcun valore."
    ],
    "correctIndex": 0,
    "explanation": "La clausola finally viene sempre eseguita prima che il blocco try/catch ceda il controllo o completi l'istruzione return."
  },
  {
    "id": "react-11",
    "subject": "React",
    "chapter": "Hooks & Ciclo di Vita",
    "question": "Qual è lo scopo della funzione di cleanup restituita all'interno di useEffect?",
    "codeSnippet": "useEffect(() => {\n  const timer = setInterval(tick, 1000);\n  return () => clearInterval(timer);\n}, []);",
    "options": [
      "Pulire timer, listener o sottoscrizioni prima dello smontaggio del componente o prima della successiva esecuzione dell'effetto.",
      "Forzare il rendering immediato del componente padre.",
      "Resettare tutti gli stati dello useState a 0.",
      "Salvare automaticamente lo stato in localStorage."
    ],
    "correctIndex": 0,
    "explanation": "La funzione restituita funge da cleanup e previene memory leak annullando timer, disiscrivendo observer e rimuovendo event listener."
  },
  {
    "id": "react-12",
    "subject": "React",
    "chapter": "useMemo vs useCallback",
    "question": "Qual è la differenza essenziale tra useMemo e useCallback?",
    "codeSnippet": "const memoizedValue = useMemo(() => compute(a, b), [a, b]);\nconst memoizedFn = useCallback(() => doSomething(a), [a]);",
    "options": [
      "useMemo memorizza il risultato del calcolo di una funzione; useCallback memorizza l'istanza della funzione stessa.",
      "useMemo si usa solo per le stringhe, useCallback per gli array.",
      "useCallback esegue la funzione ad ogni rendering, useMemo non la esegue mai.",
      "Non vi è alcuna differenza, sono sinonimi intercambiabili."
    ],
    "correctIndex": 0,
    "explanation": "useMemo ritorna il valore calcolato dalla funzione di factory, mentre useCallback ritorna la funzione memoizzata per evitare che cambi referenza ad ogni render dei figli."
  },
  {
    "id": "react-13",
    "subject": "React",
    "chapter": "useRef & Accesso al DOM",
    "question": "Cosa differenzia l'aggiornamento di un useRef rispetto a uno useState?",
    "codeSnippet": "const countRef = useRef(0);\ncountRef.current += 1;",
    "options": [
      "La modifica di ref.current non scatena un nuovo rendering del componente.",
      "useRef causa sempre il doppio dei re-render di useState.",
      "useRef accetta solo elementi HTML e mai numeri o oggetti.",
      "useRef si azzera ad ogni render del componente."
    ],
    "correctIndex": 0,
    "explanation": "useRef fornisce un contenitore mutabile il cui valore persiste tra i rendering senza provocare un nuovo ciclo di re-render quando viene modificato."
  },
  {
    "id": "react-14",
    "subject": "React",
    "chapter": "Stato Immutabile & Batching",
    "question": "Perché in React lo stato non deve mai essere mutato direttamente (es. state.push())?",
    "codeSnippet": "/* ERRATO */ items.push(newItem); setItems(items);\n/* CORRETTO */ setItems(prev => [...prev, newItem]);",
    "options": [
      "Perché React effettua confronti per riferimento (Object.is); mutando l'oggetto esistente il riferimento non cambia e il re-render viene saltato.",
      "Perché il browser blocca le mutazioni di array con un errore di sicurezza.",
      "Perché push() è deprecato in JavaScript moderno.",
      "Perché lo stato diventerebbe automaticamente di sola lettura."
    ],
    "correctIndex": 0,
    "explanation": "React si basa sull'immutabilità: controlla se il riferimento dell'oggetto/array è cambiato prima di pianificare il diffing nel Virtual DOM."
  },
  {
    "id": "react-15",
    "subject": "React",
    "chapter": "Context API & Ottimizzazioni",
    "question": "Qual è il potenziale collo di bottiglia nell'uso ingenuo del Context API su stati ad alta frequenza?",
    "codeSnippet": "<ThemeContext.Provider value={{ theme, setTheme }}>\n  <App />\n</ThemeContext.Provider>",
    "options": [
      "Tutti i componenti che usano useContext(ThemeContext) effettueranno il re-render ogni volta che il valore del contesto cambia.",
      "Il Context API impedisce l'uso di TailwindCSS.",
      "I dati del Context vengono salvati permanentemente nel database.",
      "Non è possibile passare funzioni dentro il Context."
    ],
    "correctIndex": 0,
    "explanation": "Qualsiasi componente consumatore del contesto si ri-renderizza ad ogni variazione del valore fornito dal Provider; per ovviare a ciò si separano contesti di stato e di dispatch."
  },
  {
    "id": "react-16",
    "subject": "React",
    "chapter": "Prop Key nelle Liste",
    "question": "Perché l'uso dell'indice di un array come prop \"key\" è sconsigliato in liste dinamiche?",
    "codeSnippet": "{items.map((item, index) => <Item key={index} data={item} />)}",
    "options": [
      "Se gli elementi vengono eliminati, riordinati o inseriti in testa, gli indici cambiano provocando bug di stato nei componenti figli e rendering inefficienti.",
      "Perché React non supporta numeri come chiavi.",
      "Perché l'indice rallenta il caricamento della pagina di 5 secondi.",
      "Perché le chiavi devono sempre coincidere con il nome del tag HTML."
    ],
    "correctIndex": 0,
    "explanation": "Le chiavi devono identificare univocamente l'entità concettuale (es. id dal database) affinché l'algoritmo di riconciliazione preservi correttamente lo stato locale dei componenti durante il riordino."
  },
  {
    "id": "react-17",
    "subject": "React",
    "chapter": "Controlled vs Uncontrolled Components",
    "question": "Cosa definisce un componente input come \"Controlled\" in React?",
    "codeSnippet": "<input value={text} onChange={(e) => setText(e.target.value)} />",
    "options": [
      "Il valore dell'input è guidato dallo stato React e modificato tramite un handler di evento.",
      "L'input è controllato esclusivamente dal DOM tramite ref.",
      "L'input è disabilitato e non modificabile.",
      "L'input effettua una validazione automatica lato server senza JS."
    ],
    "correctIndex": 0,
    "explanation": "In un controlled component il valore del campo è interamente sincronizzato e governato da uno stato React (single source of truth)."
  },
  {
    "id": "react-18",
    "subject": "React",
    "chapter": "Lazy Loading & Suspense",
    "question": "A cosa serve combinare React.lazy() con <Suspense>?",
    "codeSnippet": "const HeavyModal = React.lazy(() => import(\"./HeavyModal\"));\n<Suspense fallback={<Spinner />}>\n  <HeavyModal />\n</Suspense>",
    "options": [
      "A effettuare il code-splitting dinamico caricando il bundle del componente solo quando viene effettivamente renderizzato a schermo.",
      "A velocizzare il rendering del CSS inline.",
      "A convertire il componente in un Server Component Node.js.",
      "A memorizzare il componente in localStorage."
    ],
    "correctIndex": 0,
    "explanation": "React.lazy permette di caricare i componenti su richiesta (chunking asincrono), mentre Suspense gestisce l'interfaccia di fallback (es. scheletro o spinner) durante il caricamento di rete."
  },
  {
    "id": "react-19",
    "subject": "React",
    "chapter": "Custom Hooks",
    "question": "Qual è la regola fondamentale nella creazione di un Custom Hook in React?",
    "codeSnippet": "function useWindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth);\n  // ...\n  return width;\n}",
    "options": [
      "Il nome della funzione deve iniziare con \"use\" e può incapsulare altri Hook nativi rispettando le regole degli Hook.",
      "Deve essere una classe che estende React.Component.",
      "Non può mai restituire valori primitivi.",
      "Deve essere dichiarato dentro il blocco return JSX."
    ],
    "correctIndex": 0,
    "explanation": "I Custom Hook devono iniziare con il prefisso \"use\" per permettere ai linter di applicare le regole degli Hook (chiamate non condizionali al livello superiore)."
  },
  {
    "id": "react-20",
    "subject": "React",
    "chapter": "Error Boundaries",
    "question": "Cosa cattura un Error Boundary in un'applicazione React?",
    "codeSnippet": "class ErrorBoundary extends React.Component {\n  static getDerivedStateFromError(error) { return { hasError: true }; }\n  // ...\n}",
    "options": [
      "Errori JavaScript generati durante il rendering, nei metodi del ciclo di vita e nei costruttori dell'albero dei figli.",
      "Errori all'interno di callback asincrone come setTimeout o fetch.",
      "Errori di sintassi durante la fase di compilazione Vite.",
      "Errori 404 della rete."
    ],
    "correctIndex": 0,
    "explanation": "Gli Error Boundaries catturano errori nell'albero dei componenti durante il render, evitando il crash completo della UI e mostrando un fallback elegante."
  },
  {
    "id": "sql-09",
    "subject": "SQL",
    "chapter": "JOINs (LEFT vs INNER)",
    "question": "Qual è il risultato di una query con LEFT JOIN se una riga della tabella di sinistra non ha corrispondenze a destra?",
    "codeSnippet": "SELECT u.name, o.id \nFROM users u \nLEFT JOIN orders o ON u.id = o.user_id;",
    "options": [
      "La riga della tabella utenti (sinistra) viene comunque restituita con i campi degli ordini impostati a NULL.",
      "La riga utente viene scartata dal set dei risultati.",
      "Il database restituisce un errore di vincolo di integrità.",
      "Viene creata una riga fittizia automatica nella tabella orders."
    ],
    "correctIndex": 0,
    "explanation": "La LEFT JOIN include sempre tutti i record della tabella sinistra. Se non c'è match nella tabella destra, i relativi attributi conterranno NULL."
  },
  {
    "id": "sql-10",
    "subject": "SQL",
    "chapter": "GROUP BY & HAVING",
    "question": "Perché non è possibile usare la clausola WHERE per filtrare i risultati di una funzione di aggregazione come COUNT()?",
    "codeSnippet": "/* CORRETTO */\nSELECT category_id, COUNT(*)\nFROM products\nGROUP BY category_id\nHAVING COUNT(*) > 5;",
    "options": [
      "Perché WHERE filtra i singoli record prima che venga effettuato il raggruppamento; HAVING filtra i gruppi aggregati dopo il GROUP BY.",
      "Perché WHERE funziona solo con stringhe e non con numeri.",
      "Perché HAVING è un comando MySQL e WHERE è solo per PostgreSQL.",
      "Non c'è motivo, WHERE e HAVING sono intercambiabili."
    ],
    "correctIndex": 0,
    "explanation": "Nel lifecycle della query SQL la clausola WHERE opera sulle singole righe prima del raggruppamento. I filtri sui risultati aggregati (es. COUNT, AVG, SUM) richiedono tassativamente HAVING."
  },
  {
    "id": "sql-11",
    "subject": "SQL",
    "chapter": "Funzioni di Aggregazione (COUNT)",
    "question": "Qual è la differenza fondamentale tra COUNT(*) e COUNT(colonna)?",
    "codeSnippet": "SELECT COUNT(*), COUNT(email) FROM users;",
    "options": [
      "COUNT(*) conta tutte le righe incluse quelle con valori NULL; COUNT(colonna) conta solo le righe in cui quella colonna non è NULL.",
      "COUNT(*) conta solo le righe pari; COUNT(colonna) conta quelle dispari.",
      "COUNT(colonna) restituisce sempre 0 se ci sono più di 10 utenti.",
      "Nessuna differenza, restituiscono sempre esattamente lo stesso valore numerico."
    ],
    "correctIndex": 0,
    "explanation": "COUNT(*) calcola il totale delle tuple; COUNT(nome_colonna) ignora e non conteggia le tuple dove il campo specificato ha valore NULL."
  },
  {
    "id": "sql-12",
    "subject": "SQL",
    "chapter": "Foreign Key & ON DELETE CASCADE",
    "question": "Cosa accade ai record collegati se una Foreign Key è definita con ON DELETE CASCADE e viene eliminato il record genitore?",
    "codeSnippet": "FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;",
    "options": [
      "Tutti i record figli nella tabella dipendente vengono automaticamente eliminati insieme al record genitore.",
      "Il database impedisce la cancellazione del genitore sollevando un errore.",
      "I record figli mantengono il vecchio user_id orfano.",
      "Il campo user_id dei figli viene impostato a 0."
    ],
    "correctIndex": 0,
    "explanation": "ON DELETE CASCADE garantisce l'integrità referenziale propagando la cancellazione a cascata a tutti i record figli associati."
  },
  {
    "id": "sql-13",
    "subject": "SQL",
    "chapter": "Indici & Ottimizzazione Query",
    "question": "Qual è il vantaggio principale e il principale svantaggio nella creazione di un INDEX su una colonna?",
    "codeSnippet": "CREATE INDEX idx_user_email ON users(email);",
    "options": [
      "Velocizza notevolmente le query di ricerca (SELECT), ma rallenta leggermente le operazioni di scrittura (INSERT/UPDATE) e occupa spazio su disco.",
      "Rende il database crittografato ma impedisce le query con ordinamento ORDER BY.",
      "Elimina automaticamente i record duplicati ma impedisce l'uso di chiavi primarie.",
      "Raddoppia la velocità delle INSERT ma blocca le SELECT."
    ],
    "correctIndex": 0,
    "explanation": "Gli indici (come gli alberi B-Tree) consentono accessi in O(log n) per le ricerche, ma ad ogni inserimento o modifica l'indice deve essere ricalcolato, comportando un piccolo overhead di scrittura."
  },
  {
    "id": "sql-14",
    "subject": "SQL",
    "chapter": "Transazioni & Proprietà ACID",
    "question": "Cosa garantisce la proprietà di \"Atomicità\" (Atomicity) in una transazione SQL?",
    "codeSnippet": "START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;",
    "options": [
      "Tutte le operazioni della transazione vengono completate con successo, oppure in caso di errore nessuna viene applicata (tutto o niente).",
      "Le query vengono eseguite alla velocità della luce nei processori multi-core.",
      "I dati vengono replicati automaticamente su 5 continenti.",
      "Le tabelle non possono essere lette da altri utenti per 24 ore."
    ],
    "correctIndex": 0,
    "explanation": "L'Atomicità fa sì che una sequenza di operazioni sia trattata come un'unica unità indivisibile: se anche una sola istruzione fallisce, si esegue il ROLLBACK totale."
  },
  {
    "id": "sql-15",
    "subject": "SQL",
    "chapter": "Subquery & Operatore EXISTS",
    "question": "Perché la clausola WHERE EXISTS (subquery) è spesso preferita a WHERE col IN (subquery) su grandi moli di dati?",
    "codeSnippet": "SELECT * FROM customers c WHERE EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);",
    "options": [
      "EXISTS si interrompe non appena trova la prima corrispondenza (short-circuit), risultando più efficiente.",
      "Perché IN non supporta numeri interi.",
      "Perché EXISTS converte la query in codice C++ compilato.",
      "Non c'è alcuna differenza di piano di esecuzione."
    ],
    "correctIndex": 0,
    "explanation": "EXISTS lavora in logica booleana a cortocircuito: appena individua un record valido nella subquery correlata valida la condizione senza scansionare l'intero insieme."
  },
  {
    "id": "sql-16",
    "subject": "SQL",
    "chapter": "UNION vs UNION ALL",
    "question": "Qual è la differenza fondamentale tra UNION e UNION ALL?",
    "codeSnippet": "SELECT city FROM customers UNION SELECT city FROM suppliers;\nSELECT city FROM customers UNION ALL SELECT city FROM suppliers;",
    "options": [
      "UNION rimuove automaticamente le righe duplicate eseguendo un sort; UNION ALL restituisce tutte le righe inclusi i duplicati ed è più veloce.",
      "UNION ALL funziona solo su tabelle con meno di 10 colonne.",
      "UNION ordina in senso decrescente, UNION ALL in senso crescente.",
      "UNION unisce le colonne orizzontalmente, UNION ALL verticalmente."
    ],
    "correctIndex": 0,
    "explanation": "UNION elimina i duplicati effettuando un'operazione di deduplicazione/ordinamento implicita; UNION ALL accoda semplicemente i dataset preservando i duplicati senza overhead."
  },
  {
    "id": "sql-17",
    "subject": "SQL",
    "chapter": "Pattern Matching con LIKE",
    "question": "Cosa seleziona la condizione WHERE name LIKE \"_a%\"?",
    "codeSnippet": "SELECT * FROM students WHERE name LIKE \"_a%\";",
    "options": [
      "Nomi che hanno una qualsiasi prima lettera, la lettera \"a\" in seconda posizione, seguita da zero o più caratteri.",
      "Nomi che iniziano tassativamente con la lettera \"a\".",
      "Nomi che contengono il carattere underscore \"_\".",
      "Nomi che terminano con la lettera \"a\"."
    ],
    "correctIndex": 0,
    "explanation": "In SQL il carattere wildcard underscore \"_\" rappresenta esattamente un singolo carattere qualsiasi, mentre \"%\" rappresenta zero o più caratteri."
  },
  {
    "id": "sql-18",
    "subject": "SQL",
    "chapter": "DDL vs DML",
    "question": "Quale delle seguenti istruzioni appartiene alla categoria DDL (Data Definition Language)?",
    "codeSnippet": "/* Esempio */ ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE;",
    "options": [
      "ALTER TABLE, CREATE TABLE, DROP TABLE",
      "INSERT INTO, UPDATE, DELETE",
      "SELECT, FROM, WHERE",
      "GRANT, REVOKE"
    ],
    "correctIndex": 0,
    "explanation": "Il DDL (Data Definition Language) comprende le istruzioni che definiscono o modificano la struttura dello schema del database (CREATE, ALTER, DROP, TRUNCATE)."
  }
,
  {
    "id": "js-26",
    "subject": "JavaScript",
    "chapter": "Express.js Middleware & next()",
    "question": "Cosa accade se una funzione middleware in Express non invia una risposta (res) e non invoca next()?",
    "codeSnippet": "app.use((req, res, next) => {\n  console.log(\"Richiesta ricevuta:\", req.url);\n  // Nessun res.send() o next()\n});",
    "options": [
      "La richiesta del client rimane bloccata in sospeso (hanging) fino allo scadere del timeout del browser o del server.",
      "Express passa automaticamente al middleware successivo.",
      "Il server genera immediatamente un errore 500.",
      "Viene inviata una risposta 200 OK vuota di default."
    ],
    "correctIndex": 0,
    "explanation": "Dalle dispense di Express Middleware: in Express ogni middleware deve terminare il ciclo inviando una risposta (es. res.json) oppure chiamare next() per cedere il controllo alla catena successiva; in caso contrario la connessione resta appesa."
  },
  {
    "id": "js-27",
    "subject": "JavaScript",
    "chapter": "Express.js Body Parsing",
    "question": "Perché è necessario includere app.use(express.json()) prima delle rotte POST in Express?",
    "codeSnippet": "app.use(express.json());\napp.post(\"/api/users\", (req, res) => {\n  console.log(req.body);\n});",
    "options": [
      "Per analizzare il payload della richiesta con Content-Type: application/json e popolare req.body con l'oggetto JS parsato.",
      "Per crittografare tutte le risposte JSON inviate al client.",
      "Per impedire attacchi SQL injection in automatico.",
      "Per abilitare il rendering di file HTML."
    ],
    "correctIndex": 0,
    "explanation": "Di default Node/Express non effettua il parsing del corpo delle richieste HTTP. express.json() è il middleware integrato che intercetta i flussi raw JSON e li converte in un oggetto JS assegnato a req.body."
  },
  {
    "id": "js-28",
    "subject": "JavaScript",
    "chapter": "Express.js Gestione Centralizzata Errori",
    "question": "Come viene identificato un middleware di gestione errori in Express rispetto ai middleware standard?",
    "codeSnippet": "app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: err.message });\n});",
    "options": [
      "Dalla presenza di esattamente 4 parametri nella firma della funzione (err, req, res, next).",
      "Dal nome obbligatorio della funzione 'errorHandler'.",
      "Dal fatto che deve essere registrato prima di tutte le altre rotte.",
      "Dall'uso della parola chiave 'throw'."
    ],
    "correctIndex": 0,
    "explanation": "Express ispeziona il numero di argomenti (fn.length): una funzione con 4 parametri (err, req, res, next) viene registrata specialmente come Error Handling Middleware e riceve gli errori passati tramite next(error)."
  },
  {
    "id": "js-29",
    "subject": "JavaScript",
    "chapter": "Express.js Router Modulare",
    "question": "Qual è il pattern raccomandato per modularizzare le rotte in un'applicazione Express?",
    "codeSnippet": "// postsRouter.js\nconst router = express.Router();\nrouter.get(\"/\", (req, res) => res.json([]));\nexport default router;\n\n// app.js\napp.use(\"/api/posts\", postsRouter);",
    "options": [
      "Creare istanze dedicate con express.Router() ed agganciarle con prefisso di percorso tramite app.use('/prefisso', router).",
      "Dichiarare tutte le rotte in un unico file index.js di 5000 righe.",
      "Usare una classe con soli metodi statici senza Express.",
      "Creare un server app.listen() per ogni singola risorsa."
    ],
    "correctIndex": 0,
    "explanation": "express.Router() consente di creare gestori di route isolati e riutilizzabili come 'mini-applicazioni', montabili su prefissi URL specifici tramite app.use."
  },
  {
    "id": "js-30",
    "subject": "JavaScript",
    "chapter": "Express.js Params vs Query",
    "question": "Data la richiesta GET /api/products/42?category=tech&sort=desc, come si estraggono i valori in Express?",
    "codeSnippet": "app.get(\"/api/products/:id\", (req, res) => {\n  const id = req.params.id;\n  const category = req.query.category;\n});",
    "options": [
      "req.params.id vale '42' (parametro di route) e req.query.category vale 'tech' (query string).",
      "req.body.id vale '42' e req.headers.category vale 'tech'.",
      "req.params contiene sia l'id sia la query string uniti in una stringa.",
      "req.query contiene l'id e req.params contiene i filtri."
    ],
    "correctIndex": 0,
    "explanation": "I parametri dinamici inseriti nel percorso (:id) sono accessibili nell'oggetto req.params, mentre i parametri dopo il punto interrogativo (?key=val) sono analizzati in req.query."
  },
  {
    "id": "js-31",
    "subject": "JavaScript",
    "chapter": "Fetch API & Response Status",
    "question": "Perché la Promise restituita da fetch() non viene rigettata (reject) in caso di errore HTTP 404 o 500?",
    "codeSnippet": "const res = await fetch(\"/api/data\");\nif (!res.ok) {\n  throw new Error(`Errore HTTP: ${res.status}`);\n}",
    "options": [
      "Fetch rigetta la Promise solo in caso di errore di rete (es. offline, DNS fallito); i codici HTTP 4xx/5xx risolvono la Promise con la proprietà res.ok impostata a false.",
      "Perché 404 e 500 sono considerati stati di successo dal browser.",
      "Perché serve installare un pacchetto esterno per intercettare gli errori 404.",
      "Fetch restituisce sempre una stringa sincrona."
    ],
    "correctIndex": 0,
    "explanation": "Dalle dispense sulle Richieste HTTP: la Promise di fetch() rigetta solo per errori catastrofici di rete o CORS bloccato. Le risposte HTTP valide (anche se di errore come 404 Not Found o 500 Server Error) devono essere verificate controllando if (!res.ok)."
  },
  {
    "id": "js-32",
    "subject": "JavaScript",
    "chapter": "LangChain JS & Prompt Templates",
    "question": "Qual è il vantaggio dell'utilizzo di ChatPromptTemplate in LangChain JS rispetto a stringhe template letterali?",
    "codeSnippet": "const prompt = ChatPromptTemplate.fromMessages([\n  [\"system\", \"Sei un tutor didattico specializzato in: {subject}\"],\n  [\"human\", \"{userQuery}\"]\n]);",
    "options": [
      "Struttura i ruoli (system, human, ai) secondo gli standard dei modelli di chat e consente l'iniezione dinamica e tipizzata delle variabili nel flusso LCEL.",
      "Compila il codice in WebAssembly per velocizzare la scheda video.",
      "Memorizza automaticamente tutte le risposte in SQLite.",
      "Permette di bypassare le API key dei provider di intelligenza artificiale."
    ],
    "correctIndex": 0,
    "explanation": "ChatPromptTemplate di LangChain assicura che i messaggi siano formattati con i ruoli corretti per i modelli di chat e si integra nelle pipeline di composizione (pipe) con validazione dei parametri."
  },
  {
    "id": "js-33",
    "subject": "JavaScript",
    "chapter": "LangChain & Zod Structured Output",
    "question": "Come garantisce LangChain che la risposta del modello IA rispetti fedelmente uno schema TypeScript/Zod?",
    "codeSnippet": "const schema = z.object({\n  evaluation: z.string(),\n  score: z.number().min(0).max(100),\n  hints: z.array(z.string())\n});\nconst structuredModel = model.withStructuredOutput(schema);",
    "options": [
      "Configura il model con Function Calling / Tool Calling JSON schema del provider e valida/parsa automaticamente l'output finale con Zod.",
      "Esegue un ciclo while finché l'IA non restituisce casualmente un JSON valido.",
      "Sostituisce il modello con un database SQL statico.",
      "Usa una Regular Expression sul testo grezzo."
    ],
    "correctIndex": 0,
    "explanation": "Il metodo .withStructuredOutput(schema) di LangChain traduce lo schema Zod in schema JSON standard inviato al motore dell'LLM e converte la risposta JSON in un oggetto JavaScript tipizzato."
  },
  {
    "id": "js-34",
    "subject": "JavaScript",
    "chapter": "Web Storage (localStorage vs sessionStorage)",
    "question": "Qual è la differenza di persistenza e ciclo di vita tra localStorage e sessionStorage?",
    "codeSnippet": "localStorage.setItem(\"theme\", \"dark\");\nsessionStorage.setItem(\"quiz_step\", \"3\");",
    "options": [
      "localStorage persiste indefinitamente finché non viene esplicitamente rimosso; sessionStorage dura solo per la durata della sessione della scheda del browser.",
      "sessionStorage è condiviso tra tutte le schede e finestre, localStorage solo in quella attiva.",
      "localStorage salva i dati nel cloud server, sessionStorage su disco fisso.",
      "Non c'è alcuna differenza, sono due nomi per la stessa API."
    ],
    "correctIndex": 0,
    "explanation": "Dalla dispensa JavaScript Storage: localStorage non ha scadenza e sopravvive alla chiusura del browser; sessionStorage viene svuotato automaticamente non appena la scheda (tab) viene chiusa."
  },
  {
    "id": "js-35",
    "subject": "JavaScript",
    "chapter": "Timing Functions & Memory Leaks",
    "question": "Come si arresta correttamente un timer avviato con setInterval in JavaScript?",
    "codeSnippet": "const timerId = setInterval(() => console.log(\"Tick\"), 1000);\n// Come si ferma?",
    "options": [
      "clearInterval(timerId)",
      "stopInterval(timerId)",
      "timerId.stop()",
      "delete timerId"
    ],
    "correctIndex": 0,
    "explanation": "Dalla dispensa Timing Functions: setInterval restituisce un identificativo numerico (timerId) che deve essere passato alla funzione globale clearInterval(timerId) per interrompere l'esecuzione e liberare la memoria."
  },
  {
    "id": "js-36",
    "subject": "JavaScript",
    "chapter": "Moduli: ESM vs CommonJS",
    "question": "Quale combinazione rappresenta la sintassi ufficiale ECMAScript Modules (ESM) rispetto a CommonJS?",
    "codeSnippet": "/* ESM */ import { sum } from \"./math.js\"; export const pi = 3.14;\n/* CJS */ const { sum } = require(\"./math.js\"); module.exports = { pi };",
    "options": [
      "ESM usa 'import' / 'export'; CommonJS usa 'require()' / 'module.exports'.",
      "ESM è solo per browser vecchi, CommonJS è per React 19.",
      "CommonJS usa 'import' e ESM usa 'include'.",
      "Non possono coesistere nello stesso ecosistema Node.js."
    ],
    "correctIndex": 0,
    "explanation": "ESM (standard ufficiale ECMAScript con import/export statici e top-level await) è il modulo moderno predefinito, mentre CommonJS (require/module.exports sincrono) è il modulo storico di Node.js."
  },
  {
    "id": "js-37",
    "subject": "JavaScript",
    "chapter": "AbortController & Cancellazione Fetch",
    "question": "A cosa serve l'oggetto AbortController in una chiamata fetch o in una richiesta HTTP?",
    "codeSnippet": "const controller = new AbortController();\nfetch(url, { signal: controller.signal });\n// Annulla richiesta\ncontroller.abort();",
    "options": [
      "Permette di interrompere/annullare una o più richieste di rete asincrone in corso (es. se l'utente cambia pagina).",
      "Riavvia il server Node.js in caso di blocco.",
      "Aumenta la banda di connessione disponibile.",
      "Rallenta la richiesta simulando una connessione 3G."
    ],
    "correctIndex": 0,
    "explanation": "AbortController fornisce un AbortSignal che consente di abortire programmaticamente richieste HTTP fetch in volo, utile quando un componente si smonta prima della risposta."
  },
  {
    "id": "js-38",
    "subject": "JavaScript",
    "chapter": "Custom Events nel Browser",
    "question": "Come si crea e si invia un evento personalizzato con payload di dati nel DOM?",
    "codeSnippet": "const event = new CustomEvent(\"userLogin\", { detail: { username: \"Mario\" } });\nwindow.dispatchEvent(event);",
    "options": [
      "Usando new CustomEvent('nomeEvento', { detail: { ... } }) e richiamando target.dispatchEvent(event).",
      "Usando window.trigger('nomeEvento', dati).",
      "Inviando un messaggio WebSocket alla porta 80.",
      "Modificando direttamente la proprietà document.event."
    ],
    "correctIndex": 0,
    "explanation": "L'API standard CustomEvent consente di istanziare eventi con dati allegati nella proprietà detail e propagarli tramite dispatchEvent verso qualsiasi EventTarget."
  },
  {
    "id": "js-39",
    "subject": "JavaScript",
    "chapter": "CORS in Express & Browser Security",
    "question": "Cosa provoca un errore CORS (Cross-Origin Resource Sharing) nel browser quando il frontend chiama un'API Express?",
    "codeSnippet": "/* Errore tipico */ No 'Access-Control-Allow-Origin' header is present on the requested resource.",
    "options": [
      "Il browser blocca la lettura della risposta perché l'origine del frontend (es. http://localhost:5173) differisce dall'origine del backend (es. http://localhost:3000) e il server non ha inviato gli header CORS abilitanti.",
      "Il database MySQL è andato in crash.",
      "Il file index.html non ha la favicon.",
      "L'utente ha inserito una password errata."
    ],
    "correctIndex": 0,
    "explanation": "La Same-Origin Policy dei browser impedisce a script JS di leggere dati da un'origine differente a meno che il backend non risponda con header espliciti come Access-Control-Allow-Origin (usando il middleware cors in Express)."
  },
  {
    "id": "js-40",
    "subject": "JavaScript",
    "chapter": "Async Iterators & for await...of",
    "question": "A cosa serve la sintassi for await...of in JavaScript moderno?",
    "codeSnippet": "for await (const chunk of stream) {\n  console.log(chunk);\n}",
    "options": [
      "A iterare sequenzialmente su flussi di dati asincroni (AsyncIterables), come i chunk di uno streaming di risposta di un modello IA.",
      "A velocizzare i cicli for tradizionali di 10 volte.",
      "A creare un thread parallelo in Web Worker.",
      "A convertire un array in una stringa JSON."
    ],
    "correctIndex": 0,
    "explanation": "for await...of consente di ciclare su iterabili asincroni consumando ogni valore restituito da una sequenza di Promise, fondamentale per gestire flussi e stream di token di LLM in tempo reale."
  },
  {
    "id": "react-21",
    "subject": "React",
    "chapter": "React Router v6: Configurazione Rotte",
    "question": "Qual è la sintassi standard in React Router v6 per dichiarare una route che visualizza un componente?",
    "codeSnippet": "<Routes>\n  <Route path=\"/dispense\" element={<DispenseView />} />\n</Routes>",
    "options": [
      "<Route path=\"/dispense\" element={<DispenseView />} /> all'interno di <Routes>",
      "<Route path=\"/dispense\" component={DispenseView} /> senza tag contenitore",
      "<Router to=\"/dispense\"> <DispenseView /> </Router>",
      "<a href=\"/dispense\"> <DispenseView /> </a>"
    ],
    "correctIndex": 0,
    "explanation": "Dalla dispensa React Router: in React Router v6 le rotte si definiscono dentro <Routes> assegnando il componente JSX istanziato alla prop element."
  },
  {
    "id": "react-22",
    "subject": "React",
    "chapter": "React Router v6: Hooks di Navigazione",
    "question": "Quali hook di React Router v6 si utilizzano rispettivamente per leggere un parametro URL (/post/:id) e per effettuare una navigazione programmatica?",
    "codeSnippet": "const { id } = useParams();\nconst navigate = useNavigate();\nnavigate(\"/dashboard\");",
    "options": [
      "useParams() per i parametri di percorso e useNavigate() per la navigazione programmatica.",
      "useRoute() e useHistory() (deprecati in v6).",
      "useLocation() per i parametri e window.location.href per navigare.",
      "useQuery() e useRedirect()."
    ],
    "correctIndex": 0,
    "explanation": "useParams() estrae le variabili definite nel path (es. :id); useNavigate() restituisce una funzione imperativa per reindirizzare l'utente senza ricaricare la pagina."
  },
  {
    "id": "react-23",
    "subject": "React",
    "chapter": "React Router: <Link> vs Tag <a>",
    "question": "Perché nelle Single Page Application in React si deve usare il componente <Link to=\"...\"> anziché il tag <a href=\"...\"> per la navigazione interna?",
    "codeSnippet": "<Link to=\"/quiz\" className=\"btn\">Inizia Quiz</Link>",
    "options": [
      "Perché <Link> intercetta il click e aggiorna la URL tramite History API prevenendo il ricaricamento completo della pagina (SPA), preservando lo stato React in memoria.",
      "Perché il tag <a> non è supportato in HTML5.",
      "Perché <Link> esegue il download automatico del database.",
      "Perché <Link> è un tag nativo del browser Chrome."
    ],
    "correctIndex": 0,
    "explanation": "Il tag <a> standard provoca un full page reload che distruggerebbe lo stato applicativo; <Link> esegue la navigazione lato client (client-side routing) istantanea."
  },
  {
    "id": "react-24",
    "subject": "React",
    "chapter": "Form & Gestione Submit",
    "question": "Perché nell'handler onSubmit di un form React si esegue quasi sempre e.preventDefault()?",
    "codeSnippet": "const handleSubmit = (e) => {\n  e.preventDefault();\n  salvaDati(formData);\n};",
    "options": [
      "Per impedire il comportamento predefinito del browser di inviare una richiesta sincrona e ricaricare la pagina.",
      "Per svuotare automaticamente tutti gli input del modulo.",
      "Per disabilitare la tastiera dell'utente.",
      "Per inviare il form via email."
    ],
    "correctIndex": 0,
    "explanation": "Dalla dispensa React Form: il comportamento di default del form HTML consiste nel fare un refresh completo della pagina inviando i parametri in querystring o body HTTP. e.preventDefault() permette a React di gestire l'invio via JavaScript/fetch."
  },
  {
    "id": "react-25",
    "subject": "React",
    "chapter": "Context Provider & Custom Consumer Hook",
    "question": "Qual è la best practice raccomandata per consumare un React Context in modo sicuro nei componenti?",
    "codeSnippet": "export function useAuth() {\n  const context = useContext(AuthContext);\n  if (!context) throw new Error(\"useAuth deve essere usato dentro un AuthProvider\");\n  return context;\n}",
    "options": [
      "Creare un Custom Hook (es. useAuth) che incapsula useContext e valida la presenza del Provider lanciando un errore descrittivo se omesso.",
      "Esportare il Context grezzo e invocare useContext direttamente in ogni file senza controlli.",
      "Usare solo variabili globali di window.",
      "Non usare mai Custom Hook con il Context."
    ],
    "correctIndex": 0,
    "explanation": "Incapsulare useContext in un hook dedicato (es. useAuth, useTheme) centralizza i controlli di sicurezza, garantisce messaggi di errore chiari se il componente è fuori dal Provider e semplifica le importazioni."
  },
  {
    "id": "react-26",
    "subject": "React",
    "chapter": "Two-Way Binding Pattern",
    "question": "Come si realizza il pattern del 'Two-Way Data Binding' controllato in un componente React?",
    "codeSnippet": "<input \n  type=\"text\" \n  value={name} \n  onChange={(e) => setName(e.target.value)} \n/>",
    "options": [
      "Passando lo stato alla prop 'value' e aggiornando lo stato nell'evento 'onChange'.",
      "Usando la direttiva v-model o ng-model.",
      "Assegnando un id e leggendo document.getElementById('name').value.",
      "Usando solo la prop 'defaultValue' senza onChange."
    ],
    "correctIndex": 0,
    "explanation": "In React il binding bidirezionale si ottiene associando la lettura dello stato alla prop value e la scrittura alla callback onChange."
  },
  {
    "id": "react-27",
    "subject": "React",
    "chapter": "Stato Derivato vs Ridondante",
    "question": "Perché memorizzare in uno useState un valore facilmente calcolabile da altre prop o stati (es. fullName = firstName + lastName) è un antipattern?",
    "codeSnippet": "/* CORRETTO: Calcolo al volo o useMemo */\nconst fullName = `${firstName} ${lastName}`;",
    "options": [
      "Perché introduce disallineamenti di stato (stato fuori sincronia) e costringe a mantenere sincronizzati molteplici setter con re-render superflui.",
      "Perché React impedisce di avere più di 3 stati per componente.",
      "Perché le stringhe occupano troppa memoria RAM.",
      "Perché i browser non supportano template literals dentro i componenti."
    ],
    "correctIndex": 0,
    "explanation": "Lo stato derivato calcolato al volo o memoizzato garantisce la sincronizzazione immediata con la single source of truth senza rischio di valori obsoleti."
  },
  {
    "id": "react-28",
    "subject": "React",
    "chapter": "Optimistic UI Updates",
    "question": "Cos'è il pattern dell'Optimistic UI Update in un'applicazione React?",
    "codeSnippet": "// 1. Aggiorna UI immediatamente\nsetTodos(prev => [...prev, newTodo]);\n// 2. Chiamata API\ntry { await api.save(newTodo); } catch { setTodos(rollback); }",
    "options": [
      "Aggiornare subito l'interfaccia assumendo che la richiesta al server avrà successo, e fare rollback allo stato precedente solo in caso di errore.",
      "Attendere 10 secondi prima di inviare qualsiasi dato al backend.",
      "Disabilitare lo schermo finché il database non risponde.",
      "Mostrare sempre uno spinner a tutto schermo per ogni click."
    ],
    "correctIndex": 0,
    "explanation": "L'aggiornamento ottimistico fornisce una sensazione di reattività istantanea all'utente modificando la UI prima della conferma del server, con ripristino in caso di fallimento."
  },
  {
    "id": "react-29",
    "subject": "React",
    "chapter": "Lifting State Up (Sollevamento dello Stato)",
    "question": "Quando si applica il principio del 'Lifting State Up' in React?",
    "codeSnippet": "function Parent() {\n  const [filter, setFilter] = useState(\"\");\n  return (<><FilterInput value={filter} onChange={setFilter} /><ItemList filter={filter} /></>);\n}",
    "options": [
      "Quando due o più componenti fratelli devono condividere lo stesso stato mutevole, spostando lo stato nel loro genitore comune più prossimo.",
      "Quando si deve eliminare un componente dalla cartella del progetto.",
      "Quando si vuole spostare l'applicazione su un server cloud.",
      "Quando un componente ha troppe righe di CSS."
    ],
    "correctIndex": 0,
    "explanation": "Se componenti distinti devono riflettere gli stessi dati che cambiano, si sposta lo stato nell'antenato comune più vicino che lo redistribuisce tramite prop."
  },
  {
    "id": "react-30",
    "subject": "React",
    "chapter": "React Transitions & useTransition",
    "question": "A cosa serve l'hook useTransition / startTransition in React?",
    "codeSnippet": "const [isPending, startTransition] = useTransition();\nstartTransition(() => {\n  setFilterQuery(input); // Aggiornamento non bloccante a bassa priorità\n});",
    "options": [
      "A marcare un aggiornamento di stato come non urgente (transizione), mantenendo l'interfaccia reattiva e fluida agli input dell'utente durante rendering pesanti.",
      "Ad aggiungere animazioni CSS di dissolvenza in entrata.",
      "A ricaricare la pagina in background.",
      "A convertire i componenti funzionali in classi."
    ],
    "correctIndex": 0,
    "explanation": "useTransition consente di separare aggiornamenti urgenti (come la digitazione in un input) da aggiornamenti pesanti (come il filtraggio di liste enormi), evitando freeze della UI."
  },
  {
    "id": "sql-19",
    "subject": "SQL",
    "chapter": "Prisma Schema & Tipi Modello",
    "question": "Nel file schema.prisma, quale annotazione imposta un campo intero come chiave primaria auto-incrementale?",
    "codeSnippet": "model User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n}",
    "options": [
      "@id @default(autoincrement())",
      "@primaryKey @auto()",
      "@key @serial",
      "PRIMARY KEY AUTO_INCREMENT"
    ],
    "correctIndex": 0,
    "explanation": "Dalla dispensa Prisma Tabelle & Tipi: in Prisma schema @id dichiara il campo come chiave primaria e @default(autoincrement()) delega al database la generazione progressiva del valore numerico."
  },
  {
    "id": "sql-20",
    "subject": "SQL",
    "chapter": "Prisma Relazioni 1-a-Molti (@relation)",
    "question": "Come viene definita una relazione 1-a-Molti tra Utente e Post nello schema Prisma?",
    "codeSnippet": "model Post {\n  id       Int   @id @default(autoincrement())\n  author   User  @relation(fields: [authorId], references: [id])\n  authorId Int\n}",
    "options": [
      "Con l'attributo @relation(fields: [authorId], references: [id]) sul modello figlio che specifica la colonna FK e la PK del modello genitore.",
      "Usando solo la parola chiave JOIN nel codice JavaScript.",
      "Scrivendo una query SQL manuale dentro il file .env.",
      "Le relazioni in Prisma non necessitano di campi di riferimento."
    ],
    "correctIndex": 0,
    "explanation": "Dalla dispensa Prisma Relazioni: @relation stabilisce il collegamento referenziale specificando quali campi del modello corrente (fields) puntano alle chiavi del modello correlato (references)."
  },
  {
    "id": "sql-21",
    "subject": "SQL",
    "chapter": "Prisma Client: Query con include (Eager Loading)",
    "question": "Come si recuperano tutti i post includendo contestualmente i dati dell'autore con Prisma Client?",
    "codeSnippet": "const posts = await prisma.post.findMany({\n  include: {\n    author: true\n  }\n});",
    "options": [
      "Usando prisma.post.findMany({ include: { author: true } }) che effettua automaticamente il JOIN necessario.",
      "Eseguendo due query separate e unendole con un for.",
      "Usando prisma.post.join('author').",
      "Passando una stringa SQL grezza dentro res.send()."
    ],
    "correctIndex": 0,
    "explanation": "In Prisma Client l'opzione include: { relazione: true } istruisce l'ORM ad eseguire l'eager loading e allegare gli oggetti della tabella correlata nel risultato finale."
  },
  {
    "id": "sql-22",
    "subject": "SQL",
    "chapter": "Prisma Client: Filtri, Paginazione e Ordinamento",
    "question": "Quale combinazione di opzioni in findMany implementa paginazione e ordinamento in Prisma?",
    "codeSnippet": "const results = await prisma.product.findMany({\n  where: { inStock: true },\n  orderBy: { price: \"desc\" },\n  skip: 20,\n  take: 10\n});",
    "options": [
      "where (filtro), orderBy (ordinamento), skip (offset/salto righe) e take (limite righe per pagina).",
      "filter, sort, page e limit.",
      "having, group, from e to.",
      "where, order, start ed end."
    ],
    "correctIndex": 0,
    "explanation": "Prisma mappa i costrutti SQL standard in proprietà intuitive dell'oggetto di query: where per WHERE, orderBy per ORDER BY, skip per OFFSET e take per LIMIT."
  },
  {
    "id": "sql-23",
    "subject": "SQL",
    "chapter": "Prisma CLI & Migrazioni",
    "question": "Qual è il comando da terminale per generare ed applicare una migrazione SQL basata sulle modifiche di schema.prisma in ambiente di sviluppo?",
    "codeSnippet": "$ npx prisma migrate dev --name init_tables",
    "options": [
      "npx prisma migrate dev",
      "npx prisma generate build",
      "npx prisma push --force-delete",
      "npx prisma sql run"
    ],
    "correctIndex": 0,
    "explanation": "npx prisma migrate dev confronta lo schema.prisma con lo stato del database, genera il file di migrazione SQL storico ed applica le modifiche aggiornando anche il client generato."
  },
  {
    "id": "sql-24",
    "subject": "SQL",
    "chapter": "Prisma Nested Writes (Scritture Annidate)",
    "question": "Cosa permette di fare una Nested Write (es. create annidato) in Prisma?",
    "codeSnippet": "await prisma.user.create({\n  data: {\n    email: \"test@example.com\",\n    posts: {\n      create: [{ title: \"Primo Post\" }]\n    }\n  }\n});",
    "options": [
      "Creare sia il record principale (User) sia i record correlati (Posts) in una singola operazione transazionale atomica.",
      "Scrivere dati su due database diversi contemporaneamente senza connessione di rete.",
      "Cancellare tutti i dati vecchi prima di salvare.",
      "Generare un file PDF con i post dell'utente."
    ],
    "correctIndex": 0,
    "explanation": "Le Nested Writes di Prisma consentono di creare o connettere record in tabelle relazionali multiple garantendo che l'intera catena sia eseguita all'interno di una transazione sicura."
  },
  {
    "id": "sql-25",
    "subject": "SQL",
    "chapter": "Prisma Client Lifecycle & Singleton Pattern",
    "question": "Perché nelle applicazioni Node.js/Express è buona norma istanziare un unico PrismaClient condiviso?",
    "codeSnippet": "// prisma.js\nimport { PrismaClient } from \"@prisma/client\";\nconst prisma = new PrismaClient();\nexport default prisma;",
    "options": [
      "Per evitare di esaurire il pool di connessioni (connection pool) verso il database aprendo troppi socket simultanei ad ogni richiesta HTTP.",
      "Perché JavaScript permette di creare una sola classe per file.",
      "Perché il database supporta una sola query al minuto.",
      "Per risparmiare spazio su disco."
    ],
    "correctIndex": 0,
    "explanation": "Ogni nuova istanza di PrismaClient alloca e gestisce un proprio connection pool; riutilizzare una singola istanza globale previene l'esaurimento delle connessioni simultanee del database server."
  }
];
