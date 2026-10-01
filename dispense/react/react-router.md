# React Router

**Argomento:** React | **Data Lezione:** 2026-07-16 | **File Sorgente:** lezioni/react-router.html

## Panoramica
SPA significa Single Page Application: l'app carica una sola pagina HTML e aggiorna il contenuto nel browser. In un sito tradizionale, visitare una nuova pagina richiede al browser di chiedere un nuovo documento al server. In una SPA il browser carica l'applicazione una volta sola; quando l'utente p...

### Che cos'è una SPA
SPA significa Single Page Application: l'app carica una sola pagina HTML e aggiorna il contenuto nel browser. In un sito tradizionale, visitare una nuova pagina richiede al browser di chiedere un nuovo documento al server. In una SPA il browser carica l'applicazione una volta sola; quando l'utente passa dalla Home ai Servizi, React sostituisce soltanto il contenuto necessario.

### Cos'è React Router e come si installa
React Router collega un percorso dell'URL, come /contatti , al componente React da mostrare. React da solo aggiorna l'interfaccia, ma non decide quale pagina mostrare quando cambia l'indirizzo del browser. React Router aggiunge questa capacità: legge l'URL, trova la route corrispondente e mostra il componente previsto. Nel progetto creato con Vite installiamo il pacchetto con pnpm. Poi avvolgiamo l'applicazione con BrowserRouter nel file di ingresso. Esempio pnpm add react-router File src/main.jsx : import { StrictMode } from "react"; import { createRoot } from "react-dom/client"; import { BrowserRouter } from "react-router"; import App from "./App"; createRoot(document.getElementById("root")).render( &lt;StrictMode&gt; &lt;BrowserRouter&gt; &lt;App /&gt; &lt;/BrowserRouter&gt; &lt;/StrictMode&gt; ); Esercizio Installa il pacchetto con pnpm e inserisci BrowserRouter attorno ad App nel file main.jsx . Mostra soluzione pnpm add react-router import { BrowserRouter } from "react-router"; &lt;BrowserRouter&gt; &lt;App /&gt; &lt;/BrowserRouter&gt;

### Routes e Route
Routes raccoglie le route dell'app. Route associa una prop path a un componente tramite la prop Component . Per il sito vetrina creiamo pagine minime: ognuna ha soltanto un titolo e un testo. La prop path indica l'URL da riconoscere; la prop Component riceve il nome del componente, senza parentesi graffe con JSX. Esempio File src/App.jsx : import { Route, Routes } from "react-router"; function Home() { return &lt;main&gt;&lt;h1&gt;Studio Aurora&lt;/h1&gt;&lt;p&gt;Idee digitali per piccole attività.&lt;/p&gt;&lt;/main&gt;; } function ChiSiamo() { return &lt;main&gt;&lt;h1&gt;Chi siamo&lt;/h1&gt;&lt;p&gt;Siamo un piccolo studio creativo.&lt;/p&gt;&lt;/main&gt;; } function Contatti() { return &lt;main&gt;&lt;h1&gt;Contatti&lt;/h1&gt;&lt;p&gt;Scrivici per conoscere il progetto.&lt;/p&gt;&lt;/main&gt;; } function App() { return ( &lt;Routes&gt; &lt;Route path="/" Component={Home} /&gt; &lt;Route path="/chi-siamo" Component={ChiSiamo} /&gt; &lt;Route path="/contatti" Component={Contatti} /&gt; &lt;/Routes&gt; ); } export default App; Esercizio Crea il componente Servizi con titolo e testo. Aggiungi una route per l'URL /servizi usando Component . Mostra soluzione function Servizi() { return &lt;main&gt;&lt;h1&gt;Servizi&lt;/h1&gt;&lt;p&gt;Creiamo siti chiari e veloci.&lt;/p&gt;&lt;/main&gt;; } &lt;Route path="/servizi" Component={Servizi} /&gt;

