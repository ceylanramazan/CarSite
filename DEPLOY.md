# 🚀 Deployment Guide

Bu dokümantasyon CarSite projesini farklı platformlara deploy etmek için adım adım rehber sunar.

## 📋 Ön Hazırlık

Deploy işlemi öncesi şu adımları tamamlayın:

1. **Environment değişkenlerini ayarlayın:**
```bash
cp .env.example .env
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Production build oluşturun:**
```bash
npm run build
```

## 🌐 GitHub Pages Deployment

### 1. GitHub Repository Ayarları

1. GitHub repository'nizi oluşturun (zaten varsa atlayın)
2. Repository Settings > Pages bölümüne gidin
3. Source olarak "GitHub Actions" seçin

### 2. GitHub Secrets Ekleyin

Repository Settings > Secrets and variables > Actions > New repository secret

Eklenecek secret:
- `NEXT_PUBLIC_API_BASE_URL`: API endpoint URL'iniz

### 3. Deploy

Kod `main` branch'e push edildiğinde otomatik deploy olur:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Deploy edilen site: `https://[kullanici_adi].github.io/CarSite`

## ▲ Vercel Deployment

### 1. Vercel CLI Kurulumu

```bash
npm i -g vercel
```

### 2. Proje Deploy

```bash
vercel
```

### 3. Environment Variables

Vercel dashboard üzerinden şu değişkenleri ekleyin:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`

### 4. Production Deploy

```bash
vercel --prod
```

## 🚢 Netlify Deployment

### 1. Netlify CLI Kurulumu

```bash
npm install -g netlify-cli
```

### 2. Build Ayarları

`netlify.toml` dosyası zaten projede mevcut:

```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Deploy

```bash
netlify deploy --prod
```

## 🐳 Docker Deployment

### 1. Docker Image Oluşturma

```bash
docker build -t carsite .
```

### 2. Container Çalıştırma

```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=your_api_url carsite
```

## 📱 Environment Variables

Tüm platformlarda şu environment değişkenlerini ayarlayın:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | API base URL | `https://api.example.com/v1` |
| `NEXT_PUBLIC_SITE_URL` | Site URL | `https://carsite.com` |
| `NEXT_PUBLIC_SITE_NAME` | Site adı | `CarSite` |

## 🔍 Deploy Sonrası Kontroller

✅ Ana sayfa düzgün yükleniyor mu?
✅ Araç listesi görüntüleniyor mu?
✅ Form gönderimi çalışıyor mu?
✅ Responsive tasarım mobilde çalışıyor mu?
✅ Tüm linkler doğru yönlendiriyor mu?
✅ API çağrıları başarılı mı?

## 🐛 Troubleshooting

### GitHub Pages 404 Hatası

`.nojekyll` dosyasının `public/` klasöründe olduğundan emin olun.

### Vercel Build Hatası

- Node.js versiyonunu kontrol edin (18+ olmalı)
- Environment variables'ı kontrol edin

### API CORS Hatası

API sunucunuzda CORS ayarlarını kontrol edin:

```javascript
Access-Control-Allow-Origin: https://your-domain.com
```

## 📊 Performance Monitoring

Deploy sonrası performansı izleyin:

- Google Lighthouse (Chrome DevTools)
- Vercel Analytics
- Google Analytics
- Sentry (Error tracking)

## 🔄 CI/CD Pipeline

GitHub Actions workflow'u otomatik olarak:

1. ✅ Linting kontrolü yapar
2. 🏗️ Build oluşturur
3. 🚀 Deploy eder

Workflow durumunu kontrol edin:
```
https://github.com/[username]/CarSite/actions
```

## 📞 Support

Sorunlarla karşılaşırsanız:
- GitHub Issues açın
- [email@example.com](mailto:email@example.com) adresine yazın

