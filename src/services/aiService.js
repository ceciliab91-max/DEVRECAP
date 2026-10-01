/**
 * AI Service Layer (LangChain LCEL & Zod Structured Output Engine)
 * Centralizes all AI operations for DevExam PRO.
 */
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
 * Legge l'API Key attiva configurata nel profilo o nell'ambiente.
 */
export function getApiKey() {
  return getActiveApiKey();
}

/**
 * Restituisce true se una chiave Gemini valida è configurata.
 */
export function hasValidApiKey() {
  return isAiConfigured();
}

export const evaluateCodeWithAi = evaluateLiveCodingChallenge;

export {
  askSocraticTutor,
  evaluateLiveCodingChallenge,
  evaluateOralExamAnswer,
  generateAdaptiveQuiz,
  reviewAndDebugCode
};
