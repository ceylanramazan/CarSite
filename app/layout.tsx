import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import YandexMetrika from '@/components/analytics/YandexMetrika'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Any 2. El - Araç Alım Satım Platformu',
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
            <WhatsAppButton />
          </div>
        </Providers>
        {/* Google Analytics - Only load if measurement ID is provided */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        
        {/* Yandex Metrika - Only load if counter ID is provided */}
        {process.env.NEXT_PUBLIC_YANDEX_COUNTER_ID && (
          <YandexMetrika counterId={process.env.NEXT_PUBLIC_YANDEX_COUNTER_ID} />
        )}
      </body>
    </html>
  )
}

