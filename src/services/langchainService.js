import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { getCurrentUser } from "../utils/authStorage";
import { buildDispenseKnowledgeContext } from "../data/dispenseKnowledge";
import {
  SocraticTutorResponseSchema,
  OralExamEvaluationSchema,
  AdaptiveQuizResponseSchema,
  CodeEvaluationSchema,
  CodeReviewSchema
} from "../schemas/tutorSchemas";

/**
 * Recupera la chiave API Gemini attiva (profilo utente o variabile d'ambiente).
 */
export function getActiveApiKey() {
  const currentUser = getCurrentUser();
  if (currentUser?.apiKey && currentUser.apiKey.trim().length > 0) {
    return currentUser.apiKey.trim();
  }
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim().length > 0) {
    return envKey.trim();
  }
  return null;
}

export function isAiConfigured() {
  return Boolean(getActiveApiKey());
}

/**
 * Factory per creare l'istanza ChatGoogleGenerativeAI.
 */
function createGeminiModel(modelName = "gemini-2.5-flash", temperature = 0.3) {
  const apiKey = getActiveApiKey();
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  return new ChatGoogleGenerativeAI({
    model: modelName,
    apiKey: apiKey,
    temperature: temperature,
    maxRetries: 2
  });
}

/**
 * Converte la cronologia messaggi UI nel formato messaggi LangChain.
 */
function formatHistory(history = []) {
  return history
    .filter(msg => msg.id !== "welcome")
    .map(msg => {
      if (msg.sender === "user") {
        return new HumanMessage(msg.text);
      }
      return new AIMessage(typeof msg.text === "string" ? msg.text : JSON.stringify(msg.text));
    });
}

/**
 * 1. TUTOR SOCRATICO (Spiegazione guidata, riferimento alla dispensa e domanda guida)
 */
export async function askSocraticTutor(userQuestion, conversationHistory = [], subject = null) {
  if (!isAiConfigured()) {
    return { error: "MISSING_API_KEY" };
  }

  const knowledgeContext = buildDispenseKnowledgeContext(subject);
  const systemInstruction = `Sei il "Prof. Loris", un tutor d'esame universitario rigoroso ma empatico per sviluppatori Web.
Hai accesso alla Knowledge Base ufficiale delle 24 dispense didattiche del corso (CSS, JavaScript, React, MySQL).

KNOWLEDGE BASE DELLE DISPENSE:
${knowledgeContext}

COMPITO:
Rispondi al quesito dello studente rispettando RIGOROSAMENTE lo schema di output:
1. 'dispensaRef': cita con precisione il capitolo/dispensa pertinente.
2. 'conceptExplanation': spiega il concetto in modo progressivo e didattico.
3. 'codeExample': fornisci uno snippet di codice breve e commentato.
4. 'examPitfall': evidenzia il trabocchetto d'esame più comune su questo argomento.
5. 'checklist': elenca 2-3 concetti chiave essenziali da ricordare.
6. 'socraticQuestion': poni una domanda di ragionamento per verificare che lo studente abbia compreso.`;

  try {
    const model = createGeminiModel("gemini-2.5-flash", 0.4);
    const structuredChain = model.withStructuredOutput(SocraticTutorResponseSchema);

    const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(systemInstruction),
      new MessagesPlaceholder("history"),
      ["human", "{input}"]
    ]);

    const formattedMessages = await promptTemplate.formatMessages({
      history: formatHistory(conversationHistory),
      input: userQuestion
    });

    const structuredResult = await structuredChain.invoke(formattedMessages);
    return { success: true, data: structuredResult };
  } catch (err) {
    // Fallback automatico a gemini-2.0-flash se il modello 2.5 non è disponibile
    try {
      const fallbackModel = createGeminiModel("gemini-2.0-flash", 0.4);
      const structuredChain = fallbackModel.withStructuredOutput(SocraticTutorResponseSchema);
      const promptTemplate = ChatPromptTemplate.fromMessages([
        new SystemMessage(systemInstruction),
        ["human", "{input}"]
      ]);
      const formattedMessages = await promptTemplate.formatMessages({ input: userQuestion });
      const structuredResult = await structuredChain.invoke(formattedMessages);
      return { success: true, data: structuredResult };
    } catch (fallbackErr) {
      return {
        error: "AI_ERROR",
        message: fallbackErr.message || err.message || "Errore durante l'elaborazione con LangChain."
      };
    }
  }
}

/**
 * 2. SIMULATORE ESAME ORALE (Valutazione risposta con voto in 30esimi e domanda successiva)
 */
