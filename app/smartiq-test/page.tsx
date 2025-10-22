import { Metadata } from 'next'
import SmartIQFormSimple from '@/components/smartiq/SmartIQFormSimple'

export const metadata: Metadata = {
  title: 'SmartIQ API Test - Any 2. El',
  description: 'SmartIQ API entegrasyonu test sayfası',
}

export default function SmartIQTestPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">SmartIQ API Test</h1>
        <p className="text-gray-600">
          Bu sayfa SmartIQ API entegrasyonunu test etmek için kullanılır. 
          Aracınızın bilgilerini girin ve gerçek piyasa değerini öğrenin.
        </p>
      </div>

      <SmartIQFormSimple />
    </div>
  )
}
