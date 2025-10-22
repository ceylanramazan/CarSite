# 📅 Yarın Yapılacaklar Listesi

## 🔧 **Teknik Kurulumlar**

### 1. **Google Analytics**
- **Gerekli:** Google Analytics hesabı
- **Veri:** Measurement ID (G-XXXXXXXXXX formatında)
- **Kurulum:** Otomatik entegrasyon hazır

### 2. **Google Search Console**
- **Gerekli:** Google hesabı
- **Veri:** Site URL doğrulama
- **Kurulum:** Sitemap otomatik gönderilecek

### 3. **Yandex Metrika**
- **Gerekli:** Yandex hesabı
- **Veri:** Counter ID (8 haneli sayı)
- **Kurulum:** Otomatik entegrasyon hazır

### 4. **Supabase Veritabanı**
- **Gerekli:** Supabase hesabı (GitHub ile)
- **Veri:** Project URL ve API Key
- **Kurulum:** Şema otomatik kurulacak

## 📊 **Gerekli Bilgiler Listesi**

### **Google Analytics:**
- [ ] Google Analytics hesabı oluşturuldu
- [ ] Measurement ID alındı: `G-XXXXXXXXXX`
- [ ] `.env.local` dosyasına eklendi

### **Google Search Console:**
- [ ] Google Search Console hesabı oluşturuldu
- [ ] Site URL doğrulandı: `https://ceylanramazan.github.io/CarSite/`
- [ ] Sitemap gönderildi: `/sitemap.xml`

### **Yandex Metrika:**
- [ ] Yandex hesabı oluşturuldu
- [ ] Counter ID alındı: `12345678`
- [ ] `.env.local` dosyasına eklendi

### **Supabase Veritabanı:**
- [ ] Supabase hesabı oluşturuldu
- [ ] Project oluşturuldu: "Any 2. El"
- [ ] Database password belirlendi
- [ ] Region seçildi: Europe (Frankfurt)
- [ ] Project URL alındı
- [ ] API Key alındı
- [ ] `.env.local` dosyasına eklendi

## 🔑 **Environment Variables (.env.local)**

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Yandex Metrika
NEXT_PUBLIC_YANDEX_COUNTER_ID=12345678

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Site Configuration
NEXT_PUBLIC_SITE_NAME=Any 2. El
NEXT_PUBLIC_SITE_URL=https://ceylanramazan.github.io/CarSite/
```

## 📋 **Adım Adım Kurulum**

### **1. Google Analytics Kurulumu:**
1. [analytics.google.com](https://analytics.google.com) → "Start measuring"
2. Account name: "Any 2. El"
3. Property name: "Any 2. El Website"
4. Reporting time zone: "Turkey"
5. Currency: "Turkish Lira (TRY)"
6. Data stream → Web → URL: `https://ceylanramazan.github.io/CarSite/`
7. **Measurement ID'i kopyalayın**

### **2. Google Search Console:**
1. [search.google.com/search-console](https://search.google.com/search-console)
2. Property type: "URL prefix"
3. URL: `https://ceylanramazan.github.io/CarSite/`
4. Verification method: "HTML tag" veya "Google Analytics"
5. **Verification tamamlayın**

### **3. Yandex Metrika:**
1. [metrika.yandex.com](https://metrika.yandex.com)
2. "Add counter" → "Create counter"
3. Site URL: `https://ceylanramazan.github.io/CarSite/`
4. Site name: "Any 2. El"
5. Time zone: "Europe/Istanbul"
6. **Counter ID'i kopyalayın**

### **4. Supabase Veritabanı:**
1. [supabase.com](https://supabase.com) → "Start your project"
2. GitHub ile giriş yapın
3. "New Project" → "Create new project"
4. Project name: "Any 2. El"
5. Database password: Güçlü şifre oluşturun
6. Region: "Europe (Frankfurt)"
7. **Project URL ve API Key'i kopyalayın**

## 🗄️ **Veritabanı Kurulumu**

### **SQL Şeması Kurulumu:**
1. Supabase Dashboard → **SQL Editor**
2. `supabase-schema.sql` dosyasının içeriğini kopyalayın
3. **Run** butonuna tıklayın
4. Tüm tablolar otomatik oluşturulacak

### **Admin Panel:**
- Otomatik oluşturuluyor
- Kullanıcı yönetimi
- Araç yönetimi
- Teklif yönetimi
- Bildirim sistemi

## 📱 **SMS/Push Entegrasyonu (İsteğe Bağlı)**

### **SMS Servisleri:**
- **Netgsm:** Türk şirketi, KVKK uyumlu
- **Twilio:** Uluslararası, güvenilir
- **Maliyet:** ~0.05 TL/SMS

### **Push Notification:**
- **Firebase Cloud Messaging:** Ücretsiz
- **Web Push API:** Tarayıcı native

### **Email Servisleri:**
- **Resend:** Ücretsiz tier (3,000 email/ay)
- **SendGrid:** Ücretsiz tier (100 email/gün)

## ✅ **Kontrol Listesi**

### **Kurulum Sonrası:**
- [ ] Google Analytics veri geliyor mu?
- [ ] Yandex Metrika veri geliyor mu?
- [ ] Supabase bağlantısı çalışıyor mu?
- [ ] Çerez onay sistemi çalışıyor mu?
- [ ] KVKK onay formu çalışıyor mu?
- [ ] Admin panel erişilebilir mi?

### **Test Edilecekler:**
- [ ] Form gönderimi
- [ ] Veri kaydetme
- [ ] Analytics tracking
- [ ] Çerez onayı
- [ ] KVKK onayı
- [ ] Admin panel

## 🚀 **Sonuç**

Tüm kurulumlar tamamlandığında:
- ✅ Tamamen ücretsiz altyapı
- ✅ KVKK uyumlu veri yönetimi
- ✅ Analytics ve tracking
- ✅ Admin panel
- ✅ SMS/Push hazırlığı
- ✅ Ölçeklenebilir yapı

**Yarın sadece bu bilgileri alıp entegre edeceğiz!** 🎉
