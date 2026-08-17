import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Key, 
  RotateCcw
} from 'lucide-react';

export default function AITutorChat({ externalTriggerContext, onClearTriggerContext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('devexam_gemini_key') || '';
  });
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Ciao! Sono il tuo **Tutor IA per lo sviluppo Web**. Ho una conoscenza approfondita di **CSS**, **JavaScript**, **React** e **SQL**. Come posso aiutarti oggi per il tuo esame?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Handle external triggers (e.g. from QuizResults "Ask AI Tutor")
  useEffect(() => {
    if (externalTriggerContext) {
      setIsOpen(true);
      const userPrompt = `Spiegami in modo dettagliato questa domanda d'esame di ${externalTriggerContext.subject}:\n\nDomanda: "${externalTriggerContext.question}"\nRisposta Corretta: "${externalTriggerContext.correctAnswer}"\n\nPerché la risposta corretta è questa e qual è il concetto dietro?`;
      
      handleSendMessage(userPrompt);
      if (onClearTriggerContext) {
        onClearTriggerContext();
      }
    }
  }, [externalTriggerContext]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const saveApiKey = (key) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    localStorage.setItem('devexam_gemini_key', trimmed);
    setShowKeyInput(false);
  };

  const handleSendMessage = async (customText = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInput('');
    setIsTyping(true);

    // Call Gemini API or fallback
    try {
      const responseText = await fetchGeminiResponse(textToSend.trim(), messages, apiKey);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        isError: true,
        text: `Si è verificato un errore durante la generazione della risposta (${error.message}). Assicurati di inserire una chiave API Gemini valida cliccando l'icona della chiave in alto.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const starterPrompts = [
    "💡 Spiegami il Box Model in CSS",
    "⚡ Cos'è l'Event Loop e i Microtask in JS?",
    "⚛️ Differenza tra useState e useEffect",
    "🔍 Quando usare LEFT JOIN vs INNER JOIN?"
  ];

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <div className="relative">
              <Bot className="w-6 h-6 animate-bounce text-amber-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>
            <span className="hidden sm:inline font-bold">Tutor IA</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-white/20 rounded-md uppercase tracking-wider font-extrabold">Online</span>
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[560px] max-h-[85vh] bg-slate-900/95 dark:bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/80 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-bold text-white text-sm">Tutor IA Sviluppatore Web</h3>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-[11px] text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CSS &bull; JS &bull; React &bull; SQL</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {/* API Key settings button */}
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                className={`p-2 rounded-xl transition-colors ${
                  apiKey ? 'text-emerald-400 hover:bg-slate-800' : 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                }`}
                title="Configura Chiave API Gemini"
              >
                <Key className="w-4 h-4" />
              </button>

              {/* Reset chat button */}
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                title="Cancella Conversazione"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Close Modal button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                title="Chiudi Finestra"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* API Key Modal Banner (if toggled) */}
          {showKeyInput && (
            <div className="p-3 bg-slate-800 border-b border-slate-700 space-y-2 animate-fadeIn text-xs">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span className="flex items-center space-x-1">
                  <Key className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Inserisci Chiave API Gemini</span>
                </span>
                <span className="text-[10px] text-slate-400">Opzionale (.env supportato)</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => saveApiKey(tempKey)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
                >
                  Salva
                </button>
              </div>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl space-y-1 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : msg.isError
                      ? 'bg-red-950/60 border border-red-500/40 text-red-200 rounded-bl-none'
                      : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap font-sans">
                    {msg.text}
                  </p>
                  <span className={`text-[9px] block text-right font-medium opacity-60 ${
                    msg.sender === 'user' ? 'text-indigo-100' : 'text-slate-400'
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 p-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl w-24 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Starter Quick Prompts */}
          {messages.length <= 2 && !isTyping && (
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/50 flex space-x-2 overflow-x-auto no-scrollbar">
              {starterPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-[11px] font-medium transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
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
                placeholder="Fai una domanda sul programma d'esame..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-all shadow-md"
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

// Helper to call Google Gemini API with fallback smart tutor
async function fetchGeminiResponse(userPrompt, conversationHistory, apiKey) {
  const systemPrompt = "Sei un tutor d'esame per sviluppatori web. Rispondi in modo conciso, chiaro ed efficace a qualsiasi dubbio su CSS, JavaScript, React e SQL.";

  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
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

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) return generatedText;
    } catch (e) {
      console.warn("Gemini API direct call error, using local fallback response generator:", e);
    }
  }

  // Fallback Rule-based Intelligent Exam Tutor Response (works offline / without API Key)
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate thinking delay

  const lower = userPrompt.toLowerCase();

  if (lower.includes('box model') || lower.includes('css')) {
    return "📦 **CSS Box Model & Styling:**\nNel CSS Box Model ogni elemento ha 4 strati: Content -> Padding -> Border -> Margin.\nRicorda per l'esame: imposta sempre `box-sizing: border-box;` in modo che il padding e il bordo siano inclusi nella larghezza totale dell'elemento!";
  }
  if (lower.includes('event loop') || lower.includes('microtask') || lower.includes('async')) {
    return "⚡ **Event Loop & Asincronia JS:**\nL'Event Loop gestisce il codice sincrono sul Call Stack e il codice asincrono nelle code.\nLe **Promise** (`.then`, `async/await`) vanno nella **Microtask Queue** ed hanno precedenza assoluta sui Macrotask (`setTimeout`), venendo eseguite immediatamente prima del prossimo repaint.";
  }
  if (lower.includes('usestate') || lower.includes('useeffect') || lower.includes('react')) {
    return "⚛️ **React State & Effects:**\n- `useState`: gestisce lo stato locale e scatena un re-render al cambio valore. Ricorda di non mutare lo stato direttamente!\n- `useEffect`: gestisce i side-effects. L'array di dipendenze `[]` determina quando viene rieseguito (vuoto = solo al montaggio del componente).";
  }
  if (lower.includes('join') || lower.includes('sql') || lower.includes('where') || lower.includes('having')) {
    return "🔍 **SQL & Database Relazionali:**\n- `INNER JOIN`: prende solo i record presenti in entrambe le tabelle.\n- `LEFT JOIN`: prende TUTTI i record della tabella sinistra e i corrispettivi di destra (o NULL).\n- `WHERE` vs `HAVING`: WHERE filtra prima del `GROUP BY`, HAVING filtra i gruppi già aggregati.";
  }

  return `🤖 **Tutor IA (Modalità Ripasso):**\nIn risposta al tuo quesito: "${userPrompt}"\n\nPer superare l'esame con successo, ti consiglio di verificare tre concetti chiave:\n1. La sintassi corretta ed eventuali edge cases.\n2. Le differenze di comportamento rispetto ai metodi alternativi.\n3. Come questo concetto influisce sulle prestazioni della tua applicazione Web.\n\n*Nota: Per sbloccare risposte in tempo reale generate da Gemini, aggiungi la tua chiave API VITE_GEMINI_API_KEY nel file .env o clicca l'icona della chiave in alto.*`;
}
