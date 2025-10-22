import { NextRequest, NextResponse } from 'next/server'
import { SmartIQAPI } from '@/lib/smartiq-api'

export async function POST(request: NextRequest) {
  try {
    const { year, brandId, modelId, bodyTypeId, transmissionTypeId, fuelTypeId, versionId } = await request.json()
    
    if (!year || !brandId || !modelId || !bodyTypeId || !transmissionTypeId || !fuelTypeId || !versionId) {
      return NextResponse.json(
        { success: false, error: 'All parameters are required' },
        { status: 400 }
      )
    }

    const equipments = await SmartIQAPI.getEquipments(year, brandId, modelId, bodyTypeId, transmissionTypeId, fuelTypeId, versionId)
    return NextResponse.json({ success: true, data: equipments })
  } catch (error) {
    console.error('SmartIQ Equipments API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
