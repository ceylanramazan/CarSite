import { Card, CardContent } from '@/components/ui/card'

export default function GizlilikPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-secondary">
        Gizlilik Politikası
      </h1>

      <Card>
        <CardContent className="prose max-w-none p-8">
          <section>
            <h2>1. Giriş</h2>
            <p>
              CarSite olarak, kullanıcılarımızın gizliliğine önem veriyoruz. Bu
              gizlilik politikası, web sitemizi ziyaret ettiğinizde veya
              hizmetlerimizi kullandığınızda kişisel bilgilerinizi nasıl
              topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.
            </p>
          </section>

          <section>
            <h2>2. Topladığımız Bilgiler</h2>
            <p>
              Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul>
              <li>Ad, soyad ve iletişim bilgileri (telefon, e-posta)</li>
              <li>Araç bilgileri (marka, model, yıl, kilometre vb.)</li>
              <li>Lokasyon bilgileri</li>
              <li>IP adresi ve tarayıcı bilgileri</li>
              <li>Çerez bilgileri</li>
            </ul>
          </section>

          <section>
            <h2>3. Bilgilerin Kullanımı</h2>
            <p>
              Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
            </p>
            <ul>
              <li>Araç alım satım hizmetlerini sağlamak</li>
              <li>Müşteri desteği sunmak</li>
              <li>Hizmetlerimizi geliştirmek</li>
              <li>Pazarlama ve tanıtım faaliyetleri yürütmek</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>
          </section>

          <section>
            <h2>4. Bilgi Güvenliği</h2>
            <p>
              Kişisel bilgilerinizi korumak için endüstri standardı güvenlik
              önlemleri kullanıyoruz. Bilgileriniz şifrelenmiş bağlantılar
              (SSL) üzerinden iletilir ve güvenli sunucularda saklanır.
            </p>
          </section>

          <section>
            <h2>5. Çerezler</h2>
            <p>
              Web sitemiz, kullanıcı deneyimini geliştirmek için çerezler
              kullanır. Çerezler, tarayıcınız tarafından bilgisayarınızda
              saklanan küçük metin dosyalarıdır. Çerez kullanımını tarayıcı
              ayarlarınızdan kontrol edebilirsiniz.
            </p>
          </section>

          <section>
            <h2>6. Üçüncü Taraf Bağlantıları</h2>
            <p>
              Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir.
              Bu sitelerin gizlilik politikalarından sorumlu değiliz.
              Ziyaret ettiğiniz her sitenin gizlilik politikasını okumanızı
              öneririz.
            </p>
          </section>

          <section>
            <h2>7. Bilgi Paylaşımı</h2>
            <p>
              Kişisel bilgilerinizi yasal zorunluluklar dışında üçüncü taraflarla
              paylaşmayız. Hizmetlerimizi sağlamak için güvenilir iş
              ortaklarımızla sınırlı bilgi paylaşımı yapabiliriz.
            </p>
          </section>

          <section>
            <h2>8. Kullanıcı Hakları</h2>
            <p>
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul>
              <li>Kişisel verilerinize erişim talep etme</li>
              <li>Yanlış veya eksik bilgilerin düzeltilmesini isteme</li>
              <li>Kişisel verilerinizin silinmesini talep etme</li>
              <li>Veri işleme faaliyetlerine itiraz etme</li>
            </ul>
          </section>

          <section>
            <h2>9. Çocukların Gizliliği</h2>
            <p>
              Hizmetlerimiz 18 yaş altındaki kişilere yönelik değildir. Bilinçli
              olarak 18 yaş altındaki kişilerden bilgi toplamıyoruz.
            </p>
          </section>

          <section>
            <h2>10. Değişiklikler</h2>
            <p>
              Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli
              değişiklikler yapıldığında, web sitemizde duyuru yaparak sizi
              bilgilendireceğiz.
            </p>
          </section>

          <section>
            <h2>11. İletişim</h2>
            <p>
              Gizlilik politikamız hakkında sorularınız varsa, lütfen bizimle
              iletişime geçin:
            </p>
            <ul>
              <li>E-posta: info@carsite.com</li>
              <li>Telefon: 0544 927 53 28</li>
              <li>Adres: Levent Mahallesi, Cömert Sokak No:1, Beşiktaş, İstanbul</li>
            </ul>
          </section>

          <p className="mt-8 text-sm text-gray-500">
            Son Güncelleme: 11 Ekim 2025
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

