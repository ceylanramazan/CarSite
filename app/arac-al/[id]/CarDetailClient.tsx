'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import type { CarBuyDTO } from '@/types'

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Ad ve soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string()
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .regex(/^[0-9\s\+\-\(\)]+$/, 'Geçerli bir telefon numarası giriniz'),
  message: z.string().min(10, 'Mesajınız en az 10 karakter olmalıdır'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function CarDetailClient({ car }: { car: CarBuyDTO }) {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const [isRobotChecked, setIsRobotChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const allImages = car.images || [car.thumbnail]

  const onSubmit = async (data: ContactFormData) => {
    if (!isRobotChecked) {
      alert('Lütfen "Ben robot değilim" kutucuğunu işaretleyin')
      return
    }

    setIsSubmitting(true)

    try {
      // Mail gönderme API'si (mock)
      const emailData = {
        to: 'developer.ramazanceylan@gmail.com',
        subject: `Araç İlgisi - ${car.brand} ${car.model} (#${car.id})`,
        from: data.email,
        name: data.name,
        phone: data.phone,
        message: data.message,
        carDetails: {
          brand: car.brand,
          model: car.model,
          year: car.year,
          price: car.price,
          id: car.id,
        },
      }

      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Email sent:', emailData)

      // Gerçek API call için:
      // const response = await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(emailData),
      // })

      alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
      reset()
      setIsRobotChecked(false)
    } catch (error) {
      console.error('Email send error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button and title */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            className="mb-2"
            onClick={() => router.push('/arac-al')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {car.brand.toUpperCase()} {car.year} {car.model.toUpperCase()}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Images & Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image with Navigation */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={allImages[currentImage]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Car ID Badge */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md">
                  #{car.id}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImage + 1} / {allImages.length}
                </div>

                {/* Previous Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                )}

                {/* Next Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                )}

                {/* Dots Navigation */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`transition-all rounded-full ${
                          currentImage === idx
                            ? 'bg-white w-8 h-2'
                            : 'bg-white/60 hover:bg-white/80 w-2 h-2'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {allImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === idx
                        ? 'border-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="border-t-2 border-gray-200 my-6" />

            {/* Description Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Açıklama</h2>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-1">Fiyat</div>
                  <div className="text-3xl font-bold text-primary">
                    {car.price.toLocaleString()} ₺
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Marka</span>
                    <span className="font-semibold">{car.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Model</span>
                    <span className="font-semibold">{car.model}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Yıl</span>
                    <span className="font-semibold">{car.year}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Yakıt</span>
                    <span className="font-semibold">{car.fuel_type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Vites</span>
                    <span className="font-semibold">{car.gearbox}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">KM</span>
                    <span className="font-semibold">{car.km.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Şehir</span>
                    <span className="font-semibold">{car.city}</span>
                  </div>
                </div>

                {/* Description Text */}
                {car.description && (
                  <div className="mt-6">
                    <p className="text-gray-700 leading-relaxed">
                      {car.description}
                    </p>
                  </div>
                )}

                {/* Features */}
                {car.features && car.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">Özellikler</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {car.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Contact Information & Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Contact Buttons */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">İletişim Bilgileri</h3>
                  
                  {/* Phone Button */}
                  <a href="tel:+905521896803">
                    <Button className="w-full mb-3 bg-primary hover:bg-primary/90 text-white h-12">
                      <Phone className="mr-2 h-5 w-5" />
                      0 (552) 189 68 03
                    </Button>
                  </a>

                  {/* WhatsApp Button */}
                  <a href="https://wa.me/905521896803" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-12">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Whatsapp
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Sizi Arayalım</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Bilgilerinizi bırakın sizi arayalım.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Ad & Soyad <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ad ve soyadınızı girin..."
                        {...register('name')}
                        className={`mt-1 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        E-Posta <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="E-Postanızı girin..."
                        {...register('email')}
                        className={`mt-1 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Telefon <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Telefon numaranızı girin..."
                        {...register('phone')}
                        className={`mt-1 ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium">
                        Mesaj <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Mesajınızı yazın..."
                        {...register('message')}
                        rows={4}
                        className={`mt-1 ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>

                    {/* reCAPTCHA */}
                    <div className="bg-[#f9f9f9] border-2 border-gray-300 rounded-md p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 pt-1">
                          <label className="cursor-pointer block">
                            <input
                              type="checkbox"
                              checked={isRobotChecked}
                              onChange={(e) => setIsRobotChecked(e.target.checked)}
                              className="w-6 h-6 cursor-pointer accent-primary border-2 border-gray-400 rounded"
                            />
                          </label>
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          <label
                            htmlFor="robot-check"
                            className="text-sm text-gray-800 font-normal cursor-pointer select-none"
                            onClick={() => setIsRobotChecked(!isRobotChecked)}
                          >
                            Ben robot değilim
                          </label>
                        </div>

                        {/* reCAPTCHA Logo */}
                        <div className="flex-shrink-0 flex flex-col items-end">
                          <div className="flex items-center gap-1 mb-1">
                            {/* Google reCAPTCHA Logo SVG */}
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                              <path d="M16 3C8.82 3 3 8.82 3 16C3 23.18 8.82 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3Z" fill="#4285F4"/>
                              <path d="M20.5 16C20.5 18.485 18.485 20.5 16 20.5C13.515 20.5 11.5 18.485 11.5 16C11.5 13.515 13.515 11.5 16 11.5C17.205 11.5 18.305 11.965 19.135 12.73L17.74 14.125C17.325 13.735 16.69 13.5 16 13.5C14.62 13.5 13.5 14.62 13.5 16C13.5 17.38 14.62 18.5 16 18.5C17.275 18.5 18.32 17.565 18.485 16.35H16V14.5H20.455C20.485 14.665 20.5 14.83 20.5 15V16Z" fill="white"/>
                              <path d="M23 9.5L20.5 12L19 10.5L21.5 8L23 9.5Z" fill="#EA4335"/>
                              <path d="M23 22.5L21.5 24L20.5 20L19 21.5L23 22.5Z" fill="#FBBC04"/>
                              <path d="M9 22.5L10.5 24L11.5 20L13 21.5L9 22.5Z" fill="#34A853"/>
                            </svg>
                          </div>
                          <div className="flex flex-col items-end text-[10px] text-gray-500 leading-tight">
                            <span className="font-medium">reCAPTCHA</span>
                            <div className="flex gap-1">
                              <a href="#" className="hover:underline text-blue-600">Gizlilik</a>
                              <span>-</span>
                              <a href="#" className="hover:underline text-blue-600">Şartlar</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 h-12 font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Gönderiliyor...
                        </>
                      ) : (
                        'Gönder'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

