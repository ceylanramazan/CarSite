'use client'

import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/lib/validations'
import { useOfferForm } from '@/contexts/OfferFormContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import ProgressStepper from '@/components/stepper/ProgressStepper'
import { CITIES } from '@/lib/constants'
import type { ContactDTO } from '@/types'
import Link from 'next/link'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'İletişim', href: '/teklif-al/iletisim' },
  { id: 4, name: 'Özet', href: '/teklif-al/ozet' },
]

export default function IletisimPage() {
  const router = useRouter()
  const { formData, updateFormData } = useOfferForm()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactDTO>({
    resolver: zodResolver(contactSchema),
    defaultValues: formData.contact || {},
  })

  const onSubmit = (data: ContactDTO) => {
    updateFormData({ contact: data })
    router.push('/teklif-al/ozet')
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <ProgressStepper steps={steps} currentStep={3} />

      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-secondary">
          İletişim Bilgileri
        </h1>
        <p className="mb-8 text-gray-600">
          Sizi nasıl ulaşabileceğimizi söyleyin
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Ad Soyad */}
          <div>
            <Label htmlFor="name">Ad Soyad *</Label>
            <Input
              id="name"
              placeholder="Örn: Ahmet Yılmaz"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Telefon & Email */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+90 555 123 45 67"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">E-posta *</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
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

          {/* KVKK */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-start space-x-3">
              <Controller
                name="kvkk"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="kvkk"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <Label htmlFor="kvkk" className="cursor-pointer text-sm">
                <Link
                  href="/kvkk"
                  className="text-primary underline"
                  target="_blank"
                >
                  KVKK Aydınlatma Metni
                </Link>
                &apos;ni okudum ve kabul ediyorum. *
              </Label>
            </div>
            {errors.kvkk && (
              <p className="mt-2 text-sm text-red-500">{errors.kvkk.message}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                router.push('/teklif-al/hasar-bilgileri')
              }
            >
              Geri
            </Button>
            <Button type="submit" size="lg">
              Devam Et
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

