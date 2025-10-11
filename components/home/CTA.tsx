'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Hemen Başlayın
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Aracınızı satmak veya yeni bir araç almak için bugün başlayın
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/CarSite/teklif-al/arac-bilgileri">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white bg-white text-primary hover:bg-white/90 sm:w-auto"
              >
                Ücretsiz Teklif Al
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/CarSite/arac-al">
              <Button
                size="lg"
                className="w-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto"
              >
                Araçları İncele
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

