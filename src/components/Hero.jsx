import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const beforeAfterSlides = [
    'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(17)_ergebnis.webp',
    'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(26)_ergebnis.webp',
    'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(14)_ergebnis.webp',
    'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/unnamed%20(18)_ergebnis.webp'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Seamless auto-transition every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % beforeAfterSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [beforeAfterSlides.length]);

  return (
    <section className="relative w-full bg-paint-gloss text-white overflow-hidden px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 flex flex-col justify-center items-center min-h-[90vh] lg:min-h-screen">
      
      {/* Automotive Clearcoat Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Unified Zoom-Proof Content Wrapper */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col relative z-10 my-auto">
        
        {/* Main Grid: Left Framed Showcase + Right Content */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: 1:1 Aspect Ratio Framed Image Frame (Zoom-Proof & Proportional) */}
          <div className="lg:col-span-6 relative flex flex-col justify-center items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[580px] sm:max-w-[620px] lg:max-w-[650px] xl:max-w-[675px] aspect-square rounded-3xl overflow-hidden bg-dark-900 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-10"
            >
              {/* Seamless Stacked Slide Images in 1:1 Format */}
              {beforeAfterSlides.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt="Pro Colour Vorher Nachher Ergebnis"
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
                    currentSlide === idx
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 z-0 pointer-events-none'
                  }`}
                />
              ))}
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20"></div>
            </motion.div>
          </div>

          {/* RIGHT: Structured 3-Line Sales Message & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6 text-left lg:pl-4 py-2">
            
            {/* 3-Line Structured Headline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-white tracking-tight leading-[1.12]">
                Kratzer, Dellen & <br />
                Lackschäden <br />
                <span className="text-gradient-orange underline decoration-brand-orange decoration-3 underline-offset-6">
                  spurlos beseitigt.
                </span>
              </h1>
            </motion.div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed max-w-lg"
            >
              Bis zu <strong className="text-amber-400 font-black underline decoration-amber-400 decoration-2 underline-offset-4">70% günstiger</strong> als ein Neuteile-Austausch. Mit dem <span className="text-amber-300 font-bold">TÜV WheelDoctor System</span> und 100% Werkslack-Erhalt.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
            >
              <a
                href="https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20ein%20Schadensfoto%20f%C3%BCr%20eine%20Preiseinsch%C3%A4tzung%20senden."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-luxury inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 text-white text-sm sm:text-base font-black tracking-wide rounded-xl group cursor-pointer shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Foto per WhatsApp senden</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Direkter Meisterkontakt</span>
                <a
                  href="tel:01702025130"
                  className="text-base sm:text-lg font-black text-amber-400 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  0170 2025130
                </a>
              </div>
            </motion.div>

          </div>

        </div>

        {/* OVERLAPPING BOTTOM TITLE (Directly bound to the Grid, cannot detach when zoomed out) */}
        <div className="w-full relative z-30 pointer-events-none select-none -mt-8 sm:-mt-12 lg:-mt-16 overflow-visible">
          <div className="flex items-baseline gap-x-3 sm:gap-x-5 whitespace-nowrap pl-2 sm:pl-4 pr-4 sm:pr-8">
            {/* 1. Pro Colour */}
            <span className="font-serif italic font-normal text-gradient-orange text-[clamp(2rem,4.8vw,5.8rem)] tracking-tight leading-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.98)] shrink-0">
              Pro Colour
            </span>

            {/* 2. smart repair */}
            <span className="font-sans font-black tracking-tight uppercase text-[#F4E8D2] text-[clamp(2rem,4.8vw,5.8rem)] leading-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.98)] shrink-0">
              smart repair
            </span>
          </div>
        </div>

      </div>

      {/* Precision Paint Pinstripe Divider */}
      <div className="paint-pinstripe w-full max-w-[1600px] mt-6"></div>

    </section>
  );
}
