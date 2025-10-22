// SmartIQ API Integration
// Vehicle Pricing API for Any 2. El

const SMARTIQ_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.smartiq.io/mars/autoPricingAPI'
  : 'https://qa.smartiq.io/mars/autoPricingAPI'

const API_USER = process.env.SMARTIQ_API_USER
const API_KEY = process.env.SMARTIQ_API_KEY

// Types
export interface SmartIQResponse<T> {
  success: boolean
  securityKey: string | null
  data: {
    items: T[]
  }
  redirectUrl: string | null
  popUpUrl: string | null
  errorMessage: string | null
  message: string | null
  serviceBegin: number
  serviceDuration: number
  serviceName: string | null
  methodName: string | null
  sessionMessage: string | null
  cacheResult: boolean
}

export interface SmartIQPricingResponse {
  success: boolean
  securityKey: string | null
  data: {
    prediction: {
      quickSellPrice: number
      aboveMarketPrice: number
      retailPrice: number
      galleryPriceUp: number
      galleryPriceDown: number
    }
  }
  redirectUrl: string | null
  popUpUrl: string | null
  errorMessage: string | null
  message: string | null
  serviceBegin: number
  serviceDuration: number
  serviceName: string | null
  methodName: string | null
  sessionMessage: string | null
  cacheResult: boolean
}

export interface Brand {
  id: number
  name: string
}

export interface Model {
  id: number
  name: string
}

export interface BodyType {
  id: number
  name: string
}

export interface TransmissionType {
  id: number
  name: string
}

export interface FuelType {
  id: number
  name: string
}

export interface Version {
  id: number
  name: string
}

export interface Equipment {
  id: number
  type: string
  name: string
  isOptional: boolean
}

export interface Damage {
  sectionType: string
  state: string
}

export interface PricingRequest {
  year: number
  brandId: number
  modelId: number
  bodyTypeId: number
  transmissionTypeId: number
  fuelTypeId: number
  versionId: number
  kilometer: number
  additionalDamageCost?: number
  damages?: Damage[]
  equipments?: number[]
  cityCode?: number
}

// API Functions
export class SmartIQAPI {
  private static async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'POST',
    body?: any
  ): Promise<T> {
    if (!API_USER || !API_KEY) {
      throw new Error('SmartIQ API credentials not configured')
    }

    const url = `${SMARTIQ_BASE_URL}${endpoint}`
    const requestBody = {
      apiUser: API_USER,
      apiKey: API_KEY,
      ...body
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'POST' ? JSON.stringify(requestBody) : undefined,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`SmartIQ API Error: ${errorData.status_desc || 'Unknown error'}`)
    }

    return response.json()
  }

  // 1. Get Years
  static async getYears(): Promise<number[]> {
    const response = await this.makeRequest<SmartIQResponse<number>>('/carWizard')
    return response.data.items
  }

  // 2. Get Brands by Year
  static async getBrands(year: number): Promise<Brand[]> {
    const response = await this.makeRequest<SmartIQResponse<Brand>>(`/carWizard?year=${year}`)
    return response.data.items
  }

  // 3. Get Models by Year and Brand
  static async getModels(year: number, brandId: number): Promise<Model[]> {
    const response = await this.makeRequest<SmartIQResponse<Model>>(`/carWizard?year=${year}&brandId=${brandId}`)
    return response.data.items
  }

  // 4. Get Body Types
  static async getBodyTypes(year: number, brandId: number, modelId: number): Promise<BodyType[]> {
    const response = await this.makeRequest<SmartIQResponse<BodyType>>(`/carWizard?year=${year}&brandId=${brandId}&modelId=${modelId}`)
    return response.data.items
  }

  // 5. Get Transmission Types
  static async getTransmissionTypes(year: number, brandId: number, modelId: number, bodyTypeId: number): Promise<TransmissionType[]> {
    const response = await this.makeRequest<SmartIQResponse<TransmissionType>>(`/carWizard?year=${year}&brandId=${brandId}&modelId=${modelId}&bodyTypeId=${bodyTypeId}`)
    return response.data.items
  }

  // 6. Get Fuel Types
  static async getFuelTypes(year: number, brandId: number, modelId: number, bodyTypeId: number, transmissionTypeId: number): Promise<FuelType[]> {
    const response = await this.makeRequest<SmartIQResponse<FuelType>>(`/carWizard?year=${year}&brandId=${brandId}&modelId=${modelId}&bodyTypeId=${bodyTypeId}&transmissionTypeId=${transmissionTypeId}`)
    return response.data.items
  }

  // 7. Get Versions
  static async getVersions(year: number, brandId: number, modelId: number, bodyTypeId: number, transmissionTypeId: number, fuelTypeId: number): Promise<Version[]> {
    const response = await this.makeRequest<SmartIQResponse<Version>>(`/carWizard?year=${year}&brandId=${brandId}&modelId=${modelId}&bodyTypeId=${bodyTypeId}&transmissionTypeId=${transmissionTypeId}&fuelTypeId=${fuelTypeId}`)
    return response.data.items
  }

  // 8. Get Equipments
  static async getEquipments(year: number, brandId: number, modelId: number, bodyTypeId: number, transmissionTypeId: number, fuelTypeId: number, versionId: number): Promise<Equipment[]> {
    const response = await this.makeRequest<SmartIQResponse<Equipment>>(`/carWizard?year=${year}&brandId=${brandId}&modelId=${modelId}&bodyTypeId=${bodyTypeId}&transmissionTypeId=${transmissionTypeId}&fuelTypeId=${fuelTypeId}&versionId=${versionId}`)
    return response.data.items
  }

  // 9. Get Pricing
  static async getPricing(request: PricingRequest): Promise<SmartIQPricingResponse> {
    const response = await this.makeRequest<SmartIQPricingResponse>('/offerFromCar', 'POST', {
      auth: {
        apiUser: API_USER,
        apiKey: API_KEY
      },
      carMetadata: {
        year: request.year,
        brandId: request.brandId,
        modelId: request.modelId,
        bodyTypeId: request.bodyTypeId,
        transmissionTypeId: request.transmissionTypeId,
        fuelTypeId: request.fuelTypeId,
        versionId: request.versionId
      },
      kilometer: request.kilometer,
      additionalDamageCost: request.additionalDamageCost,
      damages: request.damages,
      equipments: request.equipments,
      cityCode: request.cityCode
    })
    return response
  }
}

