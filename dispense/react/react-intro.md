# Introduzione a React

**Argomento:** React | **Data Lezione:** 2026-07-02 | **File Sorgente:** lezioni/react-intro.html

## Panoramica
React è una libreria JavaScript pensata per costruire interfacce utente, cioè tutto ciò che l'utente vede e con cui interagisce in una pagina web. React nasce per rendere più semplice la costruzione di interfacce complesse, soprattutto quando la pagina deve cambiare spesso in base ai dati. Senza uno...

### Il problema che React risolve
React è una libreria JavaScript pensata per costruire interfacce utente, cioè tutto ciò che l'utente vede e con cui interagisce in una pagina web. React nasce per rendere più semplice la costruzione di interfacce complesse, soprattutto quando la pagina deve cambiare spesso in base ai dati. Senza uno strumento come React, aggiornare tanti elementi a mano nel DOM diventa ripetitivo, fragile e difficile da mantenere. Con React l'interfaccia viene costruita come insieme di componenti, cioè blocchi riutilizzabili che descrivono una parte della pagina. Questo aiuta a separare meglio la struttura visiva dalla logica e riduce la quantità di codice duplicato. React è utile per gestire il layout in componenti più piccoli e per riusarli più volte con dati diversi. Questo aiuta a semplificare la manutenzione del codice e a ridurre il rischio di errori.

### Vite: lo strumento per creare progetti React
Vite è uno strumento che prepara automaticamente tutta la struttura di file e configurazioni necessarie per far funzionare un progetto React, senza doverla scrivere a mano. Scrivere un progetto React da zero richiederebbe di configurare manualmente molti file, come quelli che gestiscono la traduzione del JSX in JavaScript puro o l'aggiornamento automatico della pagina durante lo sviluppo. Vite si occupa di tutto questo lavoro iniziale, così ci si può concentrare direttamente sulla scrittura dei componenti. Un altro motivo per cui si usa Vite è la velocità: quando si modifica un file del progetto, Vite aggiorna la pagina nel browser in pochissimo tempo, senza dover ricaricare tutto da capo. Questo rende molto più comodo lavorare mentre si scrive codice React. Vite si avvia tramite un comando che lancia un wizard, cioè una piccola procedura guidata che fa qualche domanda su come impostare il progetto, prima di generare i file necessari.

### Installare React con pnpm o npm
pnpm e npm sono entrambi package manager, cioè programmi che scaricano e gestiscono le librerie del progetto. Il risultato finale del progetto React è identico: cambia solo il comando da digitare nel terminale. La differenza principale è che pnpm salva i pacchetti una sola volta sul disco e li collega ai progetti, mentre npm li copia interamente in ogni progetto. Per questo pnpm è generalmente più rapido e occupa meno spazio, ma il codice React che si scrive non cambia in base alla scelta. Per creare un nuovo progetto, basta aprire il terminale nel percorso dove si vuole lavorare ed avviare il comando pnpm create vite e rispondere alle domande del wizard che compare nel terminale. Esempio # Con pnpm pnpm create vite # Con npm npm create vite@latest Il wizard chiede alcune informazioni in sequenza. Per il nome del progetto si può digitare un punto . , così Vite usa direttamente la cartella corrente invece di crearne una nuova. Alle domande successive si seleziona il framework React e come variante JavaScript . Dopo aver risposto alle domande del wizard, si installano le dipendenze indicate nel file package.json e si avvia il server di sviluppo. # Avvio del server di sviluppo pnpm dev npm run dev Con npm serve scrivere run prima del nome dello script, mentre con pnpm il comando run è opzionale e si può omettere. Esercizio Scrivi il comando per avviare il wizard di Vite e indica quale nome di progetto va inserito per usare la cartella corrente, sia con pnpm che con npm. Mostra soluzione # pnpm pnpm create vite # Nome progetto: . # npm npm create vite@latest # Nome progetto: .

### I componenti in React
Un componente è una funzione JavaScript che restituisce del JSX, cioè descrive una porzione di interfaccia. Il nome di un componente inizia sempre con la lettera maiuscola, per distinguerlo dai tag HTML normali. Un componente serve a racchiudere in un solo posto la struttura di una parte di pagina, così da poterla riusare ovunque sia necessaria senza riscriverla. Ogni componente viene definito una sola volta e può essere richiamato più volte, anche con dati diversi. Per usare un componente in un altro file, bisogna prima esportarlo con export default alla fine del file in cui è definito. Nel file che deve mostrarlo, si usa poi import per portarlo dentro e si scrive il suo nome come se fosse un tag, ad esempio &lt;NomeComponente /&gt; . Il percorso indicato in import deve corrispondere alla posizione reale del file, contando dalla cartella del file che sta importando. Esempio src/components/Saluto.jsx function Saluto() { return ( &lt;p&gt;Benvenuto nel corso di React&lt;/p&gt; ); } export default Saluto; src/App.jsx import Saluto from './components/Saluto.jsx'; function App() { return &lt;Saluto /&gt;; } export default App; Esercizio Crea un componente chiamato Orario che mostra un testo con l'orario della lezione, poi importalo e mostralo dentro App.jsx . Mostra soluzione src/components/Orario.jsx function Orario() { return ( &lt;p&gt;Le lezioni iniziano alle 9:00&lt;/p&gt; ); } export default Orario; src/App.jsx import Orario from './components/Orario.jsx'; function App() { return &lt;Orario /&gt;; } export default App;

