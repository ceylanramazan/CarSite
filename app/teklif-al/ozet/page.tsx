'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useOfferForm } from '@/contexts/OfferFormContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProgressStepper from '@/components/stepper/ProgressStepper'
import { submitOffer } from '@/lib/apiClient'
import { motion } from 'framer-motion'
import { Loader2, Car, AlertCircle, FileCheck, User, CheckCircle2, Edit2 } from 'lucide-react'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'Ekspertiz Bilgileri', href: '/teklif-al/ekspertiz-bilgileri' },
  { id: 4, name: 'İletişim', href: '/teklif-al/iletisim' },
  { id: 5, name: 'Özet', href: '/teklif-al/ozet' },
]

export default function OzetPage() {
  const router = useRouter()
  const { formData } = useOfferForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!formData.vehicle || !formData.damage || !formData.expertise || !formData.contact) {
      setError('Lütfen tüm adımları tamamlayın')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const payload = {
        vehicle: formData.vehicle,
        damage: formData.damage,
        expertise: formData.expertise,
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary/5 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <Card className="border-2 border-primary/20">
            <CardContent className="py-12 text-center">
              <AlertCircle className="mx-auto h-16 w-16 text-primary mb-4" />
              <p className="text-lg text-gray-600 mb-4">
                Lütfen önce form adımlarını tamamlayın.
              </p>
              <Button
                size="lg"
                onClick={() => router.push('/teklif-al/arac-bilgileri')}
              >
                Başa Dön
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary/5 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <ProgressStepper steps={steps} currentStep={5} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-2xl border border-gray-100">
            <div className="mb-8 text-center">
              <h1 className="mb-3 text-4xl font-bold text-secondary">
                Bilgilerinizi Kontrol Edin
              </h1>
              <p className="text-lg text-gray-600">
                Göndermeden önce bilgilerinizi gözden geçirin
              </p>
            </div>

            {/* Araç Bilgileri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="mb-6 border-2 border-primary/20 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <div className="flex items-center">
                      <Car className="mr-3 h-6 w-6 text-primary" />
                      Araç Bilgileri
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/teklif-al/arac-bilgileri')}
                      className="hover:bg-primary hover:text-white transition-colors"
                    >
                      <Edit2 className="mr-1 h-4 w-4" />
                      Düzenle
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Marka</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.vehicle.brand}</dd>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Model</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.vehicle.model}</dd>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Yıl</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.vehicle.year}</dd>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Kilometre</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">
                        {formData.vehicle.km.toLocaleString()} km
                      </dd>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Yakıt</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.vehicle.fuel_type}</dd>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Vites</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.vehicle.gearbox}</dd>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Şehir</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.vehicle.city}</dd>
                    </div>
                    {formData.vehicle.plate && (
                      <div className="rounded-lg bg-gray-50 p-3">
                        <dt className="text-sm font-medium text-gray-500">Plaka</dt>
                        <dd className="mt-1 text-base font-semibold text-gray-900">{formData.vehicle.plate}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            </motion.div>

            {/* Hasar Bilgileri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="mb-6 border-2 border-orange-200 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <div className="flex items-center">
                      <AlertCircle className="mr-3 h-6 w-6 text-orange-600" />
                      Hasar Bilgileri
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/teklif-al/hasar-bilgileri')}
                      className="hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      <Edit2 className="mr-1 h-4 w-4" />
                      Düzenle
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {formData.damage?.has_damage ? (
                    <>
                      {formData.damage.changed_parts &&
                        formData.damage.changed_parts.length > 0 && (
                          <div className="mb-4 rounded-lg bg-orange-50 p-4">
                            <dt className="text-sm font-medium text-gray-500 mb-2">
                              Değişen Parçalar
                            </dt>
                            <dd className="flex flex-wrap gap-2">
                              {formData.damage.changed_parts.map((part, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
                                >
                                  {part}
                                </span>
                              ))}
                            </dd>
                          </div>
                        )}
                      {formData.damage.description && (
                        <div className="rounded-lg bg-gray-50 p-4">
                          <dt className="text-sm font-medium text-gray-500 mb-1">
                            Açıklama
                          </dt>
                          <dd className="text-base text-gray-900">{formData.damage.description}</dd>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-6 text-gray-600">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                      Hasar kaydı bulunmamaktadır.
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Ekspertiz Bilgileri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="mb-6 border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <div className="flex items-center">
                      <FileCheck className="mr-3 h-6 w-6 text-green-600" />
                      Ekspertiz Bilgileri
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/teklif-al/ekspertiz-bilgileri')}
                      className="hover:bg-green-500 hover:text-white transition-colors"
                    >
                      <Edit2 className="mr-1 h-4 w-4" />
                      Düzenle
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {formData.expertise?.has_expertise ? (
                    <dl className="grid gap-4 sm:grid-cols-2">
                      {formData.expertise.expertise_company && (
                        <div className="rounded-lg bg-green-50 p-3">
                          <dt className="text-sm font-medium text-gray-500">Ekspertiz Şirketi</dt>
                          <dd className="mt-1 text-base font-semibold text-gray-900">
                            {formData.expertise.expertise_company}
                          </dd>
                        </div>
                      )}
                      {formData.expertise.expertise_date && (
                        <div className="rounded-lg bg-green-50 p-3">
                          <dt className="text-sm font-medium text-gray-500">Ekspertiz Tarihi</dt>
                          <dd className="mt-1 text-base font-semibold text-gray-900">
                            {new Date(formData.expertise.expertise_date).toLocaleDateString('tr-TR')}
                          </dd>
                        </div>
                      )}
                      {formData.expertise.expertise_score !== undefined && (
                        <div className="rounded-lg bg-green-50 p-3">
                          <dt className="text-sm font-medium text-gray-500">Ekspertiz Puanı</dt>
                          <dd className="mt-1 text-base font-semibold text-gray-900">
                            {formData.expertise.expertise_score}/100
                          </dd>
                        </div>
                      )}
                      <div className="rounded-lg bg-green-50 p-3">
                        <dt className="text-sm font-medium text-gray-500">Tramer Sorgusu</dt>
                        <dd className="mt-1 text-base font-semibold text-gray-900">
                          {formData.expertise.tramer_check ? '✅ Yapıldı' : '❌ Yapılmadı'}
                        </dd>
                      </div>
                      <div className="rounded-lg bg-green-50 p-3">
                        <dt className="text-sm font-medium text-gray-500">Bakım Kayıtları</dt>
                        <dd className="mt-1 text-base font-semibold text-gray-900">
                          {formData.expertise.maintenance_records ? '✅ Mevcut' : '❌ Mevcut Değil'}
                        </dd>
                      </div>
                      {formData.expertise.expertise_report && (
                        <div className="rounded-lg bg-green-50 p-3 sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500 mb-1">Rapor Notu</dt>
                          <dd className="text-base text-gray-900">{formData.expertise.expertise_report}</dd>
                        </div>
                      )}
                    </dl>
                  ) : (
                    <div className="flex items-center justify-center py-6 text-gray-600">
                      Ekspertiz raporu bulunmamaktadır.
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* İletişim Bilgileri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="mb-6 border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <div className="flex items-center">
                      <User className="mr-3 h-6 w-6 text-blue-600" />
                      İletişim Bilgileri
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/teklif-al/iletisim')}
                      className="hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <Edit2 className="mr-1 h-4 w-4" />
                      Düzenle
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Ad Soyad</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.contact.name}</dd>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Telefon</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.contact.phone}</dd>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">E-posta</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.contact.email}</dd>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-3">
                      <dt className="text-sm font-medium text-gray-500">Şehir</dt>
                      <dd className="mt-1 text-base font-semibold text-gray-900">{formData.contact.city}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 rounded-lg bg-red-50 border-2 border-red-200 p-4 flex items-center"
              >
                <AlertCircle className="mr-3 h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="text-red-700 font-medium">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between pt-6"
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push('/teklif-al/iletisim')}
                disabled={isSubmitting}
                className="h-12 px-8 text-base font-semibold"
              >
                ← Geri
              </Button>
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Teklifi Gönder
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
