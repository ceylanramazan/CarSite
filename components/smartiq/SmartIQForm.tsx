'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Car, Calculator, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SmartIQFormProps {
  onPricingResult?: (result: any) => void
}

interface FormData {
  year: string
  brandId: string
  modelId: string
  bodyTypeId: string
  transmissionTypeId: string
  fuelTypeId: string
  versionId: string
  kilometer: string
  cityCode: string
  additionalDamageCost: string
  equipments: number[]
  damages: Array<{
    sectionType: string
    state: string
  }>
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

export default function SmartIQForm({ onPricingResult }: SmartIQFormProps) {
  const [formData, setFormData] = useState<FormData>({
    year: '',
    brandId: '',
    modelId: '',
    bodyTypeId: '',
    transmissionTypeId: '',
    fuelTypeId: '',
    versionId: '',
    kilometer: '',
    cityCode: '',
    additionalDamageCost: '',
    equipments: [],
    damages: []
  })

  const [options, setOptions] = useState<{
    years: number[]
    brands: Option[]
    models: Option[]
    bodyTypes: Option[]
    transmissionTypes: Option[]
    fuelTypes: Option[]
    versions: Option[]
    equipments: Option[]
  }>({
    years: [],
    brands: [],
    models: [],
    bodyTypes: [],
    transmissionTypes: [],
    fuelTypes: [],
    versions: [],
    equipments: []
  })

  const [loading, setLoading] = useState<{
    years: boolean
    brands: boolean
    models: boolean
    bodyTypes: boolean
    transmissionTypes: boolean
    fuelTypes: boolean
    versions: boolean
    equipments: boolean
    pricing: boolean
  }>({
    years: false,
    brands: false,
    models: false,
    bodyTypes: false,
    transmissionTypes: false,
    fuelTypes: false,
    versions: false,
    equipments: false,
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

  const loadBodyTypes = async (year: string, brandId: string, modelId: string) => {
    if (!year || !brandId || !modelId) return
    setLoading(prev => ({ ...prev, bodyTypes: true }))
    try {
      const response = await fetch('/api/smartiq/body-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          year: parseInt(year), 
          brandId: parseInt(brandId), 
          modelId: parseInt(modelId) 
        })
      })
      const data = await response.json()
      if (data.success) {
        setOptions(prev => ({ ...prev, bodyTypes: data.data }))
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Kasa tipleri yüklenirken hata oluştu')
    } finally {
      setLoading(prev => ({ ...prev, bodyTypes: false }))
    }
  }

  const loadTransmissionTypes = async (year: string, brandId: string, modelId: string, bodyTypeId: string) => {
    if (!year || !brandId || !modelId || !bodyTypeId) return
    setLoading(prev => ({ ...prev, transmissionTypes: true }))
    try {
      const response = await fetch('/api/smartiq/transmission-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          year: parseInt(year), 
          brandId: parseInt(brandId), 
          modelId: parseInt(modelId),
          bodyTypeId: parseInt(bodyTypeId)
        })
      })
      const data = await response.json()
      if (data.success) {
        setOptions(prev => ({ ...prev, transmissionTypes: data.data }))
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Vites tipleri yüklenirken hata oluştu')
    } finally {
      setLoading(prev => ({ ...prev, transmissionTypes: false }))
    }
  }

  const loadFuelTypes = async (year: string, brandId: string, modelId: string, bodyTypeId: string, transmissionTypeId: string) => {
    if (!year || !brandId || !modelId || !bodyTypeId || !transmissionTypeId) return
    setLoading(prev => ({ ...prev, fuelTypes: true }))
    try {
      const response = await fetch('/api/smartiq/fuel-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          year: parseInt(year), 
          brandId: parseInt(brandId), 
          modelId: parseInt(modelId),
          bodyTypeId: parseInt(bodyTypeId),
          transmissionTypeId: parseInt(transmissionTypeId)
        })
      })
      const data = await response.json()
      if (data.success) {
        setOptions(prev => ({ ...prev, fuelTypes: data.data }))
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Yakıt tipleri yüklenirken hata oluştu')
    } finally {
      setLoading(prev => ({ ...prev, fuelTypes: false }))
    }
  }

  const loadVersions = async (year: string, brandId: string, modelId: string, bodyTypeId: string, transmissionTypeId: string, fuelTypeId: string) => {
    if (!year || !brandId || !modelId || !bodyTypeId || !transmissionTypeId || !fuelTypeId) return
    setLoading(prev => ({ ...prev, versions: true }))
    try {
      const response = await fetch('/api/smartiq/versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          year: parseInt(year), 
          brandId: parseInt(brandId), 
          modelId: parseInt(modelId),
          bodyTypeId: parseInt(bodyTypeId),
          transmissionTypeId: parseInt(transmissionTypeId),
          fuelTypeId: parseInt(fuelTypeId)
        })
      })
      const data = await response.json()
      if (data.success) {
        setOptions(prev => ({ ...prev, versions: data.data }))
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Versiyonlar yüklenirken hata oluştu')
    } finally {
      setLoading(prev => ({ ...prev, versions: false }))
    }
  }

  const loadEquipments = async (year: string, brandId: string, modelId: string, bodyTypeId: string, transmissionTypeId: string, fuelTypeId: string, versionId: string) => {
    if (!year || !brandId || !modelId || !bodyTypeId || !transmissionTypeId || !fuelTypeId || !versionId) return
    setLoading(prev => ({ ...prev, equipments: true }))
    try {
      const response = await fetch('/api/smartiq/equipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          year: parseInt(year), 
          brandId: parseInt(brandId), 
          modelId: parseInt(modelId),
          bodyTypeId: parseInt(bodyTypeId),
          transmissionTypeId: parseInt(transmissionTypeId),
          fuelTypeId: parseInt(fuelTypeId),
          versionId: parseInt(versionId)
        })
      })
      const data = await response.json()
      if (data.success) {
        setOptions(prev => ({ ...prev, equipments: data.data }))
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError('Donanımlar yüklenirken hata oluştu')
    } finally {
      setLoading(prev => ({ ...prev, equipments: false }))
    }
  }

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)

    // Reset dependent fields when parent field changes
    if (field === 'year') {
      setFormData(prev => ({ 
        ...prev, 
        brandId: '', modelId: '', bodyTypeId: '', transmissionTypeId: '', 
        fuelTypeId: '', versionId: '', equipments: [], damages: []
      }))
      setOptions(prev => ({ 
        ...prev, 
        brands: [], models: [], bodyTypes: [], transmissionTypes: [], 
        fuelTypes: [], versions: [], equipments: []
      }))
      if (value) loadBrands(value)
    } else if (field === 'brandId') {
      setFormData(prev => ({ 
        ...prev, 
        modelId: '', bodyTypeId: '', transmissionTypeId: '', 
        fuelTypeId: '', versionId: '', equipments: [], damages: []
      }))
      setOptions(prev => ({ 
        ...prev, 
        models: [], bodyTypes: [], transmissionTypes: [], 
        fuelTypes: [], versions: [], equipments: []
      }))
      if (value && formData.year) loadModels(formData.year, value)
    } else if (field === 'modelId') {
      setFormData(prev => ({ 
        ...prev, 
        bodyTypeId: '', transmissionTypeId: '', 
        fuelTypeId: '', versionId: '', equipments: [], damages: []
      }))
      setOptions(prev => ({ 
        ...prev, 
        bodyTypes: [], transmissionTypes: [], 
        fuelTypes: [], versions: [], equipments: []
      }))
      if (value && formData.year && formData.brandId) loadBodyTypes(formData.year, formData.brandId, value)
    } else if (field === 'bodyTypeId') {
      setFormData(prev => ({ 
        ...prev, 
        transmissionTypeId: '', fuelTypeId: '', versionId: '', equipments: [], damages: []
      }))
      setOptions(prev => ({ 
        ...prev, 
        transmissionTypes: [], fuelTypes: [], versions: [], equipments: []
      }))
      if (value && formData.year && formData.brandId && formData.modelId) 
        loadTransmissionTypes(formData.year, formData.brandId, formData.modelId, value)
    } else if (field === 'transmissionTypeId') {
      setFormData(prev => ({ 
        ...prev, 
        fuelTypeId: '', versionId: '', equipments: [], damages: []
      }))
      setOptions(prev => ({ 
        ...prev, 
        fuelTypes: [], versions: [], equipments: []
      }))
      if (value && formData.year && formData.brandId && formData.modelId && formData.bodyTypeId) 
        loadFuelTypes(formData.year, formData.brandId, formData.modelId, formData.bodyTypeId, value)
    } else if (field === 'fuelTypeId') {
      setFormData(prev => ({ 
        ...prev, 
        versionId: '', equipments: [], damages: []
      }))
      setOptions(prev => ({ 
        ...prev, 
        versions: [], equipments: []
      }))
      if (value && formData.year && formData.brandId && formData.modelId && formData.bodyTypeId && formData.transmissionTypeId) 
        loadVersions(formData.year, formData.brandId, formData.modelId, formData.bodyTypeId, formData.transmissionTypeId, value)
    } else if (field === 'versionId') {
      setFormData(prev => ({ 
        ...prev, 
        equipments: [], damages: []
      }))
      setOptions(prev => ({ 
        ...prev, 
        equipments: []
      }))
      if (value && formData.year && formData.brandId && formData.modelId && formData.bodyTypeId && formData.transmissionTypeId && formData.fuelTypeId) 
        loadEquipments(formData.year, formData.brandId, formData.modelId, formData.bodyTypeId, formData.transmissionTypeId, formData.fuelTypeId, value)
    }
  }

  const handlePricing = async () => {
    if (!formData.year || !formData.brandId || !formData.modelId || !formData.bodyTypeId || 
        !formData.transmissionTypeId || !formData.fuelTypeId || !formData.versionId || !formData.kilometer) {
      setError('Lütfen tüm gerekli alanları doldurun')
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
          bodyTypeId: parseInt(formData.bodyTypeId),
          transmissionTypeId: parseInt(formData.transmissionTypeId),
          fuelTypeId: parseInt(formData.fuelTypeId),
          versionId: parseInt(formData.versionId),
          kilometer: parseInt(formData.kilometer),
          cityCode: formData.cityCode ? parseInt(formData.cityCode) : undefined,
          additionalDamageCost: formData.additionalDamageCost ? parseInt(formData.additionalDamageCost) : undefined,
          equipments: formData.equipments,
          damages: formData.damages
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
            <Select value={formData.year} onValueChange={(value) => handleFieldChange('year', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Model yılını seçin" />
              </SelectTrigger>
              <SelectContent>
                {options.years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loading.years && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>

          {/* Brand Selection */}
          {formData.year && (
            <div className="space-y-2">
              <Label htmlFor="brandId">Marka *</Label>
              <Select value={formData.brandId} onValueChange={(value) => handleFieldChange('brandId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Marka seçin" />
                </SelectTrigger>
                <SelectContent>
                  {options.brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id.toString()}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {loading.brands && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          )}

          {/* Model Selection */}
          {formData.brandId && (
            <div className="space-y-2">
              <Label htmlFor="modelId">Model *</Label>
              <Select value={formData.modelId} onValueChange={(value) => handleFieldChange('modelId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Model seçin" />
                </SelectTrigger>
                <SelectContent>
                  {options.models.map((model) => (
                    <SelectItem key={model.id} value={model.id.toString()}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {loading.models && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          )}

          {/* Body Type Selection */}
          {formData.modelId && (
            <div className="space-y-2">
              <Label htmlFor="bodyTypeId">Kasa Tipi *</Label>
              <Select value={formData.bodyTypeId} onValueChange={(value) => handleFieldChange('bodyTypeId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Kasa tipini seçin" />
                </SelectTrigger>
                <SelectContent>
                  {options.bodyTypes.map((bodyType) => (
                    <SelectItem key={bodyType.id} value={bodyType.id.toString()}>
                      {bodyType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {loading.bodyTypes && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          )}

          {/* Transmission Type Selection */}
          {formData.bodyTypeId && (
            <div className="space-y-2">
              <Label htmlFor="transmissionTypeId">Vites Tipi *</Label>
              <Select value={formData.transmissionTypeId} onValueChange={(value) => handleFieldChange('transmissionTypeId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Vites tipini seçin" />
                </SelectTrigger>
                <SelectContent>
                  {options.transmissionTypes.map((transmissionType) => (
                    <SelectItem key={transmissionType.id} value={transmissionType.id.toString()}>
                      {transmissionType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {loading.transmissionTypes && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          )}

          {/* Fuel Type Selection */}
          {formData.transmissionTypeId && (
            <div className="space-y-2">
              <Label htmlFor="fuelTypeId">Yakıt Tipi *</Label>
              <Select value={formData.fuelTypeId} onValueChange={(value) => handleFieldChange('fuelTypeId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Yakıt tipini seçin" />
                </SelectTrigger>
                <SelectContent>
                  {options.fuelTypes.map((fuelType) => (
                    <SelectItem key={fuelType.id} value={fuelType.id.toString()}>
                      {fuelType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {loading.fuelTypes && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          )}

          {/* Version Selection */}
          {formData.fuelTypeId && (
            <div className="space-y-2">
              <Label htmlFor="versionId">Versiyon *</Label>
              <Select value={formData.versionId} onValueChange={(value) => handleFieldChange('versionId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Versiyon seçin" />
                </SelectTrigger>
                <SelectContent>
                  {options.versions.map((version) => (
                    <SelectItem key={version.id} value={version.id.toString()}>
                      {version.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {loading.versions && <Loader2 className="h-4 w-4 animate-spin" />}
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

          {/* City Code Input */}
          <div className="space-y-2">
            <Label htmlFor="cityCode">Şehir Kodu (Opsiyonel)</Label>
            <Input
              id="cityCode"
              type="number"
              placeholder="1-81 arası şehir kodu"
              value={formData.cityCode}
              onChange={(e) => setFormData(prev => ({ ...prev, cityCode: e.target.value }))}
            />
          </div>

          {/* Additional Damage Cost */}
          <div className="space-y-2">
            <Label htmlFor="additionalDamageCost">Ek Hasar Maliyeti (TL)</Label>
            <Input
              id="additionalDamageCost"
              type="number"
              placeholder="Ek hasar maliyeti"
              value={formData.additionalDamageCost}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalDamageCost: e.target.value }))}
            />
          </div>

          {/* Equipment Selection */}
          {formData.versionId && options.equipments.length > 0 && (
            <div className="space-y-2">
              <Label>Donanımlar (Opsiyonel)</Label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {options.equipments.map((equipment) => (
                  <div key={equipment.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`equipment-${equipment.id}`}
                      checked={formData.equipments.includes(equipment.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ 
                            ...prev, 
                            equipments: [...prev.equipments, equipment.id] 
                          }))
                        } else {
                          setFormData(prev => ({ 
                            ...prev, 
                            equipments: prev.equipments.filter(id => id !== equipment.id) 
                          }))
                        }
                      }}
                      className="rounded"
                    />
                    <Label htmlFor={`equipment-${equipment.id}`} className="text-sm">
                      {equipment.name}
                    </Label>
                  </div>
                ))}
              </div>
              {loading.equipments && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          )}

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
            disabled={loading.pricing || !formData.year || !formData.brandId || !formData.modelId || 
                     !formData.bodyTypeId || !formData.transmissionTypeId || !formData.fuelTypeId || 
                     !formData.versionId || !formData.kilometer}
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
