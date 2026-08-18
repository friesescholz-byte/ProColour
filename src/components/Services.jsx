import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Disc, Hammer, Armchair, CheckCircle2, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Sparkles,
      title: 'Spot-Repair & Lackierung',
      tag: 'Express-Lackreparatur',
      badge: 'Kein Teiletausch',
      desc: 'Punktuelle Beseitigung von Kratzern und Schrammen direkt am Fahrzeug ohne teure Bauteil-Demontage. Exakte Farbmischung für 100% Werkslook.',
      points: [
        'Bis zu 70% Ersparnis gegenüber Neuteil & Komplettlack',
        'Exakte Werkslack-Angleichung durch Farbmischsystem',
        'Kurze Werkstattzeit – meist am selben Tag fertig'
      ]
    },
    {
      icon: Disc,
      title: 'Alufelgen (TÜV WheelDoctor)',
      tag: 'TÜV-Zertifiziert',
      badge: 'TÜV geprüftes System',
      desc: 'Bordsteinschäden, Riefen und Korrosion an lackierten, polierten oder glanzgedrehten Alufelgen mit dem TÜV-geprüften WheelDoctor Verfahren fachgerecht beseitigen.',
      points: [
        'TÜV-geprüfte Sicherheit & voller Werterhalt',
        'Passender Original-Farbton für jeden Hersteller',
        'Glanzdrehen, Lackierung & Veredelung aus einer Hand'
      ]
    },
    {
      icon: Hammer,
      title: 'Dellenentfernung (DoL)',
      tag: 'Sanfte Ausbeultechnik',
      badge: '100% Originallack',
      desc: 'Parkdellen, Hagelschäden und Einkaufswagenschäden werden mit spezialisierter Hebel- und Klebetechnik sanft herausmassiert – ganz ohne Nachlackierung.',
      points: [
        'Vollständiger Erhalt des unberührten Werkslacks',
        'Keine Spachtelarbeiten, keine Farbunterschiede',
        'Von Kfz-Gutachtern und Versicherungen empfohlen'
      ]
    },
    {
      icon: Armchair,
      title: 'Leder & Interieurpflege',
      tag: 'Colourlock® Partner',
      badge: 'Herstellervorgabe',
      desc: 'Professionelle Beseitigung von Rissen, Abschürfungen und Farbverblassungen an Autositzen, Lenkrädern und hochwertigem Möbelleder.',
      points: [
        'Einsatz von zertifizierten Colourlock® Profiprodukten',
        'Originalgetreue Lederfärbung & Versiegelung',
        'Neuwagen-Look und nachhaltiger Schutz vor Abnutzung'
      ]
    }
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#0E1117] text-white overflow-hidden border-b border-white/10">
      
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
        
        {/* Dark Luxury Gradient Tint for maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12151C]/95 via-[#12151C]/80 to-[#12151C]/95 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/40 text-amber-300 text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg">
            <Zap className="w-3.5 h-3.5 text-brand-orange" />
            <span>Unsere Fachgebiete</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Maßgeschneiderte Instandsetzung <br />
            <span className="text-gradient-orange">mit meisterhafter Präzision.</span>
          </h2>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Wir reparieren punktgenau dort, wo der Schaden entstanden ist. Wirtschaftlich, schnell und werterhaltend.
          </p>
        </div>

        {/* 4 Clean Glassmorphic Service Cards (Without individual images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-black/60 hover:bg-black/75 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-white/15 hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between group shadow-2xl hover:shadow-brand-orange/15"
              >
                <div className="space-y-6">
                  {/* Top Bar: Icon + Category Tag + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange/25 to-amber-500/10 border border-brand-orange/40 flex items-center justify-center text-amber-300 shadow-lg group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-amber-300 text-xs font-bold">
                        {item.tag}
                      </span>
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-black hidden sm:inline-block">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Benefit Points */}
                  <ul className="space-y-2.5 pt-2 border-t border-white/10">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Footer */}
                <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">100% Festpreis-Transparenz</span>
                  <a
                    href={`https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20eine%20Preiseinsch%C3%A4tzung%20f%C3%BCr:%20${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-400 hover:text-white transition-colors group/link"
                  >
                    <span>Schaden unverbindlich anfragen</span>
                    <ArrowRight className="w-4 h-4 text-brand-orange group-hover/link:translate-x-1.5 transition-transform" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
