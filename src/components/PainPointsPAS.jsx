import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function PainPointsPAS() {
  const cards = [
    {
      id: 'leasing',
      problemHeadline: 'Teure Nachzahlungen bei der Leasing-Rückgabe?',
      solutionText: 'Bis zu 75% sparen: Wir beseitigen Felgen- und Lackschäden vor dem Gutachtertermin – 100% beanstandungsfrei.',
      image: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(23)_ergebnis.webp',
      linkText: 'Leasing-Schaden prüfen'
    },
    {
      id: 'werkstatt',
      problemHeadline: 'Ganze Stoßstange tauschen wegen eines Kratzers?',
      solutionText: 'Spot-Repair statt Teiletausch: Wir lackieren punktgenau direkt am Fahrzeug. Ohne Demontage, meist in 24h fertig.',
      image: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(13)_ergebnis.webp',
      linkText: 'Spot-Repair anfragen'
    },
    {
      id: 'wertverlust',
      problemHeadline: 'Dellen & Parkrempler drücken den Fahrzeugwert?',
      solutionText: 'Sanfte Ausbeultechnik (DoL): Dellen rückstandsfrei herausmassieren – ohne Spachteln und bei 100% Werkslack-Erhalt.',
      image: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(26)_ergebnis.webp',
      linkText: 'Delle einschätzen lassen'
    },
    {
      id: 'leder',
      problemHeadline: 'Rissiges Leder & speckige Sitze im Innenraum?',
      solutionText: 'Colourlock® Lederreparatur: Risse und Abschürfungen verschwinden spurlos – das Leder fühlt sich wieder an wie neu.',
      image: 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(18)_ergebnis.webp',
      linkText: 'Lederreparatur anfragen'
    }
  ];

  return (
    <section id="pas-problems" className="py-18 md:py-24 bg-paint-matte border-b border-white/10 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>Klartext & Wirtschaftlichkeit</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Warum traditionelle Reparaturen <br />
            <span className="text-gradient-orange">oft unnötig teuer sind.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            4 typische Werkstatt-Fallen – und wie Pro Colour Ihr Auto werterhaltend und bis zu 70% günstiger repariert:
          </p>
        </div>

        {/* 4 Clean Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card-pro rounded-2xl overflow-hidden border border-white/12 hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-xl"
            >
              {/* Clean Image Canvas */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-dark-950">
                <img
                  src={card.image}
                  alt={card.problemHeadline}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161922] via-[#161922]/30 to-transparent"></div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-3 flex-grow -mt-4 relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {card.problemHeadline}
                </h3>

                <div className="flex items-start gap-2.5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white font-semibold block mb-0.5">Die Pro Colour Lösung:</strong>
                    {card.solutionText}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 sm:px-7 pb-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Unverbindliche Ersteinschätzung</span>
                <a
                  href={`https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20eine%20Anfrage%20zu:%20${encodeURIComponent(card.problemHeadline)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400 hover:text-white transition-colors group/link"
                >
                  <span>{card.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-orange group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
