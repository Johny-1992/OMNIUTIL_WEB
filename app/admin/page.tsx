'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalFlow: 0, ownerFees: 0, treasuryFees: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGlobalStats() {
      const { data, error } = await supabase.from('flow_ledger').select('amount_util, owner_fee_util, treasury_fee_util');
      if (data) {
        const total = data.reduce((acc, curr) => ({
          totalFlow: acc.totalFlow + Number(curr.amount_util),
          ownerFees: acc.ownerFees + Number(curr.owner_fee_util),
          treasuryFees: acc.treasuryFees + Number(curr.treasury_fee_util)
        }), { totalFlow: 0, ownerFees: 0, treasuryFees: 0 });
        setStats(total);
      }
      setLoading(false);
    }
    fetchGlobalStats();
    // Refresh auto toutes les 30 secondes pour le mode "Live"
    const interval = setInterval(fetchGlobalStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-sans p-8 uppercase selection:bg-[#06b6d4] selection:text-black">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end mb-20 border-b border-zinc-800 pb-10">
          <div>
            <h1 className="text-4xl font-black italic text-white tracking-tighter">OMNIUTIL_CONTROL_CENTER</h1>
            <p className="text-[8px] tracking-[0.5em] text-[#06b6d4] mt-2">REALTIME_REVENUE_MONITOR_V1.0</p>
          </div>
          <div className="text-right">
            <p className="text-[7px] opacity-40">SYSTEM_STATUS</p>
            <p className="text-[10px] text-emerald-500 font-bold">● ACTIVE_IAD1_WASHINGTON</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARTE 1: VOLUME TOTAL */}
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.1}} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[32px] hover:border-[#06b6d444] transition-all">
            <p className="text-[8px] mb-4 tracking-widest opacity-50">FLUX_TOTAL_CAPTIVÉ</p>
            <h2 className="text-4xl font-black italic text-white">{stats.totalFlow.toFixed(2)} <span className="text-xs font-normal opacity-30">UTIL</span></h2>
          </motion.div>

          {/* CARTE 2: TES REVENUS (0.5%) */}
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.2}} className="bg-zinc-900/40 border border-[#06b6d433] p-8 rounded-[32px] shadow-[0_0_40px_-15px_rgba(6,182,212,0.15)]">
            <p className="text-[8px] mb-4 tracking-widest text-[#06b6d4]">OWNER_ROYALTIES (0.5%)</p>
            <h2 className="text-4xl font-black italic text-white">{stats.ownerFees.toFixed(2)} <span className="text-xs font-normal text-[#06b6d4]">UTIL</span></h2>
          </motion.div>

          {/* CARTE 3: TRÉSORERIE (0.5%) */}
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.3}} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[32px]">
            <p className="text-[8px] mb-4 tracking-widest opacity-50">TREASURY_BURN (0.5%)</p>
            <h2 className="text-4xl font-black italic text-white">{stats.treasuryFees.toFixed(2)} <span className="text-xs font-normal opacity-30">UTIL</span></h2>
          </motion.div>
        </div>

        <footer className="mt-20 border-t border-zinc-900 pt-10 flex gap-10 opacity-30 text-[7px] tracking-widest">
            <p>PARTNER_SYNC: ACTIVE</p>
            <p>SOUVERAINETÉ: 100%</p>
            <p>BLOCK_EXPLORER: CONNECTED</p>
        </footer>
      </div>
    </div>
  );
}
