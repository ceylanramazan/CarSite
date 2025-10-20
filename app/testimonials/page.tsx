import { Metadata } from 'next'
import TestimonialsPage from './TestimonialsPage'

export const metadata: Metadata = {
  title: 'Müşteri Yorumları | Any 2. El',
  description: 'Any 2. El müşterilerinin deneyimleri ve yorumları. Binlerce mutlu müşterimizin gerçek hikayeleri.',
  keywords: 'müşteri yorumları, carsite yorumlar, araç alım satım deneyimi, müşteri memnuniyeti',
}

export default function Testimonials() {
  return <TestimonialsPage />
}
