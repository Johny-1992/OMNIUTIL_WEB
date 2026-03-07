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
  openGraph: {
    title: 'OMNIUTIL Infrastructure',
    description: 'World No.1 Real Consumption Reward Protocol',
    url: 'https://omniutil-web.vercel.app',
    siteName: 'OMNIUTIL',
    images: [{ url: '/branding/logo.svg' }],
    type: 'website',
  },
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
    "name": "OMNIUTIL Infrastructure",
    "description": "Infrastructure RWA Souveraine - Ticket CMC #1336140"
  };

  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/branding/logo.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

// OMNI_SOUVEREIGN_FORCE_v6.7: Fri Mar  6 13:43:07 UTC 2026
// OMNI_FORCE_ACTUALIZATION_v6.8: Sat Mar  7 15:20:03 UTC 2026
// VERCEL_INCIDENT_RECOVERY_SOUVEREIGN: Sat Mar  7 15:53:25 UTC 2026
// OMNI_GALAXY_FINAL_SYNC: Sat Mar  7 16:51:41 UTC 2026
