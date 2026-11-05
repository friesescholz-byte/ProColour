import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowRight } from 'lucide-react';

export default function MobileQuickBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls past hero (approx 280px)
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Schnellkontakt"
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] bg-[#0e1117]/95 backdrop-blur-xl border-t border-white/15 shadow-[0_-10px_30px_rgba(0,0,0,0.7)] transition-all duration-300"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Phone Call Button */}
        <a
          href="tel:01702025130"
          className="flex-1 min-h-[48px] py-2.5 px-3 rounded-xl bg-dark-900 border border-white/15 text-white font-bold text-xs xs:text-sm flex items-center justify-center gap-2 hover:border-brand-orange transition-colors active:scale-95 shadow-md"
        >
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>Anrufen</span>
        </a>

        {/* WhatsApp Damage Photo Button */}
        <a
          href="https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20ein%20Schadensfoto%20f%C3%BCr%20eine%20Preiseinsch%C3%A4tzung%20senden."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] min-h-[48px] py-2.5 px-3 rounded-xl btn-eyecatcher text-white font-extrabold text-xs xs:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95"
        >
          <MessageSquare className="w-4 h-4 fill-current shrink-0" />
          <span>Foto per WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>
    </aside>
  );
}