export async function evaluateOralExamAnswer(studentAnswer, currentTopic, examHistory = []) {
  if (!isAiConfigured()) {
    return { error: "MISSING_API_KEY" };
  }

  const knowledgeContext = buildDispenseKnowledgeContext();
  const systemInstruction = `Sei la commissione d'esame per lo sviluppo Web. Stai interrogando lo studente oralmente sul seguente argomento: "${currentTopic}".

KNOWLEDGE BASE UFFICIALE:
${knowledgeContext}

Valuta la risposta fornita dallo studente con rigore accademico:
- Assegna un voto in 30esimi ('18/30' a '30 e Lode', oppure 'Insufficiente (15/30)').
- Evidenzia i punti di forza tecnici e la proprietà di linguaggio.
- Spiega chiaramente le lacune o i concetti saltati.
- Fornisci una 'domandaSuccessiva' per proseguire l'interrogazione orale.`;

  try {
    const model = createGeminiModel("gemini-2.5-flash", 0.2);
    const structuredChain = model.withStructuredOutput(OralExamEvaluationSchema);

    const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(systemInstruction),
      new MessagesPlaceholder("history"),
      ["human", "Risposta dello studente all'interrogazione: {input}"]
    ]);

    const formattedMessages = await promptTemplate.formatMessages({
      history: formatHistory(examHistory),
      input: studentAnswer
    });

    const structuredResult = await structuredChain.invoke(formattedMessages);
    return { success: true, data: structuredResult };
  } catch (err) {
    return { error: "AI_ERROR", message: err.message || "Errore durante la valutazione dell'esame orale." };
  }
}

/**
 * 3. GENERATORE DI QUIZ ADATTIVO (Domande su misura con spiegazione dei trabocchetti)
 */
export async function generateAdaptiveQuiz(topicOrSubject, difficulty = "Intermedio") {
  if (!isAiConfigured()) {
    return { error: "MISSING_API_KEY" };
  }

  const knowledgeContext = buildDispenseKnowledgeContext(topicOrSubject);
  const systemInstruction = `Sei un autore di test tecnici per sviluppatori Web.
Genera una domanda a risposta multipla inedita, focalizzata sul tema: "${topicOrSubject}" con difficoltà: "${difficulty}".

KNOWLEDGE BASE:
${knowledgeContext}

REQUISITI:
- Fornisci esattamente 4 opzioni plausibili.
- 'correctAnswerIndex' deve indicare l'indice numerico (0, 1, 2 o 3) della risposta corretta.
- 'spiegazioneDidattica': spiega perché la risposta corretta è l'unica esatta.
- 'spiegazioneDistrattori': spiega nel dettaglio l'errore concettuale presente nelle altre 3 risposte errate.`;

  try {
    const model = createGeminiModel("gemini-2.5-flash", 0.7);
    const structuredChain = model.withStructuredOutput(AdaptiveQuizResponseSchema);

    const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(systemInstruction),
      ["human", "Genera subito un nuovo quiz a 4 opzioni sul tema richiesto."]
    ]);

    const formattedMessages = await promptTemplate.formatMessages({});
    const structuredResult = await structuredChain.invoke(formattedMessages);
    return { success: true, data: structuredResult };
  } catch (err) {
    return { error: "AI_ERROR", message: err.message || "Impossibile generare il quiz adattivo." };
  }
}

/**
 * 4. VALUTATORE LIVE CODING (Sostituzione completa del vecchio modulo IA di LiveCoding)
 */
export async function evaluateLiveCodingChallenge(userCode, challenge) {
  if (!isAiConfigured()) {
    return { error: "MISSING_API_KEY" };
  }

  const systemInstruction = `Sei il "Prof. Loris", docente di Sviluppo Web.
Valuta la soluzione inviata per la seguente sfida pratica di programmazione:

TITOLO SFIDA: "${challenge.title}" (${challenge.subject})
DESCRIZIONE: "${challenge.description}"
REGOLE RICHIESTE: ${challenge.checkRules.map(r => r.name).join(", ")}
SOLUZIONE UFFICIALE DI RIFERIMENTO:
\`\`\`
${challenge.officialSolution || "Non specificata"}
\`\`\`

CODICE SOTTOMESSO DALLO STUDENTE:
\`\`\`
${userCode}
\`\`\`

Valuta la soluzione restituendo l'output secondo lo schema CodeEvaluationSchema.`;

  try {
    const model = createGeminiModel("gemini-2.5-flash", 0.2);
    const structuredChain = model.withStructuredOutput(CodeEvaluationSchema);

    const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(systemInstruction),
      ["human", "Effettua la correzione formale e assegna il voto finale."]
    ]);

    const formattedMessages = await promptTemplate.formatMessages({});
    const result = await structuredChain.invoke(formattedMessages);
    return { success: true, data: result };
  } catch (err) {
    return { error: "AI_ERROR", message: err.message || "Errore durante la valutazione del codice." };
  }
}

/**
 * 5. CODE REVIEW & DEBUGGER
 */
export async function reviewAndDebugCode(codeSnippet, language = "javascript") {
  if (!isAiConfigured()) {
    return { error: "MISSING_API_KEY" };
  }

  const systemInstruction = `Sei un Senior Code Reviewer. Analizza il seguente codice ${language}, individua eventuali bug logici, problemi di reattività o inefficienze e restituisci la versione corretta con la relativa spiegazione tecnica.`;

  try {
    const model = createGeminiModel("gemini-2.5-flash", 0.2);
    const structuredChain = model.withStructuredOutput(CodeReviewSchema);

    const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(systemInstruction),
      ["human", "Ecco il codice da analizzare:\n```{language}\n{code}\n```"]
    ]);

    const formattedMessages = await promptTemplate.formatMessages({
      language,
      code: codeSnippet
    });

    const result = await structuredChain.invoke(formattedMessages);
    return { success: true, data: result };
  } catch (err) {
    return { error: "AI_ERROR", message: err.message || "Errore durante la code review." };
  }
}
