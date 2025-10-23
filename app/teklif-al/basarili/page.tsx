'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, TrendingUp, Clock, MapPin, Car } from 'lucide-react'
import { motion } from 'framer-motion'
import { useOfferForm } from '@/contexts/OfferFormContext'
import { useEffect, useState } from 'react'

export default function BasariliPage() {
  const { formData } = useOfferForm()
  const [pricingData, setPricingData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Local storage'dan pricing verilerini al
    const storedPricing = localStorage.getItem('smartiq-pricing-result')
    if (storedPricing) {
      setPricingData(JSON.parse(storedPricing))
    }
    setLoading(false)
  }, [])
  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Fiyat bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Başarı Mesajı */}
        <Card>
          <CardContent className="py-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-6 flex justify-center"
            >
              <div className="rounded-full bg-green-100 p-6">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </motion.div>

            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Teklifiniz Başarıyla Alındı!
            </h1>
            <p className="text-lg text-gray-600">
              Aracınızın değerlendirmesi tamamlandı. İşte size özel fiyat teklifimiz:
            </p>
          </CardContent>
        </Card>

        {/* Fiyat Sonuçları */}
        {pricingData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Aracınızın Değerlendirme Sonucu
                  </h2>
                  <p className="text-gray-600">
                    SmartIQ uzman değerlendirme sistemi tarafından hesaplanmıştır
                  </p>
                </div>

                {/* Araç Bilgileri */}
                {formData.vehicle && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Car className="h-5 w-5 mr-2 text-primary" />
                      Araç Bilgileri
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Marka:</span>
                        <p className="font-medium text-gray-800">{formData.vehicle.brandName || formData.vehicle.brand}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Model:</span>
                        <p className="font-medium text-gray-800">{formData.vehicle.modelName || formData.vehicle.model}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Yıl:</span>
                        <p className="font-medium text-gray-800">{formData.vehicle.year}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Kilometre:</span>
                        <p className="font-medium text-gray-800">{formData.vehicle.km?.toLocaleString()} km</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fiyat Kartları */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Minimum Fiyat */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <div className="text-blue-600 text-sm font-medium mb-2">Minimum Değer</div>
                    <div className="text-2xl font-bold text-blue-800">
                      {pricingData.minPrice ? `${pricingData.minPrice.toLocaleString()} ₺` : 'Hesaplanamadı'}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">Konservatif değerlendirme</div>
                  </div>

                  {/* Ortalama Fiyat */}
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 text-center">
                    <div className="text-primary text-sm font-medium mb-2">Ortalama Değer</div>
                    <div className="text-3xl font-bold text-primary">
                      {pricingData.avgPrice ? `${pricingData.avgPrice.toLocaleString()} ₺` : 'Hesaplanamadı'}
                    </div>
                    <div className="text-xs text-primary/70 mt-1">En gerçekçi değer</div>
                  </div>

                  {/* Maksimum Fiyat */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="text-green-600 text-sm font-medium mb-2">Maksimum Değer</div>
                    <div className="text-2xl font-bold text-green-800">
                      {pricingData.maxPrice ? `${pricingData.maxPrice.toLocaleString()} ₺` : 'Hesaplanamadı'}
                    </div>
                    <div className="text-xs text-green-600 mt-1">Optimum koşullarda</div>
                  </div>
                </div>

                {/* Ek Bilgiler */}
                <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Değerlendirme Detayları</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Değerlendirme Tarihi:</span>
                      <span className="ml-2 font-medium">{new Date().toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Bölge:</span>
                      <span className="ml-2 font-medium">İstanbul</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Bilgi Kutusu */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h4 className="font-semibold text-blue-800 mb-2">Ne zaman geri dönüş alacaksınız?</h4>
            <p className="text-blue-700 text-sm">
              Bu fiyatlar otomatik hesaplanmıştır. Uzman ekibimiz 24 saat içinde size ulaşarak 
              daha detaylı değerlendirme yapacak ve kesin teklif sunacaktır.
            </p>
          </CardContent>
        </Card>

        {/* Butonlar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              Anasayfaya Dön
            </Button>
          </Link>
          <Link href="/teklif-al/arac-bilgileri">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Yeni Teklif Al
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

