import { getCurrentUser } from '../utils/authStorage';

/**
 * Reads the active Gemini API Key.
 * Priority:
 * 1. currentUser.apiKey stored in localStorage
 * 2. import.meta.env.VITE_GEMINI_API_KEY
 */
export function getApiKey() {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.apiKey && currentUser.apiKey.trim().length > 0) {
    return currentUser.apiKey.trim();
  }

  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim().length > 0) {
    return envKey.trim();
  }

  return null;
}

/**
 * Returns true if a valid API Key is configured for the current session.
 */
export function hasValidApiKey() {
  return Boolean(getApiKey());
}

const GEMINI_MODEL = "gemini-2.5-flash";

/**
 * Fetch response from Google Gemini API for Tutor Chatbot.
 */
export async function fetchGeminiTutorResponse(userPrompt, _conversationHistory = []) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { error: 'MISSING_API_KEY' };
  }

  const systemPrompt = "Sei un tutor d'esame per sviluppatori web. Rispondi in modo conciso, chiaro ed efficace a qualsiasi dubbio su CSS, JavaScript, React e SQL.";

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nDomanda dello studente: ${userPrompt}` }
          ]
        }
      ]
    };

    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // Fallback to gemini-2.0-flash if model version is unsupported for key
    if (!res.ok && res.status === 404) {
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      res = await fetch(fallbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { error: 'API_ERROR', message: errData.error?.message || `HTTP ${res.status}` };
    }

    const data = await res.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (generatedText) {
      return { success: true, text: generatedText };
    }

    return { error: 'EMPTY_RESPONSE', message: 'Nessun contenuto generato dal modello.' };
  } catch (e) {
    return { error: 'NETWORK_ERROR', message: e.message || 'Errore di connessione di rete.' };
  }
}

/**
 * Evaluate student code using Google Gemini AI for Live Coding exercises.
 */
export async function evaluateCodeWithAi(userCode, challenge) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { error: 'MISSING_API_KEY' };
  }

  const prompt = `Sei un docente universitario di Sviluppatore Web ("Prof. Loris"). 
Valuta il seguente codice inviato per la sfida didattica:
Titolo Sfida: "${challenge.title}" (${challenge.subject})
Descrizione: "${challenge.description}"
Regole di verifica richieste: ${challenge.checkRules.map(r => r.name).join(', ')}

Codice dello studente:
\`\`\`
${userCode}
\`\`\`

Fornisci una risposta JSON valida con la seguente struttura esatta (senza altri testi fuori dal JSON):
{
  "isSuccess": true/false,
  "voto": "30 e Lode / 30" (o un voto da 15 a 30L),
  "profName": "Prof. Loris",
  "role": "Docente Universitario di Sviluppo Web",
  "analisiRequisiti": "Valutazione dettagliata in 1-2 frasi se i requisiti tecnici sono stati rispettati.",
  "qualitaCodice": "Valutazione della sintassi e della formattazione del codice.",
  "consiglioProf": "Un consiglio didattico personalizzato per migliorare."
}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };

    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok && res.status === 404) {
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      res = await fetch(fallbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { error: 'API_ERROR', message: errData.error?.message || `HTTP ${res.status}` };
    }

    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (rawText) {
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return { success: true, verdict: parsed };
    }

    return { error: 'EMPTY_RESPONSE', message: 'Nessun verdetto generato.' };
  } catch (e) {
    return { error: 'PARSING_ERROR', message: e.message || 'Impossibile interpretare la risposta del professore IA.' };
  }
}

