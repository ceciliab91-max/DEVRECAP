import { z } from "zod";

/**
 * Schema per la modalità Tutor Socratico:
 * Spiegazione chiara, riferimento alla dispensa, snippet, tranello d'esame e domanda di ragionamento.
 */
export const SocraticTutorResponseSchema = z.object({
  dispensaRef: z.string().describe("Modulo o capitolo della dispensa a cui fa riferimento la risposta"),
  conceptExplanation: z.string().describe("Spiegazione didattica, progressiva e approfondita del concetto"),
  codeExample: z.string().optional().describe("Snippet di codice commentato esemplificativo"),
  examPitfall: z.string().describe("Trabocchetto comune, errore da evitare all'esame o colloquio"),
  checklist: z.array(z.string()).describe("Checklist di 2-3 punti chiave da memorizzare"),
  socraticQuestion: z.string().describe("Domanda guida per stimolare la riflessione dello studente")
});

/**
 * Schema per la modalità Simulatore Esame Orale:
 * Valutazione della risposta dello studente con voto in trentesimi, punti di forza e domanda successiva.
 */
export const OralExamEvaluationSchema = z.object({
  voto: z.string().describe("Voto in trentesimi (es: '28/30', '30 e Lode', 'Insufficiente (16/30)')"),
  esito: z.enum(["Superato", "Superato con Lode", "Da Rivedere", "Insufficiente"]),
  puntiDiForza: z.array(z.string()).describe("Cosa lo studente ha spiegato correttamente con terminologia tecnica"),
  lacuneDaColmare: z.array(z.string()).describe("Concetti mancanti o imprecisioni tecniche riscontrate"),
  consiglioProfessore: z.string().describe("Consiglio sintetico del docente per l'esame orale"),
  domandaSuccessiva: z.string().describe("Nuova domanda d'esame per proseguire l'interrogazione orale")
});

/**
 * Schema per la generazione di Quiz Adattivi Istantanei con spiegazione didattica dei distrattori.
 */
export const AdaptiveQuizResponseSchema = z.object({
  argomento: z.string().describe("Argomento della dispensa su cui verte il quiz"),
  livello: z.enum(["Base", "Intermedio", "Avanzato / Trabocchetto"]),
  question: z.string().describe("Testo chiaro e puntuale della domanda a risposta multipla"),
  codeSnippet: z.string().optional().describe("Codice di contesto della domanda se rilevante"),
  options: z.array(z.string()).length(4).describe("Esattamente 4 opzioni di risposta distinte"),
  correctAnswerIndex: z.number().int().min(0).max(3).describe("Indice (0, 1, 2 o 3) della risposta corretta"),
  spiegazioneDidattica: z.string().describe("Perché la risposta corretta è giusta in base alla dispensa"),
  spiegazioneDistrattori: z.string().describe("Perché le altre 3 risposte contengono errori concettuali")
});

/**
 * Schema per la valutazione Live Coding (sostituisce completamente la vecchia risposta IA).
 */
export const CodeEvaluationSchema = z.object({
  isSuccess: z.boolean().describe("true se il codice soddisfa tutti i requisiti, false altrimenti"),
  voto: z.string().describe("Voto in trentesimi da '15/30' a '30 e Lode'"),
  profName: z.string().default("Tutor Loris"),
  role: z.string().default("Tutor di Sviluppo Web"),
  analisiRequisiti: z.string().describe("Analisi puntuale del rispetto dei requisiti tecnici"),
  qualitaCodice: z.string().describe("Valutazione su naming, sintassi, best practices e formattazione"),
  ottimizzazioneSuggerita: z.string().optional().describe("Versione ottimizzata o idiomatica del codice"),
  consiglioProf: z.string().describe("Consiglio didattico mirato per il prossimo esercizio")
});

/**
 * Schema per la Code Review e Debugger interattivo.
 */
export const CodeReviewSchema = z.object({
  hasErrors: z.boolean().describe("true se il codice presenta bug logici o sintattici"),
  bugAnalysis: z.string().describe("Descrizione dettagliata dell'errore o dell'inefficienza"),
  fixedCode: z.string().describe("Codice corretto e pulito pronto all'uso"),
  performanceConsiderations: z.string().describe("Impatto su complessità temporale/spaziale e rendering"),
  learnTip: z.string().describe("Regola d'oro da ricordare per evitare questo errore in futuro")
});
