import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function generateStaticParams() {
  return [
    { slug: 'arac-satin-alirken-dikkat-edilmesi-gerekenler' },
    { slug: 'aracinizin-degerini-artirmak-icin-5-ipucu' },
    { slug: 'elektrikli-araclarin-gelecegi' },
    { slug: 'arac-bakimi-nasil-yapilir' },
  ]
}

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  // Mock blog post - gerçek uygulamada API'den çekilecek
  const post = {
    title: 'Araç Satın Alırken Dikkat Edilmesi Gerekenler',
    author: 'Ahmet Yılmaz',
    date: '15 Ekim 2025',
    category: 'Rehber',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200',
    content: `
      <p>İkinci el araç satın almak önemli bir karardır ve doğru adımları atarak hem zaman hem de para tasarrufu sağlayabilirsiniz. İşte araç satın alırken dikkat etmeniz gereken önemli noktalar:</p>

      <h2>1. Aracın Geçmişini Kontrol Edin</h2>
      <p>Aracın geçmişini öğrenmek için ekspertiz raporu almak şarttır. Bu rapor size aracın hasar durumu, kilometre doğruluğu ve genel durumu hakkında bilgi verir.</p>

      <h2>2. Test Sürüşü Yapın</h2>
      <p>Hiçbir zaman test sürüşü yapmadan araç satın almayın. Test sürüşü sırasında motor sesi, direksiyon hassasiyeti, fren performansı gibi detayları kontrol edin.</p>

      <h2>3. Fiyat Araştırması Yapın</h2>
      <p>Benzer özelliklere sahip araçların piyasa fiyatlarını araştırın. Bu size pazarlık yaparken avantaj sağlar.</p>

      <h2>4. Yasal Evrakları Kontrol Edin</h2>
      <p>Aracın trafik sigortası, kasko durumu ve ödenmemiş cezaları olup olmadığını kontrol edin.</p>

      <h2>5. Bakım Kayıtlarını İnceleyin</h2>
      <p>Düzenli bakım yapılmış araçlar genellikle daha az sorun çıkarır. Bakım kayıtlarını mutlaka isteyin.</p>

      <h2>Sonuç</h2>
      <p>Araç satın alma süreci dikkat ve sabır gerektiren bir süreçtir. Bu ipuçlarını takip ederek, doğru aracı uygun fiyata bulabilirsiniz. CarSite olarak size bu süreçte yardımcı olmak için buradayız!</p>
    `,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/blog">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Bloga Dön
        </Button>
      </Link>

      <article className="mx-auto max-w-4xl">
        <div className="mb-8 aspect-video overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mb-6">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {post.category}
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-secondary">
          {post.title}
        </h1>

        <div className="mb-8 flex items-center gap-6 text-gray-600">
          <span className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            {post.author}
          </span>
          <span className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {post.date}
          </span>
        </div>

        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </CardContent>
        </Card>
      </article>
    </div>
  )
}

