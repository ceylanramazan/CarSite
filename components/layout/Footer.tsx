import Link from 'next/link'
import { Car, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div className="space-y-3 sm:space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              <span className="text-lg sm:text-xl font-bold">CarSite</span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Güvenli, hızlı ve kolay araç alım satım platformu. Hayalinizdeki
              aracı bulun veya aracınızı satın.
            </p>
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
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span>+90 555 123 45 67</span>
              </li>
              <li className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="break-all">info@carsite.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-gray-700 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>
            © {currentYear} CarSite. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

