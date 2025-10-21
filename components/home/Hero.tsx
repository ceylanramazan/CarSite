'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import QuickOfferForm from './QuickOfferForm'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/CarSite/hero-background.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#48C9B0]/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
              Aracını aynı gün değerinde sat!
            </h1>
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-white/95 leading-relaxed drop-shadow-md">
              Güvenli, hızlı ve kolay araç alım deneyimi. Aracınızı ücretsiz değerlendir.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/teklif-al/arac-bilgileri" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-8 sm:px-10 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Aracınızı Satın
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Stats - More compact on mobile */}
            <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">3493+</div>
                <div className="mt-2 text-sm sm:text-base text-white/90 drop-shadow-md">Değerlenen Araç Sayısı</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">98%</div>
                <div className="mt-2 text-sm sm:text-base text-white/90 drop-shadow-md">
                  Müşteri Memnuniyeti
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">24/7</div>
                <div className="mt-2 text-sm sm:text-base text-white/90 drop-shadow-md">Destek</div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <div className="relative hidden lg:block">
            <QuickOfferForm />
          </div>
        </div>
      </div>
    </section>
  )
}

