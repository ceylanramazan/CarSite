'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            Aracınızı satmak veya yeni bir araç almak için bugün başlayın
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
            <Link href="/teklif-al/arac-bilgileri" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-12 sm:h-auto text-base font-semibold border-white bg-white text-primary hover:bg-white/90"
              >
                Ücretsiz Teklif Al
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/arac-al" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full h-12 sm:h-auto text-base font-semibold border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary"
              >
                Araçları İncele
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
