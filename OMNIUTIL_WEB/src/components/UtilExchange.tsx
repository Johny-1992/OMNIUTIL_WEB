import React, { useState } from 'react';

interface ExchangeProps {
  userUtilBalance: number;
  exchangeRate: number;
}

const UtilExchange: React.FC<ExchangeProps> = ({ userUtilBalance, exchangeRate = 3650 }) => {
  const [utilAmount, setUtilAmount] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('0');

  const handleUtilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUtilAmount(value);
    setUsdtAmount((parseFloat(value) * exchangeRate).toFixed(2));
  };

  const handleSwap = () => {
    const swapped = parseFloat(utilAmount);
    if (swapped > userUtilBalance) {
      alert('❌ Solde insuffisant!');
      return;
    }
    alert(`✅ Échange de ${utilAmount} UTIL en ${usdtAmount} USDT effectué!`);
    setUtilAmount('');
    setUsdtAmount('0');
  };

  return (
    <div className="exchange-container ai-container animate-exotic-oscillate">
      <h3 className="supernova-text">💱 ÉCHANGE UTIL ↔ USDT</h3>
      
      <div className="balance-info hyper-glow">
        <p>💰 Solde UTIL: <strong>{userUtilBalance} UTIL</strong></p>
        <p>📊 Taux: 1 UTIL = {exchangeRate} USDT</p>
      </div>

      <div className="exchange-form">
        <div className="form-group">
          <label>Montant UTIL:</label>
          <input
            type="number"
            className="ai-input"
            placeholder="Entrez montant UTIL"
            value={utilAmount}
            onChange={handleUtilChange}
            max={userUtilBalance}
          />
        </div>

        <div className="exchange-arrow">⬇️ ➡️ ⬆️</div>

        <div className="form-group">
          <label>Montant USDT:</label>
          <input
            type="text"
            className="ai-input"
            placeholder="USDT reçu"
            value={usdtAmount}
            disabled
          />
        </div>
      </div>

      <button 
        className="ai-button animate-thermonuclear"
        onClick={handleSwap}
        disabled={!utilAmount}
      >
        🔄 CONFIRMER ÉCHANGE
      </button>

      <div className="exchange-info">
        <h4>📋 CONDITIONS:</h4>
        <ul>
          <li>✅ Échange instantané</li>
          <li>✅ Taux fixe garanti</li>
          <li>✅ Frais: 0.5% (Owner Fee)</li>
          <li>✅ Destination: Wallet USDT</li>
        </ul>
      </div>
    </div>
  );
};

export default UtilExchange;
