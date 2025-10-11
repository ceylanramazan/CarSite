'use client'

import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { damageSchema } from '@/lib/validations'
import { useOfferForm } from '@/contexts/OfferFormContext'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import ProgressStepper from '@/components/stepper/ProgressStepper'
import CarDamageSchema from '@/components/damage/CarDamageSchema'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import type { DamageDTO } from '@/types'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'Ekspertiz Bilgileri', href: '/teklif-al/ekspertiz-bilgileri' },
  { id: 4, name: 'İletişim', href: '/teklif-al/iletisim' },
  { id: 5, name: 'Özet', href: '/teklif-al/ozet' },
]

export default function HasarBilgileriPage() {
  const router = useRouter()
  const { formData, updateFormData } = useOfferForm()
  const [selectedParts, setSelectedParts] = useState<string[]>(
    formData.damage?.changed_parts || []
  )

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<DamageDTO>({
    resolver: zodResolver(damageSchema),
    defaultValues: formData.damage || { has_damage: false },
  })

  const hasDamage = watch('has_damage')

  const onSubmit = (data: DamageDTO) => {
    updateFormData({
      damage: { ...data, changed_parts: hasDamage ? selectedParts : [] },
    })
    router.push('/teklif-al/ekspertiz-bilgileri')
  }

  const handlePartToggle = (partId: string) => {
    setSelectedParts((prev) =>
      prev.includes(partId) ? prev.filter((p) => p !== partId) : [...prev, partId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary/5 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <ProgressStepper steps={steps} currentStep={2} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-2xl border border-gray-100"
        >
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-secondary">
              Hasar Bilgileri
            </h1>
            <p className="text-lg text-gray-600">
              Aracınızın hasar durumu ve değişen parçalar
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Hasar Durumu */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 p-6 border-2 border-primary/20"
            >
              <div className="flex items-start space-x-3">
                <Controller
                  name="has_damage"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="has_damage"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="mt-1"
                    />
                  )}
                />
                <div className="flex-1">
                  <Label htmlFor="has_damage" className="cursor-pointer flex items-center text-base font-semibold text-gray-700">
                    <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                    Aracımda hasar/değişen parça var
                  </Label>
                  <p className="mt-1 text-sm text-gray-500">
                    Hasarlı veya değişmiş parçalar aracın değerini etkileyebilir
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Görsel Hasar Şeması */}
            {hasDamage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CarDamageSchema
                  selectedParts={selectedParts}
                  onPartToggle={handlePartToggle}
                />
              </motion.div>
            )}

            {/* Açıklama */}
            {hasDamage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="description" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                  Hasar Detayları (Opsiyonel)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Hasarlar hakkında detaylı bilgi verebilirsiniz..."
                  rows={4}
                  {...register('description')}
                  className="text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-between pt-6"
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push('/teklif-al/arac-bilgileri')}
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

