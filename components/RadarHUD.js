"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function RadarHUD({ children, size = 320 }) {
  const outerRing = size + 80;
  const middleRing = size + 50;
  const innerRing = size + 20;

  return (
    <div className="relative flex items-center justify-center" style={{ width: outerRing, height: outerRing }}>
      
      {/* Outer rotating ring with markers */}
      <motion.div
        className="absolute rounded-full border border-cyan-500/20"
        style={{ width: outerRing, height: outerRing }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Compass markers */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute w-0.5 h-3 bg-cyan-500/40"
            style={{
              left: '50%',
              top: 0,
              transform: `translateX(-50%) rotate(${deg}deg)`,
              transformOrigin: `center ${outerRing / 2}px`,
            }}
          />
        ))}
        
        {/* Cardinal markers */}
        {['N', 'E', 'S', 'W'].map((dir, i) => (
          <div
            key={dir}
            className="absolute text-[8px] font-bold text-cyan-500/60"
            style={{
              left: '50%',
              top: i === 0 ? '8px' : i === 2 ? 'auto' : '50%',
              bottom: i === 2 ? '8px' : 'auto',
              right: i === 1 ? '8px' : 'auto',
              left: i === 3 ? '8px' : i === 1 ? 'auto' : '50%',
              transform: i === 0 || i === 2 ? 'translateX(-50%)' : 'translateY(-50%)',
            }}
          >
            {dir}
          </div>
        ))}
      </motion.div>

      {/* Middle ring - counter rotating */}
      <motion.div
        className="absolute rounded-full"
        style={{ 
          width: middleRing, 
          height: middleRing,
          border: '1px dashed rgba(6, 182, 212, 0.15)'
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Tech markers */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <motion.div
            key={deg}
            className="absolute w-1.5 h-1.5 bg-cyan-500/50 rounded-full"
            style={{
              left: '50%',
              top: 0,
              transform: `translateX(-50%) rotate(${deg}deg)`,
              transformOrigin: `center ${middleRing / 2}px`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: deg / 360 }}
          />
        ))}
      </motion.div>

      {/* Inner ring with glow */}
      <div
        className="absolute rounded-full border border-cyan-500/30 glow-border"
        style={{ width: innerRing, height: innerRing }}
      />

      {/* Pulsing radar rings */}
      <motion.div
        className="absolute rounded-full border-2 border-cyan-500/40"
        style={{ width: size + 10, height: size + 10 }}
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1.3, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute rounded-full border-2 border-cyan-500/40"
        style={{ width: size + 10, height: size + 10 }}
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1.3, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />

      {/* Radar sweep line */}
      <motion.div
        className="absolute"
        style={{ 
          width: '50%', 
          height: 2,
          left: '50%',
          top: '50%',
          background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.8), transparent)',
          transformOrigin: 'left center'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Sweep gradient trail */}
      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{ width: innerRing, height: innerRing }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.1) 5%, transparent 20%)'
          }}
        />
      </motion.div>

      {/* Corner brackets - top left */}
      <div className="absolute top-0 left-0 w-8 h-8">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-500/40" />
        <div className="absolute top-0 left-0 w-0.5 h-full bg-cyan-500/40" />
      </div>
      
      {/* Corner brackets - top right */}
      <div className="absolute top-0 right-0 w-8 h-8">
        <div className="absolute top-0 right-0 w-full h-0.5 bg-cyan-500/40" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-cyan-500/40" />
      </div>
      
      {/* Corner brackets - bottom left */}
      <div className="absolute bottom-0 left-0 w-8 h-8">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500/40" />
        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-cyan-500/40" />
      </div>
      
      {/* Corner brackets - bottom right */}
      <div className="absolute bottom-0 right-0 w-8 h-8">
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-cyan-500/40" />
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-cyan-500/40" />
      </div>

      {/* Status indicators */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 status-active" />
        <span className="text-[8px] font-bold text-cyan-500/70 uppercase tracking-widest">SCAN ACTIVE</span>
      </div>

      {/* QR Code container */}
      <div className="relative z-10 p-6 bg-white rounded-2xl shadow-2xl" style={{ boxShadow: '0 0 60px rgba(6, 182, 212, 0.3)' }}>
        {children}
      </div>

      {/* Bottom label */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="text-[8px] font-bold text-cyan-500/70 uppercase tracking-widest">QR LOCK</span>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 status-active" />
      </div>
    </div>
  );
}
