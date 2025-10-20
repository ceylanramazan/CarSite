'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, ChevronDown, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Mobile: Accordion Style */}
        <div className="lg:hidden space-y-4">
          {/* Logo & Description - Always visible */}
          <div className="pb-4 border-b border-gray-700">
            <Link href="/" className="flex items-center space-x-2 mb-3">
              <Image 
                src="/logo.png" 
                alt="Any 2. El Logo" 
                width={28} 
                height={28} 
                className="h-7 w-7 object-contain"
              />
              <span className="text-lg font-bold">Any 2. El</span>
            </Link>
            <p className="text-xs text-gray-300 leading-relaxed">
              Güvenli, hızlı ve kolay araç alım satım platformu.
            </p>
          </div>

          {/* Quick Links - Accordion */}
          <div className="border-b border-gray-700">
            <button
              onClick={() => toggleSection('quick')}
              className="w-full flex items-center justify-between py-3"
            >
              <span className="text-base font-semibold">Hızlı Erişim</span>
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
                    href="/arac-al"
                    className="text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                  >
                    Araç Al
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teklif-al/arac-bilgileri"
                    className="text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                  >
                    Araç Sat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hakkimizda"
                    className="text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Legal - Accordion */}
          <div className="border-b border-gray-700">
            <button
              onClick={() => toggleSection('legal')}
              className="w-full flex items-center justify-between py-3"
            >
              <span className="text-base font-semibold">Yasal</span>
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
                    className="text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                  >
                    KVKK
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gizlilik"
                    className="text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                  >
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link
                    href="/iletisim"
                    className="text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                  >
                    İletişim
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Contact - Accordion */}
          <div className="border-b border-gray-700">
            <button
              onClick={() => toggleSection('contact')}
              className="w-full flex items-center justify-between py-3"
            >
              <span className="text-base font-semibold">İletişim</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openSection === 'contact' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openSection === 'contact' && (
              <ul className="space-y-2.5 pb-4">
                <li className="flex items-start space-x-2 text-sm text-gray-300">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                  <span>Merdivenköy, Ressam Salih Erimez Cad 16/B<br />Kadıköy, İstanbul</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-300">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+905449275328" className="hover:text-primary">
                    0544 927 53 28
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:info@carsite.com" className="break-all hover:text-primary">
                    info@carsite.com
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* Social Media - Mobile */}
          <div className="pt-4">
            <h3 className="text-base font-semibold mb-3">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5 text-primary hover:text-white" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5 text-primary hover:text-white" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5 text-primary hover:text-white" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Linkedin className="h-5 w-5 text-primary hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop: Original Grid */}
        <div className="hidden lg:grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div className="space-y-3 sm:space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/logo.png" 
                alt="Any 2. El Logo" 
                width={32} 
                height={32} 
                className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
              />
              <span className="text-lg sm:text-xl font-bold">Any 2. El</span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Güvenli, hızlı ve kolay araç alım satım platformu. Hayalinizdeki
              aracı bulun veya aracınızı satın.
            </p>
            {/* Social Media - Desktop */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4 text-primary hover:text-white" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4 text-primary hover:text-white" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4 text-primary hover:text-white" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Linkedin className="h-4 w-4 text-primary hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/arac-al"
                  className="text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                >
                  Araç Al
                </Link>
              </li>
              <li>
                <Link
                  href="/teklif-al/arac-bilgileri"
                  className="text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                >
                  Araç Sat
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kvkk"
                  className="text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                >
                  KVKK
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik"
                  className="text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors inline-block py-1"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">İletişim</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li className="flex items-start space-x-2 text-xs sm:text-sm text-gray-300">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Merdivenköy, Ressam Salih Erimez Cad 16/B<br />Kadıköy, İstanbul</span>
              </li>
              <li className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <a href="tel:+905449275328" className="hover:text-primary">
                  0544 927 53 28
                </a>
              </li>
              <li className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <a href="mailto:info@carsite.com" className="break-all hover:text-primary">
                  info@carsite.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Compact on Mobile */}
        <div className="mt-6 sm:mt-8 border-t border-gray-700 pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © {currentYear} Any 2. El. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
