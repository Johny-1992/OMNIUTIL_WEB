"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';

export default function SuccessToast({ show, wallet }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-10 right-10 z-[100] bg-black border-2 border-[#00ff88] p-6 rounded-2xl shadow-[0_0_50px_rgba(0,255,136,0.4)]"
        >
          <div className="flex items-center gap-4">
            <div className="bg-[#00ff88] p-2 rounded-full">
              <ShieldCheck className="text-black" size={24} />
            </div>
            <div>
              <h4 className="text-white font-black text-sm uppercase italic">SCELLÉ_VALIDÉ</h4>
              <p className="text-[9px] opacity-60 text-[#00ff88] font-mono">
                1 UTIL ATTRIBUÉ À {wallet?.slice(0,6)}...
              </p>
            </div>
          </div>
          {/* Barre de progression néon */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 4 }}
            className="h-1 bg-[#00ff88] mt-4 rounded-full shadow-[0_0_10px_#00ff88]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