// Damage Section Types
export const DAMAGE_SECTIONS = {
  LEFT_FRONT_FENDER: 'LEFT_FRONT_FENDER', // Sol On Camurluk
  RIGHT_FRONT_FENDER: 'RIGHT_FRONT_FENDER', // Sağ On Camurluk
  LEFT_FRONT_DOOR: 'LEFT_FRONT_DOOR', // Sol On Kapı
  RIGHT_FRONT_DOOR: 'RIGHT_FRONT_DOOR', // Sağ On Kapı
  LEFT_REAR_DOOR: 'LEFT_REAR_DOOR', // Sol Arka Kapı
  RIGHT_REAR_DOOR: 'RIGHT_REAR_DOOR', // Sağ Arka Kapı
  LEFT_REAR_FENDER: 'LEFT_REAR_FENDER', // Sol Arka Camurluk
  RIGHT_REAR_FENDER: 'RIGHT_REAR_FENDER', // Sağ Arka Camurluk
  FRONT_HOOD: 'FRONT_HOOD', // Ön Kaput
  REAR_HOOD: 'REAR_HOOD', // Arka Bagaj Kapağı
  CEILING: 'CEILING' // Tavan
} as const

// Damage States
export const DAMAGE_STATES = {
  SCRATCHED: 'SCRATCHED', // Çizik
  PAINTED: 'PAINTED', // Boyalı
  REPLACED: 'REPLACED' // Değişen
} as const

// Turkish Labels
export const DAMAGE_SECTION_LABELS = {
  [DAMAGE_SECTIONS.LEFT_FRONT_FENDER]: 'Sol Ön Çamurluk',
  [DAMAGE_SECTIONS.RIGHT_FRONT_FENDER]: 'Sağ Ön Çamurluk',
  [DAMAGE_SECTIONS.LEFT_FRONT_DOOR]: 'Sol Ön Kapı',
  [DAMAGE_SECTIONS.RIGHT_FRONT_DOOR]: 'Sağ Ön Kapı',
  [DAMAGE_SECTIONS.LEFT_REAR_DOOR]: 'Sol Arka Kapı',
  [DAMAGE_SECTIONS.RIGHT_REAR_DOOR]: 'Sağ Arka Kapı',
  [DAMAGE_SECTIONS.LEFT_REAR_FENDER]: 'Sol Arka Çamurluk',
  [DAMAGE_SECTIONS.RIGHT_REAR_FENDER]: 'Sağ Arka Çamurluk',
  [DAMAGE_SECTIONS.FRONT_HOOD]: 'Ön Kaput',
  [DAMAGE_SECTIONS.REAR_HOOD]: 'Arka Bagaj Kapağı',
  [DAMAGE_SECTIONS.CEILING]: 'Tavan'
}

export const DAMAGE_STATE_LABELS = {
  [DAMAGE_STATES.SCRATCHED]: 'Çizik',
  [DAMAGE_STATES.PAINTED]: 'Boyalı',
  [DAMAGE_STATES.REPLACED]: 'Değişen'
}
