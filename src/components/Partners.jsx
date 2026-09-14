import React from 'react';

export default function Partners() {
  const partnerLogos = [
    {
      id: 'autogerken',
      name: 'AutoGerken',
      src: '/partners/partner_01.webp'
    },
    {
      id: 'bosch-service',
      name: 'Bosch Service',
      src: '/partners/partner_02.webp'
    },
    {
      id: 'brandt-eggers',
      name: 'Brandt Eggers',
      src: '/partners/partner_03.webp'
    },
    {
      id: 'anders-gruppe',
      name: 'Anders Gruppe',
      src: '/partners/partner_04.webp'
    },
    {
      id: 'luebbering',
      name: 'Kfz-Haus Lübbering',
      src: '/partners/partner_05.webp'
    },
    {
      id: 'autohaus-wirth',
      name: 'Autohaus Wirth',
      src: '/partners/partner_06.webp'
    },
    {
      id: 'auto-brinkmann',
      name: 'Auto Brinkmann',
      src: '/partners/partner_07.webp'
    },
    {
      id: 'sternpartner',
      name: 'SternPartner',
      src: '/partners/partner_09.webp'
    },
    {
      id: 'autohaus-suedring',
      name: 'Autohaus Südring',
      src: '/partners/partner_10.webp'
    }
  ];

  // Duplicate for seamless infinite loop
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section id="partners" className="py-10 sm:py-14 bg-[#0A0D14] border-b border-white/10 relative overflow-hidden">
      
      {/* Subtle background ambient light */}
      <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Subtle Section Label */}
        <div className="text-center mb-7 sm:mb-9 space-y-1">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange block mb-1">
            Kooperationen & Vertrauen
          </span>
          <p className="text-xs sm:text-sm font-semibold text-slate-300">
            Starke Partnerschaften mit führenden Autohäusern & Kfz-Fachbetrieben
          </p>
        </div>

        {/* Clean Infinite Logo Slider without boxes/cards */}
        <div className="relative w-full overflow-hidden py-3">
          
          {/* Edge Fade Gradients */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0A0D14] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0A0D14] to-transparent z-20 pointer-events-none"></div>

          {/* Marquee Track */}
          <div className="animate-marquee items-center gap-8 sm:gap-14">
            {duplicatedLogos.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center justify-center px-4 sm:px-6 shrink-0 opacity-80 hover:opacity-100 transition-all duration-300 group cursor-default"
                title={item.name}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-8 sm:h-11 w-auto max-w-[140px] sm:max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none drop-shadow-sm"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
