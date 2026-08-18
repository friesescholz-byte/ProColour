import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Award, Wrench, CheckCircle2, Star, Users } from 'lucide-react';

export default function Craftsmanship() {
  // Team Image: can be 'team-jens-ruesch.webp' or fallback to the master craftsman photo
  const teamImage = "https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/19visu0731d01037b3c4400463e0ee0fb8f0ef.webflow1_d9be8d926023669c171fa4e2d65482ae_ergebnis.webp";

  const team = [
    {
      name: 'Jens Rüsch',
      role: 'Inhaber & Gründer',
      focus: 'Spot-Repair, Felgen-, Leder- & Lackaufbereitung',
      since: 'Seit 2014'
    },
    {
      name: 'Witali Gerz',
      role: 'Smart-Repair Experte',
      focus: 'Spot-Repair & Lackinstandsetzung',
      since: 'Meisterhandwerk'
    },
    {
      name: 'Karin Kirchhoff',
      role: 'Interieur-Expertin',
      focus: 'Lederinstandsetzung & Colourlock® Veredelung',
      since: 'Zertifiziert'
    }
  ];

  return (
    <section id="craftsmanship" className="py-24 md:py-32 bg-paint-matte border-b border-white/10 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-brand-orange/6 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Monumental, Large Team / Employee Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[640px] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-dark-950 border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] group">
              <img
                src={teamImage}
                alt="Jens Rüsch & Team - Pro Colour Smart Repair"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Dark Luxury Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12151C] via-transparent to-black/30 pointer-events-none"></div>

              {/* Floating Top Trust Badge */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 text-amber-300 text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-orange" />
                  <span>Jens Rüsch & Team</span>
                </span>
              </div>

              {/* Floating Bottom Card: Team Statement */}
              <div className="absolute bottom-6 left-6 right-6 z-20 p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Meisterbetrieb vor Ort</span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-black">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>5.0 Google Bewertung</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white leading-snug">
                  „Wir reparieren Ihr Fahrzeug mit derselben Leidenschaft und Präzision, als wäre es unser eigenes.“
                </p>
                <div className="text-xs text-slate-400 font-semibold">
                  Jens Rüsch — Gründer & Inhaber Pro Colour
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Story, Mission & Regional Trust */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-7 text-left lg:pl-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5 text-brand-orange" />
              <span>Über Pro Colour Smart Repair</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Leidenschaft für Perfektion <br />
              <span className="text-gradient-orange">seit über 10 Jahren.</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Gegründet wurde Pro Colour Smart Repair im Jahr <strong className="text-white font-extrabold">2014 von Jens Rüsch</strong> – ursprünglich als spezialisierter mobiler Service für führende Autohäuser und Marken-Werkstätten.
            </p>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Seit 2017 bieten wir unsere meisterliche Qualität in unserer festen Werkstatt in <strong className="text-amber-400 font-extrabold">Bruchhausen-Vilsen (Lange Straße 108)</strong> direkt für Privatkunden an. Gleichzeitig sind unsere <strong className="text-white font-extrabold">2 Servicefahrzeuge</strong> täglich in den Landkreisen <strong className="text-slate-200">Diepholz, Nienburg, Verden und Osterholz</strong> für Partner-Autohäuser im Einsatz.
            </p>

            {/* Regional Fleet & Trust Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-white font-extrabold text-sm sm:text-base">
                  <Truck className="w-4 h-4 text-brand-orange" />
                  <span>2 Servicefahrzeuge</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Täglich vor Ort für renommierte Autohaus-Partner.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-white font-extrabold text-sm sm:text-base">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Zertifizierte Standards</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  TÜV WheelDoctor System & Colourlock® Partner.
                </p>
              </div>
            </div>

            {/* Team Badges */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="text-xs text-slate-400 font-black uppercase tracking-wider">Ihre Ansprechpartner vor Ort:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {team.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-0.5">
                    <div className="text-xs font-extrabold text-white">{m.name}</div>
                    <div className="text-[11px] text-amber-400 font-semibold">{m.role}</div>
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
