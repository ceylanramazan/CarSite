import { NextRequest, NextResponse } from 'next/server'
import { SmartIQAPI } from '@/lib/smartiq-api'

export async function POST(request: NextRequest) {
  try {
    const { year } = await request.json()
    
    if (!year) {
      return NextResponse.json(
        { success: false, error: 'Year parameter is required' },
        { status: 400 }
      )
    }

    const brands = await SmartIQAPI.getBrands(year)
    return NextResponse.json({ success: true, data: brands })
  } catch (error) {
    console.error('SmartIQ Brands API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
