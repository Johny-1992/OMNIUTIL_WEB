'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [pass, setPass] = useState('');
  const [stats, setStats] = useState({ nodes: 1, flow: 0, treasury: 0, infra: 0 });

  const MASTER_KEY = "OMNI_2040_LEAD";

  useEffect(() => {
    if (authorized) {
      const interval = setInterval(() => {
        setStats(prev => {
          const newFlow = prev.flow + Math.random() * 100;
          return { ...prev, flow: newFlow, treasury: newFlow * 0.005, infra: newFlow * 0.005 };
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [authorized]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 font-mono">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-[#06b6d4] text-xs font-black tracking-[0.6em] mb-12 italic">NODE_IAD1_ACCESS_REQUIRED</h1>
          <input 
            type="password" placeholder="ENTER_MASTER_KEY" 
            className="w-full bg-white/5 border border-[#06b6d433] p-5 rounded-full text-[#06b6d4] text-center outline-none focus:border-[#06b6d4] transition-all"
            value={pass} onChange={(e) => setPass(e.target.value)}
          />
          <button 
            onClick={() => pass === MASTER_KEY ? setAuthorized(true) : alert("INVALID_KEY")}
            className="w-full bg-[#06b6d4] text-black font-black py-4 rounded-full text-[10px] tracking-[0.3em] shadow-[0_0_20px_#06b6d444]"
          >
            AUTHORIZE_SESSION
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-[#06b6d4] font-mono p-4 lg:p-8 uppercase">
      <div className="max-w-6xl mx-auto border border-[#06b6d433] rounded-[40px] p-8 lg:p-12 backdrop-blur-3xl bg-white/[0.02]">
        <header className="flex justify-between items-center mb-16 border-b border-[#06b6d422] pb-8">
          <div>
            <h1 className="text-xl lg:text-3xl font-black italic tracking-tighter">ADMIN_COCKPIT</h1>
            <p className="text-[7px] tracking-[0.4em] opacity-40">MASTER_SOUVERAIN_SESSION_ACTIVE</p>
          </div>
          <button onClick={() => setAuthorized(false)} className="text-[8px] border border-red-500/30 text-red-500/50 px-4 py-2 rounded-full">LOGOUT</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { label: "Nœuds Greffés", val: stats.nodes, unit: "NODE" },
            { label: "Flux Capturé", val: stats.flow.toFixed(2), unit: "UTIL" },
            { label: "Soutien Trésor", val: stats.treasury.toFixed(4), unit: "UTIL" },
            { label: "Soutien Infra", val: stats.infra.toFixed(4), unit: "UTIL" }
          ].map((item, i) => (
            <div key={i} className="p-6 border border-white/5 bg-black/40 rounded-3xl">
              <p className="text-[7px] mb-4 opacity-40 tracking-widest">{item.label}</p>
              <p className="text-xl font-black italic">{item.val} <span className="text-[8px] opacity-30 italic">{item.unit}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
