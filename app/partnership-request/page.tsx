'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SovereignHUD } from '../../components/SovereignHUD';

// Conservez votre logique d'importation d'about-content ou de traduction si nécessaire
// import aboutContent from '../../data/about-content'; 

export default function PartnershipRequest() {
  const valuation = "3 650 $ / UTIL";
  const version = "v9.0-SOUVERAIN";

  // --- CONSERVATION DE TOUTE L'INTELLIGENCE DU FORMULAIRE V300 ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    console.log("Sovereign Partnership Request Initialized:", formData);
    
    // Simulez votre soumission originale (par exemple vers une API Next.js ou Python)
    try {
      // await VotreApiDePartenariat(formData);
      setTimeout(() => setStatus('submitted'), 1500); 
    } catch (error) {
      console.error("Protocol Error:", error);
      setStatus('error');
    }
  };
  // ------------------------------------------------------------------

  return (
    <SovereignHUD valuation={valuation} version={version}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="liquid-glass p-8 rounded-2xl border border-[#06b6d466] relative overflow-hidden">
          {/* Effet de scanline local pour le formulaire */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px%_100%]"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tighter text-white mb-2 flex items-center gap-3">
              <span className="text-[#06b6d4]">//</span> PROTOCOLE DE PARTENARIAT
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-[#06b6d4] opacity-70 mb-10 border-b border-[#06b6d433] pb-4">
              Initialisation de la requête de souveraineté conjointe
            </p>

            {status === 'submitted' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 border border-[#06b6d4] bg-[#06b6d411]"
              >
                <span className="text-5xl mb-4 block">✅</span>
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">Requête Transmise</h2>
                <p className="text-sm text-[#06b6d4] mt-2 font-mono">ADN V300 sérialisé. Analyse en cours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                
                {/* Champ Nom */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[11px] uppercase tracking-widest text-[#06b6d466]">Identifiant / Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-black/50 border border-[#06b6d433] p-3 text-white focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] outline-none transition-all liquid-glass"
                    placeholder="Entrez votre identifiant"
                  />
                </div>

                {/* Champ Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[11px] uppercase tracking-widest text-[#06b6d466]">Canal de Communication (Email)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-black/50 border border-[#06b6d433] p-3 text-white focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] outline-none transition-all liquid-glass"
                    placeholder="adresse@protocole.com"
                  />
                </div>

                {/* Champ Organisation */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="organization" className="text-[11px] uppercase tracking-widest text-[#06b6d466]">Organisation / Entité Souveraine</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="bg-black/50 border border-[#06b6d433] p-3 text-white focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] outline-none transition-all liquid-glass"
                    placeholder="Nom de votre entité"
                  />
                </div>

                {/* Champ Message */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="message" className="text-[11px] uppercase tracking-widest text-[#06b6d466]">Détails de la Requête de Partenariat</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-black/50 border border-[#06b6d433] p-3 text-white focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] outline-none transition-all liquid-glass resize-none"
                    placeholder="Décrivez votre proposition d'intégration..."
                  />
                </div>

                {/* Bouton de Soumission Militaire */}
                <div className="md:col-span-2 flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group relative overflow-hidden border border-[#06b6d4] px-10 py-4 text-xs font-bold uppercase transition-all liquid-glass hover:shadow-[0_0_20px_-3px_#06b6d4]"
                  >
                    <div className="absolute inset-0 bg-[#06b6d4] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 group-hover:text-black transition-colors flex items-center gap-2">
                      {status === 'submitting' ? 'Transmission en cours...' : 'Exécuter la requête [PARTNERSHIP]'}
                    </span>
                  </button>
                </div>
                 
                {status === 'error' && (
                    <p className="text-center text-red-500 text-xs md:col-span-2 mt-2 font-mono">Erreur critique : Échec de la transmission du protocole.</p>
                )}

              </form>
            )}
          </div>
        </div>
      </motion.div>
    </SovereignHUD>
  );
}
