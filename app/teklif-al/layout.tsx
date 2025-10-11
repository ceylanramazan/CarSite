'use client'

import { OfferFormProvider } from '@/contexts/OfferFormContext'

export default function TeklifAlLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <OfferFormProvider>{children}</OfferFormProvider>
}

