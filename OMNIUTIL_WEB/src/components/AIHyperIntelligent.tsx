import React, { useState, useEffect } from 'react';
import '../styles/ai-intelligent-colors.css';
import '../styles/ai-ultra-animations.css';

interface AIHyperIntelligentProps {
  children: React.ReactNode;
  animationType?: 'neural-sync' | 'quantum-entangle' | 'consciousness' | 'learning';
  className?: string;
}

export const AIHyperIntelligent: React.FC<AIHyperIntelligentProps> = ({
  children,
  animationType = 'neural-sync',
  className = '',
}) => {
  const [isActive, setIsActive] = useState(true);

  const animationMap = {
    'neural-sync': 'animate-neural-sync',
    'quantum-entangle': 'animate-quantum-entangle',
    'consciousness': 'animate-consciousness-awake',
    'learning': 'animate-ai-learning',
  };

  return (
    <div
      className={`ai-container ${animationMap[animationType]} ${className}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        position: 'relative',
        zIndex: 2,
      }}
    >
      {children}
    </div>
  );
};

export const AIButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, onClick, disabled = false }) => {
  return (
    <button
      className="ai-button animate-neural-sync"
      onClick={onClick}
      disabled={disabled}
      style={{ position: 'relative', zIndex: 2 }}
    >
      {children}
    </button>
  );
};

export default AIHyperIntelligent;
