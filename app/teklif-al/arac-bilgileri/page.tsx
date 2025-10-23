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
  })
  
  const [loading, setLoading] = useState({
    years: false,
    brands: false,
    models: false,
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

  // Check if user came from homepage with pre-filled data
  useEffect(() => {
    if (formData.vehicle && (formData.vehicle.year || formData.vehicle.brand || formData.vehicle.model)) {
      setIsFromHomepage(true)
      console.log('Pre-filled data from homepage:', formData.vehicle)
    }
  }, [formData.vehicle])

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

  const onSubmit = (data: VehicleDTO) => {
    updateFormData({ vehicle: data })
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4"
            >
              <Car className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="mb-3 text-4xl font-bold text-gray-800">
              Araç Bilgileri
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Aracınızın temel bilgilerini giriniz
            </p>
            
            {/* Pre-filled data indicator */}
            {isFromHomepage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Ana sayfadan gelen bilgiler otomatik dolduruldu
              </motion.div>
            )}

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

            {/* Step 2: Additional Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
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
                      <option key={city} value={city}>
                        {city}
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

            {/* Step 3: Technical Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                Teknik Özellikler
              </h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Yakıt Tipi */}
                <div>
                  <Label htmlFor="fuel_type" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Fuel className="mr-2 h-5 w-5 text-green-500" />
                    Yakıt Tipi *
                  </Label>
                  <Select id="fuel_type" {...register('fuel_type')} className="h-12 text-base transition-all hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20">
                    <option value="">Yakıt Tipi Seçiniz</option>
                    {FUEL_TYPES.map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </Select>
                  {errors.fuel_type && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.fuel_type.message}
                    </motion.p>
                  )}
                </div>

                {/* Vites */}
                <div>
                  <Label htmlFor="gearbox" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Settings className="mr-2 h-5 w-5 text-green-500" />
                    Vites *
                  </Label>
                  <Select id="gearbox" {...register('gearbox')} className="h-12 text-base transition-all hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20">
                    <option value="">Vites Tipi Seçiniz</option>
                    {GEARBOX_TYPES.map((gearbox) => (
                      <option key={gearbox} value={gearbox}>
                        {gearbox}
                      </option>
                    ))}
                  </Select>
                  {errors.gearbox && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.gearbox.message}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Step 4: Optional Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                Ek Bilgiler (Opsiyonel)
              </h3>
              
              <div>
                <Label htmlFor="plate" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                  <Hash className="mr-2 h-5 w-5 text-gray-500" />
                  Plaka
                </Label>
                <Input
                  id="plate"
                  placeholder="Örn: 34ABC123"
                  {...register('plate')}
                  className="h-12 text-base transition-all hover:border-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/20"
                />
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