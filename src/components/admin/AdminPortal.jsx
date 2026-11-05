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
  Sparkles,
  ShieldCheck,
  Mail,
  Database
} from 'lucide-react';
import { SHOWCASE_CATEGORIES } from '../../data/initialShowcaseProjects.js';
import {
  getShowcaseProjects,
  fetchShowcaseProjects,
  addShowcaseProject,
  updateShowcaseProject,
  deleteShowcaseProject,
  resetShowcaseProjectsToDefault,
  optimizeImageFileToWebP,
  isAuthenticated,
  loginAdmin,
  verify2FA,
  resend2FA,
  logoutAdmin
} from '../../utils/showcaseStorage.js';

export default function AdminPortal() {
  const [authed, setAuthed] = useState(false);
  const [loginStep, setLoginStep] = useState('password'); // 'password' | '2fa'
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // 2FA State (Weymann-Architektur)
  const [challengeId, setChallengeId] = useState('');
  const [twoFactorEmail, setTwoFactorEmail] = useState('info@pro-colour.de');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [isResending2FA, setIsResending2FA] = useState(false);
  const [resendNotice, setResendNotice] = useState('');

  // Dashboard & KV State
  const [projects, setProjects] = useState([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [isRefreshingKv, setIsRefreshingKv] = useState(false);
  const [statusNotice, setStatusNotice] = useState('');

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
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('after');

  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);

  // Cloudflare Turnstile State & Refs (Weymann-Architektur)
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Toast / Status banner helper
  const showNotice = (msg) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(''), 3500);
  };

  // Turnstile Widget initialisieren (mit Polling & StrictMode-Schutz)
  useEffect(() => {
    if (authed || loginStep !== 'password') return;
    let interval;

    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
        try {
          turnstileRef.current.innerHTML = '';
          widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
            sitekey: '0x4AAAAAAFRMeJsz5tYEMNjg',
            callback: (token) => {
              setTurnstileToken(token);
              setAuthError('');
            },
            'expired-callback': () => setTurnstileToken(''),
            theme: 'dark'
          });
          if (interval) clearInterval(interval);
        } catch (e) {
          console.error('Turnstile render error:', e);
        }
      }
    };

    renderWidget();

    if (!widgetIdRef.current) {
      interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [authed, loginStep]);

  // Auth & KV Initialisierung
  useEffect(() => {
    const ok = isAuthenticated();
    setAuthed(ok);
    if (ok) {
      setProjects(getShowcaseProjects());
      fetchShowcaseProjects().then((fresh) => {
        if (fresh && Array.isArray(fresh)) {
          setProjects(fresh);
        }
      });
    }

    const handleUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setProjects(e.detail);
      }
    };
    window.addEventListener('procolour:showcase-updated', handleUpdate);
    return () => window.removeEventListener('procolour:showcase-updated', handleUpdate);
  }, []);

  // Schritt 1: Passwort + Turnstile
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!turnstileToken) {
      setAuthError('Bitte bestätigen Sie kurz den Cloudflare Spam-Schutz.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await loginAdmin(passwordInput.trim(), rememberMe, turnstileToken);
      if (res.success) {
        if (res.require2FA) {
          setLoginStep('2fa');
          setChallengeId(res.challengeId);
          setTwoFactorEmail(res.email || 'info@pro-colour.de');
          setTwoFactorCode('');
          setResendNotice('Sicherheitscode wurde soeben versendet!');
        } else {
          setAuthed(true);
          setPasswordInput('');
          const fresh = await fetchShowcaseProjects();
          setProjects(fresh);
        }
      } else {
        setAuthError(res.error || 'Ungültiges Passwort. Bitte überprüfen.');
        if (window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.reset(widgetIdRef.current);
            setTurnstileToken('');
          } catch (err) {}
        }
      }
    } catch (err) {
      setAuthError('Verbindungsfehler beim Anmelden.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Schritt 2: 2FA-Code verifizieren
  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setAuthError('');
    setResendNotice('');

    const cleanCode = twoFactorCode.trim();
    if (!cleanCode || cleanCode.length < 6) {
      setAuthError('Bitte den vollständigen 6-stelligen Sicherheitscode eingeben.');
      return;
    }

    setIsVerifying2FA(true);
    try {
      const res = await verify2FA(challengeId, cleanCode, rememberDevice);
      if (res.success) {
        setAuthed(true);
        setLoginStep('password');
        setPasswordInput('');
        setTwoFactorCode('');
        setChallengeId('');
        const fresh = await fetchShowcaseProjects();
        setProjects(fresh);
        showNotice('Erfolgreich angemeldet. Daten aus Cloudflare KV geladen.');
      } else {
        setAuthError(res.error || 'Ungültiger oder abgelaufener Sicherheitscode.');
      }
    } catch (err) {
      setAuthError('Fehler bei der Bestätigung des Sicherheitscodes.');
    } finally {
      setIsVerifying2FA(false);
    }
  };

  // 2FA Code erneut anfordern
  const handleResend2FA = async () => {
    setAuthError('');
    setResendNotice('');
    setIsResending2FA(true);
    try {
      const res = await resend2FA(passwordInput.trim());
      if (res.success) {
        if (res.challengeId) setChallengeId(res.challengeId);
        setResendNotice('Ein neuer 6-stelliger Code wurde erfolgreich versendet!');
      } else {
        setAuthError(res.error || 'Fehler beim erneuten Senden des Codes.');
      }
    } catch (err) {
      setAuthError('Konnte keinen neuen Code versenden.');
    } finally {
      setIsResending2FA(false);
    }
  };

  const handleBackToPassword = () => {
    setLoginStep('password');
    setAuthError('');
    setResendNotice('');
    setTwoFactorCode('');
    setTurnstileToken('');
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthed(false);
    setLoginStep('password');
    setPasswordInput('');
    setTwoFactorCode('');
    setChallengeId('');
  };

  const handleRefreshFromKv = async () => {
    setIsRefreshingKv(true);
    try {
      const fresh = await fetchShowcaseProjects();
      setProjects(fresh);
      showNotice('Live-Daten erfolgreich aus Cloudflare KV synchronisiert!');
    } catch (err) {
      alert('Fehler beim Abrufen aus Cloudflare KV.');
    } finally {
      setIsRefreshingKv(false);
    }
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

  const handleSaveProject = async (e) => {
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

    setIsSaving(true);
    setFormError('');
    try {
      let updated;
      if (editingId) {
        updated = await updateShowcaseProject(editingId, formData);
      } else {
        updated = await addShowcaseProject(formData);
      }
      setProjects(updated);
      setIsEditorOpen(false);
      setEditingId(null);
      showNotice('Projekt erfolgreich in Cloudflare KV gespeichert & für alle Besucher synchronisiert!');
    } catch (err) {
      setFormError(err.message || 'Fehler beim Speichern in Cloudflare KV.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Möchten Sie das Projekt "${title}" wirklich löschen?`)) {
      try {
        const updated = await deleteShowcaseProject(id);
        setProjects(updated);
        showNotice('Projekt erfolgreich gelöscht.');
      } catch (err) {
        alert('Fehler beim Löschen: ' + (err.message || 'Unbekannter Fehler'));
      }
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        'Möchten Sie alle Vorher/Nachher-Projekte in Cloudflare KV auf die Standard-Projekte zurücksetzen?'
      )
    ) {
      try {
        const resetProjects = await resetShowcaseProjectsToDefault();
        setProjects(resetProjects);
        showNotice('Projekte in Cloudflare KV auf Standard zurückgesetzt.');
      } catch (err) {
        alert('Fehler beim Zurücksetzen: ' + (err.message || 'Unbekannter Fehler'));
      }
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
     VIEW 1: LOGIN GATE (PASSWORT ODER 2FA)
  ------------------------------------------------------------- */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-radial-gradient from-brand-orange/[0.04] to-transparent pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#12151C] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
          
          {/* STEP A: PASSWORT + TURNSTILE */}
          {loginStep === 'password' && (
            <>
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

                {/* Cloudflare Turnstile Bot-Schutz */}
                <div className="pt-1 flex justify-center overflow-hidden min-h-[65px]">
                  <div ref={turnstileRef} className="cf-turnstile"></div>
                </div>

                <button
                  type="submit"
                  disabled={!turnstileToken || isLoggingIn}
                  className={`btn-3d-luxury w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-opacity ${
                    !turnstileToken || isLoggingIn ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Anmeldung läuft...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Anmelden</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* STEP B: 2FA-CODE EINGABE */}
          {loginStep === '2fa' && (
            <>
              {/* Header */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 mb-2">
                  <ShieldCheck className="w-8 h-8 text-brand-orange" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Zwei-Faktor-<span className="text-gradient-orange">Schutz</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Sicherheitscode für Pro Colour Admin
                </p>
              </div>

              {/* Info Box */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 text-left">
                <Mail className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  Ein 6-stelliger Bestätigungscode wurde an{' '}
                  <strong className="text-white font-mono break-all">{twoFactorEmail}</strong> gesendet. Bitte prüfen Sie auch den Spam-Ordner.
                </div>
              </div>

              {/* 2FA Form */}
              <form onSubmit={handleVerify2FA} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 text-center">
                    6-Stelliger Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={twoFactorCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setTwoFactorCode(val);
                    }}
                    placeholder="••••••"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange transition-colors text-center font-mono text-2xl tracking-[0.4em] font-extrabold"
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="rounded border-white/20 bg-black/40 text-brand-orange focus:ring-brand-orange"
                    />
                    <span>Dieses Gerät für 30 Tage merken</span>
                  </label>
                </div>

                {authError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {resendNotice && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{resendNotice}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isVerifying2FA || twoFactorCode.length < 6}
                  className={`btn-3d-luxury w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-opacity ${
                    isVerifying2FA || twoFactorCode.length < 6 ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {isVerifying2FA ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Code wird geprüft...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Code bestätigen & Anmelden</span>
                    </>
                  )}
                </button>
              </form>

              {/* 2FA Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={handleBackToPassword}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Anderes Passwort</span>
                </button>
                <button
                  type="button"
                  disabled={isResending2FA}
                  onClick={handleResend2FA}
                  className="inline-flex items-center gap-1.5 text-brand-orange hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isResending2FA ? 'animate-spin' : ''}`} />
                  <span>Code erneut senden</span>
                </button>
              </div>
            </>
          )}

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
     VIEW 2: AUTHENTICATED DASHBOARD (CLOUDFLARE KV SYNCHRONISIERT)
  ------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col font-sans">
      
      {/* Toast / Status Banner */}
      {statusNotice && (
        <div className="bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-300 text-xs font-semibold py-2.5 px-4 text-center flex items-center justify-center gap-2 sticky top-0 z-50 backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusNotice}</span>
        </div>
      )}

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
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <Database className="w-3 h-3" />
              <span>Cloudflare KV Live</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleRefreshFromKv}
              disabled={isRefreshingKv}
              className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-semibold text-slate-200 hover:text-white transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Daten aus Cloudflare KV neu laden"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-brand-orange ${isRefreshingKv ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">KV Synchronisieren</span>
            </button>

            <a
              href="/#results"
              className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-semibold text-slate-200 hover:text-white transition-all inline-flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-brand-orange" />
              <span className="hidden sm:inline">Live-Website ansehen</span>
            </a>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-400 hover:text-red-300 transition-all cursor-pointer"
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
              Alle Änderungen werden direkt in <strong>Cloudflare KV</strong> gespeichert und sind für jeden Besucher weltweit sichtbar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJson}
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-semibold text-slate-200 hover:text-white transition-all inline-flex items-center gap-1.5 cursor-pointer"
              title="Alle Projekte als JSON-Datei sichern"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Backup</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-red-500/15 border border-white/15 hover:border-red-500/30 text-xs font-semibold text-slate-300 hover:text-red-400 transition-all inline-flex items-center gap-1.5 cursor-pointer"
              title="Auf Standard zurücksetzen"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Standard</span>
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
                  disabled={isProcessingImages || isSaving}
                  className="btn-3d-luxury px-5 py-2 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>In KV speichern...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingId ? 'Änderungen in KV speichern' : 'Projekt in KV veröffentlichen'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
