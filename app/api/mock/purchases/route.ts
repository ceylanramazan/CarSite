import { NextResponse } from 'next/server'
import type { PurchasePayload, PurchaseResponse } from '@/types'

export async function POST(request: Request) {
  try {
    const body: PurchasePayload = await request.json()
    
    // Mock API response
    const response: PurchaseResponse = {
      status: 'success',
      message: 'Satın alma talebiniz oluşturuldu',
      purchase_id: `PUR-${Date.now()}`,
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

