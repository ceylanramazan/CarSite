'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

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
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Bizi Tercih Edenler
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Müşteri Değerlendirmeleri
          </p>
          
          {/* Google Rating */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">4.9</div>
              <div className="text-sm text-gray-600">Google Puanı</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
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
    </section>
  )
}
