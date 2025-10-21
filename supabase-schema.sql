-- Any 2. El Veritabanı Şeması
-- KVKK uyumlu veri yapısı

-- Kullanıcılar tablosu
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  kvkk_accepted BOOLEAN DEFAULT FALSE,
  kvkk_accepted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Araç bilgileri tablosu
CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  mileage INTEGER,
  condition VARCHAR(50),
  color VARCHAR(50),
  fuel_type VARCHAR(50),
  transmission VARCHAR(50),
  images TEXT[], -- Görsel URL'leri array olarak
  estimated_value DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Teklifler tablosu
CREATE TABLE offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, rejected, expired
  valid_until TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Hasar bilgileri tablosu
CREATE TABLE damage_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  damage_parts JSONB, -- Hasar parçaları JSON olarak
  total_damage_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- İletişim mesajları tablosu
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread', -- unread, read, replied
  created_at TIMESTAMP DEFAULT NOW()
);

-- SMS/Push bildirimleri tablosu
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL, -- sms, push, email
  title VARCHAR(200),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, sent, failed
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- KVKK onay geçmişi tablosu
CREATE TABLE kvkk_consents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  consent_type VARCHAR(50) NOT NULL, -- data_processing, marketing, analytics
  accepted BOOLEAN NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS (Row Level Security) politikaları
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE damage_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE kvkk_consents ENABLE ROW LEVEL SECURITY;

-- Admin kullanıcıları için özel politika (tüm verilere erişim)
CREATE POLICY "Admin access" ON users FOR ALL USING (true);
CREATE POLICY "Admin access" ON vehicles FOR ALL USING (true);
CREATE POLICY "Admin access" ON offers FOR ALL USING (true);
CREATE POLICY "Admin access" ON damage_reports FOR ALL USING (true);
CREATE POLICY "Admin access" ON contact_messages FOR ALL USING (true);
CREATE POLICY "Admin access" ON notifications FOR ALL USING (true);
CREATE POLICY "Admin access" ON kvkk_consents FOR ALL USING (true);

-- Indexler (performans için)
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_offers_vehicle_id ON offers(vehicle_id);
CREATE INDEX idx_offers_user_id ON offers(user_id);
CREATE INDEX idx_offers_status ON offers(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_kvkk_consents_user_id ON kvkk_consents(user_id);

-- Trigger'lar (updated_at otomatik güncelleme)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON offers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
