'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, HeartHandshake } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Shield,
    title: 'Güvenli İşlem',
    description:
      'Tüm işlemleriniz SSL sertifikası ile korunur. Verileriniz güvende.',
  },
  {
    icon: Zap,
    title: 'Hızlı Süreç',
    description:
      'Aracınızı satmak veya almak için gereken süreç sadece birkaç dakika.',
  },
  {
    icon: HeartHandshake,
    title: 'Müşteri Memnuniyeti',
    description:
      'Binlerce mutlu müşterimiz var. Sizde onlardan biri olun.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            Neden Biz?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            CarSite ile araç alım satımınız güvende
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 transition-all hover:border-primary hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

