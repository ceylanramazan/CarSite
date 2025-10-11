'use client'

import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { expertiseSchema } from '@/lib/validations'
import { useOfferForm } from '@/contexts/OfferFormContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import ProgressStepper from '@/components/stepper/ProgressStepper'
import { motion } from 'framer-motion'
import { FileCheck, Calendar, Shield, Wrench } from 'lucide-react'
import type { ExpertiseDTO } from '@/types'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'Ekspertiz Bilgileri', href: '/teklif-al/ekspertiz-bilgileri' },
  { id: 4, name: 'İletişim', href: '/teklif-al/iletisim' },
  { id: 5, name: 'Özet', href: '/teklif-al/ozet' },
]

export default function EkspertizBilgileriPage() {
  const router = useRouter()
  const { formData, updateFormData } = useOfferForm()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ExpertiseDTO>({
    resolver: zodResolver(expertiseSchema),
    defaultValues: formData.expertise || {
      has_expertise: false,
      tramer_check: false,
      maintenance_records: false,
    },
  })

  const hasExpertise = watch('has_expertise')

  const onSubmit = (data: ExpertiseDTO) => {
    updateFormData({ expertise: data })
    router.push('/teklif-al/iletisim')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary/5 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <ProgressStepper steps={steps} currentStep={3} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-2xl border border-gray-100"
        >
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-secondary">
              Ekspertiz Bilgileri
            </h1>
            <p className="text-lg text-gray-600">
              Aracınızın ekspertiz raporu ve bakım kayıtları
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Ekspertiz Durumu */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg bg-gradient-to-r from-green-50 to-primary/10 p-6 border-2 border-green-200"
            >
              <div className="flex items-start space-x-3">
                <Controller
                  name="has_expertise"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="has_expertise"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="mt-1"
                    />
                  )}
                />
                <div className="flex-1">
                  <Label htmlFor="has_expertise" className="cursor-pointer flex items-center text-base font-semibold text-gray-700">
                    <FileCheck className="mr-2 h-5 w-5 text-green-600" />
                    Aracımın ekspertiz raporu var
                  </Label>
                  <p className="mt-1 text-sm text-gray-500">
                    Ekspertiz raporu aracınızın değerini artırır
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Ekspertiz Detayları */}
            {hasExpertise && (
              <>
                {/* Ekspertiz Şirketi & Tarih */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="expertise_company" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                      <Shield className="mr-2 h-5 w-5 text-primary" />
                      Ekspertiz Şirketi
                    </Label>
                    <Input
                      id="expertise_company"
                      placeholder="Örn: CarSite Ekspertiz"
                      {...register('expertise_company')}
                      className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Label htmlFor="expertise_date" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Ekspertiz Tarihi
                    </Label>
                    <Input
                      id="expertise_date"
                      type="date"
                      {...register('expertise_date')}
                      className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                </div>

                {/* Ekspertiz Puanı */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="expertise_score" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <FileCheck className="mr-2 h-5 w-5 text-primary" />
                    Ekspertiz Puanı (0-100)
                  </Label>
                  <Input
                    id="expertise_score"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Örn: 85"
                    {...register('expertise_score', { valueAsNumber: true })}
                    className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {errors.expertise_score && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.expertise_score.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Ekspertiz Rapor Notu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Label htmlFor="expertise_report" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    Rapor Notu (Opsiyonel)
                  </Label>
                  <Textarea
                    id="expertise_report"
                    placeholder="Ekspertiz raporundaki önemli notlar..."
                    rows={4}
                    {...register('expertise_report')}
                    className="text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </motion.div>
              </>
            )}

            {/* Tramer & Bakım Kayıtları */}
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: hasExpertise ? 0.4 : 0.2 }}
                className="rounded-lg bg-blue-50 p-5 border-2 border-blue-200"
              >
                <div className="flex items-start space-x-3">
                  <Controller
                    name="tramer_check"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="tramer_check"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mt-1"
                      />
                    )}
                  />
                  <div className="flex-1">
                    <Label htmlFor="tramer_check" className="cursor-pointer flex items-center text-base font-semibold text-gray-700">
                      <Shield className="mr-2 h-5 w-5 text-blue-600" />
                      Tramer Sorgusu Yapıldı
                    </Label>
                    <p className="mt-1 text-xs text-gray-500">
                      Araç geçmişi kontrol edildi
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: hasExpertise ? 0.45 : 0.25 }}
                className="rounded-lg bg-purple-50 p-5 border-2 border-purple-200"
              >
                <div className="flex items-start space-x-3">
                  <Controller
                    name="maintenance_records"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="maintenance_records"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mt-1"
                      />
                    )}
                  />
                  <div className="flex-1">
                    <Label htmlFor="maintenance_records" className="cursor-pointer flex items-center text-base font-semibold text-gray-700">
                      <Wrench className="mr-2 h-5 w-5 text-purple-600" />
                      Bakım Kayıtları Mevcut
                    </Label>
                    <p className="mt-1 text-xs text-gray-500">
                      Düzenli bakım yapıldı
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasExpertise ? 0.5 : 0.3 }}
              className="flex justify-between pt-6"
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push('/teklif-al/hasar-bilgileri')}
                className="h-12 px-8 text-base font-semibold"
              >
                ← Geri
              </Button>
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

