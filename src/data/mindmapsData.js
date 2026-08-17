export const mindmapsData = [
  {
    id: "css-mindmap",
    subject: "CSS",
    title: "Mappa Concettuale CSS Layout & Styling",
    description: "Struttura chiave di Box Model, Flexbox, Grid, Specificità e Responsive Design.",
    color: "from-blue-500 to-cyan-500",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    nodes: [
      {
        id: "css-n1",
        title: "1. CSS Box Model",
        icon: "Box",
        summary: "Ogni elemento HTML è un rettangolo composto da 4 strati concentrici.",
        points: [
          "Content: Area del testo/immagine principale.",
          "Padding: Spazio interno trasparente tra contenuto e bordo.",
          "Border: Bordo che circonda il padding e il contenuto.",
          "Margin: Spazio esterno trasparente che separa l'elemento dagli altri."
        ],
        tip: "Usa sempre `box-sizing: border-box` per evitare che padding e border aumentino la larghezza totale impostata."
      },
      {
        id: "css-n2",
        title: "2. Flexbox (1D Layout)",
        icon: "LayoutList",
        summary: "Gestione del layout monodimensionale (righe o colonne).",
        points: [
          "Main Axis (Asse Principale): gestito da `justify-content` (flex-start, center, space-between, space-around).",
          "Cross Axis (Asse Trasversale): gestito da `align-items` (stretch, center, flex-start, flex-end).",
          "Flex Item Properties: `flex-grow` (espansione), `flex-shrink` (contrazione), `flex-basis` (dimensione base)."
        ],
        tip: "Scorciatoia centratura perfetta: `display: flex; justify-content: center; align-items: center;`."
      },
      {
        id: "css-n3",
        title: "3. CSS Grid (2D Layout)",
        icon: "Grid",
        summary: "Gestione bidimensionale simultanea di righe e colonne.",
        points: [
          "Colonne: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`.",
          "Spaziatura: `gap: 1rem 2rem` (row-gap e column-gap).",
          "Posizionamento: `grid-column: 1 / 3` per far estendere un elemento su 2 colonne."
        ],
        tip: "La funzione `minmax()` combinata con `auto-fit` permette griglie responsive senza media query!"
      },
      {
        id: "css-n4",
        title: "4. Calcolo Specificità CSS",
        icon: "Award",
        summary: "Determina quale regola CSS prevale quando più regole prendono di mira lo stesso elemento.",
        points: [
          "Inline Style: (1,0,0,0) - Es. `style='color:red'`",
          "ID Selector: (0,1,0,0) - Es. `#header`",
          "Class, Pseudo-class, Attribute: (0,0,1,0) - Es. `.btn`, `:hover`, `[type='text']`",
          "Element & Pseudo-element: (0,0,0,1) - Es. `div`, `p`, `::before`"
        ],
        tip: "`!important` sovrascrive qualsiasi valore di specificità ma va usato solo per casi di emergenza o utilità globali."
      }
    ]
  },
  {
    id: "js-mindmap",
    subject: "JavaScript",
    title: "Mappa Concettuale JavaScript Core & Async",
    description: "Scope, Closures, Event Loop, Programmazione Asincrona e Metodi di Array.",
    color: "from-yellow-500 to-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    nodes: [
      {
        id: "js-n1",
        title: "1. Scope & Tipi di Variabili",
        icon: "Code",
        summary: "Ambito di visibilità delle variabili nel codice.",
        points: [
          "`var`: Scope di funzione, soggetto ad Hoisting completo, permette la ridichiarazione.",
          "`let`: Scope di blocco (`{}`), soggetto a Temporal Dead Zone (TDZ).",
          "`const`: Scope di blocco, valore immutabile nella riassegnazione (ma oggetti/array restano mutabili!)."
        ],
        tip: "Preferisci sempre `const` per default e `let` quando devi riassegnare. Evita `var` nel codice moderno."
      },
      {
        id: "js-n2",
        title: "2. Closures & Lexical Scope",
        icon: "Lock",
        summary: "Una funzione che ricorda e accede al proprio scope di creazione anche se eseguita altrove.",
        points: [
          "Ambiente Lessicale: le funzioni accedono alle variabili dello scope genitore.",
          "Private State: consente di creare dati privati incapsulati in funzioni.",
          "Esempio classico: funzioni factory e moduli."
        ],
        tip: "La closure si crea al momento della DEFINIZIONE della funzione, non quando viene chiamata."
      },
      {
        id: "js-n3",
        title: "3. Event Loop & Asincronia",
        icon: "Cpu",
        summary: "Architettura a singolo thread di JavaScript per gestire operazioni non bloccanti.",
        points: [
          "Call Stack: esegue il codice sincrono riga per riga.",
          "Web APIs: gestisce timer (`setTimeout`), chiamate `fetch()` ed eventi DOM.",
          "Microtask Queue: contiene callback di Promise (`.then()`, `async/await`). Precedenza ASSOLUTA!",
          "Macrotask Queue: contiene `setTimeout`, `setInterval`, `setImmediate`."
        ],
        tip: "TUTTI i microtask vengono eseguiti prima che il browser elabori anche un solo macrotask o faccia il repaint!"
      },
      {
        id: "js-n4",
        title: "4. Metodi Immutabili degli Array",
        icon: "Layers",
        summary: "Funzioni per manipolare array senza modificare l'array originale.",
        points: [
          "`.map(fn)`: Trasforma ogni elemento restituendo un nuovo array di pari lunghezza.",
          "`.filter(fn)`: Seleziona solo gli elementi che soddisfano la condizione booleana.",
          "`.reduce(fn, init)`: Accumula gli elementi in un unico valore finale (es. somma o oggetto)."
        ],
        tip: "Metodi come `.push()`, `.pop()`, `.splice()`, `.sort()` MUTANO l'array originale!"
      }
    ]
  },
  {
    id: "react-mindmap",
    subject: "React",
    title: "Mappa Concettuale React Architecture & Hooks",
    description: "Componenti, Virtual DOM, Gestione dello Stato, Effetti e Hooks di Ottimizzazione.",
    color: "from-cyan-400 to-sky-500",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    nodes: [
      {
        id: "react-n1",
        title: "1. Virtual DOM & JSX",
        icon: "Component",
        summary: "Come React aggiorna la UI con elevate prestazioni.",
        points: [
          "JSX: Sintassi estesa di JS che permette di scrivere codice simile all'HTML nei componenti.",
          "Virtual DOM: Rappresentazione in memoria della UI reale in nodi JS.",
          "Reconcilation (Diffing): React confronta il nuovo Virtual DOM con quello precedente e aggiorna SOLO le parti modificate del DOM reale.",
          "Key Prop nelle Liste: aiuta l'algoritmo di diffing a tracciare l'identità unica di ciascun elemento."
        ],
        tip: "Non usare MAI l'indice dell'array come `key` se la lista può essere riordinata o filtrata!"
      },
      {
        id: "react-n2",
        title: "2. Stato e Ciclo di Vita (`useState`, `useEffect`)",
        icon: "RefreshCw",
        summary: "Reattività dei componenti funzionali.",
        points: [
          "`useState(init)`: Gestisce lo stato locale. Un cambio di stato attiva un re-render.",
          "`useEffect(fn, [deps])`: Gestisce side-effects (API fetch, iscrizioni, DOM).",
          "Array delle Dipendenze: `[]` = solo al mount; `[val]` = al mount e quando `val` cambia; nessun array = ad OGNI render!"
        ],
        tip: "Includi SEMPRE nella cleanup function di `useEffect` l'annullamento di timer ed event listener."
      },
      {
        id: "react-n3",
        title: "3. State Management Globale (Context API)",
        icon: "Share2",
        summary: "Condivisione di dati senza passare props manualmente su più livelli (Prop Drilling).",
        points: [
          "`createContext()`: Inizializza l'oggetto contesto.",
          "`<Context.Provider value={...}>`: Fornisce il valore all'albero di componenti figli.",
          "`useContext(Context)`: Consuma il valore del contesto nel componente desiderato."
        ],
        tip: "Usa Context per dati davvero globali (es. Tema dark/light, Utente autenticato). Per stati frequenti usa librerie dedicate."
      },
      {
        id: "react-n4",
        title: "4. Hooks di Performance (`useMemo`, `useCallback`)",
        icon: "Zap",
        summary: "Evitare calcoli inutili e ricreazioni di funzioni durante i re-render.",
        points: [
          "`useMemo(() => compute(), [deps])`: Mantiene in cache il valore restituito da un calcolo pesante.",
          "`useCallback(fn, [deps])`: Mantiene stabile il riferimento di memoria di una callback passata ai figli."
        ],
        tip: "Non abusare di `useMemo` per operazioni banali: l'overhead di calcolo della dipendenza potrebbe costare più del calcolo stesso."
      }
    ]
  },
  {
    id: "sql-mindmap",
    subject: "SQL",
    title: "Mappa Concettuale Database Relazionali (SQL)",
    description: "Struttura DDL/DML, JOIN tra Tabelle, Aggregazioni e Proprietà ACID.",
    color: "from-purple-500 to-indigo-500",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    nodes: [
      {
        id: "sql-n1",
        title: "1. Linguaggio SQL: DDL vs DML",
        icon: "Database",
        summary: "Classificazione dei comandi in base all'obiettivo sulle tabelle.",
        points: [
          "DDL (Data Definition Language): `CREATE`, `ALTER`, `DROP`, `TRUNCATE` (definizione di schema/struttura).",
          "DML (Data Manipulation Language): `SELECT`, `INSERT`, `UPDATE`, `DELETE` (manipolazione dei dati riga per riga)."
        ],
        tip: "Il comando `TRUNCATE` è DDL (svuota la tabella senza registrare singoli log di riga), `DELETE` è DML."
      },
      {
        id: "sql-n2",
        title: "2. Relazioni & Tipi di JOIN",
        icon: "GitMerge",
        summary: "Combinazione di dati da due o più tabelle in base a Primary Key / Foreign Key.",
        points: [
          "`INNER JOIN`: Ritorna solo le righe con match sia a sinistra che a destra.",
          "`LEFT JOIN`: Ritorna TUTTE le righe a sinistra e le corrispondenti a destra (o NULL).",
          "`RIGHT JOIN`: Ritorna TUTTE le righe a destra e le corrispondenti a sinistra (o NULL).",
          "`FULL OUTER JOIN`: Ritorna tutte le righe da entrambe le tabelle includendo i NULL."
        ],
        tip: "In una `LEFT JOIN`, se non c'è match nella tabella destra, i campi estratti dalla destra saranno `NULL`."
      },
      {
        id: "sql-n3",
        title: "3. Aggregazione & Filtraggio (`GROUP BY`, `HAVING`)",
        icon: "Filter",
        summary: "Elaborazione di dati aggregati con funzioni matematiche.",
        points: [
          "Funzioni di Aggregazione: `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.",
          "`GROUP BY`: Raggruppa le righe che hanno gli stessi valori nelle colonne specificate.",
          "`WHERE`: Filtra le righe PRIMA del raggruppamento.",
          "`HAVING`: Filtra i gruppi DOPO il raggruppamento (lavora sui risultati delle aggregazioni)."
        ],
        tip: "Ordina le clausole nel seguente modo: `SELECT` -> `FROM` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `ORDER BY`."
      },
      {
        id: "sql-n4",
        title: "4. Indici & Transazioni ACID",
        icon: "ShieldCheck",
        summary: "Integrità dei dati e velocizzazione delle interrogazioni.",
        points: [
          "Indici: Strutture dati (es. B-Tree) che velocizzano le query `SELECT WHERE`. Rallentano leggermente le `INSERT`.",
          "A - Atomicità: Tutto o niente (se un passo fallisce, si fa `ROLLBACK`).",
          "C - Coerenza: Il DB passa da uno stato valido a un altro stato valido.",
          "I - Isolamento: Transazioni concorrenti non interferiscono tra loro.",
          "D - Durabilità: I dati salvati con `COMMIT` sopravvivono a crash di sistema."
        ],
        tip: "Usa `BEGIN TRANSACTION`, `COMMIT` per confermare le modifiche e `ROLLBACK` in caso di eccezione."
      }
    ]
  }
];
