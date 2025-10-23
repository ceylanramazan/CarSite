import { z } from 'zod'

export const vehicleSchema = z.object({
  brand: z.string().min(1, 'Marka seçimi zorunludur'),
  model: z.string().min(1, 'Model seçimi zorunludur'),
  year: z
    .number()
    .min(1990, 'Yıl 1990 veya sonrası olmalıdır')
    .max(new Date().getFullYear() + 1, 'Geçerli bir yıl giriniz'),
  km: z.number().min(0, 'Kilometre bilgisi zorunludur ve 0\'dan küçük olamaz'),
  city: z.string().min(1, 'Şehir seçimi zorunludur'),
  plate: z.string().optional(),
  // SmartIQ API fields - these are now the main fields
  bodyType: z.string().min(1, 'Kasa tipi seçimi zorunludur'),
  transmissionType: z.string().min(1, 'Vites tipi seçimi zorunludur'),
  fuelType: z.string().min(1, 'Yakıt tipi seçimi zorunludur'),
  version: z.string().min(1, 'Versiyon seçimi zorunludur'),
  equipments: z.array(z.string()).optional(),
  // Legacy fields for backward compatibility
  fuel_type: z.string().optional(),
  gearbox: z.string().optional(),
})

export const damageSchema = z.object({
  has_damage: z.boolean(),
  changed_parts: z.array(z.string()).optional(),
  description: z.string().optional(),
})

export const expertiseSchema = z.object({
  has_expertise: z.boolean(),
  expertise_company: z.string().optional(),
  expertise_date: z.string().optional(),
  expertise_score: z.number().min(0, 'Ekspertiz puanı 0\'dan küçük olamaz').max(100, 'Ekspertiz puanı 100\'den büyük olamaz').optional(),
  expertise_report: z.string().optional(),
  tramer_check: z.boolean(),
  maintenance_records: z.boolean(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  phone: z
    .string()
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .regex(/^[0-9+\s()-]+$/, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  kvkk: z.boolean().refine((val) => val === true, {
    message: 'KVKK metnini onaylamanız gerekmektedir',
  }),
})

export const purchaseSchema = z.object({
  buyer_name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  buyer_phone: z
    .string()
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .regex(/^[0-9+\s()-]+$/, 'Geçerli bir telefon numarası giriniz'),
  buyer_email: z.string().email('Geçerli bir email adresi giriniz'),
  city: z.string().min(1, 'Şehir seçimi zorunludur'),
  delivery_option: z.enum(['pickup', 'delivery']),
  kvkk_consent: z.boolean().refine((val) => val === true, {
    message: 'KVKK metnini onaylamanız gerekmektedir',
  }),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  phone: z
    .string()
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .regex(/^[0-9+\s()-]+$/, 'Geçerli bir telefon numarası giriniz'),
  subject: z.string().min(3, 'Konu en az 3 karakter olmalıdır'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
})

