import { DispenseKnowledgeBaseSchema } from "../schemas/dispensaSchema";

/**
 * Knowledge Base distillata e convalidata con Zod dalle 24 dispense didattiche ufficiali.
 */
const rawKnowledgeData = {
  css: {
    moduleId: "css",
    moduleName: "CSS Moderno & Responsive Design",
    description: "Layout Flexbox, CSS Grid, Box Model, Posizionamento e Specificità dei selettori.",
    totalLessons: 4,
    lessons: [
      {
        id: "css-box-model",
        title: "Box Model & Box-Sizing",
        pdfReference: "Dispensa CSS — Box Model & Specificità",
        summary: "Il modello a scatola determina le dimensioni effettive e lo spazio occupato dagli elementi HTML tramite content, padding, border e margin.",
        keyPoints: [
          "box-sizing: border-box include padding e border nella larghezza totale impostata.",
          "box-sizing: content-box (default storico) aggiunge padding e border all'esterno di width/height.",
          "Margin collapsing si verifica sui margini verticali adiacenti."
        ],
        examPitfalls: [
          "Dimenticare di applicare `* { box-sizing: border-box; }` causando overflow orizzontale inaspettato.",
          "Confondere padding (spazio interno al bordo) con margin (spazio esterno al bordo)."
        ],
        codeSnippets: [
          {
            title: "Reset Universale Box Model",
            language: "css",
            code: "*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}",
            explanation: "Garantisce che larghezze e altezze percentuali o fisse siano sempre prevedibili e stabili."
          }
        ],
        examQuestions: [
          "Qual è la differenza fondamentale tra `content-box` e `border-box`?",
          "Cosa si intende per 'Margin Collapsing' e in quali condizioni si verifica?"
        ]
      },
      {
        id: "css-flexbox",
        title: "Flexbox (Flexible Box Layout)",
        pdfReference: "Dispensa CSS — Flexbox & Allineamento",
        summary: "Modello unidimensionale per l'allineamento e la distribuzione dello spazio tra elementi all'interno di un contenitore lungo l'asse principale o trasversale.",
        keyPoints: [
          "justify-content controlla l'asse principale (main-axis).",
          "align-items e align-self controllano l'asse trasversale (cross-axis).",
          "flex-wrap permette agli elementi di andare a capo quando lo spazio termina."
        ],
        examPitfalls: [
          "Usare align-items per centrare orizzontalmente quando flex-direction è row (è justify-content a farlo!).",
          "Scordare che invertendo flex-direction in column, gli assi main e cross si invertono di ruolo."
        ],
        codeSnippets: [
          {
            title: "Centratura Perfetta con Flexbox",
            language: "css",
            code: ".center-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}",
            explanation: "Allinea sia orizzontalmente che verticalmente al centro qualsiasi contenuto."
          }
        ],
        examQuestions: [
          "Come cambiano le funzioni di `justify-content` e `align-items` quando si imposta `flex-direction: column`?",
          "Qual è la differenza tra `flex-grow`, `flex-shrink` e `flex-basis`?"
        ]
      },
      {
        id: "css-grid",
        title: "CSS Grid Layout",
        pdfReference: "Dispensa CSS — Grid Bidimensionale",
        summary: "Sistema bidimensionale a righe e colonne per la progettazione di layout complessi e responsive senza ricorrere a float o hack.",
        keyPoints: [
          "grid-template-columns e grid-template-rows definiscono la struttura.",
          "L'unità frazionaria `fr` assegna quote dello spazio libero disponibile.",
          "repeat(auto-fit, minmax(250px, 1fr)) crea layout responsive automatici senza media queries."
        ],
        examPitfalls: [
          "Confondere `auto-fill` (mantiene le colonne vuote) con `auto-fit` (espande le colonne esistenti per riempire la riga)."
        ],
        codeSnippets: [
          {
            title: "Responsive Grid Auto-Fit",
            language: "css",
            code: ".auto-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}",
            explanation: "Crea automaticamente quante più colonne da 280px possibili riempiendo la larghezza senza media query."
          }
        ],
        examQuestions: [
          "In quali scenari è preferibile usare CSS Grid rispetto a Flexbox?",
          "Spiega la differenza tra `auto-fit` e `auto-fill` nella funzione `repeat()`."
        ]
      },
      {
        id: "css-positioning",
        title: "Posizionamento e Stacking Context (z-index)",
        pdfReference: "Dispensa CSS — Posizionamento & Z-Index",
        summary: "Gestione del flusso del documento attraverso position static, relative, absolute, fixed e sticky, e creazione dello Stacking Context.",
        keyPoints: [
          "position: absolute si posiziona rispetto al più vicino antenato con position diversa da static.",
          "position: sticky commuta tra relative e fixed in base allo scroll del viewport.",
          "z-index ha effetto solo su elementi posizionati (non static) o figli di un flex/grid container."
        ],
        examPitfalls: [
          "Impostare un z-index elevatissimo su un elemento il cui genitore crea un nuovo stacking context con z-index inferiore."
        ],
        codeSnippets: [
          {
            title: "Badge Posizionato su Card",
            language: "css",
            code: ".card {\n  position: relative;\n}\n.card-badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}",
            explanation: "Ancora il badge all'angolo superiore destro della card senza farlo fuggire fuori."
          }
        ],
        examQuestions: [
          "Qual è il punto di riferimento di un elemento con `position: absolute`?",
          "Come funziona `position: sticky` e quali requisiti deve avere il genitore per farlo funzionare?"
        ]
      }
    ]
  },
  javascript: {
    moduleId: "javascript",
    moduleName: "JavaScript Core & Asincronismo",
    description: "Scope, Closure, Event Loop, Array Methods, Async/Await, DOM manipulation e LocalStorage.",
    totalLessons: 6,
    lessons: [
      {
        id: "js-scope-closure",
        title: "Scope, Hoisting e Closure",
        pdfReference: "Dispensa JavaScript — Cicli, Incrementi e Scope",
        summary: "Comprendere la visibilità delle variabili (global, function, block scope) e il meccanismo con cui le funzioni mantengono l'accesso al loro lexical environment.",
        keyPoints: [
          "let e const hanno block scope (TDZ - Temporal Dead Zone); var ha function scope ed è hoisted come undefined.",
          "Una closure si forma quando una funzione interna 'ricorda' le variabili del suo scope genitore anche dopo che quest'ultimo ha terminato l'esecuzione.",
          "const impedisce la riassegnazione del binding, ma non rende immutabile l'oggetto referenziato."
        ],
        examPitfalls: [
          "Usare var all'interno di un ciclo asincrono setTimeout (stampando sempre l'ultimo valore invece del valore dell'iterazione).",
          "Credere che const renda immutabili le proprietà di un array o oggetto."
        ],
        codeSnippets: [
          {
            title: "Esempio Closure Contatore",
            language: "javascript",
            code: "function createCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    getCount: () => count\n  };\n}\nconst counter = createCounter();",
            explanation: "La variabile count rimane privata e protetta all'interno della closure generata."
          }
        ],
        examQuestions: [
          "Spiega la differenza tra `var`, `let` e `const` in termini di scope e hoisting.",
          "Che cos'è una Closure e fornisci un esempio pratico di incapsulamento."
        ]
      },
      {
        id: "js-event-loop",
        title: "Event Loop, Call Stack e Microtask vs Macrotask",
        pdfReference: "Dispensa JavaScript — Timing Functions & Asincronia",
        summary: "JavaScript è a singolo thread concorrente basato su un ciclo di eventi continuo tra Call Stack, Microtask Queue (Promise) e Macrotask Queue (setTimeout/setInterval).",
        keyPoints: [
          "Il Call Stack esegue codice sincrono fino al suo svuotamento.",
          "La Microtask Queue (Promise.then, catch, queueMicrotask) ha priorità assoluta e viene svuotata completamente prima di qualsiasi macrotask.",
          "La Macrotask Queue (setTimeout, setInterval, I/O) viene eseguita solo quando non ci sono microtask pendenti."
        ],
        examPitfalls: [
          "Pensare che `setTimeout(fn, 0)` venga eseguito prima di una `Promise.resolve().then(fn)` (le Promise sono microtask e vincono sempre!)."
        ],
        codeSnippets: [
          {
            title: "Ordine di Esecuzione Event Loop",
            language: "javascript",
            code: "console.log('1. Sync');\nsetTimeout(() => console.log('4. Macrotask'), 0);\nPromise.resolve().then(() => console.log('3. Microtask'));\nconsole.log('2. Sync');\n// Output: 1 -> 2 -> 3 -> 4",
            explanation: "Dimostra l'ordine rigido: sincrono -> microtask -> macrotask."
          }
        ],
        examQuestions: [
          "Descrivi l'ordine di precedenza tra Call Stack, Microtask Queue e Macrotask Queue.",
          "Cosa fa esattamente `setTimeout(callback, 0)` nell'Event Loop?"
        ]
      },
      {
        id: "js-array-methods",
        title: "Metodi Funzionali degli Array (map, filter, reduce, find)",
        pdfReference: "Dispensa JavaScript — Arrow Function e Metodi Array",
        summary: "Trasformazione, filtraggio e aggregazione immutabile degli array in JavaScript moderno.",
        keyPoints: [
          "map() crea un nuovo array trasformando ciascun elemento; la lunghezza rimane invariata.",
          "filter() crea un nuovo array contenente solo gli elementi che soddisfano il predicato booleano.",
          "reduce() accumula i valori dell'array in un singolo risultato (oggetto, numero, array aggregato).",
          "find() restituisce il primo elemento corrispondente o undefined (a differenza di filter che restituisce un array)."
        ],
        examPitfalls: [
          "Usare forEach aspettandosi un valore di ritorno (forEach restituisce sempre undefined!).",
          "Dimenticare di restituire un valore dalla callback di map() producendo un array di undefined.",
          "Dimenticare il valore iniziale del totalizzatore in reduce()."
        ],
        codeSnippets: [
          {
            title: "Aggregazione con reduce",
            language: "javascript",
            code: "const cart = [{ price: 10, qty: 2 }, { price: 25, qty: 1 }];\nconst total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);",
            explanation: "Calcola il totale complessivo partendo dall'accumulatore esplicito 0."
          }
        ],
        examQuestions: [
          "Qual è la differenza fondamentale tra `map()`, `filter()` e `forEach()`?",
          "Come funziona `reduce()` e perché è fondamentale specificare sempre il valore iniziale `initialValue`?"
        ]
      },
      {
        id: "js-async-fetch",
        title: "Async / Await, Promises e Richieste HTTP (Fetch API)",
        pdfReference: "Dispensa Didattica — Richieste HTTP & Fetch",
        summary: "Gestione elegante delle operazioni asincrone e interazione con API REST tramite costrutti nativi.",
        keyPoints: [
          "Una Promise ha 3 stati: pending, fulfilled, rejected.",
          "async/await è zucchero sintattico sopra le Promise e richiede try/catch per la gestione degli errori.",
          "fetch() non rigetta la Promise su errori HTTP 404 o 500; rigetta solo per errori di rete. Bisogna controllare `response.ok`."
        ],
        examPitfalls: [
          "Dimenticare di fare `await response.json()` dopo `await fetch(...)` (sono due passaggi asincroni distinti!).",
          "Omettere la verifica di `if (!res.ok) throw new Error(...)` dopo una fetch."
        ],
        codeSnippets: [
          {
            title: "Pattern Fetch Robusto",
            language: "javascript",
            code: "async function fetchUserData(userId) {\n  try {\n    const res = await fetch(`https://api.example.com/users/${userId}`);\n    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);\n    return await res.json();\n  } catch (err) {\n    console.error('Fetch fallita:', err.message);\n    throw err;\n  }\n}",
            explanation: "Pattern standard con gestione esplicita sia degli errori HTTP che di quelli di connessione."
          }
        ],
        examQuestions: [
          "Perché una chiamata `fetch()` che riceve un codice HTTP 404 non entra automaticamente nel blocco `catch`?",
          "Come si eseguono più Promise in parallelo attendendo che tutte abbiano successo?"
        ]
      },
      {
        id: "js-dom-events",
        title: "DOM Manipulation & Event Delegation",
        pdfReference: "Dispensa - DOM: testo, elementi, classi e attributi & Eventi",
        summary: "Selezione di nodi, manipolazione di classi/attributi e gestione performante degli eventi tramite bubbling e delegation.",
        keyPoints: [
          "querySelector e querySelectorAll usano selettori CSS.",
          "classList.add, remove, toggle gestiscono le classi in modo atomico.",
          "Event Bubbling: l'evento risale dal target fino a document.",
          "Event Delegation: agganciare un unico listener sul contenitore genitore per gestire tutti i figli dinamici."
        ],
        examPitfalls: [
          "Aggiungere centinaia di listener individuali su elementi generati ciclicamente invece di usare l'event delegation sul genitore.",
          "Confondere `event.target` (l'elemento effettivo cliccato) con `event.currentTarget` (l'elemento a cui è agganciato il listener)."
        ],
        codeSnippets: [
          {
            title: "Event Delegation su Lista Dinamica",
            language: "javascript",
            code: "document.querySelector('#todo-list').addEventListener('click', (e) => {\n  if (e.target.matches('button.delete-btn')) {\n    const id = e.target.dataset.id;\n    removeTodo(id);\n  }\n});",
            explanation: "Un unico listener gestisce la cancellazione per tutti i bottoni presenti o aggiunti in futuro."
          }
        ],
        examQuestions: [
          "Spiega la differenza tra `event.target` ed `event.currentTarget`.",
          "Che cos'è l'Event Bubbling e come si applica l'Event Delegation?"
        ]
      },
      {
        id: "js-storage",
        title: "Web Storage API (LocalStorage vs SessionStorage)",
        pdfReference: "Dispensa JavaScript — LocalStorage",
        summary: "Persistenza sincrona di coppie chiave-valore nel browser con quote e differenze di ciclo di vita.",
        keyPoints: [
          "LocalStorage persiste fino a cancellazione esplicita; SessionStorage dura solo per la tab aperta.",
          "I dati vengono salvati SOLO come stringhe (richiede `JSON.stringify` e `JSON.parse`).",
          "Operazioni sincrone e bloccanti per stringhe molto grandi."
        ],
        examPitfalls: [
          "Tentare di salvare oggetti complessi direttamente senza serializzarli con `JSON.stringify()`, ottenendo `\"[object Object]\"`."
        ],
        codeSnippets: [
          {
            title: "Salvataggio e Recupero Tipizzato",
            language: "javascript",
            code: "const saveSession = (key, data) => localStorage.setItem(key, JSON.stringify(data));\nconst loadSession = (key) => {\n  try {\n    return JSON.parse(localStorage.getItem(key)) || null;\n  } catch { return null; }\n};",
            explanation: "Previene crash dell'applicazione gestendo il parsing JSON con fallback sicuro."
          }
        ],
        examQuestions: [
          "Quali sono i limiti di memoria e le differenze di persistenza tra LocalStorage e SessionStorage?",
          "Cosa succede se si chiama `localStorage.setItem('user', { name: 'Mario' })` senza JSON.stringify?"
        ]
      }
    ]
  },
  react: {
    moduleId: "react",
    moduleName: "React 19 & Component Architecture",
    description: "Component Lifecycle, State & Immutabilità, Hooks (useState, useEffect, useContext), Props e Routing.",
    totalLessons: 5,
    lessons: [
      {
        id: "react-usestate-immutability",
        title: "State Management & Immutabilità con useState",
        pdfReference: "Dispensa React — Eventi, Hook, useState e Immutabilità",
        summary: "React ri-renderizza i componenti solo quando il riferimento (reference) dello stato cambia; la mutazione diretta non innesca il re-render.",
        keyPoints: [
          "Gli stati devono essere aggiornati in modo puramente immutabile usando spread operator (`...`) o metodi che creano nuovi array/oggetti.",
          "L'aggiornamento funzionale `setCount(prev => prev + 1)` garantisce il calcolo corretto in presenza di aggiornamenti in batch o closure datate.",
          "Non mutare mai direttamente `state.push()` o `state.prop = val`."
        ],
        examPitfalls: [
          "Mutare l'array in-place con `.push()` o `.sort()` e poi chiamare `setState(array)`: React non rileva il cambio di puntatore e non aggiorna la vista!",
          "Chiamare `setCount(count + 1)` due volte consecutive nella stessa funzione aspettandosi +2 (sarà solo +1 a causa del batching!)."
        ],
        codeSnippets: [
          {
            title: "Aggiornamento Immutabile di un Oggetto in Stato",
            language: "jsx",
            code: "const [user, setUser] = useState({ name: 'Loris', scores: [28, 30] });\n\n// Aggiunta voto corretta:\nconst addScore = (newScore) => {\n  setUser(prev => ({\n    ...prev,\n    scores: [...prev.scores, newScore]\n  }));\n};",
            explanation: "Crea un nuovo riferimento per l'oggetto e per l'array interno, garantendo il re-render perfetto."
          }
        ],
        examQuestions: [
          "Perché in React non dobbiamo MAI mutare lo stato direttamente (es. `state.push()`)?",
          "Quando è obbligatorio usare la forma funzionale del setter `setState(prev => ...)`?"
        ]
      },
      {
        id: "react-useeffect",
        title: "Side Effects & Cleanup con useEffect",
        pdfReference: "Dispensa React — useEffect & Lifecycle",
        summary: "Sincronizzare il componente con sistemi esterni (API, timer, listener DOM) e gestire la pulizia delle risorse.",
        keyPoints: [
          "Dependency Array vuoto `[]`: eseguito una volta sola al montaggio.",
          "Dependency Array `[a, b]`: rieseguito ogni volta che `a` o `b` cambiano riferimento.",
          "Nessun Dependency Array: eseguito ad OGNI singolo re-render del componente.",
          "Funzione di cleanup (return `() => { ... }`): eseguita prima della successiva esecuzione dell'effetto o allo smontaggio del componente."
        ],
        examPitfalls: [
          "Dimenticare il cleanup di un `setInterval` o di un `addEventListener` nel return di useEffect creando memory leak.",
          "Omettere variabili o funzioni usate dentro useEffect dal dependency array causando stale closure."
        ],
        codeSnippets: [
          {
            title: "Timer con Funzione di Cleanup",
            language: "jsx",
            code: "useEffect(() => {\n  const timer = setInterval(() => {\n    setSeconds(s => s + 1);\n  }, 1000);\n  return () => clearInterval(timer); // Cleanup essenziale\n}, []);",
            explanation: "Pulisce l'intervallo allo smontaggio evitando esecuzioni fantasma e memory leaks."
          }
        ],
        examQuestions: [
          "Cosa succede se omettiamo completamente il dependency array in `useEffect`?",
          "A cosa serve e quando viene invocata la funzione di cleanup restituita da `useEffect`?"
        ]
      },
      {
        id: "react-props-lifting",
        title: "Props, One-Way Data Flow & Lifting State Up",
        pdfReference: "Dispensa React — Props & Flusso dei dati",
        summary: "I dati fluiscono esclusivamente dall'alto verso il basso (genitore -> figlio); la condivisione tra fratelli richiede di sollevare lo stato al genitore comune.",
        keyPoints: [
          "Le props sono in sola lettura (immutabili per il componente figlio).",
          "I figli comunicano verso l'alto tramite callback functions passate come props.",
          "Lifting State Up: spostare lo stato nel genitore comune più vicino per sincronizzare componenti paralleli."
        ],
        examPitfalls: [
          "Tentare di riassegnare direttamente una prop all'interno del figlio (`props.title = 'Nuovo'`)."
        ],
        codeSnippets: [
          {
            title: "Passaggio Callback Figlio -> Genitore",
            language: "jsx",
            code: "function FilterButton({ onSelectCategory, activeCategory }) {\n  return (\n    <button onClick={() => onSelectCategory('React')}>\n      Mostra React\n    </button>\n  );\n}",
            explanation: "Il figlio invoca la funzione del genitore trasmettendo il dato verso l'alto."
          }
        ],
        examQuestions: [
          "Cosa significa che React adotta un 'flusso di dati unidirezionale' (One-Way Data Flow)?",
          "Come possono due componenti fratelli condividere e aggiornare lo stesso stato?"
        ]
      },
      {
        id: "react-context",
        title: "Global State con React Context (createContext & useContext)",
        pdfReference: "Dispensa React Context — Dispensa Didattica",
        summary: "Evitare il 'prop drilling' condividendo dati globali (tema dark/light, autenticazione, impostazioni utente) attraverso l'albero dei componenti.",
        keyPoints: [
          "`createContext()` crea il contesto; `Provider` fornisce il valore ai figli.",
          "`useContext(Context)` consuma il valore nel componente desiderato.",
          "Ogni volta che il valore del Context cambia, tutti i componenti che consumano quel Context si ri-renderizzano."
        ],
        examPitfalls: [
          "Usare Context per stati ad altissima frequenza di aggiornamento (es. posizione mouse) provocando re-render a cascata in tutta l'applicazione."
        ],
        codeSnippets: [
          {
            title: "Theme Context Pattern",
            language: "jsx",
            code: "const ThemeContext = createContext();\n\nexport function ThemeProvider({ children }) {\n  const [isDark, setIsDark] = useState(false);\n  return (\n    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(d => !d) }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\nexport const useTheme = () => useContext(ThemeContext);",
            explanation: "Pattern custom hook ergonomico per accedere in sicurezza al contesto."
          }
        ],
        examQuestions: [
          "Che problema risolve React Context e cosa si intende con il termine 'Prop Drilling'?",
          "Qual è il potenziale svantaggio prestazionale se si inseriscono troppi stati frequentemente aggiornati in un unico Context?"
        ]
      },
      {
        id: "react-keys-lists",
        title: "Rendering di Liste e l'Importanza della prop `key`",
        pdfReference: "Dispensa React — Form, onSubmit e Liste",
        summary: "React utilizza la prop `key` durante la fase di Riconciliazione (Virtual DOM diffing) per identificare quali elementi sono stati aggiunti, rimossi o riordinati.",
        keyPoints: [
          "La `key` deve essere un identificativo univoco e stabile (es. `item.id`).",
          "Non usare l'indice dell'array (`index`) come key se la lista può essere ordinata, filtrata o se gli elementi possono essere rimossi.",
          "La key aiuta l'algoritmo di Riconciliazione a preservare lo stato interno degli input dei componenti figli."
        ],
        examPitfalls: [
          "Usare `key={index}` su liste con checkbox o input modificabili: riordinando o eliminando un elemento, lo stato degli input si disallinea!"
        ],
        codeSnippets: [
          {
            title: "Rendering Corretto con Key Univoca",
            language: "jsx",
            code: "const QuestionList = ({ questions }) => (\n  <ul>\n    {questions.map(q => (\n      <li key={q.id}>\n        <h4>{q.title}</h4>\n      </li>\n    ))}\n  </ul>\n);",
            explanation: "L'uso di q.id stabile permette a React di aggiornare solo i nodi DOM strettamente modificati."
          }
        ],
        examQuestions: [
          "Perché è sconsigliato usare l'indice dell'array come `key` nel rendering di una lista dinamica?",
          "Cosa fa l'algoritmo di Riconciliazione di React quando rileva chiavi modificate?"
        ]
      }
    ]
  },
  sql: {
    moduleId: "sql",
    moduleName: "MySQL & Database Relazionali",
    description: "DDL/DML, JOIN (INNER, LEFT, RIGHT), Aggregazioni (GROUP BY, HAVING), Indici e Transazioni ACID.",
    totalLessons: 3,
    lessons: [
      {
        id: "sql-joins",
        title: "JOIN Relazionali (INNER, LEFT, RIGHT, FULL)",
        pdfReference: "Dispensa — Relazioni tra tabelle con MySQL",
        summary: "Combinazione di righe da due o più tabelle in base a una colonna correlata (chiave primaria / chiave esterna).",
        keyPoints: [
          "INNER JOIN restituisce solo le righe che hanno corrispondenza in ENTRAMBE le tabelle.",
          "LEFT JOIN (o LEFT OUTER JOIN) restituisce tutte le righe della tabella di sinistra, con NULL per quelle senza match a destra.",
          "RIGHT JOIN restituisce tutte le righe della tabella di destra.",
          "ON specifica il predicato di giunzione tra Foreign Key e Primary Key."
        ],
        examPitfalls: [
          "Usare INNER JOIN quando si vuole elencare anche gli utenti che non hanno ancora effettuato alcun ordine (in questo caso serve LEFT JOIN!).",
          "Applicare condizioni nella clausola WHERE invece che nella clausola ON durante una LEFT JOIN, trasformandola accidentalmente in una INNER JOIN."
        ],
        codeSnippets: [
          {
            title: "LEFT JOIN per Includere Record Senza Ordini",
            language: "sql",
            code: "SELECT users.id, users.name, COUNT(orders.id) AS total_orders\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id\nGROUP BY users.id, users.name;",
            explanation: "Restituisce tutti gli utenti con il conteggio ordini (0 per chi non ne ha)."
          }
        ],
        examQuestions: [
          "Qual è la differenza fondamentale tra `INNER JOIN` e `LEFT JOIN`?",
          "Cosa succede ai record della tabella di destra se per una riga di sinistra non esiste corrispondenza in una `LEFT JOIN`?"
        ]
      },
      {
        id: "sql-group-having",
        title: "Aggregazioni, GROUP BY e Differenza con HAVING vs WHERE",
        pdfReference: "Dispensa didattica — MySQL e database relazionali",
        summary: "Raggruppare righe e calcolare metriche aggregate (COUNT, SUM, AVG, MIN, MAX) filtrando prima e dopo l'aggregazione.",
        keyPoints: [
          "WHERE filtra le singole righe PRIMA che avvenga il raggruppamento (non può contenere funzioni di aggregazione).",
          "GROUP BY raggruppa le righe in base ai valori delle colonne specificate.",
          "HAVING filtra i gruppi risultanti DOPO l'aggregazione (può e deve contenere funzioni di aggregazione come `HAVING COUNT(*) > 5`)."
        ],
        examPitfalls: [
          "Scrivere `WHERE COUNT(id) > 2` (genera errore di sintassi SQL immediato!).",
          "Includere nella SELECT colonne non aggregate e non presenti nella clausola GROUP BY (violazione di `ONLY_FULL_GROUP_BY`)."
        ],
        codeSnippets: [
          {
            title: "Query con GROUP BY e HAVING",
            language: "sql",
            code: "SELECT category_id, AVG(price) AS avg_price, COUNT(*) AS product_count\nFROM products\nWHERE in_stock = 1\nGROUP BY category_id\nHAVING COUNT(*) >= 5\nORDER BY avg_price DESC;",
            explanation: "Filtra i prodotti a magazzino, raggruppa per categoria e mostra solo categorie con almeno 5 prodotti."
          }
        ],
        examQuestions: [
          "Qual è la differenza tra la clausola `WHERE` e la clausola `HAVING`?",
          "Perché non è consentito usare `WHERE AVG(prezzo) > 100` in SQL standard?"
        ]
      },
      {
        id: "sql-transactions-acid",
        title: "Transazioni e Proprietà ACID (InnoDB)",
        pdfReference: "Dispensa didattica — CRUD e transazioni con MySQL",
        summary: "Garantire l'integrità e la consistenza del database durante sequenze di operazioni multiple attraverso COMMIT e ROLLBACK.",
        keyPoints: [
          "Atomicità: tutto ha successo o nessuna operazione viene applicata.",
          "Consistenza: il database passa da uno stato valido a un altro rispettando i vincoli di integrità.",
          "Isolamento: transazioni concorrenti non interferiscono tra loro.",
          "Durabilità: una volta eseguito il COMMIT, i dati rimangono persistenti anche in caso di crash.",
          "Comandi: `START TRANSACTION;`, `COMMIT;`, `ROLLBACK;`."
        ],
        examPitfalls: [
          "Dimenticare di eseguire il `COMMIT` dopo le istruzioni DML lasciando la transazione aperta e bloccando le righe (lock contention).",
          "Non racchiudere trasferimenti di saldo (es. bonifico: decrementa A, incrementa B) in una transazione."
        ],
        codeSnippets: [
          {
            title: "Esempio Transazione Trasferimento Fondi",
            language: "sql",
            code: "START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- Se tutto ok:\nCOMMIT;\n-- In caso di errore:\n-- ROLLBACK;",
            explanation: "Garantisce l'atomicità: impossibile scalare fondi senza accreditarli al destinatario."
          }
        ],
        examQuestions: [
          "Elenca e spiega il significato delle quattro lettere dell'acronimo `ACID`.",
          "Che differenza c'è tra `COMMIT` e `ROLLBACK` in una transazione MySQL?"
        ]
      }
    ]
  }
};

