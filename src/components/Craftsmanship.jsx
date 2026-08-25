import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Wrench } from 'lucide-react';

export default function Craftsmanship() {
  const teamImage = "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/19visu0731d01037b3c4400463e0ee0fb8f0ef.webflow1_d9be8d926023669c171fa4e2d65482ae_ergebnis.webp";

  const team = [
    {
      name: 'Jens Rüsch',
      role: 'Inhaber & Gründer',
      since: 'Seit 2014'
    },
    {
      name: 'Witali Gerz',
      role: 'Smart-Repair Experte',
      since: 'Meisterhandwerk'
    },
    {
      name: 'Karin Kirchhoff',
      role: 'Interieur-Expertin',
      since: 'Zertifiziert'
    }
  ];

  return (
    <section id="craftsmanship" className="py-20 md:py-28 bg-paint-matte border-b border-white/10 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-orange/6 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Clean, Framed Team / Craftsmanship Photo (No distracting overlay badges/cards) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden bg-dark-950 border border-white/20 shadow-2xl group">
              <img
                src={teamImage}
                alt="Pro Colour Smart Repair Handwerk & Team"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Right: Story & Mission */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5 text-brand-orange" />
              <span>Über Pro Colour Smart Repair</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Leidenschaft für Perfektion <br />
              <span className="text-gradient-orange">seit über 10 Jahren.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Gegründet wurde Pro Colour im Jahr <strong className="text-white font-bold">2014 von Jens Rüsch</strong> – ursprünglich als mobiler Spezialservice für renommierte Autohäuser und Werkstätten.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Seit 2017 bieten wir unsere Qualität in unserer festen Werkstatt in <strong className="text-amber-400 font-bold">Bruchhausen-Vilsen (Lange Straße 108)</strong> direkt für Privatkunden an. Unsere <strong className="text-white font-bold">2 Servicefahrzeuge</strong> sind weiterhin täglich in den Landkreisen Diepholz, Nienburg, Verden und Osterholz im Einsatz.
            </p>

            {/* Regional Fleet & Trust Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                  <Truck className="w-4 h-4 text-brand-orange" />
                  <span>2 Servicefahrzeuge</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Täglich vor Ort für regionale Partner-Autohäuser im Einsatz.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Zertifizierte Qualität</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  TÜV WheelDoctor System & zertifizierter Colourlock® Partner.
                </p>
              </div>
            </div>

            {/* Team Badges */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Ihr Team vor Ort:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {team.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-0.5">
                    <div className="text-xs sm:text-sm font-bold text-white">{m.name}</div>
                    <div className="text-[11px] sm:text-xs text-amber-400 font-semibold">{m.role}</div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
