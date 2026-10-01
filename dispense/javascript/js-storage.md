# LocalStorage

**Argomento:** JS | **Data Lezione:** 2026-06-18 | **File Sorgente:** lezioni/js-storage.html

## Panoramica
Il localStorage è uno spazio di memorizzazione del browser che salva dati anche dopo la chiusura della pagina. I dati restano disponibili finché non vengono cancellati manualmente. Lavora con coppie chiave-valore: ogni dato ha una chiave che lo identifica e un valore che lo contiene. Nel localStorag...

### Cos'è il localStorage
Il localStorage è uno spazio di memorizzazione del browser che salva dati anche dopo la chiusura della pagina. I dati restano disponibili finché non vengono cancellati manualmente. Lavora con coppie chiave-valore: ogni dato ha una chiave che lo identifica e un valore che lo contiene. Nel localStorage si salvano solo stringhe. Se vuoi memorizzare numeri, booleani, oggetti o array, devi prima trasformarli in testo e poi riconvertirli quando li leggi. È importante sapere che i dati nel localStorage sono visibili e modificabili direttamente dall'utente tramite il pannello DevTools del browser, nella scheda Application . Chiunque può aprire gli strumenti di sviluppo e leggere, cambiare o cancellare i valori salvati. Per questo motivo il localStorage è adatto a conservare solo informazioni non sensibili: preferenze dell'utente (tema grafico, lingua, dimensione del testo), lo stato di un carrello in un e-commerce, l'ultima pagina visitata o impostazioni di configurazione dell'interfaccia. Non deve mai contenere password, token di autenticazione o dati personali riservati.

### setItem
setItem() aggiunge un dato oppure aggiorna un dato già esistente. Vuole sempre due argomenti: la chiave e il valore. setItem() è il metodo con cui inserisci un dato nel localStorage. Se la chiave esiste già, il valore precedente viene sostituito con quello nuovo. Questo metodo è utile quando vuoi salvare una scelta dell'utente, come una preferenza grafica o la lingua selezionata. Esempio localStorage.setItem("tema", "scuro"); localStorage.setItem("lingua", "it"); Esercizio Salva nel localStorage due preferenze: il volume dell'audio impostato a 80 e le notifiche impostate su attive . Mostra soluzione localStorage.setItem("volume", "80"); localStorage.setItem("notifiche", "attive");

### getItem
getItem() legge il valore associato a una chiave. Se la chiave non esiste, restituisce null . getItem() serve per recuperare un dato salvato in precedenza. Si usa quando vuoi riutilizzare un'informazione già memorizzata, per esempio per mostrarla a schermo o per fare un controllo. Il valore restituito è sempre una stringa o null . Se ti serve un numero, devi convertirlo con Number() prima di usarlo in un calcolo. Esempio localStorage.setItem("lingua", "it"); const lingua = localStorage.getItem("lingua"); console.log(lingua); Esercizio Salva nel localStorage il tema preferito come chiaro , poi recuperalo in una variabile chiamata temaAttivo e stampala in console. Mostra soluzione localStorage.setItem("tema", "chiaro"); const temaAttivo = localStorage.getItem("tema"); console.log(temaAttivo);

### removeItem
removeItem() elimina solo una chiave specifica dal localStorage. removeItem() è il metodo da usare quando vuoi cancellare un solo dato salvato. Si indica la chiave da eliminare e il browser rimuove solo quella coppia chiave-valore, lasciando intatto tutto il resto. È utile quando un utente vuole annullare una scelta, resettare una preferenza o eliminare un'informazione non più necessaria. Esempio localStorage.setItem("tema", "scuro"); localStorage.removeItem("tema"); Esercizio Salva nel localStorage tre chiavi: lingua , volume e notifiche . Poi elimina solo la chiave volume . Mostra soluzione localStorage.setItem("lingua", "it"); localStorage.setItem("volume", "80"); localStorage.setItem("notifiche", "attive"); localStorage.removeItem("volume");

### clear
clear() svuota completamente il localStorage del sito. clear() cancella tutti i dati salvati nel localStorage. Va usato con attenzione, perché rimuove ogni chiave presente, non solo una singola informazione. Questo metodo è utile quando vuoi ripartire da zero, per esempio in una schermata di logout o in un pulsante che elimina tutte le preferenze memorizzate. Esempio localStorage.setItem("tema", "scuro"); localStorage.setItem("lingua", "it"); localStorage.clear(); Esercizio Salva nel localStorage la preferenza di colore e il nome utente, poi simula un reset completo dell'applicazione svuotando tutta la memoria. Mostra soluzione localStorage.setItem("colore", "blu"); localStorage.setItem("utente", "Anna"); localStorage.clear();

