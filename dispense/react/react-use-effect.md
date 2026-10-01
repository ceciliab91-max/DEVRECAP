# useEffect

**Argomento:** React | **Data Lezione:** 2026-07-13 | **File Sorgente:** lezioni/react-use-effect.html

## Panoramica
useEffect è un Hook di React che serve per eseguire del codice dopo il rendering del componente. Si usa quando il componente deve fare qualcosa oltre a mostrare il JSX, per esempio scrivere in console, avviare un timer o caricare dati. Quando un componente React viene renderizzato, il suo compito pr...

### Che cos'è useEffect
useEffect è un Hook di React che serve per eseguire del codice dopo il rendering del componente. Si usa quando il componente deve fare qualcosa oltre a mostrare il JSX, per esempio scrivere in console, avviare un timer o caricare dati. Quando un componente React viene renderizzato, il suo compito principale è costruire l'interfaccia. A volte, però, serve anche eseguire un'azione collegata al componente ma separata dal JSX. Questo tipo di azione viene chiamato effetto. useEffect permette di scrivere questi effetti in un punto preciso del componente. In questo modo si separa meglio la parte che mostra contenuti dalla parte che esegue operazioni aggiuntive. La forma più semplice di useEffect usa una funzione e un array vuoto. In questo caso l'effetto parte una sola volta, subito dopo il primo render del componente. esempio import { useEffect } from "react"; function App() { useEffect(() => { console.log("Componente caricato"); }, []); return &lt;h1&gt;Homepage&lt;/h1&gt;; } esercizio Scrivi un componente che usa useEffect per stampare in console il messaggio Pagina pronta una sola volta. Mostra soluzione import { useEffect } from "react"; function App() { useEffect(() => { console.log("Pagina pronta"); }, []); return &lt;h1&gt;Benvenuto&lt;/h1&gt;; }

### L'array delle dipendenze
Il secondo argomento di useEffect è l'array delle dipendenze. Serve per dire a React quando rieseguire l'effetto. Se una dipendenza cambia, React esegue di nuovo l'effetto dopo il nuovo render. L'array delle dipendenze controlla il comportamento dell'effetto. Se l'array è vuoto, l'effetto parte solo all'inizio. Se dentro l'array c'è una variabile, l'effetto parte all'inizio e poi ogni volta che quella variabile cambia. Questo è utile quando un effetto dipende da uno state o da una prop. Per esempio, se un componente deve reagire al cambiamento di un contatore, si inserisce quel contatore nell'array delle dipendenze. Capire bene questa parte è importante, perché useEffect non va usato in modo casuale. L'idea è collegare l'effetto ai dati che lo fanno cambiare. esempio import { useEffect, useState } from "react"; function App() { const [count, setCount] = useState(0); useEffect(() => { console.log("Il valore di count è cambiato:", count); }, [count]); return ( &lt;div&gt; &lt;p&gt;{count}&lt;/p&gt; &lt;button onClick={() => setCount(count + 1)}&gt;Aumenta&lt;/button&gt; &lt;/div&gt; ); } esercizio Crea uno state chiamato name e fai partire un useEffect ogni volta che il suo valore cambia. Mostra soluzione import { useEffect, useState } from "react"; function App() { const [name, setName] = useState(""); useEffect(() => { console.log("Nome aggiornato:", name); }, [name]); return ( &lt;input type="text" value={name} onChange={(event) => setName(event.target.value)} /&gt; ); }

### Il return dentro useEffect
Il return dentro useEffect serve per restituire una funzione di pulizia, chiamata cleanup. Questa funzione viene eseguita prima che il componente si smonti oppure prima che l'effetto venga eseguito di nuovo. Questo passaggio è fondamentale quando l'effetto avvia qualcosa che deve essere fermato in seguito. Per esempio, un timer, un listener o una richiesta HTTP possono continuare a lavorare anche quando il componente non c'è più. Se non si pulisce il tutto, si rischiano comportamenti sbagliati, aggiornamenti inutili o errori. Il return di useEffect non restituisce quindi JSX: restituisce una funzione che React userà per fare ordine. La funzione di cleanup è molto utile anche con le richieste asincrone. In quel caso si può fermare la richiesta con AbortController oppure evitare di aggiornare lo state quando il componente non è più attivo. esempio import { useEffect } from "react"; function App() { useEffect(() => { const id = setInterval(() => { console.log("Timer attivo"); }, 1000); return () => { clearInterval(id); }; }, []); return &lt;p&gt;Timer avviato&lt;/p&gt;; } esercizio Scrivi un useEffect che avvia un setInterval() e lo ferma con clearInterval() nel return . Mostra soluzione import { useEffect } from "react"; function App() { useEffect(() => { const id = setInterval(() => { console.log("Sto contando"); }, 1000); return () => { clearInterval(id); }; }, []); return &lt;p&gt;Contatore attivo&lt;/p&gt;; }

