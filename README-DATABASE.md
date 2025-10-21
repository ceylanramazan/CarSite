# 🗄️ Veritabanı Kurulum Rehberi

## 📊 Supabase Kurulumu

### 1. Supabase Hesabı Oluşturma
1. [Supabase.com](https://supabase.com) → "Start your project"
2. **GitHub ile giriş** (ücretsiz)
3. **New Project** → "Create new project"
4. **Project name:** "Any 2. El"
5. **Database password:** Güçlü şifre oluşturun
6. **Region:** Europe (Frankfurt) - Türkiye'ye en yakın

### 2. Veritabanı Şeması Kurulumu
1. Supabase Dashboard → **SQL Editor**
2. `supabase-schema.sql` dosyasının içeriğini kopyalayın
3. **Run** butonuna tıklayın
4. Tüm tablolar ve indexler oluşturulacak

### 3. Environment Variables
`.env.local` dosyasına ekleyin:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📋 Veri Yapısı

### **Kullanıcılar (users)**
- Kişisel bilgiler
- KVKK onay durumu
- İletişim bilgileri

### **Araçlar (vehicles)**
- Araç özellikleri
- Görseller
- Değerlendirme durumu

### **Teklifler (offers)**
- Teklif miktarları
- Geçerlilik süreleri
- Durum takibi

### **Hasar Raporları (damage_reports)**
- Hasar parçaları
- Hasar skorları
- Detaylı bilgiler

### **İletişim Mesajları (contact_messages)**
- Müşteri mesajları
- Durum takibi
- Yanıt geçmişi

### **Bildirimler (notifications)**
- SMS/Push/Email
- Gönderim durumu
- Toplu mesajlar

### **KVKK Onayları (kvkk_consents)**
- Onay türleri
- IP adresi
- Zaman damgası

## 🔐 Güvenlik

### **Row Level Security (RLS)**
- Tüm tablolarda aktif
- Admin erişimi özel politika
- Kullanıcı verileri izole

### **KVKK Uyumluluğu**
- Onay kayıtları
- Silme hakkı
- Veri portabilitesi
- Şeffaflık

## 📱 Admin Panel Özellikleri

### **Kullanıcı Yönetimi**
- Tüm kayıtlı kullanıcılar
- KVKK onay durumları
- İletişim bilgileri
- Son giriş tarihleri

### **Araç Yönetimi**
- Gelen teklifler
- Araç detayları
- Görseller
- Değerlendirme durumu

### **Teklif Yönetimi**
- Teklif geçmişi
- Onay/Red işlemleri
- Geçerlilik takibi
- Müşteri iletişimi

### **Bildirim Sistemi**
- Toplu SMS gönderimi
- Push notification
- Email kampanyaları
- Gönderim raporları

## 💰 Maliyet

### **Supabase Ücretsiz Tier**
- **Veritabanı:** 500MB
- **Storage:** 1GB
- **Bandwidth:** 2GB
- **API Calls:** 50,000/ay
- **Realtime:** 200 concurrent connections

### **Tahmini Kullanım**
- **1000 kullanıcı:** ~50MB veritabanı
- **10,000 araç:** ~200MB veritabanı
- **1,000,000 API call:** ~20GB bandwidth

## 🚀 SMS/Push Entegrasyonu

### **SMS Servisleri**
- **Netgsm:** Türk şirketi, KVKK uyumlu
- **Twilio:** Uluslararası, güvenilir
- **Maliyet:** ~0.05 TL/SMS

### **Push Notification**
- **Firebase Cloud Messaging:** Ücretsiz
- **Web Push API:** Tarayıcı native
- **Maliyet:** Ücretsiz

### **Email Servisleri**
- **Resend:** Ücretsiz tier (3,000 email/ay)
- **SendGrid:** Ücretsiz tier (100 email/gün)
- **Maliyet:** Başlangıçta ücretsiz

## 📊 Raporlama

### **Otomatik Raporlar**
- Günlük kullanıcı sayıları
- Aylık teklif istatistikleri
- Hasar analiz raporları
- Gelir raporları

### **Dashboard Özellikleri**
- Gerçek zamanlı veriler
- Grafik ve çizelgeler
- Filtreleme seçenekleri
- Excel export

## 🔧 Teknik Detaylar

### **API Endpoints**
- REST API otomatik oluşturuluyor
- GraphQL desteği
- Real-time subscriptions
- File upload/storage

### **Güvenlik**
- SSL/TLS şifreleme
- JWT token authentication
- Rate limiting
- CORS yapılandırması

### **Performans**
- PostgreSQL veritabanı
- Otomatik indexleme
- Connection pooling
- Query optimization
