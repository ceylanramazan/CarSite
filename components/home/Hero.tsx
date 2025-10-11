'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Aracını Sat,
              <br />
              <span className="text-primary">Hayalini Al</span>
            </h1>
            <p className="mt-6 text-lg text-gray-200">
              Güvenli, hızlı ve kolay araç alım satım deneyimi. Aracınızı
              satın veya hayalinizdeki aracı hemen bulun.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/CarSite/teklif-al/arac-bilgileri">
                <Button size="lg" className="w-full sm:w-auto">
                  Aracını Sat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/CarSite/arac-al">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white bg-white/10 text-white hover:bg-white hover:text-secondary sm:w-auto"
                >
                  Araç Al
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="mt-1 text-sm text-gray-300">Satılan Araç</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="mt-1 text-sm text-gray-300">
                  Müşteri Memnuniyeti
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="mt-1 text-sm text-gray-300">Destek</div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80"
                alt="Car"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

