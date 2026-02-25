import AirdropBanner from '../components/AirdropBanner';
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>OMNIUTIL | World No.1 Real Consumption Reward Protocol</title>
        <meta name="description" content="Infrastructure blockchain 4D transformant la consommation réelle en actifs liquides 24h/7j." />
        <meta name="google-site-verification" content="hz2owb3_bM-dqzGnzGFUY5YE-a66XlFidUfv5ip54FE" />
      <script type="application/ld+json">{ "@context": "https://schema.org", "@type": "Organization", "url": "https://omniutil-web.vercel.app", "logo": "https://omniutil-web.vercel.app/branding/logo.svg", "name": "OMNIUTIL Infrastructure" }</script></head>
      <body><AirdropBanner />{children}</body>
    </html>
  )
}
