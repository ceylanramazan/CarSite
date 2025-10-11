import Link from 'next/link'
import { Car, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">CarSite</span>
            </Link>
            <p className="text-sm text-gray-300">
              Güvenli, hızlı ve kolay araç alım satım platformu. Hayalinizdeki
              aracı bulun veya aracınızı satın.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/arac-al"
                  className="text-sm text-gray-300 hover:text-primary"
                >
                  Araç Al
                </Link>
              </li>
              <li>
                <Link
                  href="/teklif-al/arac-bilgileri"
                  className="text-sm text-gray-300 hover:text-primary"
                >
                  Araç Sat
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-sm text-gray-300 hover:text-primary"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-300 hover:text-primary"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kvkk"
                  className="text-sm text-gray-300 hover:text-primary"
                >
                  KVKK
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik"
                  className="text-sm text-gray-300 hover:text-primary"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-sm text-gray-300 hover:text-primary"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-gray-300">
                <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-5 w-5 text-primary" />
                <span>+90 555 123 45 67</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@carsite.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>
            © {currentYear} CarSite. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

