import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactAndLocation() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-2">
            Kontakt & Anfahrt
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Wir freuen uns auf Ihre Anfrage.
          </h2>
          <p className="text-slate-400 text-base mt-2">
            Besuchen Sie uns in unserer Werkstatt oder senden Sie uns vorab ein Foto des Schadens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Data & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-5">
              
              <div>
                <h3 className="text-lg font-bold text-white">Pro Colour Smart Repair</h3>
                <p className="text-xs text-slate-400">Inhaber: Jens Rüsch</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 text-sm">
                <div className="p-2 rounded-lg bg-slate-800 text-brand-orange shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Werkstatt-Adresse</div>
                  <div className="text-slate-300">Lange Straße 108</div>
                  <div className="text-slate-400 text-xs">27305 Bruchhausen-Vilsen</div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 text-sm">
                <div className="p-2 rounded-lg bg-slate-800 text-brand-orange shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Telefon & WhatsApp</div>
                  <a href="tel:01702025130" className="text-brand-orange hover:underline font-bold">
                    0170 2025130
                  </a>
                  <div className="text-slate-400 text-xs">Schnellste Antwort</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 text-sm">
                <div className="p-2 rounded-lg bg-slate-800 text-brand-orange shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">E-Mail</div>
                  <a href="mailto:info@pro-colour.de" className="text-slate-300 hover:text-white">
                    info@pro-colour.de
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  Öffnungszeiten Werkstatt
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">Montag:</span>
                    <span>07:00 – 16:00 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">Freitag:</span>
                    <span>07:00 – 16:00 Uhr</span>
                  </div>
                  <div className="text-slate-400 pt-1 text-[11px]">
                    Di, Mi, Do & Sa: Nach telefonischer Vereinbarung
                  </div>
                </div>
              </div>

            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-56 bg-slate-900 shadow-md">
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

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8">
              
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Nachricht erfolgreich gesendet!</h3>
                  <p className="text-sm text-slate-300">
                    Vielen Dank. Jens Rüsch wird sich zeitnah bei Ihnen melden.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-xs font-semibold text-brand-orange underline"
                  >
                    Neue Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Kostenlose Anfrage stellen
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Wir melden uns verlässlich mit einer Einschätzung zurück.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ihr Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Telefon *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0170 ..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">E-Mail Adresse *</label>
                    <input
                      type="email"
                      required
                      placeholder="ihre.email@beispiel.de"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Schadenbeschreibung</label>
                    <textarea
                      rows="3"
                      placeholder="Was für ein Schaden liegt vor (z. B. Kratzer an Stoßstange oder Bordsteinschaden an Alufelge)?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Anfrage absenden</span>
                  </button>

                  <div className="pt-2 text-center text-xs text-slate-400">
                    Noch schneller: <a href="https://wa.me/491702025130" target="_blank" rel="noopener noreferrer" className="text-brand-orange font-bold hover:underline">Foto direkt per WhatsApp senden ➔</a>
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
