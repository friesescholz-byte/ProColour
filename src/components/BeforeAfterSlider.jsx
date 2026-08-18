import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, CheckCircle2, Sliders, ArrowLeftRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [activePair, setActivePair] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const pairs = [
    {
      id: 'spot-repair',
      title: 'Lackkratzer & Schrammenbeseitigung',
      category: 'Spot-Repair Meistertechnik',
      description: 'Tiefer Lackkratzer und Abschürfung punktgenau beilackiert – Farbton zu 100% werksgetreu gemischt.',
      before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(25)_ergebnis.webp',
      after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(24)_ergebnis.webp',
      badge: '100% Werkslook'
    },
    {
      id: 'felgen',
      title: 'Alufelgen-Bordsteinschaden',
      category: 'TÜV WheelDoctor System',
      description: 'Schwere Bordsteinschrammen am Felgenhorn spurlos instandgesetzt. Sicherheit und Original-Glanz voll erhalten.',
      before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(22)_ergebnis.webp',
      after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(23)_ergebnis.webp',
      badge: 'TÜV-geprüft'
    },
    {
      id: 'stossstange',
      title: 'Stoßstangen- & Kantenreparatur',
      category: 'DoL & Smart Lackierung',
      description: 'Lackschaden ohne teure Demontage direkt am Fahrzeug behoben. Keine Farbunterschiede, voller Glanz.',
      before: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(12)_ergebnis.webp',
      after: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(13)_ergebnis.webp',
      badge: 'Keine Demontage'
    }
  ];

  const compositeGallery = [
    {
      url: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(17)_ergebnis.webp',
      title: 'Felgen-Glanzdrehen & Lackierung',
      tag: 'WheelDoctor Präzision'
    },
    {
      url: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(26)_ergebnis.webp',
      title: 'Dellen- & Karosserieausbesserung',
      tag: 'Sanfte Hebeltechnik'
    },
    {
      url: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(14)_ergebnis.webp',
      title: 'Spot-Repair Übergangslos',
      tag: 'Exakte Farbmischung'
    },
    {
      url: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(18)_ergebnis.webp',
      title: 'Leder- & Interieur-Aufbereitung',
      tag: 'Colourlock Veredelung'
    }
  ];

  // Mouse / Touch Drag Handlers
  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="results" className="py-20 md:py-28 bg-dark-base relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            Echte Vorher- / Nachher-Ergebnisse
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Sehen Sie selbst: <br />
            <span className="text-gradient-brand">Der Vorher-/Nachher-Beweis.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Ziehen Sie den Schieberegler nach links und rechts, um die makellose Verwandlung unserer Kundenfahrzeuge live zu erleben.
          </p>
        </div>

        {/* Pair Selector Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {pairs.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePair(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activePair === idx
                  ? 'bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white shadow-glow-orange scale-105'
                  : 'bg-dark-card text-slate-300 hover:text-white border border-dark-border hover:bg-dark-cardHover'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Interactive Draggable Slider Container */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-3 sm:p-4 border border-brand-orange/30 shadow-card-elevated">
            
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onTouchMove={handleTouchMove}
              className="relative w-full h-80 sm:h-[480px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10"
            >
              {/* After Image (Background) */}
              <img
                src={pairs[activePair].after}
                alt="Nachher Reparatur"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
              <div className="absolute top-4 right-4 bg-[#25D366] text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                NACHHER (Repariert)
              </div>

              {/* Before Image (Clipped Foreground) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={pairs[activePair].before}
                  alt="Vorher Schaden"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg z-20">
                  VORHER (Schaden)
                </div>
              </div>

              {/* Draggable Divider Line & Knob */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_15px_rgba(255,94,30,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow text-slate-950 flex items-center justify-center shadow-glow-orange border-2 border-white">
                  <ArrowLeftRight className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                </div>
              </div>

              {/* Floating Helper Label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-1.5 rounded-full text-xs font-semibold text-slate-200 pointer-events-none border border-white/20 shadow-md">
                ‹ Schieberegler ziehen für Direktvergleich ›
              </div>
            </div>

            {/* Information bar under the slider */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                  {pairs[activePair].category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {pairs[activePair].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {pairs[activePair].description}
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 bg-brand-yellow/15 border border-brand-yellow/40 text-brand-yellow text-xs font-extrabold px-3.5 py-1.5 rounded-xl">
                  <Award className="w-4 h-4 text-brand-orange" />
                  {pairs[activePair].badge}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Additional Composite Grid Gallery */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Weitere Arbeiten & Detail-Aufnahmen
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Präzision in jedem Detail – von Alufelgen über Hageldellen bis hin zu Lederreparaturen
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {compositeGallery.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden border border-dark-border group hover:border-brand-orange/40 shadow-lg"
              >
                <div className="relative h-56 overflow-hidden bg-dark-surface">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-3 left-3 bg-dark-base/80 backdrop-blur-md border border-brand-orange/30 text-brand-yellow text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4 bg-dark-surface/90">
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" /> 100% Pro Colour Handwerk
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
