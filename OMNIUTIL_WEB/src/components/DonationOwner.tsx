import React, { useState } from 'react';

interface DonationProps {
  ownerWallet: string;
}

const DonationOwner: React.FC<DonationProps> = ({ ownerWallet }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('util');

  const handleDonate = () => {
    if (!donationAmount) {
      alert('❌ Veuillez entrer un montant');
      return;
    }
    alert(`✅ Don de ${donationAmount} ${donationType.toUpperCase()} envoyé à ${ownerWallet}!`);
    setDonationAmount('');
  };

  return (
    <div className="donation-container ai-container animate-consciousness-awake">
      <h3 className="supernova-text">🎁 DONATIONS - OWNER WALLET</h3>
      <p className="hyper-glow">Soutenez l'infrastructure OMNIUTIL</p>

      <div className="donation-info">
        <p><strong>📍 Owner Wallet:</strong></p>
        <code className="wallet-display">{ownerWallet}</code>
      </div>

      <div className="donation-form">
        <div className="form-group">
          <label>Type de donation:</label>
          <div className="donation-types">
            <button
              className={`donation-btn ${donationType === 'util' ? 'active' : ''}`}
              onClick={() => setDonationType('util')}
            >
              💜 UTIL
            </button>
            <button
              className={`donation-btn ${donationType === 'usdt' ? 'active' : ''}`}
              onClick={() => setDonationType('usdt')}
            >
              💵 USDT
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Montant:</label>
          <input
            type="number"
            className="ai-input"
            placeholder="Montant de donation"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </div>

        <button
          className="ai-button animate-neural-sync"
          onClick={handleDonate}
        >
          ❤️ FAIRE UN DON
        </button>
      </div>

      <div className="donation-impact">
        <h4>💪 VOTRE IMPACT:</h4>
        <ul>
          <li>✅ Développement infrastructure</li>
          <li>✅ Maintenance et sécurité</li>
          <li>✅ Innovation continue</li>
          <li>✅ Support utilisateurs 24/7</li>
        </ul>
      </div>

      <div className="donation-benefits">
        <h4>🏆 BÉNÉFICES DONATEURS:</h4>
        <ul>
          <li>✅ Mention spéciale</li>
          <li>✅ Réduction frais (5%)</li>
          <li>✅ Accès prioritaire nouveautés</li>
          <li>✅ Badge "Bienfaiteur" NFT</li>
        </ul>
      </div>
    </div>
  );
};

export default DonationOwner;
