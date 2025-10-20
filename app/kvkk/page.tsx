import { Card, CardContent } from '@/components/ui/card'

export default function KVKKPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-secondary">
        KVKK Aydınlatma Metni
      </h1>

      <Card>
        <CardContent className="prose max-w-none p-8">
          <section>
            <h2>1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca,
              kişisel verileriniz; veri sorumlusu olarak Any 2. El tarafından
              aşağıda açıklanan kapsamda işlenebilecektir.
            </p>
          </section>

          <section>
            <h2>2. Kişisel Verilerin Hangi Amaçla İşleneceği</h2>
            <p>
              Toplanan kişisel verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde
              belirtilen kişisel veri işleme şartları ve amaçları dahilinde:
            </p>
            <ul>
              <li>Müşteri hizmetlerinin yürütülmesi</li>
              <li>Araç alım satım süreçlerinin gerçekleştirilmesi</li>
              <li>İletişim faaliyetlerinin yürütülmesi</li>
              <li>Sözleşme süreçlerinin yürütülmesi</li>
              <li>Ticari ve iş stratejilerinin planlanması ve icrası</li>
              <li>Pazarlama analiz çalışmalarının yürütülmesi</li>
            </ul>
            <p>amaçlarıyla işlenebilecektir.</p>
          </section>

          <section>
            <h2>3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
            <p>
              Toplanan kişisel verileriniz; KVKK&apos;nın 8. ve 9. maddelerinde
              belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde,
              iş ortaklarımıza, tedarikçilerimize, hissedarlarımıza, kanunen
              yetkili kamu kurumları ve özel kişilere aktarılabilecektir.
            </p>
          </section>

          <section>
            <h2>4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
            <p>
              Kişisel verileriniz, web sitemiz, mobil uygulamamız, çağrı merkezi,
              e-posta ve benzeri elektronik kanallar aracılığıyla sözlü, yazılı
              veya elektronik ortamda toplanmaktadır.
            </p>
          </section>

          <section>
            <h2>5. Kişisel Veri Sahibinin KVKK&apos;nın 11. Maddesinde Sayılan Hakları</h2>
            <p>
              Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi
              aşağıdaki yöntemlerle tarafımıza iletebilirsiniz:
            </p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
              <li>Kişisel verilerin düzeltilmesi, silinmesi veya yok edilmesi halinde bu işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
            </ul>
          </section>

          <section>
            <h2>6. İletişim</h2>
            <p>
              Yukarıda belirtilen haklarınızı kullanmak için info@carsite.com
              adresine e-posta gönderebilir veya 0544 927 53 28 numaralı
              telefondan bize ulaşabilirsiniz.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

