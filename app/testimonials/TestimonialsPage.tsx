'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    location: 'İstanbul',
    rating: 5,
    comment: 'Aracımı çok hızlı ve güvenli bir şekilde sattım. CarSite ekibi gerçekten profesyonel.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Fatma Demir',
    location: 'Ankara',
    rating: 5,
    comment: 'Yerinde ekspertiz hizmeti sayesinde evden çıkmadan aracımın değerini öğrendim.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    location: 'İzmir',
    rating: 5,
    comment: 'Müşteri hizmetleri çok ilgili. Tüm süreç boyunca yanımda oldular.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Ayşe Özkan',
    location: 'Bursa',
    rating: 5,
    comment: 'Araç alırken hiç sorun yaşamadım. Şeffaf ve güvenilir bir platform.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Ali Çelik',
    location: 'Antalya',
    rating: 5,
    comment: 'Fiyat değerlendirmesi çok adil. Diğer platformlardan çok daha iyi.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Zeynep Arslan',
    location: 'Adana',
    rating: 5,
    comment: 'Hızlı ödeme ve sorunsuz teslimat. Kesinlikle tavsiye ederim.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 7,
    name: 'Emre Şahin',
    location: 'Trabzon',
    rating: 5,
    comment: 'Karadeniz\'de bile hizmet verdiler. Çok memnun kaldım.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 8,
    name: 'Selin Korkmaz',
    location: 'Gaziantep',
    rating: 5,
    comment: 'Araç değerlendirmesi çok detaylı ve adil. Teşekkürler CarSite.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 9,
    name: 'Okan Yıldız',
    location: 'Konya',
    rating: 5,
    comment: 'Ekspertiz raporu çok profesyonel. Güvenle işlem yaptım.',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 10,
    name: 'Elif Öztürk',
    location: 'Eskişehir',
    rating: 5,
    comment: 'Müşteri temsilcisi çok yardımcı oldu. Süreç çok kolaydı.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 11,
    name: 'Burak Çakır',
    location: 'Samsun',
    rating: 5,
    comment: 'Araç satış süreci çok hızlıydı. 3 günde tamamlandı.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 12,
    name: 'Deniz Aydın',
    location: 'Mersin',
    rating: 5,
    comment: 'Ödeme çok hızlı geldi. Hiç beklemedim. Teşekkürler.',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face'
  }
]

export default function TestimonialsPage() {
  const [visibleCount, setVisibleCount] = useState(6)
  const ITEMS_PER_PAGE = 6

  const visibleTestimonials = testimonials.slice(0, visibleCount)
  const hasMore = visibleCount < testimonials.length

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, testimonials.length))
  }

  const showLess = () => {
    setVisibleCount(6)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
              Müşteri Yorumları
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Binlerce mutlu müşterimizin deneyimleri
            </p>
            
            {/* Google Rating */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {/* Google Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div className="text-gray-700 font-medium">Google Puanı</div>
              </div>
              
              {/* Rating Display */}
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">4.8</div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                  ))}
                  <Star className="h-5 w-5 fill-orange-500/50 text-orange-500/50" />
                </div>
                <div className="text-sm text-gray-600">Tüm değerlendirmeler</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 sm:p-8">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-primary/20" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                  
                  {/* Customer Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-secondary text-sm sm:text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500 text-xs sm:text-sm">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {testimonials.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 sm:mt-12 text-center"
          >
            {hasMore ? (
              <Button
                onClick={loadMore}
                className="px-8 py-3 text-base font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <ChevronDown className="mr-2 h-5 w-5" />
                Daha Fazla Yorum Yükle
              </Button>
            ) : (
              <div className="space-y-4">
                <Button
                  onClick={showLess}
                  variant="outline"
                  className="px-8 py-3 text-base font-semibold border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-all duration-300"
                >
                  <ChevronUp className="mr-2 h-5 w-5" />
                  Daha Az Göster
                </Button>
                <p className="text-sm text-gray-600">
                  Tüm {testimonials.length} yorumu görüntülüyorsunuz
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">5000+</div>
            <div className="text-sm sm:text-base text-gray-600">Mutlu Müşteri</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm sm:text-base text-gray-600">Memnuniyet Oranı</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm sm:text-base text-gray-600">Destek</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">4.9</div>
            <div className="text-sm sm:text-base text-gray-600">Ortalama Puan</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
