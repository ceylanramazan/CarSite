import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, TrendingUp, Award } from 'lucide-react'

export default function HakkimizdaPage() {
  const stats = [
    { icon: Users, label: 'Mutlu Müşteri', value: '3493+' },
    { icon: TrendingUp, label: 'Başarı Oranı', value: '%98' },
    { icon: Award, label: 'Yıllık Tecrübe', value: '10+' },
    { icon: Shield, label: 'Güvenli İşlem', value: '%100' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Any 2. El olarak, araç alım sürecini güvenli, hızlı ve kolay hale
          getiriyoruz.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-secondary">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story */}
      <div className="mb-16">
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg font-medium text-secondary">
                Any 2. El ile Güvenli ve Değerinde Araç Satışı Artık Çok Kolay
              </p>
              <p>
                İkinci el aracınızı satmak gözünüzde büyümesin. Any 2. El olarak, süreci sizin için hızlı, şeffaf ve sorunsuz hale getiriyoruz. Alanında uzman ekibimiz ve sektörle iç içe geçen yılların getirdiği deneyimle, aracınızın gerçek değerini ortaya çıkarıyor, sizi oyalamadan, yormadan en doğru tekliflerle buluşturuyoruz.
              </p>
              <p>
                Yalnızca yerel bilgiyle yetinmiyor, global veri sağlayıcılarıyla iş birliği yaparak piyasa analizlerini gerçek zamanlı takip ediyoruz. Bu sayede aracınızın ederini tam olarak belirliyor, ne alıcının ne de satıcının zarar görmeyeceği, dengeli bir ticaret ortamı oluşturuyoruz.
              </p>
              <p>
                Any 2. El&apos;de amaç sadece araç almak değil, güvenle işlem yapabileceğiniz, profesyonel ve kârlı bir deneyim sunmak. Aracınızı satarken içiniz rahat, kazancınız yerinde olsun.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

