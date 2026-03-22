"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown({ targetDate, color = '#06b6d4' }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = targetDate - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const labels = { d: 'DAYS', h: 'HRS', m: 'MIN', s: 'SEC' };

  return (
    <div className="grid grid-cols-4 gap-3">
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <motion.div
          key={unit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative flex flex-col items-center"
        >
          {/* HUD Corner Brackets */}
          <div className="relative w-full">
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-500/40" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-500/40" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-500/40" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-500/40" />
            
            {/* Value Container */}
            <div className="bg-black/60 border border-cyan-500/20 rounded-sm p-3 backdrop-blur-sm">
              <motion.span
                key={value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="block text-2xl md:text-4xl font-black tracking-tight text-center"
                style={{ 
                  color: color,
                  textShadow: `0 0 20px ${color}40`
                }}
              >
                {value.toString().padStart(2, '0')}
              </motion.span>
            </div>
          </div>
          
          {/* Label */}
          <span className="mt-2 text-[8px] font-bold text-cyan-500/50 tracking-[0.2em]">
            {labels[unit]}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
