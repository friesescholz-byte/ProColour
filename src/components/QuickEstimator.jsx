import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, CheckCircle2, Camera, Sparkles, Phone, ShieldCheck, Zap } from 'lucide-react';

export default function QuickEstimator() {
  const [selectedDamage, setSelectedDamage] = useState('Alufelgenaufbereitung');
  const [selectedLocation, setSelectedLocation] = useState('Stoßstange / Kotflügel');
  const [urgency, setUrgency] = useState('Innerhalb der nächsten 7 Tage');

  const damages = [
    { id: 'felge', label: 'Alufelgen-Schaden', desc: 'Bordsteinschramme, Lackschaden' },
    { id: 'spot', label: 'Kratzer / Schramme', desc: 'Spot-Repair, Lackabplatzung' },
    { id: 'delle', label: 'Delle / Beule (DoL)', desc: 'Parkdelle, Hagel, kein Lackschaden' },
    { id: 'leder', label: 'Leder / Interieur', desc: 'Riss, Abschürfung, Lenkrad' },
    { id: 'leasing', label: 'Leasing-Rückgabe', desc: 'Komplett-Check vor Gutachter' },
  ];

  const locations = [
    'Stoßstange / Kotflügel',
    'Alufelgen (1–4 Felgen)',
    'Tür / Seitenwand',
    'Motorhaube / Dach',
    'Fahrersitz / Lenkrad',
    'Anderer Bereich'
  ];

  const urgencies = [
    'Schnellstmöglich (Express)',
    'Innerhalb der nächsten 7 Tage',
    'Ganz entspannt / Beratung'
  ];

  const getWhatsAppLink = () => {
    const text = `Hallo Herr Rüsch,\n\nich möchte gerne eine kostenlose Foto-Einschätzung für mein Fahrzeug anfragen:\n\n• Schaden: ${selectedDamage}\n• Bereich: ${selectedLocation}\n• Gewünschter Zeitraum: ${urgency}\n\nIch sende Ihnen gleich im nächsten Schritt 1–2 Fotos des Schadens mit. Vielen Dank!`;
    return `https://wa.me/491702025130?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="estimator" className="py-20 md:py-28 bg-dark-surface/90 border-t border-dark-border/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Express-Preiseinschätzung in 30 Sekunden
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Schaden konfigurieren & <br />
            <span className="text-gradient-brand">Foto per WhatsApp senden.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Wählen Sie Ihren Schaden aus und erhalten Sie direkt vom Inhaber Jens Rüsch eine realistische, unverbindliche Ersteinschätzung.
          </p>
        </div>

        {/* Wizard Box */}
        <div className="mt-12 glass-card rounded-3xl p-6 sm:p-10 border border-brand-orange/40 shadow-card-elevated space-y-8">
          
          {/* Step 1: Damage Type */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-orange text-white text-xs font-black flex items-center justify-center">1</span>
              Was für ein Schaden liegt vor?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {damages.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDamage(d.label)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 ${
                    selectedDamage === d.label
                      ? 'bg-brand-orange/15 border-brand-orange text-white shadow-md ring-1 ring-brand-orange'
                      : 'bg-dark-card border-dark-border text-slate-300 hover:border-dark-borderLight'
                  }`}
                >
                  <div className="font-bold text-sm text-white">{d.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{d.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Location on car */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-yellow text-slate-950 text-xs font-black flex items-center justify-center">2</span>
              An welchem Bauteil befindet sich der Schaden?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`p-3 rounded-xl text-xs sm:text-sm font-semibold text-center border transition-all ${
                    selectedLocation === loc
                      ? 'bg-brand-yellow/15 border-brand-yellow text-brand-yellow ring-1 ring-brand-yellow'
                      : 'bg-dark-card border-dark-border text-slate-300 hover:border-dark-borderLight'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Urgency */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-950 text-xs font-black flex items-center justify-center">3</span>
              Wann soll die Reparatur stattfinden?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {urgencies.map((u) => (
                <button
                  key={u}
                  onClick={() => setUrgency(u)}
                  className={`p-3 rounded-xl text-xs sm:text-sm font-medium text-center border transition-all ${
                    urgency === u
                      ? 'bg-white/10 border-white text-white ring-1 ring-white'
                      : 'bg-dark-card border-dark-border text-slate-400 hover:border-dark-borderLight'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger Card */}
          <div className="pt-6 border-t border-dark-border/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-semibold text-slate-400 flex items-center justify-center md:justify-start gap-1.5">
                <Camera className="w-4 h-4 text-[#25D366]" />
                Foto direkt im WhatsApp-Chat anhängen
              </div>
              <div className="text-base font-extrabold text-white">
                Schnelle & transparente Kostenabschätzung
              </div>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 px-8 py-4 rounded-2xl text-base font-extrabold shadow-lg transition-all hover:scale-105 active:scale-95 group"
            >
              <MessageSquare className="w-5 h-5 text-slate-950 fill-current" />
              <span>WhatsApp-Chat mit Foto starten</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-center text-xs text-slate-400 border-t border-dark-border/50">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
              100% kostenfrei & unverbindlich
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
              Direktkontakt zu Jens Rüsch
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
              Antwort meist in unter 30 Min.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
