import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Partners() {
  const partnerLogos = [
    {
      id: 'autohaus-nordwest',
      name: 'Autohaus Nordwest',
      tag: 'Vertragspartner',
      url: 'https://www.google.com',
      svg: (
        <svg className="h-9 sm:h-10 w-auto" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 28L20 8L30 28H24L20 18L16 28H10Z" fill="currentColor" />
          <path d="M22 23H18" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <text x="44" y="22" fill="currentColor" fontSize="13" fontWeight="800" letterSpacing="0.08em" fontFamily="system-ui, sans-serif">AUTOHAUS</text>
          <text x="44" y="32" fill="#FF5E1E" fontSize="9" fontWeight="700" letterSpacing="0.25em" fontFamily="system-ui, sans-serif">NORDWEST</text>
        </svg>
      )
    },
    {
      id: 'weser-automobile',
      name: 'Weser Automobile',
      tag: 'Gebrauchtwagen-Zentrum',
      url: 'https://www.google.com',
      svg: (
        <svg className="h-9 sm:h-10 w-auto" viewBox="0 0 190 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12L18 28L24 16L30 28L36 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="48" y="21" fill="currentColor" fontSize="13" fontWeight="800" letterSpacing="0.08em" fontFamily="system-ui, sans-serif">WESER</text>
          <text x="48" y="31" fill="#F59E0B" fontSize="9" fontWeight="700" letterSpacing="0.2em" fontFamily="system-ui, sans-serif">AUTOMOBILE</text>
        </svg>
      )
    },
    {
      id: 'flottenservice-nord',
      name: 'FlottenService Nord',
      tag: 'Fuhrpark-Kooperation',
      url: 'https://www.google.com',
      svg: (
        <svg className="h-9 sm:h-10 w-auto" viewBox="0 0 195 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="11" width="22" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="M14 11V7H24V11" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="19" cy="20" r="3" fill="#FF5E1E" />
          <text x="42" y="21" fill="currentColor" fontSize="13" fontWeight="800" letterSpacing="0.08em" fontFamily="system-ui, sans-serif">FLOTTENSERVICE</text>
          <text x="42" y="31" fill="#FF5E1E" fontSize="9" fontWeight="700" letterSpacing="0.2em" fontFamily="system-ui, sans-serif">NORD</text>
        </svg>
      )
    },
    {
      id: 'hanseatic-car',
      name: 'Hanseatic Car Group',
      tag: 'Flotten & Leasing',
      url: 'https://www.google.com',
      svg: (
        <svg className="h-9 sm:h-10 w-auto" viewBox="0 0 195 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="18,8 24,14 30,8 28,26 12,26 10,8 16,14" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <text x="42" y="21" fill="currentColor" fontSize="13" fontWeight="800" letterSpacing="0.08em" fontFamily="system-ui, sans-serif">HANSEATIC</text>
          <text x="42" y="31" fill="#F59E0B" fontSize="9" fontWeight="700" letterSpacing="0.18em" fontFamily="system-ui, sans-serif">CAR GROUP</text>
        </svg>
      )
    },
    {
      id: 'autohaus-diepholz',
      name: 'Autohaus Diepholz',
      tag: 'Service-Partner',
      url: 'https://www.google.com',
      svg: (
        <svg className="h-9 sm:h-10 w-auto" viewBox="0 0 185 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="20" r="12" stroke="currentColor" strokeWidth="2" />
          <path d="M10 20H26M18 10V28" stroke="#FF5E1E" strokeWidth="1.5" />
          <text x="40" y="21" fill="currentColor" fontSize="13" fontWeight="800" letterSpacing="0.08em" fontFamily="system-ui, sans-serif">AUTOHAUS</text>
          <text x="40" y="31" fill="#CBD5E1" fontSize="9" fontWeight="700" letterSpacing="0.2em" fontFamily="system-ui, sans-serif">DIEPHOLZ</text>
        </svg>
      )
    }
  ];

  return (
    <section id="partners" className="py-10 sm:py-14 bg-[#0A0D14] border-b border-white/10 relative overflow-hidden">
      
      {/* Subtle background ambient light */}
      <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle Section Label */}
        <div className="text-center mb-8 sm:mb-10 space-y-1">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Unsere Partner (Beispiel) — Starke Kooperationen für Autohäuser & Fuhrparks
          </p>
        </div>

        {/* Clean Logo Row: Side-by-Side Clickable Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center justify-center">
          {partnerLogos.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${item.name} (${item.tag})`}
              className="group flex items-center justify-center p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-brand-orange/40 transition-all duration-300 text-slate-400 hover:text-white hover:scale-105 shadow-sm hover:shadow-lg relative"
            >
              {/* Logo SVG */}
              <div className="transition-transform duration-300 group-hover:scale-105">
                {item.svg}
              </div>

              {/* Discreet hover external icon */}
              <ExternalLink className="w-3 h-3 text-brand-orange absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Small subtle subnote */}
        <p className="text-center text-[11px] text-slate-500 mt-6">
          Beispiel-Logos verknüpft • Werden in Kürze durch die finalen Partnerbetriebe ersetzt
        </p>

      </div>

    </section>
  );
}
