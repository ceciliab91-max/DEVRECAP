# Props

**Argomento:** React | **Data Lezione:** 2026-07-04 | **File Sorgente:** lezioni/react-props.html

## Panoramica
Le props sono valori passati da un componente a un altro. Servono per rendere un componente riutilizzabile, perché la struttura resta uguale ma i dati possono cambiare. In pratica, un componente riceve informazioni dall'esterno e le usa dentro il JSX per mostrare contenuti diversi. Quando un compone...

### Cosa sono le props
Le props sono valori passati da un componente a un altro. Servono per rendere un componente riutilizzabile, perché la struttura resta uguale ma i dati possono cambiare. In pratica, un componente riceve informazioni dall'esterno e le usa dentro il JSX per mostrare contenuti diversi. Quando un componente viene usato, si possono aggiungere attributi simili a quelli HTML. In React questi attributi diventano props, cioè dati disponibili dentro il componente. Questo permette di creare componenti generici, utili in più situazioni, senza riscrivere ogni volta lo stesso codice. Le props vengono raccolte in un oggetto. Se un componente riceve una prop chiamata title , il suo valore può essere letto con props.title . In questo modo il componente separa la struttura dai dati che deve mostrare. esempio function Card(props) { return ( <div> <h2>{props.title}</h2> <p>{props.text}</p> </div> ); } function App() { return ( <Card title="Benvenuto" text="Questo contenuto arriva dalle props" /> ); } esercizio Crea un componente Profile che riceve le props name e job e le mostra in due righe diverse. Mostra soluzione function Profile(props) { return ( <div> <p>Nome: {props.name}</p> <p>Ruolo: {props.job}</p> </div> ); } function App() { return <Profile name="Laura" job="Designer" />; }

### Usare le props con map
map() permette di trasformare ogni elemento di un array in un nuovo elemento JSX. Spesso viene usato per creare una lista di componenti. Ogni componente generato con map() può ricevere props diverse, in base ai dati presenti nell'array. Quando si lavora con una lista di dati, non si scrive ogni elemento a mano. Si prepara un array e si usa map() per ciclare ogni valore. Durante questo passaggio si può creare un componente e passargli le informazioni necessarie tramite props. In questo modo dati e struttura restano ordinati. Questo approccio è utile perché separa il componente che rappresenta un singolo elemento dalla logica che costruisce tutta la lista. Ogni elemento può ricevere una prop diversa, ad esempio un nome, un prezzo o un titolo. esempio function Product(props) { return <li>{props.name}</li>; } function App() { const products = ["Pane", "Latte", "Pasta"]; return ( <ul> {products.map((product, index) => ( <Product key={index} name={product} /> ))} </ul> ); } esercizio Crea un componente Student che riceve una prop name . Poi usa map() su un array di nomi per mostrare una lista di studenti. Mostra soluzione function Student(props) { return <li>{props.name}</li>; } function App() { const students = ["Anna", "Marco", "Giulia"]; return ( <ul> {students.map((student, index) => ( <Student key={index} name={student} /> ))} </ul> ); }

### Conditional Rendering in JSX
Il conditional rendering permette di mostrare un contenuto oppure un altro in base a una condizione. In React questa scelta viene fatta direttamente dentro il JSX. Serve quando un'interfaccia non deve essere sempre uguale, ma deve cambiare in base ai dati disponibili o a una situazione precisa. Renderizzare significa mostrare un contenuto a schermo. Il conditional rendering, quindi, è il rendering condizionale: un elemento viene mostrato solo se una condizione è vera, altrimenti ne viene mostrato un altro oppure non viene mostrato nulla. Questo concetto si collega agli if già conosciuti, ma in JSX si applica dentro il codice che costruisce l'interfaccia. Per i casi semplici si usa spesso l'operatore ternario, che permette di scegliere tra due risultati. È utile quando si vuole cambiare un testo, un messaggio o un blocco di contenuto in modo diretto e leggibile. esempio function App() { const isLogged = true; return ( <div> {isLogged ? <p>Accesso effettuato</p> : <p>Accesso non effettuato</p>} </div> ); } esercizio Crea una variabile isOpen . Se vale true , mostra il testo Negozio aperto ; altrimenti mostra Negozio chiuso . Mostra soluzione function App() { const isOpen = false; return ( <div> {isOpen ? <p>Negozio aperto</p> : <p>Negozio chiuso</p>} </div> ); }

