import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Tag, 
  Trash2, 
  Save, 
  X, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  FolderDown,
  RotateCcw,
  CheckCircle2,
  Clock,
  Code
} from 'lucide-react';
import { recordStudyActivity } from '../utils/storage';

const DEFAULT_NOTES = [
  {
    id: 'note-1',
    title: 'CSS Flexbox & Centraggio Elementi',
    subject: 'CSS',
    tags: ['Flexbox', 'Layout', 'Centraggio'],
    date: '2026-08-18T14:30:00Z',
    snippet: 'La combinazione display: flex, justify-content: center e align-items: center è il metodo più sicuro per centrare sia orizzontalmente che verticalmente.',
    content: `### CSS Flexbox Checklist per l'Esame

1. **Contenitore Flex (\`display: flex\`):**
   - \`justify-content\`: allinea gli elementi lungo l'asse principale (row = orizzontale).
     - Values: \`flex-start\`, \`flex-end\`, \`center\`, \`space-between\`, \`space-around\`, \`space-evenly\`.
   - \`align-items\`: allinea gli elementi lungo l'asse trasversale (cross axis).
     - Values: \`stretch\`, \`center\`, \`flex-start\`, \`flex-end\`, \`baseline\`.

2. **Centraggio Perfetto:**
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`

3. **Trucco Esame:**
Ricorda che \`box-sizing: border-box\` evita che padding e bordi aumentino le dimensioni totali del box!`
  },
  {
    id: 'note-2',
    title: 'Promesse, Async/Await & Microtask Queue in JS',
    subject: 'JavaScript',
    tags: ['Async', 'Promises', 'EventLoop'],
    date: '2026-08-19T10:15:00Z',
    snippet: 'Le funzioni async restituiscono sempre una Promise. I blocchi try...catch sono fondamentali per la gestione degli errori nelle chiamate fetch.',
    content: `### JavaScript Asincrono & Microtask

1. **Gerarchia di Esecuzione dell'Event Loop:**
   - **Call Stack**: Esecuzione del codice sincrono.
   - **Microtask Queue**: Promise (.then, await), MutationObserver (eseguiti subito prima del render!).
   - **Macrotask Queue**: setTimeout, setInterval, I/O.

2. **Pattern Async/Await con Handling Errori:**
\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error(\`HTTP error status: \${response.status}\`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Errore fetch utente:", err);
    throw err;
  }
}
\`\`\``
  },
  {
    id: 'note-3',
    title: 'React State Immutabile & Lifecycle con useEffect',
    subject: 'React',
    tags: ['useState', 'useEffect', 'Hooks'],
    date: '2026-08-20T09:00:00Z',
    snippet: 'Mai mutare lo stato direttamente in React. Utilizza lo spread operator (...) o la callback prev => newState.',
    content: `### Regole d'Oro per gli Hooks in React 18

1. **Immutabilità dello Stato:**
   - Errato: \`user.name = "Mario"\` (non scatena il re-render!)
   - Corretto: \`setUser(prev => ({ ...prev, name: "Mario" }))\`

2. **Array di Dipendenze in useEffect:**
   - \`useEffect(fn, [])\`: eseguito solo 1 volta al montaggio.
   - \`useEffect(fn, [count])\`: eseguito al montaggio e ogni volta che \`count\` cambia.
   - Funzione di Cleanup: ritornare una funzione per pulire timer o event listener.

\`\`\`jsx
useEffect(() => {
  const timer = setTimeout(() => console.log("Tick"), 1000);
  return () => clearTimeout(timer); // Cleanup function!
}, []);
\`\`\``
  },
  {
    id: 'note-4',
    title: 'SQL INNER JOIN vs LEFT JOIN e GROUP BY',
    subject: 'SQL',
    tags: ['Database', 'Joins', 'Queries'],
    date: '2026-08-20T10:00:00Z',
    snippet: 'WHERE filtra le singole righe prima dell’aggregazione, mentre HAVING filtra i gruppi aggregati scaturiti da GROUP BY.',
    content: `### SQL Cheat Sheet per le Join

1. **INNER JOIN**: Restituisce solo le righe che hanno corrispondenza in entrambe le tabelle.
2. **LEFT JOIN**: Restituisce TUTTE le righe della tabella di sinistra (A) e le righe corrispondenti di destra (B). Se non c'è corrispondenza, i campi di B saranno \`NULL\`.

\`\`\`sql
SELECT u.name, COUNT(o.id) AS total_orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING total_orders > 2
ORDER BY total_orders DESC;
\`\`\``
  }
];

