'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useOfferForm } from '@/contexts/OfferFormContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProgressStepper from '@/components/stepper/ProgressStepper'
import { submitOffer } from '@/lib/apiClient'
import { Loader2 } from 'lucide-react'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'İletişim', href: '/teklif-al/iletisim' },
  { id: 4, name: 'Özet', href: '/teklif-al/ozet' },
]

export default function OzetPage() {
  const router = useRouter()
  const { formData } = useOfferForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!formData.vehicle || !formData.damage || !formData.contact) {
      setError('Lütfen tüm adımları tamamlayın')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const payload = {
        vehicle: formData.vehicle,
        damage: formData.damage,
        contact: formData.contact,
      }

      await submitOffer(payload)
      router.push('/teklif-al/basarili')
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Bir hata oluştu. Lütfen tekrar deneyin.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!formData.vehicle || !formData.contact) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-gray-600">
              Lütfen önce form adımlarını tamamlayın.
            </p>
            <Button
              className="mt-4"
              onClick={() =>
                router.push('/teklif-al/arac-bilgileri')
              }
            >
              Başa Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <ProgressStepper steps={steps} currentStep={4} />

      <div className="space-y-6">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-3xl font-bold text-secondary">
            Bilgilerinizi Kontrol Edin
          </h1>
          <p className="mb-8 text-gray-600">
            Göndermeden önce bilgilerinizi gözden geçirin
          </p>

          {/* Araç Bilgileri */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Araç Bilgileri
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push('/teklif-al/arac-bilgileri')
                  }
                >
                  Düzenle
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Marka</dt>
                  <dd className="mt-1 text-base">{formData.vehicle.brand}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Model</dt>
                  <dd className="mt-1 text-base">{formData.vehicle.model}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Yıl</dt>
                  <dd className="mt-1 text-base">{formData.vehicle.year}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Kilometre
                  </dt>
                  <dd className="mt-1 text-base">
                    {formData.vehicle.km.toLocaleString()} km
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Yakıt</dt>
                  <dd className="mt-1 text-base">
                    {formData.vehicle.fuel_type}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Vites</dt>
                  <dd className="mt-1 text-base">
                    {formData.vehicle.gearbox}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Şehir</dt>
                  <dd className="mt-1 text-base">{formData.vehicle.city}</dd>
                </div>
                {formData.vehicle.plate && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Plaka
                    </dt>
                    <dd className="mt-1 text-base">{formData.vehicle.plate}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Hasar Bilgileri */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Hasar Bilgileri
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push('/teklif-al/hasar-bilgileri')
                  }
                >
                  Düzenle
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formData.damage?.has_damage ? (
                <>
                  {formData.damage.changed_parts &&
                    formData.damage.changed_parts.length > 0 && (
                      <div className="mb-3">
                        <dt className="text-sm font-medium text-gray-500">
                          Değişen Parçalar
                        </dt>
                        <dd className="mt-1">
                          {formData.damage.changed_parts.join(', ')}
                        </dd>
                      </div>
                    )}
                  {formData.damage.description && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Açıklama
                      </dt>
                      <dd className="mt-1">{formData.damage.description}</dd>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-600">Hasar kaydı bulunmamaktadır.</p>
              )}
            </CardContent>
          </Card>

          {/* İletişim Bilgileri */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                İletişim Bilgileri
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/teklif-al/iletisim')}
                >
                  Düzenle
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Ad Soyad
                  </dt>
                  <dd className="mt-1 text-base">{formData.contact.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Telefon</dt>
                  <dd className="mt-1 text-base">{formData.contact.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    E-posta
                  </dt>
                  <dd className="mt-1 text-base">{formData.contact.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Şehir</dt>
                  <dd className="mt-1 text-base">{formData.contact.city}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/teklif-al/iletisim')}
              disabled={isSubmitting}
            >
              Geri
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                'Teklifi Gönder'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

