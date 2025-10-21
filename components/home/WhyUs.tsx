'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, HeartHandshake, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Shield,
    title: 'Güvenli İşlem ve Ön Fiyat',
    description:
      'Tüm bilgileri eksiksiz girin, aracınızın değeri için ön fiyat alın.',
  },
  {
    icon: Zap,
    title: 'Hızlı Süreç',
    description:
      'Aracınızı satmak için gereken süreç birkaç dakika.',
  },
  {
    icon: HeartHandshake,
    title: 'Müşteri Memnuniyeti',
    description:
      'Binlerce mutlu müşterimiz var. Sizde onlardan biri olun.',
  },
  {
    icon: MapPin,
    title: 'Yerinde Ekspertiz',
    description:
      'Türkiye\'nin neresinde olursanız olun, yerinde ekspertiz hizmetiyle yanınızdayız.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-secondary sm:text-3xl md:text-4xl">
            Neden Biz?
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 px-4">
            Any 2. El ile araç alımınız güvende!
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-12 md:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 transition-all hover:border-primary hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="mb-3 sm:mb-4 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
