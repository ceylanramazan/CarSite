'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { contactFormSchema } from '@/lib/validations'
import { submitContactForm } from '@/lib/apiClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail, Clock, Loader2, Send } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function IletisimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitContactForm(data)
      setSubmitStatus({
        type: 'success',
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
      })
      reset()
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adres',
      content: 'Levent Mahallesi, Cömert Sokak No:1',
      subcontent: 'Beşiktaş, İstanbul 34330',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: '+90 555 123 45 67',
      subcontent: 'Hafta içi her gün',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      title: 'E-posta',
      content: 'info@carsite.com',
      subcontent: '7/24 destek',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      content: 'Pazartesi - Cumartesi',
      subcontent: '09:00 - 18:00',
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-5xl font-bold text-white">
              Bizimle İletişime Geçin
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/90">
              Sorularınız, önerileriniz veya görüşleriniz için bize ulaşın.
              Size yardımcı olmaktan mutluluk duyarız.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Info Cards */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-2xl"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 transition-opacity group-hover:opacity-5`} />
              
              {/* Icon */}
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${info.color} shadow-lg transition-transform group-hover:scale-110`}>
                <info.icon className="h-7 w-7 text-white" strokeWidth={2} />
              </div>
              
              {/* Content */}
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500">
                {info.title}
              </h3>
              <p className="mb-1 text-lg font-bold text-secondary">
                {info.content}
              </p>
              <p className="text-sm text-gray-600">
                {info.subcontent}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-2xl border border-gray-100">
              <div className="mb-6">
                <h2 className="mb-2 text-3xl font-bold text-secondary">
                  Mesaj Gönderin
                </h2>
                <p className="text-gray-600">
                  Formu doldurun, en kısa sürede size dönüş yapalım
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Ad Soyad */}
                <div>
                  <Label htmlFor="name" className="mb-2 text-base font-semibold text-gray-700">
                    Ad Soyad *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Örn: Ahmet Yılmaz"
                    className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register('name')}
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
                </div>

                {/* Email & Telefon */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email" className="mb-2 text-base font-semibold text-gray-700">
                      E-posta *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                      className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                      {...register('email')}
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
                  </div>

                  <div>
                    <Label htmlFor="phone" className="mb-2 text-base font-semibold text-gray-700">
                      Telefon *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+90 555 123 45 67"
                      className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                      {...register('phone')}
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
                  </div>
                </div>

                {/* Konu */}
                <div>
                  <Label htmlFor="subject" className="mb-2 text-base font-semibold text-gray-700">
                    Konu *
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Mesajınızın konusu"
                    className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.subject.message}
                    </motion.p>
                  )}
                </div>

                {/* Mesaj */}
                <div>
                  <Label htmlFor="message" className="mb-2 text-base font-semibold text-gray-700">
                    Mesajınız *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    className="text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register('message')}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.message.message}
                    </motion.p>
                  )}
                </div>

                {/* Status Message */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-xl p-4 ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    <p className="font-semibold">
                      {submitStatus.type === 'success' ? '✅' : '❌'}{' '}
                      {submitStatus.message}
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 w-full text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Mesaj Gönder
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="relative h-full min-h-[600px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.3747659754846!2d29.008285315414745!3d41.077802579297266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sLevent%2C%20Be%C5%9Fikta%C5%9F%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1647890123456!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
              
              {/* Map Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 backdrop-blur-md p-6 shadow-xl border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-secondary">
                      CarSite Merkez Ofis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Levent Mahallesi, Cömert Sokak No:1
                    </p>
                    <p className="text-sm text-gray-600">
                      Beşiktaş, İstanbul 34330
                    </p>
                    <a
                      href="https://goo.gl/maps/xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                    >
                      Yol Tarifi Al →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center"
        >
          <h3 className="mb-4 text-2xl font-bold text-secondary">
            Başka Sorularınız mı Var?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-600">
            Sıkça sorulan sorular sayfamızı ziyaret edebilir veya doğrudan bizi
            arayabilirsiniz. Ekibimiz size yardımcı olmak için hazır!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" className="font-semibold">
              <Phone className="mr-2 h-5 w-5" />
              Bizi Arayın
            </Button>
            <Button size="lg" className="font-semibold shadow-lg">
              <Mail className="mr-2 h-5 w-5" />
              E-posta Gönderin
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
