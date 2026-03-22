import type { Metadata, Viewport } from 'next'
import { Orbitron, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'OMNIUTIL | Infrastructure de Confiance n°1',
  description: "L'OMNIUTIL est l'infrastructure de confiance n°1 mondiale de récompense sur consommation réelle. Basée sur la méritocratie, cette valeur s'applique via Code QR et IA Coordinatrice.",
  generator: 'OMNIUTIL v9.0-SOUVERAIN',
  keywords: ['OMNIUTIL', 'blockchain', 'trust', 'meritocracy', 'sovereign', 'infrastructure'],
  authors: [{ name: 'OMNIUTIL' }],
  openGraph: {
    title: 'OMNIUTIL | Infrastructure de Confiance n°1',
    description: "L'infrastructure de confiance n°1 mondiale de récompense sur consommation réelle.",
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00FFFF',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${orbitron.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#000510]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
