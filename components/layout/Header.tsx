'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Car } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Araç Al', href: '/arac-al' },
    { name: 'Araç Sat', href: '/teklif-al/arac-bilgileri' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Blog', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="rounded-xl bg-primary/10 p-2 transition-all group-hover:bg-primary/20 group-hover:scale-110">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <span className="text-2xl font-bold text-secondary">CarSite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-lg px-4 py-2 text-base font-semibold text-gray-700 transition-all hover:bg-primary/10 hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden items-center space-x-3 md:flex">
            <Link href="/teklif-al/arac-bilgileri">
              <Button variant="outline" size="lg" className="font-semibold">Araç Sat</Button>
            </Link>
            <Link href="/arac-al">
              <Button size="lg" className="font-semibold shadow-lg hover:shadow-xl">Araç Al</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/teklif-al/arac-bilgileri">
                  <Button variant="outline" className="w-full">
                    Araç Sat
                  </Button>
                </Link>
                <Link href="/arac-al">
                  <Button className="w-full">Araç Al</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

