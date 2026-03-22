import "./globals.css";
import { JetBrains_Mono, Inter } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: "OMNIUTIL | Infrastructure de Confiance n°1 | Military Grade",
  description: "Système mondial de récompense sur consommation réelle basée sur la méritocratie. Infrastructure souveraine v9.0 - Node Washington IAD1.",
  keywords: ["OMNIUTIL", "crypto", "blockchain", "rewards", "infrastructure", "merit", "BSC"],
  authors: [{ name: "OMNIUTIL Infrastructure" }],
  openGraph: {
    title: "OMNIUTIL | Infrastructure de Confiance n°1",
    description: "Système mondial de récompense sur consommation réelle basée sur la méritocratie.",
    url: "https://omniutil-web.vercel.app",
    siteName: "OMNIUTIL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMNIUTIL | Infrastructure de Confiance n°1",
    description: "Système mondial de récompense sur consommation réelle.",
  },
};

export const viewport = {
  themeColor: '#06b6d4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OMNIUTIL INFRASTRUCTURE",
    "url": "https://omniutil-web.vercel.app",
    "description": "World #1 Trusted Infrastructure for Real Consumption Rewards.",
    "logo": "https://omniutil-web.vercel.app/branding/logo.svg"
  };

  return (
    <html lang="fr" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/branding/logo.svg" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
