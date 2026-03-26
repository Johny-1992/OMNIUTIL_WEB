'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignHUD } from '../components/SovereignHUD';

export default function Home() {
  const [stage, setStage] = useState('SCAN'); // SCAN -> CTO_AUTH -> CONFIG -> DEPLOYED
  const [config, setConfig] = useState({ ecosystem: 'AIRTEL_RDC', rate: '0.1', api: '' });
  
  const valuation = "3 650 $ / UTIL";
  const version = "v9.0-INDUSTRIAL-CTO";

  return (
    <SovereignHUD valuation={valuation} version={version}>
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto">
        
        <AnimatePresence mode="wait">
          {stage === 'SCAN' && (
            <motion.div 
              key="scan" exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setStage('CTO_AUTH')}
              className="liquid-glass p-10 rounded-3xl radar-pulse border border-[#06b6d466] cursor-pointer text-center"
            >
              <img src="/qr-code.png" className="w-64 h-64 grayscale contrast-150 mb-4" alt="OMNI_QR" />
              <p className="text-[10px] tracking-[0.4em] text-[#06b6d4] uppercase">Initialiser la Greffe Écosystème</p>
            </motion.div>
          )}

          {stage === 'CTO_AUTH' && (
            <motion.div key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full liquid-glass p-8 border border-[#06b6d4]">
              <h2 className="text-[#06b6d4] font-black text-xl mb-6 tracking-tighter">// TERMINAL ANTI-FRAUDE</h2>
              <p className="text-[11px] text-white/70 mb-8 leading-relaxed font-mono">
                En tant que CTO, vous certifiez l'intégrité des flux de facturation. 
                Toute tentative de manipulation des données de consommation réelle entraînera le gel immédiat du Node iad1 pour votre écosystème.
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
                  <label className="block text-[#06b6d466] mb-2 uppercase">Nom de l'Écosystème</label>
                  <input type="text" value={config.ecosystem} onChange={(e)=>setConfig({...config, ecosystem: e.target.value})} className="w-full bg-black/40 border border-[#06b6d433] p-3 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[#06b6d466] mb-2 uppercase">Taux de Récompense (%) sur Consommation</label>
                  <input type="number" value={config.rate} onChange={(e)=>setConfig({...config, rate: e.target.value})} className="w-full bg-black/40 border border-[#06b6d433] p-3 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[#06b6d466] mb-2 uppercase">Point de Capture API (Billing Endpoint)</label>
                  <input type="text" placeholder="https://api.airtel-rdc.cd/billing/v1" className="w-full bg-black/40 border border-[#06b6d433] p-3 text-white outline-none" />
                </div>
                <button onClick={() => setStage('DEPLOYED')} className="w-full py-4 bg-[#06b6d4] text-black font-black uppercase mt-4">
                  Activer la Greffe Industrielle
                </button>
              </div>
            </motion.div>
          )}

          {stage === 'DEPLOYED' && (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-10 border border-green-500 bg-green-500/10">
              <div className="text-4xl mb-4">💠</div>
              <h2 className="text-white font-black text-2xl tracking-tighter mb-2">GREFFE RÉUSSIE</h2>
              <p className="text-[10px] text-green-400 font-mono leading-relaxed">
                L'AI Coordinatrice capture désormais les flux de {config.ecosystem}.<br/>
                Wallets uniques en cours de génération pour les abonnés (+243...).<br/>
                Distribution du Mérite (UTIL) active à {config.rate}%.
              </p>
              <div className="mt-8 pt-8 border-t border-green-500/30">
                <p className="text-[9px] text-white/40 uppercase tracking-[0.5em]">Source : Owner Wallet (Progressive Siphoning)</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SovereignHUD>
  );
}
