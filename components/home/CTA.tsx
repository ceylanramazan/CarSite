'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function CTA() {
  return (
    <section className="relative py-8 sm:py-10 md:py-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/CarSite/cta-background.jpg"
          alt="CTA Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Hemen Başlayın
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 px-4">
            Aracınızın gerçek değerini öğrenin ve aracınızı 1 günde satın, ödemenizi anında alın.
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Link href="/teklif-al/arac-bilgileri" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base font-semibold border-white bg-white/10 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
              >
                Ücretsiz Teklif Al
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
