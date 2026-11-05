import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Camera, Upload, X, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TURNSTILE_SITEKEY = "0x4AAAAAAFRMeJsz5tYEMNjg";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileAttachments, setFileAttachments] = useState([]);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Turnstile Widget Initialization with StrictMode & Polling protection
  useEffect(() => {
    let interval = null;

    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
        try {
          // Empty container to prevent duplicate renders in StrictMode
          turnstileRef.current.innerHTML = "";
          widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITEKEY,
            callback: (token) => {
              setTurnstileToken(token);
              setErrorMessage("");
            },
            "expired-callback": () => setTurnstileToken(""),
            theme: "dark",
          });
          if (interval) clearInterval(interval);
        } catch (e) {
          console.error("Turnstile render error:", e);
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
  }, []);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (files.length + uploadedFiles.length > 3) {
      alert('Sie können maximal 3 Bilder hochladen.');
      return;
    }

    files.forEach((file) => {
      const preview = URL.createObjectURL(file);
      setUploadedFiles((prev) => [...prev, { file, preview, name: file.name }]);

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const base64Content = result.split(',')[1] || '';
          setFileAttachments((prev) => [
            ...prev,
            { filename: file.name, content: base64Content }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setFileAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!turnstileToken) {
      setErrorMessage('Bitte bestätigen Sie kurz den Cloudflare Spam-Schutz.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://friesescholzwebdesign.pages.dev/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'ProColour',
          turnstileToken,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          attachments: fileAttachments,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          resData.message || 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns per WhatsApp.'
        );
        if (window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.reset(widgetIdRef.current);
            setTurnstileToken('');
          } catch (e) {}
        }
      }
    } catch (err) {
      setErrorMessage('Verbindungsfehler zum E-Mail-Server. Bitte kontaktieren Sie uns direkt per Telefon oder WhatsApp.');
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.reset(widgetIdRef.current);
          setTurnstileToken('');
        } catch (e) {}
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-paint-gloss text-white border-b border-white/10 relative overflow-hidden">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/8 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange block mb-2">
            Standort & Kontakt
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Schaden anfragen oder <br />
            <span className="text-gradient-orange">persönlich vorbeikommen.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Senden Sie uns Fotos für eine unverbindliche Ersteinschätzung oder besuchen Sie unsere Werkstatt in Bruchhausen-Vilsen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Workshop Contact Info + Google Maps */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Contact Card */}
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-5 sm:p-7 border border-white/10 space-y-5 shadow-lg">
              
              <div>
                <h3 className="text-xl font-bold text-white">Pro Colour Smart Repair</h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">Inhaber: Jens Rüsch</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Werkstatt-Adresse</div>
                  <div className="text-sm font-bold text-white">Lange Straße 108</div>
                  <div className="text-xs text-slate-300">27305 Bruchhausen-Vilsen</div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs text-slate-400 font-medium">Telefon & WhatsApp</div>
                  <a
                    href="tel:01702025130"
                    className="text-base font-extrabold text-white hover:text-brand-orange transition-colors block"
                  >
                    0170 2025130
                  </a>
                  <a
                    href="https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20ein%20Schadensfoto%20senden."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>Direkt auf WhatsApp schreiben</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">E-Mail</div>
                  <a href="mailto:info@pro-colour.de" className="text-sm font-semibold text-white hover:text-brand-orange transition-colors">
                    info@pro-colour.de
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-3 border-t border-white/10 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider mb-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Öffnungszeiten Werkstatt</span>
                </div>
                <div className="flex justify-between text-slate-200 py-0.5 border-b border-white/5">
                  <span className="font-semibold text-white">Montag & Freitag:</span>
                  <span className="font-medium text-amber-300">07:00 – 16:00 Uhr</span>
                </div>
                <div className="text-slate-400 pt-1">
                  Di, Mi, Do & Sa: Nach telefonischer Vereinbarung
                </div>
              </div>

            </div>

            {/* Google Maps Frame */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-48 xs:h-56 sm:h-64 bg-dark-900 shadow-lg relative">
              <iframe
                title="Google Maps Standort"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2410.318814450065!2d9.0035397!3d52.8346105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b0559a43a055d7%3A0xeaaf93fe1137cd0c!2sPro%20Colour%20Smart%20Repair%20-%20Jens%20R%C3%BCsch!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Clean Contact Form with Photo Upload & Turnstile */}
          <div className="lg:col-span-7">
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-5 sm:p-8 border border-white/10 shadow-lg">
              
              {submitted ? (
                <div className="py-10 sm:py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Anfrage erfolgreich versendet!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Vielen Dank! Wir haben Ihre Angaben {uploadedFiles.length > 0 && `inklusive ${uploadedFiles.length} Fotos`} erhalten. Jens Rüsch meldet sich schnellstmöglich bei Ihnen.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setUploadedFiles([]);
                      setFileAttachments([]);
                      setTurnstileToken('');
                      setForm({ name: '', phone: '', email: '', message: '' });
                    }}
                    className="mt-4 px-6 py-3 rounded-xl bg-dark-900 border border-white/15 text-xs font-bold text-white hover:border-brand-orange cursor-pointer transition-colors"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Kostenlose Anfrage stellen
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Füllen Sie das Formular aus – wir melden uns schnell und unverbindlich.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1 uppercase tracking-wider">Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Max Mustermann"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#12151C] border border-white/15 rounded-xl px-3.5 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1 uppercase tracking-wider">Telefonnummer *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0170 1234567"
                        value={form.phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[0-9+\s()/-]*$/.test(val)) {
                            setForm((prev) => ({ ...prev, phone: val }));
                          }
                        }}
                        className="w-full bg-[#12151C] border border-white/15 rounded-xl px-3.5 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1 uppercase tracking-wider">E-Mail Adresse *</label>
                    <input
                      type="email"
                      required
                      placeholder="ihre-email@beispiel.de"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#12151C] border border-white/15 rounded-xl px-3.5 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1 uppercase tracking-wider">Schadenbeschreibung</label>
                    <textarea
                      rows="3"
                      placeholder="Beschreiben Sie kurz den Schaden (z. B. Kratzer an Stoßstange, Bordsteinkontakt Alufelge, Delle an Tür)..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#12151C] border border-white/15 rounded-xl px-3.5 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
                    ></textarea>
                  </div>

                  {/* Clean Schadensfoto Upload Dropzone */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-200 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Schadensfotos anhängen (optional, max. 3)</span>
                      </span>
                      {uploadedFiles.length > 0 && (
                        <span className="text-[11px] text-amber-400 font-bold">{uploadedFiles.length}/3 ausgewählt</span>
                      )}
                    </div>

                    <label className="border border-dashed border-white/20 hover:border-brand-orange/60 bg-[#12151C]/60 hover:bg-[#12151C] rounded-xl p-3.5 sm:p-4 min-h-[50px] flex items-center justify-center gap-2.5 cursor-pointer transition-colors active:scale-98">
                      <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-200 font-medium">
                        Fotos auswählen oder hier ablegen (JPG, PNG)
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Preview Thumbnails */}
                    {uploadedFiles.length > 0 && (
                      <div className="grid grid-cols-3 gap-2.5 pt-1">
                        {uploadedFiles.map((fileObj, fIdx) => (
                          <div key={fIdx} className="relative aspect-video rounded-lg overflow-hidden border border-white/15 bg-dark-950">
                            <img
                              src={fileObj.preview}
                              alt={fileObj.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(fIdx)}
                              className="absolute top-1 right-1 p-1 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors cursor-pointer"
                              aria-label="Bild entfernen"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cloudflare Turnstile Spam-Schutz */}
                  <div className="pt-1.5">
                    <div className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Sicherheit & Spam-Schutz</span>
                    </div>
                    <div className="w-full max-w-full overflow-x-auto flex justify-center sm:justify-start rounded-xl bg-[#12151C]/80 p-2.5 border border-white/10 min-h-[68px] items-center">
                      <div ref={turnstileRef}></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className={`btn-3d-luxury w-full min-h-[50px] py-3.5 px-6 text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2 transition-all active:scale-98 ${
                      isSubmitting || !turnstileToken ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.01]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Wird übermittelt...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Anfrage kostenlos absenden</span>
                      </>
                    )}
                  </button>

                  <div className="pt-1 text-center text-xs text-slate-400">
                    Oder schneller direkt per WhatsApp: <a href="https://wa.me/491702025130" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold hover:underline">0170 2025130</a>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
