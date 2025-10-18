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
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-md">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-sm"></div>
                  <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                  <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
                </div>
                <div className="text-gray-700 font-medium text-sm">Google</div>
              </div>
              
              {/* Rating Display */}
              <div className="bg-white px-6 py-4 rounded-lg shadow-md">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-1">4.9</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Tüm değerlendirmeler</div>
                </div>
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
