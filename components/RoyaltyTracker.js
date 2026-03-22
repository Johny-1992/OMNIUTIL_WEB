"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Shield, Zap } from 'lucide-react';

export default function RoyaltyTracker({ color = '#06b6d4' }) {
  const [progress, setProgress] = useState(65);
  
  useEffect(() => {
    // Simulate live data fluctuation
    const interval = setInterval(() => {
      setProgress(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(60, Math.min(70, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-military p-6 rounded-lg relative overflow-hidden">
      {/* Left accent bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
        style={{ 
          background: `linear-gradient(to bottom, ${color}, ${color}50, transparent)` 
        }}
      />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line opacity-30 pointer-events-none" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-cyan-500/60" />
            <span className="text-[9px] font-bold text-cyan-500/50 uppercase tracking-widest">
              Flux de Réserve
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black" style={{ color }}>
              1,000,000
            </span>
            <span className="text-[10px] font-bold text-cyan-500/40">UTIL / AN</span>
          </div>
        </div>
        
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Activity size={20} style={{ color }} className="opacity-80" />
        </motion.div>
      </div>
      
      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest">
          <span className="text-cyan-500/50 flex items-center gap-1">
            <Zap size={10} />
            Injection Stable
          </span>
          <span style={{ color }}>{progress.toFixed(1)}% Scellé</span>
        </div>
        
        {/* Progress Bar with HUD style */}
        <div className="relative h-2 w-full bg-black/60 rounded-full overflow-hidden border border-cyan-500/20">
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, ${color}20 0px, ${color}20 1px, transparent 1px, transparent 10px)`
            }}
          />
          
          {/* Progress fill */}
          <motion.div
            className="h-full rounded-full relative"
            style={{ 
              background: `linear-gradient(90deg, ${color}80, ${color})`,
              boxShadow: `0 0 10px ${color}60`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-cyan-500/10">
          <div className="text-center">
            <span className="block text-[8px] text-cyan-500/40 uppercase tracking-wide">Daily Rate</span>
            <span className="block text-xs font-bold" style={{ color }}>2,740</span>
          </div>
          <div className="text-center border-x border-cyan-500/10">
            <span className="block text-[8px] text-cyan-500/40 uppercase tracking-wide">Holders</span>
            <span className="block text-xs font-bold text-green-500">12,847</span>
          </div>
          <div className="text-center">
            <span className="block text-[8px] text-cyan-500/40 uppercase tracking-wide">TVL</span>
            <span className="block text-xs font-bold text-amber-400">$47.2M</span>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center justify-between">
        <span className="text-[8px] font-bold text-cyan-500/30 uppercase tracking-widest flex items-center gap-1">
          <TrendingUp size={10} />
          Prochain cycle : 21.01.2027
        </span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 status-active" />
          <span className="text-[8px] text-green-500 font-bold">LIVE</span>
        </div>
      </div>
    </div>
  );
}
