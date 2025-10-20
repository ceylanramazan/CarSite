'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import ReCAPTCHA from 'react-google-recaptcha'
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
  X,
  ZoomIn,
} from 'lucide-react'
import type { CarBuyDTO } from '@/types'

// Google reCAPTCHA v2 Site Key
// For production, get your own keys from: https://www.google.com/recaptcha/admin
// Current: Using localhost test key (works without warnings)
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LfC6DIqAAAAAF8cGOOR_r0qLFucRmxUmCVOH-cL'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  
  // Drag/Swipe state for main image
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  
  // Drag/Swipe state for lightbox
  const [isLightboxDragging, setIsLightboxDragging] = useState(false)
  const [lightboxStartX, setLightboxStartX] = useState(0)
  const [lightboxCurrentX, setLightboxCurrentX] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const allImages = car.images || [car.thumbnail]

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const onSubmit = async (data: ContactFormData) => {
    // Check reCAPTCHA
    if (!recaptchaToken) {
      alert('Lütfen reCAPTCHA doğrulamasını tamamlayın')
      return
    }

    setIsSubmitting(true)

    try {
      // Mail gönderme API'si (mock)
      const emailData = {
        to: 'anycars34@gmail.com',
        subject: `Araç İlgisi - ${car.brand} ${car.model} (#${car.id})`,
        from: data.email,
        name: data.name,
        phone: data.phone,
        message: data.message,
        recaptchaToken: recaptchaToken,
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
      setRecaptchaToken(null)
      recaptchaRef.current?.reset()
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

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Drag/Swipe handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setCurrentX(clientX)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    setCurrentX(clientX)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    
    const diff = currentX - startX
    const threshold = 50 // Minimum drag distance in pixels
    
    if (Math.abs(diff) > threshold) {
      // Dragged enough, change image
      if (diff > 0) {
        prevImage() // Dragged right, go to previous
      } else {
        nextImage() // Dragged left, go to next
      }
    } else if (Math.abs(diff) < 5) {
      // Almost no movement, treat as click
      openLightbox(currentImage)
    }
    
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // Lightbox drag/swipe handlers
  const handleLightboxDragStart = (clientX: number) => {
    setIsLightboxDragging(true)
    setLightboxStartX(clientX)
    setLightboxCurrentX(clientX)
  }

  const handleLightboxDragMove = (clientX: number) => {
    if (!isLightboxDragging) return
    setLightboxCurrentX(clientX)
  }

  const handleLightboxDragEnd = () => {
    if (!isLightboxDragging) return
    
    const diff = lightboxCurrentX - lightboxStartX
    const threshold = 50
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        prevLightboxImage()
      } else {
        nextLightboxImage()
      }
    }
    
    setIsLightboxDragging(false)
    setLightboxStartX(0)
    setLightboxCurrentX(0)
  }

  const handleLightboxMouseDown = (e: React.MouseEvent) => {
    handleLightboxDragStart(e.clientX)
  }

  const handleLightboxMouseMove = (e: React.MouseEvent) => {
    handleLightboxDragMove(e.clientX)
  }

  const handleLightboxMouseUp = () => {
    handleLightboxDragEnd()
  }

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    handleLightboxDragStart(e.touches[0].clientX)
  }

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    handleLightboxDragMove(e.touches[0].clientX)
  }

  const handleLightboxTouchEnd = () => {
    handleLightboxDragEnd()
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevLightboxImage()
      if (e.key === 'ArrowRight') nextLightboxImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, lightboxIndex])

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
              <div 
                className="aspect-video bg-gray-100 relative group cursor-pointer select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={allImages[currentImage]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable="false"
                />
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="h-8 w-8 text-gray-800" />
                  </div>
                </div>

                {/* Car ID Badge */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md z-10">
                  #{car.id}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium z-10">
                  {currentImage + 1} / {allImages.length}
                </div>

                {/* Previous Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                )}

                {/* Next Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
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
                  <a href="tel:+905449275328">
                    <Button className="w-full mb-3 bg-primary hover:bg-primary/90 text-white h-12">
                      <Phone className="mr-2 h-5 w-5" />
                      0544 927 53 28
                    </Button>
                  </a>

                  {/* WhatsApp Button */}
                  <a href="https://wa.me/905449275328" target="_blank" rel="noopener noreferrer">
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

                    {/* Google reCAPTCHA v2 */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Güvenlik Doğrulaması <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex justify-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={RECAPTCHA_SITE_KEY}
                          onChange={onRecaptchaChange}
                          theme="light"
                          size="normal"
                        />
                      </div>
                      {!recaptchaToken && (
                        <p className="text-xs text-gray-500 text-center">
                          Lütfen robot olmadığınızı doğrulayın
                        </p>
                      )}
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

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium z-20">
            {lightboxIndex + 1} / {allImages.length}
          </div>

          {/* Previous Button */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevLightboxImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>
          )}

          {/* Next Button */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextLightboxImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors z-20"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>
          )}

          {/* Main Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleLightboxMouseDown}
            onMouseMove={handleLightboxMouseMove}
            onMouseUp={handleLightboxMouseUp}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={allImages[lightboxIndex]}
              alt={`${car.brand} ${car.model} - Image ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-none"
              draggable="false"
            />
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 p-3 rounded-lg max-w-full overflow-x-auto">
              {allImages.map((image, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex(idx)
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    lightboxIndex === idx
                      ? 'border-primary scale-110'
                      : 'border-white/30 hover:border-white/60'
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
        </div>
      )}
    </div>
  )
}

