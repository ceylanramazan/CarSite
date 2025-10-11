import { getMockCarById, mockCars } from '@/lib/mockApi'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PurchaseFormClient } from './PurchaseFormClient'

export function generateStaticParams() {
  return mockCars.map((car) => ({
    id: car.id.toString(),
  }))
}

export default function SatinAlPage({
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
            <Link href="/CarSite/arac-al">
              <Button className="mt-4">Geri Dön</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <PurchaseFormClient car={car} />
}
