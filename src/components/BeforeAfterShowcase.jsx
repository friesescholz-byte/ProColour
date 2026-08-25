import React, { useState } from 'react';
import { Sparkles, Eye, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BeforeAfterShowcase() {
  const [activeFilter, setActiveFilter] = useState('all');

  const [toggleState, setToggleState] = useState({
    0: 'after',
    1: 'after',
    2: 'after'
  });

  const [modalItem, setModalItem] = useState(null);

  const beforeAfterPairs = [
    {
      id: 'leder',
      category: 'leder',
      title: 'Leder-Aufbereitung & Nachfärbung',
      desc: 'Rissiges und abgenutztes Leder fachgerecht instandgesetzt, tiefengereinigt, nachgefärbt und neu versiegelt.',
      before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(25)_ergebnis.webp',
      after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(24)_ergebnis.webp'
    },
    {
      id: 'aussenspiegel',
      category: 'lack',
      title: 'Außenspiegel & Kleinteile-Lackierung',
      desc: 'Tiefe Schrammen und Kratzer an der Spiegelkappe punktgenau beilackiert – 100% Farbangleich ohne Neukauf.',
      before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(22)_ergebnis.webp',
      after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(23)_ergebnis.webp'
    },
    {
      id: 'stossstange',
      category: 'stossstange',
      title: 'Stoßstangenschaden ohne Teiletausch',
      desc: 'Schrammen am Stoßfänger direkt am Fahrzeug behoben – Originallack erhalten, meist am selben Tag fertig.',
      before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(12)_ergebnis.webp',
      after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(13)_ergebnis.webp'
    }
  ];

  const categories = [
    { id: 'all', name: 'Alle Arbeiten' },
    { id: 'leder', name: 'Leder & Interieur' },
    { id: 'lack', name: 'Spot-Repair Lack' },
    { id: 'stossstange', name: 'Stoßstangen' },
    { id: 'felgen', name: 'Alufelgen & WheelDoctor' },
    { id: 'dellen', name: 'Dellen & Hagel (DoL)' }
  ];

  const handleToggle = (index, state) => {
    setToggleState((prev) => ({ ...prev, [index]: state }));
  };

  const filteredPairs = beforeAfterPairs.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="results" className="py-18 md:py-24 bg-paint-nardo border-b border-white/10 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-orange/6 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>Vorher & Nachher Beweis</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Echte Ergebnisse <br />
            <span className="text-gradient-orange">aus unserer Meisterwerkstatt.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Klicken Sie auf den Umschalter, um den direkten Vorher- und Nachher-Vergleich zu sehen:
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white shadow-md shadow-brand-orange/20 scale-105'
                  : 'bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3 Main Before/After Pairs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {filteredPairs.map((item, idx) => {
            const currentMode = toggleState[idx] || 'after';
            const displayImage = currentMode === 'before' ? item.before : item.after;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card-pro rounded-2xl overflow-hidden border border-white/15 hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                {/* Image Canvas with Interactive Toggle */}
                <div className="relative aspect-[4/3] bg-dark-950 overflow-hidden">
                  <img
                    src={displayImage}
                    alt={`${item.title} - ${currentMode === 'before' ? 'Vorher' : 'Nachher'}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                  {/* Zoom Button */}
                  <div className="absolute top-3 right-3 z-20">
                    <button
                      onClick={() => setModalItem({ ...item, currentMode })}
                      className="p-2 rounded-lg bg-black/75 hover:bg-brand-orange text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                      aria-label="Großansicht öffnen"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Interactive Vorher/Nachher Pill Switch */}
                  <div className="absolute bottom-3 left-3 z-20">
                    <div className="flex bg-black/85 backdrop-blur-xl p-1 rounded-lg border border-white/15 shadow-lg">
                      <button
                        onClick={() => handleToggle(idx, 'before')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                          currentMode === 'before'
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Vorher
                      </button>
                      <button
                        onClick={() => handleToggle(idx, 'after')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                          currentMode === 'after'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Nachher
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 space-y-2 flex-grow">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Direkte Einschätzung</span>
                  <a
                    href={`https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20habe%20eine%20Frage%20zu%20einer%20Reparatur%20wie%20hier:%20${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-400 hover:text-white transition-colors group/link"
                  >
                    <span>Preis anfragen</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-orange group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#161922] border border-white/20 rounded-2xl overflow-hidden shadow-2xl space-y-3.5 p-5 sm:p-6"
            >
              <button
                onClick={() => setModalItem(null)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-brand-orange text-white transition-colors cursor-pointer z-30"
                aria-label="Schließen"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{modalItem.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">{modalItem.desc}</p>
              </div>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/10">
                <img
                  src={modalItem.currentMode === 'before' ? modalItem.before : modalItem.after}
                  alt={modalItem.title}
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute bottom-3 left-3 flex bg-black/85 backdrop-blur-xl p-1 rounded-lg border border-white/20 shadow-xl">
                  <button
                    onClick={() => setModalItem((prev) => ({ ...prev, currentMode: 'before' }))}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      modalItem.currentMode === 'before'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Vorher (Schaden)
                  </button>
                  <button
                    onClick={() => setModalItem((prev) => ({ ...prev, currentMode: 'after' }))}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      modalItem.currentMode === 'after'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Nachher (Repariert)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-400">100% zertifizierte Meisterqualität</span>
                <a
                  href={`https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20habe%20eine%20Preisanfrage%20zu:%20${encodeURIComponent(modalItem.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-luxury inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold cursor-pointer"
                >
                  <span>Gleichen Schaden per WhatsApp anfragen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
