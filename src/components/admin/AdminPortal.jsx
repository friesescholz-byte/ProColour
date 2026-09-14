import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  Eye,
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  Download,
  RefreshCw,
  X,
  Layers,
  Sparkles
} from 'lucide-react';
import { SHOWCASE_CATEGORIES } from '../../data/initialShowcaseProjects.js';
import {
  getShowcaseProjects,
  addShowcaseProject,
  updateShowcaseProject,
  deleteShowcaseProject,
  resetShowcaseProjectsToDefault,
  optimizeImageFileToWebP,
  isAuthenticated,
  loginAdmin,
  logoutAdmin
} from '../../utils/showcaseStorage.js';

export default function AdminPortal() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');

  const [projects, setProjects] = useState([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // Modal / Editor state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'leder',
    desc: '',
    before: '',
    after: ''
  });
  const [formError, setFormError] = useState('');
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [previewMode, setPreviewMode] = useState('after');

  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);

  useEffect(() => {
    const ok = isAuthenticated();
    setAuthed(ok);
    if (ok) {
      setProjects(getShowcaseProjects());
    }

    const handleUpdate = (e) => {
      if (e.detail) {
        setProjects(e.detail);
      }
    };
    window.addEventListener('procolour:showcase-updated', handleUpdate);
    return () => window.removeEventListener('procolour:showcase-updated', handleUpdate);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    if (loginAdmin(passwordInput.trim(), rememberMe)) {
      setAuthed(true);
      setProjects(getShowcaseProjects());
      setPasswordInput('');
    } else {
      setAuthError('Ungültiges Passwort. Bitte überprüfen.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthed(false);
    setPasswordInput('');
  };

  const openNewProjectModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'leder',
      desc: '',
      before: '',
      after: ''
    });
    setFormError('');
    setPreviewMode('after');
    setIsEditorOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title || '',
      category: proj.category || 'leder',
      desc: proj.desc || '',
      before: proj.before || '',
      after: proj.after || ''
    });
    setFormError('');
    setPreviewMode('after');
    setIsEditorOpen(true);
  };

  const handleImageUpload = async (file, type) => {
    if (!file) return;
    setIsProcessingImages(true);
    setFormError('');
    try {
      const optimized = await optimizeImageFileToWebP(file, 1600, 0.85);
      setFormData((prev) => ({
        ...prev,
        [type]: optimized.dataUrl
      }));
    } catch (err) {
      setFormError(err.message || 'Fehler beim Verarbeiten des Bildes.');
    } finally {
      setIsProcessingImages(false);
    }
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Bitte einen Projekttitel angeben.');
      return;
    }
    if (!formData.desc.trim()) {
      setFormError('Bitte eine kurze Beschreibung angeben.');
      return;
    }
    if (!formData.before) {
      setFormError('Bitte ein Vorher-Bild (Schaden) hochladen.');
      return;
    }
    if (!formData.after) {
      setFormError('Bitte ein Nachher-Bild (Repariert) hochladen.');
      return;
    }

    try {
      if (editingId) {
        updateShowcaseProject(editingId, formData);
      } else {
        addShowcaseProject(formData);
      }
      setIsEditorOpen(false);
      setEditingId(null);
    } catch (err) {
      setFormError(err.message || 'Fehler beim Speichern.');
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Möchten Sie das Projekt "${title}" wirklich löschen?`)) {
      deleteShowcaseProject(id);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Möchten Sie alle Vorher/Nachher-Projekte auf die ursprünglichen 3 Standard-Projekte zurücksetzen?'
      )
    ) {
      resetShowcaseProjectsToDefault();
    }
  };

  const handleExportJson = () => {
    const current = getShowcaseProjects();
    const blob = new Blob([JSON.stringify(current, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `procolour-vorher-nachher-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredProjects = projects.filter((p) => {
    if (activeCategoryFilter === 'all') return true;
    return p.category === activeCategoryFilter;
  });

  /* -------------------------------------------------------------
     VIEW 1: LOGIN GATE
  ------------------------------------------------------------- */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-brand-orange/[0.04] to-transparent pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#12151C] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 mb-2">
              <Lock className="w-8 h-8 text-brand-orange" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pro Colour <span className="text-gradient-orange">Admin</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Verwaltung des Vorher & Nachher Bereichs
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Passwort
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Admin-Passwort eingeben"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange transition-colors text-sm"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-black/40 text-brand-orange focus:ring-brand-orange"
                />
                <span>Angemeldet bleiben</span>
              </label>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn-3d-luxury w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Unlock className="w-4 h-4" />
              <span>Anmelden</span>
            </button>
          </form>

          {/* Back link */}
          <div className="text-center pt-2 border-t border-white/10">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Zurück zur Website</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
     VIEW 2: AUTHENTICATED DASHBOARD
  ------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="border-b border-white/10 bg-[#12151C]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/Pro-Colour_Schriftzug_01.webp"
                alt="Pro Colour Logo"
                className="h-6 sm:h-8 w-auto object-contain"
              />
            </a>
            <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/#results"
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-semibold text-slate-200 hover:text-white transition-all inline-flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-brand-orange" />
              <span className="hidden sm:inline">Live-Website ansehen</span>
            </a>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-400 hover:text-red-300 transition-all cursor-pointer"
            >
              Abmelden
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Title Bar & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Vorher & Nachher Projekte
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Lade echte Fotos direkt von deinem Gerät hoch, um den Bereich auf der Startseite zu befüllen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJson}
              title="JSON-Backup herunterladen"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Backup exportieren</span>
            </button>

            <button
              onClick={handleReset}
              title="Auf 3 Standard-Projekte zurücksetzen"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Standard laden</span>
            </button>

            <button
              onClick={openNewProjectModal}
              className="btn-3d-luxury px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Neues Projekt anlegen</span>
            </button>
          </div>
        </div>

        {/* Category Filters Pill Row */}
        <div className="flex flex-wrap items-center gap-2">
          {SHOWCASE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategoryFilter === cat.id
                  ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
          <span className="text-xs text-slate-500 ml-auto hidden sm:inline">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'Projekt' : 'Projekte'} aktiv
          </span>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#12151C] border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-slate-500">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Keine Projekte in dieser Kategorie</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Erstelle dein erstes Vorher/Nachher-Projekt oder wechsle den Filter auf „Alle Arbeiten“.
            </p>
            <button
              onClick={openNewProjectModal}
              className="btn-3d-luxury px-4 py-2 rounded-xl text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Jetzt Projekt anlegen</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => {
              const catObj = SHOWCASE_CATEGORIES.find((c) => c.id === proj.category);
              return (
                <div
                  key={proj.id}
                  className="glass-card-pro rounded-2xl border border-white/15 overflow-hidden flex flex-col justify-between group hover:border-brand-orange/40 transition-all duration-300 shadow-lg"
                >
                  {/* Top Image Preview Duo */}
                  <div className="grid grid-cols-2 gap-1 p-2 bg-black/40 border-b border-white/10 relative">
                    
                    {/* Before Image */}
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-dark-950 border border-white/10">
                      <img
                        src={proj.before}
                        alt={`${proj.title} Vorher`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-red-600/90 text-[10px] font-extrabold uppercase text-white shadow-sm">
                        Vorher
                      </span>
                    </div>

                    {/* After Image */}
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-dark-950 border border-white/10">
                      <img
                        src={proj.after}
                        alt={`${proj.title} Nachher`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-emerald-600/90 text-[10px] font-extrabold uppercase text-white shadow-sm">
                        Nachher
                      </span>
                    </div>

                    {/* Category pill */}
                    <span className="absolute top-3.5 left-3.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-bold text-amber-400">
                      {catObj ? catObj.name : proj.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2 flex-grow">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="px-5 py-3.5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      ID: {proj.id.substring(0, 12)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditProjectModal(proj)}
                        className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.15] text-slate-200 hover:text-white transition-colors cursor-pointer"
                        title="Projekt bearbeiten"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Projekt löschen"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* -------------------------------------------------------------
         PROJECT EDITOR MODAL (NEU / EDIT)
      ------------------------------------------------------------- */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-[#161922] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {editingId ? 'Vorher/Nachher Projekt bearbeiten' : 'Neues Vorher/Nachher Projekt anlegen'}
                </h2>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProject} className="space-y-5">
              
              {/* Title & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Projekttitel *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="z. B. Felgenreparatur Glanzdrehen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange transition-colors text-sm"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Kategorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-brand-orange transition-colors text-sm cursor-pointer"
                  >
                    {SHOWCASE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-[#161922] text-white">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Kurzbeschreibung *
                </label>
                <textarea
                  rows={2}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Was genau wurde repariert? (z. B. Bordsteinschaden punktgenau beilackiert, 100% Farbangleich ohne Neukauf)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange transition-colors text-sm leading-relaxed resize-none"
                  required
                />
              </div>

              {/* -------------------------------------------------------------
                 IMAGE UPLOAD CARDS (VORHER & NACHHER)
              ------------------------------------------------------------- */}
              <div className="space-y-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Bilder hochladen (Direkt vom Computer oder Smartphone) *
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* VORHER IMAGE UPLOAD */}
                  <div className="rounded-2xl border border-white/15 bg-black/30 p-3.5 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-600/80 text-[11px] font-extrabold uppercase text-white">
                        Vorher (Schaden)
                      </span>
                      {formData.before && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, before: '' })}
                          className="text-[11px] text-slate-400 hover:text-red-400 transition-colors"
                        >
                          Entfernen
                        </button>
                      )}
                    </div>

                    {formData.before ? (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-dark-950 border border-white/15 group">
                        <img
                          src={formData.before}
                          alt="Vorher Vorschau"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => beforeInputRef.current?.click()}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold cursor-pointer"
                        >
                          Bild ersetzen
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => beforeInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (e.dataTransfer.files?.[0]) {
                            handleImageUpload(e.dataTransfer.files[0], 'before');
                          }
                        }}
                        className="aspect-[4/3] rounded-xl border-2 border-dashed border-white/20 hover:border-brand-orange/60 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer group"
                      >
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-orange mb-1.5 transition-colors" />
                        <span className="text-xs font-bold text-white">Vorher-Foto wählen</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Hier ablegen oder klicken</span>
                      </div>
                    )}

                    <input
                      ref={beforeInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageUpload(e.target.files[0], 'before');
                        }
                      }}
                      className="hidden"
                    />
                  </div>

                  {/* NACHHER IMAGE UPLOAD */}
                  <div className="rounded-2xl border border-white/15 bg-black/30 p-3.5 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-600/80 text-[11px] font-extrabold uppercase text-white">
                        Nachher (Repariert)
                      </span>
                      {formData.after && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, after: '' })}
                          className="text-[11px] text-slate-400 hover:text-red-400 transition-colors"
                        >
                          Entfernen
                        </button>
                      )}
                    </div>

                    {formData.after ? (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-dark-950 border border-white/15 group">
                        <img
                          src={formData.after}
                          alt="Nachher Vorschau"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => afterInputRef.current?.click()}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold cursor-pointer"
                        >
                          Bild ersetzen
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => afterInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (e.dataTransfer.files?.[0]) {
                            handleImageUpload(e.dataTransfer.files[0], 'after');
                          }
                        }}
                        className="aspect-[4/3] rounded-xl border-2 border-dashed border-white/20 hover:border-brand-orange/60 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer group"
                      >
                        <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-orange mb-1.5 transition-colors" />
                        <span className="text-xs font-bold text-white">Nachher-Foto wählen</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Hier ablegen oder klicken</span>
                      </div>
                    )}

                    <input
                      ref={afterInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageUpload(e.target.files[0], 'after');
                        }
                      }}
                      className="hidden"
                    />
                  </div>

                </div>
              </div>

              {/* Interaktive Live-Vorschau Switch (wenn beide Bilder vorhanden sind) */}
              {formData.before && formData.after && (
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Interaktive Schalter-Prüfung:</span>
                    <div className="flex bg-black/80 p-0.5 rounded-lg border border-white/15">
                      <button
                        type="button"
                        onClick={() => setPreviewMode('before')}
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                          previewMode === 'before' ? 'bg-red-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Vorher
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode('after')}
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                          previewMode === 'after' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Nachher
                      </button>
                    </div>
                  </div>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-dark-950 border border-white/10">
                    <img
                      src={previewMode === 'before' ? formData.before : formData.after}
                      alt="Live Umschalter Vorschau"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {formError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Processing Spinner */}
              {isProcessingImages && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs">
                  <RefreshCw className="w-4 h-4 shrink-0 animate-spin" />
                  <span>Foto wird automatisch komprimiert und in performantes WebP konvertiert...</span>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isProcessingImages}
                  className="btn-3d-luxury px-5 py-2 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingId ? 'Änderungen speichern' : 'Projekt veröffentlichen'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
