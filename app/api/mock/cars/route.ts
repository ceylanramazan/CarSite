import { NextResponse } from 'next/server'
import { mockCars } from '@/lib/mockApi'

export async function GET(request: Request) {
  try {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json(mockCars)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    )
  }
}

