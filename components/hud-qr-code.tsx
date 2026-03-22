"use client"

import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"

interface HUDQRCodeProps {
  value: string
  size?: number
}

export function HUDQRCode({ value, size = 200 }: HUDQRCodeProps) {
  return (
    <div className="relative" style={{ width: size + 100, height: size + 100 }}>
      {/* Outer rotating radar ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full h-full" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r="145"
            fill="none"
            stroke="rgba(0,255,255,0.1)"
            strokeWidth="1"
          />
          {/* Radar sweep */}
          <path
            d="M150,150 L150,5 A145,145 0 0,1 255,50 Z"
            fill="url(#radarSweep)"
          />
          <defs>
            <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(0,255,255,0)" />
            </linearGradient>
          </defs>
          {/* Tick marks */}
          {Array.from({ length: 72 }).map((_, i) => {
            const angle = (i * 5 * Math.PI) / 180
            const inner = i % 6 === 0 ? 130 : 138
            const outer = 145
            return (
              <line
                key={i}
                x1={150 + inner * Math.sin(angle)}
                y1={150 - inner * Math.cos(angle)}
                x2={150 + outer * Math.sin(angle)}
                y2={150 - outer * Math.cos(angle)}
                stroke={i % 6 === 0 ? "rgba(0,255,255,0.5)" : "rgba(0,255,255,0.2)"}
                strokeWidth={i % 6 === 0 ? "2" : "1"}
              />
            )
          })}
        </svg>
      </motion.div>

      {/* Inner counter-rotating ring */}
      <motion.div
        className="absolute inset-4"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full h-full" viewBox="0 0 280 280">
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="rgba(0,255,255,0.15)"
            strokeWidth="0.5"
            strokeDasharray="10 5"
          />
          {/* Cardinal markers */}
          {[0, 90, 180, 270].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 140 140)`}>
              <rect x="138" y="15" width="4" height="10" fill="rgba(0,255,255,0.6)" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Pulsing rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-cyan-500/20"
          style={{
            inset: 20 + ring * 8,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: ring * 0.3,
          }}
        />
      ))}

      {/* Corner targeting brackets */}
      <div className="absolute inset-8">
        {/* Top Left */}
        <motion.div 
          className="absolute top-0 left-0 w-8 h-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
        
        {/* Top Right */}
        <motion.div 
          className="absolute top-0 right-0 w-8 h-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-400 to-transparent" />
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
        
        {/* Bottom Left */}
        <motion.div 
          className="absolute bottom-0 left-0 w-8 h-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-cyan-400 to-transparent" />
        </motion.div>
        
        {/* Bottom Right */}
        <motion.div 
          className="absolute bottom-0 right-0 w-8 h-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        >
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-400 to-transparent" />
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-cyan-400 to-transparent" />
        </motion.div>
      </div>

      {/* QR Code Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative p-4 bg-white rounded-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <QRCodeSVG
            value={value}
            size={size}
            level="H"
            bgColor="#ffffff"
            fgColor="#000000"
            includeMargin={false}
          />
          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-cyan-400/30 via-transparent to-transparent"
            style={{ height: "20%" }}
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Data readout labels */}
      <motion.div 
        className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-400/70 tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        GREFFE_ACTIVE
      </motion.div>
      <motion.div 
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-400/70 tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
      >
        SCAN_ENABLED
      </motion.div>
    </div>
  )
}
