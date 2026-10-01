
/**
 * Knowledge Base completa e centralizzata delle Dispense Didattiche.
 * Copre CSS, JavaScript, React, SQL, Node.js ed AI Engineering (40+ dispense verificate).
 * Validata formalmente con Zod per grounding e retrieval deterministico.
 */
export const DISPENSE_KNOWLEDGE_BASE = {
  css: {
    "moduleId": "css",
    "moduleName": "CSS Moderno, Layout & Responsive Design",
    "description": "Fondamenti di CSS, Selettori e Specificità, Box Model, Flexbox, CSS Grid, Responsive Design con Media Queries, Animazioni, CSS Variables e metodologie di styling.",
    "lessons": [
        {
            "id": "css-box-model-flexbox",
            "title": "CSS Box Model, Selettori e Flexbox",
            "pdfReference": "lezioni/css-box-model.html",
            "summary": "Guida esaustiva al calcolo delle dimensioni con box-sizing, calcolo della specificità dei selettori e layout unidimensionale con CSS Flexbox.",
            "keyPoints": [
                "Box Model: margin, border, padding, content e box-sizing: border-box.",
                "Specificità CSS: inline styles (1000) > ID (100) > classi/pseudo-classi (10) > elementi (1).",
                "Flexbox: display flex, justify-content, align-items, flex-direction, flex-wrap e flex-grow/shrink/basis."
            ],
            "examPitfalls": [
                "Confondere margin collapsante con padding nei contenitori verticali.",
                "Dimenticare che align-items allinea sull'asse trasversale (cross axis) e non principale."
            ],
            "codeSnippets": [
                {
                    "title": "Flexbox Layout Container",
                    "language": "css",
                    "code": ".container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}",
                    "explanation": "Struttura flessibile con spaziatura moderna usando gap."
                }
            ],
            "examQuestions": [
                "Come viene calcolata la specificità quando si combinano ID e classi multiple?",
                "Qual è la differenza fondamentale tra flex-basis e width in un elemento flessibile?"
            ]
        },
        {
            "id": "css-grid-responsive",
            "title": "CSS Grid & Responsive Design",
            "pdfReference": "lezioni/css-grid-responsive.html",
            "summary": "Layout bidimensionali con CSS Grid, responsive design moderno con Media Queries e unità relative (rem, em, clamp(), vh, vw).",
            "keyPoints": [
                "CSS Grid: grid-template-columns con repeat(auto-fit, minmax(280px, 1fr)).",
                "Mobile-first design: @media (min-width: 768px).",
                "Fluid Typography: font-size con clamp(1rem, 2.5vw, 1.75rem)."
            ],
            "examPitfalls": [
                "Non utilizzare auto-fit o auto-fill portando il layout a rompere su schermi ridotti.",
                "Scrivere media queries desktop-first con max-width generando complessità di override."
            ],
            "codeSnippets": [
                {
                    "title": "Responsive Auto-Fitting Grid",
                    "language": "css",
                    "code": ".grid-auto {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}",
                    "explanation": "Griglia responsive automatica senza bisogno di media queries dedicate."
                }
            ],
            "examQuestions": [
                "Qual è la differenza tra auto-fit e auto-fill in CSS Grid?",
                "Perché l'approccio mobile-first è considerato standard nell'industria moderna?"
            ]
        }
    ],
    "totalLessons": 2
},

  javascript: {
    "moduleId": "javascript",
    "moduleName": "JavaScript Core & Asincrono",
    "description": "Fondamenti di JS, tipi di dato, scope, hoisting, closures, DOM manipulation, Event Loop, Promise, Async/Await ed ES6+.",
    "lessons": [
        {
            "id": "js-variabili",
            "title": "Variabili",
            "pdfReference": "lezioni/js-variabili.html",
            "summary": "Il tag <script> può contenere JavaScript scritto direttamente nella pagina, collegare un file esterno con src oppure ospitare dati non eseguibili, come JSON. Il tag <noscript> mostra un contenuto alternativo quando JavaScript non è disponibile o non è attivo. Uno script può essere inseri...",
            "keyPoints": [
                "Inserire uno script in una pagina HTML: Il tag <script> può contenere JavaScript scritto direttamente nella pagina, collegare un file esterno con src oppure ospitare dati non esegu...",
                "Tipi di script e attributi utili: type=\"text/javascript\" è la forma classica, type=\"module\" abilita i moduli e type=\"application/json\" serve per inserire dati JSON non esegui...",
                "Variabili in JavaScript: In JavaScript moderno si usano soprattutto let e const . var è una sintassi storica e conviene evitarla nei nuovi progetti. Una variabile è ...",
                "Tipi di dato fondamentali: I tre tipi base trattati sono string , number e boolean . Una string è un testo, un number è un valore numerico e un boolean può valere solo...",
                "Concatenazione e template literal: La concatenazione unisce stringhe con + , mentre i template literal usano i backtick e l'interpolazione con ${...} . Quando vuoi costruire u...",
                "Operazioni algebriche sui numeri: Con i numeri puoi usare somma, sottrazione, moltiplicazione, divisione e resto della divisione. I valori numerici permettono di fare calcoli..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Variabili",
                    "language": "html",
                    "code": "<!-- Script in pagina -->\n<script>\n    console.log('Messaggio scritto direttamente nella pagina');\n</script>\n\n<!-- Script in file separato -->\n<script src=\"assets/main.js\"></script>\n\n<!-- Script collegato a un singolo elemento -->\n<button onclick=\"console.log('Click sul pulsante')\">Premi qui</button>",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Variabili."
                },
                {
                    "title": "Esempio di codice 2: Variabili",
                    "language": "html",
                    "code": "<script src=\"assets/main.js\"></script>\n\n<noscript>\n    Attiva JavaScript per usare tutte le funzionalità della pagina.\n</noscript>",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Variabili."
                },
                {
                    "title": "Esempio di codice 3: Variabili",
                    "language": "html",
                    "code": "<script src=\"assets/main.js\" defer></script>\n\n<script type=\"module\">\n    console.log('Questo script usa il tipo module');\n</script>\n\n<script type=\"application/json\" id=\"config\">\n    {\n        \"tema\": \"chiaro\",\n        \"lingua\": \"it\"\n    }\n</script>",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Variabili."
                },
                {
                    "title": "Esempio di codice 4: Variabili",
                    "language": "html",
                    "code": "<script src=\"assets/main.js\" defer></script>\n\n<script type=\"module\">\n    console.log('Modulo attivo');\n</script>",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Variabili."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Variabili e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Variabili?"
            ]
        },
        {
            "id": "js-condizioni",
            "title": "Condizioni e operatori logici",
            "pdfReference": "lezioni/js-condizioni.html",
            "summary": "L'istruzione if esegue un blocco di codice solo se la condizione è vera. Con else si definisce cosa fare quando è falsa. Con else if si aggiungono controlli intermedi. La condizione viene scritta tra parentesi tonde dopo if . JavaScript la valuta e ottiene un risultato: vero oppure falso. Se il risu...",
            "keyPoints": [
                "if, else e catene di condizioni: L'istruzione if esegue un blocco di codice solo se la condizione è vera. Con else si definisce cosa fare quando è falsa. Con else if si aggi...",
                "Math.random(): Math.random() genera ogni volta un numero decimale casuale compreso tra 0 incluso e 1 escluso. Non restituisce mai esattamente 1 . Un numero...",
                "La funzione prompt(): prompt() apre una finestra di dialogo che chiede un dato all'utente. Mentre la finestra è aperta, l'esecuzione della pagina si ferma complet...",
                "La funzione Number(): Number() converte un valore in numero. È indispensabile quando si riceve un dato da prompt() e lo si vuole usare in un calcolo o in un confr...",
                "if nested e blocchi annidati: Un if nested è un if scritto dentro un altro if . Il blocco interno viene valutato solo se il blocco esterno è già risultato vero. Gli if an...",
                "Operatori binari e confronto: Gli operatori di confronto mettono a confronto due valori e restituiscono sempre true oppure false . Si chiamano binari perché lavorano su d..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Condizioni e operatori logici",
                    "language": "javascript",
                    "code": "let voto = 7;\n\nif (voto >= 9) {\n    console.log(\"Ottimo\");\n} else if (voto >= 7) {\n    console.log(\"Buono\");\n} else if (voto >= 6) {\n    console.log(\"Sufficiente\");\n} else {\n    console.log(\"Insufficiente\");\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Condizioni e operatori logici."
                },
                {
                    "title": "Esempio di codice 2: Condizioni e operatori logici",
                    "language": "javascript",
                    "code": "let ora = 15;\n\nif (ora < 12) {\n    console.log(\"Buongiorno\");\n} else if (ora < 18) {\n    console.log(\"Buon pomeriggio\");\n} else {\n    console.log(\"Buonasera\");\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Condizioni e operatori logici."
                },
                {
                    "title": "Esempio di codice 3: Condizioni e operatori logici",
                    "language": "javascript",
                    "code": "let dado = Math.floor(Math.random() * 101);\n\nif (dado > 50) {\n    console.log(\"Numero sopra la metà: \" + dado);\n} else {\n    console.log(\"Numero sotto la metà: \" + dado);\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Condizioni e operatori logici."
                },
                {
                    "title": "Esempio di codice 4: Condizioni e operatori logici",
                    "language": "javascript",
                    "code": "let numero = Math.floor(Math.random() * 101);\n\nif (numero === 100) {\n    console.log(\"Punteggio massimo!\");\n} else {\n    console.log(\"Punteggio: \" + numero);\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Condizioni e operatori logici."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Condizioni e operatori logici e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Condizioni e operatori logici?"
            ]
        },
        {
            "id": "js-cicli",
            "title": "Cicli, incrementi e scope",
            "pdfReference": "lezioni/js-cicli.html",
            "summary": "Un ciclo è una struttura che esegue più volte un blocco di istruzioni finché una condizione rimane vera. Quando la condizione diventa falsa, il ciclo si ferma e il programma prosegue con le istruzioni successive. In JavaScript esistono tre tipi di ciclo: while , do / while e for . I primi due sono a...",
            "keyPoints": [
                "Il ciclo while: Un ciclo è una struttura che esegue più volte un blocco di istruzioni finché una condizione rimane vera. Quando la condizione diventa falsa,...",
                "Il ciclo do / while: Il ciclo do / while esegue prima il blocco e controlla la condizione solo dopo. Questo garantisce che il blocco venga eseguito almeno una vo...",
                "Il ciclo for: Il ciclo for è un ciclo controllato: si usa quando si sa già quante volte il blocco deve essere ripetuto. Raccoglie inizializzazione, condiz...",
                "Scope delle variabili: Lo scope è la zona del codice in cui una variabile è visibile e utilizzabile. Con let e const lo scope è di blocco: la variabile esiste solo..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Cicli, incrementi e scope",
                    "language": "javascript",
                    "code": "let numero = 101;\n\nwhile (numero % 7 !== 0) {\n    numero = numero + 1;\n}\n\nconsole.log(\"Primo numero divisibile per 7 dopo 100: \" + numero);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Cicli, incrementi e scope."
                },
                {
                    "title": "Esempio di codice 2: Cicli, incrementi e scope",
                    "language": "javascript",
                    "code": "let somma = 0;\nlet contatore = 0;\nlet voto = Number(prompt(\"Inserisci un voto (0 per terminare):\"));\n\nwhile (voto !== 0) {\n    somma = somma + voto;\n    contatore = contatore + 1;\n    voto = Number(prompt(\"Inserisci un voto (0 per terminare):\"));\n}\n\nif (contatore > 0) {\n    console.log(\"Media: \" + somma / contatore);\n} else {\n    console.log(\"Nessun voto inserito.\");\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Cicli, incrementi e scope."
                },
                {
                    "title": "Esempio di codice 3: Cicli, incrementi e scope",
                    "language": "javascript",
                    "code": "let numero;\n\ndo {\n    numero = Number(prompt(\"Inserisci un numero tra 1 e 10:\"));\n} while (numero < 1 || numero > 10);\n\nconsole.log(\"Hai inserito: \" + numero);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Cicli, incrementi e scope."
                },
                {
                    "title": "Esempio di codice 4: Cicli, incrementi e scope",
                    "language": "javascript",
                    "code": "let pin;\n\ndo {\n    pin = prompt(\"Inserisci il PIN:\");\n\n    if (pin !== \"1234\") {\n        console.log(\"Errore: PIN errato. Riprova.\");\n    }\n\n} while (pin !== \"1234\");\n\nconsole.log(\"Benvenuto!\");",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Cicli, incrementi e scope."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Cicli, incrementi e scope e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Cicli, incrementi e scope?"
            ]
        },
        {
            "id": "js-funzioni",
            "title": "Funzioni",
            "pdfReference": "lezioni/js-funzioni.html",
            "summary": "Una funzione è un blocco di codice con un nome. Viene eseguita solo quando viene invocata . Se non la chiami, il codice al suo interno non verrà mai eseguito. Una funzione è un modo per raggruppare istruzioni sotto un nome, così da poterle richiamare ogni volta che servono senza riscriverle da capo....",
            "keyPoints": [
                "Che cos'è una funzione: Una funzione è un blocco di codice con un nome. Viene eseguita solo quando viene invocata . Se non la chiami, il codice al suo interno non v...",
                "Il valore di ritorno: return: return termina l'esecuzione della funzione e restituisce un valore al codice che l'ha invocata. Senza return , la funzione restituisce undef...",
                "Parametri: I parametri sono nomi segnaposto dichiarati nella definizione della funzione. Gli argomenti sono i valori reali passati durante l'invocazion...",
                "Scope e visibilità: Le variabili dichiarate dentro una funzione non sono visibili all'esterno. Le variabili dichiarate fuori sono visibili anche dentro le funzi...",
                "Le quattro regole d'oro: Quattro principi guidano la progettazione di una buona funzione: isolamento della logica , riutilizzabilità , indipendenza e atomicità . Iso...",
                "Eventi sui tag HTML: Un evento è qualcosa che succede sulla pagina: un click, la pressione di un tasto, il passaggio del mouse su un elemento. È possibile reagir..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Funzioni",
                    "language": "javascript",
                    "code": "// Definizione: il codice qui dentro NON viene ancora eseguito\nfunction getAnnoCorrente() {\n    console.log(2026);\n}\n\n// Invocazione: solo qui il codice viene eseguito\ngetAnnoCorrente(); // 2026",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Funzioni."
                },
                {
                    "title": "Esempio di codice 2: Funzioni",
                    "language": "javascript",
                    "code": "function miaEta() {\n    console.log(25);\n}\n\nmiaEta();",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Funzioni."
                },
                {
                    "title": "Esempio di codice 3: Funzioni",
                    "language": "javascript",
                    "code": "// La funzione si occupa solo del calcolo\nfunction miaEta() {\n    return 25;\n}\n\nfunction mioNome() {\n    return \"Marco\";\n}\n\n// Il codice esterno decide cosa fare con i risultati\nconst nome = mioNome();\nconst eta = miaEta();\n\nconsole.log('Età: ' + eta); // 25\nconsole.log('Nome: ' + nome); // Marco",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Funzioni."
                },
                {
                    "title": "Esempio di codice 4: Funzioni",
                    "language": "javascript",
                    "code": "function calcolaEta() {\n    return 2026 - 1995;\n}\n\nconst eta = calcolaEta();\nconsole.log(eta); // 31",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Funzioni."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Funzioni e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Funzioni?"
            ]
        },
        {
            "id": "js-arrow-function",
            "title": "Arrow function e metodi degli array",
            "pdfReference": "lezioni/js-arrow-function.html",
            "summary": "Una arrow function e una funzione scritta in forma compatta con => . Ha gli stessi elementi logici di una funzione classica: parametri, corpo della funzione e, quando serve, un valore restituito. I parametri sono i valori in ingresso che la funzione riceve. Nella funzione classica si scrivono tra...",
            "keyPoints": [
                "Arrow function: Una arrow function e una funzione scritta in forma compatta con => . Ha gli stessi elementi logici di una funzione classica: parametri, corp...",
                "forEach: forEach esegue una funzione su ogni elemento dell'array, senza creare un nuovo array. Si usa quando vuoi fare un'azione per ogni valore, per...",
                "map: map crea un nuovo array con lo stesso numero di elementi dell'originale. Ogni valore viene trasformato dalla callback e salvato nel nuovo ar...",
                "find: find restituisce il primo elemento che soddisfa una condizione. Se non trova nessun elemento valido, restituisce undefined . find serve quan...",
                "filter: filter crea un nuovo array con solo gli elementi che rispettano la condizione. Controlla tutti i valori e conserva quelli validi. filter si ...",
                "some: some restituisce true se almeno un elemento rispetta la condizione. Appena trova un valore valido, si ferma. some serve per controllare se i..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Arrow function e metodi degli array",
                    "language": "javascript",
                    "code": "function calcolaSconto(prezzo) {\n    return prezzo * 0.9;\n}\n\nconst calcolaScontoArrow = prezzo => prezzo * 0.9;\n\nconsole.log(calcolaSconto(50));\nconsole.log(calcolaScontoArrow(50));",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Arrow function e metodi degli array."
                },
                {
                    "title": "Esempio di codice 2: Arrow function e metodi degli array",
                    "language": "javascript",
                    "code": "function prezzoFinale(prezzo) {\n    return prezzo * 1.22;\n}\n\nconst prezzoFinaleArrow = prezzo => prezzo * 1.22;\n\nconsole.log(prezzoFinale(100));\nconsole.log(prezzoFinaleArrow(100));",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Arrow function e metodi degli array."
                },
                {
                    "title": "Esempio di codice 3: Arrow function e metodi degli array",
                    "language": "javascript",
                    "code": "const prodotti = [\"penna\", \"quaderno\", \"zaino\"];\n\nprodotti.forEach(prodotto => {\n    console.log(`Prodotto disponibile: ${prodotto}`);\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Arrow function e metodi degli array."
                },
                {
                    "title": "Esempio di codice 4: Arrow function e metodi degli array",
                    "language": "javascript",
                    "code": "const prodotti = [\"latte\", \"pane\", \"uova\"];\n\nprodotti.forEach(prodotto => {\n    console.log(`Articolo presente: ${prodotto}`);\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Arrow function e metodi degli array."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Arrow function e metodi degli array e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Arrow function e metodi degli array?"
            ]
        },
        {
            "id": "js-array",
            "title": "Array e operatori utili",
            "pdfReference": "lezioni/js-array.html",
            "summary": "Un array è una lista ordinata di valori racchiusa tra parentesi quadre. Si usa quando hai più elementi dello stesso argomento e vuoi tenerli in un unico contenitore. Il nome dell'array va al plurale perché rappresenta un gruppo di valori, non uno solo. Senza gli array, per conservare dieci nomi dovr...",
            "keyPoints": [
                "Array: Un array è una lista ordinata di valori racchiusa tra parentesi quadre. Si usa quando hai più elementi dello stesso argomento e vuoi tenerli...",
                "Indice, lunghezza e ciclo for: L'indice è la posizione di un elemento nell'array. Si parte sempre da 0 , non da 1 . .length restituisce il numero totale degli elementi. co...",
                "Metodi degli array: I metodi sono azioni già pronte che puoi applicare direttamente su un array. Alcuni modificano l'array originale, altri restituiscono un nuo...",
                "Destructuring: Il destructuring permette di estrarre uno o più valori da un array e assegnarli a variabili separate in una sola riga. Funziona seguendo l'o...",
                "Spread operator: Lo spread operator si scrive ... davanti al nome di un array e ne espande tutti gli elementi nel punto in cui viene usato. È utile per clona..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Array e operatori utili",
                    "language": "javascript",
                    "code": "// Array omogeneo di stringhe\nconst studenti = ['Anna', 'Luca', 'Sara'];\n\n// Array omogeneo di numeri\nconst voti = [8, 7, 9];\n\n// Array eterogeneo: tipi diversi nello stesso array\nconst scheda = ['Marco', 18, true];",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Array e operatori utili."
                },
                {
                    "title": "Esempio di codice 2: Array e operatori utili",
                    "language": "javascript",
                    "code": "const materie = ['Italiano', 'Matematica', 'Storia', 'Inglese'];\nconst voti = [7, 8, 6, 9];\nconst presenze = [true, false, true, true, false];",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Array e operatori utili."
                },
                {
                    "title": "Esempio di codice 3: Array e operatori utili",
                    "language": "javascript",
                    "code": "const studenti = ['Anna', 'Luca', 'Sara', 'Marco'];\n\n// Leggo il primo e l'ultimo elemento con l'indice\nconsole.log(studenti[0]);                    // 'Anna'\nconsole.log(studenti[studenti.length - 1]);  // 'Marco'\n\n// Visualizzo l'array come tabella nella console\nconsole.table(studenti);\n\n// Scorro tutti gli elementi con un ciclo for\nfor (let i = 0; i < studenti.length; i++) {\n    console.log(studenti[i]);\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Array e operatori utili."
                },
                {
                    "title": "Esempio di codice 4: Array e operatori utili",
                    "language": "javascript",
                    "code": "const numeri = [3, 8, 1, 6, 4];\n\nconsole.log(numeri.length);\n\nfor (let i = 0; i < numeri.length; i++) {\n    if (numeri[i] > 5) {\n        console.log(numeri[i]);\n    }\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Array e operatori utili."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Array e operatori utili e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Array e operatori utili?"
            ]
        },
        {
            "id": "js-object",
            "title": "Oggetti",
            "pdfReference": "lezioni/js-object.html",
            "summary": "Un oggetto è una struttura dati formata da proprietà. Ogni proprietà ha una chiave e un valore: la chiave identifica l'informazione, il valore contiene il dato vero e proprio. Gli array, già noti, raccolgono elementi accessibili tramite indice numerico. Gli oggetti funzionano in modo diverso: ogni d...",
            "keyPoints": [
                "Oggetti come strutture dati: Un oggetto è una struttura dati formata da proprietà. Ogni proprietà ha una chiave e un valore: la chiave identifica l'informazione, il valo...",
                "Accesso con dot notation: La dot notation permette di leggere una proprietà di un oggetto scrivendo il nome dell'oggetto, un punto e la chiave della proprietà da legg...",
                "Bracket notation: La bracket notation è un modo alternativo per accedere alle proprietà di un oggetto. Si scrive il nome dell'oggetto seguito dalla chiave tra...",
                "Metodi negli oggetti: Un metodo è una funzione definita come proprietà di un oggetto. Si comporta come le altre proprietà, ma il suo valore è una funzione che può...",
                "Oggetti innestati: Un oggetto innestato è un oggetto contenuto come valore di una proprietà di un altro oggetto. Serve quando un'informazione è essa stessa com...",
                "Array di oggetti: Un array di oggetti è un array in cui ogni elemento non è un valore semplice, ma un oggetto. È una delle strutture più usate per rappresenta..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Oggetti",
                    "language": "javascript",
                    "code": "const libro = {\n    titolo: \"Il nome della rosa\",\n    autore: \"Umberto Eco\",\n    anno: 1980\n};",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Oggetti."
                },
                {
                    "title": "Esempio di codice 2: Oggetti",
                    "language": "javascript",
                    "code": "const studente = {\n    nome: \"Luca\",\n    eta: 19,\n    corso: \"Web Development\"\n};",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Oggetti."
                },
                {
                    "title": "Esempio di codice 3: Oggetti",
                    "language": "javascript",
                    "code": "const studente = {\n    nome: \"Luca\",\n    eta: 19,\n    corso: \"Web Development\"\n};\n\nconsole.log(studente.nome);\nconsole.log(studente.corso);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Oggetti."
                },
                {
                    "title": "Esempio di codice 4: Oggetti",
                    "language": "javascript",
                    "code": "const macchina = {\n    marca: \"Fiat\",\n    modello: \"Panda\",\n    anno: 2024\n};\n\nconsole.log(macchina.marca);\nconsole.log(macchina.modello);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Oggetti."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Oggetti e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Oggetti?"
            ]
        },
        {
            "id": "js-timing-function",
            "title": "Timing functions",
            "pdfReference": "lezioni/js-timing-function.html",
            "summary": "Le timing functions permettono di eseguire una funzione in un momento preciso nel futuro, senza interrompere il flusso normale del programma. In JavaScript è possibile programmare l'esecuzione di una funzione in un momento futuro. Le timing functions sono strumenti che permettono di dire al browser:...",
            "keyPoints": [
                "Cosa sono le timing functions: Le timing functions permettono di eseguire una funzione in un momento preciso nel futuro, senza interrompere il flusso normale del programma...",
                "setTimeout: setTimeout esegue una funzione una volta sola dopo il ritardo indicato. setTimeout accetta due argomenti: la funzione da eseguire e il numer...",
                "setInterval: setInterval esegue una funzione ripetutamente ogni tot millisecondi, finché non viene fermato con clearInterval . setInterval funziona in mo..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Timing functions",
                    "language": "javascript",
                    "code": "// 1000 millisecondi = 1 secondo\n// 500 millisecondi = mezzo secondo\n// 2000 millisecondi = 2 secondi",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Timing functions."
                },
                {
                    "title": "Esempio di codice 2: Timing functions",
                    "language": "javascript",
                    "code": "const treSecondi = 3000 // oppure (3 * 1000);\nconst mezzoMinuto = 30000 // oppure (30 * 1000);\nconst quindiciMinuti = 900000 // oppure (15 * 60 * 1000);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Timing functions."
                },
                {
                    "title": "Esempio di codice 3: Timing functions",
                    "language": "javascript",
                    "code": "setTimeout(funzione, millisecondi);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Timing functions."
                },
                {
                    "title": "Esempio di codice 4: Timing functions",
                    "language": "javascript",
                    "code": "// Stampa un messaggio dopo 2 secondi\nsetTimeout(() => {\n    console.log('Sono passati 2 secondi!');\n}, 2000);\n\n// Il codice qui sotto viene eseguito subito, senza aspettare\nconsole.log('Questo appare prima, anche se è scritto dopo.');",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Timing functions."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Timing functions e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Timing functions?"
            ]
        },
        {
            "id": "js-dom",
            "title": "DOM: testo, elementi, classi e attributi",
            "pdfReference": "lezioni/js-dom.html",
            "summary": "Le proprietà innerHTML , textContent e innerText permettono di leggere o modificare il contenuto di un elemento. style permette invece di modificarne lo stile direttamente da JavaScript. innerHTML innerHTML legge o imposta il contenuto HTML di un elemento, compresi i tag al suo interno. Quando lo im...",
            "keyPoints": [
                "Testo: Le proprietà innerHTML , textContent e innerText permettono di leggere o modificare il contenuto di un elemento. style permette invece di mo...",
                "Elementi: createElement() , appendChild() , insertBefore() e remove() permettono di costruire e modificare la struttura del DOM aggiungendo o eliminan...",
                "Classi: classList è l'oggetto che gestisce le classi CSS di un elemento. Permette di aggiungere, rimuovere e alternare classi senza dover riscrivere...",
                "Attributi: setAttribute() , getAttribute() , removeAttribute() e hasAttribute() permettono di leggere e modificare gli attributi HTML di un elemento, c...",
                "Template literal: I template literal possono essere combinati con innerHTML per costruire blocchi di HTML in modo leggibile, usando variabili e valori dinamic..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: DOM: testo, elementi, classi e attributi",
                    "language": "javascript",
                    "code": "const elemento = document.querySelector(\"#elem\");\n\n// innerHTML: interpreta i tag\nelemento.innerHTML = \"<strong>Testo in grassetto</strong>\";\n\n// textContent: tratta tutto come testo semplice\nelemento.textContent = \"<strong>Questo non è grassetto</strong>\";\n\n// innerText: legge solo il testo visibile\nconsole.log(elemento.innerText);\n\n// style: modifica lo stile inline\nelemento.style.color = \"red\";\nelemento.style.backgroundColor = \"#f0f0f0\";\nelemento.style.fontSize = \"18px\";",
                    "explanation": "Implementazione pratica illustrata nella dispensa per DOM: testo, elementi, classi e attributi."
                },
                {
                    "title": "Esempio di codice 2: DOM: testo, elementi, classi e attributi",
                    "language": "javascript",
                    "code": "const box = document.querySelector(\"#box\");\nconst contenuto = document.querySelector(\"#contenuto\");\n\nbox.textContent = \"Ciao mondo\";\nbox.style.color = \"blue\";\ncontenuto.innerHTML = \"<h2>Titolo</h2><p>Testo aggiornato</p>\";",
                    "explanation": "Implementazione pratica illustrata nella dispensa per DOM: testo, elementi, classi e attributi."
                },
                {
                    "title": "Esempio di codice 3: DOM: testo, elementi, classi e attributi",
                    "language": "javascript",
                    "code": "const lista = document.querySelector(\"ul\");\nconst primo = document.querySelector(\"ul li:first-child\");\n\n// Crea un elemento e aggiungilo in fondo\nconst nuovo = document.createElement(\"li\");\nnuovo.textContent = \"Ultima voce\";\nlista.appendChild(nuovo);\n\n// Inserisce prima del primo elemento\nconst altro = document.createElement(\"li\");\naltro.textContent = \"Prima voce\";\nlista.insertBefore(altro, primo);\n\n// Legge il genitore\nconsole.log(nuovo.parentElement);\n\n// Rimuove un elemento\naltro.remove();",
                    "explanation": "Implementazione pratica illustrata nella dispensa per DOM: testo, elementi, classi e attributi."
                },
                {
                    "title": "Esempio di codice 4: DOM: testo, elementi, classi e attributi",
                    "language": "javascript",
                    "code": "const contenitore = document.querySelector(\".contenitore\");\n\nconst p1 = document.createElement(\"p\");\np1.textContent = \"Primo paragrafo\";\ncontenitore.appendChild(p1);\n\nconst p2 = document.createElement(\"p\");\np2.textContent = \"Paragrafo inserito prima\";\ncontenitore.insertBefore(p2, p1);\n\np1.remove();",
                    "explanation": "Implementazione pratica illustrata nella dispensa per DOM: testo, elementi, classi e attributi."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in DOM: testo, elementi, classi e attributi e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con DOM: testo, elementi, classi e attributi?"
            ]
        },
        {
            "id": "js-dom-selector",
            "title": "Selezione del DOM ed eventi",
            "pdfReference": "lezioni/js-dom-selector.html",
            "summary": "Questi metodi sono stati molto usati per lavorare con il DOM: getElementById , getElementsByClassName , getElementsByTagName e getElementsByName . getElementById recupera un solo elemento usando il suo id . getElementsByClassName restituisce tutti gli elementi che hanno una certa classe, getElements...",
            "keyPoints": [
                "Metodi classici per selezionare elementi: Questi metodi sono stati molto usati per lavorare con il DOM: getElementById , getElementsByClassName , getElementsByTagName e getElementsBy...",
                "I metodi moderni di selezione: querySelector e querySelectorAll sono due metodi introdotti per selezionare gli elementi in modo più flessibile, usando la stessa sintassi d...",
                "Ascoltare gli eventi principali: Un evento è un'azione che accade nella pagina, per esempio un click, la pressione di un tasto o la modifica di un campo. Con addEventListene...",
                "esercizio-final: Esercizio finale Crea una pagina con un titolo, un campo di input e un pulsante. Seleziona il titolo e l'input e collega l'evento click al p..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Selezione del DOM ed eventi",
                    "language": "html",
                    "code": "<h1 id=\"titolo\">Titolo della pagina</h1>\n<div class=\"box\">Primo box</div>\n<div class=\"box\">Secondo box</div>\n<p>Un paragrafo di testo.</p>\n<input type=\"text\" name=\"nome\">",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Selezione del DOM ed eventi."
                },
                {
                    "title": "Esempio di codice 2: Selezione del DOM ed eventi",
                    "language": "javascript",
                    "code": "const titolo = document.getElementById('titolo'); // restituisce un elemento\nconst elementiBox = document.getElementsByClassName('box'); // restituisce un array di elementi\nconst paragrafi = document.getElementsByTagName('p'); // restituisce un array di elementi\nconst campiNome = document.getElementsByName('nome'); // restituisce un array di elementi",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Selezione del DOM ed eventi."
                },
                {
                    "title": "Esempio di codice 3: Selezione del DOM ed eventi",
                    "language": "html",
                    "code": "<h1 id=\"titolo\">Titolo</h1>\n<div class=\"box\">Box</div>\n<p>Paragrafo</p>\n<input name=\"nome\">",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Selezione del DOM ed eventi."
                },
                {
                    "title": "Esempio di codice 4: Selezione del DOM ed eventi",
                    "language": "javascript",
                    "code": "const titolo = document.getElementById('titolo');\nconst box = document.getElementsByClassName('box');\nconst paragrafi = document.getElementsByTagName('p');\nconst campi = document.getElementsByName('nome');",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Selezione del DOM ed eventi."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Selezione del DOM ed eventi e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Selezione del DOM ed eventi?"
            ]
        },
        {
            "id": "js-storage",
            "title": "LocalStorage",
            "pdfReference": "lezioni/js-storage.html",
            "summary": "Il localStorage è uno spazio di memorizzazione del browser che salva dati anche dopo la chiusura della pagina. I dati restano disponibili finché non vengono cancellati manualmente. Lavora con coppie chiave-valore: ogni dato ha una chiave che lo identifica e un valore che lo contiene. Nel localStorag...",
            "keyPoints": [
                "Cos'è il localStorage: Il localStorage è uno spazio di memorizzazione del browser che salva dati anche dopo la chiusura della pagina. I dati restano disponibili fi...",
                "setItem: setItem() aggiunge un dato oppure aggiorna un dato già esistente. Vuole sempre due argomenti: la chiave e il valore. setItem() è il metodo c...",
                "getItem: getItem() legge il valore associato a una chiave. Se la chiave non esiste, restituisce null . getItem() serve per recuperare un dato salvato...",
                "removeItem: removeItem() elimina solo una chiave specifica dal localStorage. removeItem() è il metodo da usare quando vuoi cancellare un solo dato salva...",
                "clear: clear() svuota completamente il localStorage del sito. clear() cancella tutti i dati salvati nel localStorage. Va usato con attenzione, perc...",
                "JSON.stringify: JSON.stringify() trasforma un oggetto o un array in una stringa testuale in formato JSON. JSON è un formato standard per rappresentare dati ..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: LocalStorage",
                    "language": "javascript",
                    "code": "localStorage.setItem(\"tema\", \"scuro\");\nlocalStorage.setItem(\"lingua\", \"it\");",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LocalStorage."
                },
                {
                    "title": "Esempio di codice 2: LocalStorage",
                    "language": "javascript",
                    "code": "localStorage.setItem(\"volume\", \"80\");\nlocalStorage.setItem(\"notifiche\", \"attive\");",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LocalStorage."
                },
                {
                    "title": "Esempio di codice 3: LocalStorage",
                    "language": "javascript",
                    "code": "localStorage.setItem(\"lingua\", \"it\");\nconst lingua = localStorage.getItem(\"lingua\");\nconsole.log(lingua);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LocalStorage."
                },
                {
                    "title": "Esempio di codice 4: LocalStorage",
                    "language": "javascript",
                    "code": "localStorage.setItem(\"tema\", \"chiaro\");\nconst temaAttivo = localStorage.getItem(\"tema\");\nconsole.log(temaAttivo);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LocalStorage."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in LocalStorage e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con LocalStorage?"
            ]
        },
        {
            "id": "js-fetch",
            "title": "Richieste HTTP",
            "pdfReference": "lezioni/js-fetch.html",
            "summary": "Con Web 2.0 si intende la capacità delle pagine web di richiedere informazioni ai server in modo dinamico, senza dover ricaricare l'intera pagina. Questo ha reso possibile creare applicazioni web interattive e reattive come quelle a cui siamo abituati oggi. Nel web delle origini, ogni aggiornamento ...",
            "keyPoints": [
                "Web 2.0 e le richieste HTTP: Con Web 2.0 si intende la capacità delle pagine web di richiedere informazioni ai server in modo dinamico, senza dover ricaricare l'intera p...",
                "Osservare le richieste con i DevTools: I DevTools (strumenti per sviluppatori) del browser permettono di osservare in tempo reale tutte le richieste HTTP effettuate dalla pagina. ...",
                "HTTP Status Code: Ogni richiesta HTTP riceve sempre una risposta dal server. Insieme ai dati (o in assenza di essi), il server restituisce un codice di stato ...",
                "Metodi HTTP: Il metodo HTTP indica al server che tipo di operazione il client vuole eseguire sulla risorsa indicata dall'URL. I metodi principali sono GE...",
                "La funzione fetch(): fetch() è la funzione JavaScript per inviare richieste HTTP. Riceve come primo argomento l'URL della risorsa e restituisce una Promise , cio...",
                "Il primo .then(): l'oggetto response: Il primo .then() riceve un oggetto response che rappresenta la risposta HTTP grezza del server. Non contiene ancora i dati veri: contiene le..."
            ],
            "examPitfalls": [
                "Attenzione allo scope di let/const rispetto a var e all'hoisting.",
                "Non mutare direttamente gli array se è richiesta l'immutabilità."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Richieste HTTP",
                    "language": "javascript",
                    "code": "// Con XMLHttpRequest\nconst xhr = new XMLHttpRequest();\nxhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');\nxhr.onload = () => {\n    if (xhr.status === 200) {\n        const data = JSON.parse(xhr.responseText);\n        console.log(data.title);\n    }\n};\nxhr.send();\n\n// Con fetch()\nfetch('https://jsonplaceholder.typicode.com/posts/1')\n    .then(response => response.json())\n    .then(data => console.log(data.title));",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Richieste HTTP."
                },
                {
                    "title": "Esempio di codice 2: Richieste HTTP",
                    "language": "javascript",
                    "code": "fetch('https://jsonplaceholder.typicode.com/posts/1')\n    .then(response => response.json())\n    .then(data => console.log(data));",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Richieste HTTP."
                },
                {
                    "title": "Esempio di codice 3: Richieste HTTP",
                    "language": "javascript",
                    "code": "fetch('https://jsonplaceholder.typicode.com/posts/5')\n    .then(response => response.json())\n    .then(data => console.log(data));",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Richieste HTTP."
                },
                {
                    "title": "Esempio di codice 4: Richieste HTTP",
                    "language": "javascript",
                    "code": "fetch('https://jsonplaceholder.typicode.com/posts/1')\n    .then(response => {\n        console.log(response.status);       // 200\n        console.log(response.statusText);   // \"OK\"\n        console.log(response.ok);           // true\n\n        const tipo = response.headers.get('Content-Type');\n        console.log(tipo);                  // \"application/json; charset=utf-8\"\n\n        return response.json();\n    })\n    .then(data => console.log(data));",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Richieste HTTP."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Richieste HTTP e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Richieste HTTP?"
            ]
        }
    ],
    "totalLessons": 12
},

  react: {
    "moduleId": "react",
    "moduleName": "React Framework & Architecture",
    "description": "Componenti, JSX, Virtual DOM, State & Props, Hook essenziali e avanzati, Context API, React Router, Data Fetching e Pattern di ottimizzazione.",
    "lessons": [
        {
            "id": "react-intro",
            "title": "Introduzione a React",
            "pdfReference": "lezioni/react-intro.html",
            "summary": "React è una libreria JavaScript pensata per costruire interfacce utente, cioè tutto ciò che l'utente vede e con cui interagisce in una pagina web. React nasce per rendere più semplice la costruzione di interfacce complesse, soprattutto quando la pagina deve cambiare spesso in base ai dati. Senza uno...",
            "keyPoints": [
                "Il problema che React risolve: React è una libreria JavaScript pensata per costruire interfacce utente, cioè tutto ciò che l'utente vede e con cui interagisce in una pagin...",
                "Vite: lo strumento per creare progetti React: Vite è uno strumento che prepara automaticamente tutta la struttura di file e configurazioni necessarie per far funzionare un progetto React...",
                "Installare React con pnpm o npm: pnpm e npm sono entrambi package manager, cioè programmi che scaricano e gestiscono le librerie del progetto. Il risultato finale del proget...",
                "I componenti in React: Un componente è una funzione JavaScript che restituisce del JSX, cioè descrive una porzione di interfaccia. Il nome di un componente inizia ...",
                "JSX e blocchi riutilizzabili: JSX non è HTML: è una sintassi che viene trasformata in chiamate JavaScript prima di arrivare al browser, quindi segue alcune regole diverse...",
                "I Fragment in JSX: Un Fragment è un contenitore invisibile: raggruppa più elementi JSX senza aggiungere un tag reale nella pagina HTML finale. Come già visto, ..."
            ],
            "examPitfalls": [
                "Non chiamare gli Hook all'interno di condizioni o cicli.",
                "Includere sempre tutte le dipendenze reattive nell'array di useEffect."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Introduzione a React",
                    "language": "bash",
                    "code": "# Con pnpm\npnpm create vite\n\n# Con npm\nnpm create vite@latest",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a React."
                },
                {
                    "title": "Esempio di codice 2: Introduzione a React",
                    "language": "bash",
                    "code": "# Avvio del server di sviluppo\npnpm dev\nnpm run dev",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a React."
                },
                {
                    "title": "Esempio di codice 3: Introduzione a React",
                    "language": "bash",
                    "code": "# pnpm\npnpm create vite\n# Nome progetto: .\n\n# npm\nnpm create vite@latest\n# Nome progetto: .",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a React."
                },
                {
                    "title": "Esempio di codice 4: Introduzione a React",
                    "language": "jsx",
                    "code": "function Saluto() {\n    return (\n        <p>Benvenuto nel corso di React</p>\n    );\n}\n\nexport default Saluto;",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a React."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Introduzione a React e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Introduzione a React?"
            ]
        },
        {
            "id": "react-props",
            "title": "Props",
            "pdfReference": "lezioni/react-props.html",
            "summary": "Le props sono valori passati da un componente a un altro. Servono per rendere un componente riutilizzabile, perché la struttura resta uguale ma i dati possono cambiare. In pratica, un componente riceve informazioni dall'esterno e le usa dentro il JSX per mostrare contenuti diversi. Quando un compone...",
            "keyPoints": [
                "Cosa sono le props: Le props sono valori passati da un componente a un altro. Servono per rendere un componente riutilizzabile, perché la struttura resta uguale...",
                "Usare le props con map: map() permette di trasformare ogni elemento di un array in un nuovo elemento JSX. Spesso viene usato per creare una lista di componenti. Ogn...",
                "Conditional Rendering in JSX: Il conditional rendering permette di mostrare un contenuto oppure un altro in base a una condizione. In React questa scelta viene fatta dire...",
                "Short-Circuiting con gli operatori && e ||: Lo short-circuiting è una tecnica basata sugli operatori logici && e || , usata per decidere cosa mostrare in JSX senza scrivere un ternario...",
                "La prop children: children è una prop speciale di React. Contiene tutto quello che viene scritto tra il tag di apertura e il tag di chiusura di un componente...."
            ],
            "examPitfalls": [
                "Non chiamare gli Hook all'interno di condizioni o cicli.",
                "Includere sempre tutte le dipendenze reattive nell'array di useEffect."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Props",
                    "language": "jsx",
                    "code": "function Card(props) {\n    return (\n        <div>\n            <h2>{props.title}</h2>\n            <p>{props.text}</p>\n        </div>\n    );\n}\n\nfunction App() {\n    return (\n        <Card\n            title=\"Benvenuto\"\n            text=\"Questo contenuto arriva dalle props\"\n        />\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Props."
                },
                {
                    "title": "Esempio di codice 2: Props",
                    "language": "jsx",
                    "code": "function Profile(props) {\n    return (\n        <div>\n            <p>Nome: {props.name}</p>\n            <p>Ruolo: {props.job}</p>\n        </div>\n    );\n}\n\nfunction App() {\n    return <Profile name=\"Laura\" job=\"Designer\" />;\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Props."
                },
                {
                    "title": "Esempio di codice 3: Props",
                    "language": "jsx",
                    "code": "function Product(props) {\n    return <li>{props.name}</li>;\n}\n\nfunction App() {\n    const products = [\"Pane\", \"Latte\", \"Pasta\"];\n\n    return (\n        <ul>\n            {products.map((product, index) => (\n                <Product key={index} name={product} />\n            ))}\n        </ul>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Props."
                },
                {
                    "title": "Esempio di codice 4: Props",
                    "language": "jsx",
                    "code": "function Student(props) {\n    return <li>{props.name}</li>;\n}\n\nfunction App() {\n    const students = [\"Anna\", \"Marco\", \"Giulia\"];\n\n    return (\n        <ul>\n            {students.map((student, index) => (\n                <Student key={index} name={student} />\n            ))}\n        </ul>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Props."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Props e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Props?"
            ]
        },
        {
            "id": "react-use-state",
            "title": "Eventi, hook e useState",
            "pdfReference": "lezioni/react-use-state.html",
            "summary": "Un evento è una azione compiuta dall'utente mentre usa la pagina, come un click su un bottone o la scrittura in un campo di testo. In React si gestisce assegnando una funzione a una prop speciale, come onClick . Ogni elemento JSX può reagire a un evento tramite una prop dedicata. La prop più usata è...",
            "keyPoints": [
                "Gestione eventi in React: Un evento è una azione compiuta dall'utente mentre usa la pagina, come un click su un bottone o la scrittura in un campo di testo. In React ...",
                "Eventi più comuni: React mette a disposizione molte prop evento diverse. Le più usate servono a gestire click sui bottoni, scrittura nei campi di testo, invio ...",
                "Che cos'è un Hook: Un Hook è una funzione speciale che permette a un componente funzione di \"agganciarsi\" a funzionalità interne di React, come la memorizzazio...",
                "L'Hook useState: useState è l'Hook che permette di aggiungere una variabile di stato a un componente. Restituisce sempre due valori: lo stato attuale e la fu...",
                "Reattività e aggiornamento UI: La reattività è il comportamento per cui l'interfaccia si aggiorna automaticamente quando cambia uno stato, senza bisogno di ricaricare la p..."
            ],
            "examPitfalls": [
                "Non chiamare gli Hook all'interno di condizioni o cicli.",
                "Includere sempre tutte le dipendenze reattive nell'array di useEffect."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Eventi, hook e useState",
                    "language": "jsx",
                    "code": "function BottoneMessaggio() {\n    let numero = 0;\n\n    function saluta() {\n        console.log(\"Click ricevuto\");\n    }\n\n    function incrementa(valore) {\n        numero = numero + valore;\n        console.log(\"Numero attuale:\", numero);\n    }\n\n    return (\n        <div>\n            // Corretto: la funzione viene passata, non eseguita\n            <button onClick={saluta}>\n                Premi qui\n            </button>\n\n            // Sbagliato: la funzione verrebbe eseguita subito\n            // <button onClick={saluta()}>\n            //     Premi qui\n            // </button>\n\n            // Funzione freccia: incrementa di 1 solo al click\n            <button onClick={() => incrementa(1)}>\n                Incrementa\n            </button>\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Eventi, hook e useState."
                },
                {
                    "title": "Esempio di codice 2: Eventi, hook e useState",
                    "language": "jsx",
                    "code": "function BottoneConferma() {\n    function confermaClick() {\n        console.log(\"Bottone premuto\");\n    }\n\n    return (\n        <button onClick={confermaClick}>\n            Conferma\n        </button>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Eventi, hook e useState."
                },
                {
                    "title": "Esempio di codice 3: Eventi, hook e useState",
                    "language": "jsx",
                    "code": "function CampoNome() {\n    function scriviInConsole() {\n        console.log(\"Valore modificato\");\n    }\n\n    function inviaForm() {\n        console.log(\"Form inviato\");\n    }\n\n    return (\n        <form onSubmit={inviaForm}>\n            <input type=\"text\" onChange={scriviInConsole} />\n            <button>Invia</button>\n        </form>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Eventi, hook e useState."
                },
                {
                    "title": "Esempio di codice 4: Eventi, hook e useState",
                    "language": "jsx",
                    "code": "function InterazioniBase() {\n    function gestisciCambio() {\n        console.log(\"Input modificato\");\n    }\n\n    function gestisciClick() {\n        console.log(\"Bottone cliccato\");\n    }\n\n    return (\n        <div>\n            <input type=\"text\" onChange={gestisciCambio} />\n            <button onClick={gestisciClick}>\n                Conferma\n            </button>\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Eventi, hook e useState."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Eventi, hook e useState e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Eventi, hook e useState?"
            ]
        },
        {
            "id": "react-binding",
            "title": "Data binding e gestione dei dati",
            "pdfReference": "lezioni/react-binding.html",
            "summary": "Il data binding collega i dati dello stato a ciò che viene mostrato nella pagina. Quando lo stato cambia, la UI si aggiorna in automatico. Il data binding è il collegamento tra i dati gestiti da un componente e ciò che viene mostrato nella pagina. In React questo collegamento si costruisce di solito...",
            "keyPoints": [
                "Cos'è il data binding: Il data binding collega i dati dello stato a ciò che viene mostrato nella pagina. Quando lo stato cambia, la UI si aggiorna in automatico. I...",
                "Data binding con input: L'input controllato legge il valore da uno stato. onChange aggiorna lo stato a ogni digitazione. Un input controllato è un campo il cui valo...",
                "Data binding con select: La select limita la scelta a opzioni definite. Lo stato conserva il valore selezionato. Una select controllata funziona come un input contro...",
                "Data binding con radio: I radio button permettono una sola scelta per gruppo. Si controllano con checked e onChange . I radio button servono quando l'utente deve sc...",
                "Data binding con checkbox: La checkbox rappresenta uno stato vero o falso. checked indica se è selezionata. La checkbox serve per uno stato binario: attiva oppure disa...",
                "Data binding con textarea: La textarea serve per testi più lunghi. Il valore si controlla con lo stato come per l'input. La textarea funziona come un input più adatto ..."
            ],
            "examPitfalls": [
                "Non chiamare gli Hook all'interno di condizioni o cicli.",
                "Includere sempre tutte le dipendenze reattive nell'array di useEffect."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Data binding e gestione dei dati",
                    "language": "javascript",
                    "code": "import { useState } from \"react\";\n\nfunction LiveText() {\n    const [text, setText] = useState(\"\");\n\n    return (\n        <div>\n            <input\n                type=\"text\"\n                value={text}\n                onChange={(event) => setText(event.target.value)}\n            />\n            <p>{text}</p>\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Data binding e gestione dei dati."
                },
                {
                    "title": "Esempio di codice 2: Data binding e gestione dei dati",
                    "language": "javascript",
                    "code": "import { useState } from \"react\";\n\nfunction NameFilter() {\n    const [search, setSearch] = useState(\"\");\n    const names = [\"Anna\", \"Marco\", \"Marta\", \"Luca\"];\n\n    const filteredNames = names.filter((name) =>\n        name.toLowerCase().includes(search.toLowerCase())\n    );\n\n    return (\n        <div>\n            <input\n                type=\"text\"\n                value={search}\n                onChange={(event) => setSearch(event.target.value)}\n            />\n            <ul>\n                {filteredNames.map((name) => (\n                    <li key={name}>{name}</li>\n                ))}\n            </ul>\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Data binding e gestione dei dati."
                },
                {
                    "title": "Esempio di codice 3: Data binding e gestione dei dati",
                    "language": "javascript",
                    "code": "import { useState } from \"react\";\n\nfunction PriceConverter() {\n    const [currency, setCurrency] = useState(\"eur\");\n    const price = 10;\n\n    const values = {\n        eur: price,\n        usd: price * 1.1,\n        gbp: price * 0.85\n    };\n\n    return (\n        <div>\n            <select value={currency} onChange={(event) => setCurrency(event.target.value)}>\n                <option value=\"eur\">EUR</option>\n                <option value=\"usd\">USD</option>\n                <option value=\"gbp\">GBP</option>\n            </select>\n\n            <p>{values[currency].toFixed(2)}</p>\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Data binding e gestione dei dati."
                },
                {
                    "title": "Esempio di codice 4: Data binding e gestione dei dati",
                    "language": "javascript",
                    "code": "import { useState } from \"react\";\n\nfunction FilterByType() {\n    const [type, setType] = useState(\"tutti\");\n    const items = [\n        { name: \"Mela\", category: \"frutta\" },\n        { name: \"Pane\", category: \"cibo\" },\n        { name: \"Pera\", category: \"frutta\" }\n    ];\n\n    const filteredItems =\n        type === \"tutti\" ? items : items.filter((item) => item.category === type);\n\n    return (\n        <div>\n            <select value={type} onChange={(event) => setType(event.target.value)}>\n                <option value=\"tutti\">Tutti</option>\n                <option value=\"frutta\">Frutta</option>\n                <option value=\"cibo\">Cibo</option>\n            </select>\n\n            <ul>\n                {filteredItems.map((item) => (\n                    <li key={item.name}>{item.name}</li>\n                ))}\n            </ul>\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Data binding e gestione dei dati."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Data binding e gestione dei dati e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Data binding e gestione dei dati?"
            ]
        },
        {
            "id": "react-form",
            "title": "Form",
            "pdfReference": "lezioni/react-form.html",
            "summary": "L'evento onSubmit viene eseguito quando un form viene inviato. In React serve per raccogliere i dati dei campi e gestirli in una funzione, senza lasciare al browser il comportamento predefinito. Un form non è solo un insieme di input separati. È un blocco unico che ha uno scopo preciso, per esempio ...",
            "keyPoints": [
                "onSubmit e gestione del form: L'evento onSubmit viene eseguito quando un form viene inviato. In React serve per raccogliere i dati dei campi e gestirli in una funzione, s...",
                "Gestire più campi nello stesso form: Quando un form contiene più input, ogni campo può essere collegato a una parte dello stato. Al submit, tutti i valori vengono letti insieme ...",
                "Immutabilità dello stato: In React lo stato non si modifica direttamente. Quando un dato deve cambiare, si crea un nuovo valore e lo si passa alla funzione di aggiorn...",
                "Aggiungere elementi a un array: Per aggiungere un elemento a un array nello stato si crea un nuovo array che contiene i vecchi elementi più quello nuovo. Lo strumento più s...",
                "Rimuovere elementi da un array: Per rimuovere un elemento da un array nello stato non si cancella direttamente il dato esistente. Si crea invece un nuovo array che contiene..."
            ],
            "examPitfalls": [
                "Non chiamare gli Hook all'interno di condizioni o cicli.",
                "Includere sempre tutte le dipendenze reattive nell'array di useEffect."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Form",
                    "language": "jsx",
                    "code": "import { useState } from 'react';\n\nfunction App() {\n    const [nome, setNome] = useState('');\n\n    function handleSubmit(event) {\n        event.preventDefault();\n        console.log('Nome inviato:', nome);\n    }\n\n    return (\n        <form onSubmit={handleSubmit}>\n            <label>Nome</label>\n            <input\n                type=\"text\"\n                value={nome}\n                onChange={(event) => setNome(event.target.value)}\n            />\n            <button type=\"submit\">Invia</button>\n        </form>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Form."
                },
                {
                    "title": "Esempio di codice 2: Form",
                    "language": "jsx",
                    "code": "import { useState } from 'react';\n\nfunction App() {\n    const [cognome, setCognome] = useState('');\n\n    function handleSubmit(event) {\n        event.preventDefault();\n        console.log('Cognome inviato:', cognome);\n    }\n\n    return (\n        <form onSubmit={handleSubmit}>\n            <label>Cognome</label>\n            <input\n                type=\"text\"\n                value={cognome}\n                onChange={(event) => setCognome(event.target.value)}\n            />\n            <button type=\"submit\">Invia</button>\n        </form>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Form."
                },
                {
                    "title": "Esempio di codice 3: Form",
                    "language": "jsx",
                    "code": "import { useState } from 'react';\n\nfunction App() {\n    const [nome, setNome] = useState('');\n    const [email, setEmail] = useState('');\n\n    function handleSubmit(event) {\n        event.preventDefault();\n        console.log('Nome:', nome);\n        console.log('Email:', email);\n    }\n\n    return (\n        <form onSubmit={handleSubmit}>\n            <label>Nome</label>\n            <input\n                type=\"text\"\n                value={nome}\n                onChange={(event) => setNome(event.target.value)}\n            />\n\n            <label>Email</label>\n            <input\n                type=\"text\"\n                value={email}\n                onChange={(event) => setEmail(event.target.value)}\n            />\n\n            <button type=\"submit\">Invia</button>\n        </form>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Form."
                },
                {
                    "title": "Esempio di codice 4: Form",
                    "language": "jsx",
                    "code": "import { useState } from 'react';\n\nfunction App() {\n    const [corso, setCorso] = useState('');\n    const [docente, setDocente] = useState('');\n\n    function handleSubmit(event) {\n        event.preventDefault();\n        console.log('Corso:', corso);\n        console.log('Docente:', docente);\n    }\n\n    return (\n        <form onSubmit={handleSubmit}>\n            <label>Corso</label>\n            <input\n                type=\"text\"\n                value={corso}\n                onChange={(event) => setCorso(event.target.value)}\n            />\n\n            <label>Docente</label>\n            <input\n                type=\"text\"\n                value={docente}\n                onChange={(event) => setDocente(event.target.value)}\n            />\n\n            <button type=\"submit\">Invia</button>\n        </form>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Form."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Form e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Form?"
            ]
        },
        {
            "id": "react-api",
            "title": "API",
            "pdfReference": "lezioni/react-api.html",
            "summary": "fetch() è una funzione JavaScript che invia una richiesta a un'API, cioè a un servizio che fornisce dati. La richiesta è asincrona: il risultato arriva dopo un breve tempo e non immediatamente. Senza usare await , si usa then() . Il primo then() legge la risposta, mentre il secondo riceve i dati già...",
            "keyPoints": [
                "Fetch semplice: fetch() è una funzione JavaScript che invia una richiesta a un'API, cioè a un servizio che fornisce dati. La richiesta è asincrona: il risul...",
                "Async e await: async e await sono un modo alternativo per gestire le operazioni asincrone. Permettono di scrivere una fetch con una sintassi simile a quell...",
                "Inviare un input a Mistral: Le API di Mistral permettono di inviare messaggi a un modello AI e ricevere una risposta. Per ottenere una risposta testuale si invia una ri...",
                "Usare il file .env: Il file .env contiene variabili di ambiente, cioè valori esterni al codice React. Può essere usato per separare configurazioni come indirizz...",
                "Organizzare le services: Una service è un file che contiene funzioni dedicate alla comunicazione con un'API. Serve per separare la logica delle richieste dal compone...",
                "Mostrare un loader: Un loader informa l'utente che una richiesta è ancora in corso. È utile perché una risposta AI può richiedere alcuni secondi: senza un feedb..."
            ],
            "examPitfalls": [
                "Non chiamare gli Hook all'interno di condizioni o cicli.",
                "Includere sempre tutte le dipendenze reattive nell'array di useEffect."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: API",
                    "language": "jsx",
                    "code": "import { useState } from \"react\";\n\nfunction App() {\n    const [post, setPost] = useState(null);\n\n    function loadPost() {\n        fetch(\"https://jsonplaceholder.typicode.com/posts/1\")\n            .then((response) => response.json())\n            .then((data) => {\n                setPost(data);\n            });\n    }\n\n    return (\n        <div>\n            <button onClick={loadPost}>Carica post</button>\n\n            {post && (\n                <article>\n                    <h2>{post.title}</h2>\n                    <p>{post.body}</p>\n                </article>\n            )}\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per API."
                },
                {
                    "title": "Esempio di codice 2: API",
                    "language": "jsx",
                    "code": "import { useState } from \"react\";\n\nfunction App() {\n    const [user, setUser] = useState(null);\n\n    function loadUser() {\n        fetch(\"https://jsonplaceholder.typicode.com/users/1\")\n            .then((response) => response.json())\n            .then((data) => {\n                setUser(data);\n            });\n    }\n\n    return (\n        <div>\n            <button onClick={loadUser}>Carica utente</button>\n\n            {user && (\n                <div>\n                    <h2>{user.name}</h2>\n                    <p>{user.email}</p>\n                </div>\n            )}\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per API."
                },
                {
                    "title": "Esempio di codice 3: API",
                    "language": "jsx",
                    "code": "import { useState } from \"react\";\n\nfunction App() {\n    const [post, setPost] = useState(null);\n\n    async function loadPost() {\n        const response = await fetch(\n            \"https://jsonplaceholder.typicode.com/posts/1\"\n        );\n\n        const data = await response.json();\n\n        setPost(data);\n    }\n\n    return (\n        <div>\n            <button onClick={loadPost}>Carica post</button>\n\n            {post && (\n                <article>\n                    <h2>{post.title}</h2>\n                    <p>{post.body}</p>\n                </article>\n            )}\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per API."
                },
                {
                    "title": "Esempio di codice 4: API",
                    "language": "jsx",
                    "code": "import { useState } from \"react\";\n\nfunction App() {\n    const [user, setUser] = useState(null);\n\n    async function loadUser() {\n        const response = await fetch(\n            \"https://jsonplaceholder.typicode.com/users/1\"\n        );\n\n        const data = await response.json();\n\n        setUser(data);\n    }\n\n    return (\n        <div>\n            <button onClick={loadUser}>Carica utente</button>\n\n            {user && <p>{user.name}</p>}\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per API."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in API e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con API?"
            ]
        },
        {
            "id": "react-use-effect",
            "title": "useEffect",
            "pdfReference": "lezioni/react-use-effect.html",
            "summary": "useEffect è un Hook di React che serve per eseguire del codice dopo il rendering del componente. Si usa quando il componente deve fare qualcosa oltre a mostrare il JSX, per esempio scrivere in console, avviare un timer o caricare dati. Quando un componente React viene renderizzato, il suo compito pr...",
            "keyPoints": [
                "Che cos'è useEffect: useEffect è un Hook di React che serve per eseguire del codice dopo il rendering del componente. Si usa quando il componente deve fare qualc...",
                "L'array delle dipendenze: Il secondo argomento di useEffect è l'array delle dipendenze. Serve per dire a React quando rieseguire l'effetto. Se una dipendenza cambia, ...",
                "Il return dentro useEffect: Il return dentro useEffect serve per restituire una funzione di pulizia, chiamata cleanup. Questa funzione viene eseguita prima che il compo...",
                "useEffect con timer: useEffect si usa spesso con setInterval() o setTimeout() per avviare timer collegati al componente. Quando il timer non serve più, è importa...",
                "useEffect e richieste HTTP con fetch: Quando un componente deve recuperare dati da un server, spesso si usa fetch() dentro useEffect . Durante l'attesa della risposta si può usar..."
            ],
            "examPitfalls": [
                "Non chiamare gli Hook all'interno di condizioni o cicli.",
                "Includere sempre tutte le dipendenze reattive nell'array di useEffect."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: useEffect",
                    "language": "jsx",
                    "code": "import { useEffect } from \"react\";\n\nfunction App() {\n    useEffect(() => {\n        console.log(\"Componente caricato\");\n    }, []);\n\n    return <h1>Homepage</h1>;\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per useEffect."
                },
                {
                    "title": "Esempio di codice 2: useEffect",
                    "language": "jsx",
                    "code": "import { useEffect } from \"react\";\n\nfunction App() {\n    useEffect(() => {\n        console.log(\"Pagina pronta\");\n    }, []);\n\n    return <h1>Benvenuto</h1>;\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per useEffect."
                },
                {
                    "title": "Esempio di codice 3: useEffect",
                    "language": "jsx",
                    "code": "import { useEffect, useState } from \"react\";\n\nfunction App() {\n    const [count, setCount] = useState(0);\n\n    useEffect(() => {\n        console.log(\"Il valore di count è cambiato:\", count);\n    }, [count]);\n\n    return (\n        <div>\n            <p>{count}</p>\n            <button onClick={() => setCount(count + 1)}>Aumenta</button>\n        </div>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per useEffect."
                },
                {
                    "title": "Esempio di codice 4: useEffect",
                    "language": "jsx",
                    "code": "import { useEffect, useState } from \"react\";\n\nfunction App() {\n    const [name, setName] = useState(\"\");\n\n    useEffect(() => {\n        console.log(\"Nome aggiornato:\", name);\n    }, [name]);\n\n    return (\n        <input\n            type=\"text\"\n            value={name}\n            onChange={(event) => setName(event.target.value)}\n        />\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per useEffect."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in useEffect e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con useEffect?"
            ]
        },
        {
            "id": "react-router",
            "title": "React Router",
            "pdfReference": "lezioni/react-router.html",
            "summary": "SPA significa Single Page Application: l'app carica una sola pagina HTML e aggiorna il contenuto nel browser. In un sito tradizionale, visitare una nuova pagina richiede al browser di chiedere un nuovo documento al server. In una SPA il browser carica l'applicazione una volta sola; quando l'utente p...",
            "keyPoints": [
                "Che cos'è una SPA: SPA significa Single Page Application: l'app carica una sola pagina HTML e aggiorna il contenuto nel browser. In un sito tradizionale, visit...",
                "Cos'è React Router e come si installa: React Router collega un percorso dell'URL, come /contatti , al componente React da mostrare. React da solo aggiorna l'interfaccia, ma non de...",
                "Routes e Route: Routes raccoglie le route dell'app. Route associa una prop path a un componente tramite la prop Component . Per il sito vetrina creiamo pagi...",
                "Link e NavLink: Link cambia route senza ricaricare tutta la pagina. NavLink è pensato per i menu e permette di riconoscere la route attiva. Per navigare all...",
                "Layout e Outlet: Un layout raccoglie le parti condivise, come il menu. Outlet indica il punto in cui viene mostrata la route figlia. Il menu del sito vetrina...",
                "Pagina 404: La route con path=\"*\" viene usata quando nessun altro percorso corrisponde all'URL. Un utente può digitare un indirizzo inesistente o aprire..."
            ],
            "examPitfalls": [
                "Non chiamare gli Hook all'interno di condizioni o cicli.",
                "Includere sempre tutte le dipendenze reattive nell'array di useEffect."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: React Router",
                    "language": "bash",
                    "code": "pnpm add react-router",
                    "explanation": "Implementazione pratica illustrata nella dispensa per React Router."
                },
                {
                    "title": "Esempio di codice 2: React Router",
                    "language": "jsx",
                    "code": "import { StrictMode } from \"react\";\nimport { createRoot } from \"react-dom/client\";\nimport { BrowserRouter } from \"react-router\";\nimport App from \"./App\";\n\ncreateRoot(document.getElementById(\"root\")).render(\n    <StrictMode>\n        <BrowserRouter>\n            <App />\n        </BrowserRouter>\n    </StrictMode>\n);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per React Router."
                },
                {
                    "title": "Esempio di codice 3: React Router",
                    "language": "bash",
                    "code": "pnpm add react-router",
                    "explanation": "Implementazione pratica illustrata nella dispensa per React Router."
                },
                {
                    "title": "Esempio di codice 4: React Router",
                    "language": "jsx",
                    "code": "import { BrowserRouter } from \"react-router\";\n\n<BrowserRouter>\n    <App />\n</BrowserRouter>",
                    "explanation": "Implementazione pratica illustrata nella dispensa per React Router."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in React Router e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con React Router?"
            ]
        },
        {
            "id": "react-context",
            "title": "React Context",
            "pdfReference": "lezioni/react-context.html",
            "summary": "Il prop drilling avviene quando una prop attraversa componenti che non la usano, solo per raggiungere quello che ne ha bisogno. In React i dati viaggiano normalmente dall'alto verso il basso: un componente padre passa una prop a un componente figlio. È un meccanismo semplice e preferibile quando i c...",
            "keyPoints": [
                "Il problema: il prop drilling: Il prop drilling avviene quando una prop attraversa componenti che non la usano, solo per raggiungere quello che ne ha bisogno. In React i d...",
                "Creare il Context: Un Context è un canale condiviso: il Provider inserisce un valore e i componenti al suo interno possono consumarlo. Context non è uno stato ...",
                "CounterProvider: stato e condivisione: Il Provider deve avvolgere i componenti che devono leggere o aggiornare il valore condiviso. Un Provider è un normale componente React. Rice...",
                "Un hook per consumare il Context: Un hook personalizzato nasconde il dettaglio di useContext(CounterContext) dietro un nome più chiaro: useCount . useContext riceve il Contex...",
                "Usare il contatore nei componenti: In App , CounterProvider avvolge Total e Click . La posizione è importante: solo i discendenti del Provider possono usare useCount . I due c...",
                "Quando usare Context: Usa Context per dati condivisi tra più componenti; usa props e stato locale quando il dato ha pochi destinatari. Context è utile per dati co..."
            ],
            "examPitfalls": [
                "Non chiamare gli Hook all'interno di condizioni o cicli.",
                "Includere sempre tutte le dipendenze reattive nell'array di useEffect."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: React Context",
                    "language": "jsx",
                    "code": "function App() {\n    const [counter, setCounter] = useState(0);\n\n    return (\n        <>\n            <Total counter={counter} />\n            <Click setCounter={setCounter} />\n        </>\n    );\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per React Context."
                },
                {
                    "title": "Esempio di codice 2: React Context",
                    "language": "jsx",
                    "code": "import { createContext, useContext, useState } from \"react\";\n\nconst CounterContext = createContext();",
                    "explanation": "Implementazione pratica illustrata nella dispensa per React Context."
                },
                {
                    "title": "Esempio di codice 3: React Context",
                    "language": "jsx",
                    "code": "const CounterProvider = ({ children }) => {\n    const [counter, setCounter] = useState(0);\n\n    return (\n        <CounterContext.Provider value={{ counter, setCounter }}>\n            {children}\n        </CounterContext.Provider>\n    );\n};",
                    "explanation": "Implementazione pratica illustrata nella dispensa per React Context."
                },
                {
                    "title": "Esempio di codice 4: React Context",
                    "language": "jsx",
                    "code": "import { createContext, useContext, useState } from \"react\";\n\nconst CounterContext = createContext();\n\nconst CounterProvider = ({ children }) => {\n    const [counter, setCounter] = useState(0);\n\n    return (\n        <CounterContext.Provider value={{ counter, setCounter }}>\n            {children}\n        </CounterContext.Provider>\n    );\n};\n\nfunction useCount() {\n    return useContext(CounterContext);\n}\n\nexport { CounterProvider, useCount };",
                    "explanation": "Implementazione pratica illustrata nella dispensa per React Context."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in React Context e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con React Context?"
            ]
        }
    ],
    "totalLessons": 9
},

  sql: {
    "moduleId": "sql",
    "moduleName": "Database Relazionali & MySQL",
    "description": "Progettazione database, DDL/DML, relazioni 1:1, 1:N, N:M, JOIN complesse, indici, transazioni ACID e normalizzazione.",
    "lessons": [
        {
            "id": "mysql-intro",
            "title": "MySQL e database relazionali",
            "pdfReference": "lezioni/mysql-intro.html",
            "summary": "Un database conserva dati organizzati. Un DBMS è il programma che permette di crearli, proteggerli e consultarli. MySQL è un DBMS relazionale. Un negozio, una biblioteca o una scuola devono conservare molti dati e ritrovarli con precisione. Un database li mantiene anche dopo la chiusur...",
            "keyPoints": [
                "Database relazionali e MySQL: Un database conserva dati organizzati. Un DBMS è il programma che permette di crearli, proteggerli e consultarli. MySQL è un DBMS relazional...",
                "Entità e attributi: Un buon attributo contiene un solo fatto. Per esempio, è meglio avere nome e cognome separati che un unico campo nome_completo , se prevedia...",
                "Dall'entità alla tabella: Una tabella descrive la struttura dei dati; una riga contiene i dati di un singolo elemento. Nel database l'entità Cliente diventa la tabell...",
                "Tipi di dato: Ogni campo deve dichiarare il tipo di valore che può contenere. La scelta del tipo aiuta MySQL a salvare, confrontare e controllare i dati n...",
                "Chiave primaria e vincoli: I vincoli sono regole applicate da MySQL per impedire l'inserimento di dati non validi o incoerenti. Ogni tabella deve poter distinguere sen...",
                "Creare una tabella con MySQL: L'istruzione CREATE TABLE trasforma il modello progettato nella struttura concreta del database. Il nome della tabella è seguito, tra parent..."
            ],
            "examPitfalls": [
                "Evitare SQL Injection utilizzando sempre query parametrizzate e prepared statements.",
                "Definire correttamente le chiavi esterne e i vincoli ON DELETE CASCADE."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: MySQL e database relazionali",
                    "language": "text",
                    "code": "Entità: Cliente\n\nAttributi:\n- nome\n- cognome\n- email\n- data di nascita",
                    "explanation": "Implementazione pratica illustrata nella dispensa per MySQL e database relazionali."
                },
                {
                    "title": "Esempio di codice 2: MySQL e database relazionali",
                    "language": "text",
                    "code": "Tabella: clienti\n\n| id | nome  | cognome | email             |\n|----|-------|----------|-------------------|\n| 1  | Mario | Rossi    | mario@example.com |\n| 2  | Anna  | Bianchi  | anna@example.com  |",
                    "explanation": "Implementazione pratica illustrata nella dispensa per MySQL e database relazionali."
                },
                {
                    "title": "Esempio di codice 3: MySQL e database relazionali",
                    "language": "text",
                    "code": "prezzo             DECIMAL(8, 2)  →  19.90\ndata_nascita       DATE           →  2004-09-16\nattivo             BOOLEAN        →  TRUE",
                    "explanation": "Implementazione pratica illustrata nella dispensa per MySQL e database relazionali."
                },
                {
                    "title": "Esempio di codice 4: MySQL e database relazionali",
                    "language": "sql",
                    "code": "prezzo DECIMAL(8, 2) NOT NULL CHECK (prezzo >= 0)\nattivo BOOLEAN NOT NULL DEFAULT TRUE\nemail VARCHAR(100) NOT NULL UNIQUE",
                    "explanation": "Implementazione pratica illustrata nella dispensa per MySQL e database relazionali."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in MySQL e database relazionali e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con MySQL e database relazionali?"
            ]
        },
        {
            "id": "mysql-relazioni",
            "title": "Relazioni tra tabelle con MySQL",
            "pdfReference": "lezioni/mysql-relazioni.html",
            "summary": "Una relazione collega record di tabelle diverse senza duplicare gli stessi dati in più punti. In un database reale le informazioni appartengono spesso a entità diverse. Un cliente e un ordine, per esempio, sono due cose distinte: ciascuna merita una tabella con i propri campi. Salvare ...",
            "keyPoints": [
                "Perché usare relazioni: Una relazione collega record di tabelle diverse senza duplicare gli stessi dati in più punti. In un database reale le informazioni apparteng...",
                "Chiave primaria e chiave esterna: La chiave esterna è un campo che contiene il valore della chiave primaria di un record presente in un'altra tabella. La chiave primaria iden...",
                "Relazione uno a molti: In una relazione uno-a-molti, un record della prima tabella può essere collegato a molti record della seconda; ogni record della seconda tab...",
                "Relazione uno a uno: In una relazione uno-a-uno, un record può essere collegato al massimo a un solo record dell'altra tabella. Questo tipo di relazione è meno f...",
                "Modifiche e cancellazioni: Le azioni della chiave esterna definiscono che cosa accade ai record collegati quando il record di riferimento viene modificato o eliminato....",
                "Relazione molti a molti: Una relazione molti-a-molti richiede una terza tabella, chiamata tabella ponte , che contiene le due chiavi esterne. Uno studente può freque..."
            ],
            "examPitfalls": [
                "Evitare SQL Injection utilizzando sempre query parametrizzate e prepared statements.",
                "Definire correttamente le chiavi esterne e i vincoli ON DELETE CASCADE."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Relazioni tra tabelle con MySQL",
                    "language": "text",
                    "code": "clienti                         ordini\n+----+----------------+          +----+------------+-------------+\n| id | email          |          | id | totale     | cliente_id  |\n+----+----------------+          +----+------------+-------------+\n| 1  | mario@email.it |          | 1  | 49.90      | 1           |\n+----+----------------+          +----+------------+-------------+",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Relazioni tra tabelle con MySQL."
                },
                {
                    "title": "Esempio di codice 2: Relazioni tra tabelle con MySQL",
                    "language": "text",
                    "code": "clienti.id  ←  ordini.cliente_id",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Relazioni tra tabelle con MySQL."
                },
                {
                    "title": "Esempio di codice 3: Relazioni tra tabelle con MySQL",
                    "language": "sql",
                    "code": "CREATE TABLE clienti (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    nome VARCHAR(50) NOT NULL,\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE ordini (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    totale DECIMAL(10, 2) NOT NULL CHECK (totale >= 0),\n    cliente_id INT NOT NULL,\n    FOREIGN KEY (cliente_id) REFERENCES clienti(id)\n);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Relazioni tra tabelle con MySQL."
                },
                {
                    "title": "Esempio di codice 4: Relazioni tra tabelle con MySQL",
                    "language": "sql",
                    "code": "CREATE TABLE utenti (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE profili (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    biografia TEXT,\n    utente_id INT NOT NULL UNIQUE,\n    FOREIGN KEY (utente_id) REFERENCES utenti(id)\n);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Relazioni tra tabelle con MySQL."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Relazioni tra tabelle con MySQL e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Relazioni tra tabelle con MySQL?"
            ]
        },
        {
            "id": "mysql-crud",
            "title": "CRUD e transazioni con MySQL",
            "pdfReference": "lezioni/mysql-crud.html",
            "summary": "CRUD riassume le quattro operazioni fondamentali sui dati: Create, Read, Update e Delete. Create: creare un nuovo record con INSERT INTO . Read: leggere uno o più record con SELECT . Update: modificare record esistenti con UPDATE . Delete: eliminare record con DELETE . Gli esempi usano una ta...",
            "keyPoints": [
                "Le quattro operazioni CRUD: CRUD riassume le quattro operazioni fondamentali sui dati: Create, Read, Update e Delete. Create: creare un nuovo record con INSERT INTO . R...",
                "Leggere i dati con SELECT: SELECT legge i dati senza modificarli. è l'istruzione da usare anche prima di un aggiornamento o di una cancellazione. Dopo SELECT indichiam...",
                "Inserire dati con INSERT INTO: INSERT INTO crea un nuovo record. L'ordine dei valori deve corrispondere esattamente all'ordine delle colonne. INSERT INTO `products` ( `nam...",
                "Modificare dati con UPDATE: UPDATE modifica record già esistenti. Senza WHERE , modifica tutti i record della tabella. Prima controlliamo con SELECT quali record corris...",
                "Eliminare dati con DELETE: DELETE elimina record. Senza WHERE , elimina tutti i record della tabella. Come per UPDATE , eseguiamo prima un SELECT con la stessa condizi...",
                "I tipi di JOIN: Una JOIN collega i record di due tabelle attraverso colonne correlate, solitamente una chiave primaria e una chiave esterna. INNER JOIN INNE..."
            ],
            "examPitfalls": [
                "Evitare SQL Injection utilizzando sempre query parametrizzate e prepared statements.",
                "Definire correttamente le chiavi esterne e i vincoli ON DELETE CASCADE."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: CRUD e transazioni con MySQL",
                    "language": "text",
                    "code": "products\n+----------------+----------------+--------------------------------+\n| Colonna        | Tipo           | Significato                    |\n+----------------+----------------+--------------------------------+\n| id             | INT            | Identificativo del prodotto    |\n| name           | VARCHAR(255)   | Nome del prodotto              |\n| price          | DECIMAL(8,2)   | Prezzo                         |\n| stock_quantity | INT            | Quantità disponibile          |\n| is_deleted     | INT(1)         | 0 = attivo, 1 = eliminato      |\n| created_at     | DATETIME       | Data di creazione              |\n| updated_at     | DATETIME       | Data dell'ultima modifica      |\n+----------------+----------------+--------------------------------+",
                    "explanation": "Implementazione pratica illustrata nella dispensa per CRUD e transazioni con MySQL."
                },
                {
                    "title": "Esempio di codice 2: CRUD e transazioni con MySQL",
                    "language": "sql",
                    "code": "SELECT *\nFROM `products`;",
                    "explanation": "Implementazione pratica illustrata nella dispensa per CRUD e transazioni con MySQL."
                },
                {
                    "title": "Esempio di codice 3: CRUD e transazioni con MySQL",
                    "language": "sql",
                    "code": "SELECT\n    `id`,\n    `name`,\n    `price`\nFROM `products`;",
                    "explanation": "Implementazione pratica illustrata nella dispensa per CRUD e transazioni con MySQL."
                },
                {
                    "title": "Esempio di codice 4: CRUD e transazioni con MySQL",
                    "language": "sql",
                    "code": "SELECT\n    `id`,\n    `name`,\n    `price`\nFROM `products`\nWHERE `is_deleted` = 0\n    AND `price` < 50.00;",
                    "explanation": "Implementazione pratica illustrata nella dispensa per CRUD e transazioni con MySQL."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in CRUD e transazioni con MySQL e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con CRUD e transazioni con MySQL?"
            ]
        }
    ],
    "totalLessons": 3
},

  node: {
    "moduleId": "node",
    "moduleName": "Node.js, Express & Prisma ORM",
    "description": "Ambiente runtime Node.js, gestione package pnpm, architettura REST API con Express, Middleware, Prisma ORM, modellazione schemi e integrazione database.",
    "lessons": [
        {
            "id": "node-intro",
            "title": "Node e package manager",
            "pdfReference": "lezioni/node-intro.html",
            "summary": "Node è un runtime JavaScript che funziona fuori dal browser, direttamente sul sistema operativo. Il linguaggio è sempre JavaScript, ma non esistono le API del DOM: niente document , window , alert o prompt . Nel browser JavaScript serve per interagire con la pagina: leggere elementi, rispondere ai c...",
            "keyPoints": [
                "Cos'è Node: Node è un runtime JavaScript che funziona fuori dal browser, direttamente sul sistema operativo. Il linguaggio è sempre JavaScript, ma non e...",
                "Argomenti da terminale: process.argv è un array che contiene gli argomenti passati al comando Node. I primi due elementi sono riservati a Node e al file eseguito, q...",
                "I package manager: Un package manager installa, aggiorna e rimuove i pacchetti di un progetto JavaScript. In questo corso useremo sempre pnpm . Gli altri li ve...",
                "Inizializzare un progetto: package.json è il file che descrive un progetto: nome, versione, script e dipendenze. Può essere creato con npm init oppure con pnpm init . ...",
                "La chiave scripts: La chiave scripts del file package.json contiene comandi riutilizzabili con un nome breve. Con pnpm run nome-script esegui il comando associ...",
                "Dipendenze: dependencies contiene i pacchetti necessari al funzionamento del progetto. devDependencies contiene i pacchetti utili solo durante lo svilup..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Node e package manager",
                    "language": "javascript",
                    "code": "// app.js\nconsole.log('Ciao da Node');",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Node e package manager."
                },
                {
                    "title": "Esempio di codice 2: Node e package manager",
                    "language": "bash",
                    "code": "node app.js\n# Output: Ciao da Node",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Node e package manager."
                },
                {
                    "title": "Esempio di codice 3: Node e package manager",
                    "language": "javascript",
                    "code": "// app.js\nconsole.log('Luca');",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Node e package manager."
                },
                {
                    "title": "Esempio di codice 4: Node e package manager",
                    "language": "bash",
                    "code": "node app.js",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Node e package manager."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Node e package manager e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Node e package manager?"
            ]
        },
        {
            "id": "package-js",
            "title": "Package JavaScript e pnpm",
            "pdfReference": "lezioni/package.html",
            "summary": "Il registro più usato per i package JavaScript è npmjs.com . Ogni pagina contiene documentazione, versioni pubblicate, dipendenze, repository e statistiche. Cerca il package su npm, poi apri la documentazione ufficiale e il repository collegato. Controlla sempre il nome: package con no...",
            "keyPoints": [
                "Dove cercare un package: Il registro più usato per i package JavaScript è npmjs.com . Ogni pagina contiene documentazione, versioni pubblicate, dipendenze, repositor...",
                "Valutare lo stato di salute: Un package molto scaricato non è automaticamente un package affidabile. Prima di usarlo, controlla più segnali insieme: Attività recente: re...",
                "Release e Semantic Versioning: Una versione SemVer segue lo schema MAJOR.MINOR.PATCH , per esempio 5.3.3 . Una release è una versione pubblicata del package. Nel changelog...",
                "caret: Il simbolo ^ : aggiornamenti compatibili Il simbolo ^ blocca solo la major . Permette aggiornamenti minor e patch, che SemVer considera comp...",
                "Lavorare con i package usando pnpm: Esegui questi comandi dalla cartella che contiene package.json . Conserva anche pnpm-lock.yaml : registra la versione esatta installata e re..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Package JavaScript e pnpm",
                    "language": "bash",
                    "code": "# installare Bootstrap nel progetto\npnpm add bootstrap",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Package JavaScript e pnpm."
                },
                {
                    "title": "Esempio di codice 2: Package JavaScript e pnpm",
                    "language": "json",
                    "code": "{\n  \"dependencies\": {\n    \"bootstrap\": \"~5.3.3\"\n  }\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Package JavaScript e pnpm."
                },
                {
                    "title": "Esempio di codice 3: Package JavaScript e pnpm",
                    "language": "json",
                    "code": "{\n  \"dependencies\": {\n    \"bootstrap\": \"^5.3.3\"\n  }\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Package JavaScript e pnpm."
                },
                {
                    "title": "Esempio di codice 4: Package JavaScript e pnpm",
                    "language": "bash",
                    "code": "# aggiungere una dipendenza\npnpm add bootstrap\n\n# rimuovere una dipendenza\npnpm remove bootstrap\n\n# aggiornare rispettando i range del package.json\npnpm update\n\n# aprire la pagina del package nel browser\npnpm home bootstrap\n\n# mostrare le licenze delle dipendenze installate\npnpm licenses list\n\n# aggiornare alle ultime versioni, anche oltre il range attuale\npnpm update --latest",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Package JavaScript e pnpm."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Package JavaScript e pnpm e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Package JavaScript e pnpm?"
            ]
        },
        {
            "id": "express-intro",
            "title": "Introduzione a Express",
            "pdfReference": "lezioni/express-intro.html",
            "summary": "Il backend è la parte dell'applicazione che gestisce dati, regole e operazioni non affidate al browser. L'API è il canale con cui client e backend comunicano. Il frontend mostra pagine, pulsanti e form. Il backend lavora dietro le quinte: può leggere e salvare dati nel database, verificare credenzia...",
            "keyPoints": [
                "L'obiettivo: costruire API: Il backend è la parte dell'applicazione che gestisce dati, regole e operazioni non affidate al browser. L'API è il canale con cui client e b...",
                "Installare e configurare Express: Creiamo una cartella di progetto, inizializziamo package.json con pnpm e installiamo Express. Useremo gli ES Modules , cioè la sintassi mode...",
                "Avviare un server e creare una rotta: Una porta identifica il programma che deve ricevere la richiesta sul nostro computer; useremo 3000 . Con app.get() definiamo una rotta per r...",
                "Request, response e risposte: La funzione di una rotta riceve due oggetti: req contiene le informazioni della richiesta; res contiene i metodi per costruire e inviare la ...",
                "Testare le API con un client HTTP: Il browser è utile per visitare HTML, ma per verificare le API usiamo un client HTTP , come Postman o LiteClient. Postman: scegli il metodo ...",
                "Rendere accessibili gli asset statici: Un asset statico è un file che il server consegna così com'è, senza calcoli: immagini, CSS, JavaScript o font. Questi file non sono una risp..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Introduzione a Express",
                    "language": "text",
                    "code": "Frontend React / client HTTP\n        |\n        | GET http://localhost:3000/api/pizze\n        v\nServer Express (backend)\n        |\n        | esegue la logica e prepara i dati\n        v\nRisposta HTTP: JSON con le pizze\n        |\n        v\nFrontend: mostra i dati nella pagina",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a Express."
                },
                {
                    "title": "Esempio di codice 2: Introduzione a Express",
                    "language": "bash",
                    "code": "mkdir express-intro\ncd express-intro\npnpm init\npnpm add express",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a Express."
                },
                {
                    "title": "Esempio di codice 3: Introduzione a Express",
                    "language": "json",
                    "code": "{\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node --watch server.js\"\n  }\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a Express."
                },
                {
                    "title": "Esempio di codice 4: Introduzione a Express",
                    "language": "bash",
                    "code": "pnpm init\npnpm add express",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a Express."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Introduzione a Express e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Introduzione a Express?"
            ]
        },
        {
            "id": "express-router",
            "title": "Routing e Router in Express",
            "pdfReference": "lezioni/express-router.html",
            "summary": "Il routing è il sistema di instradamento di Express: a ogni combinazione di metodo HTTP e percorso corrisponde una funzione che prepara la risposta. Una rotta non è soltanto un URL. GET /pizzas e POST /pizzas hanno lo stesso percorso, ma sono due richieste diverse e possono svolgere due operazioni d...",
            "keyPoints": [
                "Routing: dare una destinazione a ogni richiesta: Il routing è il sistema di instradamento di Express: a ogni combinazione di metodo HTTP e percorso corrisponde una funzione che prepara la r...",
                "Parametri dinamici: Un parametro dinamico è una parte variabile del percorso. Si scrive con i due punti, per esempio :id . Express raccoglie il valore nell'ogge...",
                "Risorse e operazioni CRUD: In un'API una risorsa è un insieme di dati dello stesso tipo: pizze, post, utenti o prodotti. Le operazioni fondamentali che compiamo sulle ...",
                "Convenzioni REST: REST è un insieme di convenzioni per rendere le API prevedibili. Usiamo il nome della risorsa al plurale nel percorso e il metodo HTTP per e...",
                "Separare le rotte con Express Router: Quando il progetto cresce, mantenere tutte le rotte in server.js rende l'entry point lungo e difficile da leggere. Un router è un file dedic..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Routing e Router in Express",
                    "language": "javascript",
                    "code": "// metodo HTTP + percorso + funzione da eseguire\napp.get('/pizzas', (req, res) => {\n  res.send('Lista delle pizze');\n});\n\napp.post('/pizzas', (req, res) => {\n  res.send('Creazione di una nuova pizza');\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Routing e Router in Express."
                },
                {
                    "title": "Esempio di codice 2: Routing e Router in Express",
                    "language": "javascript",
                    "code": "app.get('/chi-siamo', (req, res) => {\n  res.send('Pagina chi siamo');\n});\n\napp.get('/contatti', (req, res) => {\n  res.send('Pagina contatti');\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Routing e Router in Express."
                },
                {
                    "title": "Esempio di codice 3: Routing e Router in Express",
                    "language": "text",
                    "code": "GET /products/7\n             └─ valore del parametro id",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Routing e Router in Express."
                },
                {
                    "title": "Esempio di codice 4: Routing e Router in Express",
                    "language": "javascript",
                    "code": "app.get('/products/:id', (req, res) => {\n  console.log(req.params.id);\n  res.send(`Hai richiesto il prodotto con id ${req.params.id}`);\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Routing e Router in Express."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Routing e Router in Express e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Routing e Router in Express?"
            ]
        },
        {
            "id": "express-middleware",
            "title": "Middleware in Express",
            "pdfReference": "lezioni/express-middleware.html",
            "summary": "Un file di environment ( .env ) contiene le variabili di configurazione del progetto: porte, credenziali, chiavi API e altri valori che cambiano tra sviluppo e produzione. Si tengono fuori dal codice per non scriverli direttamente nei file JavaScript e per non pubblicarli su GitHub. SERVER_PORT=\"300...",
            "keyPoints": [
                "Variabili d'ambiente con dotenv: Un file di environment ( .env ) contiene le variabili di configurazione del progetto: porte, credenziali, chiavi API e altri valori che camb...",
                "Che cos'è un middleware: Un middleware è una funzione eseguita tra l'arrivo della richiesta e la risposta finale. Può leggere o modificare req e res , terminare la r...",
                "Middleware già inclusi in Express: Abbiamo già usato middleware senza chiamarli così. Le funzioni express.static() ed express.json() restituiscono middleware che registriamo c...",
                "Creare e registrare un middleware: Possiamo registrare un middleware per ogni richiesta con app.use() , per un gruppo di URL con un prefisso, oppure soltanto su una o più rott...",
                "Intercettare gli errori: Quando un middleware o una rotta incontra un problema, chiama next(error) . Express salta i middleware normali successivi e cerca un middlew...",
                "Gestire le rotte inesistenti: 404: Il middleware 404 non è un error handler: riceve tre parametri perché interviene quando nessuna rotta precedente ha inviato una risposta. Pe..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Middleware in Express",
                    "language": "bash",
                    "code": "SERVER_PORT=\"3000\"",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Middleware in Express."
                },
                {
                    "title": "Esempio di codice 2: Middleware in Express",
                    "language": "text",
                    "code": "express-app/\n├── .env\n├── package.json\n└── server.js",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Middleware in Express."
                },
                {
                    "title": "Esempio di codice 3: Middleware in Express",
                    "language": "bash",
                    "code": "pnpm add dotenv",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Middleware in Express."
                },
                {
                    "title": "Esempio di codice 4: Middleware in Express",
                    "language": "javascript",
                    "code": "import 'dotenv/config';\n\nconst port = process.env.SERVER_PORT || 3000;\n\napp.listen(port, () => {\n  console.log(`Server in ascolto su http://localhost:${port}`);\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Middleware in Express."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Middleware in Express e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Middleware in Express?"
            ]
        },
        {
            "id": "express-mysql",
            "title": "Express e MySQL: connessione e CRUD",
            "pdfReference": "lezioni/express-mysql.html",
            "summary": "Express riceve le richieste HTTP. MySQL conserva i dati nelle tabelle. Il package mysql2 permette a Node.js di comunicare con il database. mkdir express-mysql cd express-mysql pnpm init pnpm add express mysql2 dotenv Nel file package.json aggiungi queste proprietà: { \"type\": \"module\", \"scripts\": { \"...",
            "keyPoints": [
                "Preparare il progetto: Express riceve le richieste HTTP. MySQL conserva i dati nelle tabelle. Il package mysql2 permette a Node.js di comunicare con il database. m...",
                "Configurare il file .env: Come visto nella lezione sui middleware, leggiamo il file .env con dotenv . Per la connessione al database ci servono queste variabili, al p...",
                "Creare la connessione: Usiamo mysql2/promise invece della versione base: ogni metodo restituisce una Promise , quindi possiamo scrivere il codice con async/await i...",
                "Read: leggere i prodotti: Con connection.query() inviamo una query SQL e otteniamo un array [rows, fields] : il primo elemento sono le righe restituite da MySQL. Usia...",
                "SQL injection e prepared statement: Immaginiamo di aggiungere a GET /products un filtro per nome, costruendo la query concatenando direttamente il valore ricevuto dal client. /...",
                "Create e Update: aggiungere e modificare: Per creare un prodotto leggiamo i dati dal body e usiamo INSERT con execute() . Il risultato contiene insertId , l'id assegnato da MySQL. //..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Express e MySQL: connessione e CRUD",
                    "language": "bash",
                    "code": "mkdir express-mysql\ncd express-mysql\npnpm init\npnpm add express mysql2 dotenv",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e MySQL: connessione e CRUD."
                },
                {
                    "title": "Esempio di codice 2: Express e MySQL: connessione e CRUD",
                    "language": "json",
                    "code": "{\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"node --watch server.js\"\n  }\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e MySQL: connessione e CRUD."
                },
                {
                    "title": "Esempio di codice 3: Express e MySQL: connessione e CRUD",
                    "language": "sql",
                    "code": "CREATE DATABASE express_mysql;\nUSE express_mysql;\n\nCREATE TABLE products (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100),\n  price DECIMAL(10, 2),\n  description TEXT\n);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e MySQL: connessione e CRUD."
                },
                {
                    "title": "Esempio di codice 4: Express e MySQL: connessione e CRUD",
                    "language": "bash",
                    "code": "DB_HOST=\"localhost\"\nDB_PORT=\"3306\"\nDB_USER=\"root\"\nDB_PASSWORD=\"password\"\nDB_NAME=\"express_mysql\"",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e MySQL: connessione e CRUD."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Express e MySQL: connessione e CRUD e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Express e MySQL: connessione e CRUD?"
            ]
        },
        {
            "id": "prisma-mysql-tabelle",
            "title": "Introduzione a Prisma: setup, MySQL e schema",
            "pdfReference": "lezioni/prisma-mysql-tabelle.html",
            "summary": "Un ORM ( Object-Relational Mapping ) è uno strato di codice che si mette tra l'applicazione e il database relazionale: traduce gli oggetti che usiamo in JavaScript (oggetti, array, classi) nelle righe delle tabelle SQL, e viceversa. Invece di scrivere query SQL a mano, chiami funzioni JavaScript — c...",
            "keyPoints": [
                "Cos'è un ORM e a cosa serve Prisma: Un ORM ( Object-Relational Mapping ) è uno strato di codice che si mette tra l'applicazione e il database relazionale: traduce gli oggetti c...",
                "Creare una tabella con un model: Nel file prisma/schema.prisma definiamo il generatore del client, il database MySQL e il model Product , che rappresenta i prodotti di uno s...",
                "Applicare e aggiornare la struttura: Una migration è un file SQL versionato che registra una modifica alle tabelle. Una volta applicata non va più modificata a mano: eventuali c...",
                "Il client Prisma: Dopo prisma generate il client va istanziato una sola volta e riutilizzato in tutto il codice. Usiamo l'adapter @prisma/adapter-mariadb inst...",
                "Verificare i dati con uno script: Prima ancora di scrivere rotte Express, possiamo verificare che tabella e client funzionino con un piccolo script Node. Nessuna riga di SQL:..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Introduzione a Prisma: setup, MySQL e schema",
                    "language": "text",
                    "code": "Codice JavaScript          Prisma (ORM)              MySQL\n   oggetti, array   ──▶   traduce in SQL    ──▶   tabelle e righe\n   client.product\n     .findMany()     ◀──  righe → oggetti   ◀──   risultato query",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a Prisma: setup, MySQL e schema."
                },
                {
                    "title": "Esempio di codice 2: Introduzione a Prisma: setup, MySQL e schema",
                    "language": "sql",
                    "code": "CREATE DATABASE express_store;\nCREATE DATABASE express_store_shadow;",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a Prisma: setup, MySQL e schema."
                },
                {
                    "title": "Esempio di codice 3: Introduzione a Prisma: setup, MySQL e schema",
                    "language": "bash",
                    "code": "mkdir hello-prisma\ncd hello-prisma\npnpm init\npnpm add @prisma/client@7.10.0 @prisma/adapter-mariadb@7.10.0 dotenv\npnpm add -D prisma@7.10.0\nmkdir prisma",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a Prisma: setup, MySQL e schema."
                },
                {
                    "title": "Esempio di codice 4: Introduzione a Prisma: setup, MySQL e schema",
                    "language": "json",
                    "code": "{\n  \"scripts\": {\n    \"validate\": \"prisma validate\",\n    \"migrate\": \"prisma migrate dev\",\n    \"generate\": \"prisma generate\",\n    \"studio\": \"prisma studio\",\n    \"test:db\": \"node test-db.js\"\n  }\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Introduzione a Prisma: setup, MySQL e schema."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Introduzione a Prisma: setup, MySQL e schema e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Introduzione a Prisma: setup, MySQL e schema?"
            ]
        },
        {
            "id": "prisma-tipi-annotazioni-relazioni",
            "title": "Scrivere uno schema Prisma: tipi, annotazioni e relazioni",
            "pdfReference": "lezioni/prisma-tipi-annotazioni-relazioni.html",
            "summary": "Nella dispensa precedente, Prisma e MySQL: gestione delle tabelle , abbiamo collegato MySQL a Prisma con un solo model, Product . Il punto di partenza di oggi è quello schema, invariato: generator client { provider = \"prisma-client-js\" } datasource db { provider = \"mysql\" } model Product { id Int @i...",
            "keyPoints": [
                "I tipi di campo: Nella dispensa precedente, Prisma e MySQL: gestione delle tabelle , abbiamo collegato MySQL a Prisma con un solo model, Product . Il punto d...",
                "Le annotazioni: Quattro simboli, quattro ambiti: Simbolo Ambito Esempi @ singolo campo @id , @unique , @default(...) , @relation(...) @@ intero model @@inde...",
                "Relazione uno-a-uno: User e Profile: User ──────1── Profile Un utente ha al massimo un profilo. La foreign key vive nel model «dipendente» e porta @unique : è quello che rende l...",
                "Relazione uno-a-molti: Category e Product: Category ──────< Product Una categoria ha molti prodotti; un prodotto appartiene a una categoria. La FK vive nel lato «molti», senza @unique...",
                "Molti-a-molti esplicita: i tag: Product >──────< Tag (via ProductTag) Un prodotto ha molti tag, un tag contrassegna molti prodotti. Su MySQL si modella con una tabella di c...",
                "Molti-a-molti esplicita con dati: gli ordini: Order >──────< Product (via OrderItem: quantity, unitPrice) Il legame tra ordine e prodotto ha dati propri (quanti? a quale prezzo?): il mod..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Scrivere uno schema Prisma: tipi, annotazioni e relazioni",
                    "language": "javascript",
                    "code": "generator client {\n  provider = \"prisma-client-js\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n}\n\nmodel Product {\n  id          Int      @id @default(autoincrement())\n  name        String\n  price       Decimal  @db.Decimal(10, 2)\n  description String?\n  inStock     Boolean  @default(true)\n  createdAt   DateTime @default(now())\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Scrivere uno schema Prisma: tipi, annotazioni e relazioni."
                },
                {
                    "title": "Esempio di codice 2: Scrivere uno schema Prisma: tipi, annotazioni e relazioni",
                    "language": "javascript",
                    "code": "description String?  @db.Text",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Scrivere uno schema Prisma: tipi, annotazioni e relazioni."
                },
                {
                    "title": "Esempio di codice 3: Scrivere uno schema Prisma: tipi, annotazioni e relazioni",
                    "language": "bash",
                    "code": "pnpm migrate --name description-to-text\npnpm generate",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Scrivere uno schema Prisma: tipi, annotazioni e relazioni."
                },
                {
                    "title": "Esempio di codice 4: Scrivere uno schema Prisma: tipi, annotazioni e relazioni",
                    "language": "javascript",
                    "code": "updatedAt DateTime @updatedAt",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Scrivere uno schema Prisma: tipi, annotazioni e relazioni."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Scrivere uno schema Prisma: tipi, annotazioni e relazioni e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Scrivere uno schema Prisma: tipi, annotazioni e relazioni?"
            ]
        },
        {
            "id": "express-prisma-blog",
            "title": "Prisma in Express: creazione record, select annidate e API di un blog con tag",
            "pdfReference": "lezioni/express-prisma-blog.html",
            "summary": "prisma init prepara i file di Prisma, ma con valori pensati per PostgreSQL: vanno adattati a MySQL prima di scrivere lo schema. Creiamo il progetto e installiamo Prisma 7: @prisma/client e l'adapter MySQL servono all'app, mentre la CLI prisma serve solo in sviluppo ( -D ). mkdir hello-blog cd hello-...",
            "keyPoints": [
                "Creare il progetto: prisma init prepara i file di Prisma, ma con valori pensati per PostgreSQL: vanno adattati a MySQL prima di scrivere lo schema. Creiamo il p...",
                "Progettare lo schema su DrawSQL: Prima si disegna, poi si scrive codice: su drawsql.app progettiamo tabelle e relazioni in modo visuale, senza ancora pensare alla sintassi d...",
                "Esportare lo schema per l'AI: File > Export > Markdown for AI produce una descrizione testuale del diagramma che un'AI può trasformare in schema.prisma . Il file esportat...",
                "Controllare lo schema prima della migrazione: L'AI scrive in fretta ma sbaglia con sicurezza: lo schema generato si legge riga per riga prima di lanciare pnpm migrate , perché la migrazi...",
                "Un post con due tag in una sola chiamata: Con le scritture annidate Prisma crea il post, i tag e le righe del ponte in una sola chiamata: niente INSERT separati e niente id da passar...",
                "Prisma dentro Express: server.js avvia l'app e monta i router; le rotte dei post stanno in routers/postRouter.js , che importa il client Prisma creato una volta so..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Prisma in Express: creazione record, select annidate e API di un blog con tag",
                    "language": "bash",
                    "code": "mkdir hello-blog\ncd hello-blog\npnpm init\npnpm add @prisma/client@7 @prisma/adapter-mariadb@7 dotenv\npnpm add -D prisma@7\npnpm exec prisma init",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Prisma in Express: creazione record, select annidate e API di un blog con tag."
                },
                {
                    "title": "Esempio di codice 2: Prisma in Express: creazione record, select annidate e API di un blog con tag",
                    "language": "bash",
                    "code": "DATABASE_URL=\"mysql://prisma_user:prisma_password@localhost:3306/blog\"\nSHADOW_DATABASE_URL=\"mysql://prisma_user:prisma_password@localhost:3306/blog_shadow\"\n\n# Parametri usati dall'adapter in prisma-client.js.\nDATABASE_HOST=\"localhost\"\nDATABASE_PORT=\"3306\"\nDATABASE_USER=\"prisma_user\"\nDATABASE_PASSWORD=\"prisma_password\"\nDATABASE_NAME=\"blog\"",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Prisma in Express: creazione record, select annidate e API di un blog con tag."
                },
                {
                    "title": "Esempio di codice 3: Prisma in Express: creazione record, select annidate e API di un blog con tag",
                    "language": "javascript",
                    "code": "import \"dotenv/config\";\nimport { defineConfig, env } from \"prisma/config\";\n\nexport default defineConfig({\n  schema: \"prisma/schema.prisma\",\n  migrations: {\n    path: \"prisma/migrations\"\n  },\n  datasource: {\n    url: env(\"DATABASE_URL\"),\n    // Da aggiungere a mano: prisma init non lo inserisce.\n    shadowDatabaseUrl: env(\"SHADOW_DATABASE_URL\")\n  }\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Prisma in Express: creazione record, select annidate e API di un blog con tag."
                },
                {
                    "title": "Esempio di codice 4: Prisma in Express: creazione record, select annidate e API di un blog con tag",
                    "language": "javascript",
                    "code": "generator client {\n  provider = \"prisma-client-js\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Prisma in Express: creazione record, select annidate e API di un blog con tag."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Prisma in Express: creazione record, select annidate e API di un blog con tag e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Prisma in Express: creazione record, select annidate e API di un blog con tag?"
            ]
        },
        {
            "id": "express-react",
            "title": "Express e React: API in locale",
            "pdfReference": "lezioni/express-react.html",
            "summary": "Backend e frontend sono due progetti diversi, ciascuno con il proprio package.json e le proprie dipendenze. Invece di tenerli in due cartelle sparse, li mettiamo dentro un'unica cartella principale: un workspace (spesso chiamato anche monorepo ). Un workspace è una cartella che contiene più progetti...",
            "keyPoints": [
                "Preparare il progetto: un workspace pnpm: Backend e frontend sono due progetti diversi, ciascuno con il proprio package.json e le proprie dipendenze. Invece di tenerli in due cartell...",
                "Gli script: avviare backend e frontend: Nel package.json del backend controlla che ci sia \"type\": \"module\" , che permette di usare import , e aggiungi gli script start e dev . Il f...",
                "Due progetti, una comunicazione: Express è il backend : espone API e restituisce dati. React è il frontend : chiede quei dati e costruisce l'interfaccia che l'utente vede. A...",
                "L'API dei prodotti: I dati Al posto del database usiamo un file JavaScript con 1000 prodotti: scarica db-store-completo.js e salvalo in backend/data/ . Ogni pro...",
                "Chiedere i dati da React: Nel componente React usiamo useState per salvare i prodotti e useEffect per eseguire la richiesta quando il componente appare per la prima v...",
                "Mostrare i dati nell'interfaccia: Abbiamo già i dati nello stato. Usiamo map() per creare, per ogni prodotto, un titolo e un paragrafo con la descrizione. // frontend/src/App..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Express e React: API in locale",
                    "language": "text",
                    "code": "catalogo/\n├── package.json              ← script che avviano backend e frontend\n├── pnpm-workspace.yaml       ← elenca i progetti del workspace\n├── pnpm-lock.yaml            ← un solo lockfile per tutto il workspace\n├── backend/                  ← API Express (porta 3000)\n│   ├── package.json\n│   ├── server.js\n│   ├── routers/\n│   │   └── productsRouter.js\n│   └── data/\n│       └── db-store-completo.js\n└── frontend/                 ← React + Vite (porta 5173)\n    ├── package.json\n    └── src/\n        ├── main.jsx\n        └── App.jsx",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e React: API in locale."
                },
                {
                    "title": "Esempio di codice 2: Express e React: API in locale",
                    "language": "bash",
                    "code": "mkdir catalogo\ncd catalogo\npnpm init\n\nmkdir backend\ncd backend\npnpm init\ncd ..",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e React: API in locale."
                },
                {
                    "title": "Esempio di codice 3: Express e React: API in locale",
                    "language": "bash",
                    "code": "pnpm create vite frontend --template react",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e React: API in locale."
                },
                {
                    "title": "Esempio di codice 4: Express e React: API in locale",
                    "language": "javascript",
                    "code": "# catalogo/pnpm-workspace.yaml\npackages:\n  - backend\n  - frontend",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e React: API in locale."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Express e React: API in locale e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Express e React: API in locale?"
            ]
        },
        {
            "id": "express-react-post",
            "title": "Express e React: gestire gli errori e inviare dati con POST",
            "pdfReference": "lezioni/express-react-post.html",
            "summary": "Nella lezione precedente abbiamo creato il workspace catalogo , avviato con pnpm all:dev . Il backend risponde a GET /products con un oggetto di forma fissa: { \"success\": true, \"message\": \"\", \"data\": [ { \"id\": 1, \"name\": \"Mouse Opale Air 5\", \"descrizione\": \"...\", \"price\": 30.99 } ] } Il frontend lo ...",
            "keyPoints": [
                "Da dove partiamo: Nella lezione precedente abbiamo creato il workspace catalogo , avviato con pnpm all:dev . Il backend risponde a GET /products con un oggett...",
                "Gestire gli errori: Prova a spegnere il backend e ricarica la pagina: resta solo il titolo e nella Console compare un errore. L'utente non sa cosa sia successo....",
                "POST: la rotta Express: Per creare un prodotto, React invia una richiesta POST con i dati nel body. Perché Express possa leggerli in req.body serve il middleware ex...",
                "POST: la richiesta da React: Nel frontend il body deve essere trasformato in JSON e deve avere l'header Content-Type . Quando arriva la risposta aggiungiamo il nuovo pro...",
                "Ricaricare i prodotti: Esercizio Aggiungi un pulsante Ricarica prodotti . Al click deve richiedere di nuovo GET /products e aggiornare lo stato. Suggerimento: spos..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Express e React: gestire gli errori e inviare dati con POST",
                    "language": "json",
                    "code": "{\n  \"success\": true,\n  \"message\": \"\",\n  \"data\": [\n    { \"id\": 1, \"name\": \"Mouse Opale Air 5\", \"descrizione\": \"...\", \"price\": 30.99 }\n  ]\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e React: gestire gli errori e inviare dati con POST."
                },
                {
                    "title": "Esempio di codice 2: Express e React: gestire gli errori e inviare dati con POST",
                    "language": "jsx",
                    "code": "// frontend/src/App.jsx\nimport { useState, useEffect, Fragment } from 'react';\n\nconst API_URL = 'http://localhost:3000';\n\nfunction App() {\n  const [products, setProducts] = useState([]);\n\n  useEffect(() => {\n    fetch(`${API_URL}/products`)\n      .then((response) => response.json())\n      .then((jsonData) => setProducts(jsonData.data));\n  }, []);\n\n  return (\n    <>\n      <h1>My Store</h1>\n      {products.map((product) => (\n        <Fragment key={product.id}>\n          <h3>{product.name}</h3>\n          <p>{product.descrizione}</p>\n          <p>€ {product.price.toFixed(2)}</p>\n        </Fragment>\n      ))}\n    </>\n  );\n}\n\nexport default App;",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e React: gestire gli errori e inviare dati con POST."
                },
                {
                    "title": "Esempio di codice 3: Express e React: gestire gli errori e inviare dati con POST",
                    "language": "jsx",
                    "code": "const [error, setError] = useState('');\n\nuseEffect(() => {\n  fetch(`${API_URL}/products`)\n    .then((response) => {\n      if (!response.ok) {\n        throw new Error('Impossibile caricare i prodotti');\n      }\n      return response.json();\n    })\n    .then((jsonData) => setProducts(jsonData.data))\n    .catch((err) => setError(err.message));\n}, []);",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e React: gestire gli errori e inviare dati con POST."
                },
                {
                    "title": "Esempio di codice 4: Express e React: gestire gli errori e inviare dati con POST",
                    "language": "jsx",
                    "code": "{error && <p>{error}</p>}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e React: gestire gli errori e inviare dati con POST."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Express e React: gestire gli errori e inviare dati con POST e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Express e React: gestire gli errori e inviare dati con POST?"
            ]
        },
        {
            "id": "express-ai-integration",
            "title": "Express e Mistral: integrazione AI",
            "pdfReference": "lezioni/express-ai-integration.html",
            "summary": "La chiave API di Mistral deve restare nel backend . React o qualsiasi altro frontend invia il messaggio a Express; Express contatta Mistral e restituisce solo la risposta necessaria. Frontend │ POST /api/chat { message } ▼ Server Express │ usa MISTRAL_API_KEY ▼ API Mistral │ risposta del modello ▼ S...",
            "keyPoints": [
                "Il backend parla con l'AI: La chiave API di Mistral deve restare nel backend . React o qualsiasi altro frontend invia il messaggio a Express; Express contatta Mistral ...",
                "Salvare la chiave nel file .env: Non installiamo alcun package esterno. Node.js 18 o successivo include già fetch() . Mistral usa un formato compatibile con OpenAI Chat Comp...",
                "Creare un service compatibile con OpenAI: Un service raccoglie il codice che comunica con un servizio esterno. In questo modo server.js resta dedicato alle rotte, mentre services/mis...",
                "Creare la rotta Express: Importiamo il service e lo usiamo dentro la rotta POST /api/chat . Prima controlliamo che il client abbia inviato un messaggio; poi restitui...",
                "Avviare e testare l'API: Avvia Express con il comando seguente: pnpm dev Con Postman o LiteClient invia una richiesta alla rotta locale. POST http://localhost:3000/a..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Express e Mistral: integrazione AI",
                    "language": "text",
                    "code": "Frontend\n  │ POST /api/chat { message }\n  ▼\nServer Express\n  │ usa MISTRAL_API_KEY\n  ▼\nAPI Mistral\n  │ risposta del modello\n  ▼\nServer Express → Frontend",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e Mistral: integrazione AI."
                },
                {
                    "title": "Esempio di codice 2: Express e Mistral: integrazione AI",
                    "language": "bash",
                    "code": "MISTRAL_API_KEY=\"incolla-la-tua-chiave-qui\"\nMISTRAL_MODEL=\"mistral-small-latest\"",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e Mistral: integrazione AI."
                },
                {
                    "title": "Esempio di codice 3: Express e Mistral: integrazione AI",
                    "language": "json",
                    "code": "{\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"node --env-file=.env --watch server.js\"\n  }\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e Mistral: integrazione AI."
                },
                {
                    "title": "Esempio di codice 4: Express e Mistral: integrazione AI",
                    "language": "text",
                    "code": "express-ai/\n├── .env\n├── .gitignore\n├── services/\n│   └── mistral.js\n├── package.json\n└── server.js",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e Mistral: integrazione AI."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Express e Mistral: integrazione AI e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Express e Mistral: integrazione AI?"
            ]
        },
        {
            "id": "express-prisma-relazioni",
            "title": "Express e Prisma: query e API REST dello store",
            "pdfReference": "lezioni/express-prisma-relazioni.html",
            "summary": "Ogni query Prisma ha la stessa forma: client.<model>.<operazione>({ opzioni }) e ritorna una Promise . Cambiano il model e l'operazione, non la forma. Lavoriamo sullo schema completo costruito nella dispensa precedente, Prisma: tipi, annotazioni e relazioni : nove model, con Category , P...",
            "keyPoints": [
                "Il modello mentale delle query: Ogni query Prisma ha la stessa forma: client.<model>.<operazione>({ opzioni }) e ritorna una Promise . Cambiano il model e l'operazione, non...",
                "Leggere una riga e leggere liste: findUnique accetta solo campi @id o @unique ; findFirst accetta un filtro qualsiasi e usa orderBy per decidere chi è \"il primo\". // findUniq...",
                "I filtri: Più chiavi allo stesso livello di where sono in AND implicito; per un OR serve l'operatore esplicito OR . await client.product.findMany({ wh...",
                "Scrivere: Le operazioni di scrittura su una riga singola sono quattro, più upsert che le combina. Ogni violazione di vincolo diventa un codice Prisma ...",
                "Leggere le relazioni: include e select: Dentro include valgono le stesse opzioni di findMany ( where , orderBy , take ...): si può filtrare e ordinare anche la relazione, non solo ...",
                "Filtrare e scrivere attraverso le relazioni: Filtri per relazione : il where ragiona sulle righe collegate, non sulla riga principale. // some: ALMENO UN prodotto collegato è esaurito. ..."
            ],
            "examPitfalls": [
                "Ricordarsi di passare 'next(err)' o restituire una risposta nei middleware Express.",
                "Eseguire sempre 'npx prisma generate' dopo modifiche allo schema.prisma."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Express e Prisma: query e API REST dello store",
                    "language": "javascript",
                    "code": "const economici = await client.product.findMany({\n  where: { inStock: true },       // quali righe\n  orderBy: { price: \"asc\" },      // ordine\n  take: 5,                        // quantità\n  include: { category: true }     // relazioni\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e Prisma: query e API REST dello store."
                },
                {
                    "title": "Esempio di codice 2: Express e Prisma: query e API REST dello store",
                    "language": "javascript",
                    "code": "// findUnique: SOLO per @id o campi @unique.\nconst p1 = await client.product.findUnique({ where: { id: 1 } });\nconst c1 = await client.category.findUnique({ where: { name: \"Periferiche\" } });\n\n// findUniqueOrThrow: se non trova lancia P2025 (lo converte il middleware in 404).\nconst p2 = await client.product.findUniqueOrThrow({ where: { id: 1 } });\n\n// findFirst: il primo che matcha un filtro qualsiasi (orderBy dice \"primo\" in che senso).\nconst p3 = await client.product.findFirst({\n  where: { inStock: true },\n  orderBy: { price: \"asc\" }        // il più economico disponibile\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e Prisma: query e API REST dello store."
                },
                {
                    "title": "Esempio di codice 3: Express e Prisma: query e API REST dello store",
                    "language": "javascript",
                    "code": "const page = await client.product.findMany({\n  where: { inStock: true },\n  orderBy: [{ price: \"desc\" }, { name: \"asc\" }],   // ordinamento multiplo\n  skip: 0,\n  take: 10\n});\n\nconst total = await client.product.count({ where: { inStock: true } });",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e Prisma: query e API REST dello store."
                },
                {
                    "title": "Esempio di codice 4: Express e Prisma: query e API REST dello store",
                    "language": "javascript",
                    "code": "await client.product.findMany({\n  where: {\n    name: { contains: \"mouse\" },           // LIKE '%mouse%' (MySQL è già case-insensitive)\n    price: { gte: \"20.00\", lte: \"100.00\" }, // range: Decimal come STRINGA\n    categoryId: { in: [1, 2] },\n    description: { not: null },            // chi HA la descrizione\n    inStock: { not: false },\n\n    // Più chiave alla radice = AND implicito. Per OR:\n    OR: [{ name: { startsWith: \"Monitor\" } }, { categoryId: 2 }]\n  }\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Express e Prisma: query e API REST dello store."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Express e Prisma: query e API REST dello store e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Express e Prisma: query e API REST dello store?"
            ]
        }
    ],
    "totalLessons": 13
},

  ai: {
    "moduleId": "ai",
    "moduleName": "AI Engineering & LangChain",
    "description": "Sviluppo di agenti intelligenti, creazione di AI Skills, integrazione LLM con LangChain LCEL, Structured Outputs, prompt engineering e workflow multi-agente.",
    "lessons": [
        {
            "id": "skill-ai",
            "title": "Creare skill per AI",
            "pdfReference": "lezioni/skill.html",
            "summary": "Una skill è una cartella che contiene un metodo riutilizzabile: istruzioni, regole e file di supporto per un compito preciso. Un prompt descrive ciò che vogliamo ottenere in una singola conversazione. Una skill, invece, conserva il modo corretto di affrontare un lavoro che si ripete: per esempio pre...",
            "keyPoints": [
                "A che cosa servono: Una skill è una cartella che contiene un metodo riutilizzabile: istruzioni, regole e file di supporto per un compito preciso. Un prompt desc...",
                "Skill in Vibe: Mistral Vibe segue lo standard Agent Skills: una skill è una directory con un file obbligatorio chiamato SKILL.md . Per Vibe Code, le skill ...",
                "Come sono composte: Il primo file è sempre SKILL.md . Inizia con il frontmatter YAML , cioè i metadati che Vibe legge per riconoscere e presentare la skill. Dop...",
                "Come crearle: Si inizia da un caso reale. Prima di scrivere file, individua un'attività che richiede sempre gli stessi passaggi, le stesse regole o gli st...",
                "Skill complesse: Quando una competenza contiene più sottocompetenze, SKILL.md non deve trasformarsi in un testo infinito. Può restare la porta d'ingresso e u..."
            ],
            "examPitfalls": [
                "Assicurarsi che gli schemi Zod per withStructuredOutput contengano descrizioni chiare per il modello.",
                "Gestire sempre i casi di token limit o rate limit sulle chiamate API."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: Creare skill per AI",
                    "language": "text",
                    "code": ".vibe/\n└── skills/\n    └── nome-skill/\n        └── SKILL.md",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Creare skill per AI."
                },
                {
                    "title": "Esempio di codice 2: Creare skill per AI",
                    "language": "javascript",
                    "code": "---\nname: api-summary\ndescription: Usare quando occorre leggere una risposta API e produrre una sintesi breve con errori e dati principali.\nuser-invocable: true\nallowed-tools:\n  - read_file\n  - grep\n---\n\n# API summary\n\n1. Leggere la risposta e identificare i dati importanti.\n2. Segnalare gli errori o i campi mancanti.\n3. Restituire una sintesi nel formato richiesto.",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Creare skill per AI."
                },
                {
                    "title": "Esempio di codice 3: Creare skill per AI",
                    "language": "text",
                    "code": ".vibe/skills/\n└── changelog-git/\n    └── SKILL.md",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Creare skill per AI."
                },
                {
                    "title": "Esempio di codice 4: Creare skill per AI",
                    "language": "text",
                    "code": ".vibe/skills/\n└── brand-system/\n    ├── SKILL.md\n    ├── index.md\n    └── references/\n        ├── tono-di-voce.md\n        ├── colori.md\n        └── componenti.md",
                    "explanation": "Implementazione pratica illustrata nella dispensa per Creare skill per AI."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in Creare skill per AI e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con Creare skill per AI?"
            ]
        },
        {
            "id": "langchain-prima-parte",
            "title": "LangChain: modelli, storico della chat e primo agente",
            "pdfReference": "lezioni/langchain-prima-parte.html",
            "summary": "Creiamo una cartella dedicata agli esempi della lezione. # Creiamo una nuova cartella per il progetto. mkdir langchain-prima-parte # Entriamo nella cartella del progetto. cd langchain-prima-parte # Creiamo il file package.json iniziale. pnpm init Apriamo package.json e modifichiamolo in questo modo....",
            "keyPoints": [
                "Creazione del progetto: Creiamo una cartella dedicata agli esempi della lezione. # Creiamo una nuova cartella per il progetto. mkdir langchain-prima-parte # Entriam...",
                "Installazione delle librerie: Installiamo le librerie che ci serviranno. # Installiamo LangChain: contiene modelli, messaggi, tool e agenti. pnpm add langchain # Installi...",
                "Configurazione della chiave API: Per comunicare con Anthropic serve una chiave API. Creiamo un file chiamato .env nella cartella principale del progetto. # Chiave API usata ...",
                "Hello World con LangChain: Un chat model riceve messaggi e genera messaggi di risposta. Con LangChain useremo ChatAnthropic per creare un modello collegato ad Anthropi...",
                "LLM stateless e storico dei messaggi: Un LLM è stateless . Questo significa che una chiamata a model.invoke() non conserva automaticamente ciò che è accaduto nella chiamata prece...",
                "Gestire lo storico della chat: Per permettere al modello di conoscere i messaggi precedenti, dobbiamo conservare manualmente lo storico della conversazione. Lo storico sar..."
            ],
            "examPitfalls": [
                "Assicurarsi che gli schemi Zod per withStructuredOutput contengano descrizioni chiare per il modello.",
                "Gestire sempre i casi di token limit o rate limit sulle chiamate API."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: LangChain: modelli, storico della chat e primo agente",
                    "language": "bash",
                    "code": "# Creiamo una nuova cartella per il progetto.\nmkdir langchain-prima-parte\n\n# Entriamo nella cartella del progetto.\ncd langchain-prima-parte\n\n# Creiamo il file package.json iniziale.\npnpm init",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LangChain: modelli, storico della chat e primo agente."
                },
                {
                    "title": "Esempio di codice 2: LangChain: modelli, storico della chat e primo agente",
                    "language": "json",
                    "code": "{\n    \"name\": \"langchain-prima-parte\",\n    \"version\": \"1.0.0\",\n    \"private\": true,\n    \"type\": \"module\",\n    \"scripts\": {\n        \"dev\": \"node --watch index.js\",\n        \"start\": \"node index.js\"\n    }\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LangChain: modelli, storico della chat e primo agente."
                },
                {
                    "title": "Esempio di codice 3: LangChain: modelli, storico della chat e primo agente",
                    "language": "bash",
                    "code": "# Installiamo LangChain: contiene modelli, messaggi, tool e agenti.\npnpm add langchain\n\n# Installiamo l'adapter che permette a LangChain di comunicare con Anthropic.\npnpm add @langchain/anthropic\n\n# Installiamo Zod, utile per descrivere e validare gli input dei tool.\npnpm add zod\n\n# Installiamo dotenv, che carica le variabili del file .env.\npnpm add dotenv",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LangChain: modelli, storico della chat e primo agente."
                },
                {
                    "title": "Esempio di codice 4: LangChain: modelli, storico della chat e primo agente",
                    "language": "javascript",
                    "code": "# Chiave API usata per autenticare le richieste verso Anthropic.\nANTHROPIC_API_KEY=la_tua_chiave_api_qui",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LangChain: modelli, storico della chat e primo agente."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in LangChain: modelli, storico della chat e primo agente e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con LangChain: modelli, storico della chat e primo agente?"
            ]
        },
        {
            "id": "langchain-seconda-parte",
            "title": "LangChain: output strutturato, agenti multipli ed Express",
            "pdfReference": "lezioni/langchain-seconda-parte.html",
            "summary": "Un agente non chiama un tool a caso: quando gli serve un'informazione che non ha, si ferma, chiama il tool giusto e riprende a ragionare con il risultato in mano. Nella prima parte abbiamo creato il tool get_weather e lo abbiamo collegato a un agente con createAgent() . Il modello legge la descripti...",
            "keyPoints": [
                "Le chiamate a tool: come funziona il ciclo: Un agente non chiama un tool a caso: quando gli serve un'informazione che non ha, si ferma, chiama il tool giusto e riprende a ragionare con...",
                "Lo schema Zod: cosa descrive e dove si usa: Zod descrive la forma dei dati. In LangChain si usa in due punti diversi: nello schema di un tool (i parametri in input) e nel responseForma...",
                "Costruire un agente con createAgent: createAgent mette insieme tre ingredienti: un modello , uno o più tool e, facoltativamente, un systemPrompt che definisce il comportamento d...",
                "Output strutturato con responseFormat: Quando imposti responseFormat su un agente, la sua risposta finale deve avere quella forma. Il modello farà di tutto per soddisfare lo schem...",
                "Più agenti con personalità diverse: Psy, Psyco e Mediator: Stesso modello, systemPrompt diversi: bastano per ottenere punti di vista opposti sulla stessa domanda. Un terzo agente può poi leggere entr...",
                "Organizzare il progetto: models/, agents/, tools/: Separare modelli, agenti e tool in cartelle dedicate rende il codice più facile da estendere man mano che il progetto cresce. Con più agenti..."
            ],
            "examPitfalls": [
                "Assicurarsi che gli schemi Zod per withStructuredOutput contengano descrizioni chiare per il modello.",
                "Gestire sempre i casi di token limit o rate limit sulle chiamate API."
            ],
            "codeSnippets": [
                {
                    "title": "Esempio di codice 1: LangChain: output strutturato, agenti multipli ed Express",
                    "language": "javascript",
                    "code": "import { tool } from \"langchain\";\nimport { z } from 'zod';\n\nconst schema = z.object({\n    city: z.string().describe('La città di cui vuoi le informazioni'),\n    unit: z.string().describe(\"L'unità di misura con cui vuoi che sia espresso il risultato\")\n});\n\nconst toolFunction = async ({ city, unit }) => {\n    // Il valore restituito dal tool DEVE essere sempre una stringa\n    return `Il tempo a ${city} è costantemente a 28 ${unit}`;\n}\n\nconst getWeather = tool(toolFunction, {\n    name: \"get_weather\",\n    description: \"Questo tool serve quando hai bisogno di informazioni sul meteo\",\n    schema\n});\n\nexport { getWeather };",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LangChain: output strutturato, agenti multipli ed Express."
                },
                {
                    "title": "Esempio di codice 2: LangChain: output strutturato, agenti multipli ed Express",
                    "language": "javascript",
                    "code": "const toolFunction = async ({ city, unit }) => {\n    return `Il tempo a ${city} è costantemente a 28 ${unit}. Domani: pioggia debole.`;\n}",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LangChain: output strutturato, agenti multipli ed Express."
                },
                {
                    "title": "Esempio di codice 3: LangChain: output strutturato, agenti multipli ed Express",
                    "language": "javascript",
                    "code": "const schema = z.object({\n    id: z.number().describe(\"l'ID del prodotto di cui vuoi informazioni\")\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LangChain: output strutturato, agenti multipli ed Express."
                },
                {
                    "title": "Esempio di codice 4: LangChain: output strutturato, agenti multipli ed Express",
                    "language": "javascript",
                    "code": "const schema = z.object({\n    nameSearch: z.string().describe(\"il nome del prodotto da cercare\")\n});",
                    "explanation": "Implementazione pratica illustrata nella dispensa per LangChain: output strutturato, agenti multipli ed Express."
                }
            ],
            "examQuestions": [
                "Spiega i concetti fondamentali trattati in LangChain: output strutturato, agenti multipli ed Express e come applicarli in un progetto reale.",
                "Quali sono le differenze pratiche ed errori da evitare quando si lavora con LangChain: output strutturato, agenti multipli ed Express?"
            ]
        }
    ],
    "totalLessons": 3
}
};

