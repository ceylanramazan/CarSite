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
import { BRANDS, FUEL_TYPES, GEARBOX_TYPES, CITIES } from '@/lib/constants'
import type { VehicleDTO } from '@/types'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/CarSite/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/CarSite/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'İletişim', href: '/CarSite/teklif-al/iletisim' },
  { id: 4, name: 'Özet', href: '/CarSite/teklif-al/ozet' },
]

export default function AracBilgileriPage() {
  const router = useRouter()
  const { formData, updateFormData } = useOfferForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleDTO>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: formData.vehicle || {},
  })

  const onSubmit = (data: VehicleDTO) => {
    updateFormData({ vehicle: data })
    router.push('/CarSite/teklif-al/hasar-bilgileri')
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 35 }, (_, i) => currentYear - i)

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <ProgressStepper steps={steps} currentStep={1} />

      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-secondary">
          Araç Bilgileri
        </h1>
        <p className="mb-8 text-gray-600">
          Aracınızın temel bilgilerini giriniz
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Marka */}
          <div>
            <Label htmlFor="brand">Marka *</Label>
            <Select id="brand" {...register('brand')}>
              <option value="">Marka Seçiniz</option>
              {BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Select>
            {errors.brand && (
              <p className="mt-1 text-sm text-red-500">{errors.brand.message}</p>
            )}
          </div>

          {/* Model */}
          <div>
            <Label htmlFor="model">Model *</Label>
            <Input
              id="model"
              placeholder="Örn: Astra"
              {...register('model')}
            />
            {errors.model && (
              <p className="mt-1 text-sm text-red-500">{errors.model.message}</p>
            )}
          </div>

          {/* Yıl & Kilometre */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="year">Yıl *</Label>
              <Select
                id="year"
                {...register('year', { valueAsNumber: true })}
              >
                <option value="">Yıl Seçiniz</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              {errors.year && (
                <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="km">Kilometre *</Label>
              <Input
                id="km"
                type="number"
                placeholder="Örn: 42000"
                {...register('km', { valueAsNumber: true })}
              />
              {errors.km && (
                <p className="mt-1 text-sm text-red-500">{errors.km.message}</p>
              )}
            </div>
          </div>

          {/* Yakıt & Vites */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="fuel_type">Yakıt Tipi *</Label>
              <Select id="fuel_type" {...register('fuel_type')}>
                <option value="">Yakıt Tipi Seçiniz</option>
                {FUEL_TYPES.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </Select>
              {errors.fuel_type && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fuel_type.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="gearbox">Vites *</Label>
              <Select id="gearbox" {...register('gearbox')}>
                <option value="">Vites Tipi Seçiniz</option>
                {GEARBOX_TYPES.map((gearbox) => (
                  <option key={gearbox} value={gearbox}>
                    {gearbox}
                  </option>
                ))}
              </Select>
              {errors.gearbox && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.gearbox.message}
                </p>
              )}
            </div>
          </div>

          {/* Şehir */}
          <div>
            <Label htmlFor="city">Şehir *</Label>
            <Select id="city" {...register('city')}>
              <option value="">Şehir Seçiniz</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* Plaka (Opsiyonel) */}
          <div>
            <Label htmlFor="plate">Plaka (Opsiyonel)</Label>
            <Input
              id="plate"
              placeholder="Örn: 34ABC123"
              {...register('plate')}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg">
              Devam Et
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

