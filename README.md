# 🚗 Any 2. El - Modern Araç Alım Satım Platformu

Modern, hızlı ve kullanıcı dostu bir araç alım-satım web sitesi. Next.js, TypeScript, Tailwind CSS ve shadcn/ui ile geliştirilmiştir.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌟 Özellikler

- ✅ **Modern UI/UX**: shadcn/ui ile profesyonel ve estetik tasarım
- ✅ **Araç Sat Akışı**: 5 adımlı form ile kolay araç satış süreci
- ✅ **Araç Al Akışı**: Filtreli listeleme, detay ve satın alma
- ✅ **Form Validasyonu**: React Hook Form + Zod ile güçlü validasyon
- ✅ **State Yönetimi**: TanStack Query (React Query)
- ✅ **Animasyonlar**: Framer Motion ile akıcı geçişler
- ✅ **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- ✅ **SEO Optimized**: Next.js App Router ile SEO dostu yapı
- ✅ **TypeScript**: Tip güvenli kod yapısı
- ✅ **SOLID Prensipler**: Temiz ve bakımı kolay kod mimarisi

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Repoyu klonlayın:**
```bash
git clone https://github.com/ceylanramazan/CarSite.git
cd CarSite
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın:**
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com/v1
NEXT_PUBLIC_SITE_URL=https://ceylanramazan.github.io/CarSite
NEXT_PUBLIC_SITE_NAME=Any 2. El
```

4. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📦 Build & Deploy

### Production Build

```bash
npm run build
```

### Build'i Çalıştırma

```bash
npm start
```

### GitHub Pages Deploy

Projeyi GitHub Pages'e deploy etmek için:

```bash
npm run build
```

Oluşan `out` klasörü GitHub Pages'e otomatik deploy edilir.

## 🏗️ Proje Yapısı

```
Any 2. El/
├── app/                      # Next.js App Router sayfaları
│   ├── page.tsx             # Anasayfa
│   ├── teklif-al/           # Araç Sat akışı (5 adım)
│   ├── arac-al/             # Araç Al akışı
│   ├── blog/                # Blog sayfaları
│   ├── hakkimizda/          # Hakkımızda
│   ├── iletisim/            # İletişim
│   ├── kvkk/                # KVKK
│   └── gizlilik/            # Gizlilik
├── components/              # React bileşenleri
│   ├── ui/                  # shadcn/ui bileşenleri
│   ├── layout/              # Layout bileşenleri
│   ├── home/                # Anasayfa bileşenleri
│   ├── forms/               # Form bileşenleri
│   └── stepper/             # Stepper bileşeni
├── contexts/                # React Context API
├── lib/                     # Utility fonksiyonlar
│   ├── apiClient.ts         # API client
│   ├── mockApi.ts           # Mock data
│   ├── validations.ts       # Zod şemaları
│   └── constants.ts         # Sabitler
├── types/                   # TypeScript tipleri
└── public/                  # Statik dosyalar
```

## 🛠️ Teknolojiler

### Core
- **[Next.js 14](https://nextjs.org/)** - React framework (App Router)
- **[TypeScript](https://www.typescriptlang.org/)** - Tip güvenli JavaScript
- **[React 18](https://react.dev/)** - UI kütüphanesi

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - İkon kütüphanesi

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Form yönetimi
- **[Zod](https://zod.dev/)** - Schema validation

### State Management
- **[TanStack Query](https://tanstack.com/query)** - Server state yönetimi

### Animation
- **[Framer Motion](https://www.framer.com/motion/)** - Animasyon kütüphanesi

### HTTP Client
- **[Axios](https://axios-http.com/)** - HTTP client

## 📱 Sayfa Yapısı

### Ana Akışlar

#### 1️⃣ Araç Sat (Teklif Al)
1. **Araç Bilgileri** - Marka, model, yıl, km, yakıt, vites
2. **Hasar Bilgileri** - Hasar durumu ve değişen parçalar
3. **İletişim** - Ad, telefon, e-posta, KVKK onayı
4. **Özet** - Bilgilerin kontrolü
5. **Başarılı** - Onay ekranı

#### 2️⃣ Araç Al (Satın Alma)
1. **Listeleme** - Filtreli araç listesi
2. **Detay** - Araç detayları ve galeri
3. **Satın Al Formu** - İletişim ve teslimat bilgileri
4. **Başarılı** - Onay ekranı

### Statik Sayfalar
- **Anasayfa** - Hero, özellikler, süreç, CTA
- **Hakkımızda** - Şirket bilgileri
- **Blog** - Blog yazıları
- **İletişim** - İletişim formu
- **KVKK** - Aydınlatma metni
- **Gizlilik** - Gizlilik politikası

## 🔌 API Entegrasyonu

Proje, dışarıdan sağlanacak bir API ile çalışacak şekilde tasarlanmıştır.

### API Endpoints

#### Teklif Gönderme
```typescript
POST /offers
{
  "vehicle": { ... },
  "damage": { ... },
  "contact": { ... }
}
```

#### Araç Listeleme
```typescript
GET /cars?forSale=true&page=1&brand=Opel
```

#### Satın Alma
```typescript
POST /purchases
{
  "car_id": 101,
  "buyer_name": "...",
  ...
}
```

### Mock API

Geliştirme aşamasında mock data kullanılmaktadır. `lib/mockApi.ts` dosyasında mock veriler bulunur.

## 🧪 Testing

```bash
npm test          # Testleri çalıştır
npm run test:watch # Watch modunda test
```

## 📝 Kod Standartları

### Linting
```bash
npm run lint      # ESLint kontrolü
```

### Formatting
```bash
npm run format    # Prettier ile formatlama (elle kurmanız gerekebilir)
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: #0ea5e9 (Turkuaz-mavi)
- **Secondary**: #1e293b (Koyu lacivert)
- **Background**: #f8fafc (Açık gri)
- **Accent**: #22c55e (Yeşil)

### Font
- **Inter** - Google Fonts

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Ramazan Ceylan**
- GitHub: [@ceylanramazan](https://github.com/ceylanramazan)
- Demo: [https://ceylanramazan.github.io/CarSite](https://ceylanramazan.github.io/CarSite)

## 🙏 Teşekkürler

- [Next.js Team](https://nextjs.org/)
- [shadcn](https://twitter.com/shadcn) - shadcn/ui için
- [Vercel](https://vercel.com/) - Hosting için

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

