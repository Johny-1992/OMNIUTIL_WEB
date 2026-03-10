import "./globals.css";

export const metadata = {
  title: "OMNIUTIL | Infrastructure de Confiance n°1",
  description: "Système mondial de récompense sur consommation réelle basée sur la méritocratie.",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OMNIUTIL INFRASTRUCTURE",
    "url": "https://omniutil-web.vercel.app",
    "description": "World #1 Trusted Infrastructure for Real Consumption Rewards."
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
