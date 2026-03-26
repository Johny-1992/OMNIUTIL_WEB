'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignHUD } from '../components/SovereignHUD';

export default function Home() {
  const [stage, setStage] = useState('SCAN'); 
  const [config, setConfig] = useState({ ecosystem: 'AIRTEL_RDC', rate: '0.1' });
  const [liveFlux, setLiveFlux] = useState<{phone: string, amount: string, util: string}[]>([]);
  
  const valuation = "3 650 $ / UTIL";
  const version = "v9.0-INDUSTRIAL-CTO";

  // Simulation du flux de l'IA Coordinatrice
  useEffect(() => {
    if (stage === 'DEPLOYED') {
      const interval = setInterval(() => {
        const newEntry = {
          phone: `+243${Math.floor(Math.random() * 900000000 + 100000000)}`,
          amount: (Math.random() * 50 + 1).toFixed(2),
          util: (Math.random() * 0.0015).toFixed(6)
        };
        setLiveFlux(prev => [newEntry, ...prev].slice(0, 5));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <SovereignHUD valuation={valuation} version={version}>
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto px-4">
        
        <AnimatePresence mode="wait">
          {stage === 'SCAN' && (
            <motion.div 
              key="scan" exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setStage('CTO_AUTH')}
              className="liquid-glass p-10 rounded-3xl radar-pulse border border-[#06b6d466] cursor-pointer text-center"
            >
              <img src="/qr-code.png" className="w-64 h-64 grayscale contrast-150 mb-4 mx-auto" alt="OMNI_QR" />
              <p className="text-[10px] tracking-[0.4em] text-[#06b6d4] uppercase">Initialiser la Greffe Écosystème</p>
            </motion.div>
          )}

          {stage === 'CTO_AUTH' && (
            <motion.div key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full liquid-glass p-8 border border-[#06b6d4]">
              <h2 className="text-[#06b6d4] font-black text-xl mb-6 tracking-tighter">// TERMINAL ANTI-FRAUDE</h2>
              <p className="text-[11px] text-white/70 mb-8 leading-relaxed font-mono">
                En tant que CTO, vous certifiez l'intégrité des flux de facturation. 
                Toute manipulation des données de consommation réelle entraînera le gel immédiat du Node iad1.
              </p>
              <button onClick={() => setStage('CONFIG')} className="w-full py-4 border border-[#06b6d4] text-[10px] font-bold uppercase hover:bg-[#06b6d422] transition-all">
                J'accepte les conditions de Souveraineté Digitale
              </button>
            </motion.div>
          )}

          {stage === 'CONFIG' && (
            <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full liquid-glass p-8 border border-[#06b6d4]">
              <h2 className="text-[#06b6d4] font-black text-xl mb-6 tracking-tighter">// CONFIGURATION DU MÉRITE</h2>
              <div className="space-y-6 font-mono text-[10px]">
                <div>
                  <label className="block text-[#06b6d466] mb-2 uppercase">Écosystème</label>
                  <input type="text" value={config.ecosystem} onChange={(e)=>setConfig({...config, ecosystem: e.target.value})} className="w-full bg-black/40 border border-[#06b6d433] p-3 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[#06b6d466] mb-2 uppercase">Taux de Récompense (%)</label>
                  <input type="number" value={config.rate} onChange={(e)=>setConfig({...config, rate: e.target.value})} className="w-full bg-black/40 border border-[#06b6d433] p-3 text-white outline-none" />
                </div>
                <button onClick={() => setStage('DEPLOYED')} className="w-full py-4 bg-[#06b6d4] text-black font-black uppercase mt-4">
                  Activer la Greffe Industrielle
                </button>
              </div>
            </motion.div>
          )}

          {stage === 'DEPLOYED' && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-4">
              <div className="text-center p-6 border border-green-500 bg-green-500/10 mb-4">
                <h2 className="text-white font-black text-lg tracking-tighter uppercase">Greffe Active : {config.ecosystem}</h2>
                <p className="text-[9px] text-green-400 font-mono tracking-widest uppercase mt-1 animate-pulse">Node iad1 : Capture de flux en cours...</p>
              </div>

              <div className="liquid-glass border border-[#06b6d433] overflow-hidden">
                <div className="bg-[#06b6d411] p-2 text-[9px] font-black text-[#06b6d4] border-b border-[#06b6d422] flex justify-between uppercase">
                  <span>ID Utilisateur (+243)</span>
                  <span>Dépense ($)</span>
                  <span>Récompense (UTIL)</span>
                </div>
                <div className="p-2 space-y-2 min-h-[180px]">
                  {liveFlux.map((flux, i) => (
                    <motion.div 
                      key={flux.phone} 
                      initial={{ x: -20, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }} 
                      className="flex justify-between font-mono text-[10px] text-white/80 border-b border-white/5 pb-1"
                    >
                      <span className="text-[#06b6d4]">{flux.phone}</span>
                      <span>{flux.amount} $</span>
                      <span className="text-green-400">+{flux.util}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <p className="text-[8px] text-center text-white/30 uppercase tracking-[0.3em] mt-4">
                Distribution automatique via Owner Wallets | Valideur : AI COORDINATOR
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SovereignHUD>
  );
}
