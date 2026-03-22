import React from 'react';

export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer hexagon with glow */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4"/>
        </linearGradient>
      </defs>
      
      {/* Main hexagon */}
      <path 
        d="M50 5L93.3 30V70L50 95L6.7 70V30L50 5Z" 
        fill="#010409" 
        stroke="url(#hexGradient)" 
        strokeWidth="2"
        filter="url(#glow)"
      />
      
      {/* Inner tech circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="25" 
        stroke="#06b6d4" 
        strokeWidth="1.5" 
        fill="none"
        strokeDasharray="4 2"
        opacity="0.6"
      />
      
      {/* Inner hexagon accent */}
      <path 
        d="M50 25L72 37.5V62.5L50 75L28 62.5V37.5L50 25Z" 
        fill="none" 
        stroke="#06b6d4" 
        strokeWidth="1"
        opacity="0.3"
      />
      
      {/* Lightning bolt - centered and military style */}
      <path 
        d="M50 28L42 52H50L46 72L58 46H50L54 28H50Z" 
        fill="#06b6d4"
      />
      
      {/* Corner markers */}
      <path d="M50 8L52 12L48 12Z" fill="#06b6d4" opacity="0.5"/>
      <path d="M50 92L52 88L48 88Z" fill="#06b6d4" opacity="0.5"/>
      <path d="M10 32L14 34L12 30Z" fill="#06b6d4" opacity="0.5"/>
      <path d="M90 32L86 34L88 30Z" fill="#06b6d4" opacity="0.5"/>
      <path d="M10 68L14 66L12 70Z" fill="#06b6d4" opacity="0.5"/>
      <path d="M90 68L86 66L88 70Z" fill="#06b6d4" opacity="0.5"/>
    </svg>
  );
}
