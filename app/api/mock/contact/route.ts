import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Mock API response
    const response = {
      status: 'success',
      message: 'Mesajınız başarıyla gönderildi',
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

