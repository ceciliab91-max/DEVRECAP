import {
  getActiveApiKey,
  isAiConfigured,
  askSocraticTutor,
  evaluateLiveCodingChallenge,
  evaluateOralExamAnswer,
  generateAdaptiveQuiz,
  reviewAndDebugCode
} from "./langchainService";

/**
 * Legge l'API Key attiva (per compatibilità).
 */
export function getApiKey() {
  return getActiveApiKey();
}

/**
 * Restituisce true se una chiave valida è configurata.
 */
export function hasValidApiKey() {
  return isAiConfigured();
}

/**
 * Sostituisce la vecchia fetch grezza con la pipeline LangChain Socratic Tutor.
 */
export async function fetchGeminiTutorResponse(userPrompt, conversationHistory = []) {
  const res = await askSocraticTutor(userPrompt, conversationHistory);
  
  if (res.error) {
    return res;
  }

  if (res.success && res.data) {
    const data = res.data;
    const checklistFormatted = data.checklist?.map(c => `• ${c}`).join("\n") || "";
    const codeFormatted = data.codeExample ? `\n\`\`\`javascript\n${data.codeExample}\n\`\`\`\n` : "";
    
    const formattedText = `📚 **Riferimento Dispensa:** ${data.dispensaRef}\n\n${data.conceptExplanation}\n${codeFormatted}\n⚠️ **Trabocchetto d'Esame:**\n${data.examPitfall}\n\n✅ **Punti Chiave:**\n${checklistFormatted}\n\n💡 **Domanda di Riflessione:**\n*${data.socraticQuestion}*`;

    return {
      success: true,
      text: formattedText,
      structuredData: data
    };
  }

  return { error: "EMPTY_RESPONSE", message: "Nessuna risposta generata dal modello LangChain." };
}

/**
 * Sostituisce la vecchia valutazione codice grezza con la pipeline LangChain Live Coding.
 */
export async function evaluateCodeWithAi(userCode, challenge) {
  const result = await evaluateLiveCodingChallenge(userCode, challenge);
  if (result.error) {
    return result;
  }
  return {
    success: true,
    verdict: result.data
  };
}

export {
  askSocraticTutor,
  evaluateLiveCodingChallenge,
  evaluateOralExamAnswer,
  generateAdaptiveQuiz,
  reviewAndDebugCode
};
