'use client'

import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { purchaseSchema } from '@/lib/validations'
import { submitPurchase } from '@/lib/apiClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CITIES, DELIVERY_OPTIONS } from '@/lib/constants'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import type { CarBuyDTO } from '@/types'

interface PurchaseFormData {
  buyer_name: string
  buyer_phone: string
  buyer_email: string
  city: string
  delivery_option: 'pickup' | 'delivery'
  kvkk_consent: boolean
}

export function PurchaseFormClient({ car }: { car: CarBuyDTO }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      delivery_option: 'pickup',
    },
  })

  const onSubmit = async (data: PurchaseFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const payload = {
        car_id: car.id,
        ...data,
      }

      await submitPurchase(payload)
      router.push('/arac-al/basarili')
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Bir hata oluştu. Lütfen tekrar deneyin.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">Satın Alma Formu</h1>
        <p className="mt-2 text-gray-600">
          {car.brand} {car.model} için satın alma işlemi
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Bilgilerinizi Girin</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Ad Soyad */}
                <div>
                  <Label htmlFor="buyer_name">Ad Soyad *</Label>
                  <Input
                    id="buyer_name"
                    placeholder="Örn: Ahmet Yılmaz"
                    {...register('buyer_name')}
                  />
                  {errors.buyer_name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.buyer_name.message}
                    </p>
                  )}
                </div>

                {/* Telefon & Email */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="buyer_phone">Telefon *</Label>
                    <Input
                      id="buyer_phone"
                      type="tel"
                      placeholder="0544 927 53 28"
                      {...register('buyer_phone')}
                    />
                    {errors.buyer_phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.buyer_phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="buyer_email">E-posta *</Label>
                    <Input
                      id="buyer_email"
                      type="email"
                      placeholder="ornek@email.com"
                      {...register('buyer_email')}
                    />
                    {errors.buyer_email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.buyer_email.message}
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
                      <option key={city.code} value={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </Select>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Teslimat Tercihi */}
                <div>
                  <Label>Teslimat Tercihi *</Label>
                  <div className="mt-2 space-y-2">
                    {DELIVERY_OPTIONS.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          id={option.value}
                          value={option.value}
                          {...register('delivery_option')}
                          className="h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <Label
                          htmlFor={option.value}
                          className="ml-3 cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.delivery_option && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.delivery_option.message}
                    </p>
                  )}
                </div>

                {/* KVKK */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-start space-x-3">
                    <Controller
                      name="kvkk_consent"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="kvkk_consent"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                    <Label
                      htmlFor="kvkk_consent"
                      className="cursor-pointer text-sm"
                    >
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
                  {errors.kvkk_consent && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.kvkk_consent.message}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 p-4 text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push(`/arac-al/${car.id}`)}
                    disabled={isSubmitting}
                  >
                    İptal
                  </Button>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      'Satın Al'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Özet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.thumbnail}
                  alt={`${car.brand} ${car.model}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                {car.brand} {car.model}
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                {car.year} • {car.km.toLocaleString()} km
              </p>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fiyat</span>
                  <span className="text-2xl font-bold text-primary">
                    ₺{car.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

