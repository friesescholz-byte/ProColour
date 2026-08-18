import React, { useState } from 'react';
import { MessageSquare, ArrowRight, Camera, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExpressEstimator() {
  const [damageType, setDamageType] = useState('Alufelgenaufbereitung');
  const [component, setComponent] = useState('Stoßstange / Kotflügel');

  const damages = [
    { label: 'Alufelgen-Schaden', desc: 'Bordsteinkratzer, Korrosion' },
    { label: 'Spot-Repair (Lackkratzer)', desc: 'Schramme, Lackabplatzung' },
    { label: 'Delle / Beule (DoL)', desc: 'Parkrempler, Hagelschaden' },
    { label: 'Lederreparatur', desc: 'Sitzwange, Lenkrad, Riss' },
    { label: 'Leasing-Rückgabe', desc: 'Komplett-Check vor Abgabe' }
  ];

  const components = [
    'Stoßstange vorne / hinten',
    'Alufelgen (1–4 Felgen)',
    'Kotflügel / Tür',
    'Motorhaube / Dach',
    'Fahrersitz / Lenkrad'
  ];

  const getWhatsAppUrl = () => {
    const message = `Hallo Herr Rüsch,\n\nich möchte gerne eine kostenlose Foto-Einschätzung für mein Fahrzeug anfragen:\n\n• Schaden: ${damageType}\n• Bauteil: ${component}\n\nIch sende Ihnen gleich im nächsten Schritt 1–2 Fotos des Schadens mit. Vielen Dank!`;
    return `https://wa.me/491702025130?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="estimator" className="py-20 md:py-28 bg-paint-gloss border-b border-white/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-text-badge text-amber-300 text-xs font-extrabold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-brand-orange" />
            Express-Preiseinschätzung in 30 Sekunden
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Schaden konfigurieren & <br />
            <span className="text-gradient-orange font-serif italic font-normal">Foto per WhatsApp senden.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Wählen Sie kurz Ihren Schaden aus und erhalten Sie direkt vom Inhaber Jens Rüsch eine realistische, unverbindliche Ersteinschätzung.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="glass-card-pro rounded-3xl p-6 sm:p-10 border border-brand-orange/30 shadow-luxury space-y-8">
          
          {/* Step 1 */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-orange text-white text-xs font-black flex items-center justify-center">1</span>
              Was für ein Schaden liegt vor?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {damages.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setDamageType(d.label)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
                    damageType === d.label
                      ? 'bg-brand-orange/15 border-brand-orange text-white ring-1 ring-brand-orange shadow-glow-orange scale-[1.02]'
                      : 'bg-dark-950/70 border-white/10 text-slate-300 hover:border-white/25 hover:bg-dark-850'
                  }`}
                >
                  <div className="font-bold text-sm text-white">{d.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{d.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center">2</span>
              An welchem Bauteil befindet sich der Schaden?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {components.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setComponent(c)}
                  className={`p-3.5 rounded-xl text-xs sm:text-sm font-semibold text-center border transition-all ${
                    component === c
                      ? 'bg-amber-400/15 border-amber-400 text-amber-300 ring-1 ring-amber-400 shadow-md'
                      : 'bg-dark-950/70 border-white/10 text-slate-300 hover:border-white/25'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Action Trigger with Shimmering Eyecatcher Button */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-semibold text-slate-300 flex items-center justify-center md:justify-start gap-1.5">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Foto direkt im Chat anhängen</span>
              </div>
              <div className="text-base font-extrabold text-white">
                Schnelle & transparente Kostenabschätzung
              </div>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-eyecatcher w-full md:w-auto inline-flex items-center justify-center gap-3 text-white px-9 py-5 rounded-2xl text-base font-extrabold cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 fill-current" />
              </div>
              <span>WhatsApp-Chat mit Foto starten</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center text-xs text-slate-400 border-t border-white/5">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% kostenfrei & unverbindlich
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Direktkontakt zu Jens Rüsch
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Antwort meist in unter 30 Min.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
