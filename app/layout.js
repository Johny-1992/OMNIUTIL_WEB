import './globals.css';

export const metadata = {
  metadataBase: new URL('https://omniutil-web.vercel.app'),
  title: 'OMNIUTIL | World No.1 Real Consumption Reward Protocol',
  description: 'Infrastructure blockchain 4D transformant la consommation réelle en actifs liquides 24h/7j.',
  icons: {
    icon: '/branding/logo.svg',
    shortcut: '/branding/logo.svg',
    apple: '/branding/logo.svg',
  },
  // FORCE L'AFFICHAGE DU LOGO SUR LES RÉSEAUX SOCIAUX & MOTEURS DE RECHERCHE
  openGraph: {
    title: 'OMNIUTIL Infrastructure',
    description: 'World No.1 Real Consumption Reward Protocol',
    url: 'https://omniutil-web.vercel.app',
    siteName: 'OMNIUTIL',
    images: [{ url: '/branding/logo.svg' }],
    type: 'website',
  },
  // BALISE EXPÉRIMENTALE RECONNUE PAR CERTAINS WALLETS CRYPTO
  other: {
    'eth-token-icon': 'https://omniutil-web.vercel.app/branding/logo.svg',
    'google-site-verification': 'hz2owb3_bM-dqzGnzGFUY5YE-a66XlFidUfv5ip54FE'
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://omniutil-web.vercel.app",
    "logo": "https://omniutil-web.vercel.app/branding/logo.svg",
    "image": "https://omniutil-web.vercel.app/branding/logo.svg", // Doublé pour Google Images
    "name": "OMNIUTIL Infrastructure"
  };

  return (
    <html lang="fr">
      <head>
        {/* LE LINK ICON EST DÉJÀ DANS METADATA, MAIS ON LE GARDE POUR LA SÉCURITÉ */}
        <link rel="icon" href="/branding/logo.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* LA BANNIÈRE RESTE SUPPRIMÉE POUR ÉVITER LE DOUBLON */}
        {children}
      </body>
    </html>
  );
}