### useEffect con timer
useEffect si usa spesso con setInterval() o setTimeout() per avviare timer collegati al componente. Quando il timer non serve più, è importante fermarlo con una funzione di pulizia nel return . Un timer continua a lavorare anche dopo essere stato avviato. Se il componente sparisce oppure l'effetto viene eseguito di nuovo, il timer precedente può restare attivo e creare comportamenti sbagliati. Per questo useEffect può restituire una funzione finale. Questa funzione viene usata per ripulire ciò che era stato avviato dall'effetto, per esempio un intervallo. Questo meccanismo è molto importante non solo per i timer, ma anche per altri casi in cui il componente apre una connessione o registra un listener. esempio import { useEffect, useState } from "react"; function App() { const [seconds, setSeconds] = useState(0); useEffect(() => { const intervalId = setInterval(() => { setSeconds((currentValue) => currentValue + 1); }, 1000); return () => { clearInterval(intervalId); }; }, []); return &lt;p&gt;Secondi: {seconds}&lt;/p&gt;; } esercizio Crea un componente con uno state time che aumenta di 1 ogni secondo usando setInterval() dentro useEffect . Aggiungi anche la pulizia con clearInterval() . Mostra soluzione import { useEffect, useState } from "react"; function App() { const [time, setTime] = useState(0); useEffect(() => { const intervalId = setInterval(() => { setTime((currentValue) => currentValue + 1); }, 1000); return () => { clearInterval(intervalId); }; }, []); return &lt;p&gt;Tempo: {time}&lt;/p&gt;; }

### useEffect e richieste HTTP con fetch
Quando un componente deve recuperare dati da un server, spesso si usa fetch() dentro useEffect . Durante l'attesa della risposta si può usare uno state di caricamento per mostrare un loader o un messaggio temporaneo. Una richiesta HTTP serve per comunicare con un server e ricevere dati. In React questa operazione viene spesso eseguita come effetto, perché deve partire dopo il render iniziale del componente. Il metodo fetch() invia la richiesta e restituisce una Promise. Quando la risposta arriva, di solito viene trasformata in JSON con response.json() e poi salvata nello state. In questa situazione è utile aggiungere anche uno state come loading . Questo valore permette di distinguere il momento in cui i dati non sono ancora arrivati dal momento in cui il contenuto è pronto per essere mostrato. esempio import { useEffect, useState } from "react"; function App() { const [users, setUsers] = useState([]); const [loading, setLoading] = useState(true); useEffect(() => { fetch("https://jsonplaceholder.typicode.com/users") .then((response) => response.json()) .then((data) => { setUsers(data); setLoading(false); }); }, []); return ( &lt;div&gt; {loading ? ( &lt;p&gt;Caricamento in corso...&lt;/p&gt; ) : ( &lt;ul&gt; {users.map((user) => ( &lt;li key={user.id}&gt;{user.name}&lt;/li&gt; ))} &lt;/ul&gt; )} &lt;/div&gt; ); } esercizio Recupera una lista di post con fetch() , usa uno state loading per mostrare il testo Caricamento... e poi stampa il titolo di ogni post in una lista. Mostra soluzione import { useEffect, useState } from "react"; function App() { const [posts, setPosts] = useState([]); const [loading, setLoading] = useState(true); useEffect(() => { fetch("https://jsonplaceholder.typicode.com/posts") .then((response) => response.json()) .then((data) => { setPosts(data); setLoading(false); }); }, []); return ( &lt;div&gt; {loading ? ( &lt;p&gt;Caricamento...&lt;/p&gt; ) : ( &lt;ul&gt; {posts.map((post) => ( &lt;li key={post.id}&gt;{post.title}&lt;/li&gt; ))} &lt;/ul&gt; )} &lt;/div&gt; ); }

```jsx
import { useEffect } from "react";

function App() {
    useEffect(() => {
        console.log("Componente caricato");
    }, []);

    return <h1>Homepage</h1>;
}
```

```jsx
import { useEffect } from "react";

function App() {
    useEffect(() => {
        console.log("Pagina pronta");
    }, []);

    return <h1>Benvenuto</h1>;
}
```

```jsx
import { useEffect, useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Il valore di count è cambiato:", count);
    }, [count]);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>Aumenta</button>
        </div>
    );
}
```

```jsx
import { useEffect, useState } from "react";

function App() {
    const [name, setName] = useState("");

    useEffect(() => {
        console.log("Nome aggiornato:", name);
    }, [name]);

    return (
        <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
        />
    );
}
```

```jsx
import { useEffect } from "react";

function App() {
    useEffect(() => {
        const id = setInterval(() => {
            console.log("Timer attivo");
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

    return <p>Timer avviato</p>;
}
```
