import { NextRequest, NextResponse } from 'next/server'
import { SmartIQAPI } from '@/lib/smartiq-api'

export async function POST(request: NextRequest) {
  try {
    const { year, brandId, modelId, bodyTypeId } = await request.json()
    
    if (!year || !brandId || !modelId || !bodyTypeId) {
      return NextResponse.json(
        { success: false, error: 'Year, brandId, modelId and bodyTypeId parameters are required' },
        { status: 400 }
      )
    }

    const transmissionTypes = await SmartIQAPI.getTransmissionTypes(year, brandId, modelId, bodyTypeId)
    return NextResponse.json({ success: true, data: transmissionTypes })
  } catch (error) {
    console.error('SmartIQ Transmission Types API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
