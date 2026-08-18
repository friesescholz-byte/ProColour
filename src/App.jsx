import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import PainPointsPAS from './components/PainPointsPAS.jsx';
import BeforeAfterShowcase from './components/BeforeAfterShowcase.jsx';
import Services from './components/Services.jsx';
import Craftsmanship from './components/Craftsmanship.jsx';
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
        <PainPointsPAS />
        <BeforeAfterShowcase />
        <Services />
        <Craftsmanship />
        <GoogleReviews />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
