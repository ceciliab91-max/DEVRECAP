export const roadmapData = [
  {
    subject: "CSS",
    color: "from-blue-500 to-cyan-500",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    topics: [
      {
        id: "css-1",
        title: "Box Model, Reset & Tipografia",
        description: "Padroneggiare margin, padding, border-box, unità relative (rem, em, vh, vw) e font loading.",
        week: "Settimana 1",
        estimatedHours: 4
      },
      {
        id: "css-2",
        title: "Flexbox Mastery",
        description: "Asse principale e trasversale, flex-direction, justify-content, align-items, flex-grow, flex-shrink.",
        week: "Settimana 1",
        estimatedHours: 5
      },
      {
        id: "css-3",
        title: "CSS Grid Layout",
        description: "Grid template columns/rows, auto-fit, auto-fill, minmax(), grid-area e allineamento elementi.",
        week: "Settimana 2",
        estimatedHours: 6
      },
      {
        id: "css-4",
        title: "Specificità, Cascata & BEM",
        description: "Calcolo della specificità, ereditarietà, selettori complessi e metodologia di naming BEM.",
        week: "Settimana 2",
        estimatedHours: 3
      },
      {
        id: "css-5",
        title: "Responsive Design & Custom Properties",
        description: "Media queries Mobile-First, breakpoints standard, variabili CSS `:root` e dark mode dinamica.",
        week: "Settimana 3",
        estimatedHours: 4
      }
    ]
  },
  {
    subject: "JavaScript",
    color: "from-yellow-500 to-amber-500",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    topics: [
      {
        id: "js-1",
        title: "Tipi di Dati, Scope & Variables",
        description: "Differenze tra `var`, `let`, `const`, coercizione di tipo, immutabilità e `typeof`.",
        week: "Settimana 1",
        estimatedHours: 4
      },
      {
        id: "js-2",
        title: "Funzioni, Closures & Lexical Scope",
        description: "Arrow functions vs funzioni tradizionali, closures, contesto `this`, `call`, `apply`, `bind`.",
        week: "Settimana 2",
        estimatedHours: 6
      },
      {
        id: "js-3",
        title: "Metodi Avanzati degli Array & Oggetti",
        description: "Immutabilità con `map`, `filter`, `reduce`, destrutturazione ES6, spread/rest operators.",
        week: "Settimana 2",
        estimatedHours: 5
      },
      {
        id: "js-4",
        title: "Asincronia, Promises & Event Loop",
        description: "Call stack, Web APIs, Microtask vs Macrotask Queue, sintassi `async/await` e gestione errori.",
        week: "Settimana 3",
        estimatedHours: 8
      },
      {
        id: "js-5",
        title: "DOM Manipulation & Event Propagation",
        description: "Selezione elementi, Event Bubbling, Event Capturing, Event Delegation e Performance.",
        week: "Settimana 3",
        estimatedHours: 4
      }
    ]
  },
  {
    subject: "React",
    color: "from-cyan-400 to-sky-500",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    topics: [
      {
        id: "react-1",
        title: "Fondamenti di JSX & Componenti",
        description: "Sintassi JSX, componenti funzionali, props, rendering condizionale e liste con `key` prop.",
        week: "Settimana 1",
        estimatedHours: 4
      },
      {
        id: "react-2",
        title: "Gestione dello Stato (`useState`)",
        description: "Stato locale, immutabilità degli oggetti e array nello stato, aggiornamenti funzionali pendenti.",
        week: "Settimana 2",
        estimatedHours: 5
      },
      {
        id: "react-3",
        title: "Effetti Collaterali (`useEffect`)",
        description: "Ciclo di vita dei componenti, array delle dipendenze, cleanup functions e chiamata a chiamate API.",
        week: "Settimana 2",
        estimatedHours: 6
      },
      {
        id: "react-4",
        title: "Context API & State Globale",
        description: "Risolvere il Prop Drilling, `createContext`, `useContext`, Provider pattern e architettura dello stato.",
        week: "Settimana 3",
        estimatedHours: 5
      },
      {
        id: "react-5",
        title: "Hooks Avanzati & Custom Hooks",
        description: "Memoizzazione con `useMemo` e `useCallback`, `useRef` per riferimenti al DOM e creazione di Custom Hooks.",
        week: "Settimana 4",
        estimatedHours: 7
      }
    ]
  },
  {
    subject: "SQL",
    color: "from-purple-500 to-indigo-500",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    topics: [
      {
        id: "sql-1",
        title: "Basi di SQL & DDL/DML",
        description: "Comandi `CREATE TABLE`, `ALTER`, `INSERT`, `UPDATE`, `DELETE` e tipi di dati relazionali.",
        week: "Settimana 1",
        estimatedHours: 4
      },
      {
        id: "sql-2",
        title: "Selezione & Filtraggio Avanzato",
        description: "Sintassi `SELECT`, `WHERE`, `LIKE`, `IN`, `BETWEEN`, `ORDER BY` e gestione dei valori `NULL`.",
        week: "Settimana 2",
        estimatedHours: 5
      },
      {
        id: "sql-3",
        title: "Relazioni & Joins tra Tabelle",
        description: "Concetto di Primary/Foreign Key, `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN` e `FULL OUTER JOIN`.",
        week: "Settimana 2",
        estimatedHours: 7
      },
      {
        id: "sql-4",
        title: "Funzioni di Aggregazione & Grouping",
        description: "Utilizzo di `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, clausola `GROUP BY` e filtraggio gruppi con `HAVING`.",
        week: "Settimana 3",
        estimatedHours: 5
      },
      {
        id: "sql-5",
        title: "Indicizzazione, Transazioni & ACID",
        description: "Creazione di Indici B-Tree per l'ottimizzazione delle query, `EXISTS` vs `IN`, proprietà ACID e transazioni `COMMIT`/`ROLLBACK`.",
        week: "Settimana 4",
        estimatedHours: 6
      }
    ]
  }
];
