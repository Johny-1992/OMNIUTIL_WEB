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
  title: "OMNIUTIL | Infrastructure Hyper-Intelligente de Confiance",
  description: "Systeme mondial de recompense sur consommation reelle basee sur la meritocratie. Hyper Intelligence, Hyper Puissance, Ultra Securite.",
  keywords: ["OMNIUTIL", "blockchain", "crypto", "rewards", "UTIL", "infrastructure", "merit"],
  openGraph: {
    title: "OMNIUTIL | Infrastructure Hyper-Intelligente",
    description: "World #1 Trusted Infrastructure for Real Consumption Rewards",
    type: "website",
  },
};

export const viewport = {
  themeColor: '#00d4ff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OMNIUTIL EMPIRE",
    "url": "https://omniutil-web.vercel.app",
    "description": "World #1 Trusted Infrastructure for Real Consumption Rewards - Hyper Intelligence, Hyper Power, Ultra Security."
  };

  return (
    <html lang="fr" className={`${jetbrainsMono.variable} ${inter.variable} bg-background`}>
      <head>
        <link rel="icon" href="/branding/logo.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
