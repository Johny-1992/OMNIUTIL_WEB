import './globals.css';

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://omniutil-web.vercel.app",
    "logo": "https://omniutil-web.vercel.app/branding/logo.svg",
    "name": "OMNIUTIL Infrastructure"
  };

  return (
    <html lang="fr">
      <head>
        <title>OMNIUTIL | World No.1 Real Consumption Reward Protocol</title>
        <meta name="description" content="Infrastructure blockchain 4D transformant la consommation réelle en actifs liquides 24h/7j." />
        <link rel="icon" href="/branding/logo.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* LA BANNIÈRE EST SUPPRIMÉE D'ICI POUR ÉVITER LE DOUBLON */}
        {children}
      </body>
    </html>
  );
}