export default function Notebook() {
  // 1. NOTES STATE (with localStorage persistence & fallback)
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('devexam_notes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load notes from localStorage", e);
    }
    return DEFAULT_NOTES;
  });

  // 2. SELECTED NOTE BINDING (selectedNoteId)
  const [selectedNoteId, setSelectedNoteId] = useState(() => {
    return DEFAULT_NOTES[0]?.id || null;
  });

  // 3. DRAWER / MODAL STATE (isNoteOpen & setIsNoteOpen)
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  // Filters & Search
  const [activeSubject, setActiveSubject] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Edit draft form state
  const [editForm, setEditForm] = useState({
    title: '',
    subject: 'CSS',
    tags: '',
    snippet: '',
    content: ''
  });

  // Persist notes on change
  useEffect(() => {
    localStorage.setItem('devexam_notes', JSON.stringify(notes));
  }, [notes]);

  // Derived selected note
  const activeNote = notes.find(n => n.id === selectedNoteId) || notes[0] || null;

  // Filtered notes list
  const filteredNotes = notes.filter(note => {
    const matchesSubject = activeSubject === 'ALL' || note.subject === activeSubject;
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.snippet?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Handler: Click note card
  const handleSelectNote = (id) => {
    setSelectedNoteId(id);
    const target = notes.find(n => n.id === id);
    if (target) {
      setEditForm({
        title: target.title,
        subject: target.subject,
        tags: target.tags ? target.tags.join(', ') : '',
        snippet: target.snippet || '',
        content: target.content || ''
      });
    }
    setIsEditing(false);
    setIsNoteOpen(true);
    recordStudyActivity();
  };

  // Handler: Bottom button trigger (Create / Open new note drawer)
  const handleOpenNewNoteDrawer = () => {
    const newId = `note-${Date.now()}`;
    const emptyNote = {
      id: newId,
      title: 'Nuovo Appunto di Studio',
      subject: activeSubject !== 'ALL' ? activeSubject : 'JavaScript',
      tags: ['Appunto', 'Esame'],
      date: new Date().toISOString(),
      snippet: 'Inserisci un breve riepilogo del concetto qui...',
      content: '### Titolo Sezione\nScrivi qui i tuoi appunti, codici di esempio e concetti chiave...'
    };

    setNotes(prev => [emptyNote, ...prev]);
    setSelectedNoteId(newId);
    setEditForm({
      title: emptyNote.title,
      subject: emptyNote.subject,
      tags: emptyNote.tags.join(', '),
      snippet: emptyNote.snippet,
      content: emptyNote.content
    });
    setIsEditing(true);
    setIsNoteOpen(true);
    recordStudyActivity();
  };

  // Save changes to current note
  const handleSaveNote = () => {
    if (!selectedNoteId) return;

    const tagsArray = editForm.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    setNotes(prev => prev.map(n => {
      if (n.id === selectedNoteId) {
        return {
          ...n,
          title: editForm.title.trim() || 'Senza Titolo',
          subject: editForm.subject,
          tags: tagsArray,
          snippet: editForm.snippet.trim(),
          content: editForm.content,
          date: new Date().toISOString()
        };
      }
      return n;
    }));

    setIsEditing(false);
  };

  // Delete current note
  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    if (updated.length > 0) {
      setSelectedNoteId(updated[0].id);
    } else {
      setSelectedNoteId(null);
    }
    setIsNoteOpen(false);
  };

  // Reset to default notes fallback
  const handleResetDefaults = () => {
    setNotes(DEFAULT_NOTES);
    setSelectedNoteId(DEFAULT_NOTES[0].id);
    localStorage.setItem('devexam_notes', JSON.stringify(DEFAULT_NOTES));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Notebook & Raccolta Appunti</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              I Tuoi Appunti ed Estratti di Studio
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Organizza i concetti teorici ed i code snippet principali per l'esame. Clicca su qualsiasi scheda per aprire il pannello di dettaglio o modifica.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleOpenNewNoteDrawer}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Nuovo Appunto</span>
            </button>
          </div>
        </div>

        {/* Google NotebookLM Link Box inside Header */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-md flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Integrazione Dispense con Google NotebookLM</span>
              <p className="text-[11px] text-slate-400">Carica i file PDF/MD delle dispense (CSS, JS, React, SQL) per generare guide ed audio podcast IA.</p>
            </div>
          </div>
          <a
            href="https://notebooklm.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold border border-slate-700 flex items-center space-x-1.5 flex-shrink-0 transition-colors"
          >
            <span>Apri NotebookLM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Subject Filter Pills */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['ALL', 'CSS', 'JavaScript', 'React', 'SQL'].map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeSubject === sub
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sub === 'ALL' ? 'Tutti gli Appunti' : sub}
            </button>
          ))}
        </div>

        {/* Search input & Reset */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca negli appunti..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <button
            onClick={handleResetDefaults}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Ripristina Appunti Predefiniti"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Notes Grid / List */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => {
            const isSelected = selectedNoteId === note.id;

            return (
              <div
                key={note.id}
                onClick={() => handleSelectNote(note.id)}
                className={`cursor-pointer group p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="space-y-3">
                  
                  {/* Top Subject Badge & Date */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      note.subject === 'CSS' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      note.subject === 'JavaScript' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      note.subject === 'React' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                      'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {note.subject}
                    </span>

                    <span className="text-[11px] text-slate-500 flex items-center space-x-1 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(note.date)}</span>
                    </span>
                  </div>

                  {/* Title & Snippet Preview */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {note.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                      {note.snippet || note.content}
                    </p>
                  </div>
                </div>

                {/* Tags & Action Link */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {note.tags && note.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[9px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                    <span>Leggi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback Empty State */
        <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Nessun appunto trovato</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Non ci sono note salvate per la materia o la ricerca selezionata.
          </p>
          <div className="flex items-center justify-center space-x-3 pt-2">
            <button
              onClick={handleOpenNewNoteDrawer}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
            >
              Crea Prima Nota
            </button>
            <button
              onClick={handleResetDefaults}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
            >
              Ripristina Appunti Predefiniti
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating / Sticky Action Button to Trigger Drawer */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={handleOpenNewNoteDrawer}
          className="flex items-center space-x-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs shadow-2xl shadow-indigo-600/40 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Crea Nuovo Appunto</span>
        </button>
      </div>

      {/* READ / EDIT DRAWER / MODAL PANEL (isNoteOpen === true) */}
      {isNoteOpen && activeNote && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-fadeIn">
          
          <div className="w-full max-w-2xl h-full bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                  activeNote.subject === 'CSS' ? 'bg-blue-500/20 text-blue-300' :
                  activeNote.subject === 'JavaScript' ? 'bg-amber-500/20 text-amber-300' :
                  activeNote.subject === 'React' ? 'bg-cyan-500/20 text-cyan-300' :
                  'bg-purple-500/20 text-purple-300'
                }`}>
                  {activeNote.subject}
                </span>
                <span className="text-xs text-slate-400 font-medium">Dettaglio Appunto</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    isEditing ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {isEditing ? 'Anteprima' : 'Modifica'}
                </button>

                <button
                  onClick={() => handleDeleteNote(activeNote.id)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                  title="Elimina Nota"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsNoteOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Chiudi Pannello"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              {!isEditing ? (
                /* READ ONLY VIEW */
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-white leading-tight">{activeNote.title}</h2>
                    <div className="flex items-center space-x-3 text-xs text-slate-500 mt-2">
                      <span>Creato il {formatDate(activeNote.date)}</span>
                      {activeNote.tags && activeNote.tags.length > 0 && (
                        <span>&bull; Tags: {activeNote.tags.join(', ')}</span>
                      )}
                    </div>
                  </div>

                  {activeNote.snippet && (
                    <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 leading-relaxed font-medium">
                      💡 <strong>Sintesi:</strong> {activeNote.snippet}
                    </div>
                  )}

                  {/* Rendered content */}
                  <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
                    {activeNote.content}
                  </div>
                </div>
              ) : (
                /* EDITING FORM VIEW */
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Titolo dell'Appunto:</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Materia:</label>
                      <select
                        value={editForm.subject}
                        onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                      >
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="React">React</option>
                        <option value="SQL">SQL</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Tags (separati da virgola):</label>
                      <input
                        type="text"
                        value={editForm.tags}
                        onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                        placeholder="Flexbox, Hooks, Joins"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Breve Sintesi / Preview:</label>
                    <input
                      type="text"
                      value={editForm.snippet}
                      onChange={(e) => setEditForm({ ...editForm, snippet: e.target.value })}
                      placeholder="Sommario rapido per la card..."
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Contenuto Completo dell'Appunto:</label>
                    <textarea
                      rows={12}
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                    >
                      Annulla
                    </button>
                    <button
                      onClick={handleSaveNote}
                      className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 flex items-center space-x-1.5 shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salva Appunto</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Appunti DevExam Pro</span>
              <button
                onClick={() => setIsNoteOpen(false)}
                className="text-indigo-400 font-bold hover:underline"
              >
                Chiudi
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
