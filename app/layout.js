export const metadata = {
  title: 'OMNIUTIL | World No.1 Real Consumption Reward Protocol',
  description: 'Infrastructure blockchain 4D transformant la consommation réelle (Airtel, Canal+, Amazon) en actifs liquides 24h/7j. Protocole non-spéculatif.',
  keywords: 'OMNIUTIL, Reward Protocol, Web3 Infrastructure, Airtel RDC, Canal+, Amazon Rewards, Blockchain 2026',
  openGraph: {
    title: 'OMNIUTIL - Invincibilité & Omniprésence',
    description: 'Le protocole de récompense numéro 1 mondial.',
    url: 'https://omniutil-web.vercel.app',
    siteName: 'OMNIUTIL',
    images: [{ url: 'https://omniutil-infra.vercel.app' }],
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
