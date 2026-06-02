import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'Shoot by Rom | FPV • Drone • Photography',
  description: 'Capturing stories from the ground and the sky. Premium cinematic photography and FPV drone content by a French engineering student passionate about visual storytelling.',
  keywords: ['FPV', 'drone', 'photography', 'aerial', 'cinematic', 'Guatemala', 'travel', 'visual storytelling'],
  authors: [{ name: 'Rom' }],
  openGraph: {
    title: 'Shoot by Rom | FPV • Drone • Photography',
    description: 'Capturing stories from the ground and the sky.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
