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
import { COMMON_PARTS } from '@/lib/constants'
import type { DamageDTO } from '@/types'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'İletişim', href: '/teklif-al/iletisim' },
  { id: 4, name: 'Özet', href: '/teklif-al/ozet' },
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
    router.push('/teklif-al/iletisim')
  }

  const handlePartToggle = (part: string) => {
    setSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    )
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <ProgressStepper steps={steps} currentStep={2} />

      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-secondary">
          Hasar Bilgileri
        </h1>
        <p className="mb-8 text-gray-600">
          Aracınızın hasar durumu ve değişen parçalar
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hasar Durumu */}
          <div className="flex items-center space-x-3">
            <Controller
              name="has_damage"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="has_damage"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Label htmlFor="has_damage" className="cursor-pointer">
              Aracımda hasar/değişen parça var
            </Label>
          </div>

          {/* Değişen Parçalar */}
          {hasDamage && (
            <>
              <div>
                <Label className="mb-3 block">
                  Değişen veya Hasarlı Parçalar
                </Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {COMMON_PARTS.map((part) => (
                    <div key={part} className="flex items-center space-x-2">
                      <Checkbox
                        id={part}
                        checked={selectedParts.includes(part)}
                        onChange={() => handlePartToggle(part)}
                      />
                      <Label htmlFor={part} className="cursor-pointer">
                        {part}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Açıklama */}
              <div>
                <Label htmlFor="description">
                  Hasar Detayları (Opsiyonel)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Hasarlar hakkında detaylı bilgi verebilirsiniz..."
                  rows={4}
                  {...register('description')}
                />
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/teklif-al/arac-bilgileri')}
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

