import React, { useState } from 'react';
import './styles/ai-intelligent-colors.css';
import './styles/ai-ultra-animations.css';
import './styles/9d-futuristic.css';
import './styles/holographic-effects.css';
import './App.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('accueil');
  const [language, setLanguage] = useState('fr');

  const translations: Record<string, Record<string, string>> = {
    fr: {
      accueil: 'ACCUEIL',
      operations: 'OPÉRATIONS',
      langues: 'LANGUES',
      contact: 'NOUS CONTACTER',
      don: 'DON',
      live: 'LIVE DES MÉRITES',
      apropos: 'À PROPOS',
      title: 'OMNIUTIL - INFRASTRUCTURE HYPER INTELLIGENTE',
      subtitle: 'Récompense des dépenses réelles, pas spéculative',
      scanner: 'SCANNER LE QR',
      greffe: 'GREFFER UN ÉCOSYSTÈME',
      ecosystem: 'NOM ÉCOSYSTÈME',
      api: 'API ENDPOINT',
      reward: 'TAUX DE RÉCOMPENSE (%)',
      submit: 'LANCER LA DEMANDE',
      contract: 'CONTRAT OMNIUTIL',
      owner: 'OWNER WALLET',
      treasury: 'TREASURY WALLET',
      token: 'TOKEN UTIL',
      power: 'ULTRA PUISSANT & RAPIDE',
      capture: 'CAPTURE EN TEMPS RÉEL',
      reward_desc: 'RÉCOMPENSES MÉRITÉS',
    },
    en: {
      accueil: 'HOME',
      operations: 'OPERATIONS',
      langues: 'LANGUAGES',
      contact: 'CONTACT US',
      don: 'DONATE',
      live: 'REWARDS LIVE',
      apropos: 'ABOUT',
      title: 'OMNIUTIL - HYPER INTELLIGENT INFRASTRUCTURE',
      subtitle: 'Reward real spending, not speculation',
      scanner: 'SCAN QR',
      greffe: 'PARTNER ECOSYSTEM',
      ecosystem: 'ECOSYSTEM NAME',
      api: 'API ENDPOINT',
      reward: 'REWARD RATE (%)',
      submit: 'SUBMIT REQUEST',
      contract: 'OMNIUTIL CONTRACT',
      owner: 'OWNER WALLET',
      treasury: 'TREASURY WALLET',
      token: 'UTIL TOKEN',
      power: 'ULTRA POWERFUL & FAST',
      capture: 'REAL-TIME CAPTURE',
      reward_desc: 'EARNED REWARDS',
    },
  };

  const t = translations[language];

  return (
    <div className="omniutil-app animate-consciousness-sync">
      {/* HEADER ULTRA TECHNOLOGIQUE */}
      <header className="header-ultra">
        <div className="header-content ai-container animate-neural-sync">
          <div className="logo-section">
            <h1 className="supernova-text">{t.title}</h1>
            <p className="subtitle-glow">{t.subtitle}</p>
          </div>

          {/* NAVIGATION */}
          <nav className="nav-ultra">
            {[
              { id: 'accueil', label: t.accueil },
              { id: 'operations', label: t.operations },
              { id: 'langues', label: t.langues },
              { id: 'contact', label: t.contact },
              { id: 'don', label: t.don },
              { id: 'live', label: t.live },
              { id: 'apropos', label: t.apropos },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`nav-button ai-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* LANGUAGE SELECTOR */}
          <div className="language-selector animate-quantum-entangle">
            {['fr', 'en', 'zh', 'ar', 'es', 'sw', 'pt'].map((lang) => (
              <button
                key={lang}
                className={`lang-btn ${language === lang ? 'active' : ''}`}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {activeTab === 'accueil' && (
          <section className="section-accueil animate-consciousness-awake">
            <div className="ai-container animate-neural-sync">
              <h2 className="supernova-text">LOGIQUE MÈRE</h2>
              <p className="hyper-glow">
                IA COORDONNATRICE - Système ultra intelligent de capture et récompense
              </p>

              {/* FEATURES GRID */}
              <div className="features-grid">
                <div className="feature-card ai-container animate-quantum-entangle">
                  <h3>⚡ ULTRA PUISSANT</h3>
                  <p>Capture en temps réel des flux de consommation</p>
                </div>
                <div className="feature-card ai-container animate-dimensional-rift">
                  <h3>🧠 HYPER INTELLIGENT</h3>
                  <p>IA Coordinatrice évalue et valide</p>
                </div>
                <div className="feature-card ai-container animate-exotic-oscillate">
                  <h3>💰 RÉCOMPENSES MÉRITÉS</h3>
                  <p>Basées sur dépenses réelles en UTIL</p>
                </div>
              </div>

              {/* QR CODE SECTION */}
              <div className="qr-section ai-container animate-thermonuclear">
                <h3 className="supernova-text">SCANNER QR UNIQUE</h3>
                <div className="qr-placeholder animate-quantum-vortex">
                  <p>QR CODE SCANNABLE</p>
                  <p>Porte d'entrée à la portée de tous</p>
                </div>
                <button className="ai-button animate-neural-sync">
                  {t.scanner}
                </button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'operations' && (
          <section className="section-operations animate-consciousness-awake">
            <div className="ai-container animate-neural-sync">
              <h2 className="supernova-text">OPÉRATIONS SYSTÉMIQUES</h2>

              {/* GREFFE FORM */}
              <div className="greffe-form ai-container animate-quantum-collapse">
                <h3>GREFFE & ACCEPTATION VOLONTAIRE</h3>
                <form>
                  <div className="form-group">
                    <label>{t.ecosystem}</label>
                    <input
                      type="text"
                      placeholder="Nom de votre écosystème"
                      className="ai-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>{t.api}</label>
                    <input
                      type="text"
                      placeholder="https://api.votre-ecosystem.com"
                      className="ai-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>{t.reward}</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="ai-input"
                      step="0.01"
                    />
                  </div>

                  <button
                    type="button"
                    className="ai-button animate-thermonuclear"
                  >
                    {t.submit}
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="section-contact animate-consciousness-awake">
            <div className="ai-container animate-neural-sync">
              <h2 className="supernova-text">{t.contact}</h2>
              <form className="contact-form">
                <input type="text" placeholder="Nom" className="ai-input" />
                <input type="email" placeholder="Email" className="ai-input" />
                <textarea
                  placeholder="Votre suggestion"
                  className="ai-input"
                  rows={5}
                ></textarea>
                <button type="button" className="ai-button animate-neural-sync">
                  ENVOYER
                </button>
              </form>
            </div>
          </section>
        )}

        {activeTab === 'live' && (
          <section className="section-live animate-consciousness-awake">
            <div className="ai-container animate-neural-sync">
              <h2 className="supernova-text">{t.live}</h2>
              <div className="live-metrics animate-exotic-oscillate">
                <div className="metric-card hyper-glow">
                  <h4>TOTAL RÉCOMPENSES</h4>
                  <p className="metric-value">1,250,000 UTIL</p>
                </div>
                <div className="metric-card hyper-glow">
                  <h4>ABONNÉS ACTIFS</h4>
                  <p className="metric-value">50,000+</p>
                </div>
                <div className="metric-card hyper-glow">
                  <h4>ÉCOSYSTÈMES</h4>
                  <p className="metric-value">250+</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'apropos' && (
          <section className="section-apropos animate-consciousness-awake">
            <div className="ai-container animate-neural-sync">
              <h2 className="supernova-text">{t.apropos}</h2>
              <div className="contract-info">
                <p>
                  <strong>CONTRAT:</strong>{' '}
                  <code>0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B</code>
                </p>
                <p>
                  <strong>OWNER:</strong>{' '}
                  <code>0x40BB46B9D10Dd121e7D2150EC3784782ae648090</code>
                </p>
                <p>
                  <strong>TREASURY:</strong>{' '}
                  <code>0xB13B61a6a84ABfAEfF17E92E41ee6F0eBF42693B</code>
                </p>
                <p>
                  <strong>TOKEN:</strong> UTIL - 1 UTIL = 3650 USDT
                </p>
                <p>
                  <strong>ROYALTY:</strong> Owner Fee 0.5%
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer-ultra ai-container animate-consciousness-sync">
        <p className="supernova-text">© 2040 OMNIUTIL EMPIRE - Infrastructure Hyper Intelligente</p>
      </footer>
    </div>
  );
};

export default App;
