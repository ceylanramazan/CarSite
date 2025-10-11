import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CarSite - Araç Alım Satım Platformu',
  description:
    'Güvenli, hızlı ve kolay araç alım satım platformu. Aracınızı satın veya hayalinizdeki aracı bulun.',
  keywords: 'araç, alım, satım, ikinci el, sıfır araç, otomobil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <TopBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

