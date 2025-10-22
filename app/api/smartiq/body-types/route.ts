import { NextRequest, NextResponse } from 'next/server'
import { SmartIQAPI } from '@/lib/smartiq-api'

export async function POST(request: NextRequest) {
  try {
    const { year, brandId, modelId } = await request.json()
    
    if (!year || !brandId || !modelId) {
      return NextResponse.json(
        { success: false, error: 'Year, brandId and modelId parameters are required' },
        { status: 400 }
      )
    }

    const bodyTypes = await SmartIQAPI.getBodyTypes(year, brandId, modelId)
    return NextResponse.json({ success: true, data: bodyTypes })
  } catch (error) {
    console.error('SmartIQ Body Types API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
