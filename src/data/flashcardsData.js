export const flashcardsData = [
  // --- CSS ---
  {
    id: "css-fc-1",
    subject: "CSS",
    category: "Box Model",
    title: "box-sizing: border-box vs content-box",
    front: "Qual è la differenza fondamentale tra 'content-box' e 'border-box' nel CSS Box Model?",
    back: "In 'content-box' (default), la larghezza (width) indicata si applica SOLO al contenuto. Padding e border si sommano all'esterno aumentando la dimensione totale. In 'border-box', padding e border sono INCLUSI nella width totale dell'elemento.",
    codeSnippet: `/* Raccomandato per tutti gli elementi */
*, *::before, *::after {
  box-sizing: border-box;
}`
  },
  {
    id: "css-fc-2",
    subject: "CSS",
    category: "Flexbox",
    title: "justify-content vs align-items",
    front: "Come si differenziano 'justify-content' e 'align-items' in un contenitore Flexbox?",
    back: "'justify-content' allinea gli elementi lungo l'asse principale (Main Axis, di default orizzontale). 'align-items' allinea gli elementi lungo l'asse trasversale (Cross Axis, di default verticale).",
    codeSnippet: `.container {
  display: flex;
  justify-content: center; /* Asse principale */
  align-items: center;     /* Asse trasversale */
}`
  },
  {
    id: "css-fc-3",
    subject: "CSS",
    category: "Specificità",
    title: "Calcolo della Specificità CSS",
    front: "Qual è l'ordine di priorità della specificità CSS in base ai selettori?",
    back: "L'ordine di peso dal più forte al meno forte è: 1) Inline styles (1,0,0,0) -> 2) ID (0,1,0,0) -> 3) Classi, Pseudo-classi e Attributi (0,0,1,0) -> 4) Elementi e Pseudo-elementi (0,0,0,1). L'istruzione !important supera la normale specificità.",
    codeSnippet: `/* ID (0,1,0,0) vince su Classe + Elemento (0,0,1,1) */
#main-header { color: blue; } 
header.banner { color: red; }`
  },
  {
    id: "css-fc-4",
    subject: "CSS",
    category: "Grid Layout",
    title: "minmax() & auto-fit",
    front: "A cosa serve la combinazione 'repeat(auto-fit, minmax(250px, 1fr))' in CSS Grid?",
    back: "Crea un layout responsive automatico senza media queries! Definisce colonne con larghezza minima di 250px ed espandibili fino a occupare 1fr del relativo spazio libero.",
    codeSnippet: `.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}`
  },
  {
    id: "css-fc-5",
    subject: "CSS",
    category: "Posizionamento",
    title: "position: absolute vs relative vs fixed vs sticky",
    front: "Spiega brevemente il comportamento di 'position: absolute' rispetto a 'relative' e 'fixed'.",
    back: "'relative' posiziona l'elemento rispetto al suo flusso normale. 'absolute' si posiziona rispetto al primo antenato posizionato (non static). 'fixed' è relativo alla finestra del viewport.",
    codeSnippet: `.parent { position: relative; }
.child-badge { 
  position: absolute; 
  top: -10px; 
  right: -10px; 
}`
  },

  // --- JAVASCRIPT ---
  {
    id: "js-fc-1",
    subject: "JavaScript",
    category: "Scope & Closure",
    title: "Che cos'è una Closure?",
    front: "Fornisci la definizione di Closure in JavaScript.",
    back: "Una Closure è la combinazione di una funzione e dell'ambiente lessicale in cui è stata dichiarata. Consente a una funzione interna di accedere alle variabili della funzione esterna anche dopo che quest'ultima ha terminato l'esecuzione.",
    codeSnippet: `function creaContatore() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const incrementa = creaContatore();
console.log(incrementa()); // 1`
  },
  {
    id: "js-fc-2",
    subject: "JavaScript",
    category: "Asincronia",
    title: "Event Loop: Microtask vs Macrotask",
    front: "In che ordine vengono eseguiti Promises (.then) e setTimeout nell'Event Loop?",
    back: "Le callback delle Promise vanno nella Microtask Queue, mentre setTimeout/setInterval vanno nella Macrotask Queue. I Microtask hanno SEMPRE precedenza assoluta e vengono svuotati del tutto prima di eseguire il prossimo Macrotask.",
    codeSnippet: `console.log('1');
setTimeout(() => console.log('2'), 0); // Macrotask
Promise.resolve().then(() => console.log('3')); // Microtask
console.log('4');
// Output: 1 -> 4 -> 3 -> 2`
  },
  {
    id: "js-fc-3",
    subject: "JavaScript",
    category: "Metodi Array",
    title: "map() vs forEach()",
    front: "Qual è la differenza principale tra `.map()` e `.forEach()`?",
    back: "`.map()` restituisce un NUOVO array contenente i risultati della funzione applicata a ogni elemento. `.forEach()` si limita a eseguire una funzione per ogni elemento e restituisce sempre `undefined`.",
    codeSnippet: `const nums = [1, 2, 3];
const doppi = nums.map(n => n * 2); // [2, 4, 6]
nums.forEach(n => console.log(n));  // Loga gli elementi`
  },
  {
    id: "js-fc-4",
    subject: "JavaScript",
    category: "Contesto this",
    title: "Arrow Functions e 'this'",
    front: "Come gestiscono il contesto 'this' le Arrow Functions rispetto alle funzioni tradizionali?",
    back: "Le funzioni tradizionali definiscono il proprio 'this' in base a come vengono chiamate (binding dinamico). Le Arrow Functions NON hanno un proprio 'this', ma lo ereditano in modo lessicale dallo scope circostante.",
    codeSnippet: `const obj = {
  name: "Dev",
  stampa: function() {
    setTimeout(() => {
      console.log(this.name); // "Dev" (ereditato)
    }, 100);
  }
};`
  },
  {
    id: "js-fc-5",
    subject: "JavaScript",
    category: "DOM & Eventi",
    title: "Event Bubbling vs Delegation",
    front: "Che cos'è l'Event Delegation e perché si sfrutta il Bubbling?",
    back: "L'Event Delegation consiste nell'aggiungere un unico Event Listener a un elemento padre anziché a ciascun figlio. Sfrutta il Bubbling (la risalita dell'evento nel DOM dal target fino alla radice) per identificare `event.target` e migliorare le prestazioni.",
    codeSnippet: `document.querySelector('#lista').addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    console.log('Cliccato elemento:', e.target.textContent);
  }
});`
  },

  // --- REACT ---
  {
    id: "react-fc-1",
    subject: "React",
    category: "Stato & Hooks",
    title: "Regola dell'Immutabilità nello Stato",
    front: "Perché in React NON dobbiamo mai mutare direttamente uno stato oggetto o array?",
    back: "React confronta le referenze di memoria degli stati (`Object.is`). Se muti direttamente la proprietà di un oggetto o fai `.push()` su un array, la referenza di memoria rimane identica e React NON ri-renderizza il componente.",
    codeSnippet: `// ❌ SBAGLIATO: stato.users.push(newUser);
// ✅ CORRETTO:
setUsers(prev => [...prev, newUser]);`
  },
  {
    id: "react-fc-2",
    subject: "React",
    category: "useEffect",
    title: "Cleanup Function in useEffect",
    front: "A cosa serve la funzione restituita all'interno di un `useEffect`?",
    back: "È la funzione di pulizia (cleanup). Viene eseguita prima che il componente venga smontato (unmount) o prima di ri-eseguire l'effetto se le dipendenze cambiano. Serve per annullare timer, Event Listener o subscription.",
    codeSnippet: `useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(timer); // Cleanup!
}, []);`
  },
  {
    id: "react-fc-3",
    subject: "React",
    category: "Performance",
    title: "useMemo vs useCallback",
    front: "Qual è la differenza d'uso tra `useMemo` e `useCallback`?",
    back: "`useMemo` memorizza il RISULTATO di un calcolo dispendioso: `useMemo(() => compute(), [deps])`. `useCallback` memorizza l'istanza della FUNZIONE stessa per evitare di ricrearla ad ogni render: `useCallback(fn, [deps])`.",
    codeSnippet: `const calcoloComplesso = useMemo(() => compute(val), [val]);
const handleReset = useCallback(() => setVal(0), []);`
  },
  {
    id: "react-fc-4",
    subject: "React",
    category: "Context API",
    title: "Prop Drilling e Context API",
    front: "Che cos'è il Prop Drilling e come lo risolve la Context API?",
    back: "Il Prop Drilling è il passaggio manuale di props attraverso molteplici livelli intermedi di componenti che non ne hanno bisogno. La Context API permette di condividere dati a livello globale per la sotto-albero interessato senza passare props manualmente a ogni livello.",
    codeSnippet: `const ThemeContext = createContext();
// Nel provider: <ThemeContext.Provider value="dark">
// Nel figlio: const theme = useContext(ThemeContext);`
  },
  {
    id: "react-fc-5",
    subject: "React",
    category: "Riferimenti DOM",
    title: "useRef Hook",
    front: "Quali sono i due principali casi d'uso di `useRef` in React?",
    back: "1) Accedere direttamente a un elemento del DOM (es. `ref.current.focus()`). 2) Conservare un valore mutabile persistente tra i render SENZA causare un ri-rendering quando il valore cambia.",
    codeSnippet: `const inputRef = useRef(null);
const focusInput = () => inputRef.current.focus();
// JSX: <input ref={inputRef} />`
  },

  // --- SQL ---
  {
    id: "sql-fc-1",
    subject: "SQL",
    category: "JOIN",
    title: "INNER JOIN vs LEFT JOIN",
    front: "Qual è la differenza nei risultati restituiti tra INNER JOIN e LEFT JOIN?",
    back: "INNER JOIN restituisce soltanto le righe che hanno corrispondenza in ENTRAMBE le tabelle. LEFT JOIN restituisce tutte le righe della tabella di sinistra, abbinando i dati della tabella di destra se presenti o ponendo `NULL` se assenti.",
    codeSnippet: `SELECT u.nome, o.id_ordine 
FROM utenti u 
LEFT JOIN ordini o ON u.id = o.utente_id;`
  },
  {
    id: "sql-fc-2",
    subject: "SQL",
    category: "Aggregazioni",
    title: "WHERE vs HAVING",
    front: "Quando si usa la clausola HAVING anziché WHERE?",
    back: "`WHERE` filtra le singole righe PRIMA che avvenga il raggruppamento (`GROUP BY`). `HAVING` filtra i GRUPPI risultanti DOPO che le funzioni di aggregazione (`COUNT`, `SUM`, `AVG`) sono state calcolate.",
    codeSnippet: `SELECT dipartimento, AVG(stipendio) 
FROM dipendenti 
GROUP BY dipartimento 
HAVING AVG(stipendio) > 3000;`
  },
  {
    id: "sql-fc-3",
    subject: "SQL",
    category: "Operazioni DDL/DML",
    title: "DROP vs TRUNCATE vs DELETE",
    front: "Qual è la differenza di velocità e impatto tra DELETE, TRUNCATE e DROP?",
    back: "`DELETE` è un comando DML che elimina righe una per una (può avere WHERE). `TRUNCATE` è un comando DDL velocissimo che svuota l'intera tabella resettando gli ID senza eliminare la struttura. `DROP` cancella tabella e dati.",
    codeSnippet: `DELETE FROM studenti WHERE classe = '5A'; -- Elimina righe specifiche
TRUNCATE TABLE log_accessi;               -- Svuota tabella velocemente
DROP TABLE vecchi_dati;                   -- Elimina del tutto la tabella`
  },
  {
    id: "sql-fc-4",
    subject: "SQL",
    category: "Transazioni",
    title: "Proprietà ACID e COMMIT/ROLLBACK",
    front: "Cosa significano i termini COMMIT e ROLLBACK nelle transazioni SQL?",
    back: "`COMMIT` salva permanentemente tutte le modifiche eseguite nella transazione corrente nel database. `ROLLBACK` annulla tutte le operazioni eseguite dall'inizio della transazione ripristinando lo stato precedente.",
    codeSnippet: `BEGIN TRANSACTION;
UPDATE conto SET saldo = saldo - 100 WHERE id = 1;
UPDATE conto SET saldo = saldo + 100 WHERE id = 2;
COMMIT; -- Oppure ROLLBACK se si verifica un errore`
  },
  {
    id: "sql-fc-5",
    subject: "SQL",
    category: "Ottimizzazione",
    title: "Indici (INDEX) nei Database Relazionali",
    front: "A cosa servono gli Indici in SQL e quale potenziale svantaggio comportano?",
    back: "Gli indici (spesso B-Tree) velocizzano notevolmente la ricerca delle query (`SELECT` con `WHERE`/`JOIN`). Lo svantaggio è che rallentano leggermente le operazioni di scrittura (`INSERT`, `UPDATE`, `DELETE`) perché l'indice va aggiornato.",
    codeSnippet: `CREATE INDEX idx_utenti_email ON utenti(email);`
  }
];
