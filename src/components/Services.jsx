import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Disc, Hammer, Armchair, CheckCircle2, ArrowRight, FileCheck2 } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Sparkles,
      title: 'Spot-Repair & Lackierung',
      desc: 'Punktuelle Beseitigung von Kratzern und Schrammen direkt am Fahrzeug – ohne teuren Teiletausch und mit 100% Farbangleich.',
      points: [
        'Bis zu 70% günstiger als Komplettlackierung',
        'Exakter Werksfarbton durch Farbmischsystem',
        'Ideal für Leasing-Rückläufer: Schützt vor teuren Abzügen'
      ]
    },
    {
      icon: Disc,
      title: 'Alufelgen (TÜV WheelDoctor)',
      desc: 'Bordsteinschäden, Riefen und Korrosion an Alufelgen mit dem TÜV-geprüften WheelDoctor System fachgerecht beseitigen.',
      points: [
        'Zertifizierte TÜV-Sicherheit & Werterhalt',
        'Glanzdrehen, Lackieren & Veredeln aus einer Hand',
        'Beseitigt leasingrelevante Felgenschäden'
      ]
    },
    {
      icon: Hammer,
      title: 'Dellenentfernung ohne Lackieren (DoL)',
      desc: 'Parkdellen, Hagelschäden und Einkaufswagenschäden sanft mit Spezialhebeln herausmassieren – ohne Nachlackierung.',
      points: [
        '100% Erhalt des unberührten Werkslacks',
        'Keine Spachtelarbeiten, keine Farbunterschiede',
        'Von Kfz-Gutachtern & Leasinggebern voll anerkannt'
      ]
    },
    {
      icon: Armchair,
      title: 'Leder- & Interieurpflege',
      desc: 'Professionelle Beseitigung von Rissen, Abschürfungen und Abnutzung an Autositzen, Lenkrädern und Lederinterieur.',
      points: [
        'Zertifizierte Colourlock® Profiprodukte',
        'Originalgetreue Lederfärbung & Versiegelung',
        'Neuwagen-Look & dauerhafter Schutz'
      ]
    }
  ];

  return (
    <section id="services" className="relative py-20 md:py-28 bg-[#0E1117] text-white overflow-hidden border-b border-white/10">
      
      {/* High-End Background Video with Luxury Glass Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 opacity-35"
        >
          <source
            src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/AdobeStock_191430073-transcode.webm"
            type="video/webm"
          />
        </video>
        
        {/* Dark Luxury Gradient Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12151C]/95 via-[#12151C]/80 to-[#12151C]/95 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange block mb-2">
            Unsere Fachbereiche & Gutachten
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Maßgeschneiderte Instandsetzung <br />
            <span className="text-gradient-orange">& Leasing-Rückläufer Gutachten.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Wir reparieren punktgenau dort, wo der Schaden entstanden ist – und sichern Sie mit verlässlichen Vorab-Gutachten vor überzogenen Leasing-Nachzahlungen ab.
          </p>
        </div>

        {/* 4 Clean Glassmorphic Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-black/60 hover:bg-black/75 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-white/15 hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-brand-orange/15"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon */}
                  <div className="flex items-center justify-start">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange/25 to-amber-500/10 border border-brand-orange/40 flex items-center justify-center text-amber-300 shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Benefit Points */}
                  <ul className="space-y-2 pt-2 border-t border-white/10">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Footer */}
                <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">100% Festpreis-Transparenz</span>
                  <a
                    href={`https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20eine%20Preiseinsch%C3%A4tzung%20f%C3%BCr:%20${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400 hover:text-white transition-colors group/link"
                  >
                    <span>Schaden anfragen</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-orange group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Featured Highlight Banner: Leasing-Rückläufer Gutachten & Vorab-Check */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 lg:mt-10 bg-gradient-to-r from-brand-orange/15 via-black/80 to-amber-500/10 border border-brand-orange/40 hover:border-brand-orange/70 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-xl transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Col: Short Headline & Concise Message */}
            <div className="lg:col-span-7 space-y-3.5">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
                Leasing-Vorab-Check: <br />
                <span className="text-gradient-orange">Teure Nachzahlungen sicher vermeiden.</span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Wir erfassen beanstandbare Lack-, Felgen- und Karosserieschäden vor dem offiziellen Gutachtertermin und beseitigen diese nach Herstellervorgaben – bis zu 75% günstiger als die Nachbelastung durch das Autohaus.
              </p>

              <div className="pt-1">
                <a
                  href="https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20ein%20Vorab-Gutachten%20f%C3%BCr%20meine%20Leasing-R%C3%BCckgabe%20anfragen."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-500 hover:to-brand-orange text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-brand-orange/25 transition-all duration-300 active:scale-95"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Leasing-Gutachten anfragen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Col: 4 Crisp Single-Line Checkmarks */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-2.5 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Prüfung nach offiziellen Hersteller-Katalogen</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Schadensanalyse vor dem DEKRA/TÜV-Termin</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bis zu 75% Ersparnis gegenüber Abzügen</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% stressfreie Fahrzeugrückgabe</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
