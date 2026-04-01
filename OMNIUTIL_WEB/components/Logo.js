import React from 'react';

export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org">
      <path d="M50 5L93.3 30V70L50 95L6.7 70V30L50 5Z" fill="#020617" stroke="#22d3ee" strokeWidth="4"/>
      <circle cx="50" cy="50" r="25" stroke="#f59e0b" strokeWidth="3" />
      <path d="M50 30L40 55H50L45 75L60 45H50L55 30H50Z" fill="#f59e0b" />
    </svg>
  );
}
