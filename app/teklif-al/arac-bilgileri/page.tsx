'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { vehicleSchema } from '@/lib/validations'
import { useOfferForm } from '@/contexts/OfferFormContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import ProgressStepper from '@/components/stepper/ProgressStepper'
import { FUEL_TYPES, GEARBOX_TYPES, CITIES } from '@/lib/constants'
import { motion } from 'framer-motion'
import { Car, Calendar, Gauge, Fuel, Settings, MapPin, Hash, Loader2, CheckCircle, ArrowRight } from 'lucide-react'
import type { VehicleDTO } from '@/types'
import { useState, useEffect } from 'react'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'Ekspertiz Bilgileri', href: '/teklif-al/ekspertiz-bilgileri' },
  { id: 4, name: 'İletişim', href: '/teklif-al/iletisim' },
  { id: 5, name: 'Özet', href: '/teklif-al/ozet' },
]

export default function AracBilgileriPage() {
  const router = useRouter()
  const { formData, updateFormData } = useOfferForm()
  
  // SmartIQ API state
  const [smartIQData, setSmartIQData] = useState({
    years: [] as number[],
    brands: [] as { id: number; name: string }[],
    models: [] as { id: number; name: string }[],
    bodyTypes: [] as { id: number; name: string }[],
    transmissionTypes: [] as { id: number; name: string }[],
    fuelTypes: [] as { id: number; name: string }[],
    versions: [] as { id: number; name: string }[],
    equipments: [] as { id: number; name: string; type: string; isOptional: boolean }[],
  })
  
  const [loading, setLoading] = useState({
    years: false,
    brands: false,
    models: false,
    bodyTypes: false,
    transmissionTypes: false,
    fuelTypes: false,
    versions: false,
    equipments: false,
  })
  
  const [error, setError] = useState<string | null>(null)
  const [isFromHomepage, setIsFromHomepage] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VehicleDTO>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: formData.vehicle || {},
  })

  const watchedYear = watch('year')
  const watchedBrand = watch('brand')
  const watchedModel = watch('model')
  const watchedBodyType = watch('bodyType')
  const watchedTransmissionType = watch('transmissionType')
  const watchedFuelType = watch('fuelType')
  const watchedVersion = watch('version')

  // Check if user came from homepage with pre-filled data
  useEffect(() => {
    console.log('Form data from context:', formData.vehicle)
    
    // localStorage'dan verileri oku
    const savedData = localStorage.getItem('vehicleFormData')
    if (savedData) {
      try {
        const vehicleData = JSON.parse(savedData)
        console.log('Data from localStorage:', vehicleData)
        
        if (vehicleData.year || vehicleData.brand || vehicleData.model) {
          setIsFromHomepage(true)
          
          // Set form values if they exist
          if (vehicleData.year) {
            setValue('year', vehicleData.year)
          }
          if (vehicleData.brand) {
            setValue('brand', vehicleData.brand.toString())
          }
          if (vehicleData.model) {
            setValue('model', vehicleData.model.toString())
          }
          
          // Context'e de kaydet
          updateFormData({
            vehicle: vehicleData as any
          })
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
      }
    }
    
    // Context'ten de kontrol et
    if (formData.vehicle && (formData.vehicle.year || formData.vehicle.brand || formData.vehicle.model)) {
      setIsFromHomepage(true)
      console.log('Pre-filled data from context:', formData.vehicle)
      
      // Set form values if they exist
      if (formData.vehicle.year) {
        setValue('year', formData.vehicle.year)
      }
      if (formData.vehicle.brand) {
        setValue('brand', formData.vehicle.brand.toString())
      }
      if (formData.vehicle.model) {
        setValue('model', formData.vehicle.model.toString())
      }
    }
  }, [formData.vehicle, setValue, updateFormData])

  // Load years on mount
  useEffect(() => {
    loadYears()
  }, [])

  // Load brands when year changes
  useEffect(() => {
    if (watchedYear) {
      loadBrands(watchedYear.toString())
    }
  }, [watchedYear])

  // Load models when brand changes
  useEffect(() => {
    if (watchedYear && watchedBrand) {
      loadModels(watchedYear.toString(), watchedBrand)
    }
  }, [watchedYear, watchedBrand])

  // Load body types when model changes
  useEffect(() => {
    if (watchedYear && watchedBrand && watchedModel) {
      loadBodyTypes(watchedYear.toString(), watchedBrand, watchedModel)
    }
  }, [watchedYear, watchedBrand, watchedModel])

  // Load transmission types when body type changes
  useEffect(() => {
    if (watchedYear && watchedBrand && watchedModel && watchedBodyType) {
      loadTransmissionTypes(watchedYear.toString(), watchedBrand, watchedModel, watchedBodyType)
    }
  }, [watchedYear, watchedBrand, watchedModel, watchedBodyType])

  // Load fuel types when transmission type changes
  useEffect(() => {
    if (watchedYear && watchedBrand && watchedModel && watchedBodyType && watchedTransmissionType) {
      loadFuelTypes(watchedYear.toString(), watchedBrand, watchedModel, watchedBodyType, watchedTransmissionType)
    }
  }, [watchedYear, watchedBrand, watchedModel, watchedBodyType, watchedTransmissionType])

  // Load versions when fuel type changes
  useEffect(() => {
    if (watchedYear && watchedBrand && watchedModel && watchedBodyType && watchedTransmissionType && watchedFuelType) {
      loadVersions(watchedYear.toString(), watchedBrand, watchedModel, watchedBodyType, watchedTransmissionType, watchedFuelType)
    }
  }, [watchedYear, watchedBrand, watchedModel, watchedBodyType, watchedTransmissionType, watchedFuelType])

  // Load equipments when version changes
  useEffect(() => {
    if (watchedYear && watchedBrand && watchedModel && watchedBodyType && watchedTransmissionType && watchedFuelType && watchedVersion) {
      loadEquipments(watchedYear.toString(), watchedBrand, watchedModel, watchedBodyType, watchedTransmissionType, watchedFuelType, watchedVersion)
    }
  }, [watchedYear, watchedBrand, watchedModel, watchedBodyType, watchedTransmissionType, watchedFuelType, watchedVersion])

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

  const loadBodyTypes = async (year: string, brandId: string, modelId: string) => {
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
        setSmartIQData(prev => ({ ...prev, bodyTypes: data.data }))
      } else {
        setError('Kasa tipleri yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setError('Kasa tipleri yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(prev => ({ ...prev, bodyTypes: false }))
    }
  }

  const loadTransmissionTypes = async (year: string, brandId: string, modelId: string, bodyTypeId: string) => {
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
        setSmartIQData(prev => ({ ...prev, transmissionTypes: data.data }))
      } else {
        setError('Vites tipleri yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setError('Vites tipleri yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(prev => ({ ...prev, transmissionTypes: false }))
    }
  }

  const loadFuelTypes = async (year: string, brandId: string, modelId: string, bodyTypeId: string, transmissionTypeId: string) => {
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
        setSmartIQData(prev => ({ ...prev, fuelTypes: data.data }))
      } else {
        setError('Yakıt tipleri yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setError('Yakıt tipleri yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(prev => ({ ...prev, fuelTypes: false }))
    }
  }

  const loadVersions = async (year: string, brandId: string, modelId: string, bodyTypeId: string, transmissionTypeId: string, fuelTypeId: string) => {
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
        setSmartIQData(prev => ({ ...prev, versions: data.data }))
      } else {
        setError('Versiyonlar yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setError('Versiyonlar yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(prev => ({ ...prev, versions: false }))
    }
  }

  const loadEquipments = async (year: string, brandId: string, modelId: string, bodyTypeId: string, transmissionTypeId: string, fuelTypeId: string, versionId: string) => {
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
        setSmartIQData(prev => ({ ...prev, equipments: data.data }))
      } else {
        setError('Ekipmanlar yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setError('Ekipmanlar yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(prev => ({ ...prev, equipments: false }))
    }
  }

  const onSubmit = (data: VehicleDTO) => {
    // Form validation kontrolü
    if (!data.year || !data.brand || !data.model || !data.bodyType || !data.transmissionType || !data.fuelType || !data.version) {
      setError('Lütfen tüm zorunlu alanları doldurun')
      return
    }
    
    // Add display names to the data
    const dataWithNames = {
      ...data,
      brandName: smartIQData.brands.find(b => b.id.toString() === data.brand)?.name || data.brand,
      modelName: smartIQData.models.find(m => m.id.toString() === data.model)?.name || data.model,
      bodyTypeName: smartIQData.bodyTypes.find(bt => bt.id.toString() === data.bodyType)?.name || data.bodyType,
      transmissionTypeName: smartIQData.transmissionTypes.find(tt => tt.id.toString() === data.transmissionType)?.name || data.transmissionType,
      fuelTypeName: smartIQData.fuelTypes.find(ft => ft.id.toString() === data.fuelType)?.name || data.fuelType,
      versionName: smartIQData.versions.find(v => v.id.toString() === data.version)?.name || data.version,
    }
    
    updateFormData({ vehicle: dataWithNames })
    router.push('/teklif-al/hasar-bilgileri')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary/5 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <ProgressStepper steps={steps} currentStep={1} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm p-8 shadow-2xl border border-gray-100"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-gray-800">
              Araç Bilgileri
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Aracınızın temel bilgilerini giriniz
            </p>
            

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4"
              >
                <p className="text-red-600 flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {error}
                </p>
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Year, Brand, Model */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                Araç Seçimi
              </h3>
              
              <div className="grid gap-6 md:grid-cols-3">
                {/* Yıl */}
                <div>
                  <Label htmlFor="year" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Yıl *
                  </Label>
                  <Select
                    id="year"
                    {...register('year', { valueAsNumber: true })}
                    className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    disabled={loading.years}
                  >
                    <option value="">{loading.years ? 'Yıllar yükleniyor...' : 'Yıl Seçiniz'}</option>
                    {smartIQData.years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Select>
                  {errors.year && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.year.message}
                    </motion.p>
                  )}
                </div>

                {/* Marka */}
                <div>
                  <Label htmlFor="brand" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Car className="mr-2 h-5 w-5 text-primary" />
                    Marka *
                  </Label>
                  <Select 
                    id="brand" 
                    {...register('brand')} 
                    className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    disabled={loading.brands || !watchedYear}
                  >
                    <option value="">{loading.brands ? 'Markalar yükleniyor...' : !watchedYear ? 'Önce yıl seçiniz' : 'Marka Seçiniz'}</option>
                    {smartIQData.brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </Select>
                  {errors.brand && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.brand.message}
                    </motion.p>
                  )}
                </div>

                {/* Model */}
                <div>
                  <Label htmlFor="model" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Car className="mr-2 h-5 w-5 text-primary" />
                    Model *
                  </Label>
                  <Select 
                    id="model" 
                    {...register('model')} 
                    className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    disabled={loading.models || !watchedBrand}
                  >
                    <option value="">{loading.models ? 'Modeller yükleniyor...' : !watchedBrand ? 'Önce marka seçiniz' : 'Model Seçiniz'}</option>
                    {smartIQData.models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </Select>
                  {errors.model && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.model.message}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Step 2: Technical Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                Teknik Özellikler
              </h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Kasa Tipi */}
                <div>
                  <Label htmlFor="bodyType" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Car className="mr-2 h-5 w-5 text-green-500" />
                    Kasa Tipi *
                  </Label>
                  <Select 
                    id="bodyType" 
                    {...register('bodyType')} 
                    className="h-12 text-base transition-all hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    disabled={loading.bodyTypes || !watchedModel}
                  >
                    <option value="">{loading.bodyTypes ? 'Kasa tipleri yükleniyor...' : !watchedModel ? 'Önce model seçiniz' : 'Kasa Tipi Seçiniz'}</option>
                    {smartIQData.bodyTypes.map((bodyType) => (
                      <option key={bodyType.id} value={bodyType.id}>
                        {bodyType.name}
                      </option>
                    ))}
                  </Select>
                  {errors.bodyType && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.bodyType.message}
                    </motion.p>
                  )}
                </div>

                {/* Vites Tipi */}
                <div>
                  <Label htmlFor="transmissionType" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Settings className="mr-2 h-5 w-5 text-green-500" />
                    Vites Tipi *
                  </Label>
                  <Select 
                    id="transmissionType" 
                    {...register('transmissionType')} 
                    className="h-12 text-base transition-all hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    disabled={loading.transmissionTypes || !watchedBodyType}
                  >
                    <option value="">{loading.transmissionTypes ? 'Vites tipleri yükleniyor...' : !watchedBodyType ? 'Önce kasa tipi seçiniz' : 'Vites Tipi Seçiniz'}</option>
                    {smartIQData.transmissionTypes.map((transmissionType) => (
                      <option key={transmissionType.id} value={transmissionType.id}>
                        {transmissionType.name}
                      </option>
                    ))}
                  </Select>
                  {errors.transmissionType && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.transmissionType.message}
                    </motion.p>
                  )}
                </div>

                {/* Yakıt Tipi */}
                <div>
                  <Label htmlFor="fuelType" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Fuel className="mr-2 h-5 w-5 text-green-500" />
                    Yakıt Tipi *
                  </Label>
                  <Select 
                    id="fuelType" 
                    {...register('fuelType')} 
                    className="h-12 text-base transition-all hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    disabled={loading.fuelTypes || !watchedTransmissionType}
                  >
                    <option value="">{loading.fuelTypes ? 'Yakıt tipleri yükleniyor...' : !watchedTransmissionType ? 'Önce vites tipi seçiniz' : 'Yakıt Tipi Seçiniz'}</option>
                    {smartIQData.fuelTypes.map((fuelType) => (
                      <option key={fuelType.id} value={fuelType.id}>
                        {fuelType.name}
                      </option>
                    ))}
                  </Select>
                  {errors.fuelType && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.fuelType.message}
                    </motion.p>
                  )}
                </div>

                {/* Versiyon */}
                <div>
                  <Label htmlFor="version" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Car className="mr-2 h-5 w-5 text-green-500" />
                    Versiyon *
                  </Label>
                  <Select 
                    id="version" 
                    {...register('version')} 
                    className="h-12 text-base transition-all hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    disabled={loading.versions || !watchedFuelType}
                  >
                    <option value="">{loading.versions ? 'Versiyonlar yükleniyor...' : !watchedFuelType ? 'Önce yakıt tipi seçiniz' : 'Versiyon Seçiniz'}</option>
                    {smartIQData.versions.map((version) => (
                      <option key={version.id} value={version.id}>
                        {version.name}
                      </option>
                    ))}
                  </Select>
                  {errors.version && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.version.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Ekipmanlar Bölümü */}
              {smartIQData.equipments.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-green-500" />
                    Araç Ekipmanları
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {smartIQData.equipments.map((equipment) => (
                      <div key={equipment.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                        <input
                          type="checkbox"
                          id={`equipment-${equipment.id}`}
                          value={equipment.id}
                          {...register('equipments')}
                          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor={`equipment-${equipment.id}`} className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-800">{equipment.name}</div>
                          <div className="text-sm text-gray-500">{equipment.type}</div>
                        </label>
                        {equipment.isOptional && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Opsiyonel
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Step 3: Additional Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                Ek Bilgiler
              </h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Kilometre */}
                <div>
                  <Label htmlFor="km" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Gauge className="mr-2 h-5 w-5 text-blue-500" />
                    Kilometre *
                  </Label>
                  <Input
                    id="km"
                    type="number"
                    placeholder="Örn: 42000"
                    {...register('km', { valueAsNumber: true })}
                    className="h-12 text-base transition-all hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  {errors.km && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.km.message}
                    </motion.p>
                  )}
                </div>

                {/* Şehir */}
                <div>
                  <Label htmlFor="city" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                    Şehir *
                  </Label>
                  <Select id="city" {...register('city')} className="h-12 text-base transition-all hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                    <option value="">Şehir Seçiniz</option>
                    {CITIES.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </Select>
                  {errors.city && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.city.message}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>


            {/* Submit Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center pt-6"
            >
              <Button 
                type="submit" 
                size="lg" 
                className="h-14 px-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>Devam Et</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}