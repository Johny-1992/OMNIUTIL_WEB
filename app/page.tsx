'use client';

import { motion } from 'framer-motion';
import { SovereignHUD } from '../components/SovereignHUD';

// Test d'importation dynamique pour éviter le crash au build
let aboutContent = { fr: "Protocole OMNI en attente d'initialisation..." };
try {
  // Tentative d'importation depuis la racine
  aboutContent = require('../data/about-content');
} catch (e) {
  try {
    // Tentative d'importation alternative
    aboutContent = require('./data/about-content');
  } catch (e2) {
    console.warn("Intelligence V300 non localisée via chemins standards.");
  }
}

export default function Home() {
  const valuation = "3 650 $ / UTIL";
  const version = "v9.0-SOUVERAIN";

  return (
    <SovereignHUD valuation={valuation} version={version}>
      <div className="relative flex flex-col items-center">
        <div className="liquid-glass p-8 rounded-2xl radar-pulse border border-[#06b6d466]">
          {/* Correction du chemin image si nécessaire */}
          <img
            src="/qr-code.png"
            className="w-64 h-64 grayscale contrast-125"
            alt="OMNI_SOUVERAIN_QR"
            onError={(e) => { e.currentTarget.src = "https://omniutil-web.vercel.app/qr-code.png" }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 max-w-2xl text-center"
        >
          <h2 className="text-white font-black tracking-[0.4em] uppercase mb-6 text-sm">
            Protocole d'Intégrité
          </h2>
          <div className="text-[11px] leading-relaxed text-[#06b6d4] opacity-80 font-mono border-l border-[#06b6d433] pl-4 text-left">
            {aboutContent.fr || aboutContent}
          </div>
        </motion.div>
      </div>
    </SovereignHUD>
  );
}
