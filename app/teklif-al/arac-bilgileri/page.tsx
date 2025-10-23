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
import { Car, Calendar, Gauge, Fuel, Settings, MapPin, Hash, Loader2 } from 'lucide-react'
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

  // Debug: Form data'yı console'a yazdır
  useEffect(() => {
    console.log('Form Data from Context:', formData.vehicle)
  }, [formData.vehicle])

  const watchedYear = watch('year')
  const watchedBrand = watch('brand')

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary/5 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <ProgressStepper steps={steps} currentStep={1} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-2xl border border-gray-100"
        >
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-secondary">
              Araç Bilgileri
            </h1>
            <p className="text-lg text-gray-600">
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
          {/* Marka */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="brand" className="mb-2 flex items-center text-base font-semibold text-gray-700">
              <Car className="mr-2 h-5 w-5 text-primary" />
              Marka *
            </Label>
            <Select 
              id="brand" 
              {...register('brand')} 
              className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
              disabled={loading.brands}
            >
              <option value="">{loading.brands ? 'Markalar yükleniyor...' : 'Marka Seçiniz'}</option>
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
          </motion.div>

          {/* Model */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Label htmlFor="model" className="mb-2 flex items-center text-base font-semibold text-gray-700">
              <Car className="mr-2 h-5 w-5 text-primary" />
              Model *
            </Label>
            <Select 
              id="model" 
              {...register('model')} 
              className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
              disabled={loading.models}
            >
              <option value="">{loading.models ? 'Modeller yükleniyor...' : 'Model Seçiniz'}</option>
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
          </motion.div>

          {/* Yıl & Kilometre */}
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Label htmlFor="km" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                <Gauge className="mr-2 h-5 w-5 text-primary" />
                Kilometre *
              </Label>
              <Input
                id="km"
                type="number"
                placeholder="Örn: 42000"
                {...register('km', { valueAsNumber: true })}
                className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
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
            </motion.div>
          </div>

          {/* Yakıt & Vites */}
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="fuel_type" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                <Fuel className="mr-2 h-5 w-5 text-primary" />
                Yakıt Tipi *
              </Label>
              <Select id="fuel_type" {...register('fuel_type')} className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20">
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Label htmlFor="gearbox" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                <Settings className="mr-2 h-5 w-5 text-primary" />
                Vites *
              </Label>
              <Select id="gearbox" {...register('gearbox')} className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20">
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
            </motion.div>
          </div>

          {/* Şehir */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Label htmlFor="city" className="mb-2 flex items-center text-base font-semibold text-gray-700">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Şehir *
            </Label>
            <Select id="city" {...register('city')} className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20">
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
          </motion.div>

          {/* Plaka (Opsiyonel) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Label htmlFor="plate" className="mb-2 flex items-center text-base font-semibold text-gray-700">
              <Hash className="mr-2 h-5 w-5 text-primary" />
              Plaka (Opsiyonel)
            </Label>
            <Input
              id="plate"
              placeholder="Örn: 34ABC123"
              {...register('plate')}
              className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end pt-6"
          >
            <Button type="submit" size="lg" className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
              Devam Et →
            </Button>
          </motion.div>
        </form>
        </motion.div>
      </div>
    </div>
  )
}

