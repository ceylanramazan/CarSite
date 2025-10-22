import { NextRequest, NextResponse } from 'next/server'
import { SmartIQAPI } from '@/lib/smartiq-api'

export async function POST(request: NextRequest) {
  try {
    const { year, brandId, modelId, bodyTypeId, transmissionTypeId } = await request.json()
    
    if (!year || !brandId || !modelId || !bodyTypeId || !transmissionTypeId) {
      return NextResponse.json(
        { success: false, error: 'Year, brandId, modelId, bodyTypeId and transmissionTypeId parameters are required' },
        { status: 400 }
      )
    }

    const fuelTypes = await SmartIQAPI.getFuelTypes(year, brandId, modelId, bodyTypeId, transmissionTypeId)
    return NextResponse.json({ success: true, data: fuelTypes })
  } catch (error) {
    console.error('SmartIQ Fuel Types API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
