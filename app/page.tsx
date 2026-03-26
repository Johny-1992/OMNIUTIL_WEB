'use client';

import { motion } from 'framer-motion';
import { SovereignHUD } from '../components/SovereignHUD';

const aboutContent = {
  fr: "OMNIUTIL est un protocole de souveraineté digitale conçu pour l'indépendance des actifs. Basé sur le Node Washington iad1, il assure une précision absolue et une valorisation constante de 3 650 $ / UTIL.",
  en: "OMNIUTIL is a digital sovereignty protocol designed for asset independence. Based on the Washington iad1 Node, it ensures absolute precision and a constant valuation of ,650 / UTIL."
};

export default function Home() {
  const valuation = "3 650 $ / UTIL";
  const version = "v9.0-SOUVERAIN";

  return (
    <SovereignHUD valuation={valuation} version={version}>
      <div className="relative flex flex-col items-center">
        <div className="liquid-glass p-8 rounded-2xl radar-pulse border border-[#06b6d466]">
          <img
            src="/qr-code.png"
            className="w-64 h-64 grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            alt="OMNI_SOUVERAIN_QR"
            onError={(e) => { e.currentTarget.src = "https://omniutil-web.vercel.app/qr-code.png"; }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 max-w-2xl text-center"
        >
          <h2 className="text-white font-black tracking-[0.4em] uppercase mb-6 text-sm text-center">
            Protocole d'Intégrité
          </h2>
          <div className="text-[11px] leading-relaxed text-[#06b6d4] opacity-80 font-mono border-l border-[#06b6d433] pl-4 text-left">
            {aboutContent.fr}
          </div>
        </motion.div>
      </div>
    </SovereignHUD>
  );
}
