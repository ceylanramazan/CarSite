'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Car, Calculator, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SmartIQFormSimpleProps {
  onPricingResult?: (result: any) => void
}

interface FormData {
  year: string
  brandId: string
  modelId: string
  brandName: string
  modelName: string
  kilometer: string
}

interface Option {
  id: number
  name: string
}

interface PricingResult {
  quickSellPrice: number
  aboveMarketPrice: number
  retailPrice: number
  galleryPriceUp: number
  galleryPriceDown: number
}

export default function SmartIQFormSimple({ onPricingResult }: SmartIQFormSimpleProps) {
  const [formData, setFormData] = useState<FormData>({
    year: '',
    brandId: '',
    modelId: '',
    brandName: '',
    modelName: '',
    kilometer: ''
  })

  const [options, setOptions] = useState<{
    years: number[]
    brands: Option[]
    models: Option[]
  }>({
    years: [],
    brands: [],
    models: []
  })

  const [loading, setLoading] = useState<{
    years: boolean
    brands: boolean
    models: boolean
    pricing: boolean
  }>({
    years: false,
    brands: false,
    models: false,
    pricing: false
  })

  const [pricingResult, setPricingResult] = useState<PricingResult | null>(null)
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
        setOptions(prev => ({ ...prev, years: data.data }))
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Yıllar yüklenirken hata oluştu')
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
        setOptions(prev => ({ ...prev, brands: data.data }))
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Markalar yüklenirken hata oluştu')
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
        setOptions(prev => ({ ...prev, models: data.data }))
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Modeller yüklenirken hata oluştu')
    } finally {
      setLoading(prev => ({ ...prev, models: false }))
    }
  }

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)

    if (field === 'year') {
      setFormData(prev => ({ 
        ...prev, 
        brandId: '', modelId: '', brandName: '', modelName: ''
      }))
      setOptions(prev => ({ 
        ...prev, 
        brands: [], models: []
      }))
      if (value) loadBrands(value)
    } else if (field === 'brandId') {
      setFormData(prev => ({ 
        ...prev, 
        modelId: '', modelName: ''
      }))
      setOptions(prev => ({ 
        ...prev, 
        models: []
      }))
      if (value && formData.year) {
        const selectedBrand = options.brands.find(b => b.id.toString() === value)
        if (selectedBrand) {
          setFormData(prev => ({ ...prev, brandName: selectedBrand.name }))
        }
        loadModels(formData.year, value)
      }
    } else if (field === 'modelId') {
      const selectedModel = options.models.find(m => m.id.toString() === value)
      if (selectedModel) {
        setFormData(prev => ({ ...prev, modelName: selectedModel.name }))
      }
    }
  }

  const handlePricing = async () => {
    if (!formData.year || !formData.brandId || !formData.modelId || !formData.kilometer) {
      setError('Lütfen tüm alanları doldurun')
      return
    }

    setLoading(prev => ({ ...prev, pricing: true }))
    setError(null)

    try {
      const response = await fetch('/api/smartiq/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: parseInt(formData.year),
          brandId: parseInt(formData.brandId),
          modelId: parseInt(formData.modelId),
          bodyTypeId: 67, // Default sedan
          transmissionTypeId: 12, // Default manuel
          fuelTypeId: 11, // Default benzin
          versionId: 1, // Default version
          kilometer: parseInt(formData.kilometer)
        })
      })

      const data = await response.json()
      if (data.success) {
        setPricingResult(data.data.data.prediction)
        if (onPricingResult) {
          onPricingResult(data.data.data.prediction)
        }
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Fiyatlandırma yapılırken hata oluştu')
    } finally {
      setLoading(prev => ({ ...prev, pricing: false }))
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-primary" />
            <span>Araç Bilgileri</span>
          </CardTitle>
          <CardDescription>
            Aracınızın detaylı bilgilerini girin ve gerçek değerini öğrenin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Year Selection */}
          <div className="space-y-2">
            <Label htmlFor="year">Model Yılı *</Label>
            <Select 
              value={formData.year} 
              onChange={(e) => handleFieldChange('year', e.target.value)}
              className="h-10 text-sm border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Model yılını seçin</option>
              {options.years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </Select>
            {loading.years && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>

          {/* Brand Selection */}
          {formData.year && (
            <div className="space-y-2">
              <Label htmlFor="brandId">Marka *</Label>
              <Select 
                value={formData.brandId} 
                onChange={(e) => handleFieldChange('brandId', e.target.value)}
                className="h-10 text-sm border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                disabled={!formData.year}
              >
                <option value="">Marka seçin</option>
                {options.brands.map((brand) => (
                  <option key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </option>
                ))}
              </Select>
              {loading.brands && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          )}

          {/* Model Selection */}
          {formData.brandId && (
            <div className="space-y-2">
              <Label htmlFor="modelId">Model *</Label>
              <Select 
                value={formData.modelId} 
                onChange={(e) => handleFieldChange('modelId', e.target.value)}
                className="h-10 text-sm border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                disabled={!formData.brandId}
              >
                <option value="">Model seçin</option>
                {options.models.map((model) => (
                  <option key={model.id} value={model.id.toString()}>
                    {model.name}
                  </option>
                ))}
              </Select>
              {loading.models && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          )}

          {/* Kilometer Input */}
          <div className="space-y-2">
            <Label htmlFor="kilometer">Kilometre *</Label>
            <Input
              id="kilometer"
              type="number"
              placeholder="Kilometre girin"
              value={formData.kilometer}
              onChange={(e) => setFormData(prev => ({ ...prev, kilometer: e.target.value }))}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Pricing Button */}
          <Button 
            onClick={handlePricing} 
            disabled={loading.pricing || !formData.year || !formData.brandId || !formData.modelId || !formData.kilometer}
            className="w-full"
          >
            {loading.pricing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Fiyatlandırılıyor...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Fiyatlandır
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Pricing Results */}
      <AnimatePresence>
        {pricingResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <span>Fiyatlandırma Sonuçları</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Hızlı Satış Fiyatı</Label>
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(pricingResult.quickSellPrice)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Piyasa Üstü Fiyat</Label>
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(pricingResult.aboveMarketPrice)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Perakende Fiyat</Label>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(pricingResult.retailPrice)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Galeri Fiyat Aralığı</Label>
                    <div className="text-lg font-semibold text-gray-700">
                      {formatPrice(pricingResult.galleryPriceDown)} - {formatPrice(pricingResult.galleryPriceUp)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
