# SmartIQ API Entegrasyonu

Bu dokümantasyon, Any 2. El projesinde SmartIQ API entegrasyonunu açıklar.

## 📋 Genel Bakış

SmartIQ API, araç değerlendirme ve fiyatlandırma için kullanılan profesyonel bir servistir. Bu entegrasyon ile kullanıcılar araçlarının gerçek piyasa değerini öğrenebilir.

## 🔧 Kurulum

### 1. Environment Variables

`.env.local` dosyanıza aşağıdaki değişkenleri ekleyin:

```bash
# SmartIQ API Configuration
SMARTIQ_API_USER=your_smartiq_email@example.com
SMARTIQ_API_KEY=your_smartiq_api_key
```

### 2. API Endpoints

Proje aşağıdaki API endpoint'lerini içerir:

- `GET /api/smartiq/years` - Model yıllarını getir
- `POST /api/smartiq/brands` - Markaları getir
- `POST /api/smartiq/models` - Modelleri getir
- `POST /api/smartiq/body-types` - Kasa tiplerini getir
- `POST /api/smartiq/transmission-types` - Vites tiplerini getir
- `POST /api/smartiq/fuel-types` - Yakıt tiplerini getir
- `POST /api/smartiq/versions` - Versiyonları getir
- `POST /api/smartiq/equipments` - Donanımları getir
- `POST /api/smartiq/pricing` - Fiyatlandırma yap

## 🚀 Kullanım

### SmartIQForm Komponenti

```tsx
import SmartIQForm from '@/components/smartiq/SmartIQForm'

function MyPage() {
  const handlePricingResult = (result) => {
    console.log('Pricing result:', result)
  }

  return (
    <SmartIQForm onPricingResult={handlePricingResult} />
  )
}
```

### API Kullanımı

```typescript
import { SmartIQAPI } from '@/lib/smartiq-api'

// Yılları getir
const years = await SmartIQAPI.getYears()

// Markaları getir
const brands = await SmartIQAPI.getBrands(2020)

// Fiyatlandırma yap
const pricing = await SmartIQAPI.getPricing({
  year: 2020,
  brandId: 123,
  modelId: 456,
  bodyTypeId: 789,
  transmissionTypeId: 101,
  fuelTypeId: 202,
  versionId: 303,
  kilometer: 50000
})
```

## 📊 Fiyatlandırma Sonuçları

SmartIQ API aşağıdaki fiyat türlerini döndürür:

- **quickSellPrice**: Hızlı satış fiyatı
- **aboveMarketPrice**: Piyasa üstü fiyat
- **retailPrice**: Perakende fiyat
- **galleryPriceUp**: Galeri fiyat üst limit
- **galleryPriceDown**: Galeri fiyat alt limit

## 🔍 Hasar Değerlendirmesi

API, araç hasarlarını değerlendirmek için aşağıdaki bölümleri destekler:

### Hasar Bölümleri
- `LEFT_FRONT_FENDER` - Sol Ön Çamurluk
- `RIGHT_FRONT_FENDER` - Sağ Ön Çamurluk
- `LEFT_FRONT_DOOR` - Sol Ön Kapı
- `RIGHT_FRONT_DOOR` - Sağ Ön Kapı
- `LEFT_REAR_DOOR` - Sol Arka Kapı
- `RIGHT_REAR_DOOR` - Sağ Arka Kapı
- `LEFT_REAR_FENDER` - Sol Arka Çamurluk
- `RIGHT_REAR_FENDER` - Sağ Arka Çamurluk
- `FRONT_HOOD` - Ön Kaput
- `REAR_HOOD` - Arka Bagaj Kapağı
- `CEILING` - Tavan

### Hasar Durumları
- `SCRATCHED` - Çizik
- `PAINTED` - Boyalı
- `REPLACED` - Değişen

## ⚠️ Hata Yönetimi

API aşağıdaki hata kodlarını döndürebilir:

- `401` - Yetkisiz kullanıcı
- `402` - Yetersiz bakiye
- `400` - Eksik parametreler
- `400` - Geçersiz model yılı
- `400` - Geçersiz kilometre
- `400` - Araç bulunamadı
- `400` - Geçersiz hasar bilgisi
- `429` - Çok fazla istek
- `400` - Geçersiz şehir kodu

## 🔒 Güvenlik

- API anahtarları environment variables'da saklanır
- Tüm istekler HTTPS üzerinden yapılır
- Hata mesajları kullanıcıya güvenli şekilde gösterilir

## 📝 Notlar

- API test ve production ortamları için farklı URL'ler kullanır
- Kilometre değeri 0-1,000,000 arasında olmalıdır
- Model yılı 1990 ile güncel yıl arasında olmalıdır
- Şehir kodu 1-81 arasında olmalıdır (Türkiye plaka kodları)

## 🛠️ Geliştirme

Yeni özellikler eklemek için:

1. `lib/smartiq-api.ts` dosyasına yeni fonksiyonlar ekleyin
2. İlgili API route'unu oluşturun
3. Frontend komponentini güncelleyin
4. Test edin

## 📞 Destek

SmartIQ API ile ilgili sorunlar için:
- API dokümantasyonu: SmartIQ resmi dokümantasyonu
- Teknik destek: SmartIQ destek ekibi
