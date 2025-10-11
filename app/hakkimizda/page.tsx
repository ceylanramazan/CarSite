import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, TrendingUp, Award } from 'lucide-react'

export default function HakkimizdaPage() {
  const stats = [
    { icon: Users, label: 'Mutlu Müşteri', value: '5000+' },
    { icon: TrendingUp, label: 'Başarı Oranı', value: '%98' },
    { icon: Award, label: 'Yıllık Tecrübe', value: '10+' },
    { icon: Shield, label: 'Güvenli İşlem', value: '%100' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-secondary">Hakkımızda</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          CarSite olarak, araç alım satım sürecini güvenli, hızlı ve kolay hale
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
            <h2 className="mb-6 text-2xl font-bold text-secondary">
              Hikayemiz
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                CarSite, 2014 yılında araç alım satım sürecini daha şeffaf ve
                güvenilir hale getirmek amacıyla kuruldu. O günden bu yana
                binlerce müşterimize hizmet vererek, sektörde güvenilir bir
                marka haline geldik.
              </p>
              <p>
                Uzman ekibimiz, her aracı titizlikle değerlendirir ve
                müşterilerimize en adil fiyatı sunar. Teknoloji ve
                deneyimimizi birleştirerek, araç alım satım sürecini herkes
                için kolay ve güvenli hale getiriyoruz.
              </p>
              <p>
                Müşteri memnuniyeti bizim için her şeyden önemlidir. Her adımda
                yanınızdayız ve size en iyi hizmeti sunmak için çalışıyoruz.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mission & Vision */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-8">
            <h2 className="mb-4 text-2xl font-bold text-secondary">
              Misyonumuz
            </h2>
            <p className="text-gray-700">
              Araç alım satım sürecini teknoloji ile kolaylaştırarak, herkes
              için güvenli, şeffaf ve adil bir deneyim sunmak.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <h2 className="mb-4 text-2xl font-bold text-secondary">
              Vizyonumuz
            </h2>
            <p className="text-gray-700">
              Türkiye&apos;nin en güvenilir ve tercih edilen araç alım satım
              platformu olmak, müşterilerimize her zaman en iyi hizmeti sunmak.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

