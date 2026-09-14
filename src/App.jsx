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

        {/* Brand Typography Signature Strip with identical bg-dark-950 background */}
        <section className="bg-dark-950 border-b border-white/10 relative overflow-hidden py-8 sm:py-12 px-4 sm:px-6 lg:px-10 select-none pointer-events-none">
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="flex items-center justify-center opacity-85">
              <img
                src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/Pro-Colour_Schriftzug_01.webp"
                alt="Pro Colour Smart Repair"
                className="h-[clamp(2.5rem,5.5vw,5.5rem)] w-auto max-w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                loading="lazy"
              />
            </div>
            <div className="paint-pinstripe w-full mt-6 sm:mt-8"></div>
          </div>
        </section>

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
