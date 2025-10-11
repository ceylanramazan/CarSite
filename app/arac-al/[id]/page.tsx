import { getMockCarById, mockCars } from '@/lib/mockApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MapPin,
  Fuel,
  Settings,
  Calendar,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'
import { CarDetailClient } from './CarDetailClient'

export function generateStaticParams() {
  return mockCars.map((car) => ({
    id: car.id.toString(),
  }))
}

export default function AracDetayPage({
  params,
}: {
  params: { id: string }
}) {
  const carId = parseInt(params.id)
  const car = getMockCarById(carId)

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-gray-600">Araç bulunamadı.</p>
            <Link href="/arac-al">
              <Button className="mt-4">Geri Dön</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <CarDetailClient car={car} />
}
