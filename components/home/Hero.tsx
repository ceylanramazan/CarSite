'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import QuickOfferForm from './QuickOfferForm'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/CarSite/hero-background.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#48C9B0]/5 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center items-start pt-16 sm:pt-20 md:pt-24">
          {/* Centered Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            <QuickOfferForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