/**
 * Helper per ottenere tutte le lezioni piatte.
 */
export function getAllDispenseLessons() {
  return Object.values(DISPENSE_KNOWLEDGE_BASE).flatMap(m => m.lessons);
}

/**
 * Ricerca semantica basata su token scoring su tutta la Knowledge Base.
 */
export function findRelevantLessons(query, maxResults = 3) {
  if (!query || typeof query !== "string") return [];
  
  const tokens = query.toLowerCase()
    .replace(/[^a-zA-Z0-9\u00C0-\u017F]+/g, " ")
    .split(/\s+/)
    .filter(t => t.length > 2);
    
  if (tokens.length === 0) return [];

  const allLessons = getAllDispenseLessons();
  const scored = allLessons.map(lesson => {
    let score = 0;
    const titleLower = lesson.title.toLowerCase();
    const summaryLower = lesson.summary.toLowerCase();
    const keyPointsStr = lesson.keyPoints.join(" ").toLowerCase();

    tokens.forEach(tok => {
      if (titleLower.includes(tok)) score += 10;
      if (summaryLower.includes(tok)) score += 4;
      if (keyPointsStr.includes(tok)) score += 3;
      lesson.examPitfalls.forEach(p => {
        if (p.toLowerCase().includes(tok)) score += 2;
      });
    });

    return { lesson, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.lesson);
}

/**
 * Ricerca di compatibilità per singolo argomento / parola chiave.
 */
export function findTopicByKeyword(query) {
  const relevant = findRelevantLessons(query, 1);
  if (relevant.length > 0) {
    const lesson = relevant[0];
    const mod = Object.values(DISPENSE_KNOWLEDGE_BASE).find(m => 
      m.lessons.some(l => l.id === lesson.id)
    );
    return {
      module: mod || DISPENSE_KNOWLEDGE_BASE.javascript,
      lesson
    };
  }
  return null;
}

export function findDispensaByTopic(topicId) {
  return DISPENSE_KNOWLEDGE_BASE[topicId] || null;
}

/**
 * Costruisce il contesto formattato delle dispense per il grounding del prompt LangChain.
 */
export function buildDispenseKnowledgeContext(subjectFilter = null, userQuery = null) {
  let lessons = [];
  if (userQuery) {
    lessons = findRelevantLessons(userQuery, 3);
  }
  if (lessons.length === 0) {
    if (subjectFilter && DISPENSE_KNOWLEDGE_BASE[subjectFilter]) {
      lessons = DISPENSE_KNOWLEDGE_BASE[subjectFilter].lessons.slice(0, 4);
    } else {
      lessons = getAllDispenseLessons().slice(0, 4);
    }
  }

  return lessons.map(l => `
[DISPENSA REF: ${l.pdfReference}]
TITOLO: ${l.title}
SOMMARIO: ${l.summary}
PUNTI CHIAVE:
${l.keyPoints.map(p => `- ${p}`).join('\n')}
ERRORI / TRABOCCHETTI TIPICI:
${l.examPitfalls.map(p => `- ${p}`).join('\n')}
SNIPPET DIDATTICI:
${(l.codeSnippets || []).map(s => `// ${s.title} (${s.language})\n${s.code}`).join('\n\n')}
`).join('\n---\n');
}
