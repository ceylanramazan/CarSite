import { NextResponse } from 'next/server'
import type { OfferPayload, OfferResponse } from '@/types'

export async function POST(request: Request) {
  try {
    const body: OfferPayload = await request.json()
    
    // Mock API response
    const response: OfferResponse = {
      status: 'success',
      message: 'Teklifiniz başarıyla alındı',
      offer_id: `OFFER-${Date.now()}`,
    }
    
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      },
      { status: 500 }
    )
  }
}

