import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import PainPointsPAS from './components/PainPointsPAS.jsx';
import BeforeAfterShowcase from './components/BeforeAfterShowcase.jsx';
import Services from './components/Services.jsx';
import Craftsmanship from './components/Craftsmanship.jsx';
import Partners from './components/Partners.jsx';
import GoogleReviews from './components/GoogleReviews.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#12151C] text-slate-100 flex flex-col font-sans selection:bg-brand-orange selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Luxury Funnel */}
      <main className="flex-grow">
        <Hero />
        <Partners />
        <PainPointsPAS />
        <BeforeAfterShowcase />
        <Services />
        <Craftsmanship />
        <GoogleReviews />

        {/* Unified Brand Typography Signature Strip (Consistent Plus Jakarta Sans) */}
        <div className="w-full max-w-[1600px] mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-10 overflow-hidden select-none pointer-events-none">
          <div className="flex items-baseline justify-center gap-x-3 sm:gap-x-6 whitespace-nowrap opacity-80">
            <span className="font-sans font-black tracking-tight text-gradient-orange text-[clamp(2.2rem,5vw,5.5rem)] leading-none shrink-0">
              Pro Colour
            </span>
            <span className="font-sans font-black tracking-tight uppercase text-[#F4E8D2] text-[clamp(2.2rem,5vw,5.5rem)] leading-none shrink-0">
              Smart Repair
            </span>
          </div>
          <div className="paint-pinstripe w-full mt-6"></div>
        </div>

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
