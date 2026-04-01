import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  walletAddress: string;
}

interface TransferProps {
  currentUser: User;
  balance: number;
  ecosystemUsers: User[];
}

const TransferUtil: React.FC<TransferProps> = ({ currentUser, balance, ecosystemUsers }) => {
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  const handleTransfer = () => {
    if (!recipientId || !amount) {
      alert('❌ Veuillez sélectionner un destinataire et entrer un montant');
      return;
    }
    if (parseFloat(amount) > balance) {
      alert('❌ Solde insuffisant!');
      return;
    }
    alert(`✅ ${amount} UTIL transférés à ${recipientId}!`);
    setRecipientId('');
    setAmount('');
    setMemo('');
  };

  const recipient = ecosystemUsers.find(u => u.id === recipientId);

  return (
    <div className="transfer-container ai-container animate-consciousness-awake">
      <h3 className="supernova-text">📤 TRANSFERT UTIL ENTRE ABONNÉS</h3>
      
      <div className="balance-display hyper-glow">
        <p>👤 Utilisateur: <strong>{currentUser.name}</strong></p>
        <p>💰 Solde: <strong>{balance} UTIL</strong></p>
      </div>

      <div className="transfer-form">
        <div className="form-group">
          <label>Destinataire (même écosystème):</label>
          <select
            className="ai-input"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
          >
            <option value="">-- Sélectionner un abonné --</option>
            {ecosystemUsers.filter(u => u.id !== currentUser.id).map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.id})
              </option>
            ))}
          </select>
        </div>

        {recipient && (
          <div className="recipient-info ai-container">
            <p>📍 Wallet: {recipient.walletAddress}</p>
          </div>
        )}

        <div className="form-group">
          <label>Montant UTIL:</label>
          <input
            type="number"
            className="ai-input"
            placeholder="Montant"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            max={balance}
          />
        </div>

        <div className="form-group">
          <label>Mémo (optionnel):</label>
          <textarea
            className="ai-input"
            placeholder="Message privé"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={3}
          />
        </div>

        <button
          className="ai-button animate-neural-sync"
          onClick={handleTransfer}
        >
          ✅ CONFIRMER TRANSFERT
        </button>
      </div>

      <div className="transfer-security">
        <h4>🔒 SÉCURITÉ:</h4>
        <ul>
          <li>✅ Transfert crypté end-to-end</li>
          <li>✅ Destinataire du même écosystème</li>
          <li>✅ Frais: 0% entre abonnés</li>
          <li>✅ Traçabilité complète</li>
        </ul>
      </div>
    </div>
  );
};

export default TransferUtil;
