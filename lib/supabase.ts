import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface User {
  id: string
  email: string
  phone: string
  name: string
  kvkk_accepted: boolean
  kvkk_accepted_at: string | null
  created_at: string
  updated_at: string
  last_login: string | null
  is_active: boolean
}

export interface Vehicle {
  id: string
  user_id: string
  year: number
  brand: string
  model: string
  mileage: number | null
  condition: string | null
  color: string | null
  fuel_type: string | null
  transmission: string | null
  images: string[]
  estimated_value: number | null
  status: 'pending' | 'approved' | 'rejected'
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Offer {
  id: string
  vehicle_id: string
  user_id: string
  amount: number
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  valid_until: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'sms' | 'push' | 'email'
  title: string | null
  message: string
  status: 'pending' | 'sent' | 'failed'
  sent_at: string | null
  created_at: string
}

export interface KvkkConsent {
  id: string
  user_id: string
  consent_type: 'data_processing' | 'marketing' | 'analytics'
  accepted: boolean
  ip_address: string | null
  user_agent: string | null
  created_at: string
}
