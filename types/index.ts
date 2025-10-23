// Vehicle Data Transfer Objects
export interface VehicleDTO {
  brand: string
  model: string
  year: number
  km: number
  fuel_type: string
  gearbox: string
  city: string
  plate?: string
  photos?: string[]
  // SmartIQ API fields
  bodyType?: string
  transmissionType?: string
  fuelType?: string
  version?: string
}

export interface DamageDTO {
  has_damage: boolean
  changed_parts?: string[] // Deprecated - keeping for backward compatibility
  part_status?: Record<string, 'O' | 'LB' | 'B' | 'D'> // O: Original, LB: Lokal Boya, B: Boyalı, D: Değişen
  description?: string
}

export interface ExpertiseDTO {
  has_expertise: boolean
  expertise_company?: string
  expertise_date?: string
  expertise_score?: number
  expertise_report?: string
  tramer_check: boolean
  maintenance_records: boolean
}

export interface ContactDTO {
  name: string
  phone: string
  email: string
  city: string
  kvkk: boolean
}

export interface OfferPayload {
  vehicle: VehicleDTO
  damage: DamageDTO
  expertise: ExpertiseDTO
  contact: ContactDTO
}

export interface OfferResponse {
  status: 'success' | 'error'
  message: string
  offer_id?: string
}

// Car Buy Data Transfer Objects
export interface CarBuyDTO {
  id: number
  brand: string
  model: string
  year: number
  km: number
  price: number
  fuel_type: string
  gearbox: string
  city: string
  thumbnail: string
  images?: string[]
  description?: string
  features?: string[]
}

export interface PurchasePayload {
  car_id: number
  buyer_name: string
  buyer_phone: string
  buyer_email: string
  city: string
  delivery_option: 'pickup' | 'delivery'
  kvkk_consent: boolean
}

export interface PurchaseResponse {
  status: 'success' | 'error'
  message: string
  purchase_id?: string
}

// Filter Types
export interface CarFilters {
  brand?: string
  model?: string
  city?: string
  minPrice?: number
  maxPrice?: number
  minKm?: number
  maxKm?: number
  minYear?: number
  maxYear?: number
  fuel_type?: string
  gearbox?: string
}

// Blog Types
export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
}

// Form Context Types
export interface OfferFormData {
  vehicle?: VehicleDTO
  damage?: DamageDTO
  expertise?: ExpertiseDTO
  contact?: ContactDTO
}

