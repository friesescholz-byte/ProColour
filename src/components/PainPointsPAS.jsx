import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export default function PainPointsPAS() {
  const cards = [
    {
      id: 'leasing',
      tag: 'Leasing-Schutz',
      badge: 'Bis zu 75% sparen',
      problemHeadline: 'Teure Nachzahlungen bei der Leasing-Rückgabe?',
      solutionText: 'Wir beseitigen alle Bordsteinschäden, Kratzer und Dellen vor der Rückgabe. 100% beanstandungsfrei beim Gutachter.',
      image: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(23)_ergebnis.webp',
      linkText: 'Leasing-Schaden prüfen'
    },
    {
      id: 'werkstatt',
      tag: 'Teiletausch-Stopp',
      badge: 'Kein Neuteil nötig',
      problemHeadline: 'Ganze Stoßstange tauschen wegen eines Kratzers?',
      solutionText: 'Spot-Repair spart bares Geld: Wir lackieren nur die Schadstelle direkt am Fahrzeug. Ohne Demontage, meist in 24h fertig.',
      image: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(13)_ergebnis.webp',
      linkText: 'Spot-Repair anfragen'
    },
    {
      id: 'wertverlust',
      tag: 'Werterhalt',
      badge: '100% Originallack',
      problemHeadline: 'Dellen & Parkrempler drücken den Fahrzeugwert?',
      solutionText: 'Sanfte Hebeltechnik (DoL): Dellen rückstandsfrei herausmassieren – ohne Spachtelarbeiten und bei vollem Werkslack-Erhalt.',
      image: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(26)_ergebnis.webp',
      linkText: 'Delle einschätzen lassen'
    },
    {
      id: 'leder',
      tag: 'Interieur-Finish',
      badge: 'Colourlock® Profi',
      problemHeadline: 'Rissiges Leder & speckige Sitze im Innenraum?',
      solutionText: 'Zertifizierte Lederinstandsetzung & Nachfärbung: Risse und Abschürfungen verschwinden – Leder wie am ersten Tag.',
      image: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(18)_ergebnis.webp',
      linkText: 'Lederreparatur anfragen'
    }
  ];

  return (
    <section id="pas-problems" className="py-20 md:py-28 bg-paint-matte border-b border-white/10 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>Klartext & Wirtschaftlichkeit</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Warum traditionelle Reparaturen <br />
            <span className="text-gradient-orange">oft unnötig teuer sind.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            4 typische Werkstatt-Fallen – und wie Pro Colour Ihr Fahrzeug schnell, werterhaltend und bis zu 70% günstiger instandsetzt:
          </p>
        </div>

        {/* 4 Premium Problem/Solution Kacheln (No standard boxes, clean visual grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card-pro rounded-3xl overflow-hidden border border-white/12 hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-brand-orange/10"
            >
              {/* Card Visual Header with Real Image */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-dark-950">
                <img
                  src={card.image}
                  alt={card.problemHeadline}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161922] via-[#161922]/40 to-transparent"></div>
                
                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-black tracking-wide">
                    {card.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600/90 backdrop-blur-md text-white text-xs font-black shadow-lg">
                    {card.badge}
                  </span>
                </div>
              </div>

              {/* Card Body: Problem in Headline + Direct Solution */}
              <div className="p-6 sm:p-8 space-y-4 flex-grow -mt-4 relative z-10">
                {/* Problem directly in Headline */}
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {card.problemHeadline}
                </h3>

                {/* Direct Clear Solution */}
                <div className="flex items-start gap-3 pt-2 text-slate-200 text-sm sm:text-base leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white font-bold block mb-0.5">Die Pro Colour Lösung:</strong>
                    {card.solutionText}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Unverbindliche Ersteinschätzung</span>
                <a
                  href={`https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20eine%20Anfrage%20zu:%20${encodeURIComponent(card.problemHeadline)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-400 hover:text-white transition-colors group/link"
                >
                  <span>{card.linkText}</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange group-hover/link:translate-x-1.5 transition-transform" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
