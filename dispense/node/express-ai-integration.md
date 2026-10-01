# Express e Mistral: integrazione AI

**Argomento:** Node | **Data Lezione:** 2026-10-02 | **File Sorgente:** lezioni/express-ai-integration.html

## Panoramica
La chiave API di Mistral deve restare nel backend . React o qualsiasi altro frontend invia il messaggio a Express; Express contatta Mistral e restituisce solo la risposta necessaria. Frontend │ POST /api/chat { message } ▼ Server Express │ usa MISTRAL_API_KEY ▼ API Mistral │ risposta del modello ▼ S...

### Il backend parla con l'AI
La chiave API di Mistral deve restare nel backend . React o qualsiasi altro frontend invia il messaggio a Express; Express contatta Mistral e restituisce solo la risposta necessaria. Frontend │ POST /api/chat { message } ▼ Server Express │ usa MISTRAL_API_KEY ▼ API Mistral │ risposta del modello ▼ Server Express → Frontend Non chiamare Mistral direttamente dal browser e non inserire la chiave in file React, nel codice JavaScript pubblico o in una variabile che inizia con VITE_ . Chi visita il sito potrebbe vedere e usare quella chiave. In questa lezione creiamo un piccolo endpoint POST /api/chat . Riceve una domanda, la invia a Mistral tramite un service e restituisce la risposta in JSON.

### Salvare la chiave nel file .env
Non installiamo alcun package esterno. Node.js 18 o successivo include già fetch() . Mistral usa un formato compatibile con OpenAI Chat Completions: il service invierà direttamente una richiesta HTTP con quel formato. Crea un file .env nella cartella principale del progetto. Incolla una chiave creata nel tuo account Mistral al posto del valore di esempio. MISTRAL_API_KEY="incolla-la-tua-chiave-qui" MISTRAL_MODEL="mistral-small-latest" Il comando Node deve leggere questo file prima di avviare server.js . Nel package.json aggiorna lo script di sviluppo: { "type": "module", "scripts": { "dev": "node --env-file=.env --watch server.js" } } Node carica le variabili in process.env . Per esempio, nel server leggiamo la chiave con process.env.MISTRAL_API_KEY . express-ai/ ├── .env ├── .gitignore ├── services/ │ └── mistral.js ├── package.json └── server.js Aggiungi questa riga a .gitignore : il file non verrà caricato su GitHub. .env Se una chiave finisce per errore su GitHub, revocala dal pannello Mistral e creane una nuova. Rimuoverla da un commit non basta: potrebbe essere già stata copiata.

### Creare un service compatibile con OpenAI
Un service raccoglie il codice che comunica con un servizio esterno. In questo modo server.js resta dedicato alle rotte, mentre services/mistral.js gestisce Mistral. // services/mistral.js const apiKey = process.env.MISTRAL_API_KEY; const apiUrl = 'https://api.mistral.ai/v1/chat/completions'; if (!apiKey) { throw new Error('MISTRAL_API_KEY non trovata'); } export async function askMistral({ message, systemMessage = 'Rispondi in italiano in modo chiaro e breve.', model = process.env.MISTRAL_MODEL || 'mistral-small-latest', temperature = 0.7, maxTokens = 200, }) { const response = await fetch(apiUrl, { method: 'POST', headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json', }, body: JSON.stringify({ model, messages: [ { role: 'system', content: systemMessage }, { role: 'user', content: message }, ], temperature, max_tokens: maxTokens, }), }); if (!response.ok) { throw new Error('Mistral ha risposto con status ' + response.status); } const data = await response.json(); return data.choices[0].message.content; } askMistral() riceve un oggetto con i parametri della richiesta. message è obbligatorio; systemMessage , model , temperature e maxTokens hanno valori predefiniti. Il messaggio system imposta il comportamento dell'assistente, mentre il messaggio user contiene la domanda. Nessun package esterno è coinvolto: fetch() invia direttamente la richiesta. Il body usa i campi OpenAI-compatible model , messages , temperature e max_tokens .

### Creare la rotta Express
Importiamo il service e lo usiamo dentro la rotta POST /api/chat . Prima controlliamo che il client abbia inviato un messaggio; poi restituiamo la risposta dell'AI. // server.js import express from 'express'; import { askMistral } from './services/mistral.js'; const app = express(); const port = 3000; app.use(express.json()); app.post('/api/chat', async (req, res) =&gt; { const { message, systemMessage, model, temperature, maxTokens } = req.body; if (!message) { return res.status(400).json({ error: 'Il messaggio è obbligatorio' }); } try { const answer = await askMistral({ message, systemMessage, model, temperature, maxTokens, }); res.json({ answer }); } catch (error) { console.error(error); res.status(500).json({ error: 'Errore nella richiesta a Mistral' }); } }); app.listen(port, () =&gt; { console.log(`Server pronto su http://localhost:${port}`); }); La rotta passa i parametri ricevuti al service. Il frontend riceve soltanto { answer: '...' } ; non riceve mai la chiave API. In un progetto reale conviene decidere sul server quali modelli e quali limiti permettere, invece di fidarsi dei valori inviati dal client.

### Avviare e testare l'API
Avvia Express con il comando seguente: pnpm dev Con Postman o LiteClient invia una richiesta alla rotta locale. POST http://localhost:3000/api/chat Content-Type: application/json { "message": "Spiegami cos'è un middleware in Express in una frase.", "temperature": 0.3, "maxTokens": 100 } Una risposta riuscita ha questa forma: { "answer": "Un middleware è una funzione che gestisce una richiesta prima della risposta finale." } Se ricevi MISTRAL_API_KEY non trovata , controlla il nome del file, la posizione di .env e lo script con --env-file=.env . Se ricevi 401 , la chiave non è valida o è stata revocata. Esercizio Aggiungi una seconda rotta POST /api/riassunto . Deve ricevere text nel body e chiamare lo stesso service con un messaggio del tipo: Riassumi questo testo in tre punti: ... .

```text
Frontend
  │ POST /api/chat { message }
  ▼
Server Express
  │ usa MISTRAL_API_KEY
  ▼
API Mistral
  │ risposta del modello
  ▼
Server Express → Frontend
```

```bash
MISTRAL_API_KEY="incolla-la-tua-chiave-qui"
MISTRAL_MODEL="mistral-small-latest"
```

```json
{
  "type": "module",
  "scripts": {
    "dev": "node --env-file=.env --watch server.js"
  }
}
```

```text
express-ai/
├── .env
├── .gitignore
├── services/
│   └── mistral.js
├── package.json
└── server.js
```

```javascript
// services/mistral.js
const apiKey = process.env.MISTRAL_API_KEY;
const apiUrl = 'https://api.mistral.ai/v1/chat/completions';

if (!apiKey) {
  throw new Error('MISTRAL_API_KEY non trovata');
}

export async function askMistral({
  message,
  systemMessage = 'Rispondi in italiano in modo chiaro e breve.',
  model = process.env.MISTRAL_MODEL || 'mistral-small-latest',
  temperature = 0.7,
  maxTokens = 200,
}) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message },
      ],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    throw new Error('Mistral ha risposto con status ' + response.status);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
```
