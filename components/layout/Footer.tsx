'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, ChevronDown, Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-gradient-to-br from-[#48C9B0]/90 to-[#48C9B0]/80 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Mobile: Accordion Style */}
        <div className="lg:hidden space-y-4">
          {/* Logo & Description - Always visible */}
          <div className="pb-4 border-b border-white/20">
            <Link 
              href="/" 
              onClick={(e) => {
                e.preventDefault()
                window.location.href = '/'
              }}
              className="flex items-center space-x-3 mb-3"
            >
              <Image 
                src="/logo.png" 
                alt="Any 2. El Logo" 
                width={36} 
                height={36} 
                className="h-9 w-9 object-contain"
              />
              <span className="text-lg font-bold">Any 2. El</span>
            </Link>
            <p className="text-xs text-white/90 leading-relaxed">
              Güvenli, hızlı ve kolay araç alım deneyimi. Aracınızı ücretsiz değerlendir.
            </p>
          </div>

          {/* Quick Links - Accordion */}
          <div className="border-b border-white/20">
            <button
              onClick={() => toggleSection('quick')}
              className="w-full flex items-center justify-between py-3"
            >
              <span className="text-base font-semibold text-white">Hızlı Erişim</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openSection === 'quick' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'quick' && (
              <ul className="space-y-2 pb-4">
                <li>
                  <Link
                    href="/teklif-al/arac-bilgileri"
                    className="text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                  >
                    Araç Sat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hakkimizda"
                    className="text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Legal - Accordion */}
          <div className="border-b border-white/20">
            <button
              onClick={() => toggleSection('legal')}
              className="w-full flex items-center justify-between py-3"
            >
              <span className="text-base font-semibold text-white">Yasal</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openSection === 'legal' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'legal' && (
              <ul className="space-y-2 pb-4">
                <li>
                  <Link
                    href="/kvkk"
                    className="text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                  >
                    KVKK
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gizlilik"
                    className="text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                  >
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link
                    href="/iletisim"
                    className="text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                  >
                    İletişim
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Contact - Accordion */}
          <div className="border-b border-white/20">
            <button
              onClick={() => toggleSection('contact')}
              className="w-full flex items-center justify-between py-3"
            >
              <span className="text-base font-semibold text-white">İletişim</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openSection === 'contact' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'contact' && (
              <ul className="space-y-2.5 pb-4">
                <li className="flex items-start space-x-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-white/90 mt-0.5" />
                  <span>Merdivenköy, Ressam Salih Erimez Cad 16/B<br />Kadıköy, İstanbul</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/80">
                  <Phone className="h-4 w-4 text-white/90" />
                  <a href="tel:+905449275328" className="hover:text-white">
                    0544 927 53 28
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-sm text-white/80">
                  <Mail className="h-4 w-4 text-white/90" />
                  <a href="mailto:anycars34@gmail.com" className="break-all hover:text-white">
                    anycars34@gmail.com
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* Social Media - Mobile */}
          <div className="pt-4">
            <h3 className="text-base font-semibold mb-3 text-white">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/any2.el/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.instagram.com/any2.el/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop: Original Grid */}
        <div className="hidden lg:grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div className="space-y-3 sm:space-y-4">
            <Link 
              href="/" 
              onClick={(e) => {
                e.preventDefault()
                window.location.href = '/'
              }}
              className="flex items-center space-x-3"
            >
              <Image 
                src="/logo.png" 
                alt="Any 2. El Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain"
              />
              <span className="text-lg sm:text-xl font-bold">Any 2. El</span>
            </Link>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Güvenli, hızlı ve kolay araç alım deneyimi. Aracınızı ücretsiz değerlendir.
            </p>
            {/* Social Media - Desktop */}
            <div className="flex space-x-3 pt-2">
              <a href="https://www.facebook.com/any2.el/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a href="https://www.instagram.com/any2.el/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Instagram className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-white">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/teklif-al/arac-bilgileri"
                  className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                >
                  Araç Sat
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-white">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kvkk"
                  className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                >
                  KVKK
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik"
                  className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors inline-block py-1"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-white">İletişim</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li className="flex items-start space-x-2 text-xs sm:text-sm text-white/80">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-white/90 mt-0.5" />
                <span>Merdivenköy, Ressam Salih Erimez Cad 16/B<br />Kadıköy, İstanbul</span>
              </li>
              <li className="flex items-center space-x-2 text-xs sm:text-sm text-white/80">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white/90" />
                <a href="tel:+905449275328" className="hover:text-white">
                  0544 927 53 28
                </a>
              </li>
              <li className="flex items-center space-x-2 text-xs sm:text-sm text-white/80">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white/90" />
                <a href="mailto:anycars34@gmail.com" className="break-all hover:text-white">
                  anycars34@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Compact on Mobile */}
        <div className="mt-6 sm:mt-8 border-t border-white/20 pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm text-white/70">
            © {currentYear} Any 2. El. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
