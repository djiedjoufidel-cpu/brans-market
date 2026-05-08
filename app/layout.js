import './globals.css'

export const metadata = {
  title: 'BransMarket',
  description: 'Marketplace Amazon Style Cameroun',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