### JSON.stringify
JSON.stringify() trasforma un oggetto o un array in una stringa testuale in formato JSON. JSON è un formato standard per rappresentare dati strutturati come testo. Poiché il localStorage accetta solo stringhe, JSON.stringify() è il passaggio necessario per poter salvare oggetti e array. Il risultato è una stringa che contiene tutti i dati in un formato leggibile e riconvertibile. Il metodo si usa passando il dato da trasformare come argomento. Il valore originale non viene modificato: viene creata una nuova stringa. Esempio const studente = { nome: "Luca", eta: 16 }; const studenteJSON = JSON.stringify(studente); console.log(studenteJSON); // risultato: '{"nome":"Luca","eta":16}' const corsi = ["HTML", "CSS", "JavaScript"]; const corsiJSON = JSON.stringify(corsi); console.log(corsiJSON); // risultato: '["HTML","CSS","JavaScript"]' Esercizio Crea un oggetto prodotto con le proprietà nome e prezzo , trasformalo in una stringa JSON e stampala in console. Mostra soluzione const prodotto = { nome: "Tastiera", prezzo: 49 }; const prodottoJSON = JSON.stringify(prodotto); console.log(prodottoJSON);

### JSON.parse
JSON.parse() trasforma una stringa JSON in un oggetto o in un array. Quando leggi dal localStorage un valore salvato con JSON.stringify() , ottieni una stringa. Con JSON.parse() puoi riconvertire quella stringa nel tipo di dato originale, così da poter accedere di nuovo alle proprietà di un oggetto o agli elementi di un array. I due metodi lavorano sempre in coppia: JSON.stringify() si usa prima di salvare, JSON.parse() si usa dopo aver letto. Esempio const studenteJSON = '{"nome":"Luca","eta":16}'; const studente = JSON.parse(studenteJSON); console.log(studente.nome); // risultato: Luca const corsiJSON = '["HTML","CSS","JavaScript"]'; const corsi = JSON.parse(corsiJSON); console.log(corsi[0]); // risultato: HTML Esercizio Data la stringa '{"nome":"Tastiera","prezzo":49}' , riconvertila in un oggetto e stampa in console il valore della proprietà prezzo . Mostra soluzione const prodottoJSON = '{"nome":"Tastiera","prezzo":49}'; const prodotto = JSON.parse(prodottoJSON); console.log(prodotto.prezzo);

### Oggetti e array nel localStorage
Oggetti e array si salvano nel localStorage con JSON.stringify() e si recuperano con JSON.parse() . Un oggetto o un array non può essere salvato direttamente nel localStorage, perché il localStorage accetta solo stringhe. Il flusso corretto è: trasformare con JSON.stringify() , salvare con setItem() , leggere con getItem() e infine riconvertire con JSON.parse() . Questo approccio è utile quando devi memorizzare strutture più ricche, come i prodotti nel carrello di un e-commerce, le preferenze di configurazione di un'interfaccia o un elenco di voci selezionate dall'utente. Esempio const studente = { nome: "Luca", eta: 16 }; const listaCorsi = ["HTML", "CSS", "JavaScript"]; localStorage.setItem("studente", JSON.stringify(studente)); localStorage.setItem("corsi", JSON.stringify(listaCorsi)); const studenteSalvato = JSON.parse(localStorage.getItem("studente")); const corsiSalvati = JSON.parse(localStorage.getItem("corsi")); console.log(studenteSalvato); console.log(corsiSalvati); Esercizio Salva nel localStorage un oggetto che rappresenta un prodotto nel carrello (nome e quantità) e un array con tre categorie della tienda. Poi recuperali entrambi e stampali in console. Mostra soluzione const prodotto = { nome: "Monitor", quantita: 1 }; const categorie = ["Elettronica", "Accessori", "Software"]; localStorage.setItem("prodotto", JSON.stringify(prodotto)); localStorage.setItem("categorie", JSON.stringify(categorie)); const prodottoSalvato = JSON.parse(localStorage.getItem("prodotto")); const categorieSalvate = JSON.parse(localStorage.getItem("categorie")); console.log(prodottoSalvato); console.log(categorieSalvate);

```javascript
localStorage.setItem("tema", "scuro");
localStorage.setItem("lingua", "it");
```

```javascript
localStorage.setItem("volume", "80");
localStorage.setItem("notifiche", "attive");
```

```javascript
localStorage.setItem("lingua", "it");
const lingua = localStorage.getItem("lingua");
console.log(lingua);
```

```javascript
localStorage.setItem("tema", "chiaro");
const temaAttivo = localStorage.getItem("tema");
console.log(temaAttivo);
```

```javascript
localStorage.setItem("tema", "scuro");
localStorage.removeItem("tema");
```
