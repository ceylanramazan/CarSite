import { NextRequest, NextResponse } from 'next/server'
import { SmartIQAPI } from '@/lib/smartiq-api'

export async function POST(request: NextRequest) {
  try {
    const { year, brandId, modelId, bodyTypeId, transmissionTypeId, fuelTypeId } = await request.json()
    
    if (!year || !brandId || !modelId || !bodyTypeId || !transmissionTypeId || !fuelTypeId) {
      return NextResponse.json(
        { success: false, error: 'All parameters (year, brandId, modelId, bodyTypeId, transmissionTypeId, fuelTypeId) are required' },
        { status: 400 }
      )
    }

    const versions = await SmartIQAPI.getVersions(year, brandId, modelId, bodyTypeId, transmissionTypeId, fuelTypeId)
    return NextResponse.json({ success: true, data: versions })
  } catch (error) {
    console.error('SmartIQ Versions API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
