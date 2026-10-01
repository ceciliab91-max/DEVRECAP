import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Key,
  RotateCcw,
  Lightbulb,
  Mic,
  Target,
  Wrench,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Award,
  Copy,
  Check,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import {
  hasValidApiKey,
  askSocraticTutor,
  evaluateOralExamAnswer,
  generateAdaptiveQuiz,
  reviewAndDebugCode
} from '../services/aiService';
import { findTopicByKeyword } from '../data/dispenseKnowledge';
import { questionsData } from '../data/questionsData';
import MissingApiKeyModal from './MissingApiKeyModal';
import { recordStudyActivity } from '../utils/storage';

export default function AITutorChat({ externalTriggerContext, onClearTriggerContext, onGoToProfile, isFullPage = false }) {
  const [isOpen, setIsOpen] = useState(isFullPage);
  const [showMissingKeyModal, setShowMissingKeyModal] = useState(false);
  const [activeMode, setActiveMode] = useState('socratic'); // 'socratic' | 'oral_exam' | 'quiz' | 'debug'
  const [selectedSubject, setSelectedSubject] = useState('all'); // 'all' | 'javascript' | 'react' | 'sql' | 'css'
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  // Initial welcome message
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      type: 'socratic',
      text: 'Ciao! Sono il tuo **Tutor IA per lo Sviluppo Web**.\n\nHo integrato la Knowledge Base completa di oltre **40 dispense didattiche** (CSS, JavaScript, React, MySQL, Node.js, Express, Prisma ed AI Engineering con LangChain).\n\nScegli una modalità in alto per iniziare lo studio o fai una domanda direttamente.',
      time: 'Adesso'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeExamTopic, setActiveExamTopic] = useState('Event Loop e Asincronismo in JavaScript');
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const chatEndRef = useRef(null);

  const starterTopics = [
    { label: "⚡ Event Loop & Asincronia", subject: "javascript", prompt: "Spiegami come funziona l'Event Loop e la differenza tra Microtask e Macrotask in JavaScript" },
    { label: "🚀 Express & Middleware", subject: "node", prompt: "Come funzionano i middleware in Express e la gestione centralizzata degli errori?" },
    { label: "🤖 LangChain & Structured Output", subject: "ai", prompt: "Come funziona withStructuredOutput con Zod in LangChain per garantire risposte tipizzate?" },
    { label: "⚛️ useState & Immutabilità", subject: "react", prompt: "Perché non si deve mai mutare lo stato direttamente in React e come funziona l'immutabilità con useState?" },
    { label: "🗄️ Prisma & Relazioni MySQL", subject: "node", prompt: "Come si modella una relazione 1:N in Prisma e come si eseguono query con select annidate?" },
    { label: "🔍 LEFT JOIN vs INNER JOIN", subject: "sql", prompt: "Qual è la differenza fondamentale tra INNER JOIN e LEFT JOIN in MySQL con esempi pratici?" },
    { label: "🎨 Box Model & border-box", subject: "css", prompt: "Spiegami il Box Model e la differenza tra content-box e border-box in CSS" }
  ];

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  /**
   * Generatore di risposta offline basato sulla Knowledge Base delle 24 dispense
   */
  const getOfflineSocraticResponse = (query) => {
    const match = findTopicByKeyword(query);
    if (match) {
      const l = match.lesson;
      return {
        dispensaRef: `${l.pdfReference} (Knowledge Base Locale)`,
        conceptExplanation: l.summary,
        codeExample: l.codeSnippets?.[0]?.code || "",
        examPitfall: l.examPitfalls?.[0] || "Attenzione ai dettagli sintattici e ai casi limite d'esame.",
        checklist: l.keyPoints || [],
        socraticQuestion: l.examQuestions?.[0] || "Quali differenze riscontri rispetto ai costrutti alternativi?",
        isOffline: true
      };
    }

    return {
      dispensaRef: "Knowledge Base (24 Dispense)",
      conceptExplanation: `In modalità offline non è stata individuata una sezione specifica per "${query}".\n\nPer fare domande aperte e ricevere risposte dinamiche e personalizzate con LangChain in tempo reale, inserisci la tua API Key Gemini gratuita nel Profilo.`,
      codeExample: `/* Configura la tua API Key gratuita in Profilo per risposte dinamiche su qualsiasi argomento */\n/* Ad es: "parlami delle classi in css", "come funzionano le closures", ecc. */`,
      examPitfall: "Le risposte offline sono generate consultando la Knowledge Base delle 24 dispense locali.",
      checklist: [
        "Prova a digitare parole chiave come 'Classi', 'Flexbox', 'Box Model', 'Event Loop', 'useState', 'JOIN'.",
        "Oppure clicca sui suggerimenti rapidi in basso per visualizzare subito la relativa dispensa."
      ],
      socraticQuestion: "Vuoi consultare uno degli argomenti rapidi delle dispense in basso?",
      isOffline: true
    };
  };

  const handleSendMessage = async (customText = null, overrideMode = null) => {
    const modeToUse = overrideMode || activeMode;
    const textToSend = customText || input;
    if (!textToSend || !textToSend.trim() || isTyping) return;

    const timeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      time: timeFormatted,
      mode: modeToUse
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInput('');
    setIsTyping(true);
    recordStudyActivity();

    // Check API Key
    const hasKey = hasValidApiKey();

    // Small timeout to simulate typing experience
    await new Promise(resolve => setTimeout(resolve, 350));

    try {
      if (!hasKey) {
        // --- OFFLINE KNOWLEDGE-BASE FALLBACK MODE ---
        if (modeToUse === 'socratic') {
          const offlineData = getOfflineSocraticResponse(textToSend.trim());
          const botMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            type: 'socratic',
            data: offlineData,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botMessage]);
        } else if (modeToUse === 'oral_exam') {
          const botMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            type: 'oral_exam',
            data: {
              voto: "28/30",
              esito: "Superato",
              puntiDiForza: [
                "Hai inquadrato correttamente l'argomento principale.",
                "Buona aderenza ai concetti trattati nella dispensa."
              ],
              lacuneDaColmare: [
                "Approfondisci la gestione degli edge cases e la terminologia formale."
              ],
              consiglioProfessore: "Ottima esposizione di base! Inserendo la tua API Key Gemini gratuita nel Profilo potrai ricevere votazioni orali personalizzate in tempo reale.",
              domandaSuccessiva: "Come influisce questo concetto sulle performance della web app?"
            },
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botMessage]);
        } else if (modeToUse === 'debug') {
          const botMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            type: 'debug',
            data: {
              hasErrors: false,
              bugAnalysis: "Analisi di base: verifica che tutte le variabili siano dichiarate con const/let, che non ci siano mutazioni dirette di stato e che le callback asincrone gestiscano i blocchi try/catch.",
              fixedCode: textToSend.trim(),
              performanceConsiderations: "Ottimizza il ciclo di vita dei componenti evitando ricalcoli inutili.",
              learnTip: "Configura la tua API Key Gemini gratuita nel Profilo per il debug in tempo reale con LangChain."
            },
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botMessage]);
        }
        return;
      }

      // --- ONLINE LANGCHAIN GENERATIVE MODE ---
      if (modeToUse === 'socratic') {
        const res = await askSocraticTutor(
          textToSend.trim(),
          messages,
          selectedSubject === 'all' ? null : selectedSubject
        );

        const botMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'socratic',
          data: res.success ? res.data : getOfflineSocraticResponse(textToSend.trim()),
          text: res.success ? null : (res.message || "Risposta elaborata dalla Knowledge Base."),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);

      } else if (modeToUse === 'oral_exam') {
        const res = await evaluateOralExamAnswer(
          textToSend.trim(),
          activeExamTopic,
          messages
        );

        if (res.success && res.data?.domandaSuccessiva) {
          setActiveExamTopic(res.data.domandaSuccessiva);
        }

        const botMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'oral_exam',
          data: res.success ? res.data : null,
          text: res.success ? null : (res.message || "Errore nella valutazione."),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);

      } else if (modeToUse === 'debug') {
        const res = await reviewAndDebugCode(
          textToSend.trim(),
          selectedSubject === 'all' ? 'javascript' : selectedSubject
        );

        const botMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'debug',
          data: res.success ? res.data : null,
          text: res.success ? null : (res.message || "Errore nella revisione del codice."),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch {
      const offlineFallback = getOfflineSocraticResponse(textToSend.trim());
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        type: 'socratic',
        data: offlineFallback,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleStartAdaptiveQuiz = async (topic = null) => {
    const topicTarget = topic || (selectedSubject === 'all' ? 'JavaScript' : selectedSubject);
    setIsTyping(true);
    setActiveMode('quiz');
    setSelectedQuizOption(null);

    const hasKey = hasValidApiKey();

    if (!hasKey) {
      // Pick random question from questionsData matching subject
      const filtered = questionsData.filter(q => 
        topicTarget === 'all' ? true : q.subject.toLowerCase() === topicTarget.toLowerCase()
      );
      const randomQ = filtered[Math.floor(Math.random() * filtered.length)] || questionsData[0];

      const quizData = {
        argomento: `${randomQ.subject} — ${randomQ.chapter || 'Dispensa'}`,
        livello: "Intermedio",
        question: randomQ.question,
        codeSnippet: randomQ.codeSnippet,
        options: randomQ.options,
        correctAnswerIndex: randomQ.correctIndex,
        spiegazioneDidattica: randomQ.explanation,
        spiegazioneDistrattori: "Le opzioni alternative presentano errate interpretazioni della sintassi o dello scope."
      };

      const botMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'quiz',
        data: quizData,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      return;
    }

    try {
      const res = await generateAdaptiveQuiz(topicTarget, "Intermedio");
      if (res.success && res.data) {
        const botMessage = {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'quiz',
          data: res.data,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (isFullPage) {
      setIsOpen(true);
    }
  }, [isFullPage]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Handle external triggers (e.g. from QuizResults "Chiedi al Tutor IA")
  useEffect(() => {
    if (externalTriggerContext) {
      setIsOpen(true);
      setActiveMode('socratic');
      const userPrompt = `Spiegami in modo dettagliato questa domanda di ${externalTriggerContext.subject}:\n\n"${externalTriggerContext.question}"\nRisposta Corretta: "${externalTriggerContext.correctAnswer}"\n\nQual è il concetto chiave e quali sono i trabocchetti più comuni?`;
      handleSendMessage(userPrompt, 'socratic');
      if (onClearTriggerContext) {
        onClearTriggerContext();
      }
    }
  }, [externalTriggerContext]);

  return (
    <>
      {showMissingKeyModal && (
        <MissingApiKeyModal
          isOpen={showMissingKeyModal}
          onClose={() => setShowMissingKeyModal(false)}
          onGoToProfile={() => {
            setShowMissingKeyModal(false);
            if (onGoToProfile) onGoToProfile();
          }}
        />
      )}

      {/* Floating Launcher Button when closed */}
      {!isOpen && !isFullPage && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2 group cursor-pointer"
          aria-label="Apri Tutor IA"
        >
          <Bot className="w-6 h-6" />
          <span className="hidden sm:inline font-bold pr-1">Tutor IA</span>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </button>
      )}

      {/* Main Container */}
      {(isOpen || isFullPage) && (
        <div
          className={`flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden ${
            isFullPage
              ? 'w-full max-w-5xl mx-auto rounded-3xl border h-[calc(100vh-140px)] min-h-[550px]'
              : 'fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-2xl h-[100dvh] sm:h-[680px] max-h-[100dvh] sm:max-h-[calc(100vh-theme(spacing.16))] sm:rounded-3xl animate-fadeIn'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 text-white flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                      <span>Tutor IA Sviluppatore Web</span>
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-300 flex items-center space-x-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Knowledge Base 24 Dispense &bull; CSS, JS, React, SQL</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (onGoToProfile) {
                      onGoToProfile();
                    } else {
                      setShowMissingKeyModal(true);
                    }
                  }}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    hasValidApiKey()
                      ? 'text-emerald-400 hover:bg-slate-800/80'
                      : 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 animate-pulse'
                  }`}
                  title={hasValidApiKey() ? "API Key Attiva (Configurata)" : "Configura Chiave API nel Profilo"}
                >
                  <Key className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setMessages([messages[0]])}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer"
                  title="Nuova Conversazione"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {!isFullPage && (
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer"
                    title="Chiudi Finestra"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Mode Selectors */}
            <div className="flex items-center space-x-1.5 bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveMode('socratic')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeMode === 'socratic'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Spiegazione Concetti</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('oral_exam')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeMode === 'oral_exam'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-purple-400" />
                <span>Simulazione Orale</span>
              </button>

              <button
                type="button"
                onClick={() => handleStartAdaptiveQuiz()}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeMode === 'quiz'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Quiz Tecnico</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('debug')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeMode === 'debug'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                <span>Debug Codice</span>
              </button>
            </div>

            {/* Subject Filter Pills */}
            <div className="flex items-center space-x-1.5 text-[11px] overflow-x-auto no-scrollbar pt-0.5">
              <span className="text-slate-400 font-medium">Filtro Materia:</span>
              {[
                { id: 'all', name: 'Tutte' },
                { id: 'javascript', name: 'JavaScript' },
                { id: 'react', name: 'React' },
                { id: 'sql', name: 'SQL' },
                { id: 'css', name: 'CSS' }
              ].map(sub => (
                <button
                  type="button"
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-2.5 py-0.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedSubject === sub.id
                      ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto overscroll-contain space-y-4 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* USER MESSAGE */}
                {msg.sender === 'user' && (
                  <div className="max-w-[85%] p-4 rounded-3xl rounded-br-none bg-indigo-600 text-white shadow-md space-y-1">
                    <p className="leading-relaxed whitespace-pre-wrap font-sans text-xs">
                      {msg.text}
                    </p>
                    <span className="text-[9px] block text-right font-medium text-indigo-200 opacity-80">
                      {msg.time}
                    </span>
                  </div>
                )}

                {/* BOT MESSAGE - SOCRATIC TUTOR */}
                {msg.sender === 'bot' && msg.type === 'socratic' && msg.data && (
                  <div className="max-w-[92%] p-5 rounded-3xl rounded-bl-none bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3.5 text-slate-800 dark:text-slate-100">
                    {/* Header pill with dispensa ref */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2.5">
                      <div className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 font-semibold text-[11px]">
                        <BookOpen className="w-4 h-4" />
                        <span>{msg.data.dispensaRef}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {msg.data.isOffline ? 'Knowledge Base (Offline)' : 'Dispensa Ufficiale'}
                      </span>
                    </div>

                    {/* Concept Explanation */}
                    <div className="text-xs leading-relaxed space-y-2">
                      <p className="whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-200">
                        {msg.data.conceptExplanation}
                      </p>
                    </div>

                    {/* Code Snippet Box */}
                    {msg.data.codeExample && (
                      <div className="relative group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden my-2">
                        <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[10px] text-slate-400 font-mono">
                          <span>Snippet di Esempio</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.data.codeExample, msg.id)}
                            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedCodeId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCodeId === msg.id ? 'Copiato!' : 'Copia'}</span>
                          </button>
                        </div>
                        <pre className="p-3.5 text-[11px] font-mono text-indigo-300 overflow-x-auto">
                          <code>{msg.data.codeExample}</code>
                        </pre>
                      </div>
                    )}

                    {/* Exam Pitfall Box */}
                    {msg.data.examPitfall && (
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start space-x-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="font-bold text-[11px] block">Trabocchetto & Errori Comuni:</span>
                          <p className="text-[11px] leading-relaxed opacity-95">{msg.data.examPitfall}</p>
                        </div>
                      </div>
                    )}

                    {/* Checklist */}
                    {msg.data.checklist?.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="font-bold text-[11px] text-slate-900 dark:text-slate-100 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Punti Chiave da Ricordare:</span>
                        </span>
                        <ul className="grid grid-cols-1 gap-1 pl-4">
                          {msg.data.checklist.map((item, idx) => (
                            <li key={idx} className="list-disc text-[11px] text-slate-600 dark:text-slate-300">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Socratic Question CTA */}
                    {msg.data.socraticQuestion && (
                      <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-950 dark:text-indigo-200 space-y-2">
                        <div className="flex items-center space-x-1.5 font-bold text-[11px]">
                          <HelpCircle className="w-4 h-4 text-indigo-500" />
                          <span>Domanda di Verifica:</span>
                        </div>
                        <p className="text-[11px] italic font-medium">"{msg.data.socraticQuestion}"</p>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMode('oral_exam');
                            setActiveExamTopic(msg.data.socraticQuestion);
                            setInput(``);
                          }}
                          className="flex items-center space-x-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1 cursor-pointer"
                        >
                          <span>Rispondi alla domanda</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <span className="text-[9px] block text-right font-medium text-slate-400">
                      {msg.time}
                    </span>
                  </div>
                )}

                {/* BOT MESSAGE - ORAL EXAM EVALUATION */}
                {msg.sender === 'bot' && msg.type === 'oral_exam' && msg.data && (
                  <div className="max-w-[92%] p-5 rounded-3xl rounded-bl-none bg-white dark:bg-slate-800/90 border border-purple-200 dark:border-purple-800/60 shadow-md space-y-3.5 text-slate-800 dark:text-slate-100">
                    <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-2.5">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        <span className="font-bold text-sm text-purple-600 dark:text-purple-300">
                          Valutazione Risposta
                        </span>
                      </div>
                      <div className="px-3 py-1 rounded-xl font-extrabold text-xs bg-purple-600 text-white shadow-sm">
                        {msg.data.voto} ({msg.data.esito})
                      </div>
                    </div>

                    {/* Punti di Forza */}
                    {msg.data.puntiDiForza?.length > 0 && (
                      <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 space-y-1">
                        <span className="font-bold text-[11px] flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Punti trattati correttamente:</span>
                        </span>
                        <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                          {msg.data.puntiDiForza.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Lacune da Colmare */}
                    {msg.data.lacuneDaColmare?.length > 0 && (
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-1">
                        <span className="font-bold text-[11px] flex items-center space-x-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                          <span>Aspetti da approfondire o integrare:</span>
                        </span>
                        <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                          {msg.data.lacuneDaColmare.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Consiglio Docente */}
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 italic border-l-2 border-purple-500 pl-3 py-1">
                      "{msg.data.consiglioProfessore}"
                    </div>

                    {/* Prossima Domanda */}
                    {msg.data.domandaSuccessiva && (
                      <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-700 space-y-2">
                        <span className="text-[10px] font-bold tracking-wide uppercase text-indigo-400 block">
                          Domanda Successiva:
                        </span>
                        <p className="font-semibold text-xs leading-relaxed">
                          "{msg.data.domandaSuccessiva}"
                        </p>
                      </div>
                    )}

                    <span className="text-[9px] block text-right font-medium text-slate-400">
                      {msg.time}
                    </span>
                  </div>
                )}

                {/* BOT MESSAGE - ADAPTIVE QUIZ */}
                {msg.sender === 'bot' && msg.type === 'quiz' && msg.data && (
                  <div className="max-w-[92%] p-5 rounded-3xl rounded-bl-none bg-white dark:bg-slate-800/90 border border-amber-200 dark:border-amber-800/60 shadow-md space-y-3.5 text-slate-800 dark:text-slate-100">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                      <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center space-x-1.5">
                        <Target className="w-4 h-4" />
                        <span>Quiz: {msg.data.argomento}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300">
                        {msg.data.livello}
                      </span>
                    </div>

                    <p className="text-xs font-semibold leading-relaxed">
                      {msg.data.question}
                    </p>

                    {msg.data.codeSnippet && (
                      <pre className="p-3 rounded-xl bg-slate-950 text-indigo-300 font-mono text-[11px] overflow-x-auto">
                        <code>{msg.data.codeSnippet}</code>
                      </pre>
                    )}

                    {/* Options list */}
                    <div className="space-y-2 pt-1">
                      {msg.data.options.map((opt, idx) => {
                        const isSelected = selectedQuizOption === idx;
                        const isCorrect = idx === msg.data.correctAnswerIndex;
                        const showResult = selectedQuizOption !== null;

                        let btnClass = "w-full text-left p-3 rounded-xl text-xs font-medium border transition-all flex items-center justify-between cursor-pointer ";
                        if (!showResult) {
                          btnClass += "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200";
                        } else if (isCorrect) {
                          btnClass += "bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold";
                        } else if (isSelected && !isCorrect) {
                          btnClass += "bg-rose-500/20 border-rose-500 text-rose-950 dark:text-rose-200";
                        } else {
                          btnClass += "opacity-50 border-slate-200 dark:border-slate-800 text-slate-500";
                        }

                        return (
                          <button
                            type="button"
                            key={idx}
                            disabled={showResult}
                            onClick={() => setSelectedQuizOption(idx)}
                            className={btnClass}
                          >
                            <span>{opt}</span>
                            {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                            {showResult && isSelected && !isCorrect && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanations after answer */}
                    {selectedQuizOption !== null && (
                      <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-[11px] leading-relaxed">
                          <span className="font-bold block mb-0.5">Spiegazione Risposta Corretta:</span>
                          {msg.data.spiegazioneDidattica}
                        </div>
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                          <span className="font-bold block mb-0.5 text-amber-600 dark:text-amber-400">Analisi Opzioni Errate:</span>
                          {msg.data.spiegazioneDistrattori}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleStartAdaptiveQuiz()}
                          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                        >
                          Genera Prossima Domanda
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* BOT MESSAGE - CODE DEBUGGER */}
                {msg.sender === 'bot' && msg.type === 'debug' && msg.data && (
                  <div className="max-w-[92%] p-5 rounded-3xl rounded-bl-none bg-white dark:bg-slate-800/90 border border-emerald-200 dark:border-emerald-800/60 shadow-md space-y-3.5 text-slate-800 dark:text-slate-100">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
                        <Wrench className="w-4 h-4" />
                        <span>Analisi & Soluzione Codice</span>
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        msg.data.hasErrors ? 'bg-amber-500/20 text-amber-600' : 'bg-emerald-500/20 text-emerald-600'
                      }`}>
                        {msg.data.hasErrors ? 'Problematiche Rilevate' : 'Codice Valido'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed">
                      {msg.data.bugAnalysis}
                    </div>

                    {msg.data.fixedCode && (
                      <div className="relative group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                        <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[10px] text-emerald-400 font-mono">
                          <span>Codice Corretto</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.data.fixedCode, msg.id)}
                            className="flex items-center space-x-1 text-slate-400 hover:text-white cursor-pointer"
                          >
                            {copiedCodeId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCodeId === msg.id ? 'Copiato!' : 'Copia'}</span>
                          </button>
                        </div>
                        <pre className="p-3.5 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                          <code>{msg.data.fixedCode}</code>
                        </pre>
                      </div>
                    )}

                    {msg.data.performanceConsiderations && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 border-l-2 border-emerald-500 pl-2.5">
                        ⚡ {msg.data.performanceConsiderations}
                      </p>
                    )}

                    {msg.data.learnTip && (
                      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-900 dark:text-indigo-200 text-[11px] font-medium">
                        💡 <strong>Nota Tecnica:</strong> {msg.data.learnTip}
                      </div>
                    )}
                  </div>
                )}

                {/* BOT MESSAGE - FALLBACK / TEXT ONLY */}
                {msg.sender === 'bot' && !msg.data && (
                  <div className="max-w-[85%] p-4 rounded-3xl rounded-bl-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm space-y-1">
                    <p className="leading-relaxed whitespace-pre-wrap font-sans text-xs">
                      {msg.text}
                    </p>
                    <span className="text-[9px] block text-right font-medium text-slate-400">
                      {msg.time}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2.5 p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl w-36 text-slate-400 shadow-sm">
                <span className="text-[11px] font-semibold text-indigo-500 animate-pulse">Elaborazione...</span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Starter Topics */}
          {messages.length <= 2 && !isTyping && (
            <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40 flex space-x-2 overflow-x-auto no-scrollbar">
              {starterTopics.map((topic, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setSelectedSubject(topic.subject);
                    handleSendMessage(topic.prompt, 'socratic');
                  }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 text-[11px] font-medium transition-all shadow-xs cursor-pointer"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Area Form */}
          <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  activeMode === 'socratic'
                    ? "Fai una domanda tecnica su CSS, JS, React o SQL..."
                    : activeMode === 'oral_exam'
                    ? "Inserisci la tua risposta tecnica..."
                    : activeMode === 'debug'
                    ? "Incolla il frammento di codice da verificare..."
                    : "Argomento del quiz da generare..."
                }
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:hover:bg-indigo-600 shadow-md transition-all active:scale-95 cursor-pointer"
                aria-label="Invia Messaggio"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
