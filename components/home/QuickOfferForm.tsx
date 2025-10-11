'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { motion } from 'framer-motion'
import { Car, Calendar } from 'lucide-react'
import { BRANDS } from '@/lib/constants'

const YEARS = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i)

export default function QuickOfferForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form verilerini local storage'a kaydet
    if (formData.brand || formData.year) {
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
      className="rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100"
    >
      {/* Badge */}
      <div className="mb-6 flex items-center justify-center">
        <div className="rounded-full bg-primary/10 px-4 py-2 flex items-center space-x-2">
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
            <div className="absolute inset-0 h-3 w-3 rounded-full bg-primary animate-ping" />
          </div>
          <span className="text-sm font-bold text-primary">Barem Güvencesi</span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-6 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-2">
          Aracını Barem güvencesi ile hemen sat,
        </h3>
        <p className="text-base sm:text-lg text-primary font-semibold">
          Paran 15 dakika hesabına gelsin!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Model Yılı */}
        <div>
          <label htmlFor="year" className="mb-2 flex items-center text-sm font-semibold text-gray-700">
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            Model Yılı
          </label>
          <Select
            id="year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="h-12 text-base border-2 transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
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
          <label htmlFor="brand" className="mb-2 flex items-center text-sm font-semibold text-gray-700">
            <Car className="mr-2 h-4 w-4 text-primary" />
            Marka
          </label>
          <Select
            id="brand"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="h-12 text-base border-2 transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Marka Seçiniz</option>
            {BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary/90"
        >
          ÜCRETSİZ TEKLİF AL
        </Button>
      </form>

      {/* Info Text */}
      <p className="mt-4 text-xs text-center text-gray-500">
        📞 Hemen teklif almak için formu doldurun
      </p>
    </motion.div>
  )
}

