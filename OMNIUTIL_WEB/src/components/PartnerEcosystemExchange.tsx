import React, { useState } from 'react';

interface Partner {
  name: string;
  utilReceived: number;
  services: string[];
  logo?: string;
}

interface PartnerExchangeProps {
  partners: Partner[];
  userId: string;
}

const PartnerEcosystemExchange: React.FC<PartnerExchangeProps> = ({ partners, userId }) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [exchangeAmount, setExchangeAmount] = useState('');

  const handlePartnerSelect = (partner: Partner) => {
    setSelectedPartner(partner);
    setExchangeAmount('');
  };

  const handleExchange = () => {
    if (!selectedPartner || !exchangeAmount) {
      alert('❌ Veuillez sélectionner un partenaire et entrer un montant');
      return;
    }
    alert(`✅ ${exchangeAmount} UTIL échangés avec ${selectedPartner.name}!`);
  };

  return (
    <div className="partner-exchange ai-container animate-dimensional-rift">
      <h3 className="supernova-text">🤝 ÉCHANGE AVEC ÉCOSYSTÈMES PARTENAIRES</h3>
      
      <div className="partners-grid">
        {partners.map((partner, idx) => (
          <div
            key={idx}
            className={`partner-card ai-container ${selectedPartner?.name === partner.name ? 'active' : ''}`}
            onClick={() => handlePartnerSelect(partner)}
          >
            <h4>{partner.name}</h4>
            <p className="hyper-glow">💰 UTIL Reçus: {partner.utilReceived}</p>
            
            <div className="services">
              <h5>📦 Services Offerts:</h5>
              <ul>
                {partner.services.map((service, i) => (
                  <li key={i}>✅ {service}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {selectedPartner && (
        <div className="exchange-form ai-container">
          <h4>Échange avec {selectedPartner.name}</h4>
          
          <div className="form-group">
            <label>Montant UTIL à échanger:</label>
            <input
              type="number"
              className="ai-input"
              placeholder="Montant"
              value={exchangeAmount}
              onChange={(e) => setExchangeAmount(e.target.value)}
              max={selectedPartner.utilReceived}
            />
          </div>

          <button
            className="ai-button animate-quantum-entangle"
            onClick={handleExchange}
          >
            ✨ VALIDER ÉCHANGE
          </button>
        </div>
      )}
    </div>
  );
};

export default PartnerEcosystemExchange;