### JSX e blocchi riutilizzabili
JSX non è HTML: è una sintassi che viene trasformata in chiamate JavaScript prima di arrivare al browser, quindi segue alcune regole diverse dall'HTML classico. JSX permette di scrivere strutture simili all'HTML dentro il JavaScript, per descrivere ciò che deve comparire a schermo. Ogni blocco JSX deve avere un solo elemento principale, che può contenere altri elementi al suo interno. Per mostrare il valore di una variabile dentro il testo o dentro un attributo, si usano le parentesi graffe { } . Dentro le graffe si può scrivere qualsiasi espressione che restituisce un valore, come una variabile o un calcolo; quando quel valore cambia, React aggiorna automaticamente solo quella parte, senza riscrivere il resto della struttura. Differenze principali rispetto all'HTML JSX assomiglia molto all'HTML, ma alcune regole di scrittura cambiano perché il codice deve essere trasformato in JavaScript valido. class diventa className , perché class è una parola riservata in JavaScript. for (usato sul tag label ) diventa htmlFor , per lo stesso motivo. Ogni tag deve essere sempre chiuso, anche quelli senza contenuto, come &lt;img /&gt; o &lt;hr /&gt; . L'attributo style non è una stringa ma un oggetto JavaScript; le proprietà semplici come color restano invariate, mentre quelle composte da più parole, come background-color o max-width , si scrivono in camelCase senza trattino, cioè backgroundColor e maxWidth . Gli eventi si scrivono in camelCase, ad esempio onClick invece di onclick . Esempio src/components/Titolo.jsx function Titolo() { const nomeCorso = 'React Base'; const stile = { color: 'darkblue', backgroundColor: 'lightgray' }; return ( &lt;section className="intro-corso"&gt; &lt;h1 style={stile}&gt;{nomeCorso}&lt;/h1&gt; &lt;p&gt;Interfacce dinamiche con componenti.&lt;/p&gt; &lt;hr /&gt; &lt;/section&gt; ); } export default Titolo; src/App.jsx import Titolo from './components/Titolo.jsx'; function App() { return &lt;Titolo /&gt;; } export default App; Esercizio Scrivi un componente con un titolo e un breve testo, usando className , un tag self closing e l'attributo style con almeno una proprietà composta scritta in camelCase. Poi importalo e usalo dentro App.jsx . Mostra soluzione src/components/Presentazione.jsx function Presentazione() { const stile = { color: 'white', backgroundColor: 'green' }; return ( &lt;div className="presentazione"&gt; &lt;h2 style={stile}&gt;Benvenuto in React&lt;/h2&gt; &lt;p&gt;JSX serve per descrivere l'interfaccia in modo chiaro.&lt;/p&gt; &lt;br /&gt; &lt;/div&gt; ); } export default Presentazione; src/App.jsx import Presentazione from './components/Presentazione.jsx'; function App() { return &lt;Presentazione /&gt;; } export default App;

### I Fragment in JSX
Un Fragment è un contenitore invisibile: raggruppa più elementi JSX senza aggiungere un tag reale nella pagina HTML finale. Come già visto, ogni componente JSX deve restituire un solo elemento principale. Quando gli elementi da restituire sono più di uno e non serve un tag come div o section per contenerli, si può usare un Fragment al posto di un tag qualsiasi. Il Fragment si scrive con la sintassi &lt;&gt;...&lt;/&gt; , senza nome e senza attributi. Serve esclusivamente a soddisfare la regola del singolo elemento principale, senza produrre un tag visibile nell'HTML generato. Usare un Fragment è utile quando aggiungere un div in più creerebbe una struttura HTML non necessaria, ad esempio dentro una lista dove ogni elemento deve restare allo stesso livello senza contenitori aggiuntivi. Esempio src/components/Info.jsx function Info() { return ( &lt;&gt; &lt;h2&gt;Informazioni corso&lt;/h2&gt; &lt;p&gt;Il corso copre le basi di React.&lt;/p&gt; &lt;/&gt; ); } export default Info; src/App.jsx import Info from './components/Info.jsx'; function App() { return &lt;Info /&gt;; } export default App; Esercizio Crea un componente chiamato Contatti che restituisce un titolo e un paragrafo usando un Fragment invece di un tag contenitore, poi importalo dentro App.jsx . Mostra soluzione src/components/Contatti.jsx function Contatti() { return ( &lt;&gt; &lt;h2&gt;Contatti&lt;/h2&gt; &lt;p&gt;Scrivi a info@corso.it per informazioni.&lt;/p&gt; &lt;/&gt; ); } export default Contatti; src/App.jsx import Contatti from './components/Contatti.jsx'; function App() { return &lt;Contatti /&gt;; } export default App;

### Iterazioni in JSX con map
map è un metodo degli array già usato in JavaScript: qui viene applicato per trasformare i dati in blocchi JSX, invece di scrivere ogni elemento a mano. Quando si ha una lista di elementi, il metodo map permette di trasformare ogni elemento dell'array in un blocco JSX. In questo modo si evita di copiare e incollare più volte lo stesso codice statico. Il vantaggio principale è che la lista diventa dinamica: se i dati cambiano, cambia anche ciò che viene mostrato a schermo. Basta modificare l'array e l'interfaccia segue automaticamente il contenuto. Il metodo map restituisce un nuovo array, quindi è perfetto per costruire una sequenza di elementi visivi a partire da dati già pronti. Esempio src/components/ListaStudenti.jsx function ListaStudenti() { const studenti = ['Anna', 'Luca', 'Sara']; return ( &lt;ul&gt; {studenti.map((studente) =&gt; ( &lt;li&gt;{studente}&lt;/li&gt; ))} &lt;/ul&gt; ); } export default ListaStudenti; Esercizio Trasforma un array di tre frutti in una lista HTML usando map . Mostra soluzione src/components/ListaFrutti.jsx function ListaFrutti() { const frutti = ['Mela', 'Pera', 'Banana']; return ( &lt;ul&gt; {frutti.map((frutto) =&gt; ( &lt;li&gt;{frutto}&lt;/li&gt; ))} &lt;/ul&gt; ); } export default ListaFrutti;

### La key prop nelle liste
La key non viene mai mostrata a schermo: serve solo a React internamente, per riconoscere ogni elemento della lista tra un aggiornamento e l'altro. Quando una lista viene generata con map , ogni elemento deve avere una key unica. La key è un identificatore che aiuta React a riconoscere ogni elemento della lista in modo corretto. Questo è importante perché, se la lista cambia, React deve capire quale elemento è stato aggiunto, rimosso o spostato. Senza una key adatta, il comportamento può diventare impreciso o meno efficiente. La key deve essere stabile e diversa per ogni elemento della stessa lista. Quando esiste un identificatore univoco nei dati, è la scelta migliore. Esempio src/components/ListaCorsi.jsx function ListaCorsi() { const corsi = [ { id: 1, nome: 'HTML' }, { id: 2, nome: 'CSS' }, { id: 3, nome: 'JavaScript' } ]; return ( &lt;ul&gt; {corsi.map((corso) =&gt; ( &lt;li key={corso.id}&gt;{corso.nome}&lt;/li&gt; ))} &lt;/ul&gt; ); } export default ListaCorsi; Esercizio Aggiungi una key corretta a una lista di oggetti che contiene un campo id . Mostra soluzione src/components/ListaLibri.jsx function ListaLibri() { const libri = [ { id: 10, titolo: 'Il primo libro' }, { id: 11, titolo: 'Il secondo libro' } ]; return ( &lt;ul&gt; {libri.map((libro) =&gt; ( &lt;li key={libro.id}&gt;{libro.titolo}&lt;/li&gt; ))} &lt;/ul&gt; ); } export default ListaLibri;

### Lista dinamica con React
Consegna Costruisci un componente React che mostra una lista di studenti partendo da un array di oggetti. Usa map per generare i blocchi JSX e inserisci una key corretta per ogni elemento, poi importa il componente in App.jsx . Il componente deve includere un titolo, un elenco e almeno tre elementi nella lista. Usa un dato semplice, chiaro e realistico. Mostra soluzione src/components/ListaStudenti.jsx function ListaStudenti() { const studenti = [ { id: 1, nome: 'Anna' }, { id: 2, nome: 'Luca' }, { id: 3, nome: 'Sara' } ]; return ( &lt;section&gt; &lt;h2&gt;Studenti&lt;/h2&gt; &lt;ul&gt; {studenti.map((studente) =&gt; ( &lt;li key={studente.id}&gt;{studente.nome}&lt;/li&gt; ))} &lt;/ul&gt; &lt;/section&gt; ); } export default ListaStudenti; src/App.jsx import ListaStudenti from './components/ListaStudenti.jsx'; function App() { return &lt;ListaStudenti /&gt;; } export default App;

```bash
# Con pnpm
pnpm create vite

# Con npm
npm create vite@latest
```

```bash
# Avvio del server di sviluppo
pnpm dev
npm run dev
```

```bash
# pnpm
pnpm create vite
# Nome progetto: .

# npm
npm create vite@latest
# Nome progetto: .
```

```jsx
function Saluto() {
    return (
        <p>Benvenuto nel corso di React</p>
    );
}

export default Saluto;
```

```jsx
import Saluto from './components/Saluto.jsx';

function App() {
    return <Saluto />;
}

export default App;
```
