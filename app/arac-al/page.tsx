'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { mockCars, filterMockCars } from '@/lib/mockApi'
import { BRANDS, CITIES } from '@/lib/constants'
import { MapPin, Fuel, Settings, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AracAlPage() {
  const [filters, setFilters] = useState({
    brand: '',
    city: '',
    minPrice: '',
    maxPrice: '',
  })

  const filteredCars = filterMockCars({
    brand: filters.brand || undefined,
    city: filters.city || undefined,
    minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">Araç Al</h1>
        <p className="mt-2 text-gray-600">
          Hayalinizdeki aracı bulun ve hemen satın alın
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Filters */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filtrele</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="brand">Marka</Label>
                <Select
                  id="brand"
                  value={filters.brand}
                  onChange={(e) =>
                    setFilters({ ...filters, brand: e.target.value })
                  }
                >
                  <option value="">Tümü</option>
                  {BRANDS.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="city">Şehir</Label>
                <Select
                  id="city"
                  value={filters.city}
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                >
                  <option value="">Tümü</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="minPrice">Min. Fiyat</Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="maxPrice">Max. Fiyat</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="2000000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  setFilters({ brand: '', city: '', minPrice: '', maxPrice: '' })
                }
              >
                Filtreleri Temizle
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Car List */}
        <div className="lg:col-span-3">
          {filteredCars.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-lg text-gray-600">
                  Filtrelere uygun araç bulunamadı.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-all hover:shadow-lg">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={car.thumbnail}
                        alt={`${car.brand} ${car.model}`}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {car.brand} {car.model}
                      </CardTitle>
                      <div className="text-2xl font-bold text-primary">
                        ₺{car.price.toLocaleString()}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{car.year}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>{car.km.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Fuel className="mr-2 h-4 w-4" />
                          <span>
                            {car.fuel_type} • {car.gearbox}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{car.city}</span>
                        </div>
                      </div>
                      <Link href={`/arac-al/${car.id}`}>
                        <Button className="w-full">Detaylı Gör</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

