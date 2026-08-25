import React from 'react';
import { Star, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function GoogleReviews() {
  const reviewUrl = "https://search.google.com/local/writereview?placeid=ChIJi7QroDTosEcRDM03Ef6Tr-o";

  return (
    <section id="reviews" className="py-14 md:py-18 bg-dark-950 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-card-pro rounded-2xl p-6 sm:p-8 border border-brand-orange/30 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Google 5.0 Rating Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 p-3 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0 border border-slate-200">
              <svg className="w-9 h-9" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-lg sm:text-xl font-extrabold text-white">5.0 / 5.0</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Hervorragende Kundenbewertungen auf Google
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Weiterempfehlung für Qualität, Zuverlässigkeit und faire Preise</span>
              </p>
            </div>
          </div>

          {/* Right: Action Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <Star className="w-4 h-4 fill-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Google Bewertungen ansehen</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
