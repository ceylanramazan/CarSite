'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { motion } from 'framer-motion'
import { Car, Calendar, Phone } from 'lucide-react'
import { BRANDS } from '@/lib/constants'

const YEARS = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i)

export default function QuickOfferForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    model: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form verilerini local storage'a kaydet
    if (formData.brand || formData.year || formData.model) {
      localStorage.setItem('quickOfferData', JSON.stringify(formData))
    }
    // Araç bilgileri sayfasına yönlendir
    router.push('/teklif-al/arac-bilgileri')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-200 max-w-4xl mx-auto"
    >

      {/* Title */}
      <div className="mb-6 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
          Arabanızı aynı gün değerinde satın!
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Güvenli, hızlı ve kolay araç alım deneyimi. Aracınızı ücretsiz değerlendir.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Model Yılı */}
          <div>
            <label htmlFor="year" className="mb-2 block text-sm font-semibold text-gray-700">
              Yıl
            </label>
            <Select
              id="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="h-10 text-sm border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 pr-8"
            >
              <option value="">Yıl Seçiniz</option>
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>

          {/* Marka */}
          <div>
            <label htmlFor="brand" className="mb-2 block text-sm font-semibold text-gray-700">
              Marka
            </label>
            <Select
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="h-10 text-sm border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 pr-8"
            >
              <option value="">Marka Seçiniz</option>
              {BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Select>
          </div>

          {/* Model */}
          <div>
            <label htmlFor="model" className="mb-2 block text-sm font-semibold text-gray-700">
              Model
            </label>
            <Select
              id="model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="h-10 text-sm border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 pr-8"
            >
              <option value="">Model Seçiniz</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="Station Wagon">Station Wagon</option>
              <option value="Coupe">Coupe</option>
              <option value="Cabrio">Cabrio</option>
              <option value="Pickup">Pickup</option>
              <option value="Van">Van</option>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="px-6 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Ön fiyat teklifi al
          </Button>
        </div>

        {/* Info Text */}
        <div className="flex items-center justify-center mt-4 text-gray-500">
          <Phone className="h-4 w-4 mr-2" />
          <span className="text-sm">Hemen teklif almak için formu doldurun</span>
        </div>
      </form>

    </motion.div>
  )
}

