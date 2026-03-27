'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function UserWallet() {
  const [step, setStep] = useState(1);
  const [id, setId] = useState('');
  const [partner, setPartner] = useState('VODACOM');
  const [amount, setAmount] = useState('0');

  // Simulation de l'intelligence iad1
  const walletAddress = id ? `0x${id.split('').reverse().join('').padEnd(40, '0').slice(0, 40)}` : '0x...';

  return (
    <div className="min-h-screen bg-[#020202] text-[#06b6d4] font-mono p-6 uppercase flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md w-full border border-[#06b6d433] rounded-[40px] p-8 bg-white/[0.02] backdrop-blur-2xl">
        
        <header className="text-center mb-10">
          <h1 className="text-xl font-black italic tracking-tighter italic text-white">TERMINAL_UTIL_V2040</h1>
          <p className="text-[7px] tracking-[0.4em] opacity-50 mt-2">AI_COORDINATOR_GRAFTING_POINT</p>
        </header>

        {step === 1 ? (
          <div className="space-y-6">
            <select 
              className="w-full bg-white/5 border border-[#06b6d433] p-4 rounded-2xl text-[10px] outline-none"
              value={partner} onChange={(e) => setPartner(e.target.value)}
            >
              <option value="VODACOM">VODACOM_RDC</option>
              <option value="CANAL_PLUS">CANAL_PLUS_AFRIQUE</option>
              <option value="E_BANK">OMNI_E_BANK</option>
            </select>
            <input 
              type="text" placeholder="ENTRER_VOTRE_ID (TEL / ABONNÉ)" 
              className="w-full bg-white/5 border border-[#06b6d433] p-5 rounded-2xl text-[#06b6d4] text-center text-xs outline-none focus:border-[#06b6d4]"
              value={id} onChange={(e) => setId(e.target.value)}
            />
            <button 
              onClick={() => id && setStep(2)}
              className="w-full bg-[#06b6d4] text-black font-black py-4 rounded-full text-[10px] tracking-[0.3em]"
            >
              ACCÉDER_AU_MÉRITE
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center p-6 border border-white/5 bg-black/40 rounded-3xl">
              <p className="text-[7px] opacity-40 mb-2">SOLDE_ACTUEL_MÉRITÉ</p>
              <p className="text-3xl font-black italic text-white">1,240.50 <span className="text-xs text-[#06b6d4]">UTIL</span></p>
              <p className="text-[6px] mt-4 opacity-30 break-all leading-tight">WALLET_ADDR: {walletAddress}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button className="bg-white/5 border border-[#06b6d433] py-3 rounded-2xl text-[8px] font-bold hover:bg-[#06b6d422]">ÉCHANGER_USDT</button>
               <button className="bg-white/5 border border-[#06b6d433] py-3 rounded-2xl text-[8px] font-bold hover:bg-[#06b6d422]">PAYER_SERVICE</button>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-[8px] font-black mb-4 italic tracking-widest">P2P_TRANSFERT_INTERNE ({partner})</h2>
              <input 
                type="text" placeholder="ID_DESTINATAIRE" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-[9px] mb-3 outline-none"
              />
              <input 
                type="number" placeholder="MONTANT_UTIL" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-[9px] mb-4 outline-none"
              />
              <button className="w-full bg-white text-black font-black py-3 rounded-full text-[9px] tracking-[0.2em]">
                VALIDER_TRANSFERT (1%_FEE)
              </button>
            </div>

            <button onClick={() => setStep(1)} className="w-full text-[7px] opacity-30 mt-4">RETOUR_AUTHENTIFICATION</button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
