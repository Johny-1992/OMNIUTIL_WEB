'use client';

import { motion } from 'framer-motion';
import { SovereignHUD } from '../components/SovereignHUD';
import aboutContent from '../data/about-content'; // Ton intelligence V300

export default function Home() {
  const valuation = "3 650 $ / UTIL";
  const version = "v9.0-SOUVERAIN";

  return (
    <SovereignHUD valuation={valuation} version={version}>
      <div className="relative group">
        {/* Le Centre de Greffe : Ton QR Code original */}
        <div className="liquid-glass p-8 rounded-2xl radar-pulse transition-all duration-700 hover:scale-105 border-[#06b6d466]">
          <img 
            src="/qr-code.png" 
            className="w-64 h-64 grayscale contrast-150 hover:grayscale-0 transition-all duration-700" 
            alt="OMNI_SOUVERAIN_QR"
          />
        </div>
        
        {/* Injection de l'Intelligence about-content.js */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-2xl text-center"
        >
          <h2 className="text-white font-black tracking-[0.4em] uppercase mb-6 text-sm">
            Protocole d'Intégrité
          </h2>
          <div className="text-[11px] leading-relaxed text-[#06b6d4] opacity-80 font-mono text-justify border-l border-[#06b6d433] pl-4">
            {aboutContent.fr}
          </div>
          
          <div className="mt-10 flex justify-center gap-4">
             <button className="px-6 py-2 border border-[#06b6d4] text-[10px] hover:bg-[#06b6d4] hover:text-black transition-all font-bold">
               ACCÈS WALLET (1M UTIL)
             </button>
          </div>
        </motion.div>
      </div>
    </SovereignHUD>
  );
}