### Short-Circuiting con gli operatori && e ||
Lo short-circuiting è una tecnica basata sugli operatori logici && e || , usata per decidere cosa mostrare in JSX senza scrivere un ternario completo. Con && si mostra un contenuto solo se una condizione è vera. Con || si mostra un valore di riserva quando il primo valore è falso, assente o vuoto. L'operatore && valuta due valori: se il primo è falso, il risultato è quel valore falso e il secondo non viene nemmeno considerato; se il primo è vero, il risultato è il secondo valore. In JSX questo comportamento si usa per mostrare un elemento solo quando una condizione è vera, evitando di scrivere un ternario con un'alternativa vuota. L'operatore || funziona in modo opposto: se il primo valore è vero, il risultato è quel valore e il secondo non viene considerato; se il primo valore è falso, assente o vuoto, il risultato è il secondo valore. In JSX questo è utile per mostrare un testo o un componente predefinito quando manca un dato specifico. Rispetto all'operatore ternario visto per il conditional rendering, lo short-circuiting è più adatto quando esiste solo un caso da mostrare, oppure quando serve un valore di riserva senza dover scrivere due alternative complete. esempio function App() { const hasNotification = true; return ( <div> {hasNotification && <p>Hai una nuova notifica</p>} </div> ); } esempio Lo short-circuiting con && si può usare anche per decidere se mostrare o meno un componente, non solo un testo semplice. function Badge(props) { return <span>{props.text}</span>; } function App() { const isPromo = true; return ( <div> <h2>Prodotto</h2> {isPromo && <Badge text="In promozione" />} </div> ); } In questo caso il componente Badge viene mostrato solo quando isPromo è true . Se il valore fosse false , il componente non verrebbe renderizzato affatto. esercizio Crea una variabile isAdmin . Se è true , mostra il testo Pannello amministratore usando lo short-circuiting con && . Poi crea una variabile username vuota e mostra con || il testo Ospite se username non è impostato. Mostra soluzione function App() { const isAdmin = true; const username = ""; return ( <div> {isAdmin && <p>Pannello amministratore</p>} <p>{username || "Ospite"}</p> </div> ); }

### La prop children
children è una prop speciale di React. Contiene tutto quello che viene scritto tra il tag di apertura e il tag di chiusura di un componente. Serve quando un componente deve fare da contenitore e mostrare al suo interno contenuti scelti ogni volta in modo diverso. Non sempre conviene passare tutto come props separate. In molti casi è più comodo creare un componente che avvolge altri elementi. Quando si scrive contenuto dentro quel componente, React lo inserisce in props.children . Questo è utile per box, card, sezioni o blocchi che devono contenere testo o altri elementi JSX. La differenza principale è questa: una prop normale passa un valore con un nome preciso, mentre children raccoglie il contenuto interno del componente. Così il componente può mantenere una struttura fissa ma accettare contenuti flessibili. esempio function Box(props) { return ( <div> {props.children} </div> ); } function App() { return ( <Box> <h2>Titolo interno</h2> <p>Questo testo passa tramite children.</p> </Box> ); } esercizio Crea un componente Panel che mostra al suo interno props.children . Poi usalo con un titolo e un paragrafo scritti tra i tag del componente. Mostra soluzione function Panel(props) { return ( <section> {props.children} </section> ); } function App() { return ( <Panel> <h2>Area avvisi</h2> <p>Domani il laboratorio inizia alle 9:00.</p> </Panel> ); }

```jsx
function Card(props) {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
        </div>
    );
}

function App() {
    return (
        <Card
            title="Benvenuto"
            text="Questo contenuto arriva dalle props"
        />
    );
}
```

```jsx
function Profile(props) {
    return (
        <div>
            <p>Nome: {props.name}</p>
            <p>Ruolo: {props.job}</p>
        </div>
    );
}

function App() {
    return <Profile name="Laura" job="Designer" />;
}
```

```jsx
function Product(props) {
    return <li>{props.name}</li>;
}

function App() {
    const products = ["Pane", "Latte", "Pasta"];

    return (
        <ul>
            {products.map((product, index) => (
                <Product key={index} name={product} />
            ))}
        </ul>
    );
}
```

```jsx
function Student(props) {
    return <li>{props.name}</li>;
}

function App() {
    const students = ["Anna", "Marco", "Giulia"];

    return (
        <ul>
            {students.map((student, index) => (
                <Student key={index} name={student} />
            ))}
        </ul>
    );
}
```

```jsx
function App() {
    const isLogged = true;

    return (
        <div>
            {isLogged ? <p>Accesso effettuato</p> : <p>Accesso non effettuato</p>}
        </div>
    );
}
```
