import { z } from "zod";

/**
 * Schema per i singoli snippet di codice inclusi in una lezione.
 */
export const CodeSnippetSchema = z.object({
  title: z.string().min(1, "Il titolo dello snippet è obbligatorio"),
  language: z.enum(["css", "javascript", "jsx", "sql"]),
  code: z.string().min(1, "Il codice non può essere vuoto"),
  explanation: z.string().min(1, "La spiegazione dello snippet è obbligatoria")
});

/**
 * Schema per i concetti chiave e le trappole d'esame.
 */
export const DispensaLessonSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  pdfReference: z.string(),
  summary: z.string().min(1),
  keyPoints: z.array(z.string()).min(1),
  examPitfalls: z.array(z.string()).describe("Errori frequenti e trabocchetti d'esame tipici"),
  codeSnippets: z.array(CodeSnippetSchema).default([]),
  examQuestions: z.array(z.string()).min(1).describe("Domande frequenti durante esami e colloqui tecnici")
});

/**
 * Schema per l'intero modulo didattico (es. JavaScript, React, CSS, SQL).
 */
export const DispensaModuleSchema = z.object({
  moduleId: z.enum(["css", "javascript", "react", "sql"]),
  moduleName: z.string(),
  description: z.string(),
  totalLessons: z.number().int().positive(),
  lessons: z.array(DispensaLessonSchema)
});

/**
 * Schema della Knowledge Base complessiva.
 */
export const DispenseKnowledgeBaseSchema = z.record(
  z.enum(["css", "javascript", "react", "sql"]),
  DispensaModuleSchema
);