/**
 * Validazione a runtime dei dati grezzi tramite lo schema Zod.
 */
export const DISPENSE_KNOWLEDGE_BASE = DispenseKnowledgeBaseSchema.parse(rawKnowledgeData);

/**
 * Helper per recuperare tutti i topic di un modulo.
 */
export function getTopicsByModule(moduleId) {
  return DISPENSE_KNOWLEDGE_BASE[moduleId]?.lessons || [];
}

/**
 * Helper per trovare un argomento correlato per parola chiave.
 */
export function findTopicByKeyword(keyword) {
  const term = keyword.toLowerCase();
  for (const moduleKey of Object.keys(DISPENSE_KNOWLEDGE_BASE)) {
    const mod = DISPENSE_KNOWLEDGE_BASE[moduleKey];
    for (const lesson of mod.lessons) {
      if (
        lesson.title.toLowerCase().includes(term) ||
        lesson.summary.toLowerCase().includes(term) ||
        lesson.keyPoints.some(k => k.toLowerCase().includes(term))
      ) {
        return { module: mod.moduleName, lesson };
      }
    }
  }
  return null;
}

/**
 * Genera il prompt di contesto della Knowledge Base per LangChain.
 */
export function buildDispenseKnowledgeContext(subject = null) {
  let modulesToInclude = Object.values(DISPENSE_KNOWLEDGE_BASE);
  if (subject && DISPENSE_KNOWLEDGE_BASE[subject.toLowerCase()]) {
    modulesToInclude = [DISPENSE_KNOWLEDGE_BASE[subject.toLowerCase()]];
  }

  return modulesToInclude.map(mod => {
    const lessonsText = mod.lessons.map(l => (
      `• [${l.pdfReference}] ${l.title}:
  - Punti Chiave: ${l.keyPoints.join("; ")}
  - Trabocchetti Esame: ${l.examPitfalls.join("; ")}
  - Domande Tipiche: ${l.examQuestions.join(" / ")}`
    )).join("\n");

    return `### MODULO: ${mod.moduleName}\n${lessonsText}`;
  }).join("\n\n");
}
