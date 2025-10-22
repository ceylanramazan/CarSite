import { NextRequest, NextResponse } from 'next/server'
import { SmartIQAPI } from '@/lib/smartiq-api'

export async function POST(request: NextRequest) {
  try {
    const { year, brandId } = await request.json()
    
    if (!year || !brandId) {
      return NextResponse.json(
        { success: false, error: 'Year and brandId parameters are required' },
        { status: 400 }
      )
    }

    const models = await SmartIQAPI.getModels(year, brandId)
    return NextResponse.json({ success: true, data: models })
  } catch (error) {
    console.error('SmartIQ Models API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
