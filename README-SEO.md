# SEO ve Analytics Kurulum Rehberi

## 🔍 Google Search Console

### 1. Google Search Console Hesabı
1. [Google Search Console](https://search.google.com/search-console/) adresine gidin
2. "Start now" butonuna tıklayın
3. Property type: "URL prefix"
4. URL: `https://ceylanramazan.github.io/CarSite/`
5. Verification method: "HTML tag" veya "Google Analytics"

### 2. Verification
- HTML tag method kullanıyorsanız, meta tag'i `app/layout.tsx`'e ekleyeceğiz
- Google Analytics method kullanıyorsanız, GA kurulumu yeterli

### 3. Sitemap Gönderme
- Sitemap URL: `https://ceylanramazan.github.io/CarSite/sitemap.xml`
- Search Console'da "Sitemaps" bölümüne ekleyin

## 📊 Yandex Metrika

### 1. Yandex Metrika Hesabı
1. [Yandex Metrika](https://metrika.yandex.com/) adresine gidin
2. "Add counter" butonuna tıklayın
3. Site URL: `https://ceylanramazan.github.io/CarSite/`
4. Site name: "Any 2. El"
5. Time zone: "Europe/Istanbul"

### 2. Counter ID Alma
- Counter oluşturduktan sonra **Counter ID** alacaksınız
- Format: `12345678` (8 haneli sayı)
- Bu ID'yi `.env.local` dosyasına ekleyeceğiz

### 3. Environment Variable Ekleme
`.env.local` dosyasına şunu ekleyin:
```
NEXT_PUBLIC_YANDEX_COUNTER_ID=12345678
```

## 🗺️ Sitemap ve Robots.txt

### 1. Sitemap
- Otomatik oluşturuluyor: `/sitemap.xml`
- Tüm sayfalar dahil
- Priority ve change frequency ayarlanmış

### 2. Robots.txt
- Otomatik oluşturuluyor: `/robots.txt`
- Sitemap referansı dahil
- API ve admin sayfaları engellenmiş

## 🎯 Takip Edilecek Veriler

### Google Analytics
- Sayfa görüntülemeleri
- Kullanıcı davranışları
- Form gönderimleri
- Buton tıklamaları

### Yandex Metrika
- Sayfa görüntülemeleri
- Kullanıcı etkileşimleri
- Form gönderimleri
- External link tıklamaları
- File downloads

## 📈 Yarın Yapılacaklar

1. **Google Search Console:**
   - Hesap oluşturma
   - Property ekleme
   - Verification
   - Sitemap gönderme

2. **Yandex Metrika:**
   - Hesap oluşturma
   - Counter ID alma
   - `.env.local` dosyasına ekleme

3. **Test ve Doğrulama:**
   - Her iki platformda veri gelişini kontrol etme
   - Real-time tracking test etme

## 🔧 Teknik Detaylar

- **Google Analytics**: GA4 (Google Analytics 4)
- **Yandex Metrika**: Webvisor, Clickmap, TrackLinks aktif
- **SEO**: Sitemap, Robots.txt, Meta tags
- **Performance**: Lazy loading ile optimize edilmiş
- **Privacy**: GDPR uyumlu
