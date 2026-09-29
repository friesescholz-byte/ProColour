import React from 'react';

export default function Partners() {
  const r2Base = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/Partner';

  const partnerLogos = [
    {
      id: 'schmolke',
      name: 'Autocenter Schmolke (Osterholz-Scharmbeck)',
      src: `${r2Base}/partner_schmolke.svg`,
      local: '/partners/partner_schmolke.svg'
    },
    {
      id: 'anders-gruppe',
      name: 'Autohaus Anders GmbH (Achim, Nienburg, Verden, Syke)',
      src: `${r2Base}/partner_04.webp`,
      local: '/partners/partner_04.webp'
    },
    {
      id: 'bobrink',
      name: 'Autohaus Bobrink (Grasberg)',
      src: `${r2Base}/partner_bobrink.webp`,
      local: '/partners/partner_bobrink.webp'
    },
    {
      id: 'sternpartner',
      name: 'Sternpartner SE & Co.KG (Zeven)',
      src: `${r2Base}/partner_09.webp`,
      local: '/partners/partner_09.webp'
    },
    {
      id: 'freese',
      name: 'Freese Süd GmbH (Syke)',
      src: `${r2Base}/partner_freese.svg`,
      local: '/partners/partner_freese.svg'
    },
    {
      id: 'brandt-eggers',
      name: 'Brandt Eggers GmbH (Achim, Weyhe)',
      src: `${r2Base}/partner_03.webp`,
      local: '/partners/partner_03.webp'
    },
    {
      id: 'gruenhagen',
      name: 'Autohaus Grünhagen GmbH & Co.KG (Hoya)',
      src: `${r2Base}/partner_gruenhagen.webp`,
      local: '/partners/partner_gruenhagen.webp'
    },
    {
      id: 'rathkamp',
      name: 'Autohaus Rathkamp GmbH & Co.KG (Syke)',
      src: `${r2Base}/partner_rathkamp.webp`,
      local: '/partners/partner_rathkamp.webp'
    },
    {
      id: 'autohaus-nienburg',
      name: 'Autohaus Nienburg GbR',
      src: `${r2Base}/partner_autohaus_nienburg.webp`,
      local: '/partners/partner_autohaus_nienburg.webp'
    },
    {
      id: 'syker-automobile',
      name: 'Syker Automobile GmbH',
      src: `${r2Base}/partner_syker_automobile.webp`,
      local: '/partners/partner_syker_automobile.webp'
    },
    {
      id: 'autogerken',
      name: 'Auto Gerken GmbH (Martfeld)',
      src: `${r2Base}/partner_01.webp`,
      local: '/partners/partner_01.webp'
    },
    {
      id: 'logemann',
      name: 'Automobile Logemann (Schwaförden)',
      src: `${r2Base}/partner_logemann.svg`,
      local: '/partners/partner_logemann.svg'
    },
    {
      id: 'autohaus-suedring',
      name: 'Autohaus Südring GmbH (Sulingen)',
      src: `${r2Base}/partner_10.webp`,
      local: '/partners/partner_10.webp'
    },
    {
      id: 'nobbe',
      name: 'Autohaus Nobbe GmbH (Sulingen)',
      src: `${r2Base}/partner_nobbe.webp`,
      local: '/partners/partner_nobbe.webp'
    },
    {
      id: 'habighorst',
      name: 'Autohaus Habighorst GmbH & Co.KG (Sulingen)',
      src: `${r2Base}/partner_habighorst.webp`,
      local: '/partners/partner_habighorst.webp'
    },
    {
      id: 'autohaus-wirth',
      name: 'Autohaus Wirth e.K. (Sudwalde)',
      src: `${r2Base}/partner_06.webp`,
      local: '/partners/partner_06.webp'
    },
    {
      id: 'becker',
      name: 'Autohaus Becker (Grasberg)',
      src: `${r2Base}/partner_becker.webp`,
      local: '/partners/partner_becker.webp'
    },
    {
      id: 'bw-achim',
      name: 'Autohandel B+W GmbH (Achim)',
      src: `${r2Base}/partner_bw_achim.webp`,
      local: '/partners/partner_bw_achim.webp'
    },
    {
      id: 'juergens',
      name: 'Autohandel Jürgens (Twistringen)',
      src: `${r2Base}/partner_juergens.webp`,
      local: '/partners/partner_juergens.webp'
    },
    {
      id: 'bosch-service',
      name: 'Bosch Car Service Bassum',
      src: `${r2Base}/partner_02.webp`,
      local: '/partners/partner_02.webp'
    },
    {
      id: 'luebbering',
      name: 'Lübbering das Kfz Haus GmbH (Schwaförden)',
      src: `${r2Base}/partner_05.webp`,
      local: '/partners/partner_05.webp'
    },
    {
      id: 'fritz',
      name: 'Fahrzeugtechnik Andreas Fritz (Bruchhausen-Vilsen)',
      src: `${r2Base}/partner_fritz.webp`,
      local: '/partners/partner_fritz.webp'
    },
    {
      id: 'peppermint',
      name: 'Peppermint Collection (Syke)',
      src: `${r2Base}/partner_peppermint.webp`,
      local: '/partners/partner_peppermint.webp'
    },
    {
      id: 'schwarme',
      name: 'Fahrzeugtechnik Schwarme',
      src: `${r2Base}/partner_schwarme.webp`,
      local: '/partners/partner_schwarme.webp'
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
          <div className="absolute inset-y-0 left-0 w-8 sm:w-24 lg:w-40 bg-gradient-to-r from-[#0A0D14] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-8 sm:w-24 lg:w-40 bg-gradient-to-l from-[#0A0D14] to-transparent z-20 pointer-events-none"></div>

          {/* Marquee Track */}
          <div className="animate-marquee items-center gap-6 sm:gap-14">
            {duplicatedLogos.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center justify-center px-3 sm:px-6 shrink-0 opacity-80 hover:opacity-100 transition-all duration-300 group cursor-default"
                title={item.name}
              >
                <img
                  src={item.src}
                  onError={(e) => {
                    if (item.local && !e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = 'true';
                      e.currentTarget.src = item.local;
                    }
                  }}
                  alt={item.name}
                  className="h-7 sm:h-10 w-auto max-w-[110px] sm:max-w-[175px] object-contain transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none drop-shadow-sm"
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
