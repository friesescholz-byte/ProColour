import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Camera, Upload, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + uploadedFiles.length > 3) {
      alert('Sie können maximal 3 Bilder hochladen.');
      return;
    }
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-paint-gloss text-white border-b border-white/10 relative overflow-hidden">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/8 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span>Standort & Kontakt</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Schaden anfragen oder <br />
            <span className="text-gradient-orange">persönlich vorbeikommen.</span>
          </h2>

          <p className="text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed">
            Senden Sie uns Fotos für eine unverbindliche Ersteinschätzung oder besuchen Sie unsere Werkstatt in Bruchhausen-Vilsen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Workshop Contact Info + Google Maps */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-black/50 backdrop-blur-xl rounded-3xl p-7 sm:p-9 border border-white/10 space-y-6 shadow-xl">
              
              <div>
                <h3 className="text-2xl font-black text-white">Pro Colour Smart Repair</h3>
                <p className="text-sm text-amber-400 font-semibold mt-1">Inhaber: Jens Rüsch</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Werkstatt-Adresse</div>
                  <div className="text-base font-black text-white">Lange Straße 108</div>
                  <div className="text-sm text-slate-300">27305 Bruchhausen-Vilsen</div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Telefon & WhatsApp</div>
                  <a
                    href="tel:01702025130"
                    className="text-lg font-black text-white hover:text-brand-orange transition-colors block"
                  >
                    0170 2025130
                  </a>
                  <a
                    href="https://wa.me/491702025130?text=Hallo%20Herr%20R%C3%BCsch,%20ich%20m%C3%B6chte%20ein%20Schadensfoto%20senden."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Direkt auf WhatsApp schreiben</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">E-Mail</div>
                  <a href="mailto:info@pro-colour.de" className="text-base font-bold text-white hover:text-brand-orange transition-colors">
                    info@pro-colour.de
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Öffnungszeiten Werkstatt</span>
                </div>
                <div className="flex justify-between text-slate-200 py-1 border-b border-white/5">
                  <span className="font-bold text-white">Montag & Freitag:</span>
                  <span className="font-semibold text-amber-300">07:00 – 16:00 Uhr</span>
                </div>
                <div className="text-slate-300 pt-1 text-xs sm:text-sm">
                  Di, Mi, Do & Sa: Nach telefonischer Vereinbarung
                </div>
              </div>

            </div>

            {/* Google Maps Frame */}
            <div className="rounded-3xl overflow-hidden border border-white/10 h-72 bg-dark-900 shadow-xl relative">
              <iframe
                title="Google Maps Standort"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2410.318814450065!2d9.0035397!3d52.8346105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b0559a43a055d7%3A0xeaaf93fe1137cd0c!2sPro%20Colour%20Smart%20Repair%20-%20Jens%20R%C3%BCsch!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Clean Contact Form with Photo Upload */}
          <div className="lg:col-span-7">
            <div className="bg-black/50 backdrop-blur-xl rounded-3xl p-7 sm:p-10 border border-white/10 shadow-xl">
              
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Anfrage erfolgreich versendet!</h3>
                  <p className="text-base text-slate-200 max-w-md mx-auto leading-relaxed">
                    Wir haben Ihre Angaben {uploadedFiles.length > 0 && `inklusive ${uploadedFiles.length} Fotos`} erhalten. Jens Rüsch meldet sich schnellstmöglich bei Ihnen.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setUploadedFiles([]);
                      setForm({ name: '', phone: '', email: '', message: '' });
                    }}
                    className="mt-4 px-7 py-3 rounded-xl bg-dark-900 border border-white/15 text-sm font-bold text-white hover:border-brand-orange cursor-pointer"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Kostenlose Anfrage stellen
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">
                      Füllen Sie das Formular aus – wir melden uns schnell und unverbindlich.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5 uppercase tracking-wider">Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Max Mustermann"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#12151C] border border-white/15 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5 uppercase tracking-wider">Telefonnummer *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0170 1234567"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#12151C] border border-white/15 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5 uppercase tracking-wider">E-Mail Adresse *</label>
                    <input
                      type="email"
                      required
                      placeholder="ihre-email@beispiel.de"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#12151C] border border-white/15 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-1.5 uppercase tracking-wider">Schadenbeschreibung</label>
                    <textarea
                      rows="3"
                      placeholder="Beschreiben Sie kurz den Schaden (z. B. Kratzer an Stoßstange, Bordsteinkontakt Alufelge)..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#12151C] border border-white/15 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-brand-orange transition-colors"
                    ></textarea>
                  </div>

                  {/* Clean Schadensfoto Upload Dropzone */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-200 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-brand-orange" />
                        <span>Schadensfotos anhängen (optional, max. 3)</span>
                      </span>
                      {uploadedFiles.length > 0 && (
                        <span className="text-xs text-amber-400 font-bold">{uploadedFiles.length}/3 ausgewählt</span>
                      )}
                    </div>

                    <label className="border border-dashed border-white/20 hover:border-brand-orange/60 bg-[#12151C]/60 hover:bg-[#12151C] rounded-xl p-4 flex items-center justify-center gap-3 cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 text-amber-400" />
                      <span className="text-sm text-slate-200 font-medium">
                        Fotos auswählen oder hier ablegen (JPG, PNG)
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Preview Thumbnails */}
                    {uploadedFiles.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 pt-1">
                        {uploadedFiles.map((fileObj, fIdx) => (
                          <div key={fIdx} className="relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-dark-950">
                            <img
                              src={fileObj.preview}
                              alt={fileObj.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(fIdx)}
                              className="absolute top-1 right-1 p-1 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors cursor-pointer"
                              aria-label="Bild entfernen"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-3d-luxury w-full py-4 px-6 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-xl mt-3"
                  >
                    <Send className="w-4 h-4" />
                    <span>Anfrage kostenlos absenden</span>
                  </button>

                  <div className="pt-1 text-center text-sm text-slate-400">
                    Oder schneller direkt per WhatsApp: <a href="https://wa.me/491702025130" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-black hover:underline">0170 2025130</a>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
