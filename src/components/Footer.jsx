import React, { useState } from 'react';
import { Star, ExternalLink, MapPin, Phone, Mail, Clock, X, ArrowUp, ShieldCheck, Accessibility } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [modal, setModal] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#0B0D13] text-slate-400 text-xs py-16 border-t border-white/10 relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            {/* Col 1: Brand & Bio */}
            <div className="space-y-4">
              <a href="#" className="inline-block">
                <img
                  src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/ProColour/Pro-Colour_logo_ergebnis.webp"
                  alt="Pro Colour Smart Repair"
                  className="h-10 w-auto object-contain"
                />
              </a>
              <p className="text-slate-400 leading-relaxed text-xs">
                Zertifizierter Smart Repair Fachbetrieb in Bruchhausen-Vilsen. Spezialisiert auf Spot-Repair, TÜV-geprüfte Alufelgenaufbereitung (WheelDoctor), schonende Dellenentfernung und Colourlock® Lederpflege.
              </p>
              <div className="text-[11px] text-amber-400 font-bold">
                Meisterbetrieb • Seit 2014 für Sie im Einsatz
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-3">
              <div className="text-sm font-black text-white uppercase tracking-wider">Leistungen & Galerie</div>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Spot-Repair & Lackierung</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Alufelgenaufbereitung (TÜV WheelDoctor)</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Dellenentfernung ohne Lackieren (DoL)</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Lederinstandsetzung & Colourlock®</a></li>
                <li>
                  <a href="#results" className="text-amber-400 hover:text-white font-bold flex items-center gap-1 transition-colors">
                    <span>Echte Vorher- & Nachher-Galerie</span>
                    <span>➔</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact & Workshop */}
            <div className="space-y-3">
              <div className="text-sm font-black text-white uppercase tracking-wider">Standort & Kontakt</div>
              <div className="space-y-2 text-slate-300">
                <p className="text-white font-bold">Pro Colour Smart Repair</p>
                <p className="text-slate-400">Inhaber: Jens Rüsch</p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>Lange Straße 108, 27305 Bruchhausen-Vilsen</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="tel:01702025130" className="text-amber-400 font-bold hover:underline">0170 2025130</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                  <a href="mailto:info@pro-colour.de" className="hover:text-white transition-colors">info@pro-colour.de</a>
                </p>
              </div>
            </div>

            {/* Col 4: Google Reviews & Opening Hours */}
            <div className="space-y-3">
              <div className="text-sm font-black text-white uppercase tracking-wider">Google Bewertung</div>
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJi7QroDTosEcRDM03Ef6Tr-o"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-brand-orange transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <span className="text-sm font-black text-white mr-1">5.0</span>
                    <div className="flex">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <div className="text-xs text-slate-200 font-bold">
                  100% Weiterempfehlung auf Google
                </div>
              </a>
              <div className="text-slate-400 text-xs pt-1 space-y-0.5">
                <div>Werkstatt: Mo & Fr 07:00 – 16:00 Uhr</div>
                <div className="text-[11px] text-slate-500">Di, Mi, Do & Sa: Nach Vereinbarung</div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Legal Modals */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
            <p>© {new Date().getFullYear()} Pro Colour Smart Repair – Inh. Jens Rüsch. Alle Rechte vorbehalten.</p>
            
            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={() => setModal('impressum')}
                className="hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Impressum
              </button>
              <button
                onClick={() => setModal('datenschutz')}
                className="hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Datenschutz
              </button>
              <button
                onClick={() => setModal('barrierefreiheit')}
                className="hover:text-amber-400 underline-offset-4 hover:underline cursor-pointer flex items-center gap-1.5"
              >
                <Accessibility className="w-3.5 h-3.5 text-brand-orange" />
                <span>Erklärung zur Barrierefreiheit</span>
              </button>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-black/60 border border-white/15 text-slate-300 hover:text-white hover:border-brand-orange transition-all cursor-pointer"
                aria-label="Nach oben scrollen"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Full Legal Dialog Modals */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#12151C] border border-white/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl space-y-5 text-slate-300 text-xs sm:text-sm leading-relaxed"
            >
              <button
                onClick={() => setModal(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-brand-orange text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Schließen"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Impressum */}
              {modal === 'impressum' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Rechtliche Angaben</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Impressum</h3>
                  
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                    <p className="font-bold text-white text-base">Pro Colour Smart Repair</p>
                    <p>Inhaber: Jens Rüsch</p>
                    <p>Lange Straße 108</p>
                    <p>27305 Bruchhausen-Vilsen</p>
                    <p className="pt-2">Deutschland</p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <p><strong className="text-white">Telefon:</strong> <a href="tel:01702025130" className="text-amber-400 hover:underline">0170 2025130</a></p>
                    <p><strong className="text-white">E-Mail:</strong> <a href="mailto:info@pro-colour.de" className="text-amber-400 hover:underline">info@pro-colour.de</a></p>
                    <p><strong className="text-white">Internet:</strong> <a href="https://www.pro-colour.de" target="_blank" rel="noopener noreferrer" className="hover:underline">www.pro-colour.de</a></p>
                  </div>

                  <div className="pt-2 space-y-2 border-t border-white/10 text-xs text-slate-400">
                    <p><strong className="text-white">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</strong><br />Jens Rüsch, Lange Straße 108, 27305 Bruchhausen-Vilsen</p>
                    <p><strong className="text-white">EU-Streitschlichtung:</strong><br />Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">https://ec.europa.eu/consumers/odr</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
                    <p><strong className="text-white">Verbraucherstreitbeilegung / Universalschlichtungsstelle:</strong><br />Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                  </div>
                </div>
              )}

              {/* Datenschutz */}
              {modal === 'datenschutz' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Datenschutz & DSGVO</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Datenschutzerklärung</h3>
                  
                  <p>
                    Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO, BDSG, TTDSG) sowie dieser Datenschutzerklärung.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-base">1. Verantwortliche Stelle</h4>
                    <p>
                      Pro Colour Smart Repair<br />
                      Inh. Jens Rüsch<br />
                      Lange Straße 108, 27305 Bruchhausen-Vilsen<br />
                      E-Mail: info@pro-colour.de | Tel: 0170 2025130
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-base">2. Datenerfassung auf dieser Website</h4>
                    <p>
                      Wenn Sie uns per Kontaktformular, E-Mail oder WhatsApp Anfragen zukommen lassen, werden Ihre Angaben (Name, Telefonnummer, E-Mail, Schadensfotos) inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter (Art. 6 Abs. 1 lit. b DSGVO).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-base">3. Ihre Rechte</h4>
                    <p>
                      Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
                    </p>
                  </div>
                </div>
              )}

              {/* Barrierefreiheitserklärung (BFSG / BITV 2.0 / WCAG 2.1 AA Konform) */}
              {modal === 'barrierefreiheit' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Accessibility className="w-4 h-4 text-brand-orange" />
                    <span>Inklusion & Zugänglichkeit</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Erklärung zur Barrierefreiheit</h3>
                  
                  <p>
                    Pro Colour Smart Repair ist bemüht, seinen Webauftritt in Übereinstimmung mit den nationalen Rechtsvorschriften zur Umsetzung des Barrierefreiheitsstärkungsgesetzes (BFSG) sowie der Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) und den internationalen Richtlinien der Web Content Accessibility Guidelines (WCAG 2.1, Konformitätsstufe AA) barrierefrei und uneingeschränkt zugänglich zu gestalten.
                  </p>

                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                    <h4 className="font-bold text-white text-sm">Stand der Vereinbarkeit</h4>
                    <p className="text-xs text-slate-300">
                      Dieser Webauftritt ist mit den Richtlinien der BITV 2.0 und WCAG 2.1 AA weitestgehend vereinbar. Wir arbeiten kontinuierlich daran, alle digitalen Angebote für alle Menschen barrierefrei nutzbar zu machen.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-base">Umgesetzte Maßnahmen zur Barrierefreiheit:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                      <li><strong>Hohe Farbkontraste:</strong> Texte und interaktive Bedienelemente erfüllen die geforderten Mindestkontraste nach WCAG AA.</li>
                      <li><strong>Tastaturbedienbarkeit:</strong> Sämtliche interaktiven Elemente (Buttons, Links, Formularfelder, Bildwechsler) sind per Tastatur erreichbar und visuell fokussierbar.</li>
                      <li><strong>Screenreader-Unterstützung:</strong> Semantische HTML5-Tags, ARIA-Labels und Alternativtexte (Alt-Tags) für alle relevanten Bildelemente.</li>
                      <li><strong>Skalierbare Typografie:</strong> Schriftgrößen passen sich flexibel an verschiedene Bildschirmgrößen und Zoomstufen an.</li>
                      <li><strong>Reduzierte Bewegung:</strong> Beachtung von Nutzer-Präferenzen für reduzierte Animationen (<code>prefers-reduced-motion</code>).</li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <h4 className="font-bold text-white text-base">Feedback und Kontakt</h4>
                    <p className="text-xs text-slate-300">
                      Sollten Ihnen Mängel in Bezug auf die barrierefreie Gestaltung unserer Website auffallen oder haben Sie Fragen zur Barrierefreiheit, können Sie sich jederzeit an uns wenden:
                    </p>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs space-y-0.5">
                      <p className="font-bold text-white">Pro Colour Smart Repair – Inh. Jens Rüsch</p>
                      <p>Lange Straße 108, 27305 Bruchhausen-Vilsen</p>
                      <p>Telefon: <a href="tel:01702025130" className="text-amber-400 hover:underline">0170 2025130</a> | E-Mail: <a href="mailto:info@pro-colour.de" className="text-amber-400 hover:underline">info@pro-colour.de</a></p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400 pt-1">
                    <p><strong className="text-white">Schlichtungsverfahren:</strong> Bei nicht zufriedenstellenden Antworten aus der Kontaktaufnahme können Sie die Schlichtungsstelle nach dem Behindertengleichstellungsgesetz (BGG) einschalten.</p>
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
