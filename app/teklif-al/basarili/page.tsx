'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BasariliPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-6 flex justify-center"
            >
              <div className="rounded-full bg-accent/10 p-6">
                <CheckCircle className="h-16 w-16 text-accent" />
              </div>
            </motion.div>

            <h1 className="mb-4 text-3xl font-bold text-secondary">
              Teklifiniz Başarıyla Alındı!
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Uzman ekibimiz en kısa sürede aracınızı değerlendirecek ve size
              en iyi teklifi sunacaktır.
            </p>

            <div className="mb-8 rounded-lg bg-gray-50 p-6">
              <p className="text-sm text-gray-700">
                <strong>Ne zaman geri dönüş alacaksınız?</strong>
                <br />
                Genellikle 24 saat içinde size ulaşıyoruz. Teklifinizi
                e-posta ve telefon ile bildireceğiz.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/CarSite">
                <Button size="lg">Anasayfaya Dön</Button>
              </Link>
              <Link href="/CarSite/arac-al">
                <Button size="lg" variant="outline">
                  Araçları İncele
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

