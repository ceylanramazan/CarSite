'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function CTA() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cta-background.jpg"
          alt="CTA Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#48C9B0]/15 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-lg">
            Hemen Başlayın
          </h2>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-white/95 px-4 drop-shadow-md">
            Aracınızın gerçek değerini öğrenin ve aracınızı 1 günde satın, ödemenizi anında alın.
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Link href="/teklif-al/arac-bilgileri" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 text-lg font-bold border-2 border-white/30 bg-white/15 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
