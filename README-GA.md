# Google Analytics Kurulum Rehberi

## 📊 Kurulum Adımları

### 1. Google Analytics Hesabı Oluşturma
1. [Google Analytics](https://analytics.google.com/) adresine gidin
2. "Start measuring" butonuna tıklayın
3. Account name: "Any 2. El"
4. Property name: "Any 2. El Website"
5. Reporting time zone: "Turkey"
6. Currency: "Turkish Lira (TRY)"

### 2. Property Ayarları
1. **Data stream** oluşturun
2. **Platform**: Web
3. **Website URL**: `https://ceylanramazan.github.io/CarSite/`
4. **Stream name**: "Any 2. El Website"

### 3. Measurement ID Alma
- Data stream oluşturduktan sonra **Measurement ID** alacaksınız
- Format: `G-XXXXXXXXXX`
- Bu ID'yi `.env.local` dosyasına ekleyeceğiz

### 4. Environment Variable Ekleme
`.env.local` dosyası oluşturun ve şunu ekleyin:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 5. Test Etme
- Siteyi çalıştırın: `npm run dev`
- Google Analytics'te "Realtime" bölümünü kontrol edin
- Siteyi ziyaret ettiğinizde veri gelmeye başlamalı

## 🎯 Takip Edilecek Eventler

### Otomatik Takip
- Sayfa görüntülemeleri
- Site ziyaretleri
- Kullanıcı davranışları

### Özel Eventler
- Form gönderimleri
- Buton tıklamaları
- Telefon numarası tıklamaları
- Email tıklamaları

## 📈 Yarın Yapılacaklar

1. Google Analytics hesabı oluşturma
2. Measurement ID alma
3. `.env.local` dosyasına ekleme
4. Test etme ve doğrulama

## 🔧 Teknik Detaylar

- **Framework**: Next.js 14
- **Analytics**: Google Analytics 4 (GA4)
- **Privacy**: GDPR uyumlu
- **Performance**: Lazy loading ile optimize edilmiş
