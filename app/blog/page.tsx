import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    slug: 'arac-satin-alirken-dikkat-edilmesi-gerekenler',
    title: 'Araç Satın Alırken Dikkat Edilmesi Gerekenler',
    excerpt:
      'İkinci el araç satın alırken nelere dikkat etmelisiniz? İşte size yol gösterecek önemli ipuçları...',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    author: 'Ahmet Yılmaz',
    date: '15 Ekim 2025',
    category: 'Rehber',
  },
  {
    id: 2,
    slug: 'aracinizin-degerini-artirmak-icin-5-ipucu',
    title: 'Aracınızın Değerini Artırmak İçin 5 İpucu',
    excerpt:
      'Aracınızı satmadan önce değerini artırmak için uygulayabileceğiniz basit ama etkili yöntemler...',
    image: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800',
    author: 'Ayşe Demir',
    date: '10 Ekim 2025',
    category: 'İpuçları',
  },
  {
    id: 3,
    slug: 'elektrikli-araclarin-gelecegi',
    title: 'Elektrikli Araçların Geleceği',
    excerpt:
      'Elektrikli araçlar otomotiv sektörünün geleceğini nasıl şekillendiriyor? Trendler ve beklentiler...',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    author: 'Mehmet Kaya',
    date: '5 Ekim 2025',
    category: 'Teknoloji',
  },
  {
    id: 4,
    slug: 'arac-bakimi-nasil-yapilir',
    title: 'Araç Bakımı Nasıl Yapılır?',
    excerpt:
      'Aracınızın ömrünü uzatmak için düzenli bakım şart. İşte size kapsamlı bir bakım rehberi...',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800',
    author: 'Fatma Şahin',
    date: '1 Ekim 2025',
    category: 'Bakım',
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">Blog</h1>
        <p className="mt-2 text-gray-600">
          Otomotiv dünyasından haberler, ipuçları ve rehberler
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="mb-2 flex items-center gap-4 text-sm text-gray-500">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {post.category}
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {post.date}
                </span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 line-clamp-3 text-gray-600">{post.excerpt}</p>
              <div className="mb-4 flex items-center text-sm text-gray-500">
                <User className="mr-1 h-4 w-4" />
                {post.author}
              </div>
              <Link href={`/CarSite/blog/${post.slug}`}>
                <Button variant="outline" className="w-full">
                  Devamını Oku
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

