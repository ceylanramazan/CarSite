import { Metadata } from 'next'
import TestimonialsPage from './TestimonialsPage'

export const metadata: Metadata = {
  title: 'Müşteri Yorumları | CarSite',
  description: 'CarSite müşterilerinin deneyimleri ve yorumları. Binlerce mutlu müşterimizin gerçek hikayeleri.',
  keywords: 'müşteri yorumları, carsite yorumlar, araç alım satım deneyimi, müşteri memnuniyeti',
}

export default function Testimonials() {
  return <TestimonialsPage />
}
