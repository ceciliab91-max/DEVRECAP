import React from 'react';
import { AlertTriangle, Key, ArrowRight, X, ExternalLink } from 'lucide-react';

export default function MissingApiKeyModal({ isOpen, onClose, onGoToProfile }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-amber-500/40 dark:border-amber-500/40 rounded-2xl shadow-xl overflow-hidden text-slate-900 dark:text-slate-100 p-6 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Chiudi"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 mx-auto">
          <Key className="w-7 h-7 animate-pulse" />
        </div>

        {/* Text Body */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center space-x-2">
            <span>⚠️ Chiave API Mancante</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Inserisci la tua API Key gratuita nel tuo Profilo per abilitare le correzioni e il Tutor IA.
          </p>
        </div>

        {/* Hint Box */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <div className="flex items-center space-x-1.5 font-semibold text-amber-600 dark:text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Perché è necessaria?</span>
          </div>
          <p>
            Il modello "Bring Your Own Key" garantisce che tutte le funzionalità IA avanzate siano disponibili gratuitamente senza limiti o costi di abbonamento.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <button
            onClick={() => {
              onClose();
              if (onGoToProfile) onGoToProfile();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2"
          >
            <Key className="w-4 h-4" />
            <span>Vai al Profilo</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Ottieni Key Gratuita</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
