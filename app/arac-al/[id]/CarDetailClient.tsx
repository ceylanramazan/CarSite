'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MapPin,
  Fuel,
  Settings,
  Calendar,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react'
import { motion } from 'framer-motion'
import type { CarBuyDTO } from '@/types'

export function CarDetailClient({ car }: { car: CarBuyDTO }) {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push('/CarSite/arac-al')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Geri
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left - Images & Details */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={car.thumbnail}
                alt={`${car.brand} ${car.model}`}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Additional Images */}
          {car.images && car.images.length > 1 && (
            <div className="mb-6 grid grid-cols-3 gap-4">
              {car.images.slice(1).map((image, idx) => (
                <div
                  key={idx}
                  className="aspect-video overflow-hidden rounded-lg bg-gray-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`${car.brand} ${car.model} - ${idx + 2}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Açıklama</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {car.description || 'Açıklama bulunmamaktadır.'}
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          {car.features && car.features.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Özellikler</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {car.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="mr-2 h-4 w-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right - Summary & Purchase */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-2xl">
                {car.brand} {car.model}
              </CardTitle>
              <div className="text-3xl font-bold text-primary">
                ₺{car.price.toLocaleString()}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Specifications */}
              <div className="space-y-3 border-b pb-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Yıl
                  </span>
                  <span className="font-medium">{car.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <Settings className="mr-2 h-4 w-4" />
                    Kilometre
                  </span>
                  <span className="font-medium">
                    {car.km.toLocaleString()} km
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <Fuel className="mr-2 h-4 w-4" />
                    Yakıt
                  </span>
                  <span className="font-medium">{car.fuel_type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <Settings className="mr-2 h-4 w-4" />
                    Vites
                  </span>
                  <span className="font-medium">{car.gearbox}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    Şehir
                  </span>
                  <span className="font-medium">{car.city}</span>
                </div>
              </div>

              {/* Purchase Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={() =>
                  router.push(`/CarSite/arac-al/satin-al/${car.id}`)
                }
              >
                Satın Al
              </Button>

              {/* Info */}
              <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                <p>
                  <strong>Not:</strong> Aracı satın almak için formu
                  doldurmanız gerekmektedir. Ekibimiz en kısa sürede sizinle
                  iletişime geçecektir.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

