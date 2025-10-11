'use client'

import { motion } from 'framer-motion'
import { FileText, DollarSign, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Bilgini Gir',
    description: 'Aracınızın bilgilerini girin ve fotoğraflarını yükleyin.',
  },
  {
    icon: DollarSign,
    title: 'Teklif Al',
    description: 'Uzman ekibimiz aracınızı değerlendirir ve teklif sunar.',
  },
  {
    icon: CheckCircle,
    title: 'Sat',
    description: 'Teklifi beğendiyseniz anında satışı tamamlayın.',
  },
]

export default function Process() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            Nasıl Çalışır?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            3 basit adımda aracınızı satın
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -right-4 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-secondary">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

