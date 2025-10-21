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
      className="rounded-2xl bg-white p-8 sm:p-10 shadow-2xl border border-gray-200 max-w-2xl mx-auto"
    >

      {/* Title */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Arabanızı aynı gün değerinde satın!
        </h3>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Araba satmanın tüm zorluklarını unutun. Arabanızı 1 günde harika bir fiyata satın, ödemesini aynı gün alın.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Model Yılı */}
        <div>
          <label htmlFor="year" className="mb-3 block text-sm font-semibold text-gray-700">
            Yıl
          </label>
          <Select
            id="year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="h-12 text-base border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
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
          <label htmlFor="brand" className="mb-3 block text-sm font-semibold text-gray-700">
            Marka
          </label>
          <Select
            id="brand"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="h-12 text-base border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
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
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="px-8 py-3 text-base font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Ön fiyat teklifi al
          </Button>
        </div>
      </form>

    </motion.div>
  )
}

