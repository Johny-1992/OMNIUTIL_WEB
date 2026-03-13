"use client";
import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDate, color }) {
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

  return (
    <div className="grid grid-cols-4 gap-4 font-black italic">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="text-3xl md:text-5xl tracking-tighter" style={{ color: color || '#00ff88' }}>
            {value.toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] opacity-40 uppercase not-italic">{unit}</span>
        </div>
      ))}
    </div>
  );
}