### Link e NavLink
Link cambia route senza ricaricare tutta la pagina. NavLink è pensato per i menu e permette di riconoscere la route attiva. Per navigare all'interno di una SPA non usiamo un tag &lt;a&gt; normale. Usiamo Link e la prop to . In questo modo React Router intercetta il click e aggiorna soltanto la parte necessaria dell'app. NavLink funziona come Link , ma passa l'informazione isActive alla funzione di className . È utile per evidenziare la voce del menu della pagina aperta. Esempio import { Link, NavLink } from "react-router"; function Menu() { return ( &lt;nav&gt; &lt;NavLink to="/" end&gt;Home&lt;/NavLink&gt; &lt;NavLink to="/chi-siamo"&gt;Chi siamo&lt;/NavLink&gt; &lt;NavLink to="/servizi" className={({ isActive }) =&gt; isActive ? "attivo" : ""} &gt; Servizi &lt;/NavLink&gt; &lt;NavLink to="/contatti"&gt;Contatti&lt;/NavLink&gt; &lt;Link to="/servizi/web-design"&gt;Scopri il web design&lt;/Link&gt; &lt;/nav&gt; ); } Esercizio Aggiungi un NavLink verso /contatti che riceve la classe attivo quando la pagina Contatti è aperta. Mostra soluzione &lt;NavLink to="/contatti" className={({ isActive }) =&gt; isActive ? "attivo" : ""} &gt; Contatti &lt;/NavLink&gt;

### Layout e Outlet
Un layout raccoglie le parti condivise, come il menu. Outlet indica il punto in cui viene mostrata la route figlia. Il menu del sito vetrina compare in ogni pagina. Per evitare di copiarlo nelle pagine Home, Chi siamo, Servizi e Contatti, lo spostiamo in un file separato chiamato layouts/MainLayout.jsx . Le pagine diventano route figlie di MainLayout . La route con index è la pagina predefinita del layout e viene mostrata all'URL / . Esempio File src/layouts/MainLayout.jsx : import { NavLink, Outlet } from "react-router"; function MainLayout() { return ( &lt;&gt; &lt;nav&gt; &lt;NavLink to="/" end&gt;Home&lt;/NavLink&gt; &lt;NavLink to="/chi-siamo"&gt;Chi siamo&lt;/NavLink&gt; &lt;NavLink to="/servizi"&gt;Servizi&lt;/NavLink&gt; &lt;NavLink to="/contatti"&gt;Contatti&lt;/NavLink&gt; &lt;/nav&gt; &lt;Outlet /&gt; &lt;/&gt; ); } export default MainLayout; File src/App.jsx : import { Route, Routes } from "react-router"; import MainLayout from "./layouts/MainLayout"; function App() { return ( &lt;Routes&gt; &lt;Route path="/" Component={MainLayout}&gt; &lt;Route index Component={Home} /&gt; &lt;Route path="chi-siamo" Component={ChiSiamo} /&gt; &lt;Route path="servizi" Component={Servizi} /&gt; &lt;Route path="contatti" Component={Contatti} /&gt; &lt;/Route&gt; &lt;/Routes&gt; ); } Esercizio Crea layouts/MainLayout.jsx con un titolo per il sito, il componente Menu e Outlet . Usa poi MainLayout come route principale. Mostra soluzione import { Outlet } from "react-router"; import Menu from "../components/Menu"; function MainLayout() { return ( &lt;&gt; &lt;header&gt;&lt;h1&gt;Studio Aurora&lt;/h1&gt;&lt;/header&gt; &lt;Menu /&gt; &lt;Outlet /&gt; &lt;/&gt; ); } export default MainLayout;

