import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

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

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header with Clean Icon-Free Eyebrow */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange block mb-2">
            Wirtschaftlichkeit & Werterhalt
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Warum traditionelle Reparaturen <br />
            <span className="text-gradient-orange">oft unnötig teuer sind.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            4 typische Werkstatt-Fallen – und wie Pro Colour Ihr Auto werterhaltend und bis zu 70% günstiger repariert:
          </p>
        </div>

        {/* 4 Clean Visual Cards: Compact 1:1 Images with Large Prominent Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card-pro rounded-3xl p-6 sm:p-7 border border-white/12 hover:border-brand-orange/50 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6 group shadow-lg hover:shadow-2xl relative"
            >
              {/* Compact 1:1 Square Image Frame */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 aspect-square shrink-0 rounded-2xl overflow-hidden bg-dark-950 border border-white/15 shadow-md relative mx-auto sm:mx-0">
                <img
                  src={card.image}
                  alt={card.problemHeadline}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Large, Prominent Text Body */}
              <div className="flex flex-col justify-between flex-grow space-y-3.5 text-left w-full">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {card.problemHeadline}
                  </h3>

                  <div className="text-slate-200 text-sm sm:text-base leading-relaxed pt-1">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>Die Pro Colour Lösung:</span>
                    </span>
                    <p className="text-slate-300">
                      {card.solutionText}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-start">
                  <a
                    href={`https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20eine%20Anfrage%20zu:%20${encodeURIComponent(card.problemHeadline)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-amber-400 hover:text-white transition-colors group/link"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-4 h-4 text-brand-orange group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
