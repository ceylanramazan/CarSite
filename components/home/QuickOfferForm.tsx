'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { motion } from 'framer-motion'
import { Car, Calendar, Phone, Loader2, AlertCircle } from 'lucide-react'
import { BRANDS } from '@/lib/constants'
import { useOfferForm } from '@/contexts/OfferFormContext'

const YEARS = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i)

export default function QuickOfferForm() {
  const router = useRouter()
  const { updateFormData } = useOfferForm()
  const [formData, setFormData] = useState<{
    year: string
    brandId: string
    modelId: string
    brandName: string
    modelName: string
  }>({
    year: '',
    brandId: '',
    modelId: '',
    brandName: '',
    modelName: '',
  })

  const [smartIQData, setSmartIQData] = useState<{
    years: number[]
    brands: Array<{id: number, name: string}>
    models: Array<{id: number, name: string}>
    bodyTypes: Array<{id: number, name: string}>
    transmissionTypes: Array<{id: number, name: string}>
    fuelTypes: Array<{id: number, name: string}>
    versions: Array<{id: number, name: string}>
  }>({
    years: [],
    brands: [],
    models: [],
    bodyTypes: [],
    transmissionTypes: [],
    fuelTypes: [],
    versions: []
  })

  const [loading, setLoading] = useState({
    years: false,
    brands: false,
    models: false,
    pricing: false
  })

  const [pricingResult, setPricingResult] = useState(null)
  const [error, setError] = useState<string | null>(null)

  // Load years on component mount
  useEffect(() => {
    loadYears()
  }, [])

  const loadYears = async () => {
    setLoading(prev => ({ ...prev, years: true }))
    try {
      const response = await fetch('/api/smartiq/years')
      const data = await response.json()
      if (data.success) {
        setSmartIQData(prev => ({ ...prev, years: data.data }))
      } else {
        setError('Araç bilgileri yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.')
      }
    } catch (error) {
      setError('Araç bilgileri yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.')
    } finally {
      setLoading(prev => ({ ...prev, years: false }))
    }
  }

  const loadBrands = async (year: string) => {
    if (!year) return
    setLoading(prev => ({ ...prev, brands: true }))
    try {
      const response = await fetch('/api/smartiq/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year: parseInt(year) })
      })
      const data = await response.json()
      if (data.success) {
        setSmartIQData(prev => ({ ...prev, brands: data.data }))
      } else {
        setError('Markalar yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setError('Markalar yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(prev => ({ ...prev, brands: false }))
    }
  }

  const loadModels = async (year: string, brandId: string) => {
    if (!year || !brandId) return
    setLoading(prev => ({ ...prev, models: true }))
    try {
      const response = await fetch('/api/smartiq/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year: parseInt(year), brandId: parseInt(brandId) })
      })
      const data = await response.json()
      if (data.success) {
        setSmartIQData(prev => ({ ...prev, models: data.data }))
      } else {
        setError('Modeller yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setError('Modeller yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(prev => ({ ...prev, models: false }))
    }
  }

  const handleFieldChange = (field: 'year' | 'brandId' | 'modelId' | 'brandName' | 'modelName', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)

    if (field === 'year') {
      setFormData(prev => ({ 
        ...prev, 
        brandId: '', modelId: '', brandName: '', modelName: ''
      }))
      setSmartIQData(prev => ({ 
        ...prev, 
        brands: [], models: []
      }))
      if (value) loadBrands(value)
    } else if (field === 'brandId') {
      setFormData(prev => ({ 
        ...prev, 
        modelId: '', modelName: ''
      }))
      setSmartIQData(prev => ({ 
        ...prev, 
        models: []
      }))
      if (value && formData.year) loadModels(formData.year, value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.year || !formData.brandId || !formData.modelId) {
      setError('Lütfen tüm alanları doldurun')
      return
    }

    setLoading(prev => ({ ...prev, pricing: true }))
    setError(null)

    try {
      // Form verilerini context'e kaydet (ID'leri string olarak kaydet)
      const vehicleData = {
        year: parseInt(formData.year),
        brand: formData.brandId, // ID'yi kaydet
        model: formData.modelId, // ID'yi kaydet
      }
      
      updateFormData({
        vehicle: vehicleData as any // Geçici çözüm - diğer alanlar formda doldurulacak
      })
      
      // localStorage'a da kaydet (kalıcılık için)
      localStorage.setItem('vehicleFormData', JSON.stringify(vehicleData))
      
      // Araç bilgileri sayfasına yönlendir
      router.push('/teklif-al/arac-bilgileri')
    } catch (error) {
      setError('Bir sorun oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(prev => ({ ...prev, pricing: false }))
    }
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
              Model Yılı Seçimi
            </label>
            <Select
              id="year"
              value={formData.year}
              onChange={(e) => handleFieldChange('year', e.target.value)}
              className="h-10 text-sm border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 pr-8"
            >
              <option value="">Yıl Seçiniz</option>
              {smartIQData.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
            {loading.years && <Loader2 className="h-4 w-4 animate-spin mt-1" />}
          </div>

          {/* Marka */}
          <div>
            <label htmlFor="brandId" className="mb-2 block text-sm font-semibold text-gray-700">
              Marka Seçimi
            </label>
            <Select
              id="brandId"
              value={formData.brandId}
              onChange={(e) => {
                const selectedBrand = smartIQData.brands.find(b => b.id.toString() === e.target.value)
                handleFieldChange('brandId', e.target.value)
                if (selectedBrand) {
                  setFormData(prev => ({ ...prev, brandName: selectedBrand.name }))
                }
              }}
              className="h-10 text-sm border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 pr-8"
              disabled={!formData.year}
            >
              <option value="">Marka Seçiniz</option>
              {smartIQData.brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Select>
            {loading.brands && <Loader2 className="h-4 w-4 animate-spin mt-1" />}
          </div>

          {/* Model */}
          <div>
            <label htmlFor="modelId" className="mb-2 block text-sm font-semibold text-gray-700">
              Model Seçimi
            </label>
            <Select
              id="modelId"
              value={formData.modelId}
              onChange={(e) => {
                const selectedModel = smartIQData.models.find(m => m.id.toString() === e.target.value)
                handleFieldChange('modelId', e.target.value)
                if (selectedModel) {
                  setFormData(prev => ({ ...prev, modelName: selectedModel.name }))
                }
              }}
              className="h-10 text-sm border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 pr-8"
              disabled={!formData.brandId}
            >
              <option value="">Model Seçiniz</option>
              {smartIQData.models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </Select>
            {loading.models && <Loader2 className="h-4 w-4 animate-spin mt-1" />}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={loading.pricing || !formData.year || !formData.brandId || !formData.modelId}
            className="px-6 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading.pricing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Yönlendiriliyor...
              </>
            ) : (
              'Ön fiyat teklifi al'
            )}
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


