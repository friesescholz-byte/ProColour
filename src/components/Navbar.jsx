import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Ergebnisse', href: '#results' },
    { name: 'Warum wir?', href: '#pas-problems' },
    { name: 'Leistungen', href: '#services' },
    { name: 'Handwerk & Team', href: '#craftsmanship' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#141210]/90 backdrop-blur-xl border-b border-white/15 py-3 shadow-2xl'
          : 'bg-[#141210]/40 backdrop-blur-sm py-4 sm:py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        
        {/* Left: Brand Logo (Enlarged & Prominent) */}
        <div className="flex items-center">
          <a href="#" className="flex items-center group">
            <img
              src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/Pro-Colour_logo_ergebnis.webp"
              alt="Pro Colour Smart Repair"
              className="h-11 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </div>

        {/* Center: Clean Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="text-sm font-semibold tracking-wide text-slate-200 hover:text-white transition-colors relative py-1 group"
            >
              {l.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-orange to-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right: Direct Phone & Luxury CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:01702025130"
            className="text-xs sm:text-sm font-extrabold text-slate-200 hover:text-white px-3.5 py-2 rounded-xl transition-colors flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
              <Phone className="w-4 h-4" />
            </div>
            <span>0170 2025130</span>
          </a>

          <a
            href="https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20ein%20Schadensfoto%20f%C3%BCr%20eine%20Preiseinsch%C3%A4tzung%20senden."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-eyecatcher inline-flex items-center gap-2.5 text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl cursor-pointer shadow-lg hover:shadow-brand-orange/30 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Foto per WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="https://wa.me/491702025130"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-brand-orange text-white sm:hidden shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-dark-900 border border-white/10 text-slate-200 cursor-pointer"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-amber-400" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#141210]/95 backdrop-blur-2xl border-b border-white/10 px-6 pt-4 pb-8 space-y-4 shadow-2xl"
          >
            {navLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-base font-semibold text-slate-200 hover:text-brand-orange border-b border-white/5 transition-colors"
              >
                {l.name}
              </a>
            ))}
            <div className="pt-3 space-y-2.5">
              <a
                href="https://wa.me/491702025130"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-eyecatcher flex items-center justify-center gap-2.5 w-full text-white py-3.5 rounded-xl font-black text-sm"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                Foto per WhatsApp senden
              </a>
              <a
                href="tel:01702025130"
                className="flex items-center justify-center gap-2 w-full bg-dark-900 border border-white/10 text-slate-200 py-3 rounded-xl font-bold text-sm"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                Jetzt anrufen: 0170 2025130
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
