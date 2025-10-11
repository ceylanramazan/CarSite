import axios from 'axios'
import type {
  OfferPayload,
  OfferResponse,
  CarBuyDTO,
  PurchasePayload,
  PurchaseResponse,
  CarFilters,
} from '@/types'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Araç Satış Teklif API
export const submitOffer = async (
  data: OfferPayload
): Promise<OfferResponse> => {
  const response = await apiClient.post<OfferResponse>('/offers', data)
  return response.data
}

// Araç Listeleme API
export const getCars = async (
  filters?: CarFilters,
  page: number = 1
): Promise<CarBuyDTO[]> => {
  const params = {
    forSale: true,
    page,
    ...filters,
  }
  const response = await apiClient.get<CarBuyDTO[]>('/cars', { params })
  return response.data
}

// Tek Araç Detayı API
export const getCarById = async (id: number): Promise<CarBuyDTO> => {
  const response = await apiClient.get<CarBuyDTO>(`/cars/${id}`)
  return response.data
}

// Satın Alma API
export const submitPurchase = async (
  data: PurchasePayload
): Promise<PurchaseResponse> => {
  const response = await apiClient.post<PurchaseResponse>('/purchases', data)
  return response.data
}

// İletişim Formu API
export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export const submitContactForm = async (
  data: ContactFormData
): Promise<{ status: string; message: string }> => {
  const response = await apiClient.post('/contact', data)
  return response.data
}

