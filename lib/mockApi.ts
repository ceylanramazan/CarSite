import type { CarBuyDTO } from '@/types'

// Mock data for development
export const mockCars: CarBuyDTO[] = [
  {
    id: 1,
    brand: 'Opel',
    model: 'Astra',
    year: 2021,
    km: 38000,
    price: 950000,
    fuel_type: 'Dizel',
    gearbox: 'Otomatik',
    city: 'Ankara',
    thumbnail: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    ],
    description: 'Temiz ve bakımlı araç. Tüm bakımları zamanında yapılmıştır.',
    features: ['Navigasyon', 'Deri Döşeme', 'Otomatik Klima', 'Park Sensörü'],
  },
  {
    id: 2,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2020,
    km: 45000,
    price: 850000,
    fuel_type: 'Benzin',
    gearbox: 'Manuel',
    city: 'İstanbul',
    thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    ],
    description: 'Kazasız ve hasarsız araç.',
    features: ['Navigasyon', 'Cam Tavan', 'LED Farlar'],
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'Focus',
    year: 2022,
    km: 25000,
    price: 1100000,
    fuel_type: 'Dizel',
    gearbox: 'Otomatik',
    city: 'İzmir',
    thumbnail: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    ],
    description: 'Sıfır gibi araç, ilk sahibinden.',
    features: ['Apple CarPlay', 'Koltuk Isıtma', 'Cruise Control'],
  },
  {
    id: 4,
    brand: 'Renault',
    model: 'Megane',
    year: 2019,
    km: 55000,
    price: 750000,
    fuel_type: 'Dizel',
    gearbox: 'Manuel',
    city: 'Bursa',
    thumbnail: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    ],
    description: 'Ekonomik ve güvenilir araç.',
    features: ['Otomatik Klima', 'ABS', 'ESP'],
  },
  {
    id: 5,
    brand: 'Toyota',
    model: 'Corolla',
    year: 2023,
    km: 15000,
    price: 1350000,
    fuel_type: 'Hybrid',
    gearbox: 'Otomatik',
    city: 'Ankara',
    thumbnail: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    ],
    description: 'Hibrit teknoloji ile ekonomik sürüş.',
    features: ['Hybrid Motor', 'Toyota Safety Sense', 'Adaptif Hız Sabitleyici'],
  },
  {
    id: 6,
    brand: 'Hyundai',
    model: 'i20',
    year: 2021,
    km: 32000,
    price: 680000,
    fuel_type: 'Benzin',
    gearbox: 'Otomatik',
    city: 'Antalya',
    thumbnail: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800',
    images: [
      'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800',
    ],
    description: 'Şehir içi kullanım için ideal.',
    features: ['Bluetooth', 'Geri Görüş Kamerası', 'Elektrikli Camlar'],
  },
]

export const getMockCarById = (id: number): CarBuyDTO | undefined => {
  return mockCars.find((car) => car.id === id)
}

export const filterMockCars = (filters: any): CarBuyDTO[] => {
  return mockCars.filter((car) => {
    if (filters.brand && car.brand !== filters.brand) return false
    if (filters.city && car.city !== filters.city) return false
    if (filters.minPrice && car.price < filters.minPrice) return false
    if (filters.maxPrice && car.price > filters.maxPrice) return false
    if (filters.minKm && car.km < filters.minKm) return false
    if (filters.maxKm && car.km > filters.maxKm) return false
    return true
  })
}

