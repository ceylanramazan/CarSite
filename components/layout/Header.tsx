'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Car } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Araç Al', href: '/arac-al' },
    { name: 'Araç Sat', href: '/teklif-al/arac-bilgileri' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Blog', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="rounded-lg sm:rounded-xl bg-primary/10 p-1.5 sm:p-2 transition-all group-hover:bg-primary/20 group-hover:scale-110">
              <Car className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-secondary">CarSite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-semibold transition-all duration-300 group ${
                    active
                      ? 'text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {item.name}
                  
                  {/* Active indicator - bottom border */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      active
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                  
                </Link>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden items-center space-x-2 lg:space-x-3 lg:flex">
            <Link href="/teklif-al/arac-bilgileri">
              <Button variant="outline" size="lg" className="font-semibold">Araç Sat</Button>
            </Link>
            <Link href="/arac-al">
              <Button size="lg" className="font-semibold shadow-lg hover:shadow-xl">Araç Al</Button>
            </Link>
          </div>

          {/* Mobile menu button - bigger for touch */}
          <button
            type="button"
            className="lg:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Modern & Touch Friendly */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 lg:hidden">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative rounded-lg px-4 py-3 text-base font-semibold transition-all duration-300 group ${
                      active
                        ? 'text-primary'
                        : 'text-gray-700 hover:text-primary'
                    } active:bg-primary/20`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    
                    {/* Active indicator - left border */}
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-primary transition-all duration-300 ${
                        active
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-50'
                      }`}
                    />
                  </Link>
                )
              })}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 mt-2">
                <Link href="/teklif-al/arac-bilgileri" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full h-12 text-base font-semibold">
                    Araç Sat
                  </Button>
                </Link>
                <Link href="/arac-al" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="lg" className="w-full h-12 text-base font-semibold shadow-lg">
                    Araç Al
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

