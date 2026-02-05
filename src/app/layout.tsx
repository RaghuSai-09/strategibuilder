import type { Metadata } from 'next'
import { Roboto, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Chatbot } from '@/components/ui/Chatbot'

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Strategi Builder LLC - Boutique Insurance Brokerage & Risk Advisory',
  description: 'Boutique insurance brokerage specializing in complex placements. Guided by intention, built on integrity, driven by intelligence. Expert policy solutions for M&A, restructuring, and growth.',
  keywords: ['insurance broker', 'policy brokerage', 'risk advisory', 'M&A insurance', 'D&O insurance', 'management liability', 'transactional insurance'],
  authors: [{ name: 'Strategi Builder LLC' }],
  icons: {
    icon: '/lg.png',
    shortcut: '/lg.png',
    apple: '/lg.png',
  },
  openGraph: {
    title: 'Strategi Builder LLC - Boutique Insurance Brokerage',
    description: 'Boutique insurance brokerage specializing in complex placements through deep market relationships and expert risk advisory.',
    type: 'website',
    images: [
      {
        url: '/lg.png',
        width: 1024,
        height: 512,
        alt: 'Strategi Builder Logo',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
