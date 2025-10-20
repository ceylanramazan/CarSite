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
import { motion } from 'framer-motion'
import { User, Phone, Mail, MapPin, Shield } from 'lucide-react'
import type { ContactDTO } from '@/types'
import Link from 'next/link'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'Ekspertiz Bilgileri', href: '/teklif-al/ekspertiz-bilgileri' },
  { id: 4, name: 'İletişim', href: '/teklif-al/iletisim' },
  { id: 5, name: 'Özet', href: '/teklif-al/ozet' },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary/5 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <ProgressStepper steps={steps} currentStep={4} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-2xl border border-gray-100"
        >
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-secondary">
              İletişim Bilgileri
            </h1>
            <p className="text-lg text-gray-600">
              Sizi nasıl ulaşabileceğimizi söyleyin
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Ad Soyad */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="name" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                <User className="mr-2 h-5 w-5 text-primary" />
                Ad Soyad *
              </Label>
              <Input
                id="name"
                placeholder="Örn: Ahmet Yılmaz"
                {...register('name')}
                className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-500 flex items-center"
                >
                  ⚠️ {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            {/* Telefon & Email */}
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Label htmlFor="phone" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  Telefon *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0544 927 53 28"
                  {...register('phone')}
                  className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 flex items-center"
                  >
                    ⚠️ {errors.phone.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="email" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                  <Mail className="mr-2 h-5 w-5 text-primary" />
                  E-posta *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  {...register('email')}
                  className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 flex items-center"
                  >
                    ⚠️ {errors.email.message}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Şehir */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
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

            {/* KVKK */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 p-6 border-2 border-primary/20"
            >
              <div className="flex items-start space-x-3">
                <Controller
                  name="kvkk"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="kvkk"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="mt-1"
                    />
                  )}
                />
                <div className="flex-1">
                  <Label htmlFor="kvkk" className="cursor-pointer flex items-center text-base font-semibold text-gray-700">
                    <Shield className="mr-2 h-5 w-5 text-primary" />
                    <span>
                      <Link
                        href="/kvkk"
                        className="text-primary underline hover:text-primary/80"
                        target="_blank"
                      >
                        KVKK Aydınlatma Metni
                      </Link>
                      &apos;ni okudum ve kabul ediyorum. *
                    </span>
                  </Label>
                  <p className="mt-1 text-sm text-gray-500">
                    Kişisel verilerinizin korunmasına önem veriyoruz
                  </p>
                </div>
              </div>
              {errors.kvkk && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm text-red-500 flex items-center"
                >
                  ⚠️ {errors.kvkk.message}
                </motion.p>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex justify-between pt-6"
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push('/teklif-al/ekspertiz-bilgileri')}
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