### Pagina 404
La route con path="*" viene usata quando nessun altro percorso corrisponde all'URL. Un utente può digitare un indirizzo inesistente o aprire un vecchio collegamento. Senza una route di recupero, l'app non avrebbe un messaggio utile da mostrare. Una pagina 404 spiega il problema e offre un link per tornare alla Home. Esempio import { Link, Route } from "react-router"; function PaginaNonTrovata() { return ( &lt;main&gt; &lt;h1&gt;Pagina non trovata&lt;/h1&gt; &lt;p&gt;L'indirizzo visitato non esiste.&lt;/p&gt; &lt;Link to="/"&gt;Torna alla Home&lt;/Link&gt; &lt;/main&gt; ); } &lt;Route path="*" Component={PaginaNonTrovata} /&gt; Esercizio Crea una pagina 404 con titolo, testo e link alla Home. Aggiungila dopo le route del layout. Mostra soluzione function PaginaNonTrovata() { return &lt;main&gt;&lt;h1&gt;404&lt;/h1&gt;&lt;p&gt;Pagina non trovata.&lt;/p&gt;&lt;Link to="/"&gt;Home&lt;/Link&gt;&lt;/main&gt;; } &lt;Route path="*" Component={PaginaNonTrovata} /&gt;

### Navigare con useNavigate
useNavigate restituisce una funzione per cambiare route da JavaScript. Link viene usato quando la navigazione è già visibile nel JSX. useNavigate è utile quando la navigazione dipende da un'azione: per esempio, dopo l'invio di un form o dopo il click di un bottone. Esempio import { useNavigate } from "react-router"; function Home() { const navigate = useNavigate(); function mostraServizi() { navigate("/servizi"); } return ( &lt;main&gt; &lt;h1&gt;Studio Aurora&lt;/h1&gt; &lt;p&gt;Idee digitali per piccole attività.&lt;/p&gt; &lt;button onClick={mostraServizi}&gt;Scopri i servizi&lt;/button&gt; &lt;/main&gt; ); } Esercizio Nella pagina Contatti aggiungi un bottone che porta l'utente alla Home tramite useNavigate . Mostra soluzione import { useNavigate } from "react-router"; function Contatti() { const navigate = useNavigate(); return ( &lt;main&gt; &lt;h1&gt;Contatti&lt;/h1&gt; &lt;p&gt;Scrivici per conoscere il progetto.&lt;/p&gt; &lt;button onClick={() =&gt; navigate("/")}&gt;Torna alla Home&lt;/button&gt; &lt;/main&gt; ); }

### Parametri dinamici e useParams
Un segmento che inizia con : è un parametro dinamico. useParams legge il valore presente nell'URL. Non serve una route separata per ogni servizio. Il percorso servizi/:serviceId riconosce sia /servizi/web-design sia /servizi/consulenza . La parte variabile viene letta nel componente tramite useParams . Nel sito vetrina i dati possono stare in un piccolo oggetto locale. La chiave dell'oggetto corrisponde al valore scritto nell'URL. Esempio import { Link, Route, useParams } from "react-router"; const servizi = { "web-design": { titolo: "Web design", testo: "Progettiamo siti semplici e piacevoli da usare." }, consulenza: { titolo: "Consulenza", testo: "Ti aiutiamo a scegliere gli strumenti giusti." } }; function Servizi() { return ( &lt;main&gt; &lt;h1&gt;Servizi&lt;/h1&gt; &lt;p&gt;Scegli un servizio per vedere i dettagli.&lt;/p&gt; &lt;Link to="/servizi/web-design"&gt;Web design&lt;/Link&gt; &lt;Link to="/servizi/consulenza"&gt;Consulenza&lt;/Link&gt; &lt;/main&gt; ); } function DettaglioServizio() { const { serviceId } = useParams(); const servizio = servizi[serviceId]; if (!servizio) { return &lt;main&gt;&lt;h1&gt;Servizio non trovato&lt;/h1&gt;&lt;Link to="/servizi"&gt;Torna ai servizi&lt;/Link&gt;&lt;/main&gt;; } return &lt;main&gt;&lt;h1&gt;{servizio.titolo}&lt;/h1&gt;&lt;p&gt;{servizio.testo}&lt;/p&gt;&lt;/main&gt;; } &lt;Route path="servizi/:serviceId" Component={DettaglioServizio} /&gt; Esercizio Aggiungi il servizio social all'oggetto locale e crea un link verso /servizi/social . Mostra soluzione const servizi = { social: { titolo: "Social media", testo: "Prepariamo contenuti chiari per i tuoi canali." } }; &lt;Link to="/servizi/social"&gt;Social media&lt;/Link&gt;

```bash
pnpm add react-router
```

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
```

```bash
pnpm add react-router
```

```jsx
import { BrowserRouter } from "react-router";

<BrowserRouter>
    <App />
</BrowserRouter>
```

```jsx
import { Route, Routes } from "react-router";

function Home() {
    return <main><h1>Studio Aurora</h1><p>Idee digitali per piccole attività.</p></main>;
}

function ChiSiamo() {
    return <main><h1>Chi siamo</h1><p>Siamo un piccolo studio creativo.</p></main>;
}

function Contatti() {
    return <main><h1>Contatti</h1><p>Scrivici per conoscere il progetto.</p></main>;
}

function App() {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/chi-siamo" Component={ChiSiamo} />
            <Route path="/contatti" Component={Contatti} />
        </Routes>
    );
}

export default App;
```
